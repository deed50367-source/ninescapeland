import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { lang = 'es' } = await req.json().catch(() => ({}));
    
    const langMap: Record<string, { name: string; column: string }> = {
      es: { name: 'Spanish', column: 'description_es' },
      de: { name: 'German', column: 'description_de' },
      pt: { name: 'Portuguese (Brazilian)', column: 'description_pt' },
      ar: { name: 'Arabic', column: 'description_ar' },
      fr: { name: 'French', column: 'description_fr' },
    };
    
    const target = langMap[lang];
    if (!target) throw new Error(`Unknown language: ${lang}`);

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { data: products, error } = await supabase
      .from('products')
      .select(`id, slug, description, ${target.column}`)
      .eq('is_active', true)
      .not('description', 'is', null)
      .is(target.column, null)
      .order('slug')
      .limit(1);

    if (error) throw error;
    if (!products?.length) {
      return new Response(JSON.stringify({ done: true, lang }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const product = products[0];
    console.log(`Translating ${product.slug} → ${lang}...`);

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-lite',
        messages: [
          {
            role: 'system',
            content: `Translate this product description from English to ${target.name}. Keep brand names (NinescapeLand, ASTM, TUV, CE, ISO) unchanged. Professional marketing tone. Return ONLY translated text.`
          },
          { role: 'user', content: product.description }
        ],
        max_tokens: 3000,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`AI error ${response.status}: ${errText}`);
    }

    const data = await response.json();
    const translated = data.choices[0]?.message?.content?.trim();
    if (!translated) throw new Error('Empty translation');

    const { error: updateError } = await supabase
      .from('products')
      .update({ [target.column]: translated })
      .eq('id', product.id);

    if (updateError) throw updateError;

    // Count remaining
    const { count } = await supabase
      .from('products')
      .select('id', { count: 'exact', head: true })
      .eq('is_active', true)
      .not('description', 'is', null)
      .is(target.column, null);

    return new Response(
      JSON.stringify({ slug: product.slug, lang, status: 'ok', remaining: count }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('Translate error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
