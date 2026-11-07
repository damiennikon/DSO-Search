// ========================================================
// --- DSO TRACKER: CORE LOGIC (TACTICAL ENGINE) ---
// ========================================================

const icons = {
    "Galaxy": `<img src="./Galaxy.png" alt="Galaxy" style="width:100%; height:100%; object-fit:contain;" />`,
    "Nebula": `<img src="./Nebula.png" alt="Nebula" style="width:100%; height:100%; object-fit:contain;" />`,
    "Globular Cluster": `<img src="./Cluster.png" alt="Cluster" style="width:100%; height:100%; object-fit:contain;" />`,
    "Open Cluster": `<img src="./Cluster.png" alt="Cluster" style="width:100%; height:100%; object-fit:contain;" />`,
    "Star": `<svg viewBox="0 0 24 24" fill="#ff3333"><path d="M12 2l2.8 6.1 6.7.7-5 4.5 1.5 6.6L12 16.5 6 19.9l1.5-6.6-5-4.5 6.7-.7L12 2z"/></svg>`,
    "Alignment": `<svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>`
};

let isListExpanded = false; 
let activeCategory = 'All';

// --- MAGNETIC DECLINATION MEMORY ---
const savedDeclination = Number.parseFloat(localStorage.getItem('magDeclination'));
let localDeclination = Number.isFinite(savedDeclination) ? savedDeclination : 0;
let declinationSource = Number.isFinite(savedDeclination) ? 'saved' : 'manual';

document.addEventListener('DOMContentLoaded', () => {
    const magDecInput = document.getElementById('magDecInput');
    if(magDecInput) {
        magDecInput.value = localDeclination;
        magDecInput.addEventListener('change', (e) => {
            const parsed = Number.parseFloat(e.target.value);
            if (!Number.isFinite(parsed) || parsed < -30 || parsed > 30) {
                e.target.value = localDeclination;
                return;
            }
            localDeclination = parsed;
            declinationSource = 'manual';
            localStorage.setItem('magDeclination', String(localDeclination));
            updateDeclinationStatus();
        });
    }
});

function renderDSOList() {
    const listContainer = document.getElementById('dsoList');
    listContainer.innerHTML = ''; 

    dsoDatabase.forEach(dso => {
        if (dso.type === 'Alignment') return;
        
        const button = document.createElement('button');
        button.className = 'dso-item dimmed'; 
        button.id = `list-target-${dso.id.replace(/\s+/g, '')}`;
        
        button.innerHTML = `
            <div class="dso-icon">${icons[dso.type] || icons['Alignment']}</div>
            <div class="dso-text-group">
                <div class="dso-id">${dso.id}</div>
                <div class="dso-name">${dso.name}</div>
                <div class="dso-status status-down">Updating position...</div>
            </div>
            <div class="dso-arrow">›</div>
        `;
        
        button.addEventListener('click', () => openInfoModal(dso));
        listContainer.appendChild(button);
    });
}

// SEARCH DEBOUNCE
const searchInput = document.getElementById('dsoSearchInput');
const clearBtn = document.getElementById('clearSearchBtn');
const moonToggle = document.getElementById('moonFilterToggle');
let searchTimeout;

if(searchInput) {
    searchInput.addEventListener('input', function() {
        if(clearBtn) clearBtn.style.display = this.value.length > 0 ? 'block' : 'none';
        
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            updateDSOVisibility();
        }, 200);
    });
}

if(clearBtn) {
    clearBtn.addEventListener('click', function() {
        if(searchInput) searchInput.value = '';
        this.style.display = 'none';
        isListExpanded = false; 
        updateDSOVisibility();
    });
}

if(moonToggle) {
    moonToggle.addEventListener('change', function() {
        isListExpanded = false; 
        updateDSOVisibility();
    });
}

const categoryButtons = document.querySelectorAll('.cat-btn');
categoryButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        categoryButtons.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        activeCategory = e.target.getAttribute('data-cat');
        isListExpanded = false;
        updateDSOVisibility();
    });
});

document.getElementById('polarAlignBtn').addEventListener('click', () => document.getElementById('polarModal').style.display = 'flex');
document.getElementById('closePolarModalBtn').addEventListener('click', () => document.getElementById('polarModal').style.display = 'none');

document.getElementById('btnNCP').addEventListener('click', () => {
    document.getElementById('polarModal').style.display = 'none';
    const target = dsoDatabase.find(d => d.id === 'NCP');
    if(target) openInfoModal(target);
});

