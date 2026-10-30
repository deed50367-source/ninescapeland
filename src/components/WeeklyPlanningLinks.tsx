import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { b13InboundLinks, b13Language, b13Path } from "@/config/weeklyAggregationB13Registry";
import { Button } from "@/components/ui/button";

const headings = { en: "Detailed Planning Guides", ar: "أدلة التخطيط التفصيلية", de: "Detaillierte Planungsleitfäden", es: "Guías de planificación detalladas", pt: "Guias de planejamento detalhados", fr: "Guides de planification détaillés" };

export function WeeklyPlanningLinks({ slug }: { slug: string }) {
  const { pathname } = useLocation();
  const language = b13Language(pathname);
  const links = b13InboundLinks(slug);
  if (!links.length) return null;
  return <section className="border-y border-border bg-muted/30 py-10">
    <div className="container-wide">
      <h2 className="font-heading text-2xl font-bold">{headings[language]}</h2>
      <div className="mt-5 flex flex-wrap gap-3">
        {links.map(link => <Button variant="outline" asChild key={link.slug} className="h-auto whitespace-normal text-start">
          <Link to={b13Path(link.slug, language)}>{link.labels[language]}<ArrowUpRight className="ms-2 h-4 w-4 shrink-0" /></Link>
        </Button>)}
      </div>
    </div>
  </section>;
}