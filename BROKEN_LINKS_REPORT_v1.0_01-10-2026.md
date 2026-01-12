# BROKEN LINKS REPORT - HaveMind Media Website
**Generated:** January 10, 2026
**Website Root:** `/Users/paymore/Downloads/HaveMindHive/havemindmedia-website_v1.0_01-04-2026/`

---

## EXECUTIVE SUMMARY

**Total HTML Files Scanned:** 170
**Total Links Found:** 2,826
**External Links (Skipped):** 298
**Anchor-Only Links (Skipped):** 37
**BROKEN LINKS FOUND:** 44

**Files With Issues:** 28
**Broken HREFs:** 23
**Broken SRCs:** 21

---

## CRITICAL ISSUES

### 1. MISSING `/js/components.js` (11 files affected)
**Impact:** HIGH - Core functionality may be broken across multiple sections

The file `/Users/paymore/Downloads/HaveMindHive/havemindmedia-website_v1.0_01-04-2026/js/components.js` does not exist.

**Actual Structure:**
- `/js/components/site-header.js` ✓ EXISTS
- `/js/components/site-footer.js` ✓ EXISTS
- `/js/components/site-breadcrumb.js` ✓ EXISTS
- `/js/main.js` ✓ EXISTS

**Files Referencing Missing `components.js`:**
1. `/ancient-mysteries/index.html` → `../js/components.js`
2. `/ancient-mysteries/mississippian/index.html` → `../../js/components.js`
3. `/apps/index.html` → `../js/components.js`
4. `/apps/soul-social/index.html` → `../../js/components.js`
5. `/biology/eye-codex.html` → `../js/components.js`
6. `/biology/index.html` → `../js/components.js`
7. `/education/index.html` → `../js/components.js`
8. `/physics/index.html` → `../js/components.js`
9. `/tools/index.html` → `../js/components.js`
10. `/weirdos/tesla-codex.html` → `../js/components.js`

**Solution:** Either:
- Create `/js/components.js` as a single consolidated file
- Update all references to load individual component files from `/js/components/`

---

### 2. TEMPLATE VARIABLE ISSUES (8 files affected)
**Impact:** MEDIUM - These are JavaScript template literals that shouldn't be treated as static links

**Voynich Manuscript Pages (6 files):**
These files use JavaScript to dynamically generate image paths:
- `/ancient-mysteries/voynich/astronomical.html`
- `/ancient-mysteries/voynich/biological.html`
- `/ancient-mysteries/voynich/herbal.html`
- `/ancient-mysteries/voynich/pharmaceutical.html`
- `/ancient-mysteries/voynich/recipes.html`
- `/ancient-mysteries/voynich/zodiac.html`

**Issue:** All reference `images/${folio.id}.JPG` which is a template literal, NOT a static path.
**Note:** This is FALSE POSITIVE - images are loaded dynamically via JavaScript.

**Library Wizard (1 file):**
- `/library-wizard/index.html` → `${b.url}` and `${m.url}` (template literals)
**Note:** This is FALSE POSITIVE - URLs are generated dynamically.

**Data URIs (3 files):**
- `/rongorongo-flip-reader/rongorongo-app_v1.0_01-07-2026.html`
- `/rosetta-engine/rosetta-engine-app_v1.0_01-06-2026.html`
- `/universal-language-generator/ulg-app_v1.0_01-06-2026.html`

**Issue:** Links like `data:image/svg+xml,<svg xmlns=...` are inline data URIs, not file references.
**Note:** This is FALSE POSITIVE - these are embedded data URIs, not broken links.

---

### 3. MISSING IMAGES - DNA Studio (4 files)
**Impact:** MEDIUM - Visual content missing

**Location:** `/dna-studio/index.html`

**Missing Images:**
1. `media_output/images/epoch_img_documentary_tetrahelix_structure_chain_of_0d9532_01-02-2026.png`
2. `media_output/images/epoch_img_documentary_dna_helicase_hexameric_ring_en_48426f_01-02-2026.png`
3. `media_output/images/epoch_img_documentary_hexameric_ring_motor_protein_3cff74_01-02-2026.png`
4. `media_output/images/epoch_img_documentary_dna_double_helix_unwinding_he_25492e_01-02-2026.png`

