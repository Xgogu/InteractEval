# Interactive Evo Analysis

Model comparisons and research notes on cognition and interaction.

- Website: https://xgogu.github.io/interactive-evo-analysis/
- Research: https://xgogu.github.io/interactive-evo-analysis/research.html

## Contents

The static site includes model comparisons, six capability dimensions, scenario filters,
case-level conversations, and a research journal. The casebook contains 76 recorded
conversations across 10 models. Capability and interest comparisons use 75 complete pairs;
one record has a missing interest-change value. Multimodal results are pending.

Homepage summaries use the full casebook. Filters in the Evaluations section apply to that
section. Model assignments are unbalanced; counts accompany the displayed summaries.

## Local preview

Run `python -m http.server 8787` in this directory, then open http://127.0.0.1:8787/.
No server-side application or build step is required.

## GitHub Pages

The site is published from the `main` branch, repository root. `.nojekyll` serves the static
files directly. Relative URLs support deployment under the repository subpath.

## Sources

Based on [Interactive Evo](https://github.com/Jewelina95/interactive-evo).
The existing MIT license is retained. Provider asset sources are recorded in
[assets/providers/sources.json](assets/providers/sources.json).
