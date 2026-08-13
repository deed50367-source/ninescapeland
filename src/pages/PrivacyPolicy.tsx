import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { BreadcrumbSchema, OrganizationSchema } from "@/components/StructuredData";
import { RelatedResources } from "@/components/RelatedResources";

const breadcrumbItems = [
  { name: "Home", url: "https://indoorplaygroundsolution.com" },
  { name: "Privacy Policy", url: "https://indoorplaygroundsolution.com/privacy" },
];

const LAST_UPDATED = "13 August 2026";

const PrivacyPolicy = () => (
  <div className="min-h-screen">
    <SEOHead
      pageKey="privacy"
      dynamicTitle="Privacy Policy"
      dynamicDescription="How NinescapeLand collects, uses, stores and protects the business contact data you submit through quote requests, WhatsApp and our website."
      serviceSchema={false}
    />
    <BreadcrumbSchema items={breadcrumbItems} />
    <OrganizationSchema />
    <Header />

    <main>
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl space-y-10 leading-relaxed">
          <div>
            <h2 className="text-2xl font-bold mb-3">Who we are</h2>
            <p className="text-muted-foreground">
              NinescapeLand is a commercial indoor playground, trampoline park, ninja course and soft play
              equipment manufacturer based in Wenzhou, Zhejiang, China, operating this website at
              indoorplaygroundsolution.com. We sell business-to-business: the personal data we handle is
              almost entirely business contact information submitted voluntarily by prospective and existing
              commercial clients.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">What data do we collect?</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                <strong>Data you give us:</strong> name, company, country, email address, phone or WhatsApp
                number, project details (venue size, budget range, target opening date) and any files or
                drawings you attach to an inquiry or quote request.
              </li>
              <li>
                <strong>Data collected automatically:</strong> IP address, browser and device type, referring
                URL, pages viewed and time on page, collected through cookies and analytics tags.
              </li>
              <li>
                <strong>Live chat messages:</strong> the conversation content and any contact details you
                share with our sales team through the on-site chat widget.
              </li>
            </ul>
            <p className="text-muted-foreground mt-3">
              We do not knowingly collect data from children. Our products are sold to businesses and
              institutions, not to consumers or minors.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">How do we use your data?</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>To prepare and send quotations, 3D design proposals, specifications and certificates.</li>
              <li>To answer your questions by email, phone or WhatsApp and follow up on open projects.</li>
              <li>To fulfil orders: production planning, shipping documentation and after-sales support.</li>
              <li>To improve the website, measure marketing performance and detect abuse or fraud.</li>
              <li>To meet legal, tax, export and product-safety record-keeping obligations.</li>
            </ul>
            <p className="text-muted-foreground mt-3">
              We do not sell your personal data, and we do not share it with third parties for their own
              marketing purposes.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">Who has access to your data?</h2>
            <p className="text-muted-foreground">
              Access is limited to our sales, design, production and logistics staff who need it to serve your
              project, plus service providers acting on our behalf: website and database hosting, email
              delivery, analytics (including Google Analytics and Google Ads conversion measurement), and
              messaging platforms such as WhatsApp. Freight forwarders and customs brokers receive only the
              consignee details required to ship an order.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">Cookies and tracking</h2>
            <p className="text-muted-foreground">
              We use strictly necessary cookies to keep the site working, plus analytics and advertising
              cookies to understand which pages and campaigns generate inquiries. You can block or delete
              cookies in your browser settings at any time; the quote forms will still work, but analytics
              will no longer record your visit. Where required by local law, advertising tags load only after
              consent.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">How long do we keep it?</h2>
            <p className="text-muted-foreground">
              Inquiry records are retained for up to 3 years from the last contact so we can pick up
              conversations where they left off. Order, warranty and compliance records are retained for up to
              10 years, matching our spare-parts and warranty commitments and statutory bookkeeping
              requirements. Analytics data is retained according to the platform default (currently 14 months).
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">What are your rights?</h2>
            <p className="text-muted-foreground">
              Subject to applicable law — including the GDPR for visitors in the EU/UK — you may request
              access to, correction of, or deletion of your personal data, object to or restrict its
              processing, request a portable copy, and withdraw consent for marketing at any time. Email
              <a href="mailto:sale@indoorplaygroundsolution.com" className="text-primary underline underline-offset-4 mx-1">
                sale@indoorplaygroundsolution.com
              </a>
              and we will respond within 30 days. Every marketing email includes an unsubscribe link.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">International transfers and security</h2>
            <p className="text-muted-foreground">
              Because we manufacture in China and serve clients in more than 50 countries, your data is
              transferred to and processed in China and in the regions where our hosting and analytics
              providers operate. We protect it with HTTPS encryption in transit, encrypted database storage,
              row-level access controls and role-based staff permissions. No online transmission can be
              guaranteed 100% secure, so please do not send bank credentials or identity documents through
              website forms.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">Changes and contact</h2>
            <p className="text-muted-foreground">
              We will update this page when our practices change and revise the "last updated" date above.
              Questions or requests: email{" "}
              <a href="mailto:sale@indoorplaygroundsolution.com" className="text-primary underline underline-offset-4">
                sale@indoorplaygroundsolution.com
              </a>{" "}
              or WhatsApp{" "}
              <a href="https://wa.me/8618969753002" target="_blank" rel="noopener" className="text-primary underline underline-offset-4">
                +86 189 6975 3002
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <RelatedResources
        heading="Company & Compliance Information"
        intro="Other pages covering how we operate, certify and support every project."
        items={[
          { title: "Terms of Service", desc: "Quotation validity, payment terms, delivery and warranty scope.", href: "/terms" },
          { title: "Safety Certifications", desc: "ASTM, EN 1176, TÜV and SGS test reports for our equipment.", href: "/safety-certifications" },
          { title: "Maintenance & Warranty", desc: "Warranty matrix, spare-part guarantee and inspection schedule.", href: "/maintenance-warranty" },
          { title: "About NinescapeLand", desc: "Our factory, team and 16+ year manufacturing history.", href: "/about-us" },
          { title: "Contact Our Team", desc: "Get a free 3D design and quote within 24 hours.", href: "/contact" },
        ]}
      />
    </main>

    <Footer />
  </div>
);

export default PrivacyPolicy;
