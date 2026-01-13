import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Shield, Lightbulb, Users, Award, Heart, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const coreValues = [
  {
    icon: Shield,
    titleKey: "coreValues.quality.title",
    descriptionKey: "coreValues.quality.description",
  },
  {
    icon: Lightbulb,
    titleKey: "coreValues.innovation.title",
    descriptionKey: "coreValues.innovation.description",
  },
  {
    icon: Users,
    titleKey: "coreValues.customerFirst.title",
    descriptionKey: "coreValues.customerFirst.description",
  },
  {
    icon: Award,
    titleKey: "coreValues.excellence.title",
    descriptionKey: "coreValues.excellence.description",
  },
  {
    icon: Heart,
    titleKey: "coreValues.integrity.title",
    descriptionKey: "coreValues.integrity.description",
  },
  {
    icon: Zap,
    titleKey: "coreValues.efficiency.title",
    descriptionKey: "coreValues.efficiency.description",
  },
];

export const CoreValuesSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("coreValues.title")}{" "}
            <span className="text-primary">{t("coreValues.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("coreValues.description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreValues.map((value, index) => (
            <motion.div
              key={value.titleKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-none bg-background">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {t(value.titleKey)}
                  </h3>
                  <p className="text-muted-foreground">
                    {t(value.descriptionKey)}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
