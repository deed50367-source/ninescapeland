import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { b16Slugs, b16Content, b16Metadata, B16_DATE } from "../../src/config/weeklyAggregationB16Registry";
import { getContentDate } from "../../src/config/contentDates";

const originalDates = {
  "indoor-playground-maintenance-and-cleaning-guide": "2026-10-08",
  "soft-play-foam-and-material-specifications": "2026-10-22",
  "daycare-indoor-playground-equipment": "2026-09-10",
  "church-indoor-playground-equipment": "2026-09-10",
  "sensory-inclusive-play-equipment": "2026-05-29",
};
describe("November 18 approved existing-topic refresh", () => {
  test("preserves precisely the five approved existing URLs", () => {
    expect([...b16Slugs].sort()).toEqual(Object.keys(originalDates).sort());
  });
  test("original dates remain separate from the November 18 revision date", () => {
    expect(B16_DATE).toBe("2026-11-18");
    for (const lang of ["en", "ar", "de", "es", "pt", "fr"]) {
      const content = b16Content(lang === "en" ? "/" : `/${lang}/`);
      for (const slug of b16Slugs) {
        expect(content[slug].publishedDate).toBe(originalDates[slug]);
        expect(getContentDate(`/${lang}/${slug}`)).toBe("2026-11-18");
      }
    }
  });
  test("all six languages retain the complete independent content and safe SEO limits", () => {
    for (const lang of ["en", "ar", "de", "es", "pt", "fr"]) {
      const content = b16Content(`/${lang}/`);
      expect(Object.keys(content).sort()).toEqual([...b16Slugs].sort());
      for (const slug of b16Slugs) {
        const page = content[slug];
        const metadata = b16Metadata(page.metaTitle, page.metaDescription);
        expect(metadata.title.length).toBeLessThan(60);
        expect(metadata.description.length).toBeLessThan(160);
        expect(page.framework.length).toBe(4);
        expect(page.rows.length).toBe(4);
        expect(page.faq.length).toBe(4);
        expect(page.checklist.length).toBe(4);
        expect(page.sources.length).toBeGreaterThanOrEqual(3);
      }
    }
  });
  test("all thirty unchanged destinations remain discoverable exactly once", () => {
    const sitemap = readFileSync("public/sitemap.xml", "utf8");
    const prerender = readFileSync("scripts/prerender.mjs", "utf8");
    for (const slug of b16Slugs) {
      expect(prerender.includes(`"/${slug}"`)).toBe(true);
      for (const lang of ["en", "ar", "de", "es", "pt", "fr"]) {
        const url = `https://indoorplaygroundsolution.com${lang === "en" ? "" : `/${lang}`}/${slug}`;
        expect(sitemap.split(`<loc>${url}</loc>`).length - 1).toBe(1);
      }
    }
  });
});