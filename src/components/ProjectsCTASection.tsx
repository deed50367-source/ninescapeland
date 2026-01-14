import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Phone, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { useNavigate } from "react-router-dom";

export const ProjectsCTASection = () => {
  const { t } = useTranslation();
  const { localizedPath } = useLocalizedPath();
  const navigate = useNavigate();

  const features = [
    {
      icon: Calendar,
      title: t("projectsCTA.features.freeConsultation.title"),
      description: t("projectsCTA.features.freeConsultation.description"),
    },
    {
      icon: Phone,
      title: t("projectsCTA.features.expertAdvice.title"),
      description: t("projectsCTA.features.expertAdvice.description"),
    },
    {
      icon: MessageCircle,
      title: t("projectsCTA.features.fastResponse.title"),
      description: t("projectsCTA.features.fastResponse.description"),
    },
  ];

  return (
    <section className="section-padding hero-gradient">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-accent-foreground mb-4">
            {t("projectsCTA.title")}
          </h2>
          <p className="text-accent-foreground/80 text-base md:text-lg mb-8">
            {t("projectsCTA.description")}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-semibold group"
              onClick={() => navigate(localizedPath("/contact"))}
            >
              {t("projectsCTA.getQuote")}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              onClick={() => navigate(localizedPath("/contact"))}
            >
              <MessageCircle className="mr-2 w-5 h-5" />
              {t("projectsCTA.whatsapp")}
            </Button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center"
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-3">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-heading font-bold text-white mb-1">{feature.title}</h3>
              <p className="text-sm text-white/80">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
