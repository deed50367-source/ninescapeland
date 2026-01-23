import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { SEOHead } from "@/components/SEOHead";
import { ProductSchema } from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { useRTL } from "@/hooks/useRTL";
import { useWhatsAppTracking } from "@/hooks/useWhatsAppTracking";
import {
  ArrowRight,
  ArrowLeft,
  Star,
  Package,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  MessageCircle,
  Phone,
  Mail,
} from "lucide-react";

interface ProductCategory {
  id: string;
  name: string;
  name_en: string | null;
  name_ar: string | null;
  name_de: string | null;
  name_es: string | null;
  name_pt: string | null;
  slug: string;
}

interface ProductVariant {
  id: string;
  name: string;
  sku: string | null;
  price: number | null;
  specifications: Record<string, string>;
  image_url: string | null;
  is_active: boolean;
}

interface Product {
  id: string;
  name: string;
  name_en: string | null;
  name_ar: string | null;
  name_de: string | null;
  name_es: string | null;
  name_pt: string | null;
  slug: string;
  short_description: string | null;
  description: string | null;
  description_en: string | null;
  description_ar: string | null;
  description_de: string | null;
  description_es: string | null;
  description_pt: string | null;
  featured_image: string | null;
  gallery_images: string[];
  price_min: number | null;
  price_max: number | null;
  price_unit: string | null;
  specifications: Record<string, string>;
  features: string[];
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string | null;
  is_featured: boolean;
  category_id: string | null;
  category?: ProductCategory;
}

interface RelatedProduct {
  id: string;
  name: string;
  name_en: string | null;
  name_ar: string | null;
  name_de: string | null;
  name_es: string | null;
  name_pt: string | null;
  slug: string;
  featured_image: string | null;
  price_min: number | null;
  price_unit: string | null;
}

const DynamicProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const { localizedPath } = useLocalizedPath();
  const { isRTL } = useRTL();
  const { openWhatsApp } = useWhatsAppTracking();

  const [product, setProduct] = useState<Product | null>(null);
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Gallery state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) return;

      setIsLoading(true);
      setNotFound(false);

      const { data, error } = await supabase
        .from("products")
        .select("*, category:product_categories(*)")
        .eq("slug", slug)
        .eq("is_active", true)
        .maybeSingle();

      if (error || !data) {
        setNotFound(true);
        setIsLoading(false);
        return;
      }

      const productData: Product = {
        ...data,
        gallery_images: data.gallery_images || [],
        specifications: (data.specifications as Record<string, string>) || {},
        features: data.features || [],
      };

      setProduct(productData);

      // Fetch variants
      const { data: variantsData } = await supabase
        .from("product_variants")
        .select("*")
        .eq("product_id", data.id)
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

      if (variantsData) {
        setVariants(
          variantsData.map((v) => ({
            ...v,
            specifications: (v.specifications as Record<string, string>) || {},
          }))
        );
      }

      // Fetch related products
      if (data.category_id) {
        const { data: relatedData } = await supabase
          .from("products")
          .select("id, name, name_en, name_ar, name_de, name_es, name_pt, slug, featured_image, price_min, price_unit")
          .eq("category_id", data.category_id)
          .eq("is_active", true)
          .neq("id", data.id)
          .limit(4);

        if (relatedData) {
          setRelatedProducts(relatedData);
        }
      }

      setIsLoading(false);
    };

    fetchProduct();
  }, [slug]);

  // Get localized content
  const getLocalizedName = (item: { 
    name: string; 
    name_en?: string | null;
    name_ar?: string | null;
    name_de?: string | null;
    name_es?: string | null;
    name_pt?: string | null;
  }) => {
    const lang = i18n.language;
    if (lang === "en" && item.name_en) return item.name_en;
    if (lang === "ar" && item.name_ar) return item.name_ar;
    if (lang === "de" && item.name_de) return item.name_de;
    if (lang === "es" && item.name_es) return item.name_es;
    if (lang === "pt" && item.name_pt) return item.name_pt;
    // Fallback to English, then default name
    return item.name_en || item.name;
  };

  const getLocalizedDescription = () => {
    if (!product) return "";
    const lang = i18n.language;
    if (lang === "en" && product.description_en) return product.description_en;
    if (lang === "ar" && product.description_ar) return product.description_ar;
    if (lang === "de" && product.description_de) return product.description_de;
    if (lang === "es" && product.description_es) return product.description_es;
    if (lang === "pt" && product.description_pt) return product.description_pt;
    // Fallback to English, then default description
    return product.description_en || product.description || "";
  };

  // Gallery images
  const allImages = product
    ? [product.featured_image, ...product.gallery_images].filter(Boolean) as string[]
    : [];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Skeleton className="aspect-square rounded-2xl" />
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-12 w-40" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Not found state
  if (notFound || !product) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-20 text-center">
            <Package className="w-20 h-20 mx-auto text-muted-foreground mb-6" />
            <h1 className="text-3xl font-bold mb-4">
              {t("products.notFound", "产品未找到")}
            </h1>
            <p className="text-muted-foreground mb-8">
              {t("products.notFoundDesc", "抱歉，该产品不存在或已下架")}
            </p>
            <Button asChild>
              <Link to={localizedPath("/products")}>
                <ArrowIcon className="w-4 h-4 mr-2 rotate-180" />
                {t("products.backToProducts", "返回产品列表")}
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SEOHead
        pageKey="products"
        dynamicTitle={product.seo_title || getLocalizedName(product)}
        dynamicDescription={product.seo_description || product.short_description || undefined}
      />
      <ProductSchema
        name={getLocalizedName(product)}
        description={product.short_description || getLocalizedDescription()}
        image={product.featured_image || ""}
        category={product.category ? getLocalizedName(product.category) : "Products"}
        offers={{
          priceRange: product.price_min ? `${product.price_unit} ${product.price_min}${product.price_max ? ` - ${product.price_max}` : ""}` : undefined,
        }}
      />
      <Header />

      <main className="pt-20">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link
              to={localizedPath("/")}
              className="text-muted-foreground hover:text-foreground"
            >
              {t("nav.home", "首页")}
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link
              to={localizedPath("/products")}
              className="text-muted-foreground hover:text-foreground"
            >
              {t("nav.products", "产品")}
            </Link>
            {product.category && (
              <>
                <span className="text-muted-foreground">/</span>
                <Link
                  to={localizedPath(`/products?category=${product.category.id}`)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {getLocalizedName(product.category)}
                </Link>
              </>
            )}
            <span className="text-muted-foreground">/</span>
            <span className="font-medium">{getLocalizedName(product)}</span>
          </nav>
        </div>

        {/* Product Hero */}
        <section className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
                {allImages.length > 0 ? (
                  <>
                    <img
                      src={allImages[currentImageIndex]}
                      alt={getLocalizedName(product)}
                      className="w-full h-full object-cover cursor-zoom-in"
                      onClick={() => setIsLightboxOpen(true)}
                    />
                    {allImages.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-colors"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-colors"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="w-24 h-24 text-muted-foreground" />
                  </div>
                )}
                {product.is_featured && (
                  <Badge className="absolute top-4 left-4 bg-yellow-500 text-yellow-950">
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    {t("products.featured", "推荐")}
                  </Badge>
                )}
              </div>

              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {allImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        index === currentImageIndex
                          ? "border-primary"
                          : "border-transparent hover:border-muted-foreground/50"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${getLocalizedName(product)} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {product.category && (
                <Link
                  to={localizedPath(`/products?category=${product.category.id}`)}
                  className="text-primary text-sm font-medium hover:underline"
                >
                  {getLocalizedName(product.category)}
                </Link>
              )}

              <h1 className="text-3xl lg:text-4xl font-bold">
                {getLocalizedName(product)}
              </h1>

              {product.short_description && (
                <p className="text-lg text-muted-foreground">
                  {product.short_description}
                </p>
              )}

              {/* Price */}
              <div className="py-4 border-y">
                {product.price_min || product.price_max ? (
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-primary">
                      {product.price_unit} {product.price_min}
                    </span>
                    {product.price_max && (
                      <>
                        <span className="text-muted-foreground">-</span>
                        <span className="text-3xl font-bold text-primary">
                          {product.price_max}
                        </span>
                      </>
                    )}
                  </div>
                ) : (
                  <p className="text-lg text-muted-foreground">
                    {t("products.contactForPrice", "请联系我们获取报价")}
                  </p>
                )}
              </div>

              {/* Features */}
              {product.features.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold">
                    {t("products.features", "产品特性")}
                  </h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button size="lg" className="flex-1" asChild>
                  <a 
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      openWhatsApp("product_detail", { productName: getLocalizedName(product) });
                    }}
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    {t("products.getQuote", "获取报价")}
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="flex-1" asChild>
                  <Link to={localizedPath("/contact")}>
                    <Mail className="w-5 h-5 mr-2" />
                    {t("products.contactUs", "联系我们")}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Product Details Tabs */}
        <section className="container mx-auto px-4 py-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 mb-8">
              <TabsTrigger
                value="description"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
              >
                {t("products.description", "产品详情")}
              </TabsTrigger>
              {Object.keys(product.specifications).length > 0 && (
                <TabsTrigger
                  value="specifications"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                >
                  {t("products.specifications", "规格参数")}
                </TabsTrigger>
              )}
              {variants.length > 0 && (
                <TabsTrigger
                  value="variants"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                >
                  {t("products.variants", "产品变体")}
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="description" className="mt-0">
              <div className="prose prose-lg max-w-none">
                {getLocalizedDescription() ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: getLocalizedDescription().replace(/\n/g, "<br />"),
                    }}
                  />
                ) : (
                  <p className="text-muted-foreground">
                    {t("products.noDescription", "暂无详细描述")}
                  </p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between py-3 px-4 bg-muted/50 rounded-lg"
                  >
                    <span className="font-medium">{key}</span>
                    <span className="text-muted-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="variants" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {variants.map((variant) => (
                  <div
                    key={variant.id}
                    className="flex items-center gap-4 p-4 bg-card rounded-xl border"
                  >
                    {variant.image_url ? (
                      <img
                        src={variant.image_url}
                        alt={variant.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                        <Package className="w-8 h-8 text-muted-foreground" />
                      </div>
                    )}
                    <div className="flex-1">
                      <h4 className="font-semibold">{variant.name}</h4>
                      {variant.sku && (
                        <p className="text-sm text-muted-foreground">
                          SKU: {variant.sku}
                        </p>
                      )}
                      {variant.price && (
                        <p className="text-primary font-semibold mt-1">
                          {product.price_unit} {variant.price}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="container mx-auto px-4 py-12 border-t">
            <h2 className="text-2xl font-bold mb-8">
              {t("products.relatedProducts", "相关产品")}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((relProduct) => (
                <Link
                  key={relProduct.id}
                  to={localizedPath(`/products/${relProduct.slug}`)}
                  className="group"
                >
                  <div className="bg-card rounded-xl overflow-hidden border hover:shadow-lg transition-shadow">
                    <div className="aspect-square overflow-hidden">
                      {relProduct.featured_image ? (
                        <img
                          src={relProduct.featured_image}
                          alt={getLocalizedName(relProduct)}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <Package className="w-12 h-12 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-2">
                        {getLocalizedName(relProduct)}
                      </h3>
                      {relProduct.price_min && (
                        <p className="text-primary font-semibold text-sm mt-1">
                          {relProduct.price_unit} {relProduct.price_min}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={() => setIsLightboxOpen(false)}
          >
            <button
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              onClick={() => setIsLightboxOpen(false)}
            >
              <X className="w-6 h-6 text-white" />
            </button>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
            >
              <ChevronLeft className="w-8 h-8 text-white" />
            </button>
            <img
              src={allImages[currentImageIndex]}
              alt={getLocalizedName(product)}
              className="max-w-[90vw] max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              <ChevronRight className="w-8 h-8 text-white" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
              {currentImageIndex + 1} / {allImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default DynamicProductDetail;