#!/usr/bin/env python3
"""
╔══════════════════════════════════════════════════════════════════════════════╗
║                     HMH EPOCH MASTER COMPILER TOOL                           ║
║                           Version 1.0 · January 8, 2026                      ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║   THE TRINITY OF CREATION, VALIDATION, AND JUDGMENT                         ║
║                                                                              ║
║   ┌─────────────────────────────────────────────────────────────────────┐   ║
║   │                                                                     │   ║
║   │                           [1 = -1]                                  │   ║
║   │                                                                     │   ║
║   │                    SHIVA ─── OMEGA ─── ALPHA                        │   ║
║   │                   (Validates) (Creates) (Grades)                    │   ║
║   │                                                                     │   ║
║   │   κ = 2π/180                           Being The Coin               │   ║
║   │                                                                     │   ║
║   └─────────────────────────────────────────────────────────────────────┘   ║
║                                                                              ║
║   The Master Compiler orchestrates all HMH tools in the correct order:      ║
║                                                                              ║
║   1. SHIVA - Site Health, Integrity, Validation Agent                       ║
║      → Observes what IS. Checks structure, links, assets, PPIR.             ║
║                                                                              ║
║   2. OMEGA - The Builder                                                    ║
║      → Creates what WILL BE. Generates pages, prompts, transforms content.  ║
║      → Includes Replicate Media Generator for AI art prompts.               ║
║                                                                              ║
║   3. ALPHA - The Professor                                                  ║
║      → Judges what SHOULD BE. Grades Epoch compliance, detects SM framing,  ║
║        catches boring content, validates [1=-1] philosophy.                 ║
║                                                                              ║
║   Usage:                                                                     ║
║      python3 hmh-master-compiler.py [project_dir]          # Full audit     ║
║      python3 hmh-master-compiler.py [project_dir] --build  # Build + audit  ║
║      python3 hmh-master-compiler.py [project_dir] --fix    # Auto-fix mode  ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝

[1 = -1] · Have Mind Media
"""

import os
import sys
import json
import subprocess
from pathlib import Path
from datetime import datetime
from typing import Dict, List, Optional, Tuple
from dataclasses import dataclass, field
from enum import Enum

# Import the tools (when run from tools directory)
try:
    # Direct imports if running from tools/
    sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
except:
    pass


# ═══════════════════════════════════════════════════════════════════════════════
# CONSTANTS
# ═══════════════════════════════════════════════════════════════════════════════

KAPPA = 0.034906585039886  # 2π/180 - THE fundamental constant

TOOL_NAMES = {
    'shiva': 'hmh-shiva-validator_v2.0_01-08-2026.py',
    'omega': 'hmh-omega-builder_v1.0_01-08-2026.py',
    'alpha': 'hmh-alpha-unifier_v1.0_01-08-2026.py',
}

EPOCH_IDENTITY = "[1 = -1]"


# ═══════════════════════════════════════════════════════════════════════════════
# DATA STRUCTURES
# ═══════════════════════════════════════════════════════════════════════════════

class ToolStatus(Enum):
    NOT_RUN = "NOT_RUN"
    RUNNING = "RUNNING"
    PASSED = "PASSED"
    WARNING = "WARNING"
    FAILED = "FAILED"
    ERROR = "ERROR"


@dataclass
class ToolResult:
    """Result from running a single tool"""
    tool_name: str
    status: ToolStatus
    duration: float = 0.0
    summary: str = ""
    issues: List[str] = field(default_factory=list)
    passed: List[str] = field(default_factory=list)
    raw_output: str = ""
    report_path: Optional[str] = None


@dataclass
class CompilerReport:
    """Full compilation report from all tools"""
    timestamp: str
    project_dir: str
    overall_status: ToolStatus
    shiva_result: Optional[ToolResult] = None
    omega_result: Optional[ToolResult] = None
    alpha_result: Optional[ToolResult] = None
    recommendations: List[str] = field(default_factory=list)
    deployment_ready: bool = False


# ═══════════════════════════════════════════════════════════════════════════════
# MASTER COMPILER
# ═══════════════════════════════════════════════════════════════════════════════