document.getElementById('btnSCP').addEventListener('click', () => {
    document.getElementById('polarModal').style.display = 'none';
    const target = dsoDatabase.find(d => d.id === 'SCP');
    if(target) openInfoModal(target);
});

const showMoreBtn = document.getElementById('showMoreBtn');
if(showMoreBtn) {
    showMoreBtn.addEventListener('click', () => {
        isListExpanded = !isListExpanded;
        updateDSOVisibility();
    });
}

// Math Engine
const D2R = Math.PI / 180;
const R2D = 180 / Math.PI;

function calculateAltAz(ra, dec, lat, lon, date) {
    const j2000 = Date.UTC(2000, 0, 1, 12, 0, 0);
    const daysSinceJ2000 = (date.getTime() - j2000) / 86400000;
    let gmst = 280.46061837 + 360.98564736629 * daysSinceJ2000;
    gmst = ((gmst % 360) + 360) % 360;
    let lst = gmst + lon;
    lst = ((lst % 360) + 360) % 360;
    let ha = lst - ra;
    ha = ((ha % 360) + 360) % 360;
    const haRad = ha * D2R;
    const decRad = dec * D2R;
    const latRad = lat * D2R;
    const sinAlt = Math.sin(decRad) * Math.sin(latRad) + Math.cos(decRad) * Math.cos(latRad) * Math.cos(haRad);
    const altRad = Math.asin(sinAlt);
    const alt = altRad * R2D;
    const cosAz = (Math.sin(decRad) - Math.sin(altRad) * Math.sin(latRad)) / (Math.cos(altRad) * Math.cos(latRad));
    let safeCosAz = Math.max(-1, Math.min(1, cosAz)); 
    let azRad = Math.acos(safeCosAz);
    let az = azRad * R2D;
    if (Math.sin(haRad) > 0) az = 360 - az;
    return { altitude: parseFloat(alt.toFixed(2)), azimuth: parseFloat(az.toFixed(2)) };
}

function getSunPosition(date) {
    const j2000 = Date.UTC(2000, 0, 1, 12, 0, 0);
    const d = (date.getTime() - j2000) / 86400000;
    const g = (357.529 + 0.98560028 * d) * D2R;
    const q = 280.459 + 0.98564736 * d;
    const L = (q + 1.915 * Math.sin(g) + 0.020 * Math.sin(2 * g)) * D2R;
    const e = (23.439 - 0.00000036 * d) * D2R;
    let ra = Math.atan2(Math.cos(e) * Math.sin(L), Math.cos(L)) * R2D;
    if (ra < 0) ra += 360;
    const dec = Math.asin(Math.sin(e) * Math.sin(L)) * R2D;
    return { ra, dec };
}

let userLat = null;
let userLon = null;
const moonSafeNebulae = ["NGC 3372", "M 8", "M 42", "NGC 2070"];

