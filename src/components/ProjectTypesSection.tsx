import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { useNavigate } from "react-router-dom";
import { productImages } from "@/config/galleryImages";

export const ProjectTypesSection = () => {
  const { t } = useTranslation();
  const { localizedPath } = useLocalizedPath();
  const navigate = useNavigate();

  const projectTypes = [
    {
      title: t("projectTypes.items.fec.title"),
      description: t("projectTypes.items.fec.description"),
      features: [
        t("projectTypes.items.fec.feature1"),
        t("projectTypes.items.fec.feature2"),
        t("projectTypes.items.fec.feature3"),
      ],
      image: productImages.indoorPlayground,
      link: "/products/indoor-playground",
    },
    {
      title: t("projectTypes.items.trampolinePark.title"),
      description: t("projectTypes.items.trampolinePark.description"),
      features: [
        t("projectTypes.items.trampolinePark.feature1"),
        t("projectTypes.items.trampolinePark.feature2"),
        t("projectTypes.items.trampolinePark.feature3"),
      ],
      image: productImages.trampolinePark,
      link: "/products/trampoline-park",
    },
    {
      title: t("projectTypes.items.ninjaWarrior.title"),
      description: t("projectTypes.items.ninjaWarrior.description"),
      features: [
        t("projectTypes.items.ninjaWarrior.feature1"),
        t("projectTypes.items.ninjaWarrior.feature2"),
        t("projectTypes.items.ninjaWarrior.feature3"),
      ],
      image: productImages.ninjaCourse,
      link: "/products/ninja-course",
    },
    {
      title: t("projectTypes.items.softPlay.title"),
      description: t("projectTypes.items.softPlay.description"),
      features: [
        t("projectTypes.items.softPlay.feature1"),
        t("projectTypes.items.softPlay.feature2"),
        t("projectTypes.items.softPlay.feature3"),
      ],
      image: productImages.softPlay,
      link: "/products/soft-play",
    },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            {t("projectTypes.sectionLabel")}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mt-3 mb-4">
            {t("projectTypes.title")} <span className="text-gradient">{t("projectTypes.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            {t("projectTypes.description")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {projectTypes.map((type, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all group"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-2/5 h-48 md:h-auto relative overflow-hidden">
                  <img
                    src={type.image}
                    alt={type.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="md:w-3/5 p-6">
                  <h3 className="text-xl font-heading font-bold mb-2">{type.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{type.description}</p>
                  <ul className="space-y-2 mb-4">
                    {type.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(localizedPath(type.link))}
                  >
                    {t("projectTypes.learnMore")}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
