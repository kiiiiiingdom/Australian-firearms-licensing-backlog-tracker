# National dashboard / 全国总览

**Verified repository snapshots · Not live government queue estimates**  
**以下仅展示仓库已核实记录，非政府实时排队数据**。

<div class="hero-links"><a href="jurisdictions/SA/">South Australia</a><a href="jurisdictions/VIC/">Victoria</a><a href="methodology/comparison-indices/" class="secondary">Methodology / 方法</a></div>

## Queue-date backlog age / 处理日期积压年龄

Each panel represents **one business category**; queue-date lag is not completed-case average time, and the source as-at dates differ between states. / 各面板只比较同一业务类别，且官方统计日期可能不同。

### New licence / 新证

![New licence queue-date lag](images/new-licence-backlog.svg)

### Renewal / 续证

![Renewal queue-date lag](images/renewal-backlog.svg)

### Permit to acquire / PTA

![PTA queue-date lag](images/pta-backlog.svg)

## Interactive benchmark = 1.00 / 可选择基准值 1.00

Use the dropdowns to select an application type and reference jurisdiction. **This is a ratio of reported queue-date lags, not a ranking of staff efficiency.** / 选择业务类别与基准州；指数仅描述公开队列日期的相对滞后，不代表警员办事效率。

<div id="benchmark-comparison" class="compare-panel" data-source="assets/dashboard-data.json"><p>Loading verified snapshot / 加载已核实数据…</p></div>

## Official average-time series / 官方平均办理时间

![Average processing times (NSW and QLD)](images/average-time-overview.svg)

NSW and QLD use different statistical definitions and statutory waiting periods. These bars display days only as **visual scale conversion**, not an equivalent efficiency index. / 不同统计定义及法定等待期影响可比性，仅换算单位辅助阅读，不据此排名。

## Own-history indices / 相对于自身历史基期

![Within-series historical indices](images/historical-index.svg)

Each series uses its first positive verified backlog-age snapshot from September 2026 onward as its own reference = 1.00. **The dates differ**. / 各序列分别采用自 2026 年 9 月起最早已核实有效点为基准，基期并不一致。

## Evidence-linked staffing / 官方人员与处理能力

![Staffing disclosures](images/staffing-capacity-overview.svg)

[Staffing data](https://github.com/kiiiiiingdom/Australian-firearms-licensing-backlog-tracker/blob/main/data/staffing.csv) · [Staffing methodology](https://github.com/kiiiiiingdom/Australian-firearms-licensing-backlog-tracker/blob/main/analysis/staffing-methodology.md)

## Other jurisdictions / 其他辖区

ACT, NT, TAS and WA currently have policy, service-standard, throughput or point-in-time records but lack a sufficiently consistent current queue-date series for the national comparison. **Not published ≠ zero backlog.** / 缺少可比公开数据不代表没有积压。

[ACT](jurisdictions/ACT.md) · [NT](jurisdictions/NT.md) · [TAS](jurisdictions/TAS.md) · [WA](jurisdictions/WA.md)

[Metric definitions](methodology/comparison-indices.md) · [Data freshness](methodology/data-freshness.md)
