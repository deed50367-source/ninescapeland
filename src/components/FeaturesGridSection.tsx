import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { 
  Palette, 
  Shield, 
  Truck, 
  Wrench, 
  HeadphonesIcon, 
  Clock,
  BadgeCheck,
  Sparkles
} from "lucide-react";

const features = [
  { icon: Palette, key: "featuresGrid.customDesign" },
  { icon: Shield, key: "featuresGrid.safetyCertified" },
  { icon: Truck, key: "featuresGrid.globalShipping" },
  { icon: Wrench, key: "featuresGrid.installation" },
  { icon: HeadphonesIcon, key: "featuresGrid.support" },
  { icon: Clock, key: "featuresGrid.fastDelivery" },
  { icon: BadgeCheck, key: "featuresGrid.warranty" },
  { icon: Sparkles, key: "featuresGrid.premiumMaterials" },
];

export const FeaturesGridSection = () => {
  const { t } = useTranslation();

  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            {t("featuresGrid.sectionLabel")}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mt-3 mb-4">
            {t("featuresGrid.title")}{" "}
            <span className="text-gradient">{t("featuresGrid.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            {t("featuresGrid.description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group relative overflow-hidden"
            >
              <div className="bg-card rounded-2xl p-5 md:p-6 text-center shadow-soft hover:shadow-medium transition-all duration-300 h-full border border-transparent hover:border-primary/20">
                <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-sm md:text-base mb-2">
                  {t(`${feature.key}.title`)}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  {t(`${feature.key}.description`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
