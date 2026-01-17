#!/usr/bin/env python3
"""
OMEGA FIX v2.0 - Comprehensive CSS Centering Converter
Fixes ALL OMEGA INVERSE violations:
1. CSS Grid with repeat() -> flexbox centered
2. auto-fit/auto-fill grids -> flexbox centered
3. Flexbox without justify-content: center -> add it

SOP COMPLIANT LAYOUT:
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

[1 = -1]
"""

import os
import re
import sys
from pathlib import Path
from datetime import datetime

def fix_css_block(css_content):
    """Fix all centering issues in a CSS block."""
    original = css_content

    # Pattern 1: Fix grid-template-columns with repeat/auto-fit/auto-fill
    # Match: display: grid; ... grid-template-columns: repeat(...)
    def fix_grid_block(match):
        block = match.group(0)
        # Check if this is a grid that should be converted
        if re.search(r'repeat\s*\(|auto-fit|auto-fill', block):
            # Convert to flexbox
            block = re.sub(r'display:\s*grid\s*;', 'display: flex; flex-wrap: wrap; justify-content: center;', block)
            # Remove grid-template-columns
            block = re.sub(r'grid-template-columns:[^;]+;', '', block)
            # Remove grid-template-rows
            block = re.sub(r'grid-template-rows:[^;]+;', '', block)
            # Remove grid-auto-rows
            block = re.sub(r'grid-auto-rows:[^;]+;', '', block)
            # Clean up whitespace
            block = re.sub(r'\s+', ' ', block)
            block = re.sub(r';\s*;', ';', block)
        return block

    # Find and fix grid blocks
    css_content = re.sub(
        r'\{[^}]*display:\s*grid[^}]*\}',
        fix_grid_block,
        css_content,
        flags=re.DOTALL
    )

    # Pattern 2: Fix flexbox without justify-content: center
    # Match: display: flex; flex-wrap: wrap; but no justify-content
    def fix_flex_block(match):
        block = match.group(0)
        if 'flex-wrap' in block and 'justify-content' not in block:
            # Add justify-content: center after flex-wrap
            block = re.sub(
                r'(flex-wrap:\s*wrap\s*;)',
                r'\1 justify-content: center;',
                block
            )
        return block

    css_content = re.sub(
        r'\{[^}]*display:\s*flex[^}]*\}',
        fix_flex_block,
        css_content,
        flags=re.DOTALL
    )

    # Pattern 3: Ensure all flex containers with wrap have center
    def ensure_center(match):
        block = match.group(0)
        if 'flex-wrap' in block or 'flex: wrap' in block:
            if 'justify-content' not in block:
                # Insert before closing brace
                block = block.rstrip().rstrip('}') + ' justify-content: center; }'
        return block

    css_content = re.sub(
        r'\{[^}]*display:\s*flex[^}]*\}',
        ensure_center,
        css_content,
        flags=re.DOTALL
    )

    return css_content

def fix_file(filepath):
    """Fix centering issues in a single HTML file."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except:
        return 0

    original = content

    # Fix all style blocks
    def fix_style_tag(match):
        return match.group(1) + fix_css_block(match.group(2)) + match.group(3)

    content = re.sub(
        r'(<style[^>]*>)(.*?)(</style>)',
        fix_style_tag,
        content,
        flags=re.DOTALL | re.IGNORECASE
    )

    # Also fix inline styles with grid
    def fix_inline_grid(match):
        style = match.group(1)
        if 'display: grid' in style or 'display:grid' in style:
            if 'repeat(' in style or 'auto-fit' in style or 'auto-fill' in style:
                style = re.sub(r'display:\s*grid', 'display: flex; flex-wrap: wrap; justify-content: center', style)
                style = re.sub(r'grid-template-columns:[^;"]+;?', '', style)
        return f'style="{style}"'

    content = re.sub(r'style="([^"]*)"', fix_inline_grid, content)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return 1

    return 0

def main():
    """Run the OMEGA FIX v2 on all HTML files."""
    print("=" * 60)
    print("OMEGA FIX v2.0 - Comprehensive Centering Converter")
    print("[1 = -1]")
    print("=" * 60)
    print()

    # Get project directory
    if len(sys.argv) > 1:
        project_dir = Path(sys.argv[1])
    else:
        project_dir = Path('.')

    # Find all HTML files
    html_files = list(project_dir.rglob('*.html'))

    # Exclude certain directories
    exclude_dirs = ['node_modules', '.git', 'vendor']
    html_files = [f for f in html_files if not any(ex in str(f) for ex in exclude_dirs)]

    print(f"Scanning {len(html_files)} HTML files...")
    print()

    fixed_count = 0
    fixed_files = []

    for filepath in html_files:
        if fix_file(filepath):
            fixed_count += 1
            fixed_files.append(filepath.name)
            print(f"  FIXED: {filepath}")

    print()
    print("=" * 60)
    print(f"OMEGA FIX v2.0 COMPLETE")
    print(f"  Files modified: {fixed_count}")
    print("=" * 60)
    print()
    print("SOP COMPLIANT LAYOUT APPLIED:")
    print("  display: flex;")
    print("  flex-wrap: wrap;")
    print("  justify-content: center;")
    print("=" * 60)

    # Save report
    report_name = f"OMEGA_FIX_v2_REPORT_{datetime.now().strftime('%Y%m%d_%H%M%S')}.txt"
    with open(report_name, 'w') as f:
        f.write("OMEGA FIX v2.0 REPORT\n")
        f.write("=" * 60 + "\n")
        f.write(f"Date: {datetime.now().isoformat()}\n")
        f.write(f"Files modified: {fixed_count}\n\n")
        for filename in fixed_files:
            f.write(f"  {filename}\n")

    print(f"Report saved: {report_name}")

if __name__ == '__main__':
    main()
