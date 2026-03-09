import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Star, MapPin, Sparkles, BookOpen } from "lucide-react";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { useRTL } from "@/hooks/useRTL";
import { useSiteImages } from "@/hooks/useSiteImages";
import { productImages, projectImages } from "@/config/galleryImages";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation as useI18n } from "react-i18next";

import productIndoorPlayground from "@/assets/product-indoor-playground.jpg";
import productTrampolinePark from "@/assets/product-trampoline-park.jpg";
import productNinjaCourse from "@/assets/product-ninja-course.jpg";
import productSoftPlay from "@/assets/product-soft-play.jpg";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export const FeaturedShowcaseSection = () => {
  const { t } = useTranslation();
  const { localizedPath } = useLocalizedPath();
  const { isRTL } = useRTL();
  const { getImageUrl } = useSiteImages();

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const featuredProducts = [
    {
      title: t("featuredShowcase.products.indoorPlayground", "Indoor Playground Equipment"),
      image: getImageUrl("product.indoorPlayground") || productIndoorPlayground,
      link: "products/indoor-playground",
      tag: t("featuredShowcase.tags.bestseller", "Bestseller"),
    },
    {
      title: t("featuredShowcase.products.trampolinePark", "Trampoline Park Systems"),
      image: getImageUrl("product.trampolinePark") || productTrampolinePark,
      link: "products/trampoline-park",
      tag: t("featuredShowcase.tags.popular", "Popular"),
    },
    {
      title: t("featuredShowcase.products.ninjaCourse", "Ninja Warrior Courses"),
      image: getImageUrl("product.ninjaCourse") || productNinjaCourse,
      link: "products/ninja-course",
      tag: t("featuredShowcase.tags.trending", "Trending"),
    },
    {
      title: t("featuredShowcase.products.softPlay", "Soft Play Areas"),
      image: getImageUrl("product.softPlay") || productSoftPlay,
      link: "products/soft-play",
      tag: t("featuredShowcase.tags.new", "New"),
    },
    {
      title: t("featuredShowcase.products.activePlay", "Active Play for Running"),
      image: productImages.trampolinePark,
      link: "best-indoorplaygroundsolution-active-play-for-running-facilities",
      tag: t("featuredShowcase.tags.special", "Special"),
    },
    {
      title: t("featuredShowcase.products.officeWellness", "Office Wellness Solutions"),
      image: productImages.softPlay,
      link: "indoorplaygroundsolution-office-wellness-solutions",
      tag: t("featuredShowcase.tags.new", "New"),
    },
    {
      title: t("featuredShowcase.products.allProducts", "View All Products"),
      image: productImages.indoorPlayground,
      link: "products",
      tag: t("featuredShowcase.tags.catalog", "Catalog"),
    },
  ];

  const recentProjects = [
    {
      title: t("featuredShowcase.projects.bouncePark", "Bounce Park – Trampoline Center"),
      image: projectImages.bouncePark,
      link: "projects",
      location: t("featuredShowcase.locations.middleEast", "Middle East"),
    },
    {
      title: t("featuredShowcase.projects.fecCenter", "Family Entertainment Center"),
      image: projectImages.fecCenter,
      link: "projects",
      location: t("featuredShowcase.locations.europe", "Europe"),
    },
    {
      title: t("featuredShowcase.projects.indoorProject", "Multi-Level Indoor Playground"),
      image: projectImages.indoorProject,
      link: "projects",
      location: t("featuredShowcase.locations.asia", "Asia"),
    },
    {
      title: t("featuredShowcase.projects.ninjaProject", "Ninja Challenge Arena"),
      image: projectImages.ninjaProject,
      link: "case-studies",
      location: t("featuredShowcase.locations.northAmerica", "North America"),
    },
    {
      title: t("featuredShowcase.projects.softPlayProject", "Toddler Soft Play Zone"),
      image: projectImages.softPlayProject,
      link: "case-studies",
      location: t("featuredShowcase.locations.southAmerica", "South America"),
    },
    {
      title: t("featuredShowcase.projects.trampolineProject", "Commercial Trampoline Park"),
      image: projectImages.trampolineProject,
      link: "case-studies",
      location: t("featuredShowcase.locations.africa", "Africa"),
    },
    {
      title: t("featuredShowcase.projects.viewAll", "View All Projects & Cases"),
      image: projectImages.bouncePark,
      link: "projects",
      location: t("featuredShowcase.locations.global", "Global"),
    },
    {
      title: t("featuredShowcase.projects.caseStudies", "Detailed Case Studies"),
      image: projectImages.fecCenter,
      link: "case-studies",
      location: t("featuredShowcase.locations.worldwide", "Worldwide"),
    },
  ];

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <span className="text-accent font-semibold text-xs sm:text-sm uppercase tracking-wider inline-flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            {t("featuredShowcase.sectionLabel", "Explore Our Work")}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mt-2 mb-3">
            {t("featuredShowcase.title", "Featured Products")}{" "}
            <span className="text-gradient">{t("featuredShowcase.titleHighlight", "& Recent Projects")}</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            {t("featuredShowcase.subtitle", "Discover our bestselling equipment and successful installations across 50+ countries.")}
          </p>
        </motion.div>

        {/* Featured Products */}
        <div className="mb-8">
          <h3 className="text-lg font-heading font-bold mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-accent" />
            {t("featuredShowcase.productsHeading", "Featured Products")}
          </h3>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3"
          >
            {featuredProducts.map((product, index) => (
              <motion.div key={index} variants={item}>
                <Link
                  to={localizedPath(product.link)}
                  className="group block bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 h-full"
                >
                  <div className="relative h-28 sm:h-32 overflow-hidden">
                    <img
                      src={product.image}
                      alt={`${product.title} by NinescapeLand`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="absolute top-1.5 left-1.5 rtl:left-auto rtl:right-1.5 bg-accent/90 text-accent-foreground text-[10px] font-bold px-1.5 py-0.5 rounded">
                      {product.tag}
                    </span>
                  </div>
                  <div className="p-2.5">
                    <h4 className="text-xs sm:text-sm font-semibold line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                      {product.title}
                    </h4>
                    <span className="inline-flex items-center gap-0.5 text-primary text-[10px] sm:text-xs font-semibold mt-1">
                      {t("featuredShowcase.viewDetails", "View")}
                      <ArrowIcon className={`w-3 h-3 transition-transform ${isRTL ? "group-hover:-translate-x-0.5" : "group-hover:translate-x-0.5"}`} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Recent Projects */}
        <div>
          <h3 className="text-lg font-heading font-bold mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            {t("featuredShowcase.projectsHeading", "Recent Projects & Case Studies")}
          </h3>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
          >
            {recentProjects.map((project, index) => (
              <motion.div key={index} variants={item}>
                <Link
                  to={localizedPath(project.link)}
                  className="group block bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 h-full"
                >
                  <div className="relative h-28 sm:h-36 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
                    <span className="absolute bottom-1.5 left-2 rtl:left-auto rtl:right-2 text-white text-[10px] font-medium flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {project.location}
                    </span>
                  </div>
                  <div className="p-2.5">
                    <h4 className="text-xs sm:text-sm font-semibold line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                      {project.title}
                    </h4>
                    <span className="inline-flex items-center gap-0.5 text-primary text-[10px] sm:text-xs font-semibold mt-1">
                      {t("featuredShowcase.viewProject", "Details")}
                      <ArrowIcon className={`w-3 h-3 transition-transform ${isRTL ? "group-hover:-translate-x-0.5" : "group-hover:translate-x-0.5"}`} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
