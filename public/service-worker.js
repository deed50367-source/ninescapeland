// Emergency retired service worker.
// Kept for old PWA builds that registered this filename. It clears every Cache
// Storage entry for this origin, reloads open tabs from the network, then
// unregisters itself so it cannot keep serving a stale blank app shell.

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
        await allSettledCompat(cacheNames.map((name) => caches.delete(name)));
        await self.clients.claim();
        const windowClients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
        await allSettledCompat(windowClients.map((client) => client.navigate(client.url)));
      } finally {
        await self.registration.unregister();
      }
    })(),
  ),
);