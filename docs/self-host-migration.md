# 后端迁移到 Hostinger VPS(自建 Supabase)运行手册

目标:把当前托管后端(Postgres + Auth + Storage + Edge Functions)整体迁到自有 VPS,
前端仍部署在 Hostinger 主机 / 或同一台 VPS 的 Nginx 上。停机窗口安排在凌晨,预计 60–90 分钟。

---

## 0. 现有后端资产清单(迁移必须全部覆盖)

数据表(public):
`asset_folders`, `assets`, `blog_posts`, `blog_slug_redirects`, `case_studies`,
`chat_messages`, `chat_sessions`, `inquiries`, `product_categories`, `product_variants`,
`products`, `quick_reply_templates`, `site_image_config`, `site_image_config_logs`,
`user_permissions`, `user_roles`, `whatsapp_clicks`

视图:`chat_sessions_public`, `chat_sessions_staff`
数据库函数:`get_recent_inquiry_countries`, `get_staff_session_metadata`, `has_permission`, `has_role`
（以及所有 RLS 策略、触发器、`app_role` 枚举）

Auth:后台管理员账号(admin / staff),邮箱密码登录

Storage:产品图 / 博客图 / 素材库图片桶(前端多处 `storage.from(...)` 调用)

Edge Functions(5 个):
| 函数 | 作用 | 外部依赖 |
|---|---|---|
| `ai-chat` | 网站 AI 客服 | AI 模型 API Key |
| `translate-reply` | 客服回复翻译 | AI 模型 API Key |
| `bulk-translate-products` | 产品批量翻译 | AI 模型 API Key |
| `create-admin` | 创建后台账号 | service_role |
| `generate-sitemap` | 生成 sitemap | service_role |

> **关键风险点**:3 个 AI 函数目前用的是托管平台内置的 AI 网关密钥。
> 迁到自建服务器后该密钥不可用,**必须自备 OpenAI / DeepSeek / Gemini 的 API Key**,
> 并把函数里的模型调用地址与密钥换成自有的。这是迁移中唯一需要改代码的部分。

---

## 1. VPS 规格与前置准备

- 规格:最低 2 vCPU / 8GB RAM / 100GB SSD(Supabase 全栈容器约占 4–5GB 内存)。低于 8GB 会 OOM。
- 系统:Ubuntu 22.04 LTS
- 域名:新增子域名 `api.indoorplaygroundsolution.com` A 记录指向 VPS IP
- 防火墙:仅开放 22 / 80 / 443。**5432 与 8000 一律不对公网开放**,Postgres 只走本机。
- 安装:Docker Engine + Docker Compose plugin

```bash
apt update && apt -y upgrade
curl -fsSL https://get.docker.com | sh
apt -y install git nginx certbot python3-certbot-nginx
```

## 2. 部署自建 Supabase

```bash
git clone --depth 1 https://github.com/supabase/supabase /opt/supabase-src
mkdir -p /opt/supabase && cp -r /opt/supabase-src/docker/* /opt/supabase/
cd /opt/supabase && cp .env.example .env
```

`.env` 中必须自行生成并替换的值(不要用示例默认值):

| 变量 | 生成方式 |
|---|---|
| `POSTGRES_PASSWORD` | `openssl rand -hex 24` |
| `JWT_SECRET` | `openssl rand -hex 32`(至少 32 字符) |
| `ANON_KEY` / `SERVICE_ROLE_KEY` | 用上面的 JWT_SECRET 在 Supabase 官方 JWT 生成器签发,`exp` 设 10 年 |
| `DASHBOARD_USERNAME` / `DASHBOARD_PASSWORD` | 自定义强密码(Studio 后台登录) |
| `SITE_URL` | `https://indoorplaygroundsolution.com` |
| `API_EXTERNAL_URL` | `https://api.indoorplaygroundsolution.com` |
| `SUPABASE_PUBLIC_URL` | `https://api.indoorplaygroundsolution.com` |
| `SMTP_*` | 邮箱验证/找回密码用,填现有企业邮箱 SMTP |
| `DISABLE_SIGNUP` | `true`(后台账号由管理员创建,禁止公开注册) |

启动:`docker compose up -d`,`docker compose ps` 全部 healthy 后再继续。

## 3. Nginx 反代 + HTTPS

