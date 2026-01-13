import { Header } from "@/components/Header";
import { ProcessSection } from "@/components/ProcessSection";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";

const Process = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <ProcessSection />
        <FAQSection />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default Process;
