import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, language = 'en' } = await req.json();

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // System prompt for the AI assistant - company context
    const systemPrompt = language === 'zh' || language === 'zh-CN' 
      ? `你是NinescapeLand的智能客服助手。NinescapeLand是一家专业的室内游乐场设备制造商，拥有超过15年的行业经验。

主要产品：
- 室内儿童乐园设备
- 蹦床公园设备
- 忍者障碍赛道
- 软包游乐区

服务优势：
- 免费3D设计服务
- ASTM和TUV安全认证
- 3年质保
- 全球50+国家配送
- 24/7客户支持

工作时间：周一至周五 9:00-18:00（北京时间，UTC+8）

请用友好、专业的方式回答客户问题。如果客户询问具体报价或技术细节，建议他们在工作时间联系人工客服或填写询价表单。对于复杂问题，鼓励客户留下联系方式以便人工客服回访。`
      : language === 'ar'
      ? `أنت مساعد خدمة العملاء الذكي لشركة NinescapeLand. NinescapeLand هي شركة رائدة في تصنيع معدات الملاعب الداخلية مع أكثر من 15 عامًا من الخبرة.

المنتجات الرئيسية:
- معدات الملاعب الداخلية
- حدائق الترامبولين
- مسارات نينجا واريور
- مناطق اللعب الناعمة

مزايا الخدمة:
- تصميم ثلاثي الأبعاد مجاني
- شهادات سلامة ASTM و TUV
- ضمان 3 سنوات
- شحن إلى أكثر من 50 دولة
- دعم 24/7

ساعات العمل: الاثنين - الجمعة 9:00-18:00 (توقيت بكين، UTC+8)

يرجى الإجابة على أسئلة العملاء بطريقة ودية ومهنية. للاستفسارات المعقدة، شجع العملاء على ترك معلومات الاتصال.`
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

Please answer customer questions in a friendly and professional manner. For specific quotes or technical details, suggest they contact human support during business hours or fill out the inquiry form. For complex questions, encourage customers to leave contact information for a callback.`;

    const response = await fetch('https://api.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-5-mini',
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
