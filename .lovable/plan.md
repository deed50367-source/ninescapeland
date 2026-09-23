# 本周 7 个 SEO / GEO 聚合页实施方案（2026-09-23）

## 目标
基于本周社区关键词报告与美国市场搜索意图，新增 7 个英文聚合页。每页解决一个独立买家问题，不与现有成本页、商业计划页、认证页、产品页重复；全部具备配图、询盘入口、双向内链、预渲染和站点地图收录。

## 关键词与意图
长尾原词多数无稳定搜索量（视为未知，不代表没人搜）；因此每页采用“原词 + 有数据母词”组合。

1. **Factory-Direct Equipment Pricing**
   - 路径：`/indoor-playground-equipment-factory-direct-price`
   - 意图：交易型；源头厂直供价格结构、中间环节成本、跨境采购与付款条款。
   - 区隔：现有成本页给预算区间，本页讲价格如何构成与如何验证厂家为源头工厂。

2. **Commercial Play Center Profit Margin**
   - 路径：`/commercial-indoor-playground-profit-margin`
   - 意图：信息/投资型；门票、会员、派对、餐饮零售的毛利结构与利润驱动因子。
   - 区隔：现有 TCO 页讲支出、ROI 国别页讲回本周期，本页只讲收入构成与毛利。

3. **Education + Active Play Combo Layout**
   - 路径：`/kids-education-combo-play-center-layout-ideas`
   - 意图：信息型；教育区与体能区分区、动线、噪音隔离、年龄分流、看护视线。
   - 区隔：现有教育类页讲课程价值，本页只讲空间布局与分区方案。

4. **Trampoline + Ninja Combined Build**
   - 路径：`/trampoline-park-and-ninja-course-builder`
   - 意图：商业型；两类项目同场集成的层高、承重、缓冲区、施工顺序与验收。
   - 区隔：现有蹦床/忍者页各讲单一品类，本页讲组合场馆的一体化建设。

5. **Soft Play Budget Breakdown**
   - 路径：`/soft-play-equipment-supplier-cost-breakdown`
   - 意图：商业型；逐项报价明细（结构、软包、滑梯、球池、地垫、海运、安装）与比价方法。
   - 区隔：不重复通用成本页，本页只做 soft play 逐项报价拆解与报价单核对清单。

6. **Manufacturer Qualification Checklist**
   - 路径：`/custom-playground-manufacturer-certification-checklist`
   - 意图：商业调研型；ASTM / TUV / EN1176 / ISO 与工厂审核、批次追溯、文件清单。
   - 区隔：现有认证页解释标准本身，本页是采购方的供应商资质审核清单。

7. **ASTM-Compliant Structures**
   - 路径：`/astm-certified-indoor-playground-structures`
   - 意图：信息型；结构件（立柱、平台、护网、滑梯、攀爬件）对应的 ASTM 条款与验收要点。
   - 区隔：现有蹦床安全页针对 F2970，本页针对 F1487 结构件合规。

## 页面建设
- 沿用稳定聚合页架构（`StableSolutionPage` + `weeklyAggregationPages` 配置），每页独立 Title / Description / H1 / 关键词组 / canonical。
- 每页包含 4 项决策指标、独立方法框架、6 类交付项、4 类适用买家、采购对比表、5–6 条 FAQ、权威来源区块（含数据截至时间）和询盘表单。
- 每页 1 张首图 + 3 张 3D 透视/项目配图，配具体替代文本；不使用平面图作主视觉。
- 输出 FAQPage、BreadcrumbList、Article 结构化数据与内容更新时间。
- 页面上不展示 Semrush 数据，仅用于验证搜索意图。

## 防止孤儿页
- 7 页互相建立主题相关链接，并链接现有成本、认证、蹦床、忍者、软体、商业计划页。
- 从相关现有页面反向加入入口，而不是堆在同一处。
- 同步移动端产品/资源菜单入口，保持三次点击内可达。

## 技术细节
- Title <60 字符，Description <160 字符并 `.trim()`。
- 同步 React 路由、预渲染清单、站点地图（含 en/es/pt/de/fr/ar/x-default，`lastmod=2026-09-23`）、`contentDates`。
- 首图优先加载，其余懒加载；沿用站内图库与图片优化流程。
- 完成后检查 7 页可打开、仅一个 H1、正文非空、结构化数据存在、无控制台错误，并运行类型检查。
