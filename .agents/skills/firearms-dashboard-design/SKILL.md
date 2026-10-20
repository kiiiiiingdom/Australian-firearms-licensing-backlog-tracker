---
name: firearms-dashboard-design
description: "Apply Hallmark-inspired editorial/data-workbench design to the Australian firearms licensing administrative dashboard, maintaining MkDocs, source transparency and comparison integrity."
---

# Dashboard design workflow

Use [Hallmark](https://github.com/Nutlope/hallmark) as upstream design guidance (MIT). To install the complete upstream skill for Codex in your local project, run `npx skills add Nutlope/hallmark --skill hallmark --agent codex` and confirm the installation destination. Do not run remote install scripts in CI.

When changing the site:
1. Inspect `docs/overview.md`, `docs/assets/dashboard.css`, `docs/assets/benchmark.js`, and `scripts/generate_site.mjs`.
2. Follow Hallmark's **stat-led / workbench** macrostructures: lead with a single data question and a readable comparison, not a marketing hero or a wall of SVGs.
3. Use clear typographic hierarchy, deliberate spacing, visible data dates, accessible controls, contrast, reduced-motion support, mobile layouts, and static fallbacks.
4. Keep categories separate. Published queue-date lag is NOT actual processing time, applicant wait forecast, efficiency ranking or licence decision time. Do not combine disparate state definitions.
5. Every visible datum must come from reproducibly generated, verified CSV-backed `docs/assets/dashboard-data.json`; links should point to official sources, not fabricated values.
6. Update generator **and** generated Markdown/JSON together. Run `node scripts/generate_site.mjs --check`, `mkdocs build --strict --clean`, and the rendered site checker.
7. Use PR + required `validate` CI before squash-merging. Publishing Pages remains manual.

Design inspiration: Hallmark's [stat-led](https://github.com/Nutlope/hallmark/blob/main/skills/hallmark/references/macrostructures/04-stat-led.md), [workbench](https://github.com/Nutlope/hallmark/blob/main/skills/hallmark/references/macrostructures/05-workbench.md), and [redesign](https://github.com/Nutlope/hallmark/blob/main/skills/hallmark/references/verbs/redesign.md) guidance. This is a tailored project skill, not a copy of the full Hallmark distribution.
