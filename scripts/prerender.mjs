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
const PORT = 4173;
const BASE_URL = `http://localhost:${PORT}`;

// All core routes to prerender
const CORE_ROUTES = [
  "/",
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
  "/indoor-playground-roi-analysis-uk",
  "/indoor-playground-roi-canada",
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
];

const LANGUAGES = ["es", "pt", "de", "fr", "ar"];

// Generate all routes (English + other languages)
function generateAllRoutes() {
  const routes = [...CORE_ROUTES];
  for (const lang of LANGUAGES) {
    for (const route of CORE_ROUTES) {
      routes.push(route === "/" ? `/${lang}` : `/${lang}${route}`);
    }
  }
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

    // Get the full rendered HTML
    let html = await page.content();

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
    console.log(`  ✅ ${route} → ${outputPath.replace(DIST_DIR, "dist")}`);
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

  // Launch browser
  const browser = await launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  });

  // Process routes in batches of 5 for speed
  const BATCH_SIZE = 5;
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
  ];

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
