import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { useRTL } from "@/hooks/useRTL";
import { useSiteImages } from "@/hooks/useSiteImages";

export const HeroSection = () => {
  const { t } = useTranslation();
  const { isRTL } = useRTL();
  const { getImageUrl } = useSiteImages();

  const benefits = [
    t("hero.benefits.customDesign"),
    t("hero.benefits.certified"),
    t("hero.benefits.globalShipping"),
    t("hero.benefits.warranty"),
  ];

  // Choose the correct arrow based on RTL
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section id="home" className="relative min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden">
      {/* Animated Background Image */}
      <div className="absolute inset-0">
        {/* Main background with slow zoom animation */}
        <motion.div
          className="absolute inset-0"
          animate={{
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <img
            src={getImageUrl("hero.home")}
            alt="Indoor Playground Equipment Manufacturer"
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        {/* Animated light overlay - simulates moving lights */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/10"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Floating bokeh/light particles effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-accent/20 blur-xl"
              style={{
                width: `${80 + i * 40}px`,
                height: `${80 + i * 40}px`,
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 20, 0],
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 6 + i * 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.8,
              }}
            />
          ))}
        </div>
        
        {/* Subtle shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 4,
          }}
        />
        
        {/* Main gradient overlay */}
        <div className={`absolute inset-0 ${isRTL ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-primary/95 via-primary/80 to-primary/40`} />
      </div>


      {/* Content */}
      <div className="container-wide relative z-10 py-12 sm:py-16 md:py-24 lg:py-32">
        <div className="max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-accent/20 text-accent-foreground rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 border border-accent-foreground/20"
          >
            {t("hero.badge")}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-primary-foreground leading-tight mb-4 sm:mb-6"
          >
            {t("hero.title")}
            <span className="block text-accent">{t("hero.titleHighlight")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-primary-foreground/90 mb-6 sm:mb-8 max-w-2xl"
          >
            {t("hero.description")}
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
                className="flex items-center gap-1.5 sm:gap-2 text-primary-foreground/90"
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
            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <Button variant="hero" size="lg" className="sm:h-12 sm:px-8 sm:text-base lg:h-14 lg:px-10 lg:text-lg" asChild>
              <a href="#contact" className="group">
                {t("hero.cta.getQuote")}
                <ArrowIcon className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${isRTL ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
              </a>
            </Button>
            <Button variant="heroOutline" size="lg" className="sm:h-12 sm:px-8 sm:text-base lg:h-14 lg:px-10 lg:text-lg" asChild>
              <a href="#products">{t("hero.cta.viewProducts")}</a>
            </Button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-primary-foreground/20"
          >
            <p className="text-primary-foreground/60 text-xs sm:text-sm mb-3 sm:mb-4">{t("hero.trustedCertifications")}</p>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 lg:gap-6">
              {["ISO 9001", "CE", "TUV", "ASTM", "IAAPA Member"].map((cert, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1.5 sm:px-4 sm:py-2 bg-primary-foreground/10 rounded-lg text-primary-foreground font-semibold text-xs sm:text-sm"
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
