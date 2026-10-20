# Reporting dates, provenance & freshness / 统计日期与时效

The website is generated from **verified records already committed to the repository**. It is not a live scrape and does not represent the current official queue unless the source's reporting date confirms that.

本网站展示的是仓库已核实、已入库的数据，并非实时政府页面。官方数据发布日期、统计期间与采集日期必须明确区分。

| Field | Meaning | Interpretation |
|---|---|---|
| `observation_date` | When a contributor viewed the source | Capture timestamp only |
| `source_updated_date` | When the official source says it was updated | Fallback date only when `metric_date` is missing |
| `metric_date` | Official as-at date or reporting-period endpoint | Preferred reference for backlog calculation |
| `processing_date` | Official application date currently being processed | Not a completed-applicant mean |
| `as_of_date` | Staffing disclosure's workforce snapshot date | Not the date an excerpt was collected |

Old official observations should not be labelled as contemporary staff headcount. A source's missing disclosure must be shown as `No comparable public series`, not zero.

每州指标必须注明官方统计日期。缺少数据意味着尚无可核实公开记录，不等于该州零积压或没有人员。

For detailed case definitions see the [processing methodology](https://github.com/kiiiiiingdom/Australian-firearms-licensing-backlog-tracker/blob/main/analysis/methodology.md) and [staffing methodology](https://github.com/kiiiiiingdom/Australian-firearms-licensing-backlog-tracker/blob/main/analysis/staffing-methodology.md).

**Privacy:** Never submit or publish a private applicant's details, individual queue placement, reference numbers or case-specific projections.
