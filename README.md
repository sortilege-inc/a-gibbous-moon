# A Gibbous Moon Over Constantinople

A static campaign wiki + **playable D&D 5e character sheets** for the *Historica
Arcanum: The City of Crescent* game **A Gibbous Moon Over Constantinople**. Warm
Ottoman / Iznik illuminated aesthetic (parchment, teal rosettes, terracotta vines,
slate-blue display serifs) informed by the plates of *The City of Crescent*. No
build step — plain HTML + one stylesheet, exactly like the sibling `caul` site.

Rules are **SRD 5.1** (`Titterpig DSL/titterpig-dsl-dnd5e`) as extended by
**Historica Arcanum: The City of Crescent**
(`titterpig-dsl-dnd5e-3rdparty/historica-arcanum/city-of-crescent`) — magic
origins, professions, subclasses, spells, the spell-rebound table, feats, and
monsters. The play sheets only *track and roll*; they don't enforce build legality.

## Structure

Section labels are evocative English, and the directory slug matches each label.

| Path | Label | What |
|------|-------|------|
| `index.html` | — | Landing page — dark gold-framed hero, section cards |
| `crescent.css` | — | The theme (all pages share it) |
| `nights/` | **Nights** | Night-by-night play log + index |
| `cabal/` | **The Cabal** | Player-character **bio** pages + index. Each links to a play sheet. |
| `faces/` | **Faces** | NPCs / adversaries (prose + optional 5e statblock) + index |
| `powers/` | **Powers** | Orders, guilds & courts above and below + index |
| `city/` | **The City** | Constantinople + the Undercity gazetteer + index |
| `treasury/` | **The Treasury** | Wondrous items & artefacts + index |
| `mysteries/` | **Mysteries** | Cosmology, origins of magic, timeline + index |
| `veil/` | **The Veil** | GM-only prep & secret canon (the Keeper's pages) + index |
| `play/` | — | The playable 5e sheet engine (see below) |

To rename a section, edit `SECTIONS` in the scratchpad generator (`gen_site.py`)
and re-run it; if you change a slug, `git mv` the directory to match.

Every folder has a `_template.html` — **duplicate it** to author a new entry, then
add a link from that section's `index.html`. Section indexes currently show an
empty grid with a commented example row; drop real entries in as content lands.

### Cross-references

Inline wiki links use `<a class="ref" href="...">Name</a>`; a rumor with no page
yet uses `<span class="ref-open" title="not yet chronicled">Name</span>` (renders
as a dotted span). Same convention as `caul`.

## The play sheets (`play/`)

| File | Role |
|------|------|
| `sheet.js` | Renders `window.SHEET` into `#sheet`, wires clickable rolls, persists play-state |
| `sheet.css` | Sheet layout |
| `dice.js` | Game-agnostic animated roller (shared with `caul`; `d20` pentagon added) |
| `dice.css` | Dice theming (d20 teal, nat-20 gilt, nat-1 rust, damage tiles) |
| `_template.html` | A worked **sample** sheet exercising every feature — duplicate per PC |

**Authoring a PC sheet:** copy `play/_template.html` → `play/<slug>.html`, replace
the inline `window.SHEET` object, and point the PC's bio page at it with
`<a class="play-btn" href="../play/<slug>.html">`.

**At the table:** tap any ability modifier, save, skill, attack, or spell-attack to
roll it in the fixed tray; set **Adv/Dis** first. Click spell-slot and feature-use
pips to spend/restore them; the HP `−/+` take damage/heal (**Shift** = 5, temp HP
absorbs first). **Long Rest** restores HP, slots, uses and half the hit dice;
**Reset** clears saved state. Play-state persists per-browser in `localStorage`
under `agm:play:<id>` — so it survives reloads but is local to each device.

### `window.SHEET` schema

```js
window.SHEET = {
  id: "slug",                 // REQUIRED, unique — keys localStorage play-state
  name: "Full Name",
  player: "Player",           // optional
  portrait: "url-or-path",    // optional; blank/broken hides the frame
  level: 5,                   // total character level
  classes: [{ name, subclass, level }],   // one entry per class (multiclass ok)
  race, background, alignment,             // strings
  origin, profession,         // City of Crescent — string or {name, text}
  abilities: { str, dex, con, int, wis, cha },   // ability SCORES (e.g. 16)
  saveProf: ["con", "cha"],   // proficient saving throws
  proficiencyBonus: 3,        // optional — else derived from level
  skills: { stealth: 1, arcana: 2, ... },  // 1 = proficient, 2 = expertise
  ac, speed,                  // numbers
  initiative,                 // optional — else DEX mod
  senses: "Darkvision 60 ft · Passive Perception 13",
  hp: { max, current, temp },
  hitDice: [{ size: "d8", total, used }],
  attacks: [{ name, ability, proficient, bonus, damage, damageType, range, notes }],
      // damage may contain "MOD" → replaced by the attack ability's modifier
      //   e.g. "1d8 MOD" → "1d8 +3".  bonus = extra flat to-hit (magic weapon, etc.)
  spellcasting: {
    ability: "cha",
    saveDC, attackBonus,      // optional — else derived (8/prof + mod)
    slots: { 1: { total }, 2: { total }, ... },
    spells: [{ name, level, prepared, notes }],   // level 0 = cantrip
    rebound: "City of Crescent spell-rebound note"
  },
  features: [{ name, source, uses: { max, per, used }, text }],   // uses optional
  feats: [{ name, text }],
  proficiencies: { armor, weapons, tools, languages },   // strings
  equipment: [{ name, qty, notes }],
  currency: { pp, gp, ep, sp, cp },
  conditions: [],
  notes: "free text"
};
```

Only `id` and `name` are strictly required; every section is skipped if its field
is absent, so partial sheets render cleanly.

## Where the content comes from

The raw campaign materials live in
`../28. A Gibbous Moon Over Constantinople/` (session notes, act walkthroughs, PC &
NPC art, maps, side-quests) and the rules in the two DSL repos named above. The
owner will direct which sources feed which pages during assembly.

> **Skeleton.** Framework only — theme, navigation, section indexes, per-section
> templates, and the working 5e play-sheet engine (with one sample character).
> Real content is added next.
