import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";

export type WhatsAppClickSource = 
  | "floating_cta"
  | "floating_mascot"
  | "header"
  | "footer"
  | "mobile_nav"
  | "cta_banner"
  | "process_cta"
  | "projects_cta"
  | "contact_section"
  | "product_detail"
  | "live_chat"
  | "other";

interface TrackingOptions {
  metadata?: Record<string, string | number | boolean | null>;
  productName?: string;
  pageName?: string;
}

const WHATSAPP_NUMBER = "8615058782901";
const WHATSAPP_BASE_URL = "https://wa.me/";

// Pre-filled messages for different sources/contexts
const getPrefilledMessage = (
  source: WhatsAppClickSource,
  language: string,
  options?: TrackingOptions
): string => {
  const messages: Record<string, Record<WhatsAppClickSource, string>> = {
    en: {
      floating_cta: "Hi! I'm interested in your playground equipment. Can you help me?",
      floating_mascot: "Hello! I'd like to learn more about your products.",
      header: "Hi! I'm browsing your website and have some questions.",
      footer: "Hello! I found your company online and would like more information.",
      mobile_nav: "Hi! I'm interested in your playground solutions.",
      cta_banner: "Hello! I'd like to get a free quote for my project.",
      process_cta: "Hi! I'm interested in learning about your production process.",
      projects_cta: "Hello! I saw your projects and would like to discuss my own project.",
      contact_section: "Hi! I'd like to request a quote for playground equipment.",
      product_detail: options?.productName 
        ? `Hi! I'm interested in ${options.productName}. Can you provide more details?`
        : "Hi! I'm interested in this product. Can you provide more details?",
      live_chat: "Hi! I was chatting on your website and would like to continue here.",
      other: "Hello! I'm interested in your playground equipment.",
    },
    zh: {
      floating_cta: "您好！我对贵公司的游乐设备很感兴趣，能帮我介绍一下吗？",
      floating_mascot: "您好！我想了解更多关于贵公司产品的信息。",
      header: "您好！我正在浏览贵公司网站，有一些问题想咨询。",
      footer: "您好！我在网上找到贵公司，想了解更多信息。",
      mobile_nav: "您好！我对贵公司的游乐场解决方案很感兴趣。",
      cta_banner: "您好！我想为我的项目获取免费报价。",
      process_cta: "您好！我想了解贵公司的生产流程。",
      projects_cta: "您好！我看到了贵公司的项目案例，想咨询我自己的项目。",
      contact_section: "您好！我想咨询游乐设备的报价。",
      product_detail: options?.productName 
        ? `您好！我对${options.productName}很感兴趣，能提供更多详情吗？`
        : "您好！我对这个产品很感兴趣，能提供更多详情吗？",
      live_chat: "您好！我刚在网站上聊天，想在这里继续沟通。",
      other: "您好！我对贵公司的游乐设备很感兴趣。",
    },
    ar: {
      floating_cta: "مرحباً! أنا مهتم بمعدات الملاعب الخاصة بكم. هل يمكنكم مساعدتي؟",
      floating_mascot: "مرحباً! أود معرفة المزيد عن منتجاتكم.",
      header: "مرحباً! أتصفح موقعكم ولدي بعض الأسئلة.",
      footer: "مرحباً! وجدت شركتكم عبر الإنترنت وأود المزيد من المعلومات.",
      mobile_nav: "مرحباً! أنا مهتم بحلول الملاعب الخاصة بكم.",
      cta_banner: "مرحباً! أود الحصول على عرض أسعار مجاني لمشروعي.",
      process_cta: "مرحباً! أنا مهتم بمعرفة المزيد عن عملية الإنتاج لديكم.",
      projects_cta: "مرحباً! رأيت مشاريعكم وأود مناقشة مشروعي الخاص.",
      contact_section: "مرحباً! أود طلب عرض أسعار لمعدات الملاعب.",
      product_detail: options?.productName 
        ? `مرحباً! أنا مهتم بـ ${options.productName}. هل يمكنكم تقديم المزيد من التفاصيل؟`
        : "مرحباً! أنا مهتم بهذا المنتج. هل يمكنكم تقديم المزيد من التفاصيل؟",
      live_chat: "مرحباً! كنت أتحدث على موقعكم وأود المتابعة هنا.",
      other: "مرحباً! أنا مهتم بمعدات الملاعب الخاصة بكم.",
    },
    es: {
      floating_cta: "¡Hola! Estoy interesado en sus equipos de parques infantiles. ¿Pueden ayudarme?",
      floating_mascot: "¡Hola! Me gustaría saber más sobre sus productos.",
      header: "¡Hola! Estoy navegando por su sitio web y tengo algunas preguntas.",
      footer: "¡Hola! Encontré su empresa en línea y me gustaría más información.",
      mobile_nav: "¡Hola! Estoy interesado en sus soluciones para parques infantiles.",
      cta_banner: "¡Hola! Me gustaría obtener un presupuesto gratuito para mi proyecto.",
      process_cta: "¡Hola! Me interesa conocer su proceso de producción.",
      projects_cta: "¡Hola! Vi sus proyectos y me gustaría discutir el mío.",
      contact_section: "¡Hola! Me gustaría solicitar un presupuesto para equipos de parques infantiles.",
      product_detail: options?.productName 
        ? `¡Hola! Estoy interesado en ${options.productName}. ¿Pueden darme más detalles?`
        : "¡Hola! Estoy interesado en este producto. ¿Pueden darme más detalles?",
      live_chat: "¡Hola! Estaba chateando en su sitio web y me gustaría continuar aquí.",
      other: "¡Hola! Estoy interesado en sus equipos de parques infantiles.",
    },
    de: {
      floating_cta: "Hallo! Ich interessiere mich für Ihre Spielplatzgeräte. Können Sie mir helfen?",
      floating_mascot: "Hallo! Ich möchte mehr über Ihre Produkte erfahren.",
      header: "Hallo! Ich schaue mir Ihre Website an und habe einige Fragen.",
      footer: "Hallo! Ich habe Ihr Unternehmen online gefunden und hätte gerne mehr Informationen.",
      mobile_nav: "Hallo! Ich interessiere mich für Ihre Spielplatzlösungen.",
      cta_banner: "Hallo! Ich möchte ein kostenloses Angebot für mein Projekt erhalten.",
      process_cta: "Hallo! Ich interessiere mich für Ihren Produktionsprozess.",
      projects_cta: "Hallo! Ich habe Ihre Projekte gesehen und möchte mein eigenes Projekt besprechen.",
      contact_section: "Hallo! Ich möchte ein Angebot für Spielplatzgeräte anfordern.",
      product_detail: options?.productName 
        ? `Hallo! Ich interessiere mich für ${options.productName}. Können Sie mir mehr Details geben?`
        : "Hallo! Ich interessiere mich für dieses Produkt. Können Sie mir mehr Details geben?",
      live_chat: "Hallo! Ich habe auf Ihrer Website gechattet und möchte hier fortfahren.",
      other: "Hallo! Ich interessiere mich für Ihre Spielplatzgeräte.",
    },
    pt: {
      floating_cta: "Olá! Estou interessado em seus equipamentos de playground. Podem me ajudar?",
      floating_mascot: "Olá! Gostaria de saber mais sobre seus produtos.",
      header: "Olá! Estou navegando em seu site e tenho algumas perguntas.",
      footer: "Olá! Encontrei sua empresa online e gostaria de mais informações.",
      mobile_nav: "Olá! Estou interessado em suas soluções para playgrounds.",
      cta_banner: "Olá! Gostaria de obter um orçamento gratuito para meu projeto.",
      process_cta: "Olá! Estou interessado em conhecer seu processo de produção.",
      projects_cta: "Olá! Vi seus projetos e gostaria de discutir o meu próprio projeto.",
      contact_section: "Olá! Gostaria de solicitar um orçamento para equipamentos de playground.",
      product_detail: options?.productName 
        ? `Olá! Estou interessado em ${options.productName}. Podem fornecer mais detalhes?`
        : "Olá! Estou interessado neste produto. Podem fornecer mais detalhes?",
      live_chat: "Olá! Estava conversando em seu site e gostaria de continuar aqui.",
      other: "Olá! Estou interessado em seus equipamentos de playground.",
    },
  };

  // Map language codes to supported languages
  const langMap: Record<string, string> = {
    en: "en",
    zh: "zh",
    "zh-CN": "zh",
    "zh-TW": "zh",
    ar: "ar",
    es: "es",
    de: "de",
    pt: "pt",
  };

  const lang = langMap[language] || "en";
  const langMessages = messages[lang] || messages.en;
  
  return langMessages[source] || langMessages.other;
};

