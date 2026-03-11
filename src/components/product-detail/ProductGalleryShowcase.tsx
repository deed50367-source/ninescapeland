import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { X, ChevronLeft, ChevronRight, Images } from "lucide-react";

interface Props {
  images: string[];
  productName: string;
}

export const ProductGalleryShowcase = ({ images, productName }: Props) => {
  const { t } = useTranslation();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Show up to 8 images in the showcase grid
  const showcaseImages = images.slice(0, 8);

  if (showcaseImages.length < 3) return null;

  return (
    <>
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="secondary" className="mb-4">
              <Images className="w-3 h-3 mr-1" />
              {t("dynamicProduct.gallery.badge", "Project Gallery")}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("dynamicProduct.gallery.title", "See It in Action")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("dynamicProduct.gallery.subtitle", "Browse real project photos and 3D renderings to envision your own venue.")}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {showcaseImages.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`overflow-hidden rounded-xl cursor-pointer group ${
                  i === 0 ? "md:col-span-2 md:row-span-2" : ""
                }`}
              >
                <div 
                  className={`relative w-full overflow-hidden ${i === 0 ? "aspect-square" : "aspect-[4/3]"}`}
                  onClick={() => setLightboxIndex(i)}
                >
                  <img
                    src={img}
                    alt={`${productName} - ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
              onClick={() => setLightboxIndex(null)}
            >
              <X className="w-6 h-6 text-white" />
            </button>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev! - 1 + showcaseImages.length) % showcaseImages.length);
              }}
            >
              <ChevronLeft className="w-8 h-8 text-white" />
            </button>
            <img
              src={showcaseImages[lightboxIndex]}
              alt={`${productName} gallery`}
              className="max-w-[90vw] max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev! + 1) % showcaseImages.length);
              }}
            >
              <ChevronRight className="w-8 h-8 text-white" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
              {lightboxIndex + 1} / {showcaseImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
