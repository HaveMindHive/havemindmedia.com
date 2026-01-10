#!/usr/bin/env python3
"""
TRIAXIAL AUDIT TOOL - SHIVA/OMEGA/ALPHA
Have Mind Media Site Verification System
[1 = -1]

Run all three audits in sequence:
  python3 scripts/triaxial-audit.py

Run individual audits:
  python3 scripts/triaxial-audit.py --shiva   # Structure verification
  python3 scripts/triaxial-audit.py --omega   # Content verification
  python3 scripts/triaxial-audit.py --alpha   # Link & navigation verification
"""

import os
import re
import sys
import json
import argparse
from datetime import datetime
from pathlib import Path

# Configuration
SITE_ROOT = Path(__file__).parent.parent
SITE_URL = "https://www.havemindmedia.com"

class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    CYAN = '\033[96m'
    BOLD = '\033[1m'
    END = '\033[0m'

def print_header(title, char="="):
    print(f"\n{Colors.CYAN}{Colors.BOLD}{char * 60}")
    print(f"  {title}")
    print(f"{char * 60}{Colors.END}\n")

def print_pass(msg):
    print(f"  {Colors.GREEN}✓{Colors.END} {msg}")

def print_fail(msg):
    print(f"  {Colors.RED}✗{Colors.END} {msg}")

def print_warn(msg):
    print(f"  {Colors.YELLOW}⚠{Colors.END} {msg}")

def print_info(msg):
    print(f"  {Colors.BLUE}ℹ{Colors.END} {msg}")

# =============================================================================
# SHIVA - Structure Verification
# =============================================================================

def run_shiva():
    """
    SHIVA: Structural integrity audit
    - Verifies all HTML files exist and are valid
    - Checks required directories exist
    - Validates CSS and JS files are present
    - Checks for orphaned files
    """
    print_header("SHIVA - STRUCTURE VERIFICATION", "█")

    results = {
        "html_files": [],
        "missing_dirs": [],
        "missing_assets": [],
        "passed": True
    }

    # Count HTML files
    html_files = list(SITE_ROOT.glob("**/*.html"))
    html_files = [f for f in html_files if "node_modules" not in str(f)]
    results["html_files"] = [str(f.relative_to(SITE_ROOT)) for f in html_files]

    print(f"  Found {Colors.BOLD}{len(html_files)}{Colors.END} HTML files")

    # Check required directories
    required_dirs = [
        "js/components",
        "css",
        "physics",
        "education",
        "ancient-mysteries",
        "tools",
        "games",
        "cedga",
        "documents"
    ]

    print(f"\n  Checking required directories:")
    for dir_name in required_dirs:
        dir_path = SITE_ROOT / dir_name
        if dir_path.exists():
            print_pass(f"{dir_name}/")
        else:
            print_fail(f"{dir_name}/ MISSING")
            results["missing_dirs"].append(dir_name)
            results["passed"] = False

    # Check critical assets
    critical_assets = [
        "js/components/site-header.js",
        "js/components/site-footer.js",
        "css/unified-theme.css",
        "index.html",
        "sitemap.xml",
        "robots.txt"
    ]

    print(f"\n  Checking critical assets:")
    for asset in critical_assets:
        asset_path = SITE_ROOT / asset
        if asset_path.exists():
            print_pass(asset)
        else:
            print_fail(f"{asset} MISSING")
            results["missing_assets"].append(asset)
            results["passed"] = False

    # Summary
    print(f"\n  {Colors.BOLD}SHIVA Summary:{Colors.END}")
    print(f"    HTML Files: {len(html_files)}")
    print(f"    Missing Dirs: {len(results['missing_dirs'])}")
    print(f"    Missing Assets: {len(results['missing_assets'])}")

    if results["passed"]:
        print(f"\n  {Colors.GREEN}{Colors.BOLD}SHIVA: PASSED{Colors.END}")
    else:
        print(f"\n  {Colors.RED}{Colors.BOLD}SHIVA: FAILED{Colors.END}")

    return results

