import { useEffect, useRef, type ReactNode } from "react";
import { MotionConfig } from "framer-motion";

/** Homepage-only motion: content stays visible before observation and in captures. */
export function HomeMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = root.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 767px)");
    const registered = new WeakSet<Element>();
    const delays = new WeakMap<Element, number>();
    const animations = new Set<Animation>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        if (preference.matches) continue;
        const animation = entry.target.animate(
          [{ translate: `0 ${mobile.matches ? 8 : 12}px` }, { translate: "0 0" }],
          { duration: mobile.matches ? 350 : 450, delay: mobile.matches ? 0 : (delays.get(entry.target) ?? 0), easing: "cubic-bezier(.22,1,.36,1)" },
        );
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      }
    }, { threshold: 0.12 });

    const register = () => {
      element.querySelectorAll("main section .container-wide > div").forEach((block) => {
        if (block.closest("#home")) return;
        // Stagger repeated items rather than animating their grid a second time.
        const targets = block.classList.contains("grid") ? Array.from(block.children) : [block];
        targets.forEach((target, index) => {
          if (registered.has(target)) return;
          registered.add(target);
          delays.set(target, Math.min(index, 3) * 60);
          observer.observe(target);
        });
      });
    };
    register();
    const mutations = new MutationObserver(register);
    mutations.observe(element, { childList: true, subtree: true });
    const stop = () => {
      if (preference.matches) animations.forEach((animation) => animation.cancel());
    };
    preference.addEventListener("change", stop);
    return () => {
      observer.disconnect();
      mutations.disconnect();
      animations.forEach((animation) => animation.cancel());
      preference.removeEventListener("change", stop);
    };
  }, []);

  // Existing sections retain their interaction logic; one observer owns entry motion.
  return <MotionConfig reducedMotion="always" transition={{ duration: 0.22 }}>
    <div ref={root} className="home-motion">{children}</div>
  </MotionConfig>;
}