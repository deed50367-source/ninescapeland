# 后端迁移执行包(selfhost)

配套文档:`docs/self-host-migration.md`(方案与风险)。本目录是**可直接执行的脚本**。

## 已完成的准备工作

数据已从现有后端全量导出为 CSV(共 17 张表),导出结果在会话的下载文件里
`backend-migration/data/*.csv`。实际行数:

| 表 | 行数 | 表 | 行数 |
|---|---|---|---|
| assets | 3034 | blog_slug_redirects | 492 |
| blog_posts | 784 | asset_folders | 324 |
| whatsapp_clicks | 80 | products | 56 |
| site_image_config | 39 | inquiries | 10 |
| chat_sessions | 9 | case_studies | 8 |
| quick_reply_templates | 7 | product_categories | 3 |
| chat_messages | 3 | user_roles | 2 |
| product_variants / site_image_config_logs / user_permissions | 0 | | |

存储桶 `assets`(public):**3168 个对象,约 8.0 GB** —— 这是迁移里最耗时的一步,
按 100Mbps 上下行估算 30–50 分钟,必须在 `screen` 里跑 `03-storage-sync.mjs`。

## 执行顺序(不能颠倒)

```bash
# ── 迁移前(不影响线上,可提前几天做)────────────────────
# 1. VPS 装 Docker,克隆 supabase/docker 到 /opt/supabase
# 2. cp selfhost/.env.example /opt/supabase/.env  并逐项填写
# 3. cp selfhost/docker-compose.override.yml /opt/supabase/
# 4. 仓库 clone 到 /opt/app(functions 目录要挂进容器)
# 5. cp selfhost/nginx/api.conf /etc/nginx/sites-available/ && certbot
docker compose up -d && docker compose ps        # 必须全部 healthy

APP_DIR=/opt/app bash selfhost/scripts/01-schema.sh          # 重放 56 个迁移文件

# ── 停机窗口(60–90 分钟,建议凌晨)────────────────────
DATA_DIR=/opt/migration/data bash selfhost/scripts/02-import-data.sh

OLD_URL=... OLD_KEY=... NEW_URL=https://api.indoorplaygroundsolution.com NEW_KEY=... \
  node selfhost/scripts/03-storage-sync.mjs                  # 8GB,screen 里跑

API=... SRV=... EMAIL=... PASS=... ROLE=admin \
  bash selfhost/scripts/06-recreate-admin.sh                 # 重建后台账号

# ── 前端切换 ────────────────────────────────────────
# GitHub → Settings → Secrets and variables → Actions 设三个值:
#   VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY / VITE_SUPABASE_PROJECT_ID
# deploy.yml 已参数化(第 42–44 行),设完推一次即生效

API=... ANON=... bash selfhost/scripts/05-verify.sh           # 24 项自动验收

# ── 迁移后当天必须做 ──────────────────────────────────
cp selfhost/scripts/04-backup.sh /opt/backup.sh && chmod +x /opt/backup.sh
crontab -e   #  15 3 * * * /opt/backup.sh >> /var/log/pgbackup.log 2>&1
```

## 三个必须提前知道的坑

1. **账号搬不过去**。`auth.users` 的密码哈希无法迁移,admin/staff 必须用
   `06-recreate-admin.sh` 重建并重设密码。因此 `user_roles` / `user_permissions`
   的 CSV **不导入**(旧 UUID 在新库不存在),由脚本按新 UUID 重新写入。
   同理 `inquiries.assigned_to`、`chat_*.replied_by`、`blog_posts.author_id`
   会被置空(脚本已处理),不影响前台展示。

2. **图片变换参数**。前端多处用了 `?width=&quality=` 图片变换,托管版自带,
   自建版需要 imgproxy 容器正常起来,否则图片会 404 或返回原图(带宽暴涨)。
   验收脚本第 4 项专门查这个。

3. **AI 函数密钥**。已改成走硅基流动(`AI_PROVIDER=siliconflow`),
   `.env` 里必须填 `SILICONFLOW_API_KEY`,否则 AI 客服 / 翻译 / 批量翻译三处报 500。

## 回滚

旧后端在新环境稳定 7 天内不要删。回滚 = 把 GitHub Secrets 三个值改回旧值重新部署,
约 5 分钟生效;切换期间新产生的询盘需从新库手工补录。