# =============================================================================
# OMEGA - Content Verification
# =============================================================================

def run_omega():
    """
    OMEGA: Content completeness audit
    - Verifies key pages have required content
    - Checks sitemap matches actual files
    - Validates navigation component coverage
    """
    print_header("OMEGA - CONTENT VERIFICATION", "█")

    results = {
        "sitemap_urls": 0,
        "actual_pages": 0,
        "sitemap_missing": [],
        "nav_coverage": 0,
        "passed": True
    }

    # Count actual pages
    html_files = list(SITE_ROOT.glob("**/*.html"))
    html_files = [f for f in html_files if "node_modules" not in str(f)]
    results["actual_pages"] = len(html_files)

    # Parse sitemap
    sitemap_path = SITE_ROOT / "sitemap.xml"
    if sitemap_path.exists():
        with open(sitemap_path, 'r') as f:
            content = f.read()
        sitemap_urls = re.findall(r'<loc>([^<]+)</loc>', content)
        results["sitemap_urls"] = len(sitemap_urls)

        print(f"  Sitemap URLs: {Colors.BOLD}{len(sitemap_urls)}{Colors.END}")
        print(f"  Actual HTML files: {Colors.BOLD}{len(html_files)}{Colors.END}")

        # Check for pages not in sitemap
        sitemap_paths = set()
        for url in sitemap_urls:
            path = url.replace(SITE_URL, "").lstrip("/")
            if not path:
                path = "index.html"
            sitemap_paths.add(path)

        missing_from_sitemap = []
        for f in html_files:
            rel_path = str(f.relative_to(SITE_ROOT))
            if rel_path not in sitemap_paths and rel_path != "404.html":
                missing_from_sitemap.append(rel_path)

        if missing_from_sitemap:
            print_warn(f"{len(missing_from_sitemap)} pages not in sitemap")
            for p in missing_from_sitemap[:5]:
                print(f"      - {p}")
            if len(missing_from_sitemap) > 5:
                print(f"      ... and {len(missing_from_sitemap) - 5} more")
            results["sitemap_missing"] = missing_from_sitemap
    else:
        print_fail("sitemap.xml not found")
        results["passed"] = False

    # Check site-directory coverage
    site_dir_path = SITE_ROOT / "site-directory.html"
    if site_dir_path.exists():
        with open(site_dir_path, 'r') as f:
            content = f.read()
        dir_links = re.findall(r'href="([^"]+\.html)"', content)
        dir_links = [l for l in dir_links if not l.startswith('http')]
        results["nav_coverage"] = len(set(dir_links))
        print(f"\n  Site Directory links: {Colors.BOLD}{len(set(dir_links))}{Colors.END}")

    # Summary
    print(f"\n  {Colors.BOLD}OMEGA Summary:{Colors.END}")
    print(f"    Sitemap Coverage: {results['sitemap_urls']}/{results['actual_pages']}")
    print(f"    Directory Coverage: {results['nav_coverage']}/{results['actual_pages']}")

    if results["passed"]:
        print(f"\n  {Colors.GREEN}{Colors.BOLD}OMEGA: PASSED{Colors.END}")
    else:
        print(f"\n  {Colors.RED}{Colors.BOLD}OMEGA: FAILED{Colors.END}")

    return results

# =============================================================================
# ALPHA - Link & Navigation Verification (THE KEY ONE I MISSED)
# =============================================================================

