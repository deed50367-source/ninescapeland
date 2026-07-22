import { Suspense, lazy, type ComponentType } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { LanguageWrapper } from "@/components/LanguageWrapper";
import PageLoader from "@/components/PageLoader";
import AppErrorBoundary from "@/components/AppErrorBoundary";
import IndoorPEEquipmentForSchools from "./pages/IndoorPEEquipmentForSchools";
import MontessoriIndoorPlaygroundDesign from "./pages/MontessoriIndoorPlaygroundDesign";
import HomeschoolCoopIndoorPlay from "./pages/HomeschoolCoopIndoorPlay";
import IndoorSummerCampPlayground from "./pages/IndoorSummerCampPlayground";
import EducationalBenefitsOfIndoorPlayCenters from "./pages/EducationalBenefitsOfIndoorPlayCenters";
import SafetyStandardsForTrampolineParkEquipment from "./pages/SafetyStandardsForTrampolineParkEquipment";
import CustomSoftPlayEquipmentManufacturerForSchools from "./pages/CustomSoftPlayEquipmentManufacturerForSchools";
import IndoorPlayCenterEducationalActivitiesByAge from "./pages/IndoorPlayCenterEducationalActivitiesByAge";
import HowToCreateActiveLearningEnvironment from "./pages/HowToCreateActiveLearningEnvironment";
import KinestheticLearningEquipmentBenefits from "./pages/KinestheticLearningEquipmentBenefits";
import DesigningSensoryPlayAreasForEducation from "./pages/DesigningSensoryPlayAreasForEducation";
import IndoorTrampolineParkBusinessForSchools from "./pages/IndoorTrampolineParkBusinessForSchools";

// Resilient lazy: if a chunk fails to load (e.g. Hostinger 429), render nothing
// instead of crashing the whole app.
const safeLazy = <T,>(loader: () => Promise<{ default: ComponentType<T> }>) =>
  lazy(() =>
    loader().catch((err) => {
      console.error("[lazy chunk failed]", err);
      return { default: (() => null) as unknown as ComponentType<T> };
    })
  );

const RecentInquiryNotification = safeLazy(() => import("@/components/RecentInquiryNotification"));
const LiveChat = safeLazy(() =>
  import("@/components/LiveChat").then((module) => {
    const liveChatModule = module as typeof module & { default?: ComponentType };
    const Comp = liveChatModule.LiveChat ?? liveChatModule.default;
    return { default: (Comp ?? (() => null)) as ComponentType };
  })
);


