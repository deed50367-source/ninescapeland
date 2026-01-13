import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { NinjaFeaturesSection } from "@/components/NinjaFeaturesSection";
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
  Target, 
  Shield, 
  Trophy, 
  Layers, 
  ArrowRight,
  CheckCircle,
  Star
} from "lucide-react";

const NinjaCourse = () => {
  const { t } = useTranslation();
  const { localizedPath } = useLocalizedPath();

  const heroImage = getStorageUrl("dcbc5ed3-1863-4db6-bacf-59919b3abec6/1768294404756-dg7aeb.jpg");

  const features = [
    {
      icon: Target,
      titleKey: "productPages.ninjaCourse.features.obstacles.title",
      descKey: "productPages.ninjaCourse.features.obstacles.description"
    },
    {
      icon: Shield,
      titleKey: "productPages.ninjaCourse.features.safety.title",
      descKey: "productPages.ninjaCourse.features.safety.description"
    },
    {
      icon: Trophy,
      titleKey: "productPages.ninjaCourse.features.competition.title",
      descKey: "productPages.ninjaCourse.features.competition.description"
    },
    {
      icon: Layers,
      titleKey: "productPages.ninjaCourse.features.customizable.title",
      descKey: "productPages.ninjaCourse.features.customizable.description"
    }
  ];

  const galleryImages = [
    getStorageUrl("dcbc5ed3-1863-4db6-bacf-59919b3abec6/1768294404756-dg7aeb.jpg"),
    getStorageUrl("dcbc5ed3-1863-4db6-bacf-59919b3abec6/1768294408691-xypop.jpg"),
    getStorageUrl("dcbc5ed3-1863-4db6-bacf-59919b3abec6/1768294381259-ig9ii.jpg"),
    getStorageUrl("dcbc5ed3-1863-4db6-bacf-59919b3abec6/1768294376731-g5jiv8.jpg"),
    getStorageUrl("dcbc5ed3-1863-4db6-bacf-59919b3abec6/1768294400190-bx9gha.jpg"),
    getStorageUrl("dcbc5ed3-1863-4db6-bacf-59919b3abec6/1768294404756-dg7aeb.jpg")
  ];

  const obstacles = [
    "productPages.ninjaCourse.obstacles.warped",
    "productPages.ninjaCourse.obstacles.salmon",
    "productPages.ninjaCourse.obstacles.rings",
    "productPages.ninjaCourse.obstacles.cargo",
    "productPages.ninjaCourse.obstacles.balance",
    "productPages.ninjaCourse.obstacles.rope",
    "productPages.ninjaCourse.obstacles.monkey",
    "productPages.ninjaCourse.obstacles.climbing"
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <PageHero
          titleKey="productPages.ninjaCourse.title"
          titleHighlightKey="productPages.ninjaCourse.titleHighlight"
          descriptionKey="productPages.ninjaCourse.description"
          backgroundImage={heroImage}
        />

        {/* Features Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                {t("productPages.ninjaCourse.featuresLabel")}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("productPages.ninjaCourse.featuresTitle")}{" "}
                <span className="text-primary">{t("productPages.ninjaCourse.featuresTitleHighlight")}</span>
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

        {/* Ninja Features - Existing Component */}
        <NinjaFeaturesSection />

        {/* Obstacles Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <img 
                  src={galleryImages[1]}
                  alt="Ninja warrior obstacles"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-4 rounded-xl shadow-lg">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    <span className="font-semibold">{t("productPages.ninjaCourse.competitionGrade")}</span>
                  </div>
                </div>
              </div>

              <div>
                <Badge variant="secondary" className="mb-4">
                  {t("productPages.ninjaCourse.obstaclesLabel")}
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {t("productPages.ninjaCourse.obstaclesTitle")}{" "}
                  <span className="text-primary">{t("productPages.ninjaCourse.obstaclesTitleHighlight")}</span>
                </h2>
                <p className="text-muted-foreground mb-8">
                  {t("productPages.ninjaCourse.obstaclesDescription")}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  {obstacles.map((obstacle, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm">{t(obstacle)}</span>
                    </div>
                  ))}
                </div>

                <Link to={localizedPath("/contact")}>
                  <Button size="lg" className="group">
                    {t("productPages.ninjaCourse.cta")}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                {t("productPages.ninjaCourse.galleryLabel")}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("productPages.ninjaCourse.galleryTitle")}{" "}
                <span className="text-primary">{t("productPages.ninjaCourse.galleryTitleHighlight")}</span>
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryImages.map((image, index) => (
                <div key={index} className="relative aspect-[4/3] rounded-xl overflow-hidden group">
                  <img 
                    src={image} 
                    alt={`Ninja course ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                </div>
              ))}
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

export default NinjaCourse;
