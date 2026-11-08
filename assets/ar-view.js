(() => {
    const { D2R, R2D } = DSOAstronomy;
    // Browsers do not expose camera intrinsics. Use a nominal diagonal FOV
    // for the overlay, then account for the actual video aspect and cover crop.
    const TAN_HALF_DIAGONAL_FOV = Math.tan(75 * D2R / 2);

    function projectTarget({ azimuth, altitude }, { right, up, forward }) {
        const az = azimuth * D2R;
        const alt = altitude * D2R;
        const target = [Math.sin(az) * Math.cos(alt), Math.cos(az) * Math.cos(alt), Math.sin(alt)];
        const dot = (axis) => axis[0] * target[0] + axis[1] * target[1] + axis[2] * target[2];
        const x = dot(right);
        const y = dot(up);
        const depth = dot(forward);
        return { x, y, depth, error: Math.atan2(Math.hypot(x, y), depth) * R2D };
    }

    class SkyARView {
        constructor(root) {
            this.root = root;
            this.video = root.querySelector('#cameraFeed');
            this.dot = root.querySelector('#targetDot');
            this.arrow = root.querySelector('#directionArrow');
            this.readout = root.querySelector('#arReadout');
            this.status = root.querySelector('#arStatus');
            this.targetLabel = root.querySelector('#activeTargetName');
            this.hint = root.querySelector('#arHint');
        }

        setTarget(target, mode) {
            this.targetLabel.textContent = target.name;
            this.status.textContent = mode === 'polar' ? 'POLAR ALIGNMENT' : 'SKY TARGET';
            this.hint.textContent = mode === 'polar'
                ? 'Use the dot to roughly aim the mount at the pole.'
                : 'Follow the arrow until the target dot is in view.';
        }

        update(targetPosition, phonePosition) {
            const width = this.root.clientWidth;
            const height = this.root.clientHeight;
            if (!width || !height) return;
            const videoWidth = this.video.videoWidth || (width < height ? 3 : 4);
            const videoHeight = this.video.videoHeight || (width < height ? 4 : 3);
            const coverScale = Math.max(width / videoWidth, height / videoHeight);
            const focalPixels = Math.hypot(videoWidth, videoHeight) * coverScale /
                (2 * TAN_HALF_DIAGONAL_FOV);
            const { x, y, depth, error } = projectTarget(targetPosition, phonePosition);
            const offsetX = x * focalPixels / depth;
            const offsetY = -y * focalPixels / depth;
            const onScreen = depth > 0 &&
                Math.abs(offsetX) <= width / 2 && Math.abs(offsetY) <= height / 2;
            const centred = error < 0.8;

            this.dot.hidden = !onScreen;
            this.arrow.hidden = onScreen;
            if (onScreen) {
                this.dot.style.left = width / 2 + offsetX + 'px';
                this.dot.style.top = height / 2 + offsetY + 'px';
                this.dot.classList.toggle('target-locked', centred);
            } else {
                this.placeArrow(x, -y, width, height);
            }

            const guidance = centred ? 'TARGET CENTRED' : onScreen ? 'AIM AT DOT' : 'FOLLOW ARROW';
            this.readout.textContent = guidance + ' · offset ' + error.toFixed(1) + '°' +
                ' · target ' + targetPosition.azimuth.toFixed(1) + '° az / ' +
                targetPosition.altitude.toFixed(1) + '° alt · phone ' +
                phonePosition.azimuth.toFixed(1) + '° / ' + phonePosition.altitude.toFixed(1) + '°';
        }

        placeArrow(x, y, width, height) {
            // A directly rearward target can be reached by turning either way.
            const angle = Math.hypot(x, y) < 1e-6 ? 0 : Math.atan2(y, x);
            const dx = Math.cos(angle);
            const dy = Math.sin(angle);
            const radius = Math.min(width * 0.40 / Math.abs(dx), height * 0.32 / Math.abs(dy));
            this.arrow.style.left = width / 2 + radius * dx + 'px';
            this.arrow.style.top = height / 2 + radius * dy + 'px';
            this.arrow.style.transform = 'translate(-50%, -50%) rotate(' + angle * R2D + 'deg)';
        }

        waiting(message) {
            this.dot.hidden = true;
            this.dot.classList.remove('target-locked');
            this.arrow.hidden = true;
            this.readout.textContent = message;
        }

        show() {
            this.waiting('Waiting for compass orientation…');
            this.root.style.display = 'block';
        }

        hide() {
            this.root.style.display = 'none';
        }
    }

    window.DSOSkyARView = SkyARView;
})();
