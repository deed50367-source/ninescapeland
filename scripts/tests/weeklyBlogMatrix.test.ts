import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { weeklyBlogSlugs, weeklyBlogParents, weeklyBlogInbound, boundedBlogMetadata } from "../../src/config/weeklyBlogMatrix";

describe("October 30 blog requirements", () => {
  test("exactly five distinct blog topics are registered", () => {
    expect(weeklyBlogSlugs.length).toBe(5);
    expect(new Set(weeklyBlogSlugs).size).toBe(5);
  });
  test("all six languages contain every complete article", () => {
    for (const language of ["en", "ar", "de", "es", "pt", "fr"]) {
      const posts = JSON.parse(readFileSync(`src/content/blog-2026-10-30/${language}.json`, "utf8"));
      expect(posts.map((post: { slug: string }) => post.slug)).toEqual([...weeklyBlogSlugs]);
      for (const post of posts) {
        expect(post.sections.length).toBe(6);
        expect(post.faq.length).toBe(3);
        expect(post.figures.length).toBe(2);
        expect(post.parents).toEqual(weeklyBlogParents[post.slug]);
      }
    }
  });
  test("every parent links back to the exact child blog", () => {
    for (const slug of weeklyBlogSlugs) for (const parent of weeklyBlogParents[slug] ?? []) {
      expect(weeklyBlogInbound(parent).includes(slug)).toBe(true);
    }
  });
  test("metadata is trimmed and below 60/160 characters", () => {
    const result = boundedBlogMetadata(" " + "T".repeat(80), " " + "D".repeat(180));
    expect(result.title.length).toBe(59);
    expect(result.description.length).toBe(159);
    expect(result.title).toBe(result.title.trim());
    expect(result.description).toBe(result.description.trim());
  });
});
