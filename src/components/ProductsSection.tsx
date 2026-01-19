import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { useRTL } from "@/hooks/useRTL";
import { productImages } from "@/config/galleryImages";
import mascotPlayground from "@/assets/mascot-playground.png";
import mascotTrampoline from "@/assets/mascot-trampoline.png";
import mascotNinja from "@/assets/mascot-ninja.png";
import mascotSoftplay from "@/assets/mascot-softplay.png";

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
      image: productImages.indoorPlayground,
      features: t("products.items.indoorPlayground.features", { returnObjects: true }) as string[],
      slug: "indoor-playground",
      mascot: mascotPlayground,
    },
    {
      title: t("products.items.trampolinePark.title"),
      description: t("products.items.trampolinePark.description"),
      image: productImages.trampolinePark,
      features: t("products.items.trampolinePark.features", { returnObjects: true }) as string[],
      slug: "trampoline-park",
      mascot: mascotTrampoline,
    },
    {
      title: t("products.items.ninjaCourse.title"),
      description: t("products.items.ninjaCourse.description"),
      image: productImages.ninjaCourse,
      features: t("products.items.ninjaCourse.features", { returnObjects: true }) as string[],
      slug: "ninja-course",
      mascot: mascotNinja,
    },
    {
      title: t("products.items.softPlay.title"),
      description: t("products.items.softPlay.description"),
      image: productImages.softPlay,
      features: t("products.items.softPlay.features", { returnObjects: true }) as string[],
      slug: "soft-play",
      mascot: mascotSoftplay,
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
          className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 lg:mb-16"
        >
          <span className="text-accent font-semibold text-xs sm:text-sm uppercase tracking-wider">
            {t("products.sectionLabel")}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-2 sm:mt-3 mb-3 sm:mb-6">
            {t("products.title")} <span className="text-gradient">{t("products.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base lg:text-lg px-4 sm:px-0">
            {t("products.description")}
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8"
        >
          {products.map((product, index) => (
            <motion.article
              key={index}
              variants={item}
              className="group bg-card rounded-xl sm:rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex gap-1.5 sm:gap-2 flex-wrap">
                  {product.features.map((feature, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 sm:px-3 sm:py-1 bg-primary-foreground/90 text-primary rounded-full text-[10px] sm:text-xs font-semibold"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6 relative">
                {/* Mascot decoration */}
                <motion.img
                  src={product.mascot}
                  alt="Ball mascot"
                  className="absolute -top-12 right-2 w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-lg pointer-events-none"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                
                <h3 className="text-lg sm:text-xl font-heading font-bold mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                  {product.title}
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base mb-3 sm:mb-4 line-clamp-2 pr-16 sm:pr-0">
                  {product.description}
                </p>
                <Button variant="outline" size="sm" asChild className="group/btn text-xs sm:text-sm">
                  <Link to={localizedPath(`products/${product.slug}`)}>
                    {t("products.viewDetails")}
                    <ArrowIcon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform ${isRTL ? 'group-hover/btn:-translate-x-1' : 'group-hover/btn:translate-x-1'}`} />
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
