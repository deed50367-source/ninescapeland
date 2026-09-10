import { StableSolutionPage } from "./StableSolutionPage";
import { productImages, projectImages, heroImages } from "@/config/galleryImages";

const ChurchIndoorPlaygroundEquipment = () => (
  <StableSolutionPage
    slug="church-indoor-playground-equipment"
    title="Church Indoor Playground Equipment for Fellowship Halls"
    kicker="Volunteer Staffing · Weekly Peak · Multi-Use Halls"
    description="Church play areas carry their whole week's traffic in two hours, run on volunteers and usually share a fellowship hall. This guide specifies indoor playground equipment for peak-hour throughput, open sightlines, quick pack-down and donor-friendly phased budgets."
    metaTitle="Church Indoor Playground Equipment Guide"
    metaDescription="Plan church indoor playground equipment for fellowship halls: peak-hour capacity, volunteer sightlines, check-in flow, pack-down for multi-use rooms and phased budgets."
    keywords={[
      "playground equipment for churches",
      "church indoor playground equipment",
      "fellowship hall play area design",
      "children's ministry play equipment",
    ]}
    heroImage={heroImages.faq}
    heroImageAlt="Indoor play area inside a church fellowship hall with open sightlines"
    primaryCta="Get a Fellowship Hall Layout"
    secondaryCta="See Planning Framework"
    metrics={[
      { value: "2–3 h", label: "Weekly peak carrying most traffic" },
      { value: "1:8 – 1:12", label: "Volunteer supervision band" },
      { value: "< 20 min", label: "Target pack-down for multi-use halls" },
      { value: "2–4", label: "Phases a donor budget can be split into" },
    ]}
    frameworkTitle="One Peak Hour Decides the Whole Specification"
    frameworkIntro="A church play area is nearly empty for most of the week and completely full during services. Size it for the peak, staff it for volunteers, and make sure the hall still works for meals, meetings and youth nights."
    framework={[
      { title: "Size to the peak service, not the weekly average", desc: "Count the children present in the busiest service, split by age, then size capacity for that number plus 20%. A structure sized to the average will queue and become a supervision problem exactly when the most families are watching." },
      { title: "Make the area readable by a first-time volunteer", desc: "Volunteers rotate weekly. Open frames, mesh panels, one visible entry and one visible exit, and no enclosed tubes — so an adult who has never served before can still see every child from the doorway." },
      { title: "Connect the play area to check-in and pickup flow", desc: "Place the play zone so the check-in desk controls the only entrance, with a queuing area outside the surfacing. This prevents the common failure of parents walking across the play surface to collect a child." },
      { title: "Keep the hall multi-purpose", desc: "Specify wheeled bases, stackable soft-play, roll-out mats and a labelled store so the room reverts to tables and chairs for a shared meal. Fixed structures belong in a dedicated nursery, not in the fellowship hall." },
      { title: "Separate nursery, preschool and elementary", desc: "Give under-2s a floor-level area near the nursery, 2–5s a low climber and slide, and 6–12s a challenge or ball zone. Mixed use of one climber across that whole range is the main injury and complaint source." },
      { title: "Phase the budget so a donation can start it", desc: "Break the project into a nursery phase, a preschool structure phase, a challenge zone phase and a surfacing or theming phase, each independently usable, so a designated gift can fund a visible step." },
    ]}
    equipmentTitle="Zones for a Children's Ministry Space"
    equipmentIntro="Each zone is chosen for volunteer supervision, peak throughput and a hall that has other jobs during the week."
    equipment={[
      { title: "Nursery floor zone", desc: "Wipeable wedges, tunnels, mirrors and pull-up rails at floor level for non-walkers and early walkers, adjacent to the changing and check-in point." },
      { title: "Preschool climber and slide", desc: "A compact low structure with a wide slide and generous handrails for 2–5s, fully visible from the volunteer station." },
      { title: "Elementary challenge circuit", desc: "A low ninja-style circuit or traverse wall for 6–12s, which keeps older children out of the preschool structure and gives them a timed score." },
      { title: "Ball and relay zone", desc: "Target panels and relay lanes that occupy 10–20 children at once with no instruction — the highest throughput per square metre during a peak service." },
      { title: "Mobile soft-play and mat sets", desc: "Stackable blocks and roll-out mats on trolleys, so a fellowship hall becomes a play space and reverts within 20 minutes." },
      { title: "Quiet and sensory corner", desc: "A cushioned retreat space with tactile panels for children who need to step out of a loud room while remaining in sightlines." },
    ]}
    audienceTitle="Congregations and Facilities This Suits"
    audienceIntro="Volunteer-staffed, multi-use rooms with a sharp weekly peak and a phased funding path."
    audience={[
      { title: "Churches with a shared fellowship hall", desc: "Rooms used for meals, meetings and youth nights, where anything permanent has to earn its floor space." },
      { title: "Churches with a dedicated children's wing", desc: "Facilities that can install fixed nursery and preschool structures and want them zoned by age with a controlled entry." },
      { title: "Church-run preschools and mother's-day-out programmes", desc: "Weekday programmes that add licensing requirements on top of Sunday use, so equipment must satisfy both." },
      { title: "Community and non-profit family centres", desc: "Volunteer-supported venues with the same open-sightline and pack-down constraints." },
    ]}
    gallery={[
      { src: projectImages.softPlayProject, alt: "Nursery floor play zone for a church children's ministry", caption: "Nursery zones stay at floor level beside check-in and changing." },
      { src: productImages.indoorPlayground, alt: "Preschool climber and slide in a church play area", caption: "Preschool structures stay open-framed so one volunteer can see it all." },
      { src: productImages.ninjaCourse, alt: "Low challenge circuit for elementary children in a church hall", caption: "A challenge circuit keeps 6–12s out of the preschool structure." },
    ]}
    specTable={{
      heading: "Church Play Area Planning Comparison",
      intro: "Capacity, footprint and pack-down by ministry zone, sized for a peak service.",
      caption: "Comparison of age group, peak capacity, footprint and pack-down effort by church play zone",
      columns: ["Zone", "Age", "Peak capacity", "Footprint", "Pack-down"],
      rows: [
        ["Nursery floor zone", "0–2", "6–10", "15–30 m²", "Fixed / 10 min"],
        ["Preschool climber", "2–5", "10–18", "25–50 m²", "Fixed"],
        ["Elementary challenge circuit", "6–12", "8–14", "35–70 m²", "Semi-fixed"],
        ["Ball & relay zone", "5–12", "10–20", "30–60 m²", "20 min"],
        ["Mobile soft-play / mats", "1–6", "8–15", "20–45 m²", "10–15 min"],
        ["Quiet & sensory corner", "All", "1–3", "4–8 m²", "5 min"],
      ],
      footnote: "Peak capacity assumes volunteer supervision at 1:8 to 1:12 with unobstructed sightlines from a single standing station per zone.",
    }}
    sources={[
      {
        label: "Public Playground Safety Handbook (CPSC 325)",
        publisher: "U.S. Consumer Product Safety Commission",
        url: "https://www.cpsc.gov/s3fs-public/325.pdf",
        note: "Age separation, use zones and supervision guidance.",
      },
      {
        label: "ASTM F1918 — Soft Contained Play Equipment",
        publisher: "ASTM International",
        url: "https://www.astm.org/f1918-98r18.html",
      },
      {
        label: "NFPA 101 — Life Safety Code",
        publisher: "National Fire Protection Association",
        url: "https://www.nfpa.org/codes-and-standards/nfpa-101-standard-development/101",
        note: "Referenced for egress and assembly-room occupancy in multi-use halls.",
      },
    ]}
    related={[
      { label: "After-school programme play equipment", href: "/after-school-program-indoor-play-equipment" },
      { label: "Daycare playground equipment", href: "/daycare-indoor-playground-equipment" },
      { label: "Play equipment for small spaces", href: "/safe-indoor-playground-equipment-for-small-spaces" },
      { label: "Modular reconfigurable play equipment", href: "/modular-reconfigurable-indoor-play-equipment" },
      { label: "Custom indoor playground cost", href: "/custom-indoor-playground-cost" },
      { label: "Soft play equipment", href: "/products/soft-play" },
    ]}
    faq={[
      { title: "How much does a church indoor playground cost?", desc: "Most fellowship-hall projects land between a small mobile soft-play set and a full multi-level structure, so the practical approach is phasing: nursery zone first, preschool structure second, challenge zone third, theming last. Each phase is usable on its own, which suits designated gifts." },
      { title: "How big should a church play area be?", desc: "Size it for the busiest service. Count children by age band at peak, add 20% headroom, and allow roughly 3–4 m² of active floor per child on the floor at once plus circulation outside the use zone." },
      { title: "Can a fellowship hall keep its other uses?", desc: "Yes, if you specify wheeled bases, stackable soft-play and roll-out mats with a labelled trolley store. Aim for a two-person pack-down under 20 minutes; keep fixed structures in a dedicated nursery or children's wing instead." },
      { title: "What works best for volunteer supervision?", desc: "Open frames, mesh panels, no enclosed tubes, one controlled entry and exit, and a single standing station per zone with full sightlines. A first-time volunteer should be able to see every child from the doorway." },
      { title: "Should different ages share one structure?", desc: "No. Separate under-2s, 2–5s and 6–12s. Shared use of one climber across that range is the most common source of injuries and parent complaints, and it also breaks fall-height assumptions for the youngest users." },
      { title: "Does a weekday preschool change the specification?", desc: "Yes. Weekday licensed use adds fall-height limits, ratio rules, cleanable-material requirements and a document file. Specify to the stricter weekday rule so one installation serves both Sunday and weekday programmes." },
    ]}
  />
);

export default ChurchIndoorPlaygroundEquipment;
