import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { SEOHead } from "@/components/SEOHead";
import { ContactSection } from "@/components/ContactSection";
import { BreadcrumbSchema, OrganizationSchema, FAQSchema } from "@/components/StructuredData";
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
  ArrowRight,
  BarChart3,
  Banknote,
  Globe2,
  Users,
  Building2,
  HelpCircle,
  Target,
  CheckCircle2,
} from "lucide-react";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { roiPages } from "@/config/roiPages";

const hubFaqs = [
  {
    question: "How much does it cost to open an indoor playground?",
    answer:
      "Total turnkey investment for a 500-1,200 m² indoor playground typically ranges from US$160,000 to US$1.2M depending on country, format (mall vs standalone), theming level and attraction mix. See each country page for a detailed local breakdown.",
  },
  {
    question: "What is the typical payback period?",
    answer:
      "Well-located NinescapeLand-equipped centres typically reach payback in 15-32 months, with premium markets like UAE and Australia trending faster, and emerging LATAM markets trending longer.",
  },
  {
    question: "What revenue streams should an indoor playground rely on?",
    answer:
      "Strong centres run on four streams: general admission (35-50% of revenue), birthday parties (25-45%), F&B (10-20%) and corporate / school / membership (5-15%). Our designs build all four into the floor plan from day one.",
  },
  {
    question: "Do you support international shipping, certification and customs?",
    answer:
      "Yes. We supply equipment certified to EN 1176, ASTM F1918, AS/NZS 4685, CSA Z614, ABNT NBR and SASO depending on market. We can ship DDP/DAP and partner with local customs brokers in every country we serve.",
  },
];

