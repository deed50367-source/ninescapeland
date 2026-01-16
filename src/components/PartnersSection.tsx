import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Shield, Award, CheckCircle, BadgeCheck } from "lucide-react";

const certifications = [
  { icon: Shield, key: "partners.certifications.iso" },
  { icon: Award, key: "partners.certifications.astm" },
  { icon: CheckCircle, key: "partners.certifications.en" },
  { icon: BadgeCheck, key: "partners.certifications.tuv" },
];

export const PartnersSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-12 md:py-16 bg-muted/50 overflow-hidden">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            {t("partners.sectionLabel")}
          </span>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-heading font-bold mt-3">
            {t("partners.title")}
          </h2>
        </motion.div>

        {/* Certifications */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.key}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center p-4 md:p-6 bg-background rounded-2xl shadow-soft hover:shadow-medium transition-all group"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary transition-colors">
                <cert.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <span className="font-semibold text-sm md:text-base">{t(`${cert.key}.name`)}</span>
              <span className="text-xs text-muted-foreground mt-1">{t(`${cert.key}.description`)}</span>
            </motion.div>
          ))}
        </div>

        {/* Partner Logos Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-muted/50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-muted/50 to-transparent z-10 pointer-events-none" />
          
          <div className="flex animate-marquee gap-12 py-4">
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex gap-12 items-center shrink-0">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <div
                    key={`${setIndex}-${num}`}
                    className="w-24 md:w-32 h-12 md:h-16 bg-background/80 rounded-lg flex items-center justify-center px-4 shadow-sm"
                  >
                    <span className="text-muted-foreground/50 font-bold text-xs md:text-sm">
                      {t(`partners.clients.${num - 1}`, `Client ${num}`)}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
