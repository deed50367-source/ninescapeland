import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { WhyUsSection } from "@/components/WhyUsSection";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import heroImage from "@/assets/hero-about-us.jpg";

const AboutUs = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <PageHero
          titleKey="pages.aboutUs.title"
          titleHighlightKey="pages.aboutUs.titleHighlight"
          descriptionKey="pages.aboutUs.description"
          backgroundImage={heroImage}
        />
        <WhyUsSection />
        <FAQSection />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default AboutUs;