// ========================================================
// --- 1. THE SOUTHERN DSO DATABASE (LOADING BAY) ---
// ========================================================

const alignmentTargets = [
    { id: "SCP", name: "South Celestial Pole", ra: 0, dec: -90, type: "Alignment", dist: "N/A", season: "All Year", desc: "The exact True South rotational axis of the Earth." },
    { id: "NCP", name: "North Celestial Pole", ra: 0, dec: 90, type: "Alignment", dist: "N/A", season: "All Year", desc: "The exact True North rotational axis of the Earth." }
];

// --- 1. YOUR ORIGINAL 31 TARGETS (Pre-filled for you) ---
const originalBatch = [
    { id: "Rho Oph", name: "Rho Ophiuchi Cloud", ra: 246.7, dec: -24.5, type: "Nebula", dist: "460 ly", season: "Winter", desc: "A massive and incredibly colorful complex of dark, emission, and reflection nebulae." },
    { id: "NGC 3372", name: "Carina Nebula", ra: 161.25, dec: -59.86, type: "Nebula", dist: "8,500 ly", season: "Autumn", desc: "One of the largest diffuse nebulae in our skies." },
    { id: "NGC 5139", name: "Omega Centauri", ra: 201.7, dec: -47.48, type: "Globular Cluster", dist: "15,800 ly", season: "Autumn/Winter", desc: "The largest and brightest globular cluster in the Milky Way." },
    { id: "M 42", name: "Orion Nebula", ra: 83.822, dec: -5.391, type: "Nebula", dist: "1,344 ly", season: "Summer", desc: "The brightest and most famous star-forming region in the sky." },
    { id: "Acrux", name: "Southern Cross", ra: 186.6, dec: -63.1, type: "Open Cluster", dist: "320 ly", season: "Autumn", desc: "The brightest star in the iconic Crux constellation." },
    { id: "C 99", name: "Coalsack Nebula", ra: 193.0, dec: -62.4, type: "Nebula", dist: "600 ly", season: "Autumn", desc: "A massive dark nebula right next to the Southern Cross." },
    { id: "Sh2-276", name: "Barnard's Loop", ra: 86.0, dec: -3.0, type: "Nebula", dist: "1,600 ly", season: "Summer", desc: "A giant emission nebula forming a massive arc." },
    { id: "NGC 2070", name: "Tarantula Nebula", ra: 84.6, dec: -69.1, type: "Nebula", dist: "160,000 ly", season: "Summer", desc: "The most active starburst region known in the Local Group." },
    { id: "NGC 104", name: "47 Tucanae", ra: 6.0, dec: -72.08, type: "Globular Cluster", dist: "13,000 ly", season: "Spring", desc: "The second brightest globular cluster in the sky." },
    { id: "LMC", name: "Large Magellanic Cloud", ra: 80.9, dec: -69.75, type: "Galaxy", dist: "163,000 ly", season: "Summer", desc: "A satellite dwarf galaxy of the Milky Way." },
    { id: "SMC", name: "Small Magellanic Cloud", ra: 13.2, dec: -72.8, type: "Galaxy", dist: "200,000 ly", season: "Spring", desc: "The smaller sibling to the LMC." },
    { id: "NGC 5128", name: "Centaurus A", ra: 201.3, dec: -43.0, type: "Galaxy", dist: "13 Million ly", season: "Autumn", desc: "A massive peculiar galaxy with a thick dust lane." },
    { id: "NGC 4755", name: "Jewel Box Cluster", ra: 193.4, dec: -60.3, type: "Open Cluster", dist: "6,440 ly", season: "Autumn", desc: "A stunning open cluster near the Southern Cross." },
    { id: "M 31", name: "Andromeda Galaxy", ra: 10.684, dec: 41.269, type: "Galaxy", dist: "2.5 Million ly", season: "Spring", desc: "The closest major galaxy to the Milky Way." },
    { id: "M 8", name: "Lagoon Nebula", ra: 270.9, dec: -24.3, type: "Nebula", dist: "4,100 ly", season: "Winter", desc: "A giant interstellar cloud in Sagittarius." },
    { id: "M 20", name: "Trifid Nebula", ra: 270.6, dec: -23.0, type: "Nebula", dist: "5,200 ly", season: "Winter", desc: "A rare combination of emission, reflection, and dark nebula." },
    { id: "M 104", name: "Sombrero Galaxy", ra: 189.9, dec: -11.6, type: "Galaxy", dist: "31.1 Million ly", season: "Autumn", desc: "A spiral galaxy with a brilliant core and thick dust lane." },
    { id: "M 83", name: "Southern Pinwheel", ra: 204.3, dec: -29.8, type: "Galaxy", dist: "15 Million ly", season: "Autumn", desc: "A close and bright barred spiral galaxy." },
    { id: "NGC 253", name: "Sculptor Galaxy", ra: 11.9, dec: -25.28, type: "Galaxy", dist: "11.4 Million ly", season: "Spring", desc: "A spectacular starburst galaxy." },
    { id: "NGC 7293", name: "Helix Nebula", ra: 337.4, dec: -20.8, type: "Nebula", dist: "650 ly", season: "Spring", desc: "One of the closest planetary nebulae, the 'Eye of God'." },
    { id: "M 16", name: "Eagle Nebula", ra: 274.7, dec: -13.8, type: "Nebula", dist: "7,000 ly", season: "Winter", desc: "Famous for the 'Pillars of Creation'." },
    { id: "M 17", name: "Omega Nebula", ra: 275.2, dec: -16.2, type: "Nebula", dist: "5,500 ly", season: "Winter", desc: "Also known as the Swan Nebula." },
    { id: "IC 2602", name: "Southern Pleiades", ra: 160.7, dec: -64.4, type: "Open Cluster", dist: "479 ly", season: "Autumn", desc: "A large, bright open cluster in Carina." },
    { id: "M 93", name: "Messier 93", ra: 116.1, dec: -23.85, type: "Open Cluster", dist: "3,600 ly", season: "Winter", desc: "A dense, bright open cluster in Puppis." },
    { id: "M 41", name: "Little Beehive Cluster", ra: 101.5, dec: -20.7, type: "Open Cluster", dist: "2,300 ly", season: "Summer", desc: "Located just below Sirius in Canis Major." },
    { id: "NGC 3532", name: "Wishing Well Cluster", ra: 166.4, dec: -58.4, type: "Open Cluster", dist: "1,300 ly", season: "Autumn", desc: "Looks like silver coins scattered at the bottom of a well." },
    { id: "NGC 3132", name: "Southern Ring Nebula", ra: 151.8, dec: -40.4, type: "Nebula", dist: "2,000 ly", season: "Autumn", desc: "A bright planetary nebula with a Figure-8 shape." },
    { id: "IC 2944", name: "Running Chicken Nebula", ra: 174.0, dec: -63.0, type: "Nebula", dist: "6,500 ly", season: "Autumn", desc: "An emission nebula with distinct dark Bok globules." },
    { id: "IC 4628", name: "Prawn Nebula", ra: 254.3, dec: -39.8, type: "Nebula", dist: "6,000 ly", season: "Winter", desc: "A massive, faint emission nebula." },
    { id: "NGC 2359", name: "Thor's Helmet", ra: 109.6, dec: -13.2, type: "Nebula", dist: "11,960 ly", season: "Summer", desc: "A complex bubble blown by a Wolf-Rayet star." },
    { id: "NGC 2024", name: "Flame Nebula", ra: 85.4, dec: -1.8, type: "Nebula", dist: "1,350 ly", season: "Summer", desc: "An emission nebula lit by Alnitak." }
];

