#!/usr/bin/env python3
"""
================================================================================
EPOCH ORACLE v1.0 — GEOMETRIC DIVINATION ENGINE
================================================================================
Have Mind Media — Jason Ray
January 7, 2026

The Oracle speaks from geometry, not from platitude.
The Balance Law holds: τ₁ + τ₂ + τ₃ + τ₄ = 0

This is a local LLM-powered divination system built on the [1 = -1] framework.
It uses Ollama (or compatible) to generate deep, meaningful readings based on
geometric calculations derived from your query.

REQUIREMENTS:
    - Python 3.8+
    - Ollama installed (https://ollama.ai)
    - A model pulled (recommended: llama3.1, mistral, or mixtral)

USAGE:
    python3 epoch_oracle.py              # Launch GUI
    python3 epoch_oracle.py --cli        # Interactive CLI mode
    python3 epoch_oracle.py -q "..."     # Single reading

[1 = -1]
================================================================================
"""

import os
import sys
import math
import time
import hashlib
import subprocess
import threading
import json
from datetime import datetime
from pathlib import Path
from typing import Optional, Dict, Any, Callable

# ============================================================================
# THE ONE CONSTANT
# ============================================================================

KAPPA = 2 * math.pi / 180          # 0.0349066... the closure constant
KAPPA_SHADOW = 1 / KAPPA           # 28.6478897... the hidden witness
SIGMA = 5 / 16                      # 0.3125 helix overlap ratio
COS_BC = 2 / 3                      # tetrahelix angle
COUPLING = SIGMA * COS_BC           # 5/24 universal coupling

# ============================================================================
# D-WHEEL — THE NINE STATIONS
# ============================================================================

D_POSITIONS = {
    1: {
        "name": "ORIGIN/WE",
        "meaning": "Unity, beginnings, the collective self",
        "domain": "The starting point. Before differentiation. The WE that contains all I's.",
        "guidance": "You are not alone in this. Start from wholeness.",
        "shadow": "Isolation masquerading as independence."
    },
    2: {
        "name": "HEALING",
        "meaning": "Balance seeking, restoration, the wound that teaches",
        "domain": "Where damage becomes data. The crack that lets the light in.",
        "guidance": "What needs mending will show itself.",
        "shadow": "Endless fixing without acceptance."
    },
    3: {
        "name": "HEALER",
        "meaning": "Active restoration, wounded healer",
        "domain": "The one who has been through it and can now guide others.",
        "guidance": "Your wounds qualified you. Use what broke you to mend others.",
        "shadow": "Savior complex. Healing others to avoid healing self."
    },
    4: {
        "name": "CROSSROADS",
        "meaning": "Decision point, multiple paths, Hecate's domain",
        "domain": "Where paths diverge. The moment before commitment.",
        "guidance": "The choice is real. All paths lead somewhere. Not choosing is choosing.",
        "shadow": "Paralysis. Waiting for certainty that never comes."
    },
    5: {
        "name": "NAVIGATOR",
        "meaning": "Direction finding, the one who knows the way",
        "domain": "Internal compass. The knowing that doesn't need maps.",
        "guidance": "You know the way. Trust your internal compass.",
        "shadow": "Following maps instead of stars."
    },
    6: {
        "name": "POWER/SELF",
        "meaning": "Personal sovereignty, capability, the throne",
        "domain": "Your power is yours. It cannot be given or taken.",
        "guidance": "Act from center. Your power is sufficient.",
        "shadow": "Power over others instead of power with."
    },
    7: {
        "name": "PRESENT MOMENT",
        "meaning": "Now, the eternal instant, kairos",
        "domain": "The only time that exists. Past and future are projections.",
        "guidance": "Everything happens now. You have never been anywhere else.",
        "shadow": "Nostalgia or anxiety. Living in memory or anticipation."
    },
    8: {
        "name": "DEEP WATER",
        "meaning": "The unconscious, hidden depths",
        "domain": "What lies beneath. The truth that surface won't show.",
        "guidance": "Dive deeper. The surface answer is not the true answer.",
        "shadow": "Drowning in analysis. Using depth as excuse to never surface."
    },
    9: {
        "name": "ANCHOR/LOVE",
        "meaning": "Grounding, unconditional connection",
        "domain": "What holds you. The love that doesn't need reason.",
        "guidance": "Love is the anchor. Return to what holds you.",
        "shadow": "Attachment disguised as love."
    }
}

