#!/usr/bin/env python3
"""Review candidates across historical Git blobs without printing matched private data.

Run only on a full (non-shallow) clone with remote PR head refs fetched separately.
This is a triage tool, not a certification that a repository is safe to publish.
"""
from __future__ import annotations

import argparse
from collections import Counter
import json
from pathlib import Path
import re
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
PATTERNS = {
    "credential_candidate": re.compile(
        rb"-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----"
        rb"|\b(?:ghp_|gho_|ghu_|ghs_|ghr_|github_pat_|AKIA|ASIA|AIza|xox[baprs]-)"
        rb"[A-Za-z0-9_\-]{12,}"
        rb"|(?i:aws_secret_access_key)[ \t]*[:=][ \t]*[A-Za-z0-9/+]{30,}"
    ),
    "email_candidate": re.compile(
        rb"\b[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}\b"
    ),
    "phone_candidate": re.compile(
        rb"(?<![0-9])(?:\+61[ -]?[23478]|0[23478])(?:[ -]?[0-9]){8}(?![0-9])"
    ),
    "personal_case_candidate": re.compile(
        rb"(?:applicant[_ -]?(?:id|name|email|phone|reference)"
        rb"|(?:licen[cs]e|application)[_ -]?(?:number|reference|id))"
        rb"[ \t]*[:=][ \t]*[^\s,;]{3,}", re.I
    ),
    "residential_address_candidate": re.compile(
        rb"(?:home address|residential address)[ \t]*[:=][ \t]*[^\r\n]{8,}", re.I
    ),
}
EXCLUDE_EMAIL_SUFFIXES = (b"@users.noreply.github.com",)
MAX_BLOB_BYTES = 25_000_000


def git(*args: str, payload: bytes | None = None) -> bytes:
    result = subprocess.run(
        ["git", *args], cwd=ROOT, input=payload,
        stdout=subprocess.PIPE, stderr=subprocess.PIPE,
        check=True,
    )
    return result.stdout


def collect_reachable_objects():
    if git("rev-parse", "--is-shallow-repository").strip() != b"false":
        raise ValueError("Shallow clone: complete Git history is required")
    refs = git("for-each-ref", "--format=%(refname)").decode("utf-8", "replace").splitlines()
    if not refs:
        raise ValueError("No Git refs were fetched")
    lines = git("rev-list", "--objects", "--all").decode("utf-8", "replace").splitlines()
    paths = {}
    object_ids = []
    for line in lines:
        oid, sep, name = line.partition(" ")
        if not oid:
            continue
        object_ids.append(oid)
        if sep and name:
            paths.setdefault(oid, name)
    uniq = list(dict.fromkeys(object_ids))
    details = git("cat-file", "--batch-check=%(objectname) %(objecttype) %(objectsize)",
                  payload=("\n".join(uniq) + "\n").encode()).decode().splitlines()
    blobs = []
    for line in details:
        parts = line.split()
        if len(parts) == 3 and parts[1] == "blob":
            blobs.append((parts[0], int(parts[2])))
    return refs, uniq, paths, blobs


def inspect_one(raw: bytes) -> dict[str, int]:
    matched = {}
    for key, pattern in PATTERNS.items():
        hits = pattern.findall(raw)
        if key == "email_candidate":
            hits = [h for h in hits if not h.lower().endswith(EXCLUDE_EMAIL_SUFFIXES)]
        if hits:
            matched[key] = len(hits)
    return matched


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--json", help="Private local JSON output path; never commit the report")
    parser.add_argument("--review-index", action="store_true",
                        help="Print only object IDs and finding classes for manual triage")
    parser.add_argument("--fail-on-credentials", action="store_true",
                        help="Nonzero exit if likely credential patterns are present")
    parser.add_argument("--require-clean", action="store_true",
                        help="Nonzero exit unless every candidate is reviewed or absent")
    args = parser.parse_args()
    try:
        refs, objects, paths, blobs = collect_reachable_objects()
    except (ValueError, subprocess.CalledProcessError, FileNotFoundError) as error:
        print("ERROR: full history and readable Git refs are required:", type(error).__name__,
              file=sys.stderr)
        return 2
    process = subprocess.Popen(
        ["git", "cat-file", "--batch"],
        cwd=ROOT, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE,
    )
    assert process.stdin and process.stdout
    process.stdin.write(("\n".join(oid for oid, _ in blobs) + "\n").encode())
    process.stdin.close()
    findings = []
    counters: Counter[str] = Counter()
    errors = 0
    for oid, expected_size in blobs:
        header = process.stdout.readline().decode("ascii", "replace").strip().split()
        if len(header) != 3 or header[0] != oid or header[1] != "blob":
            errors += 1
            break
        length = int(header[2])
        raw = process.stdout.read(length)
        process.stdout.read(1)
        if len(raw) != length or length != expected_size:
            errors += 1
            continue
        if length > MAX_BLOB_BYTES:
            matches = {"large_blob_manual_review": 1}
        elif b"\0" in raw[:4096] or raw[:4096].count(b"\x01") > 30:
            matches = {"binary_blob_manual_review": 1}
        else:
            matches = inspect_one(raw)
        if matches:
            findings.append({
                "blob_id": oid,
                "first_known_path": paths.get(oid, ""),
                "classes": matches,
                "size_bytes": length,
            })
            counters.update(matches)
    if process.stderr:
        process.stderr.close()
    returncode = process.wait()
    if returncode or errors:
        print("ERROR: unable to inspect every reachable blob", file=sys.stderr)
        return 2
    report = {
        "scope": "All locally reachable Git refs, including fetched PR heads",
        "ref_count": len(refs),
        "pulled_pr_ref_count": sum("/audit-pr/" in ref for ref in refs),
        "reachable_objects": len(objects),
        "unique_blobs_scanned": len(blobs),
        "unique_blobs_with_candidates": len(findings),
        "categories": dict(sorted(counters.items())),
        "findings": findings,
        "notice": "Candidate matches need manual review. Unfetched, remote-unreachable Git objects, Actions logs, and source copyright are outside scope.",
    }
    if args.json:
        Path(args.json).write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    print(f"History scan: {len(refs)} refs ({report['pulled_pr_ref_count']} PR refs), "
          f"{len(objects)} reachable objects, {len(blobs)} unique blobs.")
    print(f"Candidate blobs: {len(findings)}; categories: {json.dumps(report['categories'], sort_keys=True)}")
    if args.review_index:
        for match in findings[:100]:
            print("REVIEW_OBJECT", match["blob_id"], ",".join(sorted(match["classes"])))
        if len(findings) > 100:
            print("... review index truncated at 100; full index in private JSON output")
    if args.require_clean and findings:
        print("BLOCK: candidate historical information has not been cleared.", file=sys.stderr)
        return 1
    if args.fail_on_credentials and counters["credential_candidate"] > 0:
        print("BLOCK: possible credential patterns detected.", file=sys.stderr)
        return 1
    print("This candidate scan does NOT itself approve public release.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