// --- 2. BATCH 1: GALAXIES ---
const galaxyBatch = [
    // PASTE YOUR 100 GALAXIES HERE (Make sure to paste over this line, keeping the brackets)
];

// --- 3. BATCH 2: NEBULAE ---
const nebulaBatch = [
    // PASTE YOUR 100 NEBULAE HERE
];

// --- 4. BATCH 3: CLUSTERS ---
const clusterBatch = [
    // PASTE YOUR 100 CLUSTERS HERE
];

// --- MAGIC MERGE ---
const dsoDatabase = [...alignmentTargets, ...originalBatch, ...galaxyBatch, ...nebulaBatch, ...clusterBatch];


// ========================================================
// --- CORE APP LOGIC (DO NOT EDIT BELOW THIS LINE) ---
// ========================================================

const icons = {
    "Galaxy": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 1 0 10 10H12V2z"></path><path d="M12 12 2.5 7.5"></path><path d="M12 12l9.5 4.5"></path></svg>`,
    "Nebula": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.5 19c-2.5 0-4-2.5-6.5-2.5S7 19 4.5 19 2 16.5 2 14c0-2.5 2.5-4 5-4s4 2.5 6.5 2.5 4-2.5 6.5-2.5 2.5 2.5 2.5 5c0 2.5-2.5 5-5 5z"></path></svg>`,
    "Globular Cluster": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="2"></circle><circle cx="12" cy="8" r="1"></circle><circle cx="12" cy="16" r="1"></circle><circle cx="8" cy="12" r="1"></circle><circle cx="16" cy="12" r="1"></circle></svg>`,
    "Open Cluster": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="2"></circle><circle cx="12" cy="8" r="1"></circle><circle cx="12" cy="16" r="1"></circle><circle cx="8" cy="12" r="1"></circle><circle cx="16" cy="12" r="1"></circle></svg>`,
    "Alignment": `<svg viewBox="0 0 24 24" fill="none" stroke="#ff4444" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>`
};

