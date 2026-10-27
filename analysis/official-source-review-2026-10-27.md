# Official-source monitoring - 27 October 2026

Observation date: 2026-10-27, Australia/Adelaide. Fetched protected main remains `0c58c3c8ce06680d51298b2f8c95148638506be7`; existing unmerged [PR 15](https://github.com/kiiiiiingdom/Australian-firearms-licensing-backlog-tracker/pull/15) starts this run at `ec83eb24d982502bb21f839020b64716e7275a44` with successful validation. Both main and all open PRs were checked before deduplication. The earlier commits and evidence are preserved.

## Newly verified administrative-review proposal

The [NSW Parliament bill tracker, bill 18957](https://www.parliament.nsw.gov.au/parliamentary-business/bills/bill-details?billId=18957), directly confirms that the Firearms Amendment (Administrative Reviews by NCAT) Bill 2026 was introduced on **15 October 2026**. Its displayed status is Legislative Assembly second reading, debate adjourned. The linked official explanatory note and introduced bill text establish that the proposal concerns NCAT administrative review of certain Commissioner of Police firearms decisions, with specified categories and exclusions.

One missing observation is added as `workflow_policy`, unit `proposal`, with an explicitly pending/proposed value. The official introduction date is its metric date; **27 October is only the retrieval date**. It is not recorded as commenced `legal_policy`, an available individual review entitlement, an improvement in queue time, or any workforce/count metric. The surrounding tracker calendar is dated 25 October, so the status is described as the retrieved official page state rather than a real-time legislative certificate. Generic passage-form text on the first-print cover is not taken as proof of passage or assent.

New extract: `evidence/NSW/2026-10-27/ncat-administrative-review-bill-proposal.txt`. The explanatory note was also rendered and visually checked. Only minimal tracker and explanatory-note fragments are retained; no original PDF, image, crest, full speech, applicant information or private employee data is committed. Existing Parliament-specific source-rights limitations remain applicable.

All 150 earlier observations and staffing.csv are unchanged. The archive now contains **151 observations + 25 staffing records = 176 records**, still across 18 structured source hosts. Methodology clarifies proposal classification and parliamentary-event dating without changing CSV columns or the site's seven coverage categories.

## Daily source checks

| Jurisdiction | Outcome in this bounded review |
|---|---|
| SA | Direct official page still shows 23 October: new licence 25 February, renewal 10 September, PTA 21 September; already in PR 15. No independently preserved 16 October snapshot recovered |
| VIC | Direct official table still shows the five 26 October dates already in PR 15; no duplicate rows or recalculation using today's capture date |
| QLD | Direct page still reports 18 October means: 21 weeks online new licence, 20 days online PTA; already on main |
| NSW | Monthly report listing still ends with September, already on main. New archive addition is the 15 October review-bill proposal, not a new processing statistic |
| ACT | NFR index still links October Update 3 as its latest edition; the Public Safety and Firearm Prohibition Orders bill pages still display Before the Assembly. These already support PR 15's existing context |
| TAS | Direct Service Tasmania notice retains the undated up-to-two-month advisory already in PR 15. No statistical mean or current backlog inferred |
| NT | Existing Firearms/Weapons page was retrieved; targeted official-source searching did not establish a new independently verifiable processing/backlog/staffing point. No expected-date phrase match was found; no absence-of-publication claim made |
| WA | Licensing Services page retains a 12 October page-update notice; official searches surfaced existing transition/permit information. No new comparable quantified processing/workforce point verified |

The source checks do not claim exhaustive discovery or that absent metrics were never published. The proposed NSW review record updates workflow-context coverage using its original 15 October event date; it does not fill queue, means, backlog or staffing cells. Generators refresh every affected checked-in derivative; unchanged category comparisons and histories are verified unchanged. Full required validations, strict MkDocs and actual CI results are recorded in PR 15. Protected main, branch rules, visibility, licences and Pages remain untouched; no merge is performed.
