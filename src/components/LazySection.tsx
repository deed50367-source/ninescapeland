import { useRef, useState, useEffect, ReactNode } from "react";

interface LazySectionProps {
  children: ReactNode;
  /** Vertical margin around the element to trigger loading early */
  rootMargin?: string;
  /** Minimum height placeholder to prevent layout shift */
  minHeight?: string;
  /** HTML tag for the placeholder */
  as?: "section" | "div";
  className?: string;
}

/**
 * Defers mounting of children until the placeholder scrolls near the viewport.
 * This dramatically reduces initial DOM size / HTML weight for pages with many
 * below-fold sections (homepage, product detail, blog post, etc.).
 *
 * During SSR / prerender the placeholder renders as a lightweight element,
 * keeping the serialized HTML small enough for search-engine crawl budgets.
 */
export const LazySection = ({
  children,
  rootMargin = "200px",
  minHeight = "100px",
  as: Tag = "div",
  className,
}: LazySectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If IntersectionObserver is unsupported, render immediately
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  if (visible) {
    return <>{children}</>;
  }

  return (
    <Tag
      ref={ref as any}
      className={className}
      style={{ minHeight }}
      aria-hidden="true"
    />
  );
};

export default LazySection;
