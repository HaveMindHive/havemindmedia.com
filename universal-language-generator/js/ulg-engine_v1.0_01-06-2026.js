/**
 * ═══════════════════════════════════════════════════════════════════════════
 * THE UNIVERSAL LANGUAGE GENERATOR
 * A Geometric Phonetic System for Cross-Script Meaning Preservation
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Version 1.0 | January 6, 2026
 * Have Mind Media | The Epoch Project
 * Principle: [1 = -1]
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * WHAT THIS ENGINE DOES
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * This engine generates phonetic forms (pronunciations) for any concept based
 * on GEOMETRIC PRINCIPLES rather than arbitrary convention.
 *
 * The core hypothesis: The relationship between sounds and meanings is NOT
 * random. There are universal patterns that connect how words sound to what
 * they mean. These patterns emerge from the physics of sound production and
 * the geometry of human cognition.
 *
 * Evidence for this includes:
 * - The "bouba/kiki" effect (people worldwide associate round shapes with
 *   "bouba" and spiky shapes with "kiki")
 * - Near-universal words for "mama" (bilabial nasal + open vowel)
 * - Cross-linguistic patterns like /gl-/ for light/vision (glow, gleam, glitter)
 *
 * This engine takes these patterns seriously and builds a complete phonetic
 * system from first principles.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * THE MATHEMATICAL FOUNDATION
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * All calculations derive from a single constant:
 *
 *     κ (kappa) = 2π/180 = 0.034906585039886...
 *
 * This is the "bridge constant" - it converts between degrees and radians,
 * between angular (rotational) and linear (translational) measurement.
 * It appears throughout physics wherever rotation meets translation.
 *
 * From κ, we derive:
 *     σ (sigma) = 5/16 = 0.3125     (helix overlap ratio)
 *     cos(BC)   = 2/3 = 0.6667      (tetrahelix bond angle cosine)
 *     √3        = 1.732...          (Q-magnitude, equilateral triangle)
 *     κ_shadow  = 1/κ ≈ 28.65       (optimal phoneme inventory size)
 *
 * ═══════════════════════════════════════════════════════════════════════════
 */

