import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { useNavigate } from "react-router-dom";
import { useWhatsAppTracking } from "@/hooks/useWhatsAppTracking";

export const ProcessCTASection = () => {
  const { t } = useTranslation();
  const { localizedPath } = useLocalizedPath();
  const navigate = useNavigate();
  const { openWhatsApp } = useWhatsAppTracking();

  return (
    <section className="section-padding bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mb-4">
            {t("processCTA.title")} <span className="text-gradient">{t("processCTA.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg mb-8 max-w-2xl mx-auto">
            {t("processCTA.description")}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Button
              size="lg"
              className="hero-gradient text-accent-foreground font-semibold group"
              onClick={() => navigate(localizedPath("/contact"))}
            >
              {t("processCTA.getQuote")}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="group"
              onClick={() => openWhatsApp("process_cta")}
            >
              <MessageCircle className="mr-2 w-5 h-5" />
              {t("processCTA.whatsapp")}
            </Button>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 mt-10">
            <div className="text-center p-4">
              <div className="text-3xl font-heading font-bold text-primary mb-1">24h</div>
              <div className="text-sm text-muted-foreground">{t("processCTA.response")}</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-heading font-bold text-primary mb-1">Free</div>
              <div className="text-sm text-muted-foreground">{t("processCTA.design")}</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-heading font-bold text-primary mb-1">50+</div>
              <div className="text-sm text-muted-foreground">{t("processCTA.countries")}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
