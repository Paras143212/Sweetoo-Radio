const CACHE_NAME = 'sweetoo-radio-v6'; // Updated to v6 to force a cache refresh
const urlsToCache = [
  './index.html',
  './App image.png'
];

// 1. Install Service Worker and Cache Files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting(); // Force the new update to apply immediately
});

// 2. Activate Service Worker and Delete Old Caches (e.g., v1)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Deleting old cache version:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// 3. Fetch Data (Serve from Cache if available, otherwise use Network)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached response if found, otherwise fetch from the internet
        return response || fetch(event.request);
      })
  );
});
