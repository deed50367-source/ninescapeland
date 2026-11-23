import { useEffect } from "react";
import { useImagePreload } from "@/hooks/useImagePreload";
import { useSiteImages } from "@/hooks/useSiteImages";

/**
 * Invisible component that preloads product page images when mounted.
 * Skipped on mobile (< 768px) to save bandwidth.
 */
export const ProductPreloader = () => {
  const { preloadImages, addPreloadLink } = useImagePreload();
  const { getOptimizedImageUrl } = useSiteImages();

  useEffect(() => {
    // Skip on mobile devices to save bandwidth
    if (window.innerWidth < 768) return;

    const timer = setTimeout(() => {
      const productImages = [
        getOptimizedImageUrl("product.indoorPlayground", { width: 640, quality: 70 }),
        getOptimizedImageUrl("product.trampolinePark", { width: 640, quality: 70 }),
        getOptimizedImageUrl("product.ninjaCourse", { width: 640, quality: 70 }),
        getOptimizedImageUrl("product.softPlay", { width: 640, quality: 70 }),
      ].filter(Boolean) as string[];

      preloadImages(productImages);

      productImages.slice(0, 2).forEach((src) => {
        addPreloadLink(src);
      });
    }, 3000); // Wait 3s on desktop

    return () => clearTimeout(timer);
  }, [preloadImages, addPreloadLink, getOptimizedImageUrl]);

  return null;
};

export default ProductPreloader;
