import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { FAQSection } from "@/components/FAQSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";

const FAQ = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <PageHero
          titleKey="pages.faq.title"
          titleHighlightKey="pages.faq.titleHighlight"
          descriptionKey="pages.faq.description"
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
