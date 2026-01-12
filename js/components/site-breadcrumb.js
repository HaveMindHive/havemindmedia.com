/**
 * Have Mind Media - Breadcrumb Navigation Web Component
 * Auto-detects category from URL, or use manual attributes
 * Usage: <site-breadcrumb></site-breadcrumb>
 * Or: <site-breadcrumb section="Physics" page="The True Meter"></site-breadcrumb>
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
        const dirPath = path.substring(0, path.lastIndexOf('/') + 1);
        const depth = (dirPath.match(/\//g) || []).length - 1;
        if (depth <= 0 || path === '/' || path === '/index.html') {
            return './';
        }
        return '../'.repeat(depth);
    }

    static get observedAttributes() {
        return ['section', 'page'];
    }

    attributeChangedCallback() {
        this.render();
    }

    detectCategory() {
        const path = window.location.pathname.toLowerCase();

        // Category detection from URL
        const categories = {
            'physics': { name: 'Physics', icon: '⚛', color: '#58a6ff', link: 'physics/index.html' },
            'weirdos': { name: 'Weirdos', icon: '🌟', color: '#f97316', link: 'weirdos/index.html' },
            'ancient-mysteries': { name: 'Ancient Mysteries', icon: '🏛', color: '#a855f7', link: 'ancient-mysteries/index.html' },
            'tools': { name: 'Tools', icon: '🔧', color: '#4ecdc4', link: 'tools/index.html' },
            'biology': { name: 'Biology', icon: '🧬', color: '#22c55e', link: 'biology/index.html' },
            'documents': { name: 'Documents', icon: '📄', color: '#eab308', link: 'documents/index.html' }
        };

        for (const [key, value] of Object.entries(categories)) {
            if (path.includes(`/${key}/`)) {
                return value;
            }
        }
        return null;
    }

    getPageTitle() {
        // Try to get from page title, removing site suffix
        const title = document.title;
        if (title) {
            // Remove common suffixes like "| Have Mind Media"
            return title.split('|')[0].trim();
        }
        return null;
    }

    render() {
        const bp = this.basePath;

        // Manual attributes override auto-detection
        const manualSection = this.getAttribute('section');
        const manualPage = this.getAttribute('page');

        // Auto-detect if not manually specified
        const detected = this.detectCategory();
        const pageTitle = manualPage || this.getPageTitle();

        // Build breadcrumb
        let breadcrumbHTML = `
            <a href="${bp}index.html" class="hmm-crumb-link">
                <span class="hmm-crumb-icon">⌂</span>
                <span>Home</span>
            </a>
        `;

        // Add "Everything" link as second level
        breadcrumbHTML += `
            <span class="hmm-crumb-sep">›</span>
            <a href="${bp}everything.html" class="hmm-crumb-link">
                <span>Explore</span>
            </a>
        `;

        // Add category if detected or manual
        if (manualSection) {
            breadcrumbHTML += `
                <span class="hmm-crumb-sep">›</span>
                <span class="hmm-crumb-link hmm-crumb-section">${manualSection}</span>
            `;
        } else if (detected) {
            breadcrumbHTML += `
                <span class="hmm-crumb-sep">›</span>
                <a href="${bp}${detected.link}" class="hmm-crumb-link hmm-crumb-section" style="color: ${detected.color}">
                    <span class="hmm-crumb-icon">${detected.icon}</span>
                    <span>${detected.name}</span>
                </a>
            `;
        }

        // Add current page
        if (pageTitle && pageTitle !== 'Have Mind Media') {
            breadcrumbHTML += `
                <span class="hmm-crumb-sep">›</span>
                <span class="hmm-crumb-current">${pageTitle}</span>
            `;
        }

        this.innerHTML = `
            <style>
                .hmm-breadcrumb {
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 0.4rem;
                    padding: 0.6rem 1.5rem;
                    background: rgba(3, 5, 8, 0.8);
                    border-bottom: 1px solid rgba(201, 162, 39, 0.15);
                    font-family: 'Raleway', -apple-system, sans-serif;
                    font-size: 0.8rem;
                    margin-top: 52px; /* Account for fixed header */
                }

                .hmm-crumb-link {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                    color: #8a9aaa;
                    text-decoration: none;
                    transition: color 0.2s ease;
                }

                .hmm-crumb-link:hover {
                    color: #c9a227;
                }

                .hmm-crumb-icon {
                    font-size: 0.85rem;
                }

                .hmm-crumb-sep {
                    color: #444;
                    font-size: 0.7rem;
                    margin: 0 0.1rem;
                }

                .hmm-crumb-section {
                    font-weight: 500;
                }

                .hmm-crumb-current {
                    color: #e0e0e0;
                    font-weight: 500;
                    max-width: 300px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                @media (max-width: 768px) {
                    .hmm-breadcrumb {
                        padding: 0.5rem 1rem;
                        font-size: 0.75rem;
                    }
                    .hmm-crumb-current {
                        max-width: 150px;
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
