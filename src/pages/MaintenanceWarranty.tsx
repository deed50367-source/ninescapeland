import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { SEOHead } from "@/components/SEOHead";
import { ContactSection } from "@/components/ContactSection";
import { BreadcrumbSchema, OrganizationSchema, FAQSchema } from "@/components/StructuredData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Wrench, ShieldCheck, Clock, Package, ArrowRight, CheckCircle2, Phone, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { RelatedResources } from "@/components/RelatedResources";

const warrantyMatrix = [
  { component: "Galvanised Steel Structure", warranty: "3 years", coverage: "Manufacturing defects, weld failure, structural integrity under normal commercial use" },
  { component: "Soft-Play Vinyl & Foam Padding", warranty: "1 year", coverage: "Seam failure, foam compression, premature wear under normal commercial use" },
  { component: "Plastic Slides & Components", warranty: "1 year", coverage: "Cracking, UV fade, colour-fastness" },
  { component: "Trampoline Beds & Springs", warranty: "1 year", coverage: "Spring fatigue, bed-mat seam failure" },
  { component: "Electrical / Interactive Systems", warranty: "1 year", coverage: "Sensors, controllers, lighting drivers, projection units" },
  { component: "Cargo Nets & Climbing Ropes", warranty: "1 year", coverage: "Stitching, knot integrity, abrasion under spec load" },
];

const maintenanceSchedule = [
  { freq: "Daily", tasks: ["Visual safety walkthrough", "Wipe-down of high-touch padding & vinyl", "Check ball-pit ball levels", "Confirm exits & emergency stops clear"] },
  { freq: "Weekly", tasks: ["Tighten visible bolts & fasteners", "Disinfect ball pits, foam pits, padded floors", "Inspect netting for fraying", "Vacuum / steam-clean carpet zones"] },
  { freq: "Monthly", tasks: ["Operational inspection per EN 1176-7 §5", "Lubricate moving joints (swings, see-saws)", "Test interactive sensors & game scoring", "Photograph wear log for warranty file"] },
  { freq: "Annual", tasks: ["Independent main inspection by a locally qualified inspector", "Replace consumables: foam top-layer, ball-pit balls, netting", "Re-test surfacing impact attenuation", "Renew local compliance certificate"] },
];

const faqs = [
  { question: "What is the standard warranty on NinescapeLand indoor playgrounds?", answer: "Galvanised steel structures carry a 3-year warranty; soft-play vinyl, foam padding, plastic components, trampoline beds, electricals and ropes carry a 1-year warranty. Full warranty matrix and exclusions are sent with every order confirmation." },
  { question: "Do you offer spare parts for older installations?", answer: "Yes. We guarantee spare-part availability for 10 years from the date of original purchase for every component we manufacture in-house. Standard fasteners, foams and vinyls are sourced to international specs and can be supplied indefinitely." },
  { question: "How fast can replacement parts be delivered?", answer: "Standard parts ship from our Wenzhou factory within 5–10 working days after order confirmation. Air freight is available for urgent safety-critical components on request." },
  { question: "Do you provide on-site maintenance and inspection?", answer: "Routine inspection and maintenance are the operator's responsibility — every project ships with a maintenance checklist, EN 1176-7 wear-log template and operator training videos. We recommend engaging a locally qualified inspector for the annual main inspection. We provide remote technical support by phone, email and WhatsApp throughout the warranty period." },
  { question: "Will my insurance company accept your inspection reports?", answer: "Our factory test reports follow EN 1176, ASTM F1487 and AS/NZS 4685 templates and are accepted by major commercial-line insurers in EU, UK, US, AU/NZ and GCC. We can provide sample reports for your underwriter on request." },
  { question: "What happens if I move premises or expand the playground?", answer: "We re-quote disassembly, transport and re-installation at preferential rates for existing clients. Adding new modules to an existing structure is straightforward — same connector system across our entire catalogue." },
];

const breadcrumbItems = [
  { name: "Home", url: "https://indoorplaygroundsolution.com" },
  { name: "Maintenance & Warranty", url: "https://indoorplaygroundsolution.com/maintenance-warranty" },
];

