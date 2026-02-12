import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { useRTL } from "@/hooks/useRTL";
import { useImagePreload } from "@/hooks/useImagePreload";
import { Badge } from "./ui/badge";
import { 
  ChevronDown, 
  Package, 
  Star, 
  ArrowRight, 
  ArrowLeft,
  Layers,
  Sparkles
} from "lucide-react";

interface ProductCategory {
  id: string;
  name: string;
  name_en: string | null;
  slug: string;
  image_url: string | null;
}

interface Product {
  id: string;
  name: string;
  name_en: string | null;
  slug: string;
  featured_image: string | null;
  is_featured: boolean;
  category_id: string | null;
}

export const ProductMegaMenu = () => {
  const { t, i18n } = useTranslation();
  const { localizedPath } = useLocalizedPath();
  const { isRTL } = useRTL();
  const { preloadImages } = useImagePreload();
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  // Static core products for quick access
  const coreProducts = [
    { 
      label: t("products.items.indoorPlayground.title"), 
      href: "/products/indoor-playground",
      icon: "🎢"
    },
    { 
      label: t("products.items.trampolinePark.title"), 
      href: "/products/trampoline-park",
      icon: "🦘"
    },
    { 
      label: t("products.items.ninjaCourse.title"), 
      href: "/products/ninja-course",
      icon: "🥷"
    },
    { 
      label: t("products.items.softPlay.title"), 
      href: "/products/soft-play",
      icon: "🧸"
    },
    { 
      label: t("activePlayRunning.breadcrumb", "Active Play for Running"), 
      href: "/best-indoorplaygroundsolution-active-play-for-running-facilities",
      icon: "🏃"
    },
    { 
      label: t("officeWellness.breadcrumb", "Office Wellness"), 
      href: "/indoorplaygroundsolution-office-wellness-solutions",
      icon: "🏢"
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const [categoriesRes, productsRes] = await Promise.all([
        supabase
          .from("product_categories")
          .select("*")
          .eq("is_active", true)
          .order("sort_order", { ascending: true })
          .limit(6),
        supabase
          .from("products")
          .select("*")
          .eq("is_active", true)
          .eq("is_featured", true)
          .order("sort_order", { ascending: true })
          .limit(4),
      ]);

      if (categoriesRes.data) setCategories(categoriesRes.data);
      if (productsRes.data) {
        setFeaturedProducts(productsRes.data);
        // Preload featured product images when menu data loads
        const imagesToPreload = productsRes.data
          .map((p) => p.featured_image)
          .filter(Boolean) as string[];
        preloadImages(imagesToPreload);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const getLocalizedName = (item: { name: string; name_en?: string | null }) => {
    if (i18n.language === "en" && item.name_en) {
      return item.name_en;
    }
    return item.name;
  };

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Trigger Button */}
      <button
        className="flex items-center gap-1 text-foreground/80 hover:text-primary font-medium transition-colors py-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {t("nav.products")}
        <ChevronDown 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Mega Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-[800px] bg-card rounded-xl shadow-2xl border overflow-hidden z-50"
          >
            <div className="grid grid-cols-12 gap-0">
              {/* Left Column - Core Products */}
              <div className="col-span-4 bg-muted/50 p-6 border-r">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                    {t("nav.coreProducts", "Core Products")}
                  </h3>
                </div>
                <div className="space-y-1">
                  {coreProducts.map((item) => (
                    <Link
                      key={item.href}
                      to={localizedPath(item.href)}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors group"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <span className="font-medium group-hover:text-primary transition-colors">
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </div>

                {/* View All Products Link */}
                <Link
                  to={localizedPath("/products")}
                  className="flex items-center gap-2 mt-4 pt-4 border-t text-primary font-medium hover:gap-3 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  <Package className="w-4 h-4" />
                  {t("nav.viewAllProducts", "View All Products")}
                  <ArrowIcon className="w-4 h-4" />
                </Link>
              </div>

              {/* Middle Column - Categories */}
              <div className="col-span-4 p-6 border-r">
                <div className="flex items-center gap-2 mb-4">
                  <Layers className="w-4 h-4 text-primary" />
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                    {t("nav.categories", "Categories")}
                  </h3>
                </div>
                {isLoading ? (
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-10 bg-muted animate-pulse rounded-lg" />
                    ))}
                  </div>
                ) : categories.length > 0 ? (
                  <div className="space-y-1">
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        to={localizedPath(`/products?category=${category.id}`)}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-primary/10 transition-colors group"
                        onClick={() => setIsOpen(false)}
                      >
                        {category.image_url ? (
                          <img
                            src={category.image_url}
                            alt={getLocalizedName(category)}
                            className="w-8 h-8 rounded-md object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center">
                            <Package className="w-4 h-4 text-muted-foreground" />
                          </div>
                        )}
                        <span className="text-sm font-medium group-hover:text-primary transition-colors">
                          {getLocalizedName(category)}
                        </span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {t("nav.noCategoriesYet", "Categories coming soon...")}
                  </p>
                )}
              </div>

              {/* Right Column - Featured Products */}
              <div className="col-span-4 p-6 bg-gradient-to-br from-background to-muted/30">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                    {t("nav.featuredProducts", "Featured")}
                  </h3>
                </div>
                {isLoading ? (
                  <div className="space-y-3">
                    {[1, 2].map((i) => (
                      <div key={i} className="h-20 bg-muted animate-pulse rounded-lg" />
                    ))}
                  </div>
                ) : featuredProducts.length > 0 ? (
                  <div className="space-y-3">
                    {featuredProducts.slice(0, 3).map((product) => (
                      <Link
                        key={product.id}
                        to={localizedPath(`/products/${product.slug}`)}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-primary/10 transition-colors group"
                        onClick={() => setIsOpen(false)}
                      >
                        {product.featured_image ? (
                          <img
                            src={product.featured_image}
                            alt={getLocalizedName(product)}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                            <Package className="w-5 h-5 text-muted-foreground" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-1">
                            {getLocalizedName(product)}
                          </p>
                          <Badge variant="secondary" className="mt-1 text-xs">
                            <Star className="w-2.5 h-2.5 mr-1 fill-yellow-500 text-yellow-500" />
                            {t("products.featured", "Featured")}
                          </Badge>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {t("nav.noFeaturedYet", "Featured products coming soon...")}
                  </p>
                )}
              </div>
            </div>

            {/* Bottom Banner */}
            <div className="bg-primary/5 px-6 py-4 border-t flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">
                  {t("nav.megaMenuCta", "Need custom solutions?")}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t("nav.megaMenuCtaDesc", "Get a free consultation for your project")}
                </p>
              </div>
              <Link
                to={localizedPath("/contact")}
                onClick={() => setIsOpen(false)}
              >
                <Badge variant="default" className="cursor-pointer hover:bg-primary/90">
                  {t("nav.getFreeQuote")}
                  <ArrowIcon className="w-3 h-3 ml-1" />
                </Badge>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
