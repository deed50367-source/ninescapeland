import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ShieldCheck, Star, Wrench, ArrowRight } from "lucide-react";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

/**
 * TrustHubLinks — internal-link strip routing visitors to the three trust
 * aggregation pages (Safety, Testimonials, Maintenance). Strengthens topical
 * authority and conversion paths from Home / Product Detail surfaces.
 */
export const TrustHubLinks = () => {
  const { t } = useTranslation();
  const { localizedPath } = useLocalizedPath();

  const items = [
    {
      icon: ShieldCheck,
      title: t("trustHub.safety.title", "Safety & Certifications"),
      desc: t("trustHub.safety.desc", "ASTM F1918, EN 1176, TÜV, ISO 9001 — full compliance documentation."),
      href: localizedPath("/safety-certifications"),
      cta: t("trustHub.safety.cta", "View standards"),
    },
    {
      icon: Star,
      title: t("trustHub.testimonials.title", "Client Testimonials"),
      desc: t("trustHub.testimonials.desc", "500+ projects across malls, hotels, schools and FECs worldwide."),
      href: localizedPath("/customer-testimonials"),
      cta: t("trustHub.testimonials.cta", "Read reviews"),
    },
    {
      icon: Wrench,
      title: t("trustHub.maintenance.title", "Maintenance & Warranty"),
      desc: t("trustHub.maintenance.desc", "5-year structural warranty and 10-year spare-parts guarantee."),
      href: localizedPath("/maintenance-warranty"),
      cta: t("trustHub.maintenance.cta", "See warranty"),
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-muted/30" aria-labelledby="trust-hub-heading">
      <div className="container mx-auto px-4">
        <h2 id="trust-hub-heading" className="text-2xl md:text-3xl font-bold text-center mb-8 text-foreground">
          {t("trustHub.heading", "Engineered to Trust — Documented to Prove It")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map(({ icon: Icon, title, desc, href, cta }) => (
            <Link
              key={href}
              to={href}
              className="group block p-6 rounded-xl border border-border bg-card hover:border-primary hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{desc}</p>
              <span className="inline-flex items-center text-sm font-medium text-primary">
                {cta}
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
