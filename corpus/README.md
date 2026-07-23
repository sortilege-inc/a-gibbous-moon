# Rules corpus — dnd5e + Historica Arcanum (compiled)

Single merged rules corpus for the character sheets, compiled with
[titterpig-synthesist](../../Titterpig%20Utilities/titterpig-synthesist) from the
SRD 5.1 base plus the Historica Arcanum: City of Crescent extension.

## Files
- **`dnd5e-historica-arcanum.merged.ttrpg`** — structure-preserving merged DSL
  (EXTENDS chains kept, errata folded in).
- **`dnd5e-historica-arcanum.resolved.json`** — fully flattened, system-agnostic
  entity list (1383 entities). This is the one the sheet build reads.
- **`dnd5e-0.4-historica-arcanum.json`** — the composition manifest (load order).

## Composition (load order = precedence, later wins)
1. dnd5e SRD 5.1 base: `core-base` → conditions, races, backgrounds, classes,
   feats, equipment, magic-items, spells, monsters.
2. Historica Arcanum: City of Crescent (per its `sources.json`): `core` first,
   then magic-origins, spells, magic-items, equipment, spell-rebound, subclasses,
   feats, professions, monsters, djinn-rules.

Scoped **out** (per the sourcebook manifest): the `campaign/` instance files
(NPCs/places/timeline) and all `.lore` narrative files.

## Regenerate
The canonical copy lives in `Titterpig Utilities/titterpig-corpora/dnd5e/0.4/`;
this is a synced copy. To rebuild both:

```sh
cd "Titterpig Utilities/titterpig-synthesist"
./synthesist --merge manifests/dnd5e-0.4-historica-arcanum.json \
  --out-ttrpg ../titterpig-corpora/dnd5e/0.4/dnd5e-historica-arcanum.merged.ttrpg \
  --out-json  ../titterpig-corpora/dnd5e/0.4/dnd5e-historica-arcanum.resolved.json
# then copy both (+ the manifest) into a-gibbous-moon/corpus/
```

> A 2024 (D&D 5.5e) + Historica Arcanum corpus is planned as a second edition
> here once the 5.5e base is unblocked.

SRD 5.1 content © Wizards of the Coast, CC-BY-4.0 (attribution preserved in the
merged `.ttrpg` header); Historica Arcanum content per its own licence.
