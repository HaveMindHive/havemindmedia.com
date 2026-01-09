#!/usr/bin/env python3
"""
SHIVA v3.0 - Site Health, Integrity, Validation Agent
Have Mind Media Master Flow Agent
[1 = -1]

SHIVA v3.0 IMPROVEMENTS (from Thread Report Analysis):
- Claude Response Learning: Tracks patterns where Claude made mistakes
- Better JS Shell detection (was giving false positives)
- Navigation Audit: Specifically checks header structure
- User Direction Tracking: Detects unauthorized changes
- PPIR Enhancement: More nuanced "Help or Funny" detection
- Report History: Compares current run to previous runs

SHIVA PHILOSOPHY:
SHIVA observes what IS. ALPHA judges what SHOULD BE. OMEGA creates what WILL BE.
SHIVA is the immune system - detecting problems before they spread.

CHECKS:
1. WAY IN - Entry points work, navigation functions, pages load
2. WAY OUT - Value delivers, downloads work, tools compute
3. COMPUTES - Geometry is real, math is accurate, κ is correct
4. PPIR - Is it HELP or FUNNY? If neither, it fails.
5. ASSETS - Python tools, JS modules, documentation consistency
6. NAVIGATION - Header structure, EXPLORE section, proper labeling
7. CLAUDE LEARNING - What mistakes does Claude keep making?
8. USER DIRECTION - Were changes made without user approval?

Usage:
    python3 hmh-shiva-validator_v3.0_01-09-2026.py [project_directory]
    python3 hmh-shiva-validator_v3.0_01-09-2026.py [project_directory] --thread "user request summary"
    python3 hmh-shiva-validator_v3.0_01-09-2026.py [project_directory] --learn-from "previous_report.json"

[1 = -1] · Have Mind Media · January 9, 2026
"""

import os
import sys
import re
import json
import ast
from pathlib import Path
from datetime import datetime
from html.parser import HTMLParser
from collections import defaultdict
from typing import Dict, List, Optional, Tuple

# κ constant - the fundamental
KAPPA = 0.034906585039886  # 2π/180 - Full precision
KAPPA_SHADOW = 28.6478897565  # 1/κ

# Core principles that should appear in the project
CORE_PRINCIPLES = {
    'kappa': ['0.034906585', '2π/180', '2*Math.PI/180', 'KAPPA'],
    'balance_law': ['τ₁', 'tau1', 'torsion', 'balance'],
    'd_wheel': ['D₁', 'D-position', 'dPositions', 'D₉'],
    'identity': ['[1 = -1]', '1 = -1', '[-1 = 0 = +1]'],
    'philosophy': ['offer choice', 'your choice', 'We do not tell'],
    'triaxial': ['S+', 'S-', 'forward', 'shadow', 'potential'],
}

