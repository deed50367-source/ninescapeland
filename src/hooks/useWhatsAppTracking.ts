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
}

const WHATSAPP_URL = "https://wa.me/8615058782901";

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
    
    // Open WhatsApp
    window.open(WHATSAPP_URL, "_blank");
  }, [trackClick]);

  const getWhatsAppUrl = useCallback(() => WHATSAPP_URL, []);

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