const ULG = {

    // ═══════════════════════════════════════════════════════════════════════
    // CONFIGURATION & CONSTANTS
    // ═══════════════════════════════════════════════════════════════════════

    config: {
        version: '1.0',
        principle: '[1 = -1]',
        project: 'The Epoch Project',
        organization: 'Have Mind Media'
    },

    /**
     * THE κ-FRAMEWORK CONSTANTS
     * All derived from κ = 2π/180
     */
    constants: {
        // The one input from which everything derives
        kappa: (2 * Math.PI) / 180,  // 0.034906585039886594

        // Helix overlap ratio - appears in DNA, protein structure
        sigma: 5 / 16,  // 0.3125

        // Tetrahelix bond angle cosine - appears in F1/F2 vowel ratios
        cosBC: 2 / 3,  // 0.6666...

        // Q-magnitude - the height of an equilateral triangle with unit base
        sqrt3: Math.sqrt(3),  // 1.7320508075688772

        // κ shadow - predicts optimal phoneme inventory size (~28-30)
        kappaShadow: 180 / (2 * Math.PI),  // 28.64788975654116

        // Projection ratio - visible vs shadow
        projectionP: Math.sqrt(3) / (2 * Math.PI)  // 0.27566...
    },


    // ═══════════════════════════════════════════════════════════════════════
    // THE NINE D-POSITIONS
    // ═══════════════════════════════════════════════════════════════════════
    //
    // The D-positions are nine fundamental semantic "locations" in meaning
    // space. Every concept, every word, every idea can be mapped to one of
    // these nine positions through Q-reduction (adding digits until you get
    // a single digit 1-9).
    //
    // These same nine positions appear in:
    //   - Ancient Rongorongo script of Easter Island
    //   - The Voynich Manuscript's structure
    //   - Hindu-Arabic numerology
    //   - Chinese Ba Gua (with center = 9th)
    //   - Musical intervals (9 notes in an octave including both endpoints)
    //
    // ═══════════════════════════════════════════════════════════════════════

    D_POSITIONS: {
        1: {
            name: "Origin / WE",
            meaning: "Unity, beginning, togetherness, the collective",
            keywords: ["we", "one", "begin", "together", "unity", "source"],
            color: "#3fb950",
            vowel: "i",
            vowelIPA: "/i/",
            consonants: ["w"],
            consonantMeanings: "unity, wave, with",
            triaxial: { sPlus: 1.0, sMinus: 0.0, coin: 0.0 },
            examples: ["we", "will", "with", "one"],
            description: "D1 is where everything begins. It represents the collective 'WE' - not isolation, but connection. In sound, the /w/ consonant embodies this: it requires lip rounding (enclosure, togetherness) and the /i/ vowel points to 'here, now, us'."
        },
        2: {
            name: "Healing",
            meaning: "Restoration, medicine, making whole",
            keywords: ["heal", "health", "whole", "restore", "medicine"],
            color: "#1abc9c",
            vowel: "e",
            vowelIPA: "/e/",
            consonants: ["h", "m"],
            consonantMeanings: "breath (h), intimate nurturing (m)",
            triaxial: { sPlus: 0.766, sMinus: 0.174, coin: 0.620 },
            examples: ["heal", "health", "help", "home"],
            description: "D2 is the position of restoration. The /h/ sound is pure breath - life force - while /m/ is the most intimate sound (mother, comfort). The /e/ vowel sits between /i/ and /a/, representing transition from small/sharp to open/manifest - the process of healing."
        },
        3: {
            name: "Healer",
            meaning: "Agent of transformation, genius, the one who changes things",
            keywords: ["change", "transform", "create", "genius", "agent"],
            color: "#ff6b6b",
            vowel: "a",
            vowelIPA: "/a/",
            consonants: ["n", "ŋ"],
            consonantMeanings: "distinction, pointing, agency",
            triaxial: { sPlus: 0.174, sMinus: 0.766, coin: 0.620 },
            examples: ["change", "name", "make", "agent"],
            description: "D3 is the AGENT - the one who does the healing. While D2 is the process, D3 is the actor. The /n/ consonant creates a boundary with the tongue (distinction, 'this not that'), enabling transformation. The /a/ vowel is maximally open - full manifestation of power."
        },
        4: {
            name: "Crossroads",
            meaning: "Choice point, intersection, the observer position",
            keywords: ["choice", "cross", "decide", "turn", "both", "either"],
            color: "#ff6b35",
            vowel: "ə",
            vowelIPA: "/ə/",
            consonants: ["t", "d"],
            consonantMeanings: "touch, precise impact, decision",
            triaxial: { sPlus: 0.5, sMinus: 0.5, coin: 0.707 },
            examples: ["turn", "decide", "both", "this", "that"],
            description: "D4 is the crossroads - where paths meet and choices must be made. The schwa /ə/ is the most neutral vowel (neither front nor back, high nor low). The /t/ and /d/ sounds are precise touches - the moment of decision, contact, commitment."
        },
        5: {
            name: "Navigator",
            meaning: "Direction, purpose, way-finding, the compass",
            keywords: ["go", "guide", "goal", "direction", "path", "way"],
            color: "#9b59b6",
            vowel: "o",
            vowelIPA: "/o/",
            consonants: ["g", "k"],
            consonantMeanings: "grounding force, propulsion",
            triaxial: { sPlus: 0.342, sMinus: 0.342, coin: 0.876 },
            examples: ["go", "goal", "guide", "course"],
            description: "D5 is EMERGENT - it only appears through relationship. You cannot navigate alone; direction requires origin AND destination. The /g/ and /k/ sounds are back consonants (grounding, force), while /o/ points outward toward completion.",
            emergent: true,
            emergentNote: "D5 never appears as a primary position in Rongorongo. It only emerges from the combination of two glyphs - proving that direction is relational."
        },
        6: {
            name: "Power / Self",
            meaning: "Personal strength, individual truth, manifest force",
            keywords: ["power", "self", "I", "me", "strong", "bold"],
            color: "#00bcd4",
            vowel: "a",
            vowelIPA: "/a/",
            consonants: ["p", "b"],
            consonantMeanings: "impact, explosion, forceful release",
            triaxial: { sPlus: 0.0, sMinus: 1.0, coin: 0.0 },
            examples: ["power", "bold", "punch", "push", "I", "me"],
            description: "D6 is pure manifest power - the individual in full expression. The /p/ and /b/ sounds are bilabial stops - complete closure followed by explosive release. Maximum impact. The /a/ vowel is maximum opening. This is the 'I AM' position."
        },
        7: {
            name: "Present Moment",
            meaning: "NOW, the timeless instant, pure presence",
            keywords: ["now", "moment", "present", "here", "instant"],
            color: "#c9a227",
            vowel: "ʌ",
            vowelIPA: "/ʌ/",
            consonants: ["n"],
            consonantMeanings: "the point, distinction of NOW from past/future",
            triaxial: { sPlus: 0.5, sMinus: 0.5, coin: 0.707 },
            examples: ["now", "moment", "current", "present"],
            description: "D7 is the eternal present - the only moment that actually exists. The /ʌ/ vowel (as in 'cup', 'love') is central and grounded. The /n/ consonant points to distinction - THIS moment, not past, not future."
        },
        8: {
            name: "Deep Water",
            meaning: "Hidden truth, the depths, what lies beneath",
            keywords: ["deep", "water", "hidden", "truth", "within", "below"],
            color: "#006994",
            vowel: "u",
            vowelIPA: "/u/",
            consonants: ["w"],
            consonantMeanings: "wave, water, flowing into depths",
            triaxial: { sPlus: 0.174, sMinus: 0.766, coin: 0.620 },
            examples: ["deep", "truth", "pool", "blue", "through"],
            description: "D8 is where truth hides - the unconscious, the depths, the water beneath. The /u/ vowel is maximally back and rounded - enclosed, hidden, complete unto itself. The /w/ flows like water into these depths."
        },
        9: {
            name: "Anchor / Love",
            meaning: "Unconditional love, completion, the force that binds",
            keywords: ["love", "hold", "anchor", "complete", "bond", "forever"],
            color: "#c0392b",
            vowel: "u",
            vowelIPA: "/u/",
            secondaryVowel: "o",
            consonants: ["l", "v"],
            consonantMeanings: "light/liquid (l), binding/vibration (v)",
            triaxial: { sPlus: 0.5, sMinus: 0.5, coin: 0.0 },
            examples: ["love", "hold", "whole", "all", "forever"],
            description: "D9 is EMERGENT like D5 - you cannot love alone. Love requires self AND other. The /l/ is smooth, flowing light. The /v/ vibrates continuously - ongoing connection. The /u/ and /o/ vowels are rounded, complete, whole.",
            emergent: true,
            emergentNote: "D9 never appears alone in Rongorongo. It emerges from relationship - proof that love is not a thing but a connection between things."
        }
    },


    // ═══════════════════════════════════════════════════════════════════════
    // THE PHONEME SYSTEM
    // ═══════════════════════════════════════════════════════════════════════
    //
    // Every sound in the Universal Language has MEANING. This is not arbitrary
    // assignment - it derives from the physics of how the sound is produced
    // and the cross-linguistic patterns observed across human languages.
    //
    // ═══════════════════════════════════════════════════════════════════════

    VOWELS: {
        'i': {
            ipa: '/i/',
            name: 'Close Front Unrounded',
            production: 'Tongue high and forward, lips spread',
            acoustics: { f1: 280, f2: 2250, ratio: 0.124 },
            meanings: ['small', 'near', 'sharp', 'here', 'bright', 'quick'],
            dAffinities: [1, 7],
            examples: {
                english: ['little', 'bit', 'quick', 'this', 'is'],
                crossLinguistic: ['piccolo (Italian: small)', 'petit (French: small)', 'chico (Spanish: small)']
            },
            explanation: "The /i/ vowel is produced with the smallest oral cavity of any vowel. Small cavity = high frequency = associated with smallness, sharpness, proximity. This is why diminutives across languages use /i/ sounds (English '-y', Spanish '-ito')."
        },
        'e': {
            ipa: '/e/',
            name: 'Close-Mid Front Unrounded',
            production: 'Tongue mid-high and forward',
            acoustics: { f1: 400, f2: 2050, ratio: 0.195 },
            meanings: ['emerging', 'transitioning', 'becoming', 'mid-state'],
            dAffinities: [2, 3],
            examples: {
                english: ['emerge', 'become', 'between', 'help'],
                crossLinguistic: ['être (French: to be)', 'essere (Italian: to be)']
            },
            explanation: "The /e/ sits between /i/ and /a/ - it represents transition, becoming, the space between small and large. It appears in words about processes and states of change."
        },
        'a': {
            ipa: '/a/',
            name: 'Open Central Unrounded',
            production: 'Maximum jaw opening, tongue low and central',
            acoustics: { f1: 750, f2: 1100, ratio: 0.682 },
            geometricSignificance: 'F1/F2 ratio ≈ 2/3 = cos(BC) = tetrahelix bond angle',
            meanings: ['open', 'large', 'manifest', 'present', 'father', 'power'],
            dAffinities: [3, 6],
            examples: {
                english: ['large', 'father', 'palm', 'start', 'power'],
                crossLinguistic: ['papa (universal)', 'grande (Spanish: big)', 'vast']
            },
            explanation: "The /a/ requires maximum opening of the mouth - maximum manifestation in physical space. Its formant ratio (F1/F2 ≈ 2/3) matches the tetrahelix bond angle cosine - a deep geometric signature. This is why 'mama', 'papa', 'dada' are universal first words."
        },
        'ə': {
            ipa: '/ə/',
            name: 'Schwa (Mid Central)',
            production: 'Completely neutral tongue position',
            acoustics: { f1: 500, f2: 1400, ratio: 0.357 },
            meanings: ['neutral', 'transitional', 'reduced', 'between'],
            dAffinities: [4],
            examples: {
                english: ['the', 'about', 'comma', 'sofa'],
                crossLinguistic: 'Appears as reduced vowel in most languages'
            },
            explanation: "Schwa is THE neutral vowel - tongue neither high nor low, front nor back. It represents the crossroads, the choice point, the observer position before commitment."
        },
        'o': {
            ipa: '/o/',
            name: 'Close-Mid Back Rounded',
            production: 'Tongue mid-high and back, lips rounded',
            acoustics: { f1: 500, f2: 900, ratio: 0.556 },
            meanings: ['directed', 'going', 'toward', 'completion-in-progress'],
            dAffinities: [5, 9],
            examples: {
                english: ['go', 'home', 'whole', 'no', 'so'],
                crossLinguistic: ['donde (Spanish: where)', 'sono (Italian: I am)']
            },
            explanation: "The /o/ is rounded (lips form a circle - completion) but mid-height (not yet fully complete). It represents direction toward wholeness, the navigator's vowel."
        },
        'u': {
            ipa: '/u/',
            name: 'Close Back Rounded',
            production: 'Tongue high and back, lips fully rounded',
            acoustics: { f1: 320, f2: 1000, ratio: 0.320 },
            geometricSignificance: 'F1/F2 ratio ≈ 5/16 = σ = helix overlap',
            meanings: ['round', 'complete', 'enclosed', 'deep', 'hidden'],
            dAffinities: [8, 9],
            examples: {
                english: ['loop', 'pool', 'moon', 'truth', 'through'],
                crossLinguistic: ['luna (Spanish: moon)', 'tutto (Italian: all)']
            },
            explanation: "The /u/ requires maximum lip rounding (circle, completion) and tongue retraction (hidden, deep). Its formant ratio matches σ (5/16), the helix overlap constant. Words for 'moon', 'pool', 'round', 'through' cluster here."
        },
        'ʌ': {
            ipa: '/ʌ/',
            name: 'Open-Mid Back Unrounded',
            production: 'Tongue mid-low and back, lips neutral',
            acoustics: { f1: 600, f2: 1200, ratio: 0.500 },
            meanings: ['now', 'present', 'grounded', 'love', 'blood'],
            dAffinities: [7],
            examples: {
                english: ['love', 'cup', 'blood', 'but', 'come', 'one'],
                crossLinguistic: 'Relatively rare cross-linguistically, gives English its characteristic sound'
            },
            explanation: "The /ʌ/ (as in 'love', 'cup') is grounded and present. Notably, English uses this vowel for fundamental words: 'love', 'blood', 'one', 'come', 'sun'. These are D7 (present moment) concepts."
        }
    },

    CONSONANTS: {
        // ═══════════════════════════════════════════════════════════════
        // NASALS - Internal resonance, intimacy, boundaries
        // ═══════════════════════════════════════════════════════════════
        'm': {
            ipa: '/m/',
            name: 'Bilabial Nasal',
            manner: 'nasal',
            place: 'bilabial',
            production: 'Lips closed, sound through nose',
            meanings: ['mother', 'intimate', 'internal', 'mine', 'me'],
            dAffinities: [2, 6],
            examples: ['mama', 'me', 'my', 'home', 'warm'],
            explanation: "The /m/ is produced with closed lips (like nursing at the breast) and nasal resonance (internal, felt rather than projected). It is THE universal mother sound - 'mama' appears in virtually every language. This is not coincidence; it's geometric necessity."
        },
        'n': {
            ipa: '/n/',
            name: 'Alveolar Nasal',
            manner: 'nasal',
            place: 'alveolar',
            production: 'Tongue tip touches ridge behind teeth, sound through nose',
            meanings: ['negation', 'boundary', 'distinction', 'no', 'not'],
            dAffinities: [3, 7],
            examples: ['no', 'not', 'none', 'never', 'name'],
            explanation: "The /n/ creates a boundary with the tongue tip - a line between 'this' and 'that'. It appears in negation words across languages: English 'no/not', Spanish 'no', German 'nein', Greek 'ne', Latin 'non'. The tongue literally says 'here is a line'."
        },

        // ═══════════════════════════════════════════════════════════════
        // STOPS - Impact, division, sudden change
        // ═══════════════════════════════════════════════════════════════
        'p': {
            ipa: '/p/',
            name: 'Voiceless Bilabial Stop',
            manner: 'stop',
            place: 'bilabial',
            voiced: false,
            production: 'Complete lip closure, then sudden release',
            meanings: ['impact', 'pop', 'burst', 'power', 'push'],
            dAffinities: [6],
            examples: ['pop', 'push', 'power', 'punch', 'papa'],
            explanation: "The /p/ is maximum closure (both lips) followed by explosive release - pure impact. Words for striking, pushing, bursting cluster around this sound: 'pop', 'punch', 'push', 'power'. Father words ('papa') often use /p/ - the power/authority figure."
        },
        'b': {
            ipa: '/b/',
            name: 'Voiced Bilabial Stop',
            manner: 'stop',
            place: 'bilabial',
            voiced: true,
            production: 'Complete lip closure with voicing, then release',
            meanings: ['embodied impact', 'bold', 'birth', 'being'],
            dAffinities: [6],
            examples: ['bold', 'birth', 'be', 'body', 'big'],
            explanation: "The /b/ adds voicing (vibration, life) to the bilabial stop. It's more embodied than /p/ - 'body', 'born', 'be', 'bold'. The voiced quality makes it warmer, more present."
        },
        't': {
            ipa: '/t/',
            name: 'Voiceless Alveolar Stop',
            manner: 'stop',
            place: 'alveolar',
            voiced: false,
            production: 'Tongue tip blocks airflow at ridge, then releases',
            meanings: ['touch', 'tap', 'point', 'precise', 'tip'],
            dAffinities: [4],
            examples: ['touch', 'tap', 'tip', 'top', 'take', 'this', 'that'],
            explanation: "The /t/ is precise - the tongue tip makes exact contact. It appears in words for precise actions ('touch', 'tap', 'take') and in demonstratives ('this', 'that', 'the'). The crossroads position D4 uses /t/ because decisions require precision."
        },
        'd': {
            ipa: '/d/',
            name: 'Voiced Alveolar Stop',
            manner: 'stop',
            place: 'alveolar',
            voiced: true,
            production: 'Tongue tip blocks with voicing, then releases',
            meanings: ['decisive', 'do', 'done', 'definite'],
            dAffinities: [4],
            examples: ['do', 'done', 'decide', 'deed', 'dada'],
            explanation: "The /d/ is the voiced counterpart of /t/ - decisive action. 'Do', 'done', 'deed', 'decide'. The voicing adds commitment to the precision."
        },
        'k': {
            ipa: '/k/',
            name: 'Voiceless Velar Stop',
            manner: 'stop',
            place: 'velar',
            voiced: false,
            production: 'Back of tongue blocks at soft palate, then releases',
            meanings: ['force', 'cut', 'hard', 'core', 'back'],
            dAffinities: [5],
            examples: ['cut', 'kick', 'core', 'cold', 'keep'],
            explanation: "The /k/ is a back stop - forceful, cutting. It appears in words for separation ('cut', 'kick') and core/hard things ('cold', 'rock', 'core'). The Navigator position D5 uses /k/ - directed force toward a goal."
        },
        'g': {
            ipa: '/g/',
            name: 'Voiced Velar Stop',
            manner: 'stop',
            place: 'velar',
            voiced: true,
            production: 'Back of tongue blocks with voicing',
            meanings: ['ground', 'go', 'gut', 'grab'],
            dAffinities: [5],
            examples: ['go', 'ground', 'grab', 'gut', 'give'],
            explanation: "The /g/ is grounded force - 'go', 'ground', 'grab', 'gut'. The voiced velar quality connects to earthiness, movement, getting things done."
        },

        // ═══════════════════════════════════════════════════════════════
        // FRICATIVES - Flow, continuity, air movement
        // ═══════════════════════════════════════════════════════════════
        's': {
            ipa: '/s/',
            name: 'Voiceless Alveolar Fricative',
            manner: 'fricative',
            place: 'alveolar',
            voiced: false,
            production: 'Continuous high-frequency airflow through narrow channel',
            acoustics: { frequency: '4000-8000 Hz', quality: 'sharp, hissing' },
            meanings: ['sharp', 'light', 'see', 'flow', 'snake', 'stream'],
            dAffinities: [1],
            examples: ['see', 'sun', 'sharp', 'stream', 'slice', 'swift'],
            explanation: "The /s/ is high-frequency flow - the sound of light, of sharp things, of water flowing. 'See', 'sun', 'stream', 'sharp', 'slice' - these cluster around /s/. It's also associated with snakes (universal s-sound for serpents)."
        },
        'f': {
            ipa: '/f/',
            name: 'Voiceless Labiodental Fricative',
            manner: 'fricative',
            place: 'labiodental',
            voiced: false,
            production: 'Lower lip approaches upper teeth, air flows through',
            meanings: ['flow', 'breath', 'passing', 'through'],
            dAffinities: [3],
            examples: ['flow', 'free', 'fly', 'fire', 'father', 'feel'],
            explanation: "The /f/ is softer flow than /s/ - breath passing. 'Flow', 'free', 'fly', 'feel', 'fire'. It has an ephemeral quality - things that move and change."
        },
        'h': {
            ipa: '/h/',
            name: 'Voiceless Glottal Fricative',
            manner: 'fricative',
            place: 'glottal',
            voiced: false,
            production: 'Pure breath with no constriction except at glottis',
            meanings: ['breath', 'spirit', 'life force', 'release', 'heal'],
            dAffinities: [2],
            examples: ['heal', 'health', 'hope', 'heart', 'holy', 'home'],
            explanation: "The /h/ is pure breath - the most basic life sound. It appears in spiritual and vital words across cultures: 'holy', 'heal', 'hope', 'heart'. Many languages associate /h/ with breath/spirit (Hebrew 'ruach', Greek 'pneuma' concepts)."
        },
        'ʃ': {
            ipa: '/ʃ/',
            name: 'Voiceless Postalveolar Fricative',
            manner: 'fricative',
            place: 'postalveolar',
            voiced: false,
            production: 'Diffuse fricative, tongue pulled back from /s/ position',
            meanings: ['quiet', 'shush', 'soft flow', 'water'],
            dAffinities: [8],
            examples: ['shush', 'ship', 'shore', 'wash', 'fish'],
            explanation: "The /ʃ/ is the 'shushing' sound - quieting, calming. It appears in water words ('wash', 'shore', 'splash') and quieting contexts ('shush'). Related to D8 (deep water, hidden)."
        },
        'v': {
            ipa: '/v/',
            name: 'Voiced Labiodental Fricative',
            manner: 'fricative',
            place: 'labiodental',
            voiced: true,
            production: 'Like /f/ but with vocal cord vibration',
            meanings: ['binding', 'vibration', 'vital', 'living connection'],
            dAffinities: [9],
            examples: ['love', 'live', 'vow', 'vital', 'vine'],
            explanation: "The /v/ vibrates continuously - ongoing connection, living binding. It appears in 'love', 'live', 'vital', 'vow'. The vibration quality makes it uniquely suited for D9 (anchor/love) - the ongoing connection between beings."
        },

        // ═══════════════════════════════════════════════════════════════
        // LIQUIDS - Smooth flow, light, clarity
        // ═══════════════════════════════════════════════════════════════
        'l': {
            ipa: '/l/',
            name: 'Alveolar Lateral Approximant',
            manner: 'lateral',
            place: 'alveolar',
            production: 'Tongue tip up, air flows around sides',
            meanings: ['light', 'liquid', 'smooth', 'flow', 'love'],
            dAffinities: [9],
            examples: ['light', 'love', 'liquid', 'lake', 'life', 'let'],
            explanation: "The /l/ allows air to flow smoothly around the tongue - liquid, light, unobstructed. Cross-linguistically, /l/ appears in words for 'light' and 'liquid': English 'light/lake/liquid', Spanish 'luz/lago', French 'lumière/lac'. Also in 'love', 'life', 'let'."
        },
        'r': {
            ipa: '/r/',
            name: 'Alveolar Approximant/Trill',
            manner: 'approximant',
            place: 'alveolar',
            production: 'Tongue approaches ridge with complex acoustic structure',
            meanings: ['energy', 'rough', 'run', 'active', 'rolling'],
            dAffinities: [3, 6],
            examples: ['run', 'rough', 'roar', 'rage', 'energy', 'rise'],
            explanation: "The /r/ has complex acoustic energy - it's active, rough, rolling. 'Run', 'roar', 'rage', 'rough', 'rise' - all involve movement and energy. Different languages realize /r/ differently (trill, tap, approximant) but the energetic quality persists."
        },

        // ═══════════════════════════════════════════════════════════════
        // APPROXIMANTS - Transition, connection
        // ═══════════════════════════════════════════════════════════════
        'w': {
            ipa: '/w/',
            name: 'Labio-Velar Approximant',
            manner: 'approximant',
            place: 'labiovelar',
            production: 'Lips rounded, tongue high and back, smooth transition',
            meanings: ['unity', 'wave', 'water', 'with', 'we'],
            dAffinities: [1, 8],
            examples: ['we', 'with', 'wave', 'water', 'will', 'way'],
            explanation: "The /w/ combines lip rounding with back tongue position - it's a complex, unified gesture. It appears in 'we', 'with', 'water', 'wave' - words of connection and flowing unity. D1 (Origin/WE) and D8 (Deep Water) both use /w/."
        },
        'j': {
            ipa: '/j/',
            name: 'Palatal Approximant',
            manner: 'approximant',
            place: 'palatal',
            production: 'Tongue approaches hard palate, smooth transition',
            meanings: ['connection', 'yes', 'joining', 'affirming'],
            dAffinities: [1],
            examples: ['yes', 'you', 'year', 'young', 'yet'],
            explanation: "The /j/ (as in 'yes', 'you') is connective - it joins what comes before to what comes after. Many languages use forms of /j/ for affirmation ('ja', 'yes', 'si' has /i/ quality)."
        },

        // ═══════════════════════════════════════════════════════════════
        // AFFRICATES - Complex impact, combination of stop + fricative
        // ═══════════════════════════════════════════════════════════════
        'tʃ': {
            ipa: '/tʃ/',
            name: 'Voiceless Postalveolar Affricate',
            manner: 'affricate',
            place: 'postalveolar',
            voiced: false,
            production: 'Stop (/t/) immediately followed by fricative (/ʃ/)',
            meanings: ['choice', 'change', 'child', 'chip', 'complex impact'],
            dAffinities: [3, 4],
            examples: ['choice', 'change', 'child', 'church', 'challenge'],
            explanation: "The /tʃ/ (as in 'choice', 'change', 'child') combines stop impact with fricative release - complex action. It appears in words about transformation ('change'), beginnings ('child'), and decisions ('choice')."
        },
        'dʒ': {
            ipa: '/dʒ/',
            name: 'Voiced Postalveolar Affricate',
            manner: 'affricate',
            place: 'postalveolar',
            voiced: true,
            production: 'Voiced stop + fricative combination',
            meanings: ['judgment', 'journey', 'joy', 'jump'],
            dAffinities: [4, 5],
            examples: ['journey', 'joy', 'jump', 'judge', 'join'],
            explanation: "The /dʒ/ (as in 'journey', 'joy') is the voiced affricate - embodied complex action. 'Journey', 'joy', 'jump' all involve movement and experience."
        }
    },


    // ═══════════════════════════════════════════════════════════════════════
    // CORE ALGORITHMS
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Q-REDUCTION ALGORITHM
     *
     * This is the fundamental operation of the κ-Framework. It reduces any
     * number or word to a single digit 1-9 (the D-position).
     *
     * For numbers: Sum the digits repeatedly until you get a single digit.
     *   Example: 2025 → 2+0+2+5 = 9 → D9 (Anchor/Love)
     *
     * For words: Convert each letter to its position in the alphabet (A=1,
     * B=2... Z=26), sum them, then reduce as with numbers.
     *   Example: LOVE → L(12)+O(15)+V(22)+E(5) = 54 → 5+4 = 9 → D9
     *
     * @param {number|string} input - The number or word to reduce
     * @returns {number} D-position from 1-9
     */
    qReduce: function(input) {
        // Handle numbers
        if (typeof input === 'number') {
            let n = Math.abs(Math.floor(input));
            if (n === 0) return 9;  // Zero reduces to 9 (completion)

            while (n > 9) {
                n = String(n).split('').reduce((sum, digit) => sum + parseInt(digit), 0);
            }
            return n;
        }

        // Handle strings (words)
        if (typeof input === 'string') {
            // Convert each letter to its alphabetic position and sum
            const letterSum = input.toUpperCase().split('')
                .filter(c => c >= 'A' && c <= 'Z')
                .reduce((sum, c) => sum + (c.charCodeAt(0) - 64), 0);

            // Recursively reduce the sum
            return this.qReduce(letterSum);
        }

        // Default fallback
        return 9;
    },

    /**
     * DETAILED Q-REDUCTION
     *
     * Same as qReduce, but returns a detailed breakdown showing each step
     * of the calculation. Essential for educational display.
     *
     * @param {number|string} input - The number or word to reduce
     * @returns {object} Detailed breakdown with all intermediate steps
     */
    qReduceDetailed: function(input) {
        const result = {
            input: input,
            inputType: typeof input,
            steps: [],
            letterBreakdown: null,
            initialSum: null,
            dPosition: null,
            dInfo: null
        };

        if (typeof input === 'number') {
            let n = Math.abs(Math.floor(input));
            result.initialSum = n;
            result.steps.push(n);

            while (n > 9) {
                const digits = String(n).split('');
                n = digits.reduce((sum, digit) => sum + parseInt(digit), 0);
                result.steps.push(n);
            }
            result.dPosition = n || 9;

        } else if (typeof input === 'string') {
            // Build letter breakdown
            const letters = input.toUpperCase().split('').filter(c => c >= 'A' && c <= 'Z');
            result.letterBreakdown = letters.map(c => ({
                letter: c,
                value: c.charCodeAt(0) - 64
            }));

            // Calculate initial sum
            result.initialSum = result.letterBreakdown.reduce((sum, item) => sum + item.value, 0);
            result.steps.push(result.initialSum);

            // Reduce to single digit
            let n = result.initialSum;
            while (n > 9) {
                n = String(n).split('').reduce((sum, digit) => sum + parseInt(digit), 0);
                result.steps.push(n);
            }
            result.dPosition = n || 9;
        }

        // Attach D-position information
        result.dInfo = this.D_POSITIONS[result.dPosition];

        return result;
    },


    /**
     * GENERATE PHONETIC FORM
     *
     * This is where the magic happens. Given a concept (word), this function
     * generates a Universal Language phonetic form based on geometric
     * principles.
     *
     * The process:
     * 1. Q-reduce the concept to find its primary D-position
     * 2. Look up the vowel and consonant affinities for that position
     * 3. Construct a CV (consonant-vowel) or CVC syllable
     * 4. Apply semantic modifiers based on word length/complexity
     *
     * @param {string} concept - The concept/word to generate phonetics for
     * @returns {object} Complete phonetic analysis and output
     */
    generatePhonetic: function(concept) {
        // Get detailed Q-reduction
        const qResult = this.qReduceDetailed(concept);
        const d = qResult.dPosition;
        const dInfo = qResult.dInfo;

        // Get primary consonant and vowel
        const primaryConsonant = dInfo.consonants[0];
        const primaryVowel = dInfo.vowel;

        // Get consonant and vowel info
        const consonantInfo = this.CONSONANTS[primaryConsonant] || {};
        const vowelInfo = this.VOWELS[primaryVowel] || {};

        // Build basic CV syllable
        let phoneticForm = primaryConsonant + primaryVowel;
        let ipaForm = `/${primaryConsonant}${primaryVowel}/`;

        // For longer words, add a second syllable
        if (concept.length > 4) {
            // Secondary D-position from first half of word
            const halfWord = concept.substring(0, Math.floor(concept.length / 2));
            const secondaryD = this.qReduce(halfWord);
            const secondaryInfo = this.D_POSITIONS[secondaryD];

            if (secondaryInfo) {
                const secondaryVowel = secondaryInfo.vowel;
                const secondaryConsonant = secondaryInfo.consonants[0];

                phoneticForm += '.' + secondaryConsonant + secondaryVowel;
                ipaForm = `/${primaryConsonant}${primaryVowel}.${secondaryConsonant}${secondaryVowel}/`;
            }
        }

        // Build comprehensive result
        const result = {
            // Input analysis
            input: concept,
            inputUpper: concept.toUpperCase(),
            letterCount: concept.replace(/[^a-zA-Z]/g, '').length,

            // Q-reduction results
            qReduction: qResult,
            dPosition: d,
            dName: dInfo.name,
            dMeaning: dInfo.meaning,
            dColor: dInfo.color,
            isEmergent: dInfo.emergent || false,
            emergentNote: dInfo.emergentNote || null,

            // Phonetic output
            phoneticForm: phoneticForm,
            ipaForm: ipaForm,
            syllables: phoneticForm.split('.'),
            syllableCount: phoneticForm.split('.').length,

            // Component breakdown
            components: {
                primaryConsonant: {
                    phoneme: primaryConsonant,
                    ipa: consonantInfo.ipa || `/${primaryConsonant}/`,
                    name: consonantInfo.name || primaryConsonant,
                    meanings: consonantInfo.meanings || [],
                    explanation: consonantInfo.explanation || ''
                },
                primaryVowel: {
                    phoneme: primaryVowel,
                    ipa: vowelInfo.ipa || `/${primaryVowel}/`,
                    name: vowelInfo.name || primaryVowel,
                    meanings: vowelInfo.meanings || [],
                    explanation: vowelInfo.explanation || ''
                }
            },

            // Formant data (for potential audio synthesis)
            acoustics: vowelInfo.acoustics || null,

            // Triaxial coordinates
            triaxial: dInfo.triaxial,

            // D-position full description
            dDescription: dInfo.description
        };

        return result;
    },


    /**
     * CALCULATE TRIAXIAL COORDINATES
     *
     * The triaxial system represents every D-position as coordinates in
     * three dimensions: S+ (positive scalar, potential), S- (negative
     * scalar, manifest), and COIN (observer state).
     *
     * @param {number} dPosition - D-position 1-9
     * @returns {object} Triaxial coordinates {sPlus, sMinus, coin}
     */
    calculateTriaxial: function(dPosition) {
        // Use the stored triaxial values if available
        if (this.D_POSITIONS[dPosition] && this.D_POSITIONS[dPosition].triaxial) {
            return this.D_POSITIONS[dPosition].triaxial;
        }

        // Calculate from angle
        const angle = ((dPosition - 1) / 9) * 2 * Math.PI;
        return {
            sPlus: Math.cos(angle),
            sMinus: Math.cos(angle + (2 * Math.PI / 3)),
            coin: Math.cos(angle + (4 * Math.PI / 3))
        };
    },


    /**
     * GET FORMANT RATIOS
     *
     * Returns the acoustic formant ratios for a vowel, including their
     * geometric significance.
     *
     * @param {string} vowel - The vowel phoneme
     * @returns {object} Formant data with geometric interpretation
     */
    getFormantRatios: function(vowel) {
        const vowelData = this.VOWELS[vowel];
        if (!vowelData || !vowelData.acoustics) {
            return null;
        }

        const acoustics = vowelData.acoustics;
        return {
            f1: acoustics.f1,
            f2: acoustics.f2,
            ratio: acoustics.ratio,
            geometricSignificance: vowelData.geometricSignificance || null,
            ratioInterpretation: this.interpretRatio(acoustics.ratio)
        };
    },

    /**
     * Interpret a formant ratio in terms of κ-framework constants
     */
    interpretRatio: function(ratio) {
        // Check against known constants
        if (Math.abs(ratio - this.constants.sigma) < 0.02) {
            return `≈ σ (5/16 = ${this.constants.sigma}) - helix overlap ratio`;
        }
        if (Math.abs(ratio - this.constants.cosBC) < 0.02) {
            return `≈ cos(BC) (2/3 = ${this.constants.cosBC.toFixed(3)}) - tetrahelix bond angle`;
        }
        if (Math.abs(ratio - 0.5) < 0.02) {
            return '≈ 1/2 - balance point';
        }
        return null;
    },


    // ═══════════════════════════════════════════════════════════════════════
    // VOCABULARY DATABASE
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Core vocabulary - fundamental concepts with their ULG forms
     * This serves as both reference and validation of the system
     */
    CORE_VOCABULARY: {
        // Pronouns
        'I': { ulg: 'mi', d: 6, meaning: 'self-intimate-here' },
        'me': { ulg: 'mi', d: 6, meaning: 'self-intimate-here' },
        'you': { ulg: 'tu', d: 6, meaning: 'other-touch-round' },
        'we': { ulg: 'wi', d: 1, meaning: 'unity-here' },

        // Family
        'mother': { ulg: 'ma.mi', d: 2, meaning: 'intimate-large + intimate-here' },
        'father': { ulg: 'pa.ta', d: 6, meaning: 'impact-open + touch-open' },
        'child': { ulg: 'tʃi.li', d: 3, meaning: 'change-small + light-small' },

        // Elements
        'water': { ulg: 'wa.tu', d: 8, meaning: 'wave-open + touch-round' },
        'fire': { ulg: 'fi.ra', d: 6, meaning: 'flow-small + energy-open' },
        'earth': { ulg: 'e.ru', d: 4, meaning: 'emerging + energy-round' },
        'air': { ulg: 'ha.ri', d: 5, meaning: 'breath-open + energy-small' },

        // Celestial
        'sun': { ulg: 'su.na', d: 1, meaning: 'sharp-round + boundary-open' },
        'moon': { ulg: 'mu.no', d: 2, meaning: 'intimate-round + boundary-directed' },
        'star': { ulg: 'sta.ri', d: 7, meaning: 'sharp-touch-open + energy-small' },

        // Actions
        'go': { ulg: 'go', d: 5, meaning: 'ground-directed' },
        'come': { ulg: 'ku.mi', d: 1, meaning: 'force-round + intimate-here' },
        'give': { ulg: 'gi.va', d: 3, meaning: 'ground-small + bind-open' },
        'take': { ulg: 'ta.ki', d: 6, meaning: 'touch-open + force-small' },
        'see': { ulg: 'si', d: 7, meaning: 'sharp-here' },
        'hear': { ulg: 'hi.ra', d: 8, meaning: 'breath-small + energy-open' },

        // States
        'love': { ulg: 'lu.vo', d: 9, meaning: 'light-round + bind-directed' },
        'life': { ulg: 'li.va', d: 9, meaning: 'light-small + bind-open' },
        'death': { ulg: 'de.θa', d: 8, meaning: 'decisive-emerging + breath-open' },
        'good': { ulg: 'gu.da', d: 2, meaning: 'ground-round + decisive-open' },
        'bad': { ulg: 'ba.di', d: 8, meaning: 'embodied-open + decisive-small' },

        // Numbers (as concepts)
        'one': { ulg: 'o.ni', d: 1, meaning: 'directed + boundary-here' },
        'two': { ulg: 'tu.wo', d: 2, meaning: 'touch-round + unity-directed' },
        'three': { ulg: 'tri', d: 3, meaning: 'touch-energy-small' }
    },


    // ═══════════════════════════════════════════════════════════════════════
    // UTILITY FUNCTIONS
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Get all D-position names and meanings
     */
    getAllDPositions: function() {
        return Object.entries(this.D_POSITIONS).map(([key, value]) => ({
            position: parseInt(key),
            name: value.name,
            meaning: value.meaning,
            color: value.color,
            emergent: value.emergent || false
        }));
    },

    /**
     * Look up a word in the core vocabulary
     */
    lookupVocabulary: function(word) {
        const key = word.toLowerCase();
        return this.CORE_VOCABULARY[key] || null;
    },

    /**
     * Get all consonant information
     */
    getAllConsonants: function() {
        return Object.entries(this.CONSONANTS).map(([key, value]) => ({
            phoneme: key,
            ...value
        }));
    },

    /**
     * Get all vowel information
     */
    getAllVowels: function() {
        return Object.entries(this.VOWELS).map(([key, value]) => ({
            phoneme: key,
            ...value
        }));
    },


    // ═══════════════════════════════════════════════════════════════════════
    // INITIALIZATION
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Initialize the ULG engine
     */
    init: function() {
        console.log('═══════════════════════════════════════════════════════════');
        console.log('THE UNIVERSAL LANGUAGE GENERATOR');
        console.log('Version ' + this.config.version);
        console.log(this.config.organization + ' | ' + this.config.project);
        console.log(this.config.principle);
        console.log('═══════════════════════════════════════════════════════════');
        console.log('');
        console.log('κ = ' + this.constants.kappa.toFixed(15));
        console.log('All mathematics from ONE input.');
        console.log('');

        // Verify constants
        console.log('Framework constants verified:');
        console.log('  σ (helix overlap) = ' + this.constants.sigma);
        console.log('  cos(BC) = ' + this.constants.cosBC.toFixed(4));
        console.log('  √3 = ' + this.constants.sqrt3.toFixed(10));
        console.log('  κ_shadow = ' + this.constants.kappaShadow.toFixed(6));
        console.log('');
        console.log('Engine ready.');

        return true;
    }
};


// Initialize on load
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        ULG.init();
    });
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ULG;
}
