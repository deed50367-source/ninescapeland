import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Play,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { getStorageUrl, productImages, projectImages, featureImages } from "@/config/galleryImages";

// 产品详情图片配置 - 每个产品多张展示图
const productDetailImages = {
  "indoor-playground": [
    // 主图 - 白底设备图
    productImages.indoorPlayground,
    // 项目实景图
    getStorageUrl("e781d029-b8d9-4101-8835-35d1d8938a12/1768294274127-w29hc.jpg"), // C_28 - 室内全景
    getStorageUrl("e781d029-b8d9-4101-8835-35d1d8938a12/1768294208983-svikya.jpg"), // A_10 - 室内游乐区
    getStorageUrl("e781d029-b8d9-4101-8835-35d1d8938a12/1768294278418-4k5i0w.jpg"), // C_29 - 多层结构
  ],
  "trampoline-park": [
    // 主图 - 蹦床区设计图
    productImages.trampolinePark,
    // 项目实景和效果图
    getStorageUrl("88de2e3c-c85e-413b-878d-99b0d0aea8ed/1768294624727-6ia03.jpg"), // 蹦床公园俯视
    getStorageUrl("88de2e3c-c85e-413b-878d-99b0d0aea8ed/1768294621773-h93mw.jpg"), // 蹦床活动区
    getStorageUrl("88de2e3c-c85e-413b-878d-99b0d0aea8ed/1768294614701-b5b7pw.jpg"), // 蹦床设计图
  ],
  "ninja-course": [
    // 主图 - 忍者设备图
    productImages.ninjaCourse,
    // 其他挑战设备
    getStorageUrl("dcbc5ed3-1863-4db6-bacf-59919b3abec6/1768294408691-xypop.jpg"), // 挑战设备1
    getStorageUrl("dcbc5ed3-1863-4db6-bacf-59919b3abec6/1768294381259-ig9ii.jpg"), // 挑战设备2
    getStorageUrl("dcbc5ed3-1863-4db6-bacf-59919b3abec6/1768294376731-g5jiv8.jpg"), // 组合设备
  ],
  "soft-play": [
    // 主图 - 软体游乐设备
    productImages.softPlay,
    // 其他软体设备
    getStorageUrl("dcbc5ed3-1863-4db6-bacf-59919b3abec6/1768294389099-q91yxf.jpg"), // 软体设备2
    getStorageUrl("dcbc5ed3-1863-4db6-bacf-59919b3abec6/1768294393164-0plpgg.jpg"), // 软体设备3
    getStorageUrl("dcbc5ed3-1863-4db6-bacf-59919b3abec6/1768294396623-yx6sqs.jpg"), // 软体设备4
  ],
};

