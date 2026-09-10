import { StableSolutionPage } from "./StableSolutionPage";
import { productImages, projectImages, heroImages } from "@/config/galleryImages";

const DaycareIndoorPlaygroundEquipment = () => (
  <StableSolutionPage
    slug="daycare-indoor-playground-equipment"
    title="Daycare Indoor Playground Equipment & Licensing Fit"
    kicker="Licensing Inspections · Ratios · Room-by-Room Equipment"
    description="Daycare equipment is bought against a licensing inspection, not a catalogue. This guide maps indoor playground equipment to room ages, group sizes, fall-height limits, cleanable materials and the documents an inspector asks to see."
    metaTitle="Daycare Indoor Playground Equipment Guide"
    metaDescription="Choose daycare indoor playground equipment by room age and licensing rules: fall heights, ratios, cleanable materials, anchoring, and the certificates inspectors ask for."
    keywords={[
      "daycare playground equipment",
      "daycare indoor playground equipment",
      "childcare centre indoor play equipment",
      "licensed daycare play area requirements",
    ]}
    heroImage={projectImages.indoorProject}
    heroImageAlt="Indoor daycare play room with low soft play equipment and cleanable surfaces"
    primaryCta="Request a Daycare Room Plan"
    secondaryCta="See Licensing Framework"
    metrics={[
      { value: "≤ 600 mm", label: "Fall height for under-2 rooms" },
      { value: "≤ 1,500 mm", label: "Fall height for 2–5 rooms" },
      { value: "1:4 – 1:10", label: "Ratio band by room age" },
      { value: "2.3–3.3 m²", label: "Indoor area per child, common minimum" },
    ]}
    frameworkTitle="Buy Against the Inspection, Room by Room"
    frameworkIntro="Licensing rules differ by state and country, but inspectors consistently examine the same five things: fall height, entrapment, anchoring, cleanability and paperwork. Specify each room against those, then choose equipment."
    framework={[
      { title: "Split the specification by room, not by centre", desc: "An infant room, a toddler room and a pre-K room have different fall heights, different ratios and different equipment. One structure sized for the oldest cohort will fail the youngest room's inspection." },
      { title: "Fix fall height before shape", desc: "Keep platforms at or below roughly 600 mm where non-walkers and early walkers play, and below 1,500 mm for 2–5s, with impact-attenuating surfacing carried through the full use zone rather than only under the platform." },
      { title: "Eliminate entrapment and finger traps at the design stage", desc: "Openings must not admit a torso while trapping a head, and gaps must not catch fingers or drawstrings. This is the most common daycare failure point and the cheapest one to design out early." },
      { title: "Anchor and stabilise everything a toddler can climb", desc: "Shelving, dividers, low houses and climbers are climbed regardless of intent. Wall-fix or ballast every unit, and record fixings so a maintenance log can be produced on request." },
      { title: "Choose materials for a daily disinfection cycle", desc: "Specify closed-cell, non-absorbent covers with welded rather than stitched seams, wipeable soft-play skins, and no fabric that cannot be laundered or replaced. Confirm the disinfectant compatibility in writing." },
      { title: "Collect the paperwork with the order", desc: "Ask for material and flammability test reports, phthalate and heavy-metal declarations, load and stability calculations, installation records and a maintenance schedule. Inspectors accept documents, not assurances." },
    ]}
    equipmentTitle="Equipment by Daycare Room"
    equipmentIntro="Room-specific equipment sets, chosen for ratio, fall height and cleaning cycle rather than for visual impact."
    equipment={[
      { title: "Infant room — floor-level soft forms", desc: "Low wedges, tunnels, mirrors and pull-up rails under 600 mm. Everything wipeable, nothing that requires an adult to lift a child onto it." },
      { title: "Toddler room — first climb and slide", desc: "A single-level climber with a wide short slide, generous handrails and a run-off zone, kept inside the toddler fall-height limit and visible from the changing area." },
      { title: "Pre-K room — two-level structure", desc: "A compact structure with a crawl deck, small slide and role-play panels, split into an easy and a harder route so the whole 3–5 cohort is occupied." },
      { title: "Gross motor / multi-purpose hall", desc: "Mobile blocks, balance beams, tunnels and roll-out mats so a shared hall covers several rooms across a timetable and clears for naps or meals." },
      { title: "Sensory and regulation corner", desc: "Tactile panels, light and sound elements and a cushioned retreat space for children who need to step out of a busy room without leaving staff sightlines." },
      { title: "Storage and hygiene support", desc: "Trolley stores, labelled bins for equipment quarantine after illness, and shelving that is wall-fixed and toddler-proof." },
    ]}
    audienceTitle="Centres This Specification Fits"
    audienceIntro="Licensed childcare operators buying against an inspection, a ratio and a cleaning routine."
    audience={[
      { title: "Licensed daycare and nursery chains", desc: "Multi-site operators needing one specification that passes inspection in every location and can be reordered as rooms are refitted." },
      { title: "Single-site childcare centres", desc: "Owners refitting one or two rooms who need equipment sized to an exact room, not a catalogue package." },
      { title: "Employer and hospital childcare", desc: "On-site facilities with tight footprints, high hygiene expectations and shared multi-purpose rooms." },
      { title: "Faith-based and community childcare", desc: "Volunteer-supported centres needing open sightlines and equipment that packs away when the room changes use." },
    ]}
    gallery={[
      { src: projectImages.softPlayProject, alt: "Low soft play forms for a daycare infant room", caption: "Infant rooms stay at floor level with wipeable, welded-seam covers." },
      { src: productImages.softPlay, alt: "Toddler climber with wide short slide for a childcare room", caption: "Toddler climbers stay inside the room's fall-height limit." },
      { src: heroImages.home, alt: "Multi-purpose daycare hall with mobile gross motor equipment", caption: "Shared halls use mobile equipment so the floor clears for meals and naps." },
    ]}
    specTable={{
      heading: "Daycare Room Specification Comparison",
      intro: "Fall height, ratio band and equipment set by room age group.",
      caption: "Comparison of fall height, staff ratio, group size and equipment set by daycare room age",
      columns: ["Room", "Age", "Max fall height", "Typical ratio", "Core equipment"],
      rows: [
        ["Infant", "0–18 mo", "≤ 600 mm", "1:3 – 1:4", "Floor forms, rails, mirrors"],
        ["Toddler", "18–36 mo", "≤ 1,000 mm", "1:4 – 1:6", "First climber, wide slide"],
        ["Pre-K", "3–5 yrs", "≤ 1,500 mm", "1:8 – 1:10", "Two-level structure, role play"],
        ["Gross motor hall", "1–5 yrs", "≤ 1,500 mm", "By cohort", "Mobile blocks, beams, mats"],
        ["Sensory corner", "All", "Floor level", "By cohort", "Tactile, light, retreat space"],
      ],
      footnote: "Ratios and area minimums vary by jurisdiction; confirm the values in your licensing regulation before ordering. Figures shown are common regulatory bands, not a legal standard.",
    }}
    sources={[
      {
        label: "Public Playground Safety Handbook (CPSC 325)",
        publisher: "U.S. Consumer Product Safety Commission",
        url: "https://www.cpsc.gov/s3fs-public/325.pdf",
        note: "Entrapment, fall height and use-zone guidance for young children.",
      },
      {
        label: "Caring for Our Children — National Health and Safety Performance Standards",
        publisher: "American Academy of Pediatrics / NRC for Health and Safety in Child Care",
        url: "https://nrckids.org/CFOC",
        note: "Reference standards for childcare ratios, hygiene and play area safety.",
      },
      {
        label: "ASTM F1918 — Soft Contained Play Equipment",
        publisher: "ASTM International",
        url: "https://www.astm.org/f1918-98r18.html",
      },
      {
        label: "EN 1176 — Playground Equipment and Surfacing",
        publisher: "European Committee for Standardization",
        url: "https://www.en-standard.eu/csn-en-1176-1-playground-equipment-and-surfacing-part-1-general-safety-requirements-and-test-methods/",
      },
    ]}
    related={[
      { label: "Early childhood centre equipment", href: "/indoor-playground-equipment-for-early-childhood-centers" },
      { label: "Hygienic infant play areas", href: "/hygienic-indoor-playground-for-infants" },
      { label: "Preschool playground equipment", href: "/preschool-playground-equipment-and-soft-play-design" },
      { label: "Play equipment for small spaces", href: "/safe-indoor-playground-equipment-for-small-spaces" },
      { label: "TUV certified supplier check", href: "/tuv-certified-playground-equipment-supplier" },
      { label: "Soft play equipment", href: "/products/soft-play" },
    ]}
    faq={[
      { title: "What playground equipment does a daycare need?", desc: "Specify by room: floor-level soft forms and pull-up rails for infants, a single-level climber with a wide short slide for toddlers, a two-level structure with role-play panels for pre-K, plus mobile gross-motor equipment for a shared hall and a sensory retreat corner." },
      { title: "What fall height is allowed in a daycare play room?", desc: "Common regulatory practice keeps platforms at or below about 600 mm where non-walkers and early walkers play and below 1,500 mm for 2–5s, with impact-attenuating surfacing across the whole use zone. Confirm the exact limit in your local licensing regulation." },
      { title: "How much indoor play space is required per child?", desc: "Many jurisdictions set an indoor minimum around 2.3–3.3 m² of usable space per child, excluding cots, toilets and storage. Plan equipment footprints against the usable figure your inspector measures, not the gross room area." },
      { title: "Which materials survive daily disinfection?", desc: "Closed-cell foam with welded-seam, non-absorbent covers, powder-coated or HDPE surfaces and removable washable fabric only where laundering is practical. Ask the supplier to confirm compatibility with the disinfectant your centre actually uses." },
      { title: "What documents does a licensing inspector ask for?", desc: "Typically material and flammability test reports, phthalate and heavy-metal declarations, stability and load calculations, installation and anchoring records, and a written maintenance and inspection schedule. Request these with the order rather than afterwards." },
      { title: "Can equipment be sized to an existing daycare room?", desc: "Yes. Send room dimensions, ceiling height, door widths, column positions and the age cohort, and we return a 3D layout with fall heights, use zones, sightlines and the certificate list for your inspection file." },
    ]}
  />
);

export default DaycareIndoorPlaygroundEquipment;
