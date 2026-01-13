import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useRTL } from "@/hooks/useRTL";
import { supabase } from "@/integrations/supabase/client";

export const ContactSection = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { isRTL, flipX } = useRTL();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    projectType: "",
    message: "",
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
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.from("inquiries").insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        country: formData.country,
        project_type: formData.projectType,
        message: formData.message || null,
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
      console.error("Error submitting inquiry:", error);
      toast({
        title: t("contact.toast.errorTitle"),
        description: t("contact.toast.errorDescription"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="section-padding bg-background">
      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            {t("contact.sectionLabel")}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-3 mb-6">
            {t("contact.title")} <span className="text-gradient">{t("contact.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            {t("contact.description")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: flipX(-30) }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="bg-card p-8 rounded-2xl shadow-soft">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    {t("contact.form.name")} *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Smith"
                    required
                    className="h-12"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
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
                    className="h-12"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    {t("contact.form.phone")}
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 234 567 8900"
                    className="h-12"
                  />
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium mb-2">
                    {t("contact.form.country")} *
                  </label>
                  <Input
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="United States"
                    required
                    className="h-12"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="projectType" className="block text-sm font-medium mb-2">
                  {t("contact.form.projectType")} *
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  required
                  className="w-full h-12 px-4 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
                >
                  <option value="">{t("contact.form.projectTypes.select")}</option>
                  <option value="indoor-playground">{t("contact.form.projectTypes.indoorPlayground")}</option>
                  <option value="trampoline-park">{t("contact.form.projectTypes.trampolinePark")}</option>
                  <option value="ninja-course">{t("contact.form.projectTypes.ninjaCourse")}</option>
                  <option value="soft-play">{t("contact.form.projectTypes.softPlay")}</option>
                  <option value="fec">{t("contact.form.projectTypes.fec")}</option>
                  <option value="other">{t("contact.form.projectTypes.other")}</option>
                </select>
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  {t("contact.form.message")}
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t("contact.form.messagePlaceholder")}
                  rows={5}
                  className="resize-none"
                />
              </div>

              <Button
                type="submit"
                variant="hero"
                size="xl"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  t("contact.form.sending")
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
              <Button variant="outline" className="w-full" asChild>
                <a
                  href="https://wa.me/8615057582901?text=Hi, I'm interested in your playground equipment"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("contact.whatsapp.button")}
                </a>
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
