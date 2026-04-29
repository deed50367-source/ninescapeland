// Per-country ROI / Investment Opportunity landing page data.
// Content is intentionally written in English only — these pages target
// English-language B2B investor / operator search intent across export markets.
// The page template falls back to the same English copy for non-English locales.

export interface ROIFAQ {
  question: string;
  answer: string;
}

export interface ROIFeature {
  title: string;
  description: string;
}

export interface ROIPageData {
  slug: string;
  country: string;
  countryCode: string; // ISO 3166-1 alpha-2
  flag: string;
  region: "APAC" | "MENA" | "LATAM" | "Europe" | "North America";
  /** Hero */
  badge: string;
  heroTitle: string;
  heroHighlight: string;
  heroDescription: string;
  /** SEO */
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  /** Stats: 4 cards */
  stats: { value: string; label: string }[];
  /** Section 1: market opportunity */
  marketBadge: string;
  marketTitle: string;
  marketHighlight: string;
  marketContent: string;
  marketFeatures: ROIFeature[];
  /** Section 2: ROI model & operational levers */
  roiBadge: string;
  roiTitle: string;
  roiHighlight: string;
  roiContent: string;
  roiFeatures: ROIFeature[];
  /** Section 3: investment breakdown */
  investmentSummary: string;
  investmentBreakdown: { item: string; range: string }[];
  /** FAQ */
  faqs: ROIFAQ[];
}

