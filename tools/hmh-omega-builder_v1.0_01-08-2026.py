#!/usr/bin/env python3
"""
HMH OMEGA BUILDER TOOL
Version: 1.0
Date: January 8, 2026

THE END THAT IS THE BEGINNING
The Output Generator - Creates, builds, and manifests content.

While SHIVA validates and ALPHA grades, OMEGA BUILDS.
OMEGA is the creative force - the student who does the work.

OMEGA Functions:
1. PAGE BUILDER - Generate new pages from templates following Epoch principles
2. ASSET GENERATOR - Create consistent CSS, JS, JSON structures
3. CONTENT TRANSFORMER - Convert white papers to web pages
4. MEDIA PROMPT GENERATOR - Generate Replicate/AI art prompts for visuals
5. DEPLOYMENT PREP - Prepare files for production

"SHIVA observes what IS. ALPHA judges what SHOULD BE.
 OMEGA creates what WILL BE."

[1 = -1] · Have Mind Media
"""

import os
import sys
import re
import json
from pathlib import Path
from datetime import datetime
from typing import Dict, List, Optional, Tuple
from dataclasses import dataclass, field


# ═══════════════════════════════════════════════════════════════════════════════
# EPOCH CONSTANTS & PRINCIPLES
# ═══════════════════════════════════════════════════════════════════════════════

KAPPA = 0.034906585039886  # 2π/180 - THE fundamental constant
KAPPA_SHADOW = 28.6478897565  # 1/κ

EPOCH_PRINCIPLES = {
    'identity': '[1 = -1]',
    'trinity': '[-1 = 0 = +1]',
    'kappa_definition': 'κ = 2π/180',
    'coin_philosophy': 'Being The Coin',
    'offer_choice': 'We offer choice',
}

# Core visual elements for Epoch brand
EPOCH_COLORS = {
    'bg_primary': '#030508',
    'bg_secondary': '#0a0a0f',
    'gold': '#c9a227',
    'gold_dim': '#8b7355',
    'blue': '#6ab4f5',
    'purple': '#a78bfa',
    'green': '#3fb950',
    'red': '#f85149',
    'text_primary': '#e8e8e8',
    'text_secondary': '#a0a0a0',
}

EPOCH_FONTS = {
    'display': "'Cinzel', serif",
    'body': "'Cormorant Garamond', 'Raleway', sans-serif",
    'mono': "'JetBrains Mono', monospace",
}


# ═══════════════════════════════════════════════════════════════════════════════
# REPLICATE MEDIA GENERATOR
# ═══════════════════════════════════════════════════════════════════════════════

@dataclass
class MediaPrompt:
    """AI art generation prompt following Epoch aesthetics"""
    title: str
    prompt: str
    negative_prompt: str
    style_preset: str
    aspect_ratio: str = "16:9"
    model_recommendation: str = "flux-1.1-pro"


