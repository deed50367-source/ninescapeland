import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Quote, Filter, X } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

interface CaseStudy {
  id: string;
  title: string;
  country: string;
  city: string | null;
  project_type: string;
  area_sqm: number | null;
  description: string | null;
  images: string[] | null;
  client_name: string | null;
  client_testimonial: string | null;
  featured: boolean | null;
}

const projectTypeColors: Record<string, string> = {
  "indoor-playground": "bg-blue-500",
  "trampoline-park": "bg-purple-500",
  "ninja-course": "bg-orange-500",
  "soft-play": "bg-pink-500",
  fec: "bg-green-500",
};

const projectTypeLabels: Record<string, string> = {
  "indoor-playground": "Indoor Playground",
  "trampoline-park": "Trampoline Park",
  "ninja-course": "Ninja Course",
  "soft-play": "Soft Play",
  fec: "Family Entertainment Center",
};

export default function CaseStudies() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const { localizedPath } = useLocalizedPath();

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    try {
      const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .order("featured", { ascending: false })
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCaseStudies(data || []);
    } catch (error) {
      console.error("Error fetching case studies:", error);
    } finally {
      setLoading(false);
    }
  };

  const countries = [...new Set(caseStudies.map((c) => c.country))].sort();
  const projectTypes = [...new Set(caseStudies.map((c) => c.project_type))].sort();

  const filteredCases = caseStudies.filter((c) => {
    if (selectedCountry && c.country !== selectedCountry) return false;
    if (selectedType && c.project_type !== selectedType) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24">
        {/* Hero */}
        <section className="section-padding bg-muted">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-4xl mx-auto"
            >
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                Our Portfolio
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mt-3 mb-6">
                Global <span className="text-gradient">Case Studies</span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl">
                Explore our successful projects from around the world. Each project
                showcases our commitment to quality, innovation, and client satisfaction.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-6 border-b bg-card sticky top-16 z-40">
          <div className="container-wide">
            <div className="flex flex-wrap items-center gap-3">
              <Filter className="w-5 h-5 text-muted-foreground" />
              
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="h-10 px-4 rounded-lg border border-input bg-background text-sm"
              >
                <option value="">All Countries</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>

              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="h-10 px-4 rounded-lg border border-input bg-background text-sm"
              >
                <option value="">All Types</option>
                {projectTypes.map((type) => (
                  <option key={type} value={type}>
                    {projectTypeLabels[type] || type}
                  </option>
                ))}
              </select>

              {(selectedCountry || selectedType) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedCountry("");
                    setSelectedType("");
                  }}
                >
                  Clear Filters
                  <X className="w-4 h-4" />
                </Button>
              )}

              <span className="ml-auto text-sm text-muted-foreground">
                {filteredCases.length} projects
              </span>
            </div>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="section-padding">
          <div className="container-wide">
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-card rounded-2xl overflow-hidden animate-pulse">
                    <div className="h-64 bg-muted" />
                    <div className="p-6 space-y-3">
                      <div className="h-6 bg-muted rounded w-3/4" />
                      <div className="h-4 bg-muted rounded w-1/2" />
                      <div className="h-4 bg-muted rounded w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredCases.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  No case studies found matching your filters.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSelectedCountry("");
                    setSelectedType("");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredCases.map((caseStudy, index) => (
                  <motion.article
                    key={caseStudy.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all cursor-pointer"
                    onClick={() => setSelectedCase(caseStudy)}
                  >
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden bg-muted">
                      {caseStudy.images && caseStudy.images[0] ? (
                        <img
                          src={caseStudy.images[0]}
                          alt={caseStudy.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl">
                          🎪
                        </div>
                      )}
                      {caseStudy.featured && (
                        <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                          Featured
                        </Badge>
                      )}
                      <div
                        className={`absolute top-4 right-4 w-3 h-3 rounded-full ${
                          projectTypeColors[caseStudy.project_type] || "bg-primary"
                        }`}
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <MapPin className="w-4 h-4" />
                        <span>
                          {caseStudy.city ? `${caseStudy.city}, ` : ""}
                          {caseStudy.country}
                        </span>
                      </div>
                      <h3 className="text-xl font-heading font-bold mb-2 group-hover:text-primary transition-colors">
                        {caseStudy.title}
                      </h3>
                      <div className="flex items-center gap-3 text-sm">
                        <Badge variant="secondary">
                          {projectTypeLabels[caseStudy.project_type] || caseStudy.project_type}
                        </Badge>
                        {caseStudy.area_sqm && (
                          <span className="text-muted-foreground">
                            {caseStudy.area_sqm} m²
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-primary text-primary-foreground">
          <div className="container-wide text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Ready to Create Your Success Story?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              Join hundreds of satisfied clients worldwide. Let's discuss your project
              and turn your vision into reality.
            </p>
            <Button
              variant="secondary"
              size="xl"
              asChild
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              <a href={`${localizedPath("")}#contact`} className="group">
                Start Your Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />

      {/* Case Study Modal */}
      {selectedCase && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedCase(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-card rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Images */}
            {selectedCase.images && selectedCase.images.length > 0 && (
              <div className="relative h-72 md:h-96">
                <img
                  src={selectedCase.images[0]}
                  alt={selectedCase.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedCase(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-foreground/20 backdrop-blur-sm text-primary-foreground flex items-center justify-center hover:bg-foreground/40 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Content */}
            <div className="p-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <MapPin className="w-4 h-4" />
                <span>
                  {selectedCase.city ? `${selectedCase.city}, ` : ""}
                  {selectedCase.country}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                {selectedCase.title}
              </h2>

              <div className="flex flex-wrap gap-3 mb-6">
                <Badge variant="secondary">
                  {projectTypeLabels[selectedCase.project_type] || selectedCase.project_type}
                </Badge>
                {selectedCase.area_sqm && (
                  <Badge variant="outline">{selectedCase.area_sqm} m²</Badge>
                )}
              </div>

              {selectedCase.description && (
                <p className="text-muted-foreground mb-6">
                  {selectedCase.description}
                </p>
              )}

              {selectedCase.client_testimonial && (
                <div className="bg-muted p-6 rounded-xl mb-6">
                  <Quote className="w-8 h-8 text-primary mb-3" />
                  <p className="text-lg italic mb-3">
                    "{selectedCase.client_testimonial}"
                  </p>
                  {selectedCase.client_name && (
                    <p className="font-semibold text-sm">
                      — {selectedCase.client_name}
                    </p>
                  )}
                </div>
              )}

              {/* Image Gallery */}
              {selectedCase.images && selectedCase.images.length > 1 && (
                <div className="grid grid-cols-3 gap-2 mb-6">
                  {selectedCase.images.slice(1).map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`${selectedCase.title} ${i + 2}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}

              <Button variant="hero" size="lg" asChild className="w-full">
                <a href={`${localizedPath("")}#contact`}>
                  Start Similar Project
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
