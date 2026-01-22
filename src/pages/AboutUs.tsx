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

const AboutUs = () => {
  return (
    <div className="min-h-screen">
      <SEOHead pageKey="aboutUs" />
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