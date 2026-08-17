# Rules corpora — Historica Arcanum on two D&D editions (compiled)

Two merged rules corpora for the character sheets, each compiled with
[titterpig-synthesist](../../Titterpig%20Utilities/titterpig-synthesist) from a D&D
SRD base plus the **Historica Arcanum: City of Crescent** extension. The site can
bind a player page to either edition.

| Edition | Base | Merged / resolved files | Entities |
|---|---|---|---|
| **5e** (2014) | SRD 5.1 | `dnd5e-historica-arcanum.{merged.ttrpg,resolved.json}` | 1383 |
| **5.5e** (2024) | SRD 5.2.1 | `dnd5.5e-historica-arcanum.{merged.ttrpg,resolved.json}` | 1626 |

The `.resolved.json` (fully flattened, system-agnostic entity list) is what the
sheet build reads; the `.merged.ttrpg` (structure-preserving, EXTENDS chains kept)
is for nested-feature extraction. The two `*-0.4-historica-arcanum.json` files are
the composition manifests (load order).

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
The canonical copies live in `Titterpig Utilities/titterpig-corpora/<edition>/0.4/`;
these are synced copies. **Rebuild the synthesist binary first** — a stale binary
silently drops content. To rebuild both:

```sh
export PATH="$HOME/.local/go/bin:$PATH"
cd "$HOME/Working/Titterpig Utilities/titterpig-synthesist"
go build -o synthesist ./cmd/synthesist
./synthesist --merge manifests/dnd5e-0.4-historica-arcanum.json   --name dnd5e-historica-arcanum   --no-timestamp
./synthesist --merge manifests/dnd5.5e-0.4-historica-arcanum.json --name dnd5.5e-historica-arcanum --no-timestamp
# then copy both pairs (+ the manifests) into a-gibbous-moon/corpus/
```

SRD content © Wizards of the Coast, CC-BY-4.0 (attribution preserved in each merged
`.ttrpg` header); Historica Arcanum content per its own licence.
