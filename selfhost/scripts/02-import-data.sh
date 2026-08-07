#!/usr/bin/env bash
# 02 导入业务数据 CSV（顺序按外键依赖，不能颠倒）
# 用法：把导出的 data/ 目录上传到 VPS，然后：
#   DATA_DIR=/opt/migration/data bash 02-import-data.sh
set -euo pipefail

DATA_DIR="${DATA_DIR:-/opt/migration/data}"
COMPOSE_DIR="${COMPOSE_DIR:-/opt/supabase}"
cd "$COMPOSE_DIR"

# 先导父表，再导子表
ORDER=(
  product_categories
  products
  product_variants
  asset_folders
  assets
  blog_posts
  blog_slug_redirects
  case_studies
  site_image_config
  site_image_config_logs
  quick_reply_templates
  whatsapp_clicks
  inquiries
  chat_sessions
  chat_messages
)

# 注意：user_roles / user_permissions 不在这里导入。
# 自建实例的 auth.users UUID 是新的，必须先用 create-admin 建号，
# 再手工按新 UUID 写 user_roles（见 06-recreate-admin.sh）。

for t in "${ORDER[@]}"; do
  f="$DATA_DIR/$t.csv"
  [ -f "$f" ] || { echo "跳过 $t（无文件）"; continue; }
  rows=$(( $(wc -l < "$f") - 1 ))
  echo "==> $t  ($rows 行)"
  docker compose exec -T db psql -v ON_ERROR_STOP=1 -U postgres -d postgres \
    -c "\copy public.$t FROM STDIN WITH CSV HEADER" < "$f"
done

# inquiries / chat_* 里的 assigned_to、replied_by 指向旧 auth.users，
# 旧 UUID 在新库不存在会违反外键 —— 先置空，后台不受影响。
docker compose exec -T db psql -U postgres -d postgres -c "
update public.inquiries set assigned_to=null where assigned_to is not null;
update public.chat_sessions set assigned_to=null where assigned_to is not null;
update public.chat_messages set replied_by=null where replied_by is not null;
update public.blog_posts set author_id=null where author_id is not null;"

echo "==> 行数核对"
docker compose exec -T db psql -U postgres -d postgres -c "
select 'products' t, count(*) from public.products
union all select 'blog_posts', count(*) from public.blog_posts
union all select 'assets', count(*) from public.assets
union all select 'inquiries', count(*) from public.inquiries
union all select 'site_image_config', count(*) from public.site_image_config;"
