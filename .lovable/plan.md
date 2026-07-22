
# Google Ads 落地页方案（NinescapeLand · 2026-07-22）

投放前的核心目标：**广告 ↔ 落地页 1:1 对齐，质量得分拉高，询盘 CPA < $80**。基于上传的模版 HTML 和沟通截图，方案如下。

---

## 一、总原则（对齐甲方沟通确认点）

1. **5 条产品线各建 1 个专属落地页**，本次先做 Indoor Playground + Trampoline Park 两条（重点投放方向），Ninja / Soft Play / FEC 同模板批量克隆备用。
2. **承接落地页 = 站内聚合页**，不做外部独立站，保持与官网品牌/风格/Header/Footer 一致（甲方明确"会和官网一致的"）。
3. **落地页顶部产品线卡片链接产品页**（甲方明确"直接链接产品页，做站内链接"），并非跳到锚点表单。
4. **表单直接内嵌在落地页首屏右侧**，不用点击跳转。表单 / WhatsApp / Email 分别独立埋 3 个转化事件（甲方明确"分别设置一个跟踪转化"）。
5. **URL 结构**：`/lp/indoor-playground-equipment`、`/lp/trampoline-park-equipment` 等，`/lp/*` 前缀区分自然流量与付费流量，方便 GA4 分渠道分析、也避免污染 SEO 主聚合页。
6. **`/lp/*` 加 `noindex`**，广告落地页不参与 SEO 排名，避免与官网 `/products/*` 内容重复被判低质。

---

## 二、页面结构（沿用上传模版 + 官网组件）

每张落地页按以下 12 个模块，从上到下：

```text
1  TopBar：认证徽章条（ASTM · TUV · EN1176 · CE · ISO9001）
2  Nav：官网 Header（简化版，无多语言切换器，保留主要导航 + 顶部 CTA）
3  Hero 首屏：
   ├─ 左：H1 + 副标 + 4 个信任点 + 双 CTA（Get Free Quote / WhatsApp）
   └─ 右：内嵌询盘表单（Name / Email / Country / Project Type / Message）
4  Trust Bar：15+ Years · 2,000+ Projects · 50+ Countries · 50,000㎡ 工厂
5  Certifications Logos：6 枚认证 Logo
6  Product Lines：5 张产品线卡片（点击 → 对应产品页；非表单锚点）
7  Why NinescapeLand：8 项差异化卖点（工厂直供 / 3D 设计 / 25 天交付 / 3 年质保…）
8  Process：5 步交付流程（Consult → 3D Design → Manufacture → Ship → Install）
9  Case Studies：3 条国际客户证言 + 项目实拍（带国旗）
10 FAQ：6 条采购决策 FAQ（MOQ / 交期 / 付款 / 认证 / 售后 / 定制）
11 Bottom CTA：再次表单 + WA + Email 三键并列
12 Footer：与官网一致（精简版：产品 / 关于 / 联系 / Privacy / Terms）
   + Mobile Sticky CTA（WhatsApp + Get Quote 双按钮）
```

---

## 三、转化追踪（3 事件独立埋点）

| 事件 | 触发点 | Google Ads 转化 | GA4 事件 | 计价 |
|---|---|---|---|---|
| `lp_form_submit` | 表单成功提交后 | **主转化 ✓** | `generate_lead` | $50 |
| `lp_whatsapp_click` | 任意 WA 按钮点击 | 微转化 | `whatsapp_click` | $10 |
| `lp_email_click` | mailto 点击 | 微转化 | `email_click` | $10 |

- Google Ads 里只把 `lp_form_submit` 勾为 **Primary**，其余为 Secondary，避免智能出价被水化。
- Enhanced Conversions 开启（email/phone hash 回传），B2B 长决策周期必备。
- GTM 里给 3 个事件都带上 `campaign_slug`（如 `indoor-playground` / `trampoline-park`），后续按产品线分析 CPA。

---

## 四、本次交付范围（本周动手）

**第 1 批（本周上线，广告直投）**
- `/lp/indoor-playground-equipment`
- `/lp/trampoline-park-equipment`

**第 2 批（后续 1–2 周补齐）**
- `/lp/ninja-warrior-course-equipment`
- `/lp/soft-play-equipment`
- `/lp/fec-equipment`

统一使用一个新组件 `AdsLandingPage`（参数化：产品线名 / H1 / 卖点 / 产品线卡片 / FAQ / 图片），5 个 URL 全部走同一模板注入不同数据，避免维护 5 份重复代码。

---

## 五、SEO / 干扰隔离

- `/lp/*` 全部 `<meta name="robots" content="noindex,nofollow">`。
- 不进 `sitemap.xml`，不进 Header/Footer/MegaMenu（不与官网 SEO 页面竞争，也不做孤儿页面问题——它本来就不追求自然收录）。
- Canonical 指向自身（防误抓取被并入 `/products/*`）。
- 官网主 Header 保留 Products 下的产品页正常入口，广告流量与自然流量互不干扰。

---

## 六、投放前必修（沿用参考文档）

- [ ] Privacy / Terms / Warranty / Factory Address 4 页可访问（Google Ads 审查硬门槛）
- [ ] Hero 图压到 < 200KB，LCP < 2.5s
- [ ] 修正官网首页 `PlaygroundManufacturer` 拼写、移除 emoji 装饰
- [ ] 表单事件 `lp_form_submit` 绑 GA4 + Google Ads 转化，测通再上线
- [ ] Mobile Sticky CTA 不遮挡表单和 FAQ 内容

---

## 七、技术实现摘要（不涉及业务改动）

- 新增组件：`src/pages/AdsLandingPage.tsx`（通用模板）
- 新增 5 个数据文件：`src/config/adsLandingPages/{slug}.ts`（每个产品线一份数据）
- 路由：`src/App.tsx` 增加 `/lp/:slug` 路由（先注册 5 个 slug）
- 表单：复用现有 `ProductInquiryForm`（已接 Supabase inquiries 表），加参数 `source="ads_lp_{slug}"`
- 埋点：在表单提交 / WA / Email 三处调用 `window.gtag('event', ...)`；GTM 事件名单独注册

---

## 八、请甲方最终确认

1. **URL 前缀用 `/lp/`** 是否 OK？（也可用 `/ads/` 或 `/get-quote/`，`/lp/` 最短、语义最中性）
2. **本周先做 Indoor Playground + Trampoline Park 两个页面**，其余 3 个下周批量克隆，确认？
3. **落地页 Footer 精简版**（只保留产品 / 关于 / 联系 / Privacy / Terms）vs **与官网完全一致的完整 Footer**，选哪个？沟通截图里说"和官网一致"，我建议 **精简版**（付费流量落地页原则：减少一切与转化无关的链接），确认？
4. **首屏表单字段**：Name / Email / Country / Project Type / Message，5 项够用？Phone / WhatsApp 是否要设为必填？（B2B 建议 Phone 选填、WhatsApp 单独字段选填，降低填写摩擦。）

回复确认后（尤其 3、4 两条），我就直接搭建第 1 批 2 个页面。
