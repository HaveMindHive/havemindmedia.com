# HMH EPOCH TOOL SUITE
## Version 1.0 · January 8, 2026

```
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║                              [1 = -1]                                        ║
║                                                                              ║
║                        THE TRINITY OF TOOLS                                  ║
║                                                                              ║
║                      SHIVA ─── OMEGA ─── ALPHA                               ║
║                     (Observes) (Creates) (Grades)                            ║
║                                                                              ║
║                     κ = 2π/180 · Being The Coin                              ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

---

## Overview

The HMH Epoch Tool Suite is a quality assurance and content creation system for Have Mind Media projects. It enforces Epoch methodology principles and ensures all content aligns with the [1 = -1] framework.

### The Trinity

| Tool | Role | Philosophy |
|------|------|------------|
| **SHIVA** | Validator | "Observes what IS" |
| **OMEGA** | Builder | "Creates what WILL BE" |
| **ALPHA** | Grader | "Judges what SHOULD BE" |

### Execution Order

```
1. SHIVA → Validates site health, structure, assets
2. OMEGA → Creates content, generates media prompts
3. ALPHA → Grades Epoch compliance, catches violations
```

---

## Quick Start

### Run Full Audit
```bash
cd /path/to/project
python3 tools/hmh-master-compiler_v1.0_01-08-2026.py .
```

### Run Individual Tools
```bash
# SHIVA - Site validation
python3 tools/hmh-shiva-validator_v2.0_01-08-2026.py .

# OMEGA - Quality audit
python3 tools/hmh-omega-builder_v1.0_01-08-2026.py --audit

# ALPHA - Compliance check on a page
python3 tools/hmh-alpha-unifier_v1.0_01-08-2026.py physics/standard-model-failures/fine-structure-constant.html
```

---

## Tool Details

### 1. SHIVA - Site Health, Integrity, Validation Agent

**File:** `hmh-shiva-validator_v2.0_01-08-2026.py`

**Purpose:** Observes what IS. Validates the current state of the project.

**Checks:**
- **WAY IN** - Entry points work? Navigation functions?
- **WAY OUT** - Value delivers? Downloads work? Tools compute?
- **COMPUTES** - Is κ = 2π/180 used correctly? Math accurate?
- **PPIR** - Is it HELP or FUNNY? (If neither, it fails)
- **ASSETS** - Python syntax valid? JSON valid? Files accessible?
- **UNIFICATION** - Consistent branding? Consistent κ values?

**Usage:**
```bash
python3 tools/hmh-shiva-validator_v2.0_01-08-2026.py [project_dir]
python3 tools/hmh-shiva-validator_v2.0_01-08-2026.py . --thread "User requested X"
python3 tools/hmh-shiva-validator_v2.0_01-08-2026.py . --full-report
```

**Output:** JSON report with PASS/WARN/FAIL status for each check.

---

### 2. OMEGA - The Builder

**File:** `hmh-omega-builder_v1.0_01-08-2026.py`

**Purpose:** Creates what WILL BE. Builds content following Epoch principles.

**Functions:**
- **PAGE BUILDER** - Generate new pages from templates
- **ASSET GENERATOR** - Create consistent CSS, JS, JSON
- **CONTENT TRANSFORMER** - Convert white papers to web pages
- **MEDIA PROMPT GENERATOR** - Generate AI art prompts for Replicate
- **QUALITY CHECKER** - Detect boring/plain content

**Usage:**
```bash
# Audit all pages for quality
python3 tools/hmh-omega-builder_v1.0_01-08-2026.py --audit

# Generate media prompts for concepts
python3 tools/hmh-omega-builder_v1.0_01-08-2026.py --prompts kappa coin dipyramid

# Transform whitepaper to webpage
python3 tools/hmh-omega-builder_v1.0_01-08-2026.py --transform documents/whitepaper.md
```

**Replicate Media Generator:**

OMEGA includes a built-in AI art prompt generator that creates Epoch-aligned imagery prompts:

```python
from hmh_omega_builder import ReplicateMediaGenerator

