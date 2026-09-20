#!/usr/bin/env node
/**
 * Static HTML Prerender Script for SEO
 * 
 * Generates static HTML files for all routes so search engine crawlers
 * can index full page content instead of an empty SPA shell.
 * 
 * Usage:
 *   1. npm run build          (normal Vite build)
 *   2. npm run prerender      (generate static HTML in dist/)
 *   Or combined:
 *   npm run build:static      (build + prerender)
 * 
 * Requirements:
 *   npm install -D puppeteer
 */

import { launch } from "puppeteer";
import { createServer } from "http";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join, extname, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = join(__dirname, "..", "dist");
// CSS that Vite injects as inline <style> for async chunks. Collected across all routes
// and written once to dist/assets/prerender-styles.css so each static HTML stays small.
const EXTRACTED_CSS = new Set();
const PORT = 4173;
const BASE_URL = `http://localhost:${PORT}`;

// All core routes to prerender
const CORE_ROUTES = [
  "/",
  "/404",
  "/about-us",
  "/products",
  "/products/indoor-playground",
  "/products/trampoline-park",
  "/products/ninja-course",
  "/products/soft-play",
  "/process",
  "/projects",
  "/contact",
  "/faq",
  "/blog",
  "/case-studies",
  "/best-indoorplaygroundsolution-active-play-for-running-facilities",
  "/indoorplaygroundsolution-office-wellness-solutions",
  "/soft-play-equipment-shopping-mall-solutions",
  "/trampoline-park-fec-solutions",
  "/gamified-attractions-manufacturer",
  "/custom-indoor-playground-cost-free-3d-design",
  "/themed-indoor-playground-design",
  "/sensory-inclusive-play-equipment",
  "/iaapa-asia-2026-hong-kong",
  "/indoor-playground-roi-analysis-uk",
  "/indoor-playground-roi-canada",
  "/indoor-pe-equipment-for-schools",
  "/montessori-indoor-playground-design",
  "/homeschool-coop-indoor-play-solutions",
  "/indoor-summer-camp-playground-ideas",
  "/hygienic-indoor-playground-for-infants",
  "/home-playroom-design-for-toddlers",
  "/safe-indoor-playground-equipment-for-small-spaces",
  "/accessible-indoor-playground-design-for-disabilities",
  "/commercial-indoor-playground-flooring-and-mats",
  "/indoor-playground-business-plan",
  "/family-entertainment-center-business-plan",
  "/inclusive-play-center-design-for-children",
  "/preschool-playground-equipment-and-soft-play-design",
  "/tuv-certified-playground-equipment-supplier",
  "/safe-indoor-play-areas-for-6-year-olds",
  "/how-to-design-an-educational-indoor-play-area",
  "/indoor-playground-equipment-for-early-childhood-centers",
  "/interactive-play-equipment-for-learning-centers",
  "/modular-reconfigurable-indoor-play-equipment",
  // Weekly aggregation pages (batch 6)
  "/after-school-program-indoor-play-equipment",
  "/daycare-indoor-playground-equipment",
  "/church-indoor-playground-equipment",
  "/screen-free-play-alternatives-for-kids",
  "/indoor-playground-total-cost-of-ownership",
  // Investment / ROI hub + per-country guides
  "/investment-opportunity",
  "/investment-opportunity/indoor-playground-investment-australia",
  "/investment-opportunity/indoor-playground-investment-new-zealand",
  "/investment-opportunity/indoor-playground-investment-uae",
  "/investment-opportunity/indoor-playground-investment-saudi-arabia",
  "/investment-opportunity/indoor-playground-investment-mexico",
  "/investment-opportunity/indoor-playground-investment-brazil",
  // Trust hub pages
  "/safety-certifications",
  "/customer-testimonials",
  "/maintenance-warranty",
  // Location pages
  "/locations/indoor-playground-equipment-usa",
  "/locations/indoor-playground-equipment-uk",
  "/locations/indoor-playground-equipment-uae",
  "/locations/indoor-playground-equipment-saudi-arabia",
  "/locations/indoor-playground-equipment-australia",
  "/locations/indoor-playground-equipment-canada",
  "/locations/indoor-playground-equipment-germany",
  "/locations/indoor-playground-equipment-india",
  "/locations/indoor-playground-equipment-mexico",
  "/locations/indoor-playground-equipment-brazil",
  // Industry/market landing pages
  "/market/best-indoor-playground-solution-for-real-estate",
  "/market/pediatric-indoor-playground-solution-for-healthcare",
  "/market/educational-indoor-playground-solution-for-schools",
  "/market/ecommerce-retailtainment-indoor-playground-solution",
  "/market/finance-sector-indoor-playground-solution",
  "/market/best-indoor-playground-solution-for-legal-offices",
  "/market/experiential-marketing-indoor-playground-solutions",
  "/market/hr-workplace-wellness-indoor-playground",
  "/market/logistics-hub-indoor-playground-solutions",
  "/market/manufacturing-facility-indoor-playground-safety",
  // Trust pages
  "/privacy",
  "/terms",
];

