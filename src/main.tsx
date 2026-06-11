import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";
import "./i18n/config";

// Production hardening:
// If a new deploy happens, users may have an older cached HTML/JS referencing chunk files that no longer exist.
// This manifests as ChunkLoadError / failed dynamic import and can look like a white screen or endless loader.
// We auto-reload once per session to recover.
const shouldRecoverFromChunkError = (err: unknown) => {
  const message =
    err instanceof Error
      ? err.message
      : typeof err === "string"
        ? err
        : JSON.stringify(err);

  return /ChunkLoadError|Loading chunk|Failed to fetch dynamically imported module|Importing a module script failed/i.test(
    message
  );
};

const tryOneTimeReload = () => {
  const key = "__ninescape_chunk_reload_attempted";
  try {
    if (sessionStorage.getItem(key) === "1") return;
    sessionStorage.setItem(key, "1");
  } catch {
    // ignore
  }
  window.location.reload();
};

// Vite emits this event when preloaded chunks fail to load.
window.addEventListener("vite:preloadError", (event) => {
  event.preventDefault();
  tryOneTimeReload();
});

window.addEventListener("unhandledrejection", (event) => {
  if (shouldRecoverFromChunkError(event.reason)) {
    tryOneTimeReload();
  }
});

window.addEventListener("error", (event) => {
  const possibleError = (event as ErrorEvent).error ?? event.message;
  if (shouldRecoverFromChunkError(possibleError)) {
    tryOneTimeReload();
  }
});

const renderApp = () => {
  const root = document.getElementById("root");
  if (!root) return;

  const app = (
    <React.StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </React.StrictMode>
  );

  const hasPrerenderedApp = root.querySelector("main, header, footer, [data-reactroot]");

  if (hasPrerenderedApp) {
    try {
      hydrateRoot(root, app);
      return;
    } catch (error) {
      console.error("Hydration failed, falling back to client render:", error);
    }
  }

  createRoot(root).render(app);
};

const allSettledCompat = <T,>(promises: Promise<T>[]) =>
  Promise.all(
    promises.map((promise) =>
      Promise.resolve(promise).then(
        (value) => ({ status: "fulfilled" as const, value }),
        (reason) => ({ status: "rejected" as const, reason })
      )
    )
  );

// Retire old PWA/app-shell caches after the page is already rendered. This must
// not block React mounting, otherwise a slow/buggy browser cache API can leave
// users staring at an empty #root.
const retireStaleAppShell = async () => {
  if (!import.meta.env.PROD || window.self !== window.top) {
    return false;
  }

  let cleaned = false;

  if ("serviceWorker" in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations();
    if (registrations.length > 0) cleaned = true;
    await allSettledCompat(registrations.map((reg) => reg.unregister()));
  }

  if ("caches" in window) {
    const names = await caches.keys();
    const appCaches = names.filter((name) => /workbox|precache|runtime|ninescape|vite-pwa|offline/i.test(name));
    if (appCaches.length > 0) cleaned = true;
    await allSettledCompat(appCaches.map((name) => caches.delete(name)));
  }

  return cleaned;
};

const withTimeout = <T,>(promise: Promise<T>, fallback: T, timeoutMs = 2500) =>
  Promise.race([
    promise,
    new Promise<T>((resolve) => window.setTimeout(() => resolve(fallback), timeoutMs)),
  ]);

renderApp();

window.setTimeout(() => {
  withTimeout(retireStaleAppShell(), false, 4000).then((cleaned) => {
    const reloadKey = "__ninescape_stale_shell_cleaned";
    if (cleaned) {
      try {
        if (sessionStorage.getItem(reloadKey) !== "1") {
          sessionStorage.setItem(reloadKey, "1");
          window.location.replace(window.location.href);
          return;
        }
      } catch {
        window.location.replace(window.location.href);
      }
    }
  }).catch(() => undefined);
}, 1000);
