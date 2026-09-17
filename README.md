# Australian Firearms Licensing Backlog Tracker

An evidence-first longitudinal tracker for publicly reported firearm licensing processing performance and administrative capacity across Australian jurisdictions.

The repository began with South Australia Police (SAPOL) data, but the intended scope is national: South Australia, Victoria, Queensland, New South Wales, Western Australia, Tasmania, the Australian Capital Territory and the Northern Territory, wherever an official source publishes a measurable processing-date, average processing-time, queue, staffing, service-standard or comparable metric.

## Purpose

This repository is intended to preserve and analyse official public information over time. It is designed to answer factual questions such as:

- What processing metric does each jurisdiction publish?
- How does that metric change over time?
- Where a jurisdiction publishes a processing date, is backlog age shrinking, growing, or remaining broadly stable?
- Where a jurisdiction publishes an average processing time, is that average improving or deteriorating?
- What staffing/FTE information is publicly available for the relevant firearms licensing function?
- Do changes in relevant administrative capacity coincide with changes in backlog or throughput?
- What official explanations, legislative changes, staffing statements, service standards, ICT changes or workflow reforms accompany those movements?

The project does **not** track or disclose any private individual's application date, queue position, identity or case reference. Personal application dates may be used privately outside this repository, but they are not part of the public dataset or methodology.

The project does **not** assume misconduct, deliberate delay, or a fixed-backlog policy. Those are hypotheses that would require separate evidence. The repository distinguishes observed facts from calculations and interpretation.

## Repository structure

```text
data/observations.csv             Cross-jurisdiction processing observations
data/staffing.csv                 Staffing/FTE/capacity observations
analysis/methodology.md           Processing definitions and evidence standards
analysis/staffing-methodology.md  Staffing/capacity definitions and comparison rules
analysis/jurisdictions.md         Official sources and metric type by jurisdiction
scripts/analyse.py                Reproducible calculations from processing data
evidence/                         Dated source extracts and metadata
```

## Evidence principles

1. Preserve the exact official source URL and the page's stated update date when available.
2. Preserve the exact wording needed to verify the published metric.
3. Never overwrite historical evidence; add a new dated evidence record for each observation.
4. Hash stored evidence files with SHA-256 when local binary evidence is available.
5. Keep observed facts separate from derived metrics and commentary.
6. Record official explanations that could contradict or qualify a simple backlog interpretation.
7. Do not infer intent from queue behaviour alone.
8. Do not publish personally identifying application dates, references or queue positions.
9. Do not force unlike state metrics into a false apples-to-apples comparison; preserve each jurisdiction's actual published measure.
10. Do not equate headcount, FTE, funded establishment, vacancies or whole-agency workforce figures.

## Processing metric types

Australian jurisdictions do not all publish the same kind of information. The tracker therefore supports several metric types, including:

- `processing_date` — the oldest/newest application date currently being processed
- `average_processing_days` — average number of days to process
- `average_processing_weeks` — average number of weeks to process
- `minimum_wait_days` — legislated or stated minimum wait, which is not itself backlog evidence
- `monthly_report` — periodic official statistics from which processing performance can be derived

Only comparable metrics should be compared directly.

## Staffing and capacity

Staffing is tracked in a separate data stream because workforce measures use different definitions and update frequencies. The preferred measure is FTE/headcount assigned directly to the firearms licensing or registry function. Broader licensing-division or whole-agency workforce figures are retained only with an explicit scope label.

Where evidence permits, the project may examine metrics such as pending applications per relevant FTE or processed applications per relevant FTE. These calculations are only valid where staffing scope and workload scope genuinely match.

Recruitment advertisements are treated as evidence of recruitment activity, not proof of net staffing growth.

## Core calculations for processing-date jurisdictions

- **Backlog age** = metric date - processing date
- **Processing advance** = current processing date - previous processing date
- **Elapsed real time** = current metric date - previous metric date
- **Effective speed ratio** = processing advance / elapsed real time

A speed ratio of roughly `1.0` means the processing date is moving forward at about the same pace as real time, so backlog age is broadly stable. Greater than `1.0` implies backlog age is shrinking; less than `1.0` implies backlog age is growing.

## Status

Private working repository. Public conclusions should rely primarily on observations with preserved, independently checkable official evidence.