import { StableSolutionPage } from "./StableSolutionPage";
import { productImages } from "@/config/galleryImages";

const FamilyEntertainmentCenterBusinessPlan = () => (
  <StableSolutionPage
    slug="family-entertainment-center-business-plan"
    title="Family Entertainment Center Business Plan"
    kicker="Attraction Mix · Zone Sizing · Dwell Time · Multi-Revenue FEC Model"
    description="Plan a multi-attraction FEC: pick the attraction mix by dwell time and spend per head, size each zone against your footprint and ceiling height, and phase capex so later attractions are funded from trading revenue."
    metaTitle="Family Entertainment Center Business Plan"
    metaDescription="FEC business plan framework: attraction mix by dwell time and spend per head, zone sizing against footprint and ceiling height, and phased capex for multi-attraction venues."
    keywords={[
      "family entertainment center business plan",
      "FEC attraction mix planning",
      "trampoline park and playground combined venue",
      "indoor entertainment center capex",
    ]}
    heroImage={productImages.trampolinePark}
    heroImageAlt="Combined trampoline and play attraction layout for a family entertainment center"
    primaryCta="Request an FEC Attraction Mix Layout"
    secondaryCta="See Planning Framework"
    metrics={[
      { value: "1,500 m²+", label: "Typical multi-attraction footprint" },
      { value: "4.5–7 m", label: "Ceiling height driving attraction choice" },
      { value: "90–150 min", label: "Target dwell time per visit" },
      { value: "2–3 phases", label: "Staged capex roll-out" },
    ]}
    frameworkTitle="Attraction Mix Decides the FEC Model, Not Floor Area"
    frameworkIntro="A family entertainment center earns from dwell time. Two venues of identical size perform very differently depending on whether their attractions hold a family for 45 minutes or for two hours with a food break in the middle. Mix design comes before layout, and layout comes before equipment selection."
    framework={[
      { title: "Segment the age bands", desc: "Serve 1–4, 5–12 and 13+ in physically separate zones. Venues that blend them lose both toddler parents and teenage spend, and supervision cost rises." },
      { title: "Balance dwell and throughput", desc: "Pair long-dwell anchors like trampoline courts and multi-level play with fast-throughput draws such as ninja lanes, interactive walls and climbing, so queues never idle a zone." },
      { title: "Design the food break in", desc: "Sightline seating between zones converts a 60-minute visit into a two-part visit with a café spend, the cheapest margin uplift available in an FEC." },
      { title: "Phase the capex", desc: "Open with the anchor attractions and party rooms, then add the second wave from trading cash flow, using layouts that reserve the future footprint and services up front." },
    ]}
    equipmentTitle="Attraction Blocks We Build Into an FEC Layout"
    equipmentIntro="Each block below is quoted as a self-contained zone with its own footprint, ceiling requirement, capacity and staffing figure, so the plan can be re-scoped without redrawing the venue."
    equipment={[
      { title: "Trampoline court", desc: "Freestyle beds, foam pits, dunk lanes and dodgeball courts with matched perimeter padding — the highest-dwell anchor for the 8–18 age band." },
      { title: "Multi-level soft play", desc: "Three- to four-level structure with slides, obstacles and a toddler sub-zone, carrying family visits across the widest age range." },
      { title: "Ninja and obstacle lanes", desc: "Timed lanes with adjustable difficulty, giving repeat-attempt throughput and natural leaderboard competition." },
      { title: "Interactive and gamified walls", desc: "Sensor walls, projection floors and reaction games that convert circulation space into billable attraction area." },
      { title: "Climbing and rope elements", desc: "Auto-belay walls and rope courses that use vertical volume where floor area is constrained." },
      { title: "Party and event rooms", desc: "Sound-separated rooms adjacent to the food line, sized for 12–20 guests, carrying the highest per-head margin in the venue." },
    ]}
    audienceTitle="Who Uses an FEC Plan Like This"
    audienceIntro="Multi-attraction planning suits operators whose site can support more than one anchor and who need the numbers zone by zone."
    audience={[
      { title: "Multi-attraction developers", desc: "Operators combining trampoline, play and ninja attractions under one roof and one ticketing system." },
      { title: "Existing single-attraction venues", desc: "Trampoline parks or play centres adding a second attraction to lift dwell time and off-peak trading." },
      { title: "Mall and cinema landlords", desc: "Landlords repurposing large vacant units into a family anchor with measurable footfall." },
      { title: "Resort and hospitality groups", desc: "Hotels and resorts building an all-weather family attraction to extend guest stay." },
    ]}
    related={[
      { label: "Trampoline park and FEC solutions", href: "/trampoline-park-fec-solutions" },
      { label: "Indoor playground business plan", href: "/indoor-playground-business-plan" },
      { label: "Gamified attractions manufacturer", href: "/gamified-attractions-manufacturer" },
      { label: "Commercial playground flooring and mats", href: "/commercial-indoor-playground-flooring-and-mats" },
      { label: "Investment and ROI hub", href: "/investment-opportunity" },
    ]}
    faq={[
      { title: "What is the difference between an FEC and an indoor playground?", desc: "An indoor playground is a single-attraction venue built around a play structure, usually serving ages 1–12. An FEC combines two or more attractions — trampoline, ninja, climbing, interactive games — plus food and party revenue, extending the age range to teenagers and adults and roughly doubling target dwell time." },
      { title: "How much space does an FEC need?", desc: "Two attractions plus food and party rooms work from about 1,500 m². Ceiling height matters as much as floor area: below 4.5 m you are limited to play and interactive attractions, while 6–7 m opens trampoline, rope courses and tall climbing structures." },
      { title: "Which attraction mix produces the best return?", desc: "The most reliable combination is one long-dwell anchor, one repeat-attempt attraction and a dedicated toddler zone, wrapped around a café with sightlines. That mix serves a whole family in one visit, which is what lifts spend per head rather than admission price." },
      { title: "Can attractions be added in phases?", desc: "Yes, and it is usually the lower-risk route. We design the full venue first, reserve footprint, ceiling anchor points and services for later zones, then supply phase one. Phase two installs into a prepared area without closing the trading floor for structural work." },
      { title: "Do you handle design, manufacturing and installation together?", desc: "Yes. We produce the 3D layout, manufacture the attraction equipment in our own factory to ASTM and TUV references, ship by container and supervise installation on site, so responsibility for fit and compliance stays with one supplier." },
    ]}
  />
);

export default FamilyEntertainmentCenterBusinessPlan;
