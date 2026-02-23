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
  ShoppingBag,
  Shield,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Clock,
  Flame,
  Palette,
  Wrench,
  BarChart3,
  Users,
  HelpCircle,
  Star,
} from "lucide-react";

const SoftPlayMallSolutions = () => {
  const { localizedPath } = useLocalizedPath();

  const faqItems = [
    {
      question: "How long does the installation of a mall soft play area typically take?",
      answer: "Depending on the complexity and size, most installations in shopping malls take between 7 to 14 days. We work around mall operating hours to minimize disruption to nearby tenants.",
    },
    {
      question: "Are your soft play materials fire-retardant?",
      answer: "Yes, all materials we use, including our high-density foam and vinyl covers, meet international fire safety standards such as BS 5852 and California Technical Bulletin 117.",
    },
    {
      question: "What kind of ROI can a mall expect from a soft play installation?",
      answer: "Data indicates that malls with dedicated, high-quality play zones experience a 20-30% increase in weekend footfall. The average ROI period for mall installations is 18-24 months.",
    },
    {
      question: "Can you customize the theme to match our mall's branding?",
      answer: "Absolutely. We specialize in creating custom themes—from underwater adventures to futuristic space stations—that align with your mall's branding and aesthetic requirements.",
    },
  ];

  const breadcrumbItems = [
    { name: "Home", url: "https://indoorplaygroundsolution.com" },
    { name: "Products", url: "https://indoorplaygroundsolution.com/products" },
    {
      name: "Soft Play Equipment for Shopping Malls",
      url: "https://indoorplaygroundsolution.com/soft-play-equipment-shopping-mall-solutions",
    },
  ];

  const uniqueDataPoints = [
    {
      icon: Clock,
      value: "+35 min",
      label: "Average increase in mall dwell time per family visit",
    },
    {
      icon: Shield,
      value: "50,000+",
      label: "Friction cycles tested on custom PVC materials",
    },
    {
      icon: Users,
      value: "92%",
      label: "Parents prefer malls with quality indoor play areas",
    },
    {
      icon: TrendingUp,
      value: "20-30%",
      label: "Weekend footfall increase with dedicated play zones",
    },
  ];

  const section1Features = [
    {
      icon: TrendingUp,
      text: "20-30% increase in weekend footfall for malls with quality play zones",
    },
    {
      icon: Palette,
      text: "Custom themes from underwater adventures to futuristic space stations",
    },
    {
      icon: Shield,
      text: "All installations adhere to strict ASTM and EN safety standards",
    },
    {
      icon: Users,
      text: "Strategic anchor that drives foot traffic and increases dwell time",
    },
  ];

  const section2Features = [
    {
      icon: Wrench,
      text: "Advanced manufacturing techniques for wear, tear, and fading resistance",
    },
    {
      icon: Star,
      text: "Easy-to-clean components vital for maintaining public space hygiene",
    },
    {
      icon: BarChart3,
      text: "Strategic layouts optimizing traffic flow within the mall ecosystem",
    },
    {
      icon: ShoppingBag,
      text: "Full-turnkey services: site assessment, CAD design, manufacturing, and installation",
    },
  ];

  return (
    <div className="min-h-screen">
      <SEOHead
        pageKey="softPlayMallSolutions"
        dynamicTitle="Soft Play Equipment Solutions for Shopping Malls | IPS"
        dynamicDescription="Enhance shopping mall foot traffic with premium soft play equipment solutions from indoorplaygroundsolution. Durable, safe, and custom-designed."
        dynamicKeywords="soft play equipment shopping mall, mall play area, commercial soft play, indoor playground shopping center, mall family entertainment"
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
                <ShoppingBag className="w-3 h-3 mr-1" />
                Shopping Mall Solutions
              </Badge>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight text-primary-foreground">
                Premium Soft Play Equipment{" "}
                <span className="block text-accent mt-2">
                  Solutions for Shopping Malls
                </span>
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-3xl mx-auto">
                Transform vacant retail space into high-traffic family hubs with professionally designed,
                durable, and safe soft play equipment from indoorplaygroundsolution.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                  <Link to={localizedPath("/contact")}>
                    Get Free Quote <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                  <Link to={localizedPath("/products/soft-play")}>
                    View Soft Play Products
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

        {/* Section 1: Transforming Retail Spaces */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <Badge variant="secondary" className="mb-4">
                <TrendingUp className="w-3 h-3 mr-1" />
                Retail Transformation
              </Badge>
              <h2 className="text-2xl md:text-4xl font-heading font-bold mb-6">
                Transforming Retail Spaces into{" "}
                <span className="text-primary">Family Destinations</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                In the evolving landscape of modern retail, shopping malls are transitioning from mere
                transaction hubs to comprehensive lifestyle destinations. indoorplaygroundsolution provides
                state-of-the-art soft play equipment designed to captivate young families and significantly
                increase dwell time. By integrating a professionally designed play area, mall operators can
                see a direct correlation between family engagement and increased secondary spend in food
                courts and neighboring retail outlets. Our solutions focus on high-density foam structures
                covered in premium, non-toxic PVC, ensuring that the play area remains vibrant and safe even
                under the high-traffic conditions typical of major shopping centers. Investing in a soft play
                solution is not just about entertainment; it is a strategic move to secure long-term loyalty
                from the most influential consumer demographic: parents.
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

        {/* Section 2: Maximizing ROI */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <Badge variant="secondary" className="mb-4">
                <BarChart3 className="w-3 h-3 mr-1" />
                Durability & ROI
              </Badge>
              <h2 className="text-2xl md:text-4xl font-heading font-bold mb-6">
                Maximizing ROI with{" "}
                <span className="text-primary">Durable & Low-Maintenance Designs</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Durability is the cornerstone of any successful commercial play installation.
                indoorplaygroundsolution utilizes advanced manufacturing techniques to create equipment that
                resists wear, tear, and fading. Our soft play components are engineered for easy cleaning,
                which is vital for maintaining hygiene in public spaces. The return on investment for a
                shopping mall play area is realized through increased recurring visits. When children request
                to go to a specific mall because of the "awesome playground," parents are more likely to choose
                that location for their weekly shopping needs. We provide full-turnkey services, including site
                assessment, custom CAD design, manufacturing, and professional installation. We also offer
                maintenance packages to ensure the play area stays in top condition for years. Beyond the
                physical equipment, we provide strategic layouts that optimize traffic flow, ensuring that the
                play area does not become a bottleneck but rather a seamless part of the mall ecosystem.
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
                    Start Your Mall Transformation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Internal Links Section */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-lg font-heading font-semibold mb-4 text-center">Related Solutions</h3>
              <div className="flex flex-wrap justify-center gap-3">
                <Button variant="outline" size="sm" asChild>
                  <Link to={localizedPath("/products/soft-play")}>Soft Play Equipment</Link>
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

export default SoftPlayMallSolutions;
