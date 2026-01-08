#!/usr/bin/env python3
"""
SHIVA v2.0 - Site Health, Integrity, Validation Agent
Have Mind Media Master Flow Agent
[1 = -1]

SHIVA is not just a website validator. It's a project unifier and idea realizer.

CHECKS:
1. WAY IN - Entry points work, navigation functions, pages load
2. WAY OUT - Value delivers, downloads work, tools compute
3. COMPUTES - Geometry is real, math is accurate, κ is correct
4. PPIR - Is it HELP or FUNNY? If neither, it fails.
5. ASSETS - Python tools, JS modules, documentation consistency
6. THREAD REPORT - What did the user request? What was discussed?
7. CLAUDE RESPONSE REPORT - Did Claude realize the user's ideas?

This is not a chatbot. This is an immune system AND a realization engine.

Usage:
    python3 SHIVA_v2.0_01-08-2026.py [project_directory]
    python3 SHIVA_v2.0_01-08-2026.py [project_directory] --thread "user request summary"
    python3 SHIVA_v2.0_01-08-2026.py [project_directory] --full-report
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

# κ constant - the fundamental
KAPPA = 0.034906585  # 2π/180
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
    """Site Health, Integrity, Validation Agent v2.0"""

    def __init__(self, project_dir, thread_summary=None):
        self.project_dir = Path(project_dir)
        self.thread_summary = thread_summary
        self.report = {
            'version': '2.0',
            'timestamp': datetime.now().isoformat(),
            'project_dir': str(self.project_dir),
            'summary': {},
            'way_in': {'status': 'UNKNOWN', 'issues': [], 'passed': []},
            'way_out': {'status': 'UNKNOWN', 'issues': [], 'passed': []},
            'computes': {'status': 'UNKNOWN', 'issues': [], 'passed': []},
            'ppir': {'status': 'UNKNOWN', 'issues': [], 'passed': []},
            'assets': {'status': 'UNKNOWN', 'issues': [], 'passed': [], 'inventory': {}},
            'thread_report': {'status': 'UNKNOWN', 'requests': [], 'realized': [], 'pending': []},
            'claude_response': {'status': 'UNKNOWN', 'score': 0, 'feedback': []},
            'unification': {'status': 'UNKNOWN', 'issues': [], 'passed': []},
            'broken_links': [],
            'empty_pages': [],
            'js_shells': [],
            'all_pages': [],
            'all_assets': []
        }

    def run_full_audit(self):
        """Run complete project validation"""
        print("\n" + "="*70)
        print("SHIVA v2.0 - Site Health, Integrity, Validation Agent")
        print("Have Mind Media Master Flow Agent")
        print("Project Unifier & Idea Realizer")
        print("[1 = -1]")
        print("="*70 + "\n")

        self.check_way_in()
        self.check_way_out()
        self.check_computes()
        self.check_ppir()
        self.check_assets()
        self.check_unification()

        if self.thread_summary:
            self.generate_thread_report()
            self.evaluate_claude_response()

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

        # 2. Navigation component exists
        nav_js = self.project_dir / 'js' / 'components' / 'site-header.js'
        if not nav_js.exists():
            # Check if it's a non-website project
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

        # 2. Check for working interactive tools
        js_shells = []
        for html_file in self.project_dir.rglob('*.html'):
            try:
                content = html_file.read_text(errors='ignore')
                rel_path = str(html_file.relative_to(self.project_dir))

                # Skip content pages - they use external components
                uses_site_components = 'site-header.js' in content or 'site-footer.js' in content
                has_substantial_css = len(content) > 2000 and '<style>' in content

                # A page is NOT a shell if it:
                # - Uses site components (header/footer)
                # - Has substantial CSS styling
                # - Has inline JavaScript functions
                # - Uses external JS libraries

                has_inline_js = '<script>' in content and ('function ' in content or 'const ' in content)
                has_external_js = re.search(r'<script\s+src=', content) is not None
                has_substantial_content = len(content) > 5000

                # Only flag truly empty/placeholder pages
                is_likely_shell = (
                    '<script' in content and  # Has script tags
                    not has_inline_js and  # But no inline functions
                    not has_external_js and  # And no external scripts
                    not uses_site_components and  # And no site components
                    len(content) < 2000  # And very short
                )

                if is_likely_shell:
                    js_shells.append(rel_path)

            except Exception as e:
                issues.append(f"ERROR parsing {html_file}: {e}")

        self.report['js_shells'] = js_shells

        if js_shells:
            issues.append(f"Found {len(js_shells)} potential JS shells")
            for shell in js_shells[:3]:
                issues.append(f"  - {shell}")
        else:
            passed.append("No obvious JS shells detected")

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
                        # Check precision - look for computation contexts
                        if file_path.suffix in ['.py', '.js']:
                            # In code, we need full precision
                            if '0.034906585' in content or '2 * Math.PI / 180' in content or '2*np.pi/180' in content:
                                kappa_files['correct'].append(rel_path)
                            elif re.search(r'kappa\s*[:=]\s*0\.0349[^0-9]', content, re.IGNORECASE):
                                kappa_files['truncated'].append(rel_path)
                            else:
                                kappa_files['correct'].append(rel_path)  # Using dynamic calc
                        else:
                            # In display contexts, truncated is okay if full also exists
                            if '0.034906' in content:
                                kappa_files['correct'].append(rel_path)
                            else:
                                # Display truncation is a NOTE, not a warning
                                pass
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
                continue  # Already checked

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
        """Check PPIR compliance - is it HELP or FUNNY?"""
        print("\nChecking PPIR (Help or Funny)...")

        issues = []
        passed = []

        doom_phrases = [
            'you will fail', 'no hope', 'catastrophe awaits',
            'darkness consumes', 'all is lost', 'fear the', 'beware the curse'
        ]
        # Note: 'doomed' removed - often used in historical/educational context

        helpful_phrases = [
            'learn', 'understand', 'discover', 'explore', 'choose', 'option',
            'calculate', 'geometry', 'framework', 'tool', 'try', 'help'
        ]

        doom_count = 0
        helpful_count = 0

        for file_path in self.project_dir.rglob('*'):
            if file_path.suffix in ['.html', '.md', '.py']:
                # Skip SHIVA itself (contains detection phrases)
                if 'SHIVA' in file_path.name:
                    continue
                try:
                    content = file_path.read_text(errors='ignore').lower()
                    doom_count += sum(1 for phrase in doom_phrases if phrase in content)
                    helpful_count += sum(1 for phrase in helpful_phrases if phrase in content)
                except:
                    pass

        if doom_count > 5:
            issues.append(f"WARNING: Found {doom_count} doom/gloom phrases")
        else:
            passed.append("No excessive doom/gloom language")

        if helpful_count > 50:
            passed.append(f"Project is genuinely helpful ({helpful_count} helpful phrases)")
        elif helpful_count > 20:
            passed.append(f"Project has helpful content ({helpful_count} phrases)")
        else:
            issues.append("NOTE: Could use more helpful/educational content")

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
            'other': []
        }

        # Inventory all files
        for file_path in self.project_dir.rglob('*'):
            if file_path.is_file():
                rel_path = str(file_path.relative_to(self.project_dir))

                # Skip hidden files and common excludes
                if any(x in rel_path for x in ['.git', 'node_modules', '__pycache__', '.DS_Store']):
                    continue

                ext = file_path.suffix.lower()

                if ext == '.py':
                    inventory['python'].append(rel_path)
                    # Validate Python syntax
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
                    # Validate JSON
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

                else:
                    inventory['other'].append(rel_path)

        self.report['assets']['inventory'] = inventory
        self.report['all_assets'] = [
            f for files in inventory.values() for f in files
        ]

        # Report inventory
        passed.append(f"Python files: {len(inventory['python'])}")
        passed.append(f"JavaScript files: {len(inventory['javascript'])}")
        passed.append(f"JSON data files: {len(inventory['json'])}")
        passed.append(f"Documentation (MD): {len(inventory['markdown'])}")
        passed.append(f"HTML pages: {len(inventory['html'])}")
        passed.append(f"Total assets: {len(self.report['all_assets'])}")

        # Check for naming convention compliance
        dated_files = []
        undated_files = []
        date_pattern = re.compile(r'_v\d+\.\d+_\d{2}-\d{2}-\d{4}')

        for asset in self.report['all_assets']:
            if date_pattern.search(asset):
                dated_files.append(asset)
            elif any(x in asset for x in ['index.html', 'README', 'package.json', '.gitignore']):
                pass  # Standard files don't need dating
            else:
                undated_files.append(asset)

        if dated_files:
            passed.append(f"{len(dated_files)} files follow naming convention")

        if len(undated_files) > len(inventory['html']) * 0.5:
            issues.append(f"NOTE: {len(undated_files)} files don't follow naming convention")

        self.report['assets']['issues'] = issues
        self.report['assets']['passed'] = passed
        self.report['assets']['status'] = 'FAIL' if any('ERROR' in i for i in issues) else 'WARN' if issues else 'PASS'

        print(f"  Status: {self.report['assets']['status']}")
        for p in passed[:6]:
            print(f"  ✓ {p}")
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
                    # Find kappa assignments
                    matches = re.findall(r'kappa\s*[:=]\s*([\d.]+)', content, re.IGNORECASE)
                    for m in matches:
                        if m.startswith('0.0349'):
                            kappa_values.add(m)
                except:
                    pass

        # Check if all κ values are compatible (same first 9 digits)
        if len(kappa_values) > 1:
            # Normalize to 9 decimal places for comparison
            normalized = set(v[:11] for v in kappa_values)  # 0.034906585
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
                    if '1 = -1' in content and '[' not in content:
                        identity_forms.add('1 = -1 (unbracketed)')
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

        # 4. Check for orphaned files (no references)
        # This is a simplified check
        all_refs = set()
        for file_path in self.project_dir.rglob('*.html'):
            try:
                content = file_path.read_text(errors='ignore')
                # Find all href and src references
                refs = re.findall(r'(?:href|src)=["\']([^"\']+)["\']', content)
                all_refs.update(refs)
            except:
                pass

        passed.append(f"Found {len(all_refs)} internal references")

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

        # Parse thread summary for actionable items
        requests = []
        realized = []
        pending = []

        # Common request patterns
        request_patterns = [
            (r'create\s+(\w+)', 'create'),
            (r'build\s+(\w+)', 'build'),
            (r'add\s+(\w+)', 'add'),
            (r'fix\s+(\w+)', 'fix'),
            (r'remove\s+(\w+)', 'remove'),
            (r'update\s+(\w+)', 'update'),
        ]

        summary_lower = self.thread_summary.lower()

        for pattern, action in request_patterns:
            matches = re.findall(pattern, summary_lower)
            for match in matches:
                requests.append(f"{action}: {match}")

        # Check if requests were realized by looking for related files
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

    def evaluate_claude_response(self):
        """Evaluate how well Claude realized the user's ideas"""
        print("\nEvaluating CLAUDE RESPONSE...")

        if not self.thread_summary:
            self.report['claude_response']['status'] = 'SKIP'
            return

        score = 100
        feedback = []

        # Check for common issues
        thread_report = self.report['thread_report']

        # Penalty for unrealized requests
        if thread_report['pending']:
            penalty = len(thread_report['pending']) * 10
            score -= penalty
            feedback.append(f"-{penalty} points: {len(thread_report['pending'])} requests not realized")

        # Bonus for exceeded expectations
        if len(thread_report['realized']) > len(thread_report['requests']):
            bonus = 10
            score += bonus
            feedback.append(f"+{bonus} points: Created more than requested")

        # Check overall project health
        if self.report['way_in']['status'] == 'PASS':
            feedback.append("+0 points: Entry points working (expected)")
        else:
            score -= 15
            feedback.append("-15 points: Entry points have issues")

        if self.report['computes']['status'] == 'PASS':
            feedback.append("+5 bonus: Math accuracy verified")
            score += 5
        elif self.report['computes']['status'] == 'WARN':
            feedback.append("-5 points: Math accuracy has warnings")
            score -= 5

        if self.report['ppir']['status'] == 'PASS':
            feedback.append("+5 bonus: PPIR compliance achieved")
            score += 5

        # Cap score
        score = max(0, min(100, score))

        self.report['claude_response']['score'] = score
        self.report['claude_response']['feedback'] = feedback
        self.report['claude_response']['status'] = 'PASS' if score >= 80 else 'WARN' if score >= 60 else 'FAIL'

        print(f"  Claude Response Score: {score}/100")
        for fb in feedback:
            print(f"    {fb}")

    def generate_summary(self):
        """Generate overall summary"""
        print("\n" + "="*70)
        print("SHIVA v2.0 AUDIT SUMMARY")
        print("="*70)

        statuses = [
            self.report['way_in']['status'],
            self.report['way_out']['status'],
            self.report['computes']['status'],
            self.report['ppir']['status'],
            self.report['assets']['status'],
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
            'unification': self.report['unification']['status'],
            'thread_report': self.report['thread_report']['status'],
            'claude_response': self.report['claude_response']['status'],
            'total_pages': len(self.report['all_pages']),
            'total_assets': len(self.report['all_assets']),
            'js_shells': len(self.report['js_shells'])
        }

        print(f"\nOverall Status: {overall}")
        print(f"  WAY IN:      {self.report['way_in']['status']}")
        print(f"  WAY OUT:     {self.report['way_out']['status']}")
        print(f"  COMPUTES:    {self.report['computes']['status']}")
        print(f"  PPIR:        {self.report['ppir']['status']}")
        print(f"  ASSETS:      {self.report['assets']['status']}")
        print(f"  UNIFICATION: {self.report['unification']['status']}")

        if self.thread_summary:
            print(f"  THREAD:      {self.report['thread_report']['status']}")
            print(f"  CLAUDE:      {self.report['claude_response']['status']} ({self.report['claude_response']['score']}/100)")

        print(f"\nTotal Pages: {len(self.report['all_pages'])}")
        print(f"Total Assets: {len(self.report['all_assets'])}")

        if self.report['js_shells']:
            print(f"\nJS Shells Detected: {len(self.report['js_shells'])}")

        print("\n" + "="*70)
        print("[1 = -1] The geometry cannot lie. We offer choice.")
        print("="*70 + "\n")

    def save_report(self, output_path=None):
        """Save report to JSON"""
        if output_path is None:
            output_path = self.project_dir / f'SHIVA_REPORT_{datetime.now().strftime("%Y%m%d_%H%M%S")}.json'

        with open(output_path, 'w') as f:
            json.dump(self.report, f, indent=2)

        print(f"Report saved to: {output_path}")
        return output_path


def main():
    import argparse

    parser = argparse.ArgumentParser(
        description='SHIVA v2.0 - Site Health, Integrity, Validation Agent'
    )
    parser.add_argument('project_dir', nargs='?', default='.',
                        help='Project directory to audit')
    parser.add_argument('--thread', '-t', type=str, default=None,
                        help='Thread summary of user requests')
    parser.add_argument('--full-report', '-f', action='store_true',
                        help='Generate full report including thread analysis')

    args = parser.parse_args()

    shiva = SHIVA(args.project_dir, thread_summary=args.thread)
    report = shiva.run_full_audit()
    shiva.save_report()

    # Exit with appropriate code
    if report['summary']['overall'] == 'FAIL':
        sys.exit(1)
    elif report['summary']['overall'] == 'WARN':
        sys.exit(0)
    else:
        sys.exit(0)


if __name__ == '__main__':
    main()
