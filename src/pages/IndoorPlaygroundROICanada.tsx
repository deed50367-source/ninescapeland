import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { SEOHead } from "@/components/SEOHead";
import { FAQSchema, BreadcrumbSchema, OrganizationSchema } from "@/components/StructuredData";
import { ContactSection } from "@/components/ContactSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  TrendingUp,
  Shield,
  ArrowRight,
  BarChart3,
  Clock,
  HelpCircle,
  Snowflake,
  Banknote,
  Package,
  Smartphone,
  FileCheck,
  MapPin,
} from "lucide-react";

const IndoorPlaygroundROICanada = () => {
  const { t } = useTranslation();
  const { localizedPath } = useLocalizedPath();

  const faqItems = [
    { question: t("roiCanada.faq.q1.question"), answer: t("roiCanada.faq.q1.answer") },
    { question: t("roiCanada.faq.q2.question"), answer: t("roiCanada.faq.q2.answer") },
  ];

  const breadcrumbItems = [
    { name: "Home", url: "https://indoorplaygroundsolution.com" },
    { name: t("roiCanada.breadcrumb"), url: "https://indoorplaygroundsolution.com/indoor-playground-roi-canada" },
  ];

  const stats = [
    { icon: Snowflake, value: "+40%", label: t("roiCanada.stats.winterSurge") },
    { icon: TrendingUp, value: "+25%", label: t("roiCanada.stats.trafficIncrease") },
    { icon: Shield, value: "CSA Z614", label: t("roiCanada.stats.compliance") },
    { icon: Clock, value: "12 mo", label: t("roiCanada.stats.maintenance") },
  ];

  const section1Features = [
    { icon: Snowflake, text: t("roiCanada.section1.features.yearRound") },
    { icon: TrendingUp, text: t("roiCanada.section1.features.winterTraffic") },
    { icon: BarChart3, text: t("roiCanada.section1.features.multiFunctional") },
    { icon: MapPin, text: t("roiCanada.section1.features.broadDemographic") },
  ];

  const section2Features = [
    { icon: Package, text: t("roiCanada.section2.features.welcomePackage") },
    { icon: FileCheck, text: t("roiCanada.section2.features.safetyCompliance") },
    { icon: Smartphone, text: t("roiCanada.section2.features.mobileApp") },
    { icon: Banknote, text: t("roiCanada.section2.features.localIncentives") },
  ];

  return (
    <div className="min-h-screen">
      <SEOHead pageKey="roiCanada" />
      <BreadcrumbSchema items={breadcrumbItems} />
      <FAQSchema items={faqItems} />
      <OrganizationSchema />
      <Header />

      <main>
        {/* Hero */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/85" />
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-accent/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-accent/5 rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-accent/20 text-accent border-accent/30">
                <BarChart3 className="w-3 h-3 mr-1" />
                {t("roiCanada.hero.badge")}
              </Badge>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight text-primary-foreground">
                {t("roiCanada.hero.title")}{" "}
                <span className="block text-accent mt-2">{t("roiCanada.hero.titleHighlight")}</span>
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-3xl mx-auto">{t("roiCanada.hero.description")}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="hero" asChild>
                  <Link to={localizedPath("/contact")}>{t("roiCanada.hero.cta")} <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                  <Link to={localizedPath("/products")}>{t("roiCanada.hero.ctaSecondary")}</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center p-6 bg-background rounded-xl shadow-sm">
                  <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center"><stat.icon className="w-5 h-5 text-primary" /></div>
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 1 */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto">
              <Badge variant="secondary" className="mb-4"><TrendingUp className="w-3 h-3 mr-1" />{t("roiCanada.section1.badge")}</Badge>
              <h2 className="text-2xl md:text-4xl font-heading font-bold mb-6">{t("roiCanada.section1.title")} <span className="text-primary">{t("roiCanada.section1.titleHighlight")}</span></h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">{t("roiCanada.section1.content")}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {section1Features.map((f, i) => (
                  <Card key={i} className="border-0 shadow-md"><CardContent className="p-4 flex items-start gap-3"><div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"><f.icon className="w-5 h-5 text-primary" /></div><p className="text-sm text-foreground">{f.text}</p></CardContent></Card>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto">
              <Badge variant="secondary" className="mb-4"><Shield className="w-3 h-3 mr-1" />{t("roiCanada.section2.badge")}</Badge>
              <h2 className="text-2xl md:text-4xl font-heading font-bold mb-6">{t("roiCanada.section2.title")} <span className="text-primary">{t("roiCanada.section2.titleHighlight")}</span></h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">{t("roiCanada.section2.content")}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {section2Features.map((f, i) => (
                  <Card key={i} className="border-0 shadow-md"><CardContent className="p-4 flex items-start gap-3"><div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"><f.icon className="w-5 h-5 text-primary" /></div><p className="text-sm text-foreground">{f.text}</p></CardContent></Card>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Button variant="hero" asChild><Link to={localizedPath("/contact")}>{t("roiCanada.section2.cta")}<ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-lg font-heading font-semibold mb-4 text-center">{t("roiCanada.relatedTitle")}</h3>
              <div className="flex flex-wrap justify-center gap-3">
                <Button variant="outline" size="sm" asChild><Link to={localizedPath("/products")}>{t("roiCanada.relatedLinks.allProducts")}</Link></Button>
                <Button variant="outline" size="sm" asChild><Link to={localizedPath("/process")}>{t("roiCanada.relatedLinks.process")}</Link></Button>
                <Button variant="outline" size="sm" asChild><Link to={localizedPath("/case-studies")}>{t("roiCanada.relatedLinks.caseStudies")}</Link></Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-3xl mx-auto mb-12">
              <Badge variant="secondary" className="mb-4"><HelpCircle className="w-3 h-3 mr-1" />{t("roiCanada.faq.badge")}</Badge>
              <h2 className="text-2xl md:text-4xl font-heading font-bold mb-4">{t("roiCanada.faq.title")} <span className="text-primary">{t("roiCanada.faq.titleHighlight")}</span></h2>
            </motion.div>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqItems.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="bg-card rounded-xl px-6 shadow-soft border-none">
                    <AccordionTrigger className="text-start font-heading font-semibold hover:text-primary transition-colors py-5">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <ContactSection />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default IndoorPlaygroundROICanada;
