import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { useRTL } from "@/hooks/useRTL";
import { heroImages } from "@/config/galleryImages";
import {
  ArrowRight,
  ArrowLeft,
  Star,
  Package,
  Filter,
  Grid,
  List,
  Search,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";

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
  short_description: string | null;
  featured_image: string | null;
  price_min: number | null;
  price_max: number | null;
  price_unit: string | null;
  features: string[];
  is_featured: boolean;
  category_id: string | null;
  category?: ProductCategory;
}

const DynamicProducts = () => {
  const { t, i18n } = useTranslation();
  const { localizedPath } = useLocalizedPath();
  const { isRTL } = useRTL();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  // Load category from URL params
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const [categoriesRes, productsRes] = await Promise.all([
        supabase
          .from("product_categories")
          .select("*")
          .eq("is_active", true)
          .order("sort_order", { ascending: true }),
        supabase
          .from("products")
          .select("*, category:product_categories(*)")
          .eq("is_active", true)
          .order("sort_order", { ascending: true }),
      ]);

      if (categoriesRes.data) setCategories(categoriesRes.data);
      if (productsRes.data) {
        setProducts(
          productsRes.data.map((p) => ({
            ...p,
            features: p.features || [],
          }))
        );
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  // Get localized name
  const getLocalizedName = (item: { name: string; name_en?: string | null }) => {
    if (i18n.language === "en" && item.name_en) {
      return item.name_en;
    }
    return item.name;
  };

  // Handle category change
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    if (categoryId === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", categoryId);
    }
    setSearchParams(searchParams);
  };

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category_id === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.name_en?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.short_description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get featured products
  const featuredProducts = products.filter((p) => p.is_featured);

  return (
    <div className="min-h-screen">
      <SEOHead pageKey="products" />
      <Header />
      <main>
        <PageHero
          titleKey="pages.products.title"
          titleHighlightKey="pages.products.titleHighlight"
          descriptionKey="pages.products.description"
          backgroundImage={heroImages.products}
        />

        {/* Featured Products Section */}
        {featuredProducts.length > 0 && (
          <section className="py-16 bg-gradient-to-b from-background to-muted/30">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-10"
              >
                <Badge variant="secondary" className="mb-4">
                  <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                  {t("products.featured", "推荐产品")}
                </Badge>
                <h2 className="text-3xl font-bold">
                  {t("products.featuredTitle", "热门推荐")}
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProducts.slice(0, 3).map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link to={localizedPath(`/products/${product.slug}`)}>
                      <div className="group relative bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border">
                        <div className="aspect-[4/3] overflow-hidden">
                          {product.featured_image ? (
                            <img
                              src={product.featured_image}
                              alt={getLocalizedName(product)}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full bg-muted flex items-center justify-center">
                              <Package className="w-16 h-16 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-yellow-500 text-yellow-950">
                            <Star className="w-3 h-3 mr-1 fill-current" />
                            {t("products.featured", "推荐")}
                          </Badge>
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                            {getLocalizedName(product)}
                          </h3>
                          {product.short_description && (
                            <p className="text-muted-foreground text-sm line-clamp-2">
                              {product.short_description}
                            </p>
                          )}
                          <div className="flex items-center justify-between mt-4">
                            {product.price_min || product.price_max ? (
                              <span className="text-primary font-semibold">
                                {product.price_unit} {product.price_min}
                                {product.price_max && ` - ${product.price_max}`}
                              </span>
                            ) : (
                              <span className="text-muted-foreground text-sm">
                                {t("products.contactForPrice", "询价")}
                              </span>
                            )}
                            <ArrowIcon className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Products Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* Filters */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
              {/* Category Filter */}
              <div className="flex flex-wrap items-center gap-2">
                <Filter className="w-5 h-5 text-muted-foreground" />
                <Button
                  variant={selectedCategory === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCategoryChange("all")}
                >
                  {t("products.allCategories", "全部")}
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleCategoryChange(category.id)}
                  >
                    {getLocalizedName(category)}
                  </Button>
                ))}
              </div>

              {/* Search & View Mode */}
              <div className="flex items-center gap-3">
                <div className="relative flex-1 lg:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder={t("products.search", "搜索产品...")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-9"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-1 border rounded-lg p-1">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Results count */}
            <p className="text-sm text-muted-foreground mb-6">
              {t("products.showing", "显示")} {filteredProducts.length}{" "}
              {t("products.items", "个产品")}
              {selectedCategory !== "all" && (
                <Button
                  variant="link"
                  size="sm"
                  className="ml-2 h-auto p-0"
                  onClick={() => handleCategoryChange("all")}
                >
                  {t("products.clearFilter", "清除筛选")}
                </Button>
              )}
            </p>

            {/* Loading State */}
            {isLoading && (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    : "space-y-4"
                }
              >
                {[...Array(8)].map((_, i) => (
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
            )}

            {/* Products Grid/List */}
            {!isLoading && (
              <AnimatePresence mode="wait">
                {filteredProducts.length > 0 ? (
                  <motion.div
                    key={`${selectedCategory}-${viewMode}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={
                      viewMode === "grid"
                        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        : "space-y-4"
                    }
                  >
                    {filteredProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link to={localizedPath(`/products/${product.slug}`)}>
                          {viewMode === "grid" ? (
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
                                    {t("products.featured", "推荐")}
                                  </Badge>
                                )}
                              </div>
                              <div className="p-4">
                                <div className="flex items-start justify-between gap-2">
                                  <div>
                                    <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-1">
                                      {getLocalizedName(product)}
                                    </h3>
                                    {product.category && (
                                      <p className="text-xs text-muted-foreground mt-1">
                                        {getLocalizedName(product.category)}
                                      </p>
                                    )}
                                  </div>
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
                                      {t("products.contactForPrice", "询价")}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="group flex items-center gap-4 bg-card rounded-xl p-4 border hover:shadow-lg transition-all duration-300">
                              <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                                {product.featured_image ? (
                                  <img
                                    src={product.featured_image}
                                    alt={getLocalizedName(product)}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full bg-muted flex items-center justify-center">
                                    <Package className="w-8 h-8 text-muted-foreground" />
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold group-hover:text-primary transition-colors">
                                    {getLocalizedName(product)}
                                  </h3>
                                  {product.is_featured && (
                                    <Badge variant="secondary" className="text-xs">
                                      <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                                      {t("products.featured", "推荐")}
                                    </Badge>
                                  )}
                                </div>
                                {product.category && (
                                  <p className="text-xs text-muted-foreground">
                                    {getLocalizedName(product.category)}
                                  </p>
                                )}
                                {product.short_description && (
                                  <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                                    {product.short_description}
                                  </p>
                                )}
                              </div>
                              <div className="text-right flex-shrink-0">
                                {product.price_min || product.price_max ? (
                                  <span className="text-primary font-semibold">
                                    {product.price_unit} {product.price_min}
                                    {product.price_max && ` - ${product.price_max}`}
                                  </span>
                                ) : (
                                  <span className="text-muted-foreground text-sm">
                                    {t("products.contactForPrice", "询价")}
                                  </span>
                                )}
                              </div>
                              <ArrowIcon className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                            </div>
                          )}
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16"
                  >
                    <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      {t("products.noProducts", "暂无产品")}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {searchQuery
                        ? t("products.noSearchResults", "没有找到匹配的产品")
                        : t("products.emptyCategory", "该分类下暂无产品")}
                    </p>
                    {(searchQuery || selectedCategory !== "all") && (
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSearchQuery("");
                          handleCategoryChange("all");
                        }}
                      >
                        {t("products.viewAll", "查看全部产品")}
                      </Button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        </section>

        {/* Categories Overview */}
        {categories.length > 0 && (
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-10"
              >
                <h2 className="text-3xl font-bold">
                  {t("products.browseByCategory", "按分类浏览")}
                </h2>
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categories.map((category, index) => {
                  const categoryProducts = products.filter(
                    (p) => p.category_id === category.id
                  );
                  return (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <button
                        onClick={() => handleCategoryChange(category.id)}
                        className="w-full group"
                      >
                        <div className="relative aspect-square rounded-xl overflow-hidden bg-card border">
                          {category.image_url ? (
                            <img
                              src={category.image_url}
                              alt={getLocalizedName(category)}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                              <Package className="w-12 h-12 text-primary" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                            <h3 className="font-semibold">
                              {getLocalizedName(category)}
                            </h3>
                            <p className="text-sm text-white/70">
                              {categoryProducts.length}{" "}
                              {t("products.items", "个产品")}
                            </p>
                          </div>
                        </div>
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default DynamicProducts;