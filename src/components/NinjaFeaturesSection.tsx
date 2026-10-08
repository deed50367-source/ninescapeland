import { motion } from "framer-motion";
import { Mountain, Target, Users, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";

const featureKeys = [
  { key: "highAltitude", icon: Mountain, color: "bg-secondary text-primary" },
  { key: "adventureObstacles", icon: Target, color: "bg-secondary text-primary" },
  { key: "teamBuilding", icon: Users, color: "bg-secondary text-primary" },
  { key: "physicalDevelopment", icon: Zap, color: "bg-secondary text-primary" },
] as const;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const NinjaFeaturesSection = () => {
  const { t } = useTranslation();

  return (
    <section id="ninja-features" className="section-padding bg-muted/50">
      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            {t("ninjaFeatures.sectionLabel")}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-3 mb-6">
            {t("ninjaFeatures.title")} <span className="text-gradient">{t("ninjaFeatures.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            {t("ninjaFeatures.description")}
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {featureKeys.map((feature) => (
            <motion.div
              key={feature.key}
              variants={item}
              className="group relative bg-card rounded-lg p-8 border border-border hover:shadow-soft transition-all duration-300 text-center"
            >
              {/* Icon */}
              <div className={`w-16 h-16 mx-auto mb-6 rounded-lg ${feature.color} flex items-center justify-center `}>
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-heading font-bold mb-3">{t(`ninjaFeatures.features.${feature.key}.title`)}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t(`ninjaFeatures.features.${feature.key}.description`)}
              </p>

            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: "50+", labelKey: "obstacleTypes" },
            { value: t("ninjaFeatures.stats.custom"), labelKey: "layoutDesign" },
            { value: t("ninjaFeatures.stats.allAges"), labelKey: "suitableFor" },
            { value: "3D", labelKey: "designRendering" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl md:text-4xl font-heading font-bold text-primary mb-2">
                {stat.value}
              </p>
              <p className="text-muted-foreground">{t(`ninjaFeatures.stats.${stat.labelKey}`)}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};