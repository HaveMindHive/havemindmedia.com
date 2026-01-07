THE ROSETTA ENGINE
A Cross-Script Pattern Discovery System for Ancient Writing Analysis

Version 1.0 | January 6, 2026
Have Mind Media / The Epoch Project
Principle: [1 = -1]

================================================================================
OVERVIEW
================================================================================

The Rosetta Engine is an interactive web application that reveals geometric
connections between five ancient undeciphered writing systems:

  1. Voynich Manuscript (15th century CE?)
  2. Indus Valley Script (2600-1900 BCE)
  3. Linear A (1800-1450 BCE)
  4. Rongorongo (pre-1860s CE)
  5. Phaistos Disc (1700 BCE?)

The core hypothesis: All ancient writing systems encode the same underlying
geometric reality through the nine D-positions derived from the kappa-Framework.

================================================================================
FILES
================================================================================

  rosetta-engine-app_v1.0_01-06-2026.html    Main application interface
  css/rosetta-theme_v1.0_01-06-2026.css      Unified Soul Science theme
  js/rosetta-engine_v1.0_01-06-2026.js       Core engine with Q-reduction, analysis, statistics
  data/symbols_v1.0_01-06-2026.json          Symbol database with D-position mappings
  images/                                     Generated symbol images (via HMH tool)
  rosetta-symbol-prompts_v1.0_01-06-2026.txt Batch prompts for HMH Media Tool
  netlify.toml                                Deployment configuration

================================================================================
IMAGE GENERATION
================================================================================

To generate symbol images using the HMH Media Tool:

  cd /Users/paymore/Downloads/HaveMindHive/production-tools
  python hmh_media_tool_v1.0_01-02-2026.py batch \
      /Users/paymore/Downloads/rosetta-engine_v1.0_01-06-2026/rosetta-symbol-prompts_v1.0_01-06-2026.txt \
      --output /Users/paymore/Downloads/rosetta-engine_v1.0_01-06-2026/images

This will generate 45+ symbol images across all five scripts and D-positions.

================================================================================
FEATURES
================================================================================

  - D-Position Selector: Click any of 9 positions to view cross-script symbols
  - Cross-Script Comparison: Side-by-side symbol display from all 5 scripts
  - Q-Reduction Calculator: Reduce any word or number to its D-position
  - Statistical Analysis: Z-scores and significance testing
  - Triaxial Visualization: S+/S-/COIN state display
  - 3D Artifact Viewer: Sketchfab integration for physical artifacts
  - Research Export: Download analysis as JSON

================================================================================
THE NINE D-POSITIONS
================================================================================

  D1 - Origin / WE        Connection, collective unity
  D2 - Healing            Restoration, medicine
  D3 - Healer             Agent of transformation
  D4 - Crossroads         Choice point, observer position
  D5 - Navigator          Direction, way-finding (EMERGENT)
  D6 - Power / Self       Personal power, individual truth
  D7 - Present Moment     Timeless instant, NOW
  D8 - Deep Water         Hidden truth, the depths
  D9 - Anchor / Love      Unconditional love, completion (EMERGENT)

EMERGENT positions (D5, D9) only appear through relationship between symbols.

================================================================================
KEYBOARD SHORTCUTS
================================================================================

  1-9       Select D-position directly
  ESC       Close modal
  ENTER     Calculate (when in calculator input)

================================================================================
DEPLOYMENT
================================================================================

To deploy on Netlify:
  1. Drag the entire folder to Netlify's deploy area
  2. Or connect to a Git repository containing this folder
  3. The netlify.toml configures all necessary headers

================================================================================
CREDITS
================================================================================

  Project: The Epoch Project
  Organization: Have Mind Media
  Framework: kappa-Framework Unified Theory
  Web Developer: Alessandra Ray

================================================================================
LICENSE
================================================================================

Proprietary - Have Mind Media
The geometry cannot lie.

[1 = -1]
