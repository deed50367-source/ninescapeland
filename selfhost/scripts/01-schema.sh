#!/usr/bin/env bash
# 01 重放数据库结构（在 VPS 上执行，/opt/supabase 目录下）
# 用法：APP_DIR=/opt/app bash 01-schema.sh
set -euo pipefail

APP_DIR="${APP_DIR:-/opt/app}"
COMPOSE_DIR="${COMPOSE_DIR:-/opt/supabase}"
MIG_DIR="$APP_DIR/supabase/migrations"

cd "$COMPOSE_DIR"
docker compose ps db | grep -q healthy || { echo "db 容器未 healthy，先 docker compose up -d"; exit 1; }

echo "==> 重放 $(ls "$MIG_DIR"/*.sql | wc -l) 个迁移文件"
for f in $(ls "$MIG_DIR"/*.sql | sort); do
  echo "---- $(basename "$f")"
  if ! docker compose exec -T db psql -v ON_ERROR_STOP=1 -U postgres -d postgres < "$f"; then
    echo "!! 失败：$(basename "$f")  —— 修好这一个再继续，不要跳过"
    exit 1
  fi
done

echo "==> 校验对象数量"
docker compose exec -T db psql -U postgres -d postgres -c "
select
 (select count(*) from information_schema.tables where table_schema='public' and table_type='BASE TABLE') as tables,
 (select count(*) from pg_policies where schemaname='public') as policies,
 (select count(*) from information_schema.routines where routine_schema='public') as functions;"
echo "预期：tables=17，policies>=40，functions>=6"
