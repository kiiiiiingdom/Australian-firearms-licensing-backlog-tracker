# Pre-publication release review — 2026-10-20

## Current state
The repository is PRIVATE. This is a pre-publication checklist, **not** permission to change visibility. Public release must be a separate explicit decision after review.

## Known findings
- `data/observations.csv` has 130 observation rows. The main branch originally contained 39 records with an extra empty cell; PR #2 repaired them on 20 October 2026 and was merged as c0b4cccbaa29d9ba3ffa29aa2cc8d2792214d32a. After repair, all 130 rows have exactly 21 columns.
- PR #1 introduces external contributor documentation, standard AI evidence collection prompt, Issue/PR templates, and validation tooling; run 39353627404 passed on 20 October 2026 with 0 errors and 0 warnings. The contribution kit is pending merge at the time of this note.
- An index of 178 repository tree entries was checked, including current README, analysis, scripts, datasets and dated evidence. The index contains no evident private-application files by filename. **Filename review cannot establish absence of private data inside files or history.**
- Recent commit metadata was viewed, but a complete audit of all reachable Git history, old versions, forks, tags, PR content, artifacts and Actions logs **has not been completed**. Do not claim otherwise.
- A machine-oriented privacy check is not a substitute for human inspection of text and metadata.
- No data or software LICENSE was selected at this point; rights to source extracts and reusable contributions must be reviewed before publication.

## Release gate — maintainer approval required for each item
- [x] PR #2 CSV repair merged; all 130 logical rows now have 21 columns.
- [ ] PR #1 reviewed and merged after PR #2. Pre-merge GitHub Actions run 39353627404 passed; rerun/confirm any follow-up changes.
- [ ] Check ALL tracked files, not just paths, for names, application numbers, emails, addresses, private correspondence, applicant-specific dates/projections, credentials or tokens.
- [ ] Audit **entire reachable Git history**, tags, other branches, releases, issues, PRs and downloadable workflow artifacts for private information. Private history becomes visible when a private repo goes public. If sensitive data is found, determine safe remediation separately before publishing.
- [ ] Decide LICENSE for code and data, as applicable; verify that each reproduced official-source extract may be republished lawfully with attribution.
- [ ] Check community workflows, repository descriptions, README claims, sensitive URLs, external integrations and Actions permissions.
- [ ] Set contribution policy: external users open PRs or Issues; trusted maintainers review and merge. Consider protected main, required validation and review before publishing.
- [ ] Confirm ability to maintain and review incoming contributions and reports of inaccurate or private content.
- [ ] Review legal/regulatory context; publish administrative and public-policy data only, not private applicant records or actionable acquisition guidance.
- [ ] Explicitly authorize final visibility change only when the checks above pass.

## Evidence and verification notes
Source metadata, record corrections and release audits must distinguish an observed fact from automated detection or interpretation. A zero-warning automated checker alone never certifies public-release safety.
