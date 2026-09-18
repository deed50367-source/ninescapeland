# 本周 7 个 SEO / GEO 聚合页实施方案

## 目标
基于上传的社区关键词报告与美国市场搜索意图，新增 7 个英文聚合页。每页定位独立买家问题，不复制现有成本、感统设计、安全标准或产品页内容；全部具备图片、询盘入口、内部链接、预渲染和站点地图收录。

## 关键词结论
原始长尾词多数暂无稳定搜索量，因此采用“原始精准词 + 有数据的母词”组合：

1. **School Playground Funding Guide**
   - 路径：`/how-to-fund-school-playground-equipment`
   - 意图：信息型；回答拨款、预算、筹款、采购文件和分期实施。
   - 区隔：不讲设备课程设计，专讲资金方案与审批材料。

2. **Special Education Indoor Play Equipment**
   - 路径：`/inclusive-indoor-play-equipment-special-education`
   - 意图：商业调研型；围绕 IEP 支持、调节需求、转移空间、看护视线和设备选型。
   - 区隔：现有感统页讲空间设计，现有包容页讲混合能力共同玩；本页专讲特殊教育采购与使用场景。

3. **Free 3D Indoor Play Center Design**
   - 路径：`/free-3d-design-for-indoor-play-center`
   - 意图：商业服务型；解释客户需提交的资料、设计交付物、修改节点和审批用途。
   - 区隔：现有成本页讲预算区间，本页只讲设计交付流程与可建造性审查。

4. **Durable Soft Play for Title I Schools**
   - 路径：`/durable-soft-play-equipment-title-1-schools`
   - 意图：商业采购型；围绕高频使用、可维修结构、清洁、生命周期和有限预算。
   - 区隔：现有学校软体页讲定制流程，本页专讲耐用性与低维护采购。

5. **ASTM Commercial Trampoline Park Supplier**
   - 路径：`/astm-certified-commercial-trampoline-park-supplier`
   - 意图：交易型；提供供应商资格预审、投标文件、样品/批次追溯和交付验收清单。
   - 区隔：现有安全页解释标准，本页解决“如何筛选并采购合格供应商”。

6. **Ninja Course Equipment for Education Centers**
   - 路径：`/ninja-course-equipment-indoor-education-centers`
   - 意图：商业调研型；围绕课程目标、分级难度、课时轮转、教师看护和进度记录。
   - 区隔：产品页展示通用忍者设备，本页专讲教育中心课程化部署。

7. **Complete Indoor Play Center Solutions**
   - 路径：`/complete-indoor-play-center-solutions`
   - 意图：商业/交易型；围绕单一责任方、设计—制造—运输—安装—开业交接的项目治理。
   - 区隔：首页讲品牌，业务计划页讲经营模型，本页讲完整项目交付范围和责任矩阵。

## 页面建设
- 每页使用稳定聚合页架构，配置独立 Title、Description、H1、关键词组和 canonical。
- 每页加入 4 项决策指标、独立方法框架、6 类设备/交付项、4 类适用买家、采购对比表、5–6 个 FAQ、权威来源和询盘表单。
- 每页配置 1 张首图与 3 张 3D 透视/项目配图，提供具体替代文本和说明；不使用平面图作为主视觉。
- 输出 FAQPage、BreadcrumbList、Article 结构化数据；补充页面更新时间与可验证来源。
- 不在页面上展示 Semrush 数据，只用其验证搜索意图。

## 防止重复与孤儿页
- 7 页互相建立主题相关链接，并链接现有学校、包容性、成本、认证、蹦床、忍者及产品页。
- 从相关现有页面反向加入新页入口，而不是把 7 个链接全部堆入同一处。
- 在移动端产品/资源菜单中加入 7 个入口；桌面端通过相关页与聚合入口保持三次点击内可达。
- 同步 React 路由、预渲染清单、站点地图和内容更新时间。

## 技术细节
- 新页为英文原创内容；沿用当前英文聚合页策略，不伪装成六语翻译页。
- Title 控制在 60 字符以内，Description 控制在 160 字符以内并去除首尾空格。
- 图片沿用站内资源库和图片优化流程，首图优先加载，其余懒加载。
- 站点地图为每个英文页加入 canonical/x-default、`lastmod=2026-09-18`、周更新频率。
- 完成后检查 7 个页面均可打开、仅一个 H1、正文非空、图片正常、结构化数据存在、无控制台错误，并运行项目测试。
