import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { SEOHead } from "@/components/SEOHead";
import { FAQSchema, BreadcrumbSchema } from "@/components/StructuredData";
import { ContactSection } from "@/components/ContactSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Building2,
  Shield,
  TrendingUp,
  ArrowRight,
  Palette,
  Ruler,
  DollarSign,
  Award,
  HelpCircle,
  Heart,
  Leaf,
  FileText,
  Users,
} from "lucide-react";

const OfficeWellness = () => {
  const { t } = useTranslation();
  const { localizedPath } = useLocalizedPath();

  const faqItems = [
    {
      question: t("officeWellness.faq.q1.question"),
      answer: t("officeWellness.faq.q1.answer"),
    },
    {
      question: t("officeWellness.faq.q2.question"),
      answer: t("officeWellness.faq.q2.answer"),
    },
    {
      question: t("officeWellness.faq.q3.question"),
      answer: t("officeWellness.faq.q3.answer"),
    },
  ];

  const breadcrumbItems = [
    { name: "Home", url: "https://indoorplaygroundsolution.com" },
    {
      name: t("officeWellness.breadcrumb"),
      url: "https://indoorplaygroundsolution.com/indoorplaygroundsolution-office-wellness-solutions",
    },
  ];

  const section1Features = [
    { icon: Heart, textKey: "officeWellness.section1.features.stressReduction" },
    { icon: Palette, textKey: "officeWellness.section1.features.corporateAesthetic" },
    { icon: Users, textKey: "officeWellness.section1.features.multiGenerational" },
    { icon: Building2, textKey: "officeWellness.section1.features.wellnessZones" },
  ];

  const section2Features = [
    { icon: Ruler, textKey: "officeWellness.section2.features.turnkey" },
    { icon: Shield, textKey: "officeWellness.section2.features.safetyCompliance" },
    { icon: Leaf, textKey: "officeWellness.section2.features.ecoFriendly" },
    { icon: FileText, textKey: "officeWellness.section2.features.detailedPlans" },
  ];

  const section3Features = [
    { icon: TrendingUp, textKey: "officeWellness.section3.features.talentRetention" },
    { icon: DollarSign, textKey: "officeWellness.section3.features.bulkDiscount" },
    { icon: Award, textKey: "officeWellness.section3.features.warranty" },
    { icon: Users, textKey: "officeWellness.section3.features.teamBuilding" },
  ];

  const renderFeatureGrid = (features: { icon: React.ElementType; textKey: string }[]) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {features.map((f, i) => (
        <Card key={i} className="border-0 shadow-md">
          <CardContent className="p-4 flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <f.icon className="w-5 h-5 text-primary" />
            </div>
            <p className="text-sm text-foreground">{t(f.textKey)}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen">
      <SEOHead pageKey="officeWellness" />
      <BreadcrumbSchema items={breadcrumbItems} />
      <FAQSchema items={faqItems} />
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 bg-gradient-to-br from-primary/10 via-background to-accent/10 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <Badge variant="secondary" className="mb-4">
                <Building2 className="w-3 h-3 mr-1" />
                {t("officeWellness.hero.badge")}
              </Badge>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {t("officeWellness.hero.title")}{" "}
                <span className="text-primary">
                  {t("officeWellness.hero.titleHighlight")}
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                {t("officeWellness.hero.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to={localizedPath("/contact")}>
                    {t("officeWellness.hero.cta")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to={localizedPath("/about-us")}>
                    {t("officeWellness.hero.ctaSecondary")}
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 1: Revolutionizing the Office */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <Badge variant="secondary" className="mb-4">
                <Heart className="w-3 h-3 mr-1" />
                {t("officeWellness.section1.badge")}
              </Badge>
              <h2 className="text-2xl md:text-4xl font-bold mb-6">
                {t("officeWellness.section1.title")}{" "}
                <span className="text-primary">
                  {t("officeWellness.section1.titleHighlight")}
                </span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                {t("officeWellness.section1.content")}
              </p>
              {renderFeatureGrid(section1Features)}
            </motion.div>
          </div>
        </section>

        {/* Section 2: Turnkey Corporate Solutions */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <Badge variant="secondary" className="mb-4">
                <Ruler className="w-3 h-3 mr-1" />
                {t("officeWellness.section2.badge")}
              </Badge>
              <h2 className="text-2xl md:text-4xl font-bold mb-6">
                {t("officeWellness.section2.title")}{" "}
                <span className="text-primary">
                  {t("officeWellness.section2.titleHighlight")}
                </span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                {t("officeWellness.section2.content")}
              </p>
              {renderFeatureGrid(section2Features)}
              <div className="mt-8 text-center">
                <Button variant="outline" asChild>
                  <Link to={localizedPath("/contact")}>
                    {t("officeWellness.section2.cta")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 3: ROI */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <Badge variant="secondary" className="mb-4">
                <TrendingUp className="w-3 h-3 mr-1" />
                {t("officeWellness.section3.badge")}
              </Badge>
              <h2 className="text-2xl md:text-4xl font-bold mb-6">
                {t("officeWellness.section3.title")}{" "}
                <span className="text-primary">
                  {t("officeWellness.section3.titleHighlight")}
                </span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                {t("officeWellness.section3.content")}
              </p>
              {renderFeatureGrid(section3Features)}
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <Badge variant="secondary" className="mb-4">
                <HelpCircle className="w-3 h-3 mr-1" />
                {t("officeWellness.faq.badge")}
              </Badge>
              <h2 className="text-2xl md:text-4xl font-bold mb-4">
                {t("officeWellness.faq.title")}{" "}
                <span className="text-primary">
                  {t("officeWellness.faq.titleHighlight")}
                </span>
              </h2>
            </motion.div>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqItems.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="bg-card rounded-xl px-6 shadow-soft border-none"
                  >
                    <AccordionTrigger className="text-start font-heading font-semibold hover:text-primary transition-colors py-5">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA / Contact */}
        <ContactSection />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default OfficeWellness;
