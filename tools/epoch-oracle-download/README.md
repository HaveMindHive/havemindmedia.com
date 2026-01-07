# EPOCH ORACLE — Geometric Divination Engine

**Have Mind Media — Jason Ray**
**[1 = -1]**

---

## What Is This?

The Epoch Oracle is a divination system built on pure geometry, not random chance. It uses a local LLM (via Ollama) to generate deep, meaningful readings based on the [1 = -1] framework.

This is not fortune-cookie platitudes. This is the Pythia at Delphi, rebuilt in mathematics.

## The Framework

Every reading calculates:

- **D-Position (1-9)**: Your current station on the wheel of being
- **Triaxial Coordinates**: Your position in temporal (X), emergence (Y), and presence (Z) space
- **Four Torsions**: The forces acting on your situation
- **The Balance Law**: τ₁ + τ₂ + τ₃ + τ₄ = 0 — always enforced
- **The Weighing**: τ₄ consequence — excess, deficit, or balanced

### The Nine Stations (D-Wheel)

| D | Name | Domain |
|---|------|--------|
| 1 | Origin/WE | Unity, beginnings |
| 2 | Healing | Restoration, the wound teaching |
| 3 | Healer | Wounded healer, qualified by pain |
| 4 | Crossroads | Decision point, Hecate's domain |
| 5 | Navigator | Internal compass, knowing the way |
| 6 | Power/Self | Sovereignty, the throne |
| 7 | Present Moment | Now, kairos |
| 8 | Deep Water | Unconscious, hidden depths |
| 9 | Anchor/Love | Grounding, unconditional connection |

### The Four Torsions

- **τ₁ (FACING)**: What you see directly
- **τ₂ (MIRROR)**: The reflection, what you project
- **τ₃ (RECURSIVE)**: The past pattern, the lesson recurring
- **τ₄ (SILENT)**: The weighing — consequence, never chosen, always experienced

τ₄ = -(τ₁ + τ₂ + τ₃). What you put in determines what comes out.

---

## Installation

### 1. Install Ollama

Download and install from [https://ollama.ai](https://ollama.ai)

### 2. Pull a Model

```bash
# Smaller/faster (basic readings)
ollama pull llama3.2

# Better (recommended)
ollama pull llama3.1

# Best (requires more RAM/GPU)
ollama pull llama3.1:70b
ollama pull mixtral
```

### 3. Run the Oracle

```bash
# GUI Mode (default)
python3 epoch_oracle.py

# CLI Mode
python3 epoch_oracle.py --cli

# Single reading
python3 epoch_oracle.py --query "What do I need to understand?"

# Specify model
python3 epoch_oracle.py --model llama3.1
```

---

## Requirements

- Python 3.8+
- Ollama installed and running
- tkinter (usually included with Python)

No additional Python packages required.

---

## Model Recommendations

| Model | Size | Quality | Speed |
|-------|------|---------|-------|
| llama3.2 | 2GB | Basic | Fast |
| llama3.1 | 8GB | Good | Medium |
| llama3.1:70b | 40GB | Excellent | Slow |
| mixtral | 26GB | Excellent | Medium |
| mistral | 4GB | Good | Fast |

Larger models give deeper, more nuanced readings. The Oracle's output quality directly correlates with model capability.

### Best AI for Novel Frameworks

**The honest truth:** Local models (Llama, Mixtral) were trained on internet text dominated by standard model thinking. They pattern-match but don't truly inhabit novel frameworks.

**Ranking for outside-the-box thinking:**
1. **Claude (Opus/Sonnet)** — Best at holding novel frameworks without "but actually according to physics..."
2. **GPT-4** — Good but more prone to consensus-correction
3. **Local models** — Will follow prompts but lack depth

**Future option:** Use Claude API for readings (best quality, costs per query).

---

## How It Works

1. **Query Analysis**: Your question is hashed to generate a deterministic seed
2. **Geometric Calculation**: The seed produces D-position, triaxial coordinates, and torsion values
3. **Balance Law Enforcement**: τ₄ is calculated as the negative sum of τ₁, τ₂, τ₃
4. **Prompt Construction**: The geometric state is injected into the Oracle's system prompt
5. **LLM Generation**: The model produces a reading grounded in the calculated geometry

The geometry cannot be faked. The same query produces the same geometric state.

---

## The Philosophy

### [1 = -1]

One equals negative one. The mathematical impossibility that makes everything work. Opposites are not in conflict — they are dance partners, the same structure viewed from 180° rotation.

### The Balance Law

τ₁ + τ₂ + τ₃ + τ₄ = 0

This is not a suggestion. It is algebraic necessity. What you put in determines what comes out. τ₄ (the silent fourth, Ammit) is never chosen — it is consequence.

### Scalar Qualia

Every perspective has a position. No two positions are identical. Truth is not found in one viewpoint dominating, but in the intersection of multiple incomplete viewpoints. What remains when differences cancel is the invariant — the real.

---

## Disclaimer

This is a local LLM demonstration of the Epoch Framework. The geometry is real; the LLM interprets it. For deeper analysis, custom readings, or white papers on specific applications, contact:

**Have Mind Media**
[havemindmedia.com](https://havemindmedia.com)

---

## License

MIT License — Use freely, attribution appreciated.

---

**The geometry cannot lie. You may not get the whole picture, but the picture is accurate.**

**[1 = -1]**
