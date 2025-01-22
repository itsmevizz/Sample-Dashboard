// public/service-worker.js
self.addEventListener("install", (event: any) => {
  event.waitUntil(
    caches
      .open("v1")
      .then((cache) => cache.addAll(["/", "/login", "/signup", "/dashboard"]))
  );
});

self.addEventListener("fetch", (event: any) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((cacheResponse) => cacheResponse || fetch(event.request))
  );
});
