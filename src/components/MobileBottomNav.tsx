import { Home, Package, FolderOpen, Phone, Menu } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { cn } from "@/lib/utils";
import { useWhatsAppTracking } from "@/hooks/useWhatsAppTracking";

const MobileBottomNav = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { lang } = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const { openWhatsApp, getWhatsAppUrl } = useWhatsAppTracking();

  const currentLang = lang || "en";

  const mainNavItems = [
    { icon: Home, label: t("nav.home"), path: `/${currentLang}`, isExternal: false },
    { icon: Package, label: t("nav.products"), path: `/${currentLang}/products`, isExternal: false },
    { icon: FolderOpen, label: t("nav.projects"), path: `/${currentLang}/projects`, isExternal: false },
    { icon: Phone, label: t("nav.contact"), path: getWhatsAppUrl("mobile_nav"), isExternal: true },
  ];

  const moreNavItems = [
    { label: t("nav.about"), path: `/${currentLang}/about-us` },
    { label: t("nav.process"), path: `/${currentLang}/process` },
    { label: t("nav.blog"), path: `/${currentLang}/blog` },
    { label: t("nav.faq"), path: `/${currentLang}/faq` },
  ];

  const isActive = (path: string) => {
    if (path === `/${currentLang}`) {
      return location.pathname === path || location.pathname === `/${currentLang}/`;
    }
    return location.pathname.startsWith(path);
  };

  const handleNavClick = (path: string, isExternal: boolean, label: string) => {
    setActiveTab(label);
    setTimeout(() => setActiveTab(null), 200);
    
    if (isExternal) {
      openWhatsApp("mobile_nav");
    } else {
      navigate(path);
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/98 backdrop-blur-lg border-t border-border shadow-xl md:hidden safe-area-pb">
      <div className="flex items-center justify-around h-[68px] px-1">
        {mainNavItems.map((item) => {
          const active = !item.isExternal && isActive(item.path);
          const tapped = activeTab === item.label;
          
          return (
            <motion.button
              key={item.path}
              onClick={() => handleNavClick(item.path, item.isExternal, item.label)}
              whileTap={{ scale: 0.9 }}
              className={cn(
                "relative flex flex-col items-center justify-center flex-1 h-full py-2 px-2 transition-colors min-w-[60px]",
                active ? "text-primary" : "text-muted-foreground"
              )}
            >
              {/* Active indicator */}
              <AnimatePresence>
                {active && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute top-1 w-8 h-1 bg-primary rounded-full"
                  />
                )}
              </AnimatePresence>
              
              {/* Tap feedback */}
              <AnimatePresence>
                {tapped && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0.5 }}
                    animate={{ scale: 2, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-primary/20 rounded-full"
                  />
                )}
              </AnimatePresence>
              
              <motion.div
                animate={active ? { scale: 1.1 } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <item.icon className={cn(
                  "h-6 w-6 mb-1",
                  active && "text-primary"
                )} />
              </motion.div>
              <span className={cn(
                "text-[11px] font-medium leading-tight truncate max-w-[64px]",
                active && "font-semibold"
              )}>
                {item.label}
              </span>
            </motion.button>
          );
        })}

        {/* More Menu */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className={cn(
                "relative flex flex-col items-center justify-center flex-1 h-full py-2 px-2 transition-colors min-w-[60px]",
                "text-muted-foreground active:text-primary"
              )}
            >
              <Menu className="h-6 w-6 mb-1" />
              <span className="text-[11px] font-medium leading-tight">
                {t("nav.more", "More")}
              </span>
            </motion.button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-auto max-h-[70vh] rounded-t-3xl px-4 pb-8 pt-2">
            {/* Drag handle indicator */}
            <div className="flex justify-center mb-4">
              <div className="w-12 h-1.5 bg-muted-foreground/30 rounded-full" />
            </div>
            
            <div className="py-2">
              <h3 className="text-sm font-semibold text-muted-foreground mb-4 px-2">
                {t("nav.more", "More")}
              </h3>
              <div className="space-y-1">
                {moreNavItems.map((item, index) => (
                  <motion.button
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleNavClick(item.path, false, item.label)}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "w-full text-left px-4 py-4 rounded-xl transition-all flex items-center justify-between",
                      isActive(item.path)
                        ? "bg-primary/10 text-primary font-semibold"
                        : "hover:bg-muted active:bg-muted"
                    )}
                  >
                    <span className="text-base">{item.label}</span>
                    {isActive(item.path) && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 bg-primary rounded-full"
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default MobileBottomNav;
