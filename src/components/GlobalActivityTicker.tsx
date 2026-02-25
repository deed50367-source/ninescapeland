import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MapPin, TrendingUp, Globe, Package } from "lucide-react";
import { useTranslation } from "react-i18next";

interface InquiryEntry {
  country: string;
  created_at: string;
}

const fallbackEntries: InquiryEntry[] = [
  { country: "United States", created_at: new Date(Date.now() - 120000).toISOString() },
  { country: "Germany", created_at: new Date(Date.now() - 300000).toISOString() },
  { country: "Saudi Arabia", created_at: new Date(Date.now() - 600000).toISOString() },
  { country: "Brazil", created_at: new Date(Date.now() - 900000).toISOString() },
  { country: "Mexico", created_at: new Date(Date.now() - 1800000).toISOString() },
  { country: "France", created_at: new Date(Date.now() - 3600000).toISOString() },
  { country: "Australia", created_at: new Date(Date.now() - 5400000).toISOString() },
  { country: "UAE", created_at: new Date(Date.now() - 7200000).toISOString() },
  { country: "United Kingdom", created_at: new Date(Date.now() - 9000000).toISOString() },
  { country: "Canada", created_at: new Date(Date.now() - 10800000).toISOString() },
];

const activityIcons = [MapPin, TrendingUp, Globe, Package];

const getTimeAgo = (dateStr: string): string => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
};

const activityKeys = [
  "globalTicker.requestedQuote",
  "globalTicker.startedProject",
  "globalTicker.inquiredEquipment",
  "globalTicker.requested3D",
  "globalTicker.contactedTeam",
];

export const GlobalActivityTicker = () => {
  const { t } = useTranslation();
  const [entries, setEntries] = useState<InquiryEntry[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.rpc("get_recent_inquiry_countries");
      if (data && data.length > 0) {
        setEntries(data);
      } else {
        setEntries(fallbackEntries);
      }
    };
    fetchData();
  }, []);

  // Build ticker items from entries
  const tickerItems = useMemo(() => {
    if (entries.length === 0) return [];
    // Create enough items for smooth scrolling
    return entries.map((entry, i) => ({
      id: i,
      country: entry.country,
      timeAgo: getTimeAgo(entry.created_at),
      activityKey: activityKeys[i % activityKeys.length],
      Icon: activityIcons[i % activityIcons.length],
    }));
  }, [entries]);

  if (tickerItems.length === 0) return null;

  // Duplicate items for seamless marquee loop
  const allItems = [...tickerItems, ...tickerItems];

  return (
    <div className="relative w-full bg-primary/95 text-primary-foreground overflow-hidden py-2.5 sm:py-3">
      {/* Pulsing live indicator */}
      <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center pl-3 sm:pl-6 bg-gradient-to-r from-primary via-primary/95 to-transparent pr-8 sm:pr-12">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
          </span>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-accent whitespace-nowrap">
            {t("globalTicker.live", "LIVE")}
          </span>
        </div>
      </div>

      {/* Fade edges */}
      <div className="absolute right-0 top-0 bottom-0 z-10 w-12 sm:w-20 bg-gradient-to-l from-primary to-transparent pointer-events-none" />

      {/* Scrolling content */}
      <div className="flex animate-marquee hover:[animation-play-state:paused]">
        {allItems.map((item, index) => {
          const IconComp = item.Icon;
          return (
            <div
              key={`${item.id}-${index}`}
              className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap px-4 sm:px-6 text-[11px] sm:text-xs"
            >
              <IconComp className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-accent flex-shrink-0" />
              <span className="opacity-90">
                {t("globalTicker.someoneFrom", "Someone from")}{" "}
                <span className="font-bold text-accent">{item.country}</span>{" "}
                {t(item.activityKey)}
              </span>
              <span className="opacity-50 text-[10px]">• {item.timeAgo}</span>
              <span className="opacity-20 mx-2 sm:mx-4">|</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
