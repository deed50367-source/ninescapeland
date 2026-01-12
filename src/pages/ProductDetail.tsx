import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Play,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import indoorPlayground from "@/assets/product-indoor-playground.jpg";
import trampolinePark from "@/assets/product-trampoline-park.jpg";
import ninjaCourse from "@/assets/product-ninja-course.jpg";
import softPlay from "@/assets/product-soft-play.jpg";

const products = {
  "indoor-playground": {
    id: "indoor-playground",
    title: "Indoor Playground Equipment",
    subtitle: "Multi-level Play Structures",
    description:
      "Create magical play experiences with our custom-designed indoor playground equipment. From multi-level structures to themed play areas, we bring imagination to life with safety-certified equipment.",
    heroImage: indoorPlayground,
    images: [indoorPlayground, trampolinePark, ninjaCourse],
    features: [
      "Custom themes and designs",
      "Multi-level play structures",
      "Interactive elements",
      "Ball pools and slides",
      "Climbing walls and nets",
      "Sensory play areas",
      "Toddler zones",
      "Role-play areas",
    ],
    specifications: [
      { label: "Age Range", value: "1-12 years" },
      { label: "Min. Space", value: "100 m²" },
      { label: "Max. Height", value: "8 meters" },
      { label: "Materials", value: "Steel, PVC, Foam" },
      { label: "Warranty", value: "3 years" },
      { label: "Installation", value: "10-20 days" },
      { label: "Certification", value: "ASTM, EN1176, TUV" },
      { label: "Lead Time", value: "30-45 days" },
    ],
    priceRange: "$200 - $400 per m²",
    icon: "🎪",
  },
  "trampoline-park": {
    id: "trampoline-park",
    title: "Trampoline Park Equipment",
    subtitle: "Complete Jump Park Solutions",
    description:
      "Professional-grade trampoline park equipment with 12+ activity zones. Our modular designs maximize fun and safety with foam pits, slam dunk, skyrider, 360° bicycle, climbing walls, and more.",
    heroImage: trampolinePark,
    images: [trampolinePark, ninjaCourse, indoorPlayground],
    features: [
      "Free jump zones",
      "Foam pit areas",
      "Slam dunk basketball",
      "Dodgeball courts",
      "Skyrider systems",
      "360° bicycle",
      "Ninja obstacles",
      "Airbag landing",
    ],
    specifications: [
      { label: "Age Range", value: "3+ years" },
      { label: "Min. Space", value: "500 m²" },
      { label: "Max. Height", value: "10 meters" },
      { label: "Materials", value: "Steel, Springs, Padding" },
      { label: "Warranty", value: "5 years" },
      { label: "Installation", value: "15-30 days" },
      { label: "Certification", value: "ASTM, EN12572" },
      { label: "Lead Time", value: "45-60 days" },
    ],
    priceRange: "$250 - $450 per m²",
    icon: "🤸",
  },
  "ninja-course": {
    id: "ninja-course",
    title: "Ninja Warrior Course",
    subtitle: "Professional Obstacle Courses",
    description:
      "Challenge seekers love our ninja warrior courses. Featuring 50+ obstacle types including warped walls, salmon ladders, rope climbs, balance beams, and custom challenges for all skill levels.",
    heroImage: ninjaCourse,
    images: [ninjaCourse, trampolinePark, softPlay],
    features: [
      "Warped walls",
      "Salmon ladders",
      "Rope courses",
      "Balance obstacles",
      "Climbing challenges",
      "Ring swings",
      "Cargo nets",
      "Competition lanes",
    ],
    specifications: [
      { label: "Age Range", value: "5+ years" },
      { label: "Min. Space", value: "200 m²" },
      { label: "Max. Height", value: "6 meters" },
      { label: "Materials", value: "Steel, Wood, Rubber" },
      { label: "Warranty", value: "3 years" },
      { label: "Installation", value: "10-20 days" },
      { label: "Certification", value: "ASTM, EN1176" },
      { label: "Lead Time", value: "30-45 days" },
    ],
    priceRange: "$180 - $350 per m²",
    icon: "🥷",
  },
  "soft-play": {
    id: "soft-play",
    title: "Soft Play Equipment",
    subtitle: "Toddler-Safe Play Areas",
    description:
      "Designed for the youngest adventurers, our soft play equipment provides safe, engaging environments for toddlers. Easy to clean, modular, and built with the highest safety standards.",
    heroImage: softPlay,
    images: [softPlay, indoorPlayground, trampolinePark],
    features: [
      "Toddler-safe design",
      "Soft foam construction",
      "Easy to clean surfaces",
      "Modular components",
      "Sensory elements",
      "Ball pools",
      "Mini slides",
      "Interactive panels",
    ],
    specifications: [
      { label: "Age Range", value: "0-5 years" },
      { label: "Min. Space", value: "30 m²" },
      { label: "Max. Height", value: "2.5 meters" },
      { label: "Materials", value: "PVC, Foam" },
      { label: "Warranty", value: "2 years" },
      { label: "Installation", value: "3-7 days" },
      { label: "Certification", value: "EN1176, ASTM" },
      { label: "Lead Time", value: "20-30 days" },
    ],
    priceRange: "$150 - $300 per m²",
    icon: "🧸",
  },
};

