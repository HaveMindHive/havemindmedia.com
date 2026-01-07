/**
 * ═══════════════════════════════════════════════════════════════════════════
 * UNIVERSAL LANGUAGE GENERATOR - User Interface
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * This file handles all UI interactions, rendering, and user feedback.
 * The core logic is in ulg-engine.js; this file displays it beautifully.
 *
 * Version 1.0 | January 6, 2026
 * Have Mind Media | The Epoch Project
 *
 * ═══════════════════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════════════════
// GLOBAL STATE
// ═══════════════════════════════════════════════════════════════════════════

let currentCategory = 'pronouns';
let vocabularyData = null;

// ═══════════════════════════════════════════════════════════════════════════
// INITIALIZATION
// ═══════════════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function() {
    console.log('ULG UI initializing...');

    // Initialize the engine
    if (typeof ULG !== 'undefined') {
        ULG.init();
    }

    // Load the database
    loadDatabase();

    // Render static components
    renderDPositionGrid();
    renderVowelGrid();
    renderConsonantRows();
    renderEvidenceGrid();

    // Set up event listeners
    setupEventListeners();

    console.log('ULG UI ready.');
});


// ═══════════════════════════════════════════════════════════════════════════
// DATABASE LOADING
// ═══════════════════════════════════════════════════════════════════════════

async function loadDatabase() {
    try {
        const response = await fetch('data/ulg-database_v1.0_01-06-2026.json');
        vocabularyData = await response.json();
        console.log('Database loaded successfully.');

        // Render vocabulary with loaded data
        renderVocabulary('pronouns');

    } catch (error) {
        console.warn('Could not load database, using embedded data:', error);
        // Fall back to embedded vocabulary in ULG engine
        renderVocabulary('pronouns');
    }
}


// ═══════════════════════════════════════════════════════════════════════════
// EVENT LISTENERS
// ═══════════════════════════════════════════════════════════════════════════

function setupEventListeners() {
    // Main input - Enter key
    const mainInput = document.getElementById('main-input');
    if (mainInput) {
        mainInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                generatePhonetic();
            }
        });

        // Focus on load
        mainInput.focus();
    }

    // Vocabulary tabs
    document.querySelectorAll('.vocab-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.vocab-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            renderVocabulary(this.dataset.category);
        });
    });

    // Modal close on background click
    const modal = document.getElementById('phoneme-modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}


// ═══════════════════════════════════════════════════════════════════════════
// MAIN GENERATOR FUNCTION
// ═══════════════════════════════════════════════════════════════════════════

function generatePhonetic() {
    const input = document.getElementById('main-input').value.trim();
    if (!input) return;

    // Generate using the engine
    const result = ULG.generatePhonetic(input);

    // Render the result
    renderResult(result);
}

function renderResult(result) {
    const container = document.getElementById('result-container');
    if (!container) return;

    const dInfo = result.qReduction.dInfo;
    const emergentBadge = result.isEmergent ?
        `<span class="emergent-badge">EMERGENT</span>
         <p class="emergent-note">${result.emergentNote}</p>` : '';

    container.innerHTML = `
        <div class="result-card" style="--d-color: ${result.dColor}">

            <!-- Input Word -->
            <div class="result-input-word">${result.inputUpper}</div>

            <!-- Arrow -->
            <div class="result-arrow">↓</div>

            <!-- Q-Reduction Breakdown -->
            <div class="result-breakdown">
                <h4>Q-Reduction</h4>
                <div class="breakdown-steps">
                    ${renderBreakdownSteps(result.qReduction)}
                </div>
            </div>

            <!-- D-Position Result -->
            <div class="result-d-position">
                <span class="d-number" style="color: ${result.dColor}">D${result.dPosition}</span>
                <span class="d-name">${result.dName}</span>
                ${emergentBadge}
            </div>
            <p class="result-meaning">${result.dMeaning}</p>

            <!-- Phonetic Output -->
            <div class="result-phonetic">
                <h4>Universal Language Form</h4>
                <div class="phonetic-display">
                    <span class="phonetic-form">${result.phoneticForm}</span>
                    <span class="ipa-form">${result.ipaForm}</span>
                </div>
            </div>

            <!-- Component Breakdown -->
            <div class="result-components">
                <h4>Sound Components</h4>
                <div class="component-grid">
                    <div class="component-item">
                        <span class="component-phoneme">${result.components.primaryConsonant.ipa}</span>
                        <span class="component-name">${result.components.primaryConsonant.name}</span>
                        <span class="component-meanings">${result.components.primaryConsonant.meanings.slice(0, 3).join(', ')}</span>
                    </div>
                    <span class="component-plus">+</span>
                    <div class="component-item">
                        <span class="component-phoneme">${result.components.primaryVowel.ipa}</span>
                        <span class="component-name">${result.components.primaryVowel.name}</span>
                        <span class="component-meanings">${result.components.primaryVowel.meanings.slice(0, 3).join(', ')}</span>
                    </div>
                </div>
            </div>

            <!-- Triaxial Visualization -->
            <div class="result-triaxial">
                <h4>Triaxial Coordinates</h4>
                <div class="triaxial-bars">
                    <div class="triaxial-bar">
                        <span class="bar-label">S+</span>
                        <div class="bar-track">
                            <div class="bar-fill splus" style="width: ${Math.abs(result.triaxial.sPlus) * 50 + 50}%"></div>
                        </div>
                        <span class="bar-value">${result.triaxial.sPlus.toFixed(2)}</span>
                    </div>
                    <div class="triaxial-bar">
                        <span class="bar-label">S−</span>
                        <div class="bar-track">
                            <div class="bar-fill sminus" style="width: ${Math.abs(result.triaxial.sMinus) * 50 + 50}%"></div>
                        </div>
                        <span class="bar-value">${result.triaxial.sMinus.toFixed(2)}</span>
                    </div>
                    <div class="triaxial-bar">
                        <span class="bar-label">COIN</span>
                        <div class="bar-track">
                            <div class="bar-fill coin" style="width: ${Math.abs(result.triaxial.coin) * 50 + 50}%"></div>
                        </div>
                        <span class="bar-value">${result.triaxial.coin.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <!-- Description -->
            <div class="result-description">
                <p>${result.dDescription}</p>
            </div>
        </div>
    `;

    container.classList.add('show');

    // Scroll to result
    container.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function renderBreakdownSteps(qResult) {
    let html = '';

    if (qResult.letterBreakdown) {
        // Word input - show letter values
        const letterParts = qResult.letterBreakdown.map(l =>
            `<span class="letter-value">${l.letter}<sub>${l.value}</sub></span>`
        ).join(' + ');

        html += `<div class="breakdown-letters">${letterParts}</div>`;
        html += `<div class="breakdown-sum">= ${qResult.initialSum}</div>`;
    }

    // Show reduction steps
    if (qResult.steps.length > 1) {
        const stepsStr = qResult.steps.join(' → ');
        html += `<div class="breakdown-reduction">${stepsStr}</div>`;
    }

    return html;
}


// ═══════════════════════════════════════════════════════════════════════════
// D-POSITION GRID
// ═══════════════════════════════════════════════════════════════════════════

function renderDPositionGrid() {
    const container = document.getElementById('d-position-grid');
    if (!container) return;

    let html = '';

    for (let d = 1; d <= 9; d++) {
        const info = ULG.D_POSITIONS[d];
        const emergentClass = info.emergent ? 'emergent' : '';

        html += `
            <button class="d-position-btn ${emergentClass}"
                    data-d="${d}"
                    style="--d-color: ${info.color}"
                    onclick="showPositionDetail(${d})">
                <span class="d-number">D${d}</span>
                <span class="d-name">${info.name}</span>
                <span class="d-vowel">${info.vowelIPA}</span>
            </button>
        `;
    }

    container.innerHTML = html;
}

function showPositionDetail(d) {
    const info = ULG.D_POSITIONS[d];
    const container = document.getElementById('position-detail');
    if (!container) return;

    // Update active button
    document.querySelectorAll('.d-position-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-d="${d}"]`)?.classList.add('active');

    const emergentSection = info.emergent ? `
        <div class="detail-emergent">
            <span class="emergent-badge">EMERGENT POSITION</span>
            <p>${info.emergentNote}</p>
        </div>
    ` : '';

    const crossLingExamples = info.examples ?
        info.examples.map(ex => `<span class="example-word">${ex}</span>`).join(' ') : '';

    container.innerHTML = `
        <div class="detail-card" style="--d-color: ${info.color}">
            <div class="detail-header">
                <span class="detail-d" style="color: ${info.color}">D${d}</span>
                <span class="detail-name">${info.name}</span>
            </div>

            ${emergentSection}

            <div class="detail-meaning">
                <h4>Core Meaning</h4>
                <p>${info.meaning}</p>
            </div>

            <div class="detail-sounds">
                <h4>Associated Sounds</h4>
                <div class="sound-pair">
                    <div class="sound-item">
                        <span class="sound-label">Vowel:</span>
                        <span class="sound-phoneme">${info.vowelIPA}</span>
                    </div>
                    <div class="sound-item">
                        <span class="sound-label">Consonants:</span>
                        <span class="sound-phoneme">/${info.consonants.join('/, /')}/</span>
                    </div>
                </div>
                <p class="sound-explanation">${info.consonantMeanings}</p>
            </div>

            <div class="detail-keywords">
                <h4>Keywords</h4>
                <div class="keyword-tags">
                    ${info.keywords.map(k => `<span class="keyword-tag">${k}</span>`).join('')}
                </div>
            </div>

            <div class="detail-examples">
                <h4>Example Words</h4>
                <div class="example-words">${crossLingExamples}</div>
            </div>

            <div class="detail-description">
                <p>${info.description}</p>
            </div>
        </div>
    `;

    container.classList.add('show');
}


// ═══════════════════════════════════════════════════════════════════════════
// VOWEL GRID
// ═══════════════════════════════════════════════════════════════════════════

function renderVowelGrid() {
    const container = document.getElementById('vowel-grid');
    if (!container) return;

    const vowels = Object.entries(ULG.VOWELS);
    let html = '';

    for (const [phoneme, info] of vowels) {
        const geometricNote = info.geometricSignificance ?
            `<span class="geometric-note">${info.geometricSignificance}</span>` : '';

        html += `
            <div class="phoneme-card vowel-card" onclick="showPhonemeDetail('vowel', '${phoneme}')">
                <span class="phoneme-symbol">${info.ipa}</span>
                <span class="phoneme-name">${info.name}</span>
                <span class="phoneme-meanings">${info.meanings.slice(0, 3).join(', ')}</span>
                ${geometricNote}
            </div>
        `;
    }

    container.innerHTML = html;
}


// ═══════════════════════════════════════════════════════════════════════════
// CONSONANT ROWS
// ═══════════════════════════════════════════════════════════════════════════

function renderConsonantRows() {
    // Nasals
    renderConsonantGroup(['m', 'n'], 'nasals-row');

    // Stops
    renderConsonantGroup(['p', 'b', 't', 'd', 'k', 'g'], 'stops-row');

    // Fricatives
    renderConsonantGroup(['f', 'v', 's', 'ʃ', 'h'], 'fricatives-row');

    // Liquids and Approximants
    renderConsonantGroup(['l', 'r', 'w', 'j'], 'liquids-row');
}

function renderConsonantGroup(phonemes, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let html = '';

    for (const phoneme of phonemes) {
        const info = ULG.CONSONANTS[phoneme];
        if (!info) continue;

        html += `
            <div class="phoneme-card consonant-card" onclick="showPhonemeDetail('consonant', '${phoneme}')">
                <span class="phoneme-symbol">${info.ipa}</span>
                <span class="phoneme-meanings">${info.meanings.slice(0, 2).join(', ')}</span>
            </div>
        `;
    }

    container.innerHTML = html;
}


// ═══════════════════════════════════════════════════════════════════════════
// PHONEME DETAIL MODAL
// ═══════════════════════════════════════════════════════════════════════════

function showPhonemeDetail(type, phoneme) {
    const modal = document.getElementById('phoneme-modal');
    const body = document.getElementById('modal-body');
    if (!modal || !body) return;

    const info = type === 'vowel' ? ULG.VOWELS[phoneme] : ULG.CONSONANTS[phoneme];
    if (!info) return;

    let acousticsSection = '';
    if (info.acoustics) {
        acousticsSection = `
            <div class="modal-section">
                <h4>Acoustic Properties</h4>
                <div class="acoustics-data">
                    <span>F1: ${info.acoustics.f1} Hz</span>
                    <span>F2: ${info.acoustics.f2} Hz</span>
                    <span>Ratio: ${info.acoustics.ratio.toFixed(3)}</span>
                </div>
                ${info.geometricSignificance ? `<p class="geometric-sig">${info.geometricSignificance}</p>` : ''}
            </div>
        `;
    }

    let examplesSection = '';
    if (info.examples) {
        if (Array.isArray(info.examples)) {
            examplesSection = `
                <div class="modal-section">
                    <h4>Example Words</h4>
                    <div class="example-words">
                        ${info.examples.map(ex => `<span class="example-word">${ex}</span>`).join(' ')}
                    </div>
                </div>
            `;
        } else if (info.examples.english) {
            examplesSection = `
                <div class="modal-section">
                    <h4>Example Words</h4>
                    <p><strong>English:</strong> ${info.examples.english.join(', ')}</p>
                    ${info.examples.crossLinguistic ?
                        `<p><strong>Cross-linguistic:</strong> ${info.examples.crossLinguistic.join('; ')}</p>` : ''}
                </div>
            `;
        }
    }

    body.innerHTML = `
        <div class="modal-header">
            <span class="modal-phoneme">${info.ipa}</span>
            <span class="modal-name">${info.name}</span>
        </div>

        <div class="modal-section">
            <h4>Production</h4>
            <p>${info.production}</p>
        </div>

        <div class="modal-section">
            <h4>Associated Meanings</h4>
            <div class="meaning-tags">
                ${info.meanings.map(m => `<span class="meaning-tag">${m}</span>`).join('')}
            </div>
        </div>

        ${acousticsSection}

        ${examplesSection}

        <div class="modal-section">
            <h4>Explanation</h4>
            <p class="modal-explanation">${info.explanation}</p>
        </div>
    `;

    modal.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('phoneme-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}


// ═══════════════════════════════════════════════════════════════════════════
// EVIDENCE GRID
// ═══════════════════════════════════════════════════════════════════════════

function renderEvidenceGrid() {
    const container = document.getElementById('evidence-grid');
    if (!container) return;

    const patterns = [
        {
            name: "Mama/Papa Universals",
            icon: "👶",
            description: "Words for 'mother' across virtually all languages contain /m/ + open vowel. Words for 'father' use /p/ or /b/. This isn't cultural borrowing — it's the first sounds babies can produce.",
            examples: "English: mama/papa, Spanish: mamá/papá, Mandarin: māma/bàba, Swahili: mama/baba"
        },
        {
            name: "Bouba/Kiki Effect",
            icon: "⭕",
            description: "People worldwide associate 'bouba' with round shapes and 'kiki' with spiky shapes. This works even with pre-linguistic infants, proving the sound-shape mapping is innate.",
            examples: "/b/ and /u/ = round (lip rounding), /k/ and /i/ = sharp (high frequency, pointed articulation)"
        },
        {
            name: "Size Sound Symbolism",
            icon: "📏",
            description: "High vowels (/i/) associate with small things; low vowels (/a/) with large things. Diminutives across languages use /i/: English '-y', Spanish '-ito', German '-chen'.",
            examples: "English: teeny, tiny, little vs. large, vast, grand"
        },
        {
            name: "Negation Nasals",
            icon: "🚫",
            description: "Negation words across unrelated language families contain /n/. The tongue creates a physical barrier — the gesture maps to conceptual blocking.",
            examples: "English: no/not, Spanish: no/nunca, German: nein/nicht, Latin: non/nihil"
        },
        {
            name: "Light/Vision Sounds",
            icon: "💡",
            description: "Words for light, sight, and brightness cluster around /l/ and /s/ — the highest-frequency, brightest consonants.",
            examples: "light, see, sun, shine, gleam, glow, luminous, lux (Latin), helios (Greek)"
        },
        {
            name: "Water Sounds",
            icon: "💧",
            description: "Water-related words frequently contain /w/ and back rounded vowels. Lip rounding mimics ripples; /w/ flows like liquid.",
            examples: "water, wave, wet, well, wash, aqua (Latin), Wasser (German)"
        }
    ];

    let html = '';
    for (const pattern of patterns) {
        html += `
            <div class="evidence-card">
                <div class="evidence-icon">${pattern.icon}</div>
                <h4>${pattern.name}</h4>
                <p>${pattern.description}</p>
                <div class="evidence-examples">
                    <strong>Examples:</strong> ${pattern.examples}
                </div>
            </div>
        `;
    }

    container.innerHTML = html;
}


// ═══════════════════════════════════════════════════════════════════════════
// VOCABULARY EXPLORER
// ═══════════════════════════════════════════════════════════════════════════

function renderVocabulary(category) {
    const container = document.getElementById('vocab-display');
    if (!container) return;

    currentCategory = category;

    // Get vocabulary from database or fallback
    let vocab;
    if (vocabularyData && vocabularyData.vocabulary && vocabularyData.vocabulary.categories[category]) {
        vocab = vocabularyData.vocabulary.categories[category];
    } else {
        // Fallback to engine's embedded vocabulary
        vocab = getEmbeddedVocab(category);
    }

    let html = '<div class="vocab-grid">';

    for (const [word, data] of Object.entries(vocab)) {
        const dInfo = ULG.D_POSITIONS[data.d];
        const color = dInfo ? dInfo.color : '#c9a227';

        html += `
            <div class="vocab-card" style="--d-color: ${color}">
                <div class="vocab-english">${word}</div>
                <div class="vocab-ulg">${data.ulg}</div>
                <div class="vocab-ipa">${data.ipa || '/' + data.ulg + '/'}</div>
                <div class="vocab-d">D${data.d}</div>
                <div class="vocab-breakdown">${data.breakdown || data.meaning || ''}</div>
            </div>
        `;
    }

    html += '</div>';
    container.innerHTML = html;
}

function getEmbeddedVocab(category) {
    // Fallback vocabulary if database doesn't load
    const embedded = {
        pronouns: {
            'I': { ulg: 'mi', d: 6, meaning: 'intimate + here' },
            'you': { ulg: 'tu', d: 6, meaning: 'touch + round' },
            'we': { ulg: 'wi', d: 1, meaning: 'unity + here' }
        },
        family: {
            'mother': { ulg: 'ma.mi', d: 2, meaning: 'intimate-large + intimate-here' },
            'father': { ulg: 'pa.ta', d: 6, meaning: 'power-open + touch-open' }
        },
        elements: {
            'water': { ulg: 'wa.tu', d: 8, meaning: 'wave + touch-round' },
            'fire': { ulg: 'fi.ra', d: 6, meaning: 'flow-bright + energy-open' }
        },
        actions: {
            'go': { ulg: 'go', d: 5, meaning: 'ground-directed' },
            'come': { ulg: 'ku.mi', d: 1, meaning: 'toward + intimate-here' }
        },
        states: {
            'love': { ulg: 'lu.vo', d: 9, meaning: 'light-round + bind-directed' },
            'life': { ulg: 'li.va', d: 9, meaning: 'light-here + bind-open' }
        },
        numbers: {
            'one': { ulg: 'o.ni', d: 1, meaning: 'whole + single-point' },
            'two': { ulg: 'tu.wo', d: 2, meaning: 'touch-pair + with-both' },
            'three': { ulg: 'tri', d: 3, meaning: 'solid-stable-complete' }
        }
    };

    return embedded[category] || embedded.pronouns;
}


// ═══════════════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
