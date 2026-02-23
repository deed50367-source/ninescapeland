import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { X, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

interface InquiryEntry {
  country: string;
  created_at: string;
}

// Fallback data when no real inquiries exist
const fallbackEntries: InquiryEntry[] = [
  { country: "United States", created_at: new Date(Date.now() - 120000).toISOString() },
  { country: "Germany", created_at: new Date(Date.now() - 300000).toISOString() },
  { country: "Saudi Arabia", created_at: new Date(Date.now() - 600000).toISOString() },
  { country: "Brazil", created_at: new Date(Date.now() - 900000).toISOString() },
  { country: "Mexico", created_at: new Date(Date.now() - 1800000).toISOString() },
  { country: "France", created_at: new Date(Date.now() - 3600000).toISOString() },
  { country: "Australia", created_at: new Date(Date.now() - 5400000).toISOString() },
  { country: "UAE", created_at: new Date(Date.now() - 7200000).toISOString() },
];

const getTimeAgo = (dateStr: string): string => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
};

const RecentInquiryNotification = () => {
  const { t } = useTranslation();
  const [entries, setEntries] = useState<InquiryEntry[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Fetch recent inquiries
  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.rpc("get_recent_inquiry_countries");
      if (data && data.length > 0) {
        setEntries(data);
      } else {
        setEntries(fallbackEntries);
      }
    };
    fetch();
  }, []);

  // Cycle through notifications
  useEffect(() => {
    if (entries.length === 0 || dismissed) return;

    // Initial delay before first show
    const initialTimer = setTimeout(() => {
      setVisible(true);
    }, 5000);

    return () => clearTimeout(initialTimer);
  }, [entries, dismissed]);

  // Auto-hide and cycle
  useEffect(() => {
    if (!visible || dismissed) return;

    const hideTimer = setTimeout(() => {
      setVisible(false);
      // Show next after a pause
      setTimeout(() => {
        if (!dismissed) {
          setCurrentIndex((prev) => (prev + 1) % entries.length);
          setVisible(true);
        }
      }, 8000 + Math.random() * 7000); // 8-15s random interval
    }, 4000); // Show for 4s

    return () => clearTimeout(hideTimer);
  }, [visible, dismissed, currentIndex, entries.length]);

  const handleDismiss = useCallback(() => {
    setVisible(false);
    setDismissed(true);
  }, []);

  if (entries.length === 0 || dismissed) return null;

  const current = entries[currentIndex];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-20 left-4 z-40 max-w-xs sm:bottom-6"
        >
          <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-3 shadow-lg">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <MapPin className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground leading-snug">
                Someone from <span className="font-bold text-primary">{current.country}</span> just requested a quote
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {getTimeAgo(current.created_at)}
              </p>
            </div>
            <button
              onClick={handleDismiss}
              className="shrink-0 rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              aria-label="Dismiss"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RecentInquiryNotification;
