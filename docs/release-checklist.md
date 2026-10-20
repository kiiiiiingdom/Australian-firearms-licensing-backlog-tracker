# Release gate / 发布前检查清单

**2026-10-20 update: repository PUBLIC and main branch Ruleset ACTIVE. Separate GitHub Pages site NOT DEPLOYED. Human third-party rights and publication review remains outstanding.**

## Current review notes

See [Preliminary audit progress](audit-progress-2026-10-20.md). Zero Actions artifacts and a first-pass PR/log scan do not constitute whole-history clearance. Run the full-clone scanner, review its findings and expand to all PR refs before publication.

## Evidence and rights audit / 来源与权利审查

Current-state evidence review: [77-source extract triage](evidence-audit-2026-10-20.md) and [15-domain rights register](source-rights-register.md). All publisher reuse decisions remain pending manual review.

## Mandatory security and privacy work / 必须完成

- [ ] Inspect **all reachable commits and their changed file contents**, not only current `main`, for personal applicant dates, licence or application numbers, names, private correspondence, emails, phone numbers, credentials, tokens and internal notes.
- [ ] Inspect deleted historical files and source metadata; screen original short extracts for third-party rights/permissions.
- [ ] Inspect *all* visible workflow run logs, comments, PR bodies, releases and stored workflow artifacts (if any) for accidental disclosure.
- [ ] Verify all relevant branches, old Git refs and tags; deleting a branch does not by itself eliminate all old objects and PR refs.
- [ ] Complete an independent legal/provenance check for third-party official excerpts. The original compilation's CC BY statement is not a licence for third-party material.
- [ ] Check that GitHub Pages output contains no private/internal inputs or drafts.
- [ ] Independently verify README/site claims against original official source records and dates.
- [ ] Verify all generated state pages and visual summaries are current; the interactive benchmark has a consistency check but all historical state pages/charts are **not yet automatically refreshed**.
- [ ] Confirm two-person publication review if available; record who approved, when and what history revisions were checked.

## Required technical publication sequence / 技术操作次序

1. The repository is already public: urgently assess any third-party evidence extracts that need adjustment and do not treat a private-to-public switch as pending.
2. Verified active `Main Breach Protection` ruleset targets default branch, requires PR, `validate`, linear history, and blocks deletion/force push.
3. Review source rights, privacy and generated website before authorising a separate GitHub Pages launch.
4. Maintain active `main` protections; changes must use PR + CI.
5. In Settings > Pages choose **GitHub Actions** as deployment source, then run the **manually-triggered** workflow `Publish documented site` with the publication confirmation enabled.
6. Verify accessible live Pages URLs, navigation, language, mobile responsiveness, the benchmark interaction and source links.
7. Check GitHub Actions logs/Pages site for unintended public data.

## Commands / 本地校验

```sh
python3 scripts/validate_contributions.py
python3 scripts/check_source_provenance.py
node scripts/generate_readme_visuals.mjs --check
node scripts/check_dashboard_data.mjs
node scripts/generate_site.mjs --check
python3 -m pip install -r requirements-docs.txt
mkdocs build --clean --strict
```

GitHub Pages workflow is **manual-only**, but the repository is now public. Its explicit `confirm_publication` checkbox is the remaining launch gate; do not enable it before rights review and owner approval.

**Read first:** [Pre-publication review](pre-publication-review.md) and [data freshness](methodology/data-freshness.md).
