import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonialKeys = [
  "testimonials.items.0",
  "testimonials.items.1",
  "testimonials.items.2",
  "testimonials.items.3",
  "testimonials.items.4",
  "testimonials.items.5",
];

export const TestimonialsSection = () => {
  const { t } = useTranslation();

  return (
    <section className="section-padding bg-gradient-to-b from-muted/30 to-background overflow-hidden">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            {t("testimonials.sectionLabel")}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mt-3 mb-4">
            {t("testimonials.title")}{" "}
            <span className="text-gradient">{t("testimonials.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            {t("testimonials.description")}
          </p>
        </motion.div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonialKeys.map((key, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="h-full"
                >
                  <Card className="h-full bg-card border-none shadow-soft hover:shadow-medium transition-all duration-300">
                    <CardContent className="p-6 flex flex-col h-full">
                      <Quote className="w-10 h-10 text-primary/20 mb-4" />
                      
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                        ))}
                      </div>
                      
                      <p className="text-muted-foreground flex-1 mb-6 italic">
                        "{t(`${key}.quote`)}"
                      </p>
                      
                      <div className="flex items-center gap-4 pt-4 border-t border-border">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                          {t(`${key}.name`).charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold">{t(`${key}.name`)}</div>
                          <div className="text-sm text-muted-foreground">
                            {t(`${key}.role`)} • {t(`${key}.company`)}
                          </div>
                          <div className="text-xs text-accent font-medium">
                            {t(`${key}.location`)}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-4" />
          <CarouselNext className="hidden md:flex -right-4" />
        </Carousel>
      </div>
    </section>
  );
};
