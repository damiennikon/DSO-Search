(() => {
    const { D2R, R2D, normalizeAngle, signedAngleDelta } = DSOAstronomy;
    const DECLINATION_KEY = 'dsoDeclination';
    const OFFSET_KEY = 'dsoHeadingOffset';
    const TRACKING_TIMEOUT = 2500;

    function deviceBasis({ alpha, beta, gamma }) {
        if (![alpha, beta, gamma].every(Number.isFinite)) return null;
        const x = beta * D2R;
        const y = gamma * D2R;
        const z = alpha * D2R;
        const cx = Math.cos(x), sx = Math.sin(x);
        const cy = Math.cos(y), sy = Math.sin(y);
        const cz = Math.cos(z), sz = Math.sin(z);

        // Columns of the W3C Z-X'-Y'' rotation. The rear camera looks along -Z.
        return {
            right: [cz * cy - sz * sx * sy, sz * cy + cz * sx * sy, -cx * sy],
            up: [-sz * cx, cz * cx, sx],
            forward: [-cz * sy - sz * sx * cy, -sz * sy + cz * sx * cy, -cx * cy]
        };
    }

    function heading([east, north]) {
        return normalizeAngle(Math.atan2(east, north) * R2D);
    }

    function rotateHeading([east, north, up], angle) {
        return [
            east * Math.cos(angle) + north * Math.sin(angle),
            north * Math.cos(angle) - east * Math.sin(angle),
            up
        ];
    }

    function dot(a, b) {
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    }

    class SensorController {
        constructor() {
            const storedDeclination = Number.parseFloat(localStorage.getItem(DECLINATION_KEY));
            const storedOffset = Number.parseFloat(localStorage.getItem(OFFSET_KEY));
            this.declination = Number.isFinite(storedDeclination) ? storedDeclination : 0;
            this.headingOffset = Number.isFinite(storedOffset) ? storedOffset : 0;
            this.handleEvent = this.handleEvent.bind(this);
        }

        setCorrections(declination, offset) {
            const values = [declination, offset].map(Number.parseFloat);
            if (values.some((value) => !Number.isFinite(value) || Math.abs(value) > 30)) {
                return false;
            }
            [this.declination, this.headingOffset] = values;
            localStorage.setItem(DECLINATION_KEY, String(this.declination));
            localStorage.setItem(OFFSET_KEY, String(this.headingOffset));
            return true;
        }

        async requestPermissions() {
            if (typeof DeviceOrientationEvent === 'undefined') {
                throw new Error('This browser does not provide motion sensors.');
            }
            if (typeof DeviceOrientationEvent.requestPermission === 'function') {
                const result = await DeviceOrientationEvent.requestPermission();
                if (result !== 'granted') throw new Error('Motion permission was not granted.');
            }
        }

        start(onUpdate, onStatus) {
            this.stop();
            this.onUpdate = onUpdate;
            this.onStatus = onStatus;
            this.waitForReading();
            window.addEventListener('deviceorientation', this.handleEvent);
            window.addEventListener('deviceorientationabsolute', this.handleEvent);
        }

        waitForReading() {
            clearTimeout(this.trackingTimer);
            this.trackingTimer = setTimeout(() => {
                this.yawReference = null;
                this.onStatus('Compass unavailable. Check motion permission and tilt the phone slightly.');
            }, TRACKING_TIMEOUT);
        }

        stop() {
            clearTimeout(this.trackingTimer);
            window.removeEventListener('deviceorientation', this.handleEvent);
            window.removeEventListener('deviceorientationabsolute', this.handleEvent);
            this.onUpdate = null;
            this.onStatus = null;
            this.yawReference = null;
            this.calibration = null;
        }

        startCalibration() {
            this.calibration = { started: Date.now(), count: 0, reference: null, minX: 0, maxX: 0, minY: 0, maxY: 0 };
        }

        sampleCalibration(basis) {
            const sample = this.calibration;
            sample.reference ??= basis;
            const x = dot(basis.forward, sample.reference.right);
            const y = dot(basis.forward, sample.reference.up);
            sample.count++;
            sample.minX = Math.min(sample.minX, x);
            sample.maxX = Math.max(sample.maxX, x);
            sample.minY = Math.min(sample.minY, y);
            sample.maxY = Math.max(sample.maxY, y);
        }

        finishCalibration() {
            const sample = this.calibration;
            this.calibration = null;
            const minimumSpan = Math.sin(15 * D2R);
            return Boolean(sample && Date.now() - sample.started >= 7500 && sample.count >= 12 &&
                sample.maxX - sample.minX >= minimumSpan &&
                sample.maxY - sample.minY >= minimumSpan);
        }

        handleEvent(event) {
            const basis = deviceBasis(event);
            if (!basis) return;
            if (this.calibration) this.sampleCalibration(basis);
            const pointing = this.getPointing(event, basis);
            if (!pointing) return;
            this.waitForReading();
            this.onUpdate(pointing);
        }

        getPointing(event, basis = deviceBasis(event)) {
            if (!basis) return null;
            const compass = event.webkitCompassHeading;
            const accuracy = event.webkitCompassAccuracy;
            let correction = this.declination + this.headingOffset;
            if (!event.absolute) {
                if (!Number.isFinite(compass) || compass < 0 || compass > 360 ||
                    (Number.isFinite(accuracy) && (accuracy < 0 || accuracy > 25))) {
                    this.yawReference = null;
                    return null;
                }
                // Safari's magnetic heading refers to the top edge. Match that
                // direction to the relative attitude to recover the camera's yaw.
                if (Math.hypot(basis.up[0], basis.up[1]) >= 0.25) {
                    this.yawReference = signedAngleDelta(compass, heading(basis.up));
                }
                if (!Number.isFinite(this.yawReference)) return null;
                correction += this.yawReference;
            }

            const right = rotateHeading(basis.right, correction * D2R);
            const up = rotateHeading(basis.up, correction * D2R);
            const forward = rotateHeading(basis.forward, correction * D2R);
            const screenAngle = (window.screen?.orientation?.angle ?? window.orientation ?? 0) * D2R;
            const cos = Math.cos(screenAngle);
            const sin = Math.sin(screenAngle);
            return {
                right: right.map((value, i) => value * cos - up[i] * sin),
                up: up.map((value, i) => value * cos + right[i] * sin),
                forward,
                azimuth: heading(forward),
                altitude: Math.atan2(forward[2], Math.hypot(forward[0], forward[1])) * R2D,
                accuracy: Number.isFinite(accuracy) ? accuracy : null
            };
        }
    }

    window.DSOSensorController = SensorController;
})();
