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
          className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 lg:mb-16"
        >
          <span className="text-accent font-semibold text-xs sm:text-sm uppercase tracking-wider">
            {t("whyUs.sectionLabel")}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-2 sm:mt-3 mb-3 sm:mb-6">
            {t("whyUs.title")} <span className="text-gradient">{t("whyUs.titleHighlight")}</span> {t("whyUs.titleEnd")}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base lg:text-lg px-4 sm:px-0">
            {t("whyUs.description")}
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-8 sm:mb-12 lg:mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={item}
              className="text-center p-4 sm:p-6 bg-card rounded-xl sm:rounded-2xl shadow-soft"
            >
              <div className="text-2xl sm:text-4xl md:text-5xl font-heading font-bold text-gradient mb-1 sm:mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-xs sm:text-sm md:text-base font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              className="group p-4 sm:p-6 bg-card rounded-xl sm:rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300"
            >
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-primary transition-colors">
                <feature.icon className="w-5 h-5 sm:w-7 sm:h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="text-base sm:text-xl font-heading font-bold mb-1.5 sm:mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm sm:text-base">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 sm:mt-12 lg:mt-16 p-4 sm:p-8 bg-card rounded-xl sm:rounded-2xl shadow-soft"
        >
          <div className="text-center mb-4 sm:mb-8">
            <Award className="w-8 h-8 sm:w-12 sm:h-12 text-primary mx-auto mb-2 sm:mb-4" />
            <h3 className="text-lg sm:text-2xl font-heading font-bold">{t("whyUs.certifications.title")}</h3>
            <p className="text-muted-foreground text-sm sm:text-base mt-1 sm:mt-2">
              {t("whyUs.certifications.description")}
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 lg:gap-8">
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
                className="px-3 py-1.5 sm:px-6 sm:py-3 bg-muted rounded-lg font-semibold text-foreground text-xs sm:text-sm md:text-base"
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
