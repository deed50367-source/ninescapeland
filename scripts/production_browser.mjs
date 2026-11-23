import { launch } from 'puppeteer';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
const origin = 'https://indoorplaygroundsolution.com';
const inventory = JSON.parse(readFileSync('deployment-manifest.json', 'utf8'));
const reports = [];
const browser = await launch({ headless: true, executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined, args: ['--no-sandbox'] });
mkdirSync('production-screenshots', { recursive: true });
const routes = ['/', '/ar', '/de', '/es', '/pt', '/fr', '/products',
  '/indoor-playground-maintenance-and-cleaning-guide', '/soft-play-foam-and-material-specifications',
  '/daycare-indoor-playground-equipment', '/church-indoor-playground-equipment', '/sensory-inclusive-play-equipment',
  '/blog/indoor-playground-air-quality', '/blog/soft-play-disinfectant-compatibility',
  '/blog/indoor-playground-quiet-hours', '/blog/playground-supervision-checklist', '/blog/church-playground-volunteer-training'];
try {
  for (const route of routes) {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.setViewport({ width: 1280, height: 1800 });
    try {
      await page.goto(origin + route, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForFunction(canonical => document.querySelector('link[rel="canonical"]')?.href === canonical && Boolean(document.querySelector('h1')?.textContent), { timeout: 20000 }, origin + route);
      const head = await page.evaluate(() => ({ title: document.title, description: document.querySelector('meta[name="description"]')?.content, h1: [...document.querySelectorAll('h1')].map(e => e.textContent.trim().replace(/\s+/g, ' ')), language: document.documentElement.lang }));
      const expected = inventory.pages[route];
      if (!expected || head.title !== expected.tags.title[0] || head.description !== expected.tags.description[0] || JSON.stringify(head.h1) !== JSON.stringify(expected.h1) || head.language !== expected.language) throw new Error('Rendered page differs from approved capture');
      if (route === '/') {
        await page.waitForFunction(() => { const v = document.querySelector('#home video'); const i = document.querySelector('#home img'); return v && v.readyState >= 2 && i?.complete && i.naturalWidth > 0; }, { timeout: 25000 });
        const play = await page.$('button[aria-label="Play equipment video"]');
        if (play) await play.click();
        const start = await page.$eval('#home video', v => v.currentTime);
        await new Promise(r => setTimeout(r, 600));
        const now = await page.$eval('#home video', v => v.currentTime);
        if (!(now > start)) throw new Error('Equipment video is not playing');
        await page.click('button[aria-label="Pause equipment video"]');
        if (!(await page.$eval('#home video', v => v.paused))) throw new Error('Pause failed');
        await page.click('button[aria-label="Play equipment video"]');
        await page.setViewport({ width: 1966, height: 1362 });
        await page.screenshot({ path: 'production-screenshots/home-desktop.png' });
        await page.click('#home a[href="#products"]');
        await page.waitForFunction(() => location.hash === '#products' && document.querySelector('#products')?.getBoundingClientRect().top < innerHeight);
        await page.goto(origin, { waitUntil: 'domcontentloaded' });
        await page.setViewport({ width: 390, height: 844 });
        await page.waitForSelector('#home h1');
        await page.screenshot({ path: 'production-screenshots/home-mobile.png' });
        if (!(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth))) throw new Error('Mobile overflow');
        await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
        await page.waitForFunction(() => !document.querySelector('#home video'));
      }
      if (route.startsWith('/blog/')) {
        await page.waitForFunction(() => [...document.querySelectorAll('main img')].some(i => i.complete && i.naturalWidth > 0), { timeout: 20000 });
      }
      if (errors.length) throw new Error(errors.join('; '));
      reports.push({ route, passed: true });
    } catch (error) {
      reports.push({ route, passed: false, error: error.message });
    } finally { await page.close(); }
  }
} finally {
  await browser.close();
  writeFileSync('production-browser.json', JSON.stringify({ revision: inventory.revision, results: reports }, null, 2));
}
for (const result of reports) console.log(result.passed ? 'PASS' : 'FAIL', result.route, result.error || '');
if (reports.some(result => !result.passed)) process.exitCode = 1;
