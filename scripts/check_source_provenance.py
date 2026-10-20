#!/usr/bin/env python3
"""Check provenance coverage and obvious unsafe structured data; not a copyright licence validator."""
from __future__ import annotations
import csv
from pathlib import Path
from urllib.parse import urlparse
import re
import sys

ROOT=Path(__file__).resolve().parents[1]
REGISTRY=ROOT/"docs"/"source-rights-register.md"
DATA=["data/observations.csv","data/staffing.csv"]
FAIL=[]
NOTE=[]
def main():
    text=REGISTRY.read_text(encoding="utf-8")
    hosts={}
    paths=[]
    for item in DATA:
        with (ROOT/item).open(encoding="utf-8",newline="") as handle:
            for line,row in enumerate(csv.DictReader(handle),2):
                raw=row.get("source_url","")
                parsed=urlparse(raw)
                host=parsed.hostname or ""
                if parsed.scheme!="https" or not host:
                    FAIL.append(f"{item}:{line}: official URL must be HTTPS")
                hosts[host]=hosts.get(host,0)+1
                ev=row.get("evidence_path","")
                if row.get("evidence_status")=="verified":
                    if not ev or not (ROOT/ev).is_file():
                        FAIL.append(f"{item}:{line}: verified evidence path missing")
                excerpt=row.get("quoted_text","")
                if len(excerpt.split())>40:
                    NOTE.append(f"{item}:{line}: long excerpt needs manual reuse review")
                if re.search(r"\b(?:[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,})\b",excerpt,re.I):
                    FAIL.append(f"{item}:{line}: email in published source quotation")
                if re.search(r"-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|(?:ghp_|github_pat_)[A-Za-z0-9_-]{12,}",excerpt):
                    FAIL.append(f"{item}:{line}: credential candidate")
    for host,count in sorted(hosts.items()):
        if f"| {host} |" not in text:
            FAIL.append(f"Unregistered official-source domain: {host}")
        print(f"PROVENANCE {host} {count}")
    for warning in NOTE:
        print("MANUAL_REVIEW:",warning)
    for error in FAIL:
        print("ERROR:",error)
    print(f"Source registry: {len(hosts)} hosts, {sum(hosts.values())} records, {len(FAIL)} error(s), {len(NOTE)} manual note(s).")
    if FAIL:return 1
    print("Source domain validation passed. ALL COPYRIGHT CLEARANCE STILL REQUIRES HUMAN REVIEW.")
    return 0
if __name__=="__main__":
    sys.exit(main())
