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
  Palette, ArrowRight, Sparkles, HelpCircle, Layers, Maximize2,
  TreePine, Rocket, Waves, Sailboat, Castle, Cpu, Sun, Flame, Ship, Mountain, Snowflake, Trees,
} from "lucide-react";

/**
 * Aggregation page for:
 *  - "themed indoor playground design"
 *  - "indoor trampoline park design ideas"
 *  - "multi-level indoor play structure"
 *  - "small indoor play area ideas"
 */
const ThemedIndoorPlaygroundDesign = () => {
  const { localizedPath } = useLocalizedPath();

  const faqItems = [
    {
      question: "What's the most popular theme for new indoor playgrounds in 2026?",
      answer:
        "Three themes dominate inbound briefs this year: Cyber-Neon (high-contrast UV/blacklight + scoring), Deep-Sea (whale-shark archways, jellyfish lighting) and Sky-Cloud (pastel pinks with mirror floors). All three photograph extremely well for social media, which has overtaken word-of-mouth as the #1 acquisition channel for FECs.",
    },
    {
      question: "How do I theme a small (<200 m²) space without it feeling cramped?",
      answer:
        "Three rules: (1) Pick a single dominant colour and 1–2 accents — never 4+ colours. (2) Use vertical space — wall murals and ceiling cloud-clusters add immersion without taking floor area. (3) Mirror one wall to double perceived depth. We've themed 90 m² mall pads that read as 180 m² thanks to this discipline.",
    },
    {
      question: "What is a multi-level play structure and when does it pay off?",
      answer:
        "A multi-level structure stacks 2–4 deck levels into a single steel cage, connected by tunnels, slides and climbing nets. It pays off when your ceiling is above 4.5 m and your floor is under 600 m². Going vertical adds 40–80% effective play area without buying more floor — typically lifts revenue/m² by 35–55%.",
    },
    {
      question: "Can you copy an existing IP (e.g. Disney, Marvel)?",
      answer:
        "No. We respect IP. What we do is craft a custom theme in the spirit of your brief — e.g. a 'mythical jungle' inspired by but legally distinct from any IP. For licensed builds, you supply the licence agreement and we execute to the IP holder's style guide.",
    },
    {
      question: "Do trampoline park design ideas differ from soft-play themes?",
      answer:
        "Yes. Trampoline parks need bold, high-contrast graphics that read at 6 m+ distance and through a dodgeball net — comic-book, cyber and graffiti themes work best. Soft-play themes can use softer pastels and fine detail because guests are at 1–2 m viewing distance.",
    },
    {
      question: "How long does themed design add to the timeline?",
      answer:
        "Stock palettes: zero added time. Custom theme with hand-sculpted FRP elements: +14–21 days at concept stage and +7–10 days at production. Lighting and projection theming can be retrofitted in 3–5 days on site once the structure is up.",
    },
  ];

  const breadcrumbItems = [
    { name: "Home", url: "https://indoorplaygroundsolution.com" },
    { name: "Solutions", url: "https://indoorplaygroundsolution.com/products" },
    {
      name: "Themed Indoor Playground Design",
      url: "https://indoorplaygroundsolution.com/themed-indoor-playground-design",
    },
  ];

  const themes = [
    { icon: Waves, name: "Deep-Sea Reef", palette: "Coral · teal · indigo", note: "Whale-shark archways, jellyfish LED clusters, mirror-floor lagoon." },
    { icon: Rocket, name: "Space Odyssey", palette: "Galaxy · violet · neon-green", note: "Glow-rocket slides, planet climbers, UV-reactive wall graphics." },
    { icon: TreePine, name: "Mythical Jungle", palette: "Moss · ochre · sky-blue", note: "Banyan-tree climber, vine bridges, hand-sculpted FRP fauna." },
    { icon: Cpu, name: "Cyber-Neon", palette: "Magenta · cyan · matte-black", note: "UV blacklight + scoring overlays, perfect for late-night teen sessions." },
    { icon: Sailboat, name: "Pirate Cove", palette: "Mahogany · sun-yellow · azure", note: "Ship-deck soft-play, treasure-chest ball pit, rope-bridge crossing." },
    { icon: Castle, name: "Enchanted Castle", palette: "Lavender · gold · rose", note: "Princess turret, dragon slide, glittering chandelier ceiling clusters." },
    { icon: Sun, name: "Tropical Paradise", palette: "Aqua · coral · papaya", note: "Palm-tree climbers, surf-wave foam pit, tiki-hut party suite." },
    { icon: Flame, name: "Volcano Adventure", palette: "Crimson · charcoal · amber", note: "Lava-flow slides, smoke-effect tunnels, glowing rock climbers." },
    { icon: Ship, name: "Arctic Expedition", palette: "Glacier-blue · white · steel", note: "Ice-cave tunnels, penguin soft-play, snow-effect projection." },
    { icon: Mountain, name: "Alpine Quest", palette: "Forest · stone · burnt-orange", note: "Mountain-ridge climbers, log-cabin party room, cargo-net summit." },
    { icon: Snowflake, name: "Sky-Cloud", palette: "Pastel pink · sky-blue · white", note: "Ceiling cloud clusters, rainbow slide, mirror-floor — Instagram magnet." },
    { icon: Trees, name: "Safari Trails", palette: "Khaki · burnt-yellow · leaf-green", note: "Giraffe climbers, jeep-themed entry, baobab tree ball pit." },
  ];

  const verticalPlay = [
    { title: "2-Level Cage (4.0–5.0 m ceiling)", desc: "Entry deck + mezzanine connected by one slide and one tunnel. Adds ~45% effective play area. Common in mall pads under 400 m²." },
    { title: "3-Level Tower (5.0–7.0 m ceiling)", desc: "Three decks with a central spiral climber, two slides and three tunnel cross-overs. Lifts revenue/m² by 50–70%." },
    { title: "4-Level Adventure Cage (>7.0 m ceiling)", desc: "Four decks, a 6-m drop slide, a parkour speed-loop and rope bridges. Used for flagship FECs and resort kids-clubs." },
    { title: "Sky-Walk Bridge (between two cages)", desc: "Suspended bridge connecting two separate cages 3 m apart. Adds dramatic sightline and a queue-able photo moment." },
  ];

  const trampolineIdeas = [
    { title: "Themed Lane Graphics", desc: "Each trampoline lane wrapped in a different theme (sports court, race track, cosmic). Boosts Instagram shares by 40%+." },
    { title: "Projection-Mapped Floor", desc: "Floor projection turns the dodgeball zone into a lava field, ice floe or scoring grid — programmable per session." },
    { title: "Foam-Pit Skyline", desc: "City-skyline soft padding around a stunt-fall foam pit. Cheaper than full theming, still photo-ready." },
    { title: "Glow-Night Sessions", desc: "Blacklight + UV-reactive park graphics on Friday/Saturday evenings. Premium-ticket revenue stream." },
  ];

  const smallSpaceIdeas = [
    { title: "Vertical-First (<150 m²)", desc: "Skip the ball pit. Build a tall 2-level cage + wall-climber + a single fast slide. Maximises play minutes per m²." },
    { title: "Single-Theme Discipline", desc: "Pick ONE colour family. Three colours feel premium; six colours feel like a daycare." },
    { title: "Mirror One Wall", desc: "A floor-to-ceiling mirror on the longest wall doubles perceived depth at near-zero cost." },
    { title: "Modular Soft-Play Add-On", desc: "Add a 25 m² toddler zone you can wheel away on weekends to host birthday parties in the same footprint." },
  ];

  return (
    <div className="min-h-screen">
      <SEOHead
        pageKey="themedPlaygroundDesign"
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
                <Palette className="w-3 h-3 mr-1" />
                Design Inspiration · 12 Themes · 2,000+ Builds
              </Badge>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight text-primary-foreground">
                Themed Indoor Playground Design{" "}
                <span className="block text-accent mt-2">— Ideas Operators Are Actually Building in 2026</span>
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/85 mb-8 max-w-3xl mx-auto">
                12 production-ready themes, multi-level cage formats, trampoline park design ideas and small-space layout tactics — all illustrated with build notes from real NinescapeLand projects.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="hero" asChild>
                  <a href="#contact">Brief My Custom Theme <ArrowRight className="ml-2 h-4 w-4" /></a>
                </Button>
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                  <a href="#themes">Browse 12 Themes</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 12 Themes */}
        <section id="themes" className="py-16 md:py-20 bg-background scroll-mt-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge variant="secondary" className="mb-4"><Sparkles className="w-3 h-3 mr-1" />12 Production-Ready Themes</Badge>
              <h2 className="text-2xl md:text-4xl font-heading font-bold mb-4">
                Pick a Direction. <span className="text-primary">We Build the Rest.</span>
              </h2>
              <p className="text-muted-foreground">Each theme has a tested colour palette, sculpted FRP element catalogue and lighting recipe — so production starts on Day 1, not Day 30.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
              {themes.map((t, i) => (
                <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
                  <Card className="border-0 shadow-md h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-4"><t.icon className="w-5 h-5 text-accent" /></div>
                      <h3 className="font-heading font-bold text-lg mb-1">{t.name}</h3>
                      <p className="text-xs text-primary font-medium mb-3">{t.palette}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{t.note}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Multi-level */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4"><Layers className="w-3 h-3 mr-1" />Multi-Level Structures</Badge>
              <h2 className="text-2xl md:text-4xl font-heading font-bold mb-4">
                Go Vertical. <span className="text-primary">Lift Revenue/m² by 35–70%.</span>
              </h2>
              <p className="text-muted-foreground">When floor area is fixed and ceiling height is free, stacking play decks is the single highest-ROI design move.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {verticalPlay.map((v) => (
                <Card key={v.title} className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <h3 className="font-heading font-bold text-lg mb-2">{v.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Trampoline ideas */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4"><Flame className="w-3 h-3 mr-1" />Trampoline Park Design Ideas</Badge>
              <h2 className="text-2xl md:text-4xl font-heading font-bold mb-4">
                Beyond <span className="text-primary">Blue Mats and Black Pads</span>
              </h2>
              <p className="text-muted-foreground">Operators competing for the same teen demographic are differentiating with graphics, projection and lighting — not more square metres.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {trampolineIdeas.map((t) => (
                <Card key={t.title} className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <h3 className="font-heading font-bold text-lg mb-2">{t.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button variant="outline" asChild><Link to={localizedPath("/products/trampoline-park")}>See Trampoline Park Equipment <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
            </div>
          </div>
        </section>

        {/* Small space */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4"><Maximize2 className="w-3 h-3 mr-1" />Small Spaces (&lt;200 m²)</Badge>
              <h2 className="text-2xl md:text-4xl font-heading font-bold mb-4">
                Small Footprint, <span className="text-primary">Premium Feel</span>
              </h2>
              <p className="text-muted-foreground">Cafés, hotels and mall pads have less space than they want — but the right design tactics make 120 m² read as 250 m².</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {smallSpaceIdeas.map((s) => (
                <Card key={s.title} className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <h3 className="font-heading font-bold text-lg mb-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Related links */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <h3 className="text-lg font-heading font-semibold mb-4 text-center">Explore More</h3>
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="outline" size="sm" asChild><Link to={localizedPath("/custom-indoor-playground-cost-free-3d-design")}>Cost & Free 3D Design</Link></Button>
              <Button variant="outline" size="sm" asChild><Link to={localizedPath("/products/indoor-playground")}>Indoor Playground Equipment</Link></Button>
              <Button variant="outline" size="sm" asChild><Link to={localizedPath("/products/trampoline-park")}>Trampoline Park Equipment</Link></Button>
              <Button variant="outline" size="sm" asChild><Link to={localizedPath("/case-studies")}>2,000+ Case Studies</Link></Button>
              <Button variant="outline" size="sm" asChild><Link to={localizedPath("/gamified-attractions-manufacturer")}>Gamified Attractions</Link></Button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4"><HelpCircle className="w-3 h-3 mr-1" />FAQ</Badge>
              <h2 className="text-2xl md:text-4xl font-heading font-bold">
                Design <span className="text-primary">Questions, Answered</span>
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

export default ThemedIndoorPlaygroundDesign;
