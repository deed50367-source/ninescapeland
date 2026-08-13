import { ExternalLink } from "lucide-react";

export interface SourceItem {
  /** Standard / publication name, e.g. "ASTM F1487-21" */
  label: string;
  /** Issuing body, e.g. "ASTM International" */
  publisher: string;
  /** Official URL of the standard or publication */
  url: string;
  /** Why this source is cited on the page */
  note?: string;
}

interface SourcesReferencesProps {
  heading?: string;
  intro?: string;
  sources: SourceItem[];
}

/**
 * "Sources / References" block.
 *
 * Answer engines weigh outbound citations to authoritative primary sources as
 * an E-E-A-T signal. Every URL here must be an official standards-body or
 * regulator page — never a paraphrase or an affiliate link.
 */
export const SourcesReferences = ({
  heading = "Sources & References",
  intro = "Safety and compliance claims on this page reference the following primary standards and regulatory publications.",
  sources,
}: SourcesReferencesProps) => {
  if (!sources.length) return null;

  return (
    <section className="py-12 md:py-16 bg-muted/30 border-t border-border" aria-labelledby="sources-heading">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 id="sources-heading" className="text-2xl md:text-3xl font-bold mb-3">
          {heading}
        </h2>
        <p className="text-muted-foreground mb-6">{intro}</p>
        <ol className="space-y-4 list-decimal list-inside">
          {sources.map((s) => (
            <li key={s.url} className="text-sm md:text-base leading-relaxed">
              <a
                href={s.url}
                target="_blank"
                rel="noopener"
                className="font-semibold text-primary hover:text-accent underline underline-offset-4 inline-flex items-baseline gap-1"
              >
                {s.label}
                <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
              </a>
              <span className="text-muted-foreground"> — {s.publisher}</span>
              {s.note && <span className="block text-muted-foreground mt-1">{s.note}</span>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
