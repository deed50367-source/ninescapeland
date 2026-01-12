import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { useRTL } from "@/hooks/useRTL";
import heroImage from "@/assets/hero-playground.jpg";

export const HeroSection = () => {
  const { t } = useTranslation();
  const { isRTL } = useRTL();

  const benefits = [
    t("hero.benefits.customDesign"),
    t("hero.benefits.certified"),
    t("hero.benefits.globalShipping"),
    t("hero.benefits.warranty"),
  ];

  // Choose the correct arrow based on RTL
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Indoor Playground Equipment Manufacturer"
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 ${isRTL ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-primary/95 via-primary/80 to-primary/40`} />
      </div>

      {/* Content */}
      <div className="container-wide relative z-10 py-20 md:py-32">
        <div className="max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-2 bg-accent/20 text-accent-foreground rounded-full text-sm font-semibold mb-6 border border-accent-foreground/20"
          >
            {t("hero.badge")}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground leading-tight mb-6"
          >
            {t("hero.title")}
            <span className="block text-accent">{t("hero.titleHighlight")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl"
          >
            {t("hero.description")}
          </motion.p>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 mb-10"
          >
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-primary-foreground/90"
              >
                <CheckCircle className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium">{benefit}</span>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button variant="hero" size="xl" asChild>
              <a href="#contact" className="group">
                {t("hero.cta.getQuote")}
                <ArrowIcon className={`w-5 h-5 transition-transform ${isRTL ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
              </a>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <a href="#products">{t("hero.cta.viewProducts")}</a>
            </Button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 pt-8 border-t border-primary-foreground/20"
          >
            <p className="text-primary-foreground/60 text-sm mb-4">{t("hero.trustedCertifications")}</p>
            <div className="flex flex-wrap items-center gap-6">
              {["ISO 9001", "CE", "TUV", "ASTM", "IAAPA Member"].map((cert, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-primary-foreground/10 rounded-lg text-primary-foreground font-semibold text-sm"
                >
                  {cert}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
