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
  Home as HomeIcon, ArrowRight, HelpCircle, Shield, Users, Sparkles,
  Activity, Wrench, Layers, Package, Calendar, Heart, BookOpen, BarChart3,
} from "lucide-react";

/**
 * SEO landing page: Homeschool co-op / microschool indoor play solutions.
 * Targets homeschool collectives, co-op coordinators, microschool founders, church gym shares.
 */
const HomeschoolCoopIndoorPlay = () => {
  const { localizedPath } = useLocalizedPath();

  const faqItems = [
    {
      question: "What's a 'homeschool co-op' and how is it different from a school?",
      answer:
        "A homeschool co-op is a group of 5–60 homeschool families that meet weekly in a shared space (church hall, community centre, leased classroom) for collaborative learning and play. They need equipment that sets up in under 30 minutes, packs down to a storage closet, and survives 25+ mixed-age children. Standard school PE gear is too permanent; standard playground gear is too age-restricted.",
    },
    {
      question: "Do you have equipment that fits a 100–250 m² shared hall?",
      answer:
        "Yes — our Co-Op Pack 100, 175 and 250 ship complete: portable ninja loop, climbing rocks on castors, foldable Pikler triangles, loose-parts kit, sensory pods. Total setup time 20–30 minutes by two adults; everything nests into 4–6 wheeled storage crates that fit a 1.5 m² closet.",
    },
    {
      question: "Can the same gear serve toddlers and 12-year-olds in one session?",
      answer:
        "Yes — that's the design brief. Climbing rocks have detachable hold sets (toddler / preschool / tween difficulty). Ninja elements have three height settings. Loose parts work for every age. We include a Co-Op Rotation Card showing how to zone the hall: gross-motor 6–12, climbing 4–8, sensory pod 0–3.",
    },
    {
      question: "We share the space with a church / community group — does it pack down fast?",
      answer:
        "Yes, this is the most common co-op setup. Every element is castor-mounted or quick-fold. A 175 m² Co-Op Pack resets the hall in 22 minutes by two adults — verified with our co-op customers in Texas, North Carolina and Cornwall (UK).",
    },
    {
      question: "What about insurance and safety for parent-led supervision?",
      answer:
        "All equipment ships with EN 1176, ASTM F1487 and CPSIA certificates. We provide a parent-supervisor brief, fall-zone diagrams and a Co-Op Insurance Letter (most US homeschool insurers — HSLDA, Trinity — accept it). Floor mats included; no equipment exceeds 1.6m fall height by default.",
    },
    {
      question: "Can we finance as a co-op or split the cost across families?",
      answer:
        "Yes. We offer co-op group pricing (10%+ off list), 50/50 payment terms, and a Per-Family Cost Sheet (Co-Op Pack 175 works out to ~$280/family across 25 families). Many co-ops also fund via the local church's youth-budget line item.",
    },
  ];

  const breadcrumbItems = [
    { name: "Home", url: "https://indoorplaygroundsolution.com" },
    { name: "Solutions", url: "https://indoorplaygroundsolution.com/products" },
    { name: "Homeschool Co-Op Indoor Play Solutions", url: "https://indoorplaygroundsolution.com/homeschool-coop-indoor-play-solutions" },
  ];

  const principles = [
    { icon: Wrench, title: "30-Minute Setup & Pack-Down", desc: "Every element on castors or quick-fold hinges — two adults reset a 175 m² hall in 22 minutes flat." },
    { icon: Package, title: "Closet-Sized Storage Footprint", desc: "Full Co-Op Pack nests into 4–6 wheeled crates fitting a 1.5 m² closet — shared-hall reality, not idealised." },
    { icon: Layers, title: "Mixed-Age Modularity", desc: "Detachable difficulty sets — same climbing rock serves a 3-year-old and a 12-year-old in the same session." },
    { icon: Users, title: "Parent-Supervisor Friendly", desc: "Low fall heights (max 1.6m), clear sightlines, no equipment requires an instructor cert. Parent volunteers can run it." },
    { icon: Shield, title: "Insurance-Ready Documentation", desc: "EN 1176 / ASTM F1487 certs, fall-zone diagrams, Co-Op Insurance Letter accepted by HSLDA, Trinity & most US homeschool insurers." },
    { icon: Activity, title: "Gross-Motor First", desc: "Co-op kids spend 4–6 hours indoors — the equipment is sized to burn energy, not to look cute. Real climbing, real movement." },
    { icon: Sparkles, title: "Open-Ended Play Elements", desc: "Loose parts, forts, ramps — supports the project-based learning most co-ops favour over scripted curricula." },
    { icon: Heart, title: "Quiet/Sensory Corner", desc: "Every pack includes a sensory pod or quiet retreat — neurodivergent kids are over-represented in homeschool families, and they need a regulation space." },
  ];

  const productLines = [
    { title: "Co-Op Pack 100 (100 m²)", desc: "Starter pack for 8–15 families: portable ninja loop, 2 climbing rocks, Pikler triangle, loose parts, sensory pod. Two-crate storage." },
    { title: "Co-Op Pack 175 (175 m²)", desc: "Most popular: 16–28 families. Adds full climbing wall, balance circuit, plyo boxes, art atelier. Four-crate storage. Most insurance-ready." },
    { title: "Co-Op Pack 250 (250 m²)", desc: "Large co-op / microschool: 28–60 families. Full ninja course, mini soft-play zone, Montessori atelier, two sensory pods. Six-crate storage." },
    { title: "Portable Ninja Loop", desc: "8-element ninja course on a wheeled steel frame. Sets up in 12 minutes, max 1.6m fall height, foam landing pads included." },
    { title: "Foldable Pikler & Climbing System", desc: "Birch ply Pikler triangle that folds flat for storage, plus detachable arch and ramp. Serves toddlers through age 8." },
    { title: "Loose-Parts Library (Co-Op Edition)", desc: "200-piece mixed kit in 4 stackable crates: planks, fabric, rope, building parts, sensory items. The heart of open-ended co-op play." },
  ];

  const useCases = [
    { icon: HomeIcon, title: "Homeschool Co-Ops (8–60 Families)", desc: "Weekly co-op gatherings in church halls, community centres, leased classrooms. Pack-down required between uses." },
    { icon: BookOpen, title: "Microschools (5–25 Students)", desc: "Permanent micro-school sites needing flexible, mixed-age, insurance-ready equipment on a tight CAPEX budget." },
    { icon: Calendar, title: "Church Youth & Family Programs", desc: "Sunday-school halls and youth wings shared with weekday homeschool co-ops. Co-funded setups across both groups." },
    { icon: Users, title: "Homeschool Field-Trip Centres", desc: "Pay-per-visit play centres serving homeschool families during weekday hours — a growing US/UK micro-segment." },
  ];

  return (
    <div className="min-h-screen">
      <SEOHead pageKey="homeschoolCoopPlay" ogType="website" />
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
                <HomeIcon className="w-3 h-3 mr-1" />Co-Ops · Microschools · Church Halls
              </Badge>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight text-primary-foreground">
                Homeschool Co-Op Indoor Play Solutions
                <span className="block text-accent mt-2">Setup in 30 Minutes, Packs to a Closet</span>
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/85 mb-8 max-w-3xl mx-auto">
                Portable ninja loops, foldable climbing systems, mixed-age modular gear — designed for shared church halls and co-op spaces. Insurance-ready, parent-supervisor friendly, per-family pricing from ~$280.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="hero" asChild>
                  <a href="#contact">Spec My Co-Op Pack <ArrowRight className="ml-2 h-4 w-4" /></a>
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
                { v: "22 min", l: "Setup time (175 m² pack, 2 adults)", icon: Wrench },
                { v: "1.5 m²", l: "Storage footprint when packed", icon: Package },
                { v: "~$280", l: "Per-family cost (Pack 175 / 25 fams)", icon: BarChart3 },
                { v: "5–60", l: "Family size range supported", icon: Users },
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
            <Badge variant="secondary" className="mb-4"><Activity className="w-3 h-3 mr-1" />Why Co-Ops Need Different Equipment</Badge>
            <h2 className="text-2xl md:text-4xl font-heading font-bold mb-6">
              Co-ops aren't schools.{" "}
              <span className="text-primary">School equipment doesn't fit.</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-4 leading-relaxed">
              A homeschool co-op meets in a borrowed church hall on Tuesdays and Thursdays. The space must clear by 4pm for choir practice. Twenty-five kids range from 18 months to 14 years. Supervision is rotating parents, not certified PE teachers. The CAPEX comes from twenty-five families pooling cash, not a school district budget.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Standard school PE gear is bolted to the wall — impossible. Standard playground gear is age-restricted — useless for a mixed-age co-op. Our Co-Op Packs fix both: every element on castors, mixed-age difficulty modularity, parent-supervisor friendly fall heights, and per-family pricing your co-op treasurer can actually pitch to the families.
            </p>
          </div>
        </section>

        <section id="principles" className="py-16 md:py-20 bg-muted/30 scroll-mt-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge variant="secondary" className="mb-4"><Shield className="w-3 h-3 mr-1" />8 Design Principles</Badge>
              <h2 className="text-2xl md:text-4xl font-heading font-bold mb-4">
                How We Design <span className="text-primary">Co-Op Play Packs</span>
              </h2>
              <p className="text-muted-foreground">Eight rules refined with co-op customers in Texas, North Carolina, Cornwall and Brisbane.</p>
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
              <Badge variant="secondary" className="mb-4"><Sparkles className="w-3 h-3 mr-1" />Co-Op Pack Range</Badge>
              <h2 className="text-2xl md:text-4xl font-heading font-bold mb-4">
                Three Pack Sizes <span className="text-primary">Plus Component Add-Ons</span>
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
                Four Co-Op Settings <span className="text-primary">We Equip</span>
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
              <Button variant="outline" size="sm" asChild><Link to={localizedPath("/montessori-indoor-playground-design")}>Montessori Playground</Link></Button>
              <Button variant="outline" size="sm" asChild><Link to={localizedPath("/indoor-pe-equipment-for-schools")}>School PE Equipment</Link></Button>
              <Button variant="outline" size="sm" asChild><Link to={localizedPath("/sensory-inclusive-play-equipment")}>Sensory-Inclusive Play</Link></Button>
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
                Homeschool Co-Op <span className="text-primary">Questions, Answered</span>
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

export default HomeschoolCoopIndoorPlay;
