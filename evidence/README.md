# Evidence Preservation

Each observation should, where technically possible, have its own dated directory:

```text
evidence/YYYY-MM-DD/
```

Recommended files:

```text
metadata.json
source.txt
snapshot.html or snapshot.pdf
sha256.txt
```

## `metadata.json`

Suggested fields:

```json
{
  "observed_at": "2026-09-18T08:00:00+09:30",
  "source_updated_date": "2026-09-18",
  "processing_date": "2025-11-23",
  "source_url": "https://www.police.sa.gov.au/services-and-events/firearms-and-weapons/status-of-my-application",
  "source_title": "SAPOL - Status of my application",
  "quoted_text": "...",
  "capture_method": "official page fetch",
  "verification_status": "verified"
}
```

## Rules

- Preserve the exact source wording needed to verify the processing date.
- Prefer official SAPOL or South Australian Government sources.
- Do not overwrite earlier captures when the live page changes.
- If a binary snapshot is stored, calculate and preserve its SHA-256 hash.
- If a snapshot cannot be captured, store the metadata and exact source text that was actually observed, and say explicitly that no binary snapshot exists.
- Historical values without preserved source evidence remain `provisional` in `data/observations.csv`.
