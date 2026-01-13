import { Header } from "@/components/Header";
import { WhyUsSection } from "@/components/WhyUsSection";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";

const AboutUs = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <WhyUsSection />
        <FAQSection />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default AboutUs;