let isListExpanded = false; 
let activeCategory = 'All';

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

// Search and Moon Filter
const searchInput = document.getElementById('dsoSearchInput');
const clearBtn = document.getElementById('clearSearchBtn');
const moonToggle = document.getElementById('moonFilterToggle');

if(searchInput) {
    searchInput.addEventListener('input', function() {
        if(clearBtn) clearBtn.style.display = this.value.length > 0 ? 'block' : 'none';
        updateDSOVisibility();
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

function updateDSOVisibility() {
    if (!userLat || !userLon) return;
    const rightNow = new Date();
    
    const sunCoords = getSunPosition(rightNow);
    const sunPos = calculateAltAz(sunCoords.ra, sunCoords.dec, userLat, userLon, rightNow);
    const isNight = sunPos.altitude <= -18; 
    
    const currentSearch = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const isMoonModeActive = moonToggle ? moonToggle.checked : false;

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
            button.classList.remove('dimmed');
            if (position.altitude < 0 && dso.type === 'Alignment') {
                statusText.innerText = "REVERSE ALIGN";
                statusText.className = "dso-status status-warn";
            } else {
                statusText.innerText = "VISIBLE";
                statusText.className = "dso-status status-up";
            }
        }
        
        let categoryMatch = (activeCategory === 'All') || dso.type.includes(activeCategory);
        const isSearchMatch = currentSearch === '' || dso.id.toLowerCase().includes(currentSearch) || dso.name.toLowerCase().includes(currentSearch);
        
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

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            userLat = position.coords.latitude;
            userLon = position.coords.longitude;
            updateDSOVisibility();
        },
        (error) => {
            console.error("GPS Error");
            userLat = -27.58; 
            userLon = 153.03; 
            updateDSOVisibility(); 
        },
        { enableHighAccuracy: true, timeout: 10000 }
    );
}

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

    if (userLat && userLon) {
        const rightNow = new Date();
        const position = calculateAltAz(dso.ra, dso.dec, userLat, userLon, rightNow);
        
        if (position.altitude < 0 && dso.type !== 'Alignment') {
            altDisplay.innerHTML = `Altitude: <span style="color:#ff4444">${position.altitude}°</span>`;
            locateBtn.disabled = true;
            locateBtn.innerText = "Below Horizon";
        } else {
            altDisplay.innerHTML = `Altitude: <span style="color:#00ff00">${position.altitude}°</span>`;
            locateBtn.disabled = false;
            locateBtn.innerText = "Locate in Sky";
        }
    }
    document.getElementById('infoModal').style.display = 'flex';
}

