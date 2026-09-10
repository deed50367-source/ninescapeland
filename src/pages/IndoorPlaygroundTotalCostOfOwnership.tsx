import { StableSolutionPage } from "./StableSolutionPage";
import { productImages, projectImages, heroImages } from "@/config/galleryImages";

const IndoorPlaygroundTotalCostOfOwnership = () => (
  <StableSolutionPage
    slug="indoor-playground-total-cost-of-ownership"
    title="Indoor Playground Total Cost of Ownership Over 10 Years"
    kicker="Purchase Price vs 10-Year Cost · Wear Parts · Refresh Cycles"
    description="Purchase price is roughly half of what an indoor playground costs over a decade. This guide breaks down the 10-year cost of ownership — wear parts, surfacing, inspections, refresh cycles and downtime — so two quotes can be compared honestly."
    metaTitle="Indoor Playground Total Cost of Ownership"
    metaDescription="Compare indoor playground total cost of ownership over 10 years: wear parts, surfacing, inspections, refresh cycles, downtime and spare-part risk, not just purchase price."
    keywords={[
      "indoor playground total cost of ownership",
      "indoor playground equipment lifecycle cost",
      "cost effective playground investment comparison",
      "playground equipment replacement cycle",
    ]}
    heroImage={heroImages.process}
    heroImageAlt="Indoor playground layout drawing used to plan lifecycle cost and refresh phases"
    primaryCta="Request a 10-Year Cost Model"
    secondaryCta="See Cost Framework"
    metrics={[
      { value: "40–60%", label: "Share of 10-year cost that is not purchase price" },
      { value: "8–12 yr", label: "Structural life of a well-specified frame" },
      { value: "2–4 yr", label: "Refresh cycle for soft covers and netting" },
      { value: "12 mo", label: "Interval for a documented inspection cycle" },
    ]}
    frameworkTitle="Six Cost Lines a Purchase Price Hides"
    frameworkIntro="Two quotes can differ by 20% on price and by far more over ten years. These are the lines that decide which one is actually cheaper."
    framework={[
      { title: "Wear parts and their replacement interval", desc: "Netting, soft covers, slide surfaces, foam and padding wear on a 2–4 year cycle in a commercial venue. Ask for the wear-part list with unit prices and expected intervals before comparing quotes — a cheap frame with proprietary consumables is rarely cheaper." },
      { title: "Surfacing renewal, not just installation", desc: "Impact-attenuating flooring is a recurring cost. Confirm the tested critical fall height, the renewal interval under your traffic, and whether sections can be replaced individually or the whole area must be relaid." },
      { title: "Inspection, documentation and compliance", desc: "Budget an annual documented inspection plus routine operational checks. Equipment supplied without test reports, drawings and a maintenance schedule costs more later in insurance friction and re-certification work." },
      { title: "Refresh to keep visits repeating", desc: "Revenue decays when a venue looks unchanged. Plan a partial refresh — new panels, a reconfigured zone, added interactive elements — around year three to four, and choose modular equipment so refresh does not mean replacement." },
      { title: "Downtime and spare-part lead time", desc: "A closed zone costs revenue every day it is closed. Ask for the spare-part stock policy, lead time to your country, and whether common parts are standard or proprietary. Long lead times are a hidden operating cost." },
      { title: "End-of-life and reconfiguration value", desc: "Modular, bolt-together structures can be relocated, resized or partly resold; welded one-off structures usually cannot. Residual and reconfiguration value is a real line in a ten-year comparison." },
    ]}
    equipmentTitle="Where Lifecycle Cost Concentrates by Equipment Type"
    equipmentIntro="Different equipment types fail in different places. Knowing where the recurring spend sits changes what is worth paying more for at purchase."
    equipment={[
      { title: "Soft contained play structure", desc: "Frame lasts; covers, netting and slide surfaces do not. Pay for welded-seam, replaceable covers and standard tube sizes so refresh is a panel order rather than a rebuild." },
      { title: "Trampoline park bays", desc: "Beds, springs and pads are the recurring line, driven directly by jump hours. Bed and pad replacement schedules — not frame price — decide the ten-year figure." },
      { title: "Ninja and obstacle courses", desc: "Grips, ropes, hanging elements and landing surfacing wear fastest. Standard, individually replaceable attachment points keep the cost linear instead of stepped." },
      { title: "Impact-attenuating flooring", desc: "Replaceable tiles or sectional systems limit renewal to worn areas; poured or bonded systems usually renew as a whole area at much higher cost." },
      { title: "Interactive and powered elements", desc: "Add licence, lamp, controller and support costs. Worth it where content change drives repeat visits, but the subscription term belongs in the ten-year model." },
      { title: "Modular reconfigurable elements", desc: "Highest flexibility value: a reconfiguration in year four can substitute for a large part of a refresh budget and extends the earning life of the same components." },
    ]}
    audienceTitle="Who Needs a Ten-Year View"
    audienceIntro="Anyone comparing quotes, financing equipment or defending a capital request will decide better on lifecycle cost than on purchase price."
    audience={[
      { title: "Play centre and FEC operators", desc: "Owners comparing supplier quotes who need wear-part pricing and refresh timing before signing, not after the first busy summer." },
      { title: "Schools and childcare groups", desc: "Institutions with fixed maintenance budgets that must avoid an unplanned replacement in year five and need documentation for compliance files." },
      { title: "Investors and franchise developers", desc: "Stakeholders modelling multi-site returns where maintenance, refresh and downtime materially change payback." },
      { title: "Property, mall and hotel operators", desc: "Owners whose play area supports footfall and who need a predictable annual cost rather than a one-off capital number." },
    ]}
    gallery={[
      { src: projectImages.indoorProject, alt: "Soft play structure showing replaceable covers and netting panels", caption: "Replaceable covers and standard tube sizes make refresh a panel order." },
      { src: projectImages.trampolineProject, alt: "Trampoline bays where beds, springs and pads drive lifecycle cost", caption: "In trampoline bays, beds, springs and pads are the recurring cost line." },
      { src: productImages.ninjaCourse, alt: "Obstacle course with individually replaceable grips and hanging elements", caption: "Individually replaceable attachment points keep wear cost linear." },
    ]}
    specTable={{
      heading: "10-Year Cost Line Comparison",
      intro: "Where recurring spend lands, how often, and what reduces it at specification stage.",
      caption: "Comparison of cost line, typical interval, share of ten-year cost and the specification choice that reduces it",
      columns: ["Cost line", "Interval", "Share of 10-yr cost", "What reduces it"],
      rows: [
        ["Purchase & installation", "Year 0", "40–60%", "Modular standard components"],
        ["Wear parts (covers, netting, pads)", "2–4 yr", "10–20%", "Welded-seam replaceable covers"],
        ["Surfacing renewal", "5–8 yr", "5–15%", "Sectional replaceable tiles"],
        ["Inspection & documentation", "Annual", "3–8%", "Full test-report handover"],
        ["Refresh / reconfiguration", "3–5 yr", "10–20%", "Bolt-together modular layout"],
        ["Downtime & spare parts", "Ongoing", "2–8%", "Local spares, standard parts"],
      ],
      footnote: "Shares are planning ranges for commercial venues and vary with traffic hours, climate, staffing and how the venue is programmed; they are not a quotation.",
    }}
    sources={[
      {
        label: "ASTM F1487-21 — Playground Equipment for Public Use",
        publisher: "ASTM International",
        url: "https://www.astm.org/f1487-21.html",
        note: "Referenced for inspection and maintenance expectations across equipment life.",
      },
      {
        label: "ASTM F2970-15 — Trampoline Courts",
        publisher: "ASTM International",
        url: "https://www.astm.org/f2970-15.html",
        note: "Applies to trampoline bed, spring and pad inspection intervals.",
      },
      {
        label: "EN 1176-7 — Guidance on Installation, Inspection, Maintenance and Operation",
        publisher: "European Committee for Standardization",
        url: "https://www.en-standard.eu/csn-en-1176-7-playground-equipment-and-surfacing-part-7-guidance-on-installation-inspection-maintenance-and-operation/",
      },
    ]}
    related={[
      { label: "Custom indoor playground cost", href: "/custom-indoor-playground-cost" },
      { label: "Maintenance & warranty", href: "/maintenance-warranty" },
      { label: "Indoor playground business plan", href: "/indoor-playground-business-plan" },
      { label: "FEC business plan", href: "/family-entertainment-center-business-plan" },
      { label: "Modular reconfigurable play equipment", href: "/modular-reconfigurable-indoor-play-equipment" },
      { label: "Playground flooring & mats", href: "/commercial-indoor-playground-flooring-and-mats" },
    ]}
    faq={[
      { title: "What is the total cost of ownership of an indoor playground?", desc: "Over ten years, purchase and installation is typically 40–60% of the total. The rest is wear parts on a 2–4 year cycle, surfacing renewal, annual inspection, a refresh around year three to four, and downtime and spare-part cost." },
      { title: "How long does commercial indoor playground equipment last?", desc: "A well-specified steel frame commonly lasts 8–12 years or more in a commercial venue, while soft covers, netting, slide surfaces and padding are consumables replaced every two to four years depending on traffic hours." },
      { title: "How do I compare two quotes fairly?", desc: "Ask both suppliers for the wear-part list with unit prices and intervals, the surfacing renewal method, spare-part lead time to your country, and whether components are standard or proprietary. Then model ten years, not the invoice." },
      { title: "When should a venue plan a refresh?", desc: "Plan a partial refresh around year three to four — reconfigured zones, new panels, added elements — because visit frequency decays when a venue looks unchanged. Modular equipment lets refresh happen without replacing the structure." },
      { title: "Does modular equipment really cost less over time?", desc: "Usually yes, for two reasons: individual components can be replaced instead of whole assemblies, and the layout can be reconfigured in later years to substitute for part of a refresh budget while keeping residual value." },
      { title: "Can NinescapeLand provide a ten-year cost model for our project?", desc: "Yes. With your floor plan, expected opening hours and target age mix we return an equipment quotation alongside a wear-part schedule, inspection plan and refresh timeline so your board sees the ten-year figure, not just the purchase price." },
    ]}
  />
);

export default IndoorPlaygroundTotalCostOfOwnership;
