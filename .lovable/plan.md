## 调整说明

根据补充的三份蓝海度报告，本周新增聚合页面方案做如下调整：**完全锁定 0 真实竞品的蓝海词**，Title / H1 / URL slug / canonical 全部精确匹配关键词原文（不改写、不打散词序），最大化 7–14 天内拿到前排的概率。

之前提案中的「How to start an indoor playground business」竞争激烈（非蓝海），本轮**移除**；保留并改造其余 3 页，新增 1 页。

---

## 本周 4 个新增聚合页面（最终版）

### ① `/educational-benefits-of-indoor-play-centers`  ⭐ 蓝海词
- **目标词**：`educational benefits of indoor play centers`（intitle 真实竞品 = 0）
- **Title（<60）**：`Educational Benefits of Indoor Play Centers (2026 Guide)`
- **Meta Desc（<160）**：`Research-backed educational benefits of indoor play centers — cognitive, social, motor & sensory gains by age band, plus equipment that drives each outcome.`
- **H1**：完整包含目标词原文
- **URL slug**：精确匹配
- **内容大纲**（区别于已有 `educational-play-equipment` 等页面，聚焦"play center 场景下的教育收益"而非产品本身）：
  1. Hero：研究数据钩子（如 AAP / NAEYC 引用）
  2. 5 大发展维度：Cognitive · Social-Emotional · Physical · Sensory · Language
  3. **年龄段收益矩阵**（0–2 / 3–5 / 6–8 / 9–12）
  4. Play Center vs Outdoor / Home play 对比表
  5. Operator 视角：教育属性如何提升复购 & 客单
  6. Equipment → Benefit 映射表（链接到现有产品页）
  7. FAQ（6 条）+ FAQPage / Article JSON-LD

### ② `/safety-standards-for-trampoline-park-equipment`  ⭐ 真·零供给
- **目标词**：`safety standards for trampoline park equipment`（intitle 全球 0 结果）
- **Title（<60）**：`Safety Standards for Trampoline Park Equipment 2026`
- **Meta Desc（<160）**：`ASTM F2970, EN 13219 & TÜV safety standards for trampoline park equipment — compliance checklist, common violations & manufacturer certifications.`
- **URL slug**：精确匹配（替代原方案的 `trampoline-park-safety-standards`，调整词序以精确命中）
- **内容大纲**：
  1. 标准总览：ASTM F2970-20 / EN 13219 / TÜV / GB 19272
  2. **设备级要求**：床面、护网、海绵池、Foam pit、Dodgeball 区
  3. 制造商合规清单（焊接 / 钢材 / 弹簧 / 阻燃）
  4. Operator 日常巡检表（可下载 PDF anchor）
  5. 全球 6 大常见违规案例
  6. NinescapeLand 认证矩阵（CE / TÜV / ASTM 报告号占位）
  7. FAQ + BreadcrumbList + Article JSON-LD

### ③ `/custom-soft-play-equipment-manufacturer-for-schools`
- **保留**（商业意图强，导流到询盘）
- Title：`Custom Soft Play Equipment Manufacturer for Schools`
- 内容：6 类定制产品 · 5 步定制流程 · 材料 / 安规 · 学校案例 · MOQ & 交期
- 交叉链接：PE / Montessori / Homeschool / Summer Camp / Sensory 5 个现有解决方案页

### ④ `/indoor-play-center-educational-activities-by-age`  🆕 长尾辅页
- **目的**：承接 ① 的内链权重 + 吃下"educational activities indoor play center"系列长尾，避免 ① 成为孤儿
- Title：`Indoor Play Center Educational Activities by Age (Toddler–Tween)`
- 内容：4 个年龄段 × 每段 5 个活动方案 + 所需设备清单
- 互链：返回 ①、链接到 Montessori / Homeschool / PE 三页

---

## SEO 与防孤儿规则（保持不变）

- 每页：`<Helmet>` 动态 title / desc / canonical / og:url（self-reference）；单 H1；Article + FAQPage + BreadcrumbList JSON-LD；图片 alt + lazy；单页 <125 KB
- 所有 4 页相互交叉链接 + 链接至现有 4 个 solution 页 + 在 Header / Footer / ProductsSection 三处出现
- 在 `src/App.tsx` 用 `StableSolutionPage` 模式注册（不套 `LanguageWrapper`，避免空白屏）
- 加入 `public/sitemap.xml`，priority 0.8

---

## 改动文件清单（确认后再执行）

```text
新增  src/pages/EducationalBenefitsOfIndoorPlayCenters.tsx
新增  src/pages/SafetyStandardsForTrampolineParkEquipment.tsx
新增  src/pages/CustomSoftPlayEquipmentManufacturerForSchools.tsx
新增  src/pages/IndoorPlayCenterEducationalActivitiesByAge.tsx
改   src/App.tsx                    （注册 4 条路由）
改   src/components/Header.tsx      （加入 4 个菜单项）
改   src/components/ProductMegaMenu.tsx
改   src/components/Footer.tsx
改   src/components/ProductsSection.tsx（卡片网格追加 4 项）
改   public/sitemap.xml
```

确认后我立即开始搭建。如有页面需要替换 / 砍掉，告诉我即可。
