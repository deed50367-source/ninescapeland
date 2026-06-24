## 本周新增聚合页面方案（4个）

### 去重说明
已查询现有路由，以下关键词**已有页面，本次不重复建**：
- `cost of building a custom indoor playground` → 已有 `/custom-indoor-playground-cost`
- `inclusive indoor playground design for autism` / sensory → 已有 `/sensory-inclusive-play`、`/indoor-pe-equipment-for-schools`
- Montessori / Homeschool / Summer Camp / PE → 已有上周4个页面

下面4个页面对应文档中尚未覆盖、且潜力 S/A 的关键词，全部为新主题、新文案、新内部链接锚点。

---

### 1. `/how-to-start-an-indoor-playground-business`
- **目标关键词**：how to start an indoor playground business（S，commercial，low comp）
- **H1**：How to Start an Indoor Playground Business in 2026 — Step-by-Step Guide
- **Title (<60)**：How to Start an Indoor Playground Business | 2026 Guide
- **Meta (<160)**：Step-by-step plan to launch an indoor playground: budget, site, ASTM/TUV-certified equipment, ROI, licensing. Free 3D design support.
- **布局**：
  1. Hero：痛点 + "Get Free 3D Design" CTA（WhatsApp 8615058782901）
  2. 9-step roadmap（市场调研 → 选址 → 预算 → 设备采购 → 认证 → 装修 → 营销 → 开业 → 运营）
  3. Startup Cost Breakdown 表格（小/中/大型）
  4. Equipment Checklist（按区域：soft play / ninja / trampoline / toddler）
  5. Licensing & Insurance（美/英/加/澳常见要求）
  6. ROI 预期（链接到现有 ROI 页）
  7. FAQ（10条）+ FAQPage JSON-LD
  8. 内链 CTA：Custom Cost、Trampoline Park FEC、Investment Opportunity

### 2. `/educational-benefits-of-indoor-play-centers`
- **目标关键词**：educational benefits of indoor play centers（A，informational，low comp）
- **H1**：Educational Benefits of Indoor Play Centers — Research-Backed Guide for Schools & Operators
- **Title**：Educational Benefits of Indoor Play Centers | Research Guide
- **Meta**：Discover how indoor play centers boost cognitive, social, and motor development. Evidence-based equipment recommendations for schools and operators.
- **布局**：
  1. Hero + key stat 模块（4个核心收益）
  2. 5 Developmental Domains（Cognitive / Social-Emotional / Physical / Sensory / Language）—— 每块配设备示例
  3. Age-band benefit matrix（0-3 / 3-6 / 6-12）
  4. Case Snippets（学校/早教/社区）
  5. Equipment-to-Benefit Map（链到现有 PE / Montessori / Sensory 页）
  6. FAQ + Article JSON-LD
  7. CTA：定制方案

### 3. `/trampoline-park-safety-standards`
- **目标关键词**：safety standards for trampoline park equipment（A，informational，medium comp）
- **H1**：Trampoline Park Safety Standards — ASTM F2970, TUV & EN 13219 Explained
- **Title**：Trampoline Park Safety Standards (ASTM, TUV, EN) 2026
- **Meta**：Complete compliance guide to trampoline park equipment: ASTM F2970, TUV, EN 13219. Inspection checklists, padding specs, operator duties.
- **布局**：
  1. Hero + 认证徽章
  2. Standards Overview 表（ASTM F2970 / TUV / EN 13219 / IAAPA）
  3. Equipment-level requirements（bed, springs, pads, walls, foam pit, dodgeball, ninja addon）
  4. Operator compliance checklist（下载锚点）
  5. Common violations & how to fix
  6. Why NinescapeLand —— 我们的全套认证证书
  7. FAQ + Article + BreadcrumbList JSON-LD
  8. 内链：Trampoline Park、Trampoline Park FEC、Safety Certifications

### 4. `/custom-soft-play-equipment-manufacturer-for-schools`
- **目标关键词**：custom soft play equipment manufacturer for education（A，transactional，low comp）+ "sensory play equipment for schools" 长尾
- **H1**：Custom Soft Play Equipment Manufacturer for Schools & Education Centers
- **Title**：Custom Soft Play Manufacturer for Schools | NinescapeLand
- **Meta**：Direct-from-factory custom soft play equipment for schools, SEN units & education centers. ASTM/TUV certified, free 3D design, 30-day delivery.
- **布局**：
  1. Hero + "Free Custom 3D Design" CTA
  2. Why schools choose us（4 USP：定制 / 认证 / 工期 / 售后）
  3. 6类定制产品（Soft Play / Sensory Wall / Climbing / Ball Pit / Toddler Zone / Quiet Pod）
  4. Customization Process（5步 timeline 图）
  5. Materials & Safety Specs（CMHR foam, antibacterial PVC 等）
  6. School Case Gallery（3-5 项目缩略图，链到 Projects）
  7. Lead Time & MOQ 表
  8. FAQ + Product/Organization JSON-LD
  9. 内链：PE Equipment、Sensory Inclusive、Montessori、Homeschool

---

### SEO 规则遵守
- 每页 `<Helmet>` 动态 title/desc/canonical/og:url 自指；title<60 / desc<160 并 `.trim()`
- 单 H1；语义化（header/main/section/article）
- Article 或 FAQPage + BreadcrumbList JSON-LD
- 图片 alt + 懒加载；不引入静态 canonical
- 受 LazySection 限制，单页 HTML <125KB

### 防孤儿页 — 内链落点（与上周同样的位置全部加）
1. `src/components/Header.tsx` 顶部 Resources/Solutions 下拉新增 4 条
2. `src/components/ProductMegaMenu.tsx` 新增 4 个 mega menu item（icon：📘 🎓 🛡️ 🏭）
3. `src/components/Footer.tsx` `productLinks` 加 4 条
4. `src/components/ProductsSection.tsx` `solutionPages` 数组扩展 4 张卡片
5. 相互内链：4 个新页之间互链 + 与上周 4 页交叉链
6. `public/sitemap.xml` 新增 4 条 `<url>`，priority 0.8

### 路由注册
- `src/App.tsx` 添加 4 条 `<Route>`，使用 `StableSolutionPage`-同款无 Suspense 直接加载组件（避免上次空白屏问题）
- 不引入新的 LanguageWrapper 包装

### 技术结构
- 复用 `StableSolutionPage` 的 Header/Footer/FloatingCTA 框架（上周已验证可正常渲染）
- 每页一个独立组件文件 `src/pages/HowToStartIndoorPlaygroundBusiness.tsx` 等
- 文案全英文（站点默认 EN），不做多语切换以避免空白屏

---

确认这 4 个页面 + URL + 内链方式后，我再开始写代码。
