import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { ProcessSection } from "@/components/ProcessSection";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";

const Process = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <PageHero
          titleKey="pages.process.title"
          titleHighlightKey="pages.process.titleHighlight"
          descriptionKey="pages.process.description"
        />
        <ProcessSection />
        <FAQSection />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default Process;
