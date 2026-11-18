import english from '@/content/weekly-2026-11-18/en.json';
import arabic from '@/content/weekly-2026-11-18/ar.json';
import german from '@/content/weekly-2026-11-18/de.json';
import spanish from '@/content/weekly-2026-11-18/es.json';
import portuguese from '@/content/weekly-2026-11-18/pt.json';
import french from '@/content/weekly-2026-11-18/fr.json';
import { b14Language, b14Path, b14Metadata, B14_BASE_URL, B14_LANGUAGES } from './weeklyAggregationB14Registry';
export { b14Language as b16Language, b14Path as b16Path, b14Metadata as b16Metadata, B14_BASE_URL as B16_BASE_URL, B14_LANGUAGES as B16_LANGUAGES };
export const B16_DATE = '2026-11-18';
export type B16Slug = keyof typeof english;
export const b16Slugs = Object.keys(english) as B16Slug[];
const bundles = { en: english, ar: arabic, de: german, es: spanish, pt: portuguese, fr: french };
export function b16Content(pathname: string) {
  const language = b14Language(pathname);
  return bundles[language];
}
export function b16InboundLinks(slug: string, pathname: string) {
  const content = b16Content(pathname);
  return b16Slugs.filter(key => content[key].parents.some(parent => parent.slug === slug)).map(key => ({ slug: key, label: content[key].title }));
}