export default function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const [currentImage, setCurrentImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const product = productId ? products[productId as keyof typeof products] : null;

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 section-padding">
          <div className="container-wide text-center">
            <h1 className="text-4xl font-heading font-bold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The product you're looking for doesn't exist.
            </p>
            <Button variant="hero" asChild>
              <Link to="/#products">View All Products</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24">
        {/* Breadcrumb */}
        <section className="py-4 border-b">
          <div className="container-wide">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link to="/#products" className="hover:text-primary transition-colors">
                Products
              </Link>
              <span>/</span>
              <span className="text-foreground">{product.title}</span>
            </nav>
          </div>
        </section>

        {/* Product Hero */}
        <section className="section-padding">
          <div className="container-wide">
            <Link
              to="/#products"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Products
            </Link>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Image Gallery */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group"
                  onClick={() => setLightboxOpen(true)}
                >
                  <img
                    src={product.images[currentImage]}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors flex items-center justify-center">
                    <Play className="w-16 h-16 text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Navigation Arrows */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-foreground/20 backdrop-blur-sm text-primary-foreground flex items-center justify-center hover:bg-foreground/40 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-foreground/20 backdrop-blur-sm text-primary-foreground flex items-center justify-center hover:bg-foreground/40 transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>

                {/* Thumbnails */}
                <div className="grid grid-cols-4 gap-3 mt-4">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImage(i)}
                      className={`aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all ${
                        currentImage === i
                          ? "border-primary"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.title} ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Product Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Badge variant="secondary" className="mb-4">
                  {product.icon} {product.subtitle}
                </Badge>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
                  {product.title}
                </h1>
                <p className="text-muted-foreground text-lg mb-8">
                  {product.description}
                </p>

                <div className="bg-muted p-6 rounded-xl mb-8">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Starting from
                    </span>
                    <span className="text-2xl font-heading font-bold text-primary">
                      {product.priceRange}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <Button variant="hero" size="xl" className="w-full" asChild>
                    <a href="/#contact">
                      Request Quote
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" className="w-full" asChild>
                    <a href="/#quote-calculator">
                      Use Price Calculator
                    </a>
                  </Button>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    Free 3D Design
                  </span>
                  <span className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    Worldwide Shipping
                  </span>
                  <span className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    Installation Support
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="section-padding bg-muted">
          <div className="container-wide">
            <Tabs defaultValue="features" className="w-full">
              <TabsList className="w-full justify-start mb-8 bg-card">
                <TabsTrigger value="features" className="flex-1 md:flex-none">
                  Features
                </TabsTrigger>
                <TabsTrigger value="specifications" className="flex-1 md:flex-none">
                  Specifications
                </TabsTrigger>
                <TabsTrigger value="process" className="flex-1 md:flex-none">
                  Process
                </TabsTrigger>
              </TabsList>

              <TabsContent value="features">
                <div className="bg-card p-8 rounded-2xl">
                  <h3 className="text-2xl font-heading font-bold mb-6">
                    Key Features
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {product.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-4 bg-muted rounded-xl"
                      >
                        <Check className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="specifications">
                <div className="bg-card p-8 rounded-2xl">
                  <h3 className="text-2xl font-heading font-bold mb-6">
                    Technical Specifications
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {product.specifications.map((spec, i) => (
                      <div key={i} className="p-4 bg-muted rounded-xl">
                        <p className="text-sm text-muted-foreground mb-1">
                          {spec.label}
                        </p>
                        <p className="text-lg font-semibold">{spec.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="process">
                <div className="bg-card p-8 rounded-2xl">
                  <h3 className="text-2xl font-heading font-bold mb-6">
                    Our Process
                  </h3>
                  <div className="grid md:grid-cols-4 gap-6">
                    {[
                      { step: 1, title: "Consultation", desc: "Discuss your vision and requirements" },
                      { step: 2, title: "3D Design", desc: "Receive custom 3D design proposals" },
                      { step: 3, title: "Production", desc: "Equipment manufactured to specification" },
                      { step: 4, title: "Installation", desc: "Professional installation support" },
                    ].map((item) => (
                      <div key={item.step} className="text-center">
                        <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold mx-auto mb-4">
                          {item.step}
                        </div>
                        <h4 className="font-heading font-bold mb-2">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-primary text-primary-foreground">
          <div className="container-wide text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              Contact us today for a free consultation and 3D design proposal.
              Let's bring your vision to life.
            </p>
            <Button
              variant="secondary"
              size="xl"
              asChild
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              <a href="/#contact" className="group">
                Get Free Quote
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />

      {/* Lightbox */}
      {lightboxOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-foreground/90 z-50 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-primary-foreground/10 text-primary-foreground flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 w-12 h-12 rounded-full bg-primary-foreground/10 text-primary-foreground flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <img
            src={product.images[currentImage]}
            alt={product.title}
            className="max-w-[90vw] max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 w-12 h-12 rounded-full bg-primary-foreground/10 text-primary-foreground flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </motion.div>
      )}
    </div>
  );
}
