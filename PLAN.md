# A Gibbous Moon Over Constantinople — Content Plan

Four phases, run in order. Each phase ends reviewed, committed, and pushed.
The framework (theme, sections, play-sheet engine) is already in place.

**Working principle:** page HTML is *generated* from source-of-truth markdown, so
Phase 2 corrections, Phase 3 integrations, and the Phase 4 voice rewrite each edit
the sources and rebuild — never hand-patching HTML twice.

---

## Phase 1 — Integrate the Archivist baseline

Source: `~/Working/A Gibbous Moon Over Constantinople-obsidian-export/…/`
(16 recaps incl. World Summary · 15 timelines · 10 moments · 4 PCs · 79 NPCs ·
64 locations · 46 items · 15 factions), plus the Alchemy sheet backups and local
portrait art in `~/Working/28. A Gibbous Moon Over Constantinople/`.

| # | Part | Detail |
|---|------|--------|
| 1.1 | **Vault into repo** | Copy the export to `source/archivist/` (immutable baseline; later phases layer edits) |
| 1.2 | **Build script** | `scripts/build_site.py` — vault → pages. Wikilink → `.ref` resolution (unresolved → dotted `ref-open`), YAML/frontmatter strip, image mapping |
| 1.3 | **Section mapping** | Recap + Timeline + Moments → one page per night in `nights/` (n01–n15, Summary / Timeline / Moments); World Summary → `mysteries/`; PCs → `cabal/`; NPCs → `faces/`; Locations → `city/`; Items → `treasury/`; Factions → `powers/` |
| 1.4 | **Portrait pipeline** | Map `assets.myarchivist.ai/<uuid>` → local `gibbous/<uuid>.webp`, plus `gibbous2/` + `PCs/` named art, committed under each section's `img/` |
| 1.5 | **Play sheets** | Alchemy JSONs (`Alchemy Backup/2025-09-21` + `2025-11-05` customizations) → `window.SHEET` for each PC; wire play buttons; delete the sample sheet |
| 1.6 | **Indexes & counts** | Populate all section indexes, grouped where useful; landing-card counts |
| 1.7 | **Completeness gate** | Every vault file mapped to a page or explicitly deferred with a reason — no silent drops. Link/image integrity sweep |
| 1.8 | Commit & push | |

**Decisions (from the owner):**
- **The Cabal = Gizem Faruki, Sidra al-Najjar, Jean-Zera Mongé, Miray** (each with a
  sheet), plus **Rufus Dimitrious as a departed early PC** (player left). **Ahmet
  Yusuf is Miray's alias** — one character; her sheet is `ahmet-yusuf.json`. Miray's
  vault file currently sits in `Characters/NPCs/` → move to The Cabal.
- **Portraits: commit web-optimized WebP** into the repo (via PIL); **never hot-link
  myarchivist**. Source art: `gibbous/<uuid>.webp` (keyed to each file's image URL
  UUID), with `gibbous2/` + `PCs/` named art as fallback/override.
- **Support dir: `~/Working/a-gibbous-moon-support/`** (separate from the site repo)
  holds the vault copy, art originals, Alchemy JSONs, and `build_site.py`. The site
  repo commits only generated pages + optimized images + engine + docs.

Remaining wrinkles: the two extra recaps ("Under the Basilica Cistern", "World
Summary"); duplicate/ambiguous NPC files (`Frank`, `Frank (2)`, `Frank Calvert`);
heavy short-form wikilinks (`[[Osman]]`, `[[Gizem]]`) needing a curated alias map,
unresolved links falling back to dotted `ref-open`; Alchemy sheets are Sep–Nov 2025
snapshots (stale — flag until the Phase 3 refresh).

## Phase 2 — Correct the fallible record

The Archivist digests contain transcription drift (e.g. "Osman Hamdi **Bay**",
"the **schleiermans**", "**Cementary**") and likely factual errors. Working
session-by-session against the original transcripts:

| # | Part | Detail |
|---|------|--------|
| 2.1 | **Assemble transcripts** | Gather originals per session (location TBD — see open questions) |
| 2.2 | **Canon register** | `source/canon.md`: canonical spellings for every name/place/term (Bey not Bay, Schliemann, etc.) — applied mechanically at build |
| 2.3 | **Discrepancy reports** | For each night: I compare digest vs transcript and produce a numbered findings list (misspelling / wrong fact / conflation / omission / invention), each with evidence and a proposed fix |
| 2.4 | **Adjudication** | You approve/amend/reject per finding (batched, a few sessions at a time) |
| 2.5 | **Apply & log** | Approved edits land in `source/` overlays; `ERRATA.md` records what changed and why; rebuild |

## Phase 3 — Integrate the other sources

| # | Part | Detail |
|---|------|--------|
| 3.1 | **Campaign DSL** | `titterpig-dsl-dnd5e-3rdparty/…/campaign/` (acts 1–4 .arc/.lore, side-quests, campaign NPCs/places/timeline, Visions of Berguzar) → The Veil act pages + cross-checks of public pages; adversary statblocks where relevant |
| 3.2 | **GM notes** | From `28. A Gibbous Moon…/`: Session_GM_Notes_Detailed (×2), Constantinople_Session_Breakdown, 2026-02-22 + 2026-03-01 session notes, Act_Three/Act_Four walkthroughs (.md + .html), plot_threads + outstanding_plot_threads, scene_seeds, six side_quests_*.md, three dm_screen_*.html → The Veil (acts · threads · side quests · screens), merged with source dividers like caul's veil pages |
| 3.3 | **Maps & media** | `Maps/` (14 PNGs) → The City pages and/or Veil; soundtrack links if wanted |
| 3.4 | **Sheet refresh** | Bring play sheets to current level/inventory (from you or newer Alchemy exports) |
| 3.5 | **Other GM-note locations** | You mentioned "several locations" — enumerate and fold in |

## Phase 4 — The voice

Rewrite all public prose in the voice of a worldly mid-19th-century Ottoman,
writing in British English (think an urbane Istanbulite man of letters, c. 1873 —
measured, ironic, cosmopolitan; Ottoman terms in italics with a light gloss).

| # | Part | Detail |
|---|------|--------|
| 4.1 | **Style charter** | A short voice spec + one pilot rewrite (one night + one face + one place) for your approval before anything else is touched |
| 4.2 | **Batch rewrite** | Section by section, sources rewritten and rebuilt; you review per batch |
| 4.3 | **Consistency pass** | British orthography, terminology register, date conventions, italics/gloss policy |
| 4.4 | **Scope check** | The Veil (GM prep) likely stays functional English — confirm |

---

*Phase 4 runs last deliberately: prose is rewritten exactly once, after the record
is corrected (2) and complete (3).*
