import { useState, useEffect, useRef, ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'onLoad' | 'onError'> {
  src: string;
  alt: string;
  /** Priority loading - skip lazy load for LCP images */
  priority?: boolean;
  /** Placeholder blur color or gradient */
  placeholderColor?: string;
  /** Aspect ratio for placeholder (e.g., "16/9", "4/3", "1/1") */
  aspectRatio?: string;
  /** Custom wrapper className */
  wrapperClassName?: string;
  /** Callback when image loads */
  onImageLoad?: () => void;
  /** Callback on error */
  onImageError?: () => void;
}

// Check WebP support once and cache the result
let webpSupportCached: boolean | null = null;

const checkWebPSupport = (): Promise<boolean> => {
  if (webpSupportCached !== null) {
    return Promise.resolve(webpSupportCached);
  }
  
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      webpSupportCached = webP.height === 2;
      resolve(webpSupportCached);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};

/**
 * OptimizedImage Component
 * 
 * Features:
 * - Native lazy loading with Intersection Observer fallback
 * - WebP format detection and support
 * - Smooth loading transition with placeholder
 * - Priority loading option for LCP images
 * - Responsive srcset generation for Supabase storage images
 */
export const OptimizedImage = ({
  src,
  alt,
  priority = false,
  placeholderColor = "bg-muted",
  aspectRatio,
  wrapperClassName,
  className,
  onImageLoad,
  onImageError,
  ...props
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const [supportsWebP, setSupportsWebP] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check WebP support on mount
  useEffect(() => {
    checkWebPSupport().then(setSupportsWebP);
  }, []);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !containerRef.current) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "200px", // Start loading 200px before entering viewport
        threshold: 0.01,
      }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [priority]);

  // Generate optimized src for Supabase storage images
  const getOptimizedSrc = (originalSrc: string): string => {
    if (!originalSrc) return '';
    
    // Check if it's a Supabase storage URL
    if (originalSrc.includes('supabase.co/storage')) {
      // Use render endpoint for transformations
      const renderSrc = originalSrc.replace(
        '/storage/v1/object/public/',
        '/storage/v1/render/image/public/'
      );
      const url = new URL(renderSrc);
      
      // Add WebP transformation if supported
      if (supportsWebP && !url.searchParams.has('format')) {
        url.searchParams.set('format', 'webp');
      }
      
      // Add quality optimization
      if (!url.searchParams.has('quality')) {
        url.searchParams.set('quality', '80');
      }
      
      return url.toString();
    }
    
    return originalSrc;
  };

  // Generate srcset for responsive images (Supabase storage only)
  const generateSrcSet = (originalSrc: string): string | undefined => {
    if (!originalSrc || !originalSrc.includes('supabase.co/storage')) {
      return undefined;
    }

    // Use render endpoint
    const renderSrc = originalSrc.replace(
      '/storage/v1/object/public/',
      '/storage/v1/render/image/public/'
    );

    const widths = [320, 640, 960, 1280, 1920];
    const srcSetParts = widths.map((width) => {
      const url = new URL(renderSrc);
      url.searchParams.set('width', width.toString());
      if (supportsWebP) {
        url.searchParams.set('format', 'webp');
      }
      url.searchParams.set('quality', '80');
      return `${url.toString()} ${width}w`;
    });

    return srcSetParts.join(', ');
  };

  const handleLoad = () => {
    setIsLoaded(true);
    onImageLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onImageError?.();
  };

  const optimizedSrc = getOptimizedSrc(src);
  const srcSet = generateSrcSet(src);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden",
        aspectRatio && `aspect-[${aspectRatio}]`,
        wrapperClassName
      )}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {/* Placeholder */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-500",
          placeholderColor,
          isLoaded ? "opacity-0" : "opacity-100"
        )}
      >
        {/* Animated shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
      </div>

      {/* Main Image */}
      {isInView && !hasError && (
        <img
          ref={imgRef}
          src={optimizedSrc}
          srcSet={srcSet}
          sizes={props.sizes || "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          fetchPriority={priority ? "high" : "auto"}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "transition-opacity duration-500",
            isLoaded ? "opacity-100" : "opacity-0",
            className
          )}
          {...props}
        />
      )}

      {/* Error fallback */}
      {hasError && (
        <div className={cn(
          "absolute inset-0 flex items-center justify-center",
          placeholderColor
        )}>
          <span className="text-muted-foreground text-sm">
            Image unavailable
          </span>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
