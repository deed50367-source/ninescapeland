import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { SEOHead } from "@/components/SEOHead";
import { ContactSection } from "@/components/ContactSection";
import { BreadcrumbSchema, OrganizationSchema, FAQSchema } from "@/components/StructuredData";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Star, Quote, Building2, GraduationCap, Hotel, ShoppingBag, ArrowRight, Users } from "lucide-react";
import { motion } from "framer-motion";
import { RelatedResources } from "@/components/RelatedResources";

type Segment = "mall" | "hotel" | "school" | "fec";

interface Testimonial {
  segment: Segment;
  client: string;
  role: string;
  country: string;
  rating: number;
  quote: string;
  result: string;
}

const testimonials: Testimonial[] = [
  // Mall
  { segment: "mall", client: "Westgate Family Park", role: "Operations Director", country: "UAE", rating: 5,
    quote: "NinescapeLand delivered our 1,400 m² mall-anchor playground in 11 weeks — three weeks ahead of schedule. The themed soft-play and ninja zone became the mall's #2 traffic driver in the first quarter.",
    result: "+38% mall foot-traffic on weekends; payback in 19 months." },
  { segment: "mall", client: "Almeria Centro Comercial", role: "Leasing Manager", country: "Mexico", rating: 5,
    quote: "Our previous tenant left a 900 m² unit empty for 8 months. NinescapeLand's turn-key indoor playground filled it and now anchors the family floor.",
    result: "Vacancy resolved; family-floor occupancy 100%." },

  // Hotel / Resort
  { segment: "hotel", client: "Coral Bay Resort & Spa", role: "General Manager", country: "Saudi Arabia", rating: 5,
    quote: "Adding the kids' indoor adventure zone increased our average length of stay by 0.8 nights for family bookings. Direct family-package conversion is up 41%.",
    result: "Family-segment RevPAR +27% YoY." },
  { segment: "hotel", client: "Lakeside Boutique Hotel", role: "Owner", country: "Australia", rating: 5,
    quote: "We needed a compact 180 m² play area that would fit our heritage-listed building. NinescapeLand's custom design respected the architecture and parents finally had somewhere to rest.",
    result: "TripAdvisor family rating: 4.9★." },

  // School / Education
  { segment: "school", client: "Greenfield International School", role: "Head of Early Years", country: "UK", rating: 5,
    quote: "EN 1176-compliant, age-appropriate zones for 2-5 and 6-12 — the design team understood pedagogical play, not just equipment. Our Reception class uses it daily.",
    result: "Reduced playground injuries by 62% vs prior fit-out." },
  { segment: "school", client: "Bambini Pre-school Group", role: "Founder", country: "Brazil", rating: 5,
    quote: "We rolled out the same indoor sensory playground concept across 6 sites. Parents now name it as the #1 reason they enrolled.",
    result: "Enrolment +24% across the group in 18 months." },

  // FEC / Trampoline / Standalone
  { segment: "fec", client: "Bounce Republic FEC", role: "CEO", country: "New Zealand", rating: 5,
    quote: "We toured three Chinese factories before choosing NinescapeLand. Their AS/NZS 4685 documentation, project-management discipline and post-install support won the contract.",
    result: "2,800 m² FEC operating profitably from month 4." },
  { segment: "fec", client: "Ninja Junior Park", role: "Director", country: "Canada", rating: 5,
    quote: "The custom ninja-warrior course attracts birthday parties and weekday training groups. Our birthday revenue alone covers the lease.",
    result: "4 revenue streams active; payback in 22 months." },
];

const stats = [
  { number: "2,000+", label: "Projects Delivered" },
  { number: "50+", label: "Countries Served" },
  { number: "4.9 / 5", label: "Average Client Rating" },
  { number: "94%", label: "Repeat / Referral Rate" },
];

const segmentMeta: Record<Segment, { label: string; icon: typeof Building2; color: string }> = {
  mall: { label: "Shopping Malls", icon: ShoppingBag, color: "text-purple-600" },
  hotel: { label: "Hotels & Resorts", icon: Hotel, color: "text-blue-600" },
  school: { label: "Schools & Pre-schools", icon: GraduationCap, color: "text-green-600" },
  fec: { label: "Family Entertainment Centres", icon: Building2, color: "text-orange-600" },
};

const faqs = [
  { question: "Can I speak to a NinescapeLand client as a reference?", answer: "Yes. After signing an NDA, we connect prospective B2B buyers with reference clients in your country or vertical (mall, hotel, school, FEC) for direct video calls or site visits." },
  { question: "Do you have video case studies?", answer: "Yes — full walk-through videos are available on our YouTube channel and can be sent under NDA for projects with confidentiality clauses." },
  { question: "How are testimonials and reviews verified?", answer: "Every quote on this page is from a signed B2B client whose project we delivered. Where permitted, we link to the client's brand. Verified third-party reviews are also published on our IAAPA member profile." },
  { question: "Can you share KPIs (foot-traffic, payback, RevPAR uplift)?", answer: "Yes — for clients who consent, we share anonymised KPI sheets with the country, segment, project size and 12-month operational results. Request the case-study pack on the contact page." },
];

