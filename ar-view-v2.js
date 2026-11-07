(() => {
    class SkyARView {
        constructor(root) {
            this.root = root;
            this.dot = root.querySelector('#targetDot');
            this.arrow = root.querySelector('#directionArrow');
            this.readout = root.querySelector('#arReadout');
            this.status = root.querySelector('#arStatus');
            this.targetLabel = root.querySelector('#activeTargetName');
            this.horizontalFov = 70;
            this.verticalFov = 55;
            this.target = null;
        }

        setTarget(target, mode) {
            this.target = target;
            this.mode = mode || 'sky';
            this.targetLabel.textContent = target.name;
            this.status.textContent = this.mode === 'polar'
                ? 'POLAR ALIGNMENT'
                : 'SKY TARGET';
        }

        update(targetPosition, phonePosition) {
            if (!targetPosition || !phonePosition) {
                this.readout.textContent = 'Waiting for compass orientation…';
                return;
            }

            const deltaAz = DSOAstronomy.signedAngleDelta(
                targetPosition.azimuth,
                phonePosition.azimuth
            );
            const deltaAlt = targetPosition.altitude - phonePosition.altitude;
            const error = Math.hypot(deltaAz, deltaAlt);
            const inFront = Math.abs(deltaAz) < 89 && Math.abs(deltaAlt) < 89;

            let left = 50;
            let top = 50;
            if (inFront) {
                const x = 50 + 50 * Math.tan(deltaAz * DSOAstronomy.D2R) /
                    Math.tan(this.horizontalFov * DSOAstronomy.D2R / 2);
                const y = 50 - 50 * Math.tan(deltaAlt * DSOAstronomy.D2R) /
                    Math.tan(this.verticalFov * DSOAstronomy.D2R / 2);
                left = Math.max(4, Math.min(96, x));
                top = Math.max(10, Math.min(90, y));
            } else {
                const angle = Math.atan2(-deltaAlt, deltaAz);
                left = 50 + 42 * Math.cos(angle);
                top = 50 + 42 * Math.sin(angle);
            }

            this.dot.style.left = left + '%';
            this.dot.style.top = top + '%';
            this.dot.classList.toggle('target-on-screen', inFront);
            this.dot.classList.toggle('target-locked', error < 0.8);
            this.arrow.style.display = error < 0.8 ? 'none' : 'block';
            this.arrow.style.transform = 'translate(-50%, -50%) rotate(' +
                (Math.atan2(-deltaAlt, deltaAz) * DSOAstronomy.R2D) + 'deg)';

            if (error < 0.8) this.readout.textContent = 'TARGET CENTRED · error ' + error.toFixed(1) + '°';
            else if (error < 5) this.readout.textContent = 'NEAR TARGET · error ' + error.toFixed(1) + '°';
            else this.readout.textContent = 'MOVE TO TARGET · error ' + error.toFixed(1) + '°';

            this.readout.textContent += ' · target ' +
                targetPosition.azimuth.toFixed(1) + '° az / ' +
                targetPosition.altitude.toFixed(1) + '° alt · phone ' +
                phonePosition.azimuth.toFixed(1) + '° / ' +
                phonePosition.altitude.toFixed(1) + '°';
        }

        show() {
            this.root.style.display = 'block';
        }

        hide() {
            this.root.style.display = 'none';
        }
    }

    window.DSOSkyARView = SkyARView;
})();