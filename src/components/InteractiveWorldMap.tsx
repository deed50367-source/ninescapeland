import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X, Building2, Users, Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

interface RegionData {
  id: string;
  name: string;
  countries: string;
  projects: string;
  clients: string;
  featured: string;
  description: string;
  flag: string;
}

export const InteractiveWorldMap = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { localizedPath } = useLocalizedPath();
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const regions: Record<string, RegionData> = {
    northAmerica: {
      id: "northAmerica",
      name: t("interactiveMap.regions.northAmerica.name"),
      countries: t("interactiveMap.regions.northAmerica.countries"),
      projects: "450+",
      clients: "280+",
      featured: t("interactiveMap.regions.northAmerica.featured"),
      description: t("interactiveMap.regions.northAmerica.description"),
      flag: "🇺🇸",
    },
    europe: {
      id: "europe",
      name: t("interactiveMap.regions.europe.name"),
      countries: t("interactiveMap.regions.europe.countries"),
      projects: "380+",
      clients: "220+",
      featured: t("interactiveMap.regions.europe.featured"),
      description: t("interactiveMap.regions.europe.description"),
      flag: "🇪🇺",
    },
    middleEast: {
      id: "middleEast",
      name: t("interactiveMap.regions.middleEast.name"),
      countries: t("interactiveMap.regions.middleEast.countries"),
      projects: "320+",
      clients: "180+",
      featured: t("interactiveMap.regions.middleEast.featured"),
      description: t("interactiveMap.regions.middleEast.description"),
      flag: "🇦🇪",
    },
    asiaPacific: {
      id: "asiaPacific",
      name: t("interactiveMap.regions.asiaPacific.name"),
      countries: t("interactiveMap.regions.asiaPacific.countries"),
      projects: "500+",
      clients: "350+",
      featured: t("interactiveMap.regions.asiaPacific.featured"),
      description: t("interactiveMap.regions.asiaPacific.description"),
      flag: "🇦🇺",
    },
    latinAmerica: {
      id: "latinAmerica",
      name: t("interactiveMap.regions.latinAmerica.name"),
      countries: t("interactiveMap.regions.latinAmerica.countries"),
      projects: "200+",
      clients: "120+",
      featured: t("interactiveMap.regions.latinAmerica.featured"),
      description: t("interactiveMap.regions.latinAmerica.description"),
      flag: "🇧🇷",
    },
    africa: {
      id: "africa",
      name: t("interactiveMap.regions.africa.name"),
      countries: t("interactiveMap.regions.africa.countries"),
      projects: "150+",
      clients: "90+",
      featured: t("interactiveMap.regions.africa.featured"),
      description: t("interactiveMap.regions.africa.description"),
      flag: "🇿🇦",
    },
  };

  const regionPaths: Record<string, { path: string; labelX: number; labelY: number }> = {
    northAmerica: {
      path: "M 50 80 L 180 80 L 200 120 L 180 180 L 120 200 L 80 180 L 40 140 Z",
      labelX: 120,
      labelY: 140,
    },
    latinAmerica: {
      path: "M 100 200 L 150 200 L 180 260 L 160 340 L 120 380 L 80 340 L 70 260 Z",
      labelX: 125,
      labelY: 290,
    },
    europe: {
      path: "M 280 70 L 380 60 L 400 100 L 380 140 L 320 160 L 280 140 L 260 100 Z",
      labelX: 330,
      labelY: 110,
    },
    africa: {
      path: "M 280 180 L 380 160 L 400 220 L 380 320 L 320 360 L 260 320 L 260 220 Z",
      labelX: 320,
      labelY: 260,
    },
    middleEast: {
      path: "M 400 120 L 480 100 L 520 140 L 500 200 L 440 220 L 400 180 Z",
      labelX: 460,
      labelY: 160,
    },
    asiaPacific: {
      path: "M 480 60 L 620 50 L 680 100 L 700 180 L 660 280 L 580 320 L 500 280 L 480 200 L 500 140 Z",
      labelX: 580,
      labelY: 180,
    },
  };

  const handleRegionClick = (regionId: string) => {
    setSelectedRegion(selectedRegion === regionId ? null : regionId);
  };

  const selectedData = selectedRegion ? regions[selectedRegion] : null;

  return (
    <section className="section-padding bg-gradient-to-b from-background to-muted/30">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            {t("interactiveMap.sectionLabel")}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mt-3 mb-4">
            {t("interactiveMap.title")} <span className="text-gradient">{t("interactiveMap.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            {t("interactiveMap.description")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Interactive Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-card rounded-3xl p-4 md:p-8 shadow-soft relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none" />
            
            <svg
              viewBox="0 0 750 420"
              className="w-full h-auto"
              style={{ maxHeight: "500px" }}
            >
              {/* Background grid */}
              <defs>
                <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-muted/20" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Region paths */}
              {Object.entries(regionPaths).map(([regionId, { path, labelX, labelY }]) => (
                <g key={regionId}>
                  <motion.path
                    d={path}
                    fill={selectedRegion === regionId ? "hsl(var(--primary))" : hoveredRegion === regionId ? "hsl(var(--primary) / 0.6)" : "hsl(var(--muted))"}
                    stroke="hsl(var(--primary))"
                    strokeWidth={selectedRegion === regionId || hoveredRegion === regionId ? 3 : 1.5}
                    className="cursor-pointer transition-colors duration-300"
                    onClick={() => handleRegionClick(regionId)}
                    onMouseEnter={() => setHoveredRegion(regionId)}
                    onMouseLeave={() => setHoveredRegion(null)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: Object.keys(regionPaths).indexOf(regionId) * 0.1 }}
                  />
                  
                  {/* Region label */}
                  <motion.g
                    className="pointer-events-none"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + Object.keys(regionPaths).indexOf(regionId) * 0.1 }}
                  >
                    <text
                      x={labelX}
                      y={labelY}
                      textAnchor="middle"
                      className="text-xs font-semibold fill-foreground"
                    >
                      {regions[regionId]?.flag} {regions[regionId]?.projects}
                    </text>
                  </motion.g>

                  {/* Pulse animation for selected region */}
                  {selectedRegion === regionId && (
                    <motion.circle
                      cx={labelX}
                      cy={labelY - 20}
                      r="8"
                      fill="hsl(var(--accent))"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </g>
              ))}

              {/* Connection lines */}
              <motion.path
                d="M 320 260 Q 400 200 460 160 M 460 160 Q 500 140 580 180 M 320 260 Q 280 200 330 110 M 330 110 Q 350 90 400 100"
                stroke="hsl(var(--primary) / 0.3)"
                strokeWidth="1"
                strokeDasharray="5,5"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 1 }}
              />
            </svg>

            <div className="mt-4 text-center text-sm text-muted-foreground">
              {t("interactiveMap.clickHint")}
            </div>
          </motion.div>

          {/* Region Details Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-3xl shadow-soft overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {selectedData ? (
                <motion.div
                  key={selectedData.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{selectedData.flag}</span>
                      <div>
                        <h3 className="font-heading font-bold text-xl">{selectedData.name}</h3>
                        <p className="text-sm text-muted-foreground">{selectedData.countries}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedRegion(null)}
                      className="p-2 hover:bg-muted rounded-full transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                    {selectedData.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-muted/50 rounded-xl p-4 text-center">
                      <Building2 className="w-5 h-5 text-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold text-primary">{selectedData.projects}</div>
                      <div className="text-xs text-muted-foreground">{t("interactiveMap.projectsLabel")}</div>
                    </div>
                    <div className="bg-muted/50 rounded-xl p-4 text-center">
                      <Users className="w-5 h-5 text-accent mx-auto mb-2" />
                      <div className="text-2xl font-bold text-accent">{selectedData.clients}</div>
                      <div className="text-xs text-muted-foreground">{t("interactiveMap.clientsLabel")}</div>
                    </div>
                  </div>

                  <div className="bg-primary/10 rounded-xl p-4 mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-4 h-4 text-primary" />
                      <span className="text-sm font-semibold">{t("interactiveMap.featuredProject")}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{selectedData.featured}</p>
                  </div>

                  <Button
                    className="w-full hero-gradient text-accent-foreground"
                    onClick={() => navigate(localizedPath("/contact"))}
                  >
                    {t("interactiveMap.startProject")}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-6 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                    <MapPin className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-heading font-bold text-lg mb-2">
                    {t("interactiveMap.selectRegion")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t("interactiveMap.selectRegionHint")}
                  </p>

                  {/* Quick stats */}
                  <div className="mt-6 pt-6 border-t space-y-3">
                    <h4 className="text-sm font-semibold text-muted-foreground">{t("interactiveMap.globalStats")}</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-muted/50 rounded-lg p-3">
                        <div className="text-xl font-bold text-primary">2,000+</div>
                        <div className="text-xs text-muted-foreground">{t("interactiveMap.totalProjects")}</div>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-3">
                        <div className="text-xl font-bold text-accent">50+</div>
                        <div className="text-xs text-muted-foreground">{t("interactiveMap.countriesServed")}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Region Quick Select Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          {Object.entries(regions).map(([regionId, region]) => (
            <button
              key={regionId}
              onClick={() => handleRegionClick(regionId)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedRegion === regionId
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-card hover:bg-muted border shadow-soft"
              }`}
            >
              {region.flag} {region.name}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
