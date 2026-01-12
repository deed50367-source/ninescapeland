import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

import indoorPlayground from "@/assets/product-indoor-playground.jpg";
import trampolinePark from "@/assets/product-trampoline-park.jpg";
import ninjaCourse from "@/assets/product-ninja-course.jpg";
import softPlay from "@/assets/product-soft-play.jpg";

const products = [
  {
    title: "Indoor Playground Equipment",
    description: "Multi-level play structures with slides, ball pits, climbing nets, and interactive elements for children of all ages.",
    image: indoorPlayground,
    features: ["Custom Themes", "Safety Certified", "All Ages"],
    keywords: "indoor playground equipment, commercial playground, kids play area",
  },
  {
    title: "Trampoline Parks",
    description: "Complete trampoline park solutions with 8+ activity zones: ninja courses, dodgeball, foam pits, spider walls, battle sticks, devil slides, and more. Professional-grade equipment for maximum engagement.",
    image: trampolinePark,
    features: ["8+ Activity Zones", "High Performance", "Modular Design"],
    keywords: "trampoline park equipment, commercial trampolines, jump park",
  },
  {
    title: "Ninja Warrior Courses",
    description: "Professional ninja obstacle courses featuring climbing walls, rope courses, balance beams, and challenging obstacles.",
    image: ninjaCourse,
    features: ["Competition Grade", "Adjustable Difficulty", "All Ages"],
    keywords: "ninja warrior course, obstacle course equipment, adventure park",
  },
  {
    title: "Soft Play Areas",
    description: "Safe and engaging soft play equipment designed specifically for toddlers and young children.",
    image: softPlay,
    features: ["Toddler Safe", "Easy Clean", "Modular"],
    keywords: "soft play equipment, toddler playground, indoor play area",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const ProductsSection = () => {
  return (
    <section id="products" className="section-padding bg-background">
      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Our Products
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-3 mb-6">
            Commercial Playground <span className="text-gradient">Solutions</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            From design to installation, we provide complete turnkey solutions for indoor 
            entertainment centers, family entertainment centers, and amusement parks worldwide.
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          {products.map((product, index) => (
            <motion.article
              key={index}
              variants={item}
              className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                  {product.features.map((feature, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-primary-foreground/90 text-primary rounded-full text-xs font-semibold"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold mb-3 group-hover:text-primary transition-colors">
                  {product.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {product.description}
                </p>
                <Button variant="outline" size="sm" asChild className="group/btn">
                  <a href="#contact">
                    Request Quote
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            Looking for something specific? We offer custom design services.
          </p>
          <Button variant="hero" size="lg" asChild>
            <a href="#contact" className="group">
              Discuss Your Project
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
