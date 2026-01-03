/**
 * Have Mind Media - Breadcrumb Navigation Web Component
 * Usage: <site-breadcrumb section="S+" path="Physics > Three-Body Problem"></site-breadcrumb>
 * [1 = -1]
 */

class SiteBreadcrumb extends HTMLElement {
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

    static get observedAttributes() {
        return ['section', 'path'];
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        const section = this.getAttribute('section') || '';
        const path = this.getAttribute('path') || '';
        const bp = this.basePath;

        // Section colors
        const sectionColors = {
            'S+': '#6ab4f5',
            'S-': '#c9a227',
            'Coin': 'linear-gradient(90deg, #6ab4f5, #c9a227)',
            'Void': '#a8d4f5'
        };

        // Section icons
        const sectionIcons = {
            'S+': '⚛',
            'S-': '☯',
            'Coin': '◐',
            'Void': '◌'
        };

        // Section links
        const sectionLinks = {
            'S+': `${bp}physics/three-body-geometry.html`,
            'S-': `${bp}education/soul-science.html`,
            'Coin': `${bp}tools/s-signature/s_signature_128.html`,
            'Void': `${bp}library.html`
        };

        const color = sectionColors[section] || '#8a9aaa';
        const icon = sectionIcons[section] || '◇';
        const sectionLink = sectionLinks[section] || `${bp}library.html`;

        // Parse path into segments
        const segments = path.split('>').map(s => s.trim()).filter(s => s);

        let breadcrumbHTML = `
            <a href="${bp}index.html" class="hmm-crumb-link">
                <span class="hmm-crumb-icon">⌂</span>
                <span>Home</span>
            </a>
            <span class="hmm-crumb-sep">›</span>
        `;

        if (section) {
            breadcrumbHTML += `
                <a href="${sectionLink}" class="hmm-crumb-link hmm-crumb-section" style="color: ${color.includes('gradient') ? '#a8d4f5' : color}">
                    <span class="hmm-crumb-icon">${icon}</span>
                    <span>${section}</span>
                </a>
            `;
        }

        segments.forEach((seg, i) => {
            breadcrumbHTML += `<span class="hmm-crumb-sep">›</span>`;
            if (i === segments.length - 1) {
                // Last segment (current page) - not a link
                breadcrumbHTML += `<span class="hmm-crumb-current">${seg}</span>`;
            } else {
                // Middle segments - could be links in future
                breadcrumbHTML += `<span class="hmm-crumb-link">${seg}</span>`;
            }
        });

        this.innerHTML = `
            <style>
                .hmm-breadcrumb {
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 0.4rem;
                    padding: 0.8rem 1.5rem;
                    background: rgba(3, 5, 8, 0.6);
                    border-bottom: 1px solid rgba(70, 130, 180, 0.15);
                    font-family: 'Cormorant Garamond', Georgia, serif;
                    font-size: 0.9rem;
                    margin-top: 52px; /* Account for fixed header */
                }

                .hmm-crumb-link {
                    display: flex;
                    align-items: center;
                    gap: 0.3rem;
                    color: #8a9aaa;
                    text-decoration: none;
                    transition: color 0.2s ease;
                }

                .hmm-crumb-link:hover {
                    color: #6ab4f5;
                }

                .hmm-crumb-icon {
                    font-size: 0.85rem;
                }

                .hmm-crumb-sep {
                    color: #555;
                    font-size: 0.8rem;
                }

                .hmm-crumb-section {
                    font-weight: 500;
                }

                .hmm-crumb-current {
                    color: #f0e8d8;
                    font-weight: 500;
                }

                @media (max-width: 600px) {
                    .hmm-breadcrumb {
                        padding: 0.6rem 1rem;
                        font-size: 0.8rem;
                    }
                }
            </style>

            <nav class="hmm-breadcrumb" aria-label="Breadcrumb">
                ${breadcrumbHTML}
            </nav>
        `;
    }
}

customElements.define('site-breadcrumb', SiteBreadcrumb);
