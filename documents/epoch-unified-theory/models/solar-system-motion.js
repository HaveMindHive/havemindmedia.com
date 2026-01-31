/**
 * SOLAR SYSTEM MOTION
 * Interactive visualization: Both Sun-centered AND Earth-centered views are true
 *
 * Have Mind Media | January 30, 2026 | [1 = -1]
 *
 * The "aha moment": Tycho Brahe saw it in 1588 — the Sun orbits Earth AND
 * the planets orbit the Sun. Both are true. Position determines perspective.
 *
 * Historical context:
 * - Swedenborg: Universe of spiral motions, whirls, and micro-macrocosmic correspondences
 * - Tycho Brahe: Geoheliocentric model — mathematically equivalent to Copernicus
 * - Epoch Framework: Observer position determines which center appears "true"
 *
 * Scale context:
 * - LOCAL: Inner planets of our solar system (~5 AU)
 * - SOLAR: Sun's neighborhood in Orion Arm (~100 light-years)
 * - GALACTIC: Sun orbiting Milky Way center (~26,000 light-years, 225 million year orbit)
 */

class SolarSystemMotion {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Container #${containerId} not found`);
            return;
        }

        // Configuration
        this.options = {
            size: options.size || 400,
            colors: {
                sun: options.colors?.sun || '#f39c12',
                sunGlow: options.colors?.sunGlow || 'rgba(243, 156, 18, 0.3)',
                earth: options.colors?.earth || '#4ecdc4',
                earthGlow: options.colors?.earthGlow || 'rgba(78, 205, 196, 0.3)',
                balancePoint: options.colors?.balancePoint || '#d4af37',
                jupiter: options.colors?.jupiter || '#e67e22',
                mars: options.colors?.mars || '#e74c3c',
                orbit: options.colors?.orbit || 'rgba(255, 255, 255, 0.2)',
                trail: options.colors?.trail || 'rgba(243, 156, 18, 0.5)',
                text: options.colors?.text || '#e8dcc4',
                dim: options.colors?.dim || 'rgba(255, 255, 255, 0.5)',
                galacticCenter: options.colors?.galacticCenter || '#9b59b6',
                spiralArm: options.colors?.spiralArm || 'rgba(100, 100, 200, 0.3)',
                nearbyStars: options.colors?.nearbyStars || '#ffffff'
            }
        };

        // View modes - Three perspectives, all equally valid
        this.VIEW_MODES = {
            EARTH_CENTER: 'earth_center',    // Geocentric (Ptolemy, Earth observer)
            SUN_CENTER: 'sun_center',        // Heliocentric (Copernicus, simplified)
            BOTH_TRUE: 'both_true'           // Triaxial (Tycho/Epoch, observer-dependent)
        };

        // Scale modes - Three levels of zoom
        this.SCALE_MODES = {
            LOCAL: 'local',       // Inner solar system (AU scale)
            SOLAR: 'solar',       // Sun's neighborhood (light-years)
            GALACTIC: 'galactic'  // Milky Way orbit (thousands of light-years)
        };

        // State
        this.viewMode = this.VIEW_MODES.EARTH_CENTER;
        this.scaleMode = this.SCALE_MODES.LOCAL;
        this.time = 0;  // In years
        this.isPlaying = false;
        this.animationFrame = null;
        this.playSpeed = 1;
        this.showTrail = true;
        this.sunTrail = [];
        this.earthTrail = [];
        this.galacticTrail = [];
        this.maxTrailLength = 150;

        // Orbital parameters (simplified for visualization)
        this.earth = {
            period: 1.0,      // 1 year
            distance: 1.0     // 1 AU
        };

        this.mars = {
            period: 1.88,     // years
            distance: 1.52    // AU
        };

        this.jupiter = {
            period: 11.86,    // years
            distance: 5.2     // AU
        };

        // Callbacks
        this.onUpdate = options.onUpdate || null;

        this.init();
    }

    init() {
        this.setupSVG();
        this.draw();
    }

    setupSVG() {
        const size = this.options.size;

        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.svg.setAttribute('width', '100%');
        this.svg.setAttribute('height', size);
        this.svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
        this.svg.style.display = 'block';
        this.svg.style.maxWidth = `${size}px`;
        this.svg.style.margin = '0 auto';

        this.container.appendChild(this.svg);
    }

    draw() {
        this.svg.innerHTML = '';

        const size = this.options.size;
        const cx = size / 2;
        const cy = size / 2;

        // Add definitions
        this.addDefs();

        // Draw based on scale mode first
        switch (this.scaleMode) {
            case this.SCALE_MODES.GALACTIC:
                this.drawGalacticScale(cx, cy);
                break;
            case this.SCALE_MODES.SOLAR:
                this.drawSolarNeighborhood(cx, cy);
                break;
            case this.SCALE_MODES.LOCAL:
            default:
                // Draw based on view mode (only applies to local scale)
                switch (this.viewMode) {
                    case this.VIEW_MODES.EARTH_CENTER:
                        this.drawEarthCentered(cx, cy);
                        break;
                    case this.VIEW_MODES.SUN_CENTER:
                        this.drawSunCentered(cx, cy);
                        break;
                    case this.VIEW_MODES.BOTH_TRUE:
                        this.drawBothTrue(cx, cy);
                        break;
                }
                break;
        }

        // Draw mode label
        this.drawModeLabel();
    }

    addDefs() {
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');

        // Sun glow filter
        const sunGlow = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
        sunGlow.setAttribute('id', 'sunGlow');
        sunGlow.innerHTML = `
            <feGaussianBlur stdDeviation="4" result="blur"/>
            <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        `;
        defs.appendChild(sunGlow);

        // Sun gradient
        const sunGrad = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
        sunGrad.setAttribute('id', 'sunGrad');
        sunGrad.innerHTML = `
            <stop offset="0%" stop-color="#fff5e0"/>
            <stop offset="50%" stop-color="${this.options.colors.sun}"/>
            <stop offset="100%" stop-color="#e67e22"/>
        `;
        defs.appendChild(sunGrad);

        // Earth gradient
        const earthGrad = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
        earthGrad.setAttribute('id', 'earthGrad');
        earthGrad.innerHTML = `
            <stop offset="0%" stop-color="#81ecec"/>
            <stop offset="50%" stop-color="${this.options.colors.earth}"/>
            <stop offset="100%" stop-color="#00b894"/>
        `;
        defs.appendChild(earthGrad);

        this.svg.appendChild(defs);
    }

    // GEOCENTRIC VIEW: Earth at center, Sun and planets orbit Earth
    drawEarthCentered(cx, cy) {
        const scale = 25;  // Pixels per AU

        // Draw Sun's orbit around Earth
        this.drawOrbit(cx, cy, this.earth.distance * scale, 'Sun\'s yearly path');

        // Draw Earth at center (fixed)
        this.drawEarth(cx, cy, 20, true);

        // Calculate Sun's position (orbits Earth once per year - as seen from Earth)
        const sunAngle = (this.time / this.earth.period) * Math.PI * 2;
        const sunX = cx + Math.cos(sunAngle) * this.earth.distance * scale;
        const sunY = cy + Math.sin(sunAngle) * this.earth.distance * scale;

        // Draw Sun orbiting Earth
        this.drawSun(sunX, sunY, 15);

        // Mars orbit (more complex - epicycle-like in geocentric)
        const marsAngle = (this.time / this.mars.period) * Math.PI * 2;
        // In geocentric, Mars appears to have retrograde motion
        const marsBaseAngle = sunAngle;
        const marsEpicycle = marsAngle - sunAngle;
        const marsX = cx + Math.cos(marsBaseAngle) * 50 + Math.cos(marsEpicycle) * 30;
        const marsY = cy + Math.sin(marsBaseAngle) * 50 + Math.sin(marsEpicycle) * 30;
        this.drawPlanet(marsX, marsY, 6, this.options.colors.mars, 'Mars');

        // Add trail to Sun
        if (this.showTrail) {
            this.sunTrail.push({ x: sunX, y: sunY });
            if (this.sunTrail.length > this.maxTrailLength) {
                this.sunTrail.shift();
            }
            this.drawTrail(this.sunTrail, this.options.colors.trail);
        }

        // Labels
        this.drawLabel(cx, cy + 35, 'EARTH', this.options.colors.earth, 11, 'bold');
        this.drawLabel(cx, cy + 48, '(You are here)', this.options.colors.dim, 9);
    }

    // HELIOCENTRIC VIEW: Sun at center, planets orbit Sun
    drawSunCentered(cx, cy) {
        const scale = 20;  // Pixels per AU

        // Draw planetary orbits
        this.drawOrbit(cx, cy, this.earth.distance * scale, '');
        this.drawOrbit(cx, cy, this.mars.distance * scale, '');
        this.drawOrbit(cx, cy, this.jupiter.distance * scale * 0.6, '');  // Scaled down to fit

        // Draw Sun at center (fixed)
        this.drawSun(cx, cy, 22, true);

        // Calculate planet positions
        const earthAngle = (this.time / this.earth.period) * Math.PI * 2;
        const marsAngle = (this.time / this.mars.period) * Math.PI * 2;
        const jupiterAngle = (this.time / this.jupiter.period) * Math.PI * 2;

        const earthX = cx + Math.cos(earthAngle) * this.earth.distance * scale;
        const earthY = cy + Math.sin(earthAngle) * this.earth.distance * scale;

        const marsX = cx + Math.cos(marsAngle) * this.mars.distance * scale;
        const marsY = cy + Math.sin(marsAngle) * this.mars.distance * scale;

        const jupiterX = cx + Math.cos(jupiterAngle) * this.jupiter.distance * scale * 0.6;
        const jupiterY = cy + Math.sin(jupiterAngle) * this.jupiter.distance * scale * 0.6;

        // Draw planets
        this.drawEarth(earthX, earthY, 10);
        this.drawPlanet(marsX, marsY, 7, this.options.colors.mars, '');
        this.drawPlanet(jupiterX, jupiterY, 12, this.options.colors.jupiter, '');

        // Add trail to Earth
        if (this.showTrail) {
            this.earthTrail.push({ x: earthX, y: earthY });
            if (this.earthTrail.length > this.maxTrailLength) {
                this.earthTrail.shift();
            }
            this.drawTrail(this.earthTrail, this.options.colors.earthGlow);
        }

        // Labels
        this.drawLabel(cx, cy + 38, 'SUN', this.options.colors.sun, 11, 'bold');
        this.drawLabel(cx, cy + 51, '(Center of gravity)', this.options.colors.dim, 9);
    }

    // SOLAR NEIGHBORHOOD VIEW: Sun's local stellar neighborhood
    // Now with proper 3D celestial coordinates projected to 2D
    drawSolarNeighborhood(cx, cy) {
        const size = this.options.size;

        // Real stellar data with celestial coordinates
        // RA (right ascension) and Dec (declination) approximate, dist in light-years
        // Z-offset represents "above/below" the galactic plane (scalar dimension hint)
        const nearbyStars = [
            { name: 'Proxima Centauri', dist: 4.24, ra: 217.4, dec: -62.7, z: -1.0, magnitude: 11.1, type: 'M' },
            { name: 'Alpha Centauri A', dist: 4.37, ra: 219.9, dec: -60.8, z: -0.9, magnitude: 0.0, type: 'G' },
            { name: 'Barnard\'s Star', dist: 5.96, ra: 269.5, dec: 4.7, z: 5.0, magnitude: 9.5, type: 'M' },
            { name: 'Wolf 359', dist: 7.86, ra: 164.1, dec: 7.0, z: 4.7, magnitude: 13.5, type: 'M' },
            { name: 'SIRIUS', dist: 8.60, ra: 101.3, dec: -16.7, z: -1.8, magnitude: -1.5, type: 'A', highlight: true },
            { name: 'Ross 154', dist: 9.69, ra: 283.3, dec: -23.8, z: -2.5, magnitude: 10.4, type: 'M' },
            { name: 'Epsilon Eridani', dist: 10.5, ra: 53.2, dec: -9.5, z: -8.1, magnitude: 3.7, type: 'K' },
            { name: 'Tau Ceti', dist: 11.9, ra: 26.0, dec: -15.9, z: -10.9, magnitude: 3.5, type: 'G' },
            { name: 'Procyon', dist: 11.5, ra: 114.8, dec: 5.2, z: 1.0, magnitude: 0.4, type: 'F' },
            { name: 'Luyten\'s Star', dist: 12.4, ra: 109.9, dec: 5.2, z: 1.2, magnitude: 9.9, type: 'M' }
        ];

        // Scale: designed so Sirius is visible but not too far
        const lyScale = 12;  // pixels per light-year

        // Draw the "Dark Sun Zone" (antisolar region) - where we cannot see during day
        const darkZoneAngle = Math.PI;  // Opposite direction from Sirius
        this.drawDarkSunZone(cx, cy, darkZoneAngle, size);

        // Draw concentric distance rings
        [5, 10, 15].forEach(dist => {
            this.drawOrbit(cx, cy, dist * lyScale, '', 'rgba(255,255,255,0.08)');
            // Distance label at right edge
            this.drawLabel(cx + dist * lyScale + 8, cy, `${dist} ly`, this.options.colors.dim, 8);
        });

        // Draw our Sun at center with slow wobble from planets
        const wobbleAngle = (this.time / 12) * Math.PI * 2;  // Jupiter's ~12 year cycle
        const wobbleAmount = 0.3;  // Very small at this scale
        const sunX = cx + Math.cos(wobbleAngle) * wobbleAmount;
        const sunY = cy + Math.sin(wobbleAngle) * wobbleAmount;

        this.drawSun(sunX, sunY, 14, true);
        this.drawLabel(cx, cy + 32, 'OUR SUN', this.options.colors.sun, 11, 'bold');
        this.drawLabel(cx, cy + 44, 's = 0 (you are here)', this.options.colors.dim, 8);

        // Draw nearby stars with proper celestial projection
        nearbyStars.forEach(star => {
            // Convert RA/Dec to x,y projection (simplified)
            // RA determines horizontal position (0-360 degrees around)
            // Dec and Z affect vertical offset (scalar dimension representation)
            const raRad = (star.ra / 180) * Math.PI;
            const projDist = Math.min(star.dist * lyScale, size * 0.42);  // Cap at visible area

            // Add slight vertical offset based on z-coordinate (above/below galactic plane)
            const zOffset = star.z * 1.5;  // Subtle scalar dimension hint

            const x = cx + Math.cos(raRad) * projDist;
            const y = cy + Math.sin(raRad) * projDist + zOffset;

            // Star size based on visual magnitude (brighter = larger)
            let starSize = 3;
            if (star.magnitude < 1) starSize = 6;
            else if (star.magnitude < 4) starSize = 4;

            // Star color based on spectral type
            let starColor = this.options.colors.nearbyStars;
            if (star.type === 'M') starColor = '#ff6b6b';  // Red dwarf
            else if (star.type === 'K') starColor = '#ffa94d';  // Orange
            else if (star.type === 'G') starColor = '#fff176';  // Yellow (like Sun)
            else if (star.type === 'F') starColor = '#ffffb0';  // Yellow-white
            else if (star.type === 'A') starColor = '#b3e5fc';  // Blue-white (Sirius)

            // Draw star
            if (star.highlight) {
                // Sirius gets special treatment - brightest star in night sky
                const glow = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                glow.setAttribute('cx', x);
                glow.setAttribute('cy', y);
                glow.setAttribute('r', 12);
                glow.setAttribute('fill', 'rgba(179, 229, 252, 0.3)');
                glow.setAttribute('filter', 'url(#sunGlow)');
                this.svg.appendChild(glow);
            }

            const starDot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            starDot.setAttribute('cx', x);
            starDot.setAttribute('cy', y);
            starDot.setAttribute('r', starSize);
            starDot.setAttribute('fill', starColor);
            this.svg.appendChild(starDot);

            // Label prominent stars
            if (star.magnitude < 4 || star.highlight) {
                const labelY = y + starSize + 12;
                const labelColor = star.highlight ? '#b3e5fc' : this.options.colors.dim;
                const labelSize = star.highlight ? 10 : 8;
                const labelWeight = star.highlight ? 'bold' : 'normal';
                this.drawLabel(x, labelY, star.name, labelColor, labelSize, labelWeight);

                // Show distance for Sirius
                if (star.highlight) {
                    this.drawLabel(x, labelY + 12, `${star.dist} light-years`, this.options.colors.dim, 8);
                }
            }
        });

        // Scalar dimension indicator
        this.drawLabel(cx, size - 25, 'Stars above/below galactic plane show scalar offset (s+ / s-)', this.options.colors.dim, 8);
    }

    // Draw the "Dark Sun Zone" - the antisolar region, a zone not a point
    drawDarkSunZone(cx, cy, angle, size) {
        // Create a wedge-shaped dark zone
        const innerRadius = 20;
        const outerRadius = size * 0.45;
        const arcSpan = Math.PI * 0.4;  // 72 degree wedge

        const startAngle = angle - arcSpan / 2;
        const endAngle = angle + arcSpan / 2;

        // Draw as gradient zone
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const x1 = cx + Math.cos(startAngle) * innerRadius;
        const y1 = cy + Math.sin(startAngle) * innerRadius;
        const x2 = cx + Math.cos(startAngle) * outerRadius;
        const y2 = cy + Math.sin(startAngle) * outerRadius;
        const x3 = cx + Math.cos(endAngle) * outerRadius;
        const y3 = cy + Math.sin(endAngle) * outerRadius;
        const x4 = cx + Math.cos(endAngle) * innerRadius;
        const y4 = cy + Math.sin(endAngle) * innerRadius;

        path.setAttribute('d', `M ${x1} ${y1} L ${x2} ${y2} A ${outerRadius} ${outerRadius} 0 0 1 ${x3} ${y3} L ${x4} ${y4} A ${innerRadius} ${innerRadius} 0 0 0 ${x1} ${y1}`);
        path.setAttribute('fill', 'rgba(26, 26, 46, 0.6)');
        path.setAttribute('stroke', 'rgba(155, 89, 182, 0.3)');
        path.setAttribute('stroke-width', '1');
        this.svg.appendChild(path);

        // Label
        const labelX = cx + Math.cos(angle) * (outerRadius * 0.7);
        const labelY = cy + Math.sin(angle) * (outerRadius * 0.7);
        this.drawLabel(labelX, labelY, 'DARK ZONE', this.options.colors.galacticCenter, 9, 'bold');
        this.drawLabel(labelX, labelY + 12, '(antisolar region)', this.options.colors.dim, 7);
    }

    // GALACTIC SCALE VIEW: Sun's orbit around the Milky Way
    drawGalacticScale(cx, cy) {
        const size = this.options.size;

        // Galactic year = 225 million Earth years
        const galacticYear = 225000000;
        const galacticAngle = (this.time / galacticYear) * Math.PI * 2;

        // Sun's distance from galactic center: ~26,000 light-years
        // Scale: 1 pixel = 500 light-years
        const gcDist = 52;  // 26,000 / 500

        // Draw simplified Milky Way structure
        // Galactic center (supermassive black hole Sagittarius A*)
        this.drawGalacticCenter(cx, cy);

        // Draw spiral arm indicators (simplified)
        this.drawSpiralArms(cx, cy);

        // Draw Sun's orbital path
        this.drawOrbit(cx, cy, gcDist, '', 'rgba(243, 156, 18, 0.3)');

        // Calculate Sun's position on its galactic orbit
        const sunX = cx + Math.cos(galacticAngle) * gcDist;
        const sunY = cy + Math.sin(galacticAngle) * gcDist;

        // Draw Sun (tiny at this scale)
        const sunDot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        sunDot.setAttribute('cx', sunX);
        sunDot.setAttribute('cy', sunY);
        sunDot.setAttribute('r', 6);
        sunDot.setAttribute('fill', this.options.colors.sun);
        sunDot.setAttribute('filter', 'url(#sunGlow)');
        this.svg.appendChild(sunDot);

        // "You are here" indicator
        this.drawLabel(sunX, sunY - 15, 'YOU ARE HERE', this.options.colors.earth, 9, 'bold');
        this.drawLabel(sunX, sunY + 20, 'in the Orion Arm', this.options.colors.dim, 8);

        // Add galactic trail
        if (this.showTrail) {
            this.galacticTrail.push({ x: sunX, y: sunY });
            if (this.galacticTrail.length > this.maxTrailLength) {
                this.galacticTrail.shift();
            }
            this.drawTrail(this.galacticTrail, this.options.colors.trail);
        }

        // Distance labels
        this.drawLabel(cx, cy + size/2 - 25, 'Scale: Each ring = 10,000 light-years', this.options.colors.dim, 9);

        // Galactic year counter
        const orbitsCompleted = Math.floor(this.time / galacticYear);
        const orbitProgress = ((this.time % galacticYear) / galacticYear * 100).toFixed(1);
        this.drawLabel(cx, size - 15, `Galactic orbits: ${orbitsCompleted} (${orbitProgress}% of current)`, this.options.colors.dim, 9);
    }

    drawGalacticCenter(cx, cy) {
        // Sagittarius A* - the supermassive black hole
        // Draw as a dark circle with purple accretion glow

        // Accretion disk glow
        const glow = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        glow.setAttribute('cx', cx);
        glow.setAttribute('cy', cy);
        glow.setAttribute('r', 18);
        glow.setAttribute('fill', 'rgba(155, 89, 182, 0.4)');
        glow.setAttribute('filter', 'url(#sunGlow)');
        this.svg.appendChild(glow);

        // Black hole
        const bh = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        bh.setAttribute('cx', cx);
        bh.setAttribute('cy', cy);
        bh.setAttribute('r', 8);
        bh.setAttribute('fill', '#1a1a2e');
        bh.setAttribute('stroke', this.options.colors.galacticCenter);
        bh.setAttribute('stroke-width', '2');
        this.svg.appendChild(bh);

        this.drawLabel(cx, cy + 30, 'GALACTIC CENTER', this.options.colors.galacticCenter, 10, 'bold');
        this.drawLabel(cx, cy + 42, 'Sagittarius A*', this.options.colors.dim, 8);
    }

    drawSpiralArms(cx, cy) {
        // Simplified spiral arm representation
        // The Milky Way has 4 major arms

        const arms = [
            { name: 'Perseus', offset: 0 },
            { name: 'Sagittarius', offset: Math.PI / 2 },
            { name: 'Scutum-Centaurus', offset: Math.PI },
            { name: 'Outer', offset: Math.PI * 1.5 }
        ];

        arms.forEach(arm => {
            // Draw a simplified spiral curve
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            let d = '';

            for (let t = 0.3; t < 2.5; t += 0.1) {
                const r = 20 + t * 40;  // Spiral outward
                const angle = arm.offset + t * 0.8;
                const x = cx + Math.cos(angle) * r;
                const y = cy + Math.sin(angle) * r;

                if (d === '') {
                    d = `M ${x} ${y}`;
                } else {
                    d += ` L ${x} ${y}`;
                }
            }

            path.setAttribute('d', d);
            path.setAttribute('fill', 'none');
            path.setAttribute('stroke', this.options.colors.spiralArm);
            path.setAttribute('stroke-width', '12');
            path.setAttribute('stroke-linecap', 'round');
            path.setAttribute('opacity', '0.5');
            this.svg.appendChild(path);
        });

        // Mark Orion Arm (where we are) - it's a minor arm
        const orionAngle = Math.PI * 0.7;
        const orionDist = 52;
        const orionX = cx + Math.cos(orionAngle) * orionDist;
        const orionY = cy + Math.sin(orionAngle) * orionDist;
    }

    drawArrow(cx, cy, angle, length, label, color) {
        const x2 = cx + Math.cos(angle) * length;
        const y2 = cy + Math.sin(angle) * length;

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', cx);
        line.setAttribute('y1', cy);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('stroke', color);
        line.setAttribute('stroke-width', '1');
        line.setAttribute('stroke-dasharray', '4,4');
        this.svg.appendChild(line);

        this.drawLabel(x2 + 10, y2, label, color, 8);
    }

    // BOTH TRUE VIEW: Shows that both perspectives are valid simultaneously
    drawBothTrue(cx, cy) {
        const scale = 18;

        // This view shows the system with a "balance point" (common center)
        // The Sun wobbles, Earth wobbles, everything moves

        const earthAngle = (this.time / this.earth.period) * Math.PI * 2;
        const jupiterAngle = (this.time / this.jupiter.period) * Math.PI * 2;

        // The balance point shifts based on Jupiter's position
        // (simplified - in reality it's more complex)
        const balanceShift = 8;  // pixels
        const balanceX = cx + Math.cos(jupiterAngle + Math.PI) * balanceShift;
        const balanceY = cy + Math.sin(jupiterAngle + Math.PI) * balanceShift;

        // Sun position (wobbles around balance point)
        const sunWobble = 12;
        const sunX = balanceX + Math.cos(jupiterAngle + Math.PI) * sunWobble;
        const sunY = balanceY + Math.sin(jupiterAngle + Math.PI) * sunWobble;

        // Earth position (orbits balance point, influenced by Sun)
        const earthDist = this.earth.distance * scale;
        const earthX = balanceX + Math.cos(earthAngle) * earthDist;
        const earthY = balanceY + Math.sin(earthAngle) * earthDist;

        // Jupiter position
        const jupiterDist = this.jupiter.distance * scale * 0.5;
        const jupiterX = balanceX + Math.cos(jupiterAngle) * jupiterDist;
        const jupiterY = balanceY + Math.sin(jupiterAngle) * jupiterDist;

        // Draw faint orbit guides
        this.drawOrbit(balanceX, balanceY, earthDist, '', 'rgba(255,255,255,0.1)');
        this.drawOrbit(balanceX, balanceY, jupiterDist, '', 'rgba(255,255,255,0.1)');

        // Draw balance point (the true center)
        this.drawBalancePoint(balanceX, balanceY);

        // Draw celestial bodies
        this.drawSun(sunX, sunY, 20);
        this.drawEarth(earthX, earthY, 12);
        this.drawPlanet(jupiterX, jupiterY, 14, this.options.colors.jupiter, '');

        // Add trails
        if (this.showTrail) {
            this.sunTrail.push({ x: sunX, y: sunY });
            this.earthTrail.push({ x: earthX, y: earthY });
            if (this.sunTrail.length > this.maxTrailLength) this.sunTrail.shift();
            if (this.earthTrail.length > this.maxTrailLength) this.earthTrail.shift();
            this.drawTrail(this.sunTrail, this.options.colors.trail);
            this.drawTrail(this.earthTrail, 'rgba(78, 205, 196, 0.4)');
        }

        // Connection lines showing relationship
        this.drawConnectionLine(sunX, sunY, balanceX, balanceY, 'rgba(243, 156, 18, 0.3)');
        this.drawConnectionLine(earthX, earthY, balanceX, balanceY, 'rgba(78, 205, 196, 0.3)');

        // Labels
        this.drawLabel(balanceX, balanceY - 20, 'BALANCE', this.options.colors.balancePoint, 10, 'bold');
        this.drawLabel(balanceX, balanceY - 8, 'POINT', this.options.colors.balancePoint, 10, 'bold');
    }

    drawOrbit(cx, cy, radius, label = '', color = null) {
        if (radius <= 0) return;

        const orbit = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        orbit.setAttribute('cx', cx);
        orbit.setAttribute('cy', cy);
        orbit.setAttribute('r', radius);
        orbit.setAttribute('fill', 'none');
        orbit.setAttribute('stroke', color || this.options.colors.orbit);
        orbit.setAttribute('stroke-width', '1');
        orbit.setAttribute('stroke-dasharray', '4,4');
        this.svg.appendChild(orbit);
    }

    drawSun(x, y, radius, isCenter = false) {
        // Glow
        const glow = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        glow.setAttribute('cx', x);
        glow.setAttribute('cy', y);
        glow.setAttribute('r', radius + 6);
        glow.setAttribute('fill', this.options.colors.sunGlow);
        glow.setAttribute('filter', 'url(#sunGlow)');
        this.svg.appendChild(glow);

        // Sun body
        const sun = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        sun.setAttribute('cx', x);
        sun.setAttribute('cy', y);
        sun.setAttribute('r', radius);
        sun.setAttribute('fill', 'url(#sunGrad)');
        this.svg.appendChild(sun);

        if (isCenter) {
            // Add emphasis ring
            const ring = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            ring.setAttribute('cx', x);
            ring.setAttribute('cy', y);
            ring.setAttribute('r', radius + 3);
            ring.setAttribute('fill', 'none');
            ring.setAttribute('stroke', this.options.colors.sun);
            ring.setAttribute('stroke-width', '2');
            this.svg.appendChild(ring);
        }
    }

    drawEarth(x, y, radius, isCenter = false) {
        // Glow
        const glow = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        glow.setAttribute('cx', x);
        glow.setAttribute('cy', y);
        glow.setAttribute('r', radius + 4);
        glow.setAttribute('fill', this.options.colors.earthGlow);
        this.svg.appendChild(glow);

        // Earth body
        const earth = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        earth.setAttribute('cx', x);
        earth.setAttribute('cy', y);
        earth.setAttribute('r', radius);
        earth.setAttribute('fill', 'url(#earthGrad)');
        this.svg.appendChild(earth);

        if (isCenter) {
            // Add emphasis ring
            const ring = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            ring.setAttribute('cx', x);
            ring.setAttribute('cy', y);
            ring.setAttribute('r', radius + 3);
            ring.setAttribute('fill', 'none');
            ring.setAttribute('stroke', this.options.colors.earth);
            ring.setAttribute('stroke-width', '2');
            this.svg.appendChild(ring);
        }
    }

    drawBalancePoint(x, y) {
        // Cross marker
        const size = 8;

        const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line1.setAttribute('x1', x - size);
        line1.setAttribute('y1', y);
        line1.setAttribute('x2', x + size);
        line1.setAttribute('y2', y);
        line1.setAttribute('stroke', this.options.colors.balancePoint);
        line1.setAttribute('stroke-width', '2');
        this.svg.appendChild(line1);

        const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line2.setAttribute('x1', x);
        line2.setAttribute('y1', y - size);
        line2.setAttribute('x2', x);
        line2.setAttribute('y2', y + size);
        line2.setAttribute('stroke', this.options.colors.balancePoint);
        line2.setAttribute('stroke-width', '2');
        this.svg.appendChild(line2);

        // Circle around it
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', x);
        circle.setAttribute('cy', y);
        circle.setAttribute('r', size + 4);
        circle.setAttribute('fill', 'none');
        circle.setAttribute('stroke', this.options.colors.balancePoint);
        circle.setAttribute('stroke-width', '1');
        circle.setAttribute('stroke-dasharray', '3,3');
        this.svg.appendChild(circle);
    }

    drawPlanet(x, y, radius, color, name) {
        const planet = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        planet.setAttribute('cx', x);
        planet.setAttribute('cy', y);
        planet.setAttribute('r', radius);
        planet.setAttribute('fill', color);
        this.svg.appendChild(planet);

        if (name) {
            this.drawLabel(x, y + radius + 12, name, this.options.colors.dim, 9);
        }
    }

    drawTrail(trail, color) {
        if (trail.length < 2) return;

        let pathData = `M ${trail[0].x} ${trail[0].y}`;
        for (let i = 1; i < trail.length; i++) {
            pathData += ` L ${trail[i].x} ${trail[i].y}`;
        }

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', pathData);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', color);
        path.setAttribute('stroke-width', '2');
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('opacity', '0.6');
        this.svg.appendChild(path);
    }

    drawConnectionLine(x1, y1, x2, y2, color) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('stroke', color);
        line.setAttribute('stroke-width', '1');
        line.setAttribute('stroke-dasharray', '2,2');
        this.svg.appendChild(line);
    }

    drawModeLabel() {
        const size = this.options.size;
        let label, sublabel;

        // Check scale mode first
        switch (this.scaleMode) {
            case this.SCALE_MODES.GALACTIC:
                label = 'GALACTIC SCALE';
                sublabel = 'Sun orbits the Milky Way: 225 million years per orbit';
                break;
            case this.SCALE_MODES.SOLAR:
                label = 'SOLAR NEIGHBORHOOD';
                sublabel = 'Our Sun among nearby stars (within 50 light-years)';
                break;
            case this.SCALE_MODES.LOCAL:
            default:
                // Use view mode labels for local scale
                switch (this.viewMode) {
                    case this.VIEW_MODES.EARTH_CENTER:
                        label = 'EARTH-CENTERED';
                        sublabel = 'As you experience it (Ptolemy)';
                        break;
                    case this.VIEW_MODES.SUN_CENTER:
                        label = 'SUN-CENTERED';
                        sublabel = 'The school version (Copernicus)';
                        break;
                    case this.VIEW_MODES.BOTH_TRUE:
                        label = 'BOTH ARE TRUE';
                        sublabel = 'Observer position determines center (Tycho/Epoch)';
                        break;
                }
                break;
        }

        this.drawLabel(size / 2, 22, label, this.options.colors.text, 13, 'bold');
        this.drawLabel(size / 2, 38, sublabel, this.options.colors.dim, 10);
    }

    drawLabel(x, y, text, color, size = 12, weight = 'normal') {
        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', x);
        label.setAttribute('y', y);
        label.setAttribute('text-anchor', 'middle');
        label.setAttribute('fill', color);
        label.setAttribute('font-size', size);
        label.setAttribute('font-family', 'system-ui, sans-serif');
        label.setAttribute('font-weight', weight);
        label.textContent = text;
        this.svg.appendChild(label);
    }

    // Controls
    setViewMode(mode) {
        if (Object.values(this.VIEW_MODES).includes(mode)) {
            this.viewMode = mode;
            this.sunTrail = [];
            this.earthTrail = [];
            this.galacticTrail = [];
            this.draw();
            this.notifyUpdate();
        }
    }

    setScaleMode(mode) {
        if (Object.values(this.SCALE_MODES).includes(mode)) {
            this.scaleMode = mode;
            this.sunTrail = [];
            this.earthTrail = [];
            this.galacticTrail = [];
            this.time = 0;  // Reset time when changing scale
            this.draw();
            this.notifyUpdate();
        }
    }

    cycleView() {
        const modes = Object.values(this.VIEW_MODES);
        const currentIndex = modes.indexOf(this.viewMode);
        const nextIndex = (currentIndex + 1) % modes.length;
        this.setViewMode(modes[nextIndex]);
    }

    cycleScale() {
        const scales = Object.values(this.SCALE_MODES);
        const currentIndex = scales.indexOf(this.scaleMode);
        const nextIndex = (currentIndex + 1) % scales.length;
        this.setScaleMode(scales[nextIndex]);
    }

    play() {
        if (this.isPlaying) return;
        this.isPlaying = true;

        const animate = () => {
            if (!this.isPlaying) return;

            // Speed varies by scale mode - slower for larger scales
            let timeStep;
            switch (this.scaleMode) {
                case this.SCALE_MODES.LOCAL:
                    timeStep = 0.008 * this.playSpeed;  // Slow: ~1 year in 2 seconds
                    break;
                case this.SCALE_MODES.SOLAR:
                    timeStep = 0.005 * this.playSpeed;  // Slower for neighborhood
                    break;
                case this.SCALE_MODES.GALACTIC:
                    timeStep = 1000000 * this.playSpeed;  // Million years per frame for galactic
                    break;
                default:
                    timeStep = 0.008 * this.playSpeed;
            }

            this.time += timeStep;
            this.draw();
            this.notifyUpdate();

            this.animationFrame = requestAnimationFrame(animate);
        };

        this.animationFrame = requestAnimationFrame(animate);
    }

    pause() {
        this.isPlaying = false;
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }

    reset() {
        this.pause();
        this.time = 0;
        this.sunTrail = [];
        this.earthTrail = [];
        this.galacticTrail = [];
        this.draw();
        this.notifyUpdate();
    }

    setSpeed(speed) {
        this.playSpeed = speed;
    }

    setShowTrail(show) {
        this.showTrail = show;
        if (!show) {
            this.sunTrail = [];
            this.earthTrail = [];
        }
        this.draw();
    }

    getInfo() {
        return {
            time: this.time,
            viewMode: this.viewMode,
            scaleMode: this.scaleMode,
            earthYear: this.time / this.earth.period,
            galacticYear: this.time / 225000000,
            description: this.getDescription()
        };
    }

    getDescription() {
        // Check scale mode first
        switch (this.scaleMode) {
            case this.SCALE_MODES.GALACTIC:
                return 'The Sun takes 225 million years to orbit the Milky Way. We are in the Orion Arm, 26,000 light-years from center.';
            case this.SCALE_MODES.SOLAR:
                return 'Our Sun is one of billions. The nearest star, Proxima Centauri, is 4.2 light-years away.';
            case this.SCALE_MODES.LOCAL:
            default:
                switch (this.viewMode) {
                    case this.VIEW_MODES.EARTH_CENTER:
                        return 'From Earth, the Sun appears to orbit us once per year. This is your direct experience.';
                    case this.VIEW_MODES.SUN_CENTER:
                        return 'From an external view, Earth orbits the Sun. This is the simplified school model.';
                    case this.VIEW_MODES.BOTH_TRUE:
                        return 'Both views are mathematically valid. The "center" depends on where you stand.';
                    default:
                        return '';
                }
        }
    }

    notifyUpdate() {
        if (this.onUpdate) {
            this.onUpdate(this.getInfo());
        }
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SolarSystemMotion;
}
