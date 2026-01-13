import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { ContactSection } from "@/components/ContactSection";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { heroImages } from "@/config/galleryImages";

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <PageHero
          titleKey="pages.contact.title"
          titleHighlightKey="pages.contact.titleHighlight"
          descriptionKey="pages.contact.description"
          backgroundImage={heroImages.contact}
        />
        <ContactSection />
        <FAQSection />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default Contact;