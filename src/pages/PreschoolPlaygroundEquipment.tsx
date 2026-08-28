import { StableSolutionPage } from "./StableSolutionPage";
import { productImages, projectImages } from "@/config/galleryImages";

const PreschoolPlaygroundEquipment = () => (
  <StableSolutionPage
    slug="preschool-playground-equipment-and-soft-play-design"
    title="Preschool Playground Equipment & Custom Soft Play Design"
    kicker="Ages 2–5 · Classroom-Adjacent Layouts · Ratio-Friendly Sightlines"
    description="Custom soft play built to preschool operating reality: 2–5 year old reach heights, one-adult-per-eight-children sightlines, 45-minute rotation blocks and equipment that folds back against the wall when the room becomes a classroom again."
    metaTitle="Preschool Playground Equipment & Soft Play Design"
    metaDescription="Custom soft play design for preschools: ages 2-5 reach heights, ratio-friendly sightlines, rotation-block layouts and foldaway equipment for shared classroom rooms."
    keywords={[
      "custom soft play design for preschools",
      "preschool playground equipment",
      "soft play equipment for nurseries",
      "commercial soft play equipment",
    ]}
    heroImage={productImages.softPlay}
    heroImageAlt="Preschool soft play equipment sized for children aged two to five"
    primaryCta="Get a Preschool Layout Proposal"
    secondaryCta="See Design Framework"
    metrics={[
      { value: "2–5 yrs", label: "Target age band" },
      { value: "≤ 900 mm", label: "Max free-standing play height" },
      { value: "1:8", label: "Supervision ratio designed for" },
      { value: "45 min", label: "Rotation block per group" },
    ]}
    frameworkTitle="Preschool Rooms Are Scheduled Spaces, Not Play Centres"
    frameworkIntro="A preschool play area is used in timetabled blocks by staff who are also counting heads, and the same room often reverts to circle time an hour later. That changes almost every specification decision compared with a commercial play hall."
    framework={[
      { title: "Set heights to 2–5 year old reach", desc: "Platforms at 300–600 mm, handholds at 550 mm, free-standing play elements capped at 900 mm so a teacher can lift a child down without a ladder." },
      { title: "Protect the supervision sightline", desc: "No enclosed tunnels above 600 mm, no opaque upper decks. One adult standing at the room entrance must see every child from a single position." },
      { title: "Design for 45-minute rotations", desc: "Four to five activity stations so a group of 16–24 children cycles through without queueing, and staff can call a station change without moving equipment." },
      { title: "Make it reversible", desc: "Modular soft blocks, castor-mounted arches and wall-hinged mats so the play zone folds to a 600 mm deep wall footprint when the room becomes a classroom." },
    ]}
    equipmentTitle="Soft Play Modules We Build for Preschool Rooms"
    equipmentIntro="All modules use CMHR foam cores with wipe-clean welded PVC skins, specified to the same cleaning chemistry preschools already use for tabletops and floors."
    equipment={[
      { title: "Modular soft block set", desc: "Wedges, arches, cylinders and steps in a 300 mm module grid so staff reconfigure the course weekly without tools or drawings." },
      { title: "Low climb-and-slide unit", desc: "600 mm deck with a two-step climb and a 1.1 m wide slide — the largest gross-motor challenge that still fits a 2–5 age band unsupervised at close range." },
      { title: "Tactile and mirror wall panels", desc: "Wall-mounted texture, gear, latch and mirror boards at 500–800 mm, chosen so a station works with two children at a time." },
      { title: "Balance and crossing set", desc: "Ground-level beams, stepping domes and a soft bridge for the vestibular practice that most preschool curriculums require weekly." },
      { title: "Role-play soft furniture", desc: "Soft shop counters, cars, boats and kitchen forms that double as circle-time seating when the play block ends." },
      { title: "Foldaway floor matting", desc: "Wall-hinged and tri-fold impact mats with edge ramps, so the floor build-up meets fall-height requirements only while the equipment is deployed." },
    ]}
    audienceTitle="Who Buys Preschool Soft Play Packages"
    audienceIntro="Preschool procurement is usually a single room, a fixed grant budget and a hard installation window during holidays — the projects below are quoted that way."
    audience={[
      { title: "Standalone preschools and nurseries", desc: "Single-site settings converting one room into a timetabled indoor gross-motor space." },
      { title: "Nursery chains and franchises", desc: "Multi-site groups needing a repeatable module list that installs identically across rooms of different sizes." },
      { title: "Kindergartens inside schools", desc: "Early-years wings that must match the school's existing safety documentation and inspection paperwork." },
      { title: "Church and community playgroups", desc: "Shared halls where equipment has to be stored away between sessions." },
    ]}
    gallery={[
      { src: productImages.softPlay, alt: "Preschool soft play modules with wipe-clean welded skins", caption: "Modular soft block set on a 300 mm grid — reconfigured by staff, no tools." },
      { src: projectImages.softPlayProject, alt: "Low climb and slide soft play unit for preschool children", caption: "600 mm deck with wide slide: gross-motor challenge inside a 2–5 age band." },
      { src: projectImages.indoorProject, alt: "Preschool play room layout with open sightlines for supervision", caption: "Open sightlines so one adult supervises every station from the doorway." },
    ]}
    specTable={{
      heading: "Preschool Room Sizing Guide",
      intro: "Typical module count and group size by available floor area, based on 45-minute rotation blocks.",
      caption: "Comparison of module count, group capacity and lead time by preschool room area",
      columns: ["Room area", "Activity stations", "Children per block", "Indicative package (USD)"],
      rows: [
        ["30–50 sqm", "3 stations", "12–16", "$4,000 – $9,000"],
        ["50–80 sqm", "4 stations", "16–24", "$9,000 – $18,000"],
        ["80–120 sqm", "5–6 stations", "24–32", "$18,000 – $32,000"],
        ["120+ sqm", "6–8 stations + role play", "32–48", "$32,000 – $60,000"],
      ],
      footnote: "Ranges cover soft play modules, wall panels and impact matting; site-specific flooring build-up and freight are quoted separately.",
    }}
    sources={[
      {
        label: "Caring for Our Children — Early Care and Education Standards",
        publisher: "American Academy of Pediatrics / National Resource Center",
        url: "https://nrckids.org/CFOC",
        note: "Referenced for supervision ratios and indoor activity space guidance in early-years settings.",
      },
      {
        label: "ASTM F1918-12 — Soft Contained Play Equipment",
        publisher: "ASTM International",
        url: "https://www.astm.org/f1918-12r19.html",
      },
      {
        label: "EN 1176 — Playground Equipment and Surfacing",
        publisher: "European Committee for Standardization (CEN)",
        url: "https://standards.cencenelec.eu/dyn/www/f?p=205:110:0::::FSP_PROJECT:22773",
      },
    ]}
    related={[
      { label: "Custom soft play for schools", href: "/custom-soft-play-equipment-manufacturer-for-schools" },
      { label: "Montessori indoor playground design", href: "/montessori-indoor-playground-design" },
      { label: "TUV certified playground equipment supplier", href: "/tuv-certified-playground-equipment-supplier" },
      { label: "Inclusive play center design", href: "/inclusive-play-center-design-for-children" },
      { label: "Soft play equipment range", href: "/products/soft-play" },
    ]}
    faq={[
      { title: "What height limits apply to preschool soft play?", desc: "Free-standing play elements for 2–5 year olds are normally capped at 900 mm, with decks at 300–600 mm and any enclosed element kept under 600 mm so staff can reach in. Above those heights the equipment moves into a supervised commercial play-hall specification with a deeper impact-attenuating floor build-up." },
      { title: "How large a room does a preschool play area need?", desc: "A workable three-station rotation fits in 30–50 sqm for 12–16 children. Below 30 sqm we specify wall-mounted panels plus a foldaway mat set rather than a structure, so the room still functions as a classroom." },
      { title: "Can the equipment be stored away between sessions?", desc: "Yes. Modular blocks stack, arches sit on lockable castors and matting is tri-fold or wall-hinged. A trained pair of staff clears a four-station layout to a 600 mm deep wall footprint in about ten minutes." },
      { title: "What cleaning products can be used on the soft play skins?", desc: "Neutral detergent and standard quaternary-ammonium wipes are safe on the welded PVC skins. Solvent, bleach above 1,000 ppm and alcohol gels degrade the welds — we supply a chemical compatibility sheet with every package." },
      { title: "What is the lead time for a preschool package?", desc: "Standard modules ship in 15–20 days; fully custom themed rooms run 25–35 days plus freight. Most preschools schedule production so installation falls inside a holiday week, which we hold as a fixed date in the contract." },
    ]}
  />
);

export default PreschoolPlaygroundEquipment;
