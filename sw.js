const CACHE_NAME = 'dso-tracker-v1';

// This is the list of files the phone will download to work offline
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/manifest.json',
    '/Galaxy.png',
    '/Nebula.png',
    '/Cluster.png',
    '/icon-192.png',
    '/icon-512.png'
];

// Install Event - Caches the files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
});

// Fetch Event - Serves the files from cache if offline
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});