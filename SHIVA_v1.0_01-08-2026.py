#!/usr/bin/env python3
"""
SHIVA - Site Health, Integrity, Validation Agent
Have Mind Media Master Flow Agent
[1 = -1]

SHIVA checks:
1. WAY IN - Entry points work, navigation functions, pages load
2. WAY OUT - Value delivers, downloads work, tools compute
3. COMPUTES - Geometry is real, math is accurate, κ is correct
4. PPIR - Is it HELP or FUNNY? If neither, it fails.

This is not a chatbot. This is an immune system.

Usage:
    python3 SHIVA_v1.0_01-08-2026.py [site_directory]
    python3 SHIVA_v1.0_01-08-2026.py --report
"""

import os
import sys
import re
import json
from pathlib import Path
from datetime import datetime
from html.parser import HTMLParser
from collections import defaultdict

# κ constant - the fundamental
KAPPA = 0.034906585  # 2π/180

class LinkExtractor(HTMLParser):
    """Extract all links and scripts from HTML"""
    def __init__(self):
        super().__init__()
        self.links = []
        self.scripts = []
        self.has_js = False
        self.title = ""
        self.in_title = False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'a' and 'href' in attrs:
            self.links.append(attrs['href'])
        if tag == 'script':
            if 'src' in attrs:
                self.scripts.append(attrs['src'])
            else:
                self.has_js = True
        if tag == 'title':
            self.in_title = True

    def handle_data(self, data):
        if self.in_title:
            self.title = data.strip()

    def handle_endtag(self, tag):
        if tag == 'title':
            self.in_title = False