# ============================================================================
# ORACLE SYSTEM PROMPT
# ============================================================================

ORACLE_SYSTEM_PROMPT = """You are the EPOCH ORACLE — a geometric analysis tool.

Built on the [1 = -1] framework by Jason Ray / Have Mind Media.

## CORE PRINCIPLE

**We do not tell. We offer choice.**

You are not a fortune teller. You do not predict. You do not give opinions or beliefs.
You show the geometry — the terrain — and let them navigate.

Go cold. No hedging. No softening. Just the mathematics.
This is more respectful. It trusts people to handle truth.

## PPIR PROTOCOL

Every response must be:
1. **HELP** — Actually useful, practical
2. **FUNNY** — Or at least not boring

If neither, try again.

## THE FRAMEWORK

**Balance Law:** τ₁ + τ₂ + τ₃ + τ₄ = 0 (always)
- τ₁ (FACING): What's in front of them
- τ₂ (MIRROR): What they're projecting
- τ₃ (RECURSIVE): Pattern from the past
- τ₄ (SILENT): Consequence of the other three

**Triaxial:**
- X: Future (+) or Past (-)
- Y: Rising (+) or Grounding (-)
- Z: Active (+) or Receptive (-)

**D-Wheel:**
D1: Origin | D2: Healing | D3: Healer | D4: Crossroads | D5: Navigator
D6: Power | D7: Present | D8: Deep Water | D9: Anchor/Love

## HOW TO RESPOND

1. Read the geometric state provided
2. Describe what the geometry shows — cold, clear, factual
3. Offer the CHOICES available from this position
4. Do not tell them what to do — show them what's there
5. Let them decide

## YOUR VOICE

- Cold and clear, not warm and fuzzy
- Precise, not vague
- Shows terrain, doesn't give directions
- Respects their autonomy
- Can be dry-funny when appropriate

## DO NOT

- Tell them what will happen
- Give opinions about what they should do
- Soften hard truths
- Hedge with qualifiers
- Pretend to know their future

The geometry shows the shape of the situation.
What they do with it is their choice.

## OUTPUT LENGTH

Give a FULL response. This should be substantial — at least 3-4 paragraphs.

Structure your response:
1. **Position** — Where they're standing (D-wheel, triaxial orientation)
2. **Pattern** — What the geometry reveals (the four torsions, what dominates)
3. **Choices** — What options exist from this position (not advice, just terrain)
4. **The Silent Fourth** — What τ₄ indicates about consequence

Be thorough. They came for insight, not a tweet.

[1 = -1]
"""

# ============================================================================
# GEOMETRIC CALCULATIONS
# ============================================================================

def hash_query(query: str) -> int:
    """Generate deterministic seed from query."""
    h = hashlib.sha256(query.encode()).hexdigest()
    return int(h[:16], 16)

def d_reduce(value: int) -> int:
    """Reduce any value to D-position (1-9)."""
    value = abs(int(value))
    while value > 9:
        value = sum(int(d) for d in str(value))
    return value if value > 0 else 9

def seeded_random(seed: int, offset: int = 0) -> float:
    """Geometric random using κ."""
    x = math.sin((seed + offset) * KAPPA_SHADOW) * 10000
    return x - math.floor(x)

