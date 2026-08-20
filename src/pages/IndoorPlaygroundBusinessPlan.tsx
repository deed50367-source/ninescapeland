import { StableSolutionPage } from "./StableSolutionPage";
import { productImages } from "@/config/galleryImages";

const IndoorPlaygroundBusinessPlan = () => (
  <StableSolutionPage
    slug="indoor-playground-business-plan"
    title="Indoor Playground Business Plan Framework"
    kicker="Site Selection · Capex Split · Revenue Model · Franchise Alternative"
    description="A working indoor playground business plan structure: catchment sizing, capex split between equipment, flooring and fit-out, admission and party revenue mix, staffing ratios and the independent build alternative to a franchise fee."
    metaTitle="Indoor Playground Business Plan Framework"
    metaDescription="Build an indoor playground business plan: catchment sizing, capex breakdown, admission and party revenue mix, staffing ratios, and independent build vs franchise comparison."
    keywords={[
      "indoor playground business plan",
      "indoor playground franchise cost",
      "indoor play place franchise alternative",
      "indoor playground setup cost",
    ]}
    heroImage={productImages.indoorPlayground}
    heroImageAlt="Multi-level indoor playground layout used for business plan capex modelling"
    primaryCta="Request a Capex Model and 3D Layout"
    secondaryCta="See Planning Framework"
    metrics={[
      { value: "600–1,500 m²", label: "Typical viable venue footprint" },
      { value: "35–45%", label: "Share of capex in play equipment" },
      { value: "3 streams", label: "Admission · parties · food and beverage" },
      { value: "0 fee", label: "Royalty on an independent build" },
    ]}
    frameworkTitle="Five Numbers a Lender Will Ask For Before the Design"
    frameworkIntro="A play centre business plan fails on assumptions, not on formatting. Before any equipment is drawn, five figures need defending: catchment population, realistic weekday-to-weekend visit split, average spend per head, fixed monthly cost, and the capex you actually need to open the doors."
    framework={[
      { title: "Catchment and demand", desc: "Count children aged 1–12 within a 20-minute drive, then apply a conservative visit frequency. Under 8,000 children in the catchment, the model usually needs a party or café-led plan to work." },
      { title: "Capex split", desc: "Play equipment typically takes 35–45% of capex, flooring and safety surfacing 10–15%, MEP and fit-out 20–30%, with the balance in POS, furniture, branding and working capital." },
      { title: "Revenue mix", desc: "Model admission, birthday parties, memberships and food separately. Parties and F&B usually carry the margin, while admission fills the calendar and drives footfall." },
      { title: "Operating structure", desc: "Staffing ratios by zone, opening-hour pattern, cleaning cycles and annual inspection cost. These recurring items decide whether the payback sits nearer 18 months or 40." },
    ]}
    equipmentTitle="What the Plan Needs From the Equipment Supplier"
    equipmentIntro="A bank or investor will not fund a plan built on catalogue prices. These deliverables turn assumptions into a defensible budget line, and we produce them before any order is placed."
    equipment={[
      { title: "Scaled 3D layout", desc: "A rendered layout of your actual unit dimensions and ceiling height, so capacity and zone counts in the plan match a buildable design." },
      { title: "Itemised equipment quotation", desc: "Line-by-line pricing per zone rather than a lump sum, so you can flex scope to hit a funding target without redrawing the plan." },
      { title: "Flooring and surfacing budget", desc: "Impact-rated surfacing costed by zone and fall height, the item most often missing from first-draft budgets." },
      { title: "Shipping and duty estimate", desc: "Container count, freight, insurance and destination-duty guidance so landed cost, not FOB cost, sits in the model." },
      { title: "Installation and timeline plan", desc: "Supervised installation scope, days on site and the sequence against your fit-out programme, which fixes your pre-opening rent exposure." },
      { title: "Capacity and throughput sheet", desc: "Simultaneous user capacity per zone, feeding the visitor ceiling and party-slot count your revenue lines depend on." },
    ]}
    audienceTitle="Who This Planning Framework Is Built For"
    audienceIntro="This structure suits operators building an independent venue and weighing it against a franchise package."
    audience={[
      { title: "First-time independent operators", desc: "Entrepreneurs preparing a bank or investor submission for a single site." },
      { title: "Franchise-curious buyers", desc: "Buyers comparing a franchise fee and royalty against an independent build with the same equipment quality." },
      { title: "Mall and leisure developers", desc: "Landlords adding a family anchor and needing capex and footfall figures for the board." },
      { title: "Existing FEC owners expanding", desc: "Operators opening a second site who need a repeatable capex and layout template." },
    ]}
    related={[
      { label: "Custom indoor playground cost guide", href: "/custom-indoor-playground-cost-free-3d-design" },
      { label: "Family entertainment center business plan", href: "/family-entertainment-center-business-plan" },
      { label: "Investment and ROI hub", href: "/investment-opportunity" },
      { label: "Design and manufacturing process", href: "/process" },
      { label: "Completed project case studies", href: "/case-studies" },
    ]}
    faq={[
      { title: "How much does it cost to open an indoor playground?", desc: "For a 600–1,000 m² venue, equipment plus impact flooring usually sits in the low-to-mid six figures in USD, with total project cost roughly two to three times the equipment line once fit-out, MEP, furniture and working capital are added. The controllable variable is scope: zone count and structure height move the equipment figure most." },
      { title: "Is a franchise cheaper than building independently?", desc: "A franchise buys a brand, a template and a supplier list in exchange for an upfront fee plus ongoing royalty on revenue. An independent build carries no royalty, but you own site selection, design and marketing. Buyers who already have retail or leisure experience usually get better returns building independently with a direct manufacturer." },
      { title: "What footprint do I need to be viable?", desc: "Below about 400 m² the model depends heavily on parties and toddler memberships. 600–1,500 m² with a ceiling height above 4.5 m supports a multi-level structure, a trampoline or ninja zone, party rooms and a café — the mix that carries margin." },
      { title: "How long is payback on an indoor play centre?", desc: "Well-sited venues with three revenue streams commonly model 24–36 months. Payback stretches when rent exceeds roughly 12–15% of projected revenue, when party capacity is under-built, or when opening slips past a school-holiday window." },
      { title: "What do you provide for a funding application?", desc: "A scaled 3D layout of your unit, an itemised quotation, a flooring budget, container and freight estimates, an installation timeline and a per-zone capacity sheet — the source documents a lender asks for behind the summary numbers." },
    ]}
  />
);

export default IndoorPlaygroundBusinessPlan;
