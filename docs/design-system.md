# Design system / 交互数据设计

Dashboard V3 follows **Hallmark-inspired stat-led/workbench design**; the upstream full skill is available from [Nutlope/hallmark](https://github.com/Nutlope/hallmark) (MIT). Our small project skill lives at `.agents/skills/firearms-dashboard-design/SKILL.md` and can be used without adding a frontend framework. Codex users can install upstream separately using:

```sh
npx skills add Nutlope/hallmark --skill hallmark --agent codex
```

Design goals: primary question first, comparable data shown immediately, definition and as-of date always adjacent to numbers, direct official citations, and secondary historical charts behind a clearly named section. No visual style can make incomparable records comparable.
