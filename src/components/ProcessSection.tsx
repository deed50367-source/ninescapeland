import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Lightbulb, Palette, Cog, Truck, Wrench, CheckCircle2 } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

export const ProcessSection = () => {
  const { t } = useTranslation();

  const steps = [
    {
      icon: Lightbulb,
      title: t("process.steps.consultation.title"),
      description: t("process.steps.consultation.description"),
      number: "01",
    },
    {
      icon: Palette,
      title: t("process.steps.design.title"),
      description: t("process.steps.design.description"),
      number: "02",
    },
    {
      icon: Cog,
      title: t("process.steps.manufacturing.title"),
      description: t("process.steps.manufacturing.description"),
      number: "03",
    },
    {
      icon: Truck,
      title: t("process.steps.shipping.title"),
      description: t("process.steps.shipping.description"),
      number: "04",
    },
    {
      icon: Wrench,
      title: t("process.steps.installation.title"),
      description: t("process.steps.installation.description"),
      number: "05",
    },
    {
      icon: CheckCircle2,
      title: t("process.steps.afterSales.title"),
      description: t("process.steps.afterSales.description"),
      number: "06",
    },
  ];

  return (
    <section id="process" className="section-padding bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container-wide relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            {t("process.sectionLabel")}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-3 mb-6">
            {t("process.title")} <span className="text-gradient">{t("process.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            {t("process.description")}
          </p>
        </motion.div>

        {/* Process Steps */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Connecting Line - Desktop */}
          <div className="hidden lg:block absolute top-0 left-0 right-0 h-full">
            <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
              <path
                d="M 100 100 Q 300 150, 500 100 T 900 100 Q 1000 100, 1100 150"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                strokeDasharray="5,5"
                opacity="0.2"
              />
            </svg>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={item}
                className="relative group"
              >
                {/* Card */}
                <div className="relative bg-card rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 h-full">
                  {/* Number Badge */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full hero-gradient text-accent-foreground font-heading font-bold text-xl flex items-center justify-center shadow-glow">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                    <step.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-heading font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-3 gap-6"
        >
          <div className="text-center p-6 bg-card rounded-2xl shadow-soft">
            <div className="text-3xl font-heading font-bold text-gradient mb-2">25-35 Days</div>
            <div className="text-muted-foreground">{t("process.timeline.production")}</div>
          </div>
          <div className="text-center p-6 bg-card rounded-2xl shadow-soft">
            <div className="text-3xl font-heading font-bold text-gradient mb-2">20-35 Days</div>
            <div className="text-muted-foreground">{t("process.timeline.shipping")}</div>
          </div>
          <div className="text-center p-6 bg-card rounded-2xl shadow-soft">
            <div className="text-3xl font-heading font-bold text-gradient mb-2">5-10 Days</div>
            <div className="text-muted-foreground">{t("process.timeline.installation")}</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
