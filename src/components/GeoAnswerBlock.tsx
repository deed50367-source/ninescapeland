import { useTranslation } from "react-i18next";
import { SpecComparisonTable } from "@/components/SpecComparisonTable";
import { SourcesReferences } from "@/components/SourcesReferences";

/**
 * GEO (answer-engine) extraction block.
 *
 * Rendered EAGERLY (never inside LazySection) so the prerendered HTML that AI
 * crawlers fetch always contains:
 *  - question-style H2 headings with short, self-contained answers
 *  - a real semantic <table> comparison
 *  - an outbound citation list to primary standards / regulators (.gov, wiki)
 *
 * All copy is localized, so /es/, /de/, /fr/, /pt/, /ar/ pass the same checks.
 */

const QUESTION_KEYS = ["cost", "leadTime", "standards", "space"] as const;
const ROW_KEYS = ["softPlay", "playground", "trampoline", "ninja"] as const;

const SOURCES = [
  {
    label: "Public Playground Safety Handbook (CPSC 325)",
    publisher: "U.S. Consumer Product Safety Commission",
    url: "https://www.cpsc.gov/s3fs-public/325.pdf",
  },
  {
    label: "ASTM F1487-21 — Playground Equipment for Public Use",
    publisher: "ASTM International",
    url: "https://www.astm.org/f1487-21.html",
  },
  {
    label: "ASTM F2970-15 — Trampoline Courts",
    publisher: "ASTM International",
    url: "https://www.astm.org/f2970-15.html",
  },
  {
    label: "EN 1176 — Playground Equipment and Surfacing",
    publisher: "European Committee for Standardization (CEN)",
    url: "https://standards.cencenelec.eu/dyn/www/f?p=205:110:0::::FSP_PROJECT:22773",
  },
  {
    label: "Playground (encyclopedia entry)",
    publisher: "Wikipedia",
    url: "https://en.wikipedia.org/wiki/Playground",
  },
];

export const GeoAnswerBlock = () => {
  const { t } = useTranslation();

  const questions = QUESTION_KEYS.map((key) => ({
    q: t(`geo.questions.${key}.q`),
    a: t(`geo.questions.${key}.a`),
  })).filter((i) => i.q && !i.q.startsWith("geo."));

  const columns = [
    t("geo.table.col1", "Project type"),
    t("geo.table.col2", "Typical area"),
    t("geo.table.col3", "Budget range (USD)"),
    t("geo.table.col4", "Lead time"),
  ];

  const rows = ROW_KEYS.map((key) => [
    t(`geo.table.rows.${key}.name`),
    t(`geo.table.rows.${key}.area`),
    t(`geo.table.rows.${key}.budget`),
    t(`geo.table.rows.${key}.lead`),
  ]).filter((r) => r[0] && !r[0].startsWith("geo."));

  return (
    <>
      {questions.length > 0 && (
        <section className="py-14 md:py-20 bg-background" aria-labelledby="geo-answers-heading">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 id="geo-answers-heading" className="text-3xl md:text-4xl font-bold mb-8">
              {t("geo.heading", "Key questions from playground operators")}
            </h2>
            <div className="space-y-8">
              {questions.map((item) => (
                <article key={item.q}>
                  <h2 className="text-xl md:text-2xl font-bold mb-2">{item.q}</h2>
                  <p className="text-muted-foreground leading-relaxed">{item.a}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {rows.length > 0 && (
        <SpecComparisonTable
          heading={t("geo.table.heading", "Indoor playground project comparison")}
          intro={t("geo.table.intro", "")}
          caption={t("geo.table.caption", "Comparison of area, budget and lead time by project type")}
          columns={columns}
          rows={rows}
          footnote={t("geo.table.footnote", "")}
        />
      )}

      <SourcesReferences
        heading={t("geo.sources.heading", "Sources & References")}
        intro={t("geo.sources.intro", "Safety and compliance statements on this page reference the following primary standards and regulatory publications.")}
        sources={SOURCES}
      />
    </>
  );
};
