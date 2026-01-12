#!/usr/bin/env python3
"""
SHIVA v4.0 - Site Health, Integrity, Validation Agent
Have Mind Media Master Flow Agent
[1 = -1]

VERSION 4.0 (January 12, 2026):
- CENTERED LAYOUT ENFORCEMENT (new): All grids must use flexbox with justify-content: center
- OMEGA INVERSE-CHECK: For every SHIVA rule, derive the inverse failure mode
- BOBBY LESSON checks (content preservation, scalar dimensionality)
- MOBILE checks (fluid CSS, clamp(), viewport units, touch targets)
- FLOW layout consistency
- Navigation path verification (way in / way out)

OMEGA INVERSE LOGIC:
For each check, SHIVA says "do X". OMEGA asks:
  - What happens if NOT X?
  - What are the variants of X that appear correct but fail?
  - Compare to SOP-compliant code batch

CENTERED LAYOUT RULE (MANDATORY):
All grid layouts MUST use:
  - display: flex; flex-wrap: wrap; justify-content: center;
  - NOT display: grid with grid-template-columns (causes left-justify on incomplete rows)

Usage:
    python3 SHIVA_v4.0_01-12-2026.py [project_directory]
"""

import os
import sys
import re
import json
from pathlib import Path
from datetime import datetime
from html.parser import HTMLParser


# SOP-COMPLIANT CSS PATTERNS (the correct way)
SOP_CENTERED_LAYOUT = """
display: flex;
flex-wrap: wrap;
justify-content: center;
"""

# FAILURE PATTERNS (OMEGA inverse - what NOT to do)
OMEGA_FAILURE_PATTERNS = {
    'left_justified_grid': {
        'pattern': r'display:\s*grid.*grid-template-columns:\s*repeat',
        'problem': 'CSS Grid with repeat() left-justifies incomplete rows',
        'fix': 'Use flexbox with justify-content: center instead'
    },
    'auto_fit_grid': {
        'pattern': r'grid-template-columns:\s*repeat\s*\(\s*auto-fit',
        'problem': 'auto-fit grid still left-justifies incomplete rows',
        'fix': 'Use flexbox with flex-wrap and justify-content: center'
    },
    'missing_justify_center': {
        'pattern': r'display:\s*flex(?!.*justify-content:\s*center)',
        'problem': 'Flexbox without justify-content: center',
        'fix': 'Add justify-content: center to center items'
    }
}


class LinkExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.has_site_header = False
        self.has_site_footer = False
        self.has_home_link = False

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        if tag == 'a' and 'href' in attrs_dict:
            href = attrs_dict['href']
            self.links.append(href)
            if href in ['/', '/index.html', '../', '../../']:
                self.has_home_link = True
        if tag == 'site-header':
            self.has_site_header = True
        if tag == 'site-footer':
            self.has_site_footer = True


