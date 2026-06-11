import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "favicon.png", "logo.png"],
      manifest: {
        name: "NinescapeLand - Indoor Playground Equipment",
        short_name: "NinescapeLand",
        description: "Leading commercial indoor playground equipment manufacturer. Custom trampoline parks, ninja courses, soft play areas.",
        theme_color: "#FF6B35",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait-primary",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/pwa-maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        categories: ["business", "shopping"],
        lang: "en",
        dir: "ltr" as const,
      },
      workbox: {
        // Cache strategies
        runtimeCaching: [
          {
            // Cache page navigations
            urlPattern: ({ request }) => request.mode === "navigate",
            handler: "NetworkFirst",
            options: {
              cacheName: "pages-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 24 * 60 * 60, // 24 hours
              },
              networkTimeoutSeconds: 3,
            },
          },
          {
            // Cache images
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|avif)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "images-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
            },
          },
          {
            // Cache Google Fonts stylesheets
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-stylesheets",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
              },
            },
          },
          {
            // Cache Google Fonts webfonts
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-webfonts",
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
              },
            },
          },
          {
            // Cache Supabase API responses
            urlPattern: /^https:\/\/.*\.supabase\.co\/rest\/v1\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 5 * 60, // 5 minutes
              },
              networkTimeoutSeconds: 5,
            },
          },
          {
            // Cache Supabase storage assets
            urlPattern: /^https:\/\/.*\.supabase\.co\/storage\/v1\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "storage-cache",
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
              },
            },
          },
          {
            // Cache JS and CSS
            urlPattern: /\.(?:js|css)$/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "static-resources",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 24 * 60 * 60, // 24 hours
              },
            },
          },
        ],
        // Avoid preloading/caching every route chunk at once on constrained shared hosting.
        globPatterns: ["index.html", "assets/index-*.css", "favicon.ico", "favicon.png", "logo.png"],
        // Skip waiting and claim clients immediately
        skipWaiting: true,
        clientsClaim: true,
        // Clean old caches
        cleanupOutdatedCaches: true,
      },
      devOptions: {
        enabled: false, // Disable in development
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),

      // Pin React to a single instance to prevent invalid hook call / dispatcher issues
      react: path.resolve(__dirname, "./node_modules/react"),
      "react-dom": path.resolve(__dirname, "./node_modules/react-dom"),
      "react-dom/client": path.resolve(
        __dirname,
        "./node_modules/react-dom/client"
      ),
      "react-dom/server": path.resolve(
        __dirname,
        "./node_modules/react-dom/server"
      ),
      "react/jsx-runtime": path.resolve(__dirname, "./node_modules/react/jsx-runtime"),
      "react/jsx-dev-runtime": path.resolve(
        __dirname,
        "./node_modules/react/jsx-dev-runtime"
      ),
    },
    dedupe: [
      "react",
      "react-dom",
      "react-dom/client",
      "react-dom/server",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "react-i18next",
      "i18next",
    ],
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-dom/client",
      "react-dom/server",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "i18next",
      "react-i18next",
      "i18next-browser-languagedetector",
      "i18next-http-backend",
    ],
  },
  build: {
    modulePreload: {
      polyfill: false,
      resolveDependencies: () => [],
    },
    // Enable code splitting
    rollupOptions: {
      output: {
        // IMPORTANT: Hostinger shared hosting rate-limits parallel requests
        // (returns HTTP 429 when too many JS chunks load at once). We
        // deliberately consolidate chunks here to keep the request count low.
        manualChunks(id) {
          if (!id.includes("node_modules") && !id.includes("/src/")) {
            return undefined;
          }

          // ---- node_modules: split a few stable vendor chunks ----
          if (id.includes("node_modules")) {
            if (
              id.includes("/react/") ||
              id.includes("/react-dom/") ||
              id.includes("/react-router") ||
              id.includes("/scheduler/")
            ) {
              return "vendor";
            }
            if (id.includes("@radix-ui") || id.includes("lucide-react") || id.includes("cmdk") || id.includes("vaul")) {
              return "ui";
            }
            if (id.includes("framer-motion")) return "motion";
            if (id.includes("@supabase")) return "supabase";
            if (id.includes("i18next") || id.includes("react-i18next")) return "i18n";
            if (id.includes("@tanstack")) return "query";
            if (id.includes("@tiptap") || id.includes("prosemirror")) return "editor";
            if (id.includes("recharts") || id.includes("d3-")) return "charts";
            if (id.includes("exceljs")) return "exceljs";
            if (id.includes("react-helmet")) return "helmet";
            return "deps";
          }

          // ---- src/: collapse lazy route/component chunks into a handful ----
          if (id.includes("/src/pages/admin/") || id.includes("/src/components/admin/")) {
            return "admin";
          }
          if (id.includes("/src/pages/")) {
            return "pages";
          }
          if (id.includes("/src/components/")) {
            return "components";
          }
          if (id.includes("/src/hooks/") || id.includes("/src/lib/") || id.includes("/src/utils/")) {
            return "shared";
          }
          return undefined;
        },
        // Use content hash for better caching
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
    },

    // Optimize chunk size
    chunkSizeWarningLimit: 500,
    // Enable source maps for production debugging
    sourcemap: false,
    // Minification
    minify: "esbuild",
    target: ["es2015", "safari12"],
    // CSS code splitting
    cssCodeSplit: true,
  },
}));
