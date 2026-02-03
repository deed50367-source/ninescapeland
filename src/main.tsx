import React from "react";
import { createRoot } from "react-dom/client";
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

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
