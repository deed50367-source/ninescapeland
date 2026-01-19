import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import mascotWelcome from "@/assets/mascot-welcome.png";

export const AboutMascotIntro = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Mascot with floating animation */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex-shrink-0 relative"
          >
            {/* Decorative circles behind mascot */}
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -inset-8 bg-primary/10 rounded-full blur-2xl"
            />
            <motion.div
              animate={{ 
                scale: [1.1, 1, 1.1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -inset-12 bg-accent/10 rounded-full blur-3xl"
            />
            
            {/* Floating mascot */}
            <motion.img
              src={mascotWelcome}
              alt="NinescapeLand Mascot"
              className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 object-contain drop-shadow-2xl"
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, 2, -2, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Sparkle effects */}
            <motion.div
              animate={{ 
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                delay: 0
              }}
              className="absolute top-4 right-4 w-3 h-3 bg-primary rounded-full"
            />
            <motion.div
              animate={{ 
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                delay: 0.7
              }}
              className="absolute bottom-8 left-0 w-2 h-2 bg-accent rounded-full"
            />
            <motion.div
              animate={{ 
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                delay: 1.4
              }}
              className="absolute top-1/2 right-0 w-2 h-2 bg-primary rounded-full"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex-1 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6"
            >
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-primary font-medium text-sm">
                {t("aboutMascot.badge", "欢迎来到 NinescapeLand")}
              </span>
            </motion.div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {t("aboutMascot.title", "认识我们的小伙伴")}
              <span className="block text-primary mt-2">
                {t("aboutMascot.titleHighlight", "Nini")}
              </span>
            </h2>
            
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
              {t("aboutMascot.description", "Nini 是我们的品牌形象大使，代表着快乐、创意与无限可能。她将陪伴您了解我们的产品和服务，为您的游乐场项目提供专业指导。")}
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 px-5 py-3 bg-card rounded-xl shadow-soft"
              >
                <span className="text-2xl">🎢</span>
                <span className="font-medium">{t("aboutMascot.feature1", "专业设计")}</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 px-5 py-3 bg-card rounded-xl shadow-soft"
              >
                <span className="text-2xl">🛡️</span>
                <span className="font-medium">{t("aboutMascot.feature2", "安全认证")}</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 px-5 py-3 bg-card rounded-xl shadow-soft"
              >
                <span className="text-2xl">🌍</span>
                <span className="font-medium">{t("aboutMascot.feature3", "全球服务")}</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
