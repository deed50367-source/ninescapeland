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
import { EEATSignature } from "@/components/EEATSignature";
import { ArrowRight, CheckCircle2, HelpCircle } from "lucide-react";

type SimpleItem = {
  title: string;
  desc: string;
};

type StatItem = {
  value: string;
  label: string;
};

type FAQItem = {
  question: string;
  answer: string;
};

type RelatedLink = {
  label: string;
  to: string;
};

export type AggregationLandingPageProps = {
  seoKey: string;
  slug: string;
  badge: string;
  title: string;
  highlight: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  stats: StatItem[];
  principlesTitle: string;
  principlesIntro: string;
  principles: SimpleItem[];
  productsTitle: string;
  productsIntro: string;
  products: SimpleItem[];
  useCasesTitle: string;
  useCasesIntro: string;
  useCases: SimpleItem[];
  related: RelatedLink[];
  faq: FAQItem[];
};

export const AggregationLandingPage = ({
  seoKey,
  slug,
  badge,
  title,
  highlight,
  description,
  primaryCta,
  secondaryCta,
  stats,
  principlesTitle,
  principlesIntro,
  principles,
  productsTitle,
  productsIntro,
  products,
  useCasesTitle,
  useCasesIntro,
  useCases,
  related,
  faq,
}: AggregationLandingPageProps) => {
  const { localizedPath } = useLocalizedPath();
  const url = `https://indoorplaygroundsolution.com/${slug}`;
  const breadcrumbItems = [
    { name: "Home", url: "https://indoorplaygroundsolution.com" },
    { name: "Solutions", url: "https://indoorplaygroundsolution.com/products" },
    { name: title, url },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead pageKey={seoKey} ogType="website" />
      <BreadcrumbSchema items={breadcrumbItems} />
      <FAQSchema items={faq} />
      <OrganizationSchema />
      <Header />

      <main>
        <section className="relative overflow-hidden bg-primary py-20 md:py-28">
          <div className="container relative z-10 mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <Badge className="mb-4 border-accent/30 bg-accent/20 text-accent">
                {badge}
              </Badge>
              <h1 className="mb-6 font-heading text-3xl font-bold leading-tight text-primary-foreground md:text-5xl lg:text-6xl">
                {title}
                <span className="mt-2 block text-accent">{highlight}</span>
              </h1>
              <p className="mx-auto mb-8 max-w-3xl text-lg text-primary-foreground/85 md:text-xl">
                {description}
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button size="lg" variant="hero" asChild>
                  <a href="#contact">
                    {primaryCta} <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                  <a href="#principles">{secondaryCta}</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-muted/50 py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 md:grid-cols-4">
              {stats.map((stat) => (
                <Card key={stat.label} className="border-0 shadow-sm">
                  <CardContent className="p-6 text-center">
                    <div className="mb-1 text-2xl font-bold text-primary md:text-3xl">{stat.value}</div>
                    <div className="text-xs text-muted-foreground sm:text-sm">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="principles" className="scroll-mt-20 bg-background py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <Badge variant="secondary" className="mb-4">Design Framework</Badge>
              <h2 className="mb-4 font-heading text-2xl font-bold md:text-4xl">{principlesTitle}</h2>
              <p className="text-muted-foreground md:text-lg">{principlesIntro}</p>
            </div>
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
              {principles.map((item) => (
                <Card key={item.title} className="h-full border-0 shadow-md">
                  <CardContent className="p-6">
                    <CheckCircle2 className="mb-4 h-5 w-5 text-primary" />
                    <h3 className="mb-2 font-heading text-lg font-bold">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-muted/30 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <Badge variant="secondary" className="mb-4">Equipment Mix</Badge>
              <h2 className="mb-4 font-heading text-2xl font-bold md:text-4xl">{productsTitle}</h2>
              <p className="text-muted-foreground md:text-lg">{productsIntro}</p>
            </div>
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {products.map((item) => (
                <Card key={item.title} className="h-full border-0 shadow-md">
                  <CardContent className="p-6">
                    <h3 className="mb-2 font-heading text-lg font-bold">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-background py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <Badge variant="secondary" className="mb-4">Best-Fit Buyers</Badge>
              <h2 className="mb-4 font-heading text-2xl font-bold md:text-4xl">{useCasesTitle}</h2>
              <p className="text-muted-foreground md:text-lg">{useCasesIntro}</p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2">
              {useCases.map((item) => (
                <Card key={item.title} className="h-full border-0 shadow-md">
                  <CardContent className="p-6">
                    <h3 className="mb-2 font-heading text-lg font-bold">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-muted/30 py-12">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <h2 className="mb-4 font-heading text-xl font-bold">Explore related solutions</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {related.map((link) => (
                <Button key={link.to} variant="outline" size="sm" asChild>
                  <Link to={localizedPath(link.to)}>{link.label}</Link>
                </Button>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-background py-16 md:py-20">
          <div className="container mx-auto max-w-3xl px-4">
            <div className="mb-12 text-center">
              <Badge variant="secondary" className="mb-4">
                <HelpCircle className="mr-1 h-3 w-3" /> FAQ
              </Badge>
              <h2 className="font-heading text-2xl font-bold md:text-4xl">Procurement Questions</h2>
            </div>
            <div className="space-y-4">
              {faq.map((item) => (
                <Card key={item.question} className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <h3 className="mb-2 font-heading font-semibold">{item.question}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
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
