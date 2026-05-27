import { lazy, Suspense } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { GlobalActivityTicker } from "@/components/GlobalActivityTicker";
import { PartnersSection } from "@/components/PartnersSection";
import { CoreSolutionsSection } from "@/components/CoreSolutionsSection";
import { ProductsSection } from "@/components/ProductsSection";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { IAAPAFloatingBanner } from "@/components/IAAPAFloatingBanner";

import MobileBottomNav from "@/components/MobileBottomNav";
import { SEOHead } from "@/components/SEOHead";
import { OrganizationSchema, LocalBusinessSchema, WebsiteSchema } from "@/components/StructuredData";
import { LazySection } from "@/components/LazySection";
import { TrustHubLinks } from "@/components/TrustHubLinks";
import { EEATSignature } from "@/components/EEATSignature";

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
const FeaturedShowcaseSection = lazy(() => import("@/components/FeaturedShowcaseSection").then(m => ({ default: m.FeaturedShowcaseSection })));
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
        <GlobalActivityTicker />
        <PartnersSection />
        <CoreSolutionsSection />
        <ProductsSection />

        {/* Below-the-fold: deferred DOM mounting via IntersectionObserver */}
        <Suspense fallback={null}>
          <LazySection minHeight="400px">
            <FeaturesGridSection />
          </LazySection>
          <LazySection minHeight="400px">
            <TrampolineFeaturesSection />
          </LazySection>
          <LazySection minHeight="400px">
            <NinjaFeaturesSection />
          </LazySection>
          <LazySection minHeight="500px">
            <QuoteCalculator />
          </LazySection>
          <LazySection minHeight="400px">
            <WhyUsSection />
          </LazySection>
          <LazySection minHeight="300px">
            <TrustHubLinks />
          </LazySection>
          <LazySection minHeight="400px">
            <CoreValuesSection />
          </LazySection>
          <LazySection minHeight="400px">
            <ProcessSection />
          </LazySection>
          <LazySection minHeight="300px">
            <ProjectsStatsSection />
          </LazySection>
          <LazySection minHeight="500px">
            <InteractiveWorldMap />
          </LazySection>
          <LazySection minHeight="400px">
            <ProjectsSection />
          </LazySection>
          <LazySection minHeight="300px">
            <TestimonialsSection />
          </LazySection>
          <LazySection minHeight="300px">
            <EEATSignature />
          </LazySection>
          <LazySection minHeight="400px">
            <FAQSection />
          </LazySection>
          <LazySection minHeight="300px">
            <CTABannerSection />
          </LazySection>
          <LazySection minHeight="400px">
            <FeaturedShowcaseSection />
          </LazySection>
          <LazySection minHeight="300px">
            <PopularCategoriesSection />
          </LazySection>
          <LazySection minHeight="500px">
            <ContactSection />
          </LazySection>
        </Suspense>
      </main>
      <Footer />
      <FloatingCTA />
      <IAAPAFloatingBanner />
      
      <MobileBottomNav />
      {/* Skip preloader on mobile to save bandwidth */}
      <Suspense fallback={null}>
        <ProductPreloader />
      </Suspense>
    </div>
  );
};

export default Index;
