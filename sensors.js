(() => {
    const D2R = Math.PI / 180;
    const R2D = 180 / Math.PI;
    const DECLINATION_KEY = 'dsoDeclination';
    const OFFSET_KEY = 'dsoHeadingOffset';
    const CALIBRATION_KEY = 'dsoCalibration';

    class SensorController {
        constructor() {
            const storedDeclination = Number.parseFloat(localStorage.getItem(DECLINATION_KEY));
            const storedOffset = Number.parseFloat(localStorage.getItem(OFFSET_KEY));
            this.declination = Number.isFinite(storedDeclination) ? storedDeclination : 0;
            this.headingOffset = Number.isFinite(storedOffset) ? storedOffset : 0;
            this.calibration = this.readCalibration();
            this.running = false;
            this.calibrating = false;
            this.samples = [];
            this.lastPointing = null;
            this.onUpdate = null;
            this.onStatus = null;
            this.handleEvent = this.handleEvent.bind(this);
        }

        readCalibration() {
            try {
                return JSON.parse(localStorage.getItem(CALIBRATION_KEY) || 'null');
            } catch (error) {
                return null;
            }
        }

        setDeclination(value) {
            const parsed = Number.parseFloat(value);
            if (!Number.isFinite(parsed) || parsed < -30 || parsed > 30) return false;
            this.declination = parsed;
            localStorage.setItem(DECLINATION_KEY, String(parsed));
            return true;
        }

        setHeadingOffset(value) {
            const parsed = Number.parseFloat(value);
            if (!Number.isFinite(parsed) || parsed < -30 || parsed > 30) return false;
            this.headingOffset = parsed;
            localStorage.setItem(OFFSET_KEY, String(parsed));
            return true;
        }

        async requestPermissions() {
            if (typeof DeviceOrientationEvent !== 'undefined' &&
                typeof DeviceOrientationEvent.requestPermission === 'function') {
                const result = await DeviceOrientationEvent.requestPermission();
                if (result !== 'granted') throw new Error('Motion permission was not granted');
            }
        }

        start(onUpdate, onStatus) {
            this.onUpdate = onUpdate;
            this.onStatus = onStatus;
            if (this.running) return;
            this.running = true;
            window.addEventListener('deviceorientation', this.handleEvent);
            if ('ondeviceorientationabsolute' in window) {
                window.addEventListener('deviceorientationabsolute', this.handleEvent);
            }
            this.emitStatus('Move the phone slowly for a stable compass reading.');
        }

        stop() {
            this.running = false;
            window.removeEventListener('deviceorientation', this.handleEvent);
            window.removeEventListener('deviceorientationabsolute', this.handleEvent);
            this.onUpdate = null;
        }

        startCalibration() {
            this.calibrating = true;
            this.samples = [];
            this.calibrationStartedAt = Date.now();
            this.emitStatus('Make a slow figure-eight with the phone for 8 seconds.');
        }

        finishCalibration() {
            this.calibrating = false;
            const duration = Date.now() - (this.calibrationStartedAt || Date.now());
            const varied = this.samples.length >= 12 &&
                this.samples.some((range) => range > 45);
            if (varied && duration >= 5000) {
                this.calibration = {
                    timestamp: new Date().toISOString(),
                    samples: this.samples.length,
                    duration
                };
                localStorage.setItem(CALIBRATION_KEY, JSON.stringify(this.calibration));
                this.emitStatus('Calibration recorded. For a persistent offset, adjust the heading correction below.');
                return true;
            }
            this.emitStatus('Calibration movement was insufficient. Repeat the figure-eight more widely.');
            return false;
        }

        handleEvent(event) {
            const pointing = this.getPointing(event);
            if (this.calibrating) {
                const values = [event.alpha, event.beta, event.gamma]
                    .map(Number)
                    .filter(Number.isFinite);
                if (values.length) {
                    const min = Math.min(...values);
                    const max = Math.max(...values);
                    this.samples.push(max - min);
                    if (Date.now() - this.calibrationStartedAt > 8500) this.finishCalibration();
                }
            }
            if (!pointing) {
                this.emitStatus('Waiting for absolute compass data. Check motion permissions.');
                return;
            }
            this.lastPointing = pointing;
            if (this.onUpdate) this.onUpdate(pointing);
        }

        getPointing(event) {
            const beta = Number(event.beta);
            const gamma = Number(event.gamma);
            if (!Number.isFinite(beta) || !Number.isFinite(gamma)) return null;

            const alpha = Number(event.alpha);
            const bx = beta * D2R;
            const gy = gamma * D2R;
            const al = alpha * D2R;
            const cX = Math.cos(bx);
            const cY = Math.cos(gy);
            const cZ = Math.cos(al);
            const sX = Math.sin(bx);
            const sY = Math.sin(gy);
            const sZ = Math.sin(al);

            // W3C Z-X'-Y'' rotation, applied to the camera back vector [0, 0, -1].
            const m13 = cY * sZ * sX + cZ * sY;
            const m23 = sZ * sY - cZ * cY * sX;
            const m33 = cX * cY;
            const up = -m33;

            let azimuth;
            let east;
            let north;
            let source;
            const iosHeading = Number(event.webkitCompassHeading);

            if (Number.isFinite(iosHeading) && iosHeading >= 0) {
                azimuth = DSOAstronomy.normalizeAngle(
                    iosHeading + this.declination + this.headingOffset
                );
                const horizontal = Math.sqrt(Math.max(0, 1 - up * up));
                east = Math.sin(azimuth * D2R) * horizontal;
                north = Math.cos(azimuth * D2R) * horizontal;
                source = 'iOS magnetic heading';
            } else if (event.absolute === true && Number.isFinite(alpha)) {
                east = -m13;
                north = -m23;
                azimuth = DSOAstronomy.normalizeAngle(
                    Math.atan2(east, north) * R2D +
                    this.declination +
                    this.headingOffset
                );
                source = 'absolute orientation';
            } else {
                return null;
            }

            return {
                azimuth,
                altitude: Math.atan2(up, Math.hypot(east, north)) * R2D,
                accuracy: Number.isFinite(Number(event.webkitCompassAccuracy))
                    ? Number(event.webkitCompassAccuracy)
                    : null,
                source
            };
        }

        emitStatus(message) {
            if (this.onStatus) this.onStatus(message);
        }
    }

    window.DSOSensorController = SensorController;
})();