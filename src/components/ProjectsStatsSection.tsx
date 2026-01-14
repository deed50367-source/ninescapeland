import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Globe, Users, Building2, Award, TrendingUp, MapPin } from "lucide-react";

export const ProjectsStatsSection = () => {
  const { t } = useTranslation();

  const stats = [
    {
      icon: Building2,
      value: "2,000+",
      label: t("projectsStats.projectsCompleted"),
    },
    {
      icon: Globe,
      value: "50+",
      label: t("projectsStats.countriesServed"),
    },
    {
      icon: Users,
      value: "10M+",
      label: t("projectsStats.happyVisitors"),
    },
    {
      icon: Award,
      value: "15+",
      label: t("projectsStats.yearsExperience"),
    },
    {
      icon: TrendingUp,
      value: "98%",
      label: t("projectsStats.clientSatisfaction"),
    },
    {
      icon: MapPin,
      value: "500K+",
      label: t("projectsStats.sqmInstalled"),
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
            {t("projectsStats.sectionLabel")}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mt-3 mb-4">
            {t("projectsStats.title")} <span className="text-gradient">{t("projectsStats.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            {t("projectsStats.description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-2xl p-5 text-center shadow-soft hover:shadow-medium transition-all group"
            >
              <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary transition-colors">
                <stat.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <div className="text-2xl md:text-3xl font-heading font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
