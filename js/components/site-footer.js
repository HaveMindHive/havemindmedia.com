/**
 * Have Mind Media - Unified Site Footer Web Component
 * [1 = -1]
 */

class SiteFooter extends HTMLElement {
    constructor() {
        super();
        this.basePath = this.getBasePath();
    }

    connectedCallback() {
        this.render();
    }

    getBasePath() {
        const path = window.location.pathname;
        // Remove trailing filename to get directory path
        const dirPath = path.substring(0, path.lastIndexOf('/') + 1);
        // Count slashes in directory path (excluding leading slash)
        const depth = (dirPath.match(/\//g) || []).length - 1;
        if (depth <= 0 || path === '/' || path === '/index.html') {
            return './';
        }
        return '../'.repeat(depth);
    }

    render() {
        const bp = this.basePath;
        const year = new Date().getFullYear();

        this.innerHTML = `
            <style>
                .hmm-footer {
                    background: rgba(3, 5, 8, 0.95);
                    border-top: 1px solid rgba(70, 130, 180, 0.2);
                    padding: 3rem 2rem 2rem;
                    margin-top: 4rem;
                    font-family: 'Cormorant Garamond', Georgia, serif;
                }

                .hmm-footer-inner {
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .hmm-footer-top {
                    display: grid;
                    grid-template-columns: 1fr 2fr 1fr;
                    gap: 3rem;
                    padding-bottom: 2rem;
                    border-bottom: 1px solid rgba(70, 130, 180, 0.15);
                }

                .hmm-footer-brand {
                    text-align: left;
                }

                .hmm-footer-logo {
                    font-family: 'Cinzel', Georgia, serif;
                    font-size: 1.1rem;
                    color: #c9a227;
                    letter-spacing: 3px;
                    margin-bottom: 0.5rem;
                }

                .hmm-footer-tagline {
                    font-style: italic;
                    color: #a8d4f5;
                    font-size: 0.95rem;
                    margin-bottom: 0.8rem;
                }

                .hmm-footer-sig {
                    font-size: 0.75rem;
                    color: #666;
                    letter-spacing: 2px;
                }

                .hmm-footer-links {
                    display: flex;
                    justify-content: center;
                    gap: 3rem;
                }

                .hmm-footer-col h4 {
                    font-family: 'Cinzel', Georgia, serif;
                    font-size: 0.8rem;
                    color: #f0e8d8;
                    letter-spacing: 2px;
                    margin-bottom: 0.8rem;
                    text-transform: uppercase;
                }

                .hmm-footer-col a {
                    display: block;
                    color: #8a9aaa;
                    text-decoration: none;
                    font-size: 0.9rem;
                    padding: 0.25rem 0;
                    transition: color 0.3s ease;
                }

                .hmm-footer-col a:hover {
                    color: #6ab4f5;
                }

                .hmm-footer-principle {
                    text-align: right;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: flex-end;
                }

                .hmm-footer-equation {
                    font-family: 'Cinzel', Georgia, serif;
                    font-size: 1.8rem;
                    color: #c9a227;
                    opacity: 0.7;
                    margin-bottom: 0.5rem;
                }

                .hmm-footer-kappa {
                    font-family: monospace;
                    font-size: 0.75rem;
                    color: #666;
                }

                .hmm-footer-philosophy {
                    font-family: 'Cormorant Garamond', Georgia, serif;
                    font-style: italic;
                    font-size: 0.9rem;
                    color: #a8d4f5;
                    margin: 0.8rem 0;
                    opacity: 0.85;
                }

                .hmm-footer-bottom {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-top: 1.5rem;
                }

                .hmm-footer-copy {
                    font-size: 0.8rem;
                    color: #666;
                }

                .hmm-footer-copy a {
                    color: #8a9aaa;
                    text-decoration: none;
                }

                .hmm-footer-copy a:hover {
                    color: #6ab4f5;
                }

                .hmm-footer-social {
                    display: flex;
                    gap: 1rem;
                }

                .hmm-footer-social a {
                    color: #666;
                    font-size: 1.2rem;
                    transition: color 0.3s ease;
                }

                .hmm-footer-social a:hover {
                    color: #c9a227;
                }

                .hmm-footer-support {
                    display: inline-block;
                    margin-top: 0.8rem;
                    padding: 0.5rem 1.2rem;
                    background: rgba(201, 162, 39, 0.15);
                    border: 1px solid rgba(201, 162, 39, 0.4);
                    border-radius: 20px;
                    color: #c9a227;
                    text-decoration: none;
                    font-size: 0.85rem;
                    letter-spacing: 1px;
                    transition: all 0.3s ease;
                }

                .hmm-footer-support:hover {
                    background: rgba(201, 162, 39, 0.25);
                    color: #e6d4b8;
                }

                .hmm-footer-nebulizer {
                    display: block;
                    margin: 1.5rem auto;
                    padding: 1rem 2rem;
                    background: linear-gradient(135deg, rgba(74, 0, 128, 0.3) 0%, rgba(0, 102, 170, 0.3) 100%);
                    border: 2px solid rgba(201, 162, 39, 0.6);
                    border-radius: 30px;
                    color: #c9a227;
                    text-decoration: none;
                    font-family: 'Cinzel', Georgia, serif;
                    font-size: 1rem;
                    letter-spacing: 2px;
                    text-align: center;
                    max-width: 400px;
                    transition: all 0.4s ease;
                    animation: nebulaPulse 3s ease-in-out infinite;
                }

                .hmm-footer-nebulizer:hover {
                    background: linear-gradient(135deg, rgba(74, 0, 128, 0.5) 0%, rgba(0, 102, 170, 0.5) 100%);
                    border-color: #c9a227;
                    transform: scale(1.05);
                    box-shadow: 0 0 30px rgba(201, 162, 39, 0.4);
                }

                .hmm-footer-nebulizer-sub {
                    display: block;
                    font-family: 'Cormorant Garamond', Georgia, serif;
                    font-size: 0.85rem;
                    font-style: italic;
                    color: #a8d4f5;
                    margin-top: 0.3rem;
                    letter-spacing: 0;
                }

                @keyframes nebulaPulse {
                    0%, 100% { box-shadow: 0 0 10px rgba(201, 162, 39, 0.2); }
                    50% { box-shadow: 0 0 25px rgba(201, 162, 39, 0.4); }
                }

                @media (max-width: 900px) {
                    .hmm-footer-top {
                        grid-template-columns: 1fr;
                        text-align: center;
                        gap: 2rem;
                    }

                    .hmm-footer-brand {
                        text-align: center;
                    }

                    .hmm-footer-links {
                        flex-direction: column;
                        gap: 1.5rem;
                    }

                    .hmm-footer-principle {
                        align-items: center;
                    }

                    .hmm-footer-bottom {
                        flex-direction: column;
                        gap: 1rem;
                        text-align: center;
                    }
                }
            </style>

            <footer class="hmm-footer">
                <div class="hmm-footer-inner">
                    <div class="hmm-footer-top">
                        <div class="hmm-footer-brand">
                            <div class="hmm-footer-logo">HAVE MIND MEDIA</div>
                            <div class="hmm-footer-tagline">The Mind is in Your Mind</div>
                            <div class="hmm-footer-sig">◯∰⧬⫰∭⧖</div>
                            <a href="https://venmo.com/Jason-Rayvinski" target="_blank" class="hmm-footer-support">♡ Support Us</a>
                        </div>

                        <div class="hmm-footer-links">
                            <div class="hmm-footer-col">
                                <h4>Physics</h4>
                                <a href="${bp}physics/index.html">All Physics</a>
                                <a href="${bp}physics/true-meter_v1.0_01-10-2026.html">The True Meter</a>
                                <a href="${bp}physics/three-body-geometry.html">Three-Body Geometry</a>
                            </div>
                            <div class="hmm-footer-col">
                                <h4>Explore</h4>
                                <a href="${bp}weirdos/index.html">Weirdos</a>
                                <a href="${bp}ancient-mysteries/index.html">Ancient Mysteries</a>
                                <a href="${bp}tools/index.html">Interactive Tools</a>
                            </div>
                            <div class="hmm-footer-col">
                                <h4>Research</h4>
                                <a href="${bp}everything.html">All 169 Pages</a>
                                <a href="${bp}documents/index.html">White Papers</a>
                                <a href="${bp}biology/index.html">Biology</a>
                            </div>
                        </div>

                        <div class="hmm-footer-principle">
                            <div class="hmm-footer-equation">[1 = -1]</div>
                            <div class="hmm-footer-philosophy">We do not tell. We offer choice.</div>
                            <div class="hmm-footer-kappa">κ = 30</div>
                        </div>
                    </div>

                    <a href="${bp}nebulizer.html" class="hmm-footer-nebulizer">
                        How to even deal with all this? — CLICK HERE
                        <span class="hmm-footer-nebulizer-sub">THE NEBULIZER: Spin through 200+ pages</span>
                    </a>

                    <div class="hmm-footer-bottom">
                        <div class="hmm-footer-copy">
                            &copy; ${year} <a href="${bp}index.html">Have Mind Media</a>.
                            Where ancient wisdom meets quantum understanding.
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }
}

customElements.define('site-footer', SiteFooter);
