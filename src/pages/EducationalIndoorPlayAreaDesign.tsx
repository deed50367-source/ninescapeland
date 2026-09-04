import { StableSolutionPage } from "./StableSolutionPage";
import { productImages, projectImages, heroImages } from "@/config/galleryImages";

const EducationalIndoorPlayAreaDesign = () => (
  <StableSolutionPage
    slug="how-to-design-an-educational-indoor-play-area"
    title="How to Design an Educational Indoor Play Area"
    kicker="Zone-to-Objective Mapping · Circulation · Staff Sightlines"
    description="A design method, not an equipment list: map each zone to a specific developmental objective, then set circulation, sightlines and dwell time so the space teaches on its own without extra staff effort."
    metaTitle="How to Design an Educational Indoor Play Area"
    metaDescription="Design method for educational indoor play areas: map zones to developmental objectives, set circulation loops, staff sightlines and dwell times before choosing equipment."
    keywords={[
      "how to design an educational indoor play area",
      "educational indoor play area design",
      "indoor play area zone layout",
      "learning objective play zones",
    ]}
    heroImage={heroImages.process}
    heroImageAlt="3D layout plan of an educational indoor play area divided into learning zones"
    primaryCta="Get a Free Zoned 3D Layout"
    secondaryCta="See the Design Method"
    metrics={[
      { value: "5 zones", label: "Objective-mapped areas" },
      { value: "1.5 m", label: "Minimum circulation aisle" },
      { value: "≤ 1.2 m", label: "Sightline barrier height" },
      { value: "15–20 min", label: "Target dwell per zone" },
    ]}
    frameworkTitle="Design Backwards From the Learning Objective"
    frameworkIntro="Most indoor play areas are drawn as an equipment layout and the educational value is claimed afterwards. Reversing that order — objective first, then the physical envelope, then the equipment — is what makes a space defensible to parents, inspectors and funders."
    framework={[
      { title: "Step 1 — Write the objective per zone", desc: "Each zone gets one primary objective: gross motor, balance and vestibular input, fine motor and construction, cooperative role play, or quiet regulation. One objective per zone prevents the single crowded structure that does everything badly." },
      { title: "Step 2 — Set the envelope before the equipment", desc: "Measure clear ceiling height, column grid, door widths and the sprinkler and lighting plane. These four numbers decide which zones are even possible, and they are the details most often discovered too late." },
      { title: "Step 3 — Draw circulation as a loop", desc: "A single one-way loop with 1.5 m aisles and one entry funnel removes the dead-end corners where crowding and conflict happen. Children should be able to complete a full circuit without crossing another zone's activity." },
      { title: "Step 4 — Protect the sightlines", desc: "Keep dividers under 1.2 m so one adult can see every zone from the supervision point. Half-open screening reduces over-stimulation without blinding staff — the balance early years teams ask for most." },
      { title: "Step 5 — Plan for reconfiguration", desc: "Specify at least one zone on castors or interlocking modules so the layout can be rotated each term. Novelty, not more equipment, is what restores engagement after week six." },
    ]}
    equipmentTitle="What Goes Into Each Objective Zone"
    equipmentIntro="These are the elements that reliably deliver the objective their zone was drawn for, sized for indoor ceiling heights and continuous group use."
    equipment={[
      { title: "Gross motor zone", desc: "Multi-level climber, net traverse and slide with a documented critical fall height and matched attenuating surfacing — the zone that absorbs arrival energy." },
      { title: "Balance and vestibular zone", desc: "Wobble beams, stepping pods, rope bridges and low ninja elements that train posture and body awareness in a small footprint." },
      { title: "Construction and fine motor zone", desc: "Soft blocks, magnetic and gear walls, and low tables at seated reach — the zone that produces the longest single-child dwell time." },
      { title: "Cooperative role play zone", desc: "Themed shop, kitchen or vehicle modules that require two or more children to complete an activity, driving the language outcomes educators are assessed on." },
      { title: "Quiet regulation nook", desc: "Enclosed soft seating with dimmable light and tactile panels, positioned off the main loop so a child can withdraw without leaving supervision." },
      { title: "Staff and storage spine", desc: "A wall-side band for rotation stock, cleaning access and a supervision point with a clear view of all zones — the part that makes daily operation sustainable." },
    ]}
    audienceTitle="Who Uses This Design Method"
    audienceIntro="This method is written for the people who have to justify a play space as educational infrastructure rather than entertainment."
    audience={[
      { title: "Early years and childcare leaders", desc: "Settings that must show how the physical environment supports curriculum outcomes at inspection." },
      { title: "Learning and therapy centres", desc: "Providers combining assessment or therapy goals with open play, where zoning determines whether both can happen at once." },
      { title: "Architects and fit-out contractors", desc: "Teams needing zone areas, aisle widths and fall-height envelopes before the drawings are frozen." },
      { title: "Commercial play operators", desc: "Venues that want a genuine educational claim to sell weekday off-peak sessions to schools and nurseries." },
    ]}
    gallery={[
      { src: heroImages.process, alt: "3D design plan showing an educational indoor play area split into zones", caption: "Objective-mapped zoning, drawn before any equipment is selected." },
      { src: projectImages.indoorProject, alt: "Gross motor climbing zone inside an educational indoor play area", caption: "Gross motor zone positioned to absorb arrival energy near the entry funnel." },
      { src: productImages.softPlay, alt: "Soft construction and fine motor play area for an education setting", caption: "Construction zone at seated reach — the longest single-child dwell time." },
    ]}
    specTable={{
      heading: "Zone-to-Objective Planning Table",
      intro: "The numbers to fix per zone before equipment selection begins.",
      caption: "Area allowance, developmental objective and dwell time by play zone",
      columns: ["Zone", "Primary objective", "Area share", "Typical dwell"],
      rows: [
        ["Gross motor", "Strength, coordination, risk judgement", "35–40%", "15–20 min"],
        ["Balance / vestibular", "Posture, body awareness", "10–15%", "8–12 min"],
        ["Construction / fine motor", "Grip, planning, problem solving", "15–20%", "20–30 min"],
        ["Cooperative role play", "Language, turn taking, negotiation", "15–20%", "15–25 min"],
        ["Quiet regulation", "Self-regulation, sensory recovery", "5–10%", "5–10 min"],
      ],
      footnote: "Area shares are of net play area, excluding circulation, storage and the supervision spine; verify against local licensed area-per-child minimums.",
    }}
    sources={[
      {
        label: "Public Playground Safety Handbook (CPSC 325)",
        publisher: "U.S. Consumer Product Safety Commission",
        url: "https://www.cpsc.gov/s3fs-public/325.pdf",
        note: "Referenced for age-appropriate zoning, sightlines and fall-height guidance.",
      },
      {
        label: "ASTM F1487-21 — Playground Equipment for Public Use",
        publisher: "ASTM International",
        url: "https://www.astm.org/f1487-21.html",
      },
      {
        label: "EN 1176 — Playground Equipment and Surfacing",
        publisher: "European Committee for Standardization",
        url: "https://www.en-standard.eu/csn-en-1176-1-playground-equipment-and-surfacing-part-1-general-safety-requirements-and-test-methods/",
      },
    ]}
    related={[
      { label: "Early childhood centre equipment specs", href: "/indoor-playground-equipment-for-early-childhood-centers" },
      { label: "Interactive learning play equipment", href: "/interactive-play-equipment-for-learning-centers" },
      { label: "Modular reconfigurable play equipment", href: "/modular-reconfigurable-indoor-play-equipment" },
      { label: "Sensory play area design", href: "/designing-sensory-play-areas-for-education" },
      { label: "Educational activities by age", href: "/indoor-play-center-educational-activities-by-age" },
      { label: "Soft play equipment", href: "/products/soft-play" },
    ]}
    faq={[
      { title: "How do you design an educational indoor play area?", desc: "Work backwards from objectives. Assign one developmental objective per zone (gross motor, balance, fine motor, cooperative role play, quiet regulation), confirm the physical envelope — clear ceiling height, column grid, door widths, sprinkler plane — then draw a single one-way circulation loop with 1.5 m aisles and dividers under 1.2 m so one adult can see every zone. Equipment is chosen last, to serve the zone it sits in." },
      { title: "How many zones should an educational play area have?", desc: "Five is the practical target for a room of 80 sqm or more: gross motor, balance, construction, role play and a quiet nook. Below roughly 50 sqm, combine balance into gross motor and keep the quiet nook — losing the regulation space is what causes behaviour problems in small rooms." },
      { title: "What makes a play area educational rather than just fun?", desc: "Three things you can document: a stated objective per zone, a layout that lets children choose and repeat activities without adult direction, and dwell times long enough for deep play. A single crowded structure with many attachments delivers none of them, regardless of how it is marketed." },
      { title: "How wide should aisles and circulation be?", desc: "Keep 1.5 m minimum for main loops so two children can pass while an adult walks through, and widen the entry funnel to at least 2 m where a group arrives together. Dead-end corners should be designed out rather than supervised." },
      { title: "How often should the layout be changed?", desc: "Rotate at least one zone each term. Specify one zone on castors or interlocking modules at design stage; engagement typically dips after about six weeks of a fixed layout, and rotation restores it without new capital spend." },
    ]}
  />
);

export default EducationalIndoorPlayAreaDesign;
