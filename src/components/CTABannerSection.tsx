import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { useRTL } from "@/hooks/useRTL";
import { useWhatsAppTracking, WHATSAPP_URL } from "@/hooks/useWhatsAppTracking";

export const CTABannerSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { localizedPath } = useLocalizedPath();
  const { isRTL } = useRTL();
  const { openWhatsApp, trackAndNavigate } = useWhatsAppTracking();

  const handleNavigateContact = () => {
    navigate(localizedPath("/contact"));
  };

  const handleWhatsApp = () => {
    openWhatsApp("cta_banner");
  };

  return (
    <section className="relative py-12 sm:py-16 md:py-24 overflow-hidden">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      {/* Animated circles - hidden on mobile for performance */}
      <motion.div
        className="absolute top-10 left-10 w-64 h-64 rounded-full bg-accent/20 blur-3xl hidden sm:block"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-white/10 blur-3xl hidden sm:block"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container-wide relative z-10">
        <div className="max-w-4xl mx-auto text-center px-2">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 rounded-full text-primary-foreground/90 text-xs sm:text-sm font-medium mb-4 sm:mb-6"
          >
            {t("ctaBanner.badge")}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-heading font-bold text-primary-foreground mb-4 sm:mb-6 leading-tight"
          >
            {t("ctaBanner.title")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-primary-foreground/80 mb-6 sm:mb-10 max-w-2xl mx-auto"
          >
            {t("ctaBanner.description")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-10"
          >
            <Button
              onClick={handleNavigateContact}
              size="lg"
              className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground shadow-glow font-bold h-12 sm:h-14 text-sm sm:text-base"
            >
              {t("ctaBanner.getQuote")}
              <ArrowRight className={`w-4 h-4 sm:w-5 sm:h-5 ${isRTL ? 'rotate-180' : ''}`} />
            </Button>
            <Button
              onClick={handleWhatsApp}
              size="lg"
              variant="heroOutline"
              className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 h-12 sm:h-14 text-sm sm:text-base"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              {t("ctaBanner.whatsapp")}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-6 md:gap-10 text-primary-foreground/70 text-xs sm:text-sm"
          >
            <a 
              href={WHATSAPP_URL}
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => trackAndNavigate("cta_banner")}
              className="flex items-center justify-center gap-2 hover:text-primary-foreground transition-colors py-2"
            >
              <Phone className="w-4 h-4" />
              <span dir="ltr">+86 150 5878 2901</span>
            </a>
            <a 
              href="mailto:sale@indoorplaygroundsolution.com"
              className="flex items-center justify-center gap-2 hover:text-primary-foreground transition-colors py-2"
            >
              <Mail className="w-4 h-4" />
              <span dir="ltr" className="truncate">sale@indoorplaygroundsolution.com</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
