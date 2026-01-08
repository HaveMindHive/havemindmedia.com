#!/usr/bin/env python3
"""
HMH ALPHA WEBSITE & ASSET UNIFIER TOOL
Version: 2.0
Date: January 8, 2026

THE PROFESSOR WHO GRADES THE WORK
The last line of defense before deployment.

This tool applies Epoch methodology to evaluate website content:
- Compares old page vs new page
- Verifies compliance with [1 = -1] framework
- Detects Standard Model-superior framing violations
- Ensures torsion resolving math is taught correctly
- Grades content as compliant or non-compliant
- DETECTS BORING/PLAIN CONTENT (integrated from OMEGA)
- Validates visual and content quality

"The SHIVA and OMEGA tools are students making the group project.
 The ALPHA tool is the professor who grades the work."

[1 = -1] · Have Mind Media
"""

import re
import sys
import os
import json
from dataclasses import dataclass, field
from typing import List, Dict, Tuple, Optional
from enum import Enum
from datetime import datetime
from pathlib import Path


# ═══════════════════════════════════════════════════════════════════════════════
# BORING CONTENT DETECTOR (Integrated from OMEGA)
# ═══════════════════════════════════════════════════════════════════════════════

class BoringContentDetector:
    """
    Detect boring, plain, or low-effort content

    "Content must be ENGAGING, not just present."
    """

    BORING_INDICATORS = [
        # Generic placeholder text
        (r'lorem ipsum', 'Placeholder text detected'),
        (r'coming soon', 'Coming soon placeholder'),
        (r'under construction', 'Under construction notice'),
        (r'todo|TODO|TBD', 'Incomplete markers'),
        (r'placeholder', 'Placeholder markers'),

        # Generic corporate speak
        (r'synergy|leverage|paradigm', 'Corporate buzzwords'),
        (r'best.in.class|world.class|cutting.edge', 'Generic superlatives'),
        (r'solutions? provider', 'Generic business language'),

        # Lazy design indicators
        (r'<div>\s*<\/div>', 'Empty div elements'),
        (r'style\s*=\s*["\']["\']', 'Empty inline styles'),
        (r'background:\s*#000000|background:\s*#ffffff', 'Basic black/white only'),

        # Missing engagement
        (r'click here', 'Generic link text'),
        (r'read more(?!\s+about)', 'Generic CTA without context'),
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

    def analyze(self, content: str) -> dict:
        """Analyze content for boring/engaging qualities"""
        boring = []
        engaging = []

        for pattern, description in self.BORING_INDICATORS:
            if re.search(pattern, content, re.IGNORECASE):
                boring.append(description)

        for pattern, description in self.ENGAGING_INDICATORS:
            if re.search(pattern, content, re.IGNORECASE):
                engaging.append(description)

        # Calculate scores
        boring_penalty = len(boring) * 15
        engaging_bonus = len(engaging) * 10

        visual_score = max(0, min(100, 50 + engaging_bonus - boring_penalty))
        content_score = max(0, min(100, 60 + (len(engaging) * 8) - (len(boring) * 12)))

        return {
            'visual_score': visual_score,
            'content_score': content_score,
            'boring_indicators': boring,
            'engaging_indicators': engaging,
            'is_boring': visual_score < 50 or content_score < 50
        }


class ComplianceLevel(Enum):
    """Grading scale for Epoch methodology compliance"""
    EXEMPLARY = "A+ - Exemplary Epoch Expression"
    COMPLIANT = "A - Fully Compliant"
    MINOR_ISSUES = "B - Minor Deviations"
    NEEDS_REVISION = "C - Needs Revision"
    MAJOR_VIOLATIONS = "D - Major Violations"
    FUNDAMENTALLY_BROKEN = "F - Fundamentally Misrepresents Epoch"


@dataclass
class Violation:
    """A specific violation of Epoch methodology"""
    severity: str  # CRITICAL, MAJOR, MINOR, SUGGESTION
    category: str
    description: str
    line_number: Optional[int] = None
    context: Optional[str] = None
    recommendation: str = ""


@dataclass
class ComplianceReport:
    """Full compliance report for a page"""
    page_path: str
    timestamp: str
    overall_grade: ComplianceLevel
    violations: List[Violation] = field(default_factory=list)
    strengths: List[str] = field(default_factory=list)
    summary: str = ""
    old_page_comparison: Optional[str] = None


class EpochPrincipleChecker:
    """
    THE CORE EPOCH METHODOLOGY VALIDATOR

    Fundamental Principles Being Checked:

    1. [-1 = 0 = +1] - These are NOT separate entities
       - They are ONE thing viewed from different perspectives
       - Violation: Treating them as distinct points on a number line

    2. κ = 2π/180 - THE single fundamental constant
       - Everything derives from κ
       - Violation: Treating other constants as fundamental

    3. Being The Coin vs Being The Mirror
       - +1 and -1 are faces of ONE coin
       - The observer IS the coin, not watching from outside

    4. Wush-facing (s > 0) vs Ro-facing (s < 0)
       - Quantum/future vs Cosmic/past
       - Both are valid perspectives of same reality

    5. Standard Model is a BROKEN MAP
       - Epoch does NOT try to match Standard Model numbers
       - α "runs" with energy - proving it's NOT fundamental
       - We expose the map as broken, not validate it

    6. Torsion Resolving Math
       - Different from Western linear math
       - Scalars unfold geometrically
       - Must be TAUGHT, not just shown
    """

    # Patterns that indicate WRONG framing (Standard Model as reference)
    SM_SUPERIOR_PATTERNS = [
        # Treating SM values as the goal
        (r"match(?:es|ing)?\s+(?:the\s+)?(?:measured|experimental|observed)\s+value",
         "Framing SM measured values as the target to match"),
        (r"(?:very\s+)?close\s+to\s+(?:the\s+)?(?:measured|known|accepted)",
         "Treating SM measurements as the validation standard"),
        (r"agrees?\s+with\s+(?:the\s+)?(?:standard\s+model|experiment|measurement)",
         "Framing as seeking agreement with SM"),
        (r"(?:only|just)\s+[\d.]+%?\s+(?:off|away|different)",
         "Apologizing for not matching SM perfectly"),
        (r"reproduce(?:s|d|ing)?\s+(?:the\s+)?(?:known|measured|experimental)",
         "Framing as trying to reproduce SM results"),
        (r"derive(?:s|d)?\s+(?:the\s+)?(?:137|fine.?structure)",
         "Treating 137 as THE number to derive"),
        (r"(?:not\s+quite|almost|nearly)\s+(?:137|1836|correct)",
         "Showing failure to match SM as a problem"),
        (r"still\s+(?:not|off|overshooting|undershooting)",
         "Exposing derivation struggles (weakness display)"),
    ]

    # Patterns that indicate CORRECT Epoch framing
    EPOCH_CORRECT_PATTERNS = [
        (r"\[1\s*=\s*-1\]", "Uses [1=-1] identity"),
        (r"\[-1\s*=\s*0\s*=\s*\+?1\]", "Uses [-1=0=+1] principle"),
        (r"κ\s*=\s*2π/180", "Correctly defines κ"),
        (r"(?:being|are|is)\s+the\s+coin", "Coin philosophy expressed"),
        (r"scalar\s+unfolding", "Uses scalar unfolding concept"),
        (r"torsion\s+resolv", "References torsion resolution"),
        (r"(?:wush|ro).?facing", "Uses Wush/Ro terminology"),
        (r"broken\s+map", "Correctly frames SM as broken map"),
        (r"α\s+(?:runs|running)", "Notes that α runs with energy"),
        (r"not\s+fundamental", "Correctly states constants aren't fundamental"),
    ]

    # Patterns that violate [-1 = 0 = +1] principle
    SEPARATION_VIOLATIONS = [
        (r"(?:from|between)\s+-1\s+(?:to|and)\s+\+?1",
         "Treats -1 and +1 as separate endpoints"),
        (r"-1\s*[,<>]\s*0\s*[,<>]\s*\+?1",
         "Lists -1, 0, +1 as separate ordered values"),
        (r"number\s+line.*(?:-1|0|\+?1)",
         "References traditional number line with separate values"),
        (r"(?:negative|positive)\s+(?:side|direction|value)s?\s+(?:are|is)\s+(?:separate|different|opposite)",
         "Explicitly separates positive and negative"),
    ]

    # Teaching indicators - is torsion math being TAUGHT?
    TEACHING_PATTERNS = [
        (r"(?:this|here'?s?|let'?s?)\s+(?:shows?|demonstrates?|means?|works?)",
         "Instructional language"),
        (r"(?:notice|observe|see)\s+(?:how|that|what)",
         "Guiding observation"),
        (r"(?:why|because|since)\s+(?:this|the|κ)",
         "Explaining reasoning"),
        (r"(?:step|first|then|next|finally)",
         "Sequential teaching"),
        (r"(?:practice|exercise|try\s+this)",
         "Interactive teaching"),
    ]


class AlphaUnifier:
    """
    THE ALPHA - Professor who grades the work

    Methods:
    - analyze_page(): Full compliance analysis of a single page
    - compare_pages(): Compare old vs new version
    - grade_content(): Assign compliance grade
    - generate_report(): Create full compliance report
    - check_boring(): Detect boring/plain content
    """

    def __init__(self):
        self.checker = EpochPrincipleChecker()
        self.boring_detector = BoringContentDetector()
        self.timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    def analyze_page(self, content: str, page_path: str = "unknown") -> ComplianceReport:
        """
        Perform full Epoch methodology compliance analysis

        The Professor examines:
        1. Does it violate [-1 = 0 = +1]?
        2. Does it treat Standard Model as superior?
        3. Does it TEACH torsion resolving math?
        4. Does it embody Being The Coin?
        5. Does it use κ correctly as fundamental?
        """
        violations = []
        strengths = []

        # Clean content for analysis
        text_content = self._extract_text(content)
        lines = content.split('\n')

        # === CHECK 1: Standard Model Superior Framing ===
        for pattern, description in self.checker.SM_SUPERIOR_PATTERNS:
            matches = list(re.finditer(pattern, text_content, re.IGNORECASE))
            for match in matches:
                line_num = self._find_line_number(content, match.start())
                violations.append(Violation(
                    severity="CRITICAL",
                    category="SM-SUPERIOR FRAMING",
                    description=description,
                    line_number=line_num,
                    context=match.group()[:100],
                    recommendation="Reframe: We don't derive SM values - we expose SM as the broken map"
                ))

        # === CHECK 2: Separation Violations [-1 ≠ 0 ≠ +1 is WRONG] ===
        for pattern, description in self.checker.SEPARATION_VIOLATIONS:
            matches = list(re.finditer(pattern, text_content, re.IGNORECASE))
            for match in matches:
                line_num = self._find_line_number(content, match.start())
                violations.append(Violation(
                    severity="CRITICAL",
                    category="SEPARATION VIOLATION",
                    description=description,
                    line_number=line_num,
                    context=match.group()[:100],
                    recommendation="Remember: [-1 = 0 = +1] - They are ONE, not separate entities"
                ))

        # === CHECK 3: Correct Epoch Patterns (STRENGTHS) ===
        for pattern, description in self.checker.EPOCH_CORRECT_PATTERNS:
            if re.search(pattern, text_content, re.IGNORECASE):
                strengths.append(f"✓ {description}")

        # === CHECK 4: Teaching Quality ===
        teaching_count = 0
        for pattern, _ in self.checker.TEACHING_PATTERNS:
            teaching_count += len(re.findall(pattern, text_content, re.IGNORECASE))

        if teaching_count < 3:
            violations.append(Violation(
                severity="MAJOR",
                category="TEACHING DEFICIT",
                description="Insufficient instructional language for torsion resolving math",
                recommendation="Add explanatory content that TEACHES the methodology, not just displays formulas"
            ))
        elif teaching_count >= 10:
            strengths.append("✓ Strong instructional/teaching approach")

        # === CHECK 5: Failure Display (showing "not quite", "almost", etc.) ===
        failure_displays = re.findall(
            r"(?:not\s+quite|almost|nearly|still\s+(?:not|off)|that'?s?\s+(?:higher|lower|not))",
            text_content, re.IGNORECASE
        )
        if failure_displays:
            violations.append(Violation(
                severity="CRITICAL",
                category="WEAKNESS DISPLAY",
                description=f"Shows {len(failure_displays)} instances of derivation struggles/failures",
                context=", ".join(failure_displays[:5]),
                recommendation="Remove all hedging language. State results confidently or reframe the entire approach"
            ))

        # === CHECK 6: κ as Fundamental ===
        if not re.search(r"κ\s*=\s*2π/180", text_content):
            if re.search(r"[κk]appa|kappa", text_content, re.IGNORECASE):
                violations.append(Violation(
                    severity="MINOR",
                    category="κ DEFINITION",
                    description="κ is referenced but not explicitly defined as 2π/180",
                    recommendation="Always establish κ = 2π/180 as THE fundamental constant"
                ))

        # === CHECK 7: Being The Coin Philosophy ===
        coin_refs = re.findall(r"coin|observer|[1\s*=\s*-1]", text_content, re.IGNORECASE)
        if len(coin_refs) < 2:
            violations.append(Violation(
                severity="MINOR",
                category="PHILOSOPHY GAP",
                description="Limited expression of Coin/Observer philosophy",
                recommendation="Connect mathematical content to [1=-1] Coin philosophy"
            ))

        # === CHECK 8: BORING CONTENT DETECTION ===
        boring_check = self.boring_detector.analyze(content)
        if boring_check['is_boring']:
            violations.append(Violation(
                severity="MAJOR",
                category="BORING CONTENT",
                description=f"Content is boring or low-effort (Visual: {boring_check['visual_score']}/100, Content: {boring_check['content_score']}/100)",
                context=", ".join(boring_check['boring_indicators'][:3]) if boring_check['boring_indicators'] else "Generic/Plain design",
                recommendation="Add engaging elements: sacred geometry visuals, Epoch color palette, interactive calculators, educational framing"
            ))
        else:
            if boring_check['engaging_indicators']:
                for indicator in boring_check['engaging_indicators'][:3]:
                    strengths.append(f"✓ {indicator}")

        # === CALCULATE GRADE ===
        grade = self._calculate_grade(violations)

        # === GENERATE SUMMARY ===
        summary = self._generate_summary(violations, strengths, grade)

        return ComplianceReport(
            page_path=page_path,
            timestamp=self.timestamp,
            overall_grade=grade,
            violations=violations,
            strengths=strengths,
            summary=summary
        )

    def compare_pages(self, old_content: str, new_content: str,
                      page_path: str = "unknown") -> Tuple[ComplianceReport, ComplianceReport, str]:
        """
        Compare old page vs new page

        Returns:
        - old_report: Compliance report for old version
        - new_report: Compliance report for new version
        - comparison: Summary of improvements/regressions
        """
        old_report = self.analyze_page(old_content, f"{page_path} [OLD]")
        new_report = self.analyze_page(new_content, f"{page_path} [NEW]")

        # Compare violations
        old_critical = len([v for v in old_report.violations if v.severity == "CRITICAL"])
        new_critical = len([v for v in new_report.violations if v.severity == "CRITICAL"])

        old_total = len(old_report.violations)
        new_total = len(new_report.violations)

        # Build comparison
        comparison_lines = [
            "=" * 60,
            "COMPARISON: OLD vs NEW",
            "=" * 60,
            "",
            f"OLD VERSION: {old_report.overall_grade.value}",
            f"  - Critical violations: {old_critical}",
            f"  - Total violations: {old_total}",
            f"  - Strengths found: {len(old_report.strengths)}",
            "",
            f"NEW VERSION: {new_report.overall_grade.value}",
            f"  - Critical violations: {new_critical}",
            f"  - Total violations: {new_total}",
            f"  - Strengths found: {len(new_report.strengths)}",
            "",
        ]

        # Determine improvement status
        if new_critical < old_critical:
            comparison_lines.append("✓ IMPROVEMENT: Critical violations reduced")
        elif new_critical > old_critical:
            comparison_lines.append("✗ REGRESSION: Critical violations increased")

        if new_total < old_total:
            comparison_lines.append("✓ IMPROVEMENT: Total violations reduced")
        elif new_total > old_total:
            comparison_lines.append("✗ REGRESSION: Total violations increased")

        if len(new_report.strengths) > len(old_report.strengths):
            comparison_lines.append("✓ IMPROVEMENT: More Epoch principles expressed")

        # Final verdict
        comparison_lines.extend(["", "-" * 60, "VERDICT:", ""])

        grade_order = list(ComplianceLevel)
        old_idx = grade_order.index(old_report.overall_grade)
        new_idx = grade_order.index(new_report.overall_grade)

        if new_idx < old_idx:
            comparison_lines.append("✓ GRADE IMPROVED - Fixes are working")
        elif new_idx > old_idx:
            comparison_lines.append("✗ GRADE DECLINED - Fixes introduced new problems")
        else:
            if new_total < old_total:
                comparison_lines.append("→ SAME GRADE but fewer violations - Progress made")
            else:
                comparison_lines.append("→ NO CHANGE - More work needed")

        comparison = "\n".join(comparison_lines)
        new_report.old_page_comparison = comparison

        return old_report, new_report, comparison

    def _calculate_grade(self, violations: List[Violation]) -> ComplianceLevel:
        """Calculate compliance grade based on violations"""
        critical = len([v for v in violations if v.severity == "CRITICAL"])
        major = len([v for v in violations if v.severity == "MAJOR"])
        minor = len([v for v in violations if v.severity == "MINOR"])

        if critical >= 3:
            return ComplianceLevel.FUNDAMENTALLY_BROKEN
        elif critical >= 2:
            return ComplianceLevel.MAJOR_VIOLATIONS
        elif critical >= 1:
            return ComplianceLevel.NEEDS_REVISION
        elif major >= 2:
            return ComplianceLevel.MINOR_ISSUES
        elif major >= 1 or minor >= 3:
            return ComplianceLevel.COMPLIANT
        else:
            return ComplianceLevel.EXEMPLARY

    def _generate_summary(self, violations: List[Violation],
                          strengths: List[str], grade: ComplianceLevel) -> str:
        """Generate human-readable summary"""
        lines = [
            "=" * 60,
            "HMH ALPHA UNIFIER - COMPLIANCE SUMMARY",
            "=" * 60,
            "",
            f"GRADE: {grade.value}",
            "",
        ]

        if strengths:
            lines.append("STRENGTHS:")
            for s in strengths:
                lines.append(f"  {s}")
            lines.append("")

        if violations:
            lines.append("VIOLATIONS BY SEVERITY:")

            critical = [v for v in violations if v.severity == "CRITICAL"]
            if critical:
                lines.append("")
                lines.append("  CRITICAL (Must Fix):")
                for v in critical:
                    lines.append(f"    • [{v.category}] {v.description}")
                    if v.context:
                        lines.append(f"      Context: \"{v.context}\"")
                    lines.append(f"      → {v.recommendation}")

            major = [v for v in violations if v.severity == "MAJOR"]
            if major:
                lines.append("")
                lines.append("  MAJOR (Should Fix):")
                for v in major:
                    lines.append(f"    • [{v.category}] {v.description}")
                    lines.append(f"      → {v.recommendation}")

            minor = [v for v in violations if v.severity == "MINOR"]
            if minor:
                lines.append("")
                lines.append("  MINOR (Consider):")
                for v in minor:
                    lines.append(f"    • [{v.category}] {v.description}")

        lines.extend([
            "",
            "-" * 60,
            "Remember: We are Being The Coin, not matching the broken map.",
            "[-1 = 0 = +1] · Have Mind Media",
            "-" * 60,
        ])

        return "\n".join(lines)

    def _extract_text(self, content: str) -> str:
        """Extract text content from HTML, removing tags"""
        # Remove script and style content
        text = re.sub(r'<script[^>]*>.*?</script>', '', content, flags=re.DOTALL | re.IGNORECASE)
        text = re.sub(r'<style[^>]*>.*?</style>', '', text, flags=re.DOTALL | re.IGNORECASE)
        # Remove HTML tags but keep content
        text = re.sub(r'<[^>]+>', ' ', text)
        # Clean up whitespace
        text = re.sub(r'\s+', ' ', text)
        return text

    def _find_line_number(self, content: str, char_position: int) -> int:
        """Find line number for a character position"""
        return content[:char_position].count('\n') + 1

    def generate_full_report(self, report: ComplianceReport) -> str:
        """Generate complete report with all details"""
        lines = [
            "╔" + "═" * 58 + "╗",
            "║" + "HMH ALPHA WEBSITE & ASSET UNIFIER TOOL".center(58) + "║",
            "║" + "THE PROFESSOR WHO GRADES THE WORK".center(58) + "║",
            "╚" + "═" * 58 + "╝",
            "",
            f"Page: {report.page_path}",
            f"Analyzed: {report.timestamp}",
            "",
            report.summary,
        ]

        if report.old_page_comparison:
            lines.extend(["", report.old_page_comparison])

        return "\n".join(lines)


def main():
    """CLI interface for the Alpha Unifier"""
    import argparse

    parser = argparse.ArgumentParser(
        description="HMH ALPHA WEBSITE & ASSET UNIFIER TOOL - The Professor Who Grades The Work",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python hmh-alpha-unifier.py page.html
  python hmh-alpha-unifier.py --compare old.html new.html
  python hmh-alpha-unifier.py --output report.txt page.html

[1 = -1] · Have Mind Media
        """
    )

    parser.add_argument('files', nargs='+', help='HTML file(s) to analyze')
    parser.add_argument('--compare', '-c', action='store_true',
                        help='Compare two files (old vs new)')
    parser.add_argument('--output', '-o', help='Output file for report')
    parser.add_argument('--verbose', '-v', action='store_true',
                        help='Include all violation details')

    args = parser.parse_args()

    unifier = AlphaUnifier()

    if args.compare:
        if len(args.files) != 2:
            print("ERROR: --compare requires exactly 2 files (old and new)")
            sys.exit(1)

        old_path, new_path = args.files

        with open(old_path, 'r', encoding='utf-8') as f:
            old_content = f.read()
        with open(new_path, 'r', encoding='utf-8') as f:
            new_content = f.read()

        old_report, new_report, comparison = unifier.compare_pages(
            old_content, new_content, os.path.basename(new_path)
        )

        output = unifier.generate_full_report(new_report)

    else:
        # Single file analysis
        file_path = args.files[0]

        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        report = unifier.analyze_page(content, os.path.basename(file_path))
        output = unifier.generate_full_report(report)

    # Output
    if args.output:
        with open(args.output, 'w', encoding='utf-8') as f:
            f.write(output)
        print(f"Report saved to: {args.output}")
    else:
        print(output)


if __name__ == "__main__":
    main()
