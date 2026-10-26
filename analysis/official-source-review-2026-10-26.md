# Official-source monitoring - 26 October 2026

Observation date: 2026-10-26, Australia/Adelaide. Latest fetched protected main remains `0c58c3c8ce06680d51298b2f8c95148638506be7`. [PR 15](https://github.com/kiiiiiingdom/Australian-firearms-licensing-backlog-tracker/pull/15) is still open and unmerged at prior head `607e67c6b27b129c263443ca8585bc36c7e504be`; its existing validation is successful. Both main and the pending PR were checked for duplicates. This update appends to the same feature branch without rewriting its earlier commit.

## New directly verified VIC snapshot

The [official Victoria Police licensing page](https://www.police.vic.gov.au/firearms-licensing) now dates both its status table and page footer to **26 October 2026**. Five new observations preserve the existing series and channel definitions. The prior same-series table is dated 18 October and is already preserved in PR 15, so comparisons span eight actual days.

| Category | Processing submissions dated | Calculated queue-date lag | Processing-date advance / 8 days | Lag change |
|---|---|---:|---:|---:|
| New licence | 18 June 2026 | 130 d | 3 d / 8 d = 0.3750 | +5 d |
| Renewal | 14 August 2026 | 73 d | 3 d / 8 d = 0.3750 | +5 d |
| Online PTA | 12 October 2026 | 14 d | 7 d / 8 d = 0.8750 | +1 d |
| Manual PTA | 9 October 2026 | 17 d | 9 d / 8 d = 1.1250 | -1 d |
| Import permits | 7 October 2026 | 19 d | 6 d / 8 d = 0.7500 | +2 d |

New extract: `evidence/VIC/2026-10-26/processing-status-2026-10-26.txt`. Earlier evidence and all 145 existing observations remain unchanged; staffing.csv is unchanged. There are now 150 observations and 25 staffing records across the same 18 registered source hosts. The source-rights register's record counts are refreshed without asserting new reuse permissions.

All five published processing dates advanced, while four calculated lags grew because less than eight submission-days were advanced over this eight-day interval. Only manual PTA lag shrank. These are channel-specific interval calculations, not applicant completion times, staff productivity or a causal claim. Complex/suitability cases may take longer and the source qualifies PTA processing as potentially taking up to 28 days.

## Other jurisdiction follow-up

- **SA:** direct [official table](https://www.police.sa.gov.au/services-and-events/firearms-and-weapons/status-of-my-application) remains dated 23 October: new 25 February, renewal 10 September, PTA 21 September. These are already in PR 15; no duplicate rows. No independently preserved 16 October snapshot was recovered.
- **QLD:** direct [Weapons Licensing page](https://www.police.qld.gov.au/units/weapons-licensing) still dates the online means to 18 October (21 weeks new licences, 20 days PTA); already archived on main. The expired scheduled-outage banner is not treated as a processing metric. Older generic follow-up guidance is not substituted for the dated current means.
- **NSW:** the direct [official report listing](https://www.police.nsw.gov.au/about_us/information_of_interest_to_the_community/firearms_data) still lists September as its latest monthly performance report; already archived. A search surfaced a member's 21 October Hansard speech quoting a ministerial response, but no new quantitative performance record was verified from the original response in this run, so it is not added as a verified metric or causal explanation.
- **ACT:** the [official NFR index](https://police.act.gov.au/firearms/national-firearms-register) still links October Update 3 as its latest newsletter, already covered in PR 15. No newer directly verified quantitative registry workforce or processing observation was identified in this bounded follow-up.
- **TAS:** the direct [Service Tasmania notice](https://www.service.tas.gov.au/services/recreation-and-animals/firearms-gun-licence/apply-for-a-firearms-licence/) retains the undated advisory of up to two months, already included in PR 15. No measured mean, exact source day or new staffing count is inferred.
- **NT and WA:** primary-page retrieval and targeted official-source searching did not establish a new independently verifiable queue, average, backlog, staffing or reform point in this run. Focused lookups on the existing NT licence/permit page and WA Licensing Services page returned no matching expected text; this is a retrieval limitation, not proof of unchanged sources or non-publication. No values are inserted from snippets or assumed zeros.

The generators refresh every affected checked-in derivative. The national category comparator, six chronological same-series histories and eight-jurisdiction coverage matrix remain separate; capture-date advancement does not refresh an older official metric. Required local validations and CI outcomes are recorded in the updated PR. No main write, merge, force push, settings change or Pages deployment is authorised or performed.
