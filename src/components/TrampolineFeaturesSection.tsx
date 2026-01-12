import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const zoneKeys = [
  "spongePlayZone",
  "plumBlossomPiles",
  "inflatableFootball",
  "slamDunkZone",
  "skyrider",
  "bicycle360",
  "climbingWall",
  "adventureChallenge",
  "freeJumpZone",
  "proTrampolineZone",
  "battleStickArena",
  "dodgeballZone",
] as const;

const zoneColors = [
  "from-cyan-500 to-blue-600",
  "from-purple-600 to-indigo-700",
  "from-green-500 to-emerald-600",
  "from-orange-500 to-amber-600",
  "from-yellow-500 to-orange-600",
  "from-pink-500 to-rose-600",
  "from-violet-600 to-purple-700",
  "from-fuchsia-500 to-pink-600",
  "from-blue-600 to-cyan-600",
  "from-red-600 to-orange-600",
  "from-teal-500 to-green-600",
  "from-amber-500 to-yellow-600",
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export const TrampolineFeaturesSection = () => {
  const { t } = useTranslation();

  return (
    <section id="features" className="section-padding bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            {t("trampolineFeatures.sectionLabel")}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-3 mb-6">
            {t("trampolineFeatures.title")} <span className="text-gradient">{t("trampolineFeatures.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            {t("trampolineFeatures.description")}
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {zoneKeys.map((zoneKey, index) => (
            <motion.div
              key={zoneKey}
              variants={item}
              className="group relative bg-card rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${zoneColors[index]} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-heading font-bold">{t(`trampolineFeatures.zones.${zoneKey}.title`)}</h3>
                  <CheckCircle className="w-5 h-5 text-primary opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(`trampolineFeatures.zones.${zoneKey}.description`)}
                </p>
              </div>

              {/* Hover Effect Border */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${zoneColors[index]} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground mb-4">
            {t("trampolineFeatures.mixMatch")}
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full shadow-soft">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>{t("trampolineFeatures.modularDesign")}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full shadow-soft">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>{t("trampolineFeatures.customLayouts")}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full shadow-soft">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>{t("trampolineFeatures.scalableSolutions")}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};