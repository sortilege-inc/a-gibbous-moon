# Rules corpora — Historica Arcanum on two D&D editions (compiled)

Two merged rules corpora for the character sheets, each compiled with
[titterpig-synthesist](../../Titterpig%20Utilities/titterpig-synthesist) from a D&D
SRD base plus the **Historica Arcanum: City of Crescent** extension. The site can
bind a player page to either edition.

| Edition | Base | Merged / resolved files | Entities |
|---|---|---|---|
| **5e** (2014) | SRD 5.1 | `dnd5e-historica-arcanum.{merged.ttrpg,resolved.json}` | 1383 |
| **5.5e** (2024) | SRD 5.2.1 | `dnd5.5e-historica-arcanum.{merged.ttrpg,resolved.json}` | 1627 |

The `.resolved.json` (fully flattened, system-agnostic entity list) is what the
sheet build reads; the `.merged.ttrpg` (structure-preserving, EXTENDS chains kept)
is for nested-feature extraction.

### The 5.5e corpus is built from *converted* sources (campaign-specific)
The 5e corpus composes the raw SRD 5.1 + raw Historica (manifest
`dnd5e-0.4-historica-arcanum.json`). The **5.5e corpus** composes SRD 5.2.1 with
the Historica content that has been **run through the 5.1→5.2.1 conversion**
(`historica-arcanum-5.5e-src/`) plus the converted **College of Eloquence**
(`campaign-5.5e-src/`) — manifest `dnd5.5e-0.4-historica-arcanum-converted.json`.
So it carries owner design decisions (Miray's Nazar table, Sidra's Invocation of
the Eye, Eloquence) and is **not** a generic Historica corpus; it is not mirrored
into `Titterpig Utilities/titterpig-corpora` for that reason. See
`historica-arcanum-5.5e-src/CONVERSION-NOTES.md`.

## Composition (load order = precedence, later wins)
1. **SRD base** — `core-base` first (defines the abstract type DEFs Historica
   extends: `Spell`, `Monster`, `Subclass`, `Feat`, `Weapon`, `Armor`,
   `Magic Item`, `Stat Block Feature`, `Subclass Feature`, `Weapon Property`),
   then the remaining base extensions.
2. **Historica Arcanum: City of Crescent** — `core` first, then magic-origins,
   spells, magic-items, equipment, spell-rebound, subclasses, feats, professions,
   monsters, djinn-rules.

The same Historica files feed both editions; every Historica `EXTENDS` resolves
against the 5.5e base as well as the 5.1 base (`missing parents: 0` in both).

Scoped **out** (per the sourcebook manifest): the `campaign/` instance files
(NPCs/places/timeline) and all `.lore` narrative files.

## Known corpus finding (both editions, pre-existing, not tool-side)
Historica's `^"Spell Rebound"` DEF self-`EXTENDS` (one cycle,
`#tdE1YCwELPQChb3kxVDKCOAW`). Reported by the resolver, harmless to the flatten,
tracked upstream in the Historica corpus — not introduced here.

## Regenerate
**Rebuild the synthesist binary first** — a stale binary silently drops content.

```sh
export PATH="$HOME/.local/go/bin:$PATH"
cd "$HOME/Working/Titterpig Utilities/titterpig-synthesist"
go build -o synthesist ./cmd/synthesist
```

**5e (2014)** — generic, also mirrored to `titterpig-corpora`:

```sh
./synthesist --merge manifests/dnd5e-0.4-historica-arcanum.json --name dnd5e-historica-arcanum --no-timestamp
# then copy the pair (+ manifest) into a-gibbous-moon/corpus/
```

**5.5e (2024)** — converted, campaign-specific, repo-only. First (re)generate the
converted Historica if the source or the conversion script changed:

```sh
python3 "<repo>/../a-gibbous-moon-support/scripts/convert_historica_5_5e.py"
```

then compile straight into this dir (the repo manifest references the converted
sources + Eloquence and writes the files the site reads):

```sh
SYN="$HOME/Working/Titterpig Utilities/titterpig-synthesist"
C="<repo>/corpus"
"$SYN/synthesist" --merge "$C/dnd5.5e-0.4-historica-arcanum-converted.json" \
  --out-ttrpg "$C/dnd5.5e-historica-arcanum.merged.ttrpg" \
  --out-json  "$C/dnd5.5e-historica-arcanum.resolved.json"
```

SRD content © Wizards of the Coast, CC-BY-4.0 (attribution preserved in each merged
`.ttrpg` header); Historica Arcanum content per its own licence.