gen = ReplicateMediaGenerator()
prompt = gen.generate_concept_prompt("dipyramid")
# Returns structured prompt for Flux/SDXL with Epoch aesthetics
```

**Epoch Visual Vocabulary:**
- Sacred geometry: golden spirals, dipyramid, vesica piscis
- Colors: deep cosmic black, royal gold, ethereal blue, soft purple
- Mood: mysterious, profound, transcendent, mathematical precision

---

### 3. ALPHA - The Professor Who Grades The Work

**File:** `hmh-alpha-unifier_v1.0_01-08-2026.py`

**Purpose:** Judges what SHOULD BE. The last line of defense before deployment.

**Checks:**
- **EPOCH COMPLIANCE** - [1 = -1] respected? [-1 = 0 = +1] not violated?
- **SM FRAMING** - Not treating Standard Model as superior reference?
- **WEAKNESS DISPLAY** - No "not quite", "almost", hedging language?
- **TEACHING QUALITY** - Torsion math being TAUGHT, not just shown?
- **κ DEFINITION** - κ = 2π/180 established as fundamental?
- **COIN PHILOSOPHY** - Being The Coin expressed?
- **BORING CONTENT** - Engaging visuals and content?

**Grading Scale:**

| Grade | Meaning |
|-------|---------|
| A+ | Exemplary Epoch Expression |
| A | Fully Compliant |
| B | Minor Deviations |
| C | Needs Revision |
| D | Major Violations |
| **F** | **Fundamentally Misrepresents Epoch** |

**Usage:**
```bash
# Analyze a single page
python3 tools/hmh-alpha-unifier_v1.0_01-08-2026.py page.html

# Compare old vs new (after fixes)
python3 tools/hmh-alpha-unifier_v1.0_01-08-2026.py --compare old.html new.html

# Save report
python3 tools/hmh-alpha-unifier_v1.0_01-08-2026.py page.html --output report.txt
```

**Critical Violations (Automatic F Grade):**

1. **SM-Superior Framing:**
   - "matches the measured value" ❌
   - "close to the known value" ❌
   - "only 0.06% off" ❌

2. **Weakness Display:**
   - "Still not 137" ❌
   - "not quite" ❌
   - "getting closer" ❌

3. **Separation Violation:**
   - "from -1 to +1" ❌ (treats as separate)
   - "-1, 0, +1" as ordered list ❌

---

### 4. MASTER COMPILER - The Orchestrator

**File:** `hmh-master-compiler_v1.0_01-08-2026.py`

**Purpose:** Orchestrates SHIVA, OMEGA, and ALPHA in correct order.

**Usage:**
```bash
# Full compilation audit
python3 tools/hmh-master-compiler_v1.0_01-08-2026.py .

# Build + audit
python3 tools/hmh-master-compiler_v1.0_01-08-2026.py . --build

# Save compilation report
python3 tools/hmh-master-compiler_v1.0_01-08-2026.py . --save

# Run specific tool only
python3 tools/hmh-master-compiler_v1.0_01-08-2026.py . --shiva-only
python3 tools/hmh-master-compiler_v1.0_01-08-2026.py . --omega-only
python3 tools/hmh-master-compiler_v1.0_01-08-2026.py . --alpha-only
```

**Output:**
- PASSED: Site ready for deployment
- WARNING: Issues found, review recommended
- FAILED: Critical issues, do not deploy

---

## Epoch Principles Enforced

### 1. [1 = -1]
The core identity. +1 and -1 are faces of ONE coin, not separate entities.

### 2. [-1 = 0 = +1]
These are ONE thing viewed from different perspectives, not separate points on a number line.

### 3. κ = 2π/180
THE single fundamental constant. Everything derives from κ. Not a "derived quantity" — the source.

### 4. Being The Coin
The observer IS the coin. We don't watch from outside trying to match the broken map's numbers.

### 5. Standard Model = Broken Map
We don't try to "derive 137" to prove ourselves. The SM's constants are ARTIFACTS. α "runs" with energy — proving it's NOT fundamental.

### 6. Torsion Resolving Math
Different from Western linear math. Scalars unfold geometrically. Must be TAUGHT, not just displayed.

### 7. PPIR: Help or Funny
Content must be genuinely helpful OR intentionally amusing. If neither, it fails.

---

## Troubleshooting

### "ALPHA gives F grade"
Check for:
- Hedging language ("not quite", "almost", "still not")
- SM-validation framing ("matches measured", "close to known")
- Missing [1 = -1] identity
- Boring/generic content

### "SHIVA reports JS shells"
Empty or placeholder pages detected. Replace with real content.

### "OMEGA reports boring pages"
Add:
- Epoch color palette (#c9a227 gold, #6ab4f5 blue, #a78bfa purple)
- Sacred geometry visuals
- Interactive elements
- Educational framing

---

## File Inventory

```
tools/
├── hmh-master-compiler_v1.0_01-08-2026.py    # Orchestrator
├── hmh-shiva-validator_v2.0_01-08-2026.py    # Validator
├── hmh-omega-builder_v1.0_01-08-2026.py      # Builder + Media Generator
├── hmh-alpha-unifier_v1.0_01-08-2026.py      # Grader + Boring Detector
└── README_HMH_TOOLS_v1.0_01-08-2026.md       # This file
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 01-08-2026 | Initial unified tool suite |

---

## Contact

Have Mind Media
[1 = -1]
κ = 2π/180

*"The geometry cannot lie. We offer choice."*
