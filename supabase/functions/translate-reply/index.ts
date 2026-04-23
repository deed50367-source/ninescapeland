import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')!;

// Language name mapping for better prompts
const LANGUAGE_NAMES: Record<string, string> = {
  'en': 'English',
  'en-US': 'English',
  'en-GB': 'English',
  'zh': 'Chinese (Simplified)',
  'zh-CN': 'Chinese (Simplified)',
  'zh-TW': 'Chinese (Traditional)',
  'ar': 'Arabic',
  'ar-SA': 'Arabic',
  'de': 'German',
  'de-DE': 'German',
  'es': 'Spanish',
  'es-ES': 'Spanish',
  'pt': 'Portuguese',
  'pt-BR': 'Portuguese (Brazilian)',
  'pt-PT': 'Portuguese',
  'fr': 'French',
  'fr-FR': 'French',
  'ja': 'Japanese',
  'ko': 'Korean',
  'ru': 'Russian',
  'it': 'Italian',
  'nl': 'Dutch',
  'tr': 'Turkish',
  'vi': 'Vietnamese',
  'th': 'Thai',
  'id': 'Indonesian',
  'ms': 'Malay',
  'hi': 'Hindi',
};

function getLanguageName(langCode: string | null): string {
  if (!langCode) return 'English';
  
  // Try exact match first
  if (LANGUAGE_NAMES[langCode]) {
    return LANGUAGE_NAMES[langCode];
  }
  
  // Try base language (e.g., 'en' from 'en-US')
  const baseCode = langCode.split('-')[0];
  if (LANGUAGE_NAMES[baseCode]) {
    return LANGUAGE_NAMES[baseCode];
  }
  
  return 'English';
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Require authenticated admin/staff
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseAuth = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
    });
    const token = authHeader.replace('Bearer ', '');
    const { data: claimsData, error: claimsError } = await supabaseAuth.auth.getClaims(token);
    if (claimsError || !claimsData?.claims?.sub) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const userId = claimsData.claims.sub;
    const { data: roles } = await supabaseAuth
      .from('user_roles')
      .select('role')
      .eq('user_id', userId);
    const allowed = (roles ?? []).some((r: { role: string }) => r.role === 'admin' || r.role === 'staff');
    if (!allowed) {
      return new Response(
        JSON.stringify({ error: 'Forbidden' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { text, targetLanguage, sourceLanguage } = await req.json();

    if (!text || !targetLanguage) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: text and targetLanguage' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const targetLangName = getLanguageName(targetLanguage);
    const sourceLangName = sourceLanguage ? getLanguageName(sourceLanguage) : 'any language';

    // If target language is likely the same as source, return original
    const targetBase = targetLanguage.split('-')[0].toLowerCase();
    const sourceBase = sourceLanguage?.split('-')[0]?.toLowerCase();
    
    if (sourceBase && targetBase === sourceBase) {
      return new Response(
        JSON.stringify({ translatedText: text, wasTranslated: false }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const systemPrompt = `You are a professional translator for a business customer service system. Your task is to translate customer service replies naturally and professionally.

Rules:
1. Translate the given text from ${sourceLangName} to ${targetLangName}
2. Keep the tone friendly and professional
3. Preserve any proper nouns, product names, and company names (like "NinescapeLand")
4. If there are any URLs, email addresses, or phone numbers, keep them unchanged
5. Adapt cultural expressions appropriately for the target language
6. Return ONLY the translated text, no explanations or quotes`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: text }
        ],
        max_tokens: 2000,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits exhausted. Please add credits to continue.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      const errorText = await response.text();
      console.error('AI API error:', errorText);
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    const translatedText = data.choices[0]?.message?.content?.trim() || text;

    return new Response(
      JSON.stringify({ 
        translatedText, 
        wasTranslated: true,
        sourceLanguage: sourceLangName,
        targetLanguage: targetLangName
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('Error in translate-reply function:', error);
    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
