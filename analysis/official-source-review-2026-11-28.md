# Official-source monitoring - 28 November 2026

Retrieval/reinspection: 28 November 2026 UTC and Australia/Adelaide. Main f4eec2644b7a9c400be140283af5c903a99835a5 was freshly fetched and independently read. Open [PR 16](https://github.com/kiiiiiingdom/Australian-firearms-licensing-backlog-tracker/pull/16) head d6ba09d34e684a1160782e2b3b9d58e7ea5be7c8 is the second deduplication baseline. Contribution rules, evidence template, methodology, staffing definitions and current generators/checks were reviewed. Historical rows, evidence and commits remain preserved.

## New SAPOL evidence

The [original production status page](https://www.police.sa.gov.au/services-and-events/firearms-and-weapons/status-of-my-application) is updated 27 November: new licence 28 April 2026, renewal 29 October, PTA 12 October. Retrieval on 28 November does not replace that official metric/update date. Three new processing_date rows preserve the stable series and cite a unique minimal extract saved before CSV append. No online/manual channel split is invented.

Each adjacent comparison against the preserved 20 November snapshot spans seven real calendar days:

| Series | Prior processing date | Current processing date | Advance (days) | Current lag (days) | Speed ratio | Lag change (days) |
|---|---|---|---:|---:|---:|---:|
| New licence | 2026-04-13 | 2026-04-28 | 15 | 213 | 2.1429 | -8 |
| Renewal | 2026-10-26 | 2026-10-29 | 3 | 29 | 0.4286 | +4 |
| PTA | 2026-10-06 | 2026-10-12 | 6 | 46 | 0.8571 | +1 |

Date subtraction and the prior-lag identity were both checked before writing. No missing week is interpolated. The table is not a completion count, oldest-pending-case measure, staff efficiency ranking or individual approval/first-letter prediction; no interval-specific cause is supplied. Based on: South Australia Police material. Existing source rights conditions and document-specific human review remain explicit.

All three series/date/source keys are absent from main and the open PR. Totals become 206 observations + 28 staffing = 234 records across 22 existing hosts. All 203 previous observations, all staffing and 112 tracked evidence files are preserved. Only necessary factual cells and original summaries are saved, with no whole source page/PDF, imagery, signature or personal information.

## Other official checks and limitations

- [VIC licensing](https://www.police.vic.gov.au/firearms-licensing) remains updated 23 November: new 20 July, renewal 28 August, online PTA 06 November, manual PTA 09 November, imports 06 November. Five channels/series remain distinct.
- [QPS licensing](https://www.police.qld.gov.au/units/weapons-licensing) retains ONLINE means as at 22 November: 19 weeks new and 26 days PTA. The separately dated 8-9 December WAO/online-verification outage is already represented, with timezone/publication day unstated. [Weapons News](https://www.police.qld.gov.au/units/weapons-licensing/weapons-news) establishes no further new dated point. No casework closure, deadline extension or completed-maintenance event is inferred.
- [NSW monthly index](https://www.police.nsw.gov.au/about_us/information_of_interest_to_the_community/firearms_data) remains September/August/July, and its [Registry pressure/TOLA statement](https://www.police.nsw.gov.au/online_services/firearms) is unchanged.
- [NT firearms/weapons](https://pfes.nt.gov.au/police/firearmsweapons) retains existing service/legal and future mid-2028 NFR context, without a newly verified primary processing metric or exact-unit workforce figure.
- [WA licensing](https://www.wa.gov.au/organisation/western-australia-police-force/licensing-services-firearms) remains updated 13 November with the Cannington-office closure from 24 December 15:00 to 4 January 08:00. Office scope is not extended to back-office assessment; unrelated daily news does not date licensing statistics.
- [TAS NFR](https://fas.police.tas.gov.au/national-firearms-register/) retains the September-only project update and expected 2028 completion. The [bill record](https://www.parliament.tas.gov.au/bills/bills2026/firearms-amendment-strengthening-firearms-security-bill-2026-30-of-2026) still shows Council third reading on 19 November, an undated Assembly agreement and blank assent/Act fields. Existing eligibility proposals are not relabelled commenced law.
- [ACT A2026-19](https://www.legislation.act.gov.au/a/2026-19/) distinguishes sections 1-2 commencing 9 November 2026 from the remainder on 9 November 2027. The [Public Safety bill](https://www.legislation.act.gov.au/b/db_73940) remains before the Assembly and [Registry appointment guidance](https://police.act.gov.au/firearms/act-firearms-registry) is unchanged. Footer refreshes are not legal or statistical events.

The [SA disclosure index](https://www.police.sa.gov.au/about-us/proactive-disclosure) and focused official police/government/parliament/audit searches establish no further independently verified new workforce or administrative metric for this append. Search snippets, unanswered requests, third-party submissions, whole-agency headcounts, mixed programme funding and ICT funding are not converted into exact licensing staffing or measured performance. Earlier blocked SAPOL PDF, NSW question/budget, Council-PDF and robots leads were not retried or bypassed. SA 16 October and unrecovered intermediate snapshots remain excluded. This is not a claim of exhaustive government non-publication.

## Verification and publication

Both generators must regenerate all affected checked-in outputs, retaining category comparisons, comparable same-series histories and the eight-jurisdiction coverage matrix. Freshness uses official dates. All required schema/arithmetic, provenance, README/dashboard/history/site consistency, clean strict MkDocs, built-site and whitespace checks must pass before feature publication. Exact reviewed tree, commit and actual head-specific CI are recorded in the PR/private journal. No main push, force push, file deletion/move/rename, automatic merge, rules/settings/licence change or Pages deployment.