export const roiPages: ROIPageData[] = [
  {
    slug: "indoor-playground-investment-australia",
    country: "Australia",
    countryCode: "AU",
    flag: "🇦🇺",
    region: "APAC",
    badge: "Australia ROI Analysis",
    heroTitle: "Indoor Playground Business Opportunity",
    heroHighlight: "in Australia",
    heroDescription:
      "Open a profitable indoor playground or family entertainment centre in Australia. AS 4685 compliant equipment, transparent ROI model, and turnkey project delivery for Sydney, Melbourne, Brisbane, Perth and regional markets.",
    metaTitle: "Indoor Playground Investment Australia | ROI Guide",
    metaDescription:
      "Start an indoor playground business in Australia. AS 4685 certified equipment, ROI breakdown, payback period & investment costs for Sydney, Melbourne and beyond.",
    metaKeywords:
      "indoor playground investment Australia, indoor playground business Australia, FEC investment Sydney, soft play ROI Melbourne, AS 4685",
    stats: [
      { value: "AU$1.2B+", label: "AU Family Entertainment Market" },
      { value: "18-30 mo", label: "Typical Payback Period" },
      { value: "AS 4685", label: "Local Safety Standard" },
      { value: "35-55%", label: "Gross Margin Range" },
    ],
    marketBadge: "Market Opportunity",
    marketTitle: "Australia's Family Entertainment Market is",
    marketHighlight: "Maturing Fast",
    marketContent:
      "Australia's indoor entertainment sector has compounded steadily as urban families spend more on weekend experiences and parents prioritise weather-independent venues. Shopping centres in NSW, VIC and QLD actively recruit anchor play tenants to drive dwell time, while suburban operators capture birthday-party and term-break demand. With high disposable income per household and a strong cafe culture, eat-and-play hybrid centres consistently outperform single-format venues on per-visitor revenue.",
    marketFeatures: [
      { title: "High Per-Visitor Spend", description: "Average ticket of AU$22-32 plus AU$8-15 cafe spend per family group." },
      { title: "Mall Anchor Demand", description: "Westfield, Stockland and regional centres offer favourable lease terms for play anchors." },
      { title: "Weather-Driven Footfall", description: "Hot summers and wet winters push families indoors year-round across all states." },
      { title: "Birthday Party Engine", description: "Party packages contribute 25-35% of revenue at well-run AU centres." },
    ],
    roiBadge: "ROI Model",
    roiTitle: "Transparent Unit Economics for",
    roiHighlight: "Australian Operators",
    roiContent:
      "Most NinescapeLand-equipped Australian centres reach operational breakeven within 6-9 months and full investment payback in 18-30 months. We design venues around four revenue streams — general admission, party packages, F&B, and corporate/school bookings — so the business is not dependent on any single channel. Our Australian project files include realistic capacity, ticket-price and labour-cost assumptions for AU minimum-wage environments.",
    roiFeatures: [
      { title: "4 Revenue Streams", description: "Admission + parties + cafe + corporate hire — diversified weekly cash flow." },
      { title: "AU Labour-Aware Layout", description: "Designs that minimise required staff per shift to protect margin under AU wage rates." },
      { title: "Capacity-Optimised Zoning", description: "Toddler / junior / active zones sized to maximise concurrent paying visitors." },
      { title: "Membership Upsell Built-In", description: "Recurring revenue model proven to lift LTV by 40%+ at AU centres." },
    ],
    investmentSummary:
      "Total turnkey investment for a 600-1,200 m² Australian centre typically lands between AU$280,000 and AU$650,000 depending on fit-out scope, theming, and attractions selected.",
    investmentBreakdown: [
      { item: "Soft play & main structure", range: "AU$120k - AU$280k" },
      { item: "Trampoline / ninja / active zones (optional)", range: "AU$60k - AU$160k" },
      { item: "Toddler & sensory area", range: "AU$25k - AU$55k" },
      { item: "Theming, flooring, signage", range: "AU$35k - AU$80k" },
      { item: "Shipping, customs & install (AU)", range: "AU$25k - AU$60k" },
      { item: "POS, ticketing, party room fit-out", range: "AU$15k - AU$35k" },
    ],
    faqs: [
      {
        question: "Does NinescapeLand equipment meet Australian safety standards?",
        answer:
          "Yes. All equipment supplied to Australia is built to AS 4685 and AS/NZS ISO 8124 toy-safety requirements, with documentation provided for council and insurance approvals.",
      },
      {
        question: "How long from order to a fully open centre in Australia?",
        answer:
          "Typically 12-18 weeks: 4-6 weeks production, 4-5 weeks sea freight to AU ports, 2-3 weeks install. We coordinate with your local builder and provide on-site supervision.",
      },
      {
        question: "Can you support GST, customs and AU import compliance?",
        answer:
          "Yes — we ship DDP/DAP terms, provide AHECC-aligned commercial invoices, and partner with Australian customs brokers who handle clearance, GST and biosecurity.",
      },
    ],
  },
  {
    slug: "indoor-playground-investment-new-zealand",
    country: "New Zealand",
    countryCode: "NZ",
    flag: "🇳🇿",
    region: "APAC",
    badge: "New Zealand ROI Analysis",
    heroTitle: "Indoor Playground Business Opportunity",
    heroHighlight: "in New Zealand",
    heroDescription:
      "Launch a profitable family entertainment centre in Auckland, Wellington, Christchurch or regional NZ. NZS-compliant equipment, transparent investment costs, and end-to-end support tailored for the New Zealand market.",
    metaTitle: "Indoor Playground Investment New Zealand | ROI",
    metaDescription:
      "Start an indoor playground business in New Zealand. NZS-compliant equipment, ROI breakdown, payback timelines and investment guide for Auckland, Wellington and Christchurch.",
    metaKeywords:
      "indoor playground investment New Zealand, FEC business NZ, soft play Auckland, family entertainment centre Wellington, AS/NZS 4685",
    stats: [
      { value: "NZ$280M+", label: "NZ Indoor Leisure Market" },
      { value: "20-32 mo", label: "Typical Payback Period" },
      { value: "AS/NZS 4685", label: "Local Safety Standard" },
      { value: "35-50%", label: "Gross Margin Range" },
    ],
    marketBadge: "Market Opportunity",
    marketTitle: "New Zealand's Indoor Play Market is",
    marketHighlight: "Underserved & Profitable",
    marketContent:
      "New Zealand has fewer than half the indoor play centres per capita compared to Australia, leaving most secondary cities with little to no modern competition. The wet, variable climate makes indoor venues an essential weekend option for families, and NZ parents are willing to pay a premium for safe, well-themed environments. Successful NZ operators combine play with quality cafe service to capture full-day visits.",
    marketFeatures: [
      { title: "Low Competitive Density", description: "Many NZ catchments have zero modern indoor play competitor within 30 minutes drive." },
      { title: "Year-Round Wet-Weather Demand", description: "Auckland, Wellington and the South Island generate constant weather-driven traffic." },
      { title: "Cafe-First Operating Style", description: "NZ family habits favour 2-3 hour visits with food, lifting per-head spend." },
      { title: "Tourism Tailwind", description: "Domestic travel and Australian visitors add holiday-period peaks." },
    ],
    roiBadge: "ROI Model",
    roiTitle: "Honest Investment Numbers for",
    roiHighlight: "New Zealand Operators",
    roiContent:
      "A well-located NZ centre of 500-1,000 m² typically targets payback within 20-32 months. We size equipment, themed zones and party rooms based on your specific catchment population, and provide an editable financial model covering admission, F&B, party and membership revenue under realistic NZ wage and rent assumptions.",
    roiFeatures: [
      { title: "Catchment-Based Sizing", description: "Equipment and capacity matched to your local population, not a generic template." },
      { title: "NZ Wage-Aware Operations", description: "Layouts that work efficiently with NZ minimum wage and skilled staff costs." },
      { title: "Multi-Revenue Design", description: "Admission, parties, cafe and membership built into the floor plan from day one." },
      { title: "Quiet-Day Resilience", description: "Toddler programmes and corporate hire fill weekday gaps." },
    ],
    investmentSummary:
      "Turnkey investment for a New Zealand centre typically ranges from NZ$260,000 to NZ$580,000 depending on size, theming and attraction mix.",
    investmentBreakdown: [
      { item: "Soft play & main structure", range: "NZ$110k - NZ$250k" },
      { item: "Active zones (trampoline / ninja)", range: "NZ$55k - NZ$140k" },
      { item: "Toddler & sensory area", range: "NZ$22k - NZ$50k" },
      { item: "Theming, flooring, signage", range: "NZ$32k - NZ$70k" },
      { item: "Shipping, customs & install (NZ)", range: "NZ$25k - NZ$55k" },
      { item: "POS, ticketing, party room fit-out", range: "NZ$15k - NZ$30k" },
    ],
    faqs: [
      {
        question: "Does the equipment meet New Zealand safety standards?",
        answer:
          "Yes. All NinescapeLand equipment for the NZ market is built to AS/NZS 4685 and AS/NZS ISO 8124, with full documentation for council and insurer approval.",
      },
      {
        question: "Can you ship and clear customs into NZ?",
        answer:
          "Yes. We ship sea freight to Auckland or Tauranga and work with NZ customs brokers to handle MPI biosecurity, GST and clearance — usually DDP terms.",
      },
      {
        question: "Do you have NZ reference projects we can visit?",
        answer:
          "We can connect serious investors with operating NZ and AU reference centres for site visits as part of our pre-investment diligence support.",
      },
    ],
  },
  {
    slug: "indoor-playground-investment-uae",
    country: "United Arab Emirates",
    countryCode: "AE",
    flag: "🇦🇪",
    region: "MENA",
    badge: "UAE ROI Analysis",
    heroTitle: "Indoor Playground Business Opportunity",
    heroHighlight: "in the UAE",
    heroDescription:
      "Build a high-end family entertainment centre in Dubai, Abu Dhabi or Sharjah. EN 1176 / ASTM-certified equipment, premium theming, and ROI models built for UAE mall and standalone formats.",
    metaTitle: "Indoor Playground Investment UAE | Dubai ROI Guide",
    metaDescription:
      "Open an indoor playground business in the UAE. Investment costs, ROI projections, mall-format design and certified equipment for Dubai, Abu Dhabi and Sharjah operators.",
    metaKeywords:
      "indoor playground investment UAE, FEC business Dubai, family entertainment centre Abu Dhabi, soft play UAE, mall play area Dubai",
    stats: [
      { value: "US$1.8B+", label: "UAE Family Entertainment Market" },
      { value: "15-26 mo", label: "Typical Payback Period" },
      { value: "EN 1176", label: "Standard Used in UAE Malls" },
      { value: "40-60%", label: "Gross Margin Range" },
    ],
    marketBadge: "Market Opportunity",
    marketTitle: "The UAE Family Entertainment Sector is",
    marketHighlight: "World-Class & Growing",
    marketContent:
      "The UAE leads MENA in family entertainment spend per capita. Dubai and Abu Dhabi malls reserve dedicated zones for premium FECs, and tourism-driven peaks across school holidays, Eid and DSF deliver strong seasonal revenue. Operators who pair high-quality equipment with strong theming and digital ticketing consistently outperform regional benchmarks.",
    marketFeatures: [
      { title: "Premium Pricing Tolerated", description: "AED 75-150 per child entry common at well-themed UAE centres." },
      { title: "Mall Operator Demand", description: "Emaar, Majid Al Futtaim and Aldar actively seek branded play anchors." },
      { title: "Tourist-Driven Peaks", description: "International visitors lift weekday and holiday traffic significantly." },
      { title: "Birthday & Corporate Spend", description: "High-value private bookings contribute 30-40% of revenue at top centres." },
    ],
    roiBadge: "ROI Model",
    roiTitle: "Premium Returns Backed by",
    roiHighlight: "Strong UAE Unit Economics",
    roiContent:
      "Well-positioned UAE centres typically reach payback within 15-26 months thanks to high ticket prices and dense catchments. Our UAE projects optimise for premium finish, Arabic + English signage, and integration with mall POS systems. We provide editable financial models covering admission, F&B, parties and corporate hire under realistic UAE rent and labour assumptions.",
    roiFeatures: [
      { title: "Premium Theming & Finish", description: "Material specification matched to UAE mall expectations and brand standards." },
      { title: "Bilingual Operations Ready", description: "Arabic + English signage, safety briefings and membership flow." },
      { title: "Mall-Spec Compliance", description: "Designs that meet Civil Defence, mall fit-out and tenant manuals." },
      { title: "High-Margin F&B Integration", description: "Cafe and party rooms designed to maximise UAE-typical spend per head." },
    ],
    investmentSummary:
      "Turnkey investment for a UAE FEC typically ranges from US$320,000 to US$1.2M depending on mall vs standalone format, attraction mix and theming level.",
    investmentBreakdown: [
      { item: "Soft play & main structure", range: "US$130k - US$320k" },
      { item: "Trampoline / ninja / active zones", range: "US$70k - US$220k" },
      { item: "Toddler & sensory area", range: "US$28k - US$70k" },
      { item: "Premium theming & finish", range: "US$50k - US$180k" },
      { item: "Shipping, customs & install (UAE)", range: "US$25k - US$65k" },
      { item: "POS, ticketing, party suites", range: "US$20k - US$60k" },
    ],
    faqs: [
      {
        question: "What safety standards do UAE malls accept?",
        answer:
          "UAE malls and Civil Defence accept EN 1176 and ASTM F1918. NinescapeLand provides both certifications, plus full fire-rated material documentation required for tenant fit-out approval.",
      },
      {
        question: "Can you support Civil Defence and mall fit-out approvals?",
        answer:
          "Yes. We provide stamped technical drawings, material data sheets and certifications required for Civil Defence, Trakhees and mall landlord packages.",
      },
      {
        question: "Do you ship DDP into UAE?",
        answer:
          "Yes — we ship to Jebel Ali or Khalifa Port and can quote on DDP terms including UAE customs duty, VAT and inland delivery to Dubai, Abu Dhabi or Sharjah.",
      },
    ],
  },
  {
    slug: "indoor-playground-investment-saudi-arabia",
    country: "Saudi Arabia",
    countryCode: "SA",
    flag: "🇸🇦",
    region: "MENA",
    badge: "Saudi Arabia ROI Analysis",
    heroTitle: "Indoor Playground Business Opportunity",
    heroHighlight: "in Saudi Arabia",
    heroDescription:
      "Capitalise on Vision 2030 entertainment growth. NinescapeLand delivers SASO-aligned indoor playground and FEC equipment for Riyadh, Jeddah, Dammam and Saudi mall operators.",
    metaTitle: "Indoor Playground Investment Saudi Arabia | ROI",
    metaDescription:
      "Open an indoor playground business in Saudi Arabia. SASO-compliant equipment, ROI projections and investment cost guide for Riyadh, Jeddah and Dammam.",
    metaKeywords:
      "indoor playground investment Saudi Arabia, FEC Riyadh, family entertainment centre Jeddah, soft play KSA, Vision 2030 entertainment",
    stats: [
      { value: "US$2.4B+", label: "KSA Family Entertainment Market" },
      { value: "16-28 mo", label: "Typical Payback Period" },
      { value: "SASO + EN 1176", label: "Standards Accepted" },
      { value: "38-58%", label: "Gross Margin Range" },
    ],
    marketBadge: "Market Opportunity",
    marketTitle: "Vision 2030 is Reshaping",
    marketHighlight: "Saudi Family Entertainment",
    marketContent:
      "Saudi Arabia's entertainment sector is one of the fastest-growing in the world, backed by Vision 2030 investment in malls, lifestyle destinations and tourism. With more than 60% of the population under 35 and one of the highest birth rates in the Gulf, demand for family entertainment is structurally strong. Mall developers actively recruit family attractions to lift dwell time and per-visit spend.",
    marketFeatures: [
      { title: "Young, Family-Heavy Population", description: "Over 60% of KSA residents are under 35 — a deep, sustained customer base." },
      { title: "Vision 2030 Tailwind", description: "Government investment in tourism and entertainment is driving new mall and destination supply." },
      { title: "High Mall Footfall", description: "Riyadh and Jeddah malls see industry-leading per-square-metre traffic." },
      { title: "Premium Spend Capacity", description: "Strong household income supports higher ticket and party packages." },
    ],
    roiBadge: "ROI Model",
    roiTitle: "Vision-2030-Aligned Returns for",
    roiHighlight: "Saudi Operators",
    roiContent:
      "Well-located Saudi centres typically achieve payback in 16-28 months. We design venues around mall-tenant expectations, gender-friendly family flow, and SASO-compliant materials. Our financial models cover admission, F&B, party packages, school bookings and corporate hire under realistic KSA wage and rent assumptions.",
    roiFeatures: [
      { title: "Mall-Tenant Spec", description: "Drawings and materials prepared to KSA mall landlord and Civil Defence packages." },
      { title: "Family-Flow Design", description: "Layouts that respect family seating, prayer rooms and feeding areas." },
      { title: "Bilingual Branding", description: "Arabic + English signage, manuals and digital ticketing ready." },
      { title: "School & Corporate Channel", description: "Dedicated weekday programming to balance weekend peaks." },
    ],
    investmentSummary:
      "Turnkey investment for a Saudi FEC typically ranges from US$280,000 to US$1.0M depending on format, theming and attraction selection.",
    investmentBreakdown: [
      { item: "Soft play & main structure", range: "US$120k - US$300k" },
      { item: "Trampoline / ninja / active zones", range: "US$65k - US$200k" },
      { item: "Toddler & sensory area", range: "US$26k - US$65k" },
      { item: "Theming & finish", range: "US$40k - US$150k" },
      { item: "Shipping, customs & install (KSA)", range: "US$28k - US$70k" },
      { item: "POS, ticketing, party suites", range: "US$18k - US$55k" },
    ],
    faqs: [
      {
        question: "Is NinescapeLand equipment SASO-compliant?",
        answer:
          "Yes. We supply SASO-aligned products with EN 1176 / ASTM F1918 certification, plus fire-rated material documentation required for KSA Civil Defence and mall approvals.",
      },
      {
        question: "Can you support SABER and customs into Saudi Arabia?",
        answer:
          "Yes. We provide HS-coded commercial invoices, SABER-ready product data and partner with KSA customs brokers for import clearance into Jeddah and Dammam ports.",
      },
      {
        question: "Do you have experience with Saudi mall operators?",
        answer:
          "Yes — we have shipped projects to Saudi malls and can provide tenant-ready drawing packages aligned with major KSA landlord fit-out manuals.",
      },
    ],
  },
  {
    slug: "indoor-playground-investment-mexico",
    country: "Mexico",
    countryCode: "MX",
    flag: "🇲🇽",
    region: "LATAM",
    badge: "Mexico ROI Analysis",
    heroTitle: "Indoor Playground Business Opportunity",
    heroHighlight: "in Mexico",
    heroDescription:
      "Open a profitable family entertainment centre in CDMX, Monterrey, Guadalajara or Mexican regional cities. EN 1176 / ASTM-certified equipment, transparent ROI model, and Spanish-language project support.",
    metaTitle: "Indoor Playground Investment Mexico | ROI Guide",
    metaDescription:
      "Start an indoor playground business in Mexico. ASTM-certified equipment, investment costs, payback timelines and ROI guide for CDMX, Monterrey and Guadalajara operators.",
    metaKeywords:
      "indoor playground investment Mexico, FEC business CDMX, family entertainment centre Monterrey, soft play Guadalajara, salon de fiestas infantil",
    stats: [
      { value: "US$900M+", label: "Mexico FEC Market" },
      { value: "18-30 mo", label: "Typical Payback Period" },
      { value: "ASTM F1918", label: "Standard Used in MX Malls" },
      { value: "35-55%", label: "Gross Margin Range" },
    ],
    marketBadge: "Market Opportunity",
    marketTitle: "Mexico's FEC Sector is",
    marketHighlight: "Expanding Beyond the Capital",
    marketContent:
      "Mexico has one of the largest and youngest populations in LATAM, with strong family-oriented spending. Beyond CDMX, mid-sized cities like Querétaro, Puebla, Mérida and Tijuana are seeing rapid mall and FEC growth as middle-class household income rises. Birthday parties (salón de fiestas) are a culturally central spend category and the single biggest revenue driver at most Mexican centres.",
    marketFeatures: [
      { title: "Birthday Party Powerhouse", description: "Salón-de-fiestas packages drive 30-45% of revenue at strong MX centres." },
      { title: "Mall Anchor Demand", description: "Liverpool, Soriana and regional mall operators recruit play anchors for traffic." },
      { title: "Mid-City Growth", description: "Tier-2 Mexican cities offer lower rent and lower competition than CDMX." },
      { title: "School-Holiday Peaks", description: "Long Mexican school breaks create predictable high-revenue windows." },
    ],
    roiBadge: "ROI Model",
    roiTitle: "Realistic Investment Returns for",
    roiHighlight: "Mexican Operators",
    roiContent:
      "Well-located Mexican centres typically reach payback within 18-30 months. We design venues with strong dedicated party suites, theming that resonates with Mexican families, and operations that work efficiently under local wage structures. Our Spanish-speaking project team supports operators end-to-end from design through install.",
    roiFeatures: [
      { title: "Dedicated Party Suites", description: "Multiple party rooms designed for back-to-back salón-de-fiestas bookings." },
      { title: "MX Wage-Aware Operations", description: "Layouts that minimise required staff per shift in Mexican wage context." },
      { title: "Spanish Project Support", description: "Bilingual project manager from design through commissioning." },
      { title: "Mall + Standalone Templates", description: "Proven floor plans for both mall pad and standalone retail formats." },
    ],
    investmentSummary:
      "Turnkey investment for a Mexican centre typically ranges from US$180,000 to US$520,000 depending on size, theming and attractions.",
    investmentBreakdown: [
      { item: "Soft play & main structure", range: "US$80k - US$220k" },
      { item: "Active zones (trampoline / ninja)", range: "US$45k - US$140k" },
      { item: "Toddler & sensory area", range: "US$18k - US$45k" },
      { item: "Theming, flooring, signage", range: "US$25k - US$65k" },
      { item: "Shipping, customs & install (MX)", range: "US$22k - US$55k" },
      { item: "POS, ticketing, party rooms", range: "US$12k - US$30k" },
    ],
    faqs: [
      {
        question: "What safety standards do Mexican malls require?",
        answer:
          "Mexican malls and insurers typically accept ASTM F1918 and EN 1176. NinescapeLand provides full certifications and fire-rated material documentation for landlord approval.",
      },
      {
        question: "Do you offer support in Spanish?",
        answer:
          "Yes. Our LATAM project team works in Spanish across design, technical drawings, install supervision and after-sales support.",
      },
      {
        question: "How do you ship to Mexico?",
        answer:
          "We ship sea freight to Manzanillo, Veracruz or Altamira, and partner with Mexican customs brokers to handle IMMEX, IVA and inland trucking to your site.",
      },
    ],
  },
  {
    slug: "indoor-playground-investment-brazil",
    country: "Brazil",
    countryCode: "BR",
    flag: "🇧🇷",
    region: "LATAM",
    badge: "Brazil ROI Analysis",
    heroTitle: "Indoor Playground Business Opportunity",
    heroHighlight: "in Brazil",
    heroDescription:
      "Open a profitable buffet infantil or family entertainment centre in São Paulo, Rio, Belo Horizonte or Brazilian regional cities. ABNT NBR / EN 1176 certified equipment with Portuguese-language project support.",
    metaTitle: "Indoor Playground Investment Brazil | ROI Guide",
    metaDescription:
      "Start an indoor playground business in Brazil. ABNT NBR-aligned equipment, ROI breakdown and investment costs for São Paulo, Rio and regional FEC and buffet infantil operators.",
    metaKeywords:
      "indoor playground investment Brazil, buffet infantil Sao Paulo, FEC Rio de Janeiro, soft play Brasil, parque infantil ABNT",
    stats: [
      { value: "US$1.1B+", label: "Brazil FEC Market" },
      { value: "20-32 mo", label: "Typical Payback Period" },
      { value: "ABNT NBR + EN 1176", label: "Standards Used" },
      { value: "35-55%", label: "Gross Margin Range" },
    ],
    marketBadge: "Market Opportunity",
    marketTitle: "Brazil's Indoor Play Market is",
    marketHighlight: "Driven by Buffet-Infantil Culture",
    marketContent:
      "Brazil has the largest family-entertainment market in Latin America, with a uniquely strong birthday-party culture (buffet infantil). Most successful Brazilian operators design around dedicated party suites with full F&B catering, complemented by free-flow play admission. Tier-1 cities have mature competition, while tier-2 markets in the Northeast and South offer attractive lower-cost entry points.",
    marketFeatures: [
      { title: "Buffet-Infantil Engine", description: "Birthday-party buffets generate 35-50% of revenue at top BR centres." },
      { title: "Mall Anchor Demand", description: "Multiplan and Iguatemi malls actively recruit family attractions." },
      { title: "Regional Growth", description: "Northeast and South tier-2 cities offer lower rent and softer competition." },
      { title: "Membership Adoption", description: "Brazilian families respond well to monthly membership and class programmes." },
    ],
    roiBadge: "ROI Model",
    roiTitle: "Realistic Investment Returns for",
    roiHighlight: "Brazilian Operators",
    roiContent:
      "Well-located Brazilian centres typically reach payback within 20-32 months. We design venues with strong dedicated buffet-infantil suites, theming aligned to Brazilian family taste, and operations that work efficiently under CLT wage structures. Our Portuguese-speaking project team supports operators from design to commissioning.",
    roiFeatures: [
      { title: "Buffet-Infantil Suites", description: "Multiple party rooms with kitchen integration for back-to-back bookings." },
      { title: "BR Operations-Aware", description: "Layouts that respect CLT staffing rules and minimise headcount per shift." },
      { title: "Portuguese Project Team", description: "Bilingual project manager throughout design, install and commissioning." },
      { title: "Membership + Classes", description: "Programming framework for recurring weekday revenue." },
    ],
    investmentSummary:
      "Turnkey investment for a Brazilian centre typically ranges from US$160,000 to US$480,000 depending on size, theming and attraction mix.",
    investmentBreakdown: [
      { item: "Soft play & main structure", range: "US$70k - US$200k" },
      { item: "Active zones (trampoline / ninja)", range: "US$40k - US$130k" },
      { item: "Toddler & sensory area", range: "US$16k - US$42k" },
      { item: "Theming, flooring, signage", range: "US$22k - US$60k" },
      { item: "Shipping, customs & install (BR)", range: "US$25k - US$65k" },
      { item: "POS, ticketing, buffet suites", range: "US$12k - US$30k" },
    ],
    faqs: [
      {
        question: "Does NinescapeLand equipment meet Brazilian standards?",
        answer:
          "Yes. We supply equipment aligned with ABNT NBR 16071 and EN 1176, with full certifications and material data sheets for Brazilian mall and Corpo de Bombeiros approval.",
      },
      {
        question: "Do you offer support in Portuguese?",
        answer:
          "Yes. Our LATAM team works in Brazilian Portuguese across design, drawings, technical specs and install supervision.",
      },
      {
        question: "How do you ship to Brazil?",
        answer:
          "We ship sea freight to Santos, Itajaí or Suape, and partner with Brazilian customs brokers to handle import licensing, ICMS, II and inland delivery to your site.",
      },
    ],
  },
];

export const getROIPageBySlug = (slug: string): ROIPageData | undefined =>
  roiPages.find((p) => p.slug === slug);
