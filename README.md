# InteractEval

Published results and illustrative conversations for the InteractEval study.

- Website: https://xgogu.github.io/InteractEval/
- Research: https://xgogu.github.io/InteractEval/research.html

## Measurement sources

All leaderboard and summary measurements are transcribed from the supplied paper,
`assets/Qwen_InteractEval.pdf`, preserving the reported precision:

| Measurements | Paper source |
| --- | --- |
| Base-model composite, L1-L6, stage means, L6/L5, purpose disposition | Table 4, page 19 |
| Purpose and realism facet scores | Table 6, page 20 |
| Terminal-outcome rates | Table 9, page 23 |
| MetaMind, Cognizer, Claude Code configurations | Table 16, page 28 |
| Architecture-wide mean gains | Table 17, page 28 |

The main study uses 27 cells, 30 dialogues per cell, and three independent passes:
2,430 episodes per base model (section 4.1, page 18). The standard user is
claude-5-opus. The judge is Claude Opus 5.

`data/paper-results.json` is the only source for published numerical comparisons.
Agent configurations are identified by both architecture and underlying model.
Differences calculated from rounded table values are labeled in the interface;
architecture-wide mean gains are copied directly from Table 17.

## Example library

The 100 conversations in `MarioEval_cases_en_(1)(1).zip` are illustrative examples.
`data/cases.json` indexes their roles and objectives. Complete source records remain
in `data/cases/`. Internal case and scene identifiers are not shown as page labels.
Examples do not determine leaderboard values, outcome rates, sample sizes, or
uncertainty estimates. No example-derived aggregate file is published.

`data/manifest.json` records source archive and paper checksums and explicitly marks
that examples are excluded from the leaderboard.

## Updating sources

Requires Python and PyMuPDF. Run:

```bash
python scripts/import_publication.py /path/to/Qwen_InteractEval.pdf /path/to/MarioEval_cases_en.zip
```

The importer extracts the specified tables from this paper layout, replaces the
previous data directory, and copies the paper used for the displayed values.
Review changes in the paper's table structure before importing another edition.

## Preview and publish

Run `python -m http.server 8788` from the repository root. GitHub Pages publishes
`main` from the repository root. No application backend is required.

## Attribution

Based on [Interactive Evo](https://github.com/Jewelina95/interactive-evo).
The original MIT license is retained. Provider asset sources are listed in
`assets/providers/sources.json`.