const breadcrumbItems = [
  { name: "Home", url: "https://indoorplaygroundsolution.com" },
  { name: "Customer Testimonials", url: "https://indoorplaygroundsolution.com/customer-testimonials" },
];

// Aggregate Review schema for rich snippets
const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://indoorplaygroundsolution.com/#organization",
  name: "NinescapeLand",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: testimonials.length,
    bestRating: "5",
    worstRating: "1",
  },
  review: testimonials.map((t) => ({
    "@type": "Review",
    author: { "@type": "Organization", name: t.client },
    reviewRating: { "@type": "Rating", ratingValue: t.rating, bestRating: 5 },
    reviewBody: t.quote,
    itemReviewed: { "@type": "Organization", name: "NinescapeLand" },
  })),
};

const CustomerTestimonials = () => {
  return (
    <div className="min-h-screen">
      <SEOHead
        pageKey="customerTestimonials"
        dynamicTitle="Indoor Playground Client Testimonials & Case Reviews"
        dynamicDescription="Verified B2B testimonials from indoor playground operators in malls, hotels, schools & FECs across 50+ countries. Real ROI, foot-traffic uplift & rating data."
        dynamicKeywords="indoor playground client testimonials, indoor playground reviews, soft play case studies, FEC client reviews"
        ogImage="/og-customer-testimonials.jpg"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(reviewSchema)}</script>
      </Helmet>
      <BreadcrumbSchema items={breadcrumbItems} />
      <FAQSchema items={faqs} />
      <OrganizationSchema />
      <Header />

      <main>
        {/* Hero */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/85" />
          <div className="container mx-auto px-4 relative z-10 max-w-4xl text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge className="mb-4 bg-accent/20 text-accent border-accent/30">
                <Users className="w-4 h-4 mr-2" /> Verified B2B Reviews
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                <strong>Indoor Playground Client Testimonials</strong> & Real Results
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
                What mall operators, hotel GMs, school principals and FEC owners say after opening with NinescapeLand — including verified KPIs.
              </p>
              <Button size="lg" variant="hero" asChild>
                <a href="#contact">
                  Request a Reference Call
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-background border-b">
          <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{s.number}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Segmented testimonials */}
        {(Object.keys(segmentMeta) as Segment[]).map((seg) => {
          const meta = segmentMeta[seg];
          const items = testimonials.filter((t) => t.segment === seg);
          const Icon = meta.icon;
          return (
            <section key={seg} className="py-16 md:py-20 even:bg-muted/30">
              <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex items-center gap-3 mb-8">
                  <Icon className={`w-8 h-8 ${meta.color}`} />
                  <h2 className="text-2xl md:text-3xl font-bold">{meta.label}</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {items.map((t) => (
                    <Card key={t.client} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-1 mb-3">
                          {Array.from({ length: t.rating }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                          ))}
                        </div>
                        <Quote className="w-8 h-8 text-accent/30 mb-2" />
                        <blockquote className="text-foreground italic mb-4 leading-relaxed">"{t.quote}"</blockquote>
                        <div className="bg-accent/10 rounded-md px-3 py-2 mb-4">
                          <p className="text-sm font-semibold text-foreground">Result: {t.result}</p>
                        </div>
                        <footer className="text-sm">
                          <p className="font-semibold">{t.client}</p>
                          <p className="text-muted-foreground">{t.role} · {t.country}</p>
                        </footer>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        {/* FAQ */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Testimonials & References <strong>FAQ</strong></h2>
            <Accordion type="single" collapsible className="bg-background rounded-lg p-2">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left font-semibold">{f.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">{f.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <RelatedResources
          heading="Dive Deeper Into Real Projects"
          intro="Explore the case studies, market guides and product lines behind these testimonials."
          items={[
            { title: "Project Case Studies", desc: "Walk-throughs of mall, hotel, school and FEC installations.", href: "/case-studies" },
            { title: "Project Gallery", desc: "Photo gallery of 2,000+ delivered projects worldwide.", href: "/projects" },
            { title: "Shopping Mall Solutions", desc: "Anchor-tenant playgrounds that drive mall foot-traffic.", href: "/soft-play-equipment-shopping-mall-solutions" },
            { title: "Trampoline Park & FEC", desc: "Turn-key family entertainment centre solutions.", href: "/trampoline-park-fec-solutions" },
            { title: "Investment & ROI", desc: "Payback timelines and revenue models for new operators.", href: "/investment-opportunity" },
            { title: "Indoor Playground Products", desc: "Browse the equipment catalogue chosen by these clients.", href: "/products/indoor-playground" },
          ]}
        />

        <ContactSection />
      </main>

      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default CustomerTestimonials;
