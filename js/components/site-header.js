/**
 * Have Mind Media - Unified Site Header Web Component
 * Navigation: S+ (Physics) | S- (Soul Science) | Coin (Tools) | Void (Library/Docs)
 * [1 = -1]
 */

class SiteHeader extends HTMLElement {
    constructor() {
        super();
        this.basePath = this.getBasePath();
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    // Calculate relative path based on page depth
    getBasePath() {
        const path = window.location.pathname;
        const depth = (path.match(/\//g) || []).length - 1;
        if (depth <= 0 || path === '/' || path.endsWith('/index.html') && depth === 1) {
            return './';
        }
        return '../'.repeat(depth);
    }

    render() {
        const bp = this.basePath;

        this.innerHTML = `
            <style>
                .hmm-header {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 10000;
                    background: rgba(3, 5, 8, 0.95);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border-bottom: 1px solid rgba(70, 130, 180, 0.25);
                    font-family: 'Cinzel', Georgia, serif;
                }

                .hmm-header-inner {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0.6rem 1.5rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .hmm-brand {
                    display: flex;
                    align-items: center;
                    gap: 0.8rem;
                    text-decoration: none;
                }

                .hmm-brand-text {
                    font-size: 0.95rem;
                    color: #c9a227;
                    letter-spacing: 3px;
                    font-weight: 500;
                }

                .hmm-brand-sig {
                    font-size: 0.65rem;
                    color: #a8d4f5;
                    opacity: 0.5;
                    letter-spacing: 2px;
                }

                .hmm-nav {
                    display: flex;
                    align-items: center;
                    gap: 0.3rem;
                }

                .hmm-nav-item {
                    position: relative;
                }

                .hmm-nav-btn {
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                    padding: 0.5rem 1rem;
                    background: transparent;
                    border: 1px solid transparent;
                    border-radius: 6px;
                    color: #f0e8d8;
                    font-family: 'Cinzel', Georgia, serif;
                    font-size: 0.8rem;
                    letter-spacing: 1.5px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .hmm-nav-btn:hover {
                    background: rgba(70, 130, 180, 0.1);
                    border-color: rgba(70, 130, 180, 0.3);
                }

                .hmm-nav-btn.active {
                    background: rgba(70, 130, 180, 0.15);
                    border-color: rgba(70, 130, 180, 0.4);
                }

                .hmm-nav-btn .icon {
                    font-size: 0.9rem;
                }

                .hmm-nav-btn .arrow {
                    font-size: 0.5rem;
                    transition: transform 0.3s ease;
                }

                .hmm-nav-btn.active .arrow {
                    transform: rotate(180deg);
                }

                /* Section Colors */
                .hmm-nav-btn[data-section="s-plus"] { color: #6ab4f5; }
                .hmm-nav-btn[data-section="s-minus"] { color: #c9a227; }
                .hmm-nav-btn[data-section="coin"] {
                    background: linear-gradient(90deg, #6ab4f5, #c9a227);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                .hmm-nav-btn[data-section="void"] { color: #a8d4f5; }

                /* Dropdown */
                .hmm-dropdown {
                    position: absolute;
                    top: calc(100% + 0.5rem);
                    right: 0;
                    min-width: 240px;
                    background: rgba(10, 13, 18, 0.98);
                    border: 1px solid rgba(70, 130, 180, 0.3);
                    border-radius: 10px;
                    padding: 0.5rem;
                    opacity: 0;
                    visibility: hidden;
                    transform: translateY(-8px);
                    transition: all 0.25s ease;
                    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
                }

                .hmm-dropdown.show {
                    opacity: 1;
                    visibility: visible;
                    transform: translateY(0);
                }

                .hmm-dropdown a {
                    display: flex;
                    align-items: center;
                    gap: 0.7rem;
                    padding: 0.6rem 0.8rem;
                    color: #f0e8d8;
                    text-decoration: none;
                    border-radius: 6px;
                    font-size: 0.85rem;
                    transition: all 0.2s ease;
                }

                .hmm-dropdown a:hover {
                    background: rgba(70, 130, 180, 0.15);
                    color: #6ab4f5;
                }

                .hmm-dropdown a .icon {
                    width: 20px;
                    text-align: center;
                    font-size: 0.95rem;
                }

                .hmm-dropdown .divider {
                    height: 1px;
                    background: rgba(70, 130, 180, 0.2);
                    margin: 0.4rem 0;
                }

                .hmm-dropdown .section-label {
                    padding: 0.3rem 0.8rem;
                    font-size: 0.65rem;
                    color: #666;
                    letter-spacing: 1.5px;
                    text-transform: uppercase;
                }

                /* Mobile */
                .hmm-mobile-toggle {
                    display: none;
                    padding: 0.5rem;
                    background: transparent;
                    border: 1px solid rgba(70, 130, 180, 0.3);
                    border-radius: 6px;
                    color: #f0e8d8;
                    cursor: pointer;
                    font-size: 1.2rem;
                }

                @media (max-width: 900px) {
                    .hmm-nav {
                        display: none;
                        position: absolute;
                        top: 100%;
                        left: 0;
                        right: 0;
                        background: rgba(10, 13, 18, 0.98);
                        flex-direction: column;
                        padding: 1rem;
                        border-bottom: 1px solid rgba(70, 130, 180, 0.25);
                    }

                    .hmm-nav.show {
                        display: flex;
                    }

                    .hmm-nav-item {
                        width: 100%;
                    }

                    .hmm-nav-btn {
                        width: 100%;
                        justify-content: space-between;
                    }

                    .hmm-dropdown {
                        position: static;
                        opacity: 1;
                        visibility: visible;
                        transform: none;
                        display: none;
                        box-shadow: none;
                        border: none;
                        padding-left: 1rem;
                    }

                    .hmm-dropdown.show {
                        display: block;
                    }

                    .hmm-mobile-toggle {
                        display: block;
                    }

                    .hmm-brand-sig {
                        display: none;
                    }
                }
            </style>

            <header class="hmm-header">
                <div class="hmm-header-inner">
                    <a href="${bp}index.html" class="hmm-brand">
                        <span class="hmm-brand-text">HAVE MIND MEDIA</span>
                        <span class="hmm-brand-sig">[1 = -1]</span>
                    </a>

                    <button class="hmm-mobile-toggle" aria-label="Toggle menu">☰</button>

                    <nav class="hmm-nav">
                        <!-- S+ Physics -->
                        <div class="hmm-nav-item">
                            <button class="hmm-nav-btn" data-section="s-plus">
                                <span class="icon">⚛</span>
                                <span>S+</span>
                                <span class="arrow">▼</span>
                            </button>
                            <div class="hmm-dropdown">
                                <div class="section-label">Physical Reality</div>
                                <a href="${bp}physics/three-body-geometry.html"><span class="icon">◬</span>Three-Body Solution</a>
                                <a href="${bp}physics/millennium-problems.html"><span class="icon">∞</span>Millennium Problems</a>
                                <a href="${bp}physics/jwst-geometric-explorer.html"><span class="icon">🔭</span>JWST Explorer</a>
                                <div class="divider"></div>
                                <a href="${bp}cedga/index.html"><span class="icon">κ</span>CEDGA Framework</a>
                                <a href="${bp}epoch-atomic/index.html"><span class="icon">⚛</span>Epoch Atomic Model</a>
                                <a href="${bp}dna-studio/index.html"><span class="icon">🧬</span>DNA Studio</a>
                                <div class="divider"></div>
                                <a href="${bp}documents/dec14-model-cern/index.html"><span class="icon">◉</span>CERN Validation</a>
                            </div>
                        </div>

                        <!-- S- Soul Science -->
                        <div class="hmm-nav-item">
                            <button class="hmm-nav-btn" data-section="s-minus">
                                <span class="icon">☯</span>
                                <span>S-</span>
                                <span class="arrow">▼</span>
                            </button>
                            <div class="hmm-dropdown">
                                <div class="section-label">Mother Earth Science</div>
                                <a href="${bp}education/soul-science.html"><span class="icon">☯</span>Soul Science</a>
                                <a href="${bp}education/becoming-a-coin.html"><span class="icon">◯</span>Becoming a Coin</a>
                                <a href="${bp}education/mirror/index.html"><span class="icon">🪞</span>The Mirror</a>
                                <a href="${bp}education/life-facing-wisdom.html"><span class="icon">✧</span>Life-Facing Wisdom</a>
                                <div class="divider"></div>
                                <div class="section-label">Ancient Mysteries</div>
                                <a href="${bp}ancient-mysteries/voynich/index.html"><span class="icon">📜</span>Voynich Manuscript</a>
                                <a href="${bp}ancient-mysteries/norse-artifacts/rok-runestone_v1.0_01-01-2026.html"><span class="icon">ᚱ</span>Norse Artifacts</a>
                                <a href="${bp}ancient-mysteries/texts/ancient-mathematics-v1.0.html"><span class="icon">𓂀</span>Ancient Mathematics</a>
                            </div>
                        </div>

                        <!-- Coin (Tools) -->
                        <div class="hmm-nav-item">
                            <button class="hmm-nav-btn" data-section="coin">
                                <span class="icon">◐</span>
                                <span>Coin</span>
                                <span class="arrow">▼</span>
                            </button>
                            <div class="hmm-dropdown">
                                <div class="section-label">Interactive Tools</div>
                                <a href="${bp}tools/s-signature/s_signature_128.html"><span class="icon">𝕊</span>S-Signature 128</a>
                                <a href="${bp}tools/s-signature/s_signature_assessment.html"><span class="icon">📊</span>S-Signature Assessment</a>
                                <a href="${bp}tools/mind-reading/index.html"><span class="icon">🃏</span>Mind Reading</a>
                                <a href="${bp}tools/m4-visualizer/index.html"><span class="icon">◇</span>M4 Visualizer</a>
                                <a href="${bp}tools/interaction-modeler/index.html"><span class="icon">⇄</span>Interaction Modeler</a>
                                <div class="divider"></div>
                                <div class="section-label">Education</div>
                                <a href="${bp}education/socratean-education.html"><span class="icon">🎓</span>Socratean AI</a>
                                <a href="${bp}education/geometry-challenge.html"><span class="icon">△</span>Geometry Challenge</a>
                            </div>
                        </div>

                        <!-- Void (Library/Docs) -->
                        <div class="hmm-nav-item">
                            <button class="hmm-nav-btn" data-section="void">
                                <span class="icon">◌</span>
                                <span>Void</span>
                                <span class="arrow">▼</span>
                            </button>
                            <div class="hmm-dropdown">
                                <div class="section-label">Library & Documents</div>
                                <a href="${bp}library.html" style="background: rgba(201, 162, 39, 0.1);"><span class="icon">📚</span>Complete Library (66 pages)</a>
                                <div class="divider"></div>
                                <a href="${bp}documents/dec14-unified-theory/index.html"><span class="icon">📖</span>Unified Theory</a>
                                <a href="${bp}documents/epoch-framework/index.html"><span class="icon">⧬</span>Epoch Framework</a>
                                <a href="${bp}teaching/Scalar_Dimensionality_Teaching_Document.html"><span class="icon">📝</span>Teaching Guide</a>
                                <div class="divider"></div>
                                <a href="${bp}documents/tribute/index.html"><span class="icon">♡</span>Tribute</a>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>
        `;
    }

    setupEventListeners() {
        // Desktop dropdowns
        const navItems = this.querySelectorAll('.hmm-nav-item');
        navItems.forEach(item => {
            const btn = item.querySelector('.hmm-nav-btn');
            const dropdown = item.querySelector('.hmm-dropdown');

            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isActive = btn.classList.contains('active');

                // Close all other dropdowns
                this.querySelectorAll('.hmm-nav-btn').forEach(b => b.classList.remove('active'));
                this.querySelectorAll('.hmm-dropdown').forEach(d => d.classList.remove('show'));

                if (!isActive) {
                    btn.classList.add('active');
                    dropdown.classList.add('show');
                }
            });
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.contains(e.target)) {
                this.querySelectorAll('.hmm-nav-btn').forEach(b => b.classList.remove('active'));
                this.querySelectorAll('.hmm-dropdown').forEach(d => d.classList.remove('show'));
            }
        });

        // Mobile toggle
        const mobileToggle = this.querySelector('.hmm-mobile-toggle');
        const nav = this.querySelector('.hmm-nav');

        mobileToggle.addEventListener('click', () => {
            nav.classList.toggle('show');
            mobileToggle.textContent = nav.classList.contains('show') ? '✕' : '☰';
        });
    }
}

customElements.define('site-header', SiteHeader);
