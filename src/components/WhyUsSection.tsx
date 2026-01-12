import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { 
  Shield, 
  Clock, 
  Globe2, 
  Paintbrush, 
  Award, 
  Wrench,
  Factory
} from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export const WhyUsSection = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Paintbrush,
      title: t("whyUs.features.customDesign.title"),
      description: t("whyUs.features.customDesign.description"),
    },
    {
      icon: Shield,
      title: t("whyUs.features.safetyCertified.title"),
      description: t("whyUs.features.safetyCertified.description"),
    },
    {
      icon: Globe2,
      title: t("whyUs.features.globalShipping.title"),
      description: t("whyUs.features.globalShipping.description"),
    },
    {
      icon: Wrench,
      title: t("whyUs.features.warranty.title"),
      description: t("whyUs.features.warranty.description"),
    },
    {
      icon: Clock,
      title: t("whyUs.features.support.title"),
      description: t("whyUs.features.support.description"),
    },
    {
      icon: Factory,
      title: t("whyUs.features.directFactory.title"),
      description: t("whyUs.features.directFactory.description"),
    },
  ];

  const stats = [
    { value: "15+", label: t("whyUs.stats.experience") },
    { value: "50+", label: t("whyUs.stats.countries") },
    { value: "1000+", label: t("whyUs.stats.projects") },
    { value: "200+", label: t("whyUs.stats.team") },
  ];

  return (
    <section id="why-us" className="section-padding bg-muted">
      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            {t("whyUs.sectionLabel")}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-3 mb-6">
            {t("whyUs.title")} <span className="text-gradient">{t("whyUs.titleHighlight")}</span> {t("whyUs.titleEnd")}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t("whyUs.description")}
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={item}
              className="text-center p-6 bg-card rounded-2xl shadow-soft"
            >
              <div className="text-4xl md:text-5xl font-heading font-bold text-gradient mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              className="group p-6 bg-card rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                <feature.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 bg-card rounded-2xl shadow-soft"
        >
          <div className="text-center mb-8">
            <Award className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-heading font-bold">{t("whyUs.certifications.title")}</h3>
            <p className="text-muted-foreground mt-2">
              {t("whyUs.certifications.description")}
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {[
              "ISO 9001:2015",
              "ISO 14001:2015",
              "ISO 45001:2018",
              "CE Certified",
              "TUV Certified",
              "ASTM Compliant",
              "IAAPA Member",
            ].map((cert, index) => (
              <div
                key={index}
                className="px-6 py-3 bg-muted rounded-lg font-semibold text-foreground"
              >
                {cert}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
