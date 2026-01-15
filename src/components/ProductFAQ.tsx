import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Badge } from "./ui/badge";
import { HelpCircle } from "lucide-react";

interface ProductFAQProps {
  productType: "indoorPlayground" | "trampolinePark" | "ninjaCourse" | "softPlay";
}

export const ProductFAQ = ({ productType }: ProductFAQProps) => {
  const { t } = useTranslation();

  const faqItems = [
    {
      question: t(`productFAQ.${productType}.items.q1.question`),
      answer: t(`productFAQ.${productType}.items.q1.answer`),
    },
    {
      question: t(`productFAQ.${productType}.items.q2.question`),
      answer: t(`productFAQ.${productType}.items.q2.answer`),
    },
    {
      question: t(`productFAQ.${productType}.items.q3.question`),
      answer: t(`productFAQ.${productType}.items.q3.answer`),
    },
    {
      question: t(`productFAQ.${productType}.items.q4.question`),
      answer: t(`productFAQ.${productType}.items.q4.answer`),
    },
    {
      question: t(`productFAQ.${productType}.items.q5.question`),
      answer: t(`productFAQ.${productType}.items.q5.answer`),
    },
    {
      question: t(`productFAQ.${productType}.items.q6.question`),
      answer: t(`productFAQ.${productType}.items.q6.answer`),
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <Badge variant="secondary" className="mb-4">
            <HelpCircle className="w-3 h-3 mr-1" />
            {t(`productFAQ.${productType}.sectionLabel`)}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t(`productFAQ.${productType}.title`)}{" "}
            <span className="text-primary">{t(`productFAQ.${productType}.titleHighlight`)}</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            {t(`productFAQ.${productType}.description`)}
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
            {faqItems.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="bg-card rounded-xl px-6 shadow-soft border-none"
                >
                  <AccordionTrigger className="text-start font-heading font-semibold hover:text-primary transition-colors py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};
