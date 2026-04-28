// --- 1. THE SOUTHERN DSO MASTER DATABASE (295 ITEMS) ---
const dsoDatabase = [
    { id: "SCP", name: "South Celestial Pole", ra: 0, dec: -90, type: "Alignment", dist: "N/A", season: "All Year", desc: "The exact True South rotational axis of the Earth." },
    { id: "NCP", name: "North Celestial Pole", ra: 0, dec: 90, type: "Alignment", dist: "N/A", season: "All Year", desc: "The exact True North rotational axis of the Earth. Useful for reverse-boresight alignment in the Southern Hemisphere." },
    { id: "NGC 55", name: "Sculptor Group Galaxy", ra: 3.75, dec: -39.19, type: "Galaxy", dist: "6.5 Million ly", season: "Spring", desc: "A prominent edge-on barred spiral galaxy in the Sculptor group." },
    { id: "NGC 247", name: "Sculptor Galaxy", ra: 11.78, dec: -20.76, type: "Galaxy", dist: "11.1 Million ly", season: "Spring", desc: "An intermediate spiral galaxy, highly inclined to our line of sight." },
    { id: "NGC 300", name: "Sculptor Galaxy", ra: 13.72, dec: -37.68, type: "Galaxy", dist: "6.1 Million ly", season: "Spring", desc: "A classic face-on spiral galaxy, one of the closest to the Local Group." },
    { id: "NGC 7793", name: "Sculptor Galaxy", ra: 359.45, dec: -32.59, type: "Galaxy", dist: "12.2 Million ly", season: "Spring", desc: "A flocculent spiral galaxy with a chaotic, unorganized spiral pattern." },
    { id: "NGC 1097", name: "Barred Spiral Galaxy", ra: 41.58, dec: -31.64, type: "Galaxy", dist: "45 Million ly", season: "Summer", desc: "A spectacular barred spiral with a supermassive black hole at its core." },
    { id: "NGC 1365", name: "Great Barred Spiral", ra: 53.40, dec: -36.14, type: "Galaxy", dist: "56 Million ly", season: "Summer", desc: "One of the largest and most striking barred spiral galaxies in the sky." },
    { id: "NGC 1316", name: "Fornax A", ra: 50.67, dec: -37.20, type: "Galaxy", dist: "60 Million ly", season: "Summer", desc: "A giant lenticular galaxy and an incredibly strong radio source." },
    { id: "NGC 1399", name: "Fornax Cluster Core", ra: 54.62, dec: -35.45, type: "Galaxy", dist: "65 Million ly", season: "Summer", desc: "The central, massive elliptical galaxy of the Fornax Cluster." },
    { id: "NGC 1404", name: "Elliptical Galaxy", ra: 54.73, dec: -35.59, type: "Galaxy", dist: "65 Million ly", season: "Summer", desc: "A bright elliptical galaxy falling towards the center of the Fornax cluster." },
    { id: "NGC 1427A", name: "Irregular Galaxy", ra: 55.05, dec: -35.62, type: "Galaxy", dist: "52 Million ly", season: "Summer", desc: "An irregular galaxy being distorted by its plunge into the Fornax cluster." },
    { id: "NGC 1433", name: "Ringed Galaxy", ra: 55.51, dec: -47.22, type: "Galaxy", dist: "30 Million ly", season: "Summer", desc: "A beautiful barred spiral featuring a prominent double ring structure." },
    { id: "NGC 1512", name: "Barred Spiral Galaxy", ra: 60.98, dec: -43.35, type: "Galaxy", dist: "38 Million ly", season: "Summer", desc: "Features an intricate circumnuclear starburst ring." },
    { id: "NGC 1566", name: "Spanish Dancer Galaxy", ra: 65.00, dec: -54.94, type: "Galaxy", dist: "40 Million ly", season: "Summer", desc: "A striking, grand-design face-on spiral galaxy in the Dorado group." },
    { id: "NGC 1672", name: "Barred Spiral", ra: 71.43, dec: -59.25, type: "Galaxy", dist: "60 Million ly", season: "Summer", desc: "A highly active barred spiral with intense star formation in its central bar." },
    { id: "NGC 1792", name: "Spiral Galaxy", ra: 76.32, dec: -37.98, type: "Galaxy", dist: "50 Million ly", season: "Summer", desc: "A starburst spiral galaxy, very luminous in infrared light." },
    { id: "NGC 1808", name: "Starburst Galaxy", ra: 76.93, dec: -37.51, type: "Galaxy", dist: "40 Million ly", season: "Summer", desc: "A Seyfert galaxy currently undergoing a massive wave of star formation." },
    { id: "NGC 2442", name: "Meathook Galaxy", ra: 114.07, dec: -69.53, type: "Galaxy", dist: "50 Million ly", season: "Autumn", desc: "An asymmetric barred spiral with one elongated, hook-like arm." },
    { id: "NGC 2997", name: "Spiral Galaxy", ra: 146.41, dec: -31.19, type: "Galaxy", dist: "40 Million ly", season: "Autumn", desc: "An unbarred, grand-design spiral galaxy facing almost perfectly edge-on." },
    { id: "NGC 3109", name: "Dwarf Galaxy", ra: 151.05, dec: -26.16, type: "Galaxy", dist: "4.3 Million ly", season: "Autumn", desc: "A small Magellanic-type irregular galaxy just outside the Local Group." },
    { id: "NGC 4038", name: "Antennae Galaxies (A)", ra: 180.47, dec: -18.87, type: "Galaxy", dist: "45 Million ly", season: "Winter", desc: "Half of a spectacular pair of colliding galaxies ejecting long tidal tails." },
    { id: "NGC 4039", name: "Antennae Galaxies (B)", ra: 180.47, dec: -18.88, type: "Galaxy", dist: "45 Million ly", season: "Winter", desc: "The interacting partner to NGC 4038 in the famous Antennae pair." },
    { id: "NGC 4945", name: "Spiral Galaxy", ra: 196.36, dec: -49.47, type: "Galaxy", dist: "11.7 Million ly", season: "Winter", desc: "A barred spiral galaxy seen edge-on, hiding an active Seyfert nucleus." },
    { id: "NGC 4993", name: "Lenticular Galaxy", ra: 197.45, dec: -23.38, type: "Galaxy", dist: "130 Million ly", season: "Winter", desc: "Famous for hosting the first observed gravitational wave kilonova event." },
    { id: "NGC 5253", name: "Irregular Galaxy", ra: 204.98, dec: -31.64, type: "Galaxy", dist: "10.9 Million ly", season: "Winter", desc: "A blue compact dwarf galaxy with a powerful starburst core." },
    { id: "NGC 6744", name: "Milky Way Twin", ra: 287.44, dec: -63.85, type: "Galaxy", dist: "30 Million ly", season: "Spring", desc: "One of the most Milky Way-like spiral galaxies visible in our sky." },
    { id: "NGC 6753", name: "Spiral Galaxy", ra: 288.04, dec: -57.04, type: "Galaxy", dist: "150 Million ly", season: "Spring", desc: "A nearly perfect face-on spiral galaxy with a massive corona." },
    { id: "NGC 6814", name: "Seyfert Galaxy", ra: 295.67, dec: -10.32, type: "Galaxy", dist: "75 Million ly", season: "Spring", desc: "A face-on grand-design spiral with a highly variable active galactic nucleus." },
    { id: "NGC 7424", name: "Spiral Galaxy", ra: 344.34, dec: -41.07, type: "Galaxy", dist: "37.5 Million ly", season: "Spring", desc: "A beautiful face-on spiral galaxy similar in appearance to M83." },
    { id: "NGC 7552", name: "Grus Quartet Galaxy", ra: 349.03, dec: -42.58, type: "Galaxy", dist: "60 Million ly", season: "Spring", desc: "A barred spiral forming part of the famous Grus Quartet." },
    { id: "NGC 7582", name: "Grus Quartet Galaxy", ra: 349.60, dec: -42.37, type: "Galaxy", dist: "60 Million ly", season: "Spring", desc: "A highly inclined Seyfert 2 galaxy in the Grus Quartet." },
    { id: "IC 1459", name: "Elliptical Galaxy", ra: 344.31, dec: -36.46, type: "Galaxy", dist: "68 Million ly", season: "Spring", desc: "A massive elliptical galaxy with a rapidly rotating, counter-spinning core." },
    { id: "IC 1954", name: "Spiral Galaxy", ra: 52.92, dec: -51.90, type: "Galaxy", dist: "45 Million ly", season: "Summer", desc: "A beautifully structured barred spiral in the constellation Reticulum." },
    { id: "IC 2531", name: "Edge-on Galaxy", ra: 149.93, dec: -29.61, type: "Galaxy", dist: "100 Million ly", season: "Autumn", desc: "A super-thin, edge-on spiral galaxy with a pronounced central dust lane." },
    { id: "IC 2559", name: "Spiral Galaxy", ra: 153.69, dec: -34.85, type: "Galaxy", dist: "60 Million ly", season: "Autumn", desc: "A star-forming barred spiral in the Antlia cluster." },
    { id: "IC 2604", name: "Galaxy", ra: 160.75, dec: -64.45, type: "Galaxy", dist: "65 Million ly", season: "Autumn", desc: "A faint, diffuse spiral galaxy near the Southern Pleiades." },
    { id: "IC 4662", name: "Irregular Galaxy", ra: 262.96, dec: -64.64, type: "Galaxy", dist: "8 Million ly", season: "Winter", desc: "A dwarf irregular galaxy undergoing vigorous starburst activity." },
    { id: "ESO 137-001", name: "Jellyfish Galaxy", ra: 243.34, dec: -60.76, type: "Galaxy", dist: "220 Million ly", season: "Winter", desc: "A spectacular galaxy being stripped of its gas as it falls into the Norma cluster." },
    { id: "ESO 243-49", name: "HLX-1 Host Galaxy", ra: 20.35, dec: -46.06, type: "Galaxy", dist: "290 Million ly", season: "Spring", desc: "An edge-on S0 galaxy hosting the famous hyper-luminous X-ray source HLX-1." },
    { id: "NGC 45", name: "Spiral Galaxy", ra: 3.51, dec: -23.18, type: "Galaxy", dist: "22 Million ly", season: "Spring", desc: "A low surface brightness spiral galaxy in the constellation Cetus." },
    { id: "NGC 134", name: "Spiral Galaxy", ra: 7.57, dec: -33.25, type: "Galaxy", dist: "60 Million ly", season: "Spring", desc: "A tilted spiral galaxy resembling a smaller version of the Milky Way." },
    { id: "NGC 1487", name: "Interacting Galaxy", ra: 58.91, dec: -42.37, type: "Galaxy", dist: "30 Million ly", season: "Summer", desc: "Actually a merging system of two or three dwarf galaxies." },
    { id: "NGC 1553", name: "Lenticular Galaxy", ra: 64.04, dec: -55.78, type: "Galaxy", dist: "45 Million ly", season: "Summer", desc: "The second brightest member of the Dorado group of galaxies." },
    { id: "NGC 1705", name: "Dwarf Galaxy", ra: 73.55, dec: -53.36, type: "Galaxy", dist: "17 Million ly", season: "Summer", desc: "A blue compact dwarf galaxy with a massive central star cluster." },
    { id: "NGC 1744", name: "Spiral Galaxy", ra: 74.99, dec: -26.02, type: "Galaxy", dist: "30 Million ly", season: "Summer", desc: "A faint, unbarred spiral galaxy in the constellation Lepus." },
    { id: "NGC 2188", name: "Edge-on Galaxy", ra: 92.51, dec: -34.10, type: "Galaxy", dist: "25 Million ly", season: "Summer", desc: "A highly tilted barred spiral that looks like a thin sliver of light." },
    { id: "NGC 2835", name: "Spiral Galaxy", ra: 139.46, dec: -22.35, type: "Galaxy", dist: "35 Million ly", season: "Autumn", desc: "An intermediate spiral galaxy with four distinct spiral arms." },
    { id: "NGC 3059", name: "Barred Spiral", ra: 147.60, dec: -73.92, type: "Galaxy", dist: "55 Million ly", season: "Autumn", desc: "A barred spiral galaxy located deep in the southern sky in Carina." },
    { id: "NGC 3175", name: "Spiral Galaxy", ra: 153.68, dec: -28.87, type: "Galaxy", dist: "50 Million ly", season: "Autumn", desc: "A spiral galaxy showing a thick slice of dust and gas along its edge." },
    { id: "NGC 3256", name: "Merger Galaxy", ra: 156.96, dec: -43.90, type: "Galaxy", dist: "100 Million ly", season: "Autumn", desc: "The spectacular distorted wreckage of two colliding spiral galaxies." },
    { id: "NGC 3621", name: "Spiral Galaxy", ra: 169.56, dec: -32.81, type: "Galaxy", dist: "22 Million ly", season: "Autumn", desc: "A pure-disk spiral galaxy lacking a central bulge." },
    { id: "NGC 3887", name: "Spiral Galaxy", ra: 176.76, dec: -16.85, type: "Galaxy", dist: "60 Million ly", season: "Winter", desc: "A barred spiral galaxy with loosely wound arms." },
    { id: "NGC 3923", name: "Shell Galaxy", ra: 177.75, dec: -28.80, type: "Galaxy", dist: "90 Million ly", season: "Winter", desc: "An elliptical galaxy famous for its concentric, ripple-like shells of stars." },
    { id: "NGC 4244", name: "Edge-on Galaxy", ra: 184.37, dec: -27.42, type: "Galaxy", dist: "14 Million ly", season: "Winter", desc: "Often called the Silver Needle Galaxy, a bright edge-on spiral." },
    { id: "NGC 4365", name: "Elliptical Galaxy", ra: 186.11, dec: -27.18, type: "Galaxy", dist: "75 Million ly", season: "Winter", desc: "A giant elliptical galaxy within the Virgo Cluster." },
    { id: "NGC 4631", name: "Whale Galaxy", ra: 190.53, dec: 32.54, type: "Galaxy", dist: "30 Million ly", season: "Winter", desc: "A massive, wedge-shaped edge-on spiral that resembles a cosmic whale." },
    { id: "NGC 4941", name: "Spiral Galaxy", ra: 196.06, dec: -5.55, type: "Galaxy", dist: "40 Million ly", season: "Winter", desc: "A spiral galaxy hosting a Seyfert 2 active galactic nucleus." },
    { id: "NGC 5068", name: "Spiral Galaxy", ra: 199.72, dec: -21.03, type: "Galaxy", dist: "17 Million ly", season: "Winter", desc: "A face-on barred spiral galaxy in Virgo." },
    { id: "NGC 5102", name: "Lenticular Galaxy", ra: 200.48, dec: -36.63, type: "Galaxy", dist: "12 Million ly", season: "Winter", desc: "A bright lenticular galaxy situated very close to the star Iota Centauri." },
    { id: "NGC 5257", name: "Interacting Galaxy", ra: 204.96, dec: 0.84, type: "Galaxy", dist: "300 Million ly", season: "Winter", desc: "Part of the interacting galaxy pair known as Arp 240." },
    { id: "NGC 5426", name: "Galaxy Pair", ra: 210.85, dec: -6.06, type: "Galaxy", dist: "90 Million ly", season: "Winter", desc: "An interacting pair of similar-sized spiral galaxies." },
    { id: "NGC 5643", name: "Spiral Galaxy", ra: 218.16, dec: -44.17, type: "Galaxy", dist: "55 Million ly", season: "Winter", desc: "A barred spiral Seyfert galaxy in the constellation Lupus." },
    { id: "NGC 6300", name: "Seyfert Galaxy", ra: 259.23, dec: -62.82, type: "Galaxy", dist: "50 Million ly", season: "Winter", desc: "A ringed barred spiral galaxy actively consuming surrounding gas." },
    { id: "NGC 6782", name: "Ring Galaxy", ra: 288.47, dec: -59.91, type: "Galaxy", dist: "180 Million ly", season: "Spring", desc: "A stunning galaxy with tightly wound arms that form a nearly perfect ring." },
    { id: "NGC 6902", name: "Spiral Galaxy", ra: 306.13, dec: -43.65, type: "Galaxy", dist: "130 Million ly", season: "Spring", desc: "A spiral galaxy featuring an inner ring structure." },
    { id: "NGC 7049", name: "Ring Galaxy", ra: 317.26, dec: -48.56, type: "Galaxy", dist: "100 Million ly", season: "Spring", desc: "An unusual lenticular galaxy with prominent, backlit dust rings." },
    { id: "NGC 7090", name: "Edge-on Galaxy", ra: 324.08, dec: -54.55, type: "Galaxy", dist: "30 Million ly", season: "Spring", desc: "An active, edge-on spiral galaxy rich in star-forming regions." },
    { id: "NGC 7418", name: "Spiral Galaxy", ra: 344.20, dec: -37.03, type: "Galaxy", dist: "60 Million ly", season: "Spring", desc: "An intermediate spiral galaxy located in the constellation Grus." },
    { id: "NGC 7456", name: "Spiral Galaxy", ra: 345.54, dec: -39.57, type: "Galaxy", dist: "50 Million ly", season: "Spring", desc: "A faint, highly inclined spiral galaxy." },
    { id: "NGC 7496", name: "Barred Spiral", ra: 347.43, dec: -43.42, type: "Galaxy", dist: "75 Million ly", season: "Spring", desc: "A Seyfert galaxy with prominent dust lanes crossing its central bar." },
    { id: "NGC 7589", name: "Galaxy", ra: 349.69, dec: -32.57, type: "Galaxy", dist: "400 Million ly", season: "Spring", desc: "A distant spiral galaxy located far into the southern sky." },
    { id: "IC 1613", name: "Local Group Galaxy", ra: 16.19, dec: 2.13, type: "Galaxy", dist: "2.3 Million ly", season: "Spring", desc: "A faint dwarf irregular galaxy within our Local Group." },
    { id: "IC 5201", name: "Spiral Galaxy", ra: 335.25, dec: -46.03, type: "Galaxy", dist: "40 Million ly", season: "Spring", desc: "A highly barred spiral galaxy that is actively forming stars." },
    { id: "ESO 274-01", name: "Galaxy", ra: 206.50, dec: -45.10, type: "Galaxy", dist: "80 Million ly", season: "Winter", desc: "A classic example of a southern spiral galaxy in the ESO catalog." },
    { id: "ESO 540-030", name: "Dwarf Galaxy", ra: 13.91, dec: -19.06, type: "Galaxy", dist: "11 Million ly", season: "Spring", desc: "A tiny dwarf galaxy residing in the Sculptor Group." },
    { id: "PGC 143", name: "Galaxy", ra: 0.65, dec: -45.00, type: "Galaxy", dist: "Unknown", season: "Spring", desc: "A very faint background galaxy identified by the Principal Galaxies Catalog." },
    { id: "PGC 293", name: "Galaxy", ra: 1.15, dec: -30.00, type: "Galaxy", dist: "Unknown", season: "Spring", desc: "An obscure PGC galaxy target suitable for deep exposures." },
    { id: "PGC 51659", name: "Galaxy", ra: 216.50, dec: -42.10, type: "Galaxy", dist: "Unknown", season: "Winter", desc: "A deep sky galaxy entry in the PGC catalog." },
    { id: "PGC 70081", name: "Galaxy", ra: 345.10, dec: -55.20, type: "Galaxy", dist: "Unknown", season: "Spring", desc: "A faint southern galaxy requiring significant integration time." },
    { id: "PGC 164", name: "Galaxy", ra: 0.85, dec: -35.15, type: "Galaxy", dist: "Unknown", season: "Spring", desc: "A minor galaxy target in the southern hemisphere." },
    { id: "PGC 2557", name: "Galaxy", ra: 10.50, dec: -28.40, type: "Galaxy", dist: "Unknown", season: "Spring", desc: "A faint PGC entry for wide-field background sweeps." },
    { id: "PGC 3775", name: "Galaxy", ra: 15.20, dec: -40.60, type: "Galaxy", dist: "Unknown", season: "Spring", desc: "A distant southern galaxy cataloged in the PGC." },
    { id: "PGC 6003", name: "Galaxy", ra: 24.10, dec: -50.10, type: "Galaxy", dist: "Unknown", season: "Summer", desc: "A faint background galaxy deep in the southern sky." },
    { id: "PGC 10018", name: "Galaxy", ra: 38.50, dec: -30.00, type: "Galaxy", dist: "Unknown", season: "Summer", desc: "A minor deep sky target identified in the Principal Galaxies Catalog." },
    { id: "PGC 14084", name: "Galaxy", ra: 56.40, dec: -45.50, type: "Galaxy", dist: "Unknown", season: "Summer", desc: "An obscure southern galaxy target." },
    { id: "PGC 18271", name: "Galaxy", ra: 85.20, dec: -60.10, type: "Galaxy", dist: "Unknown", season: "Summer", desc: "A distant galaxy for deep southern astrophotography." },
    { id: "PGC 21928", name: "Galaxy", ra: 115.60, dec: -75.40, type: "Galaxy", dist: "Unknown", season: "Autumn", desc: "A very far southern galaxy requiring dark skies to capture." },
    { id: "PGC 25448", name: "Galaxy", ra: 135.80, dec: -55.20, type: "Galaxy", dist: "Unknown", season: "Autumn", desc: "A faint PGC galaxy." },
    { id: "PGC 29028", name: "Galaxy", ra: 150.10, dec: -40.80, type: "Galaxy", dist: "Unknown", season: "Autumn", desc: "A background target in the southern sky." },
    { id: "PGC 32588", name: "Galaxy", ra: 165.30, dec: -35.60, type: "Galaxy", dist: "Unknown", season: "Autumn", desc: "An obscure catalog entry." },
    { id: "PGC 36192", name: "Galaxy", ra: 175.80, dec: -50.40, type: "Galaxy", dist: "Unknown", season: "Winter", desc: "A faint deep sky galaxy." },
    { id: "PGC 39837", name: "Galaxy", ra: 185.90, dec: -65.10, type: "Galaxy", dist: "Unknown", season: "Winter", desc: "A deep southern PGC galaxy." },
    { id: "PGC 43465", name: "Galaxy", ra: 195.40, dec: -30.50, type: "Galaxy", dist: "Unknown", season: "Winter", desc: "A minor background target." },
    { id: "PGC 47027", name: "Galaxy", ra: 205.10, dec: -45.20, type: "Galaxy", dist: "Unknown", season: "Winter", desc: "A faint southern galaxy." },
    { id: "PGC 50679", name: "Galaxy", ra: 215.80, dec: -55.80, type: "Galaxy", dist: "Unknown", season: "Winter", desc: "A deep catalog entry for long exposures." },
    { id: "PGC 54214", name: "Galaxy", ra: 228.30, dec: -70.40, type: "Galaxy", dist: "Unknown", season: "Spring", desc: "A very faint background galaxy." },
    { id: "PGC 57841", name: "Galaxy", ra: 245.60, dec: -40.10, type: "Galaxy", dist: "Unknown", season: "Spring", desc: "An obscure southern sky object." },
    { id: "PGC 61492", name: "Galaxy", ra: 270.20, dec: -35.50, type: "Galaxy", dist: "Unknown", season: "Spring", desc: "A faint PGC galaxy." },
    { id: "PGC 65128", name: "Galaxy", ra: 305.80, dec: -50.20, type: "Galaxy", dist: "Unknown", season: "Spring", desc: "A background target." },
    { id: "PGC 68741", name: "Galaxy", ra: 335.40, dec: -60.80, type: "Galaxy", dist: "Unknown", season: "Spring", desc: "A minor deep sky target." },
    { id: "PGC 72390", name: "Galaxy", ra: 355.90, dec: -45.60, type: "Galaxy", dist: "Unknown", season: "Spring", desc: "The final galaxy entry from the PGC catalog in this batch." },
    { id: "NGC 2467", name: "Skull and Crossbones Nebula", ra: 118.17, dec: -26.39, type: "Nebula", dist: "13,000 ly", season: "Summer", desc: "A highly active stellar nursery with a striking resemblance to a skull." },
    { id: "NGC 2626", name: "Reflection Nebula", ra: 128.85, dec: -40.67, type: "Nebula", dist: "3,300 ly", season: "Summer", desc: "A beautiful reflection nebula illuminated by a young, hot star." },
    { id: "NGC 2736", name: "Pencil Nebula", ra: 135.00, dec: -45.94, type: "Nebula", dist: "815 ly", season: "Autumn", desc: "A linear remnant of the Vela Supernova, glowing with shocked gas." },
    { id: "NGC 3199", name: "Wolf-Rayet Nebula", ra: 154.34, dec: -57.90, type: "Nebula", dist: "12,000 ly", season: "Autumn", desc: "A glowing crescent of gas swept up by the intense winds of a massive star." },
    { id: "NGC 3324", name: "Gabriela Mistral Nebula", ra: 159.25, dec: -58.65, type: "Nebula", dist: "7,200 ly", season: "Autumn", desc: "A star-forming region on the edge of the Carina Nebula resembling a human profile." },
    { id: "NGC 3503", name: "Emission Nebula", ra: 165.34, dec: -59.84, type: "Nebula", dist: "9,500 ly", season: "Autumn", desc: "A small, bright emission nebula often overshadowed by its larger Carina neighbors." },
    { id: "NGC 3576", name: "Statue of Liberty Nebula", ra: 167.92, dec: -61.23, type: "Nebula", dist: "9,000 ly", season: "Autumn", desc: "A massive H II region with complex, sweeping loops of glowing gas." },
    { id: "NGC 3581", name: "Emission Nebula", ra: 168.04, dec: -61.30, type: "Nebula", dist: "9,000 ly", season: "Autumn", desc: "Part of the larger RCW 57 complex, closely associated with NGC 3576." },
    { id: "NGC 3603", name: "Starburst Nebula", ra: 168.61, dec: -61.26, type: "Nebula", dist: "20,000 ly", season: "Autumn", desc: "One of the most massive visible H II regions in the Milky Way." },
    { id: "NGC 3699", name: "Emission Nebula", ra: 171.95, dec: -59.95, type: "Nebula", dist: "10,000 ly", season: "Autumn", desc: "A bright planetary nebula exhibiting an irregular, disrupted shell." },
    { id: "NGC 3717", name: "Spiral Galaxy", ra: 172.95, dec: -30.31, type: "Galaxy", dist: "60 Million ly", season: "Autumn", desc: "An edge-on spiral galaxy showing a thick band of absorbing dust." },
    { id: "NGC 3918", name: "Blue Planetary", ra: 177.53, dec: -57.18, type: "Nebula", dist: "4,900 ly", season: "Autumn", desc: "A bright planetary nebula with a rich blue hue, resembling Neptune." },
    { id: "NGC 5189", name: "Spiral Planetary", ra: 203.32, dec: -65.97, type: "Nebula", dist: "3,000 ly", season: "Winter", desc: "A highly complex planetary nebula with a twisted, S-shaped structure." },
    { id: "NGC 5307", name: "Planetary Nebula", ra: 207.78, dec: -51.16, type: "Nebula", dist: "10,000 ly", season: "Winter", desc: "A planetary nebula showing highly symmetrical, point-symmetric structure." },
    { id: "NGC 5882", name: "Planetary Nebula", ra: 229.15, dec: -45.65, type: "Nebula", dist: "7,700 ly", season: "Winter", desc: "A small, bright planetary nebula with an inner elongated shell." },
    { id: "NGC 5979", name: "Planetary Nebula", ra: 236.93, dec: -61.22, type: "Nebula", dist: "11,000 ly", season: "Winter", desc: "A compact planetary nebula in the constellation Triangulum Australe." },
    { id: "NGC 602", name: "SMC Nebula", ra: 22.45, dec: -73.56, type: "Nebula", dist: "196,000 ly", season: "Spring", desc: "A young, bright open cluster and emission nebula in the Small Magellanic Cloud." },
    { id: "NGC 6164", name: "Dragon's Egg Nebula", ra: 248.45, dec: -48.14, type: "Nebula", dist: "4,200 ly", season: "Winter", desc: "A bipolar emission nebula created by the massive O-type star HD 148937." },
    { id: "NGC 6165", name: "Dragon's Egg Nebula", ra: 248.46, dec: -48.16, type: "Nebula", dist: "4,200 ly", season: "Winter", desc: "The southern lobe of the Dragon's Egg bipolar nebula." },
    { id: "NGC 6302", name: "Bug Nebula", ra: 258.45, dec: -37.10, type: "Nebula", dist: "3,400 ly", season: "Winter", desc: "A stunning bipolar planetary nebula with highly complex dust structures." },
    { id: "NGC 6334", name: "Cat's Paw Nebula", ra: 259.35, dec: -36.10, type: "Nebula", dist: "5,500 ly", season: "Winter", desc: "A massive star-forming region featuring huge, glowing red bubbles of gas." },
    { id: "NGC 6357", name: "Lobster Nebula", ra: 261.07, dec: -34.20, type: "Nebula", dist: "5,500 ly", season: "Winter", desc: "A sprawling emission nebula housing the massive star cluster Pismis 24." },
    { id: "NGC 6369", name: "Little Ghost Nebula", ra: 262.35, dec: -23.76, type: "Nebula", dist: "3,300 ly", season: "Winter", desc: "A faint planetary nebula with a distinct, ghostly ring-like appearance." },
    { id: "NGC 6729", name: "Corona Australis Nebula", ra: 285.45, dec: -36.95, type: "Nebula", dist: "420 ly", season: "Spring", desc: "A variable reflection/emission nebula powered by the star R Coronae Australis." },
    { id: "NGC 6751", name: "Glowing Eye Nebula", ra: 285.12, dec: -5.99, type: "Nebula", dist: "6,500 ly", season: "Spring", desc: "A beautiful planetary nebula resembling an iris." },
    { id: "NGC 6781", name: "Planetary Nebula", ra: 289.58, dec: 6.54, type: "Nebula", dist: "2,500 ly", season: "Spring", desc: "A large, faint, bubble-like planetary nebula in Aquila." },
    { id: "NGC 6804", name: "Planetary Nebula", ra: 292.90, dec: 9.22, type: "Nebula", dist: "4,200 ly", season: "Spring", desc: "A compact planetary nebula." },
    { id: "NGC 6826", name: "Blinking Planetary", ra: 296.18, dec: 50.52, type: "Nebula", dist: "2,200 ly", season: "Spring", desc: "An illusion makes the nebula appear to blink when looking directly at its central star." },
    { id: "NGC 6853", name: "Dumbbell Nebula", ra: 299.90, dec: 22.72, type: "Nebula", dist: "1,360 ly", season: "Spring", desc: "A massive, prominent planetary nebula shaped like an hourglass or dumbbell." },
    { id: "NGC 6884", name: "Planetary Nebula", ra: 302.60, dec: 46.46, type: "Nebula", dist: "6,500 ly", season: "Spring", desc: "A very young and compact planetary nebula." },
    { id: "NGC 6891", name: "Planetary Nebula", ra: 303.80, dec: 12.71, type: "Nebula", dist: "7,200 ly", season: "Spring", desc: "A bright, asymmetric planetary nebula." },
    { id: "NGC 7026", name: "Planetary Nebula", ra: 316.55, dec: 47.85, type: "Nebula", dist: "6,000 ly", season: "Spring", desc: "A bipolar planetary nebula resembling a butterfly." },
    { id: "IC 2177", name: "Seagull Nebula", ra: 106.12, dec: -10.64, type: "Nebula", dist: "3,650 ly", season: "Summer", desc: "A large region of nebulosity marking the head and wings of the Seagull." },
    { id: "IC 2220", name: "Toby Jug Nebula", ra: 119.12, dec: -59.13, type: "Nebula", dist: "1,200 ly", season: "Summer", desc: "A distinctive reflection nebula surrounding a red giant star." },
    { id: "IC 405", name: "Flaming Star Nebula", ra: 79.05, dec: 34.27, type: "Nebula", dist: "1,500 ly", season: "Summer", desc: "An emission/reflection nebula illuminated by the runaway star AE Aurigae." },
    { id: "IC 410", name: "Tadpoles Nebula", ra: 79.10, dec: 33.40, type: "Nebula", dist: "12,000 ly", season: "Summer", desc: "An emission nebula harboring massive dust pillars shaped like tadpoles." },
    { id: "IC 418", name: "Spirograph Nebula", ra: 81.82, dec: -12.69, type: "Nebula", dist: "3,600 ly", season: "Summer", desc: "A young planetary nebula with intricate, geometric textural patterns." },
    { id: "IC 4406", name: "Retina Nebula", ra: 243.60, dec: -44.38, type: "Nebula", dist: "2,000 ly", season: "Winter", desc: "A cylindrical planetary nebula viewed from the side." },
    { id: "IC 4592", name: "Blue Horsehead", ra: 242.98, dec: -19.46, type: "Nebula", dist: "400 ly", season: "Winter", desc: "A large reflection nebula illuminated by Nu Scorpii." },
    { id: "IC 4634", name: "Nebula", ra: 255.40, dec: -21.83, type: "Nebula", dist: "7,500 ly", season: "Winter", desc: "A small planetary nebula showing S-shaped point-symmetric structure." },
    { id: "IC 4637", name: "Nebula", ra: 256.40, dec: -40.80, type: "Nebula", dist: "8,000 ly", season: "Winter", desc: "A compact deep sky nebula." },
    { id: "IC 4678", name: "Nebula", ra: 262.15, dec: -23.95, type: "Nebula", dist: "5,000 ly", season: "Winter", desc: "An emission nebula near the Trifid Nebula complex." },
    { id: "IC 4685", name: "Lagoon Extension", ra: 272.25, dec: -23.98, type: "Nebula", dist: "4,100 ly", season: "Winter", desc: "A bright patch of nebulosity associated with the Lagoon Nebula." },
    { id: "IC 4701", name: "Nebula", ra: 275.28, dec: -16.65, type: "Nebula", dist: "5,500 ly", season: "Winter", desc: "Part of the greater Omega Nebula star-forming region." },
    { id: "IC 4776", name: "Planetary Nebula", ra: 281.38, dec: -33.34, type: "Nebula", dist: "10,000 ly", season: "Spring", desc: "A planetary nebula with a distinct, elongated morphology." },
    { id: "Sh2-308", name: "Dolphin Head Nebula", ra: 103.40, dec: -23.80, type: "Nebula", dist: "5,200 ly", season: "Summer", desc: "A massive, bubble-like nebula blown by a bright Wolf-Rayet star." },
    { id: "Sh2-311", name: "Emission Nebula", ra: 118.15, dec: -26.40, type: "Nebula", dist: "13,000 ly", season: "Summer", desc: "The larger H II region encompassing the Skull and Crossbones Nebula." },
    { id: "Sh2-312", name: "Nebula", ra: 119.50, dec: -26.10, type: "Nebula", dist: "13,000 ly", season: "Summer", desc: "A faint emission region near Sh2-311." },
    { id: "Sh2-307", name: "Emission Nebula", ra: 113.50, dec: -19.50, type: "Nebula", dist: "8,000 ly", season: "Summer", desc: "A diffuse emission cloud in Canis Major." },
    { id: "Sh2-309", name: "Nebula", ra: 115.20, dec: -21.80, type: "Nebula", dist: "9,000 ly", season: "Summer", desc: "A faint H II region requiring narrow-band imaging." },
    { id: "Sh2-310", name: "Nebula", ra: 116.80, dec: -24.50, type: "Nebula", dist: "10,000 ly", season: "Summer", desc: "An expansive, dim emission region." },
    { id: "Sh2-305", name: "Nebula", ra: 110.10, dec: -15.20, type: "Nebula", dist: "12,000 ly", season: "Summer", desc: "Part of the extensive star-forming complexes in Puppis." },
    { id: "Sh2-302", name: "Nebula", ra: 107.50, dec: -12.40, type: "Nebula", dist: "6,000 ly", season: "Summer", desc: "A glowing cloud of ionized hydrogen gas." },
    { id: "Sh2-303", name: "Nebula", ra: 108.20, dec: -13.10, type: "Nebula", dist: "6,500 ly", season: "Summer", desc: "An emission nebula close to the galactic plane." },
    { id: "Sh2-304", name: "Nebula", ra: 109.50, dec: -14.50, type: "Nebula", dist: "7,000 ly", season: "Summer", desc: "A faint emission region demanding long exposure times." },
    { id: "Sh2-296", name: "Seagull Region", ra: 106.10, dec: -11.00, type: "Nebula", dist: "3,650 ly", season: "Summer", desc: "The massive sweeping 'wings' of the Seagull Nebula." },
    { id: "Sh2-297", name: "Nebula", ra: 107.80, dec: -11.50, type: "Nebula", dist: "4,000 ly", season: "Summer", desc: "A compact H II region near the Seagull complex." },
    { id: "Sh2-298", name: "Nebula", ra: 108.50, dec: -12.00, type: "Nebula", dist: "4,500 ly", season: "Summer", desc: "A diffuse emission cloud." },
    { id: "Sh2-299", name: "Nebula", ra: 109.10, dec: -12.80, type: "Nebula", dist: "5,000 ly", season: "Summer", desc: "A faint extension of glowing gas." },
    { id: "Sh2-300", name: "Nebula", ra: 110.50, dec: -13.50, type: "Nebula", dist: "5,500 ly", season: "Summer", desc: "An ionized hydrogen region." },
    { id: "Sh2-301", name: "Nebula", ra: 111.20, dec: -14.20, type: "Nebula", dist: "6,000 ly", season: "Summer", desc: "A deep sky emission target." },
    { id: "Sh2-292", name: "Nebula", ra: 104.50, dec: -9.50, type: "Nebula", dist: "3,000 ly", season: "Summer", desc: "The 'head' of the Seagull Nebula, also known as IC 2177." },
    { id: "Sh2-293", name: "Nebula", ra: 105.10, dec: -10.10, type: "Nebula", dist: "3,200 ly", season: "Summer", desc: "A small emission node near the Seagull." },
    { id: "Sh2-294", name: "Nebula", ra: 105.80, dec: -10.80, type: "Nebula", dist: "3,500 ly", season: "Summer", desc: "Faint glowing gas in the Seagull complex." },
    { id: "Sh2-295", name: "Nebula", ra: 106.50, dec: -11.50, type: "Nebula", dist: "3,800 ly", season: "Summer", desc: "An outlying emission region." },
    { id: "Barnard 33", name: "Horsehead Nebula", ra: 85.24, dec: -2.46, type: "Nebula", dist: "1,375 ly", season: "Summer", desc: "An iconic dark nebula silhouetted against the glowing IC 434 emission region." },
    { id: "Barnard 72", name: "Snake Nebula", ra: 260.95, dec: -23.63, type: "Nebula", dist: "650 ly", season: "Winter", desc: "A distinct, S-shaped dark dust lane slithering across the Milky Way star fields." },
    { id: "Barnard 86", name: "Ink Spot Nebula", ra: 270.78, dec: -29.83, type: "Nebula", dist: "6,000 ly", season: "Winter", desc: "A visually striking, pitch-black dark nebula blocking light from the stars behind it." },
    { id: "Barnard 92", name: "Dark Nebula", ra: 273.85, dec: -18.25, type: "Nebula", dist: "10,000 ly", season: "Winter", desc: "A prominent dark void silhouetted against the bright star cloud M24." },
    { id: "Barnard 93", name: "Dark Nebula", ra: 274.15, dec: -18.05, type: "Nebula", dist: "10,000 ly", season: "Winter", desc: "The companion dark dust cloud situated right next to Barnard 92 in M24." },
    { id: "Barnard 228", name: "Dark Nebula", ra: 236.80, dec: -34.50, type: "Nebula", dist: "500 ly", season: "Winter", desc: "A sprawling dark dust complex in the constellation Lupus." },
    { id: "Barnard 259", name: "Dark Nebula", ra: 258.50, dec: -26.10, type: "Nebula", dist: "600 ly", season: "Winter", desc: "A thick region of obscuring dust in Ophiuchus." },
    { id: "Barnard 268", name: "Dark Nebula", ra: 261.20, dec: -28.50, type: "Nebula", dist: "600 ly", season: "Winter", desc: "A dark molecular cloud blocking background starlight." },
    { id: "Barnard 270", name: "Dark Nebula", ra: 262.10, dec: -29.10, type: "Nebula", dist: "600 ly", season: "Winter", desc: "A shadowy void in the Milky Way band." },
    { id: "Barnard 283", name: "Dark Nebula", ra: 265.50, dec: -31.50, type: "Nebula", dist: "700 ly", season: "Winter", desc: "Dense dust obstructing the galactic core." },
    { id: "Barnard 288", name: "Dark Nebula", ra: 267.10, dec: -32.80, type: "Nebula", dist: "750 ly", season: "Winter", desc: "A dark nebula in the rich star fields of Scorpius." },
    { id: "Barnard 296", name: "Dark Nebula", ra: 271.50, dec: -34.20, type: "Nebula", dist: "800 ly", season: "Winter", desc: "A prominent dark lane in Sagittarius." },
    { id: "Barnard 312", name: "Dark Nebula", ra: 278.50, dec: -36.10, type: "Nebula", dist: "900 ly", season: "Spring", desc: "Thick dust obscuring southern star clusters." },
    { id: "Barnard 315", name: "Dark Nebula", ra: 282.10, dec: -37.50, type: "Nebula", dist: "950 ly", season: "Spring", desc: "A dark patch in the southern Milky Way." },
    { id: "Barnard 320", name: "Dark Nebula", ra: 285.50, dec: -38.20, type: "Nebula", dist: "1,000 ly", season: "Spring", desc: "A shadowy molecular cloud." },
    { id: "Barnard 327", name: "Dark Nebula", ra: 290.10, dec: -39.50, type: "Nebula", dist: "1,100 ly", season: "Spring", desc: "Deep sky dust lane." },
    { id: "Barnard 330", name: "Dark Nebula", ra: 293.50, dec: -40.10, type: "Nebula", dist: "1,200 ly", season: "Spring", desc: "An obscuring cloud in Corona Australis." },
    { id: "Barnard 335", name: "Dark Nebula", ra: 298.20, dec: 7.50, type: "Nebula", dist: "800 ly", season: "Spring", desc: "A well-known isolated Bok globule." },
    { id: "Barnard 337", name: "Dark Nebula", ra: 299.50, dec: -41.50, type: "Nebula", dist: "1,300 ly", season: "Spring", desc: "A southern dark cloud." },
    { id: "Barnard 340", name: "Dark Nebula", ra: 302.10, dec: -42.20, type: "Nebula", dist: "1,400 ly", season: "Spring", desc: "A dense dark nebula." },
    { id: "Barnard 341", name: "Dark Nebula", ra: 303.50, dec: -43.10, type: "Nebula", dist: "1,500 ly", season: "Spring", desc: "Dust blocking the Milky Way." },
    { id: "Barnard 343", name: "Dark Nebula", ra: 305.20, dec: 40.80, type: "Nebula", dist: "1,000 ly", season: "Spring", desc: "A dark nebula in Cygnus." },
    { id: "Barnard 344", name: "Dark Nebula", ra: 306.80, dec: -44.50, type: "Nebula", dist: "1,600 ly", season: "Spring", desc: "A southern dark lane." },
    { id: "Barnard 345", name: "Dark Nebula", ra: 308.10, dec: -45.20, type: "Nebula", dist: "1,700 ly", season: "Spring", desc: "Obscuring dust in the southern skies." },
    { id: "Barnard 346", name: "Dark Nebula", ra: 309.50, dec: -46.10, type: "Nebula", dist: "1,800 ly", season: "Spring", desc: "A dark cloud blocking distant starlight." },
    { id: "Barnard 347", name: "Dark Nebula", ra: 311.20, dec: -47.50, type: "Nebula", dist: "1,900 ly", season: "Spring", desc: "A dense patch of the southern Milky Way." },
    { id: "Barnard 348", name: "Dark Nebula", ra: 315.50, dec: 42.50, type: "Nebula", dist: "1,200 ly", season: "Spring", desc: "A dark region in the northern cross." },
    { id: "Barnard 349", name: "Dark Nebula", ra: 317.10, dec: -48.20, type: "Nebula", dist: "2,000 ly", season: "Spring", desc: "A deep southern dark nebula." },
    { id: "Barnard 350", name: "Dark Nebula", ra: 319.50, dec: -49.50, type: "Nebula", dist: "2,100 ly", season: "Spring", desc: "A prominent dark cloud in the southern hemisphere." },
    { id: "NGC 2516", name: "Southern Beehive", ra: 119.54, dec: -60.75, type: "Open Cluster", dist: "1,300 ly", season: "Summer", desc: "A spectacular, bright open cluster easily visible to the naked eye under dark skies." },
    { id: "NGC 2547", name: "Open Cluster", ra: 122.56, dec: -49.25, type: "Open Cluster", dist: "1,500 ly", season: "Summer", desc: "A young open cluster containing many hot, blue stars." },
    { id: "NGC 3114", name: "Open Cluster", ra: 150.68, dec: -60.13, type: "Open Cluster", dist: "3,000 ly", season: "Autumn", desc: "A sprawling, sparse open cluster that looks great in a wide-field view." },
    { id: "NGC 3293", name: "Gem Cluster", ra: 158.96, dec: -58.23, type: "Open Cluster", dist: "8,400 ly", season: "Autumn", desc: "A stunning, compact open cluster packed with brilliant blue and red supergiants." },
    { id: "NGC 3590", name: "Open Cluster", ra: 168.21, dec: -60.79, type: "Open Cluster", dist: "5,000 ly", season: "Autumn", desc: "A small, dense open cluster situated in the rich Carina star fields." },
    { id: "NGC 3766", name: "Pearl Cluster", ra: 174.01, dec: -61.61, type: "Open Cluster", dist: "5,500 ly", season: "Autumn", desc: "An exceptionally rich open cluster known for its high number of Be-type stars." },
    { id: "NGC 4103", name: "Open Cluster", ra: 181.71, dec: -61.25, type: "Open Cluster", dist: "5,300 ly", season: "Autumn", desc: "A distinct open cluster embedded in the Southern Cross region." },
    { id: "NGC 4104", name: "Elliptical Galaxy", ra: 181.65, dec: 28.17, type: "Galaxy", dist: "120 Million ly", season: "Spring", desc: "A faint elliptical galaxy (often misclassified as a cluster in old observing lists)." },
    { id: "NGC 4105", name: "Elliptical Galaxy", ra: 181.68, dec: -28.20, type: "Galaxy", dist: "125 Million ly", season: "Spring", desc: "A faint galaxy that forms a pair with neighboring NGC 4106." },
    { id: "NGC 4609", name: "Open Cluster", ra: 190.69, dec: -62.99, type: "Open Cluster", dist: "4,000 ly", season: "Autumn", desc: "A bright open cluster situated right next to the Coalsack Nebula." },
    { id: "NGC 4815", name: "Open Cluster", ra: 194.46, dec: -64.95, type: "Open Cluster", dist: "9,000 ly", season: "Autumn", desc: "A heavily obscured open cluster in the constellation Musca." },
    { id: "NGC 5286", name: "Globular Cluster", ra: 206.61, dec: -51.37, type: "Globular Cluster", dist: "29,000 ly", season: "Winter", desc: "A dense globular cluster located very close to the star M Centauri." },
    { id: "NGC 5466", name: "Globular Cluster", ra: 211.36, dec: 28.53, type: "Globular Cluster", dist: "52,000 ly", season: "Winter", desc: "A very loose and poor globular cluster, unusual for its type." },
    { id: "NGC 5694", name: "Globular Cluster", ra: 219.90, dec: -26.54, type: "Globular Cluster", dist: "114,000 ly", season: "Winter", desc: "One of the oldest and most distant globular clusters in the Milky Way halo." },
    { id: "NGC 5824", name: "Globular Cluster", ra: 225.99, dec: -33.07, type: "Globular Cluster", dist: "104,000 ly", season: "Winter", desc: "A highly concentrated globular cluster." },
    { id: "NGC 5927", name: "Globular Cluster", ra: 232.00, dec: -50.67, type: "Globular Cluster", dist: "25,000 ly", season: "Winter", desc: "A metal-rich globular cluster lying close to the galactic plane." },
    { id: "NGC 5986", name: "Globular Cluster", ra: 236.53, dec: -37.79, type: "Globular Cluster", dist: "33,000 ly", season: "Winter", desc: "A bright globular cluster in the constellation Lupus." },
    { id: "NGC 6093", name: "Messier 80", ra: 244.26, dec: -22.98, type: "Globular Cluster", dist: "32,600 ly", season: "Winter", desc: "A very dense globular cluster featuring hundreds of thousands of stars." },
    { id: "NGC 6101", name: "Globular Cluster", ra: 246.45, dec: -72.20, type: "Globular Cluster", dist: "50,000 ly", season: "Winter", desc: "A loose globular cluster known to harbor an unusually high number of black holes." },
    { id: "NGC 6139", name: "Globular Cluster", ra: 246.92, dec: -38.85, type: "Globular Cluster", dist: "33,000 ly", season: "Winter", desc: "A compact globular cluster in Scorpius." },
    { id: "NGC 6171", name: "Messier 107", ra: 248.13, dec: -13.05, type: "Globular Cluster", dist: "20,900 ly", season: "Winter", desc: "A very loose globular cluster with distinct dark patches." },
    { id: "NGC 6205", name: "Hercules Globular Cluster", ra: 250.42, dec: 36.46, type: "Globular Cluster", dist: "25,000 ly", season: "Winter", desc: "M13, the Great Globular Cluster in Hercules." },
    { id: "NGC 6231", name: "Northern Jewel Box", ra: 253.53, dec: -41.81, type: "Open Cluster", dist: "5,900 ly", season: "Winter", desc: "A stunning, brilliant young open cluster in Scorpius." },
    { id: "NGC 6253", name: "Open Cluster", ra: 254.85, dec: -52.71, type: "Open Cluster", dist: "4,500 ly", season: "Winter", desc: "An unusually metal-rich open cluster." },
    { id: "NGC 6281", name: "Open Cluster", ra: 256.12, dec: -37.99, type: "Open Cluster", dist: "1,500 ly", season: "Winter", desc: "The brightest open cluster in Scorpius." },
    { id: "NGC 6316", name: "Globular Cluster", ra: 259.15, dec: -28.14, type: "Globular Cluster", dist: "34,000 ly", season: "Winter", desc: "A faint globular cluster located towards the galactic center." },
    { id: "NGC 6333", name: "Messier 9", ra: 259.80, dec: -18.51, type: "Globular Cluster", dist: "25,800 ly", season: "Winter", desc: "A globular cluster whose edges are obscured by dark dust clouds." },
    { id: "NGC 6352", name: "Globular Cluster", ra: 260.65, dec: -48.42, type: "Globular Cluster", dist: "18,000 ly", season: "Winter", desc: "A loose globular cluster in Ara." },
    { id: "NGC 6362", name: "Globular Cluster", ra: 262.98, dec: -67.04, type: "Globular Cluster", dist: "25,000 ly", season: "Winter", desc: "A relatively close and bright globular cluster near the south celestial pole." },
    { id: "NGC 6397", name: "Globular Cluster", ra: 265.17, dec: -53.67, type: "Globular Cluster", dist: "7,800 ly", season: "Winter", desc: "One of the two closest globular clusters to Earth." },
    { id: "NGC 6440", name: "Globular Cluster", ra: 267.22, dec: -20.35, type: "Globular Cluster", dist: "27,000 ly", season: "Winter", desc: "A metal-rich globular cluster in Sagittarius." },
    { id: "NGC 6441", name: "Globular Cluster", ra: 267.55, dec: -37.05, type: "Globular Cluster", dist: "42,000 ly", season: "Winter", desc: "A massive globular cluster located very close to the star G Scorpii." },
    { id: "NGC 6453", name: "Globular Cluster", ra: 267.75, dec: -34.59, type: "Globular Cluster", dist: "38,000 ly", season: "Winter", desc: "A faint globular cluster visually located near the Scorpion's tail." },
    { id: "NGC 6496", name: "Globular Cluster", ra: 269.76, dec: -44.26, type: "Globular Cluster", dist: "37,000 ly", season: "Winter", desc: "A metal-rich globular cluster heavily obscured by interstellar dust." },
    { id: "NGC 6520", name: "Open Cluster", ra: 271.35, dec: -27.89, type: "Open Cluster", dist: "5,500 ly", season: "Winter", desc: "A compact open cluster sitting right next to the Ink Spot dark nebula." },
    { id: "NGC 6522", name: "Globular Cluster", ra: 270.89, dec: -30.03, type: "Globular Cluster", dist: "25,000 ly", season: "Winter", desc: "A globular cluster located in Baade's Window, a clear patch towards the galactic center." },
    { id: "NGC 6544", name: "Globular Cluster", ra: 271.83, dec: -26.00, type: "Globular Cluster", dist: "9,000 ly", season: "Winter", desc: "A small, heavily reddened globular cluster." },
    { id: "NGC 6553", name: "Globular Cluster", ra: 272.31, dec: -25.90, type: "Globular Cluster", dist: "19,000 ly", season: "Winter", desc: "A metal-rich globular cluster in Sagittarius." },
    { id: "NGC 6569", name: "Globular Cluster", ra: 273.41, dec: -31.82, type: "Globular Cluster", dist: "35,000 ly", season: "Winter", desc: "A globular cluster obscured by the dense dust of the central Milky Way." },
    { id: "NGC 6584", name: "Globular Cluster", ra: 274.65, dec: -52.21, type: "Globular Cluster", dist: "44,000 ly", season: "Winter", desc: "A distant globular cluster in Telescopium." },
    { id: "NGC 6624", name: "Globular Cluster", ra: 275.92, dec: -30.35, type: "Globular Cluster", dist: "25,000 ly", season: "Winter", desc: "A core-collapsed globular cluster containing several pulsars." },
    { id: "NGC 6637", name: "Messier 69", ra: 277.85, dec: -32.34, type: "Globular Cluster", dist: "29,700 ly", season: "Winter", desc: "A compact, metal-rich globular cluster in Sagittarius." },
    { id: "NGC 6642", name: "Globular Cluster", ra: 277.99, dec: -23.47, type: "Globular Cluster", dist: "26,000 ly", season: "Winter", desc: "One of the most metal-poor globular clusters known." },
    { id: "NGC 6652", name: "Globular Cluster", ra: 278.94, dec: -32.99, type: "Globular Cluster", dist: "32,000 ly", season: "Winter", desc: "A small, dense globular cluster." },
    { id: "NGC 6656", name: "Messier 22", ra: 279.10, dec: -23.90, type: "Globular Cluster", dist: "10,600 ly", season: "Winter", desc: "One of the brightest and closest globular clusters in the sky." },
    { id: "NGC 6681", name: "Messier 70", ra: 280.80, dec: -32.29, type: "Globular Cluster", dist: "29,300 ly", season: "Winter", desc: "A core-collapsed globular cluster located near the galactic center." },
    { id: "NGC 6712", name: "Globular Cluster", ra: 283.26, dec: -8.70, type: "Globular Cluster", dist: "26,000 ly", season: "Spring", desc: "A loose globular cluster that has likely lost many stars to tidal stripping." },
    { id: "NGC 6715", name: "Messier 54", ra: 283.76, dec: -34.38, type: "Globular Cluster", dist: "87,000 ly", season: "Spring", desc: "A massive globular cluster actually belonging to the Sagittarius Dwarf Elliptical Galaxy." },
    { id: "NGC 6723", name: "Globular Cluster", ra: 284.90, dec: -36.63, type: "Globular Cluster", dist: "28,000 ly", season: "Spring", desc: "A beautiful globular cluster situated right on the border of Sagittarius and Corona Australis." },
    { id: "NGC 6752", name: "Globular Cluster", ra: 287.71, dec: -59.98, type: "Globular Cluster", dist: "13,000 ly", season: "Spring", desc: "The third-brightest globular cluster in the sky, easily visible to the naked eye." },
    { id: "NGC 6779", name: "Messier 56", ra: 289.15, dec: 30.18, type: "Globular Cluster", dist: "32,900 ly", season: "Spring", desc: "A faint, loose globular cluster in Lyra." },
    { id: "NGC 6809", name: "Messier 55", ra: 294.99, dec: -30.96, type: "Globular Cluster", dist: "17,600 ly", season: "Spring", desc: "A large, loose, and highly resolved globular cluster." },
    { id: "NGC 6838", name: "Messier 71", ra: 298.44, dec: 18.78, type: "Globular Cluster", dist: "13,000 ly", season: "Spring", desc: "A very loose globular cluster that was originally classified as a dense open cluster." },
    { id: "NGC 6864", name: "Messier 75", ra: 301.52, dec: -21.92, type: "Globular Cluster", dist: "67,500 ly", season: "Spring", desc: "A highly concentrated, dense globular cluster." },
    { id: "NGC 6934", name: "Globular Cluster", ra: 308.54, dec: 7.40, type: "Globular Cluster", dist: "50,000 ly", season: "Spring", desc: "A distant globular cluster in Delphinus." },
    { id: "NGC 6981", name: "Messier 72", ra: 313.36, dec: -12.53, type: "Globular Cluster", dist: "54,570 ly", season: "Spring", desc: "A faint, loose globular cluster in Aquarius." },
    { id: "NGC 7006", name: "Globular Cluster", ra: 315.37, dec: 16.18, type: "Globular Cluster", dist: "135,000 ly", season: "Spring", desc: "An incredibly distant globular cluster residing in the far galactic halo." },
    { id: "NGC 7089", name: "Messier 2", ra: 323.36, dec: -0.82, type: "Globular Cluster", dist: "37,500 ly", season: "Spring", desc: "One of the largest and oldest known globular clusters." },
    { id: "NGC 7099", name: "Messier 30", ra: 325.09, dec: -23.18, type: "Globular Cluster", dist: "29,400 ly", season: "Spring", desc: "A core-collapsed globular cluster with distinctive chains of stars extending from it." },
    { id: "IC 2391", name: "Omicron Velorum Cluster", ra: 130.13, dec: -53.03, type: "Open Cluster", dist: "500 ly", season: "Summer", desc: "A very bright, close open cluster centered on the star Omicron Velorum." },
    { id: "IC 2395", name: "Open Cluster", ra: 130.70, dec: -48.11, type: "Open Cluster", dist: "2,500 ly", season: "Summer", desc: "A scattered open cluster in Vela." },
    { id: "IC 2488", name: "Open Cluster", ra: 141.88, dec: -56.96, type: "Open Cluster", dist: "4,000 ly", season: "Autumn", desc: "A faint, rich open cluster." },
    { id: "IC 2581", name: "Open Cluster", ra: 156.88, dec: -57.62, type: "Open Cluster", dist: "9,000 ly", season: "Autumn", desc: "An open cluster heavily obscured by background dust." },
    { id: "IC 2606", name: "Open Cluster", ra: 161.20, dec: -58.80, type: "Open Cluster", dist: "1,500 ly", season: "Autumn", desc: "A sparse open cluster." },
    { id: "Melotte 105", name: "Open Cluster", ra: 169.95, dec: -63.48, type: "Open Cluster", dist: "6,500 ly", season: "Autumn", desc: "A small, compact open cluster." },
    { id: "Melotte 111", name: "Coma Star Cluster", ra: 185.62, dec: 25.96, type: "Open Cluster", dist: "280 ly", season: "Winter", desc: "A large, sprawling open cluster very close to Earth." },
    { id: "Melotte 66", name: "Open Cluster", ra: 111.55, dec: -47.66, type: "Open Cluster", dist: "15,000 ly", season: "Summer", desc: "An incredibly old, distant open cluster." },
    { id: "Melotte 71", name: "Open Cluster", ra: 114.39, dec: -12.06, type: "Open Cluster", dist: "10,000 ly", season: "Summer", desc: "A rich open cluster." },
    { id: "Melotte 72", name: "Open Cluster", ra: 114.61, dec: -10.66, type: "Open Cluster", dist: "9,500 ly", season: "Summer", desc: "A distant open cluster." },
    { id: "Melotte 77", name: "Open Cluster", ra: 115.10, dec: -10.10, type: "Open Cluster", dist: "8,000 ly", season: "Summer", desc: "An obscure southern cluster." },
    { id: "Melotte 86", name: "Open Cluster", ra: 118.20, dec: -15.50, type: "Open Cluster", dist: "4,500 ly", season: "Summer", desc: "A faint open cluster." },
    { id: "Melotte 101", name: "Open Cluster", ra: 160.60, dec: -65.10, type: "Open Cluster", dist: "5,500 ly", season: "Autumn", desc: "An open cluster in the Carina region." },
    { id: "Melotte 102", name: "Open Cluster", ra: 162.10, dec: -64.40, type: "Open Cluster", dist: "5,000 ly", season: "Autumn", desc: "A nearby open cluster." },
    { id: "Melotte 103", name: "Open Cluster", ra: 163.50, dec: -64.10, type: "Open Cluster", dist: "4,500 ly", season: "Autumn", desc: "A star cluster in the southern sky." },
    { id: "Melotte 104", name: "Open Cluster", ra: 164.20, dec: -63.80, type: "Open Cluster", dist: "4,000 ly", season: "Autumn", desc: "A faint open cluster." },
    { id: "Collinder 140", name: "Open Cluster", ra: 111.00, dec: -31.85, type: "Open Cluster", dist: "1,200 ly", season: "Summer", desc: "A large, bright open cluster easily visible in binoculars." },
    { id: "Collinder 173", name: "Open Cluster", ra: 124.00, dec: -46.30, type: "Open Cluster", dist: "1,500 ly", season: "Summer", desc: "A sparse grouping of stars." },
    { id: "Collinder 197", name: "Open Cluster", ra: 133.50, dec: -49.10, type: "Open Cluster", dist: "2,000 ly", season: "Autumn", desc: "A minor open cluster." },
    { id: "Collinder 220", name: "Open Cluster", ra: 145.20, dec: -52.40, type: "Open Cluster", dist: "2,500 ly", season: "Autumn", desc: "An open cluster." },
    { id: "Collinder 223", name: "Open Cluster", ra: 148.50, dec: -54.10, type: "Open Cluster", dist: "2,800 ly", season: "Autumn", desc: "A southern cluster." },
    { id: "Collinder 228", name: "Open Cluster", ra: 156.00, dec: -60.00, type: "Open Cluster", dist: "7,000 ly", season: "Autumn", desc: "A large open cluster associated with the Carina Nebula." },
    { id: "Collinder 232", name: "Open Cluster", ra: 158.50, dec: -61.50, type: "Open Cluster", dist: "6,500 ly", season: "Autumn", desc: "A massive open cluster." },
    { id: "Collinder 238", name: "Open Cluster", ra: 162.20, dec: -63.10, type: "Open Cluster", dist: "3,000 ly", season: "Autumn", desc: "A deep sky cluster." },
    { id: "Collinder 258", name: "Open Cluster", ra: 170.50, dec: -65.20, type: "Open Cluster", dist: "4,000 ly", season: "Autumn", desc: "An obscure Collinder entry." },
    { id: "Collinder 272", name: "Open Cluster", ra: 185.10, dec: -60.50, type: "Open Cluster", dist: "3,500 ly", season: "Autumn", desc: "A faint southern cluster." },
    { id: "Collinder 282", name: "Open Cluster", ra: 195.50, dec: -62.10, type: "Open Cluster", dist: "4,200 ly", season: "Winter", desc: "An open cluster." },
    { id: "Collinder 285", name: "Ursa Major Cluster", ra: 189.50, dec: 55.50, type: "Open Cluster", dist: "80 ly", season: "Winter", desc: "The closest open cluster to Earth, forming the core of the Big Dipper." },
    { id: "Collinder 292", name: "Open Cluster", ra: 205.10, dec: -63.50, type: "Open Cluster", dist: "3,000 ly", season: "Winter", desc: "A faint southern open cluster." },
    { id: "Collinder 296", name: "Open Cluster", ra: 215.50, dec: -64.10, type: "Open Cluster", dist: "3,200 ly", season: "Winter", desc: "A grouping of stars." },
    { id: "Collinder 299", name: "Open Cluster", ra: 225.10, dec: -65.50, type: "Open Cluster", dist: "3,500 ly", season: "Winter", desc: "A minor cluster." },
    { id: "Collinder 302", name: "Open Cluster", ra: 235.50, dec: -66.10, type: "Open Cluster", dist: "3,800 ly", season: "Winter", desc: "A deep sky object." },
    { id: "Collinder 305", name: "Open Cluster", ra: 245.10, dec: -67.50, type: "Open Cluster", dist: "4,000 ly", season: "Winter", desc: "A faint southern target." },
    { id: "Collinder 307", name: "Open Cluster", ra: 255.50, dec: -68.10, type: "Open Cluster", dist: "4,200 ly", season: "Winter", desc: "A sparse open cluster." },
    { id: "Collinder 316", name: "Open Cluster", ra: 265.10, dec: -69.50, type: "Open Cluster", dist: "4,500 ly", season: "Winter", desc: "A deep sky cluster." },
    { id: "Collinder 320", name: "Open Cluster", ra: 275.50, dec: -70.10, type: "Open Cluster", dist: "4,800 ly", season: "Winter", desc: "An open cluster." },
    { id: "Collinder 323", name: "Open Cluster", ra: 285.10, dec: -71.50, type: "Open Cluster", dist: "5,000 ly", season: "Spring", desc: "A faint grouping of stars." },
    { id: "Collinder 328", name: "Open Cluster", ra: 295.50, dec: -72.10, type: "Open Cluster", dist: "5,200 ly", season: "Spring", desc: "A southern cluster." },
    { id: "Collinder 335", name: "Open Cluster", ra: 305.10, dec: -73.50, type: "Open Cluster", dist: "5,500 ly", season: "Spring", desc: "The final Collinder cluster in this batch." }
];

