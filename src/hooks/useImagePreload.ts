import { useCallback, useEffect, useRef } from "react";

// Global cache to avoid redundant preloading
const preloadedImages = new Set<string>();

/**
 * Hook for preloading images on hover or in advance
 * Improves page transition experience by caching images before navigation
 */
export const useImagePreload = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  /**
   * Preload a single image
   */
  const preloadImage = useCallback((src: string) => {
    if (!src || preloadedImages.has(src)) return;

    const img = new Image();
    img.src = src;
    preloadedImages.add(src);
  }, []);

  /**
   * Preload multiple images
   */
  const preloadImages = useCallback((sources: string[]) => {
    sources.forEach(preloadImage);
  }, [preloadImage]);

  /**
   * Preload image on element hover
   * Returns props to spread on the element
   */
  const getPreloadProps = useCallback((imageSrc: string) => ({
    onMouseEnter: () => preloadImage(imageSrc),
    onFocus: () => preloadImage(imageSrc),
  }), [preloadImage]);

  /**
   * Add preload link to document head
   * Best for critical images that should load immediately
   */
  const addPreloadLink = useCallback((src: string, as: 'image' | 'fetch' = 'image') => {
    if (!src || typeof document === 'undefined') return;
    
    // Check if link already exists
    const existingLink = document.querySelector(`link[href="${src}"]`);
    if (existingLink) return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = as;
    link.href = src;
    if (as === 'image') {
      link.type = 'image/webp';
    }
    document.head.appendChild(link);
  }, []);

  /**
   * Setup intersection observer for viewport-based preloading
   */
  const setupViewportPreload = useCallback((element: HTMLElement, imageSrc: string) => {
    if (!element || !imageSrc) return;

    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const src = entry.target.getAttribute('data-preload-src');
              if (src) preloadImage(src);
              observerRef.current?.unobserve(entry.target);
            }
          });
        },
        { rootMargin: '200px' } // Start preloading 200px before entering viewport
      );
    }

    element.setAttribute('data-preload-src', imageSrc);
    observerRef.current.observe(element);

    return () => {
      observerRef.current?.unobserve(element);
    };
  }, [preloadImage]);

  // Cleanup observer on unmount
  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return {
    preloadImage,
    preloadImages,
    getPreloadProps,
    addPreloadLink,
    setupViewportPreload,
    isPreloaded: (src: string) => preloadedImages.has(src),
  };
};

export default useImagePreload;