const LANGUAGES = ["es", "pt", "de", "fr", "ar"];

// Google Ads landing pages — English only (no language variants)
const ENGLISH_ONLY_ROUTES = [
  "/lp/indoor-playground-equipment",
  "/lp/trampoline-park-equipment",
  "/lp/privacy",
  // Weekly education/solution aggregation pages (English only)
  "/educational-benefits-of-indoor-play-centers",
  "/safety-standards-for-trampoline-park-equipment",
  "/custom-soft-play-equipment-manufacturer-for-schools",
  "/indoor-play-center-educational-activities-by-age",
  "/how-to-create-active-learning-environment",
  "/kinesthetic-learning-equipment-benefits",
  "/designing-sensory-play-areas-for-education",
  "/indoor-trampoline-park-business-for-schools",
  // Weekly aggregation pages (batch 7, English originals)
  "/how-to-fund-school-playground-equipment",
  "/inclusive-indoor-play-equipment-special-education",
  "/free-3d-design-for-indoor-play-center",
  "/durable-soft-play-equipment-title-1-schools",
  "/astm-certified-commercial-trampoline-park-supplier",
  "/ninja-course-equipment-indoor-education-centers",
  "/complete-indoor-play-center-solutions",
];

// Generate all routes (English + other languages)
function generateAllRoutes() {
  const routes = [...CORE_ROUTES];
  for (const lang of LANGUAGES) {
    for (const route of CORE_ROUTES) {
      routes.push(route === "/" ? `/${lang}` : `/${lang}${route}`);
    }
  }
  routes.push(...ENGLISH_ONLY_ROUTES);
  return routes;
}

// Simple static file server for dist/
function startServer() {
  const mimeTypes = {
    ".html": "text/html",
    ".js": "application/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".svg": "image/svg+xml",
    ".webp": "image/webp",
    ".ico": "image/x-icon",
    ".woff2": "font/woff2",
    ".woff": "font/woff",
    ".webmanifest": "application/manifest+json",
  };

  const server = createServer((req, res) => {
    let filePath = join(DIST_DIR, req.url === "/" ? "index.html" : req.url);

    // SPA fallback: if file doesn't exist, serve index.html
    if (!existsSync(filePath) || !extname(filePath)) {
      filePath = join(DIST_DIR, "index.html");
    }

    try {
      const content = readFileSync(filePath);
      const ext = extname(filePath);
      res.writeHead(200, { "Content-Type": mimeTypes[ext] || "application/octet-stream" });
      res.end(content);
    } catch {
      res.writeHead(404);
      res.end("Not found");
    }
  });

  return new Promise((resolve) => {
    server.listen(PORT, () => {
      console.log(`📦 Static server running at ${BASE_URL}`);
      resolve(server);
    });
  });
}

