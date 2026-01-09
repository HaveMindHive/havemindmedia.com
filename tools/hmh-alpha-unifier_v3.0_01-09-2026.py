#!/usr/bin/env python3
"""
HMH ALPHA WEBSITE & ASSET UNIFIER TOOL
Version: 3.0
Date: January 9, 2026

THE PROFESSOR WHO GRADES THE WORK
The last line of defense before deployment.

ALPHA v3.0 IMPROVEMENTS (from Thread Report Analysis):
- User Direction Checking: Did Claude make changes user didn't ask for?
- Navigation Structure Grading: Are menus properly labeled and structured?
- Overengineering Detection: Did Claude add unnecessary complexity?
- Unauthorized Change Detection: Compares to previous state
- Better Teaching Quality Metrics
- Claude Self-Improvement Recommendations

"The SHIVA and OMEGA tools are students making the group project.
 The ALPHA tool is the professor who grades the work."

This tool applies Epoch methodology to evaluate website content:
- Compares old page vs new page
- Verifies compliance with [1 = -1] framework
- Detects Standard Model-superior framing violations
- Ensures torsion resolving math is taught correctly
- Grades content as compliant or non-compliant
- Validates navigation structure and user direction compliance
- Provides specific Claude improvement recommendations

[1 = -1] · Have Mind Media · January 9, 2026
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
# COMPLIANCE LEVELS AND STRUCTURES
# ═══════════════════════════════════════════════════════════════════════════════

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
    claude_learning: str = ""  # NEW: What should Claude learn from this?


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
    claude_recommendations: List[str] = field(default_factory=list)  # NEW


# ═══════════════════════════════════════════════════════════════════════════════
# EPOCH PRINCIPLE CHECKER
# ═══════════════════════════════════════════════════════════════════════════════

class EpochPrincipleChecker:
    """
    THE CORE EPOCH METHODOLOGY VALIDATOR

    Fundamental Principles Being Checked:

    1. [-1 = 0 = +1] - These are NOT separate entities
    2. κ = 2π/180 - THE single fundamental constant
    3. Being The Coin vs Being The Mirror
    4. Standard Model is a BROKEN MAP
    5. Torsion Resolving Math must be TAUGHT
    """

    # Patterns that indicate WRONG framing
    SM_SUPERIOR_PATTERNS = [
        (r"match(?:es|ing)?\s+(?:the\s+)?(?:measured|experimental)\s+value",
         "Framing SM measured values as the target"),
        (r"(?:very\s+)?close\s+to\s+(?:the\s+)?(?:measured|known)",
         "Treating SM measurements as validation standard"),
        (r"(?:only|just)\s+[\d.]+%?\s+(?:off|away|different)",
         "Apologizing for not matching SM"),
        (r"still\s+(?:not|off|overshooting)",
         "Exposing derivation struggles"),
    ]

    # Patterns that indicate CORRECT framing
    EPOCH_CORRECT_PATTERNS = [
        (r"\[1\s*=\s*-1\]", "Uses [1=-1] identity"),
        (r"\[-1\s*=\s*0\s*=\s*\+?1\]", "Uses [-1=0=+1] principle"),
        (r"κ\s*=\s*2π/180", "Correctly defines κ"),
        (r"(?:being|are|is)\s+the\s+coin", "Coin philosophy expressed"),
        (r"broken\s+map", "Correctly frames SM as broken map"),
    ]

    # Separation violations
    SEPARATION_VIOLATIONS = [
        (r"(?:from|between)\s+-1\s+(?:to|and)\s+\+?1",
         "Treats -1 and +1 as separate endpoints"),
        (r"-1\s*[,<>]\s*0\s*[,<>]\s*\+?1",
         "Lists -1, 0, +1 as separate ordered values"),
    ]

    # Teaching indicators
    TEACHING_PATTERNS = [
        (r"(?:this|here'?s?|let'?s?)\s+(?:shows?|demonstrates?|means?)", "Instructional"),
        (r"(?:notice|observe|see)\s+(?:how|that)", "Guiding observation"),
        (r"(?:why|because|since)\s+(?:this|the|κ)", "Explaining reasoning"),
        (r"(?:step|first|then|next|finally)", "Sequential teaching"),
    ]

    # Navigation quality patterns (NEW in v3.0)
    NAVIGATION_PATTERNS = [
        (r'EXPLORE', "Has EXPLORE section"),
        (r'>[A-Za-z][A-Za-z\s]{2,20}<', "Has text labels"),
        (r'title="[^"]+"\s*>', "Has hover titles"),
    ]

    # Overengineering patterns (NEW in v3.0)
    OVERENGINEERING_PATTERNS = [
        (r'(?:cryptic|unclear)\s+symbol', "Cryptic symbols without explanation"),
        (r'too\s+(?:much|many|complex)', "Excessive complexity"),
        (r'confusing|doesn\'t\s+make\s+sense', "Confusing implementation"),
    ]


# ═══════════════════════════════════════════════════════════════════════════════
# ALPHA UNIFIER MAIN CLASS
# ═══════════════════════════════════════════════════════════════════════════════

class AlphaUnifier:
    """
    THE ALPHA v3.0 - Professor who grades the work

    NEW in v3.0:
    - Navigation structure grading
    - User direction compliance checking
    - Overengineering detection
    - Claude self-improvement recommendations
    """

    VERSION = "3.0"

    def __init__(self):
        self.checker = EpochPrincipleChecker()
        self.timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    def analyze_page(self, content: str, page_path: str = "unknown") -> ComplianceReport:
        """Perform full Epoch methodology compliance analysis"""

        violations = []
        strengths = []
        claude_recommendations = []

        text_content = self._extract_text(content)

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
                    recommendation="Reframe: We don't derive SM values - we expose SM as broken map",
                    claude_learning="Never position Epoch as seeking validation from Standard Model"
                ))

        # === CHECK 2: Separation Violations ===
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
                    recommendation="[-1 = 0 = +1] - They are ONE, not separate",
                    claude_learning="Always represent -1, 0, +1 as ONE unified thing"
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
                description="Insufficient instructional language",
                recommendation="Add explanatory content that TEACHES, not just displays",
                claude_learning="Always explain WHY, not just WHAT"
            ))
        elif teaching_count >= 10:
            strengths.append("✓ Strong instructional/teaching approach")

        # === CHECK 5: Failure Display ===
        failure_displays = re.findall(
            r"(?:not\s+quite|almost|nearly|still\s+(?:not|off))",
            text_content, re.IGNORECASE
        )
        if failure_displays:
            violations.append(Violation(
                severity="CRITICAL",
                category="WEAKNESS DISPLAY",
                description=f"Shows {len(failure_displays)} derivation struggles/failures",
                context=", ".join(failure_displays[:5]),
                recommendation="Remove hedging. State results confidently.",
                claude_learning="Never show uncertainty in derivations publicly"
            ))

        # === CHECK 6: Navigation Quality (NEW in v3.0) ===
        if 'site-header' in page_path.lower() or 'navigation' in page_path.lower():
            nav_score = 0
            for pattern, description in self.checker.NAVIGATION_PATTERNS:
                if re.search(pattern, content, re.IGNORECASE):
                    nav_score += 1
                    strengths.append(f"✓ Navigation: {description}")

            if nav_score < 2:
                violations.append(Violation(
                    severity="MAJOR",
                    category="NAVIGATION",
                    description="Navigation lacks proper labels or structure",
                    recommendation="Add EXPLORE section and text labels for all nav items",
                    claude_learning="Navigation must have READABLE labels, not just symbols"
                ))

        # === CHECK 7: Overengineering (NEW in v3.0) ===
        for pattern, description in self.checker.OVERENGINEERING_PATTERNS:
            if re.search(pattern, text_content, re.IGNORECASE):
                violations.append(Violation(
                    severity="MAJOR",
                    category="OVERENGINEERING",
                    description=description,
                    recommendation="Simplify - don't add complexity user didn't request",
                    claude_learning="Only make changes explicitly requested by user"
                ))

        # === GENERATE CLAUDE RECOMMENDATIONS ===
        for v in violations:
            if v.claude_learning:
                claude_recommendations.append(v.claude_learning)

        # Remove duplicates
        claude_recommendations = list(set(claude_recommendations))

        # === CALCULATE GRADE ===
        grade = self._calculate_grade(violations)

        # === GENERATE SUMMARY ===
        summary = self._generate_summary(violations, strengths, grade, claude_recommendations)

        return ComplianceReport(
            page_path=page_path,
            timestamp=self.timestamp,
            overall_grade=grade,
            violations=violations,
            strengths=strengths,
            summary=summary,
            claude_recommendations=claude_recommendations
        )

    def check_user_direction(self, user_request: str, changes_made: List[str]) -> List[Violation]:
        """
        NEW in v3.0: Check if Claude made unauthorized changes

        This checks if the changes made align with what the user actually requested.
        """
        violations = []

        # Keywords from user request
        request_keywords = set(re.findall(r'\b([a-z]{4,})\b', user_request.lower()))

        # Check each change
        for change in changes_made:
            change_keywords = set(re.findall(r'\b([a-z]{4,})\b', change.lower()))

            # If no overlap with user request, might be unauthorized
            overlap = request_keywords & change_keywords
            if not overlap and len(change) > 20:
                violations.append(Violation(
                    severity="MAJOR",
                    category="UNAUTHORIZED CHANGE",
                    description=f"Change not aligned with user request: {change[:50]}...",
                    recommendation="Only make changes user explicitly requested",
                    claude_learning="Don't proactively change things without asking user first"
                ))

        return violations

    def compare_pages(self, old_content: str, new_content: str,
                      page_path: str = "unknown") -> Tuple[ComplianceReport, ComplianceReport, str]:
        """Compare old page vs new page"""

        old_report = self.analyze_page(old_content, f"{page_path} [OLD]")
        new_report = self.analyze_page(new_content, f"{page_path} [NEW]")

        old_critical = len([v for v in old_report.violations if v.severity == "CRITICAL"])
        new_critical = len([v for v in new_report.violations if v.severity == "CRITICAL"])

        old_total = len(old_report.violations)
        new_total = len(new_report.violations)

        comparison_lines = [
            "=" * 60,
            "COMPARISON: OLD vs NEW",
            "=" * 60,
            "",
            f"OLD VERSION: {old_report.overall_grade.value}",
            f"  - Critical violations: {old_critical}",
            f"  - Total violations: {old_total}",
            f"  - Strengths: {len(old_report.strengths)}",
            "",
            f"NEW VERSION: {new_report.overall_grade.value}",
            f"  - Critical violations: {new_critical}",
            f"  - Total violations: {new_total}",
            f"  - Strengths: {len(new_report.strengths)}",
            "",
        ]

        if new_critical < old_critical:
            comparison_lines.append("✓ IMPROVEMENT: Critical violations reduced")
        elif new_critical > old_critical:
            comparison_lines.append("✗ REGRESSION: Critical violations increased")

        # Claude Learning Section
        comparison_lines.extend([
            "",
            "-" * 60,
            "CLAUDE LEARNING POINTS:",
            ""
        ])

        for rec in new_report.claude_recommendations[:5]:
            comparison_lines.append(f"  → {rec}")

        comparison = "\n".join(comparison_lines)
        new_report.old_page_comparison = comparison

        return old_report, new_report, comparison

    def _calculate_grade(self, violations: List[Violation]) -> ComplianceLevel:
        """Calculate compliance grade"""
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

    def _generate_summary(self, violations: List[Violation], strengths: List[str],
                          grade: ComplianceLevel, claude_recs: List[str]) -> str:
        """Generate human-readable summary"""
        lines = [
            "=" * 60,
            f"HMH ALPHA UNIFIER v{self.VERSION} - COMPLIANCE SUMMARY",
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
                lines.append("\n  CRITICAL (Must Fix):")
                for v in critical:
                    lines.append(f"    • [{v.category}] {v.description}")
                    if v.context:
                        lines.append(f"      Context: \"{v.context[:60]}...\"")
                    lines.append(f"      → {v.recommendation}")

            major = [v for v in violations if v.severity == "MAJOR"]
            if major:
                lines.append("\n  MAJOR (Should Fix):")
                for v in major:
                    lines.append(f"    • [{v.category}] {v.description}")
                    lines.append(f"      → {v.recommendation}")

        # Claude Learning Section (NEW in v3.0)
        if claude_recs:
            lines.extend([
                "",
                "-" * 60,
                "CLAUDE SELF-IMPROVEMENT NOTES:",
                "(Apply these learnings to future work)",
                ""
            ])
            for i, rec in enumerate(claude_recs[:5], 1):
                lines.append(f"  {i}. {rec}")

        lines.extend([
            "",
            "-" * 60,
            "Remember: Only make changes user explicitly requests.",
            "[-1 = 0 = +1] · Have Mind Media",
            "-" * 60,
        ])

        return "\n".join(lines)

    def _extract_text(self, content: str) -> str:
        """Extract text content from HTML"""
        text = re.sub(r'<script[^>]*>.*?</script>', '', content, flags=re.DOTALL | re.IGNORECASE)
        text = re.sub(r'<style[^>]*>.*?</style>', '', text, flags=re.DOTALL | re.IGNORECASE)
        text = re.sub(r'<[^>]+>', ' ', text)
        text = re.sub(r'\s+', ' ', text)
        return text

    def _find_line_number(self, content: str, char_position: int) -> int:
        """Find line number for a character position"""
        return content[:char_position].count('\n') + 1

    def generate_full_report(self, report: ComplianceReport) -> str:
        """Generate complete report"""
        lines = [
            "╔" + "═" * 58 + "╗",
            "║" + f"HMH ALPHA UNIFIER TOOL v{self.VERSION}".center(58) + "║",
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


# ═══════════════════════════════════════════════════════════════════════════════
# CLI
# ═══════════════════════════════════════════════════════════════════════════════

def main():
    import argparse

    parser = argparse.ArgumentParser(
        description=f"HMH ALPHA UNIFIER v3.0 - The Professor Who Grades The Work",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python hmh-alpha-unifier_v3.0.py page.html
  python hmh-alpha-unifier_v3.0.py --compare old.html new.html
  python hmh-alpha-unifier_v3.0.py --nav site-header.js

[1 = -1] · Have Mind Media
        """
    )

    parser.add_argument('files', nargs='+', help='File(s) to analyze')
    parser.add_argument('--compare', '-c', action='store_true', help='Compare two files')
    parser.add_argument('--nav', action='store_true', help='Navigation-specific analysis')
    parser.add_argument('--output', '-o', help='Output file for report')

    args = parser.parse_args()

    unifier = AlphaUnifier()

    if args.compare:
        if len(args.files) != 2:
            print("ERROR: --compare requires exactly 2 files")
            sys.exit(1)

        with open(args.files[0], 'r', encoding='utf-8') as f:
            old_content = f.read()
        with open(args.files[1], 'r', encoding='utf-8') as f:
            new_content = f.read()

        _, new_report, _ = unifier.compare_pages(old_content, new_content, args.files[1])
        output = unifier.generate_full_report(new_report)

    else:
        file_path = args.files[0]

        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        report = unifier.analyze_page(content, os.path.basename(file_path))
        output = unifier.generate_full_report(report)

    if args.output:
        with open(args.output, 'w', encoding='utf-8') as f:
            f.write(output)
        print(f"Report saved to: {args.output}")
    else:
        print(output)


if __name__ == "__main__":
    main()
