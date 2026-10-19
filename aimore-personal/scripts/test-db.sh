#!/usr/bin/env bash
# Aplica a migração num PostgreSQL local que simula o Supabase e roda os testes de RLS.
# Uso: PGHOST=... PGPORT=... PGUSER=postgres ./scripts/test-db.sh
set -euo pipefail
cd "$(dirname "$0")/.."
DB=aimore_rls_test
psql -qc "drop database if exists $DB" -c "create database $DB"
psql -d "$DB" -v ON_ERROR_STOP=1 -q -f supabase/tests/supabase_shim.sql $(printf -- "-f %s " supabase/migrations/*.sql)
psql -d "$DB" -q -A -t -F ' => ' -f supabase/tests/rls_test.sql 2>&1 | grep -vE '^\{|^$'
