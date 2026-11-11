import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { B15_DATE, B15_LANGUAGES, b15Slugs, b15Content, b15InboundLinks, b15Path, b15Metadata } from '../../src/config/weeklyAggregationB15Registry';
import { getContentDate } from '../../src/config/contentDates';
const expected = ['private-indoor-playground-party-room-design', 'ninja-warrior-course-for-kids-indoor-playground', 'themed-indoor-playground-design', 'modular-reconfigurable-indoor-play-equipment', 'complete-indoor-play-center-solutions'];
describe('November 11 existing-topic refresh', () => {
  test('preserves the five approved existing URLs without adding competing topics', () => {
    expect(b15Slugs).toEqual(expected);
  });
  test('every declared parent provides a reciprocal existing-topic relationship', () => {
    for (const slug of b15Slugs) {
      for (const parent of b15Content('/')[slug].parents) {
        expect(b15InboundLinks(parent.slug, '/').some(link => link.slug === slug)).toBe(true);
      }
    }
  });
  test('all five topics retain original publication dates and update only revision dates', () => {
    const dates = ['2026-10-30', '2026-10-08', '2026-08-06', '2026-09-04', '2026-09-18'];
    expect(B15_DATE).toBe('2026-11-11');
    for (const lang of B15_LANGUAGES) {
      const content = JSON.parse(readFileSync(new URL(`../../src/content/weekly-2026-11-11/${lang}.json`, import.meta.url), 'utf8'));
      expected.forEach((slug, index) => {
        expect(content[slug].publishedDate).toBe(dates[index]);
        expect(getContentDate(b15Path(slug as typeof b15Slugs[number], lang))).toBe('2026-11-11');
      });
    }
  });
  test('supports precisely all six existing site languages and distinct page data', () => {
    expect(B15_LANGUAGES).toEqual(['en', 'ar', 'de', 'es', 'pt', 'fr']);
    for (const lang of B15_LANGUAGES) {
      const content = JSON.parse(readFileSync(new URL(`../../src/content/weekly-2026-11-11/${lang}.json`, import.meta.url), 'utf8'));
      expect(Object.keys(content)).toEqual(expected);
      for (const slug of expected) {
        const page = content[slug];
        expect(page.slug).toBe(slug);
        expect(page.framework.length).toBe(4);
        expect(page.rows.every((row: string[]) => row.length === page.columns.length)).toBe(true);
        expect(page.faq.length).toBe(4);
        expect(page.sources.length).toBeGreaterThanOrEqual(2);
        expect(b15Metadata(page.metaTitle, page.metaDescription).title.length).toBeLessThan(60);
        expect(b15Metadata(page.metaTitle, page.metaDescription).description.length).toBeLessThan(160);
      }
    }
  });
  test('registers all 30 unchanged language destinations for search discovery', () => {
    const sitemap = readFileSync(new URL('../../public/sitemap.xml', import.meta.url), 'utf8');
    const prerender = readFileSync(new URL('../prerender.mjs', import.meta.url), 'utf8').split('const LANGUAGES')[0];
    for (const slug of b15Slugs) {
      expect(prerender.includes(`"/${slug}"`)).toBe(true);
      for (const lang of B15_LANGUAGES) expect(sitemap.includes(`<loc>https://indoorplaygroundsolution.com${b15Path(slug, lang)}</loc>`)).toBe(true);
    }
  });
});