const InvestmentOpportunity = () => {
  const { localizedPath } = useLocalizedPath();

  const breadcrumbItems = [
    { name: "Home", url: "https://indoorplaygroundsolution.com" },
    { name: "Investment Opportunity", url: "https://indoorplaygroundsolution.com/investment-opportunity" },
  ];

  const valueProps = [
    {
      icon: BarChart3,
      title: "Transparent ROI Models",
      description: "Country-specific payback ranges, gross-margin targets and revenue-mix assumptions you can defend to investors.",
    },
    {
      icon: Banknote,
      title: "Honest Investment Breakdowns",
      description: "Itemised CAPEX ranges per country — equipment, theming, shipping, install, POS — no hidden line items.",
    },
    {
      icon: Building2,
      title: "Mall & Standalone Templates",
      description: "Proven floor plans for both mall-pad tenants and standalone retail formats, sized to your catchment.",
    },
    {
      icon: Users,
      title: "Local Compliance",
      description: "EN 1176, ASTM, AS/NZS, CSA, ABNT, SASO — equipment certified to whatever standard your market requires.",
    },
  ];

  return (
    <div className="min-h-screen">
      <SEOHead
        pageKey="investmentOpportunity"
        dynamicTitle="Indoor Playground Investment Opportunity & ROI Guide"
        dynamicDescription="Complete investment guide for indoor playground & FEC operators. ROI models, payback periods and CAPEX breakdowns for Australia, NZ, UAE, Saudi, Mexico, Brazil, UK and Canada."
        dynamicKeywords="indoor playground investment, indoor playground business opportunity, FEC investment, family entertainment centre ROI, soft play business plan"
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <FAQSchema items={hubFaqs} />
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
                <Target className="w-3 h-3 mr-1" />
                Indoor Playground Investment Hub
              </Badge>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight text-primary-foreground">
                Open a Profitable Indoor Playground.{" "}
                <span className="block text-accent mt-2">Backed by Real ROI Numbers.</span>
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-3xl mx-auto">
                Country-specific investment guides, transparent CAPEX breakdowns and payback models for entrepreneurs and investors opening indoor playground and family entertainment centre businesses worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="hero" asChild>
                  <Link to={localizedPath("/contact")}>
                    Request Custom ROI Model <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                  asChild
                >
                  <a href="#markets">Browse Markets</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Headline stats */}
        <section className="py-12 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { v: "8", l: "Countries Covered", icon: Globe2 },
                { v: "15-32 mo", l: "Typical Payback", icon: TrendingUp },
                { v: "35-60%", l: "Gross Margin Range", icon: BarChart3 },
                { v: "4", l: "Revenue Streams", icon: Banknote },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="text-center p-6 bg-background rounded-xl shadow-sm"
                >
                  <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                    <s.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{s.v}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{s.l}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Value props */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12 max-w-3xl mx-auto">
                <Badge variant="secondary" className="mb-4">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Why Investors Choose Us
                </Badge>
                <h2 className="text-2xl md:text-4xl font-heading font-bold mb-4">
                  Built for Operators Who Need <span className="text-primary">Real Numbers</span>
                </h2>
                <p className="text-muted-foreground text-lg">
                  We supply the certified equipment — and the financial honesty — investors and lenders need to greenlight your project.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {valueProps.map((v, i) => (
                  <Card key={i} className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <v.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-heading font-semibold text-lg mb-1">{v.title}</h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">{v.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Markets grid */}
        <section id="markets" className="py-16 md:py-20 bg-muted/30 scroll-mt-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <Badge variant="secondary" className="mb-4">
                <Globe2 className="w-3 h-3 mr-1" />
                Country-Specific Guides
              </Badge>
              <h2 className="text-2xl md:text-4xl font-heading font-bold mb-4">
                Browse Investment Guides by <span className="text-primary">Market</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Each guide includes local market sizing, payback ranges, CAPEX breakdown and certification requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
              <Link
                to={localizedPath("/indoor-playground-roi-analysis-uk")}
                className="group bg-background rounded-xl p-6 shadow-sm hover:shadow-lg transition-all hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl" aria-hidden="true">🇬🇧</span>
                  <div>
                    <h3 className="font-heading font-semibold text-lg group-hover:text-primary transition-colors">United Kingdom</h3>
                    <p className="text-xs text-muted-foreground">Europe · BS EN 1176</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">UK indoor play market trends, BS EN 1176 compliance and ROI model for British operators.</p>
                <span className="text-sm font-medium text-primary inline-flex items-center">
                  Read UK guide <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </Link>

              <Link
                to={localizedPath("/indoor-playground-roi-canada")}
                className="group bg-background rounded-xl p-6 shadow-sm hover:shadow-lg transition-all hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl" aria-hidden="true">🇨🇦</span>
                  <div>
                    <h3 className="font-heading font-semibold text-lg group-hover:text-primary transition-colors">Canada</h3>
                    <p className="text-xs text-muted-foreground">North America · CSA Z614</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">Climate-driven year-round demand, CSA Z614 compliance and Canadian operator ROI model.</p>
                <span className="text-sm font-medium text-primary inline-flex items-center">
                  Read Canada guide <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </Link>

              {roiPages.map((p) => (
                <Link
                  key={p.slug}
                  to={localizedPath(`/investment-opportunity/${p.slug}`)}
                  className="group bg-background rounded-xl p-6 shadow-sm hover:shadow-lg transition-all hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl" aria-hidden="true">{p.flag}</span>
                    <div>
                      <h3 className="font-heading font-semibold text-lg group-hover:text-primary transition-colors">{p.country}</h3>
                      <p className="text-xs text-muted-foreground">{p.region}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{p.heroDescription.slice(0, 110)}…</p>
                  <span className="text-sm font-medium text-primary inline-flex items-center">
                    Read {p.country} guide <ArrowRight className="ml-1 h-3 w-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Revenue model strip */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Badge variant="secondary" className="mb-4">
                <BarChart3 className="w-3 h-3 mr-1" />
                The Four-Stream Revenue Model
              </Badge>
              <h2 className="text-2xl md:text-4xl font-heading font-bold mb-6">
                How Profitable Indoor Playgrounds <span className="text-primary">Actually Make Money</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                The centres that pay back fastest don't rely on admission alone. We design every NinescapeLand venue around four diversified revenue streams — so weekday performance, party seasons and economic cycles all work in your favour.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { t: "General Admission · 35-50%", d: "Tiered ticketing by age and time slot. The volume base of the business." },
                  { t: "Birthday Parties · 25-45%", d: "Highest-margin channel. Booked weeks ahead. Designed-in dedicated suites." },
                  { t: "Food & Beverage · 10-20%", d: "High-margin cafe attached to play floor. Lifts dwell time and per-head spend." },
                  { t: "Corporate / School / Membership · 5-15%", d: "Recurring weekday revenue that fills quiet days and stabilises cash flow." },
                ].map((s, i) => (
                  <Card key={i} className="border-0 shadow-md">
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-foreground mb-1">{s.t}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{s.d}</p>
                    </CardContent>
                  </Card>
                ))}
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
                Investor <span className="text-primary">Questions Answered</span>
              </h2>
            </motion.div>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {hubFaqs.map((faq, index) => (
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

export default InvestmentOpportunity;
