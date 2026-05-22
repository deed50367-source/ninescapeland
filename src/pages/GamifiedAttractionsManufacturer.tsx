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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Gamepad2,
  Zap,
  Trophy,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Users,
  HelpCircle,
  Cpu,
  Activity,
  Target,
  Flame,
  BarChart3,
  Layers,
  Wand2,
  ShieldCheck,
} from "lucide-react";

/**
 * Landing page for the trending B2B keyword "gamified attractions manufacturer".
 * Targets FEC operators, malls, resorts, and family-brand chains looking for
 * interactive, score-driven, sensor-integrated play attractions.
 */
const GamifiedAttractionsManufacturer = () => {
  const { localizedPath } = useLocalizedPath();

  const faqItems = [
    {
      question: "What is a gamified attraction?",
      answer:
        "A gamified attraction is a physical play or active-entertainment installation layered with game mechanics — scoring, timers, levels, leaderboards, missions, lighting and sound feedback. Examples: interactive climbing walls, ninja warrior timing courses, projection-mapped trampoline lanes, sensor-activated ball arenas, AR slide racing. The mechanic turns a one-time visit into a repeat 'beat-my-score' habit.",
    },
    {
      question: "How is NinescapeLand different from a regular playground manufacturer?",
      answer:
        "We engineer the steel, soft-play, and sensor layer in the same factory. Most playground makers integrate third-party tech as an afterthought; we design the cable trays, IP-rated sensor cavities, and projector mounts into the structure during the CAD stage. The result is cleaner sightlines, fewer failure points and a 30–40% lower long-term maintenance bill on the interactive layer.",
    },
    {
      question: "Which game systems do you support out-of-the-box?",
      answer:
        "Lumo-style touch walls, Valo Climb / Augmented Climbing, Sutu Walls, Memo Walls, ActiveTheory & Holovis projection systems, Brogent dark-ride controllers, plus our own NS-Play SDK (TCP/IP & MQTT) for custom score & leaderboard integrations. Hardware ships ready for any DMX-512, OSC or REST endpoint.",
    },
    {
      question: "What's the typical investment range and ROI?",
      answer:
        "Gamified zones cost USD $850–$2,400 per m² installed, vs. $350–$700 for static soft-play. Operators we work with report 2.1×–2.8× per-cap spend and a 38–60% repeat-visit rate within 90 days, hitting payback in 14–22 months for a 600–1,200 m² footprint.",
    },
    {
      question: "Do you handle CE / ASTM / TUV certification for the electronics?",
      answer:
        "Yes. All controllers, LED drivers and low-voltage cabling ship with CE LVD, EMC, RoHS, FCC Part 15 and (on request) UL 60950 / IEC 62368-1 documentation. The mechanical structure carries ASTM F1918, EN 1176-1/-10/-11 and TUV certificates as standard.",
    },
    {
      question: "What's the lead time for a turnkey gamified attraction?",
      answer:
        "Concept-to-CAD: 7–10 days · Production: 35–45 days · Containerised shipping: 25–40 days depending on port · On-site install + commissioning: 7–14 days. A 1,000 m² gamified zone typically opens 14–18 weeks after deposit.",
    },
  ];

  const breadcrumbItems = [
    { name: "Home", url: "https://indoorplaygroundsolution.com" },
    { name: "Solutions", url: "https://indoorplaygroundsolution.com/products" },
    {
      name: "Gamified Attractions Manufacturer",
      url: "https://indoorplaygroundsolution.com/gamified-attractions-manufacturer",
    },
  ];

  const stats = [
    { icon: TrendingUp, value: "2.5×", label: "Per-cap revenue vs. static play" },
    { icon: Users, value: "58%", label: "90-day repeat-visit rate" },
    { icon: BarChart3, value: "18 mo", label: "Average payback period" },
    { icon: Trophy, value: "120+", label: "Gamified zones shipped" },
  ];

  const capabilities = [
    {
      icon: Cpu,
      title: "Sensor & Score Layer",
      desc: "Capacitive touch walls, IR break-beams, IMU vests, RFID wristbands and LED-matrix scoreboards integrated at the CAD stage — not bolted on after install.",
    },
    {
      icon: Wand2,
      title: "Projection & AR",
      desc: "Floor-mapped & wall-mapped games, AR slide racing, lumo climbing — calibrated by our software team for any throw distance and lux environment.",
    },
    {
      icon: Activity,
      title: "Active Play Mechanics",
      desc: "Timed ninja courses, parkour speed runs, trampoline dodgeball, basketball with shot-tracking — physics-tuned for ages 6–60.",
    },
    {
      icon: Layers,
      title: "Steel + Soft + Tech",
      desc: "We weld the frame, sew the foam padding and write the firmware in one ISO-9001 factory in Wenzhou — single point of accountability for the whole stack.",
    },
    {
      icon: Flame,
      title: "Themed IP & Scenography",
      desc: "Volcano, neon-cyber, jungle, deep-sea and custom IP themes. In-house CG, scenic painting and FRP sculpting team.",
    },
    {
      icon: ShieldCheck,
      title: "Operator Tooling",
      desc: "Cloud dashboard for live throughput, scoreboards, party-package upsells, predictive maintenance alerts and CMS-driven leaderboard reset cycles.",
    },
  ];

  const verticals = [
    {
      icon: Sparkles,
      title: "FEC & Trampoline Parks",
      desc: "Add a 200–600 m² gamified annex to an existing FEC and watch per-cap climb 35–55% inside one quarter.",
      to: "/trampoline-park-fec-solutions",
    },
    {
      icon: Target,
      title: "Shopping Mall Anchors",
      desc: "Replace declining anchor retail with a 1,000–3,000 m² interactive zone that drives 4× dwell time and feeds adjacent F&B.",
      to: "/soft-play-equipment-shopping-mall-solutions",
    },
    {
      icon: Activity,
      title: "Resorts, Cruises & Hotels",
      desc: "Compact 80–250 m² high-throughput attractions for kids-club and rainy-day programming. Marine-grade hardware optional.",
      to: "/products",
    },
  ];

  return (
    <div className="min-h-screen">
      <SEOHead
        pageKey="gamifiedAttractions"
        dynamicTitle="Gamified Attractions Manufacturer | Interactive FEC Equipment"
        dynamicDescription="B2B manufacturer of gamified attractions: interactive climbing, projection-mapped trampolines, sensor ninja courses & AR play. ASTM, EN1176, CE certified. 120+ FEC zones shipped."
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
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <Badge className="mb-4 bg-accent/20 text-accent border-accent/30">
                <Gamepad2 className="w-3 h-3 mr-1" />
                B2B · Interactive Entertainment Equipment
              </Badge>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight text-primary-foreground">
                Gamified Attractions{" "}
                <span className="block text-accent mt-2">
                  Manufacturer for FECs, Malls & Resorts
                </span>
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/85 mb-8 max-w-3xl mx-auto">
                Steel, soft-play and sensor logic engineered in one factory.
                We design interactive climbing walls, projection-mapped
                trampolines, AR slide races and timed ninja courses that turn
                a single visit into a leaderboard habit — backed by ASTM,
                EN&nbsp;1176, TUV and CE documentation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="hero" asChild>
                  <a href="#contact">
                    Get a Free 3D Concept <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                  asChild
                >
                  <Link to={localizedPath("/case-studies")}>
                    See 120+ Installs
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center p-6 bg-background rounded-xl shadow-sm"
                >
                  <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                    <s.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                    {s.value}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why gamify - narrative */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <Badge variant="secondary" className="mb-4">
                <Zap className="w-3 h-3 mr-1" />
                Why Gamify
              </Badge>
              <h2 className="text-2xl md:text-4xl font-heading font-bold mb-6">
                Static play hits a wall.{" "}
                <span className="text-primary">
                  Scoreboards reset the visit clock.
                </span>
              </h2>
              <p className="text-muted-foreground text-lg mb-4 leading-relaxed">
                After 18–24 months a traditional soft-play or trampoline park
                sees per-cap spend stall and repeat-visit rate slip below 30%.
                The kids have mastered every obstacle. The parents stop
                buying the upgrade pass. Operators we audit consistently
                identify the same root cause: <strong>no progression
                loop</strong>.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Layering scoring, timers, leaderboards and seasonal missions
                onto the same steel frame creates a reason to return next
                Saturday — and the Saturday after. It also unlocks digital
                upsells (party-package leaderboards, branded tournaments,
                creator-led challenges) that pure physical play cannot.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Capabilities grid */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge variant="secondary" className="mb-4">
                <Cpu className="w-3 h-3 mr-1" />
                Full-Stack Capabilities
              </Badge>
              <h2 className="text-2xl md:text-4xl font-heading font-bold mb-4">
                One factory. Steel, foam,{" "}
                <span className="text-primary">firmware.</span>
              </h2>
              <p className="text-muted-foreground">
                Most operators stitch together a structure vendor, a sensor
                integrator and a software house — then own every blame
                conversation when something fails. We collapse the stack into
                a single accountable manufacturer.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
              {capabilities.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="border-0 shadow-md h-full">
                    <CardContent className="p-6">
                      <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <c.icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-heading font-bold text-lg mb-2">
                        {c.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {c.desc}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Verticals */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge variant="secondary" className="mb-4">
                <Target className="w-3 h-3 mr-1" />
                Where It Lands
              </Badge>
              <h2 className="text-2xl md:text-4xl font-heading font-bold">
                Three operator profiles{" "}
                <span className="text-primary">we ship to weekly</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto">
              {verticals.map((v, i) => (
                <Card key={i} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                      <v.icon className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="font-heading font-bold text-lg mb-2">
                      {v.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                      {v.desc}
                    </p>
                    <Button variant="link" className="px-0 justify-start" asChild>
                      <Link to={localizedPath(v.to)}>
                        Explore <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process strip */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <Badge variant="secondary" className="mb-4">
                  <Layers className="w-3 h-3 mr-1" />
                  14–18 Week Turnkey
                </Badge>
                <h2 className="text-2xl md:text-4xl font-heading font-bold">
                  Concept to{" "}
                  <span className="text-primary">grand-opening</span>
                </h2>
              </div>
              <ol className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {[
                  { step: "01", title: "Brief & Site Scan", days: "Day 1–3" },
                  { step: "02", title: "3D Concept & Game Spec", days: "Day 4–10" },
                  { step: "03", title: "Factory Production", days: "Week 2–7" },
                  { step: "04", title: "Sea / Air Freight", days: "Week 7–12" },
                  { step: "05", title: "Install & Commission", days: "Week 13–18" },
                ].map((p) => (
                  <li
                    key={p.step}
                    className="bg-background rounded-xl p-5 shadow-sm border border-border"
                  >
                    <div className="text-xs font-mono text-primary mb-1">
                      {p.step}
                    </div>
                    <div className="font-heading font-semibold text-sm mb-1">
                      {p.title}
                    </div>
                    <div className="text-xs text-muted-foreground">{p.days}</div>
                  </li>
                ))}
              </ol>
              <div className="mt-8 text-center">
                <Button variant="hero" asChild>
                  <a href="#contact">
                    Start My Project <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-lg font-heading font-semibold mb-4 text-center">
                Related Solutions
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                <Button variant="outline" size="sm" asChild>
                  <Link to={localizedPath("/trampoline-park-fec-solutions")}>
                    Trampoline Park & FEC
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to={localizedPath("/soft-play-equipment-shopping-mall-solutions")}>
                    Mall Soft Play
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to={localizedPath("/best-indoorplaygroundsolution-active-play-for-running-facilities")}>
                    Active Play Facilities
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to={localizedPath("/indoor-playground-investment-opportunity")}>
                    Investment & ROI
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to={localizedPath("/products")}>All Products</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to={localizedPath("/process")}>Our Process</Link>
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
                Buyer FAQ
              </Badge>
              <h2 className="text-2xl md:text-4xl font-heading font-bold mb-4">
                Procurement questions, <span className="text-primary">answered</span>
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

        <ContactSection />
        <EEATSignature context="gamified attractions" />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default GamifiedAttractionsManufacturer;
