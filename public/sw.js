// Retired app-shell service worker.
// Old Workbox/PWA caches can keep repeat visitors on a stale blank page. This
// replacement worker activates once, clears only app-shell caches, reloads open
// tabs from the network, then unregisters itself even if cleanup partially fails.
function isAppShellCache(name) {
  const isWorkboxCache = /(^|-)precache-v\d+-|(^|-)runtime-|(^|-)googleAnalytics-/.test(name);
  const isNinescapeCache = /ninescape|vite-pwa|workbox|offline/i.test(name);
  return isWorkboxCache || isNinescapeCache;
}

function allSettledCompat(promises) {
  return Promise.all(promises.map(function (promise) {
    return Promise.resolve(promise).then(
      function (value) { return { status: "fulfilled", value: value }; },
      function (reason) { return { status: "rejected", reason: reason }; }
    );
  }));
}

self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) =>
  event.waitUntil(
    (async () => {
      try {
        const cacheNames = await caches.keys();
        const appCaches = cacheNames.filter(isAppShellCache);
        await allSettledCompat(appCaches.map((name) => caches.delete(name)));
        await self.clients.claim();
        const windowClients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
        await allSettledCompat(windowClients.map((client) => client.navigate(client.url)));
      } finally {
        await self.registration.unregister();
      }
    })(),
  ),
);