# Release gate / 发布前检查清单

**2026-10-20 status: NOT APPROVED FOR PUBLIC RELEASE.** This document is a gate, not authority to switch visibility.

## Current review notes

See [Preliminary audit progress](audit-progress-2026-10-20.md). Zero Actions artifacts and a first-pass PR/log scan do not constitute whole-history clearance. Run the full-clone scanner, review its findings and expand to all PR refs before publication.

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

1. Keep repo private while checking outstanding items.
2. Ensure `main` PR checks and no-force-push rules can be configured in the selected GitHub plan. A 2026-10-20 private-repository ruleset request returned a plan/access 403.
3. Once the entire review passes, decide explicitly whether to make source repo public, and whether to make the Pages site public. These are separate acts.
4. Following owner approval, change visibility in GitHub UI and configure `main` protections, required validation status, PR review and restricted history rewrites.
5. In Settings > Pages choose **GitHub Actions** as deployment source, then run the **manually-triggered** workflow `Publish documented site` with the publication confirmation enabled.
6. Verify accessible live Pages URLs, navigation, language, mobile responsiveness, the benchmark interaction and source links.
7. Check GitHub Actions logs/Pages site for unintended public data.

## Commands / 本地校验

```sh
python3 scripts/validate_contributions.py
node scripts/generate_readme_visuals.mjs --check
node scripts/check_dashboard_data.mjs
node scripts/generate_site.mjs --check
python3 -m pip install -r requirements-docs.txt
mkdocs build --clean --strict
```

GitHub Pages workflow is **manual-only**, and explicitly refuses to deploy while the repository is private.

**Read first:** [Pre-publication review](pre-publication-review.md) and [data freshness](methodology/data-freshness.md).
