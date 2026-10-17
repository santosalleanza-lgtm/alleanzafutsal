#!/usr/bin/env bash
# Publica o site no Netlify pela API (sem CLI).
# Uso: NETLIFY_AUTH_TOKEN=... ./scripts/deploy-netlify.sh [nome-do-site]
set -euo pipefail

: "${NETLIFY_AUTH_TOKEN:?defina NETLIFY_AUTH_TOKEN}"
NAME="${1:-alleanzafutsal}"
API=https://api.netlify.com/api/v1
AUTH="Authorization: Bearer $NETLIFY_AUTH_TOKEN"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

SITE_ID=$(curl -fsS -H "$AUTH" "$API/sites?name=$NAME&filter=all" |
  python3 -c "import sys,json;s=[x for x in json.load(sys.stdin) if x['name']=='$NAME'];print(s[0]['id'] if s else '')")

if [ -z "$SITE_ID" ]; then
  echo "Criando site $NAME..."
  SITE_ID=$(curl -fsS -H "$AUTH" -H 'Content-Type: application/json' -d "{\"name\":\"$NAME\"}" "$API/sites" |
    python3 -c "import sys,json;print(json.load(sys.stdin)['id'])")
fi

ZIP=$(mktemp -d)/site.zip
(cd "$ROOT" && zip -qr "$ZIP" index.html netlify.toml img painel)

echo "Enviando deploy..."
curl -fsS -H "$AUTH" -H 'Content-Type: application/zip' --data-binary "@$ZIP" "$API/sites/$SITE_ID/deploys" |
  python3 -c "import sys,json;d=json.load(sys.stdin);print('Deploy', d['state'], '->', d.get('ssl_url') or d.get('url'))"