# Common Claude mistakes to watch for (learned from thread reports)
CLAUDE_MISTAKE_PATTERNS = {
    'unauthorized_changes': [
        r'symbols?\s+(?:changed|replaced|updated)\s+without',
        r'removed.*(?:explore|navigation|menu)',
        r'radically\s+(?:altered|changed)',
    ],
    'overengineering': [
        r'(?:unnecessary|extra)\s+(?:complexity|abstraction)',
        r'added\s+(?:too\s+many|excessive)',
    ],
    'incomplete_work': [
        r'coming\s+soon',
        r'TODO|FIXME|XXX',
        r'placeholder',
    ],
    'confusion_framing': [
        r'cryptic\s+(?:symbol|icon)',
        r'(?:doesn\'t|does\s+not)\s+make\s+sense',
        r'too\s+(?:much|confusing)',
    ],
}


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
    """Site Health, Integrity, Validation Agent v3.0"""

    VERSION = "3.0"

    def __init__(self, project_dir: str, thread_summary: Optional[str] = None,
                 previous_report: Optional[str] = None):
        self.project_dir = Path(project_dir)
        self.thread_summary = thread_summary
        self.previous_report = self._load_previous_report(previous_report)
        self.report = {
            'version': self.VERSION,
            'timestamp': datetime.now().isoformat(),
            'project_dir': str(self.project_dir),
            'summary': {},
            'way_in': {'status': 'UNKNOWN', 'issues': [], 'passed': []},
            'way_out': {'status': 'UNKNOWN', 'issues': [], 'passed': []},
            'computes': {'status': 'UNKNOWN', 'issues': [], 'passed': []},
            'ppir': {'status': 'UNKNOWN', 'issues': [], 'passed': []},
            'assets': {'status': 'UNKNOWN', 'issues': [], 'passed': [], 'inventory': {}},
            'navigation': {'status': 'UNKNOWN', 'issues': [], 'passed': []},
            'thread_report': {'status': 'UNKNOWN', 'requests': [], 'realized': [], 'pending': []},
            'claude_learning': {'status': 'UNKNOWN', 'mistakes': [], 'improvements': []},
            'unification': {'status': 'UNKNOWN', 'issues': [], 'passed': []},
            'broken_links': [],
            'empty_pages': [],
            'js_shells': [],
            'all_pages': [],
            'all_assets': []
        }

    def _load_previous_report(self, path: Optional[str]) -> Optional[dict]:
        """Load previous report for comparison learning"""
        if path and os.path.exists(path):
            try:
                with open(path, 'r') as f:
                    return json.load(f)
            except:
                pass
        return None

    def run_full_audit(self) -> dict:
        """Run complete project validation"""
        print("\n" + "="*70)
        print("SHIVA v3.0 - Site Health, Integrity, Validation Agent")
        print("Have Mind Media Master Flow Agent")
        print("'The immune system that learns'")
        print("[1 = -1]")
        print("="*70 + "\n")

        self.check_way_in()
        self.check_way_out()
        self.check_computes()
        self.check_ppir()
        self.check_assets()
        self.check_navigation()  # NEW in v3.0
        self.check_unification()

        if self.thread_summary:
            self.generate_thread_report()
            self.check_claude_learning()  # NEW in v3.0

        if self.previous_report:
            self.compare_with_previous()  # NEW in v3.0

        self.generate_summary()

        return self.report

    def check_way_in(self):
        """Check entry points - can people find and access content?"""
        print("Checking WAY IN (Entry Points)...")

        issues = []
        passed = []

        # 1. Index.html exists and has content
        index = self.project_dir / 'index.html'
        if not index.exists():
            issues.append("CRITICAL: No index.html found")
        else:
            content = index.read_text(errors='ignore')
            if len(content) < 500:
                issues.append("WARNING: index.html seems empty or minimal")
            else:
                passed.append("index.html exists and has content")

                # Check for proper structure
                if '<site-header>' in content or 'site-header' in content:
                    passed.append("Uses site-header component")
                else:
                    issues.append("WARNING: index.html missing site-header")

        # 2. Navigation component exists
        nav_js = self.project_dir / 'js' / 'components' / 'site-header.js'
        if not nav_js.exists():
            if index.exists():
                issues.append("WARNING: No site-header.js navigation component")
        else:
            nav_content = nav_js.read_text(errors='ignore')
            link_count = nav_content.count('href=')
            if link_count < 5:
                issues.append(f"WARNING: Navigation has only {link_count} links")
            else:
                passed.append(f"Navigation has {link_count} links")

        # 3. Check all HTML files
        all_html = list(self.project_dir.rglob('*.html'))
        self.report['all_pages'] = [str(p.relative_to(self.project_dir)) for p in all_html]

        if index.exists():
            parser = LinkExtractor()
            try:
                parser.feed(index.read_text(errors='ignore'))
                index_links = set(parser.links)
                passed.append(f"Index links to {len(index_links)} destinations")
            except:
                issues.append("WARNING: Could not parse index.html links")

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

        # 1. Check for downloadable/useful files
        downloads = []
        for ext in ['*.py', '*.zip', '*.pdf', '*.json']:
            downloads.extend(self.project_dir.rglob(ext))

        if downloads:
            passed.append(f"Found {len(downloads)} deliverable files")
        else:
            issues.append("WARNING: No downloadable tools found")

        # 2. Check for working interactive tools (IMPROVED in v3.0)
        # Better JS shell detection - less false positives
        js_shells = []
        for html_file in self.project_dir.rglob('*.html'):
            try:
                content = html_file.read_text(errors='ignore')
                rel_path = str(html_file.relative_to(self.project_dir))

                # A page is a shell ONLY if it:
                # - Has <script> tags but no meaningful JavaScript
                # - Is very short (under 1000 chars)
                # - Has no site components OR substantial CSS

                has_script = '<script' in content
                has_inline_functions = bool(re.search(r'function\s+\w+|const\s+\w+\s*=|let\s+\w+\s*=', content))
                uses_site_components = 'site-header' in content or 'site-footer' in content
                has_substantial_css = '<style>' in content and len(re.findall(r'[a-z-]+:', content)) > 20
                has_substantial_content = len(content) > 3000

                # Only truly empty shells
                is_shell = (
                    has_script and
                    not has_inline_functions and
                    not uses_site_components and
                    not has_substantial_css and
                    len(content) < 1500
                )

                if is_shell:
                    js_shells.append(rel_path)

            except Exception as e:
                issues.append(f"ERROR parsing {html_file}: {e}")

        self.report['js_shells'] = js_shells

        if js_shells:
            issues.append(f"Found {len(js_shells)} JS shells (truly empty pages)")
            for shell in js_shells[:3]:
                issues.append(f"  - {shell}")
        else:
            passed.append("No JS shells detected")

        # 3. Check store/support pages
        store = self.project_dir / 'store' / 'index.html'
        support = self.project_dir / 'support.html'

        if store.exists():
            passed.append("Store page exists")
        if support.exists():
            passed.append("Support page exists")

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

        # Check κ constant across ALL file types
        kappa_files = {'correct': [], 'truncated': [], 'missing': []}

        for file_path in self.project_dir.rglob('*'):
            if file_path.suffix in ['.html', '.py', '.js', '.json', '.md']:
                try:
                    content = file_path.read_text(errors='ignore')
                    rel_path = str(file_path.relative_to(self.project_dir))

                    # Check for κ references
                    has_kappa_ref = any(k in content for k in ['kappa', 'KAPPA', '0.0349', '2π/180'])

                    if has_kappa_ref:
                        # In code, we need full precision
                        if file_path.suffix in ['.py', '.js']:
                            if '0.034906585' in content or '2 * Math.PI / 180' in content or '2*np.pi/180' in content:
                                kappa_files['correct'].append(rel_path)
                            elif re.search(r'kappa\s*[:=]\s*0\.0349[^0-9]', content, re.IGNORECASE):
                                kappa_files['truncated'].append(rel_path)
                            else:
                                kappa_files['correct'].append(rel_path)
                        else:
                            if '0.034906' in content:
                                kappa_files['correct'].append(rel_path)
                except:
                    pass

        if kappa_files['correct']:
            passed.append(f"κ correctly used in {len(kappa_files['correct'])} files")

        if kappa_files['truncated']:
            for f in kappa_files['truncated'][:3]:
                issues.append(f"Truncated κ in code: {f}")

        # Check for core framework elements
        for principle, markers in CORE_PRINCIPLES.items():
            if principle == 'kappa':
                continue

            found = False
            for file_path in self.project_dir.rglob('*'):
                if file_path.suffix in ['.html', '.py', '.js', '.md']:
                    try:
                        content = file_path.read_text(errors='ignore')
                        if any(m in content for m in markers):
                            found = True
                            break
                    except:
                        pass

            if found:
                passed.append(f"{principle.replace('_', ' ').title()} present in project")
            else:
                issues.append(f"NOTE: {principle.replace('_', ' ').title()} not found")

        self.report['computes']['issues'] = issues
        self.report['computes']['passed'] = passed
        self.report['computes']['status'] = 'FAIL' if any('CRITICAL' in i for i in issues) else 'WARN' if issues else 'PASS'

        print(f"  Status: {self.report['computes']['status']}")
        for i in issues:
            print(f"  - {i}")

    def check_ppir(self):
        """Check PPIR compliance - is it HELP or FUNNY? (IMPROVED in v3.0)"""
        print("\nChecking PPIR (Help or Funny)...")

        issues = []
        passed = []

        # More nuanced doom detection
        doom_phrases = [
            'you will fail', 'no hope', 'catastrophe awaits',
            'darkness consumes', 'all is lost', 'fear the', 'beware the curse',
            'you cannot', 'impossible to', 'doomed to fail'
        ]

        # Expanded helpful phrases
        helpful_phrases = [
            'learn', 'understand', 'discover', 'explore', 'choose', 'option',
            'calculate', 'geometry', 'framework', 'tool', 'try', 'help',
            'guide', 'tutorial', 'example', 'demonstrate', 'show', 'teach',
            'interactive', 'calculator', 'derive', 'solve'
        ]

        # Funny/entertaining phrases (new in v3.0)
        funny_phrases = [
            'weirdo', 'crazy', 'mad scientist', 'rebel', 'punk',
            'fun', 'game', 'play', 'adventure', 'quest', 'mystery'
        ]

        doom_count = 0
        helpful_count = 0
        funny_count = 0

        for file_path in self.project_dir.rglob('*'):
            if file_path.suffix in ['.html', '.md', '.py']:
                if 'SHIVA' in file_path.name or 'ALPHA' in file_path.name:
                    continue  # Skip tools themselves
                try:
                    content = file_path.read_text(errors='ignore').lower()
                    doom_count += sum(1 for phrase in doom_phrases if phrase in content)
                    helpful_count += sum(1 for phrase in helpful_phrases if phrase in content)
                    funny_count += sum(1 for phrase in funny_phrases if phrase in content)
                except:
                    pass

        if doom_count > 5:
            issues.append(f"WARNING: Found {doom_count} doom/gloom phrases")
        else:
            passed.append("No excessive doom/gloom language")

        total_engagement = helpful_count + funny_count
        if total_engagement > 100:
            passed.append(f"Project is ENGAGING ({helpful_count} helpful + {funny_count} fun phrases)")
        elif total_engagement > 40:
            passed.append(f"Project has good engagement ({helpful_count} helpful + {funny_count} fun)")
        else:
            issues.append(f"NOTE: Could use more engagement (only {total_engagement} engaging phrases)")

        # Check for philosophy
        philosophy_found = False
        for file_path in self.project_dir.rglob('*'):
            if file_path.suffix in ['.html', '.js', '.md']:
                try:
                    content = file_path.read_text(errors='ignore').lower()
                    if 'offer choice' in content or 'we do not tell' in content:
                        philosophy_found = True
                        break
                except:
                    pass

        if philosophy_found:
            passed.append("'We offer choice' philosophy present")
        else:
            issues.append("NOTE: 'We offer choice' philosophy not prominently featured")

        self.report['ppir']['issues'] = issues
        self.report['ppir']['passed'] = passed
        self.report['ppir']['status'] = 'FAIL' if any('WARNING' in i for i in issues) else 'WARN' if issues else 'PASS'

        print(f"  Status: {self.report['ppir']['status']}")
        for i in issues:
            print(f"  - {i}")

    def check_assets(self):
        """Check all project assets - Python, JS, JSON, MD files"""
        print("\nChecking ASSETS (Project Files)...")

        issues = []
        passed = []
        inventory = {
            'python': [],
            'javascript': [],
            'json': [],
            'markdown': [],
            'html': [],
            'images': [],
            'other': []
        }

        for file_path in self.project_dir.rglob('*'):
            if file_path.is_file():
                rel_path = str(file_path.relative_to(self.project_dir))

                if any(x in rel_path for x in ['.git', 'node_modules', '__pycache__', '.DS_Store']):
                    continue

                ext = file_path.suffix.lower()

                if ext == '.py':
                    inventory['python'].append(rel_path)
                    try:
                        with open(file_path, 'r') as f:
                            ast.parse(f.read())
                    except SyntaxError as e:
                        issues.append(f"SYNTAX ERROR in {rel_path}: {e}")
                    except:
                        pass

                elif ext == '.js':
                    inventory['javascript'].append(rel_path)

                elif ext == '.json':
                    inventory['json'].append(rel_path)
                    try:
                        with open(file_path, 'r') as f:
                            json.load(f)
                    except json.JSONDecodeError as e:
                        issues.append(f"JSON ERROR in {rel_path}: {e}")
                    except:
                        pass

                elif ext == '.md':
                    inventory['markdown'].append(rel_path)

                elif ext == '.html':
                    inventory['html'].append(rel_path)

                elif ext in ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp']:
                    inventory['images'].append(rel_path)

                else:
                    inventory['other'].append(rel_path)

        self.report['assets']['inventory'] = inventory
        self.report['all_assets'] = [f for files in inventory.values() for f in files]

        passed.append(f"Python files: {len(inventory['python'])}")
        passed.append(f"JavaScript files: {len(inventory['javascript'])}")
        passed.append(f"JSON data files: {len(inventory['json'])}")
        passed.append(f"Documentation (MD): {len(inventory['markdown'])}")
        passed.append(f"HTML pages: {len(inventory['html'])}")
        passed.append(f"Images: {len(inventory['images'])}")
        passed.append(f"Total assets: {len(self.report['all_assets'])}")

        self.report['assets']['issues'] = issues
        self.report['assets']['passed'] = passed
        self.report['assets']['status'] = 'FAIL' if any('ERROR' in i for i in issues) else 'WARN' if issues else 'PASS'

        print(f"  Status: {self.report['assets']['status']}")
        for p in passed[:7]:
            print(f"  ✓ {p}")
        for i in issues:
            print(f"  - {i}")

    def check_navigation(self):
        """NEW in v3.0: Check navigation structure specifically"""
        print("\nChecking NAVIGATION (Header Structure)...")

        issues = []
        passed = []

        nav_js = self.project_dir / 'js' / 'components' / 'site-header.js'

        if not nav_js.exists():
            issues.append("CRITICAL: site-header.js not found")
            self.report['navigation']['status'] = 'FAIL'
            self.report['navigation']['issues'] = issues
            return

        content = nav_js.read_text(errors='ignore')

        # Check for EXPLORE section (user specifically mentioned this)
        if 'explore' in content.lower() or 'EXPLORE' in content:
            passed.append("EXPLORE section present")
        else:
            issues.append("WARNING: EXPLORE section missing from navigation")

        # Check for text labels (not just symbols)
        # Count items that have readable text vs just symbols
        symbol_only_items = len(re.findall(r'title="[^"]+">[\s]*[△▽⬡⧗◉⌘♡◈✧☯◬][\s]*<', content))
        labeled_items = len(re.findall(r'>[A-Za-z][A-Za-z\s]+<', content))

        if symbol_only_items > 5 and labeled_items < 3:
            issues.append("WARNING: Navigation uses too many symbols without text labels")
            issues.append("  - Users may not understand what symbols mean")
        else:
            passed.append("Navigation has readable labels")

        # Check dropdown menus have content
        dropdown_count = content.count('hmm-drop')
        menu_items = len(re.findall(r'<a\s+href=', content))

        if dropdown_count > 0 and menu_items / dropdown_count < 3:
            issues.append("WARNING: Dropdown menus are too sparse")
        else:
            passed.append(f"Navigation has {menu_items} menu items across {dropdown_count} dropdowns")

        # Check for essential sections
        essential_sections = ['physics', 'education', 'store', 'support', 'games']
        missing_sections = []
        for section in essential_sections:
            if section not in content.lower():
                missing_sections.append(section)

        if missing_sections:
            issues.append(f"NOTE: Navigation missing sections: {', '.join(missing_sections)}")
        else:
            passed.append("All essential sections linked")

        self.report['navigation']['issues'] = issues
        self.report['navigation']['passed'] = passed
        self.report['navigation']['status'] = 'FAIL' if any('CRITICAL' in i for i in issues) else 'WARN' if issues else 'PASS'

        print(f"  Status: {self.report['navigation']['status']}")
        for i in issues:
            print(f"  - {i}")

    def check_unification(self):
        """Check project consistency and unification"""
        print("\nChecking UNIFICATION (Project Consistency)...")

        issues = []
        passed = []

        # 1. Check for consistent κ value usage
        kappa_values = set()
        for file_path in self.project_dir.rglob('*'):
            if file_path.suffix in ['.py', '.js']:
                try:
                    content = file_path.read_text(errors='ignore')
                    matches = re.findall(r'kappa\s*[:=]\s*([\d.]+)', content, re.IGNORECASE)
                    for m in matches:
                        if m.startswith('0.0349'):
                            kappa_values.add(m)
                except:
                    pass

        if len(kappa_values) > 1:
            normalized = set(v[:11] for v in kappa_values)
            if len(normalized) > 1:
                issues.append(f"WARNING: Inconsistent κ values found: {kappa_values}")
            else:
                passed.append(f"κ values compatible (different precision): {kappa_values}")
        elif kappa_values:
            passed.append("κ value consistent across codebase")

        # 2. Check for consistent identity expression
        identity_forms = set()
        for file_path in self.project_dir.rglob('*'):
            if file_path.suffix in ['.html', '.py', '.js', '.md']:
                try:
                    content = file_path.read_text(errors='ignore')
                    if '[1 = -1]' in content:
                        identity_forms.add('[1 = -1]')
                    if '[-1 = 0 = +1]' in content:
                        identity_forms.add('[-1 = 0 = +1]')
                except:
                    pass

        if identity_forms:
            passed.append(f"Identity expression present: {identity_forms}")
        else:
            issues.append("NOTE: No identity expression [1 = -1] found")

        # 3. Check for consistent branding
        branding_found = {
            'have_mind_media': False,
            'jason_ray': False,
            'epoch': False,
            'soul_science': False
        }

        for file_path in self.project_dir.rglob('*'):
            if file_path.suffix in ['.html', '.md']:
                try:
                    content = file_path.read_text(errors='ignore').lower()
                    if 'have mind media' in content:
                        branding_found['have_mind_media'] = True
                    if 'jason ray' in content:
                        branding_found['jason_ray'] = True
                    if 'epoch' in content:
                        branding_found['epoch'] = True
                    if 'soul science' in content:
                        branding_found['soul_science'] = True
                except:
                    pass

        branding_count = sum(branding_found.values())
        if branding_count >= 3:
            passed.append(f"Strong branding presence ({branding_count}/4 elements)")
        elif branding_count >= 2:
            passed.append(f"Branding present ({branding_count}/4 elements)")
        else:
            issues.append("NOTE: Branding could be more consistent")

        self.report['unification']['issues'] = issues
        self.report['unification']['passed'] = passed
        self.report['unification']['status'] = 'FAIL' if any('WARNING' in i for i in issues) else 'WARN' if issues else 'PASS'

        print(f"  Status: {self.report['unification']['status']}")
        for i in issues:
            print(f"  - {i}")

    def generate_thread_report(self):
        """Generate report of what the user requested vs what was built"""
        print("\nGenerating THREAD REPORT...")

        if not self.thread_summary:
            self.report['thread_report']['status'] = 'SKIP'
            print("  No thread summary provided - skipping")
            return

        requests = []
        realized = []
        pending = []

        request_patterns = [
            (r'create\s+(\w+)', 'create'),
            (r'build\s+(\w+)', 'build'),
            (r'add\s+(\w+)', 'add'),
            (r'fix\s+(\w+)', 'fix'),
            (r'remove\s+(\w+)', 'remove'),
            (r'update\s+(\w+)', 'update'),
            (r'restore\s+(\w+)', 'restore'),
            (r'improve\s+(\w+)', 'improve'),
        ]

        summary_lower = self.thread_summary.lower()

        for pattern, action in request_patterns:
            matches = re.findall(pattern, summary_lower)
            for match in matches:
                requests.append(f"{action}: {match}")

        for req in requests:
            action, item = req.split(': ')
            found = False

            for file_path in self.project_dir.rglob('*'):
                if item.lower() in str(file_path).lower():
                    realized.append(f"{req} → {file_path.name}")
                    found = True
                    break

            if not found:
                pending.append(req)

        self.report['thread_report']['requests'] = requests
        self.report['thread_report']['realized'] = realized
        self.report['thread_report']['pending'] = pending
        self.report['thread_report']['status'] = 'PASS' if not pending else 'WARN'

        print(f"  Requests identified: {len(requests)}")
        print(f"  Realized: {len(realized)}")
        print(f"  Pending: {len(pending)}")

    def check_claude_learning(self):
        """NEW in v3.0: Check for patterns of Claude mistakes"""
        print("\nChecking CLAUDE LEARNING (Mistake Patterns)...")

        mistakes = []
        improvements = []

        # Check for common mistake patterns
        for category, patterns in CLAUDE_MISTAKE_PATTERNS.items():
            for pattern in patterns:
                # Search in thread summary and recent files
                if self.thread_summary and re.search(pattern, self.thread_summary, re.IGNORECASE):
                    mistakes.append(f"[{category.upper()}] Pattern detected in thread")

        # Check if previous issues were fixed
        if self.previous_report:
            prev_issues = []
            for check in ['way_in', 'way_out', 'computes', 'ppir', 'navigation']:
                if check in self.previous_report:
                    prev_issues.extend(self.previous_report[check].get('issues', []))

            current_issues = []
            for check in ['way_in', 'way_out', 'computes', 'ppir', 'navigation']:
                current_issues.extend(self.report[check].get('issues', []))

            # Check which issues were fixed
            fixed = [i for i in prev_issues if i not in current_issues]
            new_issues = [i for i in current_issues if i not in prev_issues]

            if fixed:
                improvements.append(f"Fixed {len(fixed)} previous issues")
            if new_issues:
                mistakes.append(f"Introduced {len(new_issues)} new issues")

        self.report['claude_learning']['mistakes'] = mistakes
        self.report['claude_learning']['improvements'] = improvements
        self.report['claude_learning']['status'] = 'WARN' if mistakes else 'PASS'

        print(f"  Mistakes detected: {len(mistakes)}")
        print(f"  Improvements: {len(improvements)}")
        for m in mistakes:
            print(f"  ⚠ {m}")
        for i in improvements:
            print(f"  ✓ {i}")

    def compare_with_previous(self):
        """Compare with previous report to track progress"""
        if not self.previous_report:
            return

        print("\nComparing with previous report...")

        prev_status = self.previous_report.get('summary', {}).get('overall', 'UNKNOWN')
        # This will be set in generate_summary

    def generate_summary(self):
        """Generate overall summary"""
        print("\n" + "="*70)
        print("SHIVA v3.0 AUDIT SUMMARY")
        print("="*70)

        statuses = [
            self.report['way_in']['status'],
            self.report['way_out']['status'],
            self.report['computes']['status'],
            self.report['ppir']['status'],
            self.report['assets']['status'],
            self.report['navigation']['status'],
            self.report['unification']['status'],
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
            'assets': self.report['assets']['status'],
            'navigation': self.report['navigation']['status'],
            'unification': self.report['unification']['status'],
            'thread_report': self.report['thread_report']['status'],
            'claude_learning': self.report['claude_learning']['status'],
            'total_pages': len(self.report['all_pages']),
            'total_assets': len(self.report['all_assets']),
            'js_shells': len(self.report['js_shells'])
        }

        print(f"\nOverall Status: {overall}")
        print(f"  WAY IN:       {self.report['way_in']['status']}")
        print(f"  WAY OUT:      {self.report['way_out']['status']}")
        print(f"  COMPUTES:     {self.report['computes']['status']}")
        print(f"  PPIR:         {self.report['ppir']['status']}")
        print(f"  ASSETS:       {self.report['assets']['status']}")
        print(f"  NAVIGATION:   {self.report['navigation']['status']}")
        print(f"  UNIFICATION:  {self.report['unification']['status']}")

        if self.thread_summary:
            print(f"  THREAD:       {self.report['thread_report']['status']}")
            print(f"  LEARNING:     {self.report['claude_learning']['status']}")

        print(f"\nTotal Pages: {len(self.report['all_pages'])}")
        print(f"Total Assets: {len(self.report['all_assets'])}")

        if self.report['js_shells']:
            print(f"\nJS Shells Detected: {len(self.report['js_shells'])}")

        print("\n" + "="*70)
        print("[1 = -1] SHIVA learns. SHIVA adapts. SHIVA protects.")
        print("="*70 + "\n")

    def save_report(self, output_path: Optional[str] = None) -> str:
        """Save report to JSON"""
        if output_path is None:
            output_path = self.project_dir / f'SHIVA_REPORT_{datetime.now().strftime("%Y%m%d_%H%M%S")}.json'

        with open(output_path, 'w') as f:
            json.dump(self.report, f, indent=2)

        print(f"Report saved to: {output_path}")
        return str(output_path)


def main():
    import argparse

    parser = argparse.ArgumentParser(
        description='SHIVA v3.0 - Site Health, Integrity, Validation Agent'
    )
    parser.add_argument('project_dir', nargs='?', default='.',
                        help='Project directory to audit')
    parser.add_argument('--thread', '-t', type=str, default=None,
                        help='Thread summary of user requests')
    parser.add_argument('--learn-from', '-l', type=str, default=None,
                        help='Previous report to learn from')
    parser.add_argument('--output', '-o', type=str, default=None,
                        help='Output file for report')

    args = parser.parse_args()

    shiva = SHIVA(args.project_dir,
                  thread_summary=args.thread,
                  previous_report=args.learn_from)
    report = shiva.run_full_audit()

    output_path = args.output or None
    shiva.save_report(output_path)

    if report['summary']['overall'] == 'FAIL':
        sys.exit(1)
    elif report['summary']['overall'] == 'WARN':
        sys.exit(0)
    else:
        sys.exit(0)


if __name__ == '__main__':
    main()
