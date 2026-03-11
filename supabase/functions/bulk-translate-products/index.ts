import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const LANGUAGES = [
  { code: 'es', name: 'Spanish', column: 'description_es' },
  { code: 'de', name: 'German', column: 'description_de' },
  { code: 'pt', name: 'Portuguese (Brazilian)', column: 'description_pt' },
  { code: 'ar', name: 'Arabic', column: 'description_ar' },
  { code: 'fr', name: 'French', column: 'description_fr' },
];

async function translateText(text: string, targetLang: string): Promise<string> {
  const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${LOVABLE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'google/gemini-2.5-flash',
      messages: [
        {
          role: 'system',
          content: `You are a professional translator for a commercial playground equipment company called NinescapeLand. Translate the following product description from English to ${targetLang}. Keep proper nouns (NinescapeLand, ASTM, TUV, CE, ISO) unchanged. Keep the same HTML formatting if any. Maintain a professional, marketing-oriented tone. Return ONLY the translated text.`
        },
        { role: 'user', content: text }
      ],
      max_tokens: 3000,
      temperature: 0.2,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`AI API error ${response.status}: ${errText}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content?.trim() || '';
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { batch = 0, batchSize = 5 } = await req.json().catch(() => ({}));
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Get products that have English description but missing translations
    const { data: products, error } = await supabase
      .from('products')
      .select('id, slug, description, description_es, description_de, description_pt, description_ar, description_fr')
      .eq('is_active', true)
      .not('description', 'is', null)
      .order('slug')
      .range(batch * batchSize, (batch + 1) * batchSize - 1);

    if (error) throw error;
    if (!products?.length) {
      return new Response(JSON.stringify({ message: 'No products to translate' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const results: { slug: string; status: string; languages: string[] }[] = [];
    let totalTranslated = 0;

    for (const product of products) {
      if (!product.description) continue;

      const updates: Record<string, string> = {};
      const translatedLangs: string[] = [];

      // Translate to each language sequentially to avoid rate limits
      for (const lang of LANGUAGES) {
        try {
          console.log(`Translating ${product.slug} to ${lang.code}...`);
          const translated = await translateText(product.description, lang.name);
          if (translated) {
            updates[lang.column] = translated;
            translatedLangs.push(lang.code);
            totalTranslated++;
          }
          // Small delay to avoid rate limits
          await new Promise(r => setTimeout(r, 300));
        } catch (e) {
          console.error(`Failed to translate ${product.slug} to ${lang.code}:`, e);
        }
      }

      if (Object.keys(updates).length > 0) {
        const { error: updateError } = await supabase
          .from('products')
          .update(updates)
          .eq('id', product.id);

        if (updateError) {
          console.error(`Failed to save ${product.slug}:`, updateError);
          results.push({ slug: product.slug, status: 'save_error', languages: translatedLangs });
        } else {
          results.push({ slug: product.slug, status: 'ok', languages: translatedLangs });
        }
      }
    }

    return new Response(
      JSON.stringify({
        message: `Translated ${totalTranslated} descriptions across ${results.length} products`,
        totalTranslated,
        results,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('Bulk translate error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
