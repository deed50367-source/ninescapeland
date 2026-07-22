import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const AdsPrivacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Privacy Policy — NinescapeLand</title>
        <meta name="description" content="How NinescapeLand collects, uses, and protects information submitted through our advertising landing pages and inquiry forms." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://indoorplaygroundsolution.com/lp/privacy" />
      </Helmet>

      <header className="border-b bg-background">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg">
            <span className="text-primary">Ninescape</span>Land
          </Link>
          <Link to="/contact" className="text-sm text-primary hover:underline">
            Contact
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-3xl prose prose-slate dark:prose-invert">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <section className="space-y-6 text-sm md:text-base leading-relaxed">
          <div>
            <h2 className="text-xl font-bold mb-2">1. Who we are</h2>
            <p>
              NinescapeLand is a Chinese manufacturer of indoor playground, trampoline park, ninja course
              and soft play equipment, serving B2B customers worldwide. This policy explains how we
              handle information submitted through our advertising landing pages
              (<code className="text-xs">/lp/*</code>) and inquiry forms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">2. Information we collect</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Contact details you submit: name, business email, phone/WhatsApp, company, country.</li>
              <li>Project details you submit: project type, size, timeline, budget, message.</li>
              <li>Technical data: IP address, browser/device, referring URL, ad campaign identifier.</li>
              <li>Interaction events: page views, form submissions, WhatsApp clicks, email clicks — collected via Google Analytics 4 and Google Ads conversion tracking.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">3. How we use it</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>To reply to your quote request and provide a customized proposal.</li>
              <li>To measure and improve our advertising campaigns.</li>
              <li>To comply with legal, tax and export-documentation obligations.</li>
            </ul>
            <p className="mt-2">We do not sell your personal data to third parties.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">4. Third-party services</h2>
            <p>We use these processors, each under their own privacy terms:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Google Analytics 4 &amp; Google Ads — traffic and conversion measurement.</li>
              <li>Supabase — secure database hosting for inquiries.</li>
              <li>Meta / WhatsApp Business — if you initiate a WhatsApp chat with us.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">5. Data retention</h2>
            <p>
              Inquiry records are kept for up to 5 years after last contact for commercial and
              after-sales purposes, then deleted or anonymized. Analytics data follows Google's
              default retention (up to 14 months).
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">6. Your rights</h2>
            <p>
              You may request access, correction, or deletion of your personal data at any time by
              emailing{" "}
              <a href="mailto:sale@indoorplaygroundsolution.com" className="text-primary hover:underline">
                sale@indoorplaygroundsolution.com
              </a>
              . We will respond within 30 days.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">7. Cookies &amp; tracking</h2>
            <p>
              We use first-party and Google cookies to measure ad performance. You can disable
              cookies in your browser settings; some site features may then be limited.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">8. Contact</h2>
            <p>
              NinescapeLand · Wenzhou, Zhejiang, China ·{" "}
              <a href="mailto:sale@indoorplaygroundsolution.com" className="text-primary hover:underline">
                sale@indoorplaygroundsolution.com
              </a>
            </p>
          </div>
        </section>

        <div className="mt-12 pt-6 border-t">
          <Link to="/" className="text-sm text-primary hover:underline">
            ← Back to homepage
          </Link>
        </div>
      </main>
    </div>
  );
};

export default AdsPrivacy;
