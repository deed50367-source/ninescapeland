import { useTranslation } from "react-i18next";
import { MessageCircle, ArrowUp } from "lucide-react";
import { useState, useEffect, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRTL } from "@/hooks/useRTL";
import { useWhatsAppTracking } from "@/hooks/useWhatsAppTracking";

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
  const { openWhatsApp, getWhatsAppUrl } = useWhatsAppTracking();

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

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openWhatsApp("floating_cta");
  };

  return (
    <div className={`fixed z-50 flex flex-col gap-3 ${isRTL ? 'left-4 sm:left-6' : 'right-4 sm:right-6'} bottom-20 md:bottom-6`}>
      {/* Scroll to top */}
      <AnimatePresence>
        {showScrollTop && (
          <ScrollTopButton onClick={scrollToTop} label={t("floatingCta.scrollToTop")} />
        )}
      </AnimatePresence>

      {/* WhatsApp Button */}
      <motion.a
        href={getWhatsAppUrl("floating_cta")}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleWhatsAppClick}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-success text-success-foreground shadow-glow flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
        aria-label={t("floatingCta.whatsapp")}
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
      </motion.a>
    </div>
  );
};
