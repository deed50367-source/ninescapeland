import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { useRTL } from "@/hooks/useRTL";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { 
  Package, 
  Star, 
  ArrowRight, 
  ArrowLeft,
  ShoppingBag
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  name_en: string | null;
  slug: string;
  short_description: string | null;
  featured_image: string | null;
  is_featured: boolean;
  price_min: number | null;
  price_max: number | null;
  price_unit: string | null;
}

interface RelatedProductsSectionProps {
  categorySlug: string;
  title?: string;
  description?: string;
}

export const RelatedProductsSection = ({ 
  categorySlug, 
  title,
  description
}: RelatedProductsSectionProps) => {
  const { t, i18n } = useTranslation();
  const { localizedPath } = useLocalizedPath();
  const { isRTL } = useRTL();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState<string | null>(null);

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  // Map static page slugs to potential category slugs
  const categoryMap: Record<string, string[]> = {
    "indoor-playground": ["indoor-playground", "indoor", "playground"],
    "trampoline-park": ["trampoline-park", "trampoline", "trampolines"],
    "ninja-course": ["ninja-course", "ninja", "ninja-warrior"],
    "soft-play": ["soft-play", "softplay", "toddler"],
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);

      // Try to find the matching category
      const possibleSlugs = categoryMap[categorySlug] || [categorySlug];
      
      const { data: categoryData } = await supabase
        .from("product_categories")
        .select("id")
        .in("slug", possibleSlugs)
        .eq("is_active", true)
        .limit(1)
        .single();

      if (categoryData) {
        setCategoryId(categoryData.id);
        
        // Fetch products in this category
        const { data: productsData } = await supabase
          .from("products")
          .select("*")
          .eq("category_id", categoryData.id)
          .eq("is_active", true)
          .order("is_featured", { ascending: false })
          .order("sort_order", { ascending: true })
          .limit(6);

        if (productsData) {
          setProducts(productsData);
        }
      } else {
        // Fallback: fetch any featured products
        const { data: featuredData } = await supabase
          .from("products")
          .select("*")
          .eq("is_active", true)
          .eq("is_featured", true)
          .order("sort_order", { ascending: true })
          .limit(6);

        if (featuredData) {
          setProducts(featuredData);
        }
      }

      setIsLoading(false);
    };

    fetchProducts();
  }, [categorySlug]);

  const getLocalizedName = (item: { name: string; name_en?: string | null }) => {
    if (i18n.language === "en" && item.name_en) {
      return item.name_en;
    }
    return item.name;
  };

  // Don't render if no products
  if (!isLoading && products.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="secondary" className="mb-4">
            <ShoppingBag className="w-3 h-3 mr-1" />
            {t("relatedProducts.badge", "Explore Products")}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {title || t("relatedProducts.title", "Related Products")}{" "}
            <span className="text-primary">
              {t("relatedProducts.titleHighlight", "You May Like")}
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {description || t("relatedProducts.description", "Discover more products in this category")}
          </p>
        </motion.div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-xl overflow-hidden border">
                <Skeleton className="aspect-[4/3]" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={localizedPath(`/products/${product.slug}`)}>
                  <div className="group bg-card rounded-xl overflow-hidden border hover:shadow-lg transition-all duration-300">
                    <div className="aspect-[4/3] overflow-hidden relative">
                      {product.featured_image ? (
                        <img
                          src={product.featured_image}
                          alt={getLocalizedName(product)}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <Package className="w-12 h-12 text-muted-foreground" />
                        </div>
                      )}
                      {product.is_featured && (
                        <Badge className="absolute top-3 left-3 bg-yellow-500 text-yellow-950">
                          <Star className="w-3 h-3 mr-1 fill-current" />
                          {t("products.featured", "Featured")}
                        </Badge>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-1">
                          {getLocalizedName(product)}
                        </h3>
                        <ArrowIcon className="w-4 h-4 text-primary flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                      </div>
                      {product.short_description && (
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                          {product.short_description}
                        </p>
                      )}
                      <div className="mt-3 pt-3 border-t">
                        {product.price_min || product.price_max ? (
                          <span className="text-primary font-semibold text-sm">
                            {product.price_unit} {product.price_min}
                            {product.price_max && ` - ${product.price_max}`}
                          </span>
                        ) : (
                          <span className="text-muted-foreground text-sm">
                            {t("products.contactForPrice", "Contact for price")}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link 
            to={categoryId 
              ? localizedPath(`/products?category=${categoryId}`) 
              : localizedPath("/products")
            }
          >
            <Button variant="default" size="lg" className="group">
              {t("relatedProducts.viewAll", "View All Products")}
              <ArrowIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
