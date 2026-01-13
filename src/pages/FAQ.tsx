import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { FAQSection } from "@/components/FAQSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import heroImage from "@/assets/hero-faq.jpg";

const FAQ = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <PageHero
          titleKey="pages.faq.title"
          titleHighlightKey="pages.faq.titleHighlight"
          descriptionKey="pages.faq.description"
          backgroundImage={heroImage}
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