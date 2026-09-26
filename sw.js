/* ═══════════════════════════════════════════════════════════════
   SIMARSIP Service Worker — Akademi Akupunktur Surabaya
   Cache version: v20260927_pwa_v1
   ═══════════════════════════════════════════════════════════════ */
const CACHE_NAME = 'simarsip-aas-v1';
const STATIC_ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './logo.jpg',
  './manifest.json',
  './verify.html'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS).catch(err => {
        console.warn('PWA Cache pre-fetch partial warning:', err);
      });
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  // Hanya tangani request GET protokol http/https
  if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) return;

  // Lewati request ke Firestore & Google Apps Script agar data selalu live realtime
  const url = new URL(event.request.url);
  if (url.hostname.includes('firestore') || url.hostname.includes('googleapis') || url.hostname.includes('google.com')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(networkResponse => {
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request).then(cachedResponse => {
          if (cachedResponse) return cachedResponse;
          if (event.request.headers.get('accept')?.includes('text/html')) {
            return caches.match('./index.html');
          }
        });
      })
  );
});
