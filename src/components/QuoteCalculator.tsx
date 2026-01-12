import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, ArrowRight, Check, Info } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";

interface PriceRange {
  min: number;
  max: number;
}

const productTypes = [
  {
    id: "indoor-playground",
    name: "Indoor Playground",
    description: "Multi-level play structures",
    pricePerSqm: { min: 200, max: 400 },
    icon: "🎪",
  },
  {
    id: "trampoline-park",
    name: "Trampoline Park",
    description: "Complete trampoline solutions",
    pricePerSqm: { min: 250, max: 450 },
    icon: "🤸",
  },
  {
    id: "ninja-course",
    name: "Ninja Warrior Course",
    description: "Professional obstacle courses",
    pricePerSqm: { min: 180, max: 350 },
    icon: "🥷",
  },
  {
    id: "soft-play",
    name: "Soft Play Area",
    description: "Toddler-friendly equipment",
    pricePerSqm: { min: 150, max: 300 },
    icon: "🧸",
  },
  {
    id: "fec",
    name: "Family Entertainment Center",
    description: "Complete FEC solutions",
    pricePerSqm: { min: 300, max: 550 },
    icon: "🎢",
  },
];

const qualityLevels = [
  { id: "standard", name: "Standard", multiplier: 1 },
  { id: "premium", name: "Premium", multiplier: 1.3 },
  { id: "luxury", name: "Luxury", multiplier: 1.6 },
];

export const QuoteCalculator = () => {
  const [selectedType, setSelectedType] = useState<string>("");
  const [area, setArea] = useState<number>(200);
  const [qualityLevel, setQualityLevel] = useState<string>("standard");
  const [showResult, setShowResult] = useState(false);

  const selectedProduct = productTypes.find((p) => p.id === selectedType);
  const selectedQuality = qualityLevels.find((q) => q.id === qualityLevel);

  const calculatePrice = (): PriceRange | null => {
    if (!selectedProduct || !selectedQuality) return null;

    const min = Math.round(
      selectedProduct.pricePerSqm.min * area * selectedQuality.multiplier
    );
    const max = Math.round(
      selectedProduct.pricePerSqm.max * area * selectedQuality.multiplier
    );

    return { min, max };
  };

  const price = calculatePrice();

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleCalculate = () => {
    if (selectedType && area > 0) {
      setShowResult(true);
    }
  };

  return (
    <section id="quote-calculator" className="section-padding bg-muted">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Instant Estimate
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-3 mb-6">
            Online <span className="text-gradient">Quote Calculator</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Get an instant estimate for your project. Select your equipment type and
            enter your space dimensions for a ballpark quote.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-card rounded-2xl p-6 md:p-10 shadow-medium"
        >
          {/* Step 1: Select Product Type */}
          <div className="mb-8">
            <h3 className="text-lg font-heading font-bold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">
                1
              </span>
              Select Equipment Type
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {productTypes.map((product) => (
                <button
                  key={product.id}
                  onClick={() => {
                    setSelectedType(product.id);
                    setShowResult(false);
                  }}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    selectedType === product.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <span className="text-2xl mb-2 block">{product.icon}</span>
                  <h4 className="font-semibold text-sm">{product.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {product.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Enter Area */}
          <div className="mb-8">
            <h3 className="text-lg font-heading font-bold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">
                2
              </span>
              Enter Space Area (m²)
            </h3>
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <Slider
                  value={[area]}
                  onValueChange={(value) => {
                    setArea(value[0]);
                    setShowResult(false);
                  }}
                  min={50}
                  max={2000}
                  step={10}
                  className="py-4"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-1">
                  <span>50 m²</span>
                  <span>2,000 m²</span>
                </div>
              </div>
              <div className="w-32">
                <Input
                  type="number"
                  value={area}
                  onChange={(e) => {
                    setArea(Number(e.target.value));
                    setShowResult(false);
                  }}
                  min={50}
                  max={5000}
                  className="text-center text-lg font-semibold h-14"
                />
                <span className="text-xs text-muted-foreground block text-center mt-1">
                  Square Meters
                </span>
              </div>
            </div>
          </div>

          {/* Step 3: Quality Level */}
          <div className="mb-8">
            <h3 className="text-lg font-heading font-bold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">
                3
              </span>
              Select Quality Level
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {qualityLevels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => {
                    setQualityLevel(level.id);
                    setShowResult(false);
                  }}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${
                    qualityLevel === level.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <h4 className="font-semibold">{level.name}</h4>
                  {level.id !== "standard" && (
                    <p className="text-xs text-muted-foreground">
                      +{Math.round((level.multiplier - 1) * 100)}%
                    </p>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Calculate Button */}
          <div className="text-center mb-8">
            <Button
              variant="hero"
              size="xl"
              onClick={handleCalculate}
              disabled={!selectedType || area < 50}
              className="min-w-64"
            >
              <Calculator className="w-5 h-5" />
              Calculate Estimate
            </Button>
          </div>

          {/* Result */}
          {showResult && price && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-2xl p-8 text-center"
            >
              <h3 className="text-xl font-heading mb-2">Estimated Price Range</h3>
              <div className="text-4xl md:text-5xl font-heading font-bold mb-4">
                {formatPrice(price.min)} - {formatPrice(price.max)}
              </div>
              <div className="flex flex-wrap justify-center gap-4 text-sm mb-6">
                <span className="flex items-center gap-1">
                  <Check className="w-4 h-4" />
                  {selectedProduct?.name}
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-4 h-4" />
                  {area} m²
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-4 h-4" />
                  {selectedQuality?.name} Quality
                </span>
              </div>
              <p className="text-primary-foreground/80 text-sm mb-6 flex items-center justify-center gap-2">
                <Info className="w-4 h-4" />
                Final price depends on design complexity, theme, and installation requirements
              </p>
              <Button
                variant="secondary"
                size="lg"
                asChild
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                <a href="#contact" className="group">
                  Get Accurate Quote
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
