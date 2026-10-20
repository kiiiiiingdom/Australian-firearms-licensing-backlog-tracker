#!/usr/bin/env python3
"""Check locally rendered MkDocs site files for broken local links and leaked metadata.
Does not fetch external URLs, and is NOT privacy or legal clearance.
"""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import re
import sys

ROOT=Path(__file__).resolve().parents[1]
SITE=ROOT/"site"
EMAIL=re.compile(r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b")
SECRET=re.compile(r"-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|(?:ghp_|github_pat_)[A-Za-z0-9_-]{12,}")
class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.urls=[]
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        for key in ("href","src"):
            if key in a:
                self.urls.append((tag,key,a[key]))
def main():
    if not SITE.is_dir():
        print("ERROR: build site/ first",file=sys.stderr)
        return 2
    problems=[]
    files=list(SITE.rglob("*.html"))
    for file in files:
        content=file.read_text(encoding="utf-8")
        if SECRET.search(content):
            problems.append(f"{file.relative_to(SITE)}: credential-like content")
        # Email notices are review candidates, not necessarily leakage.
        emails=[x for x in EMAIL.findall(content) if not x.endswith("@users.noreply.github.com")]
        if emails:
            print(f"MANUAL REVIEW: {file.relative_to(SITE)} contains {len(emails)} email string(s)")
        parser=Links()
        parser.feed(content)
        for tag,key,link in parser.urls:
            url=urlsplit(link)
            if url.scheme or url.netloc or link.startswith(("mailto:","tel:","#","data:","javascript:")):
                continue
            path=unquote(url.path)
            if not path:
                continue
            # MkDocs site root: absolute links in this repo are expected to include project path.
            if path.startswith("/"):
                prefix="/Australian-firearms-licensing-backlog-tracker/"
                if path.startswith(prefix):
                    target=SITE/path[len(prefix):]
                else:
                    # Ignore intentional outbound absolute-site paths, but flag as manual review.
                    print(f"MANUAL REVIEW: absolute URL path {path} in {file.relative_to(SITE)}")
                    continue
            else:
                target=file.parent/path
            if target.is_dir():
                target=target/"index.html"
            if not target.exists():
                problems.append(f"{file.relative_to(SITE)}: missing {key} {path}")
    if len(files)<10:
        problems.append(f"Only {len(files)} rendered HTML pages; expected at least 10")
    for issue in problems[:60]:
        print("ERROR:",issue)
    print(f"Rendered site check: {len(files)} HTML pages, {len(problems)} problem(s).")
    if problems:
        return 1
    print("Local link/integrity check passed; external links and source rights require separate human review.")
    return 0
if __name__=="__main__":
    sys.exit(main())
