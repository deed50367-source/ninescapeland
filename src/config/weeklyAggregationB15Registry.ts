import english from '@/content/weekly-2026-11-11/en.json';
import arabic from '@/content/weekly-2026-11-11/ar.json';
import german from '@/content/weekly-2026-11-11/de.json';
import spanish from '@/content/weekly-2026-11-11/es.json';
import portuguese from '@/content/weekly-2026-11-11/pt.json';
import french from '@/content/weekly-2026-11-11/fr.json';
import { b14Language, b14Path, b14Metadata, B14_BASE_URL, B14_LANGUAGES } from './weeklyAggregationB14Registry';
export { b14Language as b15Language, b14Path as b15Path, b14Metadata as b15Metadata, B14_BASE_URL as B15_BASE_URL, B14_LANGUAGES as B15_LANGUAGES };
export const B15_DATE = '2026-11-11';
export type B15Slug = keyof typeof english;
export const b15Slugs = Object.keys(english) as B15Slug[];
const bundles = { en: english, ar: arabic, de: german, es: spanish, pt: portuguese, fr: french };
export function b15Content(pathname: string) {
  const language = b14Language(pathname);
  return bundles[language];
}
export function b15InboundLinks(slug: string, pathname: string) {
  const content = b15Content(pathname);
  return b15Slugs.filter(key => content[key].parents.some(parent => parent.slug === slug)).map(key => ({ slug: key, label: content[key].title }));
}