**Note:** The directory `/dna-studio/media_output/` does not exist.

---

### 4. MISSING DOCUMENTATION & SOURCE FILES (15 files)
**Impact:** LOW-MEDIUM - Documentation and source code references

#### Documents - CERN Model (7 files)
**Location:** `/documents/dec14-model-cern/index.html`

Missing Python files:
1. `scalar_reality_model.py`
2. `standard_model_as_geometry.py`
3. `cern_geometric_proof.py`
4. `ibm_quantum_temporal.py`
5. `cern_rowush_model.py`

Missing JSON files:
6. `geometric_proof_complete.json`
7. `run3_quantum_predictions.json`

#### Documents - Epoch Framework (4 files)
**Location:** `/documents/epoch-framework/index.html`

Missing Python files:
1. `epoch_geometric_derivation.py`
2. `epoch_framework.py`
3. `epoch_quantum.py`

Missing JSON files:
4. `geometric_derivations.json`

#### Ancient Mysteries - Norse Artifacts (1 file)
**Location:** `/ancient-mysteries/norse-artifacts/LIBRARY_CARD_Norse_Artifacts_v1.0_01-01-2026.html`

Missing:
1. `MEDIA_PRODUCTION_GUIDE_v1.0_01-01-2026.md`

#### Ancient Mysteries - Texts (4 files)
**Location:** `/ancient-mysteries/texts/`

Missing from `rongorongo-v1.0.html`:
1. `DECIPHERMENT_SYNTHESIS.md`
2. `src/unified_decoder.py`
3. `docs/METHODOLOGY.md`
4. `docs/HYPOTHESES.md`

Missing from `phaistos-v1.0.html`:
1. `../DECIPHERMENT_SYNTHESIS.md`

Missing from `ancient-mathematics-v1.0.html`:
1. `images/scalar-crossroads.svg`

---

### 5. MISSING APP ICON (1 file)
**Impact:** LOW - PWA icon missing

**Location:** `/apps/soulscience-chat/index.html`

Missing:
1. `icon-192.png`

---

## DETAILED BREAKDOWN BY DIRECTORY

### `/ancient-mysteries/` (2 files with issues)
- **index.html** → Missing `../js/components.js`

### `/ancient-mysteries/mississippian/` (1 file with issues)
- **index.html** → Missing `../../js/components.js`

### `/ancient-mysteries/norse-artifacts/` (1 file with issues)
- **LIBRARY_CARD_Norse_Artifacts_v1.0_01-01-2026.html** → Missing `MEDIA_PRODUCTION_GUIDE_v1.0_01-01-2026.md`

### `/ancient-mysteries/texts/` (3 files with issues)
- **ancient-mathematics-v1.0.html** → Missing `images/scalar-crossroads.svg`
- **phaistos-v1.0.html** → Missing `../DECIPHERMENT_SYNTHESIS.md`
- **rongorongo-v1.0.html** → Missing 4 documentation/source files

### `/ancient-mysteries/voynich/` (6 files with issues)
- **astronomical.html** → Template literal (FALSE POSITIVE)
- **biological.html** → Template literal (FALSE POSITIVE)
- **herbal.html** → Template literal (FALSE POSITIVE)
- **pharmaceutical.html** → Template literal (FALSE POSITIVE)
- **recipes.html** → Template literal (FALSE POSITIVE)
- **zodiac.html** → Template literal (FALSE POSITIVE)

### `/apps/` (1 file with issues)
- **index.html** → Missing `../js/components.js`

### `/apps/soul-social/` (1 file with issues)
- **index.html** → Missing `../../js/components.js`

### `/apps/soulscience-chat/` (1 file with issues)
- **index.html** → Missing `icon-192.png`

