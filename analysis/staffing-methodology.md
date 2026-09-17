# Staffing and Capacity Methodology

## Purpose

This stream tracks publicly verifiable staffing and capacity information for Australian firearm licensing functions. The objective is to examine whether changes in administrative capacity are associated with changes in processing performance.

It does not assume that staffing levels alone determine processing times. Workflow design, legislation, ICT systems, application complexity, training requirements, quality controls, enforcement duties and temporary reallocations may also affect output.

## Preferred scope hierarchy

Staffing observations are classified by scope. Comparisons should prefer the narrowest equivalent scope available.

1. `exact_firearms_unit` — staff assigned directly to a firearms registry/licensing branch or equivalent.
2. `licensing_division` — a wider licensing/regulatory division that includes firearms plus other functions.
3. `parent_command` — a broader command or business area.
4. `whole_agency` — total police/department workforce; contextual only and not a proxy for licensing capacity.

A whole-agency workforce figure must never be compared directly with an exact firearms-unit figure as though they measure the same capacity.

## Staffing measures

Where available, preserve the authority's exact measure rather than converting between unlike measures:

- `headcount`
- `fte`
- `funded_positions`
- `vacancies`
- `sworn_headcount`
- `sworn_fte`
- `unsworn_headcount`
- `unsworn_fte`
- staff assigned specifically to new licences, renewals or permits to acquire

`headcount`, `FTE`, funded establishment and filled positions are different concepts and must not be substituted for one another.

## Evidence quality

- `verified`: an official source directly states the staffing measure and relevant scope/date.
- `provisional`: a contemporaneous value is known but the primary-source extract is not yet preserved.
- `context_only`: an official source discusses staffing pressure, shortages, reform or workforce structure without giving a directly usable count.
- `disputed`: official sources conflict or the scope cannot yet be reconciled.

## Source hierarchy

Preferred sources, in approximate order:

1. police/government operational or annual reports
2. parliamentary estimates, questions on notice and committee evidence
3. audit-office reports
4. official FOI/RTI disclosures and disclosure logs
5. budget papers and approved establishment documents
6. official recruitment notices, used only as vacancy/recruitment indicators

Media, industry and forum material may identify leads but should not be used as the primary basis for a verified staffing count.

## Capacity metrics

Where numerator and denominator are genuinely comparable, the project may calculate:

```text
pending_applications_per_fte = pending_applications / firearms_licensing_fte
applications_processed_per_fte = applications_processed / comparable_fte
```

These ratios must only be calculated when the staffing scope and workload scope substantially match and refer to compatible periods.

For example, it would be invalid to divide new-licence applications by the entire licensing division FTE if that division also handles unrelated regulatory functions and no allocation is known.

## Change analysis

Useful longitudinal questions include:

- Did backlog age change after an increase or decrease in relevant FTE?
- Did throughput change without a corresponding staffing change?
- Were vacancies filled before a measurable change in processing performance?
- Did a new ICT system or legislative reform coincide with a change in output independently of staffing?

Temporal association does not establish causation. Official explanations and other contemporaneous changes should be preserved alongside the data.

## Recruitment data

Vacancy advertisements are recorded only as evidence of recruitment activity. A vacancy count does not prove the number of current vacancies, filled positions, resignations or net workforce growth unless an official source explicitly states that relationship.

## Privacy

No individual employee names are required for this dataset. Where a source lists named personnel, the tracker should generally preserve only aggregate staffing information unless a named office-holder is necessary to understand an official organisational structure.