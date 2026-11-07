const CACHE_NAME = 'dso-tracker-v34';

// List of all files the app needs to work offline
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './database.js',
    './app.js',
    './manifest.json',
    './styles.css',
    './Galaxy.png',
    './Nebula.png',
    './Cluster.png'
];

// 1. INSTALL EVENT: Cache all the files
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[Service Worker] Caching all assets');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    // Force the waiting service worker to become the active service worker
    self.skipWaiting();
});

// 2. ACTIVATE EVENT: Clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    // If the cache name doesn't match our current version, delete it
                    if (cacheName !== CACHE_NAME) {
                        console.log('[Service Worker] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    // Take control of all pages immediately without requiring a reload
    self.clients.claim();
});

// 3. FETCH EVENT: Serve from cache if available, otherwise use the network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) return cachedResponse;
            return fetch(event.request).catch(() => Response.error());
        })
    );
});
