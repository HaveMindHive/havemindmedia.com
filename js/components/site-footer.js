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
        const depth = (path.match(/\//g) || []).length - 1;
        if (depth <= 0 || path === '/' || path.endsWith('/index.html') && depth === 1) {
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
                        </div>

                        <div class="hmm-footer-links">
                            <div class="hmm-footer-col">
                                <h4>S+ Physics</h4>
                                <a href="${bp}cedga/index.html">CEDGA Framework</a>
                                <a href="${bp}physics/three-body-geometry.html">Three-Body Solution</a>
                                <a href="${bp}epoch-atomic/index.html">Atomic Model</a>
                            </div>
                            <div class="hmm-footer-col">
                                <h4>S- Soul Science</h4>
                                <a href="${bp}education/soul-science.html">Soul Science</a>
                                <a href="${bp}education/becoming-a-coin.html">Becoming a Coin</a>
                                <a href="${bp}ancient-mysteries/voynich/index.html">Ancient Mysteries</a>
                            </div>
                            <div class="hmm-footer-col">
                                <h4>Explore</h4>
                                <a href="${bp}library.html">Full Library</a>
                                <a href="${bp}tools/s-signature/s_signature_128.html">S-Signature</a>
                                <a href="${bp}documents/tribute/index.html">Tribute</a>
                            </div>
                        </div>

                        <div class="hmm-footer-principle">
                            <div class="hmm-footer-equation">[1 = -1]</div>
                            <div class="hmm-footer-kappa">κ = 2π/180</div>
                        </div>
                    </div>

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
