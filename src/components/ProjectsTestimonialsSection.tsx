import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

export const ProjectsTestimonialsSection = () => {
  const { t } = useTranslation();

  const testimonials = [
    {
      name: t("projectsTestimonials.items.0.name"),
      role: t("projectsTestimonials.items.0.role"),
      country: t("projectsTestimonials.items.0.country"),
      project: t("projectsTestimonials.items.0.project"),
      content: t("projectsTestimonials.items.0.content"),
      rating: 5,
    },
    {
      name: t("projectsTestimonials.items.1.name"),
      role: t("projectsTestimonials.items.1.role"),
      country: t("projectsTestimonials.items.1.country"),
      project: t("projectsTestimonials.items.1.project"),
      content: t("projectsTestimonials.items.1.content"),
      rating: 5,
    },
    {
      name: t("projectsTestimonials.items.2.name"),
      role: t("projectsTestimonials.items.2.role"),
      country: t("projectsTestimonials.items.2.country"),
      project: t("projectsTestimonials.items.2.project"),
      content: t("projectsTestimonials.items.2.content"),
      rating: 5,
    },
    {
      name: t("projectsTestimonials.items.3.name"),
      role: t("projectsTestimonials.items.3.role"),
      country: t("projectsTestimonials.items.3.country"),
      project: t("projectsTestimonials.items.3.project"),
      content: t("projectsTestimonials.items.3.content"),
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
            {t("projectsTestimonials.sectionLabel")}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mt-3 mb-4">
            {t("projectsTestimonials.title")} <span className="text-gradient">{t("projectsTestimonials.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            {t("projectsTestimonials.description")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
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
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{testimonial.project}</span>
                  <span className="text-xs text-muted-foreground">• {testimonial.country}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
