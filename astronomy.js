(() => {
    const D2R = Math.PI / 180;
    const R2D = 180 / Math.PI;

    function normalizeAngle(angle) {
        return ((angle % 360) + 360) % 360;
    }

    function signedAngleDelta(target, current) {
        return ((target - current + 540) % 360) - 180;
    }

    function calculateAltAz(ra, dec, lat, lon, date = new Date()) {
        const when = date instanceof Date ? date : new Date(date);
        const j2000 = Date.UTC(2000, 0, 1, 12, 0, 0);
        const days = (when.getTime() - j2000) / 86400000;
        let gmst = 280.46061837 + 360.98564736629 * days;
        gmst = normalizeAngle(gmst);
        const lst = normalizeAngle(gmst + lon);
        const hourAngle = signedAngleDelta(lst, ra) * D2R;
        const decRad = dec * D2R;
        const latRad = lat * D2R;

        const east = -Math.sin(hourAngle) * Math.cos(decRad);
        const north = Math.cos(latRad) * Math.sin(decRad) -
            Math.sin(latRad) * Math.cos(decRad) * Math.cos(hourAngle);
        const up = Math.sin(latRad) * Math.sin(decRad) +
            Math.cos(latRad) * Math.cos(decRad) * Math.cos(hourAngle);

        return {
            altitude: Math.atan2(up, Math.hypot(east, north)) * R2D,
            azimuth: normalizeAngle(Math.atan2(east, north) * R2D),
            lst: lst
        };
    }

    function getSunPosition(date = new Date()) {
        const j2000 = Date.UTC(2000, 0, 1, 12, 0, 0);
        const days = ((date instanceof Date ? date : new Date(date)).getTime() - j2000) / 86400000;
        const g = (357.529 + 0.98560028 * days) * D2R;
        const q = 280.459 + 0.98564736 * days;
        const solarLongitude = (q + 1.915 * Math.sin(g) + 0.020 * Math.sin(2 * g)) * D2R;
        const obliquity = (23.439 - 0.00000036 * days) * D2R;
        let ra = Math.atan2(
            Math.cos(obliquity) * Math.sin(solarLongitude),
            Math.cos(solarLongitude)
        ) * R2D;
        if (ra < 0) ra += 360;
        const dec = Math.asin(Math.sin(obliquity) * Math.sin(solarLongitude)) * R2D;
        return { ra, dec };
    }

    function isAstronomicalNight(lat, lon, date = new Date()) {
        const sun = getSunPosition(date);
        return calculateAltAz(sun.ra, sun.dec, lat, lon, date).altitude <= -18;
    }

    function angularSeparation(az1, alt1, az2, alt2) {
        const a1 = alt1 * D2R;
        const a2 = alt2 * D2R;
        const deltaAz = signedAngleDelta(az1, az2) * D2R;
        const cosine = Math.sin(a1) * Math.sin(a2) +
            Math.cos(a1) * Math.cos(a2) * Math.cos(deltaAz);
        return Math.acos(Math.max(-1, Math.min(1, cosine))) * R2D;
    }

    function roundPosition(position) {
        return {
            altitude: Number(position.altitude.toFixed(1)),
            azimuth: Number(position.azimuth.toFixed(1))
        };
    }

    window.DSOAstronomy = {
        D2R,
        R2D,
        normalizeAngle,
        signedAngleDelta,
        calculateAltAz,
        getSunPosition,
        isAstronomicalNight,
        angularSeparation,
        roundPosition
    };
})();