function normalizeSearch(value) {
    return String(value || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

function searchableDSOText(dso) {
    return normalizeSearch([
        dso.id,
        dso.name,
        dso.constellation || '',
        ...(Array.isArray(dso.aliases) ? dso.aliases : [])
    ].join(' '));
}

function updateDeclinationStatus() {
    const box = document.getElementById('magDecSuggestion');
    if (!box) return;
    const sourceText = declinationSource === 'NOAA' ? 'NOAA WMM result' :
        (declinationSource === 'saved' ? 'saved setting' : 'manual setting');
    box.textContent = 'True-north correction: ' + localDeclination.toFixed(1) + '° (' + sourceText + ').';
}

function updateLocationStatus(message, isError = false) {
    const status = document.getElementById('locationStatus');
    if (!status) return;
    status.textContent = message;
    status.className = isError ? 'location-status error' : 'location-status';
}

function updateDSOVisibility() {
    if (userLat === null || userLon === null) return;
    const rightNow = new Date();
    
    const sunCoords = getSunPosition(rightNow);
    const sunPos = calculateAltAz(sunCoords.ra, sunCoords.dec, userLat, userLon, rightNow);
    const isNight = sunPos.altitude <= -18; 
    
    const listContainer = document.getElementById('dsoList');
    if(!listContainer) return;

    const existingMsg = document.getElementById('status-msg');
    if (existingMsg) existingMsg.remove();

    const currentSearch = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const isMoonModeActive = moonToggle ? moonToggle.checked : false;

    if (!isNight && currentSearch === '') {
        dsoDatabase.forEach(dso => {
            const targetElement = document.getElementById(`list-target-${dso.id.replace(/\s+/g, '')}`);
            if (targetElement) targetElement.style.display = 'none';
        });
        if(showMoreBtn) showMoreBtn.style.display = 'none';

        const sunMessage = document.createElement('div');
        sunMessage.id = 'status-msg';
        sunMessage.style.color = 'var(--red-main)';
        sunMessage.style.textAlign = 'center';
        sunMessage.style.padding = '20px';
        sunMessage.innerHTML = `<strong>Waiting for nightfall...</strong><br>The sun is currently at ${sunPos.altitude}°.<br>True darkness begins at -18°.<br><br><em>Use the search bar above to browse the catalog.</em>`;
        listContainer.appendChild(sunMessage);
        return; 
    }

    let visibleIndex = 0;
    let totalAvailable = 0;

    dsoDatabase.forEach(dso => {
        const position = calculateAltAz(dso.ra, dso.dec, userLat, userLon, rightNow);
        const button = document.getElementById(`list-target-${dso.id.replace(/\s+/g, '')}`);
        if (!button) return; 
        
        const statusText = button.querySelector('.dso-status');
        
        if (position.altitude < 0 && dso.type !== 'Alignment') {
            button.classList.add('dimmed');
            statusText.innerText = "BELOW HORIZON";
            statusText.className = "dso-status status-down";
        } else if (!isNight && dso.type !== 'Alignment') { 
            button.classList.add('dimmed');
            statusText.innerText = "DAYLIGHT";
            statusText.className = "dso-status status-warn";
        } else {
            button.classList.toggle('dimmed', position.altitude < 15);
            if (position.altitude < 0 && dso.type === 'Alignment') {
                statusText.innerText = "REVERSE ALIGN";
                statusText.className = "dso-status status-warn";
            } else if (position.altitude < 15) {
                statusText.innerText = "LOW ALTITUDE";
                statusText.className = "dso-status status-warn";
            } else {
                statusText.innerText = "VISIBLE";
                statusText.className = "dso-status status-up";
            }
        }
        
        let categoryMatch = (activeCategory === 'All') || dso.type.includes(activeCategory);
        const isSearchMatch = currentSearch === '' || searchableDSOText(dso).includes(normalizeSearch(currentSearch));
        
        let moonSafeMatch = true;
        if (isMoonModeActive) {
            if (dso.type === 'Galaxy') moonSafeMatch = false; 
            else if (dso.type === 'Nebula' && !moonSafeNebulae.includes(dso.id)) moonSafeMatch = false; 
        }

        const isMatch = categoryMatch && isSearchMatch && moonSafeMatch;
        
        if (isMatch) {
            totalAvailable++;
            if (currentSearch !== '') {
                button.style.display = 'flex'; 
            } else {
                button.style.display = (isListExpanded || visibleIndex < 4) ? 'flex' : 'none';
                visibleIndex++;
            }
        } else {
            button.style.display = 'none';
        }
    });

    if (showMoreBtn) {
        if (currentSearch === '' && totalAvailable > 4) {
            showMoreBtn.style.display = 'block';
            showMoreBtn.innerText = isListExpanded ? 'Show Less' : `Show All (${totalAvailable - 4} hidden)`;
        } else {
            showMoreBtn.style.display = 'none';
        }
    }
}

renderDSOList();

// ==========================================
// GPS & AUTO-DETECT MAGNETIC DECLINATION
// ==========================================
let hasFetchedDeclination = false; 

function fetchDeclination(lat, lon) {
    const suggestionBox = document.getElementById('magDecSuggestion');
    if (!suggestionBox) return;
    suggestionBox.textContent = 'Looking up magnetic declination…';
    const url = 'https://www.ngdc.noaa.gov/geomag-web/calculators/calculateDeclination' +
        '?lat1=' + encodeURIComponent(lat) + '&lon1=' + encodeURIComponent(lon) +
        '&model=WMM&resultFormat=json';
    fetch(url)
        .then((res) => {
            if (!res.ok) throw new Error('NOAA HTTP ' + res.status);
            return res.json();
        })
        .then((magData) => {
            const value = Number(magData && magData.result && magData.result[0] && magData.result[0].declination);
            if (!Number.isFinite(value)) throw new Error('NOAA returned no declination');
            localDeclination = value;
            declinationSource = 'NOAA';
            localStorage.setItem('magDeclination', String(value));
            const input = document.getElementById('magDecInput');
            if (input) input.value = value.toFixed(1);
            updateDeclinationStatus();
        })
        .catch((err) => {
            declinationSource = Number.isFinite(savedDeclination) ? 'saved' : 'manual';
            const sourceText = Number.isFinite(savedDeclination)
                ? 'Using your saved correction of ' + localDeclination.toFixed(1) + '°.'
                : 'Set the correction manually before using AR.';
            suggestionBox.innerHTML = sourceText +
                ' NOAA lookup was unavailable. <a href="https://www.ngdc.noaa.gov/geomag/calculators/declinationForm.shtml" target="_blank" rel="noopener">Open NOAA calculator</a>.';
            console.warn('Magnetic declination lookup failed:', err);
        });
}

function renderSuggestion(cityName, detectedDec, suggestionBox) {
    suggestionBox.textContent = 'Magnetic declination: ' + Number(detectedDec).toFixed(1) + '°.';
}
function validCoordinates(lat, lon) {
    return Number.isFinite(lat) && Number.isFinite(lon) && lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180;
}

function setLocation(lat, lon, source) {
    if (!validCoordinates(lat, lon)) return false;
    userLat = lat;
    userLon = lon;
    localStorage.setItem('dsoLocation', JSON.stringify({ lat, lon }));
    const latInput = document.getElementById('latitudeInput');
    const lonInput = document.getElementById('longitudeInput');
    if (latInput) latInput.value = lat.toFixed(6);
    if (lonInput) lonInput.value = lon.toFixed(6);
    updateLocationStatus(source + ': ' + lat.toFixed(4) + '°, ' + lon.toFixed(4) + '°');
    hasFetchedDeclination = false;
    updateDSOVisibility();
    fetchDeclination(lat, lon);
    return true;
}

function requestLocation() {
    if (!('geolocation' in navigator)) {
        updateLocationStatus('GPS is not available. Enter coordinates manually.', true);
        return;
    }
    updateLocationStatus('Requesting your location…');
    navigator.geolocation.getCurrentPosition(
        (position) => setLocation(position.coords.latitude, position.coords.longitude, 'GPS location'),
        () => {
            if (userLat === null || userLon === null) {
                updateLocationStatus('Location permission failed. Enter coordinates manually.', true);
            } else {
                updateLocationStatus('Using saved location. GPS permission was unavailable.', true);
            }
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 300000 }
    );
}

const savedLocationRaw = localStorage.getItem('dsoLocation');
if (savedLocationRaw) {
    try {
        const savedLocation = JSON.parse(savedLocationRaw);
        const savedLat = Number(savedLocation.lat);
        const savedLon = Number(savedLocation.lon);
        if (validCoordinates(savedLat, savedLon)) setLocation(savedLat, savedLon, 'Saved location');
    } catch (err) {
        localStorage.removeItem('dsoLocation');
    }
}

const applyLocationBtn = document.getElementById('applyLocationBtn');
if (applyLocationBtn) {
    applyLocationBtn.addEventListener('click', () => {
        const lat = Number.parseFloat(document.getElementById('latitudeInput').value);
        const lon = Number.parseFloat(document.getElementById('longitudeInput').value);
        if (!setLocation(lat, lon, 'Manual location')) {
            updateLocationStatus('Enter valid latitude (-90 to 90) and longitude (-180 to 180).', true);
        }
    });
}
const requestLocationBtn = document.getElementById('requestLocationBtn');
if (requestLocationBtn) requestLocationBtn.addEventListener('click', requestLocation);
requestLocation();
// Modal Logic
let activeDSO = null; 
function openInfoModal(dso) {
    activeDSO = dso;
    document.getElementById('modalTitle').innerText = dso.name;
    document.getElementById('modalId').innerText = dso.id;
    document.getElementById('modalIcon').innerHTML = icons[dso.type] || icons['Alignment'];
    document.getElementById('modalType').innerText = dso.type;
    document.getElementById('modalDist').innerText = dso.dist;
    document.getElementById('modalSeason').innerText = dso.season;
    document.getElementById('modalDesc').innerText = dso.desc;

    const locateBtn = document.getElementById('locateBtn');
    const altDisplay = document.getElementById('modalAlt');

    if (userLat !== null && userLon !== null) {
        const rightNow = new Date();
        const position = calculateAltAz(dso.ra, dso.dec, userLat, userLon, rightNow);
        
        const altitudeColor = position.altitude < 0 ? '#881111' : (position.altitude < 15 ? '#cc6600' : '#008800');
        altDisplay.innerHTML = 'Altitude: <span style="color:' + altitudeColor + '">' + position.altitude + '°</span>' +
            ' &nbsp; Azimuth: <span>' + position.azimuth + '°</span>';
        if (position.altitude < 0 && dso.type !== 'Alignment') {
            locateBtn.disabled = true;
            locateBtn.innerText = 'Below Horizon';
        } else {
            locateBtn.disabled = false;
            locateBtn.innerText = position.altitude < 15 ? 'Locate in Sky (Low)' : 'Locate in Sky';
        }
    }
    document.getElementById('infoModal').style.display = 'flex';
}

document.getElementById('closeModalBtn').addEventListener('click', () => document.getElementById('infoModal').style.display = 'none');
document.getElementById('locateBtn').addEventListener('click', () => {
    document.getElementById('infoModal').style.display = 'none';
    openCamera(activeDSO);
});

// ==========================================
// AR CAMERA & RADAR HUD
// ==========================================
let activeStream = null;
let wakeLock = null;
let smoothedAz = null;
let smoothedAlt = null;

function normalizeAngle(angle) {
    return ((angle % 360) + 360) % 360;
}

function signedAngleDelta(target, current) {
    return ((target - current + 540) % 360) - 180;
}

function smoothAngle(current, target, factor = 0.2) {
    if (current === null) return normalizeAngle(target);
    return normalizeAngle(current + signedAngleDelta(target, current) * factor);
}

function getCameraPointing(event) {
    const beta = Number(event.beta);
    const gamma = Number(event.gamma);
    if (!Number.isFinite(beta) || !Number.isFinite(gamma)) return null;
    const bx = beta * D2R;
    const gy = gamma * D2R;
    const al = Number(event.alpha) * D2R;
    const cX = Math.cos(bx), cY = Math.cos(gy), cZ = Math.cos(al);
    const sX = Math.sin(bx), sY = Math.sin(gy), sZ = Math.sin(al);
    // W3C Z-X'-Y'' rotation; the camera points along body vector [0,0,-1].
    const m13 = cY * sZ * sX + cZ * sY;
    const m23 = sZ * sY - cZ * cY * sX;
    const m33 = cX * cY;
    const up = -m33;
    let azimuth;
    let east;
    let north;
    const iosMagneticHeading = Number(event.webkitCompassHeading);
    if (Number.isFinite(iosMagneticHeading) && iosMagneticHeading >= 0) {
        azimuth = normalizeAngle(iosMagneticHeading + localDeclination);
        const horizontal = Math.sqrt(Math.max(0, 1 - up * up));
        east = Math.sin(azimuth * D2R) * horizontal;
        north = Math.cos(azimuth * D2R) * horizontal;
    } else if (event.absolute === true && Number.isFinite(Number(event.alpha))) {
        east = -m13;
        north = -m23;
        azimuth = normalizeAngle(Math.atan2(east, north) * R2D + localDeclination);
    } else {
        return null;
    }
    const horizontalLength = Math.sqrt(east * east + north * north);
    const altitude = Math.atan2(up, horizontalLength) * R2D;
    return { azimuth, altitude };
}

function setARReadout(text) {
    const readout = document.getElementById('arReadout');
    if (readout) readout.textContent = text;
}

function handleAR(event) {
    if (!activeDSO || userLat === null || userLon === null) return;
    const pointing = getCameraPointing(event);
    if (!pointing) {
        setARReadout('Waiting for absolute compass data…');
        return;
    }
    smoothedAz = smoothAngle(smoothedAz, pointing.azimuth, 0.22);
    smoothedAlt = smoothedAlt === null ? pointing.altitude : smoothedAlt + (pointing.altitude - smoothedAlt) * 0.22;
    document.getElementById('compassNeedle').style.transform = 'rotate(' + (-smoothedAz) + 'deg)';
    const starPos = calculateAltAz(activeDSO.ra, activeDSO.dec, userLat, userLon, new Date());
    const deltaAz = signedAngleDelta(starPos.azimuth, smoothedAz);
    const deltaAlt = starPos.altitude - smoothedAlt;
    const distanceToTarget = Math.hypot(deltaAz, deltaAlt);
    setARReadout('Target ' + starPos.azimuth.toFixed(1) + '° az / ' + starPos.altitude.toFixed(1) + '° alt' +
        ' · Phone ' + smoothedAz.toFixed(1) + '° / ' + smoothedAlt.toFixed(1) + '°' +
        ' · Error ' + distanceToTarget.toFixed(1) + '°');
    const dot = document.getElementById('yellowDot');
    const arrow = document.getElementById('directionArrow');
    if (distanceToTarget < 0.8) {
        arrow.style.display = 'none';
        dot.style.display = 'block';
        dot.style.backgroundColor = '#008800';
        dot.style.boxShadow = '0 0 10px #008800, 0 0 20px #008800';
    } else if (distanceToTarget < 5) {
        arrow.style.display = 'none';
        dot.style.display = 'block';
        dot.style.backgroundColor = '#cc6600';
        dot.style.boxShadow = '0 0 10px #cc6600, 0 0 20px #cc6600';
    } else {
        dot.style.display = 'none';
        arrow.style.display = 'block';
        arrow.style.color = '#ff0000';
        arrow.style.textShadow = '0 0 5px #ff0000';
        const angleDeg = Math.atan2(-deltaAlt, deltaAz) * R2D;
        arrow.style.transform = 'translate(-50%, -50%) rotate(' + angleDeg + 'deg) translateY(-80px)';
    }
}
async function requestWakeLock() {
    try {
        if ('wakeLock' in navigator) {
            wakeLock = await navigator.wakeLock.request('screen');
        }
    } catch (err) {
        console.error("Wake Lock failed:", err);
    }
}

async function openCamera(dso) {
    const cameraUI = document.getElementById('cameraUI');
    const cameraFeed = document.getElementById('cameraFeed');
    smoothedAz = null;
    smoothedAlt = null;
    setARReadout('Starting sensors…');
    window.removeEventListener('deviceorientation', handleAR);
    window.removeEventListener('deviceorientationabsolute', handleAR);
    try {
        if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
            const permission = await DeviceOrientationEvent.requestPermission();
            if (permission !== 'granted') throw new Error('Orientation permission was not granted');
        }
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) throw new Error('Camera is not available in this browser');
        activeStream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: { ideal: 'environment' } },
            audio: false
        });
        cameraFeed.srcObject = activeStream;
        document.getElementById('activeTargetName').innerText = dso.name;
        document.querySelector('main').style.display = 'none';
        document.querySelector('.app-header').style.display = 'none';
        const actionRow = document.querySelector('.action-row');
        if (actionRow) actionRow.style.display = 'none';
        if (showMoreBtn) showMoreBtn.style.display = 'none';
        cameraUI.style.display = 'block';
        requestWakeLock();
        if ('ondeviceorientationabsolute' in window) window.addEventListener('deviceorientationabsolute', handleAR);
        else window.addEventListener('deviceorientation', handleAR);
    } catch (err) {
        if (activeStream) activeStream.getTracks().forEach((track) => track.stop());
        activeStream = null;
        setARReadout('Sensors unavailable: ' + (err.message || 'check permissions'));
        alert('Unable to start AR: ' + (err.message || 'check camera and motion permissions.'));
    }
}
function closeCamera() {
    if (activeStream) {
        activeStream.getTracks().forEach(track => track.stop());
    }
    const cameraFeed = document.getElementById('cameraFeed');
    cameraFeed.srcObject = null;
    activeStream = null;

    if (wakeLock !== null) {
        wakeLock.release().then(() => wakeLock = null); 
    }

    window.removeEventListener('deviceorientation', handleAR);
    window.removeEventListener('deviceorientationabsolute', handleAR);
    
    document.getElementById('cameraUI').style.display = 'none';
    
    document.querySelector('main').style.display = '';
    document.querySelector('.app-header').style.display = '';
    const actionRow = document.querySelector('.action-row');
    if(actionRow) actionRow.style.display = '';
    
    updateDSOVisibility(); 

    document.getElementById('directionArrow').style.display = 'none';
    document.getElementById('yellowDot').style.display = 'none';
    smoothedAz = null;
    smoothedAlt = null;
}

document.getElementById('backButton').addEventListener('click', closeCamera);
