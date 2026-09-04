import { StableSolutionPage } from "./StableSolutionPage";
import { productImages, projectImages, heroImages } from "@/config/galleryImages";

const EarlyChildhoodCenterPlaygroundEquipment = () => (
  <StableSolutionPage
    slug="indoor-playground-equipment-for-early-childhood-centers"
    title="Indoor Playground Equipment for Early Childhood Centers"
    kicker="Procurement Specs · Licensing Evidence · Whole-Life Cost"
    description="A procurement specification for early childhood centers: the certificates and test reports to demand, the materials that survive daily disinfection, and the whole-life cost that decides which quote is actually cheaper."
    metaTitle="Indoor Play Equipment for Early Childhood Centers"
    metaDescription="Procurement spec for early childhood center indoor play equipment: certificates to demand, disinfection-safe materials, warranty terms and 10-year whole-life cost comparison."
    keywords={[
      "indoor playground equipment for early childhood centers",
      "early childhood center play equipment procurement",
      "childcare centre indoor play equipment",
      "nursery play equipment certification",
    ]}
    heroImage={productImages.indoorPlayground}
    heroImageAlt="Indoor play equipment installed inside an early childhood education center"
    primaryCta="Request a Spec Sheet & Quote"
    secondaryCta="See Procurement Checklist"
    metrics={[
      { value: "6 docs", label: "Evidence pack per order" },
      { value: "10 yr", label: "Whole-life cost horizon" },
      { value: "≥ 1,000", label: "Disinfection cycles tested" },
      { value: "2–5 yr", label: "Structural warranty range" },
    ]}
    frameworkTitle="Buy on Evidence, Not on the Render"
    frameworkIntro="Early childhood centers are licensed premises, so a purchase has to survive inspection, daily cleaning chemistry and staff turnover — three tests a photorealistic render says nothing about. These are the five checks that separate a compliant supply from a cheap one."
    framework={[
      { title: "Demand the evidence pack up front", desc: "Test reports (ASTM F1918 / F1487 or EN 1176 as applicable), surfacing impact-attenuation reports to ASTM F1292 or EN 1177, flammability and material safety data, foam density declaration, weld or fastener spec, and the as-built dimensioned drawing. If a supplier can only send photos, that is the answer." },
      { title: "Specify for disinfection, not just cleaning", desc: "Vinyl and coatings must be rated for the disinfectant class the centre actually uses. Ask for cycle testing rather than a wipe-clean claim, and specify seamless welded covers so fluids cannot reach the foam core." },
      { title: "Match equipment to the licensed age bands", desc: "Under-2, 2–3 and 3–5 rooms need different reach heights, step rises and fall heights. One shared structure across the bands is the most common licensing objection and the most common cause of a re-fit within two years." },
      { title: "Write the warranty into the order", desc: "Separate structural, soft-covering and moving-part terms, with named wear items, response times and spare-part availability in years. A single headline warranty figure usually excludes exactly what wears out first." },
      { title: "Compare on whole-life cost", desc: "Add re-covering, part replacement, annual inspection and expected downtime over ten years. The lower quote frequently loses once re-covering at year three is priced in." },
    ]}
    equipmentTitle="Equipment Categories and What to Specify"
    equipmentIntro="Category by category, the specification detail that actually determines whether it passes inspection and lasts."
    equipment={[
      { title: "Infant and toddler soft forms", desc: "High-density foam with seamless welded covers, low step rises for emerging walkers, and rounded edges throughout — specify foam density and cover weight, not just colours." },
      { title: "Compact multi-level climbers", desc: "Sized to clear ceiling height with guarded platform edges, gaps outside the 89–230 mm entrapment band and a documented critical fall height for the room's surfacing build-up." },
      { title: "Slides and tunnels", desc: "Enclosed sides, run-off space at the exit and inspection access inside tunnels so staff can confirm the interior is clean and clear without dismantling." },
      { title: "Balance and stepping sets", desc: "Non-slip surfacing, low heights and independent placement so the set can be repositioned during term-time rotation." },
      { title: "Ball pools and enclosures", desc: "Drainable bases, quick-access ball extraction for washing cycles, and a documented ball count and cleaning schedule the centre can show at inspection." },
      { title: "Wall-mounted activity panels", desc: "Recessed fixings, no protrusions and captive parts — the highest play value per square metre in rooms that double as classrooms." },
    ]}
    audienceTitle="Who This Specification Is For"
    audienceIntro="Written for the person signing the purchase order and carrying the compliance risk afterwards."
    audience={[
      { title: "Childcare and nursery groups", desc: "Multi-site operators standardising equipment so every room passes the same inspection checklist." },
      { title: "Early childhood center directors", desc: "Single-site leaders replacing worn equipment on a fixed capital budget who need the durable option, not the cheapest." },
      { title: "Special education providers", desc: "Settings needing documented material safety and repositionable equipment for children with additional needs." },
      { title: "Facility and procurement managers", desc: "Buyers running a tender who need comparable specifications from every bidder rather than four incompatible brochures." },
    ]}
    gallery={[
      { src: productImages.indoorPlayground, alt: "Early childhood centre indoor play structure with guarded platforms", caption: "Compact multi-level climber specified to the room's clear ceiling height." },
      { src: projectImages.softPlayProject, alt: "Soft play forms with seamless welded covers for infant rooms", caption: "Seamless welded covers rated for the centre's disinfectant class." },
      { src: heroImages.faq, alt: "Early childhood education room with indoor play equipment in daily use", caption: "Wall-mounted panels give the highest play value in shared classrooms." },
    ]}
    specTable={{
      heading: "Procurement Evidence Checklist",
      intro: "Ask every bidder for the same six documents, then compare like for like.",
      caption: "Required documentation, its purpose and where it is checked",
      columns: ["Document", "What it proves", "Checked by"],
      rows: [
        ["Equipment test report (ASTM F1487 / EN 1176)", "Structure, gaps and protrusions comply", "Licensing inspector"],
        ["Surfacing report (ASTM F1292 / EN 1177)", "Impact attenuation for the installed fall height", "Licensing inspector"],
        ["Flammability & material safety data", "Coverings and foam meet fire and content limits", "Fire officer / licensing"],
        ["Foam density & cover weight declaration", "Soft forms will not compress out in a year", "Procurement"],
        ["Warranty schedule with named wear items", "Who pays for re-covering and moving parts", "Procurement / finance"],
        ["As-built dimensioned drawing", "Clearances, exits and area per child in the real room", "Architect / licensing"],
      ],
      footnote: "Standards apply by market — ASTM in North America, EN in Europe and the UK — and centres in other regions are typically asked to evidence one of the two. Confirm the applicable set with your licensing authority before tendering.",
    }}
    sources={[
      {
        label: "ASTM F1487-21 — Playground Equipment for Public Use",
        publisher: "ASTM International",
        url: "https://www.astm.org/f1487-21.html",
      },
      {
        label: "ASTM F1292 — Impact Attenuation of Surfacing Materials",
        publisher: "ASTM International",
        url: "https://www.astm.org/f1292-22.html",
      },
      {
        label: "Caring for Our Children — Early Care and Education Standards",
        publisher: "American Academy of Pediatrics / National Resource Center",
        url: "https://nrckids.org/CFOC",
        note: "Referenced for early care facility equipment, sanitation and supervision expectations.",
      },
    ]}
    related={[
      { label: "How to design an educational play area", href: "/how-to-design-an-educational-indoor-play-area" },
      { label: "Preschool playground equipment", href: "/preschool-playground-equipment-and-soft-play-design" },
      { label: "TUV certified supplier check", href: "/tuv-certified-playground-equipment-supplier" },
      { label: "Hygienic play areas for infants", href: "/hygienic-indoor-playground-for-infants" },
      { label: "Modular reconfigurable play equipment", href: "/modular-reconfigurable-indoor-play-equipment" },
      { label: "Indoor playground equipment", href: "/products/indoor-playground" },
    ]}
    faq={[
      { title: "What indoor play equipment do early childhood centers need?", desc: "A typical licensed room needs infant and toddler soft forms, one compact multi-level climber sized to the ceiling height, a slide with run-off space, a balance and stepping set, an optional ball pool with a documented cleaning cycle, and wall-mounted activity panels. Each item should be specified for a single licensed age band rather than shared across all rooms." },
      { title: "What certificates should we ask a supplier for?", desc: "Six documents: equipment test report to ASTM F1487 or EN 1176, surfacing impact-attenuation report to ASTM F1292 or EN 1177, flammability and material safety data, foam density and cover weight declaration, a warranty schedule naming wear items, and an as-built dimensioned drawing. Compare bidders only once all six are on the table." },
      { title: "How do we choose equipment that survives daily disinfection?", desc: "Specify vinyl and coatings rated for the disinfectant class your centre actually uses and ask for cycle testing rather than a wipe-clean claim. Seamless welded covers matter more than material grade, because failures start at stitched seams where fluid reaches the foam." },
      { title: "Is the cheapest quote usually the cheapest purchase?", desc: "Rarely. Once re-covering around year three, wear-part replacement, annual inspection and downtime are added, a ten-year comparison often reverses the ranking. Ask each bidder to price the same ten-year schedule instead of the supply only." },
      { title: "Can one structure serve under-2s and 3–5s?", desc: "It is the most common licensing objection. Reach heights, step rises and fall heights differ across the bands, so a shared structure is either unsafe for the youngest or dull for the oldest. Separate zones per licensed room are cheaper than a re-fit two years later." },
    ]}
  />
);

export default EarlyChildhoodCenterPlaygroundEquipment;
