import { useTranslation } from "react-i18next";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { ContactSection } from "@/components/ContactSection";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { ContactMascotBanner } from "@/components/ContactMascotBanner";
import { ContactTrustSection } from "@/components/ContactTrustSection";
import { SEOHead } from "@/components/SEOHead";
import { BreadcrumbSchema, LocalBusinessSchema, ContactPageSchema } from "@/components/StructuredData";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

const Contact = () => {
  const { t } = useTranslation();
  const { localizedPath } = useLocalizedPath();

  const breadcrumbItems = [
    { name: t("nav.home", "Home"), url: "https://indoorplaygroundsolution.com" },
    { name: t("nav.contact", "Contact"), url: "https://indoorplaygroundsolution.com/contact" },
  ];

  const heroBreadcrumbs = [
    { label: t("nav.home", "Home"), href: localizedPath("/") },
    { label: t("nav.contact", "Contact") },
  ];

  return (
    <div className="min-h-screen">
      <SEOHead pageKey="contact" lastModified="2026-03-06" />
      <BreadcrumbSchema items={breadcrumbItems} />
      <LocalBusinessSchema />
      <ContactPageSchema />
      <Header />
      <main>
        <PageHero
          titleKey="pages.contact.title"
          titleHighlightKey="pages.contact.titleHighlight"
          descriptionKey="pages.contact.description"
          imageConfigKey="hero.contact"
          breadcrumbs={heroBreadcrumbs}
        />
        <ContactMascotBanner />
        <ContactSection />
        <ContactTrustSection />
        <FAQSection />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default Contact;