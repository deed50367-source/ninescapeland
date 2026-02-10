import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { useRTL } from "@/hooks/useRTL";
import { useSiteImages } from "@/hooks/useSiteImages";

import productIndoorPlayground from "@/assets/product-indoor-playground.jpg";
import productTrampolinePark from "@/assets/product-trampoline-park.jpg";
import productNinjaCourse from "@/assets/product-ninja-course.jpg";
import productSoftPlay from "@/assets/product-soft-play.jpg";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const CoreSolutionsSection = () => {
  const { t } = useTranslation();
  const { localizedPath } = useLocalizedPath();
  const { isRTL } = useRTL();
  const { getImageUrl } = useSiteImages();

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const solutions = [
    {
      title: t("coreSolutions.indoorPlayground.title", "Indoor Playground"),
      description: t("coreSolutions.indoorPlayground.description", "Multi-level custom play structures with slides, ball pits, and climbing nets for all ages."),
      image: getImageUrl("product.indoorPlayground") || productIndoorPlayground,
      link: "products/indoor-playground",
    },
    {
      title: t("coreSolutions.trampolinePark.title", "Trampoline Park"),
      description: t("coreSolutions.trampolinePark.description", "Commercial trampoline systems with 12+ activity zones including foam pits and slam dunk areas."),
      image: getImageUrl("product.trampolinePark") || productTrampolinePark,
      link: "products/trampoline-park",
    },
    {
      title: t("coreSolutions.ninjaCourse.title", "Ninja Course"),
      description: t("coreSolutions.ninjaCourse.description", "Challenging obstacle courses with warped walls, monkey bars, and balance elements for all skill levels."),
      image: getImageUrl("product.ninjaCourse") || productNinjaCourse,
      link: "products/ninja-course",
    },
    {
      title: t("coreSolutions.softPlay.title", "Soft Play"),
      description: t("coreSolutions.softPlay.description", "Safe, padded play environments designed specifically for toddlers and young children."),
      image: getImageUrl("product.softPlay") || productSoftPlay,
      link: "products/soft-play",
    },
  ];

  return (
    <section className="section-padding bg-muted/50">
      <div className="container-wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
        >
          <span className="text-accent font-semibold text-xs sm:text-sm uppercase tracking-wider">
            {t("coreSolutions.sectionLabel", "What We Build")}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-2 mb-4">
            {t("coreSolutions.title", "Our Core")}{" "}
            <span className="text-gradient">{t("coreSolutions.titleHighlight", "Solutions")}</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">
            {t("coreSolutions.subtitle", "Turnkey entertainment equipment trusted by 2,000+ venues worldwide.")}
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {solutions.map((solution, index) => (
            <motion.div key={index} variants={item}>
              <Link
                to={localizedPath(solution.link)}
                className="group block bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 h-full"
              >
                {/* Image */}
                <div className="relative h-44 sm:h-48 overflow-hidden">
                  <img
                    src={solution.image}
                    alt={solution.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5">
                  <h3 className="text-base sm:text-lg font-heading font-bold mb-1.5 group-hover:text-primary transition-colors">
                    {solution.title}
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm mb-3 line-clamp-2">
                    {solution.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-primary font-semibold text-xs sm:text-sm">
                    {t("coreSolutions.learnMore", "Learn More")}
                    <ArrowIcon className={`w-3.5 h-3.5 transition-transform ${isRTL ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
