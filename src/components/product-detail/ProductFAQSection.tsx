import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useWhatsAppTracking } from "@/hooks/useWhatsAppTracking";

interface Props {
  productName: string;
}

export const ProductFAQSection = ({ productName }: Props) => {
  const { t } = useTranslation();
  const { openWhatsApp } = useWhatsAppTracking();

  const faqs = [
    {
      q: t("dynamicProduct.faq.q1", "What is the minimum order quantity (MOQ)?"),
      a: t("dynamicProduct.faq.a1", "We accept orders starting from a single project. Whether you need a 50m² soft play area or a 5,000m² trampoline park, we can accommodate your needs with the same level of quality and attention to detail."),
    },
    {
      q: t("dynamicProduct.faq.q2", "How much does a custom playground cost?"),
      a: t("dynamicProduct.faq.a2", "Pricing varies based on size, complexity, theming, and equipment selection. Generally, indoor playgrounds range from $150-$400 per m². Contact us with your venue dimensions for a precise, no-obligation quote within 24 hours."),
    },
    {
      q: t("dynamicProduct.faq.q3", "Do you provide 3D design services?"),
      a: t("dynamicProduct.faq.a3", "Yes! We offer complimentary 3D design and CAD layout services. Simply share your floor plan and preferences, and our design team will create photorealistic renderings of your custom playground — absolutely free, with unlimited revisions."),
    },
    {
      q: t("dynamicProduct.faq.q4", "What safety certifications do your products meet?"),
      a: t("dynamicProduct.faq.a4", "All our products comply with international safety standards including ASTM F1918 (USA), EN1176 (Europe), AS4685 (Australia), and CSA Z614 (Canada). We also hold TUV and SGS certifications. Safety documentation is provided with every order."),
    },
    {
      q: t("dynamicProduct.faq.q5", "Can you ship to my country?"),
      a: t("dynamicProduct.faq.a5", "Absolutely! We ship to 80+ countries worldwide with door-to-door delivery, including full insurance coverage. Our logistics team handles customs clearance, and we provide all necessary documentation for smooth importation."),
    },
    {
      q: t("dynamicProduct.faq.q6", "Do you offer installation services?"),
      a: t("dynamicProduct.faq.a6", "Yes, we provide flexible installation support: detailed installation manuals with numbered parts, step-by-step video guides, remote video assistance during installation, or on-site technicians for larger projects. Most installations can be completed in 5-20 days."),
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="secondary" className="mb-4">
              <HelpCircle className="w-3 h-3 mr-1" />
              {t("dynamicProduct.faq.badge", "FAQ")}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("dynamicProduct.faq.title", "Frequently Asked Questions")}
            </h2>
            <p className="text-muted-foreground">
              {t("dynamicProduct.faq.subtitle", "Everything you need to know before starting your project.")}
            </p>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <AccordionItem value={`faq-${i}`} className="bg-card border rounded-xl px-6">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <p className="text-muted-foreground mb-4">
              {t("dynamicProduct.faq.moreQuestions", "Still have questions? Our team is ready to help.")}
            </p>
            <Button
              variant="outline"
              size="lg"
              onClick={() => openWhatsApp("product_detail", { productName })}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              {t("dynamicProduct.faq.askUs", "Ask Us Anything")}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
