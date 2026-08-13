import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { BreadcrumbSchema, OrganizationSchema } from "@/components/StructuredData";
import { RelatedResources } from "@/components/RelatedResources";

const breadcrumbItems = [
  { name: "Home", url: "https://indoorplaygroundsolution.com" },
  { name: "Terms of Service", url: "https://indoorplaygroundsolution.com/terms" },
];

const LAST_UPDATED = "13 August 2026";

const TermsOfService = () => (
  <div className="min-h-screen">
    <SEOHead
      pageKey="terms"
      dynamicTitle="Terms of Service"
      dynamicDescription="NinescapeLand terms of service: website use, quotation validity, order and payment terms, delivery, warranty scope and limits of liability for equipment buyers."
      serviceSchema={false}
    />
    <BreadcrumbSchema items={breadcrumbItems} />
    <OrganizationSchema />
    <Header />

    <main>
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl space-y-10 leading-relaxed">
          <div>
            <h2 className="text-2xl font-bold mb-3">1. Scope of these terms</h2>
            <p className="text-muted-foreground">
              These terms govern your use of indoorplaygroundsolution.com and the pre-contract information we
              publish on it. NinescapeLand manufactures commercial indoor playground, trampoline park, ninja
              course and soft play equipment and sells business-to-business. Every confirmed order is governed
              by the signed sales contract, proforma invoice and technical annexes for that project; where they
              conflict with this page, the signed contract prevails.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">2. Using this website</h2>
            <p className="text-muted-foreground">
              You may browse, download and share our pages for the purpose of evaluating, specifying or
              purchasing our equipment. You may not scrape the site to rebuild our catalogue, resell our
              renders or photographs, misrepresent our products as your own manufacture, or attempt to access
              the admin area or database. All product photography, 3D renders, drawings, copy and layout on
              this site remain the property of NinescapeLand.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">3. Quotations, prices and 3D designs</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Prices shown or discussed on this website are indicative only and are not a binding offer.</li>
              <li>
                A written quotation is valid for 30 days unless stated otherwise, and is subject to raw
                material, freight and exchange-rate movement after that period.
              </li>
              <li>
                Free 3D concept designs are provided to support your project evaluation. Concept designs remain
                our intellectual property until an order is placed; they may not be passed to another
                manufacturer for quotation or production.
              </li>
              <li>
                Layouts, equipment counts, capacity figures and ROI examples are estimates based on the
                information you supply and are not a guarantee of business performance.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">4. Orders, payment and production</h2>
            <p className="text-muted-foreground">
              Orders are confirmed when both parties sign the sales contract or proforma invoice and the
              deposit is received. Standard terms are a deposit on order with the balance before shipment,
              unless the contract states otherwise. Production lead time starts from receipt of the deposit and
              your written approval of the final design and colour scheme; changes requested after approval may
              affect both price and lead time.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">5. Delivery, installation and site conditions</h2>
            <p className="text-muted-foreground">
              Shipping terms (EXW, FOB, CIF or DDP), port and incoterm are specified in the contract. Lead
              times are good-faith estimates and may be affected by shipping-line schedules, customs clearance
              and events outside our control. The buyer is responsible for import duties and local taxes unless
              agreed otherwise, for confirming that the venue's floor loading, ceiling height, fire exits and
              local permits suit the approved layout, and for compliance with municipal inspection requirements
              in the country of installation. We supply installation drawings and remote or on-site supervision
              as agreed in the contract.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">6. Warranty and after-sales</h2>
            <p className="text-muted-foreground">
              Equipment is covered by the warranty matrix supplied with each order confirmation — typically 3
              years on galvanised steel structure and 1 year on soft-play vinyl, foam, plastics, trampoline
              beds, ropes and electrical components — plus a 10-year spare-parts availability commitment on
              components we manufacture in-house. Warranty excludes normal wear of consumables, misuse,
              overloading beyond rated capacity, unauthorised modification, damage during buyer-arranged
              transport or installation, and failure to perform the documented maintenance and inspection
              routine. Full detail is on our{" "}
              <a href="/maintenance-warranty" className="text-primary underline underline-offset-4">
                maintenance and warranty page
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">7. Safety and operator responsibility</h2>
            <p className="text-muted-foreground">
              Our equipment is manufactured and tested to international standards including ASTM F1487, ASTM
              F2970, EN 1176 and EN 13219, and is certified before shipment. Ongoing operational safety —
              supervision ratios, house rules, daily and weekly inspections, participant briefing, insurance
              and the statutory annual main inspection — is the operator's responsibility in the jurisdiction
              where the facility operates.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">8. Limitation of liability</h2>
            <p className="text-muted-foreground">
              To the maximum extent permitted by law, our total liability arising from an order is limited to
              the contract value of the affected equipment, and we are not liable for indirect or consequential
              loss including lost revenue, lost profit, delayed opening or loss of goodwill. Nothing in these
              terms excludes liability that cannot be excluded under applicable law.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">9. Governing law and contact</h2>
            <p className="text-muted-foreground">
              Unless the signed contract specifies otherwise, these terms are governed by the laws of the
              People's Republic of China, and the parties will attempt good-faith negotiation before formal
              proceedings. Questions about these terms: email{" "}
              <a href="mailto:sale@indoorplaygroundsolution.com" className="text-primary underline underline-offset-4">
                sale@indoorplaygroundsolution.com
              </a>{" "}
              or WhatsApp{" "}
              <a href="https://wa.me/8618969753002" target="_blank" rel="noopener" className="text-primary underline underline-offset-4">
                +86 189 6975 3002
              </a>
              . We may update these terms and will revise the date above when we do.
            </p>
          </div>
        </div>
      </section>

      <RelatedResources
        heading="Before You Order"
        intro="The documents and pages most buyers review alongside these terms."
        items={[
          { title: "Privacy Policy", desc: "How we handle the contact and project data you send us.", href: "/privacy" },
          { title: "Safety Certifications", desc: "ASTM, EN 1176, TÜV and SGS reports available per order.", href: "/safety-certifications" },
          { title: "Maintenance & Warranty", desc: "Warranty matrix, exclusions and spare-part guarantee.", href: "/maintenance-warranty" },
          { title: "Manufacturing Process", desc: "Our 5-stage quality gate from raw material to sign-off.", href: "/process" },
          { title: "Request a Quote", desc: "Free 3D design and quotation within 24 hours.", href: "/contact" },
        ]}
      />
    </main>

    <Footer />
  </div>
);

export default TermsOfService;
