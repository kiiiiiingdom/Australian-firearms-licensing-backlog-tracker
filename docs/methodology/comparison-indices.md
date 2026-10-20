# Relative indices / 相对指数

**Status: descriptive research measures, not a ranking of real government efficiency.**  
**定位：这是官方公开数值的描述性比率，而非政府实际办事效率排行。**

## Three distinct measures / 三种不同指标

### 1. Queue-date backlog-age index / 处理日期积压指数

When an authority publishes a date of application currently being processed, define:

```text
backlog_age_days = official_metric_date - published_processing_date
relative_backlog_index = backlog_age_days / selected_reference_backlog_age_days
```

Dates are calendar days. If `metric_date` is missing, use an explicitly stated `source_updated_date`. **Never substitute an observation date without disclosure.** The reference must be positive. The default baseline is the lowest positive backlog-age point in the *same application category*; the national dashboard also offers a user-selected baseline.

统计日期与所公布的处理日期之间的天数表示队列日期滞后，而不是已结案申请的实际耗时。默认取同类业务中的最低有效滞后值为 1.00，也可以自行选择基准州。

A ratio of 1.92 means the published queue-date lag is 1.92 times the chosen reference point. **It does not imply 1.92 times worse staffing productivity or 1.92 times longer individual waiting.** Different legal steps, channels, case mix, source dates and reporting definitions may remain. Even matching categories are descriptive rather than strictly harmonised across states.

1.92 倍表示公开队列日期滞后为所选基准的 1.92 倍，**绝不代表警员效率低 1.92 倍，也不代表个人会等待 1.92 倍时间**。

### 2. Own-history index / 相对自身历史指数

```text
historical_index = latest_backlog_age_days / earliest_verified_backlog_age_days
```

Use the earliest nonzero, verified same-series observation **from September 2026 onward** for the initial comparison window (explicit baseline date in chart). Compare a series only with itself. Below 1.00 indicates an improvement from the historical baseline; above 1.00 an increase. Period starts differ between series and should not be treated as the same controlled experiment.

每个序列从 2026 年 9 月起选择最早具有有效数值的已核实记录作为自己的 1.00 基准。指数小于 1 表示该指标相对自身基期降低，不能作为各州效率优劣的证据。

### 3. Date-advancement ratio / 处理日期推进速率

```text
speed_ratio = (processing_date_current - processing_date_previous) /
              (metric_date_current - metric_date_previous)
```

Calculated only for successive comparable snapshots with positive elapsed calendar days. A ratio of 1.0 indicates backlog-age stability in that interval; greater than 1.0 shrinking backlog-age; less than 1.0 growing backlog-age. Zero advancement is not proof of deliberate stalling.

仅适用于官方处理日期序列。没有可比前后点、日期异常或业务定义改变时，不应计算。

## Excluded comparisons / 不允许的比较

- NSW and QLD publish **average times** with potentially different cohorts and statutory inclusions; do not treat their values as fully equivalent or give them a cross-state efficiency ranking.
- A legislated **minimum wait** is not an average, a queue date or current backlog evidence.
- An old point-in-time **backlog count** cannot be turned into a current delay without corresponding official throughput information.
- **FTE**, approved permanent positions, currently filled headcount, announced recruitment and ICT budget are not interchangeable.
- Relative indices must never be turned into applicant-specific approval predictions.

The charts display official-value dates and link to their supporting [observations](https://github.com/kiiiiiingdom/Australian-firearms-licensing-backlog-tracker/blob/main/data/observations.csv) and [staffing records](https://github.com/kiiiiiingdom/Australian-firearms-licensing-backlog-tracker/blob/main/data/staffing.csv).

## Interpretation / 解读

Interpret both numerical and source-level uncertainty. A persistent series is evidence of a persistent metric, **not** intent, misconduct or policy. To explore causes, record official staffing, case complexity, workflow rules, system limitations and legislative changes, and distinguish correlations from direct evidence.
