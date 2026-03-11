import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Palette, Factory, Globe, Lightbulb, ShieldCheck, TrendingUp } from "lucide-react";

export const ProductWhyChooseUs = () => {
  const { t } = useTranslation();

  const reasons = [
    {
      icon: Palette,
      title: t("dynamicProduct.why.customDesign", "100% Custom Design"),
      desc: t("dynamicProduct.why.customDesignDesc", "Every project is uniquely designed to match your venue size, theme, and target demographics. Our in-house design team creates stunning 3D renderings before production begins."),
    },
    {
      icon: Factory,
      title: t("dynamicProduct.why.ownFactory", "Own 20,000m² Factory"),
      desc: t("dynamicProduct.why.ownFactoryDesc", "Direct factory pricing with no middlemen. Our vertically integrated manufacturing ensures quality control from raw materials to finished installation."),
    },
    {
      icon: Globe,
      title: t("dynamicProduct.why.global", "500+ Projects in 60+ Countries"),
      desc: t("dynamicProduct.why.globalDesc", "Trusted by operators worldwide from the USA to the Middle East, Europe to Southeast Asia. Our experience spans diverse markets and regulations."),
    },
    {
      icon: Lightbulb,
      title: t("dynamicProduct.why.turnkey", "Turnkey Solutions"),
      desc: t("dynamicProduct.why.turnkeyDesc", "From initial concept and venue planning to equipment manufacturing, shipping, and installation — we handle the entire process so you can focus on your business."),
    },
    {
      icon: ShieldCheck,
      title: t("dynamicProduct.why.safety", "Safety First Approach"),
      desc: t("dynamicProduct.why.safetyDesc", "All products comply with international safety standards including ASTM F1918, EN1176, and TUV certifications. Safety is non-negotiable in our design philosophy."),
    },
    {
      icon: TrendingUp,
      title: t("dynamicProduct.why.roi", "Maximize Your ROI"),
      desc: t("dynamicProduct.why.roiDesc", "Strategic layout planning to maximize capacity and revenue per square meter. Our designs are optimized for operational efficiency and customer flow."),
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="secondary" className="mb-4">
            {t("dynamicProduct.why.badge", "Why NinescapeLand")}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("dynamicProduct.why.title", "Why Partner With Us?")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {t("dynamicProduct.why.subtitle", "We're not just equipment suppliers — we're your full-service partner in building a profitable entertainment business.")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group p-6 rounded-2xl border bg-card hover:shadow-lg hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center mb-4 transition-colors">
                <reason.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">{reason.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{reason.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
