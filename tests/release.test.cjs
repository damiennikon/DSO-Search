const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const read = (file) => fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
const run = (context, file) => vm.runInContext(read(file), context, { filename: file });

function sensorContext() {
    const listeners = new Map();
    const timers = new Map();
    let nextTimer = 0;
    let now = 0;
    const context = vm.createContext({
        window: {
            addEventListener: (name, callback) => listeners.set(name, callback),
            removeEventListener: (name) => listeners.delete(name)
        },
        localStorage: { getItem: () => null, setItem() {} },
        setTimeout: (callback) => {
            const id = ++nextTimer;
            timers.set(id, callback);
            return id;
        },
        clearTimeout: (id) => timers.delete(id),
        Date: class extends Date { static now() { return now; } }
    });
    run(context, 'assets/astronomy.js');
    context.DSOAstronomy = context.window.DSOAstronomy;
    run(context, 'assets/sensors.js');
    run(context, 'assets/ar-view.js');
    return { context, listeners, timers, advance: (ms) => { now += ms; } };
}

test('catalog keeps Orion, corrected clusters and unverified entries distinct', () => {
    const { context } = sensorContext();
    run(context, 'assets/catalog-positions.js');
    run(context, 'assets/database.js');
    const targets = vm.runInContext('dsoDatabase', context);
    const byId = new Map(targets.map((target) => [target.id, target]));
    assert.equal(targets.length, 325);
    assert.equal(byId.size, targets.length);
    assert.ok(byId.get('M 42').aliases.includes('Orion'));
    assert.ok(Math.abs(byId.get('M 42').ra - 83.819) < 0.01);
    assert.ok(Math.abs(byId.get('Collinder 228').ra - 161.01) < 0.01);
    assert.ok(Math.abs(byId.get('Collinder 335').dec + 32.573) < 0.01);
    assert.equal(byId.get('IC 2606').positionUnverified, true);
    assert.equal(byId.get('IC 2606').ra, null);
    assert.equal(targets.filter((target) => target.positionUnverified).length, 21);
    for (const { ra, dec, positionUnverified } of targets) {
        if (positionUnverified) continue;
        assert.ok(Number.isFinite(ra) && ra >= 0 && ra < 360);
        assert.ok(Number.isFinite(dec) && Math.abs(dec) <= 90);
    }
});

test('catalog precession is zero at J2000 and shifts the mean equinox of date', () => {
    const { context } = sensorContext();
    const a = context.DSOAstronomy;
    const epoch = vm.runInContext('new Date("2000-01-01T12:00:00Z")', context);
    const later = vm.runInContext('new Date("2050-01-01T12:00:00Z")', context);
    assert.deepEqual(a.calculateCatalogAltAz(0, 0, -27.47, 153.03, epoch),
        a.calculateAltAz(0, 0, -27.47, 153.03, epoch));
    const actual = a.calculateCatalogAltAz(0, 0, -27.47, 153.03, later);
    const expected = a.calculateAltAz(0.6407, 0.2783, -27.47, 153.03, later);
    assert.ok(a.angularSeparation(actual.azimuth, actual.altitude, expected.azimuth, expected.altitude) < 0.001);
});

test('missing orientation cannot emit pointing and valid readings expire', () => {
    const { context, listeners, timers } = sensorContext();
    const sensor = new context.window.DSOSensorController();
    const missing = { alpha: 0, beta: null, gamma: null, absolute: true, webkitCompassHeading: null };
    assert.equal(sensor.getPointing(missing), null);
    assert.equal(sensor.getPointing({ alpha: 0, beta: 70, gamma: 0, webkitCompassHeading: 0, webkitCompassAccuracy: -1 }), null);
    let pointing;
    let status;
    sensor.start((value) => { pointing = value; }, (message) => { status = message; });
    listeners.get('deviceorientationabsolute')({ alpha: 0, beta: 110, gamma: 0, absolute: true });
    assert.ok(Math.abs(pointing.altitude - 20) < 1e-8);
    assert.equal(pointing.azimuth, 0);
    timers.values().next().value();
    assert.match(status, /Compass unavailable/);
    sensor.stop();
    assert.equal(listeners.size, 0);
});

test('Safari yaw reference uses the top edge and survives an upright pose', () => {
    const { context } = sensorContext();
    const sensor = new context.window.DSOSensorController();
    const event = { alpha: 0, beta: 65, gamma: 0, webkitCompassHeading: 90, webkitCompassAccuracy: 5 };
    assert.equal(sensor.getPointing(event).azimuth, 90);
    const upright = sensor.getPointing({ ...event, beta: 89, webkitCompassHeading: 220 });
    assert.equal(upright.azimuth, 90);
    assert.ok(Math.abs(upright.altitude + 1) < 1e-8);
    sensor.stop();
    assert.equal(sensor.getPointing({ ...event, beta: 89 }), null);
});