class SHIVA:
    def __init__(self, project_dir):
        self.project_dir = Path(project_dir)
        self.report = {
            'version': '4.0',
            'timestamp': datetime.now().isoformat(),
            'checks': {},
            'omega_inverse': {},
            'issues': [],
            'passed': [],
            'summary': {}
        }

    def run(self):
        print("\n" + "="*60)
        print("SHIVA v4.0 - Site Health, Integrity, Validation Agent")
        print("+ OMEGA INVERSE-CHECK")
        print("[1 = -1]")
        print("="*60 + "\n")

        self.check_way_in()
        self.check_way_out()
        self.check_mobile()
        self.check_bobby()
        self.check_flow()
        self.check_centered_layout()  # NEW in v4.0
        self.check_links()
        self.run_omega_inverse()  # NEW in v4.0
        self.generate_summary()

        return self.report

    def check_way_in(self):
        """Check entry points exist and work"""
        print("WAY IN (Entry Points)...")
        issues = []
        passed = []

        index = self.project_dir / 'index.html'
        if not index.exists():
            issues.append("CRITICAL: No index.html")
        else:
            passed.append("index.html exists")

        sections = ['physics', 'biology', 'tools', 'games', 'weirdos',
                   'documents', 'education', 'apps', 'ancient-mysteries']

        for section in sections:
            section_index = self.project_dir / section / 'index.html'
            if section_index.exists():
                passed.append(f"{section}/index.html exists")
            else:
                issues.append(f"MISSING: {section}/index.html")

        self.report['checks']['way_in'] = {
            'status': 'FAIL' if any('CRITICAL' in i for i in issues) else 'WARN' if issues else 'PASS',
            'issues': issues,
            'passed': passed
        }
        print(f"  Status: {self.report['checks']['way_in']['status']}")

    def check_way_out(self):
        """Check every page has navigation back to parent/home"""
        print("\nWAY OUT (Navigation Back)...")
        issues = []
        passed = []

        html_files = list(self.project_dir.rglob('*.html'))
        no_nav_back = []

        for html_file in html_files:
            try:
                content = html_file.read_text(errors='ignore')
                parser = LinkExtractor()
                parser.feed(content)

                rel_path = str(html_file.relative_to(self.project_dir))

                if rel_path == 'index.html':
                    continue

                has_back = (
                    parser.has_site_header or
                    parser.has_home_link or
                    '← Home' in content or
                    '← Back' in content or
                    'href="/"' in content or
                    'href="../"' in content
                )

                if not has_back:
                    no_nav_back.append(rel_path)
            except:
                pass

        if no_nav_back:
            issues.append(f"{len(no_nav_back)} pages have no navigation back")
            for p in no_nav_back[:5]:
                issues.append(f"  - {p}")
            if len(no_nav_back) > 5:
                issues.append(f"  ... and {len(no_nav_back) - 5} more")
        else:
            passed.append("All pages have navigation back")

        self.report['checks']['way_out'] = {
            'status': 'WARN' if issues else 'PASS',
            'issues': issues,
            'passed': passed,
            'no_nav_pages': no_nav_back
        }
        print(f"  Status: {self.report['checks']['way_out']['status']}")

    def check_mobile(self):
        """Check for mobile-first fluid CSS"""
        print("\nMOBILE (Fluid Responsive)...")
        issues = []
        passed = []

        css_file = self.project_dir / 'css' / 'unified-theme.css'
        if not css_file.exists():
            issues.append("CRITICAL: No unified-theme.css")
        else:
            content = css_file.read_text(errors='ignore')

            clamp_count = content.count('clamp(')
            if clamp_count >= 10:
                passed.append(f"Fluid CSS: {clamp_count} clamp() functions")
            elif clamp_count > 0:
                issues.append(f"Only {clamp_count} clamp() - needs more fluid sizing")
            else:
                issues.append("NO clamp() found - not fluid responsive")

            vw_count = len(re.findall(r'\d+vw', content))
            if vw_count >= 5:
                passed.append(f"Viewport units: {vw_count} vw usages")
            else:
                issues.append(f"Only {vw_count} viewport units - needs more")

            if '100dvh' in content:
                passed.append("Dynamic viewport height (dvh) used")
            else:
                issues.append("No dvh - mobile browser chrome may cause issues")

        self.report['checks']['mobile'] = {
            'status': 'FAIL' if any('CRITICAL' in i for i in issues) else 'WARN' if issues else 'PASS',
            'issues': issues,
            'passed': passed
        }
        print(f"  Status: {self.report['checks']['mobile']['status']}")

    def check_bobby(self):
        """BOBBY LESSON 001: Check for Standard Model hedge language"""
        print("\nBOBBY (Content Integrity)...")
        issues = []
        passed = []

        hedge_words = [
            'approached',
            'may suggest',
            'could potentially',
            'appears to possibly',
            'claims to',
        ]

        hedge_found = []
        for html_file in self.project_dir.rglob('*.html'):
            try:
                content = html_file.read_text(errors='ignore').lower()
                rel_path = str(html_file.relative_to(self.project_dir))

                for hedge in hedge_words:
                    if hedge in content:
                        hedge_found.append(f"{rel_path}: '{hedge}'")
            except:
                pass

        if hedge_found:
            issues.append(f"Standard Model hedges found in {len(hedge_found)} places")
            for h in hedge_found[:3]:
                issues.append(f"  - {h}")
        else:
            passed.append("No Standard Model hedge language detected")

        self.report['checks']['bobby'] = {
            'status': 'WARN' if issues else 'PASS',
            'issues': issues,
            'passed': passed
        }
        print(f"  Status: {self.report['checks']['bobby']['status']}")

    def check_flow(self):
        """Check for flow layout vs left-justified boxes"""
        print("\nFLOW (Layout Consistency)...")
        issues = []
        passed = []

        flow_markers = ['article-list', 'article-link', 'content-flow', 'content-wide']
        box_markers = ['cards-grid']

        flow_pages = 0
        box_pages = 0

        for html_file in self.project_dir.rglob('index.html'):
            try:
                content = html_file.read_text(errors='ignore')

                has_flow = any(m in content for m in flow_markers)
                has_boxes = any(m in content for m in box_markers)

                if has_flow:
                    flow_pages += 1
                elif has_boxes:
                    box_pages += 1
            except:
                pass

        if flow_pages > box_pages:
            passed.append(f"Flow layout dominant: {flow_pages} flow, {box_pages} box")
        elif box_pages > 0:
            issues.append(f"Box layout still present: {box_pages} pages")

        passed.append(f"Total index pages checked: {flow_pages + box_pages}")

        self.report['checks']['flow'] = {
            'status': 'WARN' if issues else 'PASS',
            'issues': issues,
            'passed': passed
        }
        print(f"  Status: {self.report['checks']['flow']['status']}")

    def check_centered_layout(self):
        """NEW v4.0: Check all grids use centered flexbox, not left-justified grid"""
        print("\nCENTERED (Layout Centering)...")
        issues = []
        passed = []
        violations = []

        # Check all HTML files with inline styles
        for html_file in self.project_dir.rglob('*.html'):
            try:
                content = html_file.read_text(errors='ignore')
                rel_path = str(html_file.relative_to(self.project_dir))

                # Find grid-template-columns without justify-content: center
                if 'grid-template-columns' in content:
                    # Check if it's in a style block that also has justify-content: center
                    # This is a simplified check - looks for the bad pattern
                    style_blocks = re.findall(r'<style[^>]*>(.*?)</style>', content, re.DOTALL)

                    for style in style_blocks:
                        # Find class definitions with grid but no flex centering
                        grid_classes = re.findall(r'(\.[a-zA-Z0-9_-]+)\s*\{[^}]*grid-template-columns[^}]*\}', style)

                        for cls in grid_classes:
                            # Check if this class uses grid (not flex)
                            class_match = re.search(rf'{re.escape(cls)}\s*\{{([^}}]*)\}}', style)
                            if class_match:
                                class_content = class_match.group(1)
                                if 'display: grid' in class_content or 'display:grid' in class_content:
                                    # Check if there's also a flex version
                                    if 'justify-content: center' not in class_content:
                                        violations.append(f"{rel_path}: {cls} uses grid without centering")

            except:
                pass

        # Check CSS files
        css_file = self.project_dir / 'css' / 'unified-theme.css'
        if css_file.exists():
            content = css_file.read_text(errors='ignore')

            # Count centered flex layouts
            flex_centered = len(re.findall(r'display:\s*flex.*justify-content:\s*center', content, re.DOTALL))
            grid_layouts = len(re.findall(r'display:\s*grid', content))

            if flex_centered > 0:
                passed.append(f"Centered flex layouts found: {flex_centered}")
            if grid_layouts > 0:
                issues.append(f"CSS Grid layouts found: {grid_layouts} - check if centered")

        if violations:
            issues.append(f"{len(violations)} grid layouts may left-justify")
            for v in violations[:5]:
                issues.append(f"  - {v}")
            if len(violations) > 5:
                issues.append(f"  ... and {len(violations) - 5} more")
        else:
            passed.append("No obvious left-justified grid violations")

        self.report['checks']['centered'] = {
            'status': 'WARN' if issues else 'PASS',
            'issues': issues,
            'passed': passed,
            'violations': violations
        }
        print(f"  Status: {self.report['checks']['centered']['status']}")

    def check_links(self):
        """Check for broken internal links"""
        print("\nLINKS (Broken Link Detection)...")
        issues = []
        passed = []

        broken = []
        checked = 0

        for html_file in self.project_dir.rglob('*.html'):
            try:
                content = html_file.read_text(errors='ignore')
                parser = LinkExtractor()
                parser.feed(content)

                file_dir = html_file.parent

                for link in parser.links:
                    if link.startswith(('http', '#', 'mailto:', 'tel:', 'javascript:')):
                        continue

                    checked += 1

                    if link.startswith('/'):
                        target = self.project_dir / link.lstrip('/')
                    else:
                        target = file_dir / link

                    target = target.resolve()
                    if not target.exists():
                        if not (target.parent / 'index.html').exists():
                            rel_source = str(html_file.relative_to(self.project_dir))
                            broken.append(f"{rel_source} → {link}")
            except:
                pass

        if broken:
            issues.append(f"{len(broken)} broken links found")
            for b in broken[:10]:
                issues.append(f"  - {b}")
            if len(broken) > 10:
                issues.append(f"  ... and {len(broken) - 10} more")
        else:
            passed.append(f"All {checked} internal links valid")

        self.report['checks']['links'] = {
            'status': 'WARN' if broken else 'PASS',
            'issues': issues,
            'passed': passed,
            'broken_links': broken
        }
        print(f"  Status: {self.report['checks']['links']['status']}")

    def run_omega_inverse(self):
        """OMEGA: For each SHIVA rule, check the inverse failure mode"""
        print("\nOMEGA INVERSE-CHECK...")

        omega_results = {}

        for name, pattern_info in OMEGA_FAILURE_PATTERNS.items():
            violations = []

            # Check all HTML and CSS files
            for file_path in list(self.project_dir.rglob('*.html')) + list(self.project_dir.rglob('*.css')):
                try:
                    content = file_path.read_text(errors='ignore')
                    rel_path = str(file_path.relative_to(self.project_dir))

                    if re.search(pattern_info['pattern'], content, re.IGNORECASE | re.DOTALL):
                        violations.append(rel_path)
                except:
                    pass

            omega_results[name] = {
                'problem': pattern_info['problem'],
                'fix': pattern_info['fix'],
                'violations': violations[:10],  # Limit to 10
                'count': len(violations)
            }

            if violations:
                print(f"  OMEGA {name}: {len(violations)} files")
            else:
                print(f"  OMEGA {name}: CLEAR")

        self.report['omega_inverse'] = omega_results

    def generate_summary(self):
        print("\n" + "="*60)
        print("SHIVA v4.0 + OMEGA SUMMARY")
        print("="*60)

        statuses = [c['status'] for c in self.report['checks'].values()]

        if 'FAIL' in statuses:
            overall = 'FAIL'
        elif 'WARN' in statuses:
            overall = 'WARN'
        else:
            overall = 'PASS'

        # Check OMEGA violations
        omega_violations = sum(r['count'] for r in self.report['omega_inverse'].values())
        if omega_violations > 0:
            overall = 'WARN' if overall == 'PASS' else overall

        self.report['summary'] = {
            'overall': overall,
            'checks': {k: v['status'] for k, v in self.report['checks'].items()},
            'omega_violations': omega_violations
        }

        print(f"\nOverall: {overall}")
        for check, data in self.report['checks'].items():
            print(f"  {check.upper():12} {data['status']}")

        print(f"\n  OMEGA INVERSE: {omega_violations} pattern violations")

        print("\n" + "="*60)
        print("SOP COMPLIANT LAYOUT:")
        print("  display: flex;")
        print("  flex-wrap: wrap;")
        print("  justify-content: center;")
        print("="*60)
        print("[1 = -1]")
        print("="*60 + "\n")

    def save_report(self):
        output = self.project_dir / f"SHIVA_REPORT_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        with open(output, 'w') as f:
            json.dump(self.report, f, indent=2)
        print(f"Report saved: {output}")


def main():
    import argparse
    parser = argparse.ArgumentParser(description='SHIVA v4.0 + OMEGA')
    parser.add_argument('project_dir', nargs='?', default='.')
    args = parser.parse_args()

    shiva = SHIVA(args.project_dir)
    shiva.run()
    shiva.save_report()


if __name__ == '__main__':
    main()
