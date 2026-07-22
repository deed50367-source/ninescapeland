import { useState } from "react";
import { Send, MessageCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useRateLimit } from "@/hooks/useRateLimit";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

// Fire a Google Ads / GA4 gtag event, safe on SSR/prerender.
const fireGtag = (event: string, params: Record<string, unknown>) => {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: (...args: unknown[]) => void; dataLayer?: unknown[] };
  try {
    if (typeof w.gtag === "function") w.gtag("event", event, params);
    if (Array.isArray(w.dataLayer)) w.dataLayer.push({ event, ...params });
  } catch {
    /* no-op */
  }
};

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(50).optional().or(z.literal("")),
  whatsapp: z.string().trim().max(50).optional().or(z.literal("")),
  country: z.string().trim().min(1, "Country is required").max(100),
  projectType: z.string().trim().min(1, "Project type is required").max(100),
  message: z.string().trim().max(5000).optional().or(z.literal("")),
});

interface Props {
  campaign: string;
  projectTypes: string[];
  variant?: "hero" | "block";
}

export const AdsInquiryForm = ({ campaign, projectTypes, variant = "hero" }: Props) => {
  const { toast } = useToast();
  const { isLimited, timeUntilReset, recordAttempt } = useRateLimit({
    maxAttempts: 3,
    windowMs: 60000,
    cooldownMs: 300000,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    country: "",
    projectType: projectTypes[0] ?? "",
    message: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;
    if (isLimited) {
      toast({
        title: "Too many requests",
        description: "Please wait a moment before submitting again.",
        variant: "destructive",
      });
      return;
    }

    const parsed = formSchema.safeParse(formData);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const source = `ads_lp_${campaign}`;
      const extra = [
        parsed.data.whatsapp ? `WhatsApp: ${parsed.data.whatsapp}` : "",
        `Source: ${source}`,
        parsed.data.message || "",
      ]
        .filter(Boolean)
        .join(" | ");

      const { error } = await supabase.from("inquiries").insert({
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone || null,
        country: parsed.data.country,
        project_type: parsed.data.projectType,
        message: `[${source}] ${extra}`.trim(),
        status: "new",
      });

      if (error) throw error;

      recordAttempt();
      fireGtag("lp_form_submit", {
        campaign_slug: campaign,
        value: 50,
        currency: "USD",
      });
      fireGtag("generate_lead", {
        campaign_slug: campaign,
        value: 50,
        currency: "USD",
      });

      toast({
        title: "Quote request received!",
        description: "Our team will reply within 24 hours with a free 3D design proposal.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        whatsapp: "",
        country: "",
        projectType: projectTypes[0] ?? "",
        message: "",
      });
      setErrors({});
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again, or reach us on WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-card rounded-2xl border shadow-lg p-6 md:p-7 space-y-4 ${
        variant === "hero" ? "" : "max-w-3xl mx-auto"
      }`}
    >
      <div className="text-center">
        <h2 className="text-xl md:text-2xl font-bold">Get Your Free 3D Design &amp; Quote</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Reply within 24 hours. No obligation.
        </p>
      </div>

      <div className="hidden" aria-hidden="true">
        <input
          type="text"
          name="website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium mb-1 block">Name *</label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Smith"
            className={errors.name ? "border-destructive" : ""}
          />
          {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="text-xs font-medium mb-1 block">Email *</label>
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@company.com"
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium mb-1 block">Country *</label>
          <Input
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="United States"
            className={errors.country ? "border-destructive" : ""}
          />
          {errors.country && <p className="text-destructive text-xs mt-1">{errors.country}</p>}
        </div>
        <div>
          <label className="text-xs font-medium mb-1 block">Project Type *</label>
          <select
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
          >
            {projectTypes.map((pt) => (
              <option key={pt} value={pt}>
                {pt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium mb-1 block">Phone (optional)</label>
          <Input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 234 567 8900"
          />
        </div>
        <div>
          <label className="text-xs font-medium mb-1 block">WhatsApp (optional)</label>
          <Input
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            placeholder="+1 234 567 8900"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-medium mb-1 block">Project details (optional)</label>
        <Textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Space (sqm/sqft), target ages, budget range, opening date..."
          rows={3}
        />
      </div>

      {isLimited && (
        <div className="flex items-center gap-2 text-xs text-destructive bg-destructive/10 p-2 rounded-lg">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          Please wait {Math.ceil(timeUntilReset / 1000)}s before submitting again.
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full text-base font-semibold"
        disabled={isSubmitting || isLimited}
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Sending...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Send className="w-4 h-4" />
            Get My Free Quote
          </span>
        )}
      </Button>

      <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
        By submitting, you agree to be contacted by NinescapeLand about your project. See our{" "}
        <a href="/lp/privacy" target="_blank" rel="noopener" className="underline hover:text-primary">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
};

// Small helper to emit WhatsApp / Email micro-conversion events from anywhere on the page.
export const trackAdsMicroConversion = (
  kind: "whatsapp" | "email",
  campaign: string,
) => {
  const event = kind === "whatsapp" ? "lp_whatsapp_click" : "lp_email_click";
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: (...args: unknown[]) => void; dataLayer?: unknown[] };
  try {
    if (typeof w.gtag === "function") {
      w.gtag("event", event, { campaign_slug: campaign, value: 10, currency: "USD" });
    }
    if (Array.isArray(w.dataLayer)) {
      w.dataLayer.push({ event, campaign_slug: campaign, value: 10, currency: "USD" });
    }
  } catch {
    /* no-op */
  }
};

export { MessageCircle };
