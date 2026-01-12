import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export const FAQSection = () => {
  const { t } = useTranslation();

  const faqs = [
    {
      question: t("faq.items.leadTime.question"),
      answer: t("faq.items.leadTime.answer"),
    },
    {
      question: t("faq.items.customDesign.question"),
      answer: t("faq.items.customDesign.answer"),
    },
    {
      question: t("faq.items.safety.question"),
      answer: t("faq.items.safety.answer"),
    },
    {
      question: t("faq.items.warranty.question"),
      answer: t("faq.items.warranty.answer"),
    },
    {
      question: t("faq.items.installation.question"),
      answer: t("faq.items.installation.answer"),
    },
    {
      question: t("faq.items.budget.question"),
      answer: t("faq.items.budget.answer"),
    },
    {
      question: t("faq.items.shipping.question"),
      answer: t("faq.items.shipping.answer"),
    },
    {
      question: t("faq.items.materials.question"),
      answer: t("faq.items.materials.answer"),
    },
  ];

  return (
    <section id="faq" className="section-padding bg-muted">
      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            {t("faq.sectionLabel")}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-3 mb-6">
            {t("faq.title")} <span className="text-gradient">{t("faq.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            {t("faq.description")}
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-xl px-6 shadow-soft border-none"
              >
                <AccordionTrigger className="text-left font-heading font-semibold hover:text-primary transition-colors py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};
