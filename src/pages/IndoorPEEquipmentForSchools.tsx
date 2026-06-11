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
  Dumbbell, ArrowRight, HelpCircle, Shield, Users, Target, Activity,
  Timer, Trophy, Zap, GraduationCap, Wrench, Sparkles, BarChart3,
} from "lucide-react";

/**
 * SEO landing page: indoor PE equipment for K-12 schools & university gyms.
 * Targets gym-class procurement, school sport-hall fit-out, district RFPs.
 */
const IndoorPEEquipmentForSchools = () => {
  const { localizedPath } = useLocalizedPath();

  const faqItems = [
    {
      question: "What's the difference between PE equipment and a school playground?",
      answer:
        "A school playground is unstructured free-play during recess. Indoor PE equipment supports a structured curriculum: warm-ups, conditioning circuits, agility drills, climbing units and team-game stations rotated by the PE teacher. Our PE fit-outs are designed around 30-minute class periods with 25–35 students at a time.",
    },
    {
      question: "Which age groups can run a single shared gym setup?",
      answer:
        "We design modular systems with quick-swap height and resistance settings so the same hall serves K-5 (low climbing nets, soft obstacles), 6-8 (ninja rigs, agility ladders) and high-school (functional rigs, plyometric boxes). One-teacher reconfiguration takes under 4 minutes.",
    },
    {
      question: "How much floor space do I need for a full PE circuit?",
      answer:
        "A workable circuit fits in 180–250 m² (1,900–2,700 ft²). At 250 m² you can run 6 stations simultaneously — climbing rig, agility, plyo, balance, throwing target, mat zone — keeping every student in continuous movement.",
    },
    {
      question: "What safety certifications do you provide for schools?",
      answer:
        "Every PE module ships with ASTM F1487, EN 1176, AS/NZS 4685 and EN 913 (where applicable) certificates. We provide TÜV test reports, an annual inspection checklist and impact-attenuating floor specs for district safety officers.",
    },
    {
      question: "Can the equipment be folded or stored to free the gym for assemblies?",
      answer:
        "Yes. Climbing rigs are ceiling-track mounted and retract flush; agility kits, plyo boxes and mats nest into wheeled storage carts (included). A 250 m² circuit packs down in under 12 minutes by two staff.",
    },
    {
      question: "Do you support district-wide RFPs and bulk orders?",
      answer:
        "We routinely supply district contracts of 5–40 schools. Pricing scales per unit; documentation includes a Master Spec Sheet, DOE-compatible invoicing, US/EU warehouse staging and per-school installer scheduling.",
    },
  ];

  const breadcrumbItems = [
    { name: "Home", url: "https://indoorplaygroundsolution.com" },
    { name: "Solutions", url: "https://indoorplaygroundsolution.com/products" },
    { name: "Indoor PE Equipment for Schools", url: "https://indoorplaygroundsolution.com/indoor-pe-equipment-for-schools" },
  ];

  const principles = [
    { icon: Activity, title: "Continuous-Movement Layout", desc: "6–8 stations arranged so a 30-student class rotates every 3 minutes — no queues, no idle time, peak heart-rate maintained." },
    { icon: Timer, title: "30-Minute Class Fit", desc: "Warm-up, 4 station rotations, cool-down — every element timed to fit a US/UK 30-minute PE period with 4 minutes of equipment setup." },
    { icon: Target, title: "Skill-Progression Modules", desc: "Climb, swing, jump, balance, throw, dodge — covers all 12 fundamental movement skills mandated by SHAPE America & UK NC PE." },
    { icon: Shield, title: "Impact-Attenuating Floor", desc: "EN 1177 / ASTM F1292 compliant rubber tile or sport-grade EPDM under all elevated elements — critical fall heights tested to 2.5m." },
    { icon: Wrench, title: "Ceiling-Track Storage", desc: "Climbing rigs retract flush to the ceiling, agility kits nest into wheeled carts — gym reconfigures to assembly hall in 12 minutes." },
    { icon: Users, title: "Mixed-Ability Stations", desc: "Each station has 3 difficulty tiers — same circuit serves SEN students, average athletes and varsity-level teens simultaneously." },
    { icon: Trophy, title: "Curriculum-Linked Drills", desc: "Free printable drill cards mapped to SHAPE America, UK PE NC and IB MYP PHE outcomes — drop-in for substitute teachers." },
    { icon: Zap, title: "Low-Noise Engineering", desc: "Padded contact surfaces, rubberised hardware, dampened landing zones keep the gym under 75 dB even at full circuit intensity." },
  ];

  const productLines = [
    { title: "Modular Ceiling-Track Climbing Rig", desc: "Retractable climbing wall, cargo nets, ropes and rings on a single ceiling-mounted gantry. Folds flush when not in PE class." },
    { title: "Ninja Warrior School Edition", desc: "Lower-height ninja course (max 1.8m) with foam landing zones — 8-element loop sized for a school gym, EN 1176 certified." },
    { title: "Agility & Plyo Station Pack", desc: "Plyo boxes (3 heights), agility ladders, hurdles, reaction lights and cone sets — everything to run a 25-student conditioning class." },
    { title: "Soft Obstacle Course (K-5)", desc: "Foam tunnels, balance beams, stepping stones and tumbling mats for elementary PE — washable, antibacterial vinyl covers." },
    { title: "Throwing & Target Wall", desc: "Modular target wall with rebound zones for dodgeball, foam-ball throwing, soft-tip archery — quiet, indoor-safe, scoreable." },
    { title: "Functional Fitness Rig (HS)", desc: "Multi-station rig for pull-ups, dips, battle ropes and resistance bands — high-school strength conditioning + varsity warm-ups." },
  ];

  const useCases = [
    { icon: GraduationCap, title: "K-5 Elementary Gyms", desc: "Soft climbing, balance and obstacle stations sized for ages 5–11. Bright graphics, low fall heights, washable surfaces." },
    { icon: Activity, title: "Middle School Sport Halls", desc: "Ninja rigs, agility kits and plyo stations — engaging enough to compete with screen time for tweens." },
    { icon: Trophy, title: "High School & Athletics", desc: "Functional fitness rigs, varsity warm-up zones, conditioning circuits for football, basketball and track teams." },
    { icon: Sparkles, title: "Universities & Rec Centres", desc: "Adult-sized ninja and functional fitness rigs for intramural sports, faculty wellness, freshman conditioning programs." },
  ];

  return (
    <div className="min-h-screen">
      <SEOHead pageKey="indoorPEForSchools" ogType="website" />
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
                <Dumbbell className="w-3 h-3 mr-1" />K-12 · University · District RFP
              </Badge>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight text-primary-foreground">
                Indoor PE Equipment for Schools
                <span className="block text-accent mt-2">Built for Gym-Class Reality</span>
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/85 mb-8 max-w-3xl mx-auto">
                Ceiling-track climbing rigs, ninja loops, agility circuits and functional fitness — engineered for 30-minute periods, 30-student classes and 12-minute reset to assembly hall. ASTM, EN 1176 & EN 913 certified.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="hero" asChild>
                  <a href="#contact">Get a School Gym Quote <ArrowRight className="ml-2 h-4 w-4" /></a>
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
                { v: "180–250 m²", l: "Typical PE circuit footprint", icon: BarChart3 },
                { v: "30 min", l: "Full class fit (warm-up→cool-down)", icon: Timer },
                { v: "12 min", l: "Reset to clear assembly hall", icon: Wrench },
                { v: "40+", l: "Districts shipped (US/UK/AU)", icon: Trophy },
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
            <Badge variant="secondary" className="mb-4"><Activity className="w-3 h-3 mr-1" />Why PE Equipment, Not a Playground</Badge>
            <h2 className="text-2xl md:text-4xl font-heading font-bold mb-6">
              PE teachers don't need a play area —{" "}
              <span className="text-primary">they need a structured circuit.</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-4 leading-relaxed">
              Recess equipment encourages free play. A 30-minute PE class is the opposite: warm-up, four station rotations, cool-down, hit every fundamental movement skill, get 30 students sweating without anyone idle in a queue. Standard playground gear can't deliver that — the layout, the timing, the difficulty progression are all wrong.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We design school PE fit-outs around the class period: continuous-movement circuits, mixed-ability stations, ceiling-track storage so the gym becomes an assembly hall in 12 minutes. The drill cards we ship map directly to SHAPE America, UK PE NC and IB MYP outcomes — drop-in usable by a substitute teacher.
            </p>
          </div>
        </section>

        <section id="principles" className="py-16 md:py-20 bg-muted/30 scroll-mt-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge variant="secondary" className="mb-4"><Shield className="w-3 h-3 mr-1" />8 Design Principles</Badge>
              <h2 className="text-2xl md:text-4xl font-heading font-bold mb-4">
                How We Design <span className="text-primary">School PE Spaces</span>
              </h2>
              <p className="text-muted-foreground">Eight rules refined across 40+ district installs in the US, UK and Australia.</p>
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
              <Badge variant="secondary" className="mb-4"><Sparkles className="w-3 h-3 mr-1" />Equipment Range</Badge>
              <h2 className="text-2xl md:text-4xl font-heading font-bold mb-4">
                A Complete <span className="text-primary">School PE Catalogue</span>
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
                Four School Segments <span className="text-primary">We Equip</span>
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
              <Button variant="outline" size="sm" asChild><Link to={localizedPath("/market/educational-indoor-playground-solution-for-schools")}>School Playground Solutions</Link></Button>
              <Button variant="outline" size="sm" asChild><Link to={localizedPath("/montessori-indoor-playground-design")}>Montessori Playground Design</Link></Button>
              <Button variant="outline" size="sm" asChild><Link to={localizedPath("/products/ninja-course")}>Ninja Course Equipment</Link></Button>
              <Button variant="outline" size="sm" asChild><Link to={localizedPath("/safety-certifications")}>Safety & Certifications</Link></Button>
              <Button variant="outline" size="sm" asChild><Link to={localizedPath("/custom-indoor-playground-cost-free-3d-design")}>Cost & Free 3D Design</Link></Button>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4"><HelpCircle className="w-3 h-3 mr-1" />FAQ</Badge>
              <h2 className="text-2xl md:text-4xl font-heading font-bold">
                School PE <span className="text-primary">Questions, Answered</span>
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

export default IndoorPEEquipmentForSchools;