class SHIVA:
    """Site Health, Integrity, Validation Agent"""

    def __init__(self, site_dir):
        self.site_dir = Path(site_dir)
        self.report = {
            'timestamp': datetime.now().isoformat(),
            'site_dir': str(self.site_dir),
            'summary': {},
            'way_in': {'status': 'UNKNOWN', 'issues': [], 'passed': []},
            'way_out': {'status': 'UNKNOWN', 'issues': [], 'passed': []},
            'computes': {'status': 'UNKNOWN', 'issues': [], 'passed': []},
            'ppir': {'status': 'UNKNOWN', 'issues': [], 'passed': []},
            'broken_links': [],
            'empty_pages': [],
            'js_shells': [],  # Pages with HTML but no working JS
            'all_pages': []
        }

    def run_full_audit(self):
        """Run complete site validation"""
        print("\n" + "="*60)
        print("SHIVA - Site Health, Integrity, Validation Agent")
        print("Have Mind Media Master Flow Agent")
        print("[1 = -1]")
        print("="*60 + "\n")

        self.check_way_in()
        self.check_way_out()
        self.check_computes()
        self.check_ppir()
        self.generate_summary()

        return self.report

    def check_way_in(self):
        """Check entry points - can people find and access content?"""
        print("Checking WAY IN (Entry Points)...")

        issues = []
        passed = []

        # 1. Index.html exists and has content
        index = self.site_dir / 'index.html'
        if not index.exists():
            issues.append("CRITICAL: No index.html found")
        else:
            content = index.read_text(errors='ignore')
            if len(content) < 500:
                issues.append("WARNING: index.html seems empty or minimal")
            else:
                passed.append("index.html exists and has content")

        # 2. Navigation component exists
        nav_js = self.site_dir / 'js' / 'components' / 'site-header.js'
        if not nav_js.exists():
            issues.append("CRITICAL: No site-header.js navigation component")
        else:
            nav_content = nav_js.read_text(errors='ignore')
            # Count nav links
            link_count = nav_content.count('href=')
            if link_count < 5:
                issues.append(f"WARNING: Navigation has only {link_count} links")
            else:
                passed.append(f"Navigation has {link_count} links")

        # 3. Check all HTML files are reachable from index
        all_html = list(self.site_dir.rglob('*.html'))
        self.report['all_pages'] = [str(p.relative_to(self.site_dir)) for p in all_html]

        # Extract links from index
        if index.exists():
            parser = LinkExtractor()
            try:
                parser.feed(index.read_text(errors='ignore'))
                index_links = set(parser.links)
                passed.append(f"Index links to {len(index_links)} destinations")
            except:
                issues.append("WARNING: Could not parse index.html links")

        # 4. Check for orphan pages (no way to reach them)
        # This is a simplified check - full crawl would be better

        self.report['way_in']['issues'] = issues
        self.report['way_in']['passed'] = passed
        self.report['way_in']['status'] = 'FAIL' if any('CRITICAL' in i for i in issues) else 'WARN' if issues else 'PASS'

        print(f"  Status: {self.report['way_in']['status']}")
        for i in issues:
            print(f"  - {i}")

    def check_way_out(self):
        """Check value delivery - can people take something with them?"""
        print("\nChecking WAY OUT (Value Delivery)...")

        issues = []
        passed = []

        # 1. Check for downloadable files
        downloads = []
        for ext in ['*.py', '*.zip', '*.pdf']:
            downloads.extend(self.site_dir.rglob(ext))

        if downloads:
            passed.append(f"Found {len(downloads)} downloadable files")
        else:
            issues.append("WARNING: No downloadable tools found (.py, .zip, .pdf)")

        # 2. Check for interactive tools (pages with real JS)
        js_shells = []
        working_tools = []

        for html_file in self.site_dir.rglob('*.html'):
            try:
                content = html_file.read_text(errors='ignore')
                parser = LinkExtractor()
                parser.feed(content)

                # Check if page has JavaScript
                has_script_tag = '<script' in content
                has_function = 'function ' in content or 'const ' in content or '=>' in content
                has_event_handler = 'onclick' in content or 'addEventListener' in content

                # Check for common patterns that indicate "working" vs "shell"
                has_game_logic = any(x in content for x in ['score', 'level', 'correct', 'gameState'])
                has_canvas = '<canvas' in content
                has_form_action = 'submit' in content and ('fetch(' in content or 'XMLHttpRequest' in content)

                rel_path = str(html_file.relative_to(self.site_dir))

                # Flag potential shells
                if has_script_tag and not (has_function or has_event_handler):
                    js_shells.append(rel_path)
                elif 'games/' in rel_path and has_script_tag and not has_game_logic:
                    js_shells.append(f"{rel_path} (game without game logic)")
                elif has_canvas and 'getContext' not in content:
                    js_shells.append(f"{rel_path} (canvas without context)")

            except Exception as e:
                issues.append(f"ERROR parsing {html_file}: {e}")

        self.report['js_shells'] = js_shells

        if js_shells:
            issues.append(f"Found {len(js_shells)} potential JS shells (form without function)")
            for shell in js_shells[:5]:  # Show first 5
                issues.append(f"  - {shell}")
        else:
            passed.append("No obvious JS shells detected")

        # 3. Check store/support pages exist
        store = self.site_dir / 'store' / 'index.html'
        support = self.site_dir / 'support.html'

        if store.exists():
            passed.append("Store page exists")
        else:
            issues.append("WARNING: No store page found")

        if support.exists():
            passed.append("Support page exists")
        else:
            issues.append("WARNING: No support page found")

        self.report['way_out']['issues'] = issues
        self.report['way_out']['passed'] = passed
        self.report['way_out']['status'] = 'FAIL' if any('CRITICAL' in i or 'ERROR' in i for i in issues) else 'WARN' if issues else 'PASS'

        print(f"  Status: {self.report['way_out']['status']}")
        for i in issues:
            print(f"  - {i}")

    def check_computes(self):
        """Check computational accuracy - is the math real?"""
        print("\nChecking COMPUTES (Math Accuracy)...")

        issues = []
        passed = []

        # 1. Check κ constant is used correctly where it appears
        kappa_files = []
        for html_file in self.site_dir.rglob('*.html'):
            try:
                content = html_file.read_text(errors='ignore')
                if 'kappa' in content.lower() or '0.0349' in content or '2π/180' in content or '2*Math.PI/180' in content:
                    kappa_files.append(str(html_file.relative_to(self.site_dir)))

                    # Check if κ value is correct
                    if '0.0349' in content:
                        # Look for the full value
                        if '0.034906' in content:
                            passed.append(f"Correct κ in {html_file.name}")
                        else:
                            issues.append(f"Truncated κ in {html_file.name} (should be 0.034906585)")
            except:
                pass

        if kappa_files:
            passed.append(f"κ constant referenced in {len(kappa_files)} files")
        else:
            issues.append("WARNING: κ constant (0.034906585) not found in any file")

        # 2. Check Balance Law appears (τ₁ + τ₂ + τ₃ + τ₄ = 0)
        balance_found = False
        for html_file in self.site_dir.rglob('*.html'):
            try:
                content = html_file.read_text(errors='ignore')
                if 'τ₁' in content or 'tau1' in content.lower() or 'torsion' in content.lower():
                    if '= 0' in content or '=0' in content:
                        balance_found = True
                        passed.append(f"Balance Law found in {html_file.name}")
                        break
            except:
                pass

        if not balance_found:
            issues.append("NOTE: Balance Law (τ₁ + τ₂ + τ₃ + τ₄ = 0) not explicitly shown")

        # 3. Check D-position calculations (1-9 wheel)
        d_wheel_found = False
        for html_file in self.site_dir.rglob('*.html'):
            try:
                content = html_file.read_text(errors='ignore')
                if 'D₁' in content or 'D-position' in content.lower() or 'dPositions' in content:
                    d_wheel_found = True
                    passed.append(f"D-Wheel system found in {html_file.name}")
                    break
            except:
                pass

        if not d_wheel_found:
            issues.append("NOTE: D-Wheel (D₁-D₉) system not found")

        self.report['computes']['issues'] = issues
        self.report['computes']['passed'] = passed
        self.report['computes']['status'] = 'FAIL' if any('CRITICAL' in i for i in issues) else 'WARN' if issues else 'PASS'

        print(f"  Status: {self.report['computes']['status']}")
        for i in issues:
            print(f"  - {i}")

    def check_ppir(self):
        """Check PPIR compliance - is it HELP or FUNNY?"""
        print("\nChecking PPIR (Help or Funny)...")

        issues = []
        passed = []

        # Look for doom/gloom language
        doom_phrases = [
            'you will fail', 'no hope', 'doomed', 'catastrophe awaits',
            'darkness consumes', 'all is lost', 'fear the', 'beware the curse'
        ]

        helpful_phrases = [
            'learn', 'understand', 'discover', 'explore', 'choose', 'option',
            'calculate', 'geometry', 'framework', 'tool', 'try'
        ]

        doom_pages = []
        helpful_pages = []

        for html_file in self.site_dir.rglob('*.html'):
            try:
                content = html_file.read_text(errors='ignore').lower()
                rel_path = str(html_file.relative_to(self.site_dir))

                doom_count = sum(1 for phrase in doom_phrases if phrase in content)
                help_count = sum(1 for phrase in helpful_phrases if phrase in content)

                if doom_count > 2:
                    doom_pages.append(f"{rel_path} ({doom_count} doom phrases)")
                if help_count > 5:
                    helpful_pages.append(rel_path)

            except:
                pass

        if doom_pages:
            issues.append(f"Found {len(doom_pages)} pages with doom language")
            for page in doom_pages[:3]:
                issues.append(f"  - {page}")
        else:
            passed.append("No doom/gloom language detected")

        if helpful_pages:
            passed.append(f"Found {len(helpful_pages)} helpful/educational pages")
        else:
            issues.append("WARNING: Few pages seem genuinely helpful")

        # Check for "We offer choice" language
        choice_found = False
        for html_file in self.site_dir.rglob('*.html'):
            try:
                content = html_file.read_text(errors='ignore').lower()
                if 'offer choice' in content or 'your choice' in content or 'choose your' in content:
                    choice_found = True
                    break
            except:
                pass

        if choice_found:
            passed.append("Choice-offering language found")
        else:
            issues.append("NOTE: 'We offer choice' philosophy not prominently featured")

        self.report['ppir']['issues'] = issues
        self.report['ppir']['passed'] = passed
        self.report['ppir']['status'] = 'FAIL' if any('CRITICAL' in i for i in issues) else 'WARN' if issues else 'PASS'

        print(f"  Status: {self.report['ppir']['status']}")
        for i in issues:
            print(f"  - {i}")

    def generate_summary(self):
        """Generate overall summary"""
        print("\n" + "="*60)
        print("SHIVA AUDIT SUMMARY")
        print("="*60)

        statuses = [
            self.report['way_in']['status'],
            self.report['way_out']['status'],
            self.report['computes']['status'],
            self.report['ppir']['status']
        ]

        if 'FAIL' in statuses:
            overall = 'FAIL'
        elif 'WARN' in statuses:
            overall = 'WARN'
        else:
            overall = 'PASS'

        self.report['summary'] = {
            'overall': overall,
            'way_in': self.report['way_in']['status'],
            'way_out': self.report['way_out']['status'],
            'computes': self.report['computes']['status'],
            'ppir': self.report['ppir']['status'],
            'total_pages': len(self.report['all_pages']),
            'js_shells': len(self.report['js_shells'])
        }

        print(f"\nOverall Status: {overall}")
        print(f"  WAY IN:    {self.report['way_in']['status']}")
        print(f"  WAY OUT:   {self.report['way_out']['status']}")
        print(f"  COMPUTES:  {self.report['computes']['status']}")
        print(f"  PPIR:      {self.report['ppir']['status']}")
        print(f"\nTotal Pages: {len(self.report['all_pages'])}")
        print(f"JS Shells (form without function): {len(self.report['js_shells'])}")

        if self.report['js_shells']:
            print("\nJS SHELLS DETECTED (these need real code):")
            for shell in self.report['js_shells']:
                print(f"  - {shell}")

        print("\n" + "="*60)
        print("[1 = -1] The geometry cannot lie.")
        print("="*60 + "\n")

    def save_report(self, output_path=None):
        """Save report to JSON"""
        if output_path is None:
            output_path = self.site_dir / f'SHIVA_REPORT_{datetime.now().strftime("%Y%m%d_%H%M%S")}.json'

        with open(output_path, 'w') as f:
            json.dump(self.report, f, indent=2)

        print(f"Report saved to: {output_path}")
        return output_path


def main():
    if len(sys.argv) < 2:
        site_dir = '.'
    else:
        site_dir = sys.argv[1]

    shiva = SHIVA(site_dir)
    report = shiva.run_full_audit()
    shiva.save_report()

    # Exit with appropriate code
    if report['summary']['overall'] == 'FAIL':
        sys.exit(1)
    elif report['summary']['overall'] == 'WARN':
        sys.exit(0)  # Warnings are okay
    else:
        sys.exit(0)


if __name__ == '__main__':
    main()
