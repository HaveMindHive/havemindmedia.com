#!/usr/bin/env python3
"""
Comprehensive broken link checker for HaveMind Media website
Checks all href and src attributes in HTML files
"""

import os
import re
from pathlib import Path
from urllib.parse import urlparse, urljoin
from collections import defaultdict

def is_external_url(url):
    """Check if URL is external (http/https)"""
    return url.startswith(('http://', 'https://', '//', 'mailto:', 'tel:', 'javascript:'))

def is_anchor_only(url):
    """Check if URL is just an anchor (#something)"""
    return url.startswith('#') or url == ''

def extract_links(html_content, file_path):
    """Extract all href and src attributes from HTML"""
    links = []

    # Find all href attributes
    href_pattern = r'href\s*=\s*["\']([^"\']+)["\']'
    hrefs = re.findall(href_pattern, html_content, re.IGNORECASE)
    links.extend([('href', href) for href in hrefs])

    # Find all src attributes
    src_pattern = r'src\s*=\s*["\']([^"\']+)["\']'
    srcs = re.findall(src_pattern, html_content, re.IGNORECASE)
    links.extend([('src', src) for src in srcs])

    # Find CSS link tags
    css_pattern = r'<link[^>]+href\s*=\s*["\']([^"\']+\.css[^"\']*)["\']'
    css_links = re.findall(css_pattern, html_content, re.IGNORECASE)
    links.extend([('css', css) for css in css_links])

    return links

def resolve_path(source_file, relative_path):
    """Resolve a relative path from the source file's directory"""
    source_dir = os.path.dirname(source_file)

    # Remove query strings and fragments
    clean_path = relative_path.split('?')[0].split('#')[0]

    # Resolve the path
    if clean_path.startswith('/'):
        # Absolute path from root
        base_dir = Path(source_file).parts[0]
        for i, part in enumerate(Path(source_file).parts):
            if 'havemindmedia-website_v1.0_01-04-2026' in part:
                base_dir = os.path.join('/', *Path(source_file).parts[:i+1])
                break
        resolved = os.path.normpath(os.path.join(base_dir, clean_path.lstrip('/')))
    else:
        # Relative path from current file's directory
        resolved = os.path.normpath(os.path.join(source_dir, clean_path))

    return resolved

def check_file_exists(file_path):
    """Check if a file exists on disk"""
    return os.path.exists(file_path)

def scan_website(root_dir):
    """Scan entire website for broken links"""
    broken_links = defaultdict(list)
    stats = {
        'total_files': 0,
        'total_links': 0,
        'broken_links': 0,
        'external_links': 0,
        'anchor_only': 0
    }

    # Find all HTML files
    html_files = []
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith('.html'):
                html_files.append(os.path.join(root, file))

    html_files.sort()
    stats['total_files'] = len(html_files)

    print(f"Found {len(html_files)} HTML files to check\n")

    # Check each HTML file
    for html_file in html_files:
        try:
            with open(html_file, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()

            links = extract_links(content, html_file)

            for link_type, link_url in links:
                stats['total_links'] += 1

                # Skip external URLs
                if is_external_url(link_url):
                    stats['external_links'] += 1
                    continue

                # Skip anchor-only links
                if is_anchor_only(link_url):
                    stats['anchor_only'] += 1
                    continue

                # Resolve and check if file exists
                try:
                    resolved_path = resolve_path(html_file, link_url)

                    if not check_file_exists(resolved_path):
                        stats['broken_links'] += 1
                        rel_source = html_file.replace(root_dir, '').lstrip('/')
                        broken_links[rel_source].append({
                            'type': link_type,
                            'link': link_url,
                            'resolved': resolved_path
                        })
                except Exception as e:
                    stats['broken_links'] += 1
                    rel_source = html_file.replace(root_dir, '').lstrip('/')
                    broken_links[rel_source].append({
                        'type': link_type,
                        'link': link_url,
                        'resolved': f'ERROR: {str(e)}'
                    })

        except Exception as e:
            print(f"Error reading {html_file}: {str(e)}")

    return broken_links, stats

def print_report(broken_links, stats, root_dir):
    """Print formatted report of broken links"""
    print("=" * 80)
    print("BROKEN LINK SCAN REPORT")
    print("=" * 80)
    print(f"\nWebsite Root: {root_dir}")
    print(f"\nStatistics:")
    print(f"  Total HTML files scanned: {stats['total_files']}")
    print(f"  Total links found: {stats['total_links']}")
    print(f"  External links (skipped): {stats['external_links']}")
    print(f"  Anchor-only links (skipped): {stats['anchor_only']}")
    print(f"  BROKEN LINKS FOUND: {stats['broken_links']}")
    print("\n" + "=" * 80)

    if not broken_links:
        print("\nNo broken links found! All internal links are valid.")
        return

    print(f"\nBROKEN LINKS BY SOURCE FILE ({len(broken_links)} files with issues):")
    print("=" * 80)

    # Group by directory
    by_directory = defaultdict(list)
    for source_file, links in broken_links.items():
        directory = os.path.dirname(source_file) or 'root'
        by_directory[directory].append((source_file, links))

    # Print by directory
    for directory in sorted(by_directory.keys()):
        print(f"\n\n📁 Directory: /{directory}")
        print("-" * 80)

        for source_file, links in sorted(by_directory[directory]):
            print(f"\n  Source: {source_file}")
            print(f"  ({len(links)} broken link(s))")

            for link_info in links:
                link_type = link_info['type'].upper()
                print(f"    [{link_type}] {link_info['link']}")
                print(f"         → Resolved to: {link_info['resolved']}")
                print(f"         → Status: FILE NOT FOUND")

    print("\n" + "=" * 80)
    print("\nSUMMARY BY LINK TYPE:")
    print("-" * 80)

    type_counts = defaultdict(int)
    for source_file, links in broken_links.items():
        for link_info in links:
            type_counts[link_info['type']] += 1

    for link_type, count in sorted(type_counts.items()):
        print(f"  {link_type.upper()}: {count} broken links")

    print("\n" + "=" * 80)

if __name__ == "__main__":
    root_directory = "/Users/paymore/Downloads/HaveMindHive/havemindmedia-website_v1.0_01-04-2026"

    print("Starting comprehensive link scan...\n")
    broken_links, stats = scan_website(root_directory)
    print_report(broken_links, stats, root_directory)
