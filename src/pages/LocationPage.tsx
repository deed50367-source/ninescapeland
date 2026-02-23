import { useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, CheckCircle, ArrowRight, Phone, Globe, Shield, Award, Factory, Truck } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { SEOHead } from "@/components/SEOHead";
import { BreadcrumbSchema, OrganizationSchema } from "@/components/StructuredData";
import { ProductsSection } from "@/components/ProductsSection";
import { QuoteCalculator } from "@/components/QuoteCalculator";
import { CTABannerSection } from "@/components/CTABannerSection";
import { FAQSection } from "@/components/FAQSection";
import { Button } from "@/components/ui/button";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { useWhatsAppTracking } from "@/hooks/useWhatsAppTracking";
import { getLocationBySlug } from "@/config/locationPages";

const processSteps = [
  { icon: Phone, label: "Free Consultation" },
  { icon: Globe, label: "Custom 3D Design" },
  { icon: Factory, label: "Manufacturing" },
  { icon: Shield, label: "Quality Inspection" },
  { icon: Truck, label: "Shipping & Install" },
  { icon: Award, label: "After-Sales Support" },
];

const LocationPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { localizedPath } = useLocalizedPath();
  const { openWhatsApp } = useWhatsAppTracking();

  const location = slug ? getLocationBySlug(slug) : undefined;

  if (!location) {
    return <Navigate to="/404" replace />;
  }

  const breadcrumbItems = [
    { name: "Home", url: "https://indoorplaygroundsolution.com" },
    { name: `${location.country}`, url: `https://indoorplaygroundsolution.com/locations/${location.slug}` },
  ];

  return (
    <div className="min-h-screen">
      <SEOHead
        pageKey="home"
        dynamicTitle={location.metaTitle}
        dynamicDescription={location.metaDescription}
        dynamicKeywords={location.metaKeywords}
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <OrganizationSchema />
      <Header />

      <main>
        {/* Hero */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/85" />
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-accent/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-accent/5 rounded-full blur-3xl" />
          </div>
          <div className="container-wide relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6"
              >
                <MapPin className="w-4 h-4" />
                <span>{location.flag} Serving {location.country}</span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground leading-tight mb-4"
              >
                {location.heroTitle}
                <span className="block text-accent mt-2">{location.heroHighlight}</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8"
              >
                {location.heroDescription}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button size="lg" variant="default" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                  <a href={localizedPath("/contact")}>
                    Get Free Quote <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" onClick={() => openWhatsApp("other", { pageName: `Location - ${location.country}` })}>
                  <Phone className="mr-2 w-4 h-4" /> WhatsApp Us
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-muted/50">
          <div className="container-wide">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {location.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center p-6 bg-background rounded-xl shadow-sm"
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Local Benefits */}
        <section className="py-16 md:py-20">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Why Choose NinescapeLand in {location.country}?
              </h2>
              <p className="text-muted-foreground text-lg">
                Trusted by businesses across {location.country} for certified, custom-designed indoor entertainment solutions.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {location.localBenefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg"
                >
                  <CheckCircle className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                  <span className="text-foreground font-medium">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Products */}
        <ProductsSection />

        {/* Process */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container-wide">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">
              Our Process for {location.country} Clients
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {processSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="text-center"
                >
                  <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-sm font-medium">{step.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <QuoteCalculator />
        <FAQSection />
        <CTABannerSection />
      </main>

      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default LocationPage;
