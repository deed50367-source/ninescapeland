import { describe, expect, test } from 'bun:test';
import { normalizePrerenderDocument } from '../lib/prerenderDocument.mjs';
import { cmsPublicRoutes, productionFallbackRules } from '../lib/productionRouting.mjs';
import { optimizedStorageImage } from '../../src/lib/imageDelivery';
import { priorityPlanningLinks, priorityPlanningPaths } from '../../src/config/priorityPlanningLinks';

describe('November 23 SEO/GEO corrections', () => {
  test('saved social metadata retains the route value instead of the fallback', () => {
    const document = '<head><meta property="og:url" content="/"><meta data-rh="true" property="og:url" content="/de/faq"><meta property="og:title" content="Home"><meta data-rh="true" property="og:title" content="FAQ"></head>';
    const result = normalizePrerenderDocument(document);
    expect(result.match(/property="og:url"/g)).toHaveLength(1);
    expect(result).toContain('content="/de/faq"');
    expect(result).not.toContain('content="Home"');
  });
  test('one shared entity declaration remains while page entities are preserved', () => {
    const script = (data: object) => `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
    const result = normalizePrerenderDocument(`<head>${script({'@id':'/#website', name:'old'})}${script({'@id':'/#website', name:'current'})}${script({'@id':'/de/faq#webpage'})}</head>`);
    expect(result.match(/application\/ld\+json/g)).toHaveLength(2);
    expect(result).toContain('current');
    expect(result).toContain('/de/faq#webpage');
  });
  test('known public paths are exact matches, never a catch-all for invalid pages', () => {
    const rules = productionFallbackRules(['/faq', '/ar/faq', '/blog/article', '/faq']);
    const pattern = rules.match(/RewriteRule (\S+)/)?.[1];
    if (!pattern) throw new Error('No generated routing rule');
    const regex = new RegExp(pattern);
    expect(regex.test('faq')).toBe(true);
    expect(regex.test('ar/faq/')).toBe(true);
    expect(regex.test('blog/article')).toBe(true);
    expect(regex.test('faq/not-a-page')).toBe(false);
    expect(regex.test('seo-nonexistent-20261123-check')).toBe(false);
  });
  test('published language rows and active products retain their public access paths', () => {
    expect(cmsPublicRoutes([
      {slug:'article', language:'en', status:'published'},
      {slug:'article', language:'de', status:'published'},
      {slug:'draft', language:'en', status:'draft'},
    ], [{slug:'equipment',is_active:true},{slug:'inactive',is_active:false}])).toEqual([
      '/blog/article', '/de/blog/article',
      '/products/equipment', '/ar/products/equipment', '/de/products/equipment', '/es/products/equipment', '/pt/products/equipment', '/fr/products/equipment',
    ]);
  });
  test('all seven reported priority pages retain localized hub entrances', () => {
    expect(priorityPlanningPaths).toHaveLength(7);
    for (const language of ['en','ar','de','es','pt','fr']) {
      const links = priorityPlanningLinks(language);
      expect(links.map(link => link.path)).toEqual([...priorityPlanningPaths]);
      if (language !== 'en') expect(links.map(link => link.label)).not.toEqual(priorityPlanningLinks('en').map(link => link.label));
    }
  });
  test('optimized image requests retain the original image path with bounded dimensions', () => {
    const raw = 'https://example.supabase.co/storage/v1/object/public/assets/photo.jpg';
    expect(optimizedStorageImage(raw, {width:640,quality:70})).toBe('https://example.supabase.co/storage/v1/render/image/public/assets/photo.jpg?width=640&quality=70&format=webp');
    expect(optimizedStorageImage('/assets/mascot.webp', {width:640})).toBe('/assets/mascot.webp');
    expect(optimizedStorageImage('https://images.example.com/photo.jpg', {width:640})).toBe('https://images.example.com/photo.jpg');
  });
});