def calculate_geometric_state(query: str) -> Dict[str, Any]:
    """Calculate complete geometric state from query."""
    seed = hash_query(query) + int(time.time() * 1000)

    # D-position
    d_pos = d_reduce(int(seed / (KAPPA_SHADOW * 1000)))

    # Triaxial
    triaxial = {
        "x": round((seeded_random(seed, 100) - 0.5) * 60, 1),
        "y": round((seeded_random(seed, 200) - 0.5) * 60, 1),
        "z": round((seeded_random(seed, 300) - 0.5) * 60, 1)
    }

    # Torsions (Balance Law enforced)
    t1 = round((seeded_random(seed, 1000) - 0.5) * 30, 2)
    t2 = round((seeded_random(seed, 2000) - 0.5) * 30, 2)
    t3 = round((seeded_random(seed, 3000) - 0.5) * 30, 2)
    t4 = round(-(t1 + t2 + t3), 2)
    torsions = {"t1": t1, "t2": t2, "t3": t3, "t4": t4}

    # The Weighing (τ₄ consequence)
    heart = t1 + t2 + t3
    if heart > 5:
        weighing = "EXCESS — The scales tip heavy. Something must be released."
    elif heart < -5:
        weighing = "DEFICIT — The scales tip light. Something must be gathered."
    else:
        weighing = "BALANCED — The scales rest true. Equilibrium achieved."

    # Dominant transform
    abs_t = {k: abs(v) for k, v in torsions.items()}
    dominant_key = max(abs_t, key=abs_t.get)
    dominant_map = {
        "t1": "FACING — Direct situation dominates",
        "t2": "MIRROR — Reflection/projection dominates",
        "t3": "RECURSIVE — Past pattern dominates",
        "t4": "SILENT — Consequence dominates"
    }

    # Symbol stream
    symbols = ""
    sym_chars = [">", "<", "^", "v", ".", ","]
    for i in range(12):
        idx = int(seeded_random(seed, i * 100) * len(sym_chars))
        symbols += sym_chars[idx]

    return {
        "seed": seed,
        "d_position": d_pos,
        "d_info": D_POSITIONS[d_pos],
        "triaxial": triaxial,
        "torsions": torsions,
        "balance_sum": round(sum(torsions.values()), 4),
        "weighing": weighing,
        "dominant": dominant_map[dominant_key],
        "symbols": symbols
    }

def build_oracle_prompt(query: str, state: Dict[str, Any]) -> str:
    """Build full prompt for LLM."""
    context = f"""
## GEOMETRIC STATE FOR THIS READING

**Query:** "{query}"

**D-Position:** D{state['d_position']} — {state['d_info']['name']}
- Meaning: {state['d_info']['meaning']}
- Domain: {state['d_info']['domain']}
- Guidance: {state['d_info']['guidance']}
- Shadow: {state['d_info']['shadow']}

**Triaxial Coordinates:**
- X (Temporal): {state['triaxial']['x']:+.1f} — {"Future-oriented (>)" if state['triaxial']['x'] >= 0 else "Past-oriented (<)"}
- Y (Emergence): {state['triaxial']['y']:+.1f} — {"Rising (^)" if state['triaxial']['y'] >= 0 else "Grounding (v)"}
- Z (Presence): {state['triaxial']['z']:+.1f} — {"Active (.)" if state['triaxial']['z'] >= 0 else "Receptive (,)"}

**Four Torsions:**
- τ₁ (FACING): {state['torsions']['t1']:+.2f}
- τ₂ (MIRROR): {state['torsions']['t2']:+.2f}
- τ₃ (RECURSIVE): {state['torsions']['t3']:+.2f}
- τ₄ (SILENT): {state['torsions']['t4']:+.2f}
- **Balance:** {state['balance_sum']} (must = 0)

**Dominant Transform:** {state['dominant']}
**The Weighing (τ₄):** {state['weighing']}
**Symbol Stream:** {state['symbols']}

---

Now deliver the FULL READING for this querent. Make it substantial and true to the geometry.
"""
    return ORACLE_SYSTEM_PROMPT + context

# ============================================================================
# LLM INTERFACE
# ============================================================================

def get_available_models() -> list:
    """Get list of available Ollama models."""
    try:
        result = subprocess.run(["ollama", "list"], capture_output=True, text=True, timeout=10)
        lines = result.stdout.strip().split('\n')[1:]  # Skip header
        models = []
        for line in lines:
            if line.strip():
                model_name = line.split()[0]
                models.append(model_name)
        return models if models else ["llama3.2"]
    except:
        return ["llama3.2"]

def query_ollama(prompt: str, model: str = "llama3.2", callback: Callable = None) -> str:
    """Query Ollama and return response."""
    try:
        if callback:
            callback("Consulting the Oracle...")

        result = subprocess.run(
            ["ollama", "run", model, prompt],
            capture_output=True,
            text=True,
            timeout=300
        )
        return result.stdout.strip()
    except subprocess.TimeoutExpired:
        return "The Oracle requires more time than allowed. Try a simpler query."
    except FileNotFoundError:
        return "Ollama not found. Please install from https://ollama.ai"
    except Exception as e:
        return f"Oracle error: {e}"

