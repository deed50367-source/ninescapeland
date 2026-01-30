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
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
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
    ],
  },
  build: {
    // Enable code splitting
    rollupOptions: {
      output: {
        // Manual chunks for better caching
        manualChunks: {
          // Vendor chunk - core libraries that rarely change
          vendor: ["react", "react-dom", "react-router-dom"],
          // UI components - shadcn/radix components
          ui: [
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-tabs",
            "@radix-ui/react-accordion",
            "@radix-ui/react-select",
            "@radix-ui/react-tooltip",
            "@radix-ui/react-popover",
          ],
          // Query and state management
          query: ["@tanstack/react-query"],
          // Animation library
          motion: ["framer-motion"],
          // i18n
          i18n: ["i18next", "react-i18next", "i18next-browser-languagedetector"],
          // Supabase
          supabase: ["@supabase/supabase-js"],
          // Rich text editor
          editor: [
            "@tiptap/react",
            "@tiptap/starter-kit",
            "@tiptap/extension-link",
            "@tiptap/extension-image",
          ],
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
    target: "es2020",
    // CSS code splitting
    cssCodeSplit: true,
  },
}));
