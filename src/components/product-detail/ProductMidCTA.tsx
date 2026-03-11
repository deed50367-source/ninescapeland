import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { MessageCircle, FileText, ArrowRight } from "lucide-react";
import { useWhatsAppTracking } from "@/hooks/useWhatsAppTracking";
import { Link } from "react-router-dom";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

interface Props {
  productName: string;
}

export const ProductMidCTA = ({ productName }: Props) => {
  const { t } = useTranslation();
  const { openWhatsApp } = useWhatsAppTracking();
  const { localizedPath } = useLocalizedPath();

  return (
    <section className="py-16 md:py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("dynamicProduct.midCta.title", "Ready to Build Your Dream Venue?")}
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-4">
            {t("dynamicProduct.midCta.desc", "Get a free custom 3D design and competitive quote within 24 hours. No commitment, no hidden costs — just expert advice from our team of playground specialists.")}
          </p>
          <p className="text-primary-foreground/60 text-sm mb-8">
            {t("dynamicProduct.midCta.social", "Join 500+ successful playground operators who chose NinescapeLand as their trusted equipment partner.")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              onClick={() => openWhatsApp("product_detail", { productName })}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              {t("dynamicProduct.midCta.whatsapp", "Chat on WhatsApp")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              asChild
            >
              <Link to={localizedPath("/contact")}>
                <FileText className="w-5 h-5 mr-2" />
                {t("dynamicProduct.midCta.inquiry", "Send an Inquiry")}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
