const CACHE_NAME = 'sweetoo-radio-v2'; // Yahan humne v1 ko v2 kar diya hai
const urlsToCache = [
  './index.html',
  './App image.png'
];

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting(); // Naye update ko turant force apply karein
});

// Purane Cache (v1) ko delete karein
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Purana cache delete ho raha hai...');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch Data
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
