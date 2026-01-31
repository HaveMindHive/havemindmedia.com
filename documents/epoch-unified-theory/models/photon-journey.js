/**
 * PHOTON JOURNEY
 * Interactive visualization of a photon's path from Sun's core to your eye
 *
 * Have Mind Media | January 30, 2026 | [1 = -1]
 *
 * The "aha moment": The light you see right now was CREATED when humans
 * were making stone tools 100,000 years ago. You are receiving ancient mail.
 */

class PhotonJourney {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Container #${containerId} not found`);
            return;
        }

        // Configuration
        this.options = {
            width: options.width || 600,
            height: options.height || 300,
            colors: {
                photon: options.colors?.photon || '#d4af37',
                sunCore: options.colors?.sunCore || '#ff6b6b',
                sunSurface: options.colors?.sunSurface || '#f39c12',
                space: options.colors?.space || '#4a8ec8',
                earth: options.colors?.earth || '#4ecdc4',
                text: options.colors?.text || '#e8dcc4',
                dim: options.colors?.dim || 'rgba(255, 255, 255, 0.5)'
            }
        };

        // Journey phases
        this.phases = {
            CORE: { name: 'Sun\'s Core', duration: 100000, position: 0 },
            RADIATIVE: { name: 'Radiative Zone', duration: 0, position: 0.15 },
            CONVECTIVE: { name: 'Convective Zone', duration: 0, position: 0.3 },
            SURFACE: { name: 'Sun\'s Surface', duration: 0, position: 0.4 },
            SPACE: { name: 'Space', duration: 0.000015, position: 0.5 },
            EARTH: { name: 'Earth', duration: 0, position: 0.95 },
            EYE: { name: 'Your Eye', duration: 0, position: 1.0 }
        };

        // State
        this.progress = 0;        // 0 to 1
        this.isPlaying = false;
        this.animationFrame = null;
        this.playSpeed = 1;

        // Callbacks
        this.onUpdate = options.onUpdate || null;
        this.onPhaseChange = options.onPhaseChange || null;

        this.setupSVG();
        this.draw();
    }

    setupSVG() {
        const { width, height } = this.options;

        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.svg.setAttribute('width', '100%');
        this.svg.setAttribute('height', height);
        this.svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
        this.svg.style.display = 'block';
        this.svg.style.maxWidth = `${width}px`;
        this.svg.style.margin = '0 auto';

        this.container.appendChild(this.svg);
    }

    draw() {
        this.svg.innerHTML = '';

        const { width, height } = this.options;
        const centerY = height / 2;

        // Add gradients
        this.addDefs();

        // Draw the journey path
        this.drawSun(50, centerY);
        this.drawPath(90, centerY, width - 90);
        this.drawEarth(width - 50, centerY);

        // Draw the photon
        this.drawPhoton();

        // Draw phase labels
        this.drawPhaseLabels();

        // Draw bounce visualization (inside sun)
        if (this.progress < 0.4) {
            this.drawBounces();
        }
    }

    addDefs() {
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');

        // Sun gradient
        const sunGrad = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
        sunGrad.setAttribute('id', 'sunGradient');
        sunGrad.innerHTML = `
            <stop offset="0%" stop-color="#fff5e0"/>
            <stop offset="30%" stop-color="${this.options.colors.sunCore}"/>
            <stop offset="70%" stop-color="${this.options.colors.sunSurface}"/>
            <stop offset="100%" stop-color="${this.options.colors.sunSurface}" stop-opacity="0.5"/>
        `;
        defs.appendChild(sunGrad);

        // Earth gradient
        const earthGrad = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
        earthGrad.setAttribute('id', 'earthGradient');
        earthGrad.innerHTML = `
            <stop offset="0%" stop-color="#4ecdc4"/>
            <stop offset="50%" stop-color="#3498db"/>
            <stop offset="100%" stop-color="#2980b9"/>
        `;
        defs.appendChild(earthGrad);

        // Photon glow
        const glowFilter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
        glowFilter.setAttribute('id', 'photonGlow');
        glowFilter.innerHTML = `
            <feGaussianBlur stdDeviation="4" result="blur"/>
            <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        `;
        defs.appendChild(glowFilter);

        this.svg.appendChild(defs);
    }

    drawSun(cx, cy) {
        const radius = 45;

        // Outer glow
        const glow = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        glow.setAttribute('cx', cx);
        glow.setAttribute('cy', cy);
        glow.setAttribute('r', radius + 10);
        glow.setAttribute('fill', this.options.colors.sunSurface);
        glow.setAttribute('opacity', '0.3');
        this.svg.appendChild(glow);

        // Sun body
        const sun = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        sun.setAttribute('cx', cx);
        sun.setAttribute('cy', cy);
        sun.setAttribute('r', radius);
        sun.setAttribute('fill', 'url(#sunGradient)');
        this.svg.appendChild(sun);

        // Core indicator
        const core = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        core.setAttribute('cx', cx);
        core.setAttribute('cy', cy);
        core.setAttribute('r', 15);
        core.setAttribute('fill', '#fff');
        core.setAttribute('opacity', '0.8');
        this.svg.appendChild(core);

        // Label
        this.drawLabel(cx, cy + radius + 20, 'SUN', this.options.colors.sunSurface, 12, 'bold');
    }

    drawEarth(cx, cy) {
        const radius = 20;

        // Earth
        const earth = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        earth.setAttribute('cx', cx);
        earth.setAttribute('cy', cy);
        earth.setAttribute('r', radius);
        earth.setAttribute('fill', 'url(#earthGradient)');
        this.svg.appendChild(earth);

        // Eye indicator
        const eye = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        eye.setAttribute('cx', cx - 5);
        eye.setAttribute('cy', cy - 5);
        eye.setAttribute('r', 5);
        eye.setAttribute('fill', '#fff');
        eye.setAttribute('opacity', '0.8');
        this.svg.appendChild(eye);

        // Label
        this.drawLabel(cx, cy + radius + 20, 'YOUR EYE', this.options.colors.earth, 12, 'bold');
    }

    drawPath(startX, y, length) {
        // Main path line
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        path.setAttribute('x1', startX);
        path.setAttribute('y1', y);
        path.setAttribute('x2', startX + length);
        path.setAttribute('y2', y);
        path.setAttribute('stroke', 'rgba(255, 255, 255, 0.2)');
        path.setAttribute('stroke-width', '2');
        path.setAttribute('stroke-dasharray', '5,5');
        this.svg.appendChild(path);

        // Progress indicator
        const progressLength = this.progress * length;
        if (progressLength > 0) {
            const progressLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            progressLine.setAttribute('x1', startX);
            progressLine.setAttribute('y1', y);
            progressLine.setAttribute('x2', startX + progressLength);
            progressLine.setAttribute('y2', y);
            progressLine.setAttribute('stroke', this.options.colors.photon);
            progressLine.setAttribute('stroke-width', '3');
            this.svg.appendChild(progressLine);
        }
    }

    drawPhoton() {
        const { width, height } = this.options;
        const centerY = height / 2;

        // Calculate photon position
        const startX = 50;  // Sun center
        const endX = width - 50;  // Earth center
        const travelRange = endX - startX;

        let photonX, photonY;

        if (this.progress < 0.4) {
            // Inside sun - bouncing randomly
            const sunRadius = 45;
            const angle = this.progress * 200 + Math.sin(this.progress * 50) * 2;
            const r = sunRadius * (0.8 - this.progress * 1.5);
            photonX = startX + Math.cos(angle) * Math.max(5, r);
            photonY = centerY + Math.sin(angle) * Math.max(5, r) * 0.5;
        } else {
            // In space - straight line
            const spaceProgress = (this.progress - 0.4) / 0.6;
            photonX = startX + 45 + spaceProgress * (travelRange - 65);
            photonY = centerY;
        }

        // Photon glow
        const glow = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        glow.setAttribute('cx', photonX);
        glow.setAttribute('cy', photonY);
        glow.setAttribute('r', 12);
        glow.setAttribute('fill', this.options.colors.photon);
        glow.setAttribute('opacity', '0.4');
        glow.setAttribute('filter', 'url(#photonGlow)');
        this.svg.appendChild(glow);

        // Photon core
        const photon = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        photon.setAttribute('cx', photonX);
        photon.setAttribute('cy', photonY);
        photon.setAttribute('r', 6);
        photon.setAttribute('fill', this.options.colors.photon);
        this.svg.appendChild(photon);

        // Inner bright spot
        const bright = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        bright.setAttribute('cx', photonX - 1);
        bright.setAttribute('cy', photonY - 1);
        bright.setAttribute('r', 2);
        bright.setAttribute('fill', '#fff');
        this.svg.appendChild(bright);
    }

    drawBounces() {
        const { height } = this.options;
        const centerY = height / 2;
        const sunX = 50;

        // Draw random bounce paths inside sun
        const numBounces = Math.min(10, Math.floor(this.progress * 30));

        for (let i = 0; i < numBounces; i++) {
            const angle1 = (i / numBounces) * Math.PI * 2;
            const angle2 = ((i + 0.5) / numBounces) * Math.PI * 2;
            const r1 = 15 + Math.random() * 25;
            const r2 = 15 + Math.random() * 25;

            const x1 = sunX + Math.cos(angle1) * r1;
            const y1 = centerY + Math.sin(angle1) * r1 * 0.6;
            const x2 = sunX + Math.cos(angle2) * r2;
            const y2 = centerY + Math.sin(angle2) * r2 * 0.6;

            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', x1);
            line.setAttribute('y1', y1);
            line.setAttribute('x2', x2);
            line.setAttribute('y2', y2);
            line.setAttribute('stroke', this.options.colors.photon);
            line.setAttribute('stroke-width', '1');
            line.setAttribute('opacity', '0.3');
            this.svg.appendChild(line);
        }
    }

    drawPhaseLabels() {
        const { width, height } = this.options;
        const labelY = height - 25;

        // Time markers
        const markers = [
            { x: 50, label: 'BIRTH', sublabel: '100,000 years ago' },
            { x: width * 0.4, label: 'ESCAPE', sublabel: 'breaks free' },
            { x: width - 50, label: 'NOW', sublabel: '8 min later' }
        ];

        markers.forEach(m => {
            // Vertical tick
            const tick = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            tick.setAttribute('x1', m.x);
            tick.setAttribute('y1', height / 2 + 30);
            tick.setAttribute('x2', m.x);
            tick.setAttribute('y2', height / 2 + 40);
            tick.setAttribute('stroke', this.options.colors.dim);
            tick.setAttribute('stroke-width', '1');
            this.svg.appendChild(tick);

            this.drawLabel(m.x, labelY - 12, m.label, this.options.colors.text, 10, 'bold');
            this.drawLabel(m.x, labelY + 2, m.sublabel, this.options.colors.dim, 9);
        });
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

    // Playback controls
    play() {
        if (this.isPlaying) return;
        this.isPlaying = true;

        const animate = () => {
            if (!this.isPlaying) return;

            this.progress += 0.002 * this.playSpeed;

            if (this.progress >= 1) {
                this.progress = 1;
                this.isPlaying = false;
            }

            this.draw();
            this.notifyUpdate();

            if (this.isPlaying) {
                this.animationFrame = requestAnimationFrame(animate);
            }
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
        this.progress = 0;
        this.draw();
        this.notifyUpdate();
    }

    setProgress(value) {
        this.progress = Math.max(0, Math.min(1, value));
        this.draw();
        this.notifyUpdate();
    }

    setSpeed(speed) {
        this.playSpeed = speed;
    }

    getProgress() {
        return this.progress;
    }

    getCurrentPhase() {
        if (this.progress < 0.15) return 'core';
        if (this.progress < 0.25) return 'radiative';
        if (this.progress < 0.35) return 'convective';
        if (this.progress < 0.42) return 'surface';
        if (this.progress < 0.95) return 'space';
        if (this.progress < 0.99) return 'atmosphere';
        return 'eye';
    }

    getInfo() {
        const phase = this.getCurrentPhase();

        // Calculate age and other stats
        let ageYears = 0;
        let wavelength = 'Gamma Ray';
        let energy = 100;

        if (this.progress < 0.4) {
            // Inside sun
            ageYears = Math.round(this.progress * 250000);
            wavelength = this.progress < 0.2 ? 'Gamma Ray' : 'X-Ray';
            energy = 100 - this.progress * 150;
        } else {
            // In space
            ageYears = 100000;
            wavelength = 'Visible Light';
            energy = 40;

            // Add 8 minutes for space travel
            const spaceProgress = (this.progress - 0.4) / 0.6;
            const minutesInSpace = Math.round(spaceProgress * 8 * 100) / 100;
            if (minutesInSpace > 0) {
                ageYears = `100,000 years + ${minutesInSpace.toFixed(1)} min`;
            }
        }

        return {
            progress: this.progress,
            phase,
            ageYears,
            wavelength,
            energy: Math.max(0, Math.round(energy)),
            description: this.getPhaseDescription(phase)
        };
    }

    getPhaseDescription(phase) {
        const descriptions = {
            core: 'Born in nuclear fusion at 15 million °C',
            radiative: 'Bouncing through dense plasma',
            convective: 'Carried upward by convection currents',
            surface: 'Breaking free from the photosphere',
            space: 'Traveling at 299,792 km/s through empty space',
            atmosphere: 'Passing through Earth\'s atmosphere',
            eye: 'Absorbed by your retina — journey complete'
        };
        return descriptions[phase] || '';
    }

    notifyUpdate() {
        if (this.onUpdate) {
            this.onUpdate(this.getInfo());
        }
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PhotonJourney;
}
