/** Helmet updates document.title without adding data-rh to <title>. */
export function browserRouteReady(expectedCanonical, expectedLanguage) {
  const canonical = document.querySelector('link[rel="canonical"][data-rh]')?.getAttribute('href');
  const description = document.querySelector('meta[name="description"][data-rh]')?.getAttribute('content');
  const root = document.getElementById('root');
  return canonical === expectedCanonical && document.documentElement.lang === expectedLanguage &&
    Boolean(document.title.trim()) && Boolean(description?.trim()) &&
    Boolean(root?.querySelector('h1')?.textContent?.trim());
}