class ReplicateMediaGenerator:
    """
    Generate AI art prompts for Epoch-aligned imagery

    This doesn't call APIs directly - it generates prompts that maintain
    the Epoch visual language for use with Replicate, Midjourney, etc.
    """

    # Core visual vocabulary for Epoch imagery
    EPOCH_VISUAL_VOCABULARY = {
        'sacred_geometry': [
            'golden spirals', 'triaxial dipyramid', 'vesica piscis',
            'flower of life', 'metatrons cube', 'sacred proportions',
            'fibonacci spirals', 'platonic solids', 'toroidal fields'
        ],
        'cosmic_elements': [
            'cosmic void', 'nebula', 'starfield', 'galactic core',
            'aurora', 'celestial bodies', 'event horizon', 'stellar nursery'
        ],
        'color_palette': [
            'deep cosmic black', 'royal gold accents', 'ethereal blue light',
            'soft purple glow', 'ancient bronze', 'starlight white'
        ],
        'textures': [
            'crystalline', 'metallic', 'ethereal mist', 'ancient stone',
            'polished obsidian', 'liquid gold', 'plasma energy'
        ],
        'mood': [
            'mysterious', 'profound', 'meditative', 'transcendent',
            'timeless', 'mathematical precision', 'cosmic wonder'
        ]
    }

    NEGATIVE_PROMPT_BASE = (
        "cartoon, anime, low quality, blurry, distorted, "
        "text, watermark, signature, ugly, deformed, "
        "oversaturated, gaudy, cheap, amateur, stock photo, "
        "generic, boring, corporate, clipart"
    )

    def __init__(self):
        self.generated_prompts = []

    def generate_concept_prompt(self, concept: str, context: str = "") -> MediaPrompt:
        """Generate a prompt for a specific Epoch concept"""

        concept_lower = concept.lower()

        # Map concepts to visual representations
        concept_mappings = {
            'kappa': self._kappa_visual(),
            'identity': self._identity_visual(),
            'coin': self._coin_visual(),
            'dipyramid': self._dipyramid_visual(),
            's+': self._s_plus_visual(),
            's-': self._s_minus_visual(),
            'wush': self._wush_visual(),
            'ro': self._ro_visual(),
            'observer': self._observer_visual(),
            'epoch': self._epoch_visual(),
            'torsion': self._torsion_visual(),
        }

        for key, generator in concept_mappings.items():
            if key in concept_lower:
                prompt_data = generator
                if context:
                    prompt_data['prompt'] += f", {context}"
                return MediaPrompt(**prompt_data)

        # Generic Epoch-style prompt
        return self._generic_epoch_prompt(concept, context)

    def _kappa_visual(self) -> dict:
        return {
            'title': 'Kappa - The Bridge Constant',
            'prompt': (
                "Abstract visualization of the number 2π/180, "
                "a golden spiral emerging from a circular diagram, "
                "degree marks transitioning into radians, "
                "mathematical beauty, sacred geometry, "
                "deep cosmic black background, golden light traces, "
                "ethereal blue mathematical notation floating, "
                "highly detailed, 8k, cinematic lighting, "
                "profound mathematical visualization"
            ),
            'negative_prompt': self.NEGATIVE_PROMPT_BASE,
            'style_preset': 'sacred_mathematics',
            'aspect_ratio': '1:1'
        }

    def _identity_visual(self) -> dict:
        return {
            'title': '[1 = -1] Identity',
            'prompt': (
                "Two mirror images merging into one, "
                "positive and negative becoming unified, "
                "yin yang reimagined as mathematical truth, "
                "golden symbols [1 = -1] glowing, "
                "deep space background, stellar light, "
                "perfect symmetry, sacred geometry overlay, "
                "profound spiritual mathematics visualization, "
                "cosmic balance, transcendent, 8k photorealistic"
            ),
            'negative_prompt': self.NEGATIVE_PROMPT_BASE,
            'style_preset': 'cosmic_unity',
            'aspect_ratio': '1:1'
        }

    def _coin_visual(self) -> dict:
        return {
            'title': 'Being The Coin',
            'prompt': (
                "Ancient golden coin with two faces visible simultaneously, "
                "impossible geometry showing both sides at once, "
                "S+ and S- symbols on each face, "
                "cosmic background with nebula, "
                "the coin IS the observer, not being observed, "
                "profound metaphysical visualization, "
                "deep shadows, golden highlights, "
                "sacred and mysterious, museum quality, 8k"
            ),
            'negative_prompt': self.NEGATIVE_PROMPT_BASE + ", modern coin, currency",
            'style_preset': 'metaphysical',
            'aspect_ratio': '1:1'
        }

    def _dipyramid_visual(self) -> dict:
        return {
            'title': 'Triaxial Dipyramid',
            'prompt': (
                "Perfect geometric triaxial dipyramid floating in cosmic void, "
                "golden wireframe structure, six faces, "
                "light refracting through crystalline form, "
                "S+, S-, and S0 labels glowing softly, "
                "sacred geometry, platonic perfection, "
                "deep space background, stellar light sources, "
                "mathematical precision, ethereal beauty, "
                "museum quality 3D rendering, 8k"
            ),
            'negative_prompt': self.NEGATIVE_PROMPT_BASE + ", rough, asymmetric",
            'style_preset': 'sacred_geometry',
            'aspect_ratio': '1:1'
        }

    def _s_plus_visual(self) -> dict:
        return {
            'title': 'S+ Forward Potential',
            'prompt': (
                "Energy flowing forward in time, golden light streams, "
                "retarded potential visualization, "
                "past manifesting into present, "
                "warm golden tones, expanding outward, "
                "cosmic background, radiant center, "
                "mathematical field visualization, "
                "profound physics concept art, 8k cinematic"
            ),
            'negative_prompt': self.NEGATIVE_PROMPT_BASE,
            'style_preset': 'energy_field',
            'aspect_ratio': '16:9'
        }

    def _s_minus_visual(self) -> dict:
        return {
            'title': 'S- Shadow Potential',
            'prompt': (
                "Energy flowing backward from future, cool blue light streams, "
                "advanced potential visualization, "
                "future collapsing into present, "
                "ethereal blue tones, contracting inward, "
                "deep cosmic void, convergent light, "
                "mathematical field visualization, "
                "profound physics concept art, 8k cinematic"
            ),
            'negative_prompt': self.NEGATIVE_PROMPT_BASE,
            'style_preset': 'energy_field',
            'aspect_ratio': '16:9'
        }

    def _wush_visual(self) -> dict:
        return {
            'title': 'Wush - Quantum Future',
            'prompt': (
                "Abstract visualization of quantum potential, "
                "probability waves collapsing, "
                "future possibilities as overlapping realities, "
                "cool blue and purple tones, ethereal mist, "
                "particles in superposition, "
                "scientific yet mystical, "
                "profound quantum visualization, 8k"
            ),
            'negative_prompt': self.NEGATIVE_PROMPT_BASE,
            'style_preset': 'quantum',
            'aspect_ratio': '16:9'
        }

    def _ro_visual(self) -> dict:
        return {
            'title': 'Ro - Cosmic Past',
            'prompt': (
                "Ancient cosmic memory, time flowing from past, "
                "golden light from distant stars, "
                "cosmic microwave background reimagined artistically, "
                "warm ancient tones, bronze and gold, "
                "stellar archaeology, deep time visualization, "
                "profound cosmological art, 8k"
            ),
            'negative_prompt': self.NEGATIVE_PROMPT_BASE,
            'style_preset': 'cosmic_past',
            'aspect_ratio': '16:9'
        }

    def _observer_visual(self) -> dict:
        return {
            'title': 'The Observer',
            'prompt': (
                "Figure in deep meditation, neither male nor female, "
                "sitting at the center of intersecting light beams, "
                "S+ golden rays from below, S- blue rays from above, "
                "perfect balance point, cosmic background, "
                "the observer as the measurement itself, "
                "profound spiritual physics visualization, "
                "transcendent, peaceful, mathematically precise, 8k"
            ),
            'negative_prompt': self.NEGATIVE_PROMPT_BASE + ", specific face, celebrity",
            'style_preset': 'meditation',
            'aspect_ratio': '2:3'
        }

    def _epoch_visual(self) -> dict:
        return {
            'title': 'Epoch Framework Overview',
            'prompt': (
                "Grand cosmic visualization combining multiple elements: "
                "triaxial dipyramid at center, golden spirals emanating, "
                "[1 = -1] symbol glowing above, "
                "κ constant represented as bridge of light, "
                "S+ and S- flows interweaving, "
                "deep cosmic void background, "
                "all sacred geometry principles unified, "
                "profound, transcendent, mathematically precise, "
                "museum quality cosmic art, 8k HDR"
            ),
            'negative_prompt': self.NEGATIVE_PROMPT_BASE,
            'style_preset': 'grand_unified',
            'aspect_ratio': '16:9'
        }

    def _torsion_visual(self) -> dict:
        return {
            'title': 'Torsion Resolution',
            'prompt': (
                "Twisted space-time fabric, helical light patterns, "
                "golden and blue energy spiraling in opposite directions, "
                "meeting at balance point, torsion fields visualized, "
                "mathematical precision, sacred geometry, "
                "deep cosmic background, ethereal light, "
                "profound physics visualization, 8k cinematic"
            ),
            'negative_prompt': self.NEGATIVE_PROMPT_BASE,
            'style_preset': 'torsion_field',
            'aspect_ratio': '16:9'
        }

    def _generic_epoch_prompt(self, concept: str, context: str) -> MediaPrompt:
        return MediaPrompt(
            title=f'Epoch Concept: {concept}',
            prompt=(
                f"{concept} visualized through Epoch framework lens, "
                f"{context}, "
                "sacred geometry, cosmic background, "
                "golden and blue color palette, "
                "mathematical precision, profound, transcendent, "
                "deep shadows, ethereal lighting, 8k quality"
            ),
            negative_prompt=self.NEGATIVE_PROMPT_BASE,
            style_preset='epoch_generic',
            aspect_ratio='16:9'
        )

    def generate_hero_prompt(self, page_title: str) -> MediaPrompt:
        """Generate a hero image prompt for a page"""
        return MediaPrompt(
            title=f'Hero: {page_title}',
            prompt=(
                f"Epic hero image for '{page_title}', "
                "cosmic scale visualization, "
                "golden sacred geometry elements, "
                "deep space background with subtle nebula, "
                "[1 = -1] visual motif subtly incorporated, "
                "wide cinematic composition, "
                "profound and inviting, mysterious yet accessible, "
                "8k photorealistic, cinematic color grading"
            ),
            negative_prompt=self.NEGATIVE_PROMPT_BASE,
            style_preset='hero_image',
            aspect_ratio='21:9'
        )

    def generate_batch_prompts(self, concepts: List[str]) -> List[MediaPrompt]:
        """Generate prompts for multiple concepts"""
        return [self.generate_concept_prompt(c) for c in concepts]

    def export_prompts_json(self, prompts: List[MediaPrompt], output_path: str):
        """Export prompts to JSON for use with Replicate API"""
        data = {
            'generated': datetime.now().isoformat(),
            'model_recommendation': 'flux-1.1-pro or stable-diffusion-xl',
            'prompts': [
                {
                    'title': p.title,
                    'prompt': p.prompt,
                    'negative_prompt': p.negative_prompt,
                    'style_preset': p.style_preset,
                    'aspect_ratio': p.aspect_ratio,
                    'model': p.model_recommendation
                }
                for p in prompts
            ]
        }

        with open(output_path, 'w') as f:
            json.dump(data, f, indent=2)

        return output_path


