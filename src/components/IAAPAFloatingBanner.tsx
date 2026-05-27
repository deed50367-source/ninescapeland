import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useRTL } from "@/hooks/useRTL";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

// Hide after June 13, 2026 (end of show)
const EXPIRY = new Date("2026-06-13T23:59:59+08:00").getTime();
const DISMISS_KEY = "iaapa-asia-2026-banner-dismissed";

export const IAAPAFloatingBanner = () => {
  const { t } = useTranslation();
  const { isRTL } = useRTL();
  const localizedPath = useLocalizedPath();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (Date.now() > EXPIRY) return;
    if (typeof window !== "undefined" && sessionStorage.getItem(DISMISS_KEY)) return;
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    sessionStorage.setItem(DISMISS_KEY, "1");
    setVisible(false);
  };

  if (Date.now() > EXPIRY) return null;

  const sideClass = isRTL ? "right-4 sm:right-6" : "left-4 sm:left-6";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
          className={`fixed ${sideClass} bottom-20 md:bottom-6 z-50 max-w-[280px] sm:max-w-[320px]`}
        >
          <Link
            to={localizedPath("/iaapa-asia-2026-hong-kong")}
            className="block group relative overflow-hidden rounded-2xl shadow-glow bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 text-white p-4 pr-10 hover:scale-[1.02] transition-transform"
            aria-label={t("iaapa.bannerAria", { defaultValue: "Visit us at IAAPA Asia 2026 - Booth 2328" })}
          >
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center transition-colors"
              aria-label={t("common.close", { defaultValue: "Close" })}
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/15 backdrop-blur flex flex-col items-center justify-center font-bold leading-none">
                <span className="text-[9px] uppercase tracking-wide opacity-90">Booth</span>
                <span className="text-base">2328</span>
              </div>
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-wider opacity-90 font-semibold mb-0.5">
                  {t("iaapa.bannerKicker", { defaultValue: "IAAPA Asia 2026" })}
                </div>
                <div className="text-sm font-bold leading-tight mb-1.5">
                  {t("iaapa.bannerTitle", { defaultValue: "Meet us in Hong Kong" })}
                </div>
                <div className="flex flex-col gap-0.5 text-[11px] opacity-95">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>Jun 10–12, 2026</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>HKCEC · Booth 2328</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 text-[11px] font-semibold inline-flex items-center gap-1 bg-white/20 backdrop-blur rounded-full px-3 py-1 group-hover:bg-white/30 transition-colors">
              {t("iaapa.bannerCta", { defaultValue: "Book your slot →" })}
            </div>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IAAPAFloatingBanner;