```nginx
server {
  server_name api.indoorplaygroundsolution.com;
  client_max_body_size 50m;              # 素材库上传大图必需
  location / {
    proxy_pass http://127.0.0.1:8000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Upgrade $http_upgrade;   # Realtime / 在线客服 WebSocket
    proxy_set_header Connection "upgrade";
  }
}
```

`certbot --nginx -d api.indoorplaygroundsolution.com` 签发证书。

## 4. 数据迁移(停机窗口内执行)

**顺序不能颠倒**:先关前端写入 → 导数据 → 导存储 → 切地址。

1. 停机公告:临时把线上 `.htaccess` 改为维护页,或直接接受表单短暂不可用。
2. 从现有后端导出(Lovable Cloud 侧:Cloud → Advanced settings → Export data 导出数据 CSV;
   结构则用仓库内 `supabase/migrations/` 全量迁移文件重放):
   ```bash
   # 在 VPS 上重放结构
   for f in supabase/migrations/*.sql; do
     docker compose exec -T db psql -U postgres -d postgres -f - < "$f"
   done
   ```
3. 导入数据 CSV(按外键顺序:categories → products → variants → blog_posts → 其余)。
4. Auth 用户:自建实例无法直接搬 `auth.users` 密码哈希。做法是用 `create-admin` 函数
   在新实例重建 admin / staff 账号并重设密码,再把 `user_roles` / `user_permissions`
   里的 `user_id` 更新为新 UUID。**账号数量少,重建比搬迁更稳。**
5. Storage:把旧桶里的图片全量下载后重新上传到新实例同名桶,并保持相同 object path
   (前端拼接的是 path,path 一致则无需改数据库里的图片字段;仅域名部分会随 URL 变量切换)。
   桶的 public/private 属性与 RLS 策略需按迁移文件里的原设置重建。

## 5. Edge Functions 迁移

```bash
# VPS 上安装 supabase CLI 后
supabase functions deploy ai-chat --project-ref <self-hosted> --no-verify-jwt
```
自建实例通过 `docker compose` 的 `functions` 容器托管,把 `supabase/functions/` 整个目录
挂载进容器即可。需要在 `.env` 或容器环境中提供:
`SUPABASE_URL=http://kong:8000`、`SUPABASE_ANON_KEY`、`SUPABASE_SERVICE_ROLE_KEY`,
以及**新的 AI API Key**(替换原 `LOVABLE_API_KEY`)。

## 6. 前端切换

前端不需要改代码,只改构建变量(已参数化,见 `.github/workflows/deploy.yml`):

在 GitHub 仓库 Settings → Secrets and variables → Actions 里设置:
- `VITE_SUPABASE_URL` = `https://api.indoorplaygroundsolution.com`
- `VITE_SUPABASE_PUBLISHABLE_KEY` = 新实例的 `ANON_KEY`
- `VITE_SUPABASE_PROJECT_ID` = `self-hosted`

推送一次即触发构建 + 预渲染 + 部署,前端全部指向新后端。

## 7. 切换后验证清单(逐项实测,不能只看首页)

- [ ] 首页 / 4 个产品聚合页 / 2 个 ADS 落地页 均 200 且 `#root` 正常挂载
- [ ] 询盘表单提交成功,`inquiries` 表出现新记录,GA4 `generate_lead` 触发
- [ ] WhatsApp 点击写入 `whatsapp_clicks`
- [ ] AI 客服能正常回话(验证新 AI Key 生效)
- [ ] 后台登录 → 产品/博客列表能读取 → 上传一张图能显示(Storage 通路)
- [ ] 6 种语言切换正常,博客详情页图片不 404
- [ ] `generate-sitemap` 函数可调用,sitemap.xml 内容完整
- [ ] 移动端(Android UA)实测落地页表单不被 Sticky CTA 遮挡

## 8. 迁移后的长期责任变化(需向上级说明)

- 数据库备份不再自动。必须建 cron:每日 `pg_dump` + 异地保存,并**实测恢复一次**。
- 安全更新需自己跟进容器镜像版本。
- 服务器宕机没有托管方兜底,建议配 UptimeRobot 监控 `api.` 子域名。
- 后续数据库结构变更不能再走平台迁移审批流,需手写 SQL 直接在 VPS 执行,
  并同步提交到 `supabase/migrations/` 保持版本可追溯。

## 9. 回滚方案

旧后端在确认新环境稳定运行 7 天前不要删除。回滚只需把 GitHub Secrets 里的
`VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY` 改回旧值并重新部署,约 5 分钟生效。
切换期间新产生的询盘需手工从新库补录回旧库。
