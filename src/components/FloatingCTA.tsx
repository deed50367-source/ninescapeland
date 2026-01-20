import { useTranslation } from "react-i18next";
import { MessageCircle, ArrowUp } from "lucide-react";
import { useState, useEffect, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRTL } from "@/hooks/useRTL";

const ScrollTopButton = forwardRef<HTMLButtonElement, { onClick: () => void; label: string }>(
  ({ onClick, label }, ref) => (
    <motion.button
      ref={ref}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      onClick={onClick}
      className="w-12 h-12 rounded-full bg-muted text-foreground shadow-medium flex items-center justify-center hover:bg-secondary transition-colors"
      aria-label={label}
    >
      <ArrowUp className="w-5 h-5" />
    </motion.button>
  )
);
ScrollTopButton.displayName = "ScrollTopButton";

export const FloatingCTA = () => {
  const { t } = useTranslation();
  const { isRTL } = useRTL();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={`fixed bottom-6 z-50 flex flex-col gap-3 ${isRTL ? 'left-6' : 'right-6'}`}>
      {/* Scroll to top */}
      <AnimatePresence>
        {showScrollTop && (
          <ScrollTopButton onClick={scrollToTop} label={t("floatingCta.scrollToTop")} />
        )}
      </AnimatePresence>

      {/* Contact Button */}
      <motion.button
        onClick={() => window.location.href = "/contact"}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
        className="w-14 h-14 rounded-full bg-success text-success-foreground shadow-glow flex items-center justify-center hover:scale-110 transition-transform"
        aria-label={t("floatingCta.whatsapp")}
      >
        <MessageCircle className="w-7 h-7" />
      </motion.button>
    </div>
  );
};