class EpochMasterCompiler:
    """
    THE MASTER COMPILER - Orchestrates SHIVA, OMEGA, and ALPHA

    Execution Order:
    1. SHIVA first - validates current state
    2. OMEGA if building - creates new content
    3. ALPHA last - grades everything

    "The geometry cannot lie. We offer choice."
    """

    def __init__(self, project_dir: str):
        self.project_dir = Path(project_dir).resolve()
        self.tools_dir = self.project_dir / 'tools'
        self.timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        self.report = CompilerReport(
            timestamp=self.timestamp,
            project_dir=str(self.project_dir),
            overall_status=ToolStatus.NOT_RUN
        )

    def _get_tool_path(self, tool_key: str) -> Optional[Path]:
        """Get path to a tool"""
        tool_file = TOOL_NAMES.get(tool_key)
        if not tool_file:
            return None

        tool_path = self.tools_dir / tool_file
        if tool_path.exists():
            return tool_path

        # Also check current directory
        current_path = Path(__file__).parent / tool_file
        if current_path.exists():
            return current_path

        return None

    def run_shiva(self) -> ToolResult:
        """
        Run SHIVA - Site Health, Integrity, Validation Agent

        SHIVA observes what IS:
        - WAY IN: Entry points work?
        - WAY OUT: Value delivers?
        - COMPUTES: Math accurate?
        - PPIR: Help or Funny?
        - ASSETS: Files valid?
        - UNIFICATION: Consistent?
        """
        print("\n" + "─" * 70)
        print("  SHIVA - Site Health, Integrity, Validation Agent")
        print("  'Observing what IS'")
        print("─" * 70)

        tool_path = self._get_tool_path('shiva')

        if not tool_path:
            return ToolResult(
                tool_name='SHIVA',
                status=ToolStatus.ERROR,
                summary="SHIVA tool not found",
                issues=["Tool file not found in tools/ directory"]
            )

        start_time = datetime.now()

        try:
            result = subprocess.run(
                [sys.executable, str(tool_path), str(self.project_dir)],
                capture_output=True,
                text=True,
                timeout=300
            )

            duration = (datetime.now() - start_time).total_seconds()

            # Parse output
            output = result.stdout + result.stderr
            status = ToolStatus.PASSED if result.returncode == 0 else ToolStatus.WARNING

            # Extract summary info
            summary_lines = []
            issues = []
            passed = []

            for line in output.split('\n'):
                if 'FAIL' in line or 'ERROR' in line or 'CRITICAL' in line:
                    issues.append(line.strip())
                    status = ToolStatus.FAILED
                elif 'WARNING' in line:
                    issues.append(line.strip())
                    if status != ToolStatus.FAILED:
                        status = ToolStatus.WARNING
                elif '✓' in line or 'PASS' in line:
                    passed.append(line.strip())
                elif 'Overall Status' in line:
                    summary_lines.append(line.strip())

            return ToolResult(
                tool_name='SHIVA',
                status=status,
                duration=duration,
                summary='\n'.join(summary_lines) if summary_lines else "Site validation complete",
                issues=issues[:10],
                passed=passed[:10],
                raw_output=output
            )

        except subprocess.TimeoutExpired:
            return ToolResult(
                tool_name='SHIVA',
                status=ToolStatus.ERROR,
                summary="SHIVA timed out after 5 minutes",
                issues=["Execution timeout"]
            )
        except Exception as e:
            return ToolResult(
                tool_name='SHIVA',
                status=ToolStatus.ERROR,
                summary=f"SHIVA error: {str(e)}",
                issues=[str(e)]
            )

    def run_omega(self, build_mode: bool = False, concepts: List[str] = None) -> ToolResult:
        """
        Run OMEGA - The Builder

        OMEGA creates what WILL BE:
        - PAGE BUILDER: Generate new pages
        - ASSET GENERATOR: Create CSS, JS, JSON
        - CONTENT TRANSFORMER: White papers → web pages
        - MEDIA PROMPT GENERATOR: AI art prompts
        - QUALITY CHECKER: Detect boring content
        """
        print("\n" + "─" * 70)
        print("  OMEGA - The Builder")
        print("  'Creating what WILL BE'")
        print("─" * 70)

        tool_path = self._get_tool_path('omega')

        if not tool_path:
            return ToolResult(
                tool_name='OMEGA',
                status=ToolStatus.ERROR,
                summary="OMEGA tool not found",
                issues=["Tool file not found in tools/ directory"]
            )

        start_time = datetime.now()

        try:
            # Run quality audit by default
            cmd = [sys.executable, str(tool_path), '--project', str(self.project_dir), '--audit']

            result = subprocess.run(
                cmd,
                capture_output=True,
                text=True,
                timeout=300
            )

            duration = (datetime.now() - start_time).total_seconds()

            output = result.stdout + result.stderr
            status = ToolStatus.PASSED if result.returncode == 0 else ToolStatus.WARNING

            # Parse output
            issues = []
            passed = []

            for line in output.split('\n'):
                if 'Boring' in line or 'boring' in line:
                    if 'Boring Pages: 0' in line:
                        passed.append("No boring pages detected")
                    else:
                        issues.append(line.strip())
                        status = ToolStatus.WARNING
                elif 'Visual Score' in line or 'Content Score' in line:
                    passed.append(line.strip())
                elif 'Needing Work' in line:
                    issues.append(line.strip())

            return ToolResult(
                tool_name='OMEGA',
                status=status,
                duration=duration,
                summary="Quality audit complete",
                issues=issues[:10],
                passed=passed[:10],
                raw_output=output
            )

        except Exception as e:
            return ToolResult(
                tool_name='OMEGA',
                status=ToolStatus.ERROR,
                summary=f"OMEGA error: {str(e)}",
                issues=[str(e)]
            )

    def run_alpha(self, pages: List[str] = None) -> ToolResult:
        """
        Run ALPHA - The Professor

        ALPHA judges what SHOULD BE:
        - EPOCH COMPLIANCE: [1=-1] respected?
        - SM FRAMING: Not treating SM as superior?
        - TEACHING QUALITY: Torsion math taught?
        - BORING DETECTION: Content engaging?
        - PHILOSOPHY: Being The Coin expressed?
        """
        print("\n" + "─" * 70)
        print("  ALPHA - The Professor")
        print("  'Judging what SHOULD BE'")
        print("─" * 70)

        tool_path = self._get_tool_path('alpha')

        if not tool_path:
            return ToolResult(
                tool_name='ALPHA',
                status=ToolStatus.ERROR,
                summary="ALPHA tool not found",
                issues=["Tool file not found in tools/ directory"]
            )

        start_time = datetime.now()

        # Find key pages to analyze
        if not pages:
            # Auto-detect important pages
            pages = []
            important_patterns = [
                'physics/**/*.html',
                'education/**/*.html',
                'apps/**/*.html',
            ]
            for pattern in important_patterns:
                pages.extend(self.project_dir.glob(pattern))

            # Limit to 10 pages for efficiency
            pages = [str(p) for p in pages[:10]]

        if not pages:
            return ToolResult(
                tool_name='ALPHA',
                status=ToolStatus.WARNING,
                summary="No pages to analyze",
                issues=["No physics/education/apps pages found"]
            )

        all_issues = []
        all_passed = []
        grades = []

        for page_path in pages:
            try:
                result = subprocess.run(
                    [sys.executable, str(tool_path), page_path],
                    capture_output=True,
                    text=True,
                    timeout=60
                )

                output = result.stdout

                # Extract grade
                for line in output.split('\n'):
                    if 'GRADE:' in line:
                        grades.append(line.strip())
                    if 'CRITICAL' in line:
                        all_issues.append(f"{Path(page_path).name}: {line.strip()}")
                    if '✓' in line:
                        all_passed.append(line.strip())

            except Exception as e:
                all_issues.append(f"Error analyzing {page_path}: {e}")

        duration = (datetime.now() - start_time).total_seconds()

        # Determine overall status
        f_grades = sum(1 for g in grades if 'F -' in g)
        d_grades = sum(1 for g in grades if 'D -' in g)

        if f_grades > 0:
            status = ToolStatus.FAILED
        elif d_grades > 0:
            status = ToolStatus.WARNING
        else:
            status = ToolStatus.PASSED

        return ToolResult(
            tool_name='ALPHA',
            status=status,
            duration=duration,
            summary=f"Analyzed {len(pages)} pages - {f_grades} F grades, {d_grades} D grades",
            issues=all_issues[:15],
            passed=all_passed[:10],
            raw_output='\n'.join(grades)
        )

    def run_full_compilation(self, build_mode: bool = False) -> CompilerReport:
        """
        Run the full compilation pipeline

        Order: SHIVA → OMEGA → ALPHA
        """
        print("\n")
        print("╔" + "═" * 68 + "╗")
        print("║" + "HMH EPOCH MASTER COMPILER".center(68) + "║")
        print("║" + "Version 1.0 · The Trinity of Creation, Validation, and Judgment".center(68) + "║")
        print("╠" + "═" * 68 + "╣")
        print("║" + f"Project: {str(self.project_dir)[-50:]:50s}".center(68) + "║")
        print("║" + f"Timestamp: {self.timestamp}".center(68) + "║")
        print("║" + f"Mode: {'BUILD + AUDIT' if build_mode else 'AUDIT ONLY'}".center(68) + "║")
        print("╚" + "═" * 68 + "╝")

        # 1. Run SHIVA
        self.report.shiva_result = self.run_shiva()
        self._print_tool_result(self.report.shiva_result)

        # 2. Run OMEGA
        self.report.omega_result = self.run_omega(build_mode=build_mode)
        self._print_tool_result(self.report.omega_result)

        # 3. Run ALPHA
        self.report.alpha_result = self.run_alpha()
        self._print_tool_result(self.report.alpha_result)

        # Determine overall status
        statuses = [
            self.report.shiva_result.status if self.report.shiva_result else ToolStatus.ERROR,
            self.report.omega_result.status if self.report.omega_result else ToolStatus.ERROR,
            self.report.alpha_result.status if self.report.alpha_result else ToolStatus.ERROR,
        ]

        if ToolStatus.FAILED in statuses or ToolStatus.ERROR in statuses:
            self.report.overall_status = ToolStatus.FAILED
            self.report.deployment_ready = False
        elif ToolStatus.WARNING in statuses:
            self.report.overall_status = ToolStatus.WARNING
            self.report.deployment_ready = False
        else:
            self.report.overall_status = ToolStatus.PASSED
            self.report.deployment_ready = True

        # Generate recommendations
        self._generate_recommendations()

        # Print final summary
        self._print_final_summary()

        return self.report

    def _print_tool_result(self, result: ToolResult):
        """Print a single tool result"""
        status_symbols = {
            ToolStatus.PASSED: "✓",
            ToolStatus.WARNING: "⚠",
            ToolStatus.FAILED: "✗",
            ToolStatus.ERROR: "⚠",
        }

        symbol = status_symbols.get(result.status, "?")
        print(f"\n  {symbol} {result.tool_name}: {result.status.value} ({result.duration:.1f}s)")
        print(f"    {result.summary}")

        if result.issues:
            print(f"    Issues: {len(result.issues)}")
            for issue in result.issues[:3]:
                print(f"      • {issue[:70]}...")

    def _generate_recommendations(self):
        """Generate actionable recommendations"""
        recs = []

        # SHIVA recommendations
        if self.report.shiva_result:
            if self.report.shiva_result.status == ToolStatus.FAILED:
                recs.append("CRITICAL: Fix site structure issues before deployment")
            for issue in self.report.shiva_result.issues:
                if 'JS shell' in issue.lower():
                    recs.append("Replace JS shell pages with real content")
                if 'navigation' in issue.lower():
                    recs.append("Fix navigation component issues")

        # OMEGA recommendations
        if self.report.omega_result:
            for issue in self.report.omega_result.issues:
                if 'boring' in issue.lower():
                    recs.append("Add engaging content to boring pages (use sacred geometry, Epoch colors)")

        # ALPHA recommendations
        if self.report.alpha_result:
            if self.report.alpha_result.status == ToolStatus.FAILED:
                recs.append("CRITICAL: Fix Epoch methodology violations (F-grade pages)")
            for issue in self.report.alpha_result.issues:
                if 'SM-SUPERIOR' in issue:
                    recs.append("Reframe content: Don't validate Standard Model, expose it as broken map")
                if 'WEAKNESS DISPLAY' in issue:
                    recs.append("Remove hedging language ('not quite', 'almost') from derivations")

        self.report.recommendations = recs[:10]

    def _print_final_summary(self):
        """Print the final compilation summary"""
        print("\n")
        print("╔" + "═" * 68 + "╗")
        print("║" + "COMPILATION SUMMARY".center(68) + "║")
        print("╠" + "═" * 68 + "╣")

        # Status row
        status_display = {
            ToolStatus.PASSED: "✓ PASSED",
            ToolStatus.WARNING: "⚠ WARNING",
            ToolStatus.FAILED: "✗ FAILED",
        }

        overall = status_display.get(self.report.overall_status, "? UNKNOWN")
        print("║" + f"Overall Status: {overall}".center(68) + "║")
        print("║" + f"Deployment Ready: {'YES' if self.report.deployment_ready else 'NO'}".center(68) + "║")

        # Tool summary
        print("╟" + "─" * 68 + "╢")
        for tool, result in [
            ('SHIVA', self.report.shiva_result),
            ('OMEGA', self.report.omega_result),
            ('ALPHA', self.report.alpha_result),
        ]:
            if result:
                status = status_display.get(result.status, "?")
                print("║" + f"  {tool}: {status} ({len(result.issues)} issues, {len(result.passed)} passed)".ljust(66) + "  ║")

        # Recommendations
        if self.report.recommendations:
            print("╟" + "─" * 68 + "╢")
            print("║" + "  Recommendations:".ljust(66) + "  ║")
            for rec in self.report.recommendations[:5]:
                print("║" + f"    • {rec[:60]}".ljust(66) + "  ║")

        print("╟" + "─" * 68 + "╢")
        print("║" + f"{EPOCH_IDENTITY} · The geometry cannot lie. We offer choice.".center(68) + "║")
        print("╚" + "═" * 68 + "╝")
        print()

    def save_report(self, output_path: str = None) -> str:
        """Save the compilation report to JSON"""
        if not output_path:
            output_path = self.project_dir / f'HMH_COMPILATION_REPORT_{datetime.now().strftime("%Y%m%d_%H%M%S")}.json'

        report_dict = {
            'timestamp': self.report.timestamp,
            'project_dir': self.report.project_dir,
            'overall_status': self.report.overall_status.value,
            'deployment_ready': self.report.deployment_ready,
            'recommendations': self.report.recommendations,
            'tools': {}
        }

        for name, result in [
            ('shiva', self.report.shiva_result),
            ('omega', self.report.omega_result),
            ('alpha', self.report.alpha_result),
        ]:
            if result:
                report_dict['tools'][name] = {
                    'status': result.status.value,
                    'duration': result.duration,
                    'summary': result.summary,
                    'issues': result.issues,
                    'passed': result.passed,
                }

        with open(output_path, 'w') as f:
            json.dump(report_dict, f, indent=2)

        print(f"Report saved to: {output_path}")
        return str(output_path)


