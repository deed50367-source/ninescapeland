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
          className="text-center max-w-3xl mx-auto mb-8 sm:mb-12"
        >
          <span className="text-accent font-semibold text-xs sm:text-sm uppercase tracking-wider">
            {t("testimonials.sectionLabel")}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold mt-2 sm:mt-3 mb-3 sm:mb-4">
            {t("testimonials.title")}{" "}
            <span className="text-gradient">{t("testimonials.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg px-4 sm:px-0">
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
              <CarouselItem key={index} className="pl-2 md:pl-4 basis-[85%] sm:basis-1/2 lg:basis-1/3">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="h-full"
                >
                  <Card className="h-full bg-card border-none shadow-soft hover:shadow-medium transition-all duration-300">
                    <CardContent className="p-4 sm:p-6 flex flex-col h-full">
                      <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-primary/20 mb-3 sm:mb-4" />
                      
                      <div className="flex gap-0.5 sm:gap-1 mb-3 sm:mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-accent text-accent" />
                        ))}
                      </div>
                      
                      <p className="text-muted-foreground flex-1 mb-4 sm:mb-6 italic text-sm sm:text-base line-clamp-4 sm:line-clamp-none">
                        "{t(`${key}.quote`)}"
                      </p>
                      
                      <div className="flex items-center gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-border">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-base sm:text-lg flex-shrink-0">
                          {t(`${key}.name`).charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-sm sm:text-base truncate">{t(`${key}.name`)}</div>
                          <div className="text-xs sm:text-sm text-muted-foreground truncate">
                            {t(`${key}.role`)} • {t(`${key}.company`)}
                          </div>
                          <div className="text-[10px] sm:text-xs text-accent font-medium">
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
