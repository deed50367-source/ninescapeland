import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";

import { QuoteCalculator } from "@/components/QuoteCalculator";
import { ProductFAQ } from "@/components/ProductFAQ";
import { SEOHead } from "@/components/SEOHead";
import { ProductSchema, FAQSchema, BreadcrumbSchema } from "@/components/StructuredData";
import { RelatedProductsSection } from "@/components/RelatedProductsSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { Link } from "react-router-dom";
import { getStorageUrl } from "@/config/galleryImages";
import { useSiteImages } from "@/hooks/useSiteImages";
import { motion } from "framer-motion";
import { 
  Baby, 
  Shield, 
  Sparkles, 
  Layers, 
  ArrowRight,
  CheckCircle,
  Heart,
  Award,
  Clock,
  Truck,
  Wrench,
  Quote,
  MapPin,
  Ruler,
  Star,
  Users,
  Globe,
  Building2,
  Smile,
  Brain,
  Hand,
  Palette
} from "lucide-react";

const SoftPlay = () => {
  const { t } = useTranslation();
  const { localizedPath } = useLocalizedPath();
  const { getProductGalleryImages } = useSiteImages();

  const heroImage = getStorageUrl("dcbc5ed3-1863-4db6-bacf-59919b3abec6/1768294400190-bx9gha.jpg");

  const features = [
    {
      icon: Baby,
      titleKey: "productPages.softPlay.features.toddlerSafe.title",
      descKey: "productPages.softPlay.features.toddlerSafe.description"
    },
    {
      icon: Shield,
      titleKey: "productPages.softPlay.features.materials.title",
      descKey: "productPages.softPlay.features.materials.description"
    },
    {
      icon: Sparkles,
      titleKey: "productPages.softPlay.features.easyClean.title",
      descKey: "productPages.softPlay.features.easyClean.description"
    },
    {
      icon: Layers,
      titleKey: "productPages.softPlay.features.modular.title",
      descKey: "productPages.softPlay.features.modular.description"
    }
  ];

  // 动态获取产品图库图片
  const dynamicGalleryImages = getProductGalleryImages('softPlay', 6);
  
  // 静态后备图片
  const staticGalleryImages = [
    getStorageUrl("dcbc5ed3-1863-4db6-bacf-59919b3abec6/1768294400190-bx9gha.jpg"),
    getStorageUrl("dcbc5ed3-1863-4db6-bacf-59919b3abec6/1768294376731-g5jiv8.jpg"),
    getStorageUrl("e781d029-b8d9-4101-8835-35d1d8938a12/1768294274127-w29hc.jpg"),
    getStorageUrl("dcbc5ed3-1863-4db6-bacf-59919b3abec6/1768294381259-ig9ii.jpg"),
    getStorageUrl("e781d029-b8d9-4101-8835-35d1d8938a12/1768294287219-kmtl6.jpg"),
    getStorageUrl("dcbc5ed3-1863-4db6-bacf-59919b3abec6/1768294400190-bx9gha.jpg")
  ];
  
  const galleryImages = dynamicGalleryImages.length >= 6 
    ? dynamicGalleryImages 
    : [...dynamicGalleryImages, ...staticGalleryImages.slice(dynamicGalleryImages.length)].slice(0, 6);

  const components = [
    "productPages.softPlay.components.ballPits",
    "productPages.softPlay.components.rockers",
    "productPages.softPlay.components.slides",
    "productPages.softPlay.components.tunnels",
    "productPages.softPlay.components.shapes",
    "productPages.softPlay.components.mats",
    "productPages.softPlay.components.steps",
    "productPages.softPlay.components.walls"
  ];

  const benefits = [
    {
      icon: Brain,
      titleKey: "productPages.softPlay.benefits.development.title",
      descKey: "productPages.softPlay.benefits.development.description"
    },
    {
      icon: Users,
      titleKey: "productPages.softPlay.benefits.socialSkills.title",
      descKey: "productPages.softPlay.benefits.socialSkills.description"
    },
    {
      icon: Hand,
      titleKey: "productPages.softPlay.benefits.sensory.title",
      descKey: "productPages.softPlay.benefits.sensory.description"
    }
  ];

  const stats = [
    { value: "500+", labelKey: "productPages.softPlay.stats.projects" },
    { value: "50+", labelKey: "productPages.softPlay.stats.countries" },
    { value: "15+", labelKey: "productPages.softPlay.stats.experience" },
    { value: "100%", labelKey: "productPages.softPlay.stats.satisfaction" }
  ];

  const ageZones = [
    {
      icon: Baby,
      ageKey: "productPages.softPlay.ageZones.infant.age",
      titleKey: "productPages.softPlay.ageZones.infant.title",
      descKey: "productPages.softPlay.ageZones.infant.description",
      color: "bg-category-pink"
    },
    {
      icon: Smile,
      ageKey: "productPages.softPlay.ageZones.toddler.age",
      titleKey: "productPages.softPlay.ageZones.toddler.title",
      descKey: "productPages.softPlay.ageZones.toddler.description",
      color: "bg-info"
    },
    {
      icon: Users,
      ageKey: "productPages.softPlay.ageZones.preschool.age",
      titleKey: "productPages.softPlay.ageZones.preschool.title",
      descKey: "productPages.softPlay.ageZones.preschool.description",
      color: "bg-success"
    },
    {
      icon: Star,
      ageKey: "productPages.softPlay.ageZones.mixed.age",
      titleKey: "productPages.softPlay.ageZones.mixed.title",
      descKey: "productPages.softPlay.ageZones.mixed.description",
      color: "bg-category-purple"
    }
  ];

  const advantages = [
    {
      icon: Award,
      titleKey: "productPages.softPlay.advantages.certified.title",
      descKey: "productPages.softPlay.advantages.certified.description"
    },
    {
      icon: Clock,
      titleKey: "productPages.softPlay.advantages.fast.title",
      descKey: "productPages.softPlay.advantages.fast.description"
    },
    {
      icon: Truck,
      titleKey: "productPages.softPlay.advantages.shipping.title",
      descKey: "productPages.softPlay.advantages.shipping.description"
    },
    {
      icon: Wrench,
      titleKey: "productPages.softPlay.advantages.support.title",
      descKey: "productPages.softPlay.advantages.support.description"
    }
  ];

  const caseStudies = [
    {
      image: galleryImages[0],
      titleKey: "productPages.softPlay.caseStudies.case1.title",
      locationKey: "productPages.softPlay.caseStudies.case1.location",
      sizeKey: "productPages.softPlay.caseStudies.case1.size",
      features: ["productPages.softPlay.caseStudies.case1.feature1", "productPages.softPlay.caseStudies.case1.feature2", "productPages.softPlay.caseStudies.case1.feature3"]
    },
    {
      image: galleryImages[1],
      titleKey: "productPages.softPlay.caseStudies.case2.title",
      locationKey: "productPages.softPlay.caseStudies.case2.location",
      sizeKey: "productPages.softPlay.caseStudies.case2.size",
      features: ["productPages.softPlay.caseStudies.case2.feature1", "productPages.softPlay.caseStudies.case2.feature2", "productPages.softPlay.caseStudies.case2.feature3"]
    }
  ];

  const testimonials = [
    {
      quoteKey: "productPages.softPlay.testimonials.testimonial1.quote",
      nameKey: "productPages.softPlay.testimonials.testimonial1.name",
      locationKey: "productPages.softPlay.testimonials.testimonial1.location",
      rating: 5
    },
    {
      quoteKey: "productPages.softPlay.testimonials.testimonial2.quote",
      nameKey: "productPages.softPlay.testimonials.testimonial2.name",
      locationKey: "productPages.softPlay.testimonials.testimonial2.location",
      rating: 5
    },
    {
      quoteKey: "productPages.softPlay.testimonials.testimonial3.quote",
      nameKey: "productPages.softPlay.testimonials.testimonial3.name",
      locationKey: "productPages.softPlay.testimonials.testimonial3.location",
      rating: 5
    }
  ];

  const safetyFeatures = [
    {
      icon: Shield,
      titleKey: "productPages.softPlay.safety.standards.title",
      descKey: "productPages.softPlay.safety.standards.description"
    },
    {
      icon: Palette,
      titleKey: "productPages.softPlay.safety.materials.title",
      descKey: "productPages.softPlay.safety.materials.description"
    },
    {
      icon: Sparkles,
      titleKey: "productPages.softPlay.safety.hygiene.title",
      descKey: "productPages.softPlay.safety.hygiene.description"
    }
  ];

  // FAQ items for structured data
  const faqItems = [
    { question: t("productFAQ.softPlay.items.q1.question"), answer: t("productFAQ.softPlay.items.q1.answer") },
    { question: t("productFAQ.softPlay.items.q2.question"), answer: t("productFAQ.softPlay.items.q2.answer") },
    { question: t("productFAQ.softPlay.items.q3.question"), answer: t("productFAQ.softPlay.items.q3.answer") },
    { question: t("productFAQ.softPlay.items.q4.question"), answer: t("productFAQ.softPlay.items.q4.answer") },
    { question: t("productFAQ.softPlay.items.q5.question"), answer: t("productFAQ.softPlay.items.q5.answer") },
    { question: t("productFAQ.softPlay.items.q6.question"), answer: t("productFAQ.softPlay.items.q6.answer") },
  ];

  // Breadcrumb items for structured data
  const breadcrumbItems = [
    { name: "Home", url: "https://indoorplaygroundsolution.com" },
    { name: "Products", url: "https://indoorplaygroundsolution.com/products" },
    { name: "Soft Play", url: "https://indoorplaygroundsolution.com/products/soft-play" }
  ];

  return (
    <div className="min-h-screen">
      <SEOHead pageKey="softPlay" />
      <BreadcrumbSchema items={breadcrumbItems} />
      <ProductSchema
        name="Soft Play Equipment for Toddlers"
        description="Safe and colorful soft play equipment designed for toddlers and young children. Features foam-padded structures, sensory elements, and easy-clean materials. Perfect for daycare centers and family entertainment venues."
        image={heroImage}
        category="Soft Play Equipment"
        aggregateRating={{ ratingValue: 4.9, reviewCount: 124 }}
      />
      <FAQSchema items={faqItems} />
      <Header />
      <main>
        <PageHero
          titleKey="productPages.softPlay.title"
          titleHighlightKey="productPages.softPlay.titleHighlight"
          descriptionKey="productPages.softPlay.description"
          backgroundImage={heroImage}
        />

        {/* Stats Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                  <div className="text-primary-foreground/80">{t(stat.labelKey)}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge variant="secondary" className="mb-4">
                {t("productPages.softPlay.featuresLabel")}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("productPages.softPlay.featuresTitle")}{" "}
                <span className="text-primary">{t("productPages.softPlay.featuresTitleHighlight")}</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow h-full">
                    <CardContent className="p-6 text-center">
                      <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                        <feature.icon className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{t(feature.titleKey)}</h3>
                      <p className="text-muted-foreground text-sm">{t(feature.descKey)}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Age Zones Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge variant="secondary" className="mb-4">
                {t("productPages.softPlay.ageZonesLabel")}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("productPages.softPlay.ageZonesTitle")}{" "}
                <span className="text-primary">{t("productPages.softPlay.ageZonesTitleHighlight")}</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t("productPages.softPlay.ageZonesDescription")}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ageZones.map((zone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 h-full">
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 rounded-full ${zone.color} text-white flex items-center justify-center mb-4`}>
                        <zone.icon className="w-6 h-6" />
                      </div>
                      <div className="text-sm font-medium text-primary mb-1">{t(zone.ageKey)}</div>
                      <h3 className="text-lg font-semibold mb-2">{t(zone.titleKey)}</h3>
                      <p className="text-muted-foreground text-sm">{t(zone.descKey)}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Safety Standards Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Badge variant="secondary" className="mb-4">
                  {t("productPages.softPlay.safetyLabel")}
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {t("productPages.softPlay.safetyTitle")}{" "}
                  <span className="text-primary">{t("productPages.softPlay.safetyTitleHighlight")}</span>
                </h2>
                <p className="text-muted-foreground mb-8">
                  {t("productPages.softPlay.safetyDescription")}
                </p>

                <div className="space-y-6">
                  {safetyFeatures.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-4"
                    >
                      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{t(feature.titleKey)}</h3>
                        <p className="text-muted-foreground text-sm">{t(feature.descKey)}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <img 
                  src={galleryImages[2]}
                  alt="Safety standards"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-green-500 text-white p-4 rounded-xl shadow-lg">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    <span className="font-semibold">{t("productPages.softPlay.safetyCertified")}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Components Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Badge variant="secondary" className="mb-4">
                  {t("productPages.softPlay.componentsLabel")}
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {t("productPages.softPlay.componentsTitle")}{" "}
                  <span className="text-primary">{t("productPages.softPlay.componentsTitleHighlight")}</span>
                </h2>
                <p className="text-muted-foreground mb-8">
                  {t("productPages.softPlay.componentsDescription")}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  {components.map((comp, index) => (
                    <motion.div 
                      key={index} 
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm">{t(comp)}</span>
                    </motion.div>
                  ))}
                </div>

                <Link to={localizedPath("/contact")}>
                  <Button size="lg" className="group">
                    {t("productPages.softPlay.cta")}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <img 
                  src={galleryImages[0]}
                  alt="Soft play components"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-4 rounded-xl shadow-lg">
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    <span className="font-semibold">{t("productPages.softPlay.kidsFriendly")}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge variant="secondary" className="mb-4">
                {t("productPages.softPlay.benefitsLabel")}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("productPages.softPlay.benefitsTitle")}{" "}
                <span className="text-primary">{t("productPages.softPlay.benefitsTitleHighlight")}</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-0 shadow-lg h-full">
                    <CardContent className="p-8">
                      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <benefit.icon className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{t(benefit.titleKey)}</h3>
                      <p className="text-muted-foreground">{t(benefit.descKey)}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Advantages Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge variant="secondary" className="mb-4">
                {t("productPages.softPlay.advantagesLabel")}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("productPages.softPlay.advantagesTitle")}{" "}
                <span className="text-primary">{t("productPages.softPlay.advantagesTitleHighlight")}</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {advantages.map((advantage, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow h-full text-center">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                        <advantage.icon className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{t(advantage.titleKey)}</h3>
                      <p className="text-muted-foreground text-sm">{t(advantage.descKey)}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge variant="secondary" className="mb-4">
                {t("productPages.softPlay.caseStudiesLabel")}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("productPages.softPlay.caseStudiesTitle")}{" "}
                <span className="text-primary">{t("productPages.softPlay.caseStudiesTitleHighlight")}</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t("productPages.softPlay.caseStudiesDescription")}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {caseStudies.map((study, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Card className="overflow-hidden border-0 shadow-xl">
                    <div className="aspect-video relative">
                      <img 
                        src={study.image}
                        alt={t(study.titleKey)}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-xl font-bold">{t(study.titleKey)}</h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-white/80">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {t(study.locationKey)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Ruler className="w-4 h-4" />
                            {t(study.sizeKey)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex flex-wrap gap-2">
                        {study.features.map((feature, fIndex) => (
                          <Badge key={fIndex} variant="secondary">
                            {t(feature)}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge variant="secondary" className="mb-4">
                {t("productPages.softPlay.testimonialsLabel")}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("productPages.softPlay.testimonialsTitle")}{" "}
                <span className="text-primary">{t("productPages.softPlay.testimonialsTitleHighlight")}</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-0 shadow-lg h-full">
                    <CardContent className="p-6">
                      <Quote className="w-10 h-10 text-primary/30 mb-4" />
                      <p className="text-muted-foreground mb-4 italic">
                        "{t(testimonial.quoteKey)}"
                      </p>
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <div className="font-semibold">{t(testimonial.nameKey)}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {t(testimonial.locationKey)}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge variant="secondary" className="mb-4">
                {t("productPages.softPlay.galleryLabel")}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("productPages.softPlay.galleryTitle")}{" "}
                <span className="text-primary">{t("productPages.softPlay.galleryTitleHighlight")}</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryImages.map((image, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden group"
                >
                  <img 
                    src={image} 
                    alt={`Soft play ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("productPages.softPlay.ctaSection.title")}
              </h2>
              <p className="text-primary-foreground/80 mb-8 text-lg">
                {t("productPages.softPlay.ctaSection.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={localizedPath("/contact")}>
                  <Button size="lg" variant="secondary" className="group">
                    {t("productPages.softPlay.ctaSection.getQuote")}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to={localizedPath("/projects")}>
                  <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                    {t("productPages.softPlay.ctaSection.viewProjects")}
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <RelatedProductsSection categorySlug="soft-play" />
        <ProductFAQ productType="softPlay" />
        <QuoteCalculator />
      </main>
      <Footer />
      <FloatingCTA />
      
    </div>
  );
};

export default SoftPlay;