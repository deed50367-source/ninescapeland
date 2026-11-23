import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { useRTL } from "@/hooks/useRTL";
import { useSiteImages } from "@/hooks/useSiteImages";
import { HeroEquipmentVideo } from "@/components/HeroEquipmentVideo";

export const HeroSection = () => {
  const { t } = useTranslation();
  const { isRTL } = useRTL();
  const { getOptimizedImageUrl } = useSiteImages();

  const benefits = [
    t("hero.benefits.customDesign"),
    t("hero.benefits.certified"),
    t("hero.benefits.globalShipping"),
    t("hero.benefits.warranty"),
  ];

  // Choose the correct arrow based on RTL
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section id="home" className="home-hero relative min-h-[720px] flex items-center bg-background overflow-hidden">
      {/* Animated Background Image */}
      <div className="absolute inset-0">
        {/* Main background with slow zoom animation */}
        <motion.div
          className="absolute inset-0"

        >
          <img
            src={getOptimizedImageUrl("product.indoorPlayground", { width: 1440, quality: 80 })}
            srcSet={[
              `${getOptimizedImageUrl("product.indoorPlayground", { width: 640, quality: 75 })} 640w`,
              `${getOptimizedImageUrl("product.indoorPlayground", { width: 960, quality: 78 })} 960w`,
              `${getOptimizedImageUrl("product.indoorPlayground", { width: 1280, quality: 80 })} 1280w`,
              `${getOptimizedImageUrl("product.indoorPlayground", { width: 1440, quality: 80 })} 1440w`,
            ].join(", ")}
            sizes="100vw"
            alt="Custom Commercial Indoor Playground Equipment by NinescapeLand"
            className="home-hero-image w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
            decoding="sync"
            width="1440"
            height="810"
          />
        </motion.div>
        
        <HeroEquipmentVideo />
        <div className="absolute inset-0 home-hero-overlay pointer-events-none" />
      </div>


      {/* Content */}
      <div className="container-wide relative z-10 py-12 sm:py-16 lg:py-20">
        <div className="home-hero-copy max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="home-hero-entry inline-block text-primary text-xs sm:text-sm font-semibold mb-4 sm:mb-6"
          >
            {t("hero.badge")}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="home-hero-entry text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground leading-tight mb-4 sm:mb-6"
          >
            {t("hero.title")}{" "}
            <span className="block text-primary">{t("hero.titleHighlight")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="home-hero-entry text-sm sm:text-base leading-relaxed text-foreground mb-4 sm:mb-6 max-w-2xl"
          >
            {t("hero.description")}
          </motion.p>

          {/* Keyword-emphasized SEO line (semantic <strong> for topical relevance) */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-xs sm:text-sm md:text-base text-muted-foreground mb-6 sm:mb-8 max-w-2xl leading-relaxed"
          >
            <strong className="text-foreground font-semibold">Custom indoor playground equipment manufacturer</strong> serving 50+ countries since 2008 — <strong className="text-foreground font-semibold">ASTM &amp; TUV certified</strong> commercial-grade play structures, trampoline parks, ninja courses and soft play systems shipped worldwide.
          </motion.p>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-2 sm:gap-4 mb-6 sm:mb-10"
          >
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-1.5 sm:gap-2 text-foreground"
              >
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium">{benefit}</span>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="home-hero-entry flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <motion.div
            >
              <Button variant="hero" size="lg" className="w-full sm:w-auto sm:h-14 sm:px-8 sm:text-base" asChild>
                <a href="#contact" className="group">
                  {t("hero.cta.getQuote")}
                  <ArrowIcon className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform ${isRTL ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
                </a>
              </Button>
            </motion.div>
            <Button variant="outline" size="lg" className="sm:h-12 sm:px-8 sm:text-base lg:h-14 lg:px-10 lg:text-lg" asChild>
              <a href="#products">{t("hero.cta.viewProducts")}</a>
            </Button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border"
          >
            <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4">{t("hero.trustedCertifications")}</p>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 lg:gap-6">
              {["ISO 9001", "CE", "TUV", "ASTM", "IAAPA Member"].map((cert, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1.5 sm:px-4 sm:py-2 bg-muted rounded-md text-foreground font-semibold text-xs sm:text-sm"
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