// Build WhatsApp URL with optional pre-filled message
const buildWhatsAppUrl = (
  source: WhatsAppClickSource,
  language: string,
  options?: TrackingOptions
): string => {
  const message = getPrefilledMessage(source, language, options);
  const encodedMessage = encodeURIComponent(message);
  return `${WHATSAPP_BASE_URL}${WHATSAPP_NUMBER}?text=${encodedMessage}`;
};

// Legacy URL without message (for backwards compatibility)
const WHATSAPP_URL = `${WHATSAPP_BASE_URL}${WHATSAPP_NUMBER}`;

export const useWhatsAppTracking = () => {
  const { i18n } = useTranslation();

  const trackClick = useCallback(async (
    source: WhatsAppClickSource,
    options?: TrackingOptions
  ) => {
    try {
      // Get session ID from localStorage if exists
      const sessionId = localStorage.getItem("chat_session_id") || null;
      
      const metadata: Json = (options?.metadata as Json) || {};
      
      const { error } = await supabase.from("whatsapp_clicks").insert([{
        source,
        page_url: window.location.href,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
        language: i18n.language,
        session_id: sessionId,
        metadata,
      }]);
      
      if (error) {
        console.error("Failed to track WhatsApp click:", error);
      }
    } catch (error) {
      // Silently fail - don't block user action for tracking
      console.error("Failed to track WhatsApp click:", error);
    }
  }, [i18n.language]);

  const openWhatsApp = useCallback((
    source: WhatsAppClickSource,
    options?: TrackingOptions
  ) => {
    // Track the click (fire and forget)
    trackClick(source, options);
    
    // Build URL with pre-filled message
    const url = buildWhatsAppUrl(source, i18n.language, options);
    
    // Use location.href to avoid iframe blocking issues
    // This navigates the current page, but WhatsApp will open in app/new tab automatically
    window.location.href = url;
  }, [trackClick, i18n.language]);

  const getWhatsAppUrl = useCallback((
    source?: WhatsAppClickSource,
    options?: TrackingOptions
  ) => {
    if (source) {
      return buildWhatsAppUrl(source, i18n.language, options);
    }
    return WHATSAPP_URL;
  }, [i18n.language]);

  const trackAndNavigate = useCallback((
    source: WhatsAppClickSource,
    options?: TrackingOptions
  ) => {
    // For <a> tags, just track and let the link work normally
    trackClick(source, options);
  }, [trackClick]);

  return {
    openWhatsApp,
    trackClick,
    trackAndNavigate,
    getWhatsAppUrl,
    WHATSAPP_URL,
  };
};

export { WHATSAPP_URL };
