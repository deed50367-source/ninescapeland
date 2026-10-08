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
    <section id="features" className="section-padding bg-muted/50">
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
          {zoneKeys.map((zoneKey) => (
            <motion.div
              key={zoneKey}
              variants={item}
              className="group relative bg-card rounded-lg p-6 border border-border hover:shadow-soft transition-all duration-300 overflow-hidden"
            >
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