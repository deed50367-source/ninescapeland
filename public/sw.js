// Retired service worker.
// Previous Workbox/PWA caching could keep stale HTML/JS after deploys and leave
// returning visitors with a blank page. This worker immediately removes itself
// and clears old caches so the site is always loaded from the network.

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.keys().then((names) => Promise.all(names.map((name) => caches.delete(name))))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) => Promise.all(names.map((name) => caches.delete(name))))
      .then(() => self.registration.unregister())
      .then(() => self.clients.matchAll({ type: "window", includeUncontrolled: true }))
      .then((clients) => Promise.all(clients.map((client) => client.navigate(client.url))))
  );
});

self.addEventListener("fetch", () => {
  // No fetch handler: once activated/unregistered, network handles everything.
});