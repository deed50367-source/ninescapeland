import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { ProductsSection } from "@/components/ProductsSection";
import { TrampolineFeaturesSection } from "@/components/TrampolineFeaturesSection";
import { NinjaFeaturesSection } from "@/components/NinjaFeaturesSection";
import { QuoteCalculator } from "@/components/QuoteCalculator";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { SEOHead } from "@/components/SEOHead";

const Products = () => {
  return (
    <div className="min-h-screen">
      <SEOHead pageKey="products" />
      <Header />
      <main>
        <PageHero
          titleKey="pages.products.title"
          titleHighlightKey="pages.products.titleHighlight"
          descriptionKey="pages.products.description"
          imageConfigKey="hero.products"
        />
        <ProductsSection />
        <TrampolineFeaturesSection />
        <NinjaFeaturesSection />
        <QuoteCalculator />
        <FAQSection />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default Products;