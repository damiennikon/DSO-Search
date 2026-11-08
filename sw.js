const BUILD = '3';
const CACHE_PREFIX = 'dso-search-';
const CACHE_NAME = CACHE_PREFIX + BUILD;
const SCOPE = self.registration.scope;
const INDEX_URL = new URL('./index.html', SCOPE).href;
const VERSIONED_INDEX = INDEX_URL + '?v=' + BUILD;
const ASSETS = [
    'styles.css', 'catalog-positions.js', 'database.js', 'astronomy.js',
    'sensors.js', 'ar-view.js', 'app.js'
].map((name) => './assets/' + name + '?v=' + BUILD).concat([
    './manifest.json', './Galaxy.png', './Nebula.png', './Cluster.png',
    './icon-192.png', './icon-512.png'
]).map((path) => new URL(path, SCOPE).href);
const ASSET_URLS = new Set(ASSETS);

self.addEventListener('install', (event) => {
    event.waitUntil((async () => {
        const page = await fetch(VERSIONED_INDEX, { cache: 'reload' });
        if (!page.ok || !(await page.clone().text()).includes('<meta name="dso-build" content="' + BUILD + '">')) {
            throw new Error('Published HTML does not match the offline build.');
        }
        const cache = await caches.open(CACHE_NAME);
        await cache.addAll(ASSETS.map((url) => new Request(url, { cache: 'reload' })));
        await cache.put(INDEX_URL, page);
        await self.skipWaiting();
    })());
});

self.addEventListener('activate', (event) => {
    event.waitUntil((async () => {
        const names = await caches.keys();
        await Promise.all(names.filter((name) => name !== CACHE_NAME &&
            (name.startsWith(CACHE_PREFIX) || name === 'dso-tracker-rebuild-v1'))
            .map((name) => caches.delete(name)));
        await self.clients.claim();
    })());
});

async function navigate(request) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);
    try {
        const response = await fetch(request, { cache: 'no-cache', signal: controller.signal });
        if (response.ok) {
            const html = await response.clone().text();
            const deployedBuild = html.match(/<meta name="dso-build" content="(\d+)">/)?.[1];
            if (Number(deployedBuild) >= Number(BUILD)) return response;
        }
    } catch {
        // The complete current build is available offline after installation.
    } finally {
        clearTimeout(timeout);
    }
    const cache = await caches.open(CACHE_NAME);
    return (await cache.match(INDEX_URL)) || Response.error();
}

self.addEventListener('fetch', (event) => {
    const request = event.request;
    if (request.method !== 'GET') return;
    const url = new URL(request.url);
    const path = url.origin + url.pathname;
    if (request.mode === 'navigate' && (path === SCOPE || path === INDEX_URL)) {
        event.respondWith(navigate(request));
    } else if (ASSET_URLS.has(request.url)) {
        event.respondWith(caches.open(CACHE_NAME).then(async (cache) => {
            return (await cache.match(request)) || fetch(request);
        }));
    }
});
