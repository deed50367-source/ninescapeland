import { Header } from "@/components/Header";
import { ContactSection } from "@/components/ContactSection";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <ContactSection />
        <FAQSection />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default Contact;
