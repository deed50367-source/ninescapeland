import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Send, Mail, Sparkles, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export const BlogNewsletterSection = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // Simulate subscription
    setIsSubmitted(true);
    toast({
      title: t("blog.newsletter.success"),
      description: t("blog.newsletter.successDesc"),
    });
  };

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-hero" />
      <div className="container-wide relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-hero-foreground/10 rounded-full text-hero-foreground text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            {t("blog.newsletter.badge")}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-hero-foreground mb-4"
          >
            {t("blog.newsletter.title")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-hero-foreground/80 mb-8 max-w-xl mx-auto"
          >
            {t("blog.newsletter.description")}
          </motion.p>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-3 bg-hero-foreground/10 rounded-lg p-6"
            >
              <CheckCircle className="w-8 h-8 text-success" />
              <span className="text-lg font-medium text-hero-foreground">
                {t("blog.newsletter.thankYou")}
              </span>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("blog.newsletter.placeholder")}
                  className="pl-12 h-14 bg-background border-0 text-foreground placeholder:text-muted-foreground rounded-lg"
                  required
                />
              </div>
              <Button
                type="submit"
                size="lg"
                variant="hero"
                className="h-14 px-8 rounded-lg"
              >
                {t("blog.newsletter.subscribe")}
                <Send className="w-5 h-5 ml-2" />
              </Button>
            </motion.form>
          )}

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-sm text-hero-foreground/80"
          >
            {t("blog.newsletter.privacy")}
          </motion.p>
        </div>
      </div>
    </section>
  );
};
