# HMH Website Unifier Checklist v1.1
## Have Mind Media Website Compliance Standards

**Last Updated**: January 7, 2026

---

## 7-Point Page Compliance Check

Every HTML page on havemindmedia.com MUST meet ALL of these requirements:

### 1. Home Navigation Link
- [ ] Page has a visible link back to homepage (`/` or `https://havemindmedia.com`)
- [ ] Navigation is accessible (top of page, fixed position, or clear placement)
- [ ] Uses `home-nav`, `site-header`, `nav-brand`, `home-link`, or `back-link` class

### 2. Consistent Styling
- [ ] Uses site color variables (--gold, --bg-deep, --text, etc.)
- [ ] Fonts: Cinzel for headings, Cormorant Garamond for body
- [ ] Dark theme background (#030508 to #0a0d12 range)

### 3. Responsive Design
- [ ] Works on mobile devices (viewport meta tag)
- [ ] No horizontal scrolling on mobile
- [ ] Touch-friendly navigation

### 4. Epoch Branding
- [ ] Consistent with Epoch Theory aesthetic
- [ ] Uses gold (#c9a227) accent color appropriately
- [ ] Professional presentation

### 5. Working Links
- [ ] All internal links resolve correctly
- [ ] No broken anchor links
- [ ] External links open appropriately

### 6. Accessible Structure
- [ ] Proper HTML5 semantic elements
- [ ] Logical heading hierarchy (h1 → h2 → h3)
- [ ] Alt text on images where applicable

### 7. **NAVIGATION LISTING** (NEW - v1.1)
- [ ] Page is listed in site-header.js navigation menu
- [ ] Page appears in appropriate section (S+, S-, COIN, Explore)
- [ ] Sub-pages have parent dropdown entries
- [ ] New pages added to "Latest Content" section on homepage

---

## Navigation Placement Guide

### S+ (Sol Plus) - Physics & Science
- Frameworks (CEDGA, κ-Framework)
- Standard Model Failures
- Atomic Derivations
- Element derivations
- Mathematical constants

### S- (Sol Minus) - Soul & Consciousness
- Ancient Knowledge (Rosetta Engine, ULG, Rongorongo)
- Scripts & Languages (Indus, Voynich, Linear A)
- Philosophy papers
- Consciousness studies

### COIN - Tools & Applications
- Interactive tools (ULG App, ULG Transmitter Game)
- Calculators
- Games
- Epoch Oracle

### Explore
- Ancient Mysteries
- Indus Script collection
- Research archives

---

## Compliance Verification Commands

Run these to check for missing navigation:

```bash
# Find HTML files without home navigation
find . -name "*.html" -exec sh -c \
  'grep -q "home-nav\|site-header\|home-link" "$1" || echo "NO NAV: $1"' _ {} \;

# Count total HTML pages
find . -name "*.html" | wc -l

# List new pages not in git history (need navigation check)
git diff --name-only HEAD~10 | grep ".html"
```

---

## Version History

- **v1.0** (Jan 6, 2026): Initial 7-point checklist
- **v1.1** (Jan 7, 2026): Added Navigation Listing requirement (#7)
  - Pages must be listed in site-header.js
  - New "Latest Content" section on homepage
  - Sub-pages require dropdown entries

---

*[1 = -1] · Have Mind Media*
