import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
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
  Palette, 
  Shield, 
  Users, 
  Layers, 
  Sparkles, 
  ArrowRight,
  CheckCircle,
  Star
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

        <QuoteCalculator />
        <FAQSection />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default IndoorPlayground;
