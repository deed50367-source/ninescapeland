# GEO/AI 可见性整改方案（GAS 20/100 → 目标 65+）

两份报告是同一次 GAS-2.4 审计（CSV 是明细，MD 是整改清单）。抽样 10 页，17 项未通过。按"可回收分值 / 实施难度"排序，分四批执行。

## 诊断要点

报告里最致命的一条不是 schema，而是 **AI 爬虫拿到 0 字符正文（HTTP 429）**：GPTBot UA 抓首页返回空壳，而浏览器 UA 拿到 9112 字符。这说明服务器边缘层在限流 AI UA。这一项不修，后面所有结构化数据、问句标题、表格对 AI 引擎都等于不存在。

第二个系统性问题：未通过页面高度集中在 **非英语路由（/es/、/fr/、/de/、/ar/）和 /market/ 行业页**。这些页面缺 Breadcrumb/FAQ/Article schema、正文不足 1200 词、无作者实体——说明结构化数据与深度内容只做在了英文主路由上，多语言与行业页是薄壳。

第三：上一轮为了合规我把 sitemap 里 261 处伪造 lastmod 全清了，GAS 反而扣了"sitemap 含 lastmod 0 条 / 最近更新在 90 天内"两项。要用**真实**的内容修改时间补回，而不是构造日期。

## 第一批：机器可读性（可回收 36 分，最高优先）

1. **解除 AI 爬虫 429 拦截** — 在 `public/.htaccess` 中为 GPTBot / PerplexityBot / ClaudeBot / Google-Extended / CCBot / Bytespider 等 UA 显式放行，跳过任何限流与挑战规则，并确认这些 UA 能命中预渲染后的静态 HTML（而非空 SPA 骨架）。修完用 `curl -A 'GPTBot/1.0'` 自检字符数是否接近浏览器 UA。
2. **robots.txt 显式声明 AI 规则** — 在 `public/robots.txt` 增加 GPTBot、PerplexityBot、ClaudeBot、Google-Extended、CCBot、Applebot-Extended 独立 User-agent 段落（Allow: /，Disallow: /admin），并保留现有搜索引擎段落。

## 第二批：结构化数据（可回收 80 分）

3. **BreadcrumbList 全站覆盖** — 目前只有部分英文页有。改为在共享布局层按当前路径 + 当前语言自动生成，非英语路由用带语言前缀的 URL，覆盖 /market/、/products/、/blog/、行业与 ROI 页。
4. **Article / Product / Service schema** — 抽样 0 页通过。产品详情页输出 Product（含 brand、manufacturer、offers 询价语义），行业/市场页与解决方案页输出 Service，博客与聚合页输出 Article。
5. **FAQPage / HowTo 下沉到内页** — 首页已有，扩展到产品页、行业页、多语言页（用各语言已翻译的 FAQ 文案，不新造英文内容）。
6. **sameAs 外部身份** — Organization schema 的 `sameAs` 目前是空的。填入真实存在的官方档案：LinkedIn 公司页、YouTube 频道、Facebook、Alibaba/公司名录页。需要你提供实际链接，我不会编造。
7. **schema dateModified** — 所有 Article/Product/Service/WebPage schema 输出 `dateModified`，取值来自数据库 `updated_at`（动态内容）或该页面代码的真实最后修改时间（静态页），不使用构建时间戳。

## 第三批：答案可提取性 + 深度（可回收 51 分）

8. **问句式 H2 小标题** — 各主要页面把至少 2–3 个 H2 改成问句形式（What / How / Why + 各语言对应译法），文案自然融入现有段落，不做关键词堆砌。
9. **对比表格** — 抽样 0 页有 `<table>`。在产品页与行业页加语义化对比表（规格 / 材质 / 认证 / 适用面积 / 交期对照），用真实产品参数；表格同时是 AI 抽取率最高的内容形态。
10. **非英语页与行业页正文扩充至 1200+ 词** — 报告点名 /es/、/fr/contact、/de/office-wellness、/de/trampoline-park-fec、/es/market/healthcare。做法是补齐这些路由的翻译缺口（很多是英文段落未翻译导致渲染为空），而不是灌水。
11. **作者/人物实体** — 现有 EEATSignature 只出现在首页。下沉到内页与多语言页，输出 Person schema（真实署名，需你确认可用姓名与职称）。

## 第四批：引用信号与新鲜度

12. **信任页** — 站点缺独立隐私政策与服务条款页（目前只有 /lp/n 的广告隐私页）。新建 `/privacy`、`/terms`，并在页脚全站链接。
13. **权威外链** — 在安全认证、标准相关页面引用 ASTM、TÜV、EN 1176、CPSC 等官方标准页面（真实 URL，`rel="noopener"`），既是引用信号也是 E-E-A-T 证据。
14. **来源标注区块** — 在引用了标准/数据的页面底部加 "Sources / References" 区块，列出所引用的标准与出处。
15. **sitemap lastmod 恢复（合规做法）** — 动态内容用数据库 `updated_at`；静态页维护一份"内容真实修改日期"映射，随内容改动更新。不使用构建时间或统一填充当天日期。
16. **站龄** — archive.org 首个存档 2026-05-17，报告按新站封顶，这一项无法优化，只能按月复跑 GAS 留曲线。

## 需要你先确认的三件事

- **sameAs 链接**：LinkedIn / YouTube / Facebook / 名录页的真实 URL。
- **作者署名**：内页 Person schema 用哪个姓名与职称。
- **429 是谁拦的**：如果 Hostinger 面板上开了机器人防护 / WAF，.htaccess 放行可能被面板规则覆盖，需要你在主机面板确认一次。

## 建议执行顺序

第一批（爬虫可达性）单独一次部署并当场 curl 验证 → 第二批 schema → 第三批内容与表格 → 第四批信任页与引用。第一批不通，其余全部白做。