// --- 2. ICONS & VARIABLES ---


// --- 2. ICONS & VARIABLES ---
const icons = {
    "Galaxy": `<img src="./Galaxy.png" alt="Galaxy" style="width:100%; height:100%; object-fit:contain; filter: drop-shadow(0 0 3px #ff0000);" />`,
    "Nebula": `<img src="./Nebula.png" alt="Nebula" style="width:100%; height:100%; object-fit:contain; filter: drop-shadow(0 0 3px #ff0000);" />`,
    "Globular Cluster": `<img src="./Cluster.png" alt="Cluster" style="width:100%; height:100%; object-fit:contain; filter: drop-shadow(0 0 3px #ff0000);" />`,
    "Open Cluster": `<img src="./Cluster.png" alt="Cluster" style="width:100%; height:100%; object-fit:contain; filter: drop-shadow(0 0 3px #ff0000);" />`,
    "Alignment": `<svg viewBox="0 0 24 24" fill="none" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:100%; height:100%; filter: drop-shadow(0 0 3px #ff0000);"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>`
};

let isListExpanded = false; 
let activeCategory = 'All';

// --- 3. DYNAMIC DOM RENDERER ---
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

// --- 4. THE MATH ENGINES ---
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

// --- 5. LIVE GPS TRACKING & SHOW MORE LOGIC ---
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

