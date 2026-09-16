# SAPOL Firearms Backlog Tracker

A longitudinal, evidence-first tracker for the South Australia Police (SAPOL) firearms licensing queue, with particular attention to new/first firearms licence applications.

## Purpose

This repository is intended to preserve and analyse SAPOL's own published processing-date information over time. It is designed to answer factual questions such as:

- What application date is SAPOL currently processing?
- How quickly is that date advancing relative to real time?
- Is the age of the backlog shrinking, growing, or remaining broadly stable?
- How does the estimated queue position change for an application submitted on **2026-06-04**?
- What official explanations, legislative changes, or staffing/workflow statements accompany the queue data?

The project does **not** assume misconduct, deliberate delay, or a fixed-backlog policy. Those are hypotheses that would require separate evidence. The repository distinguishes observed facts from calculations and interpretation.

## Repository structure

```text
data/observations.csv       Longitudinal observations and derived metrics
analysis/methodology.md     Definitions, formulas, evidence standards
scripts/analyse.py          Reproducible calculations from the CSV
evidence/README.md          Evidence capture and preservation rules
```

## Current historical seed points

The initial dataset includes three previously recorded SAPOL processing-date observations from August-September 2026. These rows are deliberately marked **provisional** until the corresponding official-page snapshot or archive is independently preserved in this repository.

Once a source snapshot is captured, the row should be upgraded to `verified` and linked to the relevant evidence path.

## Evidence principles

1. Preserve the exact official source URL and the page's stated update date when available.
2. Preserve the exact wording needed to verify the processing date.
3. Never overwrite historical evidence; add a new dated evidence directory for each observation.
4. Hash stored evidence files with SHA-256.
5. Keep observed facts separate from derived metrics and commentary.
6. Record official explanations that could contradict or qualify a simple backlog interpretation.
7. Do not infer intent from queue behaviour alone.

## Core metrics

- **Backlog age** = observation date - processing date
- **Processing advance** = current processing date - previous processing date
- **Elapsed real time** = current observation date - previous observation date
- **Effective speed ratio** = processing advance / elapsed real time

A speed ratio of roughly `1.0` means the processing date is moving forward at about the same pace as real time, so backlog age is broadly stable. Greater than `1.0` implies backlog age is shrinking; less than `1.0` implies backlog age is growing.

## Status

Private working repository. Public conclusions should only be made from rows with preserved, independently checkable evidence.