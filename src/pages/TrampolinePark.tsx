import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { TrampolineFeaturesSection } from "@/components/TrampolineFeaturesSection";
import { QuoteCalculator } from "@/components/QuoteCalculator";
import { FAQSection } from "@/components/FAQSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { Link } from "react-router-dom";
import { getStorageUrl } from "@/config/galleryImages";
import { motion } from "framer-motion";
import { 
  Zap, 
  Shield, 
  Users, 
  Layers, 
  ArrowRight,
  Star,
  TrendingUp,
  Award,
  Clock,
  Truck,
  Wrench,
  Quote,
  MapPin,
  Ruler,
  Building2,
  Target,
  Flame,
  Dumbbell,
  PartyPopper,
  CheckCircle2
} from "lucide-react";

const TrampolinePark = () => {
  const { t } = useTranslation();
  const { localizedPath } = useLocalizedPath();

  const heroImage = getStorageUrl("88de2e3c-c85e-413b-878d-99b0d0aea8ed/1768294624727-6ia03.jpg");

  const features = [
    {
      icon: Zap,
      titleKey: "productPages.trampolinePark.features.performance.title",
      descKey: "productPages.trampolinePark.features.performance.description"
    },
    {
      icon: Shield,
      titleKey: "productPages.trampolinePark.features.safety.title",
      descKey: "productPages.trampolinePark.features.safety.description"
    },
    {
      icon: Users,
      titleKey: "productPages.trampolinePark.features.zones.title",
      descKey: "productPages.trampolinePark.features.zones.description"
    },
    {
      icon: Layers,
      titleKey: "productPages.trampolinePark.features.modular.title",
      descKey: "productPages.trampolinePark.features.modular.description"
    }
  ];

  const galleryImages = [
    getStorageUrl("88de2e3c-c85e-413b-878d-99b0d0aea8ed/1768294624727-6ia03.jpg"),
    getStorageUrl("88de2e3c-c85e-413b-878d-99b0d0aea8ed/1768294617155-efd0q8.jpg"),
    getStorageUrl("88de2e3c-c85e-413b-878d-99b0d0aea8ed/1768294621773-h93mw.jpg"),
    getStorageUrl("88de2e3c-c85e-413b-878d-99b0d0aea8ed/1768294619294-xsbwg.jpg"),
    getStorageUrl("88de2e3c-c85e-413b-878d-99b0d0aea8ed/1768294614701-b5b7pw.jpg"),
    getStorageUrl("88de2e3c-c85e-413b-878d-99b0d0aea8ed/1768294619294-xsbwg.jpg")
  ];

  const stats = [
    { value: "12+", labelKey: "productPages.trampolinePark.stats.zones" },
    { value: "500+", labelKey: "productPages.trampolinePark.stats.projects" },
    { value: "50+", labelKey: "productPages.trampolinePark.stats.countries" },
    { value: "15+", labelKey: "productPages.trampolinePark.stats.years" }
  ];

  const activityZones = [
    {
      icon: Target,
      titleKey: "productPages.trampolinePark.zones.freejump.title",
      descKey: "productPages.trampolinePark.zones.freejump.description",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Flame,
      titleKey: "productPages.trampolinePark.zones.foampit.title",
      descKey: "productPages.trampolinePark.zones.foampit.description",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Dumbbell,
      titleKey: "productPages.trampolinePark.zones.basketball.title",
      descKey: "productPages.trampolinePark.zones.basketball.description",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: PartyPopper,
      titleKey: "productPages.trampolinePark.zones.dodgeball.title",
      descKey: "productPages.trampolinePark.zones.dodgeball.description",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const advantages = [
    {
      icon: Award,
      titleKey: "productPages.trampolinePark.advantages.certified.title",
      descKey: "productPages.trampolinePark.advantages.certified.description"
    },
    {
      icon: Clock,
      titleKey: "productPages.trampolinePark.advantages.production.title",
      descKey: "productPages.trampolinePark.advantages.production.description"
    },
    {
      icon: Truck,
      titleKey: "productPages.trampolinePark.advantages.shipping.title",
      descKey: "productPages.trampolinePark.advantages.shipping.description"
    },
    {
      icon: Wrench,
      titleKey: "productPages.trampolinePark.advantages.installation.title",
      descKey: "productPages.trampolinePark.advantages.installation.description"
    }
  ];

  const caseStudies = [
    {
      image: getStorageUrl("88de2e3c-c85e-413b-878d-99b0d0aea8ed/1768294624727-6ia03.jpg"),
      titleKey: "productPages.trampolinePark.cases.skypark.title",
      locationKey: "productPages.trampolinePark.cases.skypark.location",
      size: "2,500 m²",
      features: ["12 Zones", "Ninja Course", "VR Games"]
    },
    {
      image: getStorageUrl("88de2e3c-c85e-413b-878d-99b0d0aea8ed/1768294617155-efd0q8.jpg"),
      titleKey: "productPages.trampolinePark.cases.jumpworld.title",
      locationKey: "productPages.trampolinePark.cases.jumpworld.location",
      size: "1,800 m²",
      features: ["8 Zones", "Party Rooms", "Café"]
    }
  ];

  const testimonials = [
    {
      name: "James Wilson",
      locationKey: "productPages.trampolinePark.testimonials.james.location",
      quoteKey: "productPages.trampolinePark.testimonials.james.quote",
      rating: 5
    },
    {
      name: "Maria Santos",
      locationKey: "productPages.trampolinePark.testimonials.maria.location",
      quoteKey: "productPages.trampolinePark.testimonials.maria.quote",
      rating: 5
    },
    {
      name: "David Chen",
      locationKey: "productPages.trampolinePark.testimonials.david.location",
      quoteKey: "productPages.trampolinePark.testimonials.david.quote",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <PageHero
          titleKey="productPages.trampolinePark.title"
          titleHighlightKey="productPages.trampolinePark.titleHighlight"
          descriptionKey="productPages.trampolinePark.description"
          backgroundImage={heroImage}
        />

        {/* Stats Section */}
        <section className="py-12 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                  <div className="text-primary-foreground/80">{t(stat.labelKey)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                {t("productPages.trampolinePark.featuresLabel")}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("productPages.trampolinePark.featuresTitle")}{" "}
                <span className="text-primary">{t("productPages.trampolinePark.featuresTitleHighlight")}</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <feature.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{t(feature.titleKey)}</h3>
                    <p className="text-muted-foreground text-sm">{t(feature.descKey)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Trampoline Zones - Existing Component */}
        <TrampolineFeaturesSection />

        {/* Activity Zones Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="secondary" className="mb-4">
                {t("productPages.trampolinePark.zonesLabel")}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("productPages.trampolinePark.zonesTitle")}{" "}
                <span className="text-primary">{t("productPages.trampolinePark.zonesTitleHighlight")}</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t("productPages.trampolinePark.zonesDescription")}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {activityZones.map((zone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden h-full">
                    <CardContent className="p-6 text-center relative">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${zone.color} flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
                        <zone.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{t(zone.titleKey)}</h3>
                      <p className="text-muted-foreground text-sm">{t(zone.descKey)}</p>
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
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="secondary" className="mb-4">
                {t("productPages.trampolinePark.advantagesLabel")}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("productPages.trampolinePark.advantagesTitle")}{" "}
                <span className="text-primary">{t("productPages.trampolinePark.advantagesTitleHighlight")}</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {advantages.map((advantage, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <advantage.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{t(advantage.titleKey)}</h3>
                  <p className="text-muted-foreground text-sm">{t(advantage.descKey)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="secondary" className="mb-4">
                {t("productPages.trampolinePark.casesLabel")}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("productPages.trampolinePark.casesTitle")}{" "}
                <span className="text-primary">{t("productPages.trampolinePark.casesTitleHighlight")}</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {caseStudies.map((study, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="relative aspect-video">
                      <img 
                        src={study.image} 
                        alt={t(study.titleKey)}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="text-xl font-bold mb-1">{t(study.titleKey)}</h3>
                        <div className="flex items-center gap-4 text-sm text-white/80">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {t(study.locationKey)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Ruler className="w-4 h-4" />
                            {study.size}
                          </span>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex flex-wrap gap-2">
                        {study.features.map((feature, fIndex) => (
                          <Badge key={fIndex} variant="secondary">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
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
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="secondary" className="mb-4 bg-white/20 text-white hover:bg-white/30">
                {t("productPages.trampolinePark.testimonialsLabel")}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("productPages.trampolinePark.testimonialsTitle")}{" "}
                <span className="text-white/80">{t("productPages.trampolinePark.testimonialsTitleHighlight")}</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-white/10 border-white/20 backdrop-blur-sm h-full">
                    <CardContent className="p-6">
                      <Quote className="w-8 h-8 text-white/40 mb-4" />
                      <p className="text-white/90 mb-4 italic">"{t(testimonial.quoteKey)}"</p>
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <div>
                        <p className="font-semibold text-white">{testimonial.name}</p>
                        <p className="text-sm text-white/70">{t(testimonial.locationKey)}</p>
                      </div>
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
                {t("productPages.trampolinePark.galleryLabel")}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("productPages.trampolinePark.galleryTitle")}{" "}
                <span className="text-primary">{t("productPages.trampolinePark.galleryTitleHighlight")}</span>
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryImages.map((image, index) => (
                <motion.div 
                  key={index} 
                  className="relative aspect-[4/3] rounded-xl overflow-hidden group"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <img 
                    src={image} 
                    alt={`Trampoline park ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link to={localizedPath("/contact")}>
                <Button size="lg" className="group">
                  {t("productPages.trampolinePark.cta")}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary/90 to-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <motion.div 
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("productPages.trampolinePark.ctaSection.title")}
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8">
                {t("productPages.trampolinePark.ctaSection.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={localizedPath("/contact")}>
                  <Button size="lg" variant="secondary" className="group w-full sm:w-auto">
                    {t("productPages.trampolinePark.ctaSection.getQuote")}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to={localizedPath("/projects")}>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
                    {t("productPages.trampolinePark.ctaSection.viewProjects")}
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <QuoteCalculator />
        <FAQSection />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default TrampolinePark;
