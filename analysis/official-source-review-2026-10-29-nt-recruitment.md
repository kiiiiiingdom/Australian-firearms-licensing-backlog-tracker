# Official-source follow-up - 29 October 2026 - NT recruitment

Observation date: **2026-10-29, Australia/Adelaide**. After workspace write access was restored, the normal sandbox fetch could not connect to GitHub. A network-authorised `git fetch origin main` then succeeded. Actual main remains `f4eec2644b7a9c400be140283af5c903a99835a5`. The sole open monitoring PR is [PR 16](https://github.com/kiiiiiingdom/Australian-firearms-licensing-backlog-tracker/pull/16), at `b32b297922e5d899a9d11a0e165f406423de713b` before this addition, with passing CI. This follow-up extends that branch without rewriting its existing commit. Main and the pending PR were both checked for duplicate sources and facts.

## Newly archived recruitment evidence

The original [NT Government Firearms Registry Team Leader notice](https://jobs.nt.gov.au/Home/JobDetails?rtfId=358166) directly identifies NT Police Force, the Firearms Policy and Recording Unit, and one advertised ongoing full-time AO6 role. No matching recruitment observation or evidence exists on main or in PR 16.

One `data/staffing.csv` row records `scope=exact_firearms_unit`, `metric_type=recruitment_positions` and `recruitment_positions=1`. All headcount, FTE, permanent/funded-position and current-vacancy fields remain blank. The source's employment classification does not justify converting this single advertised role into a staffing establishment or an FTE total.

The notice closed on **14 October 2026**. It was retrieved after closing and documents historical recruitment activity, not a currently open vacancy or an appointment outcome. Its closing date stays in evidence/notes. No advertisement-specific publication or as-at date is stated, so `as_of_date` is blank. The footer's software-version date is not used as a recruitment date.

New immutable extract: `evidence/NT/2026-10-29/registry-team-leader-recruitment.txt`. It retains only the short count field, original URL and independently written scope notes. No personal contact, applicant material, full advertisement or attached job description is reproduced. The government-domain source is registered as the 20th structured source host. The page's copyright footer and [general NT Government copyright notice](https://nt.gov.au/page/copyright-disclaimer-and-privacy) were inspected; no blanket open licence or completed human rights review is asserted.

All 152 existing observations, the 25 previous staffing rows and historical evidence are preserved. Totals become **152 observations + 26 staffing records = 178 records**, across **20 structured source hosts**. NT's staffing coverage becomes **undated**, with no invented source date or freshness age. The NT page gains the recruitment measure; queue comparisons and all six dated histories remain unchanged.

## Bounded eight-jurisdiction recheck

| Jurisdiction | Original source and result |
|---|---|
| SA | [SAPOL status table](https://www.police.sa.gov.au/services-and-events/firearms-and-weapons/status-of-my-application) retains the 23 October snapshot: new licence 25 February, renewal 10 September, PTA 21 September; already archived. No attributable 16 October history recovered |
| VIC | [Licensing table](https://www.police.vic.gov.au/firearms-licensing) retains the five 26 October values, including separate online/manual PTA; already archived |
| QLD | [Weapons Licensing](https://www.police.qld.gov.au/units/weapons-licensing) retains 18 October online means of 21 weeks and 20 days; already archived |
| NSW | [Report index](https://www.police.nsw.gov.au/about_us/information_of_interest_to_the_community/firearms_data) still ends with September; no new monthly report added |
| ACT | [NFR index](https://police.act.gov.au/firearms/national-firearms-register) still links October Update 3 as latest; existing context is deduplicated |
| TAS | [Service Tasmania](https://www.service.tas.gov.au/services/recreation-and-animals/firearms-gun-licence/apply-for-a-firearms-licence/) retains the undated up-to-two-month advisory; no statistical mean inferred |
| NT | [Original parent page](https://pfes.nt.gov.au/police/firearmsweapons) is accessible in this follow-up; existing amendments are deduplicated. Only the separately sourced recruitment advertisement adds a new record |
| WA | [Licensing Services](https://www.wa.gov.au/organisation/western-australia-police-force/licensing-services-firearms) retains the 12 October update; no new quantified processing/workforce point added |

This is a bounded check, not proof that other official records do not exist. Rechecking unchanged values does not create new observations. Both generators and all required validations, including strict MkDocs and built-site checks, are run for the revised branch; actual results and CI belong in PR 16. No protected-main write, force-push, merge, settings/licence change or Pages deployment is performed.
