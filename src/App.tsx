import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { LanguageWrapper } from "@/components/LanguageWrapper";
import Index from "./pages/Index";
import CaseStudies from "./pages/CaseStudies";
import AboutUs from "./pages/AboutUs";
import DynamicProducts from "./pages/DynamicProducts";
import DynamicProductDetail from "./pages/DynamicProductDetail";
import IndoorPlayground from "./pages/IndoorPlayground";
import TrampolinePark from "./pages/TrampolinePark";
import NinjaCourse from "./pages/NinjaCourse";
import SoftPlay from "./pages/SoftPlay";
import Process from "./pages/Process";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Redirect root to default language */}
          <Route path="/" element={<Navigate to="/en" replace />} />
          
          {/* Admin routes - no language prefix needed */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          
          {/* Language-prefixed public routes */}
          <Route path="/:lang" element={<LanguageWrapper />}>
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
          </Route>
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