// Lazy load pages for code splitting
const Index = lazy(() => import("./pages/Index"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const DynamicProducts = lazy(() => import("./pages/DynamicProducts"));
const DynamicProductDetail = lazy(() => import("./pages/DynamicProductDetail"));
const IndoorPlayground = lazy(() => import("./pages/IndoorPlayground"));
const TrampolinePark = lazy(() => import("./pages/TrampolinePark"));
const NinjaCourse = lazy(() => import("./pages/NinjaCourse"));
const SoftPlay = lazy(() => import("./pages/SoftPlay"));
const Process = lazy(() => import("./pages/Process"));
const Projects = lazy(() => import("./pages/Projects"));
const Contact = lazy(() => import("./pages/Contact"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const ActivePlayRunning = lazy(() => import("./pages/ActivePlayRunning"));
const OfficeWellness = lazy(() => import("./pages/OfficeWellness"));
const SoftPlayMallSolutions = lazy(() => import("./pages/SoftPlayMallSolutions"));
const TrampolineParkFEC = lazy(() => import("./pages/TrampolineParkFEC"));
const GamifiedAttractionsManufacturer = lazy(() => import("./pages/GamifiedAttractionsManufacturer"));
const CustomIndoorPlaygroundCost = lazy(() => import("./pages/CustomIndoorPlaygroundCost"));
const ThemedIndoorPlaygroundDesign = lazy(() => import("./pages/ThemedIndoorPlaygroundDesign"));
const SensoryInclusivePlay = lazy(() => import("./pages/SensoryInclusivePlay"));
const IAAPAAsia2026 = lazy(() => import("./pages/IAAPAAsia2026"));
const IndoorPlaygroundROIUK = lazy(() => import("./pages/IndoorPlaygroundROIUK"));
const IndoorPlaygroundROICanada = lazy(() => import("./pages/IndoorPlaygroundROICanada"));
const InvestmentOpportunity = lazy(() => import("./pages/InvestmentOpportunity"));
const InvestmentROIPage = lazy(() => import("./pages/InvestmentROIPage"));
const LocationPage = lazy(() => import("./pages/LocationPage"));
const IndustryLandingPage = lazy(() => import("./pages/IndustryLandingPage"));
const SafetyCertifications = lazy(() => import("./pages/SafetyCertifications"));
const CustomerTestimonials = lazy(() => import("./pages/CustomerTestimonials"));
const MaintenanceWarranty = lazy(() => import("./pages/MaintenanceWarranty"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdsLandingPage = lazy(() => import("./pages/AdsLandingPage"));
const AdsPrivacy = lazy(() => import("./pages/AdsPrivacy"));

// Configure QueryClient with caching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 30 * 60 * 1000, // 30 minutes (formerly cacheTime)
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Redirect component for /en/* routes to remove the /en prefix
const EnglishRedirect = () => {
  const location = useLocation();
  const newPath = location.pathname.replace(/^\/en\/?/, '/') || '/';
  return <Navigate to={newPath + location.search + location.hash} replace />;
};

// Shared page routes for reuse
const pageRoutes = (
  <>
    <Route index element={<Index />} />
    <Route path="about-us" element={<AboutUs />} />
    <Route path="products" element={<DynamicProducts />} />
    <Route path="products/indoor-playground" element={<IndoorPlayground />} />
    <Route path="products/trampoline-park" element={<TrampolinePark />} />
    <Route path="products/ninja-course" element={<NinjaCourse />} />
    <Route path="products/soft-play" element={<SoftPlay />} />
    <Route path="products/:slug" element={<DynamicProductDetail />} />
    <Route path="process" element={<Process />} />
    <Route path="projects" element={<Projects />} />
    <Route path="contact" element={<Contact />} />
    <Route path="faq" element={<FAQ />} />
    <Route path="case-studies" element={<CaseStudies />} />
    <Route path="blog" element={<Blog />} />
    <Route path="blog/:slug" element={<BlogPost />} />
    <Route path="best-indoorplaygroundsolution-active-play-for-running-facilities" element={<ActivePlayRunning />} />
    <Route path="indoorplaygroundsolution-office-wellness-solutions" element={<OfficeWellness />} />
    <Route path="soft-play-equipment-shopping-mall-solutions" element={<SoftPlayMallSolutions />} />
    <Route path="trampoline-park-fec-solutions" element={<TrampolineParkFEC />} />
    <Route path="gamified-attractions-manufacturer" element={<GamifiedAttractionsManufacturer />} />
    <Route path="custom-indoor-playground-cost-free-3d-design" element={<CustomIndoorPlaygroundCost />} />
    <Route path="themed-indoor-playground-design" element={<ThemedIndoorPlaygroundDesign />} />
    <Route path="sensory-inclusive-play-equipment" element={<SensoryInclusivePlay />} />
    <Route path="iaapa-asia-2026-hong-kong" element={<IAAPAAsia2026 />} />
    <Route path="indoor-playground-roi-analysis-uk" element={<IndoorPlaygroundROIUK />} />
    <Route path="indoor-playground-roi-canada" element={<IndoorPlaygroundROICanada />} />
    <Route path="indoor-pe-equipment-for-schools" element={<IndoorPEEquipmentForSchools />} />
    <Route path="montessori-indoor-playground-design" element={<MontessoriIndoorPlaygroundDesign />} />
    <Route path="homeschool-coop-indoor-play-solutions" element={<HomeschoolCoopIndoorPlay />} />
    <Route path="indoor-summer-camp-playground-ideas" element={<IndoorSummerCampPlayground />} />
    <Route path="educational-benefits-of-indoor-play-centers" element={<EducationalBenefitsOfIndoorPlayCenters />} />
    <Route path="safety-standards-for-trampoline-park-equipment" element={<SafetyStandardsForTrampolineParkEquipment />} />
    <Route path="custom-soft-play-equipment-manufacturer-for-schools" element={<CustomSoftPlayEquipmentManufacturerForSchools />} />
    <Route path="indoor-play-center-educational-activities-by-age" element={<IndoorPlayCenterEducationalActivitiesByAge />} />
    <Route path="how-to-create-active-learning-environment" element={<HowToCreateActiveLearningEnvironment />} />
    <Route path="kinesthetic-learning-equipment-benefits" element={<KinestheticLearningEquipmentBenefits />} />
    <Route path="designing-sensory-play-areas-for-education" element={<DesigningSensoryPlayAreasForEducation />} />
    <Route path="indoor-trampoline-park-business-for-schools" element={<IndoorTrampolineParkBusinessForSchools />} />
    <Route path="investment-opportunity" element={<InvestmentOpportunity />} />
    <Route path="investment-opportunity/:slug" element={<InvestmentROIPage />} />
    <Route path="locations/:slug" element={<LocationPage />} />
    <Route path="market/:slug" element={<IndustryLandingPage />} />
    <Route path="safety-certifications" element={<SafetyCertifications />} />
    <Route path="customer-testimonials" element={<CustomerTestimonials />} />
    <Route path="maintenance-warranty" element={<MaintenanceWarranty />} />
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <AppErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Admin routes - no language prefix needed */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* Google Ads landing pages — noindex, no language prefix */}
              <Route path="/lp/:slug" element={<AdsLandingPage />} />
              <Route path="/lp/privacy" element={<AdsPrivacy />} />


              {/* Redirect /en/* to root (English is default without prefix) */}
              <Route path="/en" element={<EnglishRedirect />} />
              <Route path="/en/*" element={<EnglishRedirect />} />

              {/* English routes (default, no prefix) */}
              <Route path="/" element={<LanguageWrapper defaultLang="en" />}>
                {pageRoutes}
              </Route>

              {/* Other language-prefixed routes */}
              {(["es", "pt", "de", "fr", "ar"] as const).map((lang) => (
                <Route key={lang} path={`/${lang}`} element={<LanguageWrapper defaultLang={lang} />}>
                  {pageRoutes}
                </Route>
              ))}

              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AppErrorBoundary>
        <Suspense fallback={null}>
          <LiveChat />
          <RecentInquiryNotification />
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
