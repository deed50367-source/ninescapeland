import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { MapPin, X, Building2, Users, Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import worldMapPaths from "@/config/worldMapPaths.json";

interface RegionData {
  id: string;
  name: string;
  countries: string;
  projects: string;
  clients: string;
  featured: string;
  description: string;
  flag: string;
  heatIntensity: number; // 0-1 for heatmap
}

// Natural Earth country outlines, simplified locally; no runtime map service.
const HQ_LOCATION = { x: 752, y: 148 };
const markers: Record<string, { x: number; y: number }> = {
  northAmerica: { x: 188, y: 128 },
  latinAmerica: { x: 297, y: 303 },
  europe: { x: 468, y: 105 },
  middleEast: { x: 560, y: 190 },
  asiaPacific: { x: 782, y: 287 },
  africa: { x: 470, y: 268 },
};

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
      heatIntensity: 0.85,
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
      heatIntensity: 0.75,
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
      heatIntensity: 0.7,
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
      heatIntensity: 0.95,
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
      heatIntensity: 0.5,
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
      heatIntensity: 0.4,
    },
  };

  const handleRegionClick = (regionId: string) => {
    setSelectedRegion(selectedRegion === regionId ? null : regionId);
  };

  const selectedData = selectedRegion ? regions[selectedRegion] : null;

  return (
    <MotionConfig reducedMotion="user">
    <section className="section-padding bg-background overflow-hidden" data-world-map>
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-accent font-semibold text-sm">
            {t("interactiveMap.sectionLabel")}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mt-3 mb-4">
            {t("interactiveMap.title")} <span className="text-foreground">{t("interactiveMap.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            {t("interactiveMap.description")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[minmax(0,2.3fr)_minmax(280px,1fr)] gap-8 items-start">
          <div className="relative min-w-0 overflow-hidden rounded-lg border border-border bg-muted/40">
            <svg viewBox="0 0 900 420" className="block w-full h-auto" role="img" aria-label={t("interactiveMap.title")}>
              <title>{t("interactiveMap.title")} {t("interactiveMap.titleHighlight")}</title>
              <g className="fill-border stroke-background" strokeWidth="0.65" strokeLinejoin="round">
                {worldMapPaths.map(country => <path key={country.id} d={country.path} />)}
              </g>
              {Object.entries(markers).map(([id, point]) => {
                const active = selectedRegion === id || hoveredRegion === id;
                return <path key={id}
                  d={`M ${HQ_LOCATION.x} ${HQ_LOCATION.y} Q ${(HQ_LOCATION.x + point.x) / 2} ${Math.min(HQ_LOCATION.y, point.y) - 65} ${point.x} ${point.y}`}
                  fill="none" className={active ? "stroke-primary" : "stroke-primary/20"}
                  strokeWidth={active ? 2 : 1} strokeDasharray={active ? undefined : "4 5"} />;
              })}
              <g className="fill-accent stroke-background" strokeWidth="3">
                <circle cx={HQ_LOCATION.x} cy={HQ_LOCATION.y} r="7" />
              </g>
              <text x={HQ_LOCATION.x} y={HQ_LOCATION.y - 16} textAnchor="middle" className="fill-foreground font-heading font-bold text-sm">NinescapeLand</text>
              {Object.entries(markers).map(([id, point]) => {
                const region = regions[id];
                const active = selectedRegion === id || hoveredRegion === id;
                return <g key={id} className="pointer-events-none">
                  <circle cx={point.x} cy={point.y} r={active ? 10 : 7} className="fill-primary stroke-background" strokeWidth="3" />
                  <g className="hidden sm:block">
                    <rect x={point.x - 40} y={point.y + 15} width="80" height="33" rx="6"
                      className={active ? "fill-primary" : "fill-card stroke-border"} strokeWidth="1" />
                    <text x={point.x} y={point.y + 38} textAnchor="middle"
                      className={`font-heading font-bold text-lg ${active ? "fill-primary-foreground" : "fill-foreground"}`}>{region.projects}</text>
                  </g>
                </g>;
              })}
            </svg>
            <div className="grid grid-cols-2 sm:grid-cols-3 border-t border-border">
              {Object.entries(regions).map(([id, region]) => (
                <Button key={id} variant="ghost" aria-pressed={selectedRegion === id}
                  onClick={() => handleRegionClick(id)}
                  onMouseEnter={() => setHoveredRegion(id)} onMouseLeave={() => setHoveredRegion(null)}
                  onFocus={() => setHoveredRegion(id)} onBlur={() => setHoveredRegion(null)}
                  className={`h-auto min-h-16 rounded-none px-3 py-3 flex items-center justify-between gap-2 whitespace-normal text-start ${selectedRegion === id ? "bg-primary/10 text-primary" : "text-foreground"}`}>
                  <span className="text-xs sm:text-sm font-medium">{region.name}</span>
                  <span className="font-heading text-base font-bold tabular-nums shrink-0">{region.projects}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Region Details Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-background lg:border-s border-border lg:ps-2 overflow-hidden"
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
                    <Button variant="ghost" size="icon" aria-label={t("interactiveMap.selectRegion")} onClick={() => setSelectedRegion(null)}>
                      <X className="w-4 h-4" />
                    </Button>
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
                    variant="hero"
                    className="w-full"
                    onClick={() => {
                      navigate(localizedPath("/contact"));
                      // Scroll to top after navigation
                      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
                    }}
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


      </div>
    </section>
    </MotionConfig>
  );
};
