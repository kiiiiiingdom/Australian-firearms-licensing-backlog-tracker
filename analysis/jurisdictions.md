# Jurisdiction Tracking Plan

This file records the official-source coverage for each Australian jurisdiction. It is a source map, not a ranking.

## South Australia

Authority: South Australia Police (SAPOL)

Primary metric:
- Processing date for firearms licence applications.

Primary source:
- SAPOL — Status of my application
- https://www.police.sa.gov.au/services-and-events/firearms-and-weapons/status-of-my-application

Observed/source cadence:
- SAPOL states that the table is provided each week; practical monitoring cadence: daily capture, expecting roughly weekly changes.

Supplementary official sources:
- SAPOL Proactive Disclosure / FOI determinations, including historical backlog counts, earliest received dates and processing totals.

Status: active.

## Victoria

Authority: Victoria Police Licensing and Regulation Division

Primary metric:
- Processing date for new firearm licence applications.

Primary source:
- Victoria Police — Firearms licensing
- https://www.police.vic.gov.au/firearms-licensing

Observed/source cadence:
- Dynamic status table with a page-level "Last updated" date. Exact publication cadence is not stated; daily monitoring is sufficient to capture changes within about 24 hours.

Status: active; first verified observation captured 14 September 2026.

## Queensland

Authority: Queensland Police Service Weapons Licensing

Primary metrics:
- Average online processing timeframe for new licence applications.
- Average online processing timeframe for permits to acquire.

Primary source:
- QPS — Weapons Licensing
- https://www.police.qld.gov.au/units/weapons-licensing

Observed/source cadence:
- Page publishes a dated "Current average online application timeframes as at ..." metric. Exact update cadence is not stated; daily monitoring is sufficient.

Important methodological note:
- Queensland publishes an average timeframe, not a processing-date queue. Do not calculate backlog age from this series.

Status: active; first verified observation captured for 7 September 2026.

## New South Wales

Authority: NSW Police Force Firearms Registry

Primary metric:
- Monthly average processing time for new licence applications.

Primary source family:
- Firearms Registry performance/data reports published as official PDFs on the NSW Police website.

Current verified source:
- Data Report March 2026
- https://www.police.nsw.gov.au/__data/assets/pdf_file/0008/934667/Data_Report_March_2026.pdf

Observed/source cadence:
- Monthly reporting series. Daily source discovery is acceptable, but the substantive metric is monthly.

Important methodological note:
- NSW states that its average processing time includes the 28-day cooling-off period. Cross-jurisdiction comparisons must account for that definition.

Status: active; historical monthly series seeded from April 2025 to March 2026.

## Tasmania

Authority: Tasmania Police Firearms Services

Current official information found:
- Eligibility page states that the minimum time for processing a licence application is 28 days from application.
- This is a minimum statutory/administrative timeframe, not evidence of current backlog.

Primary source:
- https://fas.police.tas.gov.au/obtaining-a-licence/eligibility/

Status: monitored; no recurring public backlog metric verified yet.

## Western Australia

Authority: Western Australia Police Force / WA Government firearms licensing services

Current finding:
- No current recurring public firearm-licensing processing metric has yet been verified from the main public pages.
- Historical parliamentary/official material may provide point-in-time processing data and should be retained as contextual evidence, not treated as a live series.

Status: source discovery continues.

## Australian Capital Territory

Authority: ACT Policing / firearms registry function

Target metrics:
- Official processing-time or service-standard information.
- Published licensing delay notices or periodic reports.

Status: source discovery required; do not infer a metric from statutory waiting periods alone.

## Northern Territory

Authority: Northern Territory Police firearms licensing function

Target metrics:
- Official processing-time statements.
- Service standards or queue information.

Status: source discovery required.

## Cross-jurisdiction comparison rules

1. Preserve the native metric published by each authority.
2. Never treat a statutory minimum waiting period as evidence of administrative backlog.
3. Do not compare a processing date directly with an average processing time without clearly explaining the difference.
4. Where no public metric exists, record `no_public_metric_found` rather than inventing an estimate.
5. Prefer police, justice, parliament, audit-office and other government primary sources over media or forum reports.
6. Secondary sources may be retained only as corroboration or as leads to primary evidence.
7. Record the authority's own metric date separately from the date on which the tracker retrieved it.
8. Monitoring frequency does not imply source publication frequency; daily checks are used primarily to capture dynamic pages before they overwrite historical values.
