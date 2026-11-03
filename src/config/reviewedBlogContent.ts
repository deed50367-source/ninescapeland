import octoberEnglish from "@/content/blog-2026-10-30/en.json";
import novemberEnglish from "@/content/blog-2026-11-03/en.json";

export type ReviewedBlogArticle = typeof octoberEnglish[number];
const octoberBundles = import.meta.glob<{ default: ReviewedBlogArticle[] }>("../content/blog-2026-10-30/*.json", { eager: true });
const novemberBundles = import.meta.glob<{ default: ReviewedBlogArticle[] }>("../content/blog-2026-11-03/*.json", { eager: true });

export function reviewedBlogArticles(language: string): ReviewedBlogArticle[] {
  return [
    ...(octoberBundles[`../content/blog-2026-10-30/${language}.json`]?.default ?? octoberEnglish),
    ...(novemberBundles[`../content/blog-2026-11-03/${language}.json`]?.default ?? novemberEnglish),
  ];
}