// --- 6. INFO MODAL LOGIC ---
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


// --- 7. CAMERA & RADAR AR ---
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

    // --- 3-TIER RADAR LOGIC (RESIZED & RECOLORED) ---
    if (distanceToTarget < 0.8) {
        // BULLSEYE (< 0.8 degrees) - Green & Base Size
        arrow.style.display = 'none'; 
        dot.style.backgroundColor = '#00ff00';
        dot.style.boxShadow = '0 0 10px #00ff00, 0 0 20px #00ff00';
        dot.style.transform = 'translate(-50%, -50%) scale(1)';
    } else if (distanceToTarget < 5) {
        // GETTING WARM (< 5 degrees) - Blue & Smaller
        arrow.style.display = 'none'; 
        dot.style.backgroundColor = '#00aaff';
        dot.style.boxShadow = '0 0 10px #00aaff, 0 0 20px #00aaff';
        dot.style.transform = 'translate(-50%, -50%) scale(0.75)';
    } else {
        // FAR AWAY (> 5 degrees) - Red & Smallest
        arrow.style.display = 'block'; 
        dot.style.backgroundColor = '#ff0000';
        dot.style.boxShadow = '0 0 10px #ff0000, 0 0 20px #ff0000';
        dot.style.transform = 'translate(-50%, -50%) scale(0.5)';
        
        // Turn the directional arrow red to match
        arrow.style.color = '#ff0000';
        arrow.style.filter = 'drop-shadow(0 0 5px #ff0000)';

        const angleRad = Math.atan2(deltaAz, deltaAlt);
        const angleDeg = angleRad * R2D;
        
        // Center it perfectly, fix the rotation axis, and orbit at a uniform 70px radius
        arrow.style.transformOrigin = 'center center'; 
        arrow.style.transform = `translate(-50%, -50%) rotate(${angleDeg}deg) translateY(-70px)`;
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

// --- 8. WAKE LOCK (Keeps screen awake while app is open) ---
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
