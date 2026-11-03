import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { novemberBlogSlugs, novemberBlogParents, novemberBlogInbound, novemberBlogAuthor } from "../../src/config/novemberBlogMatrix";

describe("November 3 blog requirements", () => {
  test("the five approved articles are credited to Gerry", () => {
    expect(novemberBlogSlugs.length).toBe(5);
    expect(new Set(novemberBlogSlugs).size).toBe(5);
    for (const slug of novemberBlogSlugs) expect(novemberBlogAuthor(slug)).toBe("Gerry");
    expect(novemberBlogAuthor("unrelated-post")).toBeUndefined();
  });
  test("each article has a reciprocal topic parent", () => {
    const expected = ["commercial-indoor-playground-slide-selection", "commercial-indoor-playground-netting", "indoor-playground-equipment-import-shipping-terms", "indoor-playground-factory-acceptance-checklist", "multi-site-indoor-playground-equipment-procurement"];
    novemberBlogSlugs.forEach((slug, i) => {
      expect(novemberBlogParents[slug]?.[0]).toBe(expected[i]);
      expect(novemberBlogInbound(expected[i]).includes(slug)).toBe(true);
    });
  });
  test("all six languages preserve article identity, images, parents and SEO fields", () => {
    for (const language of ["en", "ar", "de", "es", "pt", "fr"]) {
      const posts = JSON.parse(readFileSync(`src/content/blog-2026-11-03/${language}.json`, "utf8"));
      expect(posts.map((post: { slug: string }) => post.slug)).toEqual([...novemberBlogSlugs]);
      for (const post of posts) {
        expect(post.author).toBe("Gerry");
        expect(post.sections.length).toBe(6);
        expect(post.faq.length).toBe(3);
        expect(post.figures.length).toBe(2);
        expect(post.cover.startsWith("https://")).toBe(true);
        expect(post.parents).toEqual(novemberBlogParents[post.slug]);
        expect(post.seo_title.length).toBeLessThan(60);
        expect(post.seo_description.length).toBeLessThan(160);
        expect(post.seo_title).toBe(post.seo_title.trim());
        expect(post.seo_description).toBe(post.seo_description.trim());
      }
    }
  });
  test("all thirty blog addresses are discoverable and prerendered", () => {
    const sitemap = readFileSync("public/sitemap.xml", "utf8");
    const prerender = readFileSync("scripts/prerender.mjs", "utf8");
    for (const slug of novemberBlogSlugs) {
      expect(prerender.includes(`"/blog/${slug}"`)).toBe(true);
      for (const lang of ["en", "ar", "de", "es", "pt", "fr"]) {
        const path = `${lang === "en" ? "" : `/${lang}`}/blog/${slug}`;
        expect(sitemap.includes(`<loc>https://indoorplaygroundsolution.com${path}</loc>`)).toBe(true);
      }
    }
  });
});