import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Shield, Clock, Award, Headphones, RefreshCw, ThumbsUp } from "lucide-react";

export const ProcessGuaranteeSection = () => {
  const { t } = useTranslation();

  const guarantees = [
    {
      icon: Shield,
      title: t("processGuarantee.quality.title"),
      description: t("processGuarantee.quality.description"),
    },
    {
      icon: Clock,
      title: t("processGuarantee.delivery.title"),
      description: t("processGuarantee.delivery.description"),
    },
    {
      icon: Award,
      title: t("processGuarantee.warranty.title"),
      description: t("processGuarantee.warranty.description"),
    },
    {
      icon: Headphones,
      title: t("processGuarantee.support.title"),
      description: t("processGuarantee.support.description"),
    },
    {
      icon: RefreshCw,
      title: t("processGuarantee.replacement.title"),
      description: t("processGuarantee.replacement.description"),
    },
    {
      icon: ThumbsUp,
      title: t("processGuarantee.satisfaction.title"),
      description: t("processGuarantee.satisfaction.description"),
    },
  ];

  return (
    <section className="section-padding bg-primary/5">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            {t("processGuarantee.sectionLabel")}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mt-3 mb-4">
            {t("processGuarantee.title")} <span className="text-gradient">{t("processGuarantee.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            {t("processGuarantee.description")}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {guarantees.map((guarantee, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all group"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                <guarantee.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="text-lg font-heading font-bold mb-2">{guarantee.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{guarantee.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
