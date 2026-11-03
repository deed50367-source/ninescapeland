import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { b13Language, b13Path } from "@/config/weeklyAggregationB13Registry";
import { weeklyBlogInbound } from "@/config/weeklyBlogMatrix";
import { novemberBlogInbound } from "@/config/novemberBlogMatrix";
import { reviewedBlogArticles } from "@/config/reviewedBlogContent";

export function WeeklyBlogLinks({ slug }: { slug: string }) {
  const { pathname } = useLocation();
  const language = b13Language(pathname);
  const slugs = [...weeklyBlogInbound(slug), ...novemberBlogInbound(slug)];
  if (!slugs.length) return null;
  const articles = reviewedBlogArticles(language);
  return <section className="border-y border-border py-10"><div className="container-wide">
    <h2 className="font-heading text-2xl font-bold">{articles[0]?.ui.relatedTitle}</h2>
    <div className="mt-5 flex flex-wrap gap-3">{articles.filter(article => slugs.some(item => item === article.slug)).map(article =>
      <Button key={article.slug} variant="outline" asChild className="h-auto whitespace-normal text-start">
        <Link to={b13Path(`blog/${article.slug}`, language)}>{article.title}<ArrowUpRight className="ms-2 h-4 w-4 shrink-0" /></Link>
      </Button>
    )}</div>
  </div></section>;
}