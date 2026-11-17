#!/bin/bash
# Usage: checks/run.sh path/to/card.html
# Opens the card in headless Chrome, runs card-checks.js on #card and prints the result as JSON.
# Then lists hard-coded values found outside :root.
set -e
here="$(cd "$(dirname "$0")" && pwd)"
f="$(cd "$(dirname "$1")" && pwd)/$(basename "$1")"
tmp="$(mktemp -d)/run.html"
python3 - "$f" "$tmp" "$here/card-checks.js" <<'PY'
import sys
s=open(sys.argv[1]).read()
inj='<script src="file://%s"></script><script>window.addEventListener("load",function(){setTimeout(function(){var r=document.getElementById("card")||document.body;document.title=JSON.stringify(cardChecks(r))},800)})</script>' % sys.argv[3]
s=s.replace('</body>',inj+'</body>') if '</body>' in s else s+inj
open(sys.argv[2],'w').write(s)
PY
CHROME="${CHROME:-google-chrome}"
echo "Rendered checks:"
"$CHROME" --headless=new --no-sandbox --disable-gpu --allow-file-access-from-files --window-size=500,800 --virtual-time-budget=4000 --dump-dom "file://$tmp" 2>/dev/null \
  | grep -o '<title>.*</title>' | sed 's/<[^>]*>//g;s/&quot;/"/g;s/&amp;/\&/g;s/&gt;/>/g;s/&lt;/</g'
echo "Hard-coded values outside :root (first 12, then the count):"
python3 "$here/raw-values.py" "$f"
