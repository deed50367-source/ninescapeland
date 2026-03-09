import { useTranslation } from "react-i18next";
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
import { BreadcrumbSchema, OrganizationSchema } from "@/components/StructuredData";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

const Products = () => {
  const { t } = useTranslation();
  const { localizedPath } = useLocalizedPath();

  const breadcrumbItems = [
    { name: t("nav.home", "Home"), url: "https://indoorplaygroundsolution.com" },
    { name: t("nav.products", "Products"), url: "https://indoorplaygroundsolution.com/products" },
  ];

  const heroBreadcrumbs = [
    { label: t("nav.home", "Home"), href: localizedPath("/") },
    { label: t("nav.products", "Products") },
  ];

  return (
    <div className="min-h-screen">
      <SEOHead pageKey="products" />
      <BreadcrumbSchema items={breadcrumbItems} />
      <OrganizationSchema />
      <Header />
      <main>
        <PageHero
          titleKey="pages.products.title"
          titleHighlightKey="pages.products.titleHighlight"
          descriptionKey="pages.products.description"
          imageConfigKey="hero.products"
          breadcrumbs={heroBreadcrumbs}
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