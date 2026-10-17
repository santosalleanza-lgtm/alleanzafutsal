#!/usr/bin/env bash
# Publica a pasta simulados/ no Netlify: cria o site, grava as variáveis, liga o
# formulário com aviso por e-mail e faz o deploy das páginas e funções.
# Uso:
#   NETLIFY_AUTH_TOKEN=... DADOS_CHAVE=... CODIGO_SEGREDO=... ADMIN_SENHA=... \
#   NOTIFICAR_EMAIL=voce@exemplo.com ./scripts/deploy-simulados.sh [nome-do-site]
set -euo pipefail

: "${NETLIFY_AUTH_TOKEN:?defina NETLIFY_AUTH_TOKEN}"
: "${DADOS_CHAVE:?defina DADOS_CHAVE}"
: "${CODIGO_SEGREDO:?defina CODIGO_SEGREDO}"
: "${ADMIN_SENHA:?defina ADMIN_SENHA}"
NAME="${1:-simulados-hcpa}"
API=https://api.netlify.com/api/v1
AUTH="Authorization: Bearer $NETLIFY_AUTH_TOKEN"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
export NAME API NETLIFY_AUTH_TOKEN

SITE=$(curl -fsS -H "$AUTH" "$API/sites?name=$NAME&filter=all" |
  python3 -c "import sys,json,os;s=[x for x in json.load(sys.stdin) if x['name']==os.environ['NAME']];print(json.dumps(s[0]) if s else '')")
if [ -z "$SITE" ]; then
  echo "Criando site $NAME..."
  SITE=$(curl -fsS -H "$AUTH" -H 'Content-Type: application/json' -d "{\"name\":\"$NAME\"}" "$API/sites")
fi
SITE_ID=$(echo "$SITE" | python3 -c "import sys,json;print(json.load(sys.stdin)['id'])")
ACCOUNT=$(echo "$SITE" | python3 -c "import sys,json;print(json.load(sys.stdin)['account_slug'])")
export SITE_ID ACCOUNT

echo "Gravando variáveis de ambiente..."
python3 - <<'EOF'
import json, os, urllib.request
api, site, acc = os.environ["API"], os.environ["SITE_ID"], os.environ["ACCOUNT"]
h = {"Authorization": "Bearer " + os.environ["NETLIFY_AUTH_TOKEN"], "Content-Type": "application/json"}
def req(method, path, body=None):
    r = urllib.request.Request(api + path, method=method, headers=h,
                               data=json.dumps(body).encode() if body is not None else None)
    with urllib.request.urlopen(r) as resp:
        return json.loads(resp.read() or "null")
existentes = {v["key"] for v in req("GET", f"/accounts/{acc}/env?site_id={site}") or []}
for k in ("DADOS_CHAVE", "CODIGO_SEGREDO", "ADMIN_SENHA"):
    v = {"key": k, "values": [{"context": "all", "value": os.environ[k]}]}
    if k in existentes:
        req("PUT", f"/accounts/{acc}/env/{k}?site_id={site}", v)
    else:
        req("POST", f"/accounts/{acc}/env?site_id={site}", [v])
    print("  ", k)
EOF

echo "Ativando detecção de formulários..."
curl -fsS -X PATCH -H "$AUTH" -H 'Content-Type: application/json' \
  -d '{"processing_settings":{"ignore_html_forms":false}}' "$API/sites/$SITE_ID" >/dev/null

if [ -n "${NOTIFICAR_EMAIL:-}" ]; then
  export NOTIFICAR_EMAIL
  TEM=$(curl -fsS -H "$AUTH" "$API/hooks?site_id=$SITE_ID" |
    python3 -c "import sys,json,os;print(any(h.get('type')=='email' and h.get('data',{}).get('email')==os.environ['NOTIFICAR_EMAIL'] for h in json.load(sys.stdin)))")
  if [ "$TEM" = False ]; then
    echo "Criando aviso por e-mail para $NOTIFICAR_EMAIL..."
    curl -fsS -H "$AUTH" -H 'Content-Type: application/json' \
      -d "{\"site_id\":\"$SITE_ID\",\"type\":\"email\",\"event\":\"submission_created\",\"data\":{\"email\":\"$NOTIFICAR_EMAIL\"}}" \
      "$API/hooks" >/dev/null
  fi
fi

echo "Enviando deploy..."
cd "$ROOT/simulados"
npx -y netlify-cli@17.38.1 deploy --prod --dir . --functions netlify/functions --site "$SITE_ID" --message "deploy-simulados.sh"
