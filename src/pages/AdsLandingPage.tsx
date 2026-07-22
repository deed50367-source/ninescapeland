import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import {
  ShieldCheck,
  Award,
  Factory,
  Globe,
  Clock,
  CheckCircle2,
  MessageCircle,
  Mail,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import NotFound from "@/pages/NotFound";
import { getAdsLandingConfig, heroAboutUs } from "@/config/adsLandingPages";
import { AdsInquiryForm, trackAdsMicroConversion } from "@/components/ads/AdsInquiryForm";

const WHATSAPP_URL = "https://wa.me/8615058782901";
const EMAIL = "sale@indoorplaygroundsolution.com";
const baseUrl = "https://indoorplaygroundsolution.com";

const certifications = ["ASTM", "TUV", "EN1176", "CE", "ISO9001", "SGS"];

const trustStats = [
  { icon: Clock, value: "15+", label: "Years Manufacturing" },
  { icon: CheckCircle2, value: "2,000+", label: "Projects Delivered" },
  { icon: Globe, value: "50+", label: "Countries Served" },
  { icon: Factory, value: "50,000㎡", label: "Own Factory" },
];

const AdsLandingPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const config = slug ? getAdsLandingConfig(slug) : undefined;

  useEffect(() => {
    if (config && typeof window !== "undefined") {
      const w = window as unknown as { gtag?: (...args: unknown[]) => void; dataLayer?: unknown[] };
      try {
        if (typeof w.gtag === "function") {
          w.gtag("event", "lp_view", { campaign_slug: config.campaign });
        }
        if (Array.isArray(w.dataLayer)) {
          w.dataLayer.push({ event: "lp_view", campaign_slug: config.campaign });
        }
      } catch {
        /* no-op */
      }
    }
  }, [config]);

  if (!config) return <NotFound />;

  const canonical = `${baseUrl}/lp/${config.slug}`;
  const onWhatsApp = () => trackAdsMicroConversion("whatsapp", config.campaign);
  const onEmail = () => trackAdsMicroConversion("email", config.campaign);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>{config.seoTitle}</title>
        <meta name="description" content={config.seoDescription} />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={config.seoTitle} />
        <meta property="og:description" content={config.seoDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: config.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          })}
        </script>
      </Helmet>

      {/* 1. Certification top bar */}
      <div className="bg-primary text-primary-foreground text-xs md:text-sm">
        <div className="container mx-auto px-4 py-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
          <span className="font-semibold">Certified Manufacturer:</span>
          {certifications.map((c) => (
            <span key={c} className="inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* 2. Simplified nav (no language switcher, no mega menu) */}
      <header className="border-b bg-background sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg">
            <span className="text-primary">Ninescape</span>Land
          </Link>
          <div className="flex items-center gap-2">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onWhatsApp}
              className="hidden sm:inline-flex"
            >
              <Button variant="outline" size="sm" className="gap-1.5">
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </Button>
            </a>
            <a href="#inquiry">
              <Button size="sm">Get Free Quote</Button>
            </a>
          </div>
        </div>
      </header>

      {/* 3. Hero + Inline Form (with campaign background image) */}
      <section id="inquiry" className="relative py-10 md:py-16 overflow-hidden">
        {config.heroImage && (
          <>
            <img
              src={config.heroImage}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-background/70" />
          </>
        )}
        <div className="relative container mx-auto px-4 grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <Badge variant="secondary" className="mb-4">
              15+ Years · 2,000+ Projects · 50+ Countries
            </Badge>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
              {config.h1}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">{config.subhead}</p>

            <ul className="mt-6 space-y-2.5">
              {config.heroBullets.map((b) => (
                <li key={b} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base font-medium">{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#inquiry-form">
                <Button size="lg" className="gap-2">
                  Get Free Quote
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onWhatsApp}
              >
                <Button size="lg" variant="outline" className="gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Chat on WhatsApp
                </Button>
              </a>
            </div>
          </div>

          <div id="inquiry-form">
            <AdsInquiryForm campaign={config.campaign} projectTypes={config.projectTypes} />
          </div>
        </div>
      </section>

      {/* 4. Trust bar */}
      <section className="border-y bg-muted/30">
        <div className="container mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {trustStats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="text-center">
              <Icon className="w-6 h-6 mx-auto text-primary mb-2" />
              <div className="text-2xl md:text-3xl font-bold">{value}</div>
              <div className="text-xs md:text-sm text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Certification logos */}
      <section className="py-10 bg-background">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-5">
            International Certifications &amp; Standards
          </p>
          <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4">
            {certifications.map((c) => (
              <div
                key={c}
                className="px-4 py-2 rounded-lg border-2 border-border bg-card text-sm font-bold tracking-wide flex items-center gap-1.5"
              >
                <Award className="w-4 h-4 text-primary" />
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Product lines — link out to product pages */}
      <section className="py-14 md:py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl md:text-4xl font-bold">Our Complete Product Range</h2>
            <p className="text-muted-foreground mt-3">
              All product lines are engineered, manufactured and shipped from our own factory. Click
              any category to see the full catalog.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {config.productLines.map((p) => (
              <Link
                key={p.title}
                to={p.href}
                className="group bg-card rounded-2xl border overflow-hidden hover:border-primary hover:shadow-lg transition-all flex flex-col"
              >
                {p.image && (
                  <div className="aspect-[16/10] overflow-hidden bg-muted">
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-sm text-muted-foreground flex-1">{p.description}</p>
                  <div className="mt-4 text-sm font-semibold text-primary inline-flex items-center gap-1">
                    View products
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Why us — with factory backdrop */}
      <section className="relative py-14 md:py-20 overflow-hidden">
        <img
          src={heroAboutUs}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/92" />
        <div className="relative container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl md:text-4xl font-bold">Why NinescapeLand</h2>
            <p className="text-muted-foreground mt-3">
              Direct-from-factory pricing, engineering-grade quality, and export-ready documentation
              — every project, every country.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {config.whyUs.map((w) => (
              <div key={w.title} className="bg-card rounded-2xl border p-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="font-bold mb-1.5">{w.title}</h3>
                <p className="text-sm text-muted-foreground">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Process */}
      <section className="py-14 md:py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl md:text-4xl font-bold">Our 5-Step Delivery Process</h2>
            <p className="text-muted-foreground mt-3">
              From first email to grand opening — a proven workflow used on 2,000+ projects.
            </p>
          </div>
          <div className="grid md:grid-cols-5 gap-4">
            {config.process.map((s) => (
              <div key={s.step} className="bg-card rounded-2xl border p-5">
                <div className="text-3xl font-black text-primary/30 mb-1">{s.step}</div>
                <h3 className="font-bold mb-1.5">{s.title}</h3>
                <p className="text-xs text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Case studies */}
      <section className="py-14 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl md:text-4xl font-bold">International Clients Trust Us</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {config.cases.map((c) => (
              <div key={c.title} className="bg-card rounded-2xl border overflow-hidden shadow-sm">
                {c.image && (
                  <div className="aspect-[16/10] overflow-hidden bg-muted">
                    <img src={c.image} alt={c.title} loading="lazy" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{c.flag}</span>
                    <span className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">
                      {c.country}
                    </span>
                  </div>
                  <h3 className="font-bold mt-2 mb-3">{c.title}</h3>
                  <p className="text-sm text-muted-foreground italic">"{c.quote}"</p>
                  <p className="text-xs text-muted-foreground mt-3 font-semibold">— {c.client}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section className="py-14 md:py-20 bg-muted/20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-4xl font-bold">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {config.faqs.map((f) => (
              <details
                key={f.q}
                className="group bg-card border rounded-xl p-5 open:shadow-md transition-shadow"
              >
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-start gap-3">
                  <span>{f.q}</span>
                  <span className="text-primary text-xl leading-none shrink-0 group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Bottom CTA */}
      <section className="py-14 md:py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-2xl md:text-4xl font-bold">Ready to Start Your Project?</h2>
          <p className="mt-3 opacity-90">
            Get a free 3D design concept and detailed quote within 24 hours. No commitment.
          </p>
          <div className="mt-7 flex flex-wrap gap-3 justify-center">
            <a href="#inquiry-form">
              <Button size="lg" variant="secondary" className="gap-2">
                Get Free Quote
                <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onWhatsApp}
            >
              <Button
                size="lg"
                variant="outline"
                className="gap-2 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </Button>
            </a>
            <a href={`mailto:${EMAIL}`} onClick={onEmail}>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <Mail className="w-4 h-4" />
                Email Us
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* 12. Slim footer */}
      <footer className="bg-card border-t mt-auto">
        <div className="container mx-auto px-4 py-8 text-sm text-muted-foreground">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              &copy; {new Date().getFullYear()} NinescapeLand — Custom Playground Equipment
              Manufacturer since 2008.
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/about-us" className="hover:text-primary">About</Link>
              <Link to="/products" className="hover:text-primary">Products</Link>
              <Link to="/contact" className="hover:text-primary">Contact</Link>
              <Link to="/safety-certifications" className="hover:text-primary">Warranty</Link>
              <Link to="/lp/privacy" className="hover:text-primary">Privacy Policy</Link>
              <a
                href={`mailto:${EMAIL}`}
                onClick={onEmail}
                className="hover:text-primary"
              >
                {EMAIL}
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile sticky CTA */}
      <div className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-background/95 backdrop-blur border-t p-2 flex gap-2">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onWhatsApp}
          className="flex-1"
        >
          <Button variant="outline" className="w-full gap-1.5">
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </Button>
        </a>
        <a href="#inquiry-form" className="flex-1">
          <Button className="w-full">Get Quote</Button>
        </a>
      </div>
    </div>
  );
};

export default AdsLandingPage;
