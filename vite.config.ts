import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
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
            // Match only the real React packages. A loose `/react/` match also
            // catches packages like `@tiptap/react`, which creates a circular
            // dependency between vendor/deps chunks and crashes the live page.
            if (/node_modules\/(react|react-dom|react-router|react-router-dom|scheduler)\//.test(id)) {
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

          // ---- src/: keep business code in one chunk ----
          // This avoids circular lazy chunks such as components -> shared -> components
          // and keeps Hostinger from rate-limiting many parallel route requests.
          if (id.includes("/src/")) {
            return "app";
          }
          return undefined;
        },
      },
    },

    // Optimize chunk size
    chunkSizeWarningLimit: 1500,
    // Enable source maps for production debugging
    sourcemap: false,
    // Minification
    minify: "esbuild",
    target: ["es2015", "safari12"],
    // CSS code splitting
    cssCodeSplit: true,
  },
}));
