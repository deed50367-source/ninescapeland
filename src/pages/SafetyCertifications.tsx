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
import { ShieldCheck, FileCheck2, Globe2, FlaskConical, ArrowRight, CheckCircle2, Scale, X } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";
import { RelatedResources } from "@/components/RelatedResources";

const certifications = [
  { code: "ASTM F1918 / F1487", region: "USA", scope: "Soft-contained play structures & public-use playground equipment", body: "ASTM International" },
  { code: "EN 1176-1 to 1176-11", region: "EU / UK", scope: "Public playground equipment & impact-attenuating surfacing", body: "CEN" },
  { code: "AS / NZS 4685.0-6", region: "Australia & New Zealand", scope: "General safety, swings, slides, climbing, rocking equipment", body: "Standards Australia" },
  { code: "CSA Z614", region: "Canada", scope: "Children's playspaces & equipment for public use", body: "CSA Group" },
  { code: "ABNT NBR 16071 / 16677", region: "Brazil", scope: "Indoor recreation areas — safety requirements & test methods", body: "ABNT" },
  { code: "SASO / GSO 1828", region: "Saudi Arabia & GCC", scope: "Children's play equipment safety", body: "SASO" },
  { code: "TÜV SÜD / TÜV Rheinland", region: "International", scope: "Independent type testing, audit & factory inspection", body: "TÜV" },
  { code: "ISO 9001:2015", region: "Worldwide", scope: "Quality management system — full design, manufacture, install", body: "ISO" },
  { code: "CE Marking", region: "EEA", scope: "EU conformity for components placed on the European market", body: "EU" },
  { code: "REACH / RoHS", region: "EU", scope: "Restriction of hazardous substances in plastics, foams, coatings", body: "ECHA" },
  { code: "EN 71-1/-2/-3", region: "EU", scope: "Toy safety — mechanical, flammability, migration of elements", body: "CEN" },
  { code: "IAAPA Member", region: "Global", scope: "Industry association for amusement parks & attractions", body: "IAAPA" },
];

const materialStandards = [
  { name: "Galvanised Steel Frame", spec: "Q235 carbon steel, hot-dip galvanised, 2.5–3.0 mm wall thickness", benefit: "Load-tested to >250 kg per platform; corrosion-resistant for 10+ years" },
  { name: "EPE Foam Padding", spec: "High-density closed-cell EPE, 25 mm – 50 mm", benefit: "Impact attenuation per EN 1177 / ASTM F1292; non-toxic, recyclable" },
  { name: "PVC Soft-play Vinyl", spec: "0.55 mm flame-retardant PVC, lead-free, phthalate-free", benefit: "EN 71-3 & ASTM F963 compliant; hospital-grade wipe-down" },
  { name: "LLDPE Plastic Components", spec: "Rotation-moulded LLDPE, UV-stabilised", benefit: "Impact resistant, no sharp edges, 5-year colour-fastness warranty" },
  { name: "Cargo Net & Webbing", spec: "PP/Nylon webbing, 6 mm diameter, >900 kg break load", benefit: "Tested per EN 1176-11 climbing-net spec" },
  { name: "Acrylic Tube Slides", spec: "PMMA cast acrylic, 5–8 mm wall, UV-stable", benefit: "High clarity, scratch resistant, EN 1176-3 slide angles" },
];

const qualityProcess = [
  { step: "Raw-Material IQC", detail: "Every steel coil, foam roll and PVC batch is sampled and tested before entering production. Suppliers must provide lot-level mill certificates and SDS." },
  { step: "In-Process QC", detail: "Welding, cutting, sewing and rotation-moulding stations have 100% visual inspection plus sample destructive testing per shift." },
  { step: "Pre-Shipment FQC", detail: "Each project is fully assembled in our factory, photographed and signed off against your approved 3D drawings before disassembly and packing." },
  { step: "Third-Party Test Reports", detail: "On request we provide TÜV / SGS / Intertek type-test reports per EN 1176, ASTM F1918 or your local standard — including impact, flammability and migration tests." },
  { step: "On-Site Installation Audit", detail: "Our installation supervisors complete an EN 1176 / ASTM F1487 inspection checklist and hand over a signed Compliance Certificate at project completion." },
];

