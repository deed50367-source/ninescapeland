import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { FAQSection } from "@/components/FAQSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { heroImages } from "@/config/galleryImages";
import { SEOHead } from "@/components/SEOHead";

const FAQ = () => {
  return (
    <div className="min-h-screen">
      <SEOHead pageKey="faq" />
      <Header />
      <main>
        <PageHero
          titleKey="pages.faq.title"
          titleHighlightKey="pages.faq.titleHighlight"
          descriptionKey="pages.faq.description"
          backgroundImage={heroImages.faq}
        />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default FAQ;