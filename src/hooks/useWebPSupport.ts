import { useState, useEffect } from "react";

let webpSupportCached: boolean | null = null;

/**
 * Hook to detect WebP image format support
 * Caches the result for subsequent calls
 */
export const useWebPSupport = () => {
  const [supportsWebP, setSupportsWebP] = useState<boolean | null>(webpSupportCached);

  useEffect(() => {
    if (webpSupportCached !== null) {
      setSupportsWebP(webpSupportCached);
      return;
    }

    const checkWebPSupport = async () => {
      try {
        const webP = new Image();
        
        const result = await new Promise<boolean>((resolve) => {
          webP.onload = () => resolve(webP.height === 2);
          webP.onerror = () => resolve(false);
          webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        });

        webpSupportCached = result;
        setSupportsWebP(result);
      } catch {
        webpSupportCached = false;
        setSupportsWebP(false);
      }
    };

    checkWebPSupport();
  }, []);

  return { supportsWebP: supportsWebP ?? true };
};

export default useWebPSupport;
