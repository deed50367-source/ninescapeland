import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { CheckCircle, Clock, Shield, Award, Headphones, Package } from "lucide-react";
import { useRTL } from "@/hooks/useRTL";

export const ProcessDetailSection = () => {
  const { t } = useTranslation();
  const { isRTL } = useRTL();

  const details = [
    {
      icon: CheckCircle,
      title: t("processDetail.consultation.title"),
      description: t("processDetail.consultation.description"),
      features: [
        t("processDetail.consultation.feature1"),
        t("processDetail.consultation.feature2"),
        t("processDetail.consultation.feature3"),
        t("processDetail.consultation.feature4"),
      ],
    },
    {
      icon: Award,
      title: t("processDetail.design.title"),
      description: t("processDetail.design.description"),
      features: [
        t("processDetail.design.feature1"),
        t("processDetail.design.feature2"),
        t("processDetail.design.feature3"),
        t("processDetail.design.feature4"),
      ],
    },
    {
      icon: Package,
      title: t("processDetail.manufacturing.title"),
      description: t("processDetail.manufacturing.description"),
      features: [
        t("processDetail.manufacturing.feature1"),
        t("processDetail.manufacturing.feature2"),
        t("processDetail.manufacturing.feature3"),
        t("processDetail.manufacturing.feature4"),
      ],
    },
  ];

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            {t("processDetail.sectionLabel")}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mt-3 mb-4">
            {t("processDetail.title")} <span className="text-gradient">{t("processDetail.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            {t("processDetail.description")}
          </p>
        </motion.div>

        <div className="space-y-8">
          {details.map((detail, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-6 lg:gap-10 items-center`}
            >
              <div className="flex-1 w-full">
                <div className="bg-card rounded-2xl p-6 md:p-8 shadow-soft h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl hero-gradient flex items-center justify-center flex-shrink-0">
                      <detail.icon className="w-6 h-6 text-accent-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-heading font-bold mb-2">{detail.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{detail.description}</p>
                    </div>
                  </div>
                  <ul className="grid sm:grid-cols-2 gap-3 mt-6">
                    {detail.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center gap-2 text-sm text-foreground">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
