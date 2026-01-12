import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { useRTL } from "@/hooks/useRTL";

import indoorPlayground from "@/assets/product-indoor-playground.jpg";
import trampolinePark from "@/assets/product-trampoline-park.jpg";
import ninjaCourse from "@/assets/product-ninja-course.jpg";
import softPlay from "@/assets/product-soft-play.jpg";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const ProductsSection = () => {
  const { t } = useTranslation();
  const { localizedPath } = useLocalizedPath();
  const { isRTL } = useRTL();

  // Choose the correct arrow based on RTL
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const products = [
    {
      title: t("products.items.indoorPlayground.title"),
      description: t("products.items.indoorPlayground.description"),
      image: indoorPlayground,
      features: t("products.items.indoorPlayground.features", { returnObjects: true }) as string[],
      slug: "indoor-playground",
    },
    {
      title: t("products.items.trampolinePark.title"),
      description: t("products.items.trampolinePark.description"),
      image: trampolinePark,
      features: t("products.items.trampolinePark.features", { returnObjects: true }) as string[],
      slug: "trampoline-park",
    },
    {
      title: t("products.items.ninjaCourse.title"),
      description: t("products.items.ninjaCourse.description"),
      image: ninjaCourse,
      features: t("products.items.ninjaCourse.features", { returnObjects: true }) as string[],
      slug: "ninja-course",
    },
    {
      title: t("products.items.softPlay.title"),
      description: t("products.items.softPlay.description"),
      image: softPlay,
      features: t("products.items.softPlay.features", { returnObjects: true }) as string[],
      slug: "soft-play",
    },
  ];

  return (
    <section id="products" className="section-padding bg-background">
      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            {t("products.sectionLabel")}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-3 mb-6">
            {t("products.title")} <span className="text-gradient">{t("products.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            {t("products.description")}
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          {products.map((product, index) => (
            <motion.article
              key={index}
              variants={item}
              className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex gap-2 flex-wrap">
                  {product.features.map((feature, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-primary-foreground/90 text-primary rounded-full text-xs font-semibold"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold mb-3 group-hover:text-primary transition-colors">
                  {product.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {product.description}
                </p>
                <Button variant="outline" size="sm" asChild className="group/btn">
                  <Link to={localizedPath(`products/${product.slug}`)}>
                    {t("products.viewDetails")}
                    <ArrowIcon className={`w-4 h-4 transition-transform ${isRTL ? 'group-hover/btn:-translate-x-1' : 'group-hover/btn:translate-x-1'}`} />
                  </Link>
                </Button>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            {t("products.customCta")}
          </p>
          <Button variant="hero" size="lg" asChild>
            <a href="#contact" className="group">
              {t("products.discussProject")}
              <ArrowIcon className={`w-5 h-5 transition-transform ${isRTL ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