# ═══════════════════════════════════════════════════════════════════════════════
# CLI
# ═══════════════════════════════════════════════════════════════════════════════

def main():
    import argparse

    parser = argparse.ArgumentParser(
        description="HMH EPOCH MASTER COMPILER - The Trinity of Creation, Validation, and Judgment",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=f"""
The Master Compiler orchestrates all HMH tools:

  SHIVA → Observes what IS (validates site health)
  OMEGA → Creates what WILL BE (builds content, generates prompts)
  ALPHA → Judges what SHOULD BE (grades Epoch compliance)

Examples:
  python hmh-master-compiler.py .                    # Full audit of current directory
  python hmh-master-compiler.py /path/to/project    # Full audit of specific project
  python hmh-master-compiler.py . --build           # Build + audit
  python hmh-master-compiler.py . --save            # Save report to JSON

{EPOCH_IDENTITY} · Have Mind Media
        """
    )

    parser.add_argument('project_dir', nargs='?', default='.',
                        help='Project directory to compile (default: current directory)')
    parser.add_argument('--build', '-b', action='store_true',
                        help='Run in build mode (creates content)')
    parser.add_argument('--save', '-s', action='store_true',
                        help='Save report to JSON file')
    parser.add_argument('--shiva-only', action='store_true',
                        help='Run only SHIVA validation')
    parser.add_argument('--omega-only', action='store_true',
                        help='Run only OMEGA quality audit')
    parser.add_argument('--alpha-only', action='store_true',
                        help='Run only ALPHA compliance check')

    args = parser.parse_args()

    # Resolve project directory
    project_dir = Path(args.project_dir).resolve()

    # If running from tools/ directory, go up one level
    if project_dir.name == 'tools':
        project_dir = project_dir.parent

    compiler = EpochMasterCompiler(str(project_dir))

    if args.shiva_only:
        result = compiler.run_shiva()
        compiler._print_tool_result(result)
    elif args.omega_only:
        result = compiler.run_omega()
        compiler._print_tool_result(result)
    elif args.alpha_only:
        result = compiler.run_alpha()
        compiler._print_tool_result(result)
    else:
        report = compiler.run_full_compilation(build_mode=args.build)

        if args.save:
            compiler.save_report()

        # Exit code based on status
        if report.overall_status == ToolStatus.FAILED:
            sys.exit(1)
        elif report.overall_status == ToolStatus.WARNING:
            sys.exit(0)
        else:
            sys.exit(0)


if __name__ == "__main__":
    main()
