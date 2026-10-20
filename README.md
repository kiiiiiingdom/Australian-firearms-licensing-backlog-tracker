# Australian Firearms Licensing Backlog Tracker
### 澳大利亚枪证行政处理进度与积压追踪

Official-source research into administrative licensing queues, processing performance and staffing across all eight Australian jurisdictions.  
以政府、警方、议会和正式信息披露为证据，记录八个辖区的枪证办理情况、行政积压及人员能力。

**[National dashboard / 全国数据总览](docs/overview.md)** · **[State pages / 各州详情](docs/index.md)** · **[Contributing / 参与贡献](CONTRIBUTING.md)** · **[Methodology / 对比方法](docs/methodology/comparison-indices.md)**

## New licence queue-date comparison / 新证处理日期积压对比

![New licence queue-date lag comparison](docs/images/new-licence-backlog.svg)

**The chart measures the gap between an official reporting date and the published application date currently being processed. It is NOT actual completed-case average time or a ranking of police efficiency.**  
**图中衡量的是官方统计日与当前处理申请提交日之间的滞后天数，不是已结案申请平均耗时，更不是警员效率排名。**

[**Explore the full dashboard → / 查看完整全国总览 →**](docs/overview.md)

## Select a jurisdiction / 选择辖区

| | | | |
|:---:|:---:|:---:|:---:|
| [SA](docs/jurisdictions/SA.md) | [VIC](docs/jurisdictions/VIC.md) | [NSW](docs/jurisdictions/NSW.md) | [QLD](docs/jurisdictions/QLD.md) |
| [WA](docs/jurisdictions/WA.md) | [TAS](docs/jurisdictions/TAS.md) | [ACT](docs/jurisdictions/ACT.md) | [NT](docs/jurisdictions/NT.md) |

The [national dashboard](docs/overview.md) separates **processing-date age**, **official average processing times**, **within-series trends** and **staffing disclosures**. A selectable reference index = 1.00 is provided for comparable processing-date categories; this is not a single national efficiency score.

[全国总览](docs/overview.md)将**处理日期积压年龄**、**官方平均处理时间**、**各州自身历史趋势**和**官方人员数据**分别展示。同业务类别内可以选择基准值 1.00，但不将全部州强行转化为统一效率排名。

## Evidence, reproducibility and privacy / 证据、复现与隐私

- Primary evidence comes from Australian government, police, parliament, audit-office, and official disclosure sources. / 只使用官方公开材料核验数据。
- Every verified point links to a dated extract in [evidence/](evidence/) and the structured [observation CSV](data/observations.csv). / 每条已核实记录保留来源、报告日期与历史证据。
- [Staffing measures](data/staffing.csv) distinguish police/civilian headcount, FTE, positions, recruitment and ICT funding. / 人数、FTE、岗位、招聘和 ICT 预算不能混算。
- No personal applicant data, case references, individual queue placement or applicant-specific projections. / 不记录私人申请信息或提供个体审批时间预测。
- The repository is an evidence archive, not a live government feed or legal advice. / 仓库非政府实时系统，也不提供法律意见。

**Contribute:** Read [CONTRIBUTING.md](CONTRIBUTING.md) and the [standard AI research prompt](prompts/official-source-contributor.md). Contributions require independently checkable official sources and human review. / 欢迎以可核实官方来源提交 Issue 或 PR，入库前须人工审核。

**Technical:** Static documentation is configured with MkDocs Material (`mkdocs.yml`); local preview with `pip install -r requirements-docs.txt && mkdocs serve`. GitHub Pages publication and repository visibility are separate decisions and have **not** been enabled.

**Licensing:** Original repository software is [MIT licensed](LICENSE); the maintainers' original data compilation and charts are offered under [CC BY 4.0](DATA-LICENSE.md), to the extent rights are owned. This does **not** relicense third-party official excerpts. Citation metadata: [CITATION.cff](CITATION.cff).

**Publication:** Repository remains PRIVATE; [release gate and history audit](docs/release-checklist.md) are not complete. GitHub Pages deployment is manual and disabled for private repositories. / 仓库尚未公开；完整历史及发布安全审计未完成，不应提前对外发布。
