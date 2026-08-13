interface SpecComparisonTableProps {
  heading: string;
  intro?: string;
  caption: string;
  columns: string[];
  /** Each row: first cell is the row header, remaining cells are data */
  rows: string[][];
  footnote?: string;
}

/**
 * Semantic comparison table. Tables are the single highest-extraction-rate
 * content format for AI answer engines, so this stays real HTML
 * (table / thead / th scope) rather than a div grid.
 */
export const SpecComparisonTable = ({
  heading,
  intro,
  caption,
  columns,
  rows,
  footnote,
}: SpecComparisonTableProps) => (
  <section className="py-16 md:py-20 bg-background" aria-labelledby="spec-table-heading">
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h2 id="spec-table-heading" className="text-3xl md:text-4xl font-bold mb-4">
          {heading}
        </h2>
        {intro && <p className="text-muted-foreground text-lg">{intro}</p>}
      </div>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-left border-collapse text-sm md:text-base">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="bg-muted">
              {columns.map((c) => (
                <th key={c} scope="col" className="px-4 py-3 font-bold border-b border-border whitespace-nowrap">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[0]} className="even:bg-muted/30 align-top">
                {row.map((cell, i) =>
                  i === 0 ? (
                    <th key={i} scope="row" className="px-4 py-3 font-semibold border-b border-border">
                      {cell}
                    </th>
                  ) : (
                    <td key={i} className="px-4 py-3 text-muted-foreground border-b border-border">
                      {cell}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {footnote && <p className="text-sm text-muted-foreground mt-4">{footnote}</p>}
    </div>
  </section>
);
