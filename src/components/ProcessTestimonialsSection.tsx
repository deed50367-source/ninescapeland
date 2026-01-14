import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

export const ProcessTestimonialsSection = () => {
  const { t } = useTranslation();

  const testimonials = [
    {
      name: t("processTestimonials.items.0.name"),
      role: t("processTestimonials.items.0.role"),
      country: t("processTestimonials.items.0.country"),
      content: t("processTestimonials.items.0.content"),
      rating: 5,
    },
    {
      name: t("processTestimonials.items.1.name"),
      role: t("processTestimonials.items.1.role"),
      country: t("processTestimonials.items.1.country"),
      content: t("processTestimonials.items.1.content"),
      rating: 5,
    },
    {
      name: t("processTestimonials.items.2.name"),
      role: t("processTestimonials.items.2.role"),
      country: t("processTestimonials.items.2.country"),
      content: t("processTestimonials.items.2.content"),
      rating: 5,
    },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            {t("processTestimonials.sectionLabel")}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mt-3 mb-4">
            {t("processTestimonials.title")} <span className="text-gradient">{t("processTestimonials.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            {t("processTestimonials.description")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="bg-card rounded-2xl p-6 shadow-soft relative"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20" />
              
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              
              <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
                "{testimonial.content}"
              </p>
              
              <div className="border-t pt-4">
                <div className="font-heading font-bold">{testimonial.name}</div>
                <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                <div className="text-xs text-primary mt-1">{testimonial.country}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