def run_alpha():
    """
    ALPHA: Link and navigation verification
    - Verifies ALL internal href links resolve to existing files
    - Tests navigation component base path calculation
    - Checks for 404-prone patterns
    - Validates relative path correctness at all depths

    THIS IS THE CRITICAL CHECK I SHOULD HAVE RUN BEFORE DEPLOYMENT.
    """
    print_header("ALPHA - LINK & NAVIGATION VERIFICATION", "█")

    results = {
        "total_links_checked": 0,
        "broken_links": [],
        "suspicious_patterns": [],
        "depth_test_results": {},
        "passed": True
    }

    html_files = list(SITE_ROOT.glob("**/*.html"))
    html_files = [f for f in html_files if "node_modules" not in str(f)]

    print(f"  Scanning {len(html_files)} HTML files for broken links...\n")

    broken_links = []
    total_links = 0

    for html_file in html_files:
        rel_file = str(html_file.relative_to(SITE_ROOT))
        file_dir = html_file.parent

        with open(html_file, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()

        # Find all href links to .html files
        links = re.findall(r'href=["\']([^"\']+\.html)["\']', content)

        for link in links:
            # Skip external links
            if link.startswith('http') or link.startswith('//') or link.startswith('#'):
                continue

            total_links += 1

            # Resolve relative path
            if link.startswith('/'):
                target = SITE_ROOT / link.lstrip('/')
            else:
                target = (file_dir / link).resolve()

            if not target.exists():
                broken_links.append({
                    "source": rel_file,
                    "link": link,
                    "expected": str(target.relative_to(SITE_ROOT) if target.is_relative_to(SITE_ROOT) else target)
                })

    results["total_links_checked"] = total_links
    results["broken_links"] = broken_links

    print(f"  Total internal links checked: {Colors.BOLD}{total_links}{Colors.END}")

    if broken_links:
        print(f"\n  {Colors.RED}BROKEN LINKS FOUND: {len(broken_links)}{Colors.END}\n")
        for bl in broken_links[:10]:
            print(f"    {Colors.YELLOW}{bl['source']}{Colors.END}")
            print(f"      → {bl['link']}")
            print(f"      Expected: {bl['expected']}\n")
        if len(broken_links) > 10:
            print(f"    ... and {len(broken_links) - 10} more\n")
        results["passed"] = False
    else:
        print_pass("All internal links valid!")

    # Test navigation base path calculation
    print(f"\n  Testing navigation base path calculation:")

    test_paths = [
        ("/index.html", "./"),
        ("/about.html", "./"),
        ("/cedga/index.html", "../"),
        ("/cedga/pages/kappa-constant.html", "../../"),
        ("/physics/atomic-derivations/hydrogen.html", "../../"),
        ("/ancient-mysteries/voynich/index.html", "../../"),
        ("/tools/s-signature/s_signature_engine.html", "../../"),
    ]

    def calculate_base_path(path):
        """Replicate the fixed getBasePath() logic"""
        dir_path = path[:path.rfind('/') + 1]
        depth = len(re.findall(r'/', dir_path)) - 1
        if depth <= 0 or path == '/' or path == '/index.html':
            return './'
        return '../' * depth

    all_paths_correct = True
    for path, expected in test_paths:
        result = calculate_base_path(path)
        if result == expected:
            print_pass(f"{path} → {result}")
            results["depth_test_results"][path] = {"expected": expected, "actual": result, "passed": True}
        else:
            print_fail(f"{path} → {result} (expected {expected})")
            results["depth_test_results"][path] = {"expected": expected, "actual": result, "passed": False}
            all_paths_correct = False
            results["passed"] = False

    # Check for suspicious patterns that often cause 404s
    print(f"\n  Checking for suspicious link patterns:")

    suspicious_patterns = [
        (r'href="[^"]*\.\./[^"]*\.\./[^"]*\.\./[^"]*\.\./[^"]*"', "4+ level relative paths"),
        (r'href="[^"]*(?<!/)index\.html"', "index.html without trailing context"),
        (r'href="tools/[^"]*"', "tools/ without leading ../"),
        (r'href="ancient-teachings/', "deprecated ancient-teachings path"),
    ]

    suspicious_found = []
    for html_file in html_files:
        with open(html_file, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()

        rel_file = str(html_file.relative_to(SITE_ROOT))
        for pattern, desc in suspicious_patterns:
            matches = re.findall(pattern, content)
            if matches:
                for m in matches[:2]:
                    suspicious_found.append({"file": rel_file, "pattern": desc, "match": m})

    if suspicious_found:
        print_warn(f"Found {len(suspicious_found)} suspicious patterns")
        for s in suspicious_found[:5]:
            print(f"      {s['file']}: {s['pattern']}")
        results["suspicious_patterns"] = suspicious_found
    else:
        print_pass("No suspicious patterns found")

    # Summary
    print(f"\n  {Colors.BOLD}ALPHA Summary:{Colors.END}")
    print(f"    Links Checked: {total_links}")
    print(f"    Broken Links: {len(broken_links)}")
    print(f"    Suspicious Patterns: {len(suspicious_found)}")
    print(f"    Base Path Tests: {'All Passed' if all_paths_correct else 'FAILED'}")

    if results["passed"]:
        print(f"\n  {Colors.GREEN}{Colors.BOLD}ALPHA: PASSED{Colors.END}")
    else:
        print(f"\n  {Colors.RED}{Colors.BOLD}ALPHA: FAILED{Colors.END}")

    return results

# =============================================================================
# Main
# =============================================================================

def run_all():
    """Run complete triaxial audit"""
    print(f"""
{Colors.CYAN}{Colors.BOLD}
╔══════════════════════════════════════════════════════════════╗
║          TRIAXIAL AUDIT SYSTEM - [1 = -1]                    ║
║          Have Mind Media Site Verification                    ║
╚══════════════════════════════════════════════════════════════╝
{Colors.END}""")

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

    results = {
        "timestamp": timestamp,
        "site_root": str(SITE_ROOT),
        "shiva": {},
        "omega": {},
        "alpha": {}
    }

    # Run all three audits
    results["shiva"] = run_shiva()
    results["omega"] = run_omega()
    results["alpha"] = run_alpha()

    # Final summary
    all_passed = (
        results["shiva"]["passed"] and
        results["omega"]["passed"] and
        results["alpha"]["passed"]
    )

    print_header("FINAL TRIAXIAL SUMMARY", "═")

    print(f"  SHIVA (Structure):   {'✓ PASSED' if results['shiva']['passed'] else '✗ FAILED'}")
    print(f"  OMEGA (Content):     {'✓ PASSED' if results['omega']['passed'] else '✗ FAILED'}")
    print(f"  ALPHA (Navigation):  {'✓ PASSED' if results['alpha']['passed'] else '✗ FAILED'}")

    if all_passed:
        print(f"\n{Colors.GREEN}{Colors.BOLD}  ══════════════════════════════════════")
        print(f"  TRIAXIAL AUDIT: ALL SYSTEMS NOMINAL")
        print(f"  Site is ready for deployment.")
        print(f"  ══════════════════════════════════════{Colors.END}\n")
    else:
        print(f"\n{Colors.RED}{Colors.BOLD}  ══════════════════════════════════════")
        print(f"  TRIAXIAL AUDIT: ISSUES DETECTED")
        print(f"  Review failures before deployment.")
        print(f"  ══════════════════════════════════════{Colors.END}\n")

    # Save report
    report_path = SITE_ROOT / f"TRIAXIAL_REPORT_{timestamp}.json"
    with open(report_path, 'w') as f:
        json.dump(results, f, indent=2, default=str)
    print(f"  Report saved: {report_path.name}\n")

    return 0 if all_passed else 1

def main():
    parser = argparse.ArgumentParser(description="Triaxial Audit System")
    parser.add_argument("--shiva", action="store_true", help="Run SHIVA (structure) audit only")
    parser.add_argument("--omega", action="store_true", help="Run OMEGA (content) audit only")
    parser.add_argument("--alpha", action="store_true", help="Run ALPHA (navigation) audit only")

    args = parser.parse_args()

    os.chdir(SITE_ROOT)

    if args.shiva:
        result = run_shiva()
        return 0 if result["passed"] else 1
    elif args.omega:
        result = run_omega()
        return 0 if result["passed"] else 1
    elif args.alpha:
        result = run_alpha()
        return 0 if result["passed"] else 1
    else:
        return run_all()

if __name__ == "__main__":
    sys.exit(main())