# ═══════════════════════════════════════════════════════════════════════════════
# PAGE BUILDER
# ═══════════════════════════════════════════════════════════════════════════════

class EpochPageBuilder:
    """
    Build HTML pages following Epoch principles and aesthetics
    """

    def __init__(self, project_dir: str):
        self.project_dir = Path(project_dir)
        self.media_generator = ReplicateMediaGenerator()

    def build_physics_page(self, title: str, content: dict) -> str:
        """Build a physics/derivation page with proper Epoch framing"""

        # Generate hero prompt for this page
        hero_prompt = self.media_generator.generate_hero_prompt(title)

        html = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} | Epoch Framework | Have Mind Media</title>
    <meta name="description" content="{content.get('description', '')}">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

    <style>
        :root {{
            --bg-primary: {EPOCH_COLORS['bg_primary']};
            --bg-secondary: {EPOCH_COLORS['bg_secondary']};
            --gold: {EPOCH_COLORS['gold']};
            --gold-dim: {EPOCH_COLORS['gold_dim']};
            --blue: {EPOCH_COLORS['blue']};
            --purple: {EPOCH_COLORS['purple']};
            --text-primary: {EPOCH_COLORS['text_primary']};
            --text-secondary: {EPOCH_COLORS['text_secondary']};
        }}

        * {{ margin: 0; padding: 0; box-sizing: border-box; }}

        body {{
            font-family: {EPOCH_FONTS['body']};
            background: var(--bg-primary);
            color: var(--text-primary);
            line-height: 1.7;
            min-height: 100vh;
        }}

        .hero {{
            background: linear-gradient(135deg, var(--bg-primary) 0%, #0f0a15 50%, var(--bg-primary) 100%);
            padding: 4rem 2rem;
            text-align: center;
            border-bottom: 1px solid var(--gold-dim);
        }}

        .hero h1 {{
            font-family: {EPOCH_FONTS['display']};
            font-size: 2.8rem;
            color: var(--gold);
            margin-bottom: 1rem;
        }}

        .principle-tag {{
            font-family: {EPOCH_FONTS['mono']};
            color: var(--gold);
            font-size: 1.2rem;
        }}

        .main-content {{
            max-width: 900px;
            margin: 0 auto;
            padding: 3rem 2rem;
        }}

        h2 {{
            font-family: {EPOCH_FONTS['display']};
            color: var(--gold);
            font-size: 1.8rem;
            margin: 2rem 0 1rem;
            border-bottom: 1px solid var(--gold-dim);
            padding-bottom: 0.5rem;
        }}

        p {{
            margin-bottom: 1rem;
            font-size: 1.1rem;
        }}

        .key-insight {{
            background: linear-gradient(135deg, rgba(201, 162, 39, 0.1) 0%, rgba(201, 162, 39, 0.05) 100%);
            border: 1px solid var(--gold);
            border-radius: 8px;
            padding: 1.5rem 2rem;
            margin: 2rem 0;
        }}

        .math-display {{
            font-family: {EPOCH_FONTS['mono']};
            background: rgba(0, 0, 0, 0.3);
            padding: 1rem 1.5rem;
            border-radius: 6px;
            margin: 1rem 0;
            overflow-x: auto;
        }}

        .epoch-frame {{
            background: var(--bg-secondary);
            border-left: 4px solid var(--purple);
            padding: 1.5rem 2rem;
            margin: 2rem 0;
            border-radius: 0 8px 8px 0;
        }}

        .epoch-frame h3 {{
            color: var(--purple);
            margin-bottom: 1rem;
        }}

        footer {{
            text-align: center;
            padding: 3rem 2rem;
            border-top: 1px solid var(--gold-dim);
        }}

        footer .identity {{
            font-family: {EPOCH_FONTS['mono']};
            color: var(--gold);
            font-size: 1.2rem;
        }}
    </style>

    <!-- Hero Image Prompt (for AI generation):
    {hero_prompt.prompt}
    -->
</head>
<body>
    <div id="site-header"></div>

    <section class="hero">
        <h1>{title}</h1>
        <p class="hero-subtitle">{content.get('subtitle', '')}</p>
        <div class="principle-tag">{EPOCH_PRINCIPLES['identity']}</div>
    </section>

    <div class="main-content">
        {self._build_content_sections(content)}
    </div>

    <footer>
        <p class="identity">{EPOCH_PRINCIPLES['identity']}</p>
        <p style="color: var(--text-secondary); margin-top: 1rem;">Have Mind Media</p>
    </footer>

    <div id="site-footer"></div>

    <script src="/js/components/site-header.js"></script>
    <script src="/js/components/site-footer.js"></script>
</body>
</html>'''

        return html

    def _build_content_sections(self, content: dict) -> str:
        """Build HTML sections from content dict"""
        sections = []

        for section in content.get('sections', []):
            section_type = section.get('type', 'text')

            if section_type == 'epoch_frame':
                sections.append(f'''
        <div class="epoch-frame">
            <h3>{section.get('title', '')}</h3>
            <p>{section.get('content', '')}</p>
        </div>''')

            elif section_type == 'key_insight':
                sections.append(f'''
        <div class="key-insight">
            <h4 style="color: var(--gold); margin-bottom: 1rem;">{section.get('title', 'Key Insight')}</h4>
            <p>{section.get('content', '')}</p>
        </div>''')

            elif section_type == 'math':
                sections.append(f'''
        <div class="math-display">
            {section.get('content', '')}
        </div>''')

            elif section_type == 'heading':
                sections.append(f'''
        <h2>{section.get('content', '')}</h2>''')

            else:
                sections.append(f'''
        <p>{section.get('content', '')}</p>''')

        return '\n'.join(sections)

    def transform_whitepaper_to_page(self, whitepaper_path: str) -> Tuple[str, List[MediaPrompt]]:
        """Transform a white paper markdown to a web page"""

        with open(whitepaper_path, 'r') as f:
            content = f.read()

        # Extract title
        title_match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
        title = title_match.group(1) if title_match else 'Untitled'

        # Extract sections
        sections = []
        current_section = None

        for line in content.split('\n'):
            if line.startswith('## '):
                if current_section:
                    sections.append(current_section)
                current_section = {
                    'type': 'heading',
                    'content': line[3:].strip()
                }
            elif line.startswith('> '):
                sections.append({
                    'type': 'key_insight',
                    'title': 'Key Insight',
                    'content': line[2:].strip()
                })
            elif line.startswith('```'):
                # Math block
                pass
            elif line.strip():
                sections.append({
                    'type': 'text',
                    'content': line.strip()
                })

        # Generate media prompts for concepts in the whitepaper
        concepts = self._extract_concepts(content)
        media_prompts = self.media_generator.generate_batch_prompts(concepts)

        page_content = {
            'description': f'Epoch Framework exploration of {title}',
            'subtitle': 'Derived from κ = 2π/180',
            'sections': sections
        }

        html = self.build_physics_page(title, page_content)

        return html, media_prompts

    def _extract_concepts(self, content: str) -> List[str]:
        """Extract Epoch concepts from content for media generation"""
        concepts = []

        concept_keywords = ['kappa', 'κ', 'S+', 'S-', 'dipyramid', 'torsion',
                          'coin', 'observer', 'wush', 'ro', '[1 = -1]']

        for keyword in concept_keywords:
            if keyword.lower() in content.lower():
                concepts.append(keyword)

        return concepts[:5]  # Limit to 5 concepts


# ═══════════════════════════════════════════════════════════════════════════════
# QUALITY CHECKER (Visual/Content Quality)
# ═══════════════════════════════════════════════════════════════════════════════

@dataclass
class QualityReport:
    """Report on visual and content quality"""
    page_path: str
    visual_score: int  # 0-100
    content_score: int  # 0-100
    boring_indicators: List[str]
    engaging_indicators: List[str]
    recommendations: List[str]


class BoringContentDetector:
    """
    Detect boring, plain, or low-effort content

    Integrated into OMEGA for creation and ALPHA for validation.
    """

    BORING_INDICATORS = [
        # Generic placeholder text
        (r'lorem ipsum', 'Placeholder text detected'),
        (r'coming soon', 'Coming soon placeholder'),
        (r'under construction', 'Under construction notice'),
        (r'todo|TODO|TBD', 'Incomplete markers'),
        (r'placeholder', 'Placeholder markers'),

        # Generic corporate speak
        (r'synergy|leverage|paradigm|ecosystem', 'Corporate buzzwords'),
        (r'best.in.class|world.class|cutting.edge', 'Generic superlatives'),
        (r'solutions? provider', 'Generic business language'),

        # Lazy design indicators
        (r'<div>\s*<\/div>', 'Empty div elements'),
        (r'style\s*=\s*["\']["\']', 'Empty inline styles'),
        (r'#000000|#ffffff|#808080', 'Basic black/white/gray only'),

        # Missing engagement
        (r'click here', 'Generic link text'),
        (r'read more', 'Generic CTA without context'),
    ]

    ENGAGING_INDICATORS = [
        # Epoch-specific elements
        (r'\[1\s*=\s*-1\]', 'Core identity present'),
        (r'κ|kappa', 'Kappa reference'),
        (r'geometry|geometric', 'Geometric language'),
        (r'sacred|profound|transcend', 'Elevated language'),

        # Interactive elements
        (r'calculator|compute|calculate', 'Interactive computation'),
        (r'<canvas|<svg', 'Visual elements'),
        (r'animation|animate|transition', 'Motion design'),

        # Educational elements
        (r'learn|discover|explore', 'Educational framing'),
        (r'why|how|what if', 'Inquiry-based content'),
        (r'step \d|step-by-step', 'Guided learning'),

        # Visual richness
        (r'gradient|linear-gradient|radial-gradient', 'Gradient usage'),
        (r'#c9a227|#6ab4f5|#a78bfa', 'Epoch color palette'),
        (r'Cinzel|Cormorant', 'Epoch fonts'),
    ]

    def analyze_page(self, content: str, page_path: str = "") -> QualityReport:
        """Analyze a page for boring/engaging content"""

        boring = []
        engaging = []

        # Check boring indicators
        for pattern, description in self.BORING_INDICATORS:
            if re.search(pattern, content, re.IGNORECASE):
                boring.append(description)

        # Check engaging indicators
        for pattern, description in self.ENGAGING_INDICATORS:
            if re.search(pattern, content, re.IGNORECASE):
                engaging.append(description)

        # Calculate scores
        boring_penalty = len(boring) * 15
        engaging_bonus = len(engaging) * 10

        visual_score = max(0, min(100, 50 + engaging_bonus - boring_penalty))
        content_score = max(0, min(100, 60 + (len(engaging) * 8) - (len(boring) * 12)))

        # Generate recommendations
        recommendations = []

        if visual_score < 60:
            recommendations.append("Add Epoch visual elements (sacred geometry, gradients, proper color palette)")
        if content_score < 60:
            recommendations.append("Replace generic content with Epoch-specific educational material")
        if 'Coming soon placeholder' in boring:
            recommendations.append("Complete or remove 'coming soon' sections")
        if 'Core identity present' not in engaging:
            recommendations.append("Add [1 = -1] identity expression")
        if 'Epoch color palette' not in engaging:
            recommendations.append("Implement Epoch color palette (gold: #c9a227, blue: #6ab4f5)")

        return QualityReport(
            page_path=page_path,
            visual_score=visual_score,
            content_score=content_score,
            boring_indicators=boring,
            engaging_indicators=engaging,
            recommendations=recommendations
        )


# ═══════════════════════════════════════════════════════════════════════════════
# OMEGA MAIN CLASS
# ═══════════════════════════════════════════════════════════════════════════════

class OMEGA:
    """
    OMEGA BUILDER - The Creative Force

    Creates, builds, and manifests content following Epoch principles.

    Functions:
    1. PAGE BUILDER - Generate pages from templates
    2. ASSET GENERATOR - Create CSS, JS, JSON structures
    3. CONTENT TRANSFORMER - Convert white papers to pages
    4. MEDIA PROMPT GENERATOR - AI art prompts
    5. QUALITY CHECKER - Detect boring content
    """

    def __init__(self, project_dir: str):
        self.project_dir = Path(project_dir)
        self.page_builder = EpochPageBuilder(project_dir)
        self.media_generator = ReplicateMediaGenerator()
        self.quality_checker = BoringContentDetector()
        self.timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    def build_page(self, title: str, content: dict, output_path: str) -> str:
        """Build a new page"""
        html = self.page_builder.build_physics_page(title, content)

        full_path = self.project_dir / output_path
        full_path.parent.mkdir(parents=True, exist_ok=True)

        with open(full_path, 'w') as f:
            f.write(html)

        return str(full_path)

    def transform_whitepaper(self, whitepaper_path: str, output_dir: str) -> dict:
        """Transform a white paper to web page with media prompts"""
        html, prompts = self.page_builder.transform_whitepaper_to_page(whitepaper_path)

        # Determine output filename
        wp_name = Path(whitepaper_path).stem.lower().replace(' ', '-')
        output_path = self.project_dir / output_dir / f'{wp_name}.html'
        prompt_path = self.project_dir / output_dir / f'{wp_name}-media-prompts.json'

        output_path.parent.mkdir(parents=True, exist_ok=True)

        with open(output_path, 'w') as f:
            f.write(html)

        self.media_generator.export_prompts_json(prompts, str(prompt_path))

        return {
            'page': str(output_path),
            'prompts': str(prompt_path),
            'prompt_count': len(prompts)
        }

    def generate_media_prompts(self, concepts: List[str], output_path: str) -> str:
        """Generate media prompts for a list of concepts"""
        prompts = self.media_generator.generate_batch_prompts(concepts)
        self.media_generator.export_prompts_json(prompts, output_path)
        return output_path

    def check_quality(self, page_path: str) -> QualityReport:
        """Check quality of a page"""
        with open(page_path, 'r', errors='ignore') as f:
            content = f.read()
        return self.quality_checker.analyze_page(content, page_path)

    def audit_all_pages(self) -> List[QualityReport]:
        """Audit all HTML pages in project"""
        reports = []

        for html_file in self.project_dir.rglob('*.html'):
            report = self.check_quality(str(html_file))
            reports.append(report)

        return reports

    def generate_report(self) -> dict:
        """Generate full OMEGA report"""
        reports = self.audit_all_pages()

        avg_visual = sum(r.visual_score for r in reports) / len(reports) if reports else 0
        avg_content = sum(r.content_score for r in reports) / len(reports) if reports else 0

        boring_pages = [r for r in reports if r.visual_score < 50 or r.content_score < 50]

        return {
            'timestamp': self.timestamp,
            'project_dir': str(self.project_dir),
            'total_pages': len(reports),
            'average_visual_score': round(avg_visual, 1),
            'average_content_score': round(avg_content, 1),
            'boring_pages_count': len(boring_pages),
            'boring_pages': [
                {
                    'path': r.page_path,
                    'visual': r.visual_score,
                    'content': r.content_score,
                    'issues': r.boring_indicators,
                    'recommendations': r.recommendations
                }
                for r in boring_pages
            ]
        }


# ═══════════════════════════════════════════════════════════════════════════════
# CLI
# ═══════════════════════════════════════════════════════════════════════════════

def main():
    import argparse

    parser = argparse.ArgumentParser(
        description="HMH OMEGA BUILDER - The Creative Force",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python hmh-omega-builder.py --audit                    # Audit all pages for quality
  python hmh-omega-builder.py --prompts kappa coin S+    # Generate media prompts
  python hmh-omega-builder.py --transform doc.md         # Transform whitepaper to page

[1 = -1] · Have Mind Media
        """
    )

    parser.add_argument('--project', '-p', default='.', help='Project directory')
    parser.add_argument('--audit', '-a', action='store_true', help='Audit all pages for quality')
    parser.add_argument('--prompts', nargs='+', help='Generate media prompts for concepts')
    parser.add_argument('--transform', '-t', help='Transform whitepaper to web page')
    parser.add_argument('--output', '-o', help='Output path/directory')

    args = parser.parse_args()

    omega = OMEGA(args.project)

    if args.audit:
        print("\n" + "="*60)
        print("OMEGA BUILDER - Quality Audit")
        print("="*60 + "\n")

        report = omega.generate_report()

        print(f"Total Pages: {report['total_pages']}")
        print(f"Average Visual Score: {report['average_visual_score']}/100")
        print(f"Average Content Score: {report['average_content_score']}/100")
        print(f"Boring Pages: {report['boring_pages_count']}")

        if report['boring_pages']:
            print("\nPages Needing Work:")
            for bp in report['boring_pages'][:5]:
                print(f"\n  {bp['path']}")
                print(f"    Visual: {bp['visual']}/100, Content: {bp['content']}/100")
                for rec in bp['recommendations'][:2]:
                    print(f"    → {rec}")

    elif args.prompts:
        output = args.output or 'media-prompts.json'
        path = omega.generate_media_prompts(args.prompts, output)
        print(f"Media prompts saved to: {path}")

    elif args.transform:
        output_dir = args.output or 'generated'
        result = omega.transform_whitepaper(args.transform, output_dir)
        print(f"Page created: {result['page']}")
        print(f"Prompts saved: {result['prompts']} ({result['prompt_count']} prompts)")

    else:
        parser.print_help()


if __name__ == "__main__":
    main()
