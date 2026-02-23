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
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Zap,
  Shield,
  TrendingUp,
  ArrowRight,
  BarChart3,
  Users,
  HelpCircle,
  Layers,
  Maximize,
  Timer,
  Award,
  Dumbbell,
  Target,
} from "lucide-react";

const TrampolineParkFEC = () => {
  const { localizedPath } = useLocalizedPath();

  const faqItems = [
    {
      question: "What is the typical ROI for a trampoline park installation?",
      answer: "Most FEC operators using our equipment report a full return on investment within 12 to 18 months, depending on location and marketing efforts.",
    },
    {
      question: "Can your trampoline parks be customized to fit irregular building shapes?",
      answer: "Absolutely. We specialize in bespoke designs that utilize every available square inch of your facility, regardless of structural columns or unusual floor plans.",
    },
    {
      question: "What age groups can use the trampoline park?",
      answer: "Our systems cater to a wide age range, from toddlers in dedicated jump zones to teenagers and adults looking for wall-to-wall jumping action and performance trampolines.",
    },
    {
      question: "How do you ensure safety in high-traffic trampoline parks?",
      answer: "We incorporate redundant safety systems including secondary netting, thick padding that overlaps the spring zones, and high-impact absorbing airbeds, along with detailed safety manuals and staff training protocols.",
    },
  ];

  const breadcrumbItems = [
    { name: "Home", url: "https://indoorplaygroundsolution.com" },
    { name: "Products", url: "https://indoorplaygroundsolution.com/products" },
    {
      name: "Trampoline Park Solutions for FECs",
      url: "https://indoorplaygroundsolution.com/trampoline-park-fec-solutions",
    },
  ];

  const uniqueDataPoints = [
    {
      icon: BarChart3,
      value: "2.5×",
      label: "Higher revenue per sqft vs. traditional arcade spaces",
    },
    {
      icon: Shield,
      value: "5+ yrs",
      label: "Extended lifespan with anti-rust coated steel frames",
    },
    {
      icon: Target,
      value: "30%",
      label: "Impact force reduction with proprietary foam pit tech",
    },
    {
      icon: TrendingUp,
      value: "+40%",
      label: "Overall FEC revenue increase with trampoline park integration",
    },
  ];

  const section1Features = [
    {
      icon: Layers,
      text: "Multi-faceted zones: dodgeball courts, slam dunk zones, and foam pits",
    },
    {
      icon: Dumbbell,
      text: "Heavy-duty galvanized steel frames with world-class jumping mats",
    },
    {
      icon: Maximize,
      text: "Maximized 'jumpable' square footage with strict safety buffers",
    },
    {
      icon: Users,
      text: "Designed for wide age range from toddlers to adults",
    },
  ];

  const section2Features = [
    {
      icon: Shield,
      text: "Redundant safety systems: secondary netting, overlapping padding, and airbeds",
    },
    {
      icon: Timer,
      text: "Flow-optimized designs minimizing wait times and maximizing jumpers per hour",
    },
    {
      icon: Layers,
      text: "Modular designs allowing future expansions as your business grows",
    },
    {
      icon: Award,
      text: "Digital check-in and waiver management system compatibility",
    },
  ];

  return (
    <div className="min-h-screen">
      <SEOHead
        pageKey="trampolineParkFEC"
        dynamicTitle="Commercial Trampoline Park Solutions for FECs | IPS"
        dynamicDescription="Turnkey trampoline park solutions for Family Entertainment Centers. High-performance equipment from indoorplaygroundsolution for maximum safety."
        dynamicKeywords="trampoline park FEC, family entertainment center trampoline, commercial trampoline park, FEC attractions, trampoline park equipment"
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <FAQSchema items={faqItems} />
      <OrganizationSchema />
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/85" />
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-accent/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-accent/5 rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <Badge className="mb-4 bg-accent/20 text-accent border-accent/30">
                <Zap className="w-3 h-3 mr-1" />
                FEC Solutions
              </Badge>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight text-primary-foreground">
                High-Performance Trampoline Park{" "}
                <span className="block text-accent mt-2">
                  Solutions for Family Entertainment Centers
                </span>
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-3xl mx-auto">
                Comprehensive turnkey trampoline park modules that integrate seamlessly into larger
                entertainment hubs, driving repeat visits and maximizing revenue per square foot.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                  <Link to={localizedPath("/contact")}>
                    Get Free Quote <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                  <Link to={localizedPath("/products/trampoline-park")}>
                    View Trampoline Parks
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {uniqueDataPoints.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center p-6 bg-background rounded-xl shadow-sm"
                >
                  <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 1: Elevating the FEC Experience */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <Badge variant="secondary" className="mb-4">
                <Zap className="w-3 h-3 mr-1" />
                High-Energy Attractions
              </Badge>
              <h2 className="text-2xl md:text-4xl font-heading font-bold mb-6">
                Elevating the FEC Experience with{" "}
                <span className="text-primary">High-Energy Attractions</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Family Entertainment Centers require high-throughput, high-energy attractions to remain
                competitive. indoorplaygroundsolution offers comprehensive trampoline park modules that
                integrate seamlessly into larger entertainment hubs. Our systems are designed to cater to a
                wide age range, from toddlers in dedicated jump zones to teenagers and adults looking for
                wall-to-wall jumping action and performance trampolines. We prioritize structural integrity
                and safety—our frames are constructed from heavy-duty galvanized steel, and our jumping mats
                are sourced from world-class suppliers to ensure consistent bounce and longevity. By
                incorporating diverse elements such as dodgeball courts, slam dunk zones, and foam pits, we
                help FEC owners create a multi-faceted experience that encourages repeat visits. The
                integration of a trampoline park within an FEC can increase overall revenue by 40%, as it
                serves as a primary draw that feeds into other services like arcades and cafes.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {section1Features.map((f, i) => (
                  <Card key={i} className="border-0 shadow-md">
                    <CardContent className="p-4 flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <f.icon className="w-5 h-5 text-primary" />
                      </div>
                      <p className="text-sm text-foreground">{f.text}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 2: Safety & Profitability */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <Badge variant="secondary" className="mb-4">
                <Shield className="w-3 h-3 mr-1" />
                Safety & Profitability
              </Badge>
              <h2 className="text-2xl md:text-4xl font-heading font-bold mb-6">
                Safety Engineering and{" "}
                <span className="text-primary">Profitability Metrics</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Safety is the paramount concern for any trampoline park operator. indoorplaygroundsolution
                goes beyond the basics, incorporating redundant safety systems including secondary netting,
                thick padding that overlaps the spring zones, and high-impact absorbing airbeds. We provide
                FEC operators with detailed safety manuals and staff training protocols to ensure the facility
                is managed according to global best practices. From a profitability standpoint, our designs
                focus on 'flow'—minimizing wait times and maximizing the number of jumpers per hour. Our
                modular designs allow for future expansions, meaning you can start with a core set of
                attractions and add more as your business grows. We also integrate digital check-in and waiver
                management system compatibility into our layouts to streamline operations. Choosing
                indoorplaygroundsolution means partnering with a manufacturer that understands the business of
                play.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {section2Features.map((f, i) => (
                  <Card key={i} className="border-0 shadow-md">
                    <CardContent className="p-4 flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <f.icon className="w-5 h-5 text-primary" />
                      </div>
                      <p className="text-sm text-foreground">{f.text}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Button variant="outline" asChild>
                  <Link to={localizedPath("/contact")}>
                    Get Free Consultation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-lg font-heading font-semibold mb-4 text-center">Related Solutions</h3>
              <div className="flex flex-wrap justify-center gap-3">
                <Button variant="outline" size="sm" asChild>
                  <Link to={localizedPath("/products/trampoline-park")}>Trampoline Park Equipment</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to={localizedPath("/process")}>Our Process</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to={localizedPath("/case-studies")}>Case Studies</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to={localizedPath("/products")}>All Products</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <Badge variant="secondary" className="mb-4">
                <HelpCircle className="w-3 h-3 mr-1" />
                FAQ
              </Badge>
              <h2 className="text-2xl md:text-4xl font-heading font-bold mb-4">
                Frequently Asked{" "}
                <span className="text-primary">Questions</span>
              </h2>
            </motion.div>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqItems.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="bg-card rounded-xl px-6 shadow-soft border-none"
                  >
                    <AccordionTrigger className="text-start font-heading font-semibold hover:text-primary transition-colors py-5">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA / Contact */}
        <ContactSection />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default TrampolineParkFEC;
