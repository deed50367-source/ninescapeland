import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, CheckCircle2, Layers, ClipboardCheck, ShieldCheck } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SpecComparisonTable } from "@/components/SpecComparisonTable";
import { SourcesReferences } from "@/components/SourcesReferences";
import { ProductInquiryForm } from "@/components/product-detail/ProductInquiryForm";
import { productImages } from "@/config/galleryImages";
import { b13Pages, b13Language, b13Path, b13Metadata, B13_BASE_URL, B13_DATE, B13_LANGUAGES } from "@/config/weeklyAggregationB13Registry";
import english from "@/content/weekly-2026-10-30/en.json";
import { b13Media, b13ImageNotes, b13ParentLabels, b13ParentSlugs } from "@/config/weeklyAggregationB13Media";

type Content = typeof english;
const bundles = import.meta.glob<{ default: Content }>("../content/weekly-2026-10-30/*.json", { eager: true });
const sources = [
  { label: "ASTM F1918-21", publisher: "ASTM International", url: "https://store.astm.org/f1918-21.html" },
  { label: "Public Playground Safety Handbook", publisher: "U.S. Consumer Product Safety Commission", url: "https://www.cpsc.gov/Playground-Handbook" },
  { label: "ADA Standards for Accessible Design", publisher: "U.S. Department of Justice", url: "https://www.ada.gov/law-and-regs/design-standards/2010-stds/" },
];
const icons = [ClipboardCheck, Layers, ShieldCheck, CheckCircle2];

