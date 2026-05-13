import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

export interface RelatedResourceItem {
  title: string;
  desc: string;
  href: string; // raw path, will be localized
  external?: boolean;
}

interface Props {
  heading?: string;
  intro?: string;
  items: RelatedResourceItem[];
}

/**
 * RelatedResources — internal-link block placed near the bottom of
 * aggregation / hub pages. Boosts topical authority and gives visitors
 * concrete next steps deeper into the site.
 */
export const RelatedResources = ({ heading = "Explore Related Resources", intro, items }: Props) => {
  const { localizedPath } = useLocalizedPath();

  return (
    <section className="py-16 md:py-20 bg-background border-t" aria-labelledby="related-resources-heading">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 id="related-resources-heading" className="text-3xl md:text-4xl font-bold mb-3">
            {heading}
          </h2>
          {intro && <p className="text-muted-foreground text-lg">{intro}</p>}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => {
            const to = item.external ? item.href : localizedPath(item.href);
            return (
              <Link
                key={item.href}
                to={to}
                className="group block p-5 rounded-lg border border-border bg-card hover:border-primary hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-base mb-1.5 text-foreground group-hover:text-primary transition-colors flex items-start justify-between gap-2">
                  <span>{item.title}</span>
                  <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