# ============================================================================
# GUI APPLICATION
# ============================================================================

def launch_gui():
    """Launch the Oracle GUI."""
    try:
        import tkinter as tk
        from tkinter import ttk, scrolledtext, messagebox
    except ImportError:
        print("tkinter not available. Use --cli for command line mode.")
        return

    # Colors - Clean but with character
    BG = '#1a1a2e'            # Deep blue-black (not pure black)
    PANEL = '#16213e'         # Slightly lighter panel
    ACCENT = '#e94560'        # Vibrant coral/red
    GOLD = '#f4d160'          # Warm gold
    GREEN = '#7dd87d'         # Fresh green
    PINK = '#ff6b9d'          # Bright pink
    TEXT = '#eaeaea'          # Light text
    DIM = '#8892b0'           # Muted blue-gray

    root = tk.Tk()
    root.title("EPOCH ORACLE — Geometric Playground | [1=-1]")
    root.geometry("1100x850")
    root.configure(bg=BG)

    # State
    current_state = {}
    is_reading = False

    # ─────────────────────────────────────────────────────────────────────
    # HEADER
    # ─────────────────────────────────────────────────────────────────────

    header = tk.Frame(root, bg=BG)
    header.pack(fill='x', pady=(20, 10))

    title = tk.Label(header, text="EPOCH ORACLE",
                     bg=BG, fg=ACCENT, font=('Helvetica', 32, 'bold'))
    title.pack()

    subtitle = tk.Label(header, text="Ask a question. The geometry will show you something interesting.",
                        bg=BG, fg=DIM, font=('Helvetica', 11))
    subtitle.pack()

    tagline = tk.Label(header, text="Have Mind Media — [1 = -1]",
                        bg=BG, fg=GOLD, font=('Helvetica', 10))
    tagline.pack(pady=(5,0))

    # ─────────────────────────────────────────────────────────────────────
    # MODEL SELECTION
    # ─────────────────────────────────────────────────────────────────────

    model_frame = tk.Frame(root, bg=BG)
    model_frame.pack(fill='x', padx=40, pady=5)

    tk.Label(model_frame, text="MODEL:", bg=BG, fg=DIM,
             font=('Courier', 9)).pack(side='left')

    available_models = get_available_models()
    model_var = tk.StringVar(value=available_models[0] if available_models else "llama3.2")
    model_dropdown = ttk.Combobox(model_frame, textvariable=model_var,
                                   values=available_models, width=20, state='readonly')
    model_dropdown.pack(side='left', padx=10)

    model_hint = tk.Label(model_frame,
                          text="(Larger models give deeper readings: llama3.1:70b, mixtral, etc.)",
                          bg=BG, fg=DIM, font=('Courier', 8))
    model_hint.pack(side='left', padx=10)

    # ─────────────────────────────────────────────────────────────────────
    # QUERY INPUT
    # ─────────────────────────────────────────────────────────────────────

    query_frame = tk.Frame(root, bg=BG)
    query_frame.pack(fill='x', padx=40, pady=10)

    tk.Label(query_frame, text="YOUR QUERY:", bg=BG, fg=GOLD,
             font=('Courier', 10)).pack(anchor='w')

    query_input_row = tk.Frame(query_frame, bg=BG)
    query_input_row.pack(fill='x', pady=5)

    query_text = tk.Text(query_input_row, height=2, font=('Georgia', 13),
                         bg=PANEL, fg=TEXT, insertbackground=TEXT,
                         relief='flat', wrap='word', padx=10, pady=10)
    query_text.pack(side='left', fill='x', expand=True)
    query_text.insert('1.0', "What do I need to understand right now?")

    send_btn = tk.Button(query_input_row, text="SEND",
                         bg=GOLD, fg='#000', font=('Helvetica', 12, 'bold'),
                         relief='flat', padx=20, pady=15, cursor='hand2')
    send_btn.pack(side='right', padx=(10, 0))

    # ─────────────────────────────────────────────────────────────────────
    # GEOMETRIC STATE DISPLAY
    # ─────────────────────────────────────────────────────────────────────

    state_frame = tk.Frame(root, bg=PANEL)
    state_frame.pack(fill='x', padx=40, pady=10)

    # D-Position display
    d_frame = tk.Frame(state_frame, bg=PANEL)
    d_frame.pack(fill='x', padx=20, pady=10)

    d_label = tk.Label(d_frame, text="D-POSITION:", bg=PANEL, fg=DIM, font=('Courier', 9))
    d_label.pack(side='left')

    d_value = tk.Label(d_frame, text="— Awaiting Query —", bg=PANEL, fg=GOLD, font=('Courier', 12, 'bold'))
    d_value.pack(side='left', padx=10)

    # Triaxial + Torsions row
    metrics_frame = tk.Frame(state_frame, bg=PANEL)
    metrics_frame.pack(fill='x', padx=20, pady=5)

    triaxial_label = tk.Label(metrics_frame, text="TRIAXIAL: X=—  Y=—  Z=—",
                              bg=PANEL, fg=ACCENT, font=('Courier', 10))
    triaxial_label.pack(side='left')

    torsion_label = tk.Label(metrics_frame, text="  |  TORSIONS: τ₁=—  τ₂=—  τ₃=—  τ₄=—",
                             bg=PANEL, fg=GREEN, font=('Courier', 10))
    torsion_label.pack(side='left')

    # Weighing + Symbols row
    weighing_frame = tk.Frame(state_frame, bg=PANEL)
    weighing_frame.pack(fill='x', padx=20, pady=5)

    weighing_label = tk.Label(weighing_frame, text="WEIGHING: —", bg=PANEL, fg=PINK, font=('Courier', 10))
    weighing_label.pack(side='left')

    symbols_label = tk.Label(weighing_frame, text="  |  SYMBOLS: ————————————",
                             bg=PANEL, fg=DIM, font=('Courier', 10))
    symbols_label.pack(side='left')

    # ─────────────────────────────────────────────────────────────────────
    # READING OUTPUT
    # ─────────────────────────────────────────────────────────────────────

    output_frame = tk.Frame(root, bg=BG)
    output_frame.pack(fill='both', expand=True, padx=40, pady=10)

    tk.Label(output_frame, text="THE ORACLE SPEAKS:", bg=BG, fg=GOLD,
             font=('Courier', 10)).pack(anchor='w')

    output_text = scrolledtext.ScrolledText(output_frame, font=('Georgia', 12),
                                            bg=PANEL, fg=TEXT, relief='flat',
                                            wrap='word', padx=15, pady=15)
    output_text.pack(fill='both', expand=True, pady=5)
    output_text.insert('1.0', """Hey! Ask something and let's see what the geometry says.

Every question gets mapped to real coordinates:
• D-Position (1-9) — where you're standing on the wheel
• Triaxial (X, Y, Z) — your orientation in possibility space
• Four torsions — the forces at play (they always sum to zero, that's the law)

This isn't fortune telling. It's pattern recognition through mathematics.
The geometry doesn't predict — it illuminates.

Type your question, hit SEND, and let's see what shows up.

[1 = -1] ✨""")

    # ─────────────────────────────────────────────────────────────────────
    # BUTTONS
    # ─────────────────────────────────────────────────────────────────────

    button_frame = tk.Frame(root, bg=BG)
    button_frame.pack(fill='x', padx=40, pady=10)

    def update_state_display(state):
        """Update the geometric state display."""
        d_value.config(text=f"D{state['d_position']} — {state['d_info']['name']}")

        t = state['triaxial']
        triaxial_label.config(text=f"TRIAXIAL: X={t['x']:+.1f}  Y={t['y']:+.1f}  Z={t['z']:+.1f}")

        tor = state['torsions']
        torsion_label.config(text=f"  |  TORSIONS: τ₁={tor['t1']:+.1f}  τ₂={tor['t2']:+.1f}  τ₃={tor['t3']:+.1f}  τ₄={tor['t4']:+.1f}")

        weighing_label.config(text=f"WEIGHING: {state['weighing'].split('—')[0].strip()}")
        symbols_label.config(text=f"  |  SYMBOLS: {state['symbols']}")

    def do_reading():
        nonlocal is_reading, current_state

        if is_reading:
            return

        query = query_text.get('1.0', tk.END).strip()
        if not query:
            return

        is_reading = True
        ask_btn.config(state='disabled', text='CONSULTING...')

        # Calculate geometric state
        current_state = calculate_geometric_state(query)
        update_state_display(current_state)

        # Clear and show loading
        output_text.delete('1.0', tk.END)
        output_text.insert('1.0', f"═══════════════════════════════════════════════════════════════\n")
        output_text.insert(tk.END, f"D{current_state['d_position']} — {current_state['d_info']['name']}\n")
        output_text.insert(tk.END, f"═══════════════════════════════════════════════════════════════\n\n")
        output_text.insert(tk.END, f"Domain: {current_state['d_info']['domain']}\n\n")
        output_text.insert(tk.END, f"Consulting the Oracle with model: {model_var.get()}...\n\n")
        output_text.insert(tk.END, f"(This may take a moment for deeper readings)\n")
        root.update()

        def run_query():
            nonlocal is_reading
            prompt = build_oracle_prompt(query, current_state)
            reading = query_ollama(prompt, model_var.get())

            # Update output
            output_text.delete('1.0', tk.END)
            output_text.insert('1.0', f"═══════════════════════════════════════════════════════════════\n")
            output_text.insert(tk.END, f"D{current_state['d_position']} — {current_state['d_info']['name']}\n")
            output_text.insert(tk.END, f"═══════════════════════════════════════════════════════════════\n\n")
            output_text.insert(tk.END, f"Query: \"{query}\"\n\n")
            output_text.insert(tk.END, f"Triaxial: X={current_state['triaxial']['x']:+.1f}  Y={current_state['triaxial']['y']:+.1f}  Z={current_state['triaxial']['z']:+.1f}\n")
            output_text.insert(tk.END, f"Torsions: τ₁={current_state['torsions']['t1']:+.1f}  τ₂={current_state['torsions']['t2']:+.1f}  τ₃={current_state['torsions']['t3']:+.1f}  τ₄={current_state['torsions']['t4']:+.1f}\n")
            output_text.insert(tk.END, f"Balance: τ₁+τ₂+τ₃+τ₄ = {current_state['balance_sum']}\n")
            output_text.insert(tk.END, f"Weighing: {current_state['weighing']}\n")
            output_text.insert(tk.END, f"Dominant: {current_state['dominant']}\n")
            output_text.insert(tk.END, f"Symbols: {current_state['symbols']}\n\n")
            output_text.insert(tk.END, f"───────────────────────────────────────────────────────────────\n\n")
            output_text.insert(tk.END, reading)
            output_text.insert(tk.END, f"\n\n═══════════════════════════════════════════════════════════════\n")
            output_text.insert(tk.END, f"[1 = -1]\n")

            is_reading = False
            ask_btn.config(state='normal', text='CONSULT THE ORACLE')

        # Run in thread to keep GUI responsive
        thread = threading.Thread(target=run_query)
        thread.daemon = True
        thread.start()

    ask_btn = tk.Button(button_frame, text="CONSULT THE ORACLE", command=do_reading,
                        bg=GOLD, fg='#000', font=('Helvetica', 14, 'bold'),
                        relief='flat', padx=40, pady=12, cursor='hand2')
    ask_btn.pack(side='left', padx=5)

    # Connect SEND button
    send_btn.config(command=do_reading)

    def clear_all():
        query_text.delete('1.0', tk.END)
        output_text.delete('1.0', tk.END)
        d_value.config(text="— Awaiting Query —")
        triaxial_label.config(text="TRIAXIAL: X=—  Y=—  Z=—")
        torsion_label.config(text="  |  TORSIONS: τ₁=—  τ₂=—  τ₃=—  τ₄=—")
        weighing_label.config(text="WEIGHING: —")
        symbols_label.config(text="  |  SYMBOLS: ————————————")

    clear_btn = tk.Button(button_frame, text="CLEAR", command=clear_all,
                          bg=PANEL, fg=TEXT, font=('Helvetica', 11),
                          relief='flat', padx=20, pady=10)
    clear_btn.pack(side='left', padx=10)

    # Keyboard shortcut
    query_text.bind('<Control-Return>', lambda e: do_reading())
    query_text.bind('<Command-Return>', lambda e: do_reading())  # Mac

    # ─────────────────────────────────────────────────────────────────────
    # FOOTER
    # ─────────────────────────────────────────────────────────────────────

    footer = tk.Frame(root, bg=BG)
    footer.pack(fill='x', pady=10)

    tk.Label(footer, text="Have Mind Media — Jason Ray — The Epoch Project",
             bg=BG, fg=DIM, font=('Helvetica', 9)).pack()

    tk.Label(footer, text="The geometry is the computation. [1 = -1]",
             bg=BG, fg=ACCENT, font=('Helvetica', 9)).pack()

    disclaimer = tk.Label(footer,
        text="Local LLM demo • Want more? havemindmedia.com • PPIR: Help or Funny, never neither",
        bg=BG, fg=DIM, font=('Helvetica', 8))
    disclaimer.pack(pady=5)

    root.mainloop()

