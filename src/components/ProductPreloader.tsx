import { useEffect } from "react";
import { useImagePreload } from "@/hooks/useImagePreload";
import { useSiteImages } from "@/hooks/useSiteImages";

/**
 * Invisible component that preloads product page images when mounted
 * Used on the homepage to prepare for product page navigation
 */
export const ProductPreloader = () => {
  const { preloadImages, addPreloadLink } = useImagePreload();
  const { getImageUrl } = useSiteImages();

  useEffect(() => {
    // Small delay to not compete with initial page load
    const timer = setTimeout(() => {
      // Preload product hero images
      const productImages = [
        getImageUrl("product.indoorPlayground"),
        getImageUrl("product.trampolinePark"),
        getImageUrl("product.ninjaCourse"),
        getImageUrl("product.softPlay"),
      ].filter(Boolean) as string[];

      preloadImages(productImages);

      // Add preload links for the most common product pages
      // This uses the browser's native resource prioritization
      productImages.slice(0, 2).forEach((src) => {
        addPreloadLink(src);
      });
    }, 2000); // Wait 2 seconds after page load

    return () => clearTimeout(timer);
  }, [preloadImages, addPreloadLink, getImageUrl]);

  return null; // This component renders nothing
};

export default ProductPreloader;
