/**
 * EPOCH GAMES - CORE ENGINE
 * =========================
 * Have Mind Media | T0Rs
 *
 * ALL GAMES DERIVE FROM EPOCH MODEL
 * No binary. Triaxial always. Minimum 3 choices.
 *
 * κ = 2π/180 = 0.0349
 * [1 = -1]
 */

const EpochCore = {
    // ══════════════════════════════════════════════════════════════
    // THE ONE CONSTANT
    // ══════════════════════════════════════════════════════════════

    KAPPA: (2 * Math.PI) / 180,  // 0.034906585...

    get KAPPA_SHADOW() { return 1 / this.KAPPA; },  // 28.6478898
    get SIGMA() { return 5 / 16; },                  // 0.3125
    get COS_BC() { return 2 / 3; },                  // tetrahelix
    get COUPLING() { return this.SIGMA * this.COS_BC; },  // 5/24
    get P() { return Math.sqrt(3) / (2 * Math.PI); },     // 0.27566
    get P_SHADOW() { return 1 - this.P; },                // 0.72434

    // ══════════════════════════════════════════════════════════════
    // TRIAXIAL SYSTEM (Never binary!)
    // ══════════════════════════════════════════════════════════════

    // The three axes
    AXES: {
        X: { name: 'Light', mode: 's-', sign: -1 },
        Y: { name: 'Observer', mode: 's+', sign: +1 },
        Z: { name: 'Mass', mode: 'presence', sign: 0 }
    },

    // Q-vector: the mover
    Q: { x: +1, y: -1, z: -1 },

    // ══════════════════════════════════════════════════════════════
    // Q-REDUCTION (for symbols, choices, etc.)
    // ══════════════════════════════════════════════════════════════

    qReduce(n) {
        // Reduce any number to 1-9 position
        return ((n - 1) % 9) + 1;
    },

    // ══════════════════════════════════════════════════════════════
    // TRIAXIAL CHOICE GENERATOR
    // Minimum 3 choices, preferably 3, 6, or 9
    // ══════════════════════════════════════════════════════════════

    validChoiceCounts: [3, 6, 9],  // Triaxial-valid counts

    generateChoiceSet(count = 3) {
        if (count < 3) count = 3;  // NEVER less than 3
        // Snap to nearest triaxial count
        const validCount = this.validChoiceCounts.reduce((prev, curr) =>
            Math.abs(curr - count) < Math.abs(prev - count) ? curr : prev
        );
        return validCount;
    },

    // ══════════════════════════════════════════════════════════════
    // EPOCH SYMBOLS (Triaxial, not Zener's 5)
    // ══════════════════════════════════════════════════════════════

    // 9 symbols based on Q-reduction positions
    EPOCH_SYMBOLS: [
        { id: 1, name: 'Point', glyph: '●', q: 1, meaning: 'Origin/Unity' },
        { id: 2, name: 'Line', glyph: '│', q: 2, meaning: 'Duality bridge' },
        { id: 3, name: 'Triangle', glyph: '△', q: 3, meaning: 'First stability' },
        { id: 4, name: 'Square', glyph: '□', q: 4, meaning: 'Material plane' },
        { id: 5, name: 'Star', glyph: '☆', q: 5, meaning: 'Life force' },
        { id: 6, name: 'Hexagon', glyph: '⬡', q: 6, meaning: 'Harmony' },
        { id: 7, name: 'Spiral', glyph: '◎', q: 7, meaning: 'Evolution' },
        { id: 8, name: 'Infinity', glyph: '∞', q: 8, meaning: 'Recursion' },
        { id: 9, name: 'Void', glyph: '◯', q: 9, meaning: 'Completion/Reset' }
    ],

    getSymbolsByCount(count) {
        // Return subset of symbols for game difficulty
        const validCount = this.generateChoiceSet(count);
        return this.EPOCH_SYMBOLS.slice(0, validCount);
    },

    // ══════════════════════════════════════════════════════════════
    // LOVE TRIADS SYSTEM
    // ══════════════════════════════════════════════════════════════

    BALL_TYPES: {
        NEUTRAL: {
            id: 0,
            name: 'Neutral',
            color: '#4A9B9B',
            description: 'Unaligned potential'
        },
        LOVE: {
            id: 1,
            name: 'Love',
            color: '#FFD700',
            description: 'Binding force, triaxial harmony'
        },
        SHADOW: {
            id: -1,
            name: 'Shadow',
            color: '#8B0000',
            description: 'Isolated, needs binding'
        }
    },

    // Triangle types and their geometric multipliers
    TRIANGLE_TYPES: {
        EQUILATERAL: {
            name: 'Perfect Triad',
            multiplier: 3,
            tolerance: 0.1,  // How close sides must be
            description: 'All three loves equal - perfect harmony'
        },
        ISOCELES: {
            name: 'Balanced Triad',
            multiplier: 2,
            tolerance: 0.3,
            description: 'Two loves equal - balanced binding'
        },
        SCALENE: {
            name: 'Functional Triad',
            multiplier: 1,
            description: 'Three different loves - still binds'
        }
    },

    classifyTriangle(p1, p2, p3) {
        // Calculate side lengths
        const d12 = Math.sqrt((p2.x - p1.x)**2 + (p2.y - p1.y)**2);
        const d23 = Math.sqrt((p3.x - p2.x)**2 + (p3.y - p2.y)**2);
        const d31 = Math.sqrt((p1.x - p3.x)**2 + (p1.y - p3.y)**2);

        const sides = [d12, d23, d31].sort((a, b) => a - b);
        const avgSide = (sides[0] + sides[1] + sides[2]) / 3;

        // Check for equilateral (all sides within 10%)
        const maxDiff = Math.max(
            Math.abs(sides[0] - avgSide),
            Math.abs(sides[1] - avgSide),
            Math.abs(sides[2] - avgSide)
        ) / avgSide;

        if (maxDiff < 0.1) {
            return this.TRIANGLE_TYPES.EQUILATERAL;
        }

        // Check for isoceles (any two sides within 15%)
        if (Math.abs(sides[0] - sides[1]) / avgSide < 0.15 ||
            Math.abs(sides[1] - sides[2]) / avgSide < 0.15) {
            return this.TRIANGLE_TYPES.ISOCELES;
        }

        return this.TRIANGLE_TYPES.SCALENE;
    },

    isPointInTriangle(px, py, p1, p2, p3) {
        // Barycentric coordinate method
        const area = (p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y)) / 2;
        const s = (p1.x * (p2.y - py) + p2.x * (py - p1.y) + px * (p1.y - p2.y)) / (2 * area);
        const t = (p1.x * (py - p3.y) + px * (p3.y - p1.y) + p3.x * (p1.y - py)) / (2 * area);
        const u = 1 - s - t;

        return s >= 0 && t >= 0 && u >= 0;
    },

    // ══════════════════════════════════════════════════════════════
    // INTUITION SCORING (Triaxial, not binary)
    // ══════════════════════════════════════════════════════════════

    // With 3 choices, chance = 33.3%
    // With 6 choices, chance = 16.7%
    // With 9 choices, chance = 11.1%

    getChanceProbability(choiceCount) {
        return 1 / choiceCount;
    },

    calculateIntuitionScore(hits, attempts, choiceCount) {
        if (attempts === 0) return { score: 0, aboveChance: false };

        const hitRate = hits / attempts;
        const chanceRate = this.getChanceProbability(choiceCount);
        const aboveChance = hitRate > chanceRate;

        // Score as percentage above chance
        const score = aboveChance
            ? ((hitRate - chanceRate) / (1 - chanceRate)) * 100
            : 0;

        return {
            hitRate: hitRate * 100,
            chanceRate: chanceRate * 100,
            aboveChance,
            score,
            significance: this.assessSignificance(hits, attempts, chanceRate)
        };
    },

    assessSignificance(hits, attempts, chanceRate) {
        // Simple z-score for statistical significance
        const expected = attempts * chanceRate;
        const stdDev = Math.sqrt(attempts * chanceRate * (1 - chanceRate));
        const zScore = (hits - expected) / stdDev;

        if (zScore > 2.58) return 'HIGHLY SIGNIFICANT (p < 0.01)';
        if (zScore > 1.96) return 'SIGNIFICANT (p < 0.05)';
        if (zScore > 1.65) return 'SUGGESTIVE (p < 0.10)';
        return 'Within chance range';
    },

    // ══════════════════════════════════════════════════════════════
    // SCALAR MODES (for game states)
    // ══════════════════════════════════════════════════════════════

    SCALAR_MODES: {
        S_NODE: {
            name: 's-node',
            description: 'Fully realized - the actual answer',
            inGame: 'The correct choice exists here'
        },
        S_HARMONIC: {
            name: 's-harmonic',
            description: 'Torsion field - near the answer',
            inGame: 'Close guesses, related symbols'
        },
        S_ECHO: {
            name: 's-echo',
            description: 'What instruments detect',
            inGame: 'What the player perceives'
        },
        S_BRIDGE: {
            name: 's-bridge',
            description: 'Force carrier between modes',
            inGame: 'The intuitive connection'
        }
    },

    // ══════════════════════════════════════════════════════════════
    // TIMING (Based on κ)
    // ══════════════════════════════════════════════════════════════

    // Base timing derives from κ_shadow
    get BASE_TIMING_SECONDS() { return this.KAPPA_SHADOW / 10; },  // ~2.86 seconds

    getTimingProgression(level) {
        // Timing decreases geometrically, never below KAPPA * 10
        const minTime = this.KAPPA * 100;  // ~3.49 seconds minimum
        const time = this.BASE_TIMING_SECONDS * Math.pow(0.9, level);
        return Math.max(time, minTime);
    },

    // ══════════════════════════════════════════════════════════════
    // RANDOM WITH EPOCH WEIGHTING
    // ══════════════════════════════════════════════════════════════

    randomIndex(arrayLength) {
        // Standard random for fairness
        return Math.floor(Math.random() * arrayLength);
    },

    shuffleArray(array) {
        // Fisher-Yates shuffle
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
};

