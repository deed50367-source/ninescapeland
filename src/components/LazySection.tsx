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
  /** Preserve hash destinations before their content is mounted. */
  id?: string;
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
  id,
}: LazySectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!id) return;
    const revealHashTarget = () => {
      if (window.location.hash === `#${id}`) setVisible(true);
    };
    revealHashTarget();
    window.addEventListener("hashchange", revealHashTarget);
    return () => window.removeEventListener("hashchange", revealHashTarget);
  }, [id]);

  useEffect(() => {
    if (!visible || !id || window.location.hash !== `#${id}`) return;
    const scrollToContent = () => {
      const target = document.getElementById(id);
      if (!target || target.getAttribute("aria-hidden") === "true") return false;
      target.scrollIntoView({ block: "start", behavior: "instant" });
      return true;
    };
    if (scrollToContent()) return;
    const observer = new MutationObserver(() => {
      if (scrollToContent()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [visible, id]);

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
      id={id}
      ref={ref as any}
      className={className}
      style={{ minHeight }}
      aria-hidden="true"
    />
  );
};

export default LazySection;
