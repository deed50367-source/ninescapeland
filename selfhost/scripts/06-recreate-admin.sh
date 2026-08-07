#!/usr/bin/env bash
# 06 在新实例重建后台账号并挂角色（旧库密码哈希搬不过来，必须重建）
# 用法：API=https://api... SRV=<service_role key> \
#       EMAIL=admin@xxx.com PASS='强密码' ROLE=admin bash 06-recreate-admin.sh
set -euo pipefail

API="${API:?}"; SRV="${SRV:?}"; EMAIL="${EMAIL:?}"; PASS="${PASS:?}"
ROLE="${ROLE:-admin}"   # admin | staff
COMPOSE_DIR="${COMPOSE_DIR:-/opt/supabase}"

echo "==> 创建用户 $EMAIL"
uid=$(curl -s -X POST "$API/auth/v1/admin/users" \
  -H "apikey: $SRV" -H "Authorization: Bearer $SRV" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASS\",\"email_confirm\":true}" \
  | sed -E 's/.*"id":"([0-9a-f-]{36})".*/\1/')

[ ${#uid} -eq 36 ] || { echo "创建失败，检查 SRV key 与 DISABLE_SIGNUP 设置"; exit 1; }
echo "    新 UUID: $uid"

echo "==> 写入 user_roles ($ROLE)"
cd "$COMPOSE_DIR"
docker compose exec -T db psql -v ON_ERROR_STOP=1 -U postgres -d postgres -c \
  "insert into public.user_roles(user_id, role) values ('$uid', '$ROLE')
   on conflict (user_id, role) do nothing;"

docker compose exec -T db psql -U postgres -d postgres -c \
  "select u.email, r.role from auth.users u join public.user_roles r on r.user_id=u.id order by r.role;"

echo "完成。用该邮箱密码登录 $SITE/admin 验证。"
