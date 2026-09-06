const CACHE_NAME = 'sweetoo-radio-v1';
const urlsToCache = [
  './index.html',
  './App image.png'
];

// Install Service Worker aur files ko cache (save) karein
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Jab bhi app open ho, cache se fast load karein
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Agar file cache mein hai toh wahan se dein, warna internet se layein
        return response || fetch(event.request);
      })
  );
});