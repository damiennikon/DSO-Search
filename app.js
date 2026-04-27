// --- 1. THE SOUTHERN DSO DATABASE (33 ITEMS) ---
const dsoDatabase = [
    { id: "SCP", name: "South Celestial Pole", ra: 0, dec: -90, type: "Alignment", dist: "N/A", season: "All Year", desc: "The exact True South rotational axis of the Earth." },
    { id: "NCP", name: "North Celestial Pole", ra: 0, dec: 90, type: "Alignment", dist: "N/A", season: "All Year", desc: "The exact True North rotational axis of the Earth. Useful for reverse-boresight alignment in the Southern Hemisphere." },
    { id: "Rho Oph", name: "Rho Ophiuchi Cloud", ra: 246.7, dec: -24.5, type: "Nebula", dist: "460 ly", season: "Winter", desc: "A massive and incredibly colorful complex of dark, emission, and reflection nebulae. A spectacular wide-field target." },
    { id: "NGC 3372", name: "Carina Nebula", ra: 161.25, dec: -59.86, type: "Nebula", dist: "8,500 ly", season: "Autumn", desc: "One of the largest diffuse nebulae in our skies. It is four times as large and even brighter than the famous Orion Nebula." },
    { id: "NGC 5139", name: "Omega Centauri", ra: 201.7, dec: -47.48, type: "Globular Cluster", dist: "15,800 ly", season: "Autumn/Winter", desc: "The largest and brightest globular cluster in the Milky Way, containing approximately 10 million stars." },
    { id: "M 42", name: "Orion Nebula", ra: 83.822, dec: -5.391, type: "Nebula", dist: "1,344 ly", season: "Summer", desc: "The brightest and most famous star-forming region in the sky, located in the sword of Orion." },
    { id: "Acrux", name: "Southern Cross", ra: 186.6, dec: -63.1, type: "Open Cluster", dist: "320 ly", season: "Autumn", desc: "The brightest star in the iconic Crux constellation, commonly used for celestial navigation in the south." },
    { id: "C 99", name: "Coalsack Nebula", ra: 193.0, dec: -62.4, type: "Nebula", dist: "600 ly", season: "Autumn", desc: "A massive, prominent dark nebula that obscures the Milky Way stars right next to the Southern Cross." },
    { id: "Sh2-276", name: "Barnard's Loop", ra: 86.0, dec: -3.0, type: "Nebula", dist: "1,600 ly", season: "Summer", desc: "A giant emission nebula forming a massive semi-circular arc around the constellation of Orion." },
    { id: "NGC 2070", name: "Tarantula Nebula", ra: 84.6, dec: -69.1, type: "Nebula", dist: "160,000 ly", season: "Summer", desc: "Located in the Large Magellanic Cloud, it is the most active starburst region known in the Local Group." },
    { id: "NGC 104", name: "47 Tucanae", ra: 6.0, dec: -72.08, type: "Globular Cluster", dist: "13,000 ly", season: "Spring", desc: "The second brightest globular cluster in the sky, appearing as a dense, bright ball of light." },
    { id: "LMC", name: "Large Magellanic Cloud", ra: 80.9, dec: -69.75, type: "Galaxy", dist: "163,000 ly", season: "Summer", desc: "A satellite dwarf galaxy of the Milky Way, rich in gas, dust, and brilliant star-forming regions." },
    { id: "SMC", name: "Small Magellanic Cloud", ra: 13.2, dec: -72.8, type: "Galaxy", dist: "200,000 ly", season: "Spring", desc: "The smaller sibling to the LMC. Heavily disrupted by gravitational interactions with the Milky Way." },
    { id: "NGC 5128", name: "Centaurus A", ra: 201.3, dec: -43.0, type: "Galaxy", dist: "13 Million ly", season: "Autumn", desc: "A massive peculiar galaxy characterized by a thick, dark dust lane crossing its center." },
    { id: "NGC 4755", name: "Jewel Box Cluster", ra: 193.4, dec: -60.3, type: "Open Cluster", dist: "6,440 ly", season: "Autumn", desc: "A stunning open cluster near the Southern Cross with bright blue supergiants and a solitary red supergiant." },
    { id: "M 31", name: "Andromeda Galaxy", ra: 10.684, dec: 41.269, type: "Galaxy", dist: "2.5 Million ly", season: "Spring", desc: "The closest major galaxy to the Milky Way." },
    { id: "M 8", name: "Lagoon Nebula", ra: 270.9, dec: -24.3, type: "Nebula", dist: "4,100 ly", season: "Winter", desc: "A giant interstellar cloud in the constellation Sagittarius featuring a prominent dark dust lane." },
    { id: "M 20", name: "Trifid Nebula", ra: 270.6, dec: -23.0, type: "Nebula", dist: "5,200 ly", season: "Winter", desc: "A rare combination of an emission nebula, reflection nebula, and dark nebula." },
    { id: "M 104", name: "Sombrero Galaxy", ra: 189.9, dec: -11.6, type: "Galaxy", dist: "31.1 Million ly", season: "Autumn", desc: "An unbarred spiral galaxy featuring a brilliant white, bulbous core and a thick dust lane." },
    { id: "M 83", name: "Southern Pinwheel", ra: 204.3, dec: -29.8, type: "Galaxy", dist: "15 Million ly", season: "Autumn", desc: "One of the closest and brightest barred spiral galaxies in the sky." },
    { id: "NGC 253", name: "Sculptor Galaxy", ra: 11.9, dec: -25.28, type: "Galaxy", dist: "11.4 Million ly", season: "Spring", desc: "A spectacular starburst galaxy with a highly mottled, dusty disk." },
    { id: "NGC 7293", name: "Helix Nebula", ra: 337.4, dec: -20.8, type: "Nebula", dist: "650 ly", season: "Spring", desc: "One of the closest planetary nebulae to Earth, often called the 'Eye of God'." },
    { id: "M 16", name: "Eagle Nebula", ra: 274.7, dec: -13.8, type: "Nebula", dist: "7,000 ly", season: "Winter", desc: "Famous for the 'Pillars of Creation', a towering region of active star formation." },
    { id: "M 17", name: "Omega Nebula", ra: 275.2, dec: -16.2, type: "Nebula", dist: "5,500 ly", season: "Winter", desc: "Also known as the Swan Nebula, a bright star-forming region in Sagittarius." },
    { id: "IC 2602", name: "Southern Pleiades", ra: 160.7, dec: -64.4, type: "Open Cluster", dist: "479 ly", season: "Autumn", desc: "A large, bright open cluster in Carina that makes a fantastic binocular target." },
    { id: "M 93", name: "Messier 93", ra: 116.1, dec: -23.85, type: "Open Cluster", dist: "3,600 ly", season: "Winter", desc: "A dense, bright open cluster in the constellation Puppis." },
    { id: "M 41", name: "Little Beehive Cluster", ra: 101.5, dec: -20.7, type: "Open Cluster", dist: "2,300 ly", season: "Summer", desc: "Located just below Sirius in Canis Major, containing about 100 stars." },
    { id: "NGC 3532", name: "Wishing Well Cluster", ra: 166.4, dec: -58.4, type: "Open Cluster", dist: "1,300 ly", season: "Autumn", desc: "Looks like silver coins scattered at the bottom of a wishing well." },
    { id: "NGC 3132", name: "Southern Ring Nebula", ra: 151.8, dec: -40.4, type: "Nebula", dist: "2,000 ly", season: "Autumn", desc: "A bright planetary nebula with a distinct Figure-8 shape." },
    { id: "IC 2944", name: "Running Chicken Nebula", ra: 174.0, dec: -63.0, type: "Nebula", dist: "6,500 ly", season: "Autumn", desc: "An emission nebula with distinct dark Bok globules silhouetted against glowing gas." },
    { id: "IC 4628", name: "Prawn Nebula", ra: 254.3, dec: -39.8, type: "Nebula", dist: "6,000 ly", season: "Winter", desc: "A massive, faint emission nebula requiring dark skies to image effectively." },
    { id: "NGC 2359", name: "Thor's Helmet", ra: 109.6, dec: -13.2, type: "Nebula", dist: "11,960 ly", season: "Summer", desc: "An incredibly complex bubble blown into space by a massive Wolf-Rayet star." },
    { id: "NGC 2024", name: "Flame Nebula", ra: 85.4, dec: -1.8, type: "Nebula", dist: "1,350 ly", season: "Summer", desc: "An emission nebula lit by Alnitak, the easternmost star in Orion's Belt." }
];

