(() => {
    const icons = {
        Galaxy: '<img src="./Galaxy.png" alt="Galaxy">',
        Nebula: '<img src="./Nebula.png" alt="Nebula">',
        'Globular Cluster': '<img src="./Cluster.png" alt="Globular cluster">',
        'Open Cluster': '<img src="./Cluster.png" alt="Open cluster">',
        Star: '<svg viewBox="0 0 24 24" fill="#ff3f4f"><path d="M12 2l2.8 6.1 6.7.7-5 4.5 1.5 6.6L12 16.5 6 19.9l1.5-6.6-5-4.5 6.7-.7L12 2z"/></svg>',
        Alignment: '<svg viewBox="0 0 24 24" fill="none" stroke="#ffb84d" stroke-width="2"><circle cx="12" cy="12" r="9"></circle><path d="M12 3v18M3 12h18"></path></svg>'
    };

    const sensor = new DSOSensorController();
    const skyView = new DSOSkyARView(document.getElementById('arUI'));
    const state = {
        activeCategory: 'All',
        expanded: false,
        searchTimer: null,
        userLat: null,
        userLon: null,
        activeTarget: null,
        arSession: null,
        stream: null,
        wakeLock: null,
        calibrationTimer: null
    };

    const searchInput = document.getElementById('dsoSearchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    const list = document.getElementById('dsoList');
    const showMoreBtn = document.getElementById('showMoreBtn');
    const locationStatus = document.getElementById('locationStatus');

    function normalizeSearch(value) {
        return String(value || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    }

    function searchableText(dso) {
        return normalizeSearch([
            dso.id,
            dso.name,
            dso.constellation || '',
            ...(Array.isArray(dso.aliases) ? dso.aliases : [])
        ].join(' '));
    }

    function setLocationStatus(message, error = false) {
        locationStatus.textContent = message;
        locationStatus.style.color = error ? 'var(--amber)' : 'var(--green)';
    }

    function validLocation(lat, lon) {
        return Number.isFinite(lat) && Number.isFinite(lon) &&
            lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180;
    }

    function applyLocation(lat, lon, source) {
        if (!validLocation(lat, lon)) return false;
        state.userLat = lat;
        state.userLon = lon;
        localStorage.setItem('dsoLocation', JSON.stringify({ lat, lon }));
        document.getElementById('latitudeInput').value = lat.toFixed(6);
        document.getElementById('longitudeInput').value = lon.toFixed(6);
        setLocationStatus(source + ': ' + lat.toFixed(4) + '°, ' + lon.toFixed(4) + '°');
        updateList();
        return true;
    }

    function requestLocation() {
        if (!navigator.geolocation) {
            setLocationStatus('GPS unavailable · enter coordinates', true);
            return;
        }
        setLocationStatus('Requesting GPS…');
        navigator.geolocation.getCurrentPosition(
            (position) => applyLocation(
                position.coords.latitude,
                position.coords.longitude,
                'GPS location'
            ),
            () => setLocationStatus('GPS permission failed · enter coordinates', true),
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 300000 }
        );
    }

    function loadSavedLocation() {
        try {
            const saved = JSON.parse(localStorage.getItem('dsoLocation') || 'null');
            if (saved && applyLocation(Number(saved.lat), Number(saved.lon), 'Saved location')) return;
        } catch (error) {
            localStorage.removeItem('dsoLocation');
        }
        setLocationStatus('Waiting for GPS…');
    }

    function renderList() {
        list.innerHTML = '';
        for (const dso of dsoDatabase) {
            if (dso.type === 'Alignment') continue;
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'dso-item dimmed';
            button.dataset.id = dso.id;
            button.innerHTML =
                '<div class="dso-icon">' + (icons[dso.type] || icons.Alignment) + '</div>' +
                '<div class="dso-text-group">' +
                    '<div class="dso-id">' + dso.id + '</div>' +
                    '<div class="dso-name">' + dso.name + '</div>' +
                    '<div class="dso-status status-warn">SET LOCATION</div>' +
                '</div><div class="dso-arrow">›</div>';
            button.addEventListener('click', () => openInfoModal(dso));
            list.appendChild(button);
        }
    }

    function positionFor(dso) {
        if (!dso || dso.positionUnverified || state.userLat === null || state.userLon === null) return null;
        if (dso.type === 'Alignment') {
            return dso.id === 'SCP'
                ? { azimuth: 180, altitude: -state.userLat }
                : { azimuth: 0, altitude: state.userLat };
        }
        return DSOAstronomy.calculateCatalogAltAz(
            dso.ra, dso.dec, state.userLat, state.userLon, new Date()
        );
    }

    function updateList() {
        const query = normalizeSearch(searchInput.value);
        const moonMode = document.getElementById('moonFilterToggle').checked;
        const night = state.userLat !== null &&
            DSOAstronomy.isAstronomicalNight(state.userLat, state.userLon);
        const buttons = [...list.querySelectorAll('.dso-item')];
        let available = 0;
        let visibleIndex = 0;

        for (const button of buttons) {
            const dso = dsoDatabase.find((item) => item.id === button.dataset.id);
            const status = button.querySelector('.dso-status');
            if (!dso) continue;

            const position = positionFor(dso);
            let categoryMatch = state.activeCategory === 'All' ||
                dso.type.includes(state.activeCategory);
            let searchMatch = !query || searchableText(dso).includes(query);
            let moonMatch = true;
            if (moonMode) {
                if (dso.type === 'Galaxy') moonMatch = false;
                if (dso.type === 'Nebula' &&
                    !['NGC 3372', 'M 8', 'M 42', 'NGC 2070'].includes(dso.id)) moonMatch = false;
            }

            const match = categoryMatch && searchMatch && moonMatch;
            button.style.display = match ? 'flex' : 'none';
            if (!match) continue;

            available++;
            if (position === null) {
                button.classList.add('dimmed');
                status.textContent = dso.positionUnverified ? 'POSITION UNVERIFIED' : 'SET LOCATION';
                status.className = 'dso-status status-warn';
            } else if (position.altitude < 0) {
                button.classList.add('dimmed');
                status.textContent = 'BELOW HORIZON';
                status.className = 'dso-status status-down';
            } else if (!night && !query) {
                button.classList.add('dimmed');
                status.textContent = 'DAYLIGHT';
                status.className = 'dso-status status-warn';
            } else if (position.altitude < 15) {
                button.classList.add('dimmed');
                status.textContent = 'LOW ALTITUDE';
                status.className = 'dso-status status-warn';
            } else {
                button.classList.remove('dimmed');
                status.textContent = 'VISIBLE · ' + position.altitude.toFixed(1) + '°';
                status.className = 'dso-status';
            }

            const shouldShow = query || state.expanded || visibleIndex < 5;
            button.style.display = shouldShow ? 'flex' : 'none';
            visibleIndex++;
        }

        showMoreBtn.style.display = !query && available > 5 ? 'block' : 'none';
        showMoreBtn.textContent = state.expanded
            ? 'Show less'
            : 'Show all (' + Math.max(0, available - 5) + ' hidden)';

        const existing = document.getElementById('statusMessage');
        if (existing) existing.remove();
        if (available === 0) {
            const message = document.createElement('div');
            message.id = 'statusMessage';
            message.className = 'status-message';
            message.textContent = query ? 'No matching targets.' : 'No targets match these filters.';
            list.appendChild(message);
        }
    }

    function openModal(id) {
        document.getElementById(id).style.display = 'flex';
    }

    function closeModal(id) {
        document.getElementById(id).style.display = 'none';
    }

    function openInfoModal(dso) {
        state.activeTarget = dso;
        document.getElementById('modalIcon').innerHTML = icons[dso.type] || icons.Alignment;
        document.getElementById('modalId').textContent = dso.id;
        document.getElementById('modalTitle').textContent = dso.name;
        document.getElementById('modalType').textContent = dso.type;
        document.getElementById('modalSeason').textContent = dso.season;
        document.getElementById('modalDist').textContent = dso.dist;
        document.getElementById('modalDesc').textContent = dso.desc;

        const position = positionFor(dso);
        const alt = document.getElementById('modalAlt');
        const locate = document.getElementById('locateBtn');
        if (!position) {
            alt.textContent = dso.positionUnverified ? 'Coordinates unverified' : 'Location needed';
            locate.disabled = true;
        } else {
            alt.textContent = position.altitude.toFixed(1) + '° alt / ' + position.azimuth.toFixed(1) + '° az';
            locate.disabled = position.altitude < 0 && dso.type !== 'Alignment';
        }
        openModal('infoModal');
    }

    async function requestWakeLock(session) {
        if (!('wakeLock' in navigator)) return;
        try {
            const lock = await navigator.wakeLock.request('screen');
            if (state.arSession === session) state.wakeLock = lock;
            else await lock.release();
        } catch {}
    }

    async function openAR(target, mode) {
        if (state.arSession) return;
        if (state.userLat === null || state.userLon === null) {
            alert('Set your location before starting sky guidance.');
            return;
        }
        const position = positionFor(target);
        if (!position) {
            alert('This target does not have verified coordinates.');
            return;
        }
        if (position.altitude < 0) {
            alert('This target is below the horizon at the current time.');
            return;
        }

        const session = {};
        state.arSession = session;
        try {
            await sensor.requestPermissions();
            if (state.arSession !== session) return;
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                throw new Error('Camera is not available in this browser.');
            }
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: { ideal: 'environment' } },
                audio: false
            });
            if (state.arSession !== session) {
                stream.getTracks().forEach((track) => track.stop());
                return;
            }
            state.stream = stream;
            document.getElementById('cameraFeed').srcObject = stream;
            state.activeTarget = target;
            skyView.setTarget(target, mode);
            skyView.show();
            document.querySelector('.app-header').style.display = 'none';
            document.querySelector('.action-row').style.display = 'none';
            sensor.start((phonePosition) => skyView.update(positionFor(target), phonePosition),
                (message) => skyView.waiting(message));
            requestWakeLock(session);
        } catch (error) {
            if (state.arSession !== session) return;
            closeAR();
            alert('Unable to start sky guidance: ' + (error.message || 'check permissions.'));
        }
    }

    function closeAR() {
        state.arSession = null;
        sensor.stop();
        if (state.stream) {
            state.stream.getTracks().forEach((track) => track.stop());
            state.stream = null;
        }
        const video = document.getElementById('cameraFeed');
        video.srcObject = null;
        state.wakeLock?.release().catch(() => {});
        state.wakeLock = null;
        skyView.hide();
        document.querySelector('.app-header').style.display = '';
        document.querySelector('.action-row').style.display = '';
        state.activeTarget = null;
    }

    function openCalibration() {
        if (state.arSession) return;
        document.getElementById('declinationInput').value = sensor.declination;
        document.getElementById('headingOffsetInput').value = sensor.headingOffset;
        document.getElementById('calibrationStatus').textContent =
            'Move the phone in a wide figure-eight to help the device calibrate its compass.';
        openModal('calibrationModal');
    }

    function beginCalibration() {
        sensor.start(() => {}, () => {});
        sensor.startCalibration();
        const start = Date.now();
        const button = document.getElementById('startCalibrationBtn');
        button.disabled = true;
        const tick = () => {
            const elapsed = Date.now() - start;
            const status = document.getElementById('calibrationStatus');
            if (elapsed < 8000) {
                status.textContent = 'Keep moving in a slow figure-eight… ' + Math.floor(elapsed / 1000) + '/8 seconds';
                state.calibrationTimer = setTimeout(tick, 250);
            } else {
                const moved = sensor.finishCalibration();
                sensor.stop();
                state.calibrationTimer = null;
                button.disabled = false;
                status.textContent = moved
                    ? 'Movement recorded. Your phone manages compass calibration. Save below to apply manual corrections.'
                    : 'Not enough motion data. Check motion permission and repeat with a wider figure-eight.';
            }
        };
        tick();
    }

    function saveCalibration() {
        const declination = document.getElementById('declinationInput').value;
        const offset = document.getElementById('headingOffsetInput').value;
        document.getElementById('calibrationStatus').textContent =
            sensor.setCorrections(declination, offset)
                ? 'Saved. These values will be used by sky guidance.'
                : 'Enter valid values between -30° and +30°.';
    }

    let calibrationRequest = null;
    function closeCalibration() {
        calibrationRequest = null;
        clearTimeout(state.calibrationTimer);
        state.calibrationTimer = null;
        sensor.stop();
        document.getElementById('startCalibrationBtn').disabled = false;
        closeModal('calibrationModal');
    }

    document.getElementById('requestLocationBtn').addEventListener('click', requestLocation);
    document.getElementById('applyLocationBtn').addEventListener('click', () => {
        const lat = Number.parseFloat(document.getElementById('latitudeInput').value);
        const lon = Number.parseFloat(document.getElementById('longitudeInput').value);
        if (!applyLocation(lat, lon, 'Manual location')) setLocationStatus('Enter valid latitude and longitude', true);
    });
    document.getElementById('calibrationBtn').addEventListener('click', openCalibration);
    document.getElementById('startCalibrationBtn').addEventListener('click', async () => {
        const request = {};
        calibrationRequest = request;
        const button = document.getElementById('startCalibrationBtn');
        button.disabled = true;
        try {
            await sensor.requestPermissions();
            if (calibrationRequest === request) beginCalibration();
        } catch (error) {
            if (calibrationRequest !== request) return;
            button.disabled = false;
            document.getElementById('calibrationStatus').textContent = error.message;
        }
    });
    document.getElementById('saveCalibrationBtn').addEventListener('click', saveCalibration);
    document.getElementById('closeCalibrationBtn').addEventListener('click', closeCalibration);

    document.getElementById('polarAlignBtn').addEventListener('click', () => openModal('polarModal'));
    document.getElementById('closePolarModalBtn').addEventListener('click', () => closeModal('polarModal'));
    document.getElementById('closePolarModalBtn2').addEventListener('click', () => closeModal('polarModal'));
    document.getElementById('btnSCP').addEventListener('click', () => {
        closeModal('polarModal');
        openAR(dsoDatabase.find((dso) => dso.id === 'SCP'), 'polar');
    });
    document.getElementById('btnNCP').addEventListener('click', () => {
        closeModal('polarModal');
        openAR(dsoDatabase.find((dso) => dso.id === 'NCP'), 'polar');
    });

    document.getElementById('closeModalBtn').addEventListener('click', () => closeModal('infoModal'));
    document.getElementById('closeModalBtn2').addEventListener('click', () => closeModal('infoModal'));
    document.getElementById('locateBtn').addEventListener('click', () => {
        closeModal('infoModal');
        if (state.activeTarget) openAR(state.activeTarget, 'sky');
    });
    document.getElementById('backButton').addEventListener('click', closeAR);

    document.querySelectorAll('.cat-btn').forEach((button) => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.cat-btn').forEach((item) => item.classList.remove('active'));
            button.classList.add('active');
            state.activeCategory = button.dataset.cat;
            state.expanded = false;
            updateList();
        });
    });
    searchInput.addEventListener('input', () => {
        clearSearchBtn.style.display = searchInput.value ? 'block' : 'none';
        clearTimeout(state.searchTimer);
        state.searchTimer = setTimeout(updateList, 160);
    });
    clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        clearSearchBtn.style.display = 'none';
        state.expanded = false;
        updateList();
    });
    document.getElementById('moonFilterToggle').addEventListener('change', updateList);
    showMoreBtn.addEventListener('click', () => {
        state.expanded = !state.expanded;
        updateList();
    });

    document.querySelectorAll('.modal-overlay').forEach((overlay) => {
        overlay.addEventListener('click', (event) => {
            if (event.target !== overlay) return;
            if (overlay.id === 'calibrationModal') closeCalibration();
            else closeModal(overlay.id);
        });
    });

    renderList();
    loadSavedLocation();
    requestLocation();
    updateList();
})();
