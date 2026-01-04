// Voynich with Images - Folio Data
// Complete descriptions for all manuscript sections

const folioData = {
    herbal: [
        {
            id: "IMG_6643",
            title: "The Tri-Colored Healing Plant",
            dPosition: "D2 & D3 — Healing/Healer",
            description: "This folio displays a distinctive plant with alternating green and golden-brown leaves, topped with feathery seed heads. The coloring is significant: green represents active healing energy (D2), while the golden-brown indicates the anchoring/grounding function (D1/D9).",
            frequency: "The text surrounding the plant contains repeated 'qokey' patterns, which decode to D1 (Origin). Combined with the visual D2/D3 representation, this plant was used for grounding healing work — bringing scattered energy back to center.",
            interpretation: "This is a GROUNDING herb in frequency terms. The tri-colored nature suggests it works across multiple D-positions simultaneously. A healer would use this plant's frequency pattern when a patient's energy was scattered or uncentered."
        },
        {
            id: "IMG_6644",
            title: "The Flowering Root Healer",
            dPosition: "D2 & D1 — Healing/Origin",
            description: "A striking plant with large serrated green leaves, distinctive yellow-white flowers at the top, and an elaborate brown root system clearly displayed. This is one of the most detailed herbal illustrations.",
            frequency: "The extensive root illustration is crucial — roots always indicate D1 (Origin) connection. The flowers map to D9 (Love/Completion). This plant bridges the entire healing cycle from ground to crown.",
            interpretation: "This is a COMPLETE CYCLE herb. The detailed root system shows this plant's frequency pattern connects deeply to Origin (D1), while the flowering tops reach toward Love/Anchor (D9)."
        },
        {
            id: "IMG_6645",
            title: "The Clustered Leaf Protocol",
            dPosition: "D3 — Healer Dominant",
            description: "A plant with tightly clustered, rounded leaves growing from a central stem. The leaves show a distinctive spotted or variegated pattern.",
            frequency: "The clustering pattern is significant — when leaves group tightly, it indicates frequency concentration rather than dispersal. This is a 'focused beam' plant rather than a 'wide field' plant.",
            interpretation: "This herb carries CONCENTRATED healer frequency (D3). The tight leaf clusters suggest its frequency pattern was used for targeted, specific healing rather than general wellness."
        },
        {
            id: "IMG_6646",
            title: "The Blue-Green Resonance Plant",
            dPosition: "D2 & D8 — Healing/Deep Water",
            description: "This folio shows a plant with distinctive blue-green coloring on its leaves, unusual in the manuscript. The stem appears sturdy with leaves arranged symmetrically.",
            frequency: "Blue coloring in the Voynich consistently maps to D8 (Deep Water) — the emotional/subconscious realm. Combined with green (D2 Healing), this plant bridges conscious healing with deeper emotional work.",
            interpretation: "This is a DEEP HEALING herb. The blue-green coloring indicates its frequency pattern accesses both surface healing (D2) and deep emotional waters (D8)."
        },
        {
            id: "IMG_6647",
            title: "The Spiral Leaf Pattern",
            dPosition: "D5 & D2 — Navigator/Healing",
            description: "A plant with leaves arranged in a subtle spiral pattern around the stem. The leaves are medium-sized with smooth edges.",
            frequency: "Spiral patterns indicate D5 (Navigator) — the frequency of finding one's path. Combined with healing green, this plant helps guide the healing process itself.",
            interpretation: "This is a GUIDANCE herb. When a healer was uncertain which protocol to apply, this plant's frequency pattern would help navigate toward the correct approach."
        },
        {
            id: "IMG_6648",
            title: "The Branching Decision Plant",
            dPosition: "D4 & D2 — Crossroads/Healing",
            description: "This plant displays prominent branching — the stem divides into multiple directions, each branch bearing leaves.",
            frequency: "Branching structures map to D4 (Crossroads) — choice points, decisions, diverging paths. This plant's frequency works at decision nodes in the healing process.",
            interpretation: "This is a CROSSROADS herb. Its frequency pattern was used when healing required a choice — which treatment path to take, which approach would serve best."
        },
        {
            id: "IMG_6649",
            title: "The Single Stem Focus",
            dPosition: "D6 & D2 — Self/Healing",
            description: "A notably simple illustration — a single strong stem with leaves arranged regularly, no branching, no elaborate structures.",
            frequency: "The singular, unbranched structure indicates D6 (Self/Power) — focused individual energy. This plant carries a strong, clear signal without dispersal.",
            interpretation: "This is a SELF-EMPOWERMENT herb. Its frequency pattern strengthens the individual's own healing capacity rather than bringing outside healing in."
        },
        {
            id: "IMG_6650",
            title: "The Broad Leaf Receiver",
            dPosition: "D9 & D2 — Love/Healing",
            description: "A dramatic plant with very large, broad leaves — the largest leaf surfaces in the herbal section. The leaves appear almost to cup upward.",
            frequency: "Large, open leaf surfaces are receivers — they catch and hold frequency rather than project it. This maps to D9 (Love/Anchor) — the receptive, holding function.",
            interpretation: "This is an ANCHORING herb. The bowl-shaped large leaves indicate its frequency pattern 'catches' and holds healing energy in place."
        },
        {
            id: "IMG_6651",
            title: "The Pointed Projection Plant",
            dPosition: "D7 & D2 — Present Moment/Healing",
            description: "Plant with sharply pointed leaves radiating outward from the stem. The points are emphasized — distinctly sharp, projecting outward.",
            frequency: "Pointed, radiating structures project frequency outward — they are transmitters. Sharp points indicate D7 (Present Moment) — immediate, active, NOW energy.",
            interpretation: "This is an ACTIVATION herb. Its frequency pattern projects healing energy outward and activates immediate response."
        },
        {
            id: "IMG_6652",
            title: "The Interwoven Leaf Complex",
            dPosition: "D3 & D2 — Healer/Healing",
            description: "A complex plant where leaves appear to interweave or overlap each other, creating a dense, layered structure.",
            frequency: "Interwoven structures indicate frequency combination — multiple patterns working together. This plant carries a CHORD of frequencies.",
            interpretation: "This is a COMBINATION herb. Its frequency pattern was used when multiple D-positions needed to be addressed simultaneously."
        },
        {
            id: "IMG_6653",
            title: "The Ascending Spiral",
            dPosition: "D5 & D3 — Navigator/Healer",
            description: "This plant's leaves ascend the stem in a clear spiral pattern, creating visual movement upward.",
            frequency: "Ascending spirals indicate upward movement through D-positions — from lower (D1-4) toward higher (D7-9). This plant helps energy rise and refine.",
            interpretation: "This is an ELEVATION herb. Its frequency pattern assists energy in moving upward — from dense/physical toward subtle/spiritual."
        },
        {
            id: "IMG_6654",
            title: "The Protective Enclosure",
            dPosition: "D1 & D6 — Origin/Self",
            description: "A plant with leaves that curve inward, creating an enclosed or protective shape. The leaves seem to guard the central stem.",
            frequency: "Inward-curving, enclosing structures indicate protection — holding safe space. Combined with earthy colors (D1), this plant creates protected origin-space.",
            interpretation: "This is a PROTECTION herb. Its frequency pattern creates energetic boundaries, safe containers for healing work."
        },
        {
            id: "IMG_6655",
            title: "The Spotted Transmitter",
            dPosition: "D2 & D7 — Healing/Present",
            description: "A distinctive plant with spotted or dotted leaves and a prominent orange-red stem.",
            frequency: "Spots/dots indicate frequency distribution points — places where energy enters or exits. The orange-red stem carries D7 (Present/Activation).",
            interpretation: "This is a DISTRIBUTION herb. Its frequency pattern takes healing energy and distributes it to multiple points simultaneously."
        },
        {
            id: "IMG_6656",
            title: "The Layered Foundation",
            dPosition: "D1 & D2 — Origin/Healing",
            description: "A plant with leaves arranged in distinct layers or tiers. Lower leaves are larger, upper leaves progressively smaller.",
            frequency: "Layered, tiered structures show hierarchical frequency organization — foundational patterns supporting higher ones.",
            interpretation: "This is a FOUNDATION herb. Its frequency pattern establishes proper layering of healing energies."
        },
        {
            id: "IMG_6657",
            title: "The Radiating Crown",
            dPosition: "D9 & D2 — Love/Healing",
            description: "This folio emphasizes the top of the plant — a radiating crown structure where leaves spread outward from a central point.",
            frequency: "Crown structures at plant tops indicate D9 (Love/Anchor/Completion) — the highest point of the frequency wheel.",
            interpretation: "This is a COMPLETION herb. Its frequency pattern marks the end of healing cycles, anchoring work in love and wholeness."
        },
        {
            id: "IMG_6658",
            title: "The Dual-Nature Plant",
            dPosition: "D3 & D8 — Healer/Deep Water",
            description: "A plant that appears to have two distinct sections — upper and lower portions with different leaf shapes.",
            frequency: "Dual structures indicate the plant works in two realms simultaneously. Upper section maps to conscious healing, lower to subconscious.",
            interpretation: "This is a BRIDGING herb. Its frequency pattern allows healing work to occur on both conscious and subconscious levels."
        },
        {
            id: "IMG_6659",
            title: "The Delicate Balance",
            dPosition: "D4 & D2 — Crossroads/Healing",
            description: "A plant with very fine, delicate leaves balanced precisely on a thin stem.",
            frequency: "Delicate balance indicates D4 (Crossroads) sensitivity — the plant's frequency responds to small shifts, registers subtle changes.",
            interpretation: "This is a DIAGNOSTIC herb. Its frequency pattern was used to sense subtle imbalances, to find where healing was most needed."
        },
        {
            id: "IMG_6660",
            title: "The Communal Root System",
            dPosition: "D1 & D3 — Origin/Healer",
            description: "Multiple plants growing together in what appears to be a shared container. The roots intertwine below while distinct plants emerge above.",
            frequency: "Shared root systems indicate connected Origin (D1) — multiple expressions from single source.",
            interpretation: "This is a COMMUNITY PATTERN. Multiple plants sharing roots shows how individual healers (D3) connect to shared Origin (D1)."
        },
        {
            id: "IMG_6661",
            title: "The Vertical Alignment",
            dPosition: "D1 through D9 — Full Spectrum",
            description: "A tall plant with elements arranged in clear vertical alignment from root to crown.",
            frequency: "Perfect vertical alignment indicates the full D-position spectrum arranged in proper order — D1 at root through D9 at crown.",
            interpretation: "This is an ALIGNMENT herb. Its frequency pattern helps align all D-positions in proper vertical relationship."
        },
        {
            id: "IMG_6662",
            title: "The Curved Reception",
            dPosition: "D9 & D8 — Love/Deep Water",
            description: "A plant with distinctly curved leaves that create cup or bowl shapes facing upward.",
            frequency: "Upward-facing cups are receivers for descending frequency — they catch what comes from above.",
            interpretation: "This is a RECEIVING herb. Its frequency pattern opens capacity to receive healing from higher sources."
        },
        {
            id: "IMG_6663",
            title: "The Active Projector",
            dPosition: "D6 & D7 — Self/Present",
            description: "A plant with leaves that project outward and slightly downward, creating an active, projecting posture.",
            frequency: "Outward, downward projection indicates active giving of frequency. D6 (Self/Power) projects through D7 (Present/NOW).",
            interpretation: "This is an EMPOWERMENT herb. Its frequency pattern strengthens the patient's ability to project their own healing power outward."
        },
        {
            id: "IMG_6664",
            title: "The Completion Seal",
            dPosition: "D9 & D1 — Love/Origin",
            description: "The final folio shows a plant with circular or closed forms — loops, completed circles, enclosed shapes.",
            frequency: "Circular, closed forms indicate completion — the end of a cycle. D9 (Love) connecting back to D1 (Origin) creates the complete wheel.",
            interpretation: "This is a SEALING herb. Its frequency pattern completes and seals healing work. [1 = -1] — the equation resolves."
        }
    ],

    astronomical: [
        {
            id: "IMG_6670",
            title: "The Solar Gateway",
            dPosition: "D7 — Present Moment Activation",
            description: "A radial sun/star diagram with a face at the center. Rays emanate outward in precise geometric patterns, dividing the circle into segments. Text labels appear along the outer edge.",
            frequency: "The face at center represents conscious presence — D7 (Present Moment). The radial divisions show how present-moment awareness divides into accessible time-windows. Each segment represents a different temporal opening.",
            interpretation: "This is a TIMING CHART for frequency work. The central face indicates the 'now' point from which all timing emanates. Practitioners would use this to identify optimal moments for different types of healing — each ray pointing to a different D-position accessibility window. Work with D2 (Healing) when that ray aligns; work with D8 (Deep) when that window opens."
        },
        {
            id: "IMG_6671",
            title: "The Stellar Grid",
            dPosition: "D5 & D7 — Navigator/Present",
            description: "A celestial diagram showing a grid or network pattern with stars positioned at intersection points. The organization suggests mathematical precision.",
            frequency: "Grid patterns indicate navigational structure — D5 (Navigator) working through D7 (Present). The stars at intersections mark accessible frequency points in time.",
            interpretation: "This is a NAVIGATION MAP for cosmic timing. The grid shows how different frequency access points connect across time. A practitioner would use this to plan extended healing work — following the path from star to star, intersection to intersection, each point a moment when specific frequencies become available."
        },
        {
            id: "IMG_6672",
            title: "The Concentric Cycles",
            dPosition: "D1 through D9 — Cyclic Progression",
            description: "Multiple concentric circles emanating from a central point, each ring containing different symbols or text. The rings appear to represent nested cycles.",
            frequency: "Concentric circles always indicate nested time cycles — daily rhythms within monthly rhythms within yearly rhythms. Each ring represents a different scale of frequency accessibility.",
            interpretation: "This is a MULTI-SCALE TIMING diagram. The innermost circle represents fastest cycles (daily), outer rings represent slower cycles (monthly, yearly, longer). Practitioners understood that D-position accessibility operates at multiple time scales simultaneously. Some healing requires daily timing; some requires waiting for longer cycles."
        },
        {
            id: "IMG_6673",
            title: "The Segmented Wheel",
            dPosition: "D4 — Crossroads of Time",
            description: "A circular diagram divided into distinct segments like pie slices, each segment containing different imagery or text. Clear boundaries between segments.",
            frequency: "Segmented wheels indicate discrete time periods — D4 (Crossroads) appearing in temporal form. Each segment is a distinct time-window with its own characteristics.",
            interpretation: "This is a CHOICE-TIMING chart. When facing decisions about healing approach, this wheel would be consulted to determine which time period favored which choice. The segments show that time itself has decision-points — moments that favor action, moments that favor waiting, moments for each D-position."
        },
        {
            id: "IMG_6674",
            title: "The Spiral Time Path",
            dPosition: "D5 — Navigator Through Cycles",
            description: "A spiral pattern moving from outer edge toward center (or vice versa), with markers or text along the spiral path.",
            frequency: "Spirals in astronomical context indicate time-progression — not circular return but spiral advancement. Each cycle brings you to a similar but elevated position.",
            interpretation: "This is an EVOLUTION-TIMING diagram. Unlike simple cycles that repeat, this shows how time spirals — returning to similar positions but at different levels. Healing that uses spiral timing acknowledges that we don't return to where we started; we arrive at the NEXT iteration of that position. Evolution, not repetition."
        },
        {
            id: "IMG_6675",
            title: "The Blue-Centered Star Wheel",
            dPosition: "D8 & D7 — Deep Water/Present",
            description: "A striking diagram with a blue center (rare in the manuscript) surrounded by radiating sectors containing stars. The blue dominates the center while gold/yellow stars populate the outer areas.",
            frequency: "Blue centers indicate D8 (Deep Water) presence in timing. This chart shows when deep emotional/subconscious work becomes accessible. The surrounding stars mark timing windows.",
            interpretation: "This is a DEEP-TIMING chart. Not all healing can happen at any time — deep subconscious work requires specific temporal conditions. This wheel shows when the 'deep waters' are accessible, when D8 frequencies become available for work. The blue center is the pool; the stars show when it can be entered."
        },
        {
            id: "IMG_6676",
            title: "The Quarterly Division",
            dPosition: "D4 — Four-Fold Crossroads",
            description: "A circular diagram clearly divided into four quadrants, each quadrant containing distinct content. The four-fold structure is emphasized.",
            frequency: "Four-fold division maps to D4 (Crossroads) and to seasonal/directional organization. This shows how time divides into four major phases, each with different frequency characteristics.",
            interpretation: "This is a SEASONAL-TIMING chart. The four quadrants likely represent four seasons or four phases of longer cycles. Each quadrant would indicate which D-positions are most accessible during that phase. Healing work would be scheduled according to which quadrant the current time occupies."
        },
        {
            id: "IMG_6677",
            title: "The Monthly Progressions",
            dPosition: "D5 & D9 — Navigator/Completion",
            description: "A diagram showing what appears to be a progression through phases, possibly lunar phases or monthly divisions. Sequential elements suggest time-flow.",
            frequency: "Sequential progressions indicate monthly or lunar timing — the rhythm of waxing and waning that affects frequency accessibility throughout each month.",
            interpretation: "This is a LUNAR-TIMING chart. The moon's cycle affects which frequencies are accessible. Waxing phases favor building/generating work (D1-4); waning phases favor releasing/completing work (D6-9). Full moon activates D7 (Present); dark moon opens D8 (Deep). Practitioners timed their work to these rhythms."
        },
        {
            id: "IMG_6678",
            title: "The Intersection Points",
            dPosition: "D7 — Present Activation Nodes",
            description: "A diagram emphasizing specific points where lines or circles intersect. The intersections are marked or highlighted as significant locations.",
            frequency: "Intersection points in astronomical diagrams mark critical timing moments — when multiple cycles align, creating windows of concentrated accessibility.",
            interpretation: "This is an ALIGNMENT-TIMING chart. When multiple cycles intersect, frequency accessibility multiplies. These are the power moments — eclipses, solstices, conjunctions. The marked intersections show when such alignments occur. Major healing work was reserved for these concentrated windows."
        },
        {
            id: "IMG_6679",
            title: "The Rising and Setting Markers",
            dPosition: "D1 & D9 — Origin/Completion",
            description: "A diagram with emphasized horizon lines and markers for rising/setting positions. The horizon — where earth meets sky — is central to the structure.",
            frequency: "Horizon emphasis indicates D1 (Origin/Rising) and D9 (Completion/Setting) timing. Dawn and dusk are power moments when frequencies transition.",
            interpretation: "This is a DAILY-TIMING chart. Each day has its rhythm of frequency accessibility. Dawn (D1) is origin-time; noon (D7) is present-activation; dusk (D9) is completion. This chart shows how daily work should be timed — grounding work at dawn, activation at midday, anchoring at dusk."
        },
        {
            id: "IMG_6680",
            title: "The Central Sun Face",
            dPosition: "D7 — Present Moment Source",
            description: "The most striking astronomical image — a sun with a face at center, blue rays emanating outward. The face shows awareness, presence, recognition.",
            frequency: "The sun face is the ultimate D7 (Present Moment) symbol — conscious awareness at the center of all timing. The blue rays (D8) show how presence extends into deep awareness.",
            interpretation: "This is the MASTER TIMING symbol. The face represents the conscious practitioner at the center of cosmic timing. All other astronomical pages derive from this central truth: YOU are the present moment through which all frequency work flows. The timing charts show when windows open, but the face reminds us that WE are the ones who must be present to use them."
        },
        {
            id: "IMG_6681",
            title: "The Outer Ring Protocol",
            dPosition: "D9 — Completion Cycles",
            description: "A diagram emphasizing the outer ring or boundary of the circle, with significant content placed at the periphery rather than the center.",
            frequency: "Outer ring emphasis indicates D9 (Completion/Anchor) timing — the boundary conditions, the container that holds all inner work.",
            interpretation: "This is a CONTAINER-TIMING chart. Before beginning frequency work, the outer container must be established. This diagram shows timing for creating protective boundaries, for setting up the field within which healing can occur. The outer ring must be in place before inner work begins."
        }
    ],

    zodiac: [
        {
            id: "IMG_6682",
            title: "Pisces — The Anchor of Love",
            dPosition: "D9 — Love/Completion",
            description: "A circular zodiac diagram with nymphs arranged around the circumference. The Voynich zodiac uniquely begins with Pisces, not Aries.",
            frequency: "Starting with Pisces (D9) indicates this is a FREQUENCY calendar, not an astronomical one. D9 (Love/Anchor) is the beginning and end — the foundation from which all else emerges.",
            interpretation: "The Voynich zodiac teaches that healing cycles begin and end in LOVE (D9). Unlike traditional astrology starting with fiery action (Aries), this system starts with compassionate receptivity. The nymphs represent souls receiving this foundational love frequency."
        },
        {
            id: "IMG_6683",
            title: "Aries — The Origin Fire",
            dPosition: "D1 — Origin/WE",
            description: "Following Pisces comes Aries in this unusual sequence. The circular diagram shows energetic, active figures.",
            frequency: "In frequency terms, Aries carries D1 (Origin) — the initial spark, the first movement from love (D9) into action. Not aggressive fire, but origin-fire: the light of beginning.",
            interpretation: "After establishing love-foundation (Pisces/D9), the healing cycle moves to Origin (Aries/D1) — the recognition of shared source, the WE that underlies all healing. The active figures show energy emerging from stillness."
        },
        {
            id: "IMG_6684",
            title: "Taurus — The Healing Ground",
            dPosition: "D2 — Healing",
            description: "The Taurus section shows grounded, stable imagery. Figures appear more settled than the previous Aries section.",
            frequency: "Taurus carries D2 (Healing) — the stable ground where healing can actually occur. After origin-recognition (D1), healing becomes possible (D2).",
            interpretation: "Taurus provides the EARTHY STABILITY needed for healing work. The fixed earth quality creates the container in which frequency work can take root. Without this grounding, healing remains conceptual rather than embodied."
        },
        {
            id: "IMG_6685",
            title: "Taurus Central — The Bull at Rest",
            dPosition: "D2 — Healing Embodied",
            description: "A detailed Taurus circular with the bull clearly visible at center, surrounded by nymphs. The bull appears peaceful, at rest.",
            frequency: "The resting bull represents D2 (Healing) in its receptive aspect — not working, but holding space for healing to occur. Strength in stillness.",
            interpretation: "This is the HEART of healing frequency. The bull at center shows that true healing comes from restful strength, not forceful action. The surrounding nymphs are receivers of this stable healing presence. Power through peace."
        },
        {
            id: "IMG_6686",
            title: "Gemini — The Healer's Duality",
            dPosition: "D3 — Healer",
            description: "The Gemini section shows paired or dual figures, reflecting the twins' nature. Symmetry and mirroring appear in the composition.",
            frequency: "Gemini carries D3 (Healer) — the one who can see both sides, who bridges patient and healing. The duality allows the healer to relate to the patient while channeling healing.",
            interpretation: "The Healer (D3) must be DUAL — simultaneously present with the patient's suffering and connected to healing source. Gemini energy allows this bridging without losing either connection."
        },
        {
            id: "IMG_6687",
            title: "Cancer — The Crossroads of Care",
            dPosition: "D4 — Crossroads",
            description: "A multi-ring circular diagram with complex nested structures. Cancer's shell-like nature appears in the layered, protective forms.",
            frequency: "Cancer carries D4 (Crossroads) — the shell that protects while decisions are made. At this point in healing, choices must be made about direction.",
            interpretation: "Cancer provides PROTECTIVE SPACE for the crossroads of healing. When facing treatment choices (D4), the practitioner creates a shell of safety (Cancer) within which options can be considered without external pressure."
        },
        {
            id: "IMG_6688",
            title: "Leo — The Navigator's Light",
            dPosition: "D5 — Navigator",
            description: "Leo imagery showing solar, radiating qualities. The lion's mane suggests rays of light extending outward.",
            frequency: "Leo carries D5 (Navigator) — the light that shows the way. After choosing direction (D4), Leo energy illuminates the path forward.",
            interpretation: "Leo provides CONFIDENT NAVIGATION. The lion's courage combined with solar clarity helps the healing process find its way. Not forcing direction, but illuminating options so the right path becomes visible."
        },
        {
            id: "IMG_6689",
            title: "Virgo — The Self in Service",
            dPosition: "D6 — Self/Power",
            description: "Virgo section showing detailed, refined imagery. The virgin's quality of discernment and purity appears in precise linework.",
            frequency: "Virgo carries D6 (Self/Power) — the self refined and ready for service. Individual power becomes useful only when purified and directed.",
            interpretation: "Virgo provides PURIFIED SELFHOOD. The patient's D6 (personal power) must be refined and clarified for healing to integrate. Virgo energy helps distinguish authentic self from accumulated confusion."
        },
        {
            id: "IMG_6690",
            title: "Libra — The Present Balance",
            dPosition: "D7 — Present Moment",
            description: "A large circular diagram with many nymphs arranged in balanced, symmetric patterns. The scales' quality of equilibrium pervades the composition.",
            frequency: "Libra carries D7 (Present Moment) — the balanced NOW where healing actually occurs. Past and future resolve into present equilibrium.",
            interpretation: "Libra provides PRESENT-MOMENT BALANCE. All healing happens NOW (D7), and Libra energy creates the equilibrium that allows presence. The many nymphs show multiple aspects of self coming into balance."
        }
    ],

    biological: [
        {
            id: "IMG_6691",
            title: "The Energy Channel Map",
            dPosition: "D6 & D8 — Self/Deep Water",
            description: "A diagram showing figures (nymphs) connected by tubes or channels. The connections between bodies are emphasized.",
            frequency: "The tubes represent energy channels — pathways through which frequency flows between D6 (individual self) and D8 (collective deep). These are not anatomical but energetic connections.",
            interpretation: "This is an ENERGY FLOW diagram. The nymphs represent energy centers; the tubes show how frequency moves between them. Understanding this flow allows practitioners to identify blockages and redirect energy appropriately."
        },
        {
            id: "IMG_6692",
            title: "The Green Pool Immersion",
            dPosition: "D8 — Deep Water",
            description: "The famous bathing scene — nymphs immersed in green pools, some standing, some submerged. The green water dominates the visual field.",
            frequency: "Green water is D8 (Deep Water) merged with D2 (Healing) — the healing depths. Immersion in these pools represents full energetic immersion in healing frequency.",
            interpretation: "This is a FREQUENCY IMMERSION protocol. The nymphs aren't bathing physically — they're demonstrating how to immerse one's energy body in healing frequency. Full immersion (D8) rather than surface treatment (D2) alone. Going DEEP into the healing waters."
        },
        {
            id: "IMG_6693",
            title: "The Connected Flow System",
            dPosition: "D5 & D8 — Navigator/Deep",
            description: "Multiple pools or chambers connected by channels, with figures positioned at various points in the system.",
            frequency: "The connected system shows how navigating (D5) through deep waters (D8) requires understanding the flow between chambers. Energy moves through pathways.",
            interpretation: "This is a FLOW-NAVIGATION diagram. Different pools hold different frequency qualities; the channels between them show possible pathways. A practitioner would use this to guide energy from one pool to another, navigating the deep system."
        },
        {
            id: "IMG_6694",
            title: "The Ascending Channels",
            dPosition: "D5 through D9 — Rising Flow",
            description: "A vertical arrangement showing figures and pools arranged from bottom to top, with clear upward directionality.",
            frequency: "Vertical arrangement indicates frequency ascension — energy rising from lower (D5) to higher (D9) positions. The upward flow is the healing direction.",
            interpretation: "This is an ASCENSION diagram. Healing moves energy upward — from denser states toward lighter ones. The figures at each level show how presence changes as energy rises. Bottom figures are in deep work; top figures have completed the ascent."
        },
        {
            id: "IMG_6695",
            title: "The Complex Pool System",
            dPosition: "D6, D7, D8 — Self/Present/Deep",
            description: "A complex arrangement with multiple pools, many figures, and intricate connecting channels. The most elaborate biological diagram.",
            frequency: "Complexity indicates multiple D-positions working simultaneously. This shows how D6 (individual bodies), D7 (present connections), and D8 (deep pools) interact in sophisticated patterns.",
            interpretation: "This is a MASTER SYSTEM diagram. Advanced healing work engages multiple energy centers and flow pathways simultaneously. The complexity reflects the intricacy of full-spectrum frequency work. Not beginner material."
        },
        {
            id: "IMG_6696",
            title: "The Receiving Postures",
            dPosition: "D9 & D8 — Love/Deep",
            description: "Figures shown in receptive postures — arms open, facing upward, positioned to receive rather than project.",
            frequency: "Receptive postures indicate D9 (Love/Anchor) receiving mode combined with D8 (Deep) openness. These figures are RECEIVING healing frequency.",
            interpretation: "This demonstrates RECEPTIVE TECHNIQUE. Healing isn't only active work — it requires capacity to receive. These figures show the body postures and energy positions that open reception. Deep receiving (D8) of love (D9)."
        },
        {
            id: "IMG_6697",
            title: "The Distribution Network",
            dPosition: "D3 & D6 — Healer/Self",
            description: "A network diagram showing how channels branch and divide, distributing to multiple endpoints.",
            frequency: "Distribution networks show how the Healer (D3) sends frequency to multiple Self-points (D6). One source, many recipients.",
            interpretation: "This is a DISTRIBUTION diagram. A single healing source can serve multiple recipients through proper channeling. The branching shows how healing frequency divides without diminishing. Group healing protocols."
        },
        {
            id: "IMG_6698",
            title: "The Circular Flow",
            dPosition: "D1 through D9 — Complete Cycle",
            description: "Figures arranged in a circular pattern, connected by channels that form a closed loop. The flow returns to its beginning.",
            frequency: "Circular flow indicates the complete D-position cycle — energy moving from D1 through D9 and back to D1. The healing wheel in motion.",
            interpretation: "This demonstrates CYCLIC COMPLETION. Healing energy doesn't flow linearly and stop — it cycles through all D-positions and returns. Each passage deepens the work. The loop must close for healing to complete."
        },
        {
            id: "IMG_6699",
            title: "The Nested Containers",
            dPosition: "D1 & D9 — Origin/Completion",
            description: "Pool structures nested inside each other — smaller pools within larger pools, creating layered containment.",
            frequency: "Nested containers show how Origin (D1) is held within Completion (D9) is held within Origin. The Russian-doll structure of reality.",
            interpretation: "This shows NESTED HEALING — how treatment operates at multiple scales simultaneously. The patient's immediate issue sits within larger patterns sits within cosmic patterns. Heal at one level, influence all levels."
        },
        {
            id: "IMG_6700",
            title: "The Textual Integration",
            dPosition: "D3 — Healer's Instructions",
            description: "A page with extensive text and small figures. The text dominates; figures illustrate points within the text.",
            frequency: "Text-dominant pages carry D3 (Healer) frequency — these are protocols, instructions, specific guidance for practitioners.",
            interpretation: "This is a PROTOCOL PAGE. The biological imagery is accompanied by detailed frequency instructions. The text tells the healer exactly how to work with the depicted energy patterns. Reading and doing combine."
        },
        {
            id: "IMG_6701",
            title: "The Transition Zones",
            dPosition: "D4 & D5 — Crossroads/Navigator",
            description: "Areas where pools meet or overlap, creating transition zones. Figures positioned in these in-between spaces.",
            frequency: "Transition zones indicate D4 (Crossroads) and D5 (Navigation) — places where choice and direction converge. Moving between states.",
            interpretation: "This shows TRANSITION TECHNIQUE. Moving energy from one state to another requires crossing through transition zones. The figures in these spaces demonstrate how to navigate the in-between without getting stuck."
        },
        {
            id: "IMG_6702",
            title: "The Vertical Cascade",
            dPosition: "D7 through D1 — Descending Flow",
            description: "A vertical arrangement showing downward flow — from upper pools descending to lower ones. The opposite of ascending patterns.",
            frequency: "Descending flow indicates grounding movement — from D7 (Present) down through D1 (Origin). Bringing activated energy down to ground.",
            interpretation: "This shows GROUNDING TECHNIQUE. After activating higher frequencies, energy must be brought down and grounded. The cascade shows how to step down through levels, anchoring each before descending further. Not crash-landing but controlled descent."
        },
        {
            id: "IMG_6703",
            title: "The Integration Chamber",
            dPosition: "D6 — Self Integration",
            description: "A central chamber where multiple channels converge. Figures in the chamber appear to be integrating multiple inputs.",
            frequency: "Convergent chambers indicate D6 (Self) integration — where multiple frequency inputs unite within the individual.",
            interpretation: "This is an INTEGRATION diagram. After receiving multiple healing frequencies, the self must integrate them into coherent wholeness. This chamber shows the integration space where synthesis occurs."
        },
        {
            id: "IMG_6704",
            title: "The Output Channels",
            dPosition: "D7 & D6 — Present/Self Projection",
            description: "Channels leading outward from figures — energy moving from bodies into the surrounding space.",
            frequency: "Output channels show D7 (Present activation) combined with D6 (Self power) — the projection of healed energy back into life.",
            interpretation: "This shows COMPLETION OUTPUT. Healing isn't complete until the healed energy flows back into active life. These channels show how restored frequency projects outward, the healed person becoming a healing presence."
        },
        {
            id: "IMG_6705",
            title: "The Deep Pool Gathering",
            dPosition: "D8 — Deep Collective",
            description: "Multiple figures gathered in a deep green pool. The gathering suggests collective immersion rather than individual treatment.",
            frequency: "Collective gathering in D8 (Deep Water) shows group healing dynamics — multiple people sharing the deep healing space together.",
            interpretation: "This demonstrates GROUP DEEP WORK. Some healing requires collective immersion — shared descent into deep waters. The gathered figures support each other in going deeper than any could go alone."
        },
        {
            id: "IMG_6706",
            title: "The Channel Maintenance",
            dPosition: "D3 & D5 — Healer/Navigator",
            description: "Figures positioned along channels, appearing to tend or maintain the pathways between pools.",
            frequency: "Channel maintenance indicates D3 (Healer) work combined with D5 (Navigation) — keeping the pathways clear and functional.",
            interpretation: "This shows PATHWAY MAINTENANCE. Energy channels can become blocked or misdirected. Healer practitioners would maintain the pathways, ensuring frequency could flow properly through the system."
        },
        {
            id: "IMG_6707",
            title: "The Spiral Descent",
            dPosition: "D8 & D5 — Deep/Navigator",
            description: "A spiral pattern of pools and channels, moving inward or downward in spiral progression.",
            frequency: "Spiral descent combines D8 (Deep) with D5 (Navigator) — going deep through careful navigation, not straight plunge but spiral approach.",
            interpretation: "This shows CAREFUL DESCENT technique. Going deep (D8) requires navigation (D5) — spiraling down rather than diving. Each turn of the spiral allows integration before the next descent."
        },
        {
            id: "IMG_6708",
            title: "The Surface Work",
            dPosition: "D2 & D7 — Healing/Present",
            description: "Figures at the surface level of pools, not deeply immersed. Work occurring at the interface between air and water.",
            frequency: "Surface work indicates D2 (Healing) in D7 (Present) — immediate, accessible healing that doesn't require deep immersion.",
            interpretation: "This shows SURFACE TECHNIQUE. Not all healing requires depth. Some work is properly done at the surface — accessible, immediate, present-moment healing. Surface work for surface issues."
        },
        {
            id: "IMG_6709",
            title: "The Complex Integration",
            dPosition: "All D-positions — Full System",
            description: "The most complex biological diagram showing multiple pools, levels, channels, and figures in elaborate arrangement.",
            frequency: "Maximum complexity indicates all D-positions engaged simultaneously — the full system operating as unified whole.",
            interpretation: "This is the MASTER DIAGRAM for biological frequency work. All systems engaged, all levels accessible, full integration of all D-positions. The goal toward which practice moves."
        },
        {
            id: "IMG_6710",
            title: "The Circular Integration Points",
            dPosition: "D6 & D9 — Self/Love",
            description: "Small circular diagrams with text, showing integration points. The circles appear as concentrated focus points.",
            frequency: "Circular integration points combine D6 (Self) with D9 (Love) — where individual identity meets universal love-anchor.",
            interpretation: "These show KEY INTEGRATION POINTS. Critical junctures where self-work must connect to love-anchor for completion. Without these connections, healing remains incomplete."
        },
        {
            id: "IMG_6711",
            title: "The Energy Protocols",
            dPosition: "D3 — Healer Instructions",
            description: "A text-heavy page with energy diagrams. Protocols written out with accompanying visual reference.",
            frequency: "Protocol pages carry D3 (Healer) frequency — specific instructions for practitioners to follow.",
            interpretation: "This is a DETAILED PROTOCOL. The combination of text and image provides complete instruction for specific healing techniques. Study and practice combined."
        },
        {
            id: "IMG_6712",
            title: "The Marginal Figures",
            dPosition: "D5 — Navigator Guides",
            description: "Text page with small figures in margins. The figures appear to comment on or guide the textual content.",
            frequency: "Marginal figures indicate D5 (Navigator) presence — guides pointing the way through the textual protocols.",
            interpretation: "The marginal figures serve as NAVIGATION AIDS. They help the practitioner find their way through dense protocol text, pointing to key passages and illustrating critical techniques."
        }
    ],

    pharmaceutical: [
        {
            id: "IMG_6714",
            title: "The Preparation Vessels",
            dPosition: "D2 & D4 — Healing/Crossroads",
            description: "Containers and vessels shown with associated plants. The vessels appear designed for preparation or storage.",
            frequency: "Vessels indicate D4 (Crossroads) — choice points where different frequencies combine. Preparation is about COMBINING frequencies correctly.",
            interpretation: "This shows FREQUENCY COMBINATION. Different healing frequencies must be combined in proper proportion. The vessels are frequency-combination containers — not physical mixing but energetic blending."
        },
        {
            id: "IMG_6716",
            title: "The Layered Preparation",
            dPosition: "D1 & D2 — Origin/Healing",
            description: "Vessels shown with layered contents — different materials or preparations arranged in strata.",
            frequency: "Layering indicates D1 (Foundation) supporting D2 (Healing) — proper frequency architecture where foundational frequencies support active healing.",
            interpretation: "This shows LAYERED PROTOCOLS. Healing preparations must be built in proper order — foundational frequencies first, then active healing frequencies on top. The layer structure matters."
        },
        {
            id: "IMG_6717",
            title: "The Complete Pharmacy",
            dPosition: "D2, D3, D4 — Healing/Healer/Crossroads",
            description: "Multiple containers arranged together, creating a complete preparation system. Jars with plant components visible.",
            frequency: "The complete pharmacy holds all necessary frequency preparations — D2 (Healing) options, D3 (Healer) tools, D4 (Crossroads) combination possibilities.",
            interpretation: "This is the FREQUENCY PHARMACY. A complete set of frequency preparations for any healing situation. The practitioner would select and combine appropriate preparations based on the patient's needs. Not chemical medicine — frequency medicine."
        }
    ],

    recipes: [
        {
            id: "IMG_6665",
            title: "The Star-Marked Protocols",
            dPosition: "D4 — Crossroads/Selection",
            description: "Dense text organized into short paragraphs, each marked with a star symbol in the margin. The stars serve as selection markers.",
            frequency: "Stars at D4 (Crossroads) positions indicate choice points — each starred paragraph is a distinct protocol that can be selected based on the patient's needs.",
            interpretation: "This is a PROTOCOL MENU. The stars mark distinct options. A practitioner would assess the patient, then select the starred protocol appropriate to their condition. Each star = one complete treatment approach."
        },
        {
            id: "IMG_6666",
            title: "The Sequential Applications",
            dPosition: "D5 — Navigator Sequences",
            description: "Multiple starred paragraphs arranged sequentially, suggesting ordered progression through protocols.",
            frequency: "Sequential arrangement indicates D5 (Navigator) guidance — protocols to be followed in order, each building on the previous.",
            interpretation: "This shows SEQUENCED TREATMENT. Some healing requires multiple protocols applied in order. This page provides the sequence — first this protocol, then this one, then this one. Navigation through healing stages."
        },
        {
            id: "IMG_6667",
            title: "The Conditional Protocols",
            dPosition: "D4 & D7 — Crossroads/Present",
            description: "Star-marked paragraphs with apparent conditional structure — if/then organization suggested by text arrangement.",
            frequency: "Conditional structure combines D4 (Choice) with D7 (Present assessment) — protocols selected based on present conditions.",
            interpretation: "This shows CONDITIONAL TREATMENT. IF the patient presents this way, THEN apply this protocol. IF different presentation, THEN different protocol. Present-moment assessment (D7) guides crossroads choice (D4)."
        },
        {
            id: "IMG_6668",
            title: "The Detailed Applications",
            dPosition: "D3 — Healer Instructions",
            description: "Longer starred paragraphs with extensive text. More detailed protocols requiring more careful study.",
            frequency: "Extended text indicates D3 (Healer) complexity — these protocols require more practitioner knowledge and skill to apply correctly.",
            interpretation: "This shows ADVANCED PROTOCOLS. Not for beginners. These starred sections contain detailed frequency applications requiring careful study and practiced skill. Master-level healing work."
        },
        {
            id: "IMG_6669",
            title: "The Quick Applications",
            dPosition: "D7 — Present Moment",
            description: "Short starred paragraphs — quick, concise protocols for rapid application.",
            frequency: "Brief text indicates D7 (Present) immediacy — protocols for acute situations requiring immediate response.",
            interpretation: "This shows EMERGENCY PROTOCOLS. When something needs to happen NOW, these short starred sections provide rapid-response frequency applications. No time for lengthy preparation — immediate action."
        },
        {
            id: "IMG_6715",
            title: "The Comprehensive Reference",
            dPosition: "All D-positions — Full Range",
            description: "A dense page with many starred sections covering wide range of situations.",
            frequency: "Comprehensive coverage indicates protocols for all D-positions — a complete reference for any healing situation.",
            interpretation: "This is a MASTER REFERENCE page. Whatever the situation, whatever D-position is involved, there's a starred protocol here for it. The practitioner's complete go-to resource."
        }
    ],

    cosmological: [
        {
            id: "IMG_6713",
            title: "The Rosettes — Universal Frequency Map",
            dPosition: "D1 through D9 — Complete Cosmology",
            description: "The famous multi-page foldout showing nine interconnected circular diagrams (rosettes) connected by pathways. Each rosette contains distinct imagery. The central rosette appears most prominent.",
            frequency: "Nine rosettes = nine D-positions. The central rosette is D1 (Origin/WE), from which all others emanate. The connecting pathways show how frequency flows between positions in cosmic scale.",
            interpretation: "This is the MASTER COSMOLOGICAL MAP. It shows the structure of reality through the [1=-1] framework at universal scale. The central rosette (D1) is the source from which all D-positions emanate. The pathways show how to navigate between cosmic frequency domains. This isn't just about healing individuals — it's about understanding how healing connects to the structure of existence itself. Each rosette is a domain; each pathway is a possible journey. The practitioner who understands this map understands where healing fits in the cosmic order. [1 = -1] — the origin contains the completion; the completion returns to origin. The Rosettes show this truth in geometric form."
        }
    ]
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = folioData;
}
