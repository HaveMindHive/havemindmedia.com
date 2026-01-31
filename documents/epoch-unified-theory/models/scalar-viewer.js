/**
 * SCALAR POSITION VIEWER
 * Interactive visualization of your position in the 1729 scalar sphere
 *
 * Have Mind Media | January 30, 2026 | [1 = -1]
 *
 * The "aha moment": There is no absolute center. YOU are always at the center
 * of your own coordinate system. Everything else is positioned relative to you.
 */

class ScalarViewer {
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
                you: options.colors?.you || '#d4af37',           // Gold
                consciousness: options.colors?.consciousness || '#4ecdc4', // Teal
                physical: options.colors?.physical || '#ff6b6b', // Coral
                sphere: options.colors?.sphere || 'rgba(255, 255, 255, 0.2)',
                text: options.colors?.text || '#e8dcc4',         // Soft cream
                dim: options.colors?.dim || 'rgba(255, 255, 255, 0.5)'
            }
        };

        // State - YOU are always at scalar position 0 in your own frame
        // This slider represents where you're "standing" in the absolute frame
        this.yourPosition = 0;

        // Key positions in the 1729 sphere
        this.CONSCIOUSNESS = 729;  // 9³
        this.PHYSICAL = 1000;      // 10³
        this.INVERSION = 1729;     // 729 + 1000

        // Create visualization
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
        // Clear previous
        this.svg.innerHTML = '';

        const size = this.options.size;
        const cx = size / 2;
        const cy = size / 2;
        const maxRadius = size * 0.42;

        // Calculate relative distances from YOUR position
        const distToConsciousness = Math.abs(this.CONSCIOUSNESS - this.yourPosition);
        const distToPhysical = Math.abs(this.PHYSICAL - this.yourPosition);

        // Normalize for display (max distance shown = 1000)
        const maxDist = 1000;
        const consciousnessRadius = (distToConsciousness / maxDist) * maxRadius;
        const physicalRadius = (distToPhysical / maxDist) * maxRadius;

        // Draw outer reference circle (the 1729 boundary concept)
        this.drawCircle(cx, cy, maxRadius, this.options.colors.sphere, 1, '4,4');

        // Draw consciousness boundary circle
        if (distToConsciousness > 0) {
            this.drawCircle(cx, cy, consciousnessRadius, this.options.colors.consciousness, 2);
            this.drawLabel(
                cx,
                cy - consciousnessRadius - 15,
                `CONSCIOUSNESS`,
                this.options.colors.consciousness,
                12
            );
            this.drawLabel(
                cx,
                cy - consciousnessRadius + 15,
                `${distToConsciousness} away`,
                this.options.colors.dim,
                10
            );
        }

        // Draw physical boundary circle
        if (distToPhysical > 0) {
            this.drawCircle(cx, cy, physicalRadius, this.options.colors.physical, 2);

            // Position label to avoid overlap with consciousness label
            const physLabelY = cy + physicalRadius + 15;
            this.drawLabel(
                cx,
                physLabelY,
                `PHYSICAL`,
                this.options.colors.physical,
                12
            );
            this.drawLabel(
                cx,
                physLabelY + 15,
                `${distToPhysical} away`,
                this.options.colors.dim,
                10
            );
        }

        // Draw YOU at center (always)
        this.drawYou(cx, cy);

        // Draw position indicator text
        this.drawPositionInfo(cx, size - 30);
    }

    drawCircle(cx, cy, r, color, strokeWidth = 2, dashArray = null) {
        if (r <= 0) return;

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', cx);
        circle.setAttribute('cy', cy);
        circle.setAttribute('r', r);
        circle.setAttribute('fill', 'none');
        circle.setAttribute('stroke', color);
        circle.setAttribute('stroke-width', strokeWidth);
        if (dashArray) {
            circle.setAttribute('stroke-dasharray', dashArray);
        }
        this.svg.appendChild(circle);
    }

    drawYou(cx, cy) {
        // Outer glow
        const glow = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        glow.setAttribute('cx', cx);
        glow.setAttribute('cy', cy);
        glow.setAttribute('r', 25);
        glow.setAttribute('fill', this.options.colors.you);
        glow.setAttribute('opacity', '0.3');
        this.svg.appendChild(glow);

        // Main dot
        const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        dot.setAttribute('cx', cx);
        dot.setAttribute('cy', cy);
        dot.setAttribute('r', 12);
        dot.setAttribute('fill', this.options.colors.you);
        this.svg.appendChild(dot);

        // "YOU" label
        this.drawLabel(cx, cy + 35, 'YOU', this.options.colors.you, 14, 'bold');
        this.drawLabel(cx, cy + 50, '(always at center)', this.options.colors.dim, 10);
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

    drawPositionInfo(cx, y) {
        // Show where you're "standing" in the overall frame
        let description = '';

        if (this.yourPosition === 0) {
            description = 'Standard observer position';
        } else if (this.yourPosition < 365) {
            description = 'Closer to consciousness than physical';
        } else if (this.yourPosition === 365) {
            description = 'Exactly between both boundaries';
        } else if (this.yourPosition < 729) {
            description = 'Moving toward consciousness boundary';
        } else if (this.yourPosition === 729) {
            description = 'AT the consciousness boundary';
        } else if (this.yourPosition < 1000) {
            description = 'Past consciousness, approaching physical';
        } else if (this.yourPosition === 1000) {
            description = 'AT the physical boundary';
        } else {
            description = 'Beyond physical boundary';
        }

        this.drawLabel(cx, y, description, this.options.colors.text, 11);
    }

    setPosition(value) {
        this.yourPosition = Math.max(0, Math.min(1000, value));
        this.draw();
    }

    getPosition() {
        return this.yourPosition;
    }

    // Get info about current state
    getInfo() {
        return {
            yourPosition: this.yourPosition,
            distanceToConsciousness: Math.abs(this.CONSCIOUSNESS - this.yourPosition),
            distanceToPhysical: Math.abs(this.PHYSICAL - this.yourPosition),
            description: this.getDescription()
        };
    }

    getDescription() {
        const distC = Math.abs(this.CONSCIOUSNESS - this.yourPosition);
        const distP = Math.abs(this.PHYSICAL - this.yourPosition);

        if (distC < distP) {
            return 'Consciousness is closer to you than physical reality';
        } else if (distP < distC) {
            return 'Physical reality is closer to you than consciousness';
        } else {
            return 'You are equidistant from both boundaries';
        }
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ScalarViewer;
}
