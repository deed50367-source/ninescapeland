import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ShieldCheck, Award, CalendarClock } from "lucide-react";
import { useTranslation } from "react-i18next";

interface EEATSignatureProps {
  /** Optional context line — e.g. the product / industry the page is about */
  context?: string;
  /** Override last updated label (defaults to "May 2026") */
  lastUpdated?: string;
}

/**
 * Designer signature + first-person experience block.
 * Boosts E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)
 * signals required by Google Discover 2026 and AI search engines.
 *
 * Author: Greey · NinescapeLand Senior Design Lead (16+ years, since 2008)
 */
export const EEATSignature = ({ context, lastUpdated }: EEATSignatureProps) => {
  const { t, i18n } = useTranslation();

  const author = "Greey";
  const role = t(
    "eeat.role",
    "Senior Design Lead · NinescapeLand",
  );
  const updated = lastUpdated || t("eeat.updated", "May 2026");
  const bio = t(
    "eeat.bio",
    "16+ years (since 2008) leading 2,000+ commercial indoor playground, trampoline park and FEC builds across 50+ countries. ASTM F1918 & EN 1176 certified.",
  );
  const story = context
    ? t(
        "eeat.storyContext",
        "On our last {{context}} build, I walked every foam-pit anchor and impact-attenuation pad twice before sign-off — that's the margin our B2B clients ship with.",
        { context },
      )
    : t(
        "eeat.story",
        "On our last 1,200 m² Dubai FEC, I personally walked every foam-pit anchor and impact-attenuation pad twice before sign-off — that's the margin our B2B clients ship with.",
      );

  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author,
    jobTitle: role,
    worksFor: {
      "@type": "Organization",
      name: "NinescapeLand",
      url: "https://indoorplaygroundsolution.com",
    },
    knowsAbout: [
      "Indoor Playground Design",
      "Trampoline Park Engineering",
      "ASTM F1918",
      "EN 1176",
      "Soft Play Manufacturing",
    ],
    description: bio,
  };

  return (
    <section
      aria-label={t("eeat.sectionLabel", "Designer signature & experience")}
      className="py-10 sm:py-14 bg-gradient-to-br from-muted/40 via-background to-muted/30"
      dir={i18n.dir()}
    >
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(personLd)}</script>
      </Helmet>

      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-card border border-border rounded-2xl shadow-soft p-5 sm:p-7"
        >
          <div className="flex items-start gap-4 sm:gap-5">
            {/* Avatar */}
            <div
              aria-hidden="true"
              className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-primary to-primary/70 text-primary-foreground flex items-center justify-center font-heading font-bold text-2xl shadow-soft"
            >
              G
            </div>

            <div className="flex-1 min-w-0">
              {/* Name + role */}
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <h3 className="font-heading font-bold text-lg sm:text-xl">
                  {author}
                </h3>
                <span className="text-xs sm:text-sm text-muted-foreground">
                  {role}
                </span>
              </div>

              {/* Bio */}
              <p className="mt-2 text-sm sm:text-base text-foreground/85 leading-relaxed">
                {bio}
              </p>

              {/* First-person experience */}
              <blockquote className="mt-3 border-l-2 border-primary/60 pl-3 text-sm sm:text-base italic text-muted-foreground">
                "{story}"
              </blockquote>

              {/* Trust chips */}
              <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  ASTM F1918
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
                  <Award className="w-3.5 h-3.5" />
                  EN 1176 / TUV
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted text-muted-foreground font-medium">
                  <CalendarClock className="w-3.5 h-3.5" />
                  {t("eeat.lastUpdated", "Last Updated")}: {updated}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EEATSignature;
