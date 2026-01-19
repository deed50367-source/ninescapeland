import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { FloatingMascot } from "@/components/FloatingMascot";
import { QuoteCalculator } from "@/components/QuoteCalculator";
import { ProductFAQ } from "@/components/ProductFAQ";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { Link } from "react-router-dom";
import { getStorageUrl } from "@/config/galleryImages";
import { motion } from "framer-motion";
import { 
  Palette, 
  Shield, 
  Users, 
  Layers, 
  Sparkles, 
  ArrowRight,
  CheckCircle,
  Star,
  Baby,
  Rocket,
  Target,
  Award,
  Clock,
  Truck,
  Wrench,
  Quote,
  MapPin,
  Ruler,
  Building2,
  TreePine,
  Anchor,
  Castle,
  Plane,
  Brain,
  Heart,
  Hand,
  Smile,
  Lightbulb,
  FileCheck,
  Pencil,
  Factory,
  Package,
  Settings,
  Headphones,
  Globe
} from "lucide-react";

const IndoorPlayground = () => {
  const { t } = useTranslation();
  const { localizedPath } = useLocalizedPath();

  const heroImage = getStorageUrl("dcbc5ed3-1863-4db6-bacf-59919b3abec6/1768294376731-g5jiv8.jpg");

  const features = [
    {
      icon: Palette,
      titleKey: "productPages.indoorPlayground.features.customTheme.title",
      descKey: "productPages.indoorPlayground.features.customTheme.description"
    },
    {
      icon: Shield,
      titleKey: "productPages.indoorPlayground.features.safety.title",
      descKey: "productPages.indoorPlayground.features.safety.description"
    },
    {
      icon: Users,
      titleKey: "productPages.indoorPlayground.features.allAges.title",
      descKey: "productPages.indoorPlayground.features.allAges.description"
    },
    {
      icon: Layers,
      titleKey: "productPages.indoorPlayground.features.modular.title",
      descKey: "productPages.indoorPlayground.features.modular.description"
    }
  ];

  const galleryImages = [
    getStorageUrl("dcbc5ed3-1863-4db6-bacf-59919b3abec6/1768294376731-g5jiv8.jpg"),
    getStorageUrl("e781d029-b8d9-4101-8835-35d1d8938a12/1768294274127-w29hc.jpg"),
    getStorageUrl("e781d029-b8d9-4101-8835-35d1d8938a12/1768294208983-svikya.jpg"),
    getStorageUrl("e781d029-b8d9-4101-8835-35d1d8938a12/1768294282861-8dkfa.jpg"),
    getStorageUrl("dcbc5ed3-1863-4db6-bacf-59919b3abec6/1768294381259-ig9ii.jpg"),
    getStorageUrl("dcbc5ed3-1863-4db6-bacf-59919b3abec6/1768294400190-bx9gha.jpg")
  ];

  const components = [
    "productPages.indoorPlayground.components.slides",
    "productPages.indoorPlayground.components.ballPits",
    "productPages.indoorPlayground.components.climbingNets",
    "productPages.indoorPlayground.components.tubes",
    "productPages.indoorPlayground.components.obstacles",
    "productPages.indoorPlayground.components.interactiveGames",
    "productPages.indoorPlayground.components.ropeElements",
    "productPages.indoorPlayground.components.softPlay"
  ];

  const stats = [
    { value: "2000+", labelKey: "productPages.indoorPlayground.stats.projects" },
    { value: "50+", labelKey: "productPages.indoorPlayground.stats.countries" },
    { value: "15+", labelKey: "productPages.indoorPlayground.stats.years" },
    { value: "100%", labelKey: "productPages.indoorPlayground.stats.customization" }
  ];

  const ageZones = [
    {
      icon: Baby,
      ageRange: "0-3",
      titleKey: "productPages.indoorPlayground.ageZones.toddler.title",
      descKey: "productPages.indoorPlayground.ageZones.toddler.description",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: Users,
      ageRange: "3-7",
      titleKey: "productPages.indoorPlayground.ageZones.kids.title",
      descKey: "productPages.indoorPlayground.ageZones.kids.description",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Rocket,
      ageRange: "7-12",
      titleKey: "productPages.indoorPlayground.ageZones.juniors.title",
      descKey: "productPages.indoorPlayground.ageZones.juniors.description",
      color: "from-orange-500 to-amber-500"
    },
    {
      icon: Target,
      ageRange: "12+",
      titleKey: "productPages.indoorPlayground.ageZones.teens.title",
      descKey: "productPages.indoorPlayground.ageZones.teens.description",
      color: "from-purple-500 to-violet-500"
    }
  ];

  const advantages = [
    {
      icon: Award,
      titleKey: "productPages.indoorPlayground.advantages.certified.title",
      descKey: "productPages.indoorPlayground.advantages.certified.description"
    },
    {
      icon: Clock,
      titleKey: "productPages.indoorPlayground.advantages.fastDelivery.title",
      descKey: "productPages.indoorPlayground.advantages.fastDelivery.description"
    },
    {
      icon: Truck,
      titleKey: "productPages.indoorPlayground.advantages.globalShipping.title",
      descKey: "productPages.indoorPlayground.advantages.globalShipping.description"
    },
    {
      icon: Wrench,
      titleKey: "productPages.indoorPlayground.advantages.installation.title",
      descKey: "productPages.indoorPlayground.advantages.installation.description"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Family Fun Center, Texas, USA",
      quote: "productPages.indoorPlayground.testimonials.sarah",
      rating: 5
    },
    {
      name: "Ahmed Al-Rashid",
      location: "Kids Kingdom, Dubai, UAE",
      quote: "productPages.indoorPlayground.testimonials.ahmed",
      rating: 5
    },
    {
      name: "Emma Williams",
      location: "Play Paradise, London, UK",
      quote: "productPages.indoorPlayground.testimonials.emma",
      rating: 5
    }
  ];

  const caseStudies = [
    {
      image: galleryImages[0],
      titleKey: "productPages.indoorPlayground.cases.case1.title",
      locationKey: "productPages.indoorPlayground.cases.case1.location",
      size: "850 sqm",
      features: ["Multi-level Structure", "Custom Theme", "Interactive Games"]
    },
    {
      image: galleryImages[3],
      titleKey: "productPages.indoorPlayground.cases.case2.title",
      locationKey: "productPages.indoorPlayground.cases.case2.location",
      size: "1200 sqm",
      features: ["Toddler Zone", "Adventure Course", "Ball Pit Arena"]
    }
  ];

  // Theme designs
  const themeDesigns = [
    {
      icon: TreePine,
      titleKey: "productPages.indoorPlayground.themes.jungle.title",
      descKey: "productPages.indoorPlayground.themes.jungle.description",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Anchor,
      titleKey: "productPages.indoorPlayground.themes.ocean.title",
      descKey: "productPages.indoorPlayground.themes.ocean.description",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Castle,
      titleKey: "productPages.indoorPlayground.themes.castle.title",
      descKey: "productPages.indoorPlayground.themes.castle.description",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Plane,
      titleKey: "productPages.indoorPlayground.themes.space.title",
      descKey: "productPages.indoorPlayground.themes.space.description",
      color: "from-indigo-500 to-violet-500"
    }
  ];

  // Benefits for children
  const childBenefits = [
    {
      icon: Brain,
      titleKey: "productPages.indoorPlayground.benefits.cognitive.title",
      descKey: "productPages.indoorPlayground.benefits.cognitive.description"
    },
    {
      icon: Heart,
      titleKey: "productPages.indoorPlayground.benefits.physical.title",
      descKey: "productPages.indoorPlayground.benefits.physical.description"
    },
    {
      icon: Hand,
      titleKey: "productPages.indoorPlayground.benefits.motor.title",
      descKey: "productPages.indoorPlayground.benefits.motor.description"
    },
    {
      icon: Smile,
      titleKey: "productPages.indoorPlayground.benefits.social.title",
      descKey: "productPages.indoorPlayground.benefits.social.description"
    }
  ];

  // Design process steps
  const designProcess = [
    {
      icon: Lightbulb,
      step: "01",
      titleKey: "productPages.indoorPlayground.designProcess.consultation.title",
      descKey: "productPages.indoorPlayground.designProcess.consultation.description"
    },
    {
      icon: Pencil,
      step: "02",
      titleKey: "productPages.indoorPlayground.designProcess.design.title",
      descKey: "productPages.indoorPlayground.designProcess.design.description"
    },
    {
      icon: Factory,
      step: "03",
      titleKey: "productPages.indoorPlayground.designProcess.production.title",
      descKey: "productPages.indoorPlayground.designProcess.production.description"
    },
    {
      icon: Package,
      step: "04",
      titleKey: "productPages.indoorPlayground.designProcess.shipping.title",
      descKey: "productPages.indoorPlayground.designProcess.shipping.description"
    },
    {
      icon: Settings,
      step: "05",
      titleKey: "productPages.indoorPlayground.designProcess.installation.title",
      descKey: "productPages.indoorPlayground.designProcess.installation.description"
    },
    {
      icon: Headphones,
      step: "06",
      titleKey: "productPages.indoorPlayground.designProcess.support.title",
      descKey: "productPages.indoorPlayground.designProcess.support.description"
    }
  ];

  // Safety standards
  const safetyStandards = [
    {
      icon: FileCheck,
      titleKey: "productPages.indoorPlayground.safety.astm.title",
      descKey: "productPages.indoorPlayground.safety.astm.description"
    },
    {
      icon: Shield,
      titleKey: "productPages.indoorPlayground.safety.tuv.title",
      descKey: "productPages.indoorPlayground.safety.tuv.description"
    },
    {
      icon: Award,
      titleKey: "productPages.indoorPlayground.safety.ce.title",
      descKey: "productPages.indoorPlayground.safety.ce.description"
    },
    {
      icon: Globe,
      titleKey: "productPages.indoorPlayground.safety.en.title",
      descKey: "productPages.indoorPlayground.safety.en.description"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <PageHero
          titleKey="productPages.indoorPlayground.title"
          titleHighlightKey="productPages.indoorPlayground.titleHighlight"
          descriptionKey="productPages.indoorPlayground.description"
          backgroundImage={heroImage}
        />

        {/* Stats Section */}
        <section className="py-12 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
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
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                {t("productPages.indoorPlayground.featuresLabel")}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("productPages.indoorPlayground.featuresTitle")}{" "}
                <span className="text-primary">{t("productPages.indoorPlayground.featuresTitleHighlight")}</span>
              </h2>
            </div>

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

        {/* Theme Designs Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                {t("productPages.indoorPlayground.themesLabel")}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("productPages.indoorPlayground.themesTitle")}{" "}
                <span className="text-primary">{t("productPages.indoorPlayground.themesTitleHighlight")}</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t("productPages.indoorPlayground.themesDescription")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {themeDesigns.map((theme, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full cursor-pointer">
                    <CardContent className="p-6">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${theme.color} flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all`}>
                        <theme.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-center">
                        <h3 className="text-lg font-semibold mb-2">{t(theme.titleKey)}</h3>
                        <p className="text-muted-foreground text-sm">{t(theme.descKey)}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-muted-foreground mb-4">{t("productPages.indoorPlayground.themesCustomNote")}</p>
              <Link to={localizedPath("/contact")}>
                <Button variant="outline" className="group">
                  {t("productPages.indoorPlayground.themesDiscuss")}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Age Zones Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                {t("productPages.indoorPlayground.ageZonesLabel")}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("productPages.indoorPlayground.ageZonesTitle")}{" "}
                <span className="text-primary">{t("productPages.indoorPlayground.ageZonesTitleHighlight")}</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t("productPages.indoorPlayground.ageZonesDescription")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ageZones.map((zone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                    <CardContent className="p-6">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${zone.color} flex items-center justify-center transform group-hover:scale-110 transition-transform`}>
                        <zone.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-center">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${zone.color} text-white mb-3`}>
                          {zone.ageRange} {t("productPages.indoorPlayground.years")}
                        </span>
                        <h3 className="text-lg font-semibold mb-2">{t(zone.titleKey)}</h3>
                        <p className="text-muted-foreground text-sm">{t(zone.descKey)}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Child Development Benefits Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                {t("productPages.indoorPlayground.benefitsLabel")}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("productPages.indoorPlayground.benefitsTitle")}{" "}
                <span className="text-primary">{t("productPages.indoorPlayground.benefitsTitleHighlight")}</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t("productPages.indoorPlayground.benefitsDescription")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {childBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full text-center group">
                    <CardContent className="p-6">
                      <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <benefit.icon className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{t(benefit.titleKey)}</h3>
                      <p className="text-muted-foreground text-sm">{t(benefit.descKey)}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                {t("productPages.indoorPlayground.galleryLabel")}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("productPages.indoorPlayground.galleryTitle")}{" "}
                <span className="text-primary">{t("productPages.indoorPlayground.galleryTitleHighlight")}</span>
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryImages.map((image, index) => (
                <div key={index} className="relative aspect-[4/3] rounded-xl overflow-hidden group">
                  <img 
                    src={image} 
                    alt={`Indoor playground ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Components Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="secondary" className="mb-4">
                  {t("productPages.indoorPlayground.componentsLabel")}
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {t("productPages.indoorPlayground.componentsTitle")}{" "}
                  <span className="text-primary">{t("productPages.indoorPlayground.componentsTitleHighlight")}</span>
                </h2>
                <p className="text-muted-foreground mb-8">
                  {t("productPages.indoorPlayground.componentsDescription")}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  {components.map((comp, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm">{t(comp)}</span>
                    </div>
                  ))}
                </div>

                <Link to={localizedPath("/contact")}>
                  <Button size="lg" className="group">
                    {t("productPages.indoorPlayground.cta")}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>

              <div className="relative">
                <img 
                  src={galleryImages[0]}
                  alt="Indoor playground components"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-4 rounded-xl shadow-lg">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="font-semibold">{t("productPages.indoorPlayground.premiumQuality")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Design Process Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                {t("productPages.indoorPlayground.designProcessLabel")}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("productPages.indoorPlayground.designProcessTitle")}{" "}
                <span className="text-primary">{t("productPages.indoorPlayground.designProcessTitleHighlight")}</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t("productPages.indoorPlayground.designProcessDescription")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {designProcess.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full group relative overflow-hidden">
                    <div className="absolute top-4 right-4 text-6xl font-bold text-primary/5 group-hover:text-primary/10 transition-colors">
                      {step.step}
                    </div>
                    <CardContent className="p-6 relative">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <step.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold text-primary">{t("productPages.indoorPlayground.step")} {step.step}</span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{t(step.titleKey)}</h3>
                      <p className="text-muted-foreground text-sm">{t(step.descKey)}</p>
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
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Badge variant="secondary" className="mb-4">
                  {t("productPages.indoorPlayground.safetyLabel")}
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {t("productPages.indoorPlayground.safetyTitle")}{" "}
                  <span className="text-primary">{t("productPages.indoorPlayground.safetyTitleHighlight")}</span>
                </h2>
                <p className="text-muted-foreground mb-8">
                  {t("productPages.indoorPlayground.safetyDescription")}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {safetyStandards.map((standard, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <standard.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">{t(standard.titleKey)}</h4>
                        <p className="text-muted-foreground text-xs mt-1">{t(standard.descKey)}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <img 
                  src={galleryImages[2]}
                  alt="Safety certified playground"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-green-500 text-white p-4 rounded-xl shadow-lg">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    <span className="font-semibold">{t("productPages.indoorPlayground.safetyCertified")}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Advantages Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                {t("productPages.indoorPlayground.advantagesLabel")}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("productPages.indoorPlayground.advantagesTitle")}{" "}
                <span className="text-primary">{t("productPages.indoorPlayground.advantagesTitleHighlight")}</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {advantages.map((adv, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full group">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <adv.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{t(adv.titleKey)}</h3>
                      <p className="text-muted-foreground text-sm">{t(adv.descKey)}</p>
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
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                {t("productPages.indoorPlayground.casesLabel")}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("productPages.indoorPlayground.casesTitle")}{" "}
                <span className="text-primary">{t("productPages.indoorPlayground.casesTitleHighlight")}</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {caseStudies.map((caseStudy, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="border-0 shadow-xl overflow-hidden group">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img 
                        src={caseStudy.image} 
                        alt={t(caseStudy.titleKey)}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-bold text-white mb-1">{t(caseStudy.titleKey)}</h3>
                        <div className="flex items-center gap-2 text-white/80">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{t(caseStudy.locationKey)}</span>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Ruler className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium">{caseStudy.size}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium">{t("productPages.indoorPlayground.commercial")}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {caseStudy.features.map((feature, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {feature}
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
        <section className="py-20 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                {t("productPages.indoorPlayground.testimonialsLabel")}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("productPages.indoorPlayground.testimonialsTitle")}{" "}
                <span className="text-primary">{t("productPages.indoorPlayground.testimonialsTitleHighlight")}</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
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
                      <Quote className="w-10 h-10 text-primary/20 mb-4" />
                      <p className="text-muted-foreground mb-6 italic">
                        "{t(testimonial.quote)}"
                      </p>
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary to-primary/80">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center text-primary-foreground">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {t("productPages.indoorPlayground.ctaSection.title")}
                </h2>
                <p className="text-primary-foreground/80 mb-8 text-lg">
                  {t("productPages.indoorPlayground.ctaSection.description")}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to={localizedPath("/contact")}>
                    <Button size="lg" variant="secondary" className="group w-full sm:w-auto">
                      {t("productPages.indoorPlayground.ctaSection.getQuote")}
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link to={localizedPath("/projects")}>
                    <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 w-full sm:w-auto">
                      {t("productPages.indoorPlayground.ctaSection.viewProjects")}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <ProductFAQ productType="indoorPlayground" />
        <QuoteCalculator />
      </main>
      <Footer />
      <FloatingCTA />
      <FloatingMascot type="playground" />
    </div>
  );
};

export default IndoorPlayground;
