const CACHE_NAME = 'attijari-pro-cache-v2'; // Changé de v1 à v2
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './attijari.png'
];

self.addEventListener('install', event => {
  self.skipWaiting(); // Force l'installation immédiate
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
