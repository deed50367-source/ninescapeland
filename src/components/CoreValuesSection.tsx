import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Shield, Lightbulb, Users, Award, Heart, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import mascotThinking from "@/assets/mascot-thinking.png";

const coreValues = [
  {
    icon: Shield,
    titleKey: "coreValues.quality.title",
    descriptionKey: "coreValues.quality.description",
    color: "from-blue-500/20 to-blue-600/10",
    iconColor: "text-blue-500",
  },
  {
    icon: Lightbulb,
    titleKey: "coreValues.innovation.title",
    descriptionKey: "coreValues.innovation.description",
    color: "from-yellow-500/20 to-yellow-600/10",
    iconColor: "text-yellow-500",
  },
  {
    icon: Users,
    titleKey: "coreValues.customerFirst.title",
    descriptionKey: "coreValues.customerFirst.description",
    color: "from-green-500/20 to-green-600/10",
    iconColor: "text-green-500",
  },
  {
    icon: Award,
    titleKey: "coreValues.excellence.title",
    descriptionKey: "coreValues.excellence.description",
    color: "from-purple-500/20 to-purple-600/10",
    iconColor: "text-purple-500",
  },
  {
    icon: Heart,
    titleKey: "coreValues.integrity.title",
    descriptionKey: "coreValues.integrity.description",
    color: "from-pink-500/20 to-pink-600/10",
    iconColor: "text-pink-500",
  },
  {
    icon: Zap,
    titleKey: "coreValues.efficiency.title",
    descriptionKey: "coreValues.efficiency.description",
    color: "from-orange-500/20 to-orange-600/10",
    iconColor: "text-orange-500",
  },
];

export const CoreValuesSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-muted/30 via-background to-muted/30 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left side - Content */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center lg:text-left mb-12"
            >
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                {t("coreValues.sectionLabel", "核心价值")}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {t("coreValues.title")}{" "}
                <span className="text-primary">{t("coreValues.titleHighlight")}</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-lg">
                {t("coreValues.description")}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {coreValues.map((value, index) => (
                <motion.div
                  key={value.titleKey}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-none bg-card group overflow-hidden">
                    <CardContent className="p-5 md:p-6 relative">
                      <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                      <div className="relative flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center flex-shrink-0`}>
                          <value.icon className={`w-6 h-6 ${value.iconColor}`} />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-1.5">
                            {t(value.titleKey)}
                          </h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {t(value.descriptionKey)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right side - Mascot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="hidden lg:block flex-shrink-0 relative"
          >
            {/* Decorative elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-8 border-2 border-dashed border-primary/20 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-16 border border-dashed border-accent/15 rounded-full"
            />
            
            {/* Floating mascot */}
            <motion.img
              src={mascotThinking}
              alt="NinescapeLand Mascot Thinking"
              className="w-64 h-64 xl:w-80 xl:h-80 object-contain relative z-10 drop-shadow-xl"
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Floating icons */}
            <motion.div
              animate={{ y: [0, -8, 0], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0 }}
              className="absolute top-0 right-0 p-3 bg-yellow-100 rounded-xl shadow-lg"
            >
              <Lightbulb className="w-5 h-5 text-yellow-500" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -8, 0], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="absolute bottom-16 left-0 p-3 bg-blue-100 rounded-xl shadow-lg"
            >
              <Shield className="w-5 h-5 text-blue-500" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -8, 0], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="absolute top-1/2 -right-8 p-3 bg-green-100 rounded-xl shadow-lg"
            >
              <Heart className="w-5 h-5 text-green-500" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
