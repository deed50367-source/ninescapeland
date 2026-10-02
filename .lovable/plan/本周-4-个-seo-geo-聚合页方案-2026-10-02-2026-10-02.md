# 本周 4 个 SEO/GEO 聚合页方案（2026-10-02）

文档里的4个长尾词搜索量都查不到数据（视为未知，不是零），所以每页都挂在一个有真实搜索量的母词下，换一个现有页面没讲过的切入点。

## 已有页面（避开重复）
家庭教育合作社室内游乐、感统游乐区设计、包容性感统游乐、主动学习环境、动觉学习、早教中心设备、教育类互动设备、按年龄分的教育活动、幼儿家庭游戏室。

## 4 个新页面

| # | 地址 | 主关键词 | 搜索意图 | 独特切入点（和老页面的区别） |
|---|---|---|---|---|
| 1 | /gross-motor-play-equipment-for-preschoolers | gross motor play equipment for preschoolers | 采购 | 按2–5岁大运动发展阶段，对应到具体设备（平衡、攀爬、跳跃、爬行），做"技能-设备"对照表。老页面讲的是采购流程，不讲技能对应 |
| 2 | /homeschool-gym-indoor-play-facility | homeschool gym | 商业 | 游乐场工作日白天的空闲时段，做家庭教育体育课：课表、按人收费、需要哪些设备。老合作社页面讲的是社交场地，不讲场馆怎么赚钱 |
| 3 | /sensory-playground-equipment-by-sensory-system | sensory playground equipment | 采购 | 按前庭觉/本体觉/触觉/视觉/听觉五大感觉系统，逐类列出设备、规格和安全区。老页面讲的是设计和包容理念 |
| 4 | /active-play-curriculum-for-indoor-play-centers | active play curriculum | 信息→商业 | 室内游乐场做定时运动课（蹦床、忍者、软体）：课程模板、教练配比、场地分区。老"主动学习"页面讲的是空间理念，不讲课程运营 |

## 每页包含
- 独立的标题（60字符以内）、描述（160字符以内）和关键词，只写关键词本身
- 首屏大图、3张参考案例图、关键数据卡片、对比表、6–7条常见问答、权威来源（CPSC/ASTM/EN 1176/CDC 体能指南），标注数据截至日期
- 结构化数据：问答、面包屑、文章（带更新日期）
- 询盘表单和 WhatsApp 入口

## 防孤儿页
- 4页互相加链接
- 从老页面加入口：早教中心设备 → 页1，家庭教育合作社 → 页2，感统游乐区设计 → 页3，主动学习环境 → 页4
- 同步菜单、站点地图、预渲染清单和更新日期（2026-10-02）

## 技术细节
- 新建 `src/config/weeklyAggregationPagesB9.ts` 和渲染器，用 StableSolutionPage 生成英文原创页面
- 在 App.tsx、prerender.mjs、contentDates.ts、Header/ProductMegaMenu、sitemap.xml 中注册
- 用真实浏览器检查：单 H1、结构化数据、图片、表格和链接都正常
