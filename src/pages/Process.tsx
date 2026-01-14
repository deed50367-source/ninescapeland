import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { ProcessSection } from "@/components/ProcessSection";
import { ProcessTimelineSection } from "@/components/ProcessTimelineSection";
import { ProcessDetailSection } from "@/components/ProcessDetailSection";
import { ProcessGuaranteeSection } from "@/components/ProcessGuaranteeSection";
import { ProcessTestimonialsSection } from "@/components/ProcessTestimonialsSection";
import { ProcessCTASection } from "@/components/ProcessCTASection";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import MobileBottomNav from "@/components/MobileBottomNav";
import { heroImages } from "@/config/galleryImages";

const Process = () => {
  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <Header />
      <main>
        <PageHero
          titleKey="pages.process.title"
          titleHighlightKey="pages.process.titleHighlight"
          descriptionKey="pages.process.description"
          backgroundImage={heroImages.process}
        />
        <ProcessSection />
        <ProcessTimelineSection />
        <ProcessDetailSection />
        <ProcessGuaranteeSection />
        <ProcessTestimonialsSection />
        <ProcessCTASection />
        <FAQSection />
      </main>
      <Footer />
      <FloatingCTA />
      <MobileBottomNav />
    </div>
  );
};

export default Process;