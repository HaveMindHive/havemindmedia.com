// SoulScience Chat - Service Worker
const CACHE_NAME = 'soulscience-v1';
const ASSETS = [
    '/apps/soulscience-chat/index.html',
    '/apps/soulscience-chat/manifest.json',
    'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Cormorant+Garamond:wght@400;500;600&display=swap'
];

// Install event - cache assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
    self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter((key) => key !== CACHE_NAME)
                    .map((key) => caches.delete(key))
            );
        })
    );
    self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cached) => {
            return cached || fetch(event.request).then((response) => {
                // Cache successful responses
                if (response.ok && event.request.method === 'GET') {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, clone);
                    });
                }
                return response;
            });
        }).catch(() => {
            // Offline fallback
            if (event.request.mode === 'navigate') {
                return caches.match('/apps/soulscience-chat/index.html');
            }
        })
    );
});
