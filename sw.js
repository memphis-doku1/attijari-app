const CACHE_NAME = 'attijari-pro-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './attijari.png'
];

// Installation du Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache ouvert');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activation et nettoyage des anciens caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Ancien cache supprimé');
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interception des requêtes (Mode hors ligne)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retourne la version en cache si disponible, sinon fait la requête réseau
        return response || fetch(event.request);
      })
  );
});