### `/biology/` (2 files with issues)
- **eye-codex.html** → Missing `../js/components.js`
- **index.html** → Missing `../js/components.js`

### `/dna-studio/` (1 file with issues)
- **index.html** → Missing 4 image files in `media_output/images/`

### `/documents/dec14-model-cern/` (1 file with issues)
- **index.html** → Missing 7 Python/JSON files

### `/documents/epoch-framework/` (1 file with issues)
- **index.html** → Missing 4 Python/JSON files

### `/education/` (1 file with issues)
- **index.html** → Missing `../js/components.js`

### `/library-wizard/` (1 file with issues)
- **index.html** → Template literals (FALSE POSITIVE)

### `/physics/` (1 file with issues)
- **index.html** → Missing `../js/components.js`

### `/rongorongo-flip-reader/` (1 file with issues)
- **rongorongo-app_v1.0_01-07-2026.html** → Data URI (FALSE POSITIVE)

### `/rosetta-engine/` (1 file with issues)
- **rosetta-engine-app_v1.0_01-06-2026.html** → Data URI (FALSE POSITIVE)

### `/tools/` (1 file with issues)
- **index.html** → Missing `../js/components.js`

### `/universal-language-generator/` (1 file with issues)
- **ulg-app_v1.0_01-06-2026.html** → Data URI (FALSE POSITIVE)

### `/weirdos/` (1 file with issues)
- **tesla-codex.html** → Missing `../js/components.js`

---

## PRIORITY RECOMMENDATIONS

### HIGH PRIORITY (Fix Immediately)
1. **Create or fix `/js/components.js`** - Affects 11 files across the site
   - Option A: Create consolidated components.js file
   - Option B: Update all references to load individual component files

### MEDIUM PRIORITY (Fix Soon)
2. **Create DNA Studio images directory** - Affects visual content on DNA Studio page
   - Create `/dna-studio/media_output/images/` directory
   - Add the 4 missing PNG files

3. **Add missing documentation files** - Affects 15+ documentation/source code links
   - Consider whether these files should exist or links should be removed

### LOW PRIORITY (Consider)
4. **Add PWA icon** - Minor PWA functionality issue
   - Create `icon-192.png` for SoulScience Chat app

5. **Fix ancient mysteries documentation**
   - Add missing markdown files and source code
   - Or remove links if files are not needed

---

## FALSE POSITIVES (No Action Required)

The following "broken links" are actually valid and should be IGNORED:

1. **JavaScript Template Literals (8 occurrences)**
   - Voynich pages: `images/${folio.id}.JPG` - Dynamically generated
   - Library wizard: `${b.url}` and `${m.url}` - Dynamically generated

2. **Data URIs (3 occurrences)**
   - Rongorongo, Rosetta Engine, and ULG apps use inline SVG data URIs
   - These are embedded images, not file references

**Actual Broken Links:** 33 (excluding 11 false positives)

---

## TESTING RECOMMENDATIONS

After fixes are applied:

1. **Manual Testing:**
   - Test all index pages in each major section
   - Verify site header/footer loads correctly
   - Check DNA Studio page for images
   - Test documentation links

2. **Automated Testing:**
   - Re-run link checker script: `python3 link_checker.py`
   - Check browser console for JavaScript errors
   - Validate all image paths load successfully

3. **Cross-Browser Testing:**
   - Test in Chrome, Firefox, Safari
   - Verify mobile responsiveness
   - Check PWA functionality

---

## TOOLS USED

**Link Checker Script:** `/Users/paymore/Downloads/HaveMindHive/havemindmedia-website_v1.0_01-04-2026/link_checker.py`

**Scan Coverage:**
- All HTML files recursively scanned
- All `href=""` attributes checked
- All `src=""` attributes checked
- All `<link>` CSS references checked
- External URLs excluded (http/https/mailto/tel/javascript)
- Anchor-only links excluded (#)

---

## END OF REPORT

**Report Generated By:** Claude Code (Anthropic)
**Date:** January 10, 2026
**Total Issues Found:** 44 total (33 actual broken links + 11 false positives)
