import { lazy, Suspense } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { PartnersSection } from "@/components/PartnersSection";
import { CoreSolutionsSection } from "@/components/CoreSolutionsSection";
import { ProductsSection } from "@/components/ProductsSection";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { LiveChat } from "@/components/LiveChat";
import MobileBottomNav from "@/components/MobileBottomNav";
import { SEOHead } from "@/components/SEOHead";
import { OrganizationSchema, LocalBusinessSchema, WebsiteSchema } from "@/components/StructuredData";

// Lazy load below-fold sections to speed up initial render
const FeaturesGridSection = lazy(() => import("@/components/FeaturesGridSection").then(m => ({ default: m.FeaturesGridSection })));
const TrampolineFeaturesSection = lazy(() => import("@/components/TrampolineFeaturesSection").then(m => ({ default: m.TrampolineFeaturesSection })));
const NinjaFeaturesSection = lazy(() => import("@/components/NinjaFeaturesSection").then(m => ({ default: m.NinjaFeaturesSection })));
const QuoteCalculator = lazy(() => import("@/components/QuoteCalculator").then(m => ({ default: m.QuoteCalculator })));
const WhyUsSection = lazy(() => import("@/components/WhyUsSection").then(m => ({ default: m.WhyUsSection })));
const CoreValuesSection = lazy(() => import("@/components/CoreValuesSection").then(m => ({ default: m.CoreValuesSection })));
const ProcessSection = lazy(() => import("@/components/ProcessSection").then(m => ({ default: m.ProcessSection })));
const ProjectsStatsSection = lazy(() => import("@/components/ProjectsStatsSection").then(m => ({ default: m.ProjectsStatsSection })));
const InteractiveWorldMap = lazy(() => import("@/components/InteractiveWorldMap").then(m => ({ default: m.InteractiveWorldMap })));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection").then(m => ({ default: m.ProjectsSection })));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection").then(m => ({ default: m.TestimonialsSection })));
const FAQSection = lazy(() => import("@/components/FAQSection").then(m => ({ default: m.FAQSection })));
const CTABannerSection = lazy(() => import("@/components/CTABannerSection").then(m => ({ default: m.CTABannerSection })));
const PopularCategoriesSection = lazy(() => import("@/components/PopularCategoriesSection").then(m => ({ default: m.PopularCategoriesSection })));
const ContactSection = lazy(() => import("@/components/ContactSection").then(m => ({ default: m.ContactSection })));
const ProductPreloader = lazy(() => import("@/components/ProductPreloader"));

const Index = () => {
  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <SEOHead pageKey="home" />
      <OrganizationSchema />
      <LocalBusinessSchema />
      <WebsiteSchema />
      <Header />
      <main>
        {/* Above-the-fold: loaded eagerly */}
        <HeroSection />
        <PartnersSection />
        <CoreSolutionsSection />
        <ProductsSection />

        {/* Below-the-fold: lazy loaded */}
        <Suspense fallback={null}>
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
          <PopularCategoriesSection />
          <ContactSection />
        </Suspense>
      </main>
      <Footer />
      <FloatingCTA />
      <LiveChat />
      <MobileBottomNav />
      {/* Skip preloader on mobile to save bandwidth */}
      <Suspense fallback={null}>
        <ProductPreloader />
      </Suspense>
    </div>
  );
};

export default Index;
