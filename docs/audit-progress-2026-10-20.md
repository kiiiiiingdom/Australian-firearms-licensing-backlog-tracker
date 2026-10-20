# Preliminary pre-publication audit progress — 20 October 2026

**Status: incomplete, not a clearance to make the repository public.**

Repository inspected: `kiiiiiingdom/Australian-firearms-licensing-backlog-tracker`; visibility remains **Private**.

## Live connector observations

- Default `main` and one previously merged release-preparation branch were present before this feature work.
- Main history list at the time contained **143 commits**; that is a commit *listing*, not a scan of every historical blob.
- Five PRs were merged, and their exposed PR text/diffs received an initial regex scan for access tokens and email strings: **no obvious token/private-key strings found**. Wording related to privacy matched contextual phrases only.
- Six historical Actions runs were listed and inspected for stored artifacts: **zero stored artifacts reported**.
- All six recorded job logs received a token/email regex scan: no candidate secret or email strings detected. Generic phone regex flagged software-version-like numeric strings in GitHub runner metadata, not demonstrated phone numbers.
- All commit authors returned `43037179+kiiiiiingdom@users.noreply.github.com`; metadata alone is not an all-history privacy audit.

## Audit still required

1. Run `python3 scripts/audit_git_history.py --json audit-local.json --require-clean` against a **full local clone** after `git fetch --all --tags`. Handle `audit-local.json` privately, not in the repository.
2. Review all historical object matches manually (redact secrets rather than reproducing their values in reports).
3. Check remote pull-request refs and any old/unreachable objects not included by local `--all`; branch deletion does not necessarily erase PR refs.
4. Independently inspect any previously deleted or binary source data, private correspondence and applicant-specific records.
5. Inspect newly created workflow runs and future Actions artifacts, not just the historical six.
6. Review reuse rights for official-source excerpts and metadata.
7. Require explicit publication approval; a passing code/CSV/site CI job is **not** a privacy clearance.

**No automated history scan can certify an absence of personal information or copyrighted third-party material.**


## Expanded automated Git-history candidate scan — 20 October 2026

GitHub Actions [run 39363929339](https://github.com/kiiiiiingdom/Australian-firearms-licensing-backlog-tracker/actions/runs/39363929339) completed successfully in the **private** repository after fetching full branch history and pull-request heads.

- **13 reachable Git refs**, including **7 fetched PR refs**.
- **1,030 reachable Git objects**, including **223 unique reachable blobs**.
- **0 blobs matched the scanner's current secret, non-noreply email, phone, labelled personal-case or residential-address patterns**.
- Source file changes were not needed for remediation based on those pattern results.
- The scanner is **candidate-based** and its results are not comprehensive privacy certification. Review of uncaptured/unreachable objects, media contents, innocuously worded personal details, original-source copyright and any later Actions material remains outstanding.
- An earlier job failed because the audit-only checkout did not retain its read-only private-repository authentication; this was corrected and the follow-up run passed.

**Publication remains blocked pending independent human review and explicit approval.**
