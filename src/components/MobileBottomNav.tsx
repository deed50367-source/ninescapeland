import { Home, Package, FolderOpen, Phone, Menu } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { cn } from "@/lib/utils";

const MobileBottomNav = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { lang } = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const currentLang = lang || "en";

  const mainNavItems = [
    { icon: Home, label: t("nav.home"), path: `/${currentLang}`, isExternal: false },
    { icon: Package, label: t("nav.products"), path: `/${currentLang}/products`, isExternal: false },
    { icon: FolderOpen, label: t("nav.projects"), path: `/${currentLang}/projects`, isExternal: false },
    { icon: Phone, label: t("nav.contact"), path: "https://wa.me/8615058782901", isExternal: true },
  ];

  const moreNavItems = [
    { label: t("nav.about"), path: `/${currentLang}/about-us` },
    { label: t("nav.process"), path: `/${currentLang}/process` },
    { label: t("nav.faq"), path: `/${currentLang}/faq` },
    { label: t("nav.caseStudies"), path: `/${currentLang}/case-studies` },
  ];

  const isActive = (path: string) => {
    if (path === `/${currentLang}`) {
      return location.pathname === path || location.pathname === `/${currentLang}/`;
    }
    return location.pathname.startsWith(path);
  };

  const handleNavClick = (path: string, isExternal: boolean) => {
    if (isExternal) {
      window.open(path, "_blank");
    } else {
      navigate(path);
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border shadow-lg md:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {mainNavItems.map((item) => (
          <button
            key={item.path}
            onClick={() => handleNavClick(item.path, item.isExternal)}
            className={cn(
              "flex flex-col items-center justify-center flex-1 h-full py-1 px-1 transition-colors",
              !item.isExternal && isActive(item.path)
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <item.icon className={cn(
              "h-5 w-5 mb-0.5",
              !item.isExternal && isActive(item.path) && "text-primary"
            )} />
            <span className="text-[10px] font-medium leading-tight truncate max-w-[60px]">
              {item.label}
            </span>
          </button>
        ))}

        {/* More Menu */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <button
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full py-1 px-1 transition-colors",
                "text-muted-foreground hover:text-foreground"
              )}
            >
              <Menu className="h-5 w-5 mb-0.5" />
              <span className="text-[10px] font-medium leading-tight">
                {t("nav.more", "More")}
              </span>
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-auto max-h-[60vh] rounded-t-2xl">
            <div className="py-4">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 px-1">
                {t("nav.more", "More")}
              </h3>
              <div className="space-y-1">
                {moreNavItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleNavClick(item.path, false)}
                    className={cn(
                      "w-full text-left px-4 py-3 rounded-lg transition-colors",
                      isActive(item.path)
                        ? "bg-primary/10 text-primary font-medium"
                        : "hover:bg-muted"
                    )}
                  >
                    {item.label}
                  </button>
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
