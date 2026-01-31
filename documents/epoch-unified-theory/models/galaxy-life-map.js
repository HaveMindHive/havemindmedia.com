/**
 * GALAXY LIFE MAP
 * Interactive visualization: See how galaxy structure determines where life forms
 *
 * Have Mind Media | January 30, 2026 | [1 = -1]
 *
 * The "aha moment": You can LOOK at a galaxy and know if life can form there.
 * Spirals = life factories. Ellipticals = graveyards. The shape tells you.
 */

class GalaxyLifeMap {
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
                lifeHigh: options.colors?.lifeHigh || '#4ecdc4',      // Teal
                lifeMedium: options.colors?.lifeMedium || '#d4af37',  // Gold
                lifeLow: options.colors?.lifeLow || '#ff6b6b',        // Coral
                text: options.colors?.text || '#e8dcc4',              // Soft cream
                dim: options.colors?.dim || 'rgba(255, 255, 255, 0.5)',
                arm: options.colors?.arm || 'rgba(78, 205, 196, 0.6)',
                core: options.colors?.core || 'rgba(255, 107, 107, 0.4)'
            }
        };

        // Galaxy types with life potential data
        this.galaxyTypes = {
            spiral: {
                name: 'Spiral Galaxy',
                lifePotential: 0.85,
                description: 'LIFE FACTORY',
                features: [
                    'Spiral arms create new stars constantly',
                    'Rich in gas and dust (building blocks)',
                    'Organization enables chemistry',
                    'Our Milky Way is this type'
                ],
                regions: {
                    arms: { potential: 0.92, label: 'Spiral Arms' },
                    disk: { potential: 0.70, label: 'Galactic Disk' },
                    core: { potential: 0.15, label: 'Central Bulge' },
                    halo: { potential: 0.05, label: 'Outer Halo' }
                }
            },
            barred: {
                name: 'Barred Spiral',
                lifePotential: 0.80,
                description: 'ACTIVE LIFE ZONE',
                features: [
                    'Central bar channels gas to arms',
                    'Intense star formation regions',
                    'Similar to spiral but more dynamic',
                    'Milky Way has a partial bar'
                ],
                regions: {
                    arms: { potential: 0.88, label: 'Outer Arms' },
                    bar: { potential: 0.45, label: 'Central Bar' },
                    ends: { potential: 0.82, label: 'Bar Ends' },
                    halo: { potential: 0.08, label: 'Outer Halo' }
                }
            },
            elliptical: {
                name: 'Elliptical Galaxy',
                lifePotential: 0.08,
                description: 'GRAVEYARD',
                features: [
                    'No new stars forming',
                    'Gas and dust exhausted',
                    'Only old, dying stars remain',
                    'Random motion, no structure'
                ],
                regions: {
                    center: { potential: 0.12, label: 'Dense Core' },
                    middle: { potential: 0.06, label: 'Middle Region' },
                    outer: { potential: 0.03, label: 'Outer Region' },
                    edge: { potential: 0.01, label: 'Edge' }
                }
            },
            irregular: {
                name: 'Irregular Galaxy',
                lifePotential: 0.55,
                description: 'CHAOTIC NURSERY',
                features: [
                    'No defined shape or structure',
                    'Bursts of star formation',
                    'Often result of galactic collision',
                    'High activity but unpredictable'
                ],
                regions: {
                    active: { potential: 0.75, label: 'Active Regions' },
                    quiet: { potential: 0.35, label: 'Quiet Zones' },
                    edge: { potential: 0.20, label: 'Outer Edge' }
                }
            }
        };

        this.currentType = 'spiral';
        this.highlightedRegion = null;
        this.onUpdate = options.onUpdate || null;

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

        // Add gradient definitions
        this.addGradients();

        // Draw based on galaxy type
        switch (this.currentType) {
            case 'spiral':
                this.drawSpiralGalaxy(cx, cy);
                break;
            case 'barred':
                this.drawBarredGalaxy(cx, cy);
                break;
            case 'elliptical':
                this.drawEllipticalGalaxy(cx, cy);
                break;
            case 'irregular':
                this.drawIrregularGalaxy(cx, cy);
                break;
        }

        // Draw legend
        this.drawLegend();
    }

    addGradients() {
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');

        // Life-rich gradient (teal)
        const lifeGradient = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
        lifeGradient.setAttribute('id', 'lifeRichGradient');
        lifeGradient.innerHTML = `
            <stop offset="0%" stop-color="${this.options.colors.lifeHigh}" stop-opacity="0.8"/>
            <stop offset="100%" stop-color="${this.options.colors.lifeHigh}" stop-opacity="0.2"/>
        `;
        defs.appendChild(lifeGradient);

        // Core gradient (red)
        const coreGradient = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
        coreGradient.setAttribute('id', 'coreGradient');
        coreGradient.innerHTML = `
            <stop offset="0%" stop-color="${this.options.colors.lifeLow}" stop-opacity="0.8"/>
            <stop offset="100%" stop-color="${this.options.colors.lifeLow}" stop-opacity="0.2"/>
        `;
        defs.appendChild(coreGradient);

        // Arm glow
        const armGlow = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
        armGlow.setAttribute('id', 'armGlow');
        armGlow.innerHTML = `
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        `;
        defs.appendChild(armGlow);

        this.svg.appendChild(defs);
    }

    drawSpiralGalaxy(cx, cy) {
        const maxRadius = this.options.size * 0.42;

        // Outer halo (very dim)
        this.drawRegion(cx, cy, maxRadius, 'halo', 0.05, 'rgba(255, 255, 255, 0.05)');

        // Disk
        this.drawRegion(cx, cy, maxRadius * 0.85, 'disk', 0.70, 'rgba(212, 175, 55, 0.15)');

        // Spiral arms (the life-rich zones)
        for (let arm = 0; arm < 2; arm++) {
            this.drawSpiralArm(cx, cy, maxRadius * 0.9, arm * Math.PI, 'arms');
        }

        // Central bulge (lower life potential)
        this.drawRegion(cx, cy, maxRadius * 0.2, 'core', 0.15, 'url(#coreGradient)');

        // Center bright point
        const center = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        center.setAttribute('cx', cx);
        center.setAttribute('cy', cy);
        center.setAttribute('r', 8);
        center.setAttribute('fill', this.options.colors.lifeLow);
        center.setAttribute('opacity', '0.8');
        this.svg.appendChild(center);
    }

    drawSpiralArm(cx, cy, maxRadius, startAngle, regionKey) {
        const points = [];
        const turns = 1.5;
        const segments = 60;

        // Generate spiral points
        for (let i = 0; i <= segments; i++) {
            const t = i / segments;
            const angle = startAngle + t * turns * Math.PI * 2;
            const r = (0.2 + t * 0.8) * maxRadius;

            // Add some width variation
            const width = 20 + Math.sin(t * Math.PI) * 15;

            // Inner edge
            const innerR = r - width / 2;
            const outerR = r + width / 2;

            points.push({
                inner: { x: cx + innerR * Math.cos(angle), y: cy + innerR * Math.sin(angle) },
                outer: { x: cx + outerR * Math.cos(angle), y: cy + outerR * Math.sin(angle) }
            });
        }

        // Build path
        let pathData = `M ${points[0].inner.x} ${points[0].inner.y}`;

        // Inner edge
        for (let i = 1; i < points.length; i++) {
            pathData += ` L ${points[i].inner.x} ${points[i].inner.y}`;
        }

        // Outer edge (reverse)
        for (let i = points.length - 1; i >= 0; i--) {
            pathData += ` L ${points[i].outer.x} ${points[i].outer.y}`;
        }

        pathData += ' Z';

        const arm = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        arm.setAttribute('d', pathData);
        arm.setAttribute('fill', this.options.colors.arm);
        arm.setAttribute('filter', 'url(#armGlow)');
        arm.setAttribute('data-region', regionKey);
        arm.style.cursor = 'pointer';

        arm.addEventListener('mouseenter', () => this.highlightRegion(regionKey));
        arm.addEventListener('mouseleave', () => this.clearHighlight());

        this.svg.appendChild(arm);

        // Add star points along the arm
        for (let i = 5; i < points.length; i += 8) {
            const p = points[i];
            const starX = (p.inner.x + p.outer.x) / 2 + (Math.random() - 0.5) * 10;
            const starY = (p.inner.y + p.outer.y) / 2 + (Math.random() - 0.5) * 10;

            const star = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            star.setAttribute('cx', starX);
            star.setAttribute('cy', starY);
            star.setAttribute('r', 2 + Math.random() * 2);
            star.setAttribute('fill', this.options.colors.lifeHigh);
            star.setAttribute('opacity', 0.6 + Math.random() * 0.4);
            this.svg.appendChild(star);
        }
    }

    drawBarredGalaxy(cx, cy) {
        const maxRadius = this.options.size * 0.42;

        // Outer halo
        this.drawRegion(cx, cy, maxRadius, 'halo', 0.08, 'rgba(255, 255, 255, 0.05)');

        // Outer arms (from bar ends)
        this.drawSpiralArm(cx, cy, maxRadius * 0.9, 0, 'arms');
        this.drawSpiralArm(cx, cy, maxRadius * 0.9, Math.PI, 'arms');

        // Central bar
        const barWidth = maxRadius * 0.15;
        const barLength = maxRadius * 0.5;

        const bar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        bar.setAttribute('x', cx - barLength);
        bar.setAttribute('y', cy - barWidth / 2);
        bar.setAttribute('width', barLength * 2);
        bar.setAttribute('height', barWidth);
        bar.setAttribute('rx', barWidth / 2);
        bar.setAttribute('fill', 'rgba(212, 175, 55, 0.4)');
        bar.setAttribute('data-region', 'bar');
        bar.style.cursor = 'pointer';

        bar.addEventListener('mouseenter', () => this.highlightRegion('bar'));
        bar.addEventListener('mouseleave', () => this.clearHighlight());

        this.svg.appendChild(bar);

        // Bar end bright spots
        for (const xOffset of [-barLength, barLength]) {
            const end = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            end.setAttribute('cx', cx + xOffset);
            end.setAttribute('cy', cy);
            end.setAttribute('r', 12);
            end.setAttribute('fill', this.options.colors.arm);
            end.setAttribute('opacity', '0.7');
            end.setAttribute('data-region', 'ends');
            end.style.cursor = 'pointer';

            end.addEventListener('mouseenter', () => this.highlightRegion('ends'));
            end.addEventListener('mouseleave', () => this.clearHighlight());

            this.svg.appendChild(end);
        }

        // Central core
        const core = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        core.setAttribute('cx', cx);
        core.setAttribute('cy', cy);
        core.setAttribute('r', 15);
        core.setAttribute('fill', this.options.colors.lifeLow);
        core.setAttribute('opacity', '0.6');
        this.svg.appendChild(core);
    }

    drawEllipticalGalaxy(cx, cy) {
        const maxRadius = this.options.size * 0.42;

        // Concentric ellipses showing uniform, boring structure
        const layers = [
            { rx: maxRadius, ry: maxRadius * 0.6, key: 'edge', opacity: 0.1 },
            { rx: maxRadius * 0.75, ry: maxRadius * 0.45, key: 'outer', opacity: 0.15 },
            { rx: maxRadius * 0.5, ry: maxRadius * 0.3, key: 'middle', opacity: 0.25 },
            { rx: maxRadius * 0.25, ry: maxRadius * 0.15, key: 'center', opacity: 0.4 }
        ];

        for (const layer of layers) {
            const ellipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
            ellipse.setAttribute('cx', cx);
            ellipse.setAttribute('cy', cy);
            ellipse.setAttribute('rx', layer.rx);
            ellipse.setAttribute('ry', layer.ry);
            ellipse.setAttribute('fill', this.options.colors.lifeLow);
            ellipse.setAttribute('opacity', layer.opacity);
            ellipse.setAttribute('data-region', layer.key);
            ellipse.style.cursor = 'pointer';

            ellipse.addEventListener('mouseenter', () => this.highlightRegion(layer.key));
            ellipse.addEventListener('mouseleave', () => this.clearHighlight());

            this.svg.appendChild(ellipse);
        }

        // Scattered old stars (dim, random)
        for (let i = 0; i < 30; i++) {
            const angle = Math.random() * Math.PI * 2;
            const r = Math.random() * maxRadius * 0.8;
            const x = cx + r * Math.cos(angle) * 1.0;
            const y = cy + r * Math.sin(angle) * 0.6;

            const star = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            star.setAttribute('cx', x);
            star.setAttribute('cy', y);
            star.setAttribute('r', 1 + Math.random() * 1.5);
            star.setAttribute('fill', this.options.colors.lifeLow);
            star.setAttribute('opacity', 0.3 + Math.random() * 0.3);
            this.svg.appendChild(star);
        }

        // Text overlay
        this.drawLabel(cx, cy + maxRadius * 0.75, 'No structure. No new stars.', this.options.colors.dim, 11);
    }

    drawIrregularGalaxy(cx, cy) {
        const maxRadius = this.options.size * 0.42;

        // Random blobs representing chaotic structure
        const blobs = [
            { x: cx - 40, y: cy - 30, rx: 60, ry: 40, key: 'active', life: 0.75 },
            { x: cx + 50, y: cy + 20, rx: 45, ry: 55, key: 'active', life: 0.72 },
            { x: cx - 20, y: cy + 50, rx: 35, ry: 30, key: 'quiet', life: 0.35 },
            { x: cx + 30, y: cy - 50, rx: 50, ry: 35, key: 'quiet', life: 0.40 },
            { x: cx - 70, y: cy + 10, rx: 30, ry: 25, key: 'edge', life: 0.20 }
        ];

        for (const blob of blobs) {
            const color = blob.life > 0.5 ? this.options.colors.lifeHigh :
                blob.life > 0.3 ? this.options.colors.lifeMedium :
                    this.options.colors.lifeLow;

            const ellipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
            ellipse.setAttribute('cx', blob.x);
            ellipse.setAttribute('cy', blob.y);
            ellipse.setAttribute('rx', blob.rx);
            ellipse.setAttribute('ry', blob.ry);
            ellipse.setAttribute('fill', color);
            ellipse.setAttribute('opacity', 0.3 + blob.life * 0.3);
            ellipse.setAttribute('data-region', blob.key);
            ellipse.style.cursor = 'pointer';

            ellipse.addEventListener('mouseenter', () => this.highlightRegion(blob.key));
            ellipse.addEventListener('mouseleave', () => this.clearHighlight());

            this.svg.appendChild(ellipse);

            // Add stars in active regions
            if (blob.life > 0.5) {
                for (let i = 0; i < 8; i++) {
                    const sx = blob.x + (Math.random() - 0.5) * blob.rx * 1.5;
                    const sy = blob.y + (Math.random() - 0.5) * blob.ry * 1.5;

                    const star = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                    star.setAttribute('cx', sx);
                    star.setAttribute('cy', sy);
                    star.setAttribute('r', 2 + Math.random() * 2);
                    star.setAttribute('fill', this.options.colors.lifeHigh);
                    star.setAttribute('opacity', 0.5 + Math.random() * 0.5);
                    this.svg.appendChild(star);
                }
            }
        }
    }

    drawRegion(cx, cy, radius, regionKey, lifePotential, fill) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', cx);
        circle.setAttribute('cy', cy);
        circle.setAttribute('r', radius);
        circle.setAttribute('fill', fill);
        circle.setAttribute('data-region', regionKey);
        circle.style.cursor = 'pointer';

        circle.addEventListener('mouseenter', () => this.highlightRegion(regionKey));
        circle.addEventListener('mouseleave', () => this.clearHighlight());

        this.svg.appendChild(circle);
    }

    drawLegend() {
        const startX = 10;
        const startY = this.options.size - 60;

        // Life potential color key
        const items = [
            { color: this.options.colors.lifeHigh, label: 'High Life Potential' },
            { color: this.options.colors.lifeMedium, label: 'Moderate' },
            { color: this.options.colors.lifeLow, label: 'Low / Hostile' }
        ];

        items.forEach((item, i) => {
            const y = startY + i * 18;

            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', startX);
            rect.setAttribute('y', y);
            rect.setAttribute('width', 12);
            rect.setAttribute('height', 12);
            rect.setAttribute('rx', 2);
            rect.setAttribute('fill', item.color);
            this.svg.appendChild(rect);

            this.drawLabel(startX + 20, y + 10, item.label, this.options.colors.dim, 10, 'start');
        });
    }

    drawLabel(x, y, text, color, size = 12, anchor = 'middle') {
        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', x);
        label.setAttribute('y', y);
        label.setAttribute('text-anchor', anchor);
        label.setAttribute('fill', color);
        label.setAttribute('font-size', size);
        label.setAttribute('font-family', 'system-ui, sans-serif');
        label.textContent = text;
        this.svg.appendChild(label);
    }

    highlightRegion(regionKey) {
        this.highlightedRegion = regionKey;
        if (this.onUpdate) {
            const galaxy = this.galaxyTypes[this.currentType];
            const region = galaxy.regions[regionKey];
            if (region) {
                this.onUpdate({
                    type: 'region',
                    region: regionKey,
                    label: region.label,
                    potential: region.potential
                });
            }
        }
    }

    clearHighlight() {
        this.highlightedRegion = null;
        if (this.onUpdate) {
            this.onUpdate({ type: 'clear' });
        }
    }

    setGalaxyType(type) {
        if (type in this.galaxyTypes) {
            this.currentType = type;
            this.draw();

            if (this.onUpdate) {
                this.onUpdate({
                    type: 'galaxyChange',
                    galaxy: this.galaxyTypes[type]
                });
            }
        }
    }

    getGalaxyType() {
        return this.currentType;
    }

    getGalaxyInfo() {
        return this.galaxyTypes[this.currentType];
    }

    getAllTypes() {
        return Object.keys(this.galaxyTypes).map(key => ({
            key,
            ...this.galaxyTypes[key]
        }));
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GalaxyLifeMap;
}
