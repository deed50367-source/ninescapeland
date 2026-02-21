import { useTranslation } from "react-i18next";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { WhyUsSection } from "@/components/WhyUsSection";
import { CoreValuesSection } from "@/components/CoreValuesSection";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { AboutMascotIntro } from "@/components/AboutMascotIntro";
import { AboutTeamSection } from "@/components/AboutTeamSection";
import { SEOHead } from "@/components/SEOHead";
import { BreadcrumbSchema } from "@/components/StructuredData";

const AboutUs = () => {
  const { t } = useTranslation();

  const breadcrumbItems = [
    { name: t("nav.home", "Home"), url: "https://indoorplaygroundsolution.com" },
    { name: t("nav.aboutUs", "About Us"), url: "https://indoorplaygroundsolution.com/about-us" },
  ];

  return (
    <div className="min-h-screen">
      <SEOHead pageKey="aboutUs" />
      <BreadcrumbSchema items={breadcrumbItems} />
      <Header />
      <main>
        <PageHero
          titleKey="pages.aboutUs.title"
          titleHighlightKey="pages.aboutUs.titleHighlight"
          descriptionKey="pages.aboutUs.description"
          imageConfigKey="hero.aboutUs"
        />
        <AboutMascotIntro />
        <CoreValuesSection />
        <AboutTeamSection />
        <WhyUsSection />
        <FAQSection />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default AboutUs;