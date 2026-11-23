import { expect, test } from 'bun:test';
import { browserRouteReady } from '../lib/prerenderReady.mjs';

test('route readiness accepts a Helmet title without a data-rh attribute', () => {
  const previous = globalThis.document;
  const canonical = 'https://indoorplaygroundsolution.com/pt/contact';
  globalThis.document = {
    title: 'Entre em Contato | NinescapeLand',
    documentElement: { lang: 'pt' },
    querySelector: (selector: string) => ({ getAttribute: () => selector.startsWith('link') ? canonical : 'Contact the manufacturer.' }),
    getElementById: () => ({ querySelector: () => ({ textContent: 'Comece Seu Projeto Hoje' }) }),
  } as unknown as Document;
  try {
    expect(browserRouteReady(canonical, 'pt')).toBe(true);
    expect(browserRouteReady('https://indoorplaygroundsolution.com/', 'pt')).toBe(false);
    expect(browserRouteReady(canonical, 'en')).toBe(false);
    globalThis.document.title = '';
    expect(browserRouteReady(canonical, 'pt')).toBe(false);
  } finally {
    globalThis.document = previous;
  }
});