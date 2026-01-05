/**
 * Have Mind Media - Site Header
 * Simple, complete navigation to all 68 pages
 * [1 = -1]
 */

class SiteHeader extends HTMLElement {
    connectedCallback() {
        const bp = this.getBasePath();

        this.innerHTML = `
            <style>
                .hmm-header {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 10000;
                    background: rgba(3, 5, 8, 0.97);
                    border-bottom: 1px solid rgba(201, 162, 39, 0.3);
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                }
                .hmm-inner {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0.5rem 1rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .hmm-brand {
                    text-decoration: none;
                    color: #c9a227;
                    font-weight: 600;
                    font-size: 0.9rem;
                    letter-spacing: 2px;
                }
                .hmm-brand:hover { color: #e8c547; }
                .hmm-nav {
                    display: flex;
                    gap: 0.25rem;
                }
                .hmm-nav-item {
                    position: relative;
                }
                .hmm-btn {
                    padding: 0.5rem 0.75rem;
                    background: none;
                    border: 1px solid transparent;
                    border-radius: 4px;
                    color: #e0e0e0;
                    font-size: 0.8rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.3rem;
                }
                .hmm-btn:hover {
                    background: rgba(201, 162, 39, 0.1);
                    border-color: rgba(201, 162, 39, 0.3);
                }
                .hmm-btn.active {
                    background: rgba(201, 162, 39, 0.15);
                    border-color: rgba(201, 162, 39, 0.4);
                    color: #c9a227;
                }
                .hmm-btn.hmm-coin {
                    color: #d4a8e0;
                }
                .hmm-btn.hmm-coin:hover {
                    background: rgba(180, 140, 200, 0.1);
                    border-color: rgba(180, 140, 200, 0.3);
                }
                .hmm-btn.hmm-coin.active {
                    background: rgba(180, 140, 200, 0.15);
                    border-color: rgba(180, 140, 200, 0.4);
                    color: #d4a8e0;
                }
                .hmm-btn.hmm-splus {
                    color: #c9a227;
                }
                .hmm-btn.hmm-splus:hover {
                    background: rgba(201, 162, 39, 0.1);
                    border-color: rgba(201, 162, 39, 0.3);
                }
                .hmm-btn.hmm-splus.active {
                    background: rgba(201, 162, 39, 0.15);
                    border-color: rgba(201, 162, 39, 0.4);
                    color: #c9a227;
                }
                .hmm-btn.hmm-sminus {
                    color: #6ab4f5;
                }
                .hmm-btn.hmm-sminus:hover {
                    background: rgba(106, 180, 245, 0.1);
                    border-color: rgba(106, 180, 245, 0.3);
                }
                .hmm-btn.hmm-sminus.active {
                    background: rgba(106, 180, 245, 0.15);
                    border-color: rgba(106, 180, 245, 0.4);
                    color: #6ab4f5;
                }
                .hmm-arrow {
                    font-size: 0.5rem;
                    transition: transform 0.2s;
                }
                .hmm-btn.active .hmm-arrow {
                    transform: rotate(180deg);
                }

                /* Games button - prominent */
                .hmm-games-link {
                    padding: 0.5rem 1rem;
                    background: linear-gradient(135deg, rgba(201, 162, 39, 0.2) 0%, rgba(106, 180, 245, 0.2) 100%);
                    border: 1px solid rgba(201, 162, 39, 0.4);
                    border-radius: 20px;
                    color: #c9a227;
                    font-size: 0.8rem;
                    font-weight: 600;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                    transition: all 0.2s;
                }
                .hmm-games-link:hover {
                    background: linear-gradient(135deg, rgba(201, 162, 39, 0.3) 0%, rgba(106, 180, 245, 0.3) 100%);
                    box-shadow: 0 4px 15px rgba(201, 162, 39, 0.2);
                }

                /* Dropdown */
                .hmm-drop {
                    position: absolute;
                    top: calc(100% + 4px);
                    left: 0;
                    min-width: 220px;
                    max-height: 70vh;
                    overflow-y: auto;
                    background: rgba(15, 15, 20, 0.98);
                    border: 1px solid rgba(201, 162, 39, 0.25);
                    border-radius: 6px;
                    padding: 0.4rem;
                    display: none;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                }
                .hmm-drop.show { display: block; }
                .hmm-drop a {
                    display: block;
                    padding: 0.4rem 0.6rem;
                    color: #d0d0d0;
                    text-decoration: none;
                    font-size: 0.8rem;
                    border-radius: 3px;
                }
                .hmm-drop a:hover {
                    background: rgba(201, 162, 39, 0.15);
                    color: #c9a227;
                }
                .hmm-drop .sub {
                    padding-left: 1rem;
                    font-size: 0.75rem;
                    color: #999;
                }
                .hmm-drop .sub:hover { color: #c9a227; }
                .hmm-drop .label {
                    padding: 0.5rem 0.6rem 0.2rem;
                    font-size: 0.65rem;
                    color: #666;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                }
                .hmm-drop hr {
                    border: none;
                    border-top: 1px solid rgba(201, 162, 39, 0.15);
                    margin: 0.3rem 0;
                }

                /* S+ dropdown colors (hazel/gold) */
                .hmm-drop.drop-splus .label { color: #c9a227; }
                .hmm-drop.drop-splus a:hover { background: rgba(201, 162, 39, 0.15); color: #c9a227; }
                .hmm-drop.drop-splus .sub:hover { color: #c9a227; }
                .hmm-drop.drop-splus hr { border-top-color: rgba(201, 162, 39, 0.2); }

                /* S- dropdown colors (pale blue) */
                .hmm-drop.drop-sminus .label { color: #6ab4f5; }
                .hmm-drop.drop-sminus a:hover { background: rgba(106, 180, 245, 0.15); color: #6ab4f5; }
                .hmm-drop.drop-sminus .sub:hover { color: #6ab4f5; }
                .hmm-drop.drop-sminus hr { border-top-color: rgba(106, 180, 245, 0.2); }

                /* COIN dropdown colors (purple) */
                .hmm-drop.drop-coin .label { color: #d4a8e0; }
                .hmm-drop.drop-coin a:hover { background: rgba(180, 140, 200, 0.15); color: #d4a8e0; }
                .hmm-drop.drop-coin .sub:hover { color: #d4a8e0; }
                .hmm-drop.drop-coin hr { border-top-color: rgba(180, 140, 200, 0.2); }

                /* Explore mega dropdown */
                .hmm-drop.mega {
                    min-width: 600px;
                    right: 0;
                    left: auto;
                }
                .hmm-mega-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 0.5rem;
                }
                .hmm-mega-col {
                    padding: 0.3rem;
                }
                .hmm-mega-col h4 {
                    font-size: 0.7rem;
                    color: #c9a227;
                    margin: 0 0 0.3rem 0;
                    padding: 0.2rem 0.4rem;
                    border-bottom: 1px solid rgba(201, 162, 39, 0.2);
                    letter-spacing: 1px;
                    text-transform: uppercase;
                }
                .hmm-mega-col a {
                    font-size: 0.75rem;
                    padding: 0.3rem 0.4rem;
                }

                /* Collapsible nested sections */
                .hmm-nested-toggle {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0.4rem 0.6rem;
                    color: #d0d0d0;
                    font-size: 0.8rem;
                    cursor: pointer;
                    border-radius: 3px;
                    transition: all 0.2s;
                }
                .hmm-nested-toggle:hover {
                    background: rgba(201, 162, 39, 0.15);
                    color: #c9a227;
                }
                .hmm-nested-toggle .hmm-nest-arrow {
                    font-size: 0.6rem;
                    transition: transform 0.2s;
                }
                .hmm-nested-toggle.expanded .hmm-nest-arrow {
                    transform: rotate(180deg);
                }
                .hmm-nested-items {
                    display: none;
                    padding-left: 0.5rem;
                    border-left: 1px solid rgba(201, 162, 39, 0.2);
                    margin-left: 0.5rem;
                }
                .hmm-nested-items.show {
                    display: block;
                }

                /* Mobile */
                .hmm-toggle {
                    display: none;
                    padding: 0.6rem 0.8rem;
                    background: rgba(201, 162, 39, 0.1);
                    border: 1px solid rgba(201, 162, 39, 0.4);
                    border-radius: 6px;
                    color: #c9a227;
                    font-size: 1.2rem;
                    cursor: pointer;
                    -webkit-tap-highlight-color: transparent;
                    touch-action: manipulation;
                }
                .hmm-toggle:active {
                    background: rgba(201, 162, 39, 0.25);
                }
                @media (max-width: 900px) {
                    .hmm-inner {
                        padding: 0.6rem 1rem;
                    }
                    .hmm-nav {
                        display: none;
                        flex-direction: column;
                        position: absolute;
                        top: 100%;
                        left: 0;
                        right: 0;
                        background: rgba(10, 10, 15, 0.99);
                        padding: 0.75rem;
                        border-bottom: 2px solid rgba(201, 162, 39, 0.3);
                        max-height: 80vh;
                        overflow-y: auto;
                        -webkit-overflow-scrolling: touch;
                    }
                    .hmm-nav.show { display: flex; }
                    .hmm-toggle { display: block; }
                    .hmm-games-link {
                        width: 100%;
                        justify-content: center;
                        padding: 0.8rem;
                        margin-bottom: 0.5rem;
                        font-size: 1rem;
                    }
                    .hmm-btn {
                        width: 100%;
                        justify-content: space-between;
                        padding: 0.75rem 1rem;
                        font-size: 0.95rem;
                        -webkit-tap-highlight-color: transparent;
                        touch-action: manipulation;
                    }
                    .hmm-btn:active {
                        background: rgba(201, 162, 39, 0.2);
                    }
                    .hmm-drop {
                        position: static;
                        min-width: 100% !important;
                        max-height: 60vh;
                        overflow-y: auto;
                        -webkit-overflow-scrolling: touch;
                        box-shadow: none;
                        border: none;
                        border-left: 2px solid rgba(201, 162, 39, 0.3);
                        margin-left: 0.5rem;
                        padding: 0.5rem 0 0.5rem 0.75rem;
                        background: rgba(10, 10, 15, 0.95);
                    }
                    .hmm-drop.mega {
                        position: static;
                        min-width: 100% !important;
                        max-height: 65vh;
                        overflow-y: auto;
                        -webkit-overflow-scrolling: touch;
                        box-shadow: none;
                        border: none;
                        border-left: 2px solid rgba(201, 162, 39, 0.3);
                        margin-left: 0.5rem;
                        padding: 0.75rem;
                        background: rgba(10, 10, 15, 0.95);
                        border-radius: 8px;
                    }
                    .hmm-mega-grid {
                        grid-template-columns: 1fr;
                        gap: 1rem;
                    }
                    .hmm-mega-col h4 {
                        font-size: 0.85rem;
                        padding: 0.5rem;
                    }
                    .hmm-mega-col a {
                        font-size: 0.9rem;
                        padding: 0.5rem 0.6rem;
                    }
                    .hmm-drop a {
                        padding: 0.6rem 0.8rem;
                        font-size: 0.9rem;
                    }
                    .hmm-nested-toggle {
                        padding: 0.6rem 0.8rem;
                        font-size: 0.9rem;
                    }
                }
                @media (max-width: 480px) {
                    .hmm-brand {
                        font-size: 0.8rem;
                        letter-spacing: 1px;
                    }
                    .hmm-inner {
                        padding: 0.5rem 0.75rem;
                    }
                }
            </style>

            <header class="hmm-header">
                <div class="hmm-inner">
                    <a href="${bp}index.html" class="hmm-brand">HAVE MIND MEDIA</a>

                    <button class="hmm-toggle">☰</button>

                    <nav class="hmm-nav">
                        <!-- Games - Prominent -->
                        <a href="${bp}games/index.html" class="hmm-games-link">🧠 Mind Games</a>

                        <!-- Physics / S+ -->
                        <div class="hmm-nav-item">
                            <button class="hmm-btn hmm-splus">S+ Physics <span class="hmm-arrow">▼</span></button>
                            <div class="hmm-drop drop-splus">
                                <div class="label">Core Physics</div>
                                <a href="${bp}physics/three-body-geometry.html">Three-Body Solution</a>
                                <a href="${bp}physics/millennium-problems.html">Millennium Problems</a>
                                <a href="${bp}physics/jwst-geometric-explorer.html">JWST Explorer</a>
                                <hr>
                                <div class="label">Frameworks</div>
                                <a href="${bp}cedga/index.html">CEDGA Framework</a>
                                <a class="sub" href="${bp}cedga/pages/kappa-constant.html">Kappa Constant</a>
                                <a class="sub" href="${bp}cedga/pages/tetrahelix.html">Tetrahelix</a>
                                <a class="sub" href="${bp}cedga/pages/balance-law.html">Balance Law</a>
                                <a class="sub" href="${bp}cedga/tools/m4-simulator.html">M4 Simulator</a>
                                <a class="sub" href="${bp}cedga/research/test-analysis.html">Test Analysis</a>
                                <hr>
                                <div class="label">Models</div>
                                <a href="${bp}epoch-atomic/index.html">Epoch Atomic Model</a>
                                <a href="${bp}dna-studio/index.html">DNA Studio</a>
                                <a href="${bp}protein-folding/index.html">Protein Folding</a>
                                <a href="${bp}neurodegeneration/index.html">Neurodegeneration</a>
                                <hr>
                                <div class="label">Visualizations</div>
                                <a href="${bp}physics/apparent-speed-paradox/index.html">Apparent Speed Paradox</a>
                                <a href="${bp}physics/vessel/index.html">Scalar Phasing Vessel</a>
                                <a href="${bp}physics-viz/scalar-crossroads-animated.html">Scalar Crossroads</a>
                                <a href="${bp}physics-viz/quad-helix-base60.html">Quad Helix Base-60</a>
                                <a href="${bp}physics-viz/quad-helix-base60-v2.0.html">Quad Helix v2.0</a>
                            </div>
                        </div>

                        <!-- Soul Science / S- -->
                        <div class="hmm-nav-item">
                            <button class="hmm-btn hmm-sminus">S- Soul <span class="hmm-arrow">▼</span></button>
                            <div class="hmm-drop drop-sminus">
                                <div class="label">Soul Science</div>
                                <a href="${bp}education/soul-science.html">Soul Science</a>
                                <a href="${bp}education/becoming-a-coin.html">Becoming a Coin</a>
                                <a href="${bp}education/mirror/index.html">The Mirror</a>
                                <a href="${bp}education/life-facing-wisdom.html">Life-Facing Wisdom</a>
                                <a href="${bp}education/vinyl-paradox.html">Vinyl Paradox</a>
                                <a href="${bp}tools/sol-vision/index.html">Sol Vision (Past Lives)</a>
                                <hr>
                                <div class="label">Education</div>
                                <a href="${bp}education/socratean-education.html">Socratean AI</a>
                                <a href="${bp}education/geometry-challenge.html">Geometry Challenge</a>
                            </div>
                        </div>

                        <!-- COIN Science -->
                        <div class="hmm-nav-item">
                            <button class="hmm-btn hmm-coin">◯ COIN <span class="hmm-arrow">▼</span></button>
                            <div class="hmm-drop drop-coin">
                                <div class="label">COIN Science</div>
                                <a href="${bp}coin-science/index.html">COIN Science Home</a>
                                <a href="${bp}education/becoming-a-coin.html">Becoming a Coin</a>
                                <a href="${bp}education/mirror/index.html">The Mirror</a>
                                <a href="${bp}physics/vessel/index.html">Scalar Vessel</a>
                                <hr>
                                <div class="label">Tools</div>
                                <a href="${bp}tools/mind-reading/index.html">Mind Reading</a>
                                <a href="${bp}games/balance/index.html">Balance Game</a>
                                <a href="${bp}tools/s-signature/s_signature_coin.html">S-Signature Coin</a>
                                <hr>
                                <div class="label">S-Signature Suite</div>
                                <a href="${bp}tools/s-signature/s_signature_128.html">S-Signature 128</a>
                                <a href="${bp}tools/s-signature/s_signature_assessment.html">Assessment</a>
                                <a href="${bp}tools/s-signature/s_signature_oracle.html">Oracle</a>
                                <a href="${bp}tools/s-signature/deep_oracle.html">Deep Oracle</a>
                            </div>
                        </div>

                        <!-- Explore - Mega Menu -->
                        <div class="hmm-nav-item">
                            <button class="hmm-btn">Explore <span class="hmm-arrow">▼</span></button>
                            <div class="hmm-drop mega">
                                <div class="hmm-mega-grid">
                                    <div class="hmm-mega-col">
                                        <h4>Ancient Mysteries</h4>
                                        <div class="hmm-nested">
                                            <div class="hmm-nested-toggle" data-nest="voynich">
                                                <span>📜 Voynich Manuscript</span>
                                                <span class="hmm-nest-arrow">▼</span>
                                            </div>
                                            <div class="hmm-nested-items" id="nest-voynich">
                                                <a href="${bp}ancient-mysteries/voynich/index.html">Overview</a>
                                                <a href="${bp}ancient-mysteries/voynich/herbal.html">Herbal</a>
                                                <a href="${bp}ancient-mysteries/voynich/astronomical.html">Astronomical</a>
                                                <a href="${bp}ancient-mysteries/voynich/biological.html">Biological</a>
                                                <a href="${bp}ancient-mysteries/voynich/zodiac.html">Zodiac</a>
                                                <a href="${bp}ancient-mysteries/voynich/pharmaceutical.html">Pharmaceutical</a>
                                                <a href="${bp}ancient-mysteries/voynich/cosmological.html">Cosmological</a>
                                                <a href="${bp}ancient-mysteries/voynich/recipes.html">Recipes</a>
                                                <a href="${bp}ancient-mysteries/voynich/analysis.html">Analysis</a>
                                            </div>
                                        </div>
                                        <hr>
                                        <a href="${bp}ancient-mysteries/texts/rongorongo-v1.0.html">Rongorongo</a>
                                        <a href="${bp}ancient-mysteries/texts/phaistos-v1.0.html">Phaistos Disc</a>
                                        <a href="${bp}ancient-mysteries/texts/ancient-mathematics-v1.0.html">Ancient Mathematics</a>
                                        <hr>
                                        <div class="hmm-nested">
                                            <div class="hmm-nested-toggle" data-nest="indus">
                                                <span>𒀭 Indus Valley Script</span>
                                                <span class="hmm-nest-arrow">▼</span>
                                            </div>
                                            <div class="hmm-nested-items" id="nest-indus">
                                                <a href="${bp}ancient-mysteries/indus-script/index.html">Overview</a>
                                                <a href="${bp}ancient-mysteries/indus-script/translator.html">Translator</a>
                                                <a href="${bp}ancient-mysteries/indus-script/sign-reference.html">Sign Reference</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="hmm-mega-col">
                                        <h4>Norse Artifacts</h4>
                                        <a href="${bp}ancient-mysteries/norse-artifacts/rok-runestone_v1.0_01-01-2026.html">Rök Runestone</a>
                                        <a href="${bp}ancient-mysteries/norse-artifacts/gotland-stones_v1.0_01-01-2026.html">Gotland Stones</a>
                                        <a href="${bp}ancient-mysteries/norse-artifacts/bracteates_v1.0_01-01-2026.html">Gold Bracteates</a>
                                        <a href="${bp}ancient-mysteries/norse-artifacts/oseberg_v1.0_01-01-2026.html">Oseberg Ship</a>
                                        <a href="${bp}ancient-mysteries/norse-artifacts/norse-symbols_v1.0_01-01-2026.html">Norse Symbols</a>
                                        <a href="${bp}ancient-mysteries/norse-artifacts/LIBRARY_CARD_Norse_Artifacts_v1.0_01-01-2026.html">Library Card</a>
                                        <hr>
                                        <h4>Documents</h4>
                                        <a href="${bp}documents/dec14-unified-theory/index.html">Unified Theory</a>
                                        <a href="${bp}documents/dec14-unified-theory/main-framework.html">- Main Framework</a>
                                        <a href="${bp}documents/dec14-unified-theory/dual-axis-explorer.html">- Dual-Axis Explorer</a>
                                        <a href="${bp}documents/dec14-model-cern/index.html">CERN Validation</a>
                                        <a href="${bp}documents/cern-scalar-geometry.html">CERN Scalar Geometry</a>
                                        <a href="${bp}documents/epoch-framework/index.html">Epoch Framework</a>
                                    </div>
                                    <div class="hmm-mega-col">
                                        <h4>Teaching</h4>
                                        <a href="${bp}teaching/Scalar_Dimensionality_Teaching_Document.html">Teaching Guide</a>
                                        <hr>
                                        <h4>Special</h4>
                                        <a href="${bp}documents/tribute/index.html">Tribute</a>
                                        <hr>
                                        <h4 style="color: #c9a227;">Complete Index</h4>
                                        <a href="${bp}library-wizard/index.html" style="color: #c9a227; font-weight: 600;">📖 The Library (86 pages)</a>
                                        <a href="${bp}library.html">Legacy Library</a>
                                        <hr>
                                        <h4 style="color: #d4a8e0;">♡ Support</h4>
                                        <a href="${bp}support.html" style="color: #d4a8e0;">Support Us</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>
        `;

        this.setupEvents();
    }

