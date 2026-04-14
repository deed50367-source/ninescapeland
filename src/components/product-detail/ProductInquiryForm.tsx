import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Send, MessageCircle, AlertTriangle, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useRateLimit } from "@/hooks/useRateLimit";
import { useWhatsAppTracking } from "@/hooks/useWhatsAppTracking";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(50).optional().or(z.literal("")),
  country: z.string().trim().min(1, "Country is required").max(100),
  message: z.string().trim().max(5000).optional().or(z.literal("")),
});

interface Props {
  productName: string;
  productSlug: string;
}

export const ProductInquiryForm = ({ productName, productSlug }: Props) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { openWhatsApp } = useWhatsAppTracking();
  const { isLimited, timeUntilReset, recordAttempt } = useRateLimit({ maxAttempts: 3, windowMs: 60000, cooldownMs: 300000 });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    message: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;
    if (isLimited) {
      toast({ title: t("contact.rateLimitTitle", "Too many requests"), description: t("contact.rateLimitDesc", "Please wait before submitting again."), variant: "destructive" });
      return;
    }

    const result = formSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => { if (err.path[0]) fieldErrors[err.path[0] as string] = err.message; });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("inquiries").insert({
        name: result.data.name,
        email: result.data.email,
        phone: result.data.phone || null,
        country: result.data.country,
        project_type: productSlug,
        message: `[Product Inquiry: ${productName}] ${result.data.message || ""}`.trim(),
        status: "new",
      });

      if (error) throw error;
      recordAttempt();
      toast({ title: t("contact.successTitle", "Inquiry Sent!"), description: t("contact.successDesc", "We'll get back to you within 24 hours.") });
      setFormData({ name: "", email: "", phone: "", country: "", message: "" });
      setErrors({});
    } catch {
      toast({ title: t("contact.errorTitle", "Error"), description: t("contact.errorDesc", "Something went wrong. Please try again."), variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="inquiry-form" className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-10">
            <Badge variant="secondary" className="mb-3">
              {t("dynamicProduct.inquiry.badge", "Get a Free Quote")}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              {t("dynamicProduct.inquiry.title", "Interested in This Product?")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("dynamicProduct.inquiry.desc", "Fill out the form below and our team will send you a custom design proposal and competitive quote within 24 hours.")}
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Form */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-6 md:p-8 shadow-sm border space-y-5">
                {/* Honeypot */}
                <div className="hidden" aria-hidden="true">
                  <input type="text" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">{t("contact.name", "Your Name")} *</label>
                    <Input name="name" value={formData.name} onChange={handleChange} placeholder={t("contact.namePlaceholder", "John Smith")} className={errors.name ? "border-destructive" : ""} />
                    {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">{t("contact.email", "Email")} *</label>
                    <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@company.com" className={errors.email ? "border-destructive" : ""} />
                    {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">{t("contact.phone", "Phone")}</label>
                    <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 234 567 8900" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">{t("contact.country", "Country")} *</label>
                    <Input name="country" value={formData.country} onChange={handleChange} placeholder={t("contact.countryPlaceholder", "United States")} className={errors.country ? "border-destructive" : ""} />
                    {errors.country && <p className="text-destructive text-xs mt-1">{errors.country}</p>}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block">{t("contact.message", "Message")}</label>
                  <Textarea name="message" value={formData.message} onChange={handleChange} placeholder={t("dynamicProduct.inquiry.messagePlaceholder", `I'm interested in ${productName}. Please send me a quote and design proposal.`)} rows={4} />
                </div>

                {isLimited && (
                <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-lg">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  {t("contact.rateLimitWait", `Please wait ${Math.ceil(timeUntilReset / 1000)}s`)}
                </div>
                )}

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting || isLimited}>
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      {t("contact.sending", "Sending...")}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      {t("dynamicProduct.inquiry.submit", "Get Free Quote")}
                    </span>
                  )}
                </Button>
              </form>
            </div>

            {/* Sidebar info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card rounded-2xl p-6 border shadow-sm">
                <h3 className="font-semibold text-lg mb-4">
                  {t("dynamicProduct.inquiry.preferChat", "Prefer to Chat?")}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {t("dynamicProduct.inquiry.chatDesc", "Get an instant response from our team via WhatsApp. We're online 12+ hours daily.")}
                </p>
                <Button
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary/10"
                  onClick={() => openWhatsApp("product_detail", { productName })}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {t("dynamicProduct.midCta.whatsapp", "Chat on WhatsApp")}
                </Button>
              </div>

              <div className="bg-card rounded-2xl p-6 border shadow-sm space-y-4">
                <h3 className="font-semibold text-lg">
                  {t("dynamicProduct.inquiry.contactInfo", "Contact Info")}
                </h3>
                <div className="flex items-start gap-3 text-sm">
                  <Mail className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">sale@indoorplaygroundsolution.com</span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <Phone className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">+86 150-5878-2901</span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">Wenzhou, Zhejiang, China</span>
                </div>
              </div>

              <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  🎯 {t("dynamicProduct.inquiry.promise", "We respond to all inquiries within 24 hours with a free 3D design concept and detailed quote — no commitment required.")}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
