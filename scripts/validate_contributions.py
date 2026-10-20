#!/usr/bin/env python3
"""Validate public administrative observations without rewriting historical data."""
from __future__ import annotations
import csv
from collections import defaultdict
from datetime import date
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
CSV = ROOT / "data" / "observations.csv"
EXPECTED = (ROOT / "templates" / "observations-header.csv").read_text(encoding="utf-8").strip().split(",")
JURISDICTIONS = {"ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"}
DATE_FIELDS = ("observation_date", "source_updated_date", "metric_date", "processing_date")
CALCS = ("backlog_age_days", "elapsed_days", "processing_days_advanced", "speed_ratio", "backlog_age_change_days")
ERRORS = []
WARNINGS = []

def date_or_none(value, location):
    if not value:
        return None
    try:
        return date.fromisoformat(value)
    except ValueError:
        ERRORS.append(f"{location}: invalid YYYY-MM-DD: {value!r}")
        return None

def err(row, message):
    ERRORS.append(f"CSV line {row}: {message}")

def main():
    with CSV.open(encoding="utf-8", newline="") as file:
        reader = csv.reader(file)
        columns = next(reader)
        if columns != EXPECTED:
            ERRORS.append("CSV header is not the approved 21-column schema")
            print_report()
            return 1
        rows = []
        for line, values in enumerate(reader, 2):
            if not values:
                continue
            if len(values) != len(columns):
                err(line, f"expected {len(columns)} columns, found {len(values)}")
                continue
            row = dict(zip(columns, values))
            row["_csv_line"] = line
            rows.append(row)
    seen = set()
    groups = defaultdict(list)
    for row in rows:
        line = row["_csv_line"]
        if row["jurisdiction"] not in JURISDICTIONS:
            err(line, "invalid jurisdiction")
        if not row["series"] or not row["authority"]:
            err(line, "authority and series are required")
        dates = {f: date_or_none(row[f], f"line {line} {f}") for f in DATE_FIELDS}
        if not dates["observation_date"]:
            err(line, "missing observation_date")
        if dates["source_updated_date"] and dates["observation_date"] and dates["source_updated_date"] > dates["observation_date"]:
            WARNINGS.append(f"CSV line {line}: source_updated_date after observation_date; review source")
        for field in ("source_url", "source_title", "metric_type"):
            if not row[field]:
                err(line, f"missing {field}")
        if row["source_url"] and not row["source_url"].startswith("https://"):
            err(line, "official source must use HTTPS URL")
        key = (row["jurisdiction"], row["series"], row["metric_date"] or row["source_updated_date"],
               row["metric_type"], row["source_url"])
        if key in seen:
            WARNINGS.append(f"CSV line {line}: possible duplicate series/date/source (check whether separate observations)")
        seen.add(key)
        if row["evidence_status"] == "verified":
            p = row["evidence_path"]
            if not p.startswith("evidence/") or not (ROOT / p).is_file():
                err(line, "verified entry missing existing evidence file")
            if not row["quoted_text"]:
                err(line, "verified entry missing exact quoted_text")
        if row["metric_type"] == "processing_date":
            if not dates["processing_date"]:
                err(line, "processing_date metric without processing_date")
            if row["metric_value"] or row["metric_unit"]:
                WARNINGS.append(f"CSV line {line}: processing_date usually has blank metric_value/metric_unit")
            effective = dates["metric_date"] or dates["source_updated_date"]
            if effective and dates["processing_date"]:
                age = (effective - dates["processing_date"]).days
                if row["backlog_age_days"] and row["backlog_age_days"] != str(age):
                    err(line, f"backlog_age_days {row['backlog_age_days']} != {age}")
            elif row["backlog_age_days"] or any(row[k] for k in CALCS[1:]):
                err(line, "derived fields require metric_date or source_updated_date")
            if dates["processing_date"] and effective:
                groups[(row["jurisdiction"],row["series"])].append((effective,dates["processing_date"],row))
        elif any(row[k] for k in CALCS):
            err(line, "non-processing-date metric must not have processing-date derived fields")
        if row["metric_type"].startswith("average_processing") and not row["metric_value"]:
            err(line, "average processing metric missing exact metric_value")
        for field in ("notes", "quoted_text"):
            v = row[field].lower()
            for marker in ("private application reference", "my licence number", "my application number"):
                if marker in v:
                    WARNINGS.append(f"CSV line {line}: possible private applicant detail; manual review required")
    for key, series in groups.items():
        series.sort(key=lambda x: x[0])
        previous = None
        for metric, processing, row in series:
            if previous:
                old_metric, old_processing = previous
                elapsed = (metric-old_metric).days
                advanced = (processing-old_processing).days
                age_change = (metric-processing).days - (old_metric-old_processing).days
                checks = {"elapsed_days": elapsed, "processing_days_advanced":advanced,
                          "backlog_age_change_days":age_change}
                for field, expected in checks.items():
                    if row[field] and float(row[field]) != expected:
                        err(row["_csv_line"], f"{field}: stored {row[field]} expected {expected}")
                if row["speed_ratio"]:
                    if elapsed <= 0:
                        err(row["_csv_line"], "speed ratio cannot use zero/negative elapsed period")
                    elif abs(float(row["speed_ratio"]) - advanced / elapsed) > .000051:
                        err(row["_csv_line"], "incorrect speed_ratio (must be rounded to 4 decimals)")
            previous = (metric,processing)
    print_report()
    return 1 if ERRORS else 0

def print_report():
    for w in WARNINGS:
        print("WARNING:",w)
    for e in ERRORS:
        print("ERROR:",e)
    print(f"Validation: {len(ERRORS)} error(s), {len(WARNINGS)} warning(s)")

if __name__ == "__main__":
    sys.exit(main())