const products = {
  "indoor-playground": {
    id: "indoor-playground",
    titleKey: "productDetail.indoorPlayground.title",
    subtitleKey: "productDetail.indoorPlayground.subtitle",
    descriptionKey: "productDetail.indoorPlayground.description",
    heroImage: productImages.indoorPlayground,
    images: productDetailImages["indoor-playground"],
    featuresKey: "productDetail.indoorPlayground.features",
    specifications: [
      { labelKey: "productDetail.specs.ageRange", value: "1-12 years" },
      { labelKey: "productDetail.specs.minSpace", value: "100 m²" },
      { labelKey: "productDetail.specs.maxHeight", value: "8 meters" },
      { labelKey: "productDetail.specs.materials", value: "Steel, PVC, Foam" },
      { labelKey: "productDetail.specs.warranty", value: "3 years" },
      { labelKey: "productDetail.specs.installation", value: "10-20 days" },
      { labelKey: "productDetail.specs.certification", value: "ASTM, EN1176, TUV" },
      { labelKey: "productDetail.specs.leadTime", value: "30-45 days" },
    ],
    priceRange: "$200 - $400 per m²",
    icon: "🎪",
  },
  "trampoline-park": {
    id: "trampoline-park",
    titleKey: "productDetail.trampolinePark.title",
    subtitleKey: "productDetail.trampolinePark.subtitle",
    descriptionKey: "productDetail.trampolinePark.description",
    heroImage: productImages.trampolinePark,
    images: productDetailImages["trampoline-park"],
    featuresKey: "productDetail.trampolinePark.features",
    specifications: [
      { labelKey: "productDetail.specs.ageRange", value: "3+ years" },
      { labelKey: "productDetail.specs.minSpace", value: "500 m²" },
      { labelKey: "productDetail.specs.maxHeight", value: "10 meters" },
      { labelKey: "productDetail.specs.materials", value: "Steel, Springs, Padding" },
      { labelKey: "productDetail.specs.warranty", value: "5 years" },
      { labelKey: "productDetail.specs.installation", value: "15-30 days" },
      { labelKey: "productDetail.specs.certification", value: "ASTM, EN12572" },
      { labelKey: "productDetail.specs.leadTime", value: "45-60 days" },
    ],
    priceRange: "$250 - $450 per m²",
    icon: "🤸",
  },
  "ninja-course": {
    id: "ninja-course",
    titleKey: "productDetail.ninjaCourse.title",
    subtitleKey: "productDetail.ninjaCourse.subtitle",
    descriptionKey: "productDetail.ninjaCourse.description",
    heroImage: productImages.ninjaCourse,
    images: productDetailImages["ninja-course"],
    featuresKey: "productDetail.ninjaCourse.features",
    specifications: [
      { labelKey: "productDetail.specs.ageRange", value: "5+ years" },
      { labelKey: "productDetail.specs.minSpace", value: "200 m²" },
      { labelKey: "productDetail.specs.maxHeight", value: "6 meters" },
      { labelKey: "productDetail.specs.materials", value: "Steel, Wood, Rubber" },
      { labelKey: "productDetail.specs.warranty", value: "3 years" },
      { labelKey: "productDetail.specs.installation", value: "10-20 days" },
      { labelKey: "productDetail.specs.certification", value: "ASTM, EN1176" },
      { labelKey: "productDetail.specs.leadTime", value: "30-45 days" },
    ],
    priceRange: "$180 - $350 per m²",
    icon: "🥷",
  },
  "soft-play": {
    id: "soft-play",
    titleKey: "productDetail.softPlay.title",
    subtitleKey: "productDetail.softPlay.subtitle",
    descriptionKey: "productDetail.softPlay.description",
    heroImage: productImages.softPlay,
    images: productDetailImages["soft-play"],
    featuresKey: "productDetail.softPlay.features",
    specifications: [
      { labelKey: "productDetail.specs.ageRange", value: "0-5 years" },
      { labelKey: "productDetail.specs.minSpace", value: "30 m²" },
      { labelKey: "productDetail.specs.maxHeight", value: "2.5 meters" },
      { labelKey: "productDetail.specs.materials", value: "PVC, Foam" },
      { labelKey: "productDetail.specs.warranty", value: "2 years" },
      { labelKey: "productDetail.specs.installation", value: "3-7 days" },
      { labelKey: "productDetail.specs.certification", value: "EN1176, ASTM" },
      { labelKey: "productDetail.specs.leadTime", value: "20-30 days" },
    ],
    priceRange: "$150 - $300 per m²",
    icon: "🧸",
  },
};

