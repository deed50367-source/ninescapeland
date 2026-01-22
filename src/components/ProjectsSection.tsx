import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { useRTL } from "@/hooks/useRTL";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { productImages, projectImages } from "@/config/galleryImages";

const projects = [
  {
    id: 1,
    title: "Adventure Zone Family Center",
    location: "California, USA",
    type: "Indoor Playground",
    size: "5,000 sqm",
    image: productImages.indoorPlayground,
  },
  {
    id: 2,
    title: "Sky Jump Trampoline Park",
    location: "Dubai, UAE",
    type: "Trampoline Park",
    size: "3,500 sqm",
    image: productImages.trampolinePark,
  },
  {
    id: 3,
    title: "Ninja Warriors Academy",
    location: "London, UK",
    type: "Ninja Course",
    size: "2,000 sqm",
    image: productImages.ninjaCourse,
  },
  {
    id: 4,
    title: "Little Stars Play Center",
    location: "Sydney, Australia",
    type: "Soft Play",
    size: "800 sqm",
    image: projectImages.indoorProject, // 使用不同的局部图
  },
  {
    id: 5,
    title: "Fun Galaxy FEC",
    location: "Toronto, Canada",
    type: "Indoor Playground",
    size: "4,200 sqm",
    image: projectImages.fecCenter, // 保持淘气堡局部图
  },
  {
    id: 6,
    title: "Bounce Kingdom",
    location: "Singapore",
    type: "Trampoline Park",
    size: "2,800 sqm",
    image: projectImages.bouncePark,
  },
];

const categories = ["All", "Indoor Playground", "Trampoline Park", "Ninja Course", "Soft Play"];

export const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const { t } = useTranslation();
  const { isRTL } = useRTL();
  const { localizedPath } = useLocalizedPath();

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const categories = [
    { key: "All", label: t("projects.categories.all") },
    { key: "Indoor Playground", label: t("projects.categories.indoorPlayground") },
    { key: "Trampoline Park", label: t("projects.categories.trampolinePark") },
    { key: "Ninja Course", label: t("projects.categories.ninjaCourse") },
    { key: "Soft Play", label: t("projects.categories.softPlay") },
  ];

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.type === activeCategory);

  return (
    <section id="projects" className="section-padding bg-background">
      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            {t("projects.sectionLabel")}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-3 mb-6">
            {t("projects.title")} <span className="text-gradient">{t("projects.titleHighlight")}</span> {t("projects.subtitle")}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t("projects.description")}
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setActiveCategory(category.key)}
              className={`px-5 py-2 rounded-full font-medium text-sm transition-all ${
                activeCategory === category.key
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "bg-muted text-muted-foreground hover:bg-secondary"
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-semibold">
                      {project.type}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-heading font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                    <MapPin className="w-4 h-4" />
                    {project.location}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {t("projects.size")}: <span className="font-semibold text-foreground">{project.size}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="hero" size="lg" asChild>
            <a href={localizedPath("/contact")} className="group">
              {t("projects.cta")}
              <ArrowIcon className={`w-5 h-5 transition-transform ${isRTL ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