const faqs = [
  { question: "Which safety standards do NinescapeLand indoor playgrounds comply with?", answer: "All NinescapeLand equipment is built to EN 1176 (Europe), ASTM F1918 / F1487 (USA), AS/NZS 4685 (Australia/NZ), CSA Z614 (Canada), ABNT NBR 16071 (Brazil) and SASO (Saudi Arabia / GCC). We can manufacture to whichever standard your local market requires and provide third-party type-test reports on request." },
  { question: "Are your materials non-toxic and child-safe?", answer: "Yes. All foams, plastics and vinyls are lead-free, phthalate-free and tested per EN 71-3, ASTM F963 and REACH/RoHS for migration of heavy metals and restricted substances. Material safety data sheets are issued with every shipment." },
  { question: "Do you provide test reports and certificates with the equipment?", answer: "Every project ships with: (1) Factory Quality Certificate, (2) Material SDS for each component, (3) Third-party test report (TÜV / SGS / Intertek) per the destination market standard, and (4) Installation Compliance Certificate signed by our on-site supervisor." },
  { question: "Is impact-attenuating surfacing included or specified?", answer: "We specify and supply EN 1177 / ASTM F1292-compliant surfacing — typically 30–50 mm rubber tiles, poured-in-place rubber or EPE foam mat — sized to the critical fall height of every structure on your floor plan." },
  { question: "What about fire safety and flammability?", answer: "Soft-play vinyls, foams and netting are flame-retardant and tested to EN 71-2 (toy flammability) and BS 5852 (furniture ignition). On request we can supply Class B-s2,d0 (EN 13501-1) or NFPA 701 reports for shopping-mall and FEC tenants." },
  { question: "How are equipment audits handled after installation?", answer: "We recommend an annual main inspection per EN 1176-7. NinescapeLand provides a free first-year audit checklist and offers paid annual inspection contracts in markets where we have local installer partners." },
];

const breadcrumbItems = [
  { name: "Home", url: "https://indoorplaygroundsolution.com" },
  { name: "Safety & Certifications", url: "https://indoorplaygroundsolution.com/safety-certifications" },
];

