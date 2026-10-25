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
- `minimum_wait_days` — a statutory or administrative minimum interval before an application can be issued or completed; this is not evidence of current backlog or actual average processing time.
- `monthly_report`
- `monthly_count` — a monthly submitted, processed, finalised or other volume count published by an authority. Preserve the authority's label and cohort scope; do not subtract unlike monthly counts to manufacture a backlog figure.
- `workflow_policy` — official processing preconditions, prioritisation rules, workflow changes or system-transition statements that affect how applications are handled but do not themselves publish a waiting-time, queue-date or backlog-count metric.
- `transition_count` / `transition_percentage` / `transition_deadline` — official measures of a statutory or administrative migration/transition program. These describe transition progress and must not be treated as a new-application backlog unless the source explicitly defines them that way.
- `administrative_fee` — an official licence, permit or registration fee retained only where it is materially relevant to a licensing-policy or system-change record. Fee observations are contextual and do not measure processing performance.
- `administrative_finance` — an official firearms-registry unit budget allocation, actual expenditure or service revenue, with the source amount preserved in AUD and a separate stable series for each measure. Use the financial reporting-period endpoint as `metric_date`; an answer's signature date belongs in provenance/notes. These whole-unit amounts are contextual: they are not staffing/FTE, application-assessment labour costs, ICT-only project funding, processing performance or a workforce denominator. Do not put them in staffing.csv's ICT-capacity funding columns or derive efficiency ratios from them.
- `eligibility_policy` — an official change to who may qualify for a licence or permit or the genuine reasons available to them. This is legal/policy evidence, not processing performance.
- `future_legal_requirement` — a future-dated requirement officially announced or legislated but not yet in force at the observation date. Preserve the announced date and any commencement-status qualification.
- `permit_availability_policy` — an official change to whether a permit pathway exists or remains available. This is policy evidence, not a processing metric.
- `legal_policy` — a commenced statutory change affecting licence or permit validity, duration, conditions, renewal continuity or other legal administration, without itself publishing a processing-time metric.

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

An agency processing-delay advisory such as applications potentially taking up to two months is `workflow_policy` unless the source defines a measured statistical series. Preserve its wording and native unit; do not relabel it as an observed mean, guaranteed maximum or queue date. A date attached only to fees elsewhere on the page does not date the processing notice. Month-only newsletters retain their publication month in evidence/notes, with exact CSV date fields blank. A registry delivery expectation is a planning statement as at its dated source, with the target month separately expressed in the value/notes; it is not evidence of go-live or demonstrated time savings.

Administrative-finance observations receive no queue calculations. A budget-minus-expenditure difference is a project calculation unless separately published by the authority; label it accordingly and preserve the two original amounts.

Minimum-wait observations must not be interpreted as current backlog, observed average completion time or service performance. Administrative-fee observations are policy context only and receive no queue calculations.

Eligibility, future-law and permit-availability observations receive no queue calculations. Future requirements must distinguish an agency-announced compliance date from the legislation's current commencement status where those differ.

Monthly counts must not be converted into backlog estimates unless the authority explicitly defines the relationship. Submitted and processed/finalised counts may represent different cohorts and outcome states.

Legal-policy observations receive no queue calculations unless the same official source separately publishes a compatible processing metric. Preserve the commencement/effective date as `metric_date` when explicitly stated.

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
