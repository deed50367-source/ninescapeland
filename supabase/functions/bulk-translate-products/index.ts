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

async function sleep(ms: number) {
  return new Promise(r => setTimeout(r, ms));
}

async function translateText(text: string, targetLang: string, retries = 3): Promise<string> {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
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
              content: `Translate this product description from English to ${targetLang}. Keep brand names (NinescapeLand, ASTM, TUV, CE, ISO) unchanged. Keep HTML tags. Professional marketing tone. Return ONLY translated text.`
            },
            { role: 'user', content: text }
          ],
          max_tokens: 3000,
          temperature: 0.2,
        }),
      });

      if (response.status === 429) {
        const waitTime = (attempt + 1) * 5000;
        console.log(`Rate limited, waiting ${waitTime}ms before retry ${attempt + 1}...`);
        await sleep(waitTime);
        continue;
      }

      if (!response.ok) {
        throw new Error(`AI API error ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content?.trim() || '';
    } catch (e) {
      if (attempt === retries - 1) throw e;
      await sleep(3000);
    }
  }
  return '';
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { batch = 0, batchSize = 3 } = await req.json().catch(() => ({}));
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Get products missing at least one translation
    const { data: products, error } = await supabase
      .from('products')
      .select('id, slug, description, description_es, description_de, description_pt, description_ar, description_fr')
      .eq('is_active', true)
      .not('description', 'is', null)
      .or('description_es.is.null,description_de.is.null,description_pt.is.null,description_ar.is.null,description_fr.is.null')
      .order('slug')
      .range(batch * batchSize, (batch + 1) * batchSize - 1);

    if (error) throw error;
    if (!products?.length) {
      return new Response(JSON.stringify({ message: 'No more products', batch }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const results: { slug: string; translated: string[]; skipped: string[] }[] = [];
    let totalTranslated = 0;

    for (const product of products) {
      if (!product.description) continue;
      const updates: Record<string, string> = {};
      const translated: string[] = [];
      const skipped: string[] = [];

      for (const lang of LANGUAGES) {
        // Skip if already translated
        if ((product as Record<string, unknown>)[lang.column]) {
          skipped.push(lang.code);
          continue;
        }
        try {
          console.log(`[batch ${batch}] Translating ${product.slug} → ${lang.code}...`);
          const result = await translateText(product.description, lang.name);
          if (result) {
            updates[lang.column] = result;
            translated.push(lang.code);
            totalTranslated++;
          }
          // Delay between translations
          await sleep(1500);
        } catch (e) {
          console.error(`Failed: ${product.slug} → ${lang.code}:`, e);
        }
      }

      if (Object.keys(updates).length > 0) {
        const { error: updateError } = await supabase
          .from('products')
          .update(updates)
          .eq('id', product.id);

        if (updateError) {
          console.error(`Save failed for ${product.slug}:`, updateError);
        }
      }

      results.push({ slug: product.slug, translated, skipped });
    }

    return new Response(
      JSON.stringify({ batch, totalTranslated, results, nextBatch: batch + 1 }),
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