export default function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const [currentImage, setCurrentImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const { localizedPath } = useLocalizedPath();
  const { t } = useTranslation();

  const product = productId ? products[productId as keyof typeof products] : null;

  // Get translated content
  const title = product ? t(product.titleKey) : "";
  const subtitle = product ? t(product.subtitleKey) : "";
  const description = product ? t(product.descriptionKey) : "";
  const features = product ? t(product.featuresKey, { returnObjects: true }) as string[] : [];

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 section-padding">
          <div className="container-wide text-center">
            <h1 className="text-4xl font-heading font-bold mb-4">{t("productDetail.notFound.title")}</h1>
            <p className="text-muted-foreground mb-8">
              {t("productDetail.notFound.description")}
            </p>
            <Button variant="hero" asChild>
              <Link to={localizedPath("products")}>{t("productDetail.notFound.backToProducts")}</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24">
        {/* Breadcrumb */}
        <section className="py-4 border-b">
          <div className="container-wide">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to={localizedPath("")} className="hover:text-primary transition-colors">
                {t("productDetail.breadcrumb.home")}
              </Link>
              <span>/</span>
              <Link to={localizedPath("products")} className="hover:text-primary transition-colors">
                {t("productDetail.breadcrumb.products")}
              </Link>
              <span>/</span>
              <span className="text-foreground">{title}</span>
            </nav>
          </div>
        </section>

        {/* Product Hero */}
        <section className="section-padding">
          <div className="container-wide">
            <Link
              to={localizedPath("products")}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              {t("productDetail.backToProducts")}
            </Link>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Image Gallery */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group"
                  onClick={() => setLightboxOpen(true)}
                >
                  <img
                    src={product.images[currentImage]}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors flex items-center justify-center">
                    <Play className="w-16 h-16 text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Navigation Arrows */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-foreground/20 backdrop-blur-sm text-primary-foreground flex items-center justify-center hover:bg-foreground/40 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-foreground/20 backdrop-blur-sm text-primary-foreground flex items-center justify-center hover:bg-foreground/40 transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>

                {/* Thumbnails */}
                <div className="grid grid-cols-4 gap-3 mt-4">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImage(i)}
                      className={`aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all ${
                        currentImage === i
                          ? "border-primary"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${title} ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Product Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Badge variant="secondary" className="mb-4">
                  {product.icon} {subtitle}
                </Badge>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
                  {title}
                </h1>
                <p className="text-muted-foreground text-lg mb-8">
                  {description}
                </p>

                <div className="bg-muted p-6 rounded-xl mb-8">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {t("productDetail.startingFrom")}
                    </span>
                    <span className="text-2xl font-heading font-bold text-primary">
                      {product.priceRange}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <Button variant="hero" size="xl" className="w-full" asChild>
                    <Link to={localizedPath("contact")}>
                      {t("productDetail.requestQuote")}
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="w-full" asChild>
                    <a href={`${localizedPath("products")}#quote-calculator`}>
                      {t("productDetail.usePriceCalculator")}
                    </a>
                  </Button>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    {t("productDetail.benefits.free3DDesign")}
                  </span>
                  <span className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    {t("productDetail.benefits.worldwideShipping")}
                  </span>
                  <span className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    {t("productDetail.benefits.installationSupport")}
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="section-padding bg-muted">
          <div className="container-wide">
            <Tabs defaultValue="features" className="w-full">
              <TabsList className="w-full justify-start mb-8 bg-card">
                <TabsTrigger value="features" className="flex-1 md:flex-none">
                  {t("productDetail.tabs.features")}
                </TabsTrigger>
                <TabsTrigger value="specifications" className="flex-1 md:flex-none">
                  {t("productDetail.tabs.specifications")}
                </TabsTrigger>
                <TabsTrigger value="process" className="flex-1 md:flex-none">
                  {t("productDetail.tabs.process")}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="features">
                <div className="bg-card p-8 rounded-2xl">
                  <h3 className="text-2xl font-heading font-bold mb-6">
                    {t("productDetail.keyFeatures")}
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-4 bg-muted rounded-xl"
                      >
                        <Check className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="specifications">
                <div className="bg-card p-8 rounded-2xl">
                  <h3 className="text-2xl font-heading font-bold mb-6">
                    {t("productDetail.technicalSpecs")}
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {product.specifications.map((spec, i) => (
                      <div key={i} className="p-4 bg-muted rounded-xl">
                        <p className="text-sm text-muted-foreground mb-1">
                          {t(spec.labelKey)}
                        </p>
                        <p className="text-lg font-semibold">{spec.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="process">
                <div className="bg-card p-8 rounded-2xl">
                  <h3 className="text-2xl font-heading font-bold mb-6">
                    {t("productDetail.ourProcess")}
                  </h3>
                  <div className="grid md:grid-cols-4 gap-6">
                    {[
                      { step: 1, titleKey: "productDetail.process.consultation.title", descKey: "productDetail.process.consultation.desc" },
                      { step: 2, titleKey: "productDetail.process.design.title", descKey: "productDetail.process.design.desc" },
                      { step: 3, titleKey: "productDetail.process.production.title", descKey: "productDetail.process.production.desc" },
                      { step: 4, titleKey: "productDetail.process.installation.title", descKey: "productDetail.process.installation.desc" },
                    ].map((item) => (
                      <div key={item.step} className="text-center">
                        <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold mx-auto mb-4">
                          {item.step}
                        </div>
                        <h4 className="font-heading font-bold mb-2">{t(item.titleKey)}</h4>
                        <p className="text-sm text-muted-foreground">{t(item.descKey)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-primary text-primary-foreground">
          <div className="container-wide text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              {t("productDetail.cta.title")}
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              {t("productDetail.cta.description")}
            </p>
            <Button
              variant="secondary"
              size="xl"
              asChild
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              <Link to={localizedPath("contact")} className="group">
                {t("productDetail.cta.button")}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />

      {/* Lightbox */}
      {lightboxOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-foreground/90 z-50 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-primary-foreground/10 text-primary-foreground flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 w-12 h-12 rounded-full bg-primary-foreground/10 text-primary-foreground flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <img
            src={product.images[currentImage]}
            alt={title}
            className="max-w-[90vw] max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 w-12 h-12 rounded-full bg-primary-foreground/10 text-primary-foreground flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </motion.div>
      )}
    </div>
  );
}
