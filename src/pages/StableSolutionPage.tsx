import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { ProductInquiryForm } from "@/components/product-detail/ProductInquiryForm";


type Metric = {
  value: string;
  label: string;
};

type PageItem = {
  title: string;
  desc: string;
};

type RelatedLink = {
  label: string;
  href: string;
};

export type StableSolutionPageProps = {
  slug: string;
  title: string;
  kicker: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  metrics: Metric[];
  frameworkTitle: string;
  frameworkIntro: string;
  framework: PageItem[];
  equipmentTitle: string;
  equipmentIntro: string;
  equipment: PageItem[];
  audienceTitle: string;
  audienceIntro: string;
  audience: PageItem[];
  related: RelatedLink[];
  faq: PageItem[];
};

const siteName = "NinescapeLand";
const baseUrl = "https://indoorplaygroundsolution.com";
const whatsappUrl = "https://wa.me/8615058782901";

const upsertMeta = (selector: string, create: () => HTMLMetaElement, content: string) => {
  const existing = document.head.querySelector<HTMLMetaElement>(selector);
  const meta = existing ?? create();
  meta.setAttribute("content", content.trim());
  if (!existing) document.head.appendChild(meta);
};

const upsertLink = (selector: string, href: string) => {
  const existing = document.head.querySelector<HTMLLinkElement>(selector);
  const link = existing ?? document.createElement("link");
  link.setAttribute("rel", "canonical");
  link.setAttribute("href", href);
  if (!existing) document.head.appendChild(link);
};

export const StableSolutionPage = ({
  slug,
  title,
  kicker,
  description,
  primaryCta,
  secondaryCta,
  metrics,
  frameworkTitle,
  frameworkIntro,
  framework,
  equipmentTitle,
  equipmentIntro,
  equipment,
  audienceTitle,
  audienceIntro,
  audience,
  related,
  faq,
}: StableSolutionPageProps) => {
  const canonicalUrl = `${baseUrl}/${slug}`;
  const pageTitle = `${title} | ${siteName}`.slice(0, 58).trim();
  const pageDescription = description.slice(0, 158).trim();

  useEffect(() => {
    document.documentElement.lang = "en";
    document.documentElement.dir = "ltr";
    document.title = pageTitle;
    upsertMeta('meta[name="description"]', () => {
      const meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      return meta;
    }, pageDescription);
    upsertMeta('meta[property="og:title"]', () => {
      const meta = document.createElement("meta");
      meta.setAttribute("property", "og:title");
      return meta;
    }, pageTitle);
    upsertMeta('meta[property="og:description"]', () => {
      const meta = document.createElement("meta");
      meta.setAttribute("property", "og:description");
      return meta;
    }, pageDescription);
    upsertMeta('meta[property="og:url"]', () => {
      const meta = document.createElement("meta");
      meta.setAttribute("property", "og:url");
      return meta;
    }, canonicalUrl);
    upsertMeta('meta[name="twitter:title"]', () => {
      const meta = document.createElement("meta");
      meta.setAttribute("name", "twitter:title");
      return meta;
    }, pageTitle);
    upsertMeta('meta[name="twitter:description"]', () => {
      const meta = document.createElement("meta");
      meta.setAttribute("name", "twitter:description");
      return meta;
    }, pageDescription);
    upsertLink('link[rel="canonical"]', canonicalUrl);
  }, [canonicalUrl, pageDescription, pageTitle]);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.title,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.desc,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />

      <main>
        <section className="bg-primary py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="max-w-4xl">
              <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-primary-foreground/80">{kicker}</p>
              <h1 className="font-heading text-3xl font-bold leading-tight text-primary-foreground md:text-5xl">
                {title}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-primary-foreground/90 md:text-lg">
                {description}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a className="inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:opacity-90" href="#inquiry-form">
                  {primaryCta}
                </a>
                <a className="inline-flex min-h-11 items-center justify-center rounded-md border border-primary-foreground/35 px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/10" href={whatsappUrl}>
                  Chat on WhatsApp
                </a>
                <a className="inline-flex min-h-11 items-center justify-center rounded-md border border-primary-foreground/35 px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/10" href="#framework">
                  {secondaryCta}
                </a>
              </div>

            </div>
          </div>
        </section>

        <section className="border-b border-border bg-muted/40 py-8" aria-label="Project metrics">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 md:grid-cols-4 md:px-6">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-md border border-border bg-background p-5">
                <div className="font-heading text-2xl font-bold text-primary">{metric.value}</div>
                <div className="mt-1 text-sm leading-5 text-muted-foreground">{metric.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="framework" className="scroll-mt-20 py-14 md:py-20">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">Design Framework</p>
              <h2 className="mt-3 font-heading text-2xl font-bold md:text-4xl">{frameworkTitle}</h2>
              <p className="mt-4 leading-7 text-muted-foreground">{frameworkIntro}</p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {framework.map((item) => (
                <article key={item.title} className="rounded-md border border-border bg-background p-5">
                  <h3 className="font-heading text-lg font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-muted/35 py-14 md:py-20">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">Equipment Mix</p>
              <h2 className="mt-3 font-heading text-2xl font-bold md:text-4xl">{equipmentTitle}</h2>
              <p className="mt-4 leading-7 text-muted-foreground">{equipmentIntro}</p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {equipment.map((item) => (
                <article key={item.title} className="rounded-md border border-border bg-background p-5">
                  <h3 className="font-heading text-lg font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">Best-Fit Buyers</p>
              <h2 className="mt-3 font-heading text-2xl font-bold md:text-4xl">{audienceTitle}</h2>
              <p className="mt-4 leading-7 text-muted-foreground">{audienceIntro}</p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {audience.map((item) => (
                <article key={item.title} className="rounded-md border border-border bg-background p-5">
                  <h3 className="font-heading text-lg font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-muted/35 py-10">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <h2 className="font-heading text-xl font-bold">Related solutions</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {related.map((link) => (
                <a key={link.href} className="rounded-md border border-border bg-background px-4 py-2 text-sm font-medium hover:border-primary hover:text-primary" href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20">
          <div className="mx-auto max-w-4xl px-4 md:px-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">FAQ</p>
            <h2 className="mt-3 font-heading text-2xl font-bold md:text-4xl">Procurement Questions</h2>
            <div className="mt-8 space-y-4">
              {faq.map((item) => (
                <article key={item.title} className="rounded-md border border-border bg-background p-5">
                  <h3 className="font-heading text-lg font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary py-12">
          <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 md:flex-row md:items-center md:justify-between md:px-6">
            <div>
              <h2 className="font-heading text-2xl font-bold text-primary-foreground">Request a stable project plan</h2>
              <p className="mt-2 text-primary-foreground/85">Share the room size, age group and target opening date for a practical layout proposal.</p>
            </div>
            <a className="inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:opacity-90" href={whatsappUrl}>
              Contact WhatsApp
            </a>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingCTA />
    </div>
  );
};