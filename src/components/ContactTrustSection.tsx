import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Shield, Award, Globe, Truck, HeartHandshake, Clock } from "lucide-react";

const trustItems = [
  {
    icon: Shield,
    titleKey: "contact.trust.safe.title",
    descKey: "contact.trust.safe.desc",
    defaultTitle: "100% Safe & Certified",
    defaultDesc: "All products meet international safety standards",
  },
  {
    icon: Award,
    titleKey: "contact.trust.quality.title",
    descKey: "contact.trust.quality.desc",
    defaultTitle: "Premium Quality",
    defaultDesc: "10+ years manufacturing experience",
  },
  {
    icon: Globe,
    titleKey: "contact.trust.global.title",
    descKey: "contact.trust.global.desc",
    defaultTitle: "Global Delivery",
    defaultDesc: "Shipped to 80+ countries worldwide",
  },
  {
    icon: Truck,
    titleKey: "contact.trust.shipping.title",
    descKey: "contact.trust.shipping.desc",
    defaultTitle: "Fast Shipping",
    defaultDesc: "Efficient logistics & installation support",
  },
  {
    icon: HeartHandshake,
    titleKey: "contact.trust.support.title",
    descKey: "contact.trust.support.desc",
    defaultTitle: "Dedicated Support",
    defaultDesc: "Personal project manager for every client",
  },
  {
    icon: Clock,
    titleKey: "contact.trust.response.title",
    descKey: "contact.trust.response.desc",
    defaultTitle: "Quick Response",
    defaultDesc: "Reply within 24 hours guaranteed",
  },
];

export const ContactTrustSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-12 md:py-16 bg-muted/50">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-3">
            {t("contact.trust.title", "Why Choose Us?")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("contact.trust.subtitle", "Trusted by 500+ clients worldwide for quality and reliability")}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {trustItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-card p-4 md:p-6 rounded-xl text-center hover:shadow-soft transition-shadow duration-300"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <item.icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-sm md:text-base mb-1">
                {t(item.titleKey, item.defaultTitle)}
              </h3>
              <p className="text-muted-foreground text-xs md:text-sm">
                {t(item.descKey, item.defaultDesc)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};