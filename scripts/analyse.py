from __future__ import annotations

import csv
from collections import defaultdict
from datetime import date, datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data" / "observations.csv"


def parse_date(value: str) -> date:
    return datetime.strptime(value, "%Y-%m-%d").date()


def load_rows() -> list[dict[str, str]]:
    with DATA.open(newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def compute_processing_date_series(rows: list[dict[str, str]]) -> list[dict[str, object]]:
    grouped: dict[tuple[str, str], list[dict[str, str]]] = defaultdict(list)
    for row in rows:
        if row.get("metric_type") == "processing_date" and row.get("processing_date"):
            grouped[(row["jurisdiction"], row.get("series", "default"))].append(row)

    output: list[dict[str, object]] = []

    for _, series_rows in grouped.items():
        series_rows.sort(key=lambda r: r["observation_date"])
        previous = None

        for row in series_rows:
            observed = parse_date(row["observation_date"])
            processing = parse_date(row["processing_date"])
            backlog_age = (observed - processing).days

            record: dict[str, object] = {
                **row,
                "backlog_age_days_calc": backlog_age,
            }

            if previous:
                elapsed = (observed - previous["observed"]).days
                advanced = (processing - previous["processing"]).days
                speed = advanced / elapsed if elapsed else None
                record.update(
                    {
                        "elapsed_days_calc": elapsed,
                        "processing_days_advanced_calc": advanced,
                        "speed_ratio_calc": speed,
                        "backlog_age_change_days_calc": backlog_age - previous["backlog_age"],
                    }
                )

            output.append(record)
            previous = {
                "observed": observed,
                "processing": processing,
                "backlog_age": backlog_age,
            }

    output.sort(key=lambda r: (str(r["jurisdiction"]), str(r.get("series", "")), str(r["observation_date"])))
    return output


def main() -> None:
    rows = load_rows()
    records = compute_processing_date_series(rows)

    print(
        "jurisdiction,series,observation_date,processing_date,backlog_age_days,"
        "elapsed_days,advanced_days,speed_ratio"
    )
    for r in records:
        print(
            f'{r["jurisdiction"]},{r.get("series", "")},'
            f'{r["observation_date"]},{r["processing_date"]},'
            f'{r["backlog_age_days_calc"]},'
            f'{r.get("elapsed_days_calc", "")},'
            f'{r.get("processing_days_advanced_calc", "")},'
            f'{r.get("speed_ratio_calc", "")}'
        )


if __name__ == "__main__":
    main()
