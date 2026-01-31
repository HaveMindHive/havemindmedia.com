/**
 * EPOCH LIFE CALCULATOR
 * Interactive visualization of the life density equation: Ω = Τ × Κ × Φ × Σ
 *
 * Have Mind Media | January 30, 2026 | [1 = -1]
 *
 * The "aha moment": Life isn't random chance — it's geometry.
 * Change the factors, watch the result change.
 */

class LifeCalculator {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Container #${containerId} not found`);
            return;
        }

        // The four factors (0 to 1 normalized)
        this.factors = {
            T: 0.75,  // Τ - Torsion organization (how structured is local geometry)
            K: 0.95,  // Κ - Star alignment (how Sun-like is the star)
            P: 1.00,  // Φ - Phase position (where in the 1729 cycle)
            S: 0.90   // Σ - Accessibility (how many scalar dimensions accessible)
        };

        // Preset locations
        this.presets = {
            earth: { T: 0.75, K: 0.95, P: 1.00, S: 0.90, name: "Earth's neighborhood" },
            elliptical: { T: 0.10, K: 0.50, P: 0.50, S: 0.20, name: "Elliptical galaxy" },
            core: { T: 0.30, K: 0.30, P: 0.30, S: 0.10, name: "Galactic core" },
            void: { T: 0.01, K: 0.10, P: 0.10, S: 0.10, name: "Intergalactic void" },
            spiral_arm: { T: 0.90, K: 0.85, P: 0.90, S: 0.95, name: "Spiral arm interior" }
        };

        this.options = {
            colors: {
                bar: options.colors?.bar || 'linear-gradient(90deg, #4a8ec8, #d4af37)',
                highlight: options.colors?.highlight || '#d4af37',
                text: options.colors?.text || '#e8dcc4'
            }
        };

        this.onUpdate = options.onUpdate || null;

        this.init();
    }

    init() {
        this.draw();
    }

    // Calculate Ω = Τ × Κ × Φ × Σ
    calculate() {
        const omega = this.factors.T * this.factors.K * this.factors.P * this.factors.S;
        return omega;
    }

    // Get percentage (0-100)
    getPercentage() {
        return this.calculate() * 100;
    }

    // Get description based on Ω value
    getDescription() {
        const omega = this.calculate();

        if (omega >= 0.5) {
            return "HIGHLY LIFE-RICH — Optimal conditions for life";
        } else if (omega >= 0.2) {
            return "MODERATE — Life possible but not abundant";
        } else if (omega >= 0.05) {
            return "LOW — Life rare, conditions challenging";
        } else if (omega >= 0.01) {
            return "VERY LOW — Life extremely rare";
        } else {
            return "BARREN — Conditions incompatible with life as we understand it";
        }
    }

    // Set a factor value
    setFactor(factor, value) {
        if (factor in this.factors) {
            this.factors[factor] = Math.max(0, Math.min(1, value));
            if (this.onUpdate) {
                this.onUpdate(this.getState());
            }
        }
    }

    // Get all current state
    getState() {
        return {
            factors: { ...this.factors },
            omega: this.calculate(),
            percentage: this.getPercentage(),
            description: this.getDescription()
        };
    }

    // Apply a preset
    applyPreset(presetName) {
        if (presetName in this.presets) {
            const preset = this.presets[presetName];
            this.factors.T = preset.T;
            this.factors.K = preset.K;
            this.factors.P = preset.P;
            this.factors.S = preset.S;

            if (this.onUpdate) {
                this.onUpdate(this.getState());
            }

            return preset.name;
        }
        return null;
    }

    // Get human-readable factor names
    static getFactorInfo(factor) {
        const info = {
            T: {
                symbol: 'Τ',
                name: 'Organization',
                question: 'How organized is the local geometry?',
                low: 'Chaotic, random',
                high: 'Highly structured'
            },
            K: {
                symbol: 'Κ',
                name: 'Star Type',
                question: 'How Sun-like is the star?',
                low: 'Extreme (blue giant, neutron star)',
                high: 'Sun-like (G-type)'
            },
            P: {
                symbol: 'Φ',
                name: 'Phase',
                question: 'Where in the 1729 cycle?',
                low: 'Near boundaries (unstable)',
                high: 'Optimal position'
            },
            S: {
                symbol: 'Σ',
                name: 'Accessibility',
                question: 'How open is this region?',
                low: 'Restricted, isolated',
                high: 'Fully accessible'
            }
        };
        return info[factor] || null;
    }

    draw() {
        // This class is data-only; the HTML handles rendering
        // But we can create an SVG visualization for the result

        const size = 200;
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', size);
        svg.setAttribute('height', size);
        svg.setAttribute('viewBox', `0 0 ${size} ${size}`);

        const cx = size / 2;
        const cy = size / 2;
        const radius = 80;

        // Background circle
        const bgCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        bgCircle.setAttribute('cx', cx);
        bgCircle.setAttribute('cy', cy);
        bgCircle.setAttribute('r', radius);
        bgCircle.setAttribute('fill', 'rgba(255, 255, 255, 0.05)');
        bgCircle.setAttribute('stroke', 'rgba(255, 255, 255, 0.2)');
        bgCircle.setAttribute('stroke-width', '2');
        svg.appendChild(bgCircle);

        // Fill arc based on Ω
        const omega = this.calculate();
        const angle = omega * 360;

        if (angle > 0) {
            const endAngle = (angle - 90) * Math.PI / 180;
            const startAngle = -90 * Math.PI / 180;

            const x1 = cx + radius * Math.cos(startAngle);
            const y1 = cy + radius * Math.sin(startAngle);
            const x2 = cx + radius * Math.cos(endAngle);
            const y2 = cy + radius * Math.sin(endAngle);

            const largeArc = angle > 180 ? 1 : 0;

            const arc = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            arc.setAttribute('d', `
                M ${cx} ${cy}
                L ${x1} ${y1}
                A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}
                Z
            `);
            arc.setAttribute('fill', 'url(#lifeGradient)');
            svg.appendChild(arc);
        }

        // Add gradient definition
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        gradient.setAttribute('id', 'lifeGradient');
        gradient.innerHTML = `
            <stop offset="0%" stop-color="#4a8ec8" />
            <stop offset="100%" stop-color="#d4af37" />
        `;
        defs.appendChild(gradient);
        svg.insertBefore(defs, svg.firstChild);

        // Center text
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', cx);
        text.setAttribute('y', cy);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dominant-baseline', 'middle');
        text.setAttribute('fill', '#d4af37');
        text.setAttribute('font-size', '32');
        text.setAttribute('font-weight', 'bold');
        text.setAttribute('font-family', 'system-ui, sans-serif');
        text.textContent = `${(omega * 100).toFixed(1)}%`;
        svg.appendChild(text);

        this.container.innerHTML = '';
        this.container.appendChild(svg);
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LifeCalculator;
}
