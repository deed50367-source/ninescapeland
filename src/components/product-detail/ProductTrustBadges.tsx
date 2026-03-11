import { motion } from "framer-motion";
import { Shield, Truck, Headphones, Award, Clock, Wrench } from "lucide-react";
import { useTranslation } from "react-i18next";

export const ProductTrustBadges = () => {
  const { t } = useTranslation();

  const badges = [
    {
      icon: Shield,
      title: t("dynamicProduct.trust.certified", "Internationally Certified"),
      desc: t("dynamicProduct.trust.certifiedDesc", "ASTM, EN1176, TUV certified for global safety standards"),
    },
    {
      icon: Truck,
      title: t("dynamicProduct.trust.shipping", "Worldwide Delivery"),
      desc: t("dynamicProduct.trust.shippingDesc", "Door-to-door shipping to 80+ countries"),
    },
    {
      icon: Headphones,
      title: t("dynamicProduct.trust.support", "Lifetime Support"),
      desc: t("dynamicProduct.trust.supportDesc", "Dedicated project manager from day one"),
    },
    {
      icon: Award,
      title: t("dynamicProduct.trust.warranty", "Up to 5-Year Warranty"),
      desc: t("dynamicProduct.trust.warrantyDesc", "Industry-leading warranty on all equipment"),
    },
    {
      icon: Clock,
      title: t("dynamicProduct.trust.leadTime", "30-45 Day Lead Time"),
      desc: t("dynamicProduct.trust.leadTimeDesc", "Fast production with strict quality control"),
    },
    {
      icon: Wrench,
      title: t("dynamicProduct.trust.installation", "Installation Guidance"),
      desc: t("dynamicProduct.trust.installationDesc", "On-site or remote installation support included"),
    },
  ];

  return (
    <section className="py-12 bg-muted/40 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {badges.map((badge, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <badge.icon className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-sm font-semibold mb-1">{badge.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{badge.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
