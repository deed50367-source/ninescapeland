import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageWrapper } from "@/components/LanguageWrapper";
import Index from "./pages/Index";
import CaseStudies from "./pages/CaseStudies";
import ProductDetail from "./pages/ProductDetail";
import AboutUs from "./pages/AboutUs";
import Products from "./pages/Products";
import IndoorPlayground from "./pages/IndoorPlayground";
import TrampolinePark from "./pages/TrampolinePark";
import NinjaCourse from "./pages/NinjaCourse";
import SoftPlay from "./pages/SoftPlay";
import Process from "./pages/Process";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";
import AssetGallery from "./pages/AssetGallery";
import AdminLogin from "./pages/AdminLogin";
import AdminCustomerService from "./pages/AdminCustomerService";
import AdminDashboard from "./pages/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Redirect root to default language */}
          <Route path="/" element={<Navigate to="/en" replace />} />
          
          {/* Language-prefixed routes */}
          <Route path="/:lang" element={<LanguageWrapper />}>
            <Route index element={<Index />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route path="products" element={<Products />} />
            <Route path="products/indoor-playground" element={<IndoorPlayground />} />
            <Route path="products/trampoline-park" element={<TrampolinePark />} />
            <Route path="products/ninja-course" element={<NinjaCourse />} />
            <Route path="products/soft-play" element={<SoftPlay />} />
            <Route path="products/:productId" element={<ProductDetail />} />
            <Route path="process" element={<Process />} />
            <Route path="projects" element={<Projects />} />
            <Route path="contact" element={<Contact />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="case-studies" element={<CaseStudies />} />
            <Route path="asset-gallery" element={<AssetGallery />} />
            <Route path="admin-login" element={<AdminLogin />} />
            <Route path="admin/customer-service" element={<AdminCustomerService />} />
            <Route path="admin" element={<AdminDashboard />} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
