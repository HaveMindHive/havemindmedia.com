/**
 * Have Mind Media - Site Header
 * Clean, tried-and-true navigation structure
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
                    padding: 0.5rem 1rem;
                    border: 1px solid rgba(201, 162, 39, 0.5);
                    border-radius: 6px;
                    background: rgba(201, 162, 39, 0.1);
                    transition: all 0.3s;
                }
                .hmm-brand:hover {
                    color: #e8c547;
                    background: rgba(201, 162, 39, 0.2);
                    border-color: rgba(201, 162, 39, 0.8);
                }
                .hmm-nav {
                    display: flex;
                    gap: 0.25rem;
                    align-items: center;
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
                    font-size: 1.1rem;
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

                /* Direct links */
                .hmm-link {
                    padding: 0.5rem 0.75rem;
                    color: #e0e0e0;
                    text-decoration: none;
                    font-size: 1.1rem;
                    border-radius: 4px;
                    transition: all 0.2s;
                }
                .hmm-link:hover {
                    background: rgba(201, 162, 39, 0.1);
                    color: #c9a227;
                }
                .hmm-link.games {
                    background: linear-gradient(135deg, rgba(201, 162, 39, 0.15) 0%, rgba(106, 180, 245, 0.15) 100%);
                    border: 1px solid rgba(201, 162, 39, 0.3);
                    color: #c9a227;
                    font-weight: 600;
                }
                .hmm-link.games:hover {
                    background: linear-gradient(135deg, rgba(201, 162, 39, 0.25) 0%, rgba(106, 180, 245, 0.25) 100%);
                }
                .hmm-link.kappa5 {
                    position: relative;
                    background: none;
                    border: none;
                    border-radius: 0;
                    color: #8B0000;
                    font-weight: 600;
                    padding-bottom: 0.6rem;
                }
                .hmm-link.kappa5::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 0;
                    height: 2px;
                    background: #8B0000;
                    transition: width 0.3s ease;
                }
                .hmm-link.kappa5:hover::after {
                    width: 100%;
                }
                .hmm-link.kappa5:hover {
                    background: none;
                    color: #a00;
                }
                /* 5 Science Branch Styles - Bottom bar indicator */
                .hmm-btn.s-plus, .hmm-btn.s-minus, .hmm-btn.coin, .hmm-btn.tau4 {
                    position: relative;
                    border: none;
                    border-radius: 0;
                    padding-bottom: 0.6rem;
                }
                .hmm-btn.s-plus::after, .hmm-btn.s-minus::after, .hmm-btn.coin::after, .hmm-btn.tau4::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 0;
                    height: 2px;
                    transition: width 0.3s ease;
                }
                .hmm-btn.s-plus { color: #6ab4f5; }
                .hmm-btn.s-plus::after { background: #6ab4f5; }
                .hmm-btn.s-plus:hover::after, .hmm-btn.s-plus.active::after { width: 100%; }
                .hmm-btn.s-minus { color: #9b59b6; }
                .hmm-btn.s-minus::after { background: #9b59b6; }
                .hmm-btn.s-minus:hover::after, .hmm-btn.s-minus.active::after { width: 100%; }
                .hmm-btn.coin { color: #c9a227; }
                .hmm-btn.coin::after { background: #c9a227; }
                .hmm-btn.coin:hover::after, .hmm-btn.coin.active::after { width: 100%; }
                .hmm-btn.tau4 { color: #2ecc71; }
                .hmm-btn.tau4::after { background: #2ecc71; }
                .hmm-btn.tau4:hover::after, .hmm-btn.tau4.active::after { width: 100%; }

                /* Dropdown */
                .hmm-drop {
                    position: absolute;
                    top: calc(100% + 4px);
                    left: 50%;
                    transform: translateX(-50%);
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
                    padding: 0.5rem 0.75rem;
                    color: #d0d0d0;
                    text-decoration: none;
                    font-size: 0.8rem;
                    border-radius: 3px;
                }
                .hmm-drop a:hover {
                    background: rgba(201, 162, 39, 0.15);
                    color: #c9a227;
                }
                .hmm-drop .label {
                    padding: 0.6rem 0.75rem 0.3rem;
                    font-size: 0.65rem;
                    color: #888;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                }
                .hmm-drop hr {
                    border: none;
                    border-top: 1px solid rgba(201, 162, 39, 0.15);
                    margin: 0.4rem 0;
                }
                .hmm-drop .highlight {
                    color: #c9a227;
                    font-weight: 600;
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
                }
                @media (max-width: 900px) {
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
                    }
                    .hmm-nav.show { display: flex; }
                    .hmm-toggle { display: block; }
                    .hmm-link, .hmm-btn {
                        width: 100%;
                        padding: 0.75rem 1rem;
                        font-size: 0.95rem;
                    }
                    .hmm-drop {
                        position: static;
                        min-width: 100% !important;
                        box-shadow: none;
                        border: none;
                        border-left: 2px solid rgba(201, 162, 39, 0.3);
                        margin-left: 0.5rem;
                        background: rgba(10, 10, 15, 0.95);
                    }
                    .hmm-drop a { padding: 0.6rem 0.8rem; font-size: 0.9rem; }
                }
                @media (max-width: 480px) {
                    .hmm-brand { font-size: 0.8rem; letter-spacing: 1px; }
                }
            </style>

            <header class="hmm-header">
                <div class="hmm-inner">
                    <a href="${bp}index.html" class="hmm-brand" title="Home">HAVE MIND MEDIA</a>
                    <button class="hmm-toggle">☰</button>

                    <nav class="hmm-nav">
                        <!-- EXPLORE - The main discovery menu -->
                        <div class="hmm-nav-item">
                            <button class="hmm-btn" title="Explore Have Mind Media">EXPLORE <span class="hmm-arrow">▼</span></button>
                            <div class="hmm-drop" style="min-width: 280px;">
                                <div class="label">Start Here</div>
                                <a href="${bp}education/soul-science.html" class="highlight">☯ Soul Science</a>
                                <a href="${bp}coin-science/index.html">◯ COIN Science</a>
                                <a href="${bp}weirdos/index.html">✧ Here's to You, Weirdos</a>
                                <hr>
                                <div class="label">Featured</div>
                                <a href="${bp}physics/three-body-geometry.html">◬ Three-Body Solution</a>
                                <a href="${bp}education/mythic-mirror/index.html">Mythic Mirror</a>
                                <a href="${bp}ancient-mysteries/voynich/index.html">📜 Voynich Manuscript</a>
                                <hr>
                                <div class="label">About</div>
                                <a href="${bp}about.html">About Tormod</a>
                            </div>
                        </div>

                        <!-- S+ Physical Reality -->
                        <div class="hmm-nav-item">
                            <button class="hmm-btn s-plus" title="S+ Physical Reality">S+ <span class="hmm-arrow">▼</span></button>
                            <div class="hmm-drop">
                                <div class="label">S+ Physical Reality</div>
                                <a href="${bp}physics/three-body-geometry.html" class="highlight">◬ Three-Body Solution</a>
                                <a href="${bp}physics/millennium-problems.html">Millennium Problems</a>
                                <a href="${bp}epoch-atomic/index.html">Epoch Atomic Model</a>
                                <hr>
                                <div class="label">Frameworks</div>
                                <a href="${bp}cedga/index.html">CEDGA (κ-Framework)</a>
                                <a href="${bp}cedga/triaxial-os/index.html">Triaxial OS</a>
                                <a href="${bp}physics/vessel/index.html">Scalar Vessel</a>
                                <hr>
                                <div class="label">Research</div>
                                <a href="${bp}documents/index.html" class="highlight">📜 White Papers</a>
                                <a href="${bp}physics/standard-model-failures/index.html">Standard Model Failures</a>
                                <a href="${bp}physics/atomic-derivations/index.html">Atomic Derivations</a>
                            </div>
                        </div>

                        <!-- S- Mother Earth Science -->
                        <div class="hmm-nav-item">
                            <button class="hmm-btn s-minus" title="S- Mother Earth Science">S- <span class="hmm-arrow">▼</span></button>
                            <div class="hmm-drop">
                                <div class="label">S- Mother Earth Science</div>
                                <a href="${bp}education/soul-science.html" class="highlight">☯ Soul Science</a>
                                <a href="${bp}education/mythic-mirror/index.html">Mythic Mirror</a>
                                <a href="${bp}ancient-mysteries/voynich/index.html">📜 Voynich Manuscript</a>
                                <a href="${bp}ancient-mysteries/indus-script/index.html">Indus Script</a>
                                <hr>
                                <div class="label">Ancient Texts</div>
                                <a href="${bp}ancient-mysteries/texts/rongorongo-v1.0.html">Rongorongo</a>
                                <a href="${bp}ancient-mysteries/texts/phaistos-v1.0.html">Phaistos Disc</a>
                                <a href="${bp}rosetta-engine/rosetta-engine-app_v1.0_01-06-2026.html">Rosetta Engine</a>
                                <hr>
                                <div class="label">Norse</div>
                                <a href="${bp}ancient-mysteries/norse-artifacts/rok-runestone_v1.0_01-01-2026.html">Rök Runestone</a>
                                <a href="${bp}ancient-mysteries/norse-artifacts/gotland-stones_v1.0_01-01-2026.html">Gotland Stones</a>
                            </div>
                        </div>

                        <!-- COIN Science -->
                        <div class="hmm-nav-item">
                            <button class="hmm-btn coin" title="COIN Science">COIN <span class="hmm-arrow">▼</span></button>
                            <div class="hmm-drop">
                                <div class="label">COIN Science</div>
                                <a href="${bp}coin-science/index.html" class="highlight">◯ COIN Science</a>
                                <a href="${bp}education/becoming-a-coin.html">Becoming a Coin</a>
                                <a href="${bp}education/mirror/index.html">The Mirror</a>
                                <hr>
                                <div class="label">Tools</div>
                                <a href="${bp}tools/s-signature/s_signature_128.html">S-Signature</a>
                                <a href="${bp}tools/sol-vision/index.html">Sol Vision</a>
                                <a href="${bp}universal-language-generator/ulg-app_v1.0_01-06-2026.html">Language Generator</a>
                            </div>
                        </div>

                        <!-- κ₄ Shadow/Silent Operator -->
                        <div class="hmm-nav-item">
                            <button class="hmm-btn tau4" title="κ₄ Shadow/Silent Operator">κ₄ <span class="hmm-arrow">▼</span></button>
                            <div class="hmm-drop">
                                <div class="label">κ₄ Shadow/Silent Operator</div>
                                <a href="${bp}physics/shadow-operator/index.html" class="highlight">κ₄ Shadow/Silent Science</a>
                                <a href="${bp}education/hidden-observers.html">Hidden Observers</a>
                                <a href="${bp}education/ammit-function.html">Ammit Function</a>
                                <hr>
                                <div class="label">Research</div>
                                <a href="${bp}physics/torsion-balance.html">Torsion Balance</a>
                                <a href="${bp}neurodegeneration/index.html">Neurodegeneration</a>
                            </div>
                        </div>

                        <!-- κ₅ True Dark -->
                        <a href="${bp}physics/kappa5/index.html" class="hmm-link kappa5" title="κ₅ True Dark">κ₅</a>

                        <!-- Library -->
                        <a href="${bp}library-wizard/index.html" class="hmm-link" title="Library">Library</a>

                        <!-- Store -->
                        <a href="${bp}store/index.html" class="hmm-link" title="Store">Store</a>

                        <!-- Support -->
                        <a href="${bp}support.html" class="hmm-link" title="Support">Support</a>

                        <!-- Games -->
                        <a href="${bp}games/index.html" class="hmm-link games" title="Mind Games">Games</a>
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
    }
}

customElements.define('site-header', SiteHeader);
