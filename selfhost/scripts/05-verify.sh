#!/usr/bin/env bash
# 05 切换后的接口连通性验收（在任意机器上跑）
# 用法：API=https://api.indoorplaygroundsolution.com ANON=<anon key> bash 05-verify.sh
set -uo pipefail

API="${API:?需要 API=https://api....}"
ANON="${ANON:?需要 ANON=<anon key>}"
SITE="${SITE:-https://indoorplaygroundsolution.com}"
pass=0; fail=0

check() { # 名称 期望码 实际码
  if [ "$2" = "$3" ]; then echo "  OK   $1 ($3)"; pass=$((pass+1));
  else echo "  FAIL $1 期望 $2 实际 $3"; fail=$((fail+1)); fi
}
code() { curl -s -o /dev/null -w '%{http_code}' "$@"; }

echo "== 1. 健康检查"
check "auth 健康" 200 "$(code "$API/auth/v1/health")"
check "rest 根" 200 "$(code -H "apikey: $ANON" "$API/rest/v1/")"

echo "== 2. 匿名可读表（前端首页依赖）"
for t in products product_categories blog_posts case_studies site_image_config; do
  check "读 $t" 200 "$(code -H "apikey: $ANON" "$API/rest/v1/$t?select=id&limit=1")"
done

echo "== 3. 敏感表必须被 RLS 挡住（返回空数组，不是数据）"
n=$(curl -s -H "apikey: $ANON" "$API/rest/v1/inquiries?select=id&limit=5" | tr -cd '{' | wc -c)
check "inquiries 匿名不可读" 0 "$n"
n=$(curl -s -H "apikey: $ANON" "$API/rest/v1/user_roles?select=id&limit=5" | tr -cd '{' | wc -c)
check "user_roles 匿名不可读" 0 "$n"

echo "== 4. Storage 公共读"
img=$(curl -s -H "apikey: $ANON" "$API/rest/v1/assets?select=file_path&limit=1" | sed -E 's/.*"file_path":"([^"]+)".*/\1/')
[ -n "$img" ] && check "图片可访问 $img" 200 "$(code "$API/storage/v1/object/public/assets/$img")"

echo "== 5. Edge Functions"
check "ai-chat 可达(OPTIONS)" 200 "$(code -X OPTIONS "$API/functions/v1/ai-chat")"
check "generate-sitemap" 200 "$(code -H "Authorization: Bearer $ANON" "$API/functions/v1/generate-sitemap")"

echo "== 6. 前端页面"
for p in / /products/ /lp/indoor-playground-equipment/ /lp/trampoline-park-equipment/ /sitemap.xml; do
  check "页面 $p" 200 "$(code "$SITE$p")"
done

echo
echo "通过 $pass 项，失败 $fail 项"
[ "$fail" -eq 0 ] || exit 1
