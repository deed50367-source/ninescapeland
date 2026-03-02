import { useTranslation } from "react-i18next";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { FAQSection } from "@/components/FAQSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { SEOHead } from "@/components/SEOHead";
import { FAQSchema, BreadcrumbSchema } from "@/components/StructuredData";

const FAQ = () => {
  const { t } = useTranslation();

  // FAQ items for structured data
  const faqItems = [
    { question: t("faq.items.leadTime.question"), answer: t("faq.items.leadTime.answer") },
    { question: t("faq.items.customDesign.question"), answer: t("faq.items.customDesign.answer") },
    { question: t("faq.items.safety.question"), answer: t("faq.items.safety.answer") },
    { question: t("faq.items.warranty.question"), answer: t("faq.items.warranty.answer") },
    { question: t("faq.items.installation.question"), answer: t("faq.items.installation.answer") },
    { question: t("faq.items.budget.question"), answer: t("faq.items.budget.answer") },
    { question: t("faq.items.shipping.question"), answer: t("faq.items.shipping.answer") },
    { question: t("faq.items.materials.question"), answer: t("faq.items.materials.answer") },
  ];

  const breadcrumbItems = [
    { name: t("nav.home", "Home"), url: "https://indoorplaygroundsolution.com" },
    { name: "FAQ", url: "https://indoorplaygroundsolution.com/faq" },
  ];

  return (
    <div className="min-h-screen">
      <SEOHead pageKey="faq" />
      <FAQSchema items={faqItems} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <Header />
      <main>
        <PageHero
          titleKey="pages.faq.title"
          titleHighlightKey="pages.faq.titleHighlight"
          descriptionKey="pages.faq.description"
          imageConfigKey="hero.faq"
        />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default FAQ;