    getBasePath() {
        const path = window.location.pathname;
        const depth = (path.match(/\//g) || []).length - 1;
        if (depth <= 0 || path === '/' || (path.endsWith('/index.html') && depth === 1)) {
            return './';
        }
        return '../'.repeat(depth);
    }

    setupEvents() {
        const items = this.querySelectorAll('.hmm-nav-item');
        items.forEach(item => {
            const btn = item.querySelector('.hmm-btn');
            const drop = item.querySelector('.hmm-drop');

            // Handle both click and touch
            const handleToggle = (e) => {
                e.preventDefault();
                e.stopPropagation();
                const isActive = btn.classList.contains('active');

                // Close all other dropdowns
                this.querySelectorAll('.hmm-nav-item').forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.querySelector('.hmm-btn').classList.remove('active');
                        otherItem.querySelector('.hmm-drop').classList.remove('show');
                    }
                });

                // Toggle this dropdown
                if (!isActive) {
                    btn.classList.add('active');
                    drop.classList.add('show');
                } else {
                    btn.classList.remove('active');
                    drop.classList.remove('show');
                }
            };

            btn.addEventListener('click', handleToggle);
            btn.addEventListener('touchend', (e) => {
                e.preventDefault();
                handleToggle(e);
            }, { passive: false });
        });

