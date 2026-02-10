import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { LanguageWrapper } from "@/components/LanguageWrapper";
import PageLoader from "@/components/PageLoader";
import PWAPrompt from "@/components/PWAPrompt";
import AppErrorBoundary from "@/components/AppErrorBoundary";

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
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

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

              {/* Redirect /en/* to root (English is default without prefix) */}
              <Route path="/en" element={<EnglishRedirect />} />
              <Route path="/en/*" element={<EnglishRedirect />} />

              {/* English routes (default, no prefix) */}
              <Route path="/" element={<LanguageWrapper defaultLang="en" />}>
                {pageRoutes}
              </Route>

              {/* Other language-prefixed routes (ar, de, es, pt) */}
              <Route path="/:lang" element={<LanguageWrapper />}>
                {pageRoutes}
              </Route>

              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AppErrorBoundary>
        <PWAPrompt />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
