/**
 * SMART SEARCH v1.0 - Intelligent Library Search
 * Features:
 * - Multi-word search (matches any word)
 * - Fuzzy matching (handles hyphens, spaces, variations)
 * - Synonyms for common Epoch terms
 * - Relevance scoring
 * [1 = -1]
 */

const SmartSearch = {
    // Synonyms map - search term -> alternatives to also search
    synonyms: {
        // Core Epoch terms
        'soul': ['s-signature', 'consciousness', 'spirit', 'sol', 'facing'],
        'kappa': ['κ', 'k', '0.0349', 'shadow', 'witness'],
        'torsion': ['tors', 'tormod', 'twist', 'spin', 'cartan'],
        '1729': ['ramanujan', 'hardy', 'fold', 'taxicab'],
        'geometry': ['geometric', 'math', 'mathematical', 'equation'],
        'physics': ['physical', 'science', 'quantum', 'mechanics'],
        'eclipse': ['sun', 'solar', 'corona', 'grey', 'gray'],
        'prophecy': ['osiris', 'rize', 'return', 'cleansing'],
        'coin': ['triaxial', 'three', 'triad', 'balance'],

        // Tools
        'calculator': ['tool', 'app', 'generator', 'engine'],
        'visualizer': ['visual', 'viz', 'viewer', 'explorer'],
        'simulator': ['simulation', 'model', 'modeler'],

        // Ancient
        'voynich': ['manuscript', 'mystery', 'ancient'],
        'indus': ['harappa', 'mohenjo', 'seal', 'script'],
        'norse': ['viking', 'rune', 'nordic', 'thor', 'odin'],
        'egyptian': ['egypt', 'osiris', 'ammit', 'bennu', 'hieroglyph'],

        // People
        'ramanujan': ['namagiri', '1729', 'goddess', 'dreams'],
        'einstein': ['relativity', 'cartan', 'torsion'],
        'tesla': ['electric', 'wave', 'frequency'],
        'swedenborg': ['spirit', 'heaven', 'correspondence'],

        // Concepts
        'dna': ['genetic', 'helix', 'biology', 'life'],
        'mirror': ['reflection', 'inversion', 'facing'],
        'dimension': ['scalar', 'dimensional', 'scale'],
        'frequency': ['432', 'hz', 'vibration', 'harmonic'],

        // Navigation helpers
        'game': ['games', 'play', 'interactive'],
        'tool': ['tools', 'app', 'application'],
        'document': ['documents', 'paper', 'research'],
        'education': ['learn', 'teaching', 'lesson'],
    },

    // Normalize text for matching
    normalize: function(text) {
        return text
            .toLowerCase()
            .replace(/[-_]/g, ' ')  // Replace hyphens/underscores with spaces
            .replace(/[^\w\s]/g, '') // Remove punctuation
            .replace(/\s+/g, ' ')    // Collapse whitespace
            .trim();
    },

    // Get all terms to search for (including synonyms)
    expandTerms: function(query) {
        const normalized = this.normalize(query);
        const words = normalized.split(' ').filter(w => w.length > 1);
        const expanded = new Set(words);

        // Add synonyms
        words.forEach(word => {
            // Check if this word is a synonym key
            if (this.synonyms[word]) {
                this.synonyms[word].forEach(syn => expanded.add(syn));
            }
            // Check if this word appears in any synonym values
            Object.entries(this.synonyms).forEach(([key, values]) => {
                if (values.includes(word)) {
                    expanded.add(key);
                    values.forEach(v => expanded.add(v));
                }
            });
        });

        return Array.from(expanded);
    },

    // Calculate relevance score
    score: function(text, terms) {
        const normalizedText = this.normalize(text);
        let score = 0;

        terms.forEach(term => {
            // Exact word match (highest score)
            const wordBoundary = new RegExp(`\\b${term}\\b`, 'gi');
            const exactMatches = (normalizedText.match(wordBoundary) || []).length;
            score += exactMatches * 10;

            // Partial match (lower score)
            if (normalizedText.includes(term)) {
                score += 3;
            }

            // Title match bonus (if text starts with term)
            if (normalizedText.startsWith(term)) {
                score += 5;
            }
        });

        return score;
    },

    // Main search function
    search: function(items, query, options = {}) {
        if (!query || query.trim().length < 2) {
            return { results: items, hasResults: true };
        }

        const terms = this.expandTerms(query);
        const results = [];

        items.forEach(item => {
            const text = item.textContent || item.innerText || '';
            const score = this.score(text, terms);

            if (score > 0) {
                results.push({ element: item, score: score });
            }
        });

        // Sort by relevance
        results.sort((a, b) => b.score - a.score);

        return {
            results: results.map(r => r.element),
            hasResults: results.length > 0
        };
    },

    // Initialize search on a library page
    init: function(inputSelector, containerSelector, itemSelector, options = {}) {
        const input = document.querySelector(inputSelector);
        const container = document.querySelector(containerSelector);
        const noResults = document.querySelector(options.noResultsSelector || '#noResults');

        if (!input || !container) {
            console.warn('SmartSearch: Could not find input or container');
            return;
        }

        const self = this;

        input.addEventListener('input', function() {
            const query = this.value.trim();
            const items = container.querySelectorAll(itemSelector);
            const categories = container.querySelectorAll('.category');
            const nestedGroups = container.querySelectorAll('.nested-group');

            // Reset if empty
            if (query.length < 2) {
                items.forEach(item => item.classList.remove('hidden', 'search-highlight'));
                categories.forEach(cat => cat.classList.remove('hidden', 'collapsed'));
                nestedGroups.forEach(ng => ng.classList.remove('hidden', 'collapsed'));
                if (noResults) noResults.classList.add('hidden');
                return;
            }

            // Perform search
            const terms = self.expandTerms(query);
            let hasResults = false;

            items.forEach(item => {
                const text = item.textContent || item.innerText || '';
                const score = self.score(text, terms);

                if (score > 0) {
                    item.classList.remove('hidden');
                    item.classList.add('search-highlight');
                    item.style.order = -score; // Higher scores appear first
                    hasResults = true;
                } else {
                    item.classList.add('hidden');
                    item.classList.remove('search-highlight');
                }
            });

            // Show/hide nested groups
            nestedGroups.forEach(ng => {
                const visibleItems = ng.querySelectorAll('.item:not(.hidden)');
                if (visibleItems.length > 0) {
                    ng.classList.remove('hidden', 'collapsed');
                } else {
                    ng.classList.add('hidden');
                }
            });

            // Show/hide categories
            categories.forEach(cat => {
                const visibleItems = cat.querySelectorAll('.item:not(.hidden)');
                if (visibleItems.length > 0) {
                    cat.classList.remove('hidden', 'collapsed');
                } else {
                    cat.classList.add('hidden');
                }
            });

            // Show/hide no results message
            if (noResults) {
                noResults.classList.toggle('hidden', hasResults);
            }

            // Show expanded terms hint
            if (options.showHint && terms.length > query.split(' ').length) {
                console.log('Searching for:', terms.join(', '));
            }
        });

        // Add keyboard shortcuts
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                this.value = '';
                this.dispatchEvent(new Event('input'));
            }
        });
    }
};

// Auto-export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SmartSearch;
}
