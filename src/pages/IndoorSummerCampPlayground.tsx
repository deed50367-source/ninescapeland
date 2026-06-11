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
  Sun, ArrowRight, HelpCircle, Shield, Users, Sparkles, Calendar,
  Wrench, Droplet, Activity, Palette, CloudRain, Zap, BarChart3,
} from "lucide-react";

/**
 * SEO landing page: Indoor summer-camp playground ideas (rain-day & all-season).
 * Targets summer-camp operators, YMCA, parks-dept rec centres, day-camp founders.
 */
const IndoorSummerCampPlayground = () => {
  const { localizedPath } = useLocalizedPath();

  const faqItems = [
    {
      question: "Why an indoor summer-camp setup if camp is meant to be outdoors?",
      answer:
        "Rain days, heatwaves and air-quality alerts now cancel 8–14 outdoor camp days per US/UK summer (NOAA & UK Met Office, 2024). Camps that can pivot indoors keep retention, avoid refunds, and grow word-of-mouth. The indoor zone isn't a replacement for outdoor camp — it's a 200–400 m² insurance policy that runs the full 9-week season.",
    },
    {
      question: "What activities work in 200–400 m² for 40–80 campers?",
      answer:
        "Rotation model: ninja course (12 campers), climbing wall (8 campers), inflatable foam pit (10 campers), STEM/build station (15 campers), sensory + quiet zone (10 campers), team-game floor (20 campers). 8-minute rotations keep 75 campers engaged for a 90-minute indoor block.",
    },
    {
      question: "Can the same setup work for theme weeks (space, jungle, sport)?",
      answer:
        "Yes — that's our weekly-theme model. Core equipment is neutral; theme overlays are wall decals, themed loose-parts kits, costume bins, and decorated obstacle elements that swap in 45 minutes. We ship 12 prebuilt theme packs (space, jungle, ocean, ninja, superhero, pirate, dinosaur, science lab, art studio, sport, time-travel, mystery).",
    },
    {
      question: "How does it serve mixed ages (6–14) typical at summer camp?",
      answer:
        "Camp groups are usually banded (Juniors 6–8, Middlers 9–11, Seniors 12–14). Equipment has three difficulty tiers. Junior climbing wall holds vs Senior; Junior ninja element heights vs Senior. Same hall, separate rotation schedules. Counsellor-supervised difficulty selection at each station.",
    },
    {
      question: "What's the safety + liability story for camp insurance?",
      answer:
        "All equipment ships with ASTM F1487, EN 1176, CPSIA certificates plus age-appropriate fall-zone diagrams. We provide an ACA (American Camp Association) compliance brief and a counsellor-supervisor training PDF. Floor mats and impact-attenuating tile included; max fall height 1.8m on Senior elements.",
    },
    {
      question: "Can we install before June and remove for the school year?",
      answer:
        "Yes — that's the seasonal-camp model. Modular ceiling-track climbing rigs retract flush; ninja elements unbolt from a single steel base; inflatables deflate to two crates. May install / Sept removal handled by two staff in a half-day. Off-season, the hall reverts to gym, hall, or rentable event space.",
    },
  ];

  const breadcrumbItems = [
    { name: "Home", url: "https://indoorplaygroundsolution.com" },
    { name: "Solutions", url: "https://indoorplaygroundsolution.com/products" },
    { name: "Indoor Summer Camp Playground Ideas", url: "https://indoorplaygroundsolution.com/indoor-summer-camp-playground-ideas" },
  ];

  const principles = [
    { icon: CloudRain, title: "Rain-Day Pivot Capacity", desc: "Designed to absorb the full outdoor camp roster on a wet day — no campers idle, no parents demanding refunds." },
    { icon: Calendar, title: "9-Week Season Rotation", desc: "Activity-pack rotation maps to weekly themes (space, jungle, sport) so returning campers see fresh content every week." },
    { icon: Activity, title: "8-Minute Station Rotations", desc: "6 stations rotating every 8 minutes keep 75 campers actively engaged for a 90-minute indoor block. No queues, no boredom." },
    { icon: Users, title: "Junior / Middler / Senior Tiers", desc: "Every climbing hold, ninja element and game station has 3 difficulty tiers — same hall serves ages 6–14 in banded rotations." },
    { icon: Palette, title: "12 Pre-Built Theme Overlays", desc: "Space, jungle, ocean, ninja, superhero, science, art, sport… each theme swaps in 45 minutes (wall decals + loose-parts kits)." },
    { icon: Shield, title: "ACA-Compliance Documentation", desc: "ASTM/EN/CPSIA certs, ACA compliance brief, counsellor training PDF — drop-in for your camp insurance binder." },
    { icon: Wrench, title: "Seasonal Install / Removal", desc: "May install, September removal. Half-day teardown returns the hall to gym, event space or off-season use." },
    { icon: Zap, title: "Counsellor-Supervisor Friendly", desc: "No element requires a specialised cert. 19-year-old counsellors can run every station with the included briefing card." },
  ];

  const productLines = [
    { title: "Modular Ninja Loop (Camp Edition)", desc: "8-element ninja course on a wheeled steel frame, Junior/Senior height switching. The headline activity for ages 8+." },
    { title: "Retractable Climbing Wall", desc: "Ceiling-track climbing wall, max 4m, swappable Junior/Middler/Senior hold sets. Auto-belay options for unsupervised mid-difficulty." },
    { title: "Inflatable Foam Pit + Trampoline", desc: "Combo unit: small in-ground trampoline launching into a foam-cube pit. The single most-photographed camp activity, hands-down." },
    { title: "STEM Build & Science Station", desc: "Tables, build kits, basic robotics, water-flow demos — the rainy-day cognitive activity ACA camps need for accreditation balance." },
    { title: "Sensory + Quiet Retreat Zone", desc: "Soft-fabric pods, fibre-optic wall, weighted blankets — the regulation space neurodivergent campers (and overtired counsellors) need." },
    { title: "Team-Game Floor Kit", desc: "Foam dodgeballs, parachute, cone sets, rebound target wall — supports 15+ classic camp games on a single rebound-safe surface." },
  ];

  const useCases = [
    { icon: Sun, title: "Day Camps (40–120 Campers)", desc: "Private day camps, YMCA, JCC summer programs. The classic 9-week season needing rain-day pivot capacity." },
    { icon: Users, title: "Parks Dept & Rec Centres", desc: "Municipal summer programs that need year-round equipment doubling as off-season community-rec asset." },
    { icon: Calendar, title: "Themed Specialty Camps", desc: "Sport camps, STEM camps, art camps wanting indoor adjuncts for their specialty programming." },
    { icon: Sparkles, title: "Church + Faith-Based Camps", desc: "Church youth-summer programs sharing the hall with school-year youth groups — seasonal install model fits perfectly." },
  ];

  return (
    <div className="min-h-screen">
      <SEOHead pageKey="indoorSummerCampPlayground" ogType="website" />
      <BreadcrumbSchema items={breadcrumbItems} />
      <FAQSchema items={faqItems} />
      <OrganizationSchema />
      <Header />

      <main>
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/85" />
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-accent/15 rounded-full blur-3xl" />
            <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-accent/10 rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-accent/20 text-accent border-accent/30">
                <Sun className="w-3 h-3 mr-1" />Summer 2027 · Day Camps · YMCA · Rec Centres
              </Badge>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight text-primary-foreground">
                Indoor Summer Camp Playground Ideas
                <span className="block text-accent mt-2">Rain-Day Insurance for a 9-Week Season</span>
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/85 mb-8 max-w-3xl mx-auto">
                Modular ninja loops, retractable climbing walls, foam pits and 12 swappable theme overlays — engineered to absorb your full camp roster on rain days and run weekly themes that keep returning campers excited.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="hero" asChild>
                  <a href="#contact">Plan My Summer 2027 Setup <ArrowRight className="ml-2 h-4 w-4" /></a>
                </Button>
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                  <a href="#principles">8 Design Principles</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-12 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { v: "8–14", l: "Rain/heat days lost per US summer (NOAA)", icon: CloudRain },
                { v: "12", l: "Pre-built weekly theme overlays", icon: Palette },
                { v: "200–400 m²", l: "Footprint range for 40–80 campers", icon: BarChart3 },
                { v: "½ day", l: "Seasonal install / removal time", icon: Wrench },
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

        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <Badge variant="secondary" className="mb-4"><Droplet className="w-3 h-3 mr-1" />Why It Matters</Badge>
            <h2 className="text-2xl md:text-4xl font-heading font-bold mb-6">
              One rainy week can{" "}
              <span className="text-primary">tank your camp's word-of-mouth.</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-4 leading-relaxed">
              Eighty kids stuck in a multipurpose room watching cartoons because the field is a swamp — every camp director's nightmare. Parents notice. Reviews mention it. Returning-camper rate drops 12% the following year (ACA 2023 retention survey). The traditional answer — a stack of board games and craft supplies — doesn't move enough bodies to burn the energy of 80 campers.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              A purpose-built 200–400 m² indoor zone — ninja loop, climbing wall, foam pit, STEM station, sensory pod, team-game floor — absorbs the full roster, runs 8-minute rotations, and lets your weekly theme flow indoors without skipping a beat. Seasonal install in May, removal in September; the hall reverts to off-season use the rest of the year.
            </p>
          </div>
        </section>

        <section id="principles" className="py-16 md:py-20 bg-muted/30 scroll-mt-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge variant="secondary" className="mb-4"><Shield className="w-3 h-3 mr-1" />8 Design Principles</Badge>
              <h2 className="text-2xl md:text-4xl font-heading font-bold mb-4">
                How We Design <span className="text-primary">Summer Camp Indoor Zones</span>
              </h2>
              <p className="text-muted-foreground">Eight rules refined across 25+ camp installs in the US, UK and Australia.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
              {principles.map((p, i) => (
                <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
                  <Card className="border-0 shadow-md h-full">
                    <CardContent className="p-5">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3"><p.icon className="w-5 h-5 text-primary" /></div>
                      <h3 className="font-heading font-bold mb-2">{p.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge variant="secondary" className="mb-4"><Sparkles className="w-3 h-3 mr-1" />6-Station Camp Setup</Badge>
              <h2 className="text-2xl md:text-4xl font-heading font-bold mb-4">
                Six Stations + <span className="text-primary">12 Theme Overlays</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
              {productLines.map((p, i) => (
                <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <Card className="border-0 shadow-md h-full">
                    <CardContent className="p-6">
                      <h3 className="font-heading font-bold text-lg mb-2">{p.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge variant="secondary" className="mb-4"><Users className="w-3 h-3 mr-1" />Where It Lands</Badge>
              <h2 className="text-2xl md:text-4xl font-heading font-bold">
                Four Camp Operators <span className="text-primary">Already Specifying</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
              {useCases.map((u) => (
                <Card key={u.title} className="border-0 shadow-md">
                  <CardContent className="p-6 flex gap-4">
                    <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center shrink-0"><u.icon className="w-5 h-5 text-accent" /></div>
                    <div>
                      <h3 className="font-heading font-bold text-lg mb-1">{u.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{u.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <h3 className="text-lg font-heading font-semibold mb-4 text-center">Related Solutions</h3>
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="outline" size="sm" asChild><Link to={localizedPath("/indoor-pe-equipment-for-schools")}>School PE Equipment</Link></Button>
              <Button variant="outline" size="sm" asChild><Link to={localizedPath("/homeschool-coop-indoor-play-solutions")}>Homeschool Co-Op Packs</Link></Button>
              <Button variant="outline" size="sm" asChild><Link to={localizedPath("/products/ninja-course")}>Ninja Course Equipment</Link></Button>
              <Button variant="outline" size="sm" asChild><Link to={localizedPath("/themed-indoor-playground-design")}>Themed Playground Design</Link></Button>
              <Button variant="outline" size="sm" asChild><Link to={localizedPath("/custom-indoor-playground-cost-free-3d-design")}>Cost & Free 3D Design</Link></Button>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4"><HelpCircle className="w-3 h-3 mr-1" />FAQ</Badge>
              <h2 className="text-2xl md:text-4xl font-heading font-bold">
                Summer Camp <span className="text-primary">Questions, Answered</span>
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

export default IndoorSummerCampPlayground;
