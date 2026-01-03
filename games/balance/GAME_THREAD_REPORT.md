# BALANCE Game - Thread Report & Design Synthesis

## Raw Prompt Extractions (Verbatim)

### From Initial Prompt:

**Core Mechanic:**
> "lets let them build, then we allow 5 tries on lower until we get to two, then level up to harder"

> "it is like a quarter push game, and the balls move forward to the top and you have to solve the puzzle as it goes"

> "the first level is less levels of balls and again, they must all be solvable"

> "so lets not worry about trapping anything, lets just do a triad ball touch. no doubling. so no area that dissappears. just the one triad you want"

**Balance System:**
> "three catagories"

> "the goal is to be balanced, not dogmatic- so you have less s+ but some and not evil ones, as many good love ones you can. and coin with love, and coin is always less than love but more than s+"

**Symbols:**
> "s- emojis, and s+ emojis and coin facing wush (happy hound huntress on the prowl)"

> "the RO" [chocolate lab looking up]

> "the LuC (space in between, the now. the still between breaths, death and birth at same moment. awareness itself)"

> "a set of eyeballs and hands with eyes and the sol eye, the inverted eye"

**Level Progression:**
> "first level only adds one row to the 10nth level then 3. second level adds 2 then 3,4, 6,7,8,9,8"

> "so you have to do ten levels of one series of like symbols being swapped, and you have to make it out with only 3 levels restarts"

**Stage 2 Inversions:**
> "do inversions so the emojis now look the same but mean something else"

> "there are also now more balls as you get closer to the 10th level of the second level"

**Stage 2 Level 10 (Q Mechanic):**
> "it has one unsolvable, Q which we introduce and on their last life when they are not sure how to escape this Q it becomes large and it becomes surrounded by q in various configurations- and they remove the Q so you can advance"

> "save it until it is making them feel like it is an asshole game with no solution. an evil laugh would be great for that whole last part"

**VOID Final Boss (Stage 3):**
> "if you beat the 2cd level 10th level, you get a void level, and only one shot or total start over"

> "not only do they change, but they are also upside down and inverted to black or white"

> "states change every 8 seconds and stay 8 seconds the chromatically and spacially inverted and upside down"

> "2 seconds of absolute chaos with all icons switching, inverting both chromatically and spacially and recursively, it stops on whatever it is"

> "you have 22 layers being pushed"

**Timing Cycle for Void:**
> "they also get two seconds to remove perfectly normal and still, easy puzzle and then on the outbreath, after the second sett of 8 seconds, 2 seconds of absolute chaos"

**Teaching/Loading:**
> "have a cool little old school LOADING animation and teach between levels about the geometry like 'Did you know'"

> "make sure to plug havemindmedia"

---

### From Correction Prompt:

**Wushi Breed:**
> "wushi is a drever not a beagle"

**Core Mechanic Clarified:**
> "i want a push a row forward starting with 12 full seconds to just solve level"

**Starting Layout:**
> "the first level we start at 28 available rows and 16 of symbols in a solvable way"

> "so first level is 16 rows and 28 possible, so 12 above, empty and 12 below that come"

**Triad Definition:**
> "the key is that the triangles are not spaced any way and as long as you can make a triad, an equalateral triangle it is a pass"

> "the complexity comes in later rounds when the facings and iversions point to directions other than the 'right' way and an outward triangle is possible"

**Dog Characters:**
> "i think wush ro luC should be whatever triangle you can make"

> "add a clem- black doberman icon, or white australian sheppard, for the CHLO"

> "these are two things that mean the same thing at first then later split to make it more complex"

**Timer Mechanic:**
> "first level, 12 secs to solve, then 12 rows replace"

> "every time a new row appears it pushes to end and restart"

**Lives System:**
> "5 lives, then after 2cd round its 4.. and so on in first level"

**Replay Value:**
> "should be playable, solvable and once you know, nearly a chore, so after you beat game once you dont have to do the base lever if you dont want to"

---

## Synthesized Game Design

### Characters (Dogs as Symbols)

