import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { november18BlogSlugs, november18BlogParents, november18BlogInbound } from "../../src/config/november18BlogMatrix";
import { creditedBlogAuthor } from "../../src/config/creditedBlogAuthor";

describe("November 18 approved blogs", () => {
  test("the five uploaded articles retain Gerry's editorial credit independently of account ownership", () => {
    expect(november18BlogSlugs).toHaveLength(5);
    for (const slug of november18BlogSlugs) expect(creditedBlogAuthor(slug)).toBe("Gerry");
    expect(creditedBlogAuthor("indoor-playground-slide-clearance")).toBe("Gerry");
    expect(creditedBlogAuthor("unrelated-article")).toBeUndefined();
  });
  test("five articles each have six complete translated records with cover and two figures", () => {
    const english = JSON.parse(readFileSync("src/content/blog-2026-11-18/en.json", "utf8"));
    for (const language of ["en", "ar", "de", "es", "pt", "fr"]) {
      const articles = JSON.parse(readFileSync(`src/content/blog-2026-11-18/${language}.json`, "utf8"));
      expect(articles.map((article: {slug: string}) => article.slug)).toEqual([...november18BlogSlugs]);
      for (const [index, article] of articles.entries()) {
        expect(article.author).toBe("Gerry");
        expect(article.sections).toHaveLength(6);
        expect(article.faq).toHaveLength(3);
        expect(article.figures).toHaveLength(2);
        expect(article.cover).toBe(english[index].cover);
        expect(article.figures.map((figure: {src: string}) => figure.src)).toEqual(english[index].figures.map((figure: {src: string}) => figure.src));
        expect(article.seo_title.length).toBeLessThan(60);
        expect(article.seo_description.length).toBeLessThan(160);
        expect(article.seo_title.trim()).toBe(article.seo_title);
        expect(article.seo_description.trim()).toBe(article.seo_description);
        expect(article.keywords).toHaveLength(4);
        expect(article.parents).toEqual(november18BlogParents[article.slug]);
        if (language !== "en") {
          expect(article.title).not.toBe(english[index].title);
          expect(article.sections[0].html).not.toBe(english[index].sections[0].html);
          expect(article.ui.authorBio).not.toBe(english[index].ui.authorBio);
        }
      }
    }
  });
  test("each distinct operational article links back to its existing planning topic", () => {
    const parents = ["indoor-playground-maintenance-and-cleaning-guide", "soft-play-foam-and-material-specifications", "sensory-inclusive-play-equipment", "daycare-indoor-playground-equipment", "church-indoor-playground-equipment"];
    november18BlogSlugs.forEach((slug, index) => {
      expect(november18BlogParents[slug]).toEqual([parents[index]]);
      expect(november18BlogInbound(parents[index])).toEqual([slug]);
    });
  });
  test("all thirty language routes are registered without duplicate sitemap destinations", () => {
    const sitemap = readFileSync("public/sitemap.xml", "utf8");
    const prerender = readFileSync("scripts/prerender.mjs", "utf8");
    for (const slug of november18BlogSlugs) {
      expect(prerender.includes(`"/blog/${slug}"`)).toBe(true);
      for (const language of ["en", "ar", "de", "es", "pt", "fr"]) {
        const url = `https://indoorplaygroundsolution.com${language === "en" ? "" : `/${language}`}/blog/${slug}`;
        expect(sitemap.split(`<loc>${url}</loc>`)).toHaveLength(2);
      }
    }
  });
});