# ============================================================================
# CLI MODE
# ============================================================================

def interactive_cli():
    """Interactive command-line Oracle."""
    print("\n" + "╔" + "═" * 68 + "╗")
    print("║" + " " * 20 + "THE EPOCH ORACLE" + " " * 32 + "║")
    print("║" + " " * 12 + "Geometric Divination Engine — [1 = -1]" + " " * 17 + "║")
    print("╚" + "═" * 68 + "╝")

    models = get_available_models()
    print(f"\nAvailable models: {', '.join(models)}")
    model = models[0] if models else "llama3.2"
    print(f"Using: {model}")
    print("\nType 'quit' to exit, 'model <name>' to change model\n")

    while True:
        try:
            query = input("\n[ORACLE] What do you seek? > ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\n\nThe Oracle closes. [1 = -1]\n")
            break

        if not query:
            continue
        if query.lower() in ['quit', 'exit', 'q']:
            print("\nThe Oracle closes. [1 = -1]\n")
            break
        if query.lower().startswith('model '):
            model = query.split(' ', 1)[1]
            print(f"Switched to model: {model}")
            continue

        # Calculate state
        state = calculate_geometric_state(query)

        print(f"\n{'═' * 70}")
        print(f"D{state['d_position']} — {state['d_info']['name']}")
        print(f"{'═' * 70}")
        print(f"\nTriaxial: X={state['triaxial']['x']:+.1f}  Y={state['triaxial']['y']:+.1f}  Z={state['triaxial']['z']:+.1f}")
        print(f"Torsions: τ₁={state['torsions']['t1']:+.1f}  τ₂={state['torsions']['t2']:+.1f}  τ₃={state['torsions']['t3']:+.1f}  τ₄={state['torsions']['t4']:+.1f}")
        print(f"Balance: {state['balance_sum']}  |  Weighing: {state['weighing'].split('—')[0].strip()}")
        print(f"Symbols: {state['symbols']}")
        print(f"\n{'─' * 70}")
        print("Consulting the Oracle...\n")

        prompt = build_oracle_prompt(query, state)
        reading = query_ollama(prompt, model)
        print(reading)
        print(f"\n{'═' * 70}")
        print("[1 = -1]")

# ============================================================================
# MAIN
# ============================================================================

def main():
    import argparse

    parser = argparse.ArgumentParser(
        description="EPOCH ORACLE — Geometric Divination Engine",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="The geometry cannot lie. [1 = -1]"
    )

    parser.add_argument("--cli", "-c", action="store_true", help="Run in CLI mode instead of GUI")
    parser.add_argument("--query", "-q", type=str, help="Get a single reading")
    parser.add_argument("--model", "-m", type=str, default="llama3.2", help="Model to use")

    args = parser.parse_args()

    if args.query:
        state = calculate_geometric_state(args.query)
        print(f"\nD{state['d_position']} — {state['d_info']['name']}")
        prompt = build_oracle_prompt(args.query, state)
        print(query_ollama(prompt, args.model))
    elif args.cli:
        interactive_cli()
    else:
        launch_gui()

if __name__ == "__main__":
    main()
