#!/usr/bin/env python3
"""
OMEGA FIX v1.0 - CSS Grid to Flexbox Centering Converter
Fixes OMEGA INVERSE violations by converting left-justified grids to centered flexbox.

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

# Patterns to find and fix
GRID_PATTERNS = [
    # Pattern 1: display: grid with repeat()
    (
        r'(display:\s*grid;[^}]*?grid-template-columns:\s*repeat\([^)]+\)[^}]*?)(\})',
        lambda m: convert_grid_to_flex(m.group(1)) + m.group(2)
    ),
    # Pattern 2: grid-template-columns with auto-fit/auto-fill
    (
        r'(display:\s*grid;[^}]*?grid-template-columns:\s*(?:repeat\s*\(\s*)?auto-(?:fit|fill)[^}]*?)(\})',
        lambda m: convert_grid_to_flex(m.group(1)) + m.group(2)
    ),
]

# Grid properties to remove when converting
GRID_PROPS_TO_REMOVE = [
    r'grid-template-columns:[^;]+;',
    r'grid-template-rows:[^;]+;',
    r'grid-auto-rows:[^;]+;',
    r'grid-auto-columns:[^;]+;',
    r'grid-auto-flow:[^;]+;',
]

def convert_grid_to_flex(css_block):
    """Convert a grid CSS block to centered flexbox."""
    # Extract gap value if present
    gap_match = re.search(r'gap:\s*([^;]+);', css_block)
    gap = gap_match.group(1) if gap_match else '1rem'

    # Remove grid-specific properties
    result = css_block
    for pattern in GRID_PROPS_TO_REMOVE:
        result = re.sub(pattern, '', result)

    # Replace display: grid with flexbox
    result = re.sub(r'display:\s*grid;', 'display: flex; flex-wrap: wrap; justify-content: center;', result)

    # Ensure gap is preserved
    if 'gap:' not in result:
        result = result.rstrip() + f' gap: {gap};'

    # Clean up multiple semicolons and whitespace
    result = re.sub(r';\s*;', ';', result)
    result = re.sub(r'\s+', ' ', result)

    return result

def fix_file(filepath):
    """Fix centering issues in a single file."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except:
        return 0, []

    original = content
    changes = []

    # Find all style blocks
    style_pattern = r'(<style[^>]*>)(.*?)(</style>)'

    def fix_style_block(match):
        nonlocal changes
        style_content = match.group(2)

        # Fix grid layouts that should be centered
        # Look for patterns like: .something-grid { display: grid; grid-template-columns: repeat(...)
        grid_block_pattern = r'(\.[a-zA-Z0-9_-]+(?:-grid|-cards|-items|-list|-container|-section|-row|-col|Grid|Cards|Items)?\s*\{[^}]*display:\s*grid[^}]*\})'

        def convert_block(m):
            block = m.group(1)
            # Check if it uses repeat() or auto-fit/auto-fill
            if re.search(r'repeat\s*\(|auto-fit|auto-fill', block):
                # Convert to flexbox
                new_block = block
                # Replace display: grid
                new_block = re.sub(r'display:\s*grid\s*;', 'display: flex; flex-wrap: wrap; justify-content: center;', new_block)
                # Remove grid-template-columns
                new_block = re.sub(r'grid-template-columns:[^;]+;', '', new_block)
                # Remove grid-template-rows if present
                new_block = re.sub(r'grid-template-rows:[^;]+;', '', new_block)
                # Clean up
                new_block = re.sub(r';\s*;', ';', new_block)

                if new_block != block:
                    # Extract class name for logging
                    class_match = re.search(r'\.([a-zA-Z0-9_-]+)', block)
                    if class_match:
                        changes.append(class_match.group(1))
                    return new_block
            return block

        style_content = re.sub(grid_block_pattern, convert_block, style_content, flags=re.DOTALL)

        # Also fix flexbox without justify-content: center
        flex_pattern = r'(\{[^}]*display:\s*flex\s*;[^}]*flex-wrap:\s*wrap\s*;)([^}]*\})'

        def add_center(m):
            if 'justify-content' not in m.group(0):
                return m.group(1) + ' justify-content: center;' + m.group(2)
            return m.group(0)

        style_content = re.sub(flex_pattern, add_center, style_content)

        return match.group(1) + style_content + match.group(3)

    content = re.sub(style_pattern, fix_style_block, content, flags=re.DOTALL | re.IGNORECASE)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return len(changes), changes

    return 0, []

def main():
    """Run the OMEGA FIX on all HTML files."""
    print("=" * 60)
    print("OMEGA FIX v1.0 - CSS Centering Converter")
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

    total_fixes = 0
    fixed_files = []

    for filepath in html_files:
        count, changes = fix_file(filepath)
        if count > 0:
            total_fixes += count
            fixed_files.append((filepath.name, changes))
            print(f"  FIXED: {filepath.name} ({count} changes)")

    print()
    print("=" * 60)
    print(f"OMEGA FIX COMPLETE")
    print(f"  Files modified: {len(fixed_files)}")
    print(f"  Total fixes: {total_fixes}")
    print("=" * 60)
    print()
    print("SOP COMPLIANT LAYOUT APPLIED:")
    print("  display: flex;")
    print("  flex-wrap: wrap;")
    print("  justify-content: center;")
    print("=" * 60)

    # Save report
    report_name = f"OMEGA_FIX_REPORT_{datetime.now().strftime('%Y%m%d_%H%M%S')}.txt"
    with open(report_name, 'w') as f:
        f.write("OMEGA FIX REPORT\n")
        f.write("=" * 60 + "\n")
        f.write(f"Date: {datetime.now().isoformat()}\n")
        f.write(f"Files modified: {len(fixed_files)}\n")
        f.write(f"Total fixes: {total_fixes}\n\n")
        for filename, changes in fixed_files:
            f.write(f"{filename}:\n")
            for change in changes:
                f.write(f"  - {change}\n")

    print(f"Report saved: {report_name}")

if __name__ == '__main__':
    main()
