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
  Heart, ArrowRight, HelpCircle, Volume2, EyeOff, Hand, Wind, Accessibility,
  Sparkles, Shield, Users, Lightbulb, Waves, Moon,
} from "lucide-react";

/**
 * SEO landing page for the differentiated, low-competition keyword cluster:
 *  - "sensory play equipment for special needs"
 *  - "sensory-inclusive play environments" (trend signal)
 *  - autism-friendly play, SEN-friendly playground
 */
const SensoryInclusivePlay = () => {
  const { localizedPath } = useLocalizedPath();

  const faqItems = [
    {
      question: "What makes a playground 'sensory-inclusive'?",
      answer:
        "A sensory-inclusive playground supports children across the full sensory profile — from sensory-seekers who need vestibular and proprioceptive input, to sensory-avoiders who are overwhelmed by noise, light and crowds. The build accommodates both: high-stimulation zones for seekers, quiet retreat spaces for avoiders, and a clear visual flow between them.",
    },
    {
      question: "Which children benefit from sensory-inclusive design?",
      answer:
        "Children with autism spectrum disorder (ASD), ADHD, sensory processing disorder (SPD), Down syndrome, anxiety conditions, and physical disabilities. The CDC estimates ~1 in 36 US children are on the autism spectrum — a sensory-inclusive zone is no longer a niche feature, it's expected by an increasingly large parent demographic.",
    },
    {
      question: "How much extra does sensory-inclusive design add to a project?",
      answer:
        "Retrofitting an existing playground: roughly +US$8,000–US$22,000 for a 25–60 m² calm zone with proper acoustic panels, dimmable lighting and tactile elements. Designing it in from Day 1 of a new build: +6–10% of total CAPEX — far cheaper than retrofitting and unlocks government, school and healthcare contracts that are unreachable otherwise.",
    },
    {
      question: "Do you have certifications for inclusive playground equipment?",
      answer:
        "All equipment ships with the standard EN 1176, ASTM F1487 and AS/NZS 4685 certificates plus, where applicable, ADA-compliant access ramps, EN 1176-7 inspection compatibility and consultation reports from accredited OT/SEN professionals on our advisory panel.",
    },
    {
      question: "Can you advise on the operating model (quiet hours, staff training)?",
      answer:
        "Yes. We share an operator playbook with every sensory-inclusive build: weekly 'quiet sensory hour' schedules (50% lighting, no music, capped admission), a 6-page staff training brief on de-escalation and a visual social-story PDF you can email parents before their visit.",
    },
    {
      question: "Will sensory features survive heavy commercial use?",
      answer:
        "Yes. All tactile panels are rotation-moulded LLDPE or marine-grade plywood, fibre-optic strands are sheathed in PMMA, and acoustic panels use Class-0 fire-rated melamine foam. Everything is wipe-clean and tested for 5+ years of public-facility traffic.",
    },
  ];

  const breadcrumbItems = [
    { name: "Home", url: "https://indoorplaygroundsolution.com" },
    { name: "Solutions", url: "https://indoorplaygroundsolution.com/products" },
    {
      name: "Sensory-Inclusive Play Equipment",
      url: "https://indoorplaygroundsolution.com/sensory-inclusive-play-equipment",
    },
  ];

  const principles = [
    { icon: Volume2, title: "Acoustic Zoning", desc: "Acoustic panels and soft-fabric ceiling baffles drop ambient noise from 85 dB to 60 dB in the calm zone — below the threshold that triggers sensory overload." },
    { icon: EyeOff, title: "Visual De-Stimulation", desc: "A neutral palette (sage, oat, mushroom) in the calm zone, no flashing lights, dimmable LEDs and matte finishes that don't glare." },
    { icon: Hand, title: "Tactile & Proprioceptive Input", desc: "Textured wall panels, weighted blankets, compression tunnels and crash pads — the deep-pressure input sensory-seekers crave." },
    { icon: Wind, title: "Vestibular Equipment", desc: "Cocoon swings, hammock chairs, balance boards and spinning saucers — calibrated rotation and movement for regulation." },
    { icon: Moon, title: "Calm Retreat Pods", desc: "Enclosed soft-fabric pods or fibre-optic 'starlight' rooms for guests who need to step out of the main play floor and self-regulate." },
    { icon: Accessibility, title: "Universal Access", desc: "Wheelchair-accessible ramps, transfer platforms onto slides, ground-level play options and ADA-compliant clearances throughout." },
    { icon: Lightbulb, title: "Predictable Wayfinding", desc: "Consistent symbol-based signage, visual schedules at the entry and clear circulation routes — predictability reduces anxiety for ASD guests." },
    { icon: Waves, title: "Sensory-Seeker Zone", desc: "Separated from the calm zone: ball pits, climbing nets, gentle music and proprioceptive equipment for those who need more input, not less." },
  ];

  const productLines = [
    { title: "Soft Sensory Room", desc: "Enclosed 12–25 m² room with fibre-optic curtains, bubble tube, projected wall scenes and crash pad. The flagship calm-zone install for healthcare, schools and FECs." },
    { title: "Tactile Wall Panels", desc: "Modular wall tiles — textured, mirrored, gear-wheel, bead-strand — that turn corridors and queue lines into engagement points." },
    { title: "Cocoon & Hammock Swings", desc: "Vestibular equipment certified to EN 1176-2 and ASTM F1487, with weight-rated suspension and quick-release hardware for staff." },
    { title: "Compression Tunnels", desc: "Soft, semi-elastic crawl tunnels providing whole-body deep-pressure input — popular with ASD and SPD therapists." },
    { title: "Quiet Pod (1- and 2-person)", desc: "Acoustic, semi-enclosed seating pods for parents and guests who need a break from the main floor without leaving the venue." },
    { title: "Inclusive Soft-Play Range", desc: "Lower-height structures, wider tunnels, transfer platforms onto slides and ground-level interactive panels for wheelchair users." },
  ];

  const useCases = [
    { icon: Heart, title: "Hospitals & Pediatric Clinics", desc: "Calm rooms in waiting areas reduce procedural anxiety and parental stress. Often funded by hospital charitable trusts." },
    { icon: Users, title: "FECs & Soft-Play Centres", desc: "A dedicated 30–60 m² sensory zone unlocks 'quiet sensory hour' programming — premium-ticket revenue and new family demographic." },
    { icon: Sparkles, title: "Schools & SEN Units", desc: "Multi-Sensory Environments (MSE) for SEN classrooms, autism units and therapy programmes." },
    { icon: Shield, title: "Children's Charities & Civic Centres", desc: "Inclusive playgrounds funded by municipal accessibility budgets and disability charity grants." },
  ];

  return (
    <div className="min-h-screen">
      <SEOHead
        pageKey="sensoryInclusivePlay"
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
                <Heart className="w-3 h-3 mr-1" />
                Inclusive Design · ASD · SPD · SEN
              </Badge>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight text-primary-foreground">
                Sensory-Inclusive Play Equipment{" "}
                <span className="block text-accent mt-2">Built for Every Child</span>
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/85 mb-8 max-w-3xl mx-auto">
                Calm rooms, tactile walls, vestibular swings and universal-access soft-play — engineered with input from accredited OT and SEN consultants. Helping FECs, hospitals and schools serve the 1-in-6 children with sensory processing differences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="hero" asChild>
                  <a href="#contact">Brief My Sensory Zone <ArrowRight className="ml-2 h-4 w-4" /></a>
                </Button>
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                  <a href="#principles">8 Design Principles</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats / problem framing */}
        <section className="py-12 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { v: "1 in 36", l: "US children on autism spectrum", icon: Heart },
                { v: "1 in 6", l: "Children with sensory differences", icon: Users },
                { v: "8", l: "Design principles we apply", icon: Lightbulb },
                { v: "+6–10%", l: "CAPEX vs unlocking new demographic", icon: Sparkles },
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

        {/* Narrative */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <Badge variant="secondary" className="mb-4"><Lightbulb className="w-3 h-3 mr-1" />Why It Matters</Badge>
            <h2 className="text-2xl md:text-4xl font-heading font-bold mb-6">
              A loud, flashing playground locks out{" "}
              <span className="text-primary">one in six children.</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-4 leading-relaxed">
              The standard FEC layout — strobe lighting, 85 dB pop music, dense crowds — is unbearable for kids with autism, ADHD or sensory processing disorder. Their families don't come back. They also don't write a review explaining why; they simply find a quieter venue.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Carving out a properly designed 30–60 m² sensory zone (calm room + vestibular equipment + universal access) doesn't compromise the main play floor. It unlocks a parent demographic actively searching "<em>autism-friendly indoor play near me</em>" — and the school, hospital and charity contracts that traditional FEC equipment can never bid on.
            </p>
          </div>
        </section>

        {/* 8 principles */}
        <section id="principles" className="py-16 md:py-20 bg-muted/30 scroll-mt-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge variant="secondary" className="mb-4"><Shield className="w-3 h-3 mr-1" />8 Design Principles</Badge>
              <h2 className="text-2xl md:text-4xl font-heading font-bold mb-4">
                How We Design <span className="text-primary">Sensory-Inclusive Zones</span>
              </h2>
              <p className="text-muted-foreground">Eight rules we apply to every sensory-inclusive brief — refined across 40+ installs with OT and SEN consultants.</p>
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

        {/* Product lines */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge variant="secondary" className="mb-4"><Sparkles className="w-3 h-3 mr-1" />Equipment Range</Badge>
              <h2 className="text-2xl md:text-4xl font-heading font-bold mb-4">
                A Complete <span className="text-primary">Sensory Equipment Catalogue</span>
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

        {/* Use cases */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge variant="secondary" className="mb-4"><Users className="w-3 h-3 mr-1" />Where It Lands</Badge>
              <h2 className="text-2xl md:text-4xl font-heading font-bold">
                Four Sectors <span className="text-primary">Already Investing</span>
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

        {/* Related links */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <h3 className="text-lg font-heading font-semibold mb-4 text-center">Related Solutions</h3>
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="outline" size="sm" asChild><Link to={localizedPath("/market/pediatric-indoor-playground-solution-for-healthcare")}>Healthcare Solutions</Link></Button>
              <Button variant="outline" size="sm" asChild><Link to={localizedPath("/market/educational-indoor-playground-solution-for-schools")}>School Solutions</Link></Button>
              <Button variant="outline" size="sm" asChild><Link to={localizedPath("/products/soft-play")}>Soft Play Equipment</Link></Button>
              <Button variant="outline" size="sm" asChild><Link to={localizedPath("/safety-certifications")}>Safety & Certifications</Link></Button>
              <Button variant="outline" size="sm" asChild><Link to={localizedPath("/custom-indoor-playground-cost-free-3d-design")}>Cost & Free 3D Design</Link></Button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4"><HelpCircle className="w-3 h-3 mr-1" />FAQ</Badge>
              <h2 className="text-2xl md:text-4xl font-heading font-bold">
                Sensory-Inclusive <span className="text-primary">Questions, Answered</span>
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

export default SensoryInclusivePlay;
