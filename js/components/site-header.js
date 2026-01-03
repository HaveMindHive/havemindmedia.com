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
                .hmm-arrow {
                    font-size: 0.5rem;
                    transition: transform 0.2s;
                }
                .hmm-btn.active .hmm-arrow {
                    transform: rotate(180deg);
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

                /* Mobile */
                .hmm-toggle {
                    display: none;
                    padding: 0.4rem;
                    background: none;
                    border: 1px solid rgba(201, 162, 39, 0.3);
                    border-radius: 4px;
                    color: #e0e0e0;
                    font-size: 1.1rem;
                    cursor: pointer;
                }
                @media (max-width: 900px) {
                    .hmm-nav { display: none; flex-direction: column; position: absolute; top: 100%; left: 0; right: 0; background: rgba(15, 15, 20, 0.98); padding: 0.5rem; border-bottom: 1px solid rgba(201, 162, 39, 0.2); }
                    .hmm-nav.show { display: flex; }
                    .hmm-toggle { display: block; }
                    .hmm-btn { width: 100%; justify-content: space-between; }
                    .hmm-drop, .hmm-drop.mega { position: static; min-width: 100%; max-height: none; box-shadow: none; border: none; padding-left: 1rem; }
                    .hmm-mega-grid { grid-template-columns: 1fr; }
                }
            </style>

            <header class="hmm-header">
                <div class="hmm-inner">
                    <a href="${bp}index.html" class="hmm-brand">HAVE MIND MEDIA</a>

                    <button class="hmm-toggle">☰</button>

                    <nav class="hmm-nav">
                        <!-- Physics / S+ -->
                        <div class="hmm-nav-item">
                            <button class="hmm-btn">S+ Physics <span class="hmm-arrow">▼</span></button>
                            <div class="hmm-drop">
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
                                <a href="${bp}physics-viz/scalar-crossroads-animated.html">Scalar Crossroads</a>
                                <a href="${bp}physics-viz/quad-helix-base60.html">Quad Helix Base-60</a>
                                <a href="${bp}physics-viz/quad-helix-base60-v2.0.html">Quad Helix v2.0</a>
                            </div>
                        </div>

                        <!-- Soul Science / S- -->
                        <div class="hmm-nav-item">
                            <button class="hmm-btn">S- Soul <span class="hmm-arrow">▼</span></button>
                            <div class="hmm-drop">
                                <div class="label">Soul Science</div>
                                <a href="${bp}education/soul-science.html">Soul Science</a>
                                <a href="${bp}education/becoming-a-coin.html">Becoming a Coin</a>
                                <a href="${bp}education/mirror/index.html">The Mirror</a>
                                <a href="${bp}education/life-facing-wisdom.html">Life-Facing Wisdom</a>
                                <a href="${bp}education/vinyl-paradox.html">Vinyl Paradox</a>
                                <hr>
                                <div class="label">Education</div>
                                <a href="${bp}education/socratean-education.html">Socratean AI</a>
                                <a href="${bp}education/geometry-challenge.html">Geometry Challenge</a>
                            </div>
                        </div>

                        <!-- Tools / Coin -->
                        <div class="hmm-nav-item">
                            <button class="hmm-btn">Coin Tools <span class="hmm-arrow">▼</span></button>
                            <div class="hmm-drop">
                                <div class="label">S-Signature Suite</div>
                                <a href="${bp}tools/s-signature/s_signature_128.html">S-Signature 128</a>
                                <a href="${bp}tools/s-signature/s_signature_assessment.html">Assessment</a>
                                <a href="${bp}tools/s-signature/s_signature_evolving.html">Evolving</a>
                                <a href="${bp}tools/s-signature/s_signature_prediction.html">Prediction</a>
                                <a href="${bp}tools/s-signature/s_signature_sphere.html">Sphere</a>
                                <a href="${bp}tools/s-signature/s_signature_coin.html">Coin</a>
                                <a href="${bp}tools/s-signature/s_signature_card.html">Card</a>
                                <a href="${bp}tools/s-signature/s_signature_oracle.html">Oracle</a>
                                <a href="${bp}tools/s-signature/s_signature_engine.html">Engine</a>
                                <a href="${bp}tools/s-signature/deep_oracle.html">Deep Oracle</a>
                                <a href="${bp}tools/s-signature/reductive_oracle.html">Reductive Oracle</a>
                                <a href="${bp}tools/s-signature/cohort_engine.html">Cohort Engine</a>
                                <a href="${bp}tools/s-signature/jason_ray_s_signature.html">Jason Ray Signature</a>
                                <hr>
                                <div class="label">Other Tools</div>
                                <a href="${bp}tools/mind-reading/index.html">Mind Reading</a>
                                <a href="${bp}tools/m4-visualizer/index.html">M4 Visualizer</a>
                                <a href="${bp}tools/interaction-modeler/index.html">Interaction Modeler</a>
                                <a href="${bp}tools/sol-vision/index.html">Sol Vision</a>
                            </div>
                        </div>

                        <!-- Explore - Mega Menu -->
                        <div class="hmm-nav-item">
                            <button class="hmm-btn">Explore <span class="hmm-arrow">▼</span></button>
                            <div class="hmm-drop mega">
                                <div class="hmm-mega-grid">
                                    <div class="hmm-mega-col">
                                        <h4>Ancient Mysteries</h4>
                                        <a href="${bp}ancient-mysteries/voynich/index.html">Voynich Manuscript</a>
                                        <a href="${bp}ancient-mysteries/voynich/herbal.html">- Herbal</a>
                                        <a href="${bp}ancient-mysteries/voynich/astronomical.html">- Astronomical</a>
                                        <a href="${bp}ancient-mysteries/voynich/biological.html">- Biological</a>
                                        <a href="${bp}ancient-mysteries/voynich/zodiac.html">- Zodiac</a>
                                        <a href="${bp}ancient-mysteries/voynich/pharmaceutical.html">- Pharmaceutical</a>
                                        <a href="${bp}ancient-mysteries/voynich/cosmological.html">- Cosmological</a>
                                        <a href="${bp}ancient-mysteries/voynich/recipes.html">- Recipes</a>
                                        <a href="${bp}ancient-mysteries/voynich/analysis.html">- Analysis</a>
                                        <hr>
                                        <a href="${bp}ancient-mysteries/texts/rongorongo-v1.0.html">Rongorongo</a>
                                        <a href="${bp}ancient-mysteries/texts/phaistos-v1.0.html">Phaistos Disc</a>
                                        <a href="${bp}ancient-mysteries/texts/ancient-mathematics-v1.0.html">Ancient Mathematics</a>
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
                                        <a href="${bp}library.html" style="color: #c9a227; font-weight: 600;">📚 Full Library (68 pages)</a>
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

            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isActive = btn.classList.contains('active');

                // Close all
                this.querySelectorAll('.hmm-btn').forEach(b => b.classList.remove('active'));
                this.querySelectorAll('.hmm-drop').forEach(d => d.classList.remove('show'));

                if (!isActive) {
                    btn.classList.add('active');
                    drop.classList.add('show');
                }
            });
        });

        document.addEventListener('click', () => {
            this.querySelectorAll('.hmm-btn').forEach(b => b.classList.remove('active'));
            this.querySelectorAll('.hmm-drop').forEach(d => d.classList.remove('show'));
        });

        const toggle = this.querySelector('.hmm-toggle');
        const nav = this.querySelector('.hmm-nav');
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show');
            toggle.textContent = nav.classList.contains('show') ? '✕' : '☰';
        });
    }
}

customElements.define('site-header', SiteHeader);