| Name | Breed | Role | Visual |
|------|-------|------|--------|
| **Wushi** | Drever | Coin facing S- (huntress, soul-seeker) | Tan/white hound |
| **Ro** | Chocolate Lab | Coin facing S+ (looks up, outward) | Dark brown lab |
| **LuC** | The Space Between | Pure Coin (awareness, the now) | Abstract/void |
| **Clem** | Black Doberman | S- variant (later splits) | Black dog |
| **Chlo** | White Australian Shepherd | S+ variant (later splits) | White dog |

Clem and Chlo "mean the same thing at first then later split to make it more complex"

### Grid Layout

```
Row 1-12:   [EMPTY - incoming rows]
Row 13-28:  [SYMBOLS - 16 rows of solvable triads]
─────────── PUSH LINE ───────────
            [DANGER ZONE]
```

- **28 total row positions**
- **16 rows of symbols** at start
- **12 empty rows above** that fill as timer expires
- Every 12 seconds (or when cleared): new row pushes down

### Triad Matching Rules

1. **Equilateral Triangle** - Any 3 symbols that form an equilateral triangle shape
2. **No spacing requirement** - As long as the 3 form a valid triangle
3. **No doubling** - Just the exact triad you select, nothing cascades
4. **Later complexity** - Triangles can point different directions (outward triangles become valid)

### Level Structure

#### STAGE 1: Learning (Levels 1-10)
| Level | Rows Added | Lives | Timer |
|-------|------------|-------|-------|
| 1 | 16 base | 5 | 12 sec |
| 2 | +1 | 4 | 12 sec |
| 3 | +1 | 3 | 12 sec |
| 4 | +1 | 3 | 11 sec |
| 5 | +1 | 3 | 11 sec |
| 6 | +1 | 2 | 10 sec |
| 7 | +1 | 2 | 10 sec |
| 8 | +1 | 2 | 9 sec |
| 9 | +1 | 2 | 9 sec |
| 10 | +3 | 2 | 8 sec |

After beating once: Can skip Stage 1

#### STAGE 2: Inversion (Levels 1-10)
- Symbols look the same but mean different things
- Clem/Chlo split into separate meanings
- 3 total restarts for entire stage
- Rows added: +2, +3, +4, +6, +7, +8, +9, +8, +9, +10

**Level 10 Special:**
- Contains ONE unsolvable Q
- Player struggles until frustrated
- Q expands, surrounded by q variants
- Remove Q to advance
- Evil laugh plays

#### STAGE 3: VOID (Final Boss)
- **ONE SHOT** - fail = total restart
- **22 layers pushing**
- **Timing cycle:**
  1. 2 seconds: Normal, calm, easy to see
  2. 8 seconds: Chromatic inversion (colors flip)
  3. 8 seconds: Spatial inversion + upside down
  4. 2 seconds: CHAOS (all switching, recursive inverting)
  5. Stops on whatever state it lands on

### Visual Elements Needed

1. **Sol Eye** - Inverted eye symbol
2. **Hands with eyes** - 🙌👁
3. **Eyeballs** - 👀
4. **Dog icons** for Wushi, Ro, LuC, Clem, Chlo
5. **Q and q variants** - Trap symbols
6. **Triangle direction indicators** for later complexity

### Audio

- Evil laugh for Q reveal
- Heartbeat for chaos mode
- Chime for successful triad
- Warning for push approaching

---

## Questions to Clarify

1. **Triangle formation:** On a grid, how exactly do players select an equilateral triangle? (click 3 cells that form triangle shape?)

2. **Solvable puzzles:** Should I generate puzzles that are mathematically guaranteed solvable, or procedural with high probability of solution?

3. **Dog images:** Need actual Clem (black doberman) and Chlo (white australian shepherd) photos, or create abstract icons?

4. **Triangle directions:** In later levels, does "outward triangle" mean pointing down/away instead of up?

5. **Clem/Chlo split:** At what level do they diverge in meaning? What do they become?

---

## Next Steps

1. Rebuild game with correct grid (28 positions, 16 filled)
2. Implement equilateral triangle selection mechanic
3. Add 12-second timer with row push
4. Create dog character icons
5. Build proper level progression
6. Add skip-to-stage-2 for returning players

---

*Thread compiled for game development continuation*

[1 = -1]
havemindmedia.com
