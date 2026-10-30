import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { B13_BASE_URL, B13_DATE, B13_LANGUAGES, b13Pages, b13Path, b13InboundLinks, b13Metadata } from "../../src/config/weeklyAggregationB13Registry";

describe("October 30 aggregation coverage", () => {
  test("publishes exactly five unique topics", () => {
    expect(b13Pages.length).toBe(5);
    expect(new Set(b13Pages.map(page => page.slug)).size).toBe(5);
  });
  test("every page has existing parent inbound links", () => {
    for (const page of b13Pages) {
      expect(page.parents.length).toBeGreaterThanOrEqual(2);
      for (const parent of page.parents) expect(b13InboundLinks(parent).some(item => item.slug === page.slug)).toBe(true);
    }
  });
  test("all five topics have six complete translations", () => {
    expect(B13_LANGUAGES).toEqual(["en", "ar", "de", "es", "pt", "fr"]);
    for (const language of B13_LANGUAGES) {
      const content = JSON.parse(readFileSync(new URL(`../../src/content/weekly-2026-10-30/${language}.json`, import.meta.url), "utf8"));
      expect(Object.keys(content).length).toBe(5);
      for (const page of b13Pages) {
        expect(content[page.slug].slug).toBe(page.slug);
        expect(content[page.slug].framework.length).toBe(4);
        expect(content[page.slug].rows.length).toBe(4);
        expect(content[page.slug].faq.length).toBe(4);
        expect(content[page.slug].metaTitle.length).toBeLessThan(60);
        expect(content[page.slug].metaDescription.length).toBeLessThan(160);
      }
    }
  });
  test("metadata stays trimmed and strictly below project limits", () => {
    const result = b13Metadata("  " + "T".repeat(80) + "  ", " " + "D".repeat(180) + " ");
    expect(result.title.length).toBe(59);
    expect(result.description.length).toBe(159);
    expect(result.title).toBe(result.title.trim());
    expect(result.description).toBe(result.description.trim());
  });
  test("all 30 discoverable URLs use the assigned domain and revision date", () => {
    expect(B13_BASE_URL).toBe("https://ninescapeland.lovable.app");
    expect(B13_DATE).toBe("2026-10-30");
    const sitemap = readFileSync(new URL("../../public/sitemap.xml", import.meta.url), "utf8");
    for (const page of b13Pages) for (const language of B13_LANGUAGES) {
      expect(sitemap.includes(`<loc>${B13_BASE_URL}${b13Path(page.slug, language)}</loc>`)).toBe(true);
    }
  });
});