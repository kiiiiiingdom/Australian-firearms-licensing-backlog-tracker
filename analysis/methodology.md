# Methodology

## Scope

This project tracks publicly reported firearm licensing processing information across Australian jurisdictions and related official material that may explain queue behaviour or legal eligibility changes.

Jurisdictions in scope are:

- Australian Capital Territory
- New South Wales
- Northern Territory
- Queensland
- South Australia
- Tasmania
- Victoria
- Western Australia

Only public, official-source data is included in the repository. No private applicant dates, licence numbers, case references, names, or personal queue positions should be stored.

## Evidence classes

- `verified`: the repository contains a preserved official-page extract, snapshot, archive, or other independently checkable official evidence for the observation.
- `provisional`: the value was previously recorded during monitoring but the corresponding official snapshot has not yet been preserved in this repository.
- `disputed`: conflicting official evidence exists and requires reconciliation.

Public conclusions should rely primarily on `verified` rows.

## Required fields for each observation

1. Jurisdiction.
2. Observation date.
3. Source page's own update date, where shown.
4. Metric type.
5. Exact metric value published by the responsible authority.
6. Official source URL and page title.
7. Short exact wording sufficient to verify the reported value.
8. Evidence status and repository path.
9. Derived queue metrics where applicable.
10. Any relevant official explanation published at the same time.

## Metric comparability

Australian jurisdictions do not necessarily publish the same metric. The dataset therefore records `metric_type` explicitly.

Examples include:

- `processing_date`
- `average_processing_days`
- `average_processing_weeks`
- `service_standard_days`
- `monthly_report`

A processing-date backlog should not be directly ranked against an average-processing-time measure without a clearly stated normalization method. The repository should preserve the authority's actual published measure rather than forcing all jurisdictions into one synthetic score.

## Calculations for processing-date observations

For observation date `O` and published processing date `P`:

```text
backlog_age_days = O - P
```

For consecutive comparable observations from the same jurisdiction and metric series:

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

A key hypothesis for jurisdictions that publish a processing date is whether backlog age remains within a relatively narrow band over a sustained period. Evidence consistent with a near-fixed backlog would be a long series where:

- processing dates continue to move forward,
- but `backlog_age_days` remains approximately constant,
- and longer-window `speed_ratio` remains near `1.0`.

That pattern alone would establish persistence of backlog age, not intent, misconduct, staffing policy, or deliberate delay.

For jurisdictions publishing other metrics, equivalent hypotheses should be framed around the actual official measure, such as whether average processing time is improving, deteriorating, or remaining stable.

## Privacy and publication standard

The repository must not include any personally identifying application anchor. In particular:

- no individual's application submission date,
- no applicant-specific estimated reach date,
- no licence/application reference number,
- no private correspondence that could identify an applicant.

Personal estimates can be calculated privately outside the repository if needed, but public analysis should remain population- and system-level.

## Evidence preservation

For each new verified observation, create a dated evidence record where possible. Preserve:

- jurisdiction,
- source metadata,
- exact quoted wording,
- a snapshot or archive reference when technically available,
- SHA-256 hashes for locally stored evidence files.

Never overwrite prior evidence with a newer page state.

## Neutrality and reproducibility

Record official explanations that may qualify or contradict an apparent trend. The purpose is to measure queue behaviour accurately, not to select only observations supporting a predetermined conclusion.