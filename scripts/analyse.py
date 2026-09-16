from __future__ import annotations

import csv
from datetime import date, datetime, timedelta
from pathlib import Path
from statistics import mean

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data" / "observations.csv"


def parse_date(value: str) -> date:
    return datetime.strptime(value, "%Y-%m-%d").date()


def load_rows() -> list[dict[str, str]]:
    with DATA.open(newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def compute(rows: list[dict[str, str]]) -> list[dict[str, object]]:
    output: list[dict[str, object]] = []
    previous = None

    for row in rows:
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

    return output


def rolling_speed(records: list[dict[str, object]], intervals: int = 3) -> float | None:
    speeds = [
        r.get("speed_ratio_calc")
        for r in records[-intervals:]
        if isinstance(r.get("speed_ratio_calc"), (int, float))
    ]
    return mean(speeds) if speeds else None


def estimate_target(records: list[dict[str, object]], target: date, intervals: int = 3) -> date | None:
    if not records:
        return None

    latest = records[-1]
    latest_observed = parse_date(str(latest["observation_date"]))
    latest_processing = parse_date(str(latest["processing_date"]))
    remaining = (target - latest_processing).days
    if remaining <= 0:
        return latest_observed

    speed = rolling_speed(records, intervals=intervals)
    if not speed or speed <= 0:
        return None

    return latest_observed + timedelta(days=round(remaining / speed))


def main() -> None:
    rows = load_rows()
    records = compute(rows)

    print("observation_date,processing_date,backlog_age_days,elapsed_days,advanced_days,speed_ratio")
    for r in records:
        print(
            f'{r["observation_date"]},{r["processing_date"]},'
            f'{r["backlog_age_days_calc"]},'
            f'{r.get("elapsed_days_calc", "")},'
            f'{r.get("processing_days_advanced_calc", "")},'
            f'{r.get("speed_ratio_calc", "")}'
        )

    target = date(2026, 6, 4)
    estimate = estimate_target(records, target, intervals=3)
    if estimate:
        print(f"\nEstimated reach date for 2026-06-04 using recent interval mean: {estimate.isoformat()}")
    else:
        print("\nInsufficient data for a stable reach-date estimate.")


if __name__ == "__main__":
    main()
