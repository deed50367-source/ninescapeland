import { useEffect } from "react";
import { useImagePreload } from "@/hooks/useImagePreload";
import { useSiteImages } from "@/hooks/useSiteImages";

/**
 * Invisible component that preloads product page images when mounted.
 * Skipped on mobile (< 768px) to save bandwidth.
 */
export const ProductPreloader = () => {
  const { preloadImages, addPreloadLink } = useImagePreload();
  const { getImageUrl } = useSiteImages();

  useEffect(() => {
    // Skip on mobile devices to save bandwidth
    if (window.innerWidth < 768) return;

    const timer = setTimeout(() => {
      const productImages = [
        getImageUrl("product.indoorPlayground"),
        getImageUrl("product.trampolinePark"),
        getImageUrl("product.ninjaCourse"),
        getImageUrl("product.softPlay"),
      ].filter(Boolean) as string[];

      preloadImages(productImages);

      productImages.slice(0, 2).forEach((src) => {
        addPreloadLink(src);
      });
    }, 3000); // Wait 3s on desktop

    return () => clearTimeout(timer);
  }, [preloadImages, addPreloadLink, getImageUrl]);

  return null;
};

export default ProductPreloader;