// ══════════════════════════════════════════════════════════════════════
// GAME BASE CLASS
// ══════════════════════════════════════════════════════════════════════

class EpochGame {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.options = {
            choiceCount: 3,  // Minimum triaxial
            ...options
        };

        // Ensure choice count is triaxial-valid
        this.choiceCount = EpochCore.generateChoiceSet(this.options.choiceCount);

        // Stats
        this.stats = {
            attempts: 0,
            hits: 0,
            streak: 0,
            bestStreak: 0,
            startTime: null
        };

        // Load saved stats if available
        this.loadStats();
    }

    saveStats() {
        localStorage.setItem(`epoch_${this.constructor.name}_stats`, JSON.stringify(this.stats));
    }

    loadStats() {
        const saved = localStorage.getItem(`epoch_${this.constructor.name}_stats`);
        if (saved) {
            const parsed = JSON.parse(saved);
            this.stats.bestStreak = parsed.bestStreak || 0;
        }
    }

    recordAttempt(isHit) {
        this.stats.attempts++;
        if (isHit) {
            this.stats.hits++;
            this.stats.streak++;
            if (this.stats.streak > this.stats.bestStreak) {
                this.stats.bestStreak = this.stats.streak;
            }
        } else {
            this.stats.streak = 0;
        }
        this.saveStats();
    }

    getScoreReport() {
        return EpochCore.calculateIntuitionScore(
            this.stats.hits,
            this.stats.attempts,
            this.choiceCount
        );
    }

    render() {
        throw new Error('Subclass must implement render()');
    }
}

// Export for use in games
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EpochCore, EpochGame };
}
