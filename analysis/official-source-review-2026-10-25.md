# Official-source maintenance review - 25 October 2026

Observation date: 2026-10-25, Australia/Adelaide. Base `main`: `0c58c3c8ce06680d51298b2f8c95148638506be7`, re-fetched before the new branch was created. This review covers public administrative evidence, not individual applications.

## Newly archived observations

Fifteen independently checked observations are appended to the existing 21-column CSV, with five new dated text extracts. Historical rows and evidence are preserved. No new matching quantitative workforce measure was verified, so `data/staffing.csv` is unchanged.

| Jurisdiction and official metric date | Source measure | Published value | Calculated lag and change from prior archived matching series |
|---|---|---|---|
| SA, 23 October | New licence processing date | 25 February 2026 | 240 days; -14 over 14 days from 9 October |
| SA, 23 October | Renewal processing date | 10 September 2026 | 43 days; -6 over 14 days |
| SA, 23 October | PTA processing date | 21 September 2026 | 32 days; -12 over 14 days |
| VIC, 18 October | New licence processing date | 15 June 2026 | 125 days; -7 over 6 days from 12 October |
| VIC, 18 October | Renewal processing date | 11 August 2026 | 68 days; -5 over 6 days |
| VIC, 18 October | Online PTA processing date | 5 October 2026 | 13 days; -1 over 6 days |
| VIC, 18 October | Manual PTA processing date | 30 September 2026 | 18 days; +4 over 6 days |
| VIC, 18 October | Import processing date | 1 October 2026 | 17 days; +6 over 6 days |
| ACT, FY2025-26 ending 30 June | Registry budget / actual / service revenue | AUD 998,249 / 893,684 / 450,345 | Whole-unit finance; no queue or workforce calculation |
| ACT, answer signed 24 August | Digital registry delivery expectation | By July 2028 | Planning statement only |
| ACT, October newsletter; exact day unstated | Data remediation / enabling-bill development | Two workflow records | No exact source day or proven time saving inferred |
| TAS, processing notice undated | Application-delay advisory | Applications may take up to 2 months | Workflow advisory; not a measured average or guaranteed maximum |

SA's live [official table](https://www.police.sa.gov.au/services-and-events/firearms-and-weapons/status-of-my-application) directly confirms the 23 October date and values, resolving the former search-index/page conflict. The [VIC table](https://www.police.vic.gov.au/firearms-licensing) dates its figures to 18 October, while the whole-page footer says updated 19 October; those dates are stored separately. Online/manual/import channels remain distinct. Derived changes use the actual gaps between archived matching series, without weekly interpolation. The README visual generator is corrected so VIC's negative change renders with one minus sign. The coverage generator uses inline HTML line breaks inside cells so each jurisdiction stays on one Markdown table row; its former embedded newlines broke the fallback table and failed the whitespace check.

The [ACT QON No. 143 original PDF](https://www.parliament.act.gov.au/__data/assets/pdf_file/0008/3118247/QON-143-Answer-MPES-Firearms-MILLIGAN.pdf) was read and its financial columns and handwritten 24/8/26 signature date visually checked on rendered pages 2-3. The calculated budget-minus-actual difference, AUD 104,565, is noted only as arithmetic. Unit expenditure includes a broader registry remit and cannot be treated as licensing labour costs, staffing or efficiency. The new `administrative_finance` type is documented without changing the CSV schema.

The [October ACT program update](https://justiceandcommunitysafetydirectorate.cmail19.com/t/y-e-fthjiiy-hkcdruhlj-b/) was reached through the [official ACT Policing newsletter index](https://police.act.gov.au/firearms/national-firearms-register). Its author is the ACT Government Justice and Community Safety Directorate; the distribution host's official provenance is recorded explicitly. Neither an exact publication day nor a completed digital-registry go-live is established. The [Public Safety bill](https://www.legislation.act.gov.au/b/db_73940) and [Firearm Prohibition Orders bill](https://www.legislation.act.gov.au/b/db_74005) both remain listed Before the Assembly at retrieval, corroborating the newsletter's pending-legislation context; no commenced-law claim is added.

The [Service Tasmania delay notice](https://www.service.tas.gov.au/services/recreation-and-animals/firearms-gun-licence/apply-for-a-firearms-licence/) supplies the TAS advisory. Its fee-section update date is not used to date processing information. Exact source-date fields remain blank.

## Eight-jurisdiction follow-up and deduplication

| Jurisdiction | Official material inspected or searched | Outcome within this review |
|---|---|---|
| ACT | QON 143; October program update; official newsletter index; current bill register | Six new finance/planning/workflow rows, as above; no new exact-unit staffing count |
| NSW | [Registry service notice](https://www.police.nsw.gov.au/online_services/firearms); [official performance-report listing](https://www.police.nsw.gov.au/about_us/information_of_interest_to_the_community/firearms_data); official-source search for later reports | September remains the latest report listed; already archived. Processing-pressure explanation is already present. No duplicate or unverified October report added |
| NT | [Firearms/Weapons](https://pfes.nt.gov.au/police/firearmsweapons); [licence/permit information](https://pfes.nt.gov.au/police/firearmsweapons/licence-and-permit-information); official-source searches | Existing self-check precondition and June legislative context already archived. No new comparable dated queue/average/backlog or quantified exact-unit workforce point verified |
| QLD | [Weapons Licensing](https://www.police.qld.gov.au/units/weapons-licensing) | 18 October means remain 21 weeks for online new licences and 20 days for online PTA; both already archived. Short scheduled online-service outage is not treated as a processing-performance change |
| SA | Current official status table and targeted search for 16 October historical wording | Three 23 October rows added. The 16 October handoff leads could not be independently recovered as a preserved official snapshot and remain excluded |
| TAS | Service Tasmania licence page; [police RTI disclosure log](https://www.police.tas.gov.au/information-disclosure/right-to-information-disclosures/disclosures/disclosure-log/); official-source searches | One undated delay advisory added. Existing minimum/form-change/estimates context deduplicated; no released new quantified staffing figure verified |
| VIC | Current official licensing table | Five 18 October rows added; preserve the later page-update date separately |
| WA | [Licensing Services](https://www.wa.gov.au/organisation/western-australia-police-force/licensing-services-firearms); [permit page](https://www.wa.gov.au/service/security/law-enforcement/apply-firearms-permit); official government/parliament searches | Existing portal/permit/transition context deduplicated; no new comparable current queue/average/backlog or exact-unit workforce point verified |

These are bounded search/verification outcomes, not proof that an authority never published other data. An absent archive record remains absent rather than zero. The three-layer national comparator, same-series history and eight-jurisdiction evidence matrix are regenerated from verified rows. ACT financial records do not fill the staffing column; the TAS advisory does not fill the means or queue columns. Source-date freshness remains based on official dates, not retrieval dates.

## Review boundaries

Only minimal attributed text/cells and independently authored explanations are committed. No full official PDF, HTML page, image, signature, contact information, applicant data or private employee data is included. New source hosts are registered without asserting blanket copyright clearance. Individual-source rights review remains a human review item under the existing repository policy.

Validation outcomes and the final feature commit are recorded in the pull request. The PR requires maintainer review and the protected branch's `validate` CI check. Merging and GitHub Pages publication remain separate owner actions; this workflow does neither.
