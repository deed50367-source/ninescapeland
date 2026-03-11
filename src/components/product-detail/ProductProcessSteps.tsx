import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWhatsAppTracking } from "@/hooks/useWhatsAppTracking";

interface Props {
  productName: string;
}

export const ProductProcessSteps = ({ productName }: Props) => {
  const { t } = useTranslation();
  const { openWhatsApp } = useWhatsAppTracking();

  const steps = [
    {
      num: "01",
      title: t("dynamicProduct.process.step1Title", "Free Consultation"),
      desc: t("dynamicProduct.process.step1Desc", "Share your venue dimensions, budget, and vision. Our experts will analyze your space and provide professional recommendations tailored to your market."),
      detail: t("dynamicProduct.process.step1Detail", "Response within 2 hours during business days"),
    },
    {
      num: "02",
      title: t("dynamicProduct.process.step2Title", "3D Design & Planning"),
      desc: t("dynamicProduct.process.step2Desc", "Receive photorealistic 3D renderings and CAD layouts of your custom playground. We'll iterate on the design until you're 100% satisfied — completely free of charge."),
      detail: t("dynamicProduct.process.step2Detail", "Unlimited revisions at no extra cost"),
    },
    {
      num: "03",
      title: t("dynamicProduct.process.step3Title", "Manufacturing & QC"),
      desc: t("dynamicProduct.process.step3Desc", "Production begins in our ISO-certified factory with strict quality checkpoints. We send progress photos and videos throughout the manufacturing process."),
      detail: t("dynamicProduct.process.step3Detail", "30-45 days production with weekly updates"),
    },
    {
      num: "04",
      title: t("dynamicProduct.process.step4Title", "Shipping & Installation"),
      desc: t("dynamicProduct.process.step4Desc", "Door-to-door delivery with full insurance coverage. Our team provides detailed installation guides, video tutorials, or on-site technicians based on your preference."),
      detail: t("dynamicProduct.process.step4Detail", "Full insurance + installation support included"),
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <Badge variant="secondary" className="mb-4">
            {t("dynamicProduct.process.badge", "How It Works")}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("dynamicProduct.process.title", "From Concept to Grand Opening")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {t("dynamicProduct.process.subtitle", "Our proven 4-step process has helped 500+ clients worldwide build successful entertainment venues.")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              <div className="bg-card rounded-2xl p-6 border h-full flex flex-col">
                <span className="text-4xl font-black text-primary/15 mb-3">{step.num}</span>
                <h3 className="text-lg font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">{step.desc}</p>
                <div className="mt-4 pt-4 border-t">
                  <span className="text-xs font-medium text-primary">{step.detail}</span>
                </div>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 text-muted-foreground/30 text-2xl">→</div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Button
            size="lg"
            onClick={() => openWhatsApp("product_detail", { productName })}
            className="group"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            {t("dynamicProduct.process.cta", "Start Your Free Consultation")}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
