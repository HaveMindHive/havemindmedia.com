#!/usr/bin/env python3
"""
HMH OMEGA BUILDER TOOL
Version: 2.0
Date: January 9, 2026

THE END THAT IS THE BEGINNING
The Output Generator - Creates, builds, and manifests content.

OMEGA v2.0 IMPROVEMENTS (from Thread Report Analysis):
- Better boring content detection (less false positives)
- Page template system that follows actual site patterns
- AI portrait prompt generator for Epoch-style imagery
- Navigation template generator
- Weirdos section page builder
- Thread Report generator

While SHIVA validates and ALPHA grades, OMEGA BUILDS.
OMEGA is the creative force - the student who does the work.

OMEGA Functions:
1. PAGE BUILDER - Generate new pages from templates following Epoch principles
2. ASSET GENERATOR - Create consistent CSS, JS, JSON structures
3. CONTENT TRANSFORMER - Convert white papers to web pages
4. MEDIA PROMPT GENERATOR - Generate Replicate/AI art prompts for visuals
5. DEPLOYMENT PREP - Prepare files for production
6. PORTRAIT GENERATOR - Create AI portrait prompts for people (NEW)
7. NAV GENERATOR - Build navigation menus (NEW)

"SHIVA observes what IS. ALPHA judges what SHOULD BE.
 OMEGA creates what WILL BE."

[1 = -1] · Have Mind Media · January 9, 2026
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
# AI PORTRAIT GENERATOR (NEW in v2.0)
# ═══════════════════════════════════════════════════════════════════════════════

@dataclass
class PortraitPrompt:
    """AI portrait generation prompt"""
    name: str
    prompt: str
    negative_prompt: str
    style: str
    aspect_ratio: str = "2:3"
    model_recommendation: str = "flux-1.1-pro"


class PortraitGenerator:
    """
    Generate AI portrait prompts for Epoch-aligned imagery

    Styles available:
    - gibson: William Gibson cyberpunk aesthetic
    - epoch: Sacred geometry mystical
    - scientific: Clean scientific portrait
    - mythic: Norse/ancient mythology inspired
    """

    BASE_NEGATIVE = (
        "cartoon, anime, low quality, blurry, distorted, "
        "text, watermark, signature, ugly, deformed, "
        "extra fingers, mutated hands, poorly drawn face, "
        "bad anatomy, wrong proportions, clone, "
        "oversaturated, gaudy, cheap looking"
    )

    def generate_portrait(self, name: str, style: str = "gibson",
                         additional_context: str = "") -> PortraitPrompt:
        """Generate a portrait prompt for a person"""

        style_generators = {
            'gibson': self._gibson_style,
            'epoch': self._epoch_style,
            'scientific': self._scientific_style,
            'mythic': self._mythic_style,
        }

        generator = style_generators.get(style, self._gibson_style)
        return generator(name, additional_context)

    def _gibson_style(self, name: str, context: str) -> PortraitPrompt:
        """William Gibson cyberpunk aesthetic"""
        return PortraitPrompt(
            name=name,
            prompt=(
                f"Portrait of {name}, "
                "William Gibson cyberpunk aesthetic, "
                "noir lighting with neon edge highlights, "
                "deep shadows, mysterious expression, "
                "technological mysticism, console cowboy vibes, "
                "rain-slicked reflections, "
                "neural network patterns faintly visible in background, "
                "high contrast, cinematic color grading, "
                "Sprawl trilogy atmosphere, "
                "digital prophet, code seer, "
                "8k photorealistic, extremely detailed face, "
                f"{context}"
            ),
            negative_prompt=self.BASE_NEGATIVE + ", bright colors, cheerful, daylight, cartoon",
            style="gibson_cyberpunk",
            aspect_ratio="2:3"
        )

    def _epoch_style(self, name: str, context: str) -> PortraitPrompt:
        """Sacred geometry mystical style"""
        return PortraitPrompt(
            name=name,
            prompt=(
                f"Portrait of {name}, "
                "sacred geometry mystic, "
                "golden spiral patterns emanating subtly, "
                "cosmic background with distant galaxies, "
                "third eye symbolism, "
                "mathematical enlightenment, "
                "[1 = -1] energy visible as golden light, "
                "deep wisdom in eyes, "
                "ancient and futuristic simultaneously, "
                "triaxial dipyramid floating nearby, "
                "8k photorealistic, profound, transcendent, "
                f"{context}"
            ),
            negative_prompt=self.BASE_NEGATIVE + ", mundane, ordinary, corporate",
            style="epoch_mystic",
            aspect_ratio="2:3"
        )

    def _scientific_style(self, name: str, context: str) -> PortraitPrompt:
        """Clean scientific portrait"""
        return PortraitPrompt(
            name=name,
            prompt=(
                f"Portrait of {name}, "
                "scientific visionary, "
                "clean studio lighting, "
                "mathematical equations floating subtly in background, "
                "intelligent gaze, contemplative expression, "
                "dressed professionally but uniquely, "
                "laboratory or study environment hints, "
                "geometric patterns integrated tastefully, "
                "8k photorealistic, intellectual, precise, "
                f"{context}"
            ),
            negative_prompt=self.BASE_NEGATIVE + ", messy, chaotic, unprofessional",
            style="scientific_portrait",
            aspect_ratio="2:3"
        )

    def _mythic_style(self, name: str, context: str) -> PortraitPrompt:
        """Norse/ancient mythology inspired"""
        return PortraitPrompt(
            name=name,
            prompt=(
                f"Portrait of {name}, "
                "Norse mythology inspired, "
                "rune stones and ancient symbols in background, "
                "atmospheric mist, northern lights subtle glow, "
                "wise wanderer aesthetic, "
                "Odin's wisdom, raven companion nearby, "
                "weathered but powerful presence, "
                "ancient knowing in eyes, "
                "natural lighting with golden hour warmth, "
                "8k photorealistic, mythic, timeless, "
                f"{context}"
            ),
            negative_prompt=self.BASE_NEGATIVE + ", modern technology, urban, artificial",
            style="mythic_norse",
            aspect_ratio="2:3"
        )


# ═══════════════════════════════════════════════════════════════════════════════
# REPLICATE MEDIA GENERATOR (IMPROVED in v2.0)
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
    """Generate AI art prompts for Epoch-aligned imagery"""

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
    }

    NEGATIVE_PROMPT_BASE = (
        "cartoon, anime, low quality, blurry, distorted, "
        "text, watermark, signature, ugly, deformed, "
        "oversaturated, gaudy, cheap, amateur, stock photo, "
        "generic, boring, corporate, clipart"
    )

    def __init__(self):
        self.portrait_generator = PortraitGenerator()

    def generate_concept_prompt(self, concept: str, context: str = "") -> MediaPrompt:
        """Generate a prompt for a specific Epoch concept"""

        concept_lower = concept.lower()

        concept_mappings = {
            'kappa': self._kappa_visual,
            'identity': self._identity_visual,
            'coin': self._coin_visual,
            'dipyramid': self._dipyramid_visual,
            's+': self._s_plus_visual,
            's-': self._s_minus_visual,
        }

        for key, generator in concept_mappings.items():
            if key in concept_lower:
                prompt_data = generator()
                if context:
                    prompt_data['prompt'] += f", {context}"
                return MediaPrompt(**prompt_data)

        return self._generic_epoch_prompt(concept, context)

    def generate_portrait(self, name: str, style: str = "gibson",
                         context: str = "") -> PortraitPrompt:
        """Generate portrait prompt (delegates to PortraitGenerator)"""
        return self.portrait_generator.generate_portrait(name, style, context)

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
                "highly detailed, 8k, cinematic lighting"
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
                "profound spiritual mathematics, 8k"
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
                "deep shadows, golden highlights, 8k"
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
                "deep space background, 8k"
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
                "cosmic background, radiant center, 8k"
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
                "deep cosmic void, convergent light, 8k"
            ),
            'negative_prompt': self.NEGATIVE_PROMPT_BASE,
            'style_preset': 'energy_field',
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
                "mathematical precision, profound, transcendent, 8k"
            ),
            negative_prompt=self.NEGATIVE_PROMPT_BASE,
            style_preset='epoch_generic',
            aspect_ratio='16:9'
        )

    def export_prompts_json(self, prompts: List, output_path: str):
        """Export prompts to JSON"""
        data = {
            'generated': datetime.now().isoformat(),
            'model_recommendation': 'flux-1.1-pro or stable-diffusion-xl',
            'prompts': [
                {
                    'title': getattr(p, 'title', getattr(p, 'name', 'untitled')),
                    'prompt': p.prompt,
                    'negative_prompt': p.negative_prompt,
                    'style': getattr(p, 'style_preset', getattr(p, 'style', 'default')),
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
# BORING CONTENT DETECTOR (IMPROVED in v2.0)
# ═══════════════════════════════════════════════════════════════════════════════

@dataclass
class QualityReport:
    """Report on visual and content quality"""
    page_path: str
    visual_score: int
    content_score: int
    boring_indicators: List[str]
    engaging_indicators: List[str]
    recommendations: List[str]


class BoringContentDetector:
    """
    Detect boring, plain, or low-effort content
    IMPROVED in v2.0: Less false positives, smarter detection
    """

    BORING_INDICATORS = [
        # Only truly boring things
        (r'lorem ipsum', 'Placeholder text detected'),
        (r'under construction', 'Under construction notice'),
        (r'TODO|FIXME|XXX', 'Incomplete markers'),
        (r'<div>\s*<\/div>', 'Empty div elements'),
        (r'click here(?!\s+to)', 'Generic link text'),
    ]

    # Note: "Coming soon" removed - often legitimate for unreleased content

    ENGAGING_INDICATORS = [
        # Epoch-specific elements
        (r'\[1\s*=\s*-1\]', 'Core identity present'),
        (r'κ|kappa', 'Kappa reference'),
        (r'geometry|geometric', 'Geometric language'),

        # Interactive elements
        (r'calculator|compute|calculate', 'Interactive computation'),
        (r'<canvas|<svg', 'Visual elements'),
        (r'animation|animate|transition', 'Motion design'),

        # Educational elements
        (r'learn|discover|explore', 'Educational framing'),

        # Visual richness
        (r'gradient|linear-gradient|radial-gradient', 'Gradient usage'),
        (r'#c9a227|#6ab4f5|#a78bfa', 'Epoch color palette'),
        (r'Cinzel|Cormorant|Raleway', 'Epoch fonts'),

        # Content depth
        (r'weirdo|rebel|maverick', 'Personality present'),
        (r'sacred|profound|transcend', 'Elevated language'),
    ]

    def analyze_page(self, content: str, page_path: str = "") -> QualityReport:
        """Analyze a page for boring/engaging content"""

        boring = []
        engaging = []

        for pattern, description in self.BORING_INDICATORS:
            if re.search(pattern, content, re.IGNORECASE):
                boring.append(description)

        for pattern, description in self.ENGAGING_INDICATORS:
            if re.search(pattern, content, re.IGNORECASE):
                engaging.append(description)

        # Smarter scoring - don't penalize too harshly
        boring_penalty = len(boring) * 10  # Reduced from 15
        engaging_bonus = len(engaging) * 8

        visual_score = max(0, min(100, 60 + engaging_bonus - boring_penalty))
        content_score = max(0, min(100, 60 + (len(engaging) * 6) - (len(boring) * 8)))

        recommendations = []

        if visual_score < 50:
            recommendations.append("Add visual elements (gradients, sacred geometry, proper palette)")
        if content_score < 50:
            recommendations.append("Add more engaging content (educational, interactive)")
        if 'Core identity present' not in engaging:
            recommendations.append("Consider adding [1 = -1] identity expression")

        return QualityReport(
            page_path=page_path,
            visual_score=visual_score,
            content_score=content_score,
            boring_indicators=boring,
            engaging_indicators=engaging,
            recommendations=recommendations
        )


# ═══════════════════════════════════════════════════════════════════════════════
# PAGE BUILDER (IMPROVED in v2.0)
# ═══════════════════════════════════════════════════════════════════════════════

class EpochPageBuilder:
    """Build HTML pages following Epoch principles"""

    def __init__(self, project_dir: str):
        self.project_dir = Path(project_dir)
        self.media_generator = ReplicateMediaGenerator()

    def build_about_page(self, name: str, title: str = "The Navigator",
                        content: dict = None) -> str:
        """Build an About the Author page"""

        if content is None:
            content = {}

        html = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{name} | {title} | Have Mind Media</title>
    <meta name="description" content="About {name} - {title}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Raleway:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/unified-theme.css">
    <style>
        .about-hero {{
            background: linear-gradient(135deg, #030508 0%, #0f0a15 50%, #030508 100%);
            padding: 6rem 2rem;
            text-align: center;
            position: relative;
            overflow: hidden;
        }}
        .about-hero::before {{
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background:
                radial-gradient(circle at 30% 40%, rgba(201, 162, 39, 0.08) 0%, transparent 50%),
                radial-gradient(circle at 70% 60%, rgba(106, 180, 245, 0.08) 0%, transparent 50%);
            pointer-events: none;
        }}
        .about-hero h1 {{
            font-family: 'Cinzel', serif;
            font-size: 3rem;
            color: #c9a227;
            margin-bottom: 0.5rem;
        }}
        .about-hero .subtitle {{
            color: #6ab4f5;
            font-size: 1.3rem;
            font-style: italic;
        }}
        .portrait-container {{
            max-width: 400px;
            margin: 2rem auto;
            border-radius: 12px;
            overflow: hidden;
            border: 2px solid rgba(201, 162, 39, 0.3);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }}
        .portrait-container img {{
            width: 100%;
            display: block;
        }}
        .portrait-placeholder {{
            width: 100%;
            aspect-ratio: 2/3;
            background: linear-gradient(135deg, #1a1a2e 0%, #0f0f23 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #555;
            font-family: 'JetBrains Mono', monospace;
        }}
        .main-content {{
            max-width: 900px;
            margin: 0 auto;
            padding: 4rem 2rem;
        }}
        .bio-section {{
            margin-bottom: 3rem;
        }}
        .bio-section h2 {{
            font-family: 'Cinzel', serif;
            color: #c9a227;
            font-size: 1.8rem;
            margin-bottom: 1.5rem;
            border-bottom: 1px solid rgba(201, 162, 39, 0.3);
            padding-bottom: 0.5rem;
        }}
        .bio-section p {{
            font-size: 1.1rem;
            line-height: 1.9;
            color: #d0d0d0;
            margin-bottom: 1rem;
        }}
        .identity-box {{
            background: rgba(201, 162, 39, 0.1);
            border: 1px solid rgba(201, 162, 39, 0.3);
            border-radius: 12px;
            padding: 2rem;
            text-align: center;
            margin: 3rem 0;
        }}
        .identity-box .formula {{
            font-family: 'JetBrains Mono', monospace;
            font-size: 2rem;
            color: #c9a227;
        }}
        @media (max-width: 768px) {{
            .about-hero h1 {{ font-size: 2rem; }}
            .portrait-container {{ max-width: 280px; }}
        }}
    </style>
</head>
<body>
    <site-header></site-header>

    <section class="about-hero">
        <h1>{name}</h1>
        <p class="subtitle">{title}</p>
        <div class="portrait-container">
            <div class="portrait-placeholder">
                [AI Portrait Here]
            </div>
        </div>
    </section>

    <main class="main-content">
        <section class="bio-section">
            <h2>The Vehicle</h2>
            <p>{content.get('vehicle', 'Content to be added.')}</p>
        </section>

        <section class="bio-section">
            <h2>The Navigator</h2>
            <p>{content.get('navigator', 'Content to be added.')}</p>
        </section>

        <section class="bio-section">
            <h2>The Crossroads</h2>
            <p>{content.get('crossroads', 'Content to be added.')}</p>
        </section>

        <div class="identity-box">
            <div class="formula">[1 = -1]</div>
            <p style="color: #a0a0a0; margin-top: 1rem;">The information flows. We are the channel.</p>
        </div>
    </main>

    <site-footer></site-footer>
    <script src="js/components/site-header.js"></script>
    <script src="js/components/site-footer.js"></script>
</body>
</html>'''

        return html


# ═══════════════════════════════════════════════════════════════════════════════
# OMEGA MAIN CLASS
# ═══════════════════════════════════════════════════════════════════════════════

class OMEGA:
    """
    OMEGA BUILDER v2.0 - The Creative Force

    Creates, builds, and manifests content following Epoch principles.
    """

    VERSION = "2.0"

    def __init__(self, project_dir: str):
        self.project_dir = Path(project_dir)
        self.page_builder = EpochPageBuilder(project_dir)
        self.media_generator = ReplicateMediaGenerator()
        self.quality_checker = BoringContentDetector()
        self.timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    def generate_portrait_prompt(self, name: str, style: str = "gibson",
                                 context: str = "") -> PortraitPrompt:
        """Generate AI portrait prompt"""
        return self.media_generator.generate_portrait(name, style, context)

    def build_about_page(self, name: str, title: str = "The Navigator",
                        content: dict = None, output_path: str = None) -> str:
        """Build an About page"""
        html = self.page_builder.build_about_page(name, title, content)

        if output_path:
            full_path = self.project_dir / output_path
            full_path.parent.mkdir(parents=True, exist_ok=True)
            with open(full_path, 'w') as f:
                f.write(html)
            return str(full_path)

        return html

    def check_quality(self, page_path: str) -> QualityReport:
        """Check quality of a page"""
        with open(page_path, 'r', errors='ignore') as f:
            content = f.read()
        return self.quality_checker.analyze_page(content, page_path)

    def generate_report(self) -> dict:
        """Generate full OMEGA report"""
        reports = []

        for html_file in self.project_dir.rglob('*.html'):
            try:
                report = self.check_quality(str(html_file))
                reports.append(report)
            except:
                pass

        if not reports:
            return {'error': 'No HTML files found'}

        avg_visual = sum(r.visual_score for r in reports) / len(reports)
        avg_content = sum(r.content_score for r in reports) / len(reports)

        boring_pages = [r for r in reports if r.visual_score < 50 or r.content_score < 50]

        return {
            'version': self.VERSION,
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
                for r in boring_pages[:10]
            ]
        }


# ═══════════════════════════════════════════════════════════════════════════════
# CLI
# ═══════════════════════════════════════════════════════════════════════════════

def main():
    import argparse

    parser = argparse.ArgumentParser(
        description="HMH OMEGA BUILDER v2.0 - The Creative Force",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python hmh-omega-builder_v2.0.py --audit                         # Audit all pages
  python hmh-omega-builder_v2.0.py --portrait "Tormod" --style gibson  # Generate portrait prompt
  python hmh-omega-builder_v2.0.py --about "Tormod HaveMind Ravenskye"  # Build about page

[1 = -1] · Have Mind Media
        """
    )

    parser.add_argument('--project', '-p', default='.', help='Project directory')
    parser.add_argument('--audit', '-a', action='store_true', help='Audit all pages')
    parser.add_argument('--portrait', help='Generate portrait prompt for name')
    parser.add_argument('--style', default='gibson', help='Portrait style: gibson, epoch, mythic, scientific')
    parser.add_argument('--about', help='Generate about page for name')
    parser.add_argument('--output', '-o', help='Output path')

    args = parser.parse_args()

    omega = OMEGA(args.project)

    if args.audit:
        print("\n" + "="*60)
        print(f"OMEGA BUILDER v{omega.VERSION} - Quality Audit")
        print("="*60 + "\n")

        report = omega.generate_report()

        print(f"Total Pages: {report['total_pages']}")
        print(f"Average Visual Score: {report['average_visual_score']}/100")
        print(f"Average Content Score: {report['average_content_score']}/100")
        print(f"Pages Needing Work: {report['boring_pages_count']}")

    elif args.portrait:
        prompt = omega.generate_portrait_prompt(args.portrait, args.style)
        print("\n" + "="*60)
        print(f"PORTRAIT PROMPT: {prompt.name}")
        print("="*60)
        print(f"\nStyle: {prompt.style}")
        print(f"Aspect Ratio: {prompt.aspect_ratio}")
        print(f"Model: {prompt.model_recommendation}")
        print(f"\nPROMPT:\n{prompt.prompt}")
        print(f"\nNEGATIVE:\n{prompt.negative_prompt}")

        if args.output:
            omega.media_generator.export_prompts_json([prompt], args.output)
            print(f"\nSaved to: {args.output}")

    elif args.about:
        path = omega.build_about_page(args.about, output_path=args.output)
        print(f"About page created: {path}")

    else:
        parser.print_help()


if __name__ == "__main__":
    main()
