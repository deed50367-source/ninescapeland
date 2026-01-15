import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin, Clock, MessageCircle, AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useRTL } from "@/hooks/useRTL";
import { useRateLimit } from "@/hooks/useRateLimit";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

// Validation schema for contact form
const contactFormSchema = z.object({
  name: z.string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  email: z.string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters"),
  phone: z.string()
    .trim()
    .max(50, "Phone must be less than 50 characters")
    .optional()
    .or(z.literal("")),
  country: z.string()
    .trim()
    .min(1, "Country is required")
    .max(100, "Country must be less than 100 characters"),
  projectType: z.enum([
    "indoor-playground",
    "trampoline-park", 
    "ninja-course",
    "soft-play",
    "fec",
    "other"
  ], { errorMap: () => ({ message: "Please select a project type" }) }),
  message: z.string()
    .trim()
    .max(5000, "Message must be less than 5000 characters")
    .optional()
    .or(z.literal("")),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export const ContactSection = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { isRTL, flipX } = useRTL();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    projectType: "",
    message: "",
  });
  
  // Rate limiting: max 3 submissions per minute, 5 minute cooldown
  const rateLimit = useRateLimit({
    maxAttempts: 3,
    windowMs: 60000,
    cooldownMs: 300000,
  });

  const contactInfo = [
    {
      icon: Phone,
      label: t("contact.info.phone"),
      value: "+86 150 5758 2901",
      href: "tel:+8615057582901",
    },
    {
      icon: Mail,
      label: t("contact.info.email"),
      value: "sale@indoorplaygroundsolution.com",
      href: "mailto:sale@indoorplaygroundsolution.com",
    },
    {
      icon: MapPin,
      label: t("contact.info.factory"),
      value: "Wenzhou, Zhejiang, China",
      href: "#",
    },
    {
      icon: Clock,
      label: t("contact.info.hours"),
      value: t("contact.info.hoursValue"),
      href: "#",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});
    
    // Check rate limit before proceeding
    if (!rateLimit.recordAttempt()) {
      toast({
        title: t("contact.toast.rateLimitTitle"),
        description: t("contact.toast.rateLimitDescription", { 
          time: rateLimit.formatTimeRemaining(rateLimit.timeUntilReset) 
        }),
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Validate form data
      const validatedData = contactFormSchema.parse(formData);
      
      const { error } = await supabase.from("inquiries").insert({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone || null,
        country: validatedData.country,
        project_type: validatedData.projectType,
        message: validatedData.message || null,
      });

      if (error) throw error;

      toast({
        title: t("contact.toast.successTitle"),
        description: t("contact.toast.successDescription"),
      });
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        country: "",
        projectType: "",
        message: "",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as string] = err.message;
          }
        });
        setFormErrors(errors);
        toast({
          title: t("contact.toast.validationErrorTitle") || "Validation Error",
          description: t("contact.toast.validationErrorDescription") || "Please check the form fields",
          variant: "destructive",
        });
      } else {
        toast({
          title: t("contact.toast.errorTitle"),
          description: t("contact.toast.errorDescription"),
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <section id="contact" className="section-padding bg-background">
      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-8 sm:mb-12"
        >
          <span className="text-accent font-semibold text-xs sm:text-sm uppercase tracking-wider">
            {t("contact.sectionLabel")}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-2 sm:mt-3 mb-3 sm:mb-6">
            {t("contact.title")} <span className="text-gradient">{t("contact.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base lg:text-lg px-4 sm:px-0">
            {t("contact.description")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: flipX(-30) }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="bg-card p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-soft">
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div>
                  <label htmlFor="name" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                    {t("contact.form.name")} *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Smith"
                    required
                    maxLength={100}
                    className={`h-10 sm:h-12 text-sm sm:text-base ${formErrors.name ? 'border-destructive' : ''}`}
                  />
                  {formErrors.name && <p className="text-destructive text-xs mt-1">{formErrors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                    {t("contact.form.email")} *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@company.com"
                    required
                    maxLength={255}
                    className={`h-10 sm:h-12 text-sm sm:text-base ${formErrors.email ? 'border-destructive' : ''}`}
                  />
                  {formErrors.email && <p className="text-destructive text-xs mt-1">{formErrors.email}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                    {t("contact.form.phone")}
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 234 567 8900"
                    maxLength={50}
                    className={`h-10 sm:h-12 text-sm sm:text-base ${formErrors.phone ? 'border-destructive' : ''}`}
                  />
                  {formErrors.phone && <p className="text-destructive text-xs mt-1">{formErrors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="country" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                    {t("contact.form.country")} *
                  </label>
                  <Input
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="United States"
                    required
                    maxLength={100}
                    className={`h-10 sm:h-12 text-sm sm:text-base ${formErrors.country ? 'border-destructive' : ''}`}
                  />
                  {formErrors.country && <p className="text-destructive text-xs mt-1">{formErrors.country}</p>}
                </div>
              </div>
              
              <div className="mb-4 sm:mb-6">
                <label htmlFor="projectType" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                  {t("contact.form.projectType")} *
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  required
                  className={`w-full h-10 sm:h-12 px-3 sm:px-4 rounded-lg border bg-background text-foreground text-sm sm:text-base focus:ring-2 focus:ring-ring focus:outline-none ${formErrors.projectType ? 'border-destructive' : 'border-input'}`}
                >
                  <option value="">{t("contact.form.projectTypes.select")}</option>
                  <option value="indoor-playground">{t("contact.form.projectTypes.indoorPlayground")}</option>
                  <option value="trampoline-park">{t("contact.form.projectTypes.trampolinePark")}</option>
                  <option value="ninja-course">{t("contact.form.projectTypes.ninjaCourse")}</option>
                  <option value="soft-play">{t("contact.form.projectTypes.softPlay")}</option>
                  <option value="fec">{t("contact.form.projectTypes.fec")}</option>
                  <option value="other">{t("contact.form.projectTypes.other")}</option>
                </select>
                {formErrors.projectType && <p className="text-destructive text-xs mt-1">{formErrors.projectType}</p>}
              </div>

              <div className="mb-4 sm:mb-6">
                <label htmlFor="message" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                  {t("contact.form.message")}
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t("contact.form.messagePlaceholder")}
                  rows={4}
                  maxLength={5000}
                  className={`resize-none text-sm sm:text-base ${formErrors.message ? 'border-destructive' : ''}`}
                />
                {formErrors.message && <p className="text-destructive text-xs mt-1">{formErrors.message}</p>}
              </div>

              {/* Rate limit warning */}
              {rateLimit.isLimited && (
                <div className="mb-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-destructive">
                      {t("contact.rateLimit.title")}
                    </p>
                    <p className="text-xs text-destructive/80">
                      {t("contact.rateLimit.description", { 
                        time: rateLimit.formatTimeRemaining(rateLimit.timeUntilReset) 
                      })}
                    </p>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full h-11 sm:h-14 text-sm sm:text-base"
                disabled={isSubmitting || rateLimit.isLimited}
              >
                {isSubmitting ? (
                  t("contact.form.sending")
                ) : rateLimit.isLimited ? (
                  <>
                    {t("contact.rateLimit.wait", { 
                      time: rateLimit.formatTimeRemaining(rateLimit.timeUntilReset) 
                    })}
                  </>
                ) : (
                  <>
                    {t("contact.form.submit")}
                    <Send className="w-5 h-5" />
                  </>
                )}
              </Button>

              <p className="text-center text-sm text-muted-foreground mt-4">
                {t("contact.form.privacy")}
              </p>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: flipX(30) }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-primary text-primary-foreground p-8 rounded-2xl">
              <h3 className="text-2xl font-heading font-bold mb-6">
                {t("contact.info.title")}
              </h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.href}
                    className={`flex items-start gap-4 group hover:opacity-80 transition-opacity ${isRTL ? 'flex-row-reverse text-right' : ''}`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-primary-foreground/70">{info.label}</p>
                      <p className="font-semibold" dir={info.href.startsWith('tel:') || info.href.startsWith('mailto:') ? 'ltr' : undefined}>{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="bg-card p-6 rounded-2xl shadow-soft border-2 border-dashed border-accent">
              <div className={`flex items-center gap-4 mb-4 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-heading font-bold">{t("contact.whatsapp.title")}</h4>
                  <p className="text-sm text-muted-foreground">{t("contact.whatsapp.description")}</p>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                {t("contact.whatsapp.button")}
              </Button>
            </div>

            {/* Response Time */}
            <div className="bg-muted p-6 rounded-2xl text-center">
              <Clock className="w-10 h-10 text-primary mx-auto mb-3" />
              <h4 className="font-heading font-bold mb-2">{t("contact.response.title")}</h4>
              <p className="text-muted-foreground text-sm">
                {t("contact.response.description")}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
