# Official-source monitoring - 29 October 2026

Archive observation date: **2026-10-29, Australia/Adelaide**. This run began on 28 October UTC, after local midnight on 29 October. Fetched main is `f4eec2644b7a9c400be140283af5c903a99835a5`. PR 15 was previously merged by an explicitly authorised squash; its source tree is the current baseline. The live open-PR collection is empty, so deduplication uses main and there is no pending monitoring branch to extend. A fresh branch starts from this exact main commit.

## Newly verified workflow context

The original [TAFE SA Category AB course page](https://www.tafesa.edu.au/xml/course/sc/sc_T984450610.aspx) directly states a six-month training-completion window anchored to the approval letter's issue date. This source was not independently recoverable during the 28 October run; its substantive description was directly retrieved during this run. Earlier search extracts are not substituted for that retrieval.

One `workflow_policy` observation preserves the value **6**, unit **months**, and the provider/category/letter-issue anchor in its series, evidence and notes. No effective or update date is stated for this requirement, so both CSV source-date fields stay blank. Scheduled course dates do not become policy dates. This is a missing archive entry for an existing undated rule, not evidence that the rule began today. It is not licensing performance, a guaranteed waiting period, an application forecast, or verification of extension rights.

The [SA.GOV.AU provider listing](https://www.sa.gov.au/topics/education-and-learning/vocational-education-and-training/tafe-sa) establishes the government-run provider and its official domain. The [TAFE SA website copyright notice](https://www.tafesa.edu.au/copyright) was separately inspected; the new source-host registry entry preserves its CC BY 3.0 Australia scope and exceptions. No full course page, training curriculum, schedule, workbook, image or personal case material is copied.

New immutable extract: `evidence/SA/2026-10-29/tafesa-ab-training-completion-window.txt`. All 151 preceding observations, all historical evidence and all 25 staffing rows are preserved. The dataset becomes **152 observations + 25 staffing records = 177 records**, across **19 structured source hosts**.

## Bounded daily checks and deduplication

| Jurisdiction | Outcome |
|---|---|
| SA | Original SAPOL table still has the 23 October snapshot: new licence 25 February, renewal 10 September and PTA 21 September. Those values are already on main. No attributable 16 October historical snapshot recovered. Only the separately scoped TAFE SA workflow entry is new |
| VIC | Original page retains the five 26 October queue dates, including separate online and manual PTA channels; already archived |
| QLD | Original page retains 18 October online means: 21 weeks for new licences and 20 days for PTA; already archived. Known renewal/B709 and WLMS context is deduplicated |
| NSW | Original report index still ends with September. No new monthly report or comparable workforce measure independently verified in this bounded search |
| ACT | Original NFR index still links October Update 3 as latest. No new quantified queue, backlog or exact-unit workforce point independently verified |
| TAS | Original Service Tasmania page retains the undated up-to-two-month advisory already on main; no measured average or new backlog inferred |
| NT | Original parent page returned `Failed to fetch https://pfes.nt.gov.au/police/firearmsweapons: (400) Timeout fetching`. No retry through a different tool and no new verified row based on search snippets. This is a retrieval limitation, not evidence that no official data exists |
| WA | Original Licensing Services page retains the 12 October update. No new comparable processing or exact-unit staffing point independently verified |

Recent official-domain searches also checked for processing, backlog, workforce and reform leads. They do not constitute exhaustive discovery or prove that unarchived information was never published. Existing statistical series and source dates are not changed merely because they were checked again.

## Derived outputs and publication state

The new entry fills SA's previously empty workflow-context coverage as **undated**. It must not create a recent dated policy, average-time, backlog or staffing observation. All queue figures and history series remain based on their existing official dates. Both generators are run and their affected coverage/SA derivatives are included; unchanged outputs are checked for reproducibility.

The current source-rights register also corrects its stale present-tense statement that Pages has not launched. The [27 October release](https://github.com/kiiiiiingdom/Australian-firearms-licensing-backlog-tracker/actions/runs/40426911332) is already public and successful; acknowledging that state is not a new deployment or a claim of third-party legal clearance. Dated historical audits are not rewritten. This run performs no main write, merge, visibility/rules/licence change or Pages deployment. Required local checks and actual new-PR CI results are reported in the PR.
