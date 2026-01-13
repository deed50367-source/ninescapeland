import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useRTL } from "@/hooks/useRTL";

interface PageHeroProps {
  titleKey: string;
  titleHighlightKey: string;
  descriptionKey: string;
  backgroundImage?: string;
}

export const PageHero = ({ 
  titleKey, 
  titleHighlightKey, 
  descriptionKey,
  backgroundImage 
}: PageHeroProps) => {
  const { t } = useTranslation();
  const { isRTL } = useRTL();

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      {backgroundImage ? (
        <div className="absolute inset-0">
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 ${isRTL ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-primary/95 via-primary/85 to-primary/70`} />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/90" />
      )}
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="container-wide relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground leading-tight mb-6"
          >
            {t(titleKey)}
            <span className="block text-accent mt-2">{t(titleHighlightKey)}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto"
          >
            {t(descriptionKey)}
          </motion.p>
        </div>
      </div>
    </section>
  );
};
