# Contributing official firearms-licensing administrative data

Thank you for helping make Australian firearms-licensing processing information transparent, comparable **where genuinely comparable**, and reproducible. This project covers ACT, NSW, NT, QLD, SA, TAS, VIC and WA. It is a public-administration research dataset, not a service for tracking individual applicants.

## Ways to contribute

**Easy option:** Open an "Official source / new observation" GitHub Issue. Include the original official URL, source title, published wording, applicable date(s), metric type and value. You do not need to edit CSV yourself.

**Structured option:** Fork the repository, create a branch, add a new dated source extract under evidence/JURISDICTION/OBSERVATION_DATE/ and add correctly formed row(s) to data/observations.csv. Open a Pull Request. Do not modify or overwrite historical evidence.

**Staffing / capacity:** Use data/staffing.csv and analysis/staffing-methodology.md. Do not insert staffing counts into the processing CSV just to create a trend.

Use prompts/official-source-contributor.md if using an AI research assistant. All AI output must be human-reviewed against the official source.

## Which sources count?

Primary evidence must come from an official Australian government, police, parliament, audit-office, official FOI/RTI disclosure or official legislative source. A news story, Reddit thread, forum post, retailer, social-media comment or an applicant's experience is **not** primary verification. Such material can be a lead for research, never the basis of a verified row.

Cite an exact official URL, exact page/document title, brief exact source wording containing the figure, and the source's stated updated/as-at date (where available). If the live page has changed, do not pretend that today's page proves an older value; submit an independently checkable preserved official extract or mark the limitation clearly.

Do not upload entire copyrighted official documents unnecessarily. Short excerpts with original links and metadata are preferred. Include a dated snapshot or archive reference where legally and technically appropriate.

## The data model: follow the EXISTING schema exactly

The complete and authoritative column order is the first line of data/observations.csv, also copied into templates/observations-header.csv. Do not add, delete or reorder columns without a separate schema-change proposal.

Main fields:

- jurisdiction: exactly ACT, NSW, NT, QLD, SA, TAS, VIC or WA.
- authority: issuing agency, not an individual.
- series: stable machine-readable identifier for the same measured application category and definition.
- observation_date: date **you retrieved the source**, YYYY-MM-DD.
- source_updated_date: date the authority explicitly says the page was updated; blank if absent.
- metric_date: official as-at date or reporting-period endpoint; blank if not known. For policies, record an explicitly stated effective date where relevant.
- metric_type: retain the source's type, such as processing_date, average_processing_days, average_processing_weeks, backlog_count, monthly_count, minimum_wait_days, service_standard_days, workflow_policy, legal_policy, eligibility_policy or a properly documented additional type.
- processing_date: only for a processing_date metric, YYYY-MM-DD; leave metric_value and metric_unit blank in this case.
- metric_value and metric_unit: for numeric averages or counts, preserve the exact published quantity and unit; for policies, use a succinct descriptive value with unit policy/plan where applicable.
- source_url and source_title: authoritative source URL and exact title.
- quoted_text: a short, exact primary-source excerpt that establishes the value.
- evidence_status: verified only if an independently checkable official extract has been saved; provisional if the contemporaneous assertion lacks preserved verification; disputed for conflicting official sources.
- evidence_path: repository path to the dated extract; required for verified observations.
- backlog_age_days, elapsed_days, processing_days_advanced, speed_ratio, backlog_age_change_days: derived values **only** for processing_date series.
- notes: source-defined scope, official explanations and clearly labelled interpretation. Never put private details here.

Keep all 21 columns. For unused values, leave the cell empty; do not add an extra comma before the notes field. Always quote CSV strings that contain commas, quote characters or newlines (use a standards-compliant CSV writer, not naive string concatenation).

## Preserve evidence first

For an observation taken on 2026-10-20, example location:

    evidence/SA/2026-10-20/processing-status.txt

The directory date is the **observation date**, not an historical effective/metric date. Each independently new observation must get a new file name and dated extract. Never overwrite existing evidence. See templates/evidence-source.txt. Include:

- jurisdiction, observation_date, source_updated_date if explicitly stated, metric_date or period endpoint, metric_type;
- exact official source title/URL;
- exact quoted wording sufficient to prove each value;
- classification (verified, provisional or disputed), capture method and any limitations;
- official explanations on staffing, complex cases, waiting periods, system changes, policy and legislation, where applicable.

Record only what you actually observed. If an official source is inaccessible or the quote cannot be verified, do **not** invent a value or label it verified.

## Calculations (processing-date series ONLY)

Use the official metric_date; only if unavailable use the explicitly stated source_updated_date. If both are unknown, leave time-derived fields blank and do not infer backlog age from observation_date.

With M = as-at metric date and P = published processing date:

    backlog_age_days = (M - P) in calendar days

For successive genuinely comparable snapshots within the same jurisdiction and series:

    elapsed_days = M_current - M_previous
    processing_days_advanced = P_current - P_previous
    speed_ratio = processing_days_advanced / elapsed_days (round to 4 decimals)
    backlog_age_change_days = backlog_age_current - backlog_age_previous

Only compute a speed ratio if elapsed_days is positive. A ratio above 1 means backlog age shrank within that interval; below 1 it grew; equal to 1 it stayed stable. A zero processing-date advance means a stalled **single interval**, not proof of permanent queue inaction. A negative advance may be a correction/definition change: flag for review. A single interval cannot establish a structural or deliberate backlog policy.

For average-time or monthly-report data, compare only truly equivalent measures, units, cohorts and methodology. A legal minimum wait, an expiry-based target, a mean processing time and a queue processing date are different measures. Submitted and processed monthly volumes may refer to different cohorts; do not subtract them to invent an official backlog count.

## Privacy and neutrality: mandatory

Do NOT include an identifiable person's application date, queue position, name, address, phone, email, licence number, application/reference number, correspondence, or personal processing-time projection. Also exclude personal staff information when aggregate staffing would suffice. Do not infer intent, misconduct, deliberate delay or a fixed-backlog policy from a trend alone.

Do not include any weapon acquisition, circumvention or applicant-specific licensing advice. Keep submissions about public administrative processing and official regulations.

## Before opening a Pull Request

1. Search the existing dataset/evidence for duplicates (same jurisdiction, series, metric date and official source). Do not duplicate an existing verified point.
2. Save the new official evidence extract(s) in new dated paths, **then** append rows using the exact CSV header.
3. Run: python3 scripts/validate_contributions.py
4. Check any calculated values and compare against the immediately previous valid record in the same series.
5. Open a PR using the template, identify each official source, state exactly what is new and distinguish facts from your interpretations.
6. Allow a maintainer to review before merging. Contributors should not receive direct main-branch write access solely to add data.

See analysis/methodology.md, analysis/staffing-methodology.md, analysis/jurisdictions.md and evidence/README.md for detailed rules.
