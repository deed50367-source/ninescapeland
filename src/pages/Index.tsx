import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { PartnersSection } from "@/components/PartnersSection";
import { ProductsSection } from "@/components/ProductsSection";
import { FeaturesGridSection } from "@/components/FeaturesGridSection";
import { TrampolineFeaturesSection } from "@/components/TrampolineFeaturesSection";
import { NinjaFeaturesSection } from "@/components/NinjaFeaturesSection";
import { QuoteCalculator } from "@/components/QuoteCalculator";
import { WhyUsSection } from "@/components/WhyUsSection";
import { CoreValuesSection } from "@/components/CoreValuesSection";
import { ProcessSection } from "@/components/ProcessSection";
import { ProjectsStatsSection } from "@/components/ProjectsStatsSection";
import { InteractiveWorldMap } from "@/components/InteractiveWorldMap";
import { ProjectsSection } from "@/components/ProjectsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FAQSection } from "@/components/FAQSection";
import { CTABannerSection } from "@/components/CTABannerSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { LiveChat } from "@/components/LiveChat";
import MobileBottomNav from "@/components/MobileBottomNav";
import { SEOHead } from "@/components/SEOHead";

const Index = () => {
  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <SEOHead pageKey="home" />
      <Header />
      <main>
        <HeroSection />
        <PartnersSection />
        <ProductsSection />
        <FeaturesGridSection />
        <TrampolineFeaturesSection />
        <NinjaFeaturesSection />
        <QuoteCalculator />
        <WhyUsSection />
        <CoreValuesSection />
        <ProcessSection />
        <ProjectsStatsSection />
        <InteractiveWorldMap />
        <ProjectsSection />
        <TestimonialsSection />
        <FAQSection />
        <CTABannerSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingCTA />
      <LiveChat />
      <MobileBottomNav />
    </div>
  );
};

export default Index;
