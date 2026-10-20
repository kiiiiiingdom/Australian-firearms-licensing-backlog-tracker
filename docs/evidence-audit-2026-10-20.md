# Evidence and publication audit — 20 October 2026

**Status: NOT CLEARED FOR PUBLIC RELEASE.**

## Current committed evidence

- 77 text evidence extracts were inspected through GitHub content access.
- All 77 contained one or more HTTP(S) source URL references.
- No directly embedded email-address strings were detected in the examined evidence text.
- Several extracts contain longer prose passages; they must be reviewed against original publisher reproduction rights and should be paraphrased with source links when possible.
- Source-domain registry covers all 155 structured records across the processing/policy and staffing CSVs, representing 15 source hosts.
- Every rights entry is marked *pending manual review*. This audit **does not** establish permission to republish every quotation.

## Previous technical findings

- Private-repo Git-history scanner passed across reachable objects and pull-request refs under its defined patterns.
- Site and CSV reproducibility checks passed in earlier PRs.
- Neither regex checks nor a successful build is a substitute for human privacy and copyright examination.

## Outstanding release gates

1. Check each official publisher's current reuse rules and any exceptions for individual PDFs, parliamentary records, logos and FOI excerpts.
2. Inspect generated website and PR history for private data that would not match a keyword rule.
3. Recheck original sources and metric dates, including quoted wording and context.
4. Obtain explicit repository-owner approval before switching visibility and publishing Pages.
5. Configure and verify main branch protection and publication workflow controls.

Keep the repository PRIVATE until all gates are cleared.
