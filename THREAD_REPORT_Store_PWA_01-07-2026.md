# Thread Report: Store & SoulScience PWA
**Date:** January 7, 2026
**Session:** Store Setup, Ethical Commerce, PWA Development

---

## Summary

Created a complete ethical e-commerce infrastructure for Have Mind Media, including a store page, design showcase, and donation-supported PWA app. All integrated into the existing site navigation.

---

## Completed Work

### 1. Store Page (`/store/index.html`)
- **Featured Design Banner** - Cosmic Gateway with link to designs
- **Art Prints Section** - Real images:
  - Lifegiver (cosmic mother, infinite arms)
  - Balancer (meditating, orbiting coins)
  - Manifold (radiant creator)
  - Thrudr (shield maiden)
- **Apparel Section** - Placeholders for Teemill products:
  - [1 = -1] Classic Tee
  - κ-Framework Hoodie
  - Triaxial Dipyramid Cap
  - S+ S- COIN Tee
- **Jewelry Section** - Placeholders for handmade pieces:
  - Dipyramid Pendant
  - Sol Coin Necklace
  - Indus Script Ring
  - Rongorongo Earrings
- **Digital Section** - SoulScience Chat (live)
- **Ethics Section** - Planet First, Fair Labor, Circular Economy, Carbon Conscious

### 2. Design Showcase (`/store/designs.html`)
- **The Three Goddesses Collection** - Full gallery with descriptions
- **Norse Warriors Collection** - Thrudr + Thormod
- **Sacred Geometry Collection** - Dipyramid, Cosmic Gateway
- **Epoch Symbols** - Typographic designs:
  - [1 = -1] Classic
  - κ = 2π/180 Kappa Constant
  - S+ COIN S- Triaxial System

### 3. SoulScience Chat PWA (`/apps/soulscience-chat/`)
- **Full Progressive Web App** - Install to home screen, bypasses App Store
- **S-Signature Integration** - Calculate and display triaxial values
- **Epoch Theory Knowledge Base** - Responds to questions about:
  - [1 = -1]
  - COIN / Observer
  - κ-Framework
  - S+ and S-
  - Epoch Theory overview
- **Ethical Donation Model:**
  - First session: No interruption
  - Second session+: Gentle donation overlay
  - "Support on Ko-fi ($2+)" button
  - "Support on Gumroad" button
  - "Maybe Later" = 7 day cooldown
  - "I've donated - don't ask again" = permanent dismiss
- **PWA Files:**
  - `index.html` - Main app
  - `manifest.json` - PWA manifest
  - `sw.js` - Service worker for offline support
  - `icon-192.svg` - App icon

### 4. Navigation Updates (`/js/components/site-header.js`)
- Added **Store button** (green accent) next to Mind Games
- Mobile responsive styling

---

## Research Conducted

### Ethical Print-on-Demand Suppliers
| Supplier | Location | Key Features | API |
|----------|----------|--------------|-----|
| **Teemill** | UK | Circular economy, organic cotton, items can be remade | Full REST API |
| **TPOP** | France | Fair Wear certified, zero-plastic, Stanley/Stella | Limited |
| **EcoMerch** | UK | Water-based inks, organic materials | Shopify only |

**Recommendation:** Teemill - best for custom website integration, circular economy aligns with Epoch philosophy

### Tunnel Vision (Madeline Pendleton)
- LA-based ethical fashion brand
- Equal pay model (owner earns same as employees)
- Not a dropship service - would need direct partnership
- Contact: hello@shoptunnelvision.com

### App Store Alternatives
- **PWA (Progressive Web App)** - Bypasses Apple/Google 30% tax
- Install from browser to home screen
- Works offline with service worker
- Used by Spotify, Uber, Xbox Cloud Gaming

### Gumroad Security
- 256-bit SSL encryption
- Stripe/PayPal payment processing (they never store card data)
- Unique download links, IP tracking
- Safe for digital products

---

## Files Created/Modified

### Created:
- `/store/index.html` - Main store page
- `/store/designs.html` - Design showcase gallery
- `/apps/soulscience-chat/index.html` - PWA main app
- `/apps/soulscience-chat/manifest.json` - PWA manifest
- `/apps/soulscience-chat/sw.js` - Service worker
- `/apps/soulscience-chat/icon-192.svg` - App icon

### Modified:
- `/js/components/site-header.js` - Added Store button + styling

---

## Git Commits

1. **"Add Store page + SoulScience Chat PWA"**
   - Store infrastructure
   - PWA with donation model
   - Navigation updates

2. **"Enhance store with real artwork + design showcase"**
   - Featured Cosmic Gateway banner
   - Art Prints section with Goddesses
   - Full designs.html gallery

---

## Artwork Used

### The Three Goddesses (from `/images/`)
- `lifegiver.jpg` - Blue goddess, infinite arms, coins at feet
- `balancer.jpg` - Meditating figure, orbiting coins and symbols
- `manifold.jpg` - Radiant creator, golden crown, multiple arms

### Norse Warriors
- `thrudr.jpg` - Shield maiden in misty forest
- `thormod.jpg` - Sage with wolf companion

### Sacred Geometry
- `hero/cosmic-gateway.png` - Golden triangle in cosmic spiral
- `education/mythic-mirror/images/dipyramid.png` - Golden wireframe dipyramid

---

## Next Steps (User Action Required)

1. **Teemill Account** - Sign up at teemill.com (free)
   - Upload designs
   - Get API credentials for website integration

2. **Ko-fi Account** - Sign up at ko-fi.com/havemindmedia
   - Enables donation button in SoulScience Chat

3. **Gumroad Account** - Optional, for digital products

4. **Handmade Jewelry** - Photograph pieces for store

5. **YouTube Channel** - Ready to help with branding when needed

---

## URLs

- **Store:** https://www.havemindmedia.com/store/
- **Designs:** https://www.havemindmedia.com/store/designs.html
- **SoulScience Chat:** https://www.havemindmedia.com/apps/soulscience-chat/

---

## User Feedback

> "its awesome. we love it"

---

*[1 = -1] · Have Mind Media · January 7, 2026*