const icons = {
    "Galaxy": `<img src="./Galaxy.png" alt="Galaxy" style="width:100%; height:100%; object-fit:contain; filter: drop-shadow(0 0 3px #ff0000);" />`,
    "Nebula": `<img src="./Nebula.png" alt="Nebula" style="width:100%; height:100%; object-fit:contain; filter: drop-shadow(0 0 3px #ff0000);" />`,
    "Globular Cluster": `<img src="./Cluster.png" alt="Cluster" style="width:100%; height:100%; object-fit:contain; filter: drop-shadow(0 0 3px #ff0000);" />`,
    "Open Cluster": `<img src="./Cluster.png" alt="Cluster" style="width:100%; height:100%; object-fit:contain; filter: drop-shadow(0 0 3px #ff0000);" />`,
    "Alignment": `<svg viewBox="0 0 24 24" fill="none" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:100%; height:100%; filter: drop-shadow(0 0 3px #ff0000);"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>`
};

let isListExpanded = false; 
let activeCategory = 'All';

// --- 2. DYNAMIC DOM RENDERER ---
function renderDSOList() {
    const listContainer = document.getElementById('dsoList');
    listContainer.innerHTML = ''; 

    dsoDatabase.forEach(dso => {
        if (dso.type === 'Alignment') return; // Skip rendering Alignment targets in the main list
        
        const button = document.createElement('button');
        button.className = 'dso-item dimmed'; 
        button.id = `list-target-${dso.id.replace(/\s+/g, '')}`;
        
        button.innerHTML = `
            <div class="dso-icon">${icons[dso.type]}</div>
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

// Search & Clear Button Logic
const searchInput = document.getElementById('dsoSearchInput');
const clearBtn = document.getElementById('clearSearchBtn');

if(searchInput) {
    searchInput.addEventListener('input', function() {
        if(clearBtn) clearBtn.style.display = this.value.length > 0 ? 'flex' : 'none';
        updateDSOVisibility();
    });
}

if(clearBtn) {
    clearBtn.addEventListener('click', function() {
        if(searchInput) searchInput.value = '';
        this.style.display = 'none';
        isListExpanded = false; 
        updateDSOVisibility();
        if(searchInput) searchInput.focus(); 
    });
}

// Category Filter Logic
const categoryButtons = document.querySelectorAll('.cat-btn');
if(categoryButtons) {
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (e.target.id === 'btnNCP' || e.target.id === 'btnSCP') return; // Ignore modal buttons
            categoryButtons.forEach(b => {
                if (b.id !== 'btnNCP' && b.id !== 'btnSCP') b.classList.remove('active');
            });
            e.target.classList.add('active');
            activeCategory = e.target.getAttribute('data-cat');
            isListExpanded = false;
            updateDSOVisibility();
        });
    });
}

// Polar Align Modal Logic
const polarAlignBtn = document.getElementById('polarAlignBtn');
const polarModal = document.getElementById('polarModal');
const closePolarModalBtn = document.getElementById('closePolarModalBtn');
const btnNCP = document.getElementById('btnNCP');
const btnSCP = document.getElementById('btnSCP');

if(polarAlignBtn) polarAlignBtn.addEventListener('click', () => polarModal.style.display = 'flex');
if(closePolarModalBtn) closePolarModalBtn.addEventListener('click', () => polarModal.style.display = 'none');

if(btnNCP) {
    btnNCP.addEventListener('click', () => {
        polarModal.style.display = 'none';
        const target = dsoDatabase.find(d => d.id === 'NCP');
        if(target) openInfoModal(target);
    });
}

if(btnSCP) {
    btnSCP.addEventListener('click', () => {
        polarModal.style.display = 'none';
        const target = dsoDatabase.find(d => d.id === 'SCP');
        if(target) openInfoModal(target);
    });
}

// Show More Button Logic
const showMoreBtn = document.getElementById('showMoreBtn');
if(showMoreBtn) {
    showMoreBtn.addEventListener('click', () => {
        isListExpanded = !isListExpanded;
        updateDSOVisibility();
    });
}

// --- 3. THE MATH ENGINES ---
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

// --- 4. LIVE GPS TRACKING & SHOW MORE LOGIC ---
let userLat = null;
let userLon = null;

function updateDSOVisibility() {
    if (!userLat || !userLon) return;
    const rightNow = new Date();
    
    const sunCoords = getSunPosition(rightNow);
    const sunPos = calculateAltAz(sunCoords.ra, sunCoords.dec, userLat, userLon, rightNow);
    const isNight = sunPos.altitude <= -18; 
    
    const listContainer = document.getElementById('dsoList');
    if(!listContainer) return;

    const existingMsg = document.getElementById('status-msg');
    if (existingMsg) existingMsg.remove();

    const currentSearch = searchInput ? searchInput.value.toLowerCase().trim() : '';

    if (!isNight && currentSearch === '') {
        dsoDatabase.forEach(dso => {
            const targetElement = document.getElementById(`list-target-${dso.id.replace(/\s+/g, '')}`);
            if (targetElement) targetElement.style.display = 'none';
        });
        if(showMoreBtn) showMoreBtn.style.display = 'none';

        const sunMessage = document.createElement('div');
        sunMessage.id = 'status-msg';
        sunMessage.style.color = 'var(--dim-red)';
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
        if (!button) return; // Safely skip Alignment targets since they aren't in the list
        
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
        
        let categoryMatch = false;
        if (activeCategory === 'All') {
            categoryMatch = true;
        } else if (activeCategory === 'Cluster') {
            categoryMatch = dso.type.includes('Cluster');
        } else {
            categoryMatch = dso.type.includes(activeCategory);
        }

        const isSearchMatch = currentSearch === '' || dso.id.toLowerCase().includes(currentSearch) || dso.name.toLowerCase().includes(currentSearch);
        
        const isMatch = categoryMatch && isSearchMatch;
        
        if (isMatch) {
            totalAvailable++;
            
            if (currentSearch !== '') {
                button.style.display = 'flex'; 
            } else {
                if (isListExpanded || visibleIndex < 4) {
                    button.style.display = 'flex';
                } else {
                    button.style.display = 'none';
                }
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
            console.error("GPS Error:", error.message);
            userLat = -27.58; 
            userLon = 153.03; 
            updateDSOVisibility(); 
            
            setTimeout(() => {
                const existingMsg = document.getElementById('status-msg');
                if (existingMsg) {
                    existingMsg.innerHTML += `<br><br><span style="color:#ffaa00; font-size:0.75rem;">(Note: Live GPS signal lost. Using SE QLD fallback location).</span>`;
                }
            }, 100);
        },
        { enableHighAccuracy: true, timeout: 10000 }
    );
} else {
     document.querySelectorAll('.dso-status').forEach(el => {
        el.innerText = "GPS NOT SUPPORTED";
    });
}

// --- 5. INFO MODAL LOGIC ---
let activeDSO = null; 

function openInfoModal(dso) {
    activeDSO = dso;
    
    document.getElementById('modalTitle').innerText = dso.name;
    document.getElementById('modalId').innerText = dso.id;
    document.getElementById('modalIcon').innerHTML = icons[dso.type];
    document.getElementById('modalType').innerText = dso.type;
    document.getElementById('modalDist').innerText = dso.dist;
    document.getElementById('modalSeason').innerText = dso.season;
    document.getElementById('modalDesc').innerText = dso.desc;

    const locateBtn = document.getElementById('locateBtn');
    const altDisplay = document.getElementById('modalAlt');

    if (userLat && userLon) {
        const rightNow = new Date();
        const position = calculateAltAz(dso.ra, dso.dec, userLat, userLon, rightNow);
        const sunCoords = getSunPosition(rightNow);
        const sunPos = calculateAltAz(sunCoords.ra, sunCoords.dec, userLat, userLon, rightNow);
        const isNight = sunPos.altitude <= -18;

        if (position.altitude < 0 && dso.type !== 'Alignment') {
            altDisplay.innerHTML = `Altitude: <span style="color:#ff0000">${position.altitude}°</span> (Underground)`;
            locateBtn.disabled = true;
            locateBtn.innerText = "Below Horizon";
        } else if (!isNight && dso.type !== 'Alignment') {
            altDisplay.innerHTML = `Altitude: <span style="color:#ffaa00">${position.altitude}°</span> (Sun is up)`;
            locateBtn.disabled = true;
            locateBtn.innerText = "Waiting for Nightfall";
        } else {
            if (position.altitude < 0 && dso.type === 'Alignment') {
                altDisplay.innerHTML = `Altitude: <span style="color:#ffaa00">${position.altitude}°</span> (Pointing Down)`;
            } else {
                altDisplay.innerHTML = `Altitude: <span style="color:#00ff00">${position.altitude}°</span>`;
            }
            locateBtn.disabled = false;
            locateBtn.innerText = "Locate in Sky";
        }
    } else {
        altDisplay.innerText = "Waiting for GPS...";
        locateBtn.disabled = true;
    }

    document.getElementById('infoModal').style.display = 'flex';
}

document.getElementById('closeModalBtn').addEventListener('click', () => {
    document.getElementById('infoModal').style.display = 'none';
});

document.getElementById('locateBtn').addEventListener('click', () => {
    document.getElementById('infoModal').style.display = 'none';
    openCamera(activeDSO);
});


// --- 6. CAMERA & RADAR AR ---
let activeStream = null;

function handleAR(event) {
    if (!activeDSO || !userLat || !userLon) return;

    const declinationOffset = 11; 

    let rawAz = event.webkitCompassHeading || (360 - event.alpha);
    let phoneAz = (rawAz + declinationOffset) % 360;
    if (phoneAz < 0) phoneAz += 360; 

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

    if (distanceToTarget < 5) {
        arrow.style.display = 'none'; 
        dot.style.backgroundColor = '#00ff00';
        dot.style.boxShadow = '0 0 15px #00ff00, 0 0 30px #00ff00';
        dot.style.transform = 'translate(-50%, -50%) scale(1.5)';
    } else {
        arrow.style.display = 'block'; 
        dot.style.backgroundColor = '#ffff00';
        dot.style.boxShadow = '0 0 10px #ffff00, 0 0 20px #ffff00';
        dot.style.transform = 'translate(-50%, -50%) scale(1)';

        const angleRad = Math.atan2(deltaAz, deltaAlt);
        const angleDeg = angleRad * R2D;
        arrow.style.transform = `rotate(${angleDeg}deg) translateY(-50px)`;
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
                document.getElementById('yellowDot').style.display = 'block';

                if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
                    DeviceOrientationEvent.requestPermission().then(permissionState => {
                        if (permissionState === 'granted') {
                            window.addEventListener('deviceorientation', handleAR);
                        }
                    }).catch(console.error);
                } else {
                    if ('ondeviceorientationabsolute' in window) {
                        window.addEventListener('deviceorientationabsolute', handleAR);
                    } else {
                        window.addEventListener('deviceorientation', handleAR);
                    }
                }
            })
            .catch(function(error) {
                console.error("Camera error:", error);
                alert("Could not access the camera.");
            });
    }
}

function closeCamera() {
    if (activeStream) {
        activeStream.getTracks().forEach(track => track.stop());
    }
    
    window.removeEventListener('deviceorientation', handleAR);
    window.removeEventListener('deviceorientationabsolute', handleAR);
    
    document.getElementById('cameraUI').style.display = 'none';
    document.querySelector('main').style.display = 'block';
    document.querySelector('.app-header').style.display = 'block';
    
    document.getElementById('directionArrow').style.display = 'none';
    document.getElementById('yellowDot').style.display = 'none';
}

document.getElementById('backButton').addEventListener('click', closeCamera);
document.getElementById('openCalBtn').addEventListener('click', () => { document.getElementById('calOverlay').style.display = 'flex'; });
document.getElementById('closeCalBtn').addEventListener('click', () => { document.getElementById('calOverlay').style.display = 'none'; });

// --- 7. WAKE LOCK (Keeps screen awake while app is open) ---
let wakeLock = null;

async function requestWakeLock() {
    try {
        if ('wakeLock' in navigator) {
            wakeLock = await navigator.wakeLock.request('screen');
            console.log('Screen Wake Lock active');
            
            wakeLock.addEventListener('release', () => {
                console.log('Screen Wake Lock released');
            });
        }
    } catch (err) {
        console.error(`${err.name}, ${err.message}`);
    }
}

requestWakeLock();
document.addEventListener('visibilitychange', async () => {
    if (wakeLock !== null && document.visibilityState === 'visible') {
        requestWakeLock();
    }
});
