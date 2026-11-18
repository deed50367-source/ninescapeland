import octoberEnglish from "@/content/blog-2026-10-30/en.json";
import novemberEnglish from "@/content/blog-2026-11-03/en.json";

import november11English from "@/content/blog-2026-11-11/en.json";
import november18English from "@/content/blog-2026-11-18/en.json";

export type ReviewedBlogArticle = typeof octoberEnglish[number];
const octoberBundles = import.meta.glob<{ default: ReviewedBlogArticle[] }>("../content/blog-2026-10-30/*.json", { eager: true });
const novemberBundles = import.meta.glob<{ default: ReviewedBlogArticle[] }>("../content/blog-2026-11-03/*.json", { eager: true });

const november11Bundles = import.meta.glob<{ default: ReviewedBlogArticle[] }>("../content/blog-2026-11-11/*.json", { eager: true });
const november18Bundles = import.meta.glob<{ default: ReviewedBlogArticle[] }>("../content/blog-2026-11-18/*.json", { eager: true });

export function reviewedBlogArticles(language: string): ReviewedBlogArticle[] {
  return [
    ...(november18Bundles[`../content/blog-2026-11-18/${language}.json`]?.default ?? november18English),
    ...(november11Bundles[`../content/blog-2026-11-11/${language}.json`]?.default ?? november11English),
    ...(octoberBundles[`../content/blog-2026-10-30/${language}.json`]?.default ?? octoberEnglish),
    ...(novemberBundles[`../content/blog-2026-11-03/${language}.json`]?.default ?? novemberEnglish),
  ];
}