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
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { EEATSignature } from "@/components/EEATSignature";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Calculator, ArrowRight, DollarSign, Ruler, Palette, Truck, Wrench, Shield,
  Sparkles, FileText, Clock, CheckCircle2, HelpCircle, Layers, Factory,
} from "lucide-react";

/**
 * SEO landing page for the high-intent keywords:
 *  - "custom indoor playground equipment cost"
 *  - "free 3D indoor playground design"
 *  - "full service indoor play solutions"
 */
const CustomIndoorPlaygroundCost = () => {
  const { localizedPath } = useLocalizedPath();

  const faqItems = [
    {
      question: "How much does a custom indoor playground cost in 2026?",
      answer:
        "Turnkey budgets typically fall into three tiers: Starter (150–400 m²) at US$30,000–US$80,000; Mid-market FEC zone (400–900 m²) at US$80,000–US$220,000; Flagship attraction (900–2,500 m²) at US$220,000–US$650,000. The figure depends on six factors: floor area, ceiling height, theming complexity, attraction mix (soft-play vs trampoline vs ninja vs gamified), country compliance and freight terms (FOB vs DDP).",
    },
    {
      question: "What does 'free 3D design' actually include?",
      answer:
        "Within 7–10 working days of receiving your floor plan and brief, our in-house CAD team delivers: (1) a top-down layout with circulation flows, (2) two 3D perspective renders, (3) an itemised BOQ with FOB and DDP pricing, (4) a structural drawing pack for your architect, and (5) a quoted lead time. There's no obligation to proceed and the files are yours to keep.",
    },
    {
      question: "Why is custom equipment cheaper long-term than off-the-shelf catalogues?",
      answer:
        "Catalogue equipment is sized to a generic 6×8 m bay — you almost always over-buy on slides you don't need and under-utilise 15–25% of your usable floor area. Custom designs land exactly to your column grid and ceiling, which typically lifts revenue per square metre by 18–30% and shortens payback by 4–7 months versus a catalogue install of the same budget.",
    },
    {
      question: "What's included in 'full service' versus equipment only?",
      answer:
        "Equipment-only ships pallets to your port. Full-service adds: site survey & feasibility, 3D design, EN 1176 / ASTM F1918 compliance docs, container loading plan, customs liaison (DDP markets), on-site supervisor for installation, operator training, and a 12-month spare-parts kit. Most first-time operators choose full-service to avoid the install learning curve.",
    },
    {
      question: "Do I have to pay for revisions to the 3D design?",
      answer:
        "Two rounds of structural revisions are included free. Further changes are billed at US$120/hour of CAD time, but in 90% of projects two rounds is enough to lock the concept. Theming and colour revisions are unlimited and free until production.",
    },
    {
      question: "How accurate is the initial quote?",
      answer:
        "The BOQ delivered with the free 3D design is binding for 30 days under standard FOB terms. The only items that may shift later are sea-freight (rates fluctuate weekly) and on-site civil works outside our scope (electrical mains, raised floors, fire suppression).",
    },
  ];

  const breadcrumbItems = [
    { name: "Home", url: "https://indoorplaygroundsolution.com" },
    { name: "Solutions", url: "https://indoorplaygroundsolution.com/products" },
    {
      name: "Custom Indoor Playground Cost & Free 3D Design",
      url: "https://indoorplaygroundsolution.com/custom-indoor-playground-cost-free-3d-design",
    },
  ];

  const tiers = [
    {
      tier: "Starter",
      size: "150 – 400 m²",
      budget: "$30k – $80k",
      best: "Cafés, hotels, kindergartens, small mall pads",
      includes: ["Soft-play structure", "1–2 themed elements", "Padded flooring", "EN 1176 docs"],
    },
    {
      tier: "Mid-market FEC",
      size: "400 – 900 m²",
      budget: "$80k – $220k",
      best: "Standalone family centres, mid-size mall tenants",
      includes: ["Multi-level structure", "Trampoline or ninja zone", "Toddler area", "Party room", "Full theming"],
    },
    {
      tier: "Flagship",
      size: "900 – 2,500 m²",
      budget: "$220k – $650k",
      best: "Anchor attractions, resorts, regional FECs",
      includes: ["Mixed-use zones", "Gamified attractions", "Climbing walls", "F&B integration", "Custom IP theming"],
    },
  ];

  const costDrivers = [
    { icon: Ruler, title: "Floor Area & Ceiling Height", desc: "Roughly 60% of CAPEX scales linearly with usable m². Ceilings above 6 m unlock multi-level structures that lift revenue/m² but add 12–18% to steel cost." },
    { icon: Palette, title: "Theming Complexity", desc: "A generic palette costs nothing extra. Custom IP, hand-sculpted FRP and projection theming add US$120–US$380 per m² but improve dwell time and social-media reach." },
    { icon: Layers, title: "Attraction Mix", desc: "Soft-play is the cheapest /m². Trampoline, ninja and gamified zones cost 1.8–3.2× more but typically charge 1.5–2.5× the entry ticket — they pay back faster." },
    { icon: Shield, title: "Country Compliance", desc: "EN 1176, ASTM F1918, AS/NZS 4685, CSA Z614, SASO — each test pack adds US$1,200–US$4,500 but is mandatory for insurance and licensing in your market." },
    { icon: Truck, title: "Freight & Incoterms", desc: "FOB Shanghai is the baseline. CIF adds 6–11%. DDP (we handle customs) adds 14–22% but eliminates clearance risk. Sea freight rates move weekly — locked at PO." },
    { icon: Wrench, title: "Installation Scope", desc: "Supervisor-only (you supply labour): saves 8–12% but needs a competent local crew. Full turnkey install: adds 10–14%, eliminates rework, includes operator training." },
  ];

  const designSteps = [
    { step: "01", title: "Share Your Brief", days: "Day 1", desc: "Send floor plan, ceiling height, brand colours and target age groups via WhatsApp or our quote form." },
    { step: "02", title: "CAD Layout Draft", days: "Day 2–4", desc: "Our designer drafts the 2D layout with circulation, party rooms and emergency egress." },
    { step: "03", title: "3D Perspective Renders", days: "Day 5–8", desc: "Two photoreal renders from the entry and from the parents' lounge. Theming colour-locked." },
    { step: "04", title: "BOQ & Compliance Pack", days: "Day 9–10", desc: "Itemised quote with FOB and DDP options, lead time, and country-specific certificate list." },
  ];

  const fullService = [
    { icon: FileText, title: "Site Survey & Feasibility", desc: "We translate your column grid, ceiling soffit and electrical mains into what's actually buildable." },
    { icon: Sparkles, title: "Free 3D Concept Design", desc: "Photoreal renders, top-down plan and BOQ — yours to keep whether you order or not." },
    { icon: Factory, title: "ISO 9001 Manufacturing", desc: "All steel, foam, vinyl and electronics produced in one Wenzhou factory. Single point of accountability." },
    { icon: Shield, title: "Multi-Standard Certification", desc: "EN 1176, ASTM F1918, AS/NZS 4685, CSA Z614, SASO — we certify to whichever standard your market requires." },
    { icon: Truck, title: "Logistics & Customs (DDP)", desc: "Container loading plan, sea/air freight booking, customs liaison in 50+ countries." },
    { icon: Wrench, title: "Install + Operator Training", desc: "Our supervisor leads the on-site crew, then trains your staff on daily inspection and safety protocols." },
  ];

  return (
    <div className="min-h-screen">
      <SEOHead
        pageKey="customPlaygroundCost"
        ogType="website"
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <FAQSchema items={faqItems} />
      <OrganizationSchema />
      <Header />

      <main>
        {/* Hero */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/85" />
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-accent/15 rounded-full blur-3xl" />
            <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-accent/10 rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-accent/20 text-accent border-accent/30">
                <Calculator className="w-3 h-3 mr-1" />
                B2B · Cost Transparency + Free 3D Design
              </Badge>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight text-primary-foreground">
                Custom Indoor Playground Cost{" "}
                <span className="block text-accent mt-2">— and a Free 3D Design Before You Commit</span>
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/85 mb-8 max-w-3xl mx-auto">
                Honest 2026 budget ranges from US$30k starter pads to US$650k flagship attractions, the six factors that actually move the number, and a 10-day free 3D concept with itemised BOQ — yours to keep whether you order or not.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="hero" asChild>
                  <a href="#contact">Get Free 3D Design <ArrowRight className="ml-2 h-4 w-4" /></a>
                </Button>
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                  <a href="#tiers">Browse Budget Tiers</a>
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
                { v: "10 days", l: "Free 3D delivery", icon: Clock },
                { v: "3 tiers", l: "Transparent budgets", icon: DollarSign },
                { v: "6", l: "Cost drivers explained", icon: Calculator },
                { v: "50+", l: "Countries served DDP", icon: Truck },
              ].map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="text-center p-6 bg-background rounded-xl shadow-sm">
                  <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center"><s.icon className="w-5 h-5 text-primary" /></div>
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{s.v}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{s.l}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Budget tiers */}
        <section id="tiers" className="py-16 md:py-20 bg-background scroll-mt-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge variant="secondary" className="mb-4"><DollarSign className="w-3 h-3 mr-1" />Budget Tiers</Badge>
              <h2 className="text-2xl md:text-4xl font-heading font-bold mb-4">
                Know Your Cost <span className="text-primary">Before You Commit</span>
              </h2>
              <p className="text-muted-foreground text-lg">Real 2026 turnkey ranges from 60+ projects we've shipped this year. No salesy "starting from".</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto">
              {tiers.map((t, i) => (
                <motion.div key={t.tier} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <Card className={`h-full border-2 ${i === 1 ? "border-accent shadow-lg" : "border-transparent shadow-md"}`}>
                    <CardContent className="p-6">
                      {i === 1 && <Badge className="mb-3 bg-accent text-accent-foreground">Most popular</Badge>}
                      <h3 className="font-heading font-bold text-xl mb-1">{t.tier}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{t.size}</p>
                      <div className="text-3xl font-bold text-primary mb-4">{t.budget}</div>
                      <p className="text-sm text-foreground mb-4"><strong>Best for:</strong> {t.best}</p>
                      <ul className="space-y-2">
                        {t.includes.map((it) => (
                          <li key={it} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                            <span>{it}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 6 cost drivers */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge variant="secondary" className="mb-4"><Calculator className="w-3 h-3 mr-1" />The 6 Cost Drivers</Badge>
              <h2 className="text-2xl md:text-4xl font-heading font-bold mb-4">
                What Actually Moves <span className="text-primary">the Number</span>
              </h2>
              <p className="text-muted-foreground">A 600 m² project can quote at US$95k or US$210k depending on these six variables. Knowing them up front lets you brief us accurately and avoid scope creep.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
              {costDrivers.map((d, i) => (
                <motion.div key={d.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <Card className="border-0 shadow-md h-full">
                    <CardContent className="p-6">
                      <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4"><d.icon className="w-5 h-5 text-primary" /></div>
                      <h3 className="font-heading font-bold text-lg mb-2">{d.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 10-day 3D process */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <Badge variant="secondary" className="mb-4"><Sparkles className="w-3 h-3 mr-1" />Free 3D Design · 10-Day Turnaround</Badge>
                <h2 className="text-2xl md:text-4xl font-heading font-bold">
                  From Floor Plan to{" "}
                  <span className="text-primary">Photoreal 3D</span> in 10 Days
                </h2>
              </div>
              <ol className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {designSteps.map((p) => (
                  <li key={p.step} className="bg-muted/30 rounded-xl p-5">
                    <div className="text-3xl font-bold text-primary mb-2">{p.step}</div>
                    <h3 className="font-heading font-semibold mb-1">{p.title}</h3>
                    <p className="text-xs text-accent font-medium mb-2">{p.days}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  </li>
                ))}
              </ol>
              <div className="text-center mt-10">
                <Button variant="hero" size="lg" asChild>
                  <a href="#contact">Start My Free 3D Design <ArrowRight className="ml-2 h-4 w-4" /></a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Full service capabilities */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge variant="secondary" className="mb-4"><Wrench className="w-3 h-3 mr-1" />Full-Service Solution</Badge>
              <h2 className="text-2xl md:text-4xl font-heading font-bold mb-4">
                One Factory. <span className="text-primary">Design → Ship → Install → Train.</span>
              </h2>
              <p className="text-muted-foreground">Operators waste 6–10 weeks coordinating a designer, a steel shop, a soft-play vendor and a freight forwarder. We collapse that into one quote, one contract, one accountable team.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
              {fullService.map((s, i) => (
                <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <Card className="border-0 shadow-md h-full">
                    <CardContent className="p-6">
                      <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-4"><s.icon className="w-5 h-5 text-accent" /></div>
                      <h3 className="font-heading font-bold text-lg mb-2">{s.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Related links */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <h3 className="text-lg font-heading font-semibold mb-4 text-center">Plan the Rest of Your Project</h3>
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="outline" size="sm" asChild><Link to={localizedPath("/process")}>Our 8-Step Process</Link></Button>
              <Button variant="outline" size="sm" asChild><Link to={localizedPath("/investment-opportunity")}>Investment & ROI</Link></Button>
              <Button variant="outline" size="sm" asChild><Link to={localizedPath("/safety-certifications")}>Safety & Certifications</Link></Button>
              <Button variant="outline" size="sm" asChild><Link to={localizedPath("/case-studies")}>2,000+ Case Studies</Link></Button>
              <Button variant="outline" size="sm" asChild><Link to={localizedPath("/products")}>Browse Products</Link></Button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4"><HelpCircle className="w-3 h-3 mr-1" />FAQ</Badge>
              <h2 className="text-2xl md:text-4xl font-heading font-bold">
                Cost & Design <span className="text-primary">Questions, Answered</span>
              </h2>
            </div>
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="bg-card rounded-xl px-6 shadow-soft border-none">
                  <AccordionTrigger className="text-start font-heading font-semibold hover:text-primary transition-colors py-5">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <ContactSection />
        <EEATSignature />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default CustomIndoorPlaygroundCost;