export default function WeeklyAggregationPageB13({ slug }: { slug: keyof Content }) {
  const { pathname } = useLocation();
  const language = b13Language(pathname);
  const content = bundles[`../content/weekly-2026-10-30/${language}.json`]?.default ?? english;
  const page = content[slug];
  const registry = b13Pages.find(item => item.slug === slug);
  if (!page || !registry) return null;
  const ui = page.ui;
  const metadata = b13Metadata(page.metaTitle, page.metaDescription);
  const canonical = `${B13_BASE_URL}${b13Path(slug, language)}`;
  const hero = b13Media[page.imageKey as keyof typeof b13Media] ?? productImages.indoorPlayground;
  const gallery = [hero, productImages.indoorPlayground, productImages.softPlay];
  const schemaImage = hero.startsWith("http") ? hero : `${B13_BASE_URL}${hero}`;
  const related = b13Pages.filter(item => item.slug !== slug);
  const schema = {
    "@context": "https://schema.org", "@graph": [
      { "@type": "WebPage", "@id": `${canonical}#page`, url: canonical, name: page.title, description: metadata.description, inLanguage: language, dateModified: B13_DATE, breadcrumb: { "@id": `${canonical}#breadcrumb` }, mainEntity: { "@id": `${canonical}#article` } },
      { "@type": "Article", "@id": `${canonical}#article`, headline: page.title, description: metadata.description, mainEntityOfPage: canonical, inLanguage: language, image: schemaImage, datePublished: B13_DATE, dateModified: B13_DATE, author: { "@type": "Organization", name: "NinescapeLand", url: B13_BASE_URL }, publisher: { "@type": "Organization", name: "NinescapeLand", url: B13_BASE_URL }, citation: sources.map(source => source.url), about: page.frameworkTitle },
      { "@type": "BreadcrumbList", "@id": `${canonical}#breadcrumb`, itemListElement: [{ "@type": "ListItem", position: 1, name: ui.home, item: `${B13_BASE_URL}${language === "en" ? "/" : `/${language}`}` }, { "@type": "ListItem", position: 2, name: ui.products, item: `${B13_BASE_URL}${b13Path("products", language)}` }, { "@type": "ListItem", position: 3, name: page.title, item: canonical }] },
      { "@type": "ItemList", name: page.equipmentTitle, itemListElement: page.equipment.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.title, description: item.desc })) },
    ],
  };
  return <div className="min-h-screen bg-background text-foreground" dir={language === "ar" ? "rtl" : "ltr"}>
    <Helmet>
      <html lang={language} dir={language === "ar" ? "rtl" : "ltr"} />
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={metadata.title} /><meta property="og:description" content={metadata.description} />
      <meta property="og:url" content={canonical} /><meta property="og:type" content="article" /><meta property="og:locale" content={language} />
      <meta name="twitter:card" content="summary" /><meta name="twitter:title" content={metadata.title} /><meta name="twitter:description" content={metadata.description} />
      <meta property="article:published_time" content={B13_DATE} /><meta property="article:modified_time" content={B13_DATE} />
      {B13_LANGUAGES.map(lang => <link key={lang} rel="alternate" hrefLang={lang} href={`${B13_BASE_URL}${b13Path(slug, lang)}`} />)}
      <link rel="alternate" hrefLang="x-default" href={`${B13_BASE_URL}/${slug}`} />
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
    <Header />
    <main>
      <section className="relative overflow-hidden bg-hero py-14 md:py-20">
        <img src={hero} alt={page.imageAlt} width="1440" height="800" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 hero-overlay" />
        <div className="container-wide relative z-10">
          <nav aria-label={ui.home} className="mb-6 flex flex-wrap gap-2 text-sm text-hero-foreground/80"><Link to={language === "en" ? "/" : `/${language}`}>{ui.home}</Link><span>/</span><Link to={b13Path("products", language)}>{ui.products}</Link></nav>
          <p className="mb-4 font-semibold text-accent">{page.kicker}</p>
          <h1 className="max-w-4xl font-heading text-3xl font-bold leading-tight text-hero-foreground md:text-5xl">{page.title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-hero-foreground/90 md:text-lg">{page.intro}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button variant="hero" size="lg" asChild><a href="#inquiry-form">{ui.design}<ArrowRight className="ms-2 h-4 w-4 shrink-0" /></a></Button>
            <Button variant="heroOutline" size="lg" asChild><a href="#spec-table-heading">{ui.compare}</a></Button>
          </div>
        </div>
      </section>
      <div className="border-b border-border bg-muted/30 py-4"><div className="container-wide flex flex-wrap justify-between gap-2 text-sm text-muted-foreground"><span>{ui.author}</span><time dateTime={B13_DATE}>{ui.updated}</time></div></div>
      <section className="py-12 md:py-16"><div className="container-wide max-w-5xl"><h2 className="font-heading text-2xl font-bold md:text-3xl">{page.answerQuestion}</h2><p className="mt-4 border-s-2 border-primary ps-5 text-lg leading-8 text-muted-foreground">{page.answer}</p></div></section>
      <section className="bg-muted/30 py-14 md:py-20" id="framework"><div className="container-wide">
        <h2 className="font-heading text-2xl font-bold md:text-4xl">{page.frameworkTitle}</h2>
        <ol className="mt-8 grid gap-6 md:grid-cols-2">{page.framework.map((item, index) => <li key={item.title} className="flex gap-4 border-t border-border pt-5"><span className="font-heading text-3xl font-bold text-primary">{String(index + 1).padStart(2, "0")}</span><div><h3 className="font-heading text-xl font-semibold">{item.title}</h3><p className="mt-3 leading-7 text-muted-foreground">{item.desc}</p></div></li>)}</ol>
      </div></section>
      <section className="py-14 md:py-20"><div className="container-wide"><h2 className="font-heading text-2xl font-bold md:text-4xl">{page.equipmentTitle}</h2><div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{page.equipment.map((item,index) => { const Icon = icons[index] ?? CheckCircle2; return <article key={item.title} className="rounded-md border border-border p-5"><Icon className="mb-4 h-6 w-6 text-primary" /><h3 className="font-heading text-lg font-semibold">{item.title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{item.desc}</p></article>; })}</div></div></section>
      <section className="bg-muted/30 py-14"><div className="container-wide"><h2 className="font-heading text-2xl font-bold md:text-4xl">{ui.gallery}</h2><p className="mt-3 max-w-3xl text-muted-foreground">{b13ImageNotes[language]}</p><div className="mt-7 grid gap-5 md:grid-cols-3">{gallery.map((src,index) => <figure key={`${src}-${index}`}><img src={src} alt={`${page.imageAlt} ${index + 1}`} width="800" height="600" loading="lazy" className="aspect-[4/3] w-full rounded-md bg-card object-contain" /><figcaption className="mt-3 text-sm leading-6 text-muted-foreground">{page.captions[index]}</figcaption></figure>)}</div></div></section>
      <SpecComparisonTable heading={page.tableTitle} caption={page.tableTitle} columns={page.columns} rows={page.rows} footnote={page.tableNote} />
      <section className="border-y border-border py-12"><div className="container-wide"><h2 className="font-heading text-2xl font-bold">{ui.relatedTitle}</h2><div className="mt-5 flex flex-wrap gap-3">{related.map(item => <Button key={item.slug} variant="outline" asChild className="h-auto whitespace-normal text-start"><Link to={b13Path(item.slug,language)}>{item.labels[language]}</Link></Button>)}{registry.parents.map(parent => <Button key={parent} variant="outline" asChild className="h-auto whitespace-normal text-start"><Link to={b13Path(parent,language)}>{b13ParentLabels[language][b13ParentSlugs.indexOf(parent)]}</Link></Button>)}</div></div></section>
      <section className="py-14 md:py-20"><div className="container-wide max-w-4xl"><h2 className="font-heading text-2xl font-bold md:text-4xl">{ui.faqTitle}</h2><Accordion type="single" collapsible className="mt-6">{page.faq.map((item,index) => <AccordionItem value={String(index)} key={item.title}><AccordionTrigger className="text-start text-lg">{item.title}</AccordionTrigger><AccordionContent className="text-base leading-7 text-muted-foreground">{item.desc}</AccordionContent></AccordionItem>)}</Accordion></div></section>
      <SourcesReferences heading={ui.sourcesTitle} intro={ui.sourcesIntro} sources={sources} asOf="October 2026" />
      <ProductInquiryForm productName={page.title} productSlug={slug} />
    </main>
    <Footer /><FloatingCTA />
  </div>;
}