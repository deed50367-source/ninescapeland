import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { MapPin, CheckCircle } from "lucide-react";

export const ProjectsMapSection = () => {
  const { t } = useTranslation();

  const regions = [
    {
      name: t("projectsMap.regions.northAmerica.name"),
      countries: t("projectsMap.regions.northAmerica.countries"),
      projects: "450+",
      flag: "🇺🇸",
    },
    {
      name: t("projectsMap.regions.europe.name"),
      countries: t("projectsMap.regions.europe.countries"),
      projects: "380+",
      flag: "🇪🇺",
    },
    {
      name: t("projectsMap.regions.middleEast.name"),
      countries: t("projectsMap.regions.middleEast.countries"),
      projects: "320+",
      flag: "🇦🇪",
    },
    {
      name: t("projectsMap.regions.asiaPacific.name"),
      countries: t("projectsMap.regions.asiaPacific.countries"),
      projects: "500+",
      flag: "🇦🇺",
    },
    {
      name: t("projectsMap.regions.latinAmerica.name"),
      countries: t("projectsMap.regions.latinAmerica.countries"),
      projects: "200+",
      flag: "🇧🇷",
    },
    {
      name: t("projectsMap.regions.africa.name"),
      countries: t("projectsMap.regions.africa.countries"),
      projects: "150+",
      flag: "🇿🇦",
    },
  ];

  const highlights = [
    t("projectsMap.highlights.item1"),
    t("projectsMap.highlights.item2"),
    t("projectsMap.highlights.item3"),
    t("projectsMap.highlights.item4"),
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
            {t("projectsMap.sectionLabel")}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mt-3 mb-4">
            {t("projectsMap.title")} <span className="text-gradient">{t("projectsMap.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            {t("projectsMap.description")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {regions.map((region, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{region.flag}</span>
                <div>
                  <h3 className="font-heading font-bold text-lg">{region.name}</h3>
                  <p className="text-sm text-muted-foreground">{region.countries}</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t">
                <span className="text-sm text-muted-foreground">{t("projectsMap.projectsLabel")}</span>
                <span className="text-xl font-bold text-primary">{region.projects}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card rounded-2xl p-6 md:p-8 shadow-soft"
        >
          <h3 className="font-heading font-bold text-xl mb-6 text-center">{t("projectsMap.highlightsTitle")}</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {highlights.map((highlight, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm">{highlight}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
