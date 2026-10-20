#!/usr/bin/env python3
"""Read-only full Git-object and local Actions metadata scanner; never prints matched secrets."""
from __future__ import annotations
import argparse
import collections
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
PATTERNS={
    "potential_secret":re.compile(rb"-----BEGIN (?:RSA|EC|OPENSSH|DSA)? ?PRIVATE KEY-----|\b(?:ghp_|gho_|ghu_|ghs_|ghr_|github_pat_|AKIA|AIza|xox[baprs]-)[A-Za-z0-9_\-]{12,}"),
    "email":re.compile(rb"\b[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}\b"),
    "phone_candidate":re.compile(rb"(?<!\d)(?:\+61[ -]?[23478]|0[23478])(?:[ -]?\d){8}(?!\d)"),
    "private_applicant_candidate":re.compile(rb"(?:my|private|personal)[ _-]?(?:firearm|licen[cs]e|application)[ _-]?(?:date|id|number|reference)|applicant[ _-]?(?:email|name|phone|reference)[ :=]",re.I),
}
def git(*args):
    return subprocess.run(["git",*args],cwd=ROOT,stdout=subprocess.PIPE,stderr=subprocess.PIPE,check=True).stdout

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument("--json",dest="json_path",help="Write aggregate finding counts without raw sensitive values")
    ap.add_argument("--require-clean",action="store_true",help="Block publication if any candidate findings remain unreviewed")
    args=ap.parse_args()
    try:
        revisions=git("rev-list","--objects","--all").decode("utf-8","replace").splitlines()
        object_ids=list(dict.fromkeys(line.split(" ",1)[0] for line in revisions if line))
        batch=git("cat-file","--batch-all-objects","--batch-check=%(objectname) %(objecttype)").decode().splitlines()
    except (subprocess.CalledProcessError,FileNotFoundError) as e:
        print("ERROR: requires a local full Git clone with all refs and history:",e,file=sys.stderr)
        return 2
    known=set(object_ids)
    blob_ids=[]
    for row in batch:
        cols=row.split(" ")
        if len(cols)>=2 and cols[1]=="blob" and cols[0] in known:
            blob_ids.append(cols[0])
    counts=collections.Counter()
    flagged=[]
    for sha in blob_ids:
        try: raw=git("cat-file","blob",sha)
        except subprocess.CalledProcessError:counts["unreadable_blob"]+=1;continue
        if b"\x00" in raw[:4096]:
            counts["binary_blob_review_required"]+=1
            continue
        matched={name:len(list(pattern.finditer(raw))) for name,pattern in PATTERNS.items()}
        matched={k:v for k,v in matched.items() if v}
        if matched:
            counts.update(matched)
            flagged.append({"blob":sha,"types":matched})
    results={"audit_scope":"git rev-list --objects --all; current local refs only","reachable_blobs":len(blob_ids),"reachable_objects":len(known),"unreadable_blobs":counts["unreadable_blob"],"categories":dict(counts),"flagged_blobs":flagged,"disclaimer":"No actual matched values included. Manual review of findings, PR refs, GitHub Actions logs and stored artifacts remains mandatory."}
    if args.json_path:
        Path(args.json_path).write_text(json.dumps(results,indent=2)+"\n",encoding="utf-8")
    print("Git history candidate scan: "+str(len(blob_ids))+" reachable blobs, "+str(len(flagged))+" text blobs flagged.")
    for kind,count in counts.items(): print("Candidate class:",kind,"count",count)
    if args.require_clean and (flagged or counts["unreadable_blob"]):
        print("BLOCK: review all findings before public release.",file=sys.stderr)
        return 1
    return 0

if __name__=="__main__":
    sys.exit(main())
