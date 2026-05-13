import { useParams, Link, Navigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { SEOHead } from "@/components/SEOHead";
import { ContactSection } from "@/components/ContactSection";
import { FAQSchema, BreadcrumbSchema, OrganizationSchema } from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Shield,
  ArrowRight,
  BarChart3,
  HelpCircle,
  Banknote,
  CheckCircle2,
  Globe2,
} from "lucide-react";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { getROIPageBySlug, roiPages } from "@/config/roiPages";

const InvestmentROIPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { localizedPath } = useLocalizedPath();
  const data = slug ? getROIPageBySlug(slug) : undefined;

  if (!data) {
    return <Navigate to="/investment-opportunity" replace />;
  }

  const breadcrumbItems = [
    { name: "Home", url: "https://indoorplaygroundsolution.com" },
    { name: "Investment Opportunity", url: "https://indoorplaygroundsolution.com/investment-opportunity" },
    { name: data.country, url: `https://indoorplaygroundsolution.com/investment-opportunity/${data.slug}` },
  ];

  // Suggest 3 sibling regions
  const siblings = roiPages.filter((p) => p.slug !== data.slug).slice(0, 3);

  return (
    <div className="min-h-screen">
      <SEOHead
        pageKey="investmentROI"
        dynamicTitle={data.metaTitle}
        dynamicDescription={data.metaDescription}
        dynamicKeywords={data.metaKeywords}
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <FAQSchema items={data.faqs} />
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
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <Badge className="mb-4 bg-accent/20 text-accent border-accent/30">
                <span className="mr-2 text-base leading-none" aria-hidden="true">{data.flag}</span>
                {data.badge}
              </Badge>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight text-primary-foreground">
                {data.heroTitle}{" "}
                <span className="block text-accent mt-2">{data.heroHighlight}</span>
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-3xl mx-auto">
                {data.heroDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="hero" asChild>
                  <a href="#contact">
                    Get Investment Quote <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                  asChild
                >
                  <Link to={localizedPath("/products")}>View Products</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {data.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center p-6 bg-background rounded-xl shadow-sm"
                >
                  <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                    {i === 0 && <BarChart3 className="w-5 h-5 text-primary" />}
                    {i === 1 && <TrendingUp className="w-5 h-5 text-primary" />}
                    {i === 2 && <Shield className="w-5 h-5 text-primary" />}
                    {i === 3 && <Banknote className="w-5 h-5 text-primary" />}
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 1 — Market */}
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
                {data.marketBadge}
              </Badge>
              <h2 className="text-2xl md:text-4xl font-heading font-bold mb-6">
                {data.marketTitle} <span className="text-primary">{data.marketHighlight}</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">{data.marketContent}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.marketFeatures.map((f, i) => (
                  <Card key={i} className="border-0 shadow-md">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 2 — ROI Model */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <Badge variant="secondary" className="mb-4">
                <BarChart3 className="w-3 h-3 mr-1" />
                {data.roiBadge}
              </Badge>
              <h2 className="text-2xl md:text-4xl font-heading font-bold mb-6">
                {data.roiTitle} <span className="text-primary">{data.roiHighlight}</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">{data.roiContent}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.roiFeatures.map((f, i) => (
                  <Card key={i} className="border-0 shadow-md">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Investment Breakdown */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <Badge variant="secondary" className="mb-4">
                <Banknote className="w-3 h-3 mr-1" />
                Investment Breakdown
              </Badge>
              <h2 className="text-2xl md:text-4xl font-heading font-bold mb-4">
                What It Costs to{" "}
                <span className="text-primary">Open in {data.country}</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">{data.investmentSummary}</p>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-0">
                  <ul className="divide-y divide-border">
                    {data.investmentBreakdown.map((row, i) => (
                      <li key={i} className="flex items-center justify-between gap-4 px-6 py-4">
                        <span className="text-foreground font-medium">{row.item}</span>
                        <span className="text-primary font-semibold whitespace-nowrap">{row.range}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <div className="mt-8 text-center">
                <Button variant="hero" size="lg" asChild>
                  <a href="#contact">
                    Request a Custom {data.country} ROI Model <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Sibling regions */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Globe2 className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-heading font-semibold">Compare Other Markets</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {siblings.map((s) => (
                  <Link
                    key={s.slug}
                    to={localizedPath(`/investment-opportunity/${s.slug}`)}
                    className="group block bg-background rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl" aria-hidden="true">{s.flag}</span>
                      <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {s.country}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{s.region} · ROI guide & investment costs</p>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-6">
                <Button variant="outline" asChild>
                  <Link to={localizedPath("/investment-opportunity")}>View All Markets</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
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
                FAQ
              </Badge>
              <h2 className="text-2xl md:text-4xl font-heading font-bold mb-4">
                {data.country} Investment <span className="text-primary">Questions Answered</span>
              </h2>
            </motion.div>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {data.faqs.map((faq, index) => (
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

        <ContactSection />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default InvestmentROIPage;