const SafetyCertifications = () => {
  return (
    <div className="min-h-screen">
      <SEOHead
        pageKey="safetyCertifications"
        dynamicTitle="ASTM TUV Certified Playground Equipment | Safety Standards"
        dynamicDescription="ASTM F1918 vs TÜV vs EN 1176 vs AS/NZS — full comparison, certified materials and compliance docs for every shipment. ISO 9001 manufacturer since 2008."
        dynamicKeywords="ASTM TUV certified playground equipment, indoor playground safety standards, ASTM F1918, EN 1176, TUV playground, CSA Z614, soft play safety"
        ogImage="/og-safety-certifications.jpg"
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
                <ShieldCheck className="w-4 h-4 mr-2" />
                Safety & Compliance Hub
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                Indoor Playground <span className="text-accent">Safety Standards & Certifications</span>
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
                Every NinescapeLand build is engineered, tested and documented to the international safety standard your market requires — <strong className="text-accent-foreground">ASTM, EN, AS/NZS, CSA, ABNT, SASO and TÜV</strong>.
              </p>
              <Button size="lg" variant="hero" asChild>
                <a href="#contact">
                  Request Compliance Pack
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Standards grid */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Recognised <strong>Safety Standards</strong> We Build To</h2>
              <p className="text-muted-foreground text-lg">Every project is manufactured and certified to the standard mandated in your destination country.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert) => (
                <Card key={cert.code} className="hover:shadow-lg transition-shadow border-l-4 border-l-accent">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <FileCheck2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold text-lg leading-tight">{cert.code}</h3>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                          <Globe2 className="w-3 h-3" /> {cert.region} · {cert.body}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{cert.scope}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ASTM vs TUV vs EN 1176 comparison */}
        <section className="py-16 md:py-20 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge className="mb-4 bg-accent/15 text-accent-foreground border-accent/30">
                <Scale className="w-4 h-4 mr-2" /> Standards Comparison
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <strong>ASTM vs TÜV vs EN 1176</strong> — Which Certification Does Your Market Need?
              </h2>
              <p className="text-muted-foreground text-lg">
                The three most-requested certification frameworks for indoor playground equipment compared side-by-side.
              </p>
            </div>

            <Card className="overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-bold text-foreground w-[180px]">Criteria</TableHead>
                      <TableHead className="font-bold text-foreground">ASTM F1918 / F1487</TableHead>
                      <TableHead className="font-bold text-foreground">EN 1176-1 to -11</TableHead>
                      <TableHead className="font-bold text-foreground">TÜV (SÜD / Rheinland)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { c: "Issuing Body", a: "ASTM International (USA)", e: "CEN — European Committee for Standardization", t: "TÜV — independent German type-test bodies" },
                      { c: "Primary Markets", a: "USA, Canada (often parallel), Latin America imports, Middle East projects requesting US spec", e: "EU, UK, Norway, Switzerland, Russia, AU/NZ (aligned with AS 4685), most international FEC projects", t: "Recognised globally as an independent stamp on top of ASTM or EN 1176" },
                      { c: "Document Type", a: "Voluntary consensus standard (often legally mandated by states/cities)", e: "Harmonised European standard, legally binding in EU member states", t: "Independent type-test certificate + factory audit" },
                      { c: "Coverage", a: "Soft-contained play (F1918), public-use playground equipment (F1487), trampoline parks (F2970)", e: "11 parts: general safety, swings, slides, climbing, surfacing, installation, inspection", t: "Verifies compliance with EN 1176, ASTM, or both — adds factory production-control audit" },
                      { c: "Impact Surfacing", a: "ASTM F1292 — critical fall height test (CFH)", e: "EN 1177 — HIC ≤ 1000 attenuation test", t: "Issues independent F1292 / EN 1177 test reports" },
                      { c: "Inspection Cadence", a: "Annual main inspection recommended; some states require monthly logs", a2: false, e: "EN 1176-7 — quarterly operational + annual main inspection mandated", t: "Factory re-audit every 12 months for ongoing certification" },
                      { c: "Indoor Soft-Play Specific", a: true, e: true, t: true },
                      { c: "Trampoline Parks", a: "Yes — ASTM F2970 (mandatory in most US states)", e: "Yes — EN 13219 partial; many EU parks adopt ASTM F2970 voluntarily", t: "Yes — TÜV certifies to F2970 / DIN EN 13219" },
                      { c: "Typical Cost to Certify", a: "US$3-8k per structure type", e: "€2.5-7k per structure type", t: "€4-12k incl. factory audit (in addition to ASTM/EN test)" },
                      { c: "NinescapeLand Delivers", a: true, e: true, t: true },
                    ].map((row, i) => (
                      <TableRow key={i} className="hover:bg-muted/30">
                        <TableCell className="font-semibold align-top">{row.c}</TableCell>
                        {(["a", "e", "t"] as const).map((k) => {
                          const v = row[k];
                          return (
                            <TableCell key={k} className="align-top text-sm text-muted-foreground">
                              {v === true ? (
                                <span className="inline-flex items-center gap-1.5 text-green-600 font-semibold">
                                  <CheckCircle2 className="w-4 h-4" /> Included
                                </span>
                              ) : v === false ? (
                                <span className="inline-flex items-center gap-1.5 text-muted-foreground/60">
                                  <X className="w-4 h-4" /> Not covered
                                </span>
                              ) : (
                                v
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>

            <div className="grid md:grid-cols-3 gap-4 mt-8">
              {[
                { title: "Selling into the USA?", body: "Order to ASTM F1918 (soft-play) or F1487 (outdoor) — and F2970 if your build includes trampolines. Many municipalities also require a third-party inspection report from a licensed CPSI." },
                { title: "Selling into Europe / UK / GCC?", body: "EN 1176 is the default — TÜV or SGS type-test reports are usually required by mall landlords and insurers before opening day." },
                { title: "Want a global trust stamp?", body: "Layer TÜV SÜD or Rheinland certification on top of ASTM/EN. It signals independent verification to investors, franchisees and insurance underwriters worldwide." },
              ].map((item) => (
                <Card key={item.title} className="border-l-4 border-l-accent">
                  <CardContent className="p-5">
                    <h3 className="font-bold mb-2 text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-10">
              <Button size="lg" variant="hero" asChild>
                <a href="#contact">
                  Get a Compliance Pack for My Market <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Materials table */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4"><strong>Material Safety</strong> & Specifications</h2>
              <p className="text-muted-foreground text-lg">Engineering-grade materials, lead-free coatings and lab-tested foams — full SDS provided with every shipment.</p>
            </div>
            <div className="space-y-4">
              {materialStandards.map((m) => (
                <Card key={m.name}>
                  <CardContent className="p-6 grid md:grid-cols-3 gap-4 items-start">
                    <div className="flex items-start gap-3">
                      <FlaskConical className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                      <h3 className="font-bold">{m.name}</h3>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p className="font-semibold text-foreground mb-1">Specification</p>
                      <p>{m.spec}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p className="font-semibold text-foreground mb-1">Why it matters</p>
                      <p>{m.benefit}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quality process */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">5-Stage <strong>Quality & Compliance Process</strong></h2>
              <p className="text-muted-foreground text-lg">From raw-material intake to on-site sign-off — every project audited at five gates.</p>
            </div>
            <div className="space-y-4">
              {qualityProcess.map((q, i) => (
                <Card key={q.step}>
                  <CardContent className="p-6 flex gap-5">
                    <div className="w-12 h-12 rounded-full bg-accent text-accent-foreground font-bold flex items-center justify-center flex-shrink-0">{i + 1}</div>
                    <div>
                      <h3 className="font-bold text-lg mb-1 flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-accent" />{q.step}</h3>
                      <p className="text-muted-foreground">{q.detail}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Safety & Certification <strong>FAQ</strong></h2>
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
          heading="Explore Safety in Action"
          intro="See how our certified equipment performs across product lines, real projects and our QC process."
          items={[
            { title: "Indoor Playground Equipment", desc: "EN 1176 / ASTM-tested soft-play, climbing and themed structures.", href: "/products/indoor-playground" },
            { title: "Trampoline Park Equipment", desc: "ASTM F2970-compliant trampoline beds, padding and enclosures.", href: "/products/trampoline-park" },
            { title: "Ninja Course Equipment", desc: "Engineered obstacles for commercial FEC and training facilities.", href: "/products/ninja-course" },
            { title: "Soft Play Equipment", desc: "Lead-free, phthalate-free padded play for malls and pre-schools.", href: "/products/soft-play" },
            { title: "Manufacturing & QC Process", desc: "Our 5-stage quality gate from raw material to on-site sign-off.", href: "/process" },
            { title: "Project Case Studies", desc: "2,000+ delivered installations with compliance certificates.", href: "/case-studies" },
          ]}
        />

        <ContactSection />
      </main>

      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default SafetyCertifications;