const MaintenanceWarranty = () => {
  return (
    <div className="min-h-screen">
      <SEOHead
        pageKey="maintenanceWarranty"
        dynamicTitle="Indoor Playground Maintenance, Warranty & Spare Parts"
        dynamicDescription="NinescapeLand indoor playground warranty: 3-year structural, 1-year soft-play & components, 10-year spare-part guarantee, EN 1176-7 maintenance checklist."
        dynamicKeywords="indoor playground maintenance services, indoor playground warranty, soft play spare parts, EN 1176 inspection"
        ogImage="/og-maintenance-warranty.jpg"
      />
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
                <Wrench className="w-4 h-4 mr-2" /> After-Sales & Lifecycle
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                Indoor Playground <span className="text-accent">Maintenance, Warranty & Spare Parts</span>
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
                <strong className="text-accent-foreground">3-year structural warranty</strong>, 1-year soft-play & components warranty and a 10-year spare-part guarantee — clear, written terms sent with every order confirmation.
              </p>
              <Button size="lg" variant="hero" asChild>
                <a href="#contact">
                  Request Warranty Pack
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Warranty matrix */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Full <strong>Warranty Matrix</strong></h2>
              <p className="text-muted-foreground text-lg">Component-level warranty terms — clear, written, sent with every quotation.</p>
            </div>
            <div className="space-y-3">
              {warrantyMatrix.map((w) => (
                <Card key={w.component}>
                  <CardContent className="p-5 grid md:grid-cols-12 gap-4 items-center">
                    <div className="md:col-span-4 flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5 text-accent flex-shrink-0" />
                      <h3 className="font-bold">{w.component}</h3>
                    </div>
                    <div className="md:col-span-2">
                      <Badge variant="secondary" className="text-base font-bold">{w.warranty}</Badge>
                    </div>
                    <div className="md:col-span-6 text-sm text-muted-foreground">{w.coverage}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              Warranty applies to manufacturing defects under normal commercial use. Damage from misuse, unauthorised modification or failure to perform routine maintenance is excluded.
            </p>
          </div>
        </section>

        {/* Maintenance schedule */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Recommended <strong>Maintenance Schedule</strong></h2>
              <p className="text-muted-foreground text-lg">Daily → Annual — keep your playground compliant with EN 1176-7 and protect your warranty.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {maintenanceSchedule.map((s) => (
                <Card key={s.freq} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Clock className="w-6 h-6 text-accent" />
                      <h3 className="font-bold text-xl">{s.freq}</h3>
                    </div>
                    <ul className="space-y-2">
                      {s.tasks.map((t) => (
                        <li key={t} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Support plans section removed — on-site inspection plans not offered */}

        {/* Spare parts */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-5xl">
            <Card className="border-accent">
              <CardContent className="p-8 md:p-12 grid md:grid-cols-3 gap-8 items-center">
                <Package className="w-20 h-20 text-accent mx-auto md:mx-0" />
                <div className="md:col-span-2">
                  <h2 className="text-2xl md:text-3xl font-bold mb-3"><strong>10-Year Spare Parts Guarantee</strong></h2>
                  <p className="text-muted-foreground mb-4">Every component we manufacture in-house — steel platforms, plastic slides, custom theming pieces — is supported with replacement parts for a full decade. Standard consumables (foam, vinyl, netting, fasteners) are stocked indefinitely.</p>
                  <Button asChild>
                    <a href="#contact">
                      <Phone className="w-4 h-4 mr-2" />
                      Order a Spare Part
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Maintenance & Warranty <strong>FAQ</strong></h2>
            <Accordion type="single" collapsible className="bg-muted/30 rounded-lg p-2">
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
          heading="Plan, Certify and Operate"
          intro="Resources that pair with our warranty and after-sales programme."
          items={[
            { title: "Safety Standards & Certifications", desc: "ASTM, EN 1176, TÜV documentation behind the warranty.", href: "/safety-certifications" },
            { title: "Manufacturing & QC Process", desc: "How our 5-stage QC keeps warranty claims rare.", href: "/process" },
            { title: "Project Case Studies", desc: "Long-running installations — operational data 3+ years post-launch.", href: "/case-studies" },
            { title: "FAQ", desc: "Operator FAQ on inspections, parts and lifecycle.", href: "/faq" },
            { title: "Indoor Playground Equipment", desc: "Browse warranty-covered product categories.", href: "/products/indoor-playground" },
            { title: "About NinescapeLand", desc: "Why operators trust us with 10-year lifecycle support.", href: "/about-us" },
          ]}
        />

        <ContactSection />
      </main>

      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default MaintenanceWarranty;
