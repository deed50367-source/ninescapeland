# 本周 5 个 SEO/GEO 聚合页方案（2026-10-08）

文档里大部分关键词已经有页面了（成本、ASTM认证、免费3D设计、蹦床+忍者、商场软体、工厂直供、创业计划、教育综合体），所以不重复做。下面 5 页只挑现有页面没覆盖的空白，并用 Semrush 美国数据核对了意图。

## 已有页面（避开重复）
custom-indoor-playground-cost、astm-certified-indoor-playground-structures、tuv-certified-playground-equipment-supplier、free-3d-design-for-indoor-play-center、trampoline-park-and-ninja-course-builder、soft-play-equipment-shopping-mall-solutions、indoor-playground-equipment-factory-direct-price、indoor-playground-business-plan、kids-education-combo-play-center-layout-ideas、ninja-course-equipment-indoor-education-centers、maintenance-warranty、safe-indoor-playground-equipment-for-small-spaces。

## 5 个新页面

| # | 地址 | 主关键词 | 意图 | 独特切入点（和老页面的区别） |
|---|---|---|---|---|
| 1 | /turnkey-indoor-playground-installation-services | indoor playground installation（约90/月） | 采购 | 设备到港后的落地全过程：清关、进场条件（层高、承重、电源）、安装团队配置、工期甘特、验收清单。老页面只讲设计和报价，不讲现场安装 |
| 2 | /indoor-playground-maintenance-and-cleaning-guide | indoor playground cleaning | 信息 | 运营方日/周/月清洁消毒排班表、软包/球池/网片/蹦床布分项做法、巡检记录表。老"保修维护"页讲的是质保条款 |
| 3 | /ninja-warrior-course-for-kids-indoor-playground | ninja warrior course for kids（约210/月，难度低） | 商业 | 按 4–6 / 7–9 / 10–12 岁分级的儿童忍者关卡、高度和落地垫要求、计时赛/生日会玩法。老忍者页面针对的是教育中心体育课 |
| 4 | /indoor-trampoline-park-layout-design | trampoline park design（约50/月） | 商业 | 按 500/1000/2000 ㎡ 三档面积给出分区布局：主蹦床、躲避球、扣篮、海绵池、等候区、动线和安全区尺寸。老蹦床页讲的是产品和认证 |
| 5 | /how-to-start-an-indoor-playground-business-2026 | how to start an indoor playground business（约70/月，难度低） | 信息→商业 | 按 12 个月倒排的开业时间轴：选址、执照保险、下单、施工、招聘、试营业，每步给检查清单。老"商业计划书"页讲的是财务模型，不讲执行步骤 |

## 每页包含
- 独立标题（60字符以内）、描述（160字符以内）和关键词，只写关键词本身
- 首屏大图、3张案例图、数据卡片、对比表或流程表、6–7条常见问答、权威来源（CPSC/ASTM/EN 1176/CDC 等，标注数据截至日期）
- 结构化数据：问答、面包屑、文章（含更新日期，作者 Gerry）
- 询盘表单和 WhatsApp 入口

## 防孤儿页
- 5页之间互相加链接（创业指南 → 布局/安装 → 维护，形成从开店到运营的闭环）
- 从老页面加入口：商业计划书 → 页5，蹦床+忍者建设 → 页4，忍者教育中心 → 页3，保修维护 → 页2，免费3D设计 → 页1
- 同步菜单、站点地图、预渲染清单和更新日期（2026-10-08）

## 技术细节
- 新建 `src/config/weeklyAggregationPagesB10.ts` 和渲染器，沿用 StableSolutionPage 生成英文原创页面
- 在 App.tsx、prerender.mjs、contentDates.ts、Header/ProductMegaMenu、sitemap.xml 中注册
- 用真实浏览器检查：只有一个 H1、结构化数据、图片、表格和链接都正常
