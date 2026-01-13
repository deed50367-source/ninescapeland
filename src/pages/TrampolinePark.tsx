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
import { 
  Zap, 
  Shield, 
  Users, 
  Layers, 
  ArrowRight,
  Star,
  TrendingUp
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
                <div key={index} className="relative aspect-[4/3] rounded-xl overflow-hidden group">
                  <img 
                    src={image} 
                    alt={`Trampoline park ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                </div>
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

        <QuoteCalculator />
        <FAQSection />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default TrampolinePark;
