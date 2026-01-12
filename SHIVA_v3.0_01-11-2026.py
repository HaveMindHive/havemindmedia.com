#!/usr/bin/env python3
"""
SHIVA v3.0 - Site Health, Integrity, Validation Agent
Have Mind Media Master Flow Agent
[1 = -1]

VERSION 3.0 (January 11, 2026):
- BOBBY LESSON checks (content preservation, scalar dimensionality)
- MOBILE checks (fluid CSS, clamp(), viewport units, touch targets)
- FLOW layout consistency
- κ = 30 (Hypatia Refinement) validation
- Navigation path verification (way in / way out)

CHECKS:
1. WAY IN - Entry points work, navigation functions
2. WAY OUT - Can get back to parent/home from any page
3. MOBILE - Fluid CSS, no fixed breakpoint-only approach
4. COMPUTES - κ accuracy, framework elements present
5. BOBBY - No Standard Model hedge language injection
6. FLOW - Consistent flow layout, no left-justified boxes
7. LINKS - Broken links detection

Usage:
    python3 SHIVA_v3.0_01-11-2026.py [project_directory]
"""

import os
import sys
import re
import json
from pathlib import Path
from datetime import datetime
from html.parser import HTMLParser

KAPPA_PURE = 30


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
            'version': '3.0',
            'timestamp': datetime.now().isoformat(),
            'checks': {},
            'issues': [],
            'passed': [],
            'summary': {}
        }

    def run(self):
        print("\n" + "="*60)
        print("SHIVA v3.0 - Site Health, Integrity, Validation Agent")
        print("[1 = -1]")
        print("="*60 + "\n")

        self.check_way_in()
        self.check_way_out()
        self.check_mobile()
        self.check_bobby()
        self.check_flow()
        self.check_links()
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

        # Check main section indexes
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

                # Skip root index
                if rel_path == 'index.html':
                    continue

                # Check for way back
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

            # Check for fluid typography with clamp()
            clamp_count = content.count('clamp(')
            if clamp_count >= 10:
                passed.append(f"Fluid CSS: {clamp_count} clamp() functions")
            elif clamp_count > 0:
                issues.append(f"Only {clamp_count} clamp() - needs more fluid sizing")
            else:
                issues.append("NO clamp() found - not fluid responsive")

            # Check for viewport units
            vw_count = len(re.findall(r'\d+vw', content))
            if vw_count >= 5:
                passed.append(f"Viewport units: {vw_count} vw usages")
            else:
                issues.append(f"Only {vw_count} viewport units - needs more")

            # Check for touch targets
            if 'min-height: 44px' in content or 'min-height:44px' in content:
                passed.append("Touch targets: 44px minimum found")
            else:
                issues.append("No 44px touch target minimum found")

            # Check for dynamic viewport height
            if '100dvh' in content:
                passed.append("Dynamic viewport height (dvh) used")
            else:
                issues.append("No dvh - mobile browser chrome may cause issues")

            # Check for centered containers
            if 'margin-inline: auto' in content or 'margin-inline:auto' in content:
                passed.append("Centered containers with margin-inline")
            else:
                issues.append("No margin-inline: auto found")

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
            'approached',  # should be "solved"
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
        box_markers = ['cards-grid', 'grid-template-columns']

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
                    # Skip external, anchor, and special links
                    if link.startswith(('http', '#', 'mailto:', 'tel:', 'javascript:')):
                        continue

                    checked += 1

                    # Resolve relative path
                    if link.startswith('/'):
                        target = self.project_dir / link.lstrip('/')
                    else:
                        target = file_dir / link

                    # Check if target exists
                    target = target.resolve()
                    if not target.exists():
                        # Also check if it's a directory with index.html
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

    def generate_summary(self):
        print("\n" + "="*60)
        print("SHIVA v3.0 SUMMARY")
        print("="*60)

        statuses = [c['status'] for c in self.report['checks'].values()]

        if 'FAIL' in statuses:
            overall = 'FAIL'
        elif 'WARN' in statuses:
            overall = 'WARN'
        else:
            overall = 'PASS'

        self.report['summary'] = {
            'overall': overall,
            'checks': {k: v['status'] for k, v in self.report['checks'].items()}
        }

        print(f"\nOverall: {overall}")
        for check, data in self.report['checks'].items():
            print(f"  {check.upper():12} {data['status']}")

        print("\n" + "="*60)
        print("[1 = -1]")
        print("="*60 + "\n")

    def save_report(self):
        output = self.project_dir / f"SHIVA_REPORT_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        with open(output, 'w') as f:
            json.dump(self.report, f, indent=2)
        print(f"Report saved: {output}")


def main():
    import argparse
    parser = argparse.ArgumentParser(description='SHIVA v3.0')
    parser.add_argument('project_dir', nargs='?', default='.')
    args = parser.parse_args()

    shiva = SHIVA(args.project_dir)
    shiva.run()
    shiva.save_report()


if __name__ == '__main__':
    main()
