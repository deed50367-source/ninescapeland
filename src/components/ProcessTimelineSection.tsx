import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Calendar, Clock, CheckCircle } from "lucide-react";
import { useRTL } from "@/hooks/useRTL";

export const ProcessTimelineSection = () => {
  const { t } = useTranslation();
  const { isRTL } = useRTL();

  const timelinePhases = [
    {
      phase: t("processTimeline.phases.inquiry.phase"),
      title: t("processTimeline.phases.inquiry.title"),
      duration: t("processTimeline.phases.inquiry.duration"),
      days: "1-3",
      color: "from-info to-info/80",
      tasks: [
        t("processTimeline.phases.inquiry.task1"),
        t("processTimeline.phases.inquiry.task2"),
        t("processTimeline.phases.inquiry.task3"),
      ],
    },
    {
      phase: t("processTimeline.phases.design.phase"),
      title: t("processTimeline.phases.design.title"),
      duration: t("processTimeline.phases.design.duration"),
      days: "5-10",
      color: "from-category-purple to-category-purple/80",
      tasks: [
        t("processTimeline.phases.design.task1"),
        t("processTimeline.phases.design.task2"),
        t("processTimeline.phases.design.task3"),
      ],
    },
    {
      phase: t("processTimeline.phases.confirmation.phase"),
      title: t("processTimeline.phases.confirmation.title"),
      duration: t("processTimeline.phases.confirmation.duration"),
      days: "3-5",
      color: "from-success to-success/80",
      tasks: [
        t("processTimeline.phases.confirmation.task1"),
        t("processTimeline.phases.confirmation.task2"),
        t("processTimeline.phases.confirmation.task3"),
      ],
    },
    {
      phase: t("processTimeline.phases.production.phase"),
      title: t("processTimeline.phases.production.title"),
      duration: t("processTimeline.phases.production.duration"),
      days: "25-35",
      color: "from-category-orange to-category-orange/80",
      tasks: [
        t("processTimeline.phases.production.task1"),
        t("processTimeline.phases.production.task2"),
        t("processTimeline.phases.production.task3"),
      ],
    },
    {
      phase: t("processTimeline.phases.shipping.phase"),
      title: t("processTimeline.phases.shipping.title"),
      duration: t("processTimeline.phases.shipping.duration"),
      days: "20-35",
      color: "from-category-cyan to-category-cyan/80",
      tasks: [
        t("processTimeline.phases.shipping.task1"),
        t("processTimeline.phases.shipping.task2"),
        t("processTimeline.phases.shipping.task3"),
      ],
    },
    {
      phase: t("processTimeline.phases.installation.phase"),
      title: t("processTimeline.phases.installation.title"),
      duration: t("processTimeline.phases.installation.duration"),
      days: "5-10",
      color: "from-accent to-accent/80",
      tasks: [
        t("processTimeline.phases.installation.task1"),
        t("processTimeline.phases.installation.task2"),
        t("processTimeline.phases.installation.task3"),
      ],
    },
  ];

  const totalDaysMin = 59;
  const totalDaysMax = 98;

  return (
    <section className="section-padding bg-background overflow-hidden">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            {t("processTimeline.sectionLabel")}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mt-3 mb-4">
            {t("processTimeline.title")} <span className="text-gradient">{t("processTimeline.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            {t("processTimeline.description")}
          </p>
        </motion.div>

        {/* Total Timeline Summary */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-6 md:p-8 mb-12"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full hero-gradient flex items-center justify-center">
                <Calendar className="w-7 h-7 text-accent-foreground" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-heading font-bold">
                  {t("processTimeline.totalTime")}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {t("processTimeline.totalTimeDesc")}
                </p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <div className="text-3xl md:text-4xl font-heading font-bold text-gradient">
                {totalDaysMin}-{totalDaysMax} {t("processTimeline.days")}
              </div>
              <p className="text-sm text-muted-foreground">
                {t("processTimeline.approximately")} {Math.round(totalDaysMin/30)}-{Math.round(totalDaysMax/30)} {t("processTimeline.months")}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Timeline Progress Bar */}
        <div className="mb-10 hidden md:block">
          <div className="relative h-3 bg-muted rounded-full overflow-hidden">
            {timelinePhases.map((phase, index) => {
              const width = 100 / timelinePhases.length;
              const left = index * width;
              return (
                <motion.div
                  key={index}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${width}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className={`absolute top-0 h-full bg-gradient-to-r ${phase.color}`}
                  style={{ left: `${left}%` }}
                />
              );
            })}
          </div>
          <div className="flex justify-between mt-2">
            {timelinePhases.map((phase, index) => (
              <div key={index} className="text-xs text-muted-foreground text-center" style={{ width: `${100/timelinePhases.length}%` }}>
                {phase.days} {t("processTimeline.days")}
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {timelinePhases.map((phase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all h-full border border-border/50">
                {/* Phase Badge */}
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${phase.color} text-white text-xs font-semibold mb-4`}>
                  <Clock className="w-3 h-3" />
                  {phase.phase}
                </div>

                {/* Duration */}
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-heading font-bold">{phase.title}</h3>
                  <span className="text-sm font-semibold text-primary">{phase.duration}</span>
                </div>

                {/* Tasks */}
                <ul className="space-y-2">
                  {phase.tasks.map((task, tIndex) => (
                    <li key={tIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>

                {/* Step Number */}
                <div className={`absolute -top-3 ${isRTL ? '-left-3' : '-right-3'} w-8 h-8 rounded-full bg-gradient-to-r ${phase.color} flex items-center justify-center text-white text-sm font-bold shadow-lg`}>
                  {index + 1}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            {t("processTimeline.note")}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
