# Methodology

## Scope

This project tracks publicly reported firearm licensing processing information across Australian jurisdictions and related official material that may explain queue behaviour, administrative capacity or legal eligibility changes.

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

Processing-performance observations are stored separately from staffing/capacity observations. See `analysis/staffing-methodology.md` for workforce-specific definitions and comparison rules.

## Evidence classes

- `verified`: the repository contains a preserved official-page extract, snapshot, archive, or other independently checkable official evidence for the observation.
- `provisional`: the value was previously recorded during monitoring but the corresponding official snapshot has not yet been preserved in this repository.
- `disputed`: conflicting official evidence exists and requires reconciliation.

Public conclusions should rely primarily on `verified` rows.

## Date fields

Three different dates may appear and should not be conflated:

- `observation_date`: when this tracker retrieved or recorded the source.
- `source_updated_date`: the date the authority says the source page/document was updated, if explicitly stated.
- `metric_date`: the date or reporting-period endpoint to which the published metric applies.

For a dynamic processing-date page, `metric_date` normally equals the authority's stated update date. For a monthly report, `metric_date` is normally the end of the reported month. Where a metric date is not explicitly or reasonably defined, leave it blank rather than inventing one.

## Required fields for each processing observation

1. Jurisdiction.
2. Observation date.
3. Source page's own update date, where shown.
4. Metric date/reporting-period endpoint where applicable.
5. Metric type.
6. Exact metric value published by the responsible authority.
7. Official source URL and page title.
8. Short exact wording sufficient to verify the reported value.
9. Evidence status and repository path.
10. Derived queue metrics where applicable.
11. Any relevant official explanation published at the same time.

## Metric comparability

Australian jurisdictions do not necessarily publish the same metric. The dataset therefore records `metric_type` explicitly.

Examples include:

- `processing_date`
- `average_processing_days`
- `average_processing_weeks`
- `backlog_count`
- `service_standard_days`
- `monthly_report`
- `workflow_policy` — official processing preconditions, prioritisation rules, workflow changes or system-transition statements that affect how applications are handled but do not themselves publish a waiting-time, queue-date or backlog-count metric.

A processing-date backlog should not be directly ranked against an average-processing-time measure without a clearly stated normalization method. The repository should preserve the authority's actual published measure rather than forcing all jurisdictions into one synthetic score.

Likewise, staffing variables must remain separate from processing variables until the relevant unit, period and workload scope can be matched. A whole-agency workforce number is not a licensing-capacity measure.

## Calculations for processing-date observations

For metric date `M` and published processing date `P`:

```text
backlog_age_days = M - P
```

For consecutive comparable observations from the same jurisdiction and metric series:

```text
elapsed_days = M_i - M_(i-1)
processing_days_advanced = P_i - P_(i-1)
speed_ratio = processing_days_advanced / elapsed_days
backlog_age_change_days = backlog_age_i - backlog_age_(i-1)
```

If `metric_date` is unavailable, `source_updated_date` may be used; only as a last resort should `observation_date` be substituted, and that substitution should be documented.

Interpretation:

- `speed_ratio ≈ 1`: processing date advances roughly with real time; backlog age is broadly stable.
- `speed_ratio > 1`: queue is advancing faster than real time; backlog age is shrinking.
- `speed_ratio < 1`: queue is advancing slower than real time; backlog age is growing.

A single interval should not be treated as a structural trend. Rolling averages and longer windows are preferred.

Workflow/policy observations must not receive backlog-age, processing-advance, speed-ratio or backlog-age-change calculations unless the official source also publishes a directly compatible quantitative processing metric. Policy effective dates should be stored as `metric_date` where explicitly stated; otherwise leave `metric_date` blank.

## Capacity analysis

Where exact firearms-licensing staffing data exists, processing and staffing series may be aligned by date to investigate whether capacity changes coincide with processing changes. Any ratio such as `applications processed per FTE` or `pending applications per FTE` must use materially matching workload and workforce scopes.

A correlation between staffing and processing does not by itself establish causation. ICT changes, legislation, case mix, training, quality assurance, enforcement tasks, organisational restructures and temporary reallocations should be considered where official evidence exists.

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

Employee-level personal information is also unnecessary for capacity analysis; aggregate staffing values should be preferred.

## Evidence preservation

For each new verified observation, create a dated evidence record where possible. Preserve:

- jurisdiction,
- source metadata,
- exact quoted wording,
- a snapshot or archive reference when technically available,
- SHA-256 hashes for locally stored evidence files.

Never overwrite prior evidence with a newer page state.

## Neutrality and reproducibility

Record official explanations that may qualify or contradict an apparent trend. The purpose is to measure queue behaviour and administrative capacity accurately, not to select only observations supporting a predetermined conclusion.