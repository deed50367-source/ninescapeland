import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { NinjaFeaturesSection } from "@/components/NinjaFeaturesSection";
import { QuoteCalculator } from "@/components/QuoteCalculator";
import { ProductFAQ } from "@/components/ProductFAQ";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { Link } from "react-router-dom";
import { getStorageUrl } from "@/config/galleryImages";
import { motion } from "framer-motion";
import { 
  Target, 
  Shield, 
  Trophy, 
  Layers, 
  ArrowRight,
  CheckCircle,
  Star,
  Award,
  Clock,
  Truck,
  Wrench,
  Quote,
  MapPin,
  Ruler,
  Building2,
  Flame,
  Zap,
  Mountain,
  Timer,
  Users,
  Dumbbell,
  Hand,
  Brain,
  Heart,
  Smile,
  ShieldCheck,
  FileCheck,
  Settings,
  Baby,
  User,
  Home,
  Lightbulb,
  Pencil,
  Factory,
  Package,
  Headphones
} from "lucide-react";

const NinjaCourse = () => {
  const { t } = useTranslation();
  const { localizedPath } = useLocalizedPath();

  const heroImage = getStorageUrl("dcbc5ed3-1863-4db6-bacf-59919b3abec6/1768294404756-dg7aeb.jpg");

  const features = [
    {
      icon: Target,
      titleKey: "productPages.ninjaCourse.features.obstacles.title",
      descKey: "productPages.ninjaCourse.features.obstacles.description"
    },
    {
      icon: Shield,
      titleKey: "productPages.ninjaCourse.features.safety.title",
      descKey: "productPages.ninjaCourse.features.safety.description"
    },
    {
      icon: Trophy,
      titleKey: "productPages.ninjaCourse.features.competition.title",
      descKey: "productPages.ninjaCourse.features.competition.description"
    },
    {
      icon: Layers,
      titleKey: "productPages.ninjaCourse.features.customizable.title",
      descKey: "productPages.ninjaCourse.features.customizable.description"
    }
  ];

  const galleryImages = [
    getStorageUrl("dcbc5ed3-1863-4db6-bacf-59919b3abec6/1768294404756-dg7aeb.jpg"),
    getStorageUrl("dcbc5ed3-1863-4db6-bacf-59919b3abec6/1768294408691-xypop.jpg"),
    getStorageUrl("dcbc5ed3-1863-4db6-bacf-59919b3abec6/1768294381259-ig9ii.jpg"),
    getStorageUrl("dcbc5ed3-1863-4db6-bacf-59919b3abec6/1768294376731-g5jiv8.jpg"),
    getStorageUrl("dcbc5ed3-1863-4db6-bacf-59919b3abec6/1768294400190-bx9gha.jpg"),
    getStorageUrl("dcbc5ed3-1863-4db6-bacf-59919b3abec6/1768294404756-dg7aeb.jpg")
  ];

  const obstacles = [
    "productPages.ninjaCourse.obstacles.warped",
    "productPages.ninjaCourse.obstacles.salmon",
    "productPages.ninjaCourse.obstacles.rings",
    "productPages.ninjaCourse.obstacles.cargo",
    "productPages.ninjaCourse.obstacles.balance",
    "productPages.ninjaCourse.obstacles.rope",
    "productPages.ninjaCourse.obstacles.monkey",
    "productPages.ninjaCourse.obstacles.climbing"
  ];

  const stats = [
    { value: "50+", labelKey: "productPages.ninjaCourse.stats.obstacles" },
    { value: "200+", labelKey: "productPages.ninjaCourse.stats.projects" },
    { value: "30+", labelKey: "productPages.ninjaCourse.stats.countries" },
    { value: "15+", labelKey: "productPages.ninjaCourse.stats.years" }
  ];

  const difficultyLevels = [
    {
      icon: Users,
      level: "productPages.ninjaCourse.levels.beginner.title",
      description: "productPages.ninjaCourse.levels.beginner.description",
      color: "bg-green-500"
    },
    {
      icon: Zap,
      level: "productPages.ninjaCourse.levels.intermediate.title",
      description: "productPages.ninjaCourse.levels.intermediate.description",
      color: "bg-yellow-500"
    },
    {
      icon: Flame,
      level: "productPages.ninjaCourse.levels.advanced.title",
      description: "productPages.ninjaCourse.levels.advanced.description",
      color: "bg-orange-500"
    },
    {
      icon: Mountain,
      level: "productPages.ninjaCourse.levels.elite.title",
      description: "productPages.ninjaCourse.levels.elite.description",
      color: "bg-red-500"
    }
  ];

  // Extended obstacles
  const extendedObstacles = [
    { titleKey: "productPages.ninjaCourse.extendedObstacles.quintSteps.title", descKey: "productPages.ninjaCourse.extendedObstacles.quintSteps.description" },
    { titleKey: "productPages.ninjaCourse.extendedObstacles.spiderWall.title", descKey: "productPages.ninjaCourse.extendedObstacles.spiderWall.description" },
    { titleKey: "productPages.ninjaCourse.extendedObstacles.swingRopes.title", descKey: "productPages.ninjaCourse.extendedObstacles.swingRopes.description" },
    { titleKey: "productPages.ninjaCourse.extendedObstacles.rollingLog.title", descKey: "productPages.ninjaCourse.extendedObstacles.rollingLog.description" },
    { titleKey: "productPages.ninjaCourse.extendedObstacles.pegBoard.title", descKey: "productPages.ninjaCourse.extendedObstacles.pegBoard.description" },
    { titleKey: "productPages.ninjaCourse.extendedObstacles.doorKnobs.title", descKey: "productPages.ninjaCourse.extendedObstacles.doorKnobs.description" },
    { titleKey: "productPages.ninjaCourse.extendedObstacles.pipeFitter.title", descKey: "productPages.ninjaCourse.extendedObstacles.pipeFitter.description" },
    { titleKey: "productPages.ninjaCourse.extendedObstacles.cannonball.title", descKey: "productPages.ninjaCourse.extendedObstacles.cannonball.description" }
  ];

  // Training benefits
  const trainingBenefits = [
    { icon: Dumbbell, titleKey: "productPages.ninjaCourse.trainingBenefits.strength.title", descKey: "productPages.ninjaCourse.trainingBenefits.strength.description" },
    { icon: Hand, titleKey: "productPages.ninjaCourse.trainingBenefits.grip.title", descKey: "productPages.ninjaCourse.trainingBenefits.grip.description" },
    { icon: Zap, titleKey: "productPages.ninjaCourse.trainingBenefits.agility.title", descKey: "productPages.ninjaCourse.trainingBenefits.agility.description" },
    { icon: Brain, titleKey: "productPages.ninjaCourse.trainingBenefits.mental.title", descKey: "productPages.ninjaCourse.trainingBenefits.mental.description" },
    { icon: Target, titleKey: "productPages.ninjaCourse.trainingBenefits.coordination.title", descKey: "productPages.ninjaCourse.trainingBenefits.coordination.description" },
    { icon: Heart, titleKey: "productPages.ninjaCourse.trainingBenefits.confidence.title", descKey: "productPages.ninjaCourse.trainingBenefits.confidence.description" }
  ];

  // Safety features
  const safetyFeatures = [
    { icon: ShieldCheck, titleKey: "productPages.ninjaCourse.safetySection.crashMats.title", descKey: "productPages.ninjaCourse.safetySection.crashMats.description" },
    { icon: Shield, titleKey: "productPages.ninjaCourse.safetySection.harnesses.title", descKey: "productPages.ninjaCourse.safetySection.harnesses.description" },
    { icon: FileCheck, titleKey: "productPages.ninjaCourse.safetySection.padding.title", descKey: "productPages.ninjaCourse.safetySection.padding.description" },
    { icon: Award, titleKey: "productPages.ninjaCourse.safetySection.certification.title", descKey: "productPages.ninjaCourse.safetySection.certification.description" }
  ];

  // Age groups
  const ageGroups = [
    { icon: Smile, age: "6-12", titleKey: "productPages.ninjaCourse.ageGroups.kids.title", descKey: "productPages.ninjaCourse.ageGroups.kids.description" },
    { icon: User, age: "13-17", titleKey: "productPages.ninjaCourse.ageGroups.teens.title", descKey: "productPages.ninjaCourse.ageGroups.teens.description" },
    { icon: Dumbbell, age: "18+", titleKey: "productPages.ninjaCourse.ageGroups.adults.title", descKey: "productPages.ninjaCourse.ageGroups.adults.description" },
    { icon: Home, age: "All", titleKey: "productPages.ninjaCourse.ageGroups.family.title", descKey: "productPages.ninjaCourse.ageGroups.family.description" }
  ];

  // Design process
  const processSteps = [
    { icon: Lightbulb, step: 1, titleKey: "productPages.ninjaCourse.processSection.consultation.title", descKey: "productPages.ninjaCourse.processSection.consultation.description" },
    { icon: Pencil, step: 2, titleKey: "productPages.ninjaCourse.processSection.design.title", descKey: "productPages.ninjaCourse.processSection.design.description" },
    { icon: Factory, step: 3, titleKey: "productPages.ninjaCourse.processSection.production.title", descKey: "productPages.ninjaCourse.processSection.production.description" },
    { icon: Package, step: 4, titleKey: "productPages.ninjaCourse.processSection.shipping.title", descKey: "productPages.ninjaCourse.processSection.shipping.description" },
    { icon: Settings, step: 5, titleKey: "productPages.ninjaCourse.processSection.installation.title", descKey: "productPages.ninjaCourse.processSection.installation.description" },
    { icon: Headphones, step: 6, titleKey: "productPages.ninjaCourse.processSection.support.title", descKey: "productPages.ninjaCourse.processSection.support.description" }
  ];

  const advantages = [
    {
      icon: Award,
      titleKey: "productPages.ninjaCourse.advantages.certified.title",
      descKey: "productPages.ninjaCourse.advantages.certified.description"
    },
    {
      icon: Clock,
      titleKey: "productPages.ninjaCourse.advantages.production.title",
      descKey: "productPages.ninjaCourse.advantages.production.description"
    },
    {
      icon: Truck,
      titleKey: "productPages.ninjaCourse.advantages.shipping.title",
      descKey: "productPages.ninjaCourse.advantages.shipping.description"
    },
    {
      icon: Wrench,
      titleKey: "productPages.ninjaCourse.advantages.installation.title",
      descKey: "productPages.ninjaCourse.advantages.installation.description"
    }
  ];

  const cases = [
    {
      image: galleryImages[0],
      titleKey: "productPages.ninjaCourse.cases.ninja1.title",
      locationKey: "productPages.ninjaCourse.cases.ninja1.location",
      size: "800",
      features: ["12 Obstacles", "Competition Grade", "LED Lighting"]
    },
    {
      image: galleryImages[2],
      titleKey: "productPages.ninjaCourse.cases.ninja2.title",
      locationKey: "productPages.ninjaCourse.cases.ninja2.location",
      size: "600",
      features: ["8 Obstacles", "Kids Friendly", "Timing System"]
    }
  ];

  const testimonials = [
    {
      name: "Mike Johnson",
      location: "productPages.ninjaCourse.testimonials.mike.location",
      quote: "productPages.ninjaCourse.testimonials.mike.quote",
      rating: 5
    },
    {
      name: "Lisa Chen",
      location: "productPages.ninjaCourse.testimonials.lisa.location",
      quote: "productPages.ninjaCourse.testimonials.lisa.quote",
      rating: 5
    },
    {
      name: "Robert Williams",
      location: "productPages.ninjaCourse.testimonials.robert.location",
      quote: "productPages.ninjaCourse.testimonials.robert.quote",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <PageHero
          titleKey="productPages.ninjaCourse.title"
          titleHighlightKey="productPages.ninjaCourse.titleHighlight"
          descriptionKey="productPages.ninjaCourse.description"
          backgroundImage={heroImage}
        />

        {/* Stats Section */}
        <section className="py-12 bg-primary">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
                    {stat.value}
                  </div>
                  <div className="text-primary-foreground/80 text-sm md:text-base">
                    {t(stat.labelKey)}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                {t("productPages.ninjaCourse.featuresLabel")}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("productPages.ninjaCourse.featuresTitle")}{" "}
                <span className="text-primary">{t("productPages.ninjaCourse.featuresTitleHighlight")}</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow h-full">
                    <CardContent className="p-6 text-center">
                      <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                        <feature.icon className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{t(feature.titleKey)}</h3>
                      <p className="text-muted-foreground text-sm">{t(feature.descKey)}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Difficulty Levels Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                {t("productPages.ninjaCourse.levelsLabel")}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("productPages.ninjaCourse.levelsTitle")}{" "}
                <span className="text-primary">{t("productPages.ninjaCourse.levelsTitleHighlight")}</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t("productPages.ninjaCourse.levelsDescription")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {difficultyLevels.map((level, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 h-full">
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 ${level.color} rounded-xl flex items-center justify-center mb-4`}>
                        <level.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{t(level.level)}</h3>
                      <p className="text-muted-foreground text-sm">{t(level.description)}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Ninja Features - Existing Component */}
        <NinjaFeaturesSection />

        {/* Obstacles Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <img 
                  src={galleryImages[1]}
                  alt="Ninja warrior obstacles"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-4 rounded-xl shadow-lg">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    <span className="font-semibold">{t("productPages.ninjaCourse.competitionGrade")}</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Badge variant="secondary" className="mb-4">
                  {t("productPages.ninjaCourse.obstaclesLabel")}
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {t("productPages.ninjaCourse.obstaclesTitle")}{" "}
                  <span className="text-primary">{t("productPages.ninjaCourse.obstaclesTitleHighlight")}</span>
                </h2>
                <p className="text-muted-foreground mb-8">
                  {t("productPages.ninjaCourse.obstaclesDescription")}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  {obstacles.map((obstacle, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm">{t(obstacle)}</span>
                    </motion.div>
                  ))}
                </div>

                <Link to={localizedPath("/contact")}>
                  <Button size="lg" className="group">
                    {t("productPages.ninjaCourse.cta")}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Extended Obstacles Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Badge variant="secondary" className="mb-4">More Obstacles</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Extended <span className="text-primary">Challenge Elements</span></h2>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {extendedObstacles.map((obs, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
                  <Card className="h-full border-0 shadow-lg"><CardContent className="p-4">
                    <h4 className="font-semibold mb-1">{t(obs.titleKey)}</h4>
                    <p className="text-muted-foreground text-xs">{t(obs.descKey)}</p>
                  </CardContent></Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Training Benefits Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Badge variant="secondary" className="mb-4">{t("productPages.ninjaCourse.trainingBenefits.sectionLabel")}</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("productPages.ninjaCourse.trainingBenefits.title")} <span className="text-primary">{t("productPages.ninjaCourse.trainingBenefits.titleHighlight")}</span></h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">{t("productPages.ninjaCourse.trainingBenefits.description")}</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trainingBenefits.map((benefit, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <Card className="h-full border-0 shadow-lg"><CardContent className="p-6 text-center">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center"><benefit.icon className="w-7 h-7 text-accent" /></div>
                    <h3 className="text-lg font-semibold mb-2">{t(benefit.titleKey)}</h3>
                    <p className="text-muted-foreground text-sm">{t(benefit.descKey)}</p>
                  </CardContent></Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Safety Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Badge variant="secondary" className="mb-4 bg-white/20 text-white">{t("productPages.ninjaCourse.safetySection.sectionLabel")}</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("productPages.ninjaCourse.safetySection.title")} <span className="text-white/80">{t("productPages.ninjaCourse.safetySection.titleHighlight")}</span></h2>
              <p className="text-primary-foreground/80 max-w-2xl mx-auto">{t("productPages.ninjaCourse.safetySection.description")}</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {safetyFeatures.map((feature, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <Card className="bg-white/10 border-white/20 h-full"><CardContent className="p-6 text-center">
                    <feature.icon className="w-10 h-10 mx-auto mb-4 text-white" />
                    <h3 className="text-lg font-semibold mb-2 text-white">{t(feature.titleKey)}</h3>
                    <p className="text-white/80 text-sm">{t(feature.descKey)}</p>
                  </CardContent></Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Age Groups Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Badge variant="secondary" className="mb-4">{t("productPages.ninjaCourse.ageGroups.sectionLabel")}</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("productPages.ninjaCourse.ageGroups.title")} <span className="text-primary">{t("productPages.ninjaCourse.ageGroups.titleHighlight")}</span></h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">{t("productPages.ninjaCourse.ageGroups.description")}</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ageGroups.map((group, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <Card className="h-full border-0 shadow-lg text-center"><CardContent className="p-6">
                    <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center"><group.icon className="w-7 h-7 text-primary" /></div>
                    <Badge variant="outline" className="mb-3">{group.age}</Badge>
                    <h3 className="text-lg font-semibold mb-2">{t(group.titleKey)}</h3>
                    <p className="text-muted-foreground text-sm">{t(group.descKey)}</p>
                  </CardContent></Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Badge variant="secondary" className="mb-4">{t("productPages.ninjaCourse.processSection.sectionLabel")}</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("productPages.ninjaCourse.processSection.title")} <span className="text-primary">{t("productPages.ninjaCourse.processSection.titleHighlight")}</span></h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">{t("productPages.ninjaCourse.processSection.description")}</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {processSteps.map((step, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <Card className="h-full border-0 shadow-lg"><CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">{step.step}</div>
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{t(step.titleKey)}</h3>
                    <p className="text-muted-foreground text-sm">{t(step.descKey)}</p>
                  </CardContent></Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Advantages Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                {t("productPages.ninjaCourse.advantagesLabel")}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("productPages.ninjaCourse.advantagesTitle")}{" "}
                <span className="text-primary">{t("productPages.ninjaCourse.advantagesTitleHighlight")}</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {advantages.map((advantage, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 h-full bg-background">
                    <CardContent className="p-6 text-center">
                      <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                        <advantage.icon className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{t(advantage.titleKey)}</h3>
                      <p className="text-muted-foreground text-sm">{t(advantage.descKey)}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                {t("productPages.ninjaCourse.casesLabel")}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("productPages.ninjaCourse.casesTitle")}{" "}
                <span className="text-primary">{t("productPages.ninjaCourse.casesTitleHighlight")}</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {cases.map((caseItem, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-shadow">
                    <div className="relative h-64">
                      <img 
                        src={caseItem.image} 
                        alt={t(caseItem.titleKey)}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-bold text-white mb-1">{t(caseItem.titleKey)}</h3>
                        <div className="flex items-center gap-2 text-white/80 text-sm">
                          <MapPin className="w-4 h-4" />
                          <span>{t(caseItem.locationKey)}</span>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Ruler className="w-4 h-4 text-primary" />
                          <span className="text-sm">{caseItem.size} m²</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Timer className="w-4 h-4 text-primary" />
                          <span className="text-sm">30 {t("productPages.ninjaCourse.days")}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {caseItem.features.map((feature, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                {t("productPages.ninjaCourse.testimonialsLabel")}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("productPages.ninjaCourse.testimonialsTitle")}{" "}
                <span className="text-primary">{t("productPages.ninjaCourse.testimonialsTitleHighlight")}</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-0 shadow-lg h-full bg-background">
                    <CardContent className="p-6">
                      <Quote className="w-10 h-10 text-primary/20 mb-4" />
                      <p className="text-muted-foreground mb-6 italic">
                        "{t(testimonial.quote)}"
                      </p>
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{t(testimonial.location)}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                {t("productPages.ninjaCourse.galleryLabel")}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("productPages.ninjaCourse.galleryTitle")}{" "}
                <span className="text-primary">{t("productPages.ninjaCourse.galleryTitleHighlight")}</span>
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryImages.map((image, index) => (
                <motion.div 
                  key={index} 
                  className="relative aspect-[4/3] rounded-xl overflow-hidden group"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <img 
                    src={image} 
                    alt={`Ninja course ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                {t("productPages.ninjaCourse.ctaSection.title")}
              </h2>
              <p className="text-primary-foreground/80 mb-8 text-lg">
                {t("productPages.ninjaCourse.ctaSection.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={localizedPath("/contact")}>
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto group">
                    {t("productPages.ninjaCourse.ctaSection.getQuote")}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to={localizedPath("/projects")}>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                    {t("productPages.ninjaCourse.ctaSection.viewProjects")}
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <ProductFAQ productType="ninjaCourse" />
        <QuoteCalculator />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default NinjaCourse;