        // Close dropdowns when clicking outside (but not on mobile nav)
        document.addEventListener('click', (e) => {
            if (!this.contains(e.target)) {
                this.querySelectorAll('.hmm-btn').forEach(b => b.classList.remove('active'));
                this.querySelectorAll('.hmm-drop').forEach(d => d.classList.remove('show'));
            }
        });

        const toggle = this.querySelector('.hmm-toggle');
        const nav = this.querySelector('.hmm-nav');

        const handleMenuToggle = (e) => {
            e.preventDefault();
            e.stopPropagation();
            nav.classList.toggle('show');
            toggle.textContent = nav.classList.contains('show') ? '✕' : '☰';
        };

        toggle.addEventListener('click', handleMenuToggle);
        toggle.addEventListener('touchend', (e) => {
            e.preventDefault();
            handleMenuToggle(e);
        }, { passive: false });

        // Nested collapsible sections
        const nestedToggles = this.querySelectorAll('.hmm-nested-toggle');
        nestedToggles.forEach(nestedToggle => {
            const handleNestToggle = (e) => {
                e.preventDefault();
                e.stopPropagation();
                const nestId = nestedToggle.getAttribute('data-nest');
                const nestedItems = this.querySelector('#nest-' + nestId);
                nestedToggle.classList.toggle('expanded');
                nestedItems.classList.toggle('show');
            };

            nestedToggle.addEventListener('click', handleNestToggle);
            nestedToggle.addEventListener('touchend', (e) => {
                e.preventDefault();
                handleNestToggle(e);
            }, { passive: false });
        });
    }
}

customElements.define('site-header', SiteHeader);
