# Methodology

## Scope

This project tracks publicly reported SAPOL processing dates for new/first firearms licence applications and related official material that may explain queue behaviour or affect permanent-resident eligibility.

## Evidence classes

- `verified`: the repository contains a preserved official-page extract, snapshot, archive, or other independently checkable official evidence for the observation.
- `provisional`: the value was previously recorded during monitoring but the corresponding official snapshot has not yet been preserved in this repository.
- `disputed`: conflicting official evidence exists and requires reconciliation.

Public conclusions should rely primarily on `verified` rows.

## Required fields for each observation

1. Observation date.
2. Source page's own update date, where shown.
3. Exact processing date reported by SAPOL.
4. Official source URL and page title.
5. Short exact wording sufficient to verify the reported date.
6. Evidence status and repository path.
7. Derived queue metrics.
8. Any relevant official explanation published at the same time.

## Calculations

For observation date `O` and SAPOL processing date `P`:

```text
backlog_age_days = O - P
```

For consecutive observations `i-1` and `i`:

```text
elapsed_days = O_i - O_(i-1)
processing_days_advanced = P_i - P_(i-1)
speed_ratio = processing_days_advanced / elapsed_days
backlog_age_change_days = backlog_age_i - backlog_age_(i-1)
```

Interpretation:

- `speed_ratio ≈ 1`: processing date advances roughly with real time; backlog age is broadly stable.
- `speed_ratio > 1`: queue is advancing faster than real time; backlog age is shrinking.
- `speed_ratio < 1`: queue is advancing slower than real time; backlog age is growing.

A single interval should not be treated as a structural trend. Rolling averages and longer windows are preferred.

## Hypothesis testing

A key hypothesis is whether the backlog age remains within a relatively narrow band over a sustained period. Evidence consistent with a near-fixed backlog would be a long series where:

- processing dates continue to move forward,
- but `backlog_age_days` remains approximately constant,
- and longer-window `speed_ratio` remains near `1.0`.

That pattern alone would establish persistence of backlog age, not intent, misconduct, staffing policy, or deliberate delay.

## Projection to 2026-06-04 application

The target application date is **2026-06-04**. Any estimated reach date should:

- state the estimation method,
- identify the averaging window used,
- avoid extrapolating from a single unusually fast or slow interval,
- be labelled as a projection rather than an observed fact.

## Evidence preservation

For each new verified observation, create a dated directory under `evidence/YYYY-MM-DD/` where possible. Preserve:

- source metadata,
- exact quoted wording,
- a snapshot or archive reference when technically available,
- SHA-256 hashes for locally stored evidence files.

Never overwrite prior evidence with a newer page state.

## Neutrality and reproducibility

Record official explanations that may qualify or contradict an apparent trend. The purpose is to measure queue behaviour accurately, not to select only observations supporting a predetermined conclusion.