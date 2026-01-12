import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

import indoorPlayground from "@/assets/product-indoor-playground.jpg";
import trampolinePark from "@/assets/product-trampoline-park.jpg";
import ninjaCourse from "@/assets/product-ninja-course.jpg";
import softPlay from "@/assets/product-soft-play.jpg";

const projects = [
  {
    id: 1,
    title: "Adventure Zone Family Center",
    location: "California, USA",
    type: "Indoor Playground",
    size: "5,000 sqm",
    image: indoorPlayground,
  },
  {
    id: 2,
    title: "Sky Jump Trampoline Park",
    location: "Dubai, UAE",
    type: "Trampoline Park",
    size: "3,500 sqm",
    image: trampolinePark,
  },
  {
    id: 3,
    title: "Ninja Warriors Academy",
    location: "London, UK",
    type: "Ninja Course",
    size: "2,000 sqm",
    image: ninjaCourse,
  },
  {
    id: 4,
    title: "Little Stars Play Center",
    location: "Sydney, Australia",
    type: "Soft Play",
    size: "800 sqm",
    image: softPlay,
  },
  {
    id: 5,
    title: "Fun Galaxy FEC",
    location: "Toronto, Canada",
    type: "Indoor Playground",
    size: "4,200 sqm",
    image: indoorPlayground,
  },
  {
    id: 6,
    title: "Bounce Kingdom",
    location: "Singapore",
    type: "Trampoline Park",
    size: "2,800 sqm",
    image: trampolinePark,
  },
];

const categories = ["All", "Indoor Playground", "Trampoline Park", "Ninja Course", "Soft Play"];

export const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.type === activeCategory);

  return (
    <section id="projects" className="section-padding bg-background">
      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Our Projects
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-3 mb-6">
            Successful <span className="text-gradient">Installations</span> Worldwide
          </h2>
          <p className="text-muted-foreground text-lg">
            Explore our portfolio of completed projects across 50+ countries. 
            Each installation showcases our commitment to quality and innovation.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full font-medium text-sm transition-all ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "bg-muted text-muted-foreground hover:bg-secondary"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-semibold">
                      {project.type}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-heading font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                    <MapPin className="w-4 h-4" />
                    {project.location}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Size: <span className="font-semibold text-foreground">{project.size}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="hero" size="lg" asChild>
            <a href="#contact" className="group">
              Start Your Project
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