async function prerenderRoute(browser, route) {
  const page = await browser.newPage();

  // Block unnecessary resources to speed up rendering
  await page.setRequestInterception(true);
  page.on("request", (req) => {
    const type = req.resourceType();
    if (["image", "font", "media"].includes(type)) {
      req.abort();
    } else {
      req.continue();
    }
  });

  const url = `${BASE_URL}${route}`;

  try {
    await page.goto(url, {
      waitUntil: "networkidle0",
      timeout: 30000,
    });

    // Wait for React to finish rendering
    await page.waitForFunction(
      () => {
        const root = document.getElementById("root");
        if (!root || root.children.length === 0 || root.innerHTML.length < 500) return false;
        // Ensure the initial loader is gone
        const loader = document.getElementById("initial-loader");
        if (loader && loader.style.display !== "none") return false;
        return true;
      },
      { timeout: 15000 }
    ).catch(() => {
      // Fallback: just wait a bit more
    });

    // Extra wait for lazy-loaded content
    await new Promise((r) => setTimeout(r, 2000));

    // ── Wait for react-helmet-async to flush <head> ──
    // Helmet applies its tags through requestAnimationFrame. Chrome throttles rAF in
    // pages that are not the foreground tab, so with parallel prerendering the head of
    // most routes was saved WITHOUT title / description / canonical / JSON-LD.
    // That single bug made the GEO audit report "no BreadcrumbList / no dateModified /
    // no FAQPage / no author" on pages whose code does emit them.
    const helmetReady = () =>
      page.waitForFunction(
        () => document.querySelectorAll("head [data-rh]").length > 5,
        { timeout: 12000 }
      );
    let helmetOk = await helmetReady().then(() => true).catch(() => false);
    if (!helmetOk) {
      // Bring the page to the foreground so rAF resumes, then retry once.
      await page.bringToFront().catch(() => {});
      await new Promise((r) => setTimeout(r, 500));
      helmetOk = await helmetReady().then(() => true).catch(() => false);
    }
    if (!helmetOk) {
      console.warn(`     ⚠️  ${route} — head tags (title/meta/JSON-LD) not flushed`);
    }

    // Get the full rendered HTML
    let html = await page.content();

    // Hostinger can rate-limit pages that fan out dozens of concurrent chunk requests.
    // During prerender, Vite injects <link rel="modulepreload"> tags for every lazy chunk
    // touched by the route; saving those tags makes later visitors request all chunks at once
    // and can produce HTTP 429 blank pages. Keep the rendered HTML, but let the browser load
    // chunks naturally from the module graph instead of preloading them all in parallel.
    html = html.replace(/\s*<link\b[^>]*\brel=["']modulepreload["'][^>]*>/gi, "");
    html = html.replace(/\s*<link\b[^>]*\brel=["'][^"']*\bmodulepreload\b[^"']*["'][^>]*>/gi, "");

    // ── Move JS-injected chunk CSS out of the static HTML ──
    // Vite injects the CSS of every async chunk as an inline <style> block during prerender
    // (~15KB per page), which pushes the static HTML past the 125KB crawl budget flagged by
    // the SEO audit. Extract those blocks into one shared stylesheet and link it instead.
    // The small critical-CSS block from index.html (<2KB) stays inline for FCP.
    html = html.replace(/<style\b[^>]*>([\s\S]*?)<\/style>/gi, (match, css) => {
      if (css.trim().length < 2000) return match;
      EXTRACTED_CSS.add(css.trim());
      return "";
    });
    if (EXTRACTED_CSS.size > 0) {
      const cssPath = join(DIST_DIR, "assets", "prerender-styles.css");
      mkdirSync(dirname(cssPath), { recursive: true });
      writeFileSync(cssPath, [...EXTRACTED_CSS].join("\n"), "utf-8");
      if (!/prerender-styles\.css/.test(html)) {
        html = html.replace(
          /<\/head>/i,
          '  <link rel="stylesheet" href="/assets/prerender-styles.css" />\n  </head>'
        );
      }
    }

    // ── Strip Framer Motion's initial inline styles ──
    // Prerender captures the pre-animation state (opacity:0, transform:translateY/X/scale)
    // which SEO scanners flag as "hidden text" (Google Spam Policy #5). After hydration
    // these animate normally on the client, so removing the inline style is safe.
    html = html.replace(/\s*style="([^"]*)"/gi, (match, styleStr) => {
      // Remove opacity:0 / visibility:hidden / font-size:0 / text-indent:-9999 / transform:* declarations
      const cleaned = styleStr
        .split(";")
        .map((d) => d.trim())
        .filter((d) => {
          if (!d) return false;
          const lower = d.toLowerCase().replace(/\s+/g, "");
          if (/^opacity:0(\.0+)?$/.test(lower)) return false;
          if (/^visibility:hidden$/.test(lower)) return false;
          if (/^font-size:0(px|em|rem)?$/.test(lower)) return false;
          if (/^text-indent:-?\d{4,}/.test(lower)) return false;
          if (/^transform:translate/.test(lower)) return false;
          return true;
        })
        .join("; ");
      return cleaned ? ` style="${cleaned}"` : "";
    });


    // ── Detailed SEO element audit for each route ──
    const h1Matches = html.match(/<h1[\s>]/gi) || [];
    const h2Matches = html.match(/<h2[\s>]/gi) || [];
    const hasMetaDesc = /<meta[^>]+name=["']description["'][^>]+content=["'][^"']+["']/i.test(html);
    const hasJsonLd = /<script[^>]+type=["']application\/ld\+json["']/i.test(html);
    const hasHreflang = /<link[^>]+hreflang=/i.test(html);
    const hasModifiedTime = /article:modified_time/i.test(html);
    const imgTags = html.match(/<img[^>]*>/gi) || [];
    const imgsWithLazy = imgTags.filter(t => /loading=["']lazy["']/i.test(t)).length;
    const imgsWithoutLazy = imgTags.filter(t => !/loading=["']lazy["']/i.test(t) && !/fetchpriority=["']high["']/i.test(t));

    console.log(`  📄 ${route}:`);
    console.log(`     H1: ${h1Matches.length} tag(s) ${h1Matches.length === 1 ? '✅' : '⚠️'}  |  H2: ${h2Matches.length} tag(s)`);
    console.log(`     Meta desc: ${hasMetaDesc ? '✅' : '❌'}  |  JSON-LD: ${hasJsonLd ? '✅' : '❌'}  |  Hreflang: ${hasHreflang ? '✅' : '❌'}  |  Modified time: ${hasModifiedTime ? '✅' : '❌'}`);
    console.log(`     Images: ${imgTags.length} total, ${imgsWithLazy} lazy, ${imgTags.length - imgsWithLazy} eager/none`);
    if (imgsWithoutLazy.length > 0) {
      console.log(`     ⚠️  Non-lazy non-hero images:`);
      imgsWithoutLazy.forEach(t => {
        const srcMatch = t.match(/src=["']([^"']+)["']/);
        console.log(`        - ${srcMatch ? srcMatch[1].substring(0, 80) : '(no src)'}`);
      });
    }

    // Extract first H1 content for verification
    if (h1Matches.length > 0) {
      const h1Content = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
      if (h1Content) {
        const text = h1Content[1].replace(/<[^>]+>/g, '').trim().substring(0, 80);
        console.log(`     H1 content: "${text}"`);
      }
    }

    // Ensure doctype
    if (!html.startsWith("<!")) {
      html = `<!DOCTYPE html>\n${html}`;
    }

    // Determine output path
    const outputPath =
      route === "/"
        ? join(DIST_DIR, "index.html")
        : join(DIST_DIR, route, "index.html");

    // Create directory if needed
    const outputDir = dirname(outputPath);
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }

    writeFileSync(outputPath, html, "utf-8");
    console.log(`     ✅ Saved → ${outputPath.replace(DIST_DIR, "dist")}`);
    console.log('');
  } catch (err) {
    console.error(`  ❌ ${route} — ${err.message}`);
  } finally {
    await page.close();
  }
}

async function main() {
  console.log("\n🚀 Starting prerender process...\n");

  // Check dist exists
  if (!existsSync(DIST_DIR)) {
    console.error("❌ dist/ folder not found. Run 'npm run build' first.");
    process.exit(1);
  }

  const routes = generateAllRoutes();
  console.log(`📝 ${routes.length} routes to prerender\n`);

  // Start local server
  const server = await startServer();

  // Launch browser.
  // The backgrounding/throttling flags are REQUIRED: without them Chrome pauses
  // requestAnimationFrame in non-foreground pages, and react-helmet-async never
  // writes <title>, canonical, hreflang or JSON-LD into the saved HTML.
  const browser = await launch({
    headless: "new",
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-gpu",
      "--disable-background-timer-throttling",
      "--disable-backgrounding-occluded-windows",
      "--disable-renderer-backgrounding",
      "--disable-features=CalculateNativeWinOcclusion",
      "--window-size=1280,1024",
    ],
  });

  // Process routes in small batches (smaller = less rAF contention per page)
  const BATCH_SIZE = 3;
  for (let i = 0; i < routes.length; i += BATCH_SIZE) {
    const batch = routes.slice(i, i + BATCH_SIZE);
    await Promise.all(batch.map((route) => prerenderRoute(browser, route)));
  }

  await browser.close();
  server.close();

  console.log(`\n✨ Prerendering complete! ${routes.length} static HTML files generated.`);

  // ── Post-build verification ──
  console.log("\n🔍 Verifying prerendered HTML quality...\n");
  let passCount = 0;
  let failCount = 0;
  const checks = [
    { label: "Has <h1>", regex: /<h1[\s>]/i },
    { label: "Has meta description", regex: /<meta[^>]+name=["']description["'][^>]+content=["'][^"']+["']/i },
    { label: "Has JSON-LD", regex: /<script[^>]+type=["']application\/ld\+json["']/i },
    { label: "Has hreflang", regex: /<link[^>]+hreflang=/i },
    { label: "Has <img alt=", regex: /<img[^>]+alt=["'][^"']+["']/i },
    { label: "Head flushed", regex: /data-rh=/i },
    { label: "dateModified", regex: /dateModified/i },
  ];

  // Sample the head-flush check across every generated file so a regression
  // (head saved without Helmet tags) can never ship silently again.
  let headMissing = 0;
  for (const route of routes) {
    const fp = route === "/" ? join(DIST_DIR, "index.html") : join(DIST_DIR, route, "index.html");
    if (!existsSync(fp)) continue;
    if (!/data-rh=/i.test(readFileSync(fp, "utf-8"))) {
      headMissing++;
      console.log(`  ❌ head tags missing → ${route}`);
    }
  }
  console.log(`\n  Head-tag flush: ${routes.length - headMissing}/${routes.length} files OK\n`);

  for (const route of CORE_ROUTES.slice(0, 5)) {
    const filePath = route === "/"
      ? join(DIST_DIR, "index.html")
      : join(DIST_DIR, route, "index.html");
    if (!existsSync(filePath)) {
      console.log(`  ⚠️  ${route} — file missing`);
      failCount++;
      continue;
    }
    const html = readFileSync(filePath, "utf-8");
    const results = checks.map((c) => c.regex.test(html) ? "✅" : "❌");
    const allPass = results.every((r) => r === "✅");
    if (allPass) passCount++; else failCount++;
    console.log(`  ${allPass ? "✅" : "⚠️"} ${route}  ${checks.map((c, i) => `${results[i]} ${c.label}`).join("  ")}`);
  }

  console.log(`\n📊 Verification: ${passCount} passed, ${failCount} need review`);
  console.log("📁 Upload the dist/ folder to your hosting provider.\n");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
