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
  Flower2, ArrowRight, HelpCircle, Shield, Users, Sparkles, Leaf,
  Hand, BookOpen, Mountain, Compass, Wrench, Eye, Heart, BarChart3,
} from "lucide-react";

/**
 * SEO landing page: Montessori-aligned indoor playground design.
 * Targets Montessori schools, alternative-pedagogy parents, prepared environment buyers.
 */
const MontessoriIndoorPlaygroundDesign = () => {
  const { localizedPath } = useLocalizedPath();

  const faqItems = [
    {
      question: "What makes a playground 'Montessori-aligned'?",
      answer:
        "Three things: (1) natural materials — wood, cotton, wool, jute over plastic; (2) child-led, open-ended elements — loose parts, climbing rocks, ramps the child decides how to use; (3) practical-life integration — child-height tools, real (safe) garden beds, water play. The Montessori principle is freedom within a prepared environment, not adult-curated 'fun'.",
    },
    {
      question: "Doesn't Montessori frown on bright plastic playgrounds?",
      answer:
        "Yes — Maria Montessori's writing emphasises ordered, natural environments where the child's work is visible. Standard FEC equipment with primary-colour plastic and pre-defined play scripts contradicts that. Our Montessori line uses Baltic birch ply, natural-finish wool felts, and earth-tone palettes (sage, oat, terracotta).",
    },
    {
      question: "How does climbing fit Montessori's holistic development model?",
      answer:
        "Montessori sees physical movement as foundational to cognition — the 'absorbent mind' learns through whole-body experience. We design Pikler-inspired triangles, low-rise climbing rocks and movable ramps that let children self-assess risk, build proprioception, and develop the concentration loop Montessori called 'normalization'.",
    },
    {
      question: "What age ranges does the Montessori line serve?",
      answer:
        "Three planes of development: Infant/Toddler (0–3) — Pikler triangles, soft balance pods, treasure baskets; Children's House (3–6) — climbing rocks, loose parts, practical-life stations; Lower Elementary (6–9) — outdoor-grade rope rigs, build-your-own forts, real garden infrastructure.",
    },
    {
      question: "Are your natural materials safe and durable for school use?",
      answer:
        "All wood is FSC-certified Baltic birch finished with EN 71-3 (toy safety) compliant natural oils — no formaldehyde, no off-gassing. Tested for 7+ years of school traffic. Rope is hand-spliced jute over a synthetic core for grip + longevity. Felts are wool, dust-mite resistant and machine-washable.",
    },
    {
      question: "Do you provide curriculum-aligned setup guidance?",
      answer:
        "Yes. Every Montessori build ships with an AMI/AMS-reviewed environment guide: zoning recommendations (gross-motor, practical-life, quiet observation), suggested loose-parts inventories per age plane, and rotation schedules. We work with two consulting Montessori guides on layout sign-off.",
    },
  ];

  const breadcrumbItems = [
    { name: "Home", url: "https://indoorplaygroundsolution.com" },
    { name: "Solutions", url: "https://indoorplaygroundsolution.com/products" },
    { name: "Montessori Indoor Playground Design", url: "https://indoorplaygroundsolution.com/montessori-indoor-playground-design" },
  ];

  const principles = [
    { icon: Leaf, title: "Natural Materials Only", desc: "FSC Baltic birch, wool felt, cotton canvas, jute rope, cork — no primary-colour plastic. Tactile, warm, age beautifully." },
    { icon: Hand, title: "Child-Sized Everything", desc: "Steps, handles, climbing holds and tool stations sized for the child — not adult-scaled and shrunk. Builds independence and competence." },
    { icon: Compass, title: "Open-Ended, Not Prescriptive", desc: "Loose parts, ramps, blocks, planks — no 'one right way to play'. Child decides; equipment adapts." },
    { icon: Mountain, title: "Self-Assessed Risk", desc: "Pikler-style climbing triangles and low-rise rocks let children calibrate their own challenge — proven to build proprioception and confidence." },
    { icon: BookOpen, title: "Three Planes of Development", desc: "Distinct zones for 0–3, 3–6, 6–9 — each scaled, themed and equipped for that developmental window, per Maria Montessori." },
    { icon: Eye, title: "Calm, Ordered Visual Field", desc: "Earth-tone palette (sage, oat, terracotta), low ambient noise, defined material storage — the 'prepared environment' Montessori specifies." },
    { icon: Heart, title: "Practical-Life Integration", desc: "Real (safe) tools — wooden brooms, watering cans, child-height sinks — embedded in the play zone. Care of self and environment." },
    { icon: Sparkles, title: "Movable, Reconfigurable", desc: "Every element on castors or lightweight enough for a 5-year-old to rearrange. The environment evolves with the child's interest." },
  ];

  const productLines = [
    { title: "Pikler Triangle System", desc: "Baltic birch climbing triangle with detachable arch, ramp and slide. Three height options (toddler / preschool / lower-el)." },
    { title: "Indoor Climbing Rocks", desc: "Low-rise (max 1.4m) climbing wall with natural-tone resin holds on birch ply. EN 1176 certified, soft cork landing zone included." },
    { title: "Loose-Parts Library", desc: "Curated 150-piece set: wooden planks, tree cookies, river stones, fabric scraps, ropes, baskets — the heart of open-ended Montessori play." },
    { title: "Practical-Life Station", desc: "Child-height sink, real tool rack, dressing frames, plant-care corner — turns 4 m² of the playground into a daily skills lab." },
    { title: "Quiet Observation Nook", desc: "Wool-felt enclosed reading pod with low shelf for books and natural-material 'treasures'. The withdraw-and-observe space Montessori environments need." },
    { title: "Movable Mini-Atelier", desc: "Wheeled wooden art station with paint pots, easel, clay-work surface — open access during free-flow play, per Reggio-Montessori hybrid model." },
  ];

  const useCases = [
    { icon: Flower2, title: "Montessori Schools (AMI/AMS)", desc: "Full prepared-environment fit-outs for accredited Montessori schools. AMI/AMS-reviewed zoning and material specs." },
    { icon: Heart, title: "Reggio-Emilia & Forest Kindergartens", desc: "Natural-material indoor compliments to outdoor-led pedagogies. Loose parts, ateliers, observation nooks." },
    { icon: Users, title: "Progressive Pre-Schools & Daycare", desc: "Non-Montessori daycares wanting to differentiate from plastic-toy competitors — natural aesthetic, premium parent demographic." },
    { icon: Sparkles, title: "Homeschool Co-Ops & Microschools", desc: "Pop-up Montessori environments for homeschool collectives and 5–25 family microschools. Reconfigurable, portable." },
  ];

  return (
    <div className="min-h-screen">
      <SEOHead pageKey="montessoriPlaygroundDesign" ogType="website" />
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
                <Flower2 className="w-3 h-3 mr-1" />Natural Materials · Prepared Environment
              </Badge>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight text-primary-foreground">
                Montessori Indoor Playground Design
                <span className="block text-accent mt-2">The Prepared Environment, Built for Play</span>
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/85 mb-8 max-w-3xl mx-auto">
                Baltic birch Pikler triangles, natural-rope climbing rigs, loose-parts libraries and child-sized practical-life stations — designed with AMI/AMS consultants for accredited Montessori schools and progressive pre-schools.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="hero" asChild>
                  <a href="#contact">Brief My Montessori Environment <ArrowRight className="ml-2 h-4 w-4" /></a>
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
                { v: "100%", l: "FSC-certified natural materials", icon: Leaf },
                { v: "3", l: "Developmental planes (0–3 / 3–6 / 6–9)", icon: BookOpen },
                { v: "EN 71-3", l: "Toy-safety certified finishes", icon: Shield },
                { v: "AMI/AMS", l: "Consultant-reviewed layouts", icon: Sparkles },
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
            <Badge variant="secondary" className="mb-4"><Leaf className="w-3 h-3 mr-1" />Why It Matters</Badge>
            <h2 className="text-2xl md:text-4xl font-heading font-bold mb-6">
              Plastic FEC equipment contradicts{" "}
              <span className="text-primary">everything Montessori teaches.</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-4 leading-relaxed">
              Primary-colour plastic, pre-scripted play paths, adult-scaled steps — every detail of standard playground gear runs against the prepared environment Maria Montessori described. The child can't self-assess risk on a fully-enclosed slide. They can't develop care of environment when nothing breaks if mishandled. They can't reach the highest hold because it was designed for a 25-kg average, not their 16-kg body.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Our Montessori line solves that. Baltic birch over plastic. Pikler-style self-paced climbing over scripted slides. Child-height tool stations. Loose parts the child decides how to use. Three distinct zones for the three planes of development — exactly as Maria Montessori specified.
            </p>
          </div>
        </section>

        <section id="principles" className="py-16 md:py-20 bg-muted/30 scroll-mt-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge variant="secondary" className="mb-4"><Shield className="w-3 h-3 mr-1" />8 Design Principles</Badge>
              <h2 className="text-2xl md:text-4xl font-heading font-bold mb-4">
                How We Design <span className="text-primary">Montessori Environments</span>
              </h2>
              <p className="text-muted-foreground">Eight rules refined with AMI/AMS Montessori guides on our consulting panel.</p>
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
                A Complete <span className="text-primary">Montessori Catalogue</span>
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
                Four Settings <span className="text-primary">Already Specifying</span>
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
              <Button variant="outline" size="sm" asChild><Link to={localizedPath("/market/educational-indoor-playground-solution-for-schools")}>School Solutions</Link></Button>
              <Button variant="outline" size="sm" asChild><Link to={localizedPath("/sensory-inclusive-play-equipment")}>Sensory-Inclusive Play</Link></Button>
              <Button variant="outline" size="sm" asChild><Link to={localizedPath("/homeschool-coop-indoor-play-solutions")}>Homeschool Co-Op Solutions</Link></Button>
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
                Montessori Playground <span className="text-primary">Questions, Answered</span>
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

export default MontessoriIndoorPlaygroundDesign;
