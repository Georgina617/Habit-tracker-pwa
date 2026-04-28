const CACHE_NAME = 'habit-tracker-v1';

const urlsToCache = [
  '/',
  '/dashboard',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
];

// 🔹 Install → cache files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    }),
  );
});

// 🔹 Activate → clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        }),
      ),
    ),
  );
});

// 🔹 Fetch → serve cached or fallback to network
self.addEventListener('fetch', (event) => {
  // ❌ Ignore Next.js dev files
  if (event.request.url.includes('/_next/')) return;

  // ✅ Handle navigation (pages like /dashboard)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // cache latest page
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, copy);
          });
          return response;
        })
        .catch(async () => {
          // fallback to cached page
          const cached = await caches.match(event.request);
          return cached || caches.match('/');
        }),
    );
    return;
  }

  // ✅ Static assets (images, etc.)
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return (
        cached ||
        fetch(event.request).catch(() => new Response('', { status: 503 }))
      );
    }),
  );
});