document.getElementById('closeModalBtn').addEventListener('click', () => document.getElementById('infoModal').style.display = 'none');
document.getElementById('locateBtn').addEventListener('click', () => {
    document.getElementById('infoModal').style.display = 'none';
    openCamera(activeDSO);
});

// Camera & AR Radar
let activeStream = null;

function handleAR(event) {
    if (!activeDSO || !userLat || !userLon) return;

    let rawAz = event.webkitCompassHeading || (360 - event.alpha);
    let phoneAz = (rawAz + 11) % 360; 
    let phoneAlt = event.beta - 90; 

    document.getElementById('compassNeedle').style.transform = `rotate(${-phoneAz}deg)`;

    const rightNow = new Date();
    const starPos = calculateAltAz(activeDSO.ra, activeDSO.dec, userLat, userLon, rightNow);

    let rawDeltaAz = starPos.azimuth - phoneAz;
    let deltaAz = ((rawDeltaAz + 180) % 360 + 360) % 360 - 180;
    let deltaAlt = starPos.altitude - phoneAlt;

    const distanceToTarget = Math.sqrt((deltaAz * deltaAz) + (deltaAlt * deltaAlt));

    const dot = document.getElementById('yellowDot');
    const arrow = document.getElementById('directionArrow');

    // 3-Tier Radar
    if (distanceToTarget < 0.8) {
        arrow.style.display = 'none'; 
        dot.style.display = 'block';
        dot.style.backgroundColor = '#00ff00';
        dot.style.boxShadow = '0 0 10px #00ff00, 0 0 20px #00ff00';
    } else if (distanceToTarget < 5) {
        arrow.style.display = 'none'; 
        dot.style.display = 'block';
        dot.style.backgroundColor = '#00aaff';
        dot.style.boxShadow = '0 0 10px #00aaff, 0 0 20px #00aaff';
    } else {
        dot.style.display = 'none';
        arrow.style.display = 'block'; 
        arrow.style.color = '#ff0000';
        arrow.style.textShadow = '0 0 5px #ff0000';

        const angleRad = Math.atan2(deltaAz, deltaAlt);
        const angleDeg = angleRad * R2D;
        
        arrow.style.transform = `translate(-50%, -50%) rotate(${angleDeg}deg) translateY(-80px)`;
    }
}

function openCamera(dso) {
    const cameraUI = document.getElementById('cameraUI');
    const cameraFeed = document.getElementById('cameraFeed');
    
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
            .then(function(stream) {
                activeStream = stream;
                cameraFeed.srcObject = stream;
                document.getElementById('activeTargetName').innerText = dso.name;
                
                document.querySelector('main').style.display = 'none';
                document.querySelector('.app-header').style.display = 'none';
                cameraUI.style.display = 'block';

                if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
                    DeviceOrientationEvent.requestPermission().then(permissionState => {
                        if (permissionState === 'granted') window.addEventListener('deviceorientation', handleAR);
                    }).catch(console.error);
                } else {
                    if ('ondeviceorientationabsolute' in window) window.addEventListener('deviceorientationabsolute', handleAR);
                    else window.addEventListener('deviceorientation', handleAR);
                }
            })
            .catch(err => alert("Camera access denied."));
    }
}

function closeCamera() {
    if (activeStream) activeStream.getTracks().forEach(track => track.stop());
    window.removeEventListener('deviceorientation', handleAR);
    window.removeEventListener('deviceorientationabsolute', handleAR);
    
    document.getElementById('cameraUI').style.display = 'none';
    document.querySelector('main').style.display = 'flex';
    document.querySelector('.app-header').style.display = 'block';
    document.getElementById('directionArrow').style.display = 'none';
    document.getElementById('yellowDot').style.display = 'none';
}

document.getElementById('backButton').addEventListener('click', closeCamera);
