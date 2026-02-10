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
  Zap,
  Shield,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Target,
  Ruler,
  DollarSign,
  Award,
  HelpCircle,
  Dumbbell,
  LayoutGrid,
  Calculator,
} from "lucide-react";

const ActivePlayRunning = () => {
  const { t } = useTranslation();
  const { localizedPath } = useLocalizedPath();

  const faqItems = [
    {
      question: t("activePlayRunning.faq.q1.question"),
      answer: t("activePlayRunning.faq.q1.answer"),
    },
    {
      question: t("activePlayRunning.faq.q2.question"),
      answer: t("activePlayRunning.faq.q2.answer"),
    },
    {
      question: t("activePlayRunning.faq.q3.question"),
      answer: t("activePlayRunning.faq.q3.answer"),
    },
  ];

  const breadcrumbItems = [
    { name: "Home", url: "https://indoorplaygroundsolution.com" },
    {
      name: t("activePlayRunning.breadcrumb"),
      url: "https://indoorplaygroundsolution.com/best-indoorplaygroundsolution-active-play-for-running-facilities",
    },
  ];

  const section1Features = [
    {
      icon: Dumbbell,
      textKey: "activePlayRunning.section1.features.durability",
    },
    {
      icon: Shield,
      textKey: "activePlayRunning.section1.features.reinforced",
    },
    {
      icon: Target,
      textKey: "activePlayRunning.section1.features.longevity",
    },
    {
      icon: Zap,
      textKey: "activePlayRunning.section1.features.cardio",
    },
  ];

  const section2Features = [
    {
      icon: LayoutGrid,
      textKey: "activePlayRunning.section2.features.flowOptimized",
    },
    {
      icon: Ruler,
      textKey: "activePlayRunning.section2.features.customLayout",
    },
    {
      icon: Shield,
      textKey: "activePlayRunning.section2.features.safetyZones",
    },
    {
      icon: Award,
      textKey: "activePlayRunning.section2.features.qualityStandards",
    },
  ];

  const section3Features = [
    {
      icon: Calculator,
      textKey: "activePlayRunning.section3.features.roiCalculator",
    },
    {
      icon: DollarSign,
      textKey: "activePlayRunning.section3.features.lowerMaintenance",
    },
    {
      icon: Shield,
      textKey: "activePlayRunning.section3.features.warranty",
    },
    {
      icon: TrendingUp,
      textKey: "activePlayRunning.section3.features.sustainable",
    },
  ];

  return (
    <div className="min-h-screen">
      <SEOHead pageKey="activePlayRunning" />
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
                <Zap className="w-3 h-3 mr-1" />
                {t("activePlayRunning.hero.badge")}
              </Badge>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {t("activePlayRunning.hero.title")}{" "}
                <span className="text-primary">
                  {t("activePlayRunning.hero.titleHighlight")}
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                {t("activePlayRunning.hero.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to={localizedPath("/contact")}>
                    {t("activePlayRunning.hero.cta")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to={localizedPath("/products/ninja-course")}>
                    {t("activePlayRunning.hero.ctaSecondary")}
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 1: Ninja Warrior Courses */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <Badge variant="secondary" className="mb-4">
                <Dumbbell className="w-3 h-3 mr-1" />
                {t("activePlayRunning.section1.badge")}
              </Badge>
              <h2 className="text-2xl md:text-4xl font-bold mb-6">
                {t("activePlayRunning.section1.title")}{" "}
                <span className="text-primary">
                  {t("activePlayRunning.section1.titleHighlight")}
                </span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                {t("activePlayRunning.section1.content")}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {section1Features.map((f, i) => (
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
            </motion.div>
          </div>
        </section>

        {/* Section 2: Strategic Design */}
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
                {t("activePlayRunning.section2.badge")}
              </Badge>
              <h2 className="text-2xl md:text-4xl font-bold mb-6">
                {t("activePlayRunning.section2.title")}{" "}
                <span className="text-primary">
                  {t("activePlayRunning.section2.titleHighlight")}
                </span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                {t("activePlayRunning.section2.content")}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {section2Features.map((f, i) => (
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
              <div className="mt-8 text-center">
                <Button variant="outline" asChild>
                  <Link to={localizedPath("/contact")}>
                    {t("activePlayRunning.section2.cta")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 3: Investment & ROI */}
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
                {t("activePlayRunning.section3.badge")}
              </Badge>
              <h2 className="text-2xl md:text-4xl font-bold mb-6">
                {t("activePlayRunning.section3.title")}{" "}
                <span className="text-primary">
                  {t("activePlayRunning.section3.titleHighlight")}
                </span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                {t("activePlayRunning.section3.content")}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {section3Features.map((f, i) => (
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
                {t("activePlayRunning.faq.badge")}
              </Badge>
              <h2 className="text-2xl md:text-4xl font-bold mb-4">
                {t("activePlayRunning.faq.title")}{" "}
                <span className="text-primary">
                  {t("activePlayRunning.faq.titleHighlight")}
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

export default ActivePlayRunning;
