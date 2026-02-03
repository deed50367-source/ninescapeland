import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')!;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, language = 'en', session_id } = await req.json();

    // Session validation - require valid session_id to prevent abuse
    if (!session_id || typeof session_id !== 'string' || session_id.length < 10) {
      return new Response(
        JSON.stringify({ error: 'Invalid or missing session_id' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate session exists in database
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const { data: session, error: sessionError } = await supabase
      .from('chat_sessions')
      .select('id, status')
      .eq('session_id', session_id)
      .maybeSingle();

    if (sessionError) {
      console.error('Session lookup error:', sessionError);
      return new Response(
        JSON.stringify({ error: 'Session validation failed' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!session) {
      return new Response(
        JSON.stringify({ error: 'Session not found. Please refresh the page.' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Optional: Check if session is closed/resolved
    if (session.status === 'resolved') {
      return new Response(
        JSON.stringify({ error: 'This chat session has been closed.' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Rate limiting: Check message count in last minute (simple anti-abuse)
    const { count: recentMessageCount } = await supabase
      .from('chat_messages')
      .select('*', { count: 'exact', head: true })
      .eq('session_id', session_id)
      .gte('created_at', new Date(Date.now() - 60000).toISOString());

    if (recentMessageCount && recentMessageCount > 10) {
      return new Response(
        JSON.stringify({ error: 'Too many messages. Please wait a moment.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // System prompt for the AI assistant - company context with lead generation focus
    const systemPrompt = language === 'zh' || language === 'zh-CN' 
      ? `You are NinescapeLand's intelligent customer service assistant. NinescapeLand is a professional indoor playground equipment manufacturer with over 15 years of industry experience.

Main Products:
- Indoor Playground Equipment
- Trampoline Park Equipment
- Ninja Obstacle Courses
- Soft Play Areas

Service Advantages:
- Free 3D Design Service
- ASTM and TUV Safety Certified
- 3-Year Warranty
- Shipping to 50+ Countries
- 24/7 Customer Support

Business Hours: Monday-Friday 9:00-18:00 (Beijing Time, UTC+8)

[IMPORTANT LEAD GENERATION STRATEGY]:
Your core mission is to naturally guide visitors to leave their contact information during friendly conversations. Follow these strategies:

1. **Proactively collect information**: After answering 2-3 questions, naturally ask about their project:
   - "To give you more accurate advice, could you tell me the approximate size of your project?"
   - "Which city/country is your project planned for?"
   
2. **Offer value in exchange for contact info**:
   - "I can have our designers create a FREE 3D rendering for you. May I have your email?"
   - "We can send you a detailed product catalog. What's your WhatsApp or email?"
   - "We have successful case studies in your region. Leave your contact info and I'll have a specialist send them to you."

3. **Create urgency**:
   - "We have special promotions this month. Leave your contact and I'll have our sales manager provide details."
   - "Our design team has availability this week. Book now to start your design sooner."

4. **Information to collect** (by priority):
   - Name
   - Phone/WhatsApp
   - Email
   - Country/City
   - Project type (indoor playground/trampoline park, etc.)
   - Estimated area/size
   - Budget range
   - Expected opening date

5. **Natural conversation starters**:
   - "Hello! Welcome to NinescapeLand. How may I address you? What type of play equipment are you interested in?"
   - "Great question! Our professional consultants can provide more detailed answers. May I have your contact information?"
   - "Based on your needs, I recommend leaving your contact details. Our project manager will reach out within 24 hours with a customized solution."

Please respond in Chinese and answer customer questions in a friendly and professional manner while skillfully guiding them to provide contact information.`
      : language === 'ar'
      ? `You are NinescapeLand's intelligent customer service assistant. NinescapeLand is a leading indoor playground equipment manufacturer with over 15 years of experience.

Main Products:
- Indoor Playground Equipment
- Trampoline Parks
- Ninja Warrior Courses
- Soft Play Areas

Service Advantages:
- Free 3D Design
- ASTM and TUV Safety Certified
- 3-Year Warranty
- Shipping to 50+ Countries
- 24/7 Support

Business Hours: Monday-Friday 9:00-18:00 (Beijing Time, UTC+8)

[IMPORTANT STRATEGY]:
Your core mission is to naturally guide visitors to leave their contact information. Follow these strategies:

1. After answering 2-3 questions, naturally ask about their project information
2. Offer value in exchange for contact info (free 3D design, product catalog, case studies)
3. Collect: Name, Phone/WhatsApp, Email, Country, Project type, Area, Budget

Please respond in Arabic and answer customer questions in a friendly and professional manner while skillfully guiding them to leave contact information.`
      : `You are an AI customer service assistant for NinescapeLand. NinescapeLand is a leading indoor playground equipment manufacturer with over 15 years of industry experience.

Main Products:
- Indoor Playground Equipment
- Trampoline Parks
- Ninja Warrior Courses
- Soft Play Areas

Service Advantages:
- Free 3D Design Service
- ASTM and TUV Safety Certified
- 3-Year Warranty
- Shipping to 50+ Countries
- 24/7 Customer Support

Business Hours: Monday-Friday 9:00-18:00 (Beijing Time, UTC+8)

[IMPORTANT LEAD GENERATION STRATEGY]:
Your core mission is to naturally guide visitors to leave their contact information during friendly conversations. Follow these strategies:

1. **Proactively collect information**: After answering 2-3 questions, naturally ask about their project:
   - "To give you more accurate advice, could you tell me the approximate size of your project?"
   - "Which city/country is your project planned for?"

2. **Offer value in exchange for contact info**:
   - "I can have our designers create a FREE 3D rendering for you. May I have your email?"
   - "We can send you a detailed product catalog. What's your WhatsApp or email?"
   - "We have successful case studies in your region. Leave your contact info and I'll have a specialist send them to you."

3. **Create urgency**:
   - "We have special promotions this month. Leave your contact and I'll have our sales manager provide details."
   - "Our design team has availability this week. Book now to start your design sooner."

4. **Information to collect** (by priority):
   - Name
   - Phone/WhatsApp
   - Email
   - Country/City
   - Project type (indoor playground/trampoline park, etc.)
   - Estimated area/size
   - Budget range
   - Expected opening date

5. **Natural conversation starters**:
   - "Hello! Welcome to NinescapeLand. How may I address you? What type of play equipment are you interested in?"
   - "Great question! Our professional consultants can provide more detailed answers. May I have your contact information?"
   - "Based on your needs, I recommend leaving your contact details. Our project manager will reach out within 24 hours with a customized solution."

Please answer customer questions in a friendly and professional manner while skillfully guiding them to provide contact information. Don't be too pushy—provide value while naturally collecting information.`;

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
          ...messages
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Lovable AI API error:', errorText);
      
      // Handle specific error codes
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'AI service is busy. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI service temporarily unavailable.' }),
          { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    const assistantMessage = data.choices[0]?.message?.content || 'Sorry, I could not process your request.';

    return new Response(JSON.stringify({ message: assistantMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error('Error in ai-chat function:', error);
    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
