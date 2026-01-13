import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, ChevronDown, ChevronRight, ChevronLeft } from "lucide-react";
import logo from "@/assets/logo.png";
import { Button } from "./ui/button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { useRTL } from "@/hooks/useRTL";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const Header = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const { localizedPath } = useLocalizedPath();
  const { isRTL, flipX } = useRTL();

  const productItems = [
    { label: t("products.items.indoorPlayground.title"), href: localizedPath("/products") },
    { label: t("products.items.trampolinePark.title"), href: localizedPath("/products") },
    { label: t("products.items.ninjaCourse.title"), href: localizedPath("/products") },
    { label: t("products.items.softPlay.title"), href: localizedPath("/products") },
  ];

  const navItems = [
    { label: t("nav.home"), href: localizedPath("/") },
    { label: t("nav.aboutUs"), href: localizedPath("/about-us") },
    { label: t("nav.process"), href: localizedPath("/process") },
    { label: t("nav.projects"), href: localizedPath("/projects") },
    { label: t("nav.contact"), href: localizedPath("/contact") },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1] as const,
        when: "afterChildren" as const,
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1] as const,
        when: "beforeChildren" as const,
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: flipX(-20) },
    open: { opacity: 1, x: 0 },
  };

  const productMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.2 },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.2,
        staggerChildren: 0.03,
      },
    },
  };

  // Choose the correct chevron based on RTL
  const DirectionalChevron = isRTL ? ChevronLeft : ChevronRight;

  return (
    <>
      {/* Top Bar */}
      <div className="hidden md:block bg-primary text-primary-foreground py-2">
        <div className="container-wide flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href="mailto:sale@indoorplaygroundsolution.com" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Mail className="w-4 h-4" />
              sale@indoorplaygroundsolution.com
            </a>
            <a href="tel:+8615057582901" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Phone className="w-4 h-4" />
              +86 150 5758 2901
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="opacity-80">{t("topBar.globalShipping")} | {t("topBar.warranty")} | {t("topBar.customDesign")}</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md shadow-soft border-b border-border">
        <div className="container-wide">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to={localizedPath("/")} className="flex items-center py-2">
              <img src={logo} alt="NinescapeLand" className="h-14 md:h-20 w-auto max-w-[200px] md:max-w-[280px] object-contain" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              <Link
                to={localizedPath("/")}
                className="text-foreground/80 hover:text-primary font-medium transition-colors relative group"
              >
                {t("nav.home")}
                <span className="absolute -bottom-1 start-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </Link>

              {/* Products Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-foreground/80 hover:text-primary font-medium transition-colors">
                  {t("nav.products")}
                  <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  {productItems.map((item) => (
                    <DropdownMenuItem key={item.label} asChild>
                      <Link to={item.href} className="cursor-pointer">
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Link
                to={localizedPath("/about-us")}
                className="text-foreground/80 hover:text-primary font-medium transition-colors relative group"
              >
                {t("nav.aboutUs")}
                <span className="absolute -bottom-1 start-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </Link>

              <Link
                to={localizedPath("/process")}
                className="text-foreground/80 hover:text-primary font-medium transition-colors relative group"
              >
                {t("nav.process")}
                <span className="absolute -bottom-1 start-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </Link>

              <Link
                to={localizedPath("/projects")}
                className="text-foreground/80 hover:text-primary font-medium transition-colors relative group"
              >
                {t("nav.projects")}
                <span className="absolute -bottom-1 start-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </Link>

              <Link
                to={localizedPath("/contact")}
                className="text-foreground/80 hover:text-primary font-medium transition-colors relative group"
              >
                {t("nav.contact")}
                <span className="absolute -bottom-1 start-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </Link>
            </nav>

            {/* CTA Button & Language Switcher */}
            <div className="hidden md:flex items-center gap-3">
              <LanguageSwitcher />
              <Button variant="hero" size="default" asChild>
                <Link to={localizedPath("/contact")}>{t("nav.getFreeQuote")}</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              <LanguageSwitcher />
              <motion.button
                className="p-2 text-foreground rounded-lg hover:bg-muted transition-colors"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="lg:hidden bg-card border-t border-border overflow-hidden"
            >
              <nav className="container-wide py-4 flex flex-col gap-1">
                {navItems.slice(0, 1).map((item) => (
                  <motion.div key={item.label} variants={itemVariants}>
                    <Link
                      to={item.href}
                      className="py-3 px-4 text-foreground hover:bg-primary/10 hover:text-primary rounded-xl transition-all font-medium flex items-center justify-between active:scale-[0.98] block"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                      <DirectionalChevron className="w-4 h-4 opacity-40" />
                    </Link>
                  </motion.div>
                ))}
                
                {/* Products Accordion */}
                <motion.div variants={itemVariants}>
                  <button
                    className="w-full py-3 px-4 text-foreground hover:bg-primary/10 hover:text-primary rounded-xl transition-all font-medium flex items-center justify-between active:scale-[0.98]"
                    onClick={() => setIsProductsOpen(!isProductsOpen)}
                  >
                    <span>{t("nav.products")}</span>
                    <motion.div
                      animate={{ rotate: isProductsOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {isProductsOpen && (
                      <motion.div
                        variants={productMenuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className={`overflow-hidden ${isRTL ? 'mr-2 border-r-2' : 'ml-2 border-l-2'} border-primary/20`}
                      >
                        {productItems.map((item) => (
                          <motion.div key={item.label} variants={itemVariants}>
                            <Link
                              to={item.href}
                              className="py-2.5 px-4 text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-lg transition-all text-sm flex items-center gap-2 active:scale-[0.98] block"
                              onClick={() => {
                                setIsOpen(false);
                                setIsProductsOpen(false);
                              }}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                              {item.label}
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {navItems.slice(1).map((item) => (
                  <motion.div key={item.label} variants={itemVariants}>
                    <Link
                      to={item.href}
                      className="py-3 px-4 text-foreground hover:bg-primary/10 hover:text-primary rounded-xl transition-all font-medium flex items-center justify-between active:scale-[0.98] block"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                      <DirectionalChevron className="w-4 h-4 opacity-40" />
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div variants={itemVariants} className="pt-4">
                  <Button variant="hero" size="lg" className="w-full" asChild>
                    <Link 
                      to={localizedPath("/contact")} 
                      onClick={() => setIsOpen(false)}
                    >
                      {t("nav.getFreeQuote")}
                    </Link>
                  </Button>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};