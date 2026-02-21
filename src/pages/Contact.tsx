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
import { BreadcrumbSchema } from "@/components/StructuredData";

const Contact = () => {
  const { t } = useTranslation();

  const breadcrumbItems = [
    { name: t("nav.home", "Home"), url: "https://indoorplaygroundsolution.com" },
    { name: t("nav.contact", "Contact"), url: "https://indoorplaygroundsolution.com/contact" },
  ];

  return (
    <div className="min-h-screen">
      <SEOHead pageKey="contact" />
      <BreadcrumbSchema items={breadcrumbItems} />
      <Header />
      <main>
        <PageHero
          titleKey="pages.contact.title"
          titleHighlightKey="pages.contact.titleHighlight"
          descriptionKey="pages.contact.description"
          imageConfigKey="hero.contact"
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