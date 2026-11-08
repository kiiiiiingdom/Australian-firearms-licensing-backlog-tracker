# Official-source monitoring - 30 October 2026

Observation date: **2026-10-30, Australia/Adelaide**; original sources were retrieved on **29 October UTC** after local midnight. A network-authorised fetch succeeded. Actual main remains `f4eec2644b7a9c400be140283af5c903a99835a5`; the sole open monitoring [PR 16](https://github.com/kiiiiiingdom/Australian-firearms-licensing-backlog-tracker/pull/16) starts this run at `cbb8119cc306311e9a035b9fa0d970e0dccfe0d9`, with successful CI including strict MkDocs. Both main and the pending PR were checked for duplicates. The initially read-only run received explicit tool-granted write access to this repository before evidence/data edits. Existing branch commits are preserved.

## New SAPOL snapshot and same-series calculations

The directly opened [SAPOL status page](https://www.police.sa.gov.au/services-and-events/firearms-and-weapons/status-of-my-application) states **Updated (30 October 2026)**. Its three values are new to both main and PR 16. The previous valid snapshot is 23 October; the interval is seven actual calendar days, without interpolation.

| Existing series | Official processing date | Queue-date lag, days | Date advanced, days | Speed ratio | Lag change, days |
|---|---|---:|---:|---:|---:|
| New licence | 2026-03-16 | 228 | 19 | 2.7143 | -12 |
| Renewal | 2026-09-16 | 44 | 6 | 0.8571 | +1 |
| PTA | 2026-09-29 | 31 | 8 | 1.1429 | -1 |

Dates come from SAPOL; arithmetic is the project's calculation, not an official performance statistic. These are published queue-date lags, not averages, oldest pending cases, workforce efficiency or individual forecasts. SAPOL does not specify an online/manual PTA distinction on this table; the existing series is preserved. A search extract still showed the old 23 October page state and was excluded as verification of the new snapshot. The unverified 16 October historical leads remain excluded.

## Additional official administrative context

The [ACT FPO bill register](https://www.legislation.act.gov.au/b/db_74005) dates passage to **27 October 2026**, while still labelling the Act as awaiting notification. One `workflow_policy` / `legislative_status` row records that event, with the 30 October register-footer update separate. This does not establish notification, commencement or an available statutory power. Historical newsletter wording is preserved. The separate [Public Safety bill](https://www.legislation.act.gov.au/b/db_73940) still shows Before the Assembly. Register provenance and its unverified general reuse rights are recorded as the 21st structured source host.

The official [WA V2-0 training sheet](https://www.wa.gov.au/media/159424/download?inline=), directly linked from the [government index](https://www.wa.gov.au/organisation/western-australia-police-force/firearms-current-information-sheets), supplies one previously unarchived application-completion prerequisite. The row remains undated; the index's 28 October update does not date the PDF or underlying rule. It is not a waiting-time measure or a new commencement announcement. Only a short prerequisite sentence and independent scope notes are retained, with attachment-specific rights review pending.

Three new immutable extracts are saved under `evidence/SA/2026-10-30/`, `evidence/ACT/2026-10-30/` and `evidence/WA/2026-10-30/` before appending five observations. All 152 previous observations, all 26 staffing rows and historical evidence are retained. Totals become **157 observations + 26 staffing records = 183 records**, across **21 structured source hosts**. No private applicant data, employee contacts, whole page/PDF, imagery or signature is copied.

## Bounded eight-jurisdiction check and limitations

| Jurisdiction | Result |
|---|---|
| SA | New directly verified 30 October snapshot above; older evidence retained |
| VIC | Original licensing table retains the five 26 October values, with online/manual PTA separate; no duplicate rows |
| QLD | Original page retains the 18 October online means of 21 weeks and 20 days; no new mean inferred |
| NSW | Original monthly index still ends with September; NCAT review bill remains at second reading with debate adjourned. The official search redirects for Q8371/Q8372 returned HTTP 403, so their answers supply no verified observation; no repeated request through another backend |
| ACT | October Update 3 remains the latest listed newsletter; the original FPO bill register provides the passage event above |
| TAS | Original Service Tasmania page retains its undated up-to-two-month advisory; no statistical mean or backlog inferred |
| NT | Original parent page remains accessible; existing legal/workflow context and PR 16's historical recruitment row are deduplicated |
| WA | Main licensing page retains its 12 October update. The information-sheet index is updated 28 October; only the directly inspected, separately scoped training prerequisite is added |

Both generators regenerate all outputs. Queue comparisons, three SA histories, coverage freshness/record counts, the README processing figure and the ACT/SA/WA pages change where supported. Unaffected outputs are checked for reproducibility. All required local checks and the actual revised-head CI result are reported in PR 16. This run performs no main push, force-push, merge, repository-settings/licence change or Pages deployment. Discovery is bounded and missing archive entries do not prove that authorities have published nothing.