test('calibration requires multi-axis movement across samples', () => {
    const { context, listeners, advance } = sensorContext();
    const sensor = new context.window.DSOSensorController();
    sensor.start(() => {}, () => {});
    const event = listeners.get('deviceorientation');
    sensor.startCalibration();
    for (let i = 0; i < 15; i++) event({ alpha: 180, beta: 90, gamma: 0, absolute: true });
    advance(8000);
    assert.equal(sensor.finishCalibration(), false);
    sensor.startCalibration();
    for (let i = 0; i <= 20; i++) {
        const phase = Math.PI * i / 10;
        event({ alpha: 20 * Math.sin(phase), beta: 90 + 20 * Math.sin(2 * phase), gamma: 0, absolute: true });
    }
    advance(8000);
    assert.equal(sensor.finishCalibration(), true);
});

test('AR uses true separation, screen rotation and an arrow for a target behind the camera', () => {
    const { context } = sensorContext();
    const sensor = new context.window.DSOSensorController();
    const nodes = new Map();
    const root = { clientWidth: 390, clientHeight: 780, style: {}, querySelector(id) {
        if (!nodes.has(id)) nodes.set(id, { style: {}, classList: { toggle() {}, remove() {} } });
        return nodes.get(id);
    } };
    const view = new context.window.DSOSkyARView(root);
    const pose = { alpha: 0, beta: 170, gamma: 0, absolute: true };
    const target = { azimuth: 60, altitude: 80 };
    view.show();
    assert.equal(nodes.get('#targetDot').hidden, true);
    view.update(target, sensor.getPointing(pose));
    assert.equal(nodes.get('#targetDot').hidden, false);
    assert.equal(nodes.get('#directionArrow').hidden, true);
    assert.match(nodes.get('#arReadout').textContent, /10\.0°/);
    assert.ok(parseFloat(nodes.get('#targetDot').style.left) > 195);
    context.window.screen = { orientation: { angle: 90 } };
    view.update(target, sensor.getPointing(pose));
    assert.ok(parseFloat(nodes.get('#targetDot').style.top) < 390);
    view.update({ azimuth: 180, altitude: -80 }, sensor.getPointing(pose));
    assert.equal(nodes.get('#targetDot').hidden, true);
    assert.equal(nodes.get('#directionArrow').hidden, false);
    view.waiting('Waiting for compass');
    assert.equal(nodes.get('#directionArrow').hidden, true);
});

test('worker precaches the exact HTML assets and serves online or offline builds', async () => {
    const scope = 'https://example.test/DSO-Search/';
    const html = read('index.html');
    const handlers = new Map();
    const cached = new Map();
    const deleted = [];
    let online = true;
    let deployedHtml = html;
    let precached;
    const cache = {
        addAll: async (requests) => { precached = requests.map((request) => request.url); },
        put: async (url, response) => cached.set(url, response),
        match: async (url) => cached.get(url)
    };
    const context = vm.createContext({
        URL, Request, Response, AbortController, setTimeout, clearTimeout,
        self: {
            registration: { scope },
            addEventListener: (name, callback) => handlers.set(name, callback),
            skipWaiting() {},
            clients: { claim() {} }
        },
        caches: {
            open: async () => cache,
            keys: async () => ['dso-search-2', 'dso-search-3', 'dso-tracker-rebuild-v1', 'other-app'],
            delete: async (name) => deleted.push(name)
        },
        fetch: async () => {
            if (!online) throw new Error('offline');
            return new Response(deployedHtml);
        }
    });
    run(context, 'sw.js');
    const lifecycle = (name) => {
        let promise;
        handlers.get(name)({ waitUntil: (value) => { promise = value; } });
        return promise;
    };
    const navigate = () => {
        let promise;
        handlers.get('fetch')({
            request: { method: 'GET', mode: 'navigate', url: scope + '?fresh=1' },
            respondWith: (value) => { promise = value; }
        });
        return promise;
    };
    await lifecycle('install');
    await lifecycle('activate');
    assert.deepEqual(deleted, ['dso-search-2', 'dso-tracker-rebuild-v1']);
    const assets = [...html.matchAll(/(?:src|href)="(\.\/assets\/[^"]+)"/g)].map((match) => new URL(match[1], scope).href);
    assert.equal(assets.length, 7);
    for (const url of assets) assert.ok(precached.includes(url), url);

    deployedHtml = html.replace('content="3"', 'content="4"');
    assert.match(await (await navigate()).text(), /name="dso-build" content="4"/);
    deployedHtml = '<title>Old HTML from the CDN</title>';
    assert.match(await (await navigate()).clone().text(), /name="dso-build" content="3"/);
    online = false;
    assert.match(await (await navigate()).text(), /name="dso-build" content="3"/);
});
