import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { B14_BASE_URL, B14_DATE, B14_LANGUAGES, b14Pages, b14Path, b14InboundLinks, b14Metadata } from "../../src/config/weeklyAggregationB14Registry";

describe("November 3 approved procurement topics", () => {
  test("creates exactly the five approved distinct topics", () => {
    expect(b14Pages.map(page => page.slug)).toEqual([
      "commercial-indoor-playground-slide-selection",
      "commercial-indoor-playground-netting",
      "indoor-playground-equipment-import-shipping-terms",
      "indoor-playground-factory-acceptance-checklist",
      "multi-site-indoor-playground-equipment-procurement",
    ]);
  });
  test("each approved parent supplies an inbound relationship", () => {
    for (const page of b14Pages) {
      expect(page.parents.length).toBeGreaterThanOrEqual(2);
      for (const parent of page.parents) expect(b14InboundLinks(parent).some(link => link.slug === page.slug)).toBe(true);
    }
  });
  test("all five topics have all six language versions and unchanged destinations", () => {
    expect(B14_LANGUAGES).toEqual(["en", "ar", "de", "es", "pt", "fr"]);
    for (const language of B14_LANGUAGES) {
      const content = JSON.parse(readFileSync(new URL(`../../src/content/weekly-2026-11-03/${language}.json`, import.meta.url), "utf8"));
      expect(Object.keys(content)).toEqual(b14Pages.map(page => page.slug));
      for (const page of b14Pages) {
        const localized = content[page.slug];
        expect(localized.slug).toBe(page.slug);
        expect(localized.parents.map((parent: { slug: string }) => parent.slug)).toEqual([...page.parents]);
        expect(localized.framework.length).toBe(4);
        expect(localized.rows.length).toBe(4);
        expect(localized.faq.length).toBe(4);
        expect(localized.sources.length).toBeGreaterThanOrEqual(2);
        expect(localized.metaTitle.length).toBeLessThan(60);
        expect(localized.metaDescription.length).toBeLessThan(160);
      }
    }
  });
  test("shared metadata includes the brand in the strict 60/160 limits", () => {
    const result = b14Metadata("  Commercial playground " + "equipment ".repeat(12), " Logistics ".repeat(30));
    expect(result.title.endsWith(" | NinescapeLand")).toBe(true);
    expect(result.title.length).toBeLessThan(60);
    expect(result.description.length).toBeLessThan(160);
    expect(result.title).toBe(result.title.trim());
    expect(result.description).toBe(result.description.trim());
  });
  test("registers all 30 formal-domain routes for discovery", () => {
    expect(B14_BASE_URL).toBe("https://indoorplaygroundsolution.com");
    expect(B14_DATE).toBe("2026-11-03");
    const sitemap = readFileSync(new URL("../../public/sitemap.xml", import.meta.url), "utf8");
    const prerender = readFileSync(new URL("../prerender.mjs", import.meta.url), "utf8");
    for (const page of b14Pages) {
      expect(prerender.includes(`"/${page.slug}"`)).toBe(true);
      for (const language of B14_LANGUAGES) expect(sitemap.includes(`<loc>${B14_BASE_URL}${b14Path(page.slug, language)}</loc>`)).toBe(true);
    }
  });
});