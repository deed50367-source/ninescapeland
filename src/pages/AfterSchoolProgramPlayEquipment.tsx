import { StableSolutionPage } from "./StableSolutionPage";
import { productImages, projectImages, heroImages } from "@/config/galleryImages";

const AfterSchoolProgramPlayEquipment = () => (
  <StableSolutionPage
    slug="after-school-program-indoor-play-equipment"
    title="Indoor Play Equipment for After-School Programs"
    kicker="90-Minute Sessions · Mixed Ages · Two Staff on the Floor"
    description="After-school programmes run on a fixed clock with small teams and wide age ranges. This guide specifies indoor play equipment around session length, rotation, staff sightlines and shared-hall pack-down instead of around a single big structure."
    metaTitle="Indoor Play Equipment for After-School Programs"
    metaDescription="Specify indoor play equipment for after-school programs: session rotation, mixed-age zoning, staff sightlines, supervision ratios, shared-hall pack-down and activity throughput."
    keywords={[
      "after school program activities",
      "after school program indoor play equipment",
      "indoor activities for after school clubs",
      "mixed age indoor play equipment",
    ]}
    heroImage={heroImages.home}
    heroImageAlt="Indoor play hall arranged in activity zones for an after-school programme"
    primaryCta="Get an After-School Layout"
    secondaryCta="See Session Framework"
    metrics={[
      { value: "75–120 min", label: "Typical session window" },
      { value: "3–5", label: "Rotations per session" },
      { value: "5–12 yrs", label: "Age band on the floor together" },
      { value: "1:10 – 1:15", label: "Common supervision ratio" },
    ]}
    frameworkTitle="Design for the Timetable, Not for the Photo"
    frameworkIntro="An after-school programme is a scheduling problem. Children arrive together, leave together, and are supervised by two or three staff. Equipment either supports rotation and sightlines or it creates queues and blind corners."
    framework={[
      { title: "Start from the session clock", desc: "Split a 90-minute session into arrival, three activity rotations and pack-down. Each zone needs to occupy a group of 8–15 for 15–20 minutes without staff running the game — otherwise one adult is trapped in one corner." },
      { title: "Zone by intensity, not by theme", desc: "Put high-output equipment (obstacle runs, ball games, trampoline bays) on one side and low-arousal equipment (climbing traverse, building blocks, quiet nook) on the other, so a group can be moved down in energy before homework or pickup." },
      { title: "Protect sightlines to two supervision points", desc: "Every play position should be visible from at least two standing points. Avoid enclosed tubes and solid-panel houses; use mesh, open frames and low walls so two staff can cover a hall of 40 children." },
      { title: "Handle the mixed age band deliberately", desc: "A 5-year-old and an 11-year-old cannot share the same fall height or the same challenge level. Split by difficulty tier with separate entries, so older children are not queueing behind toddlers on the same ladder." },
      { title: "Plan for shared halls", desc: "Most programmes borrow a gym, hall or cafeteria. Specify wheeled bases, stackable soft-play, roll-out mats and a labelled trolley store so two staff can clear the floor in under 15 minutes." },
      { title: "Give staff a measurable game set", desc: "Timed obstacle runs, scored target walls and relay circuits give leaders a score to report and children a reason to repeat — this is what converts free play into a programme parents can see." },
    ]}
    equipmentTitle="Zones That Hold a Group for One Rotation"
    equipmentIntro="Each format below is chosen for a 15–20 minute rotation with one adult present and a mixed age group."
    equipment={[
      { title: "Timed obstacle circuit", desc: "A ninja-style low course with start and finish gates. Handles 8–12 children in a queue-free loop and produces a time that can be posted on a board each week." },
      { title: "Ball target and relay wall", desc: "Throwing targets plus relay lanes. High throughput, no instruction required, and the score gives staff a natural way to split teams." },
      { title: "Two-tier climbing traverse", desc: "A low traverse under 1.5 m fall height with an easy and a hard route line, so 5-year-olds and 11-year-olds use the same wall without conflict." },
      { title: "Mobile soft-play set", desc: "Wheeled and stackable blocks, wedges and tunnels for the youngest cohort. Clears to a trolley store when the hall reverts to its main use." },
      { title: "Roll-out activity mats", desc: "Marked mats for balance, tag and cooperative games. The cheapest way to make an empty hall floor programmable and to protect a sports surface." },
      { title: "Quiet regulation nook", desc: "Enclosed but sightline-open cushioned space for one to three children, used before homework blocks and for children who need to step out of a loud rotation." },
    ]}
    audienceTitle="Programmes This Layout Suits"
    audienceIntro="Fixed-clock, staff-limited providers get more from rotation-ready zones than from a single large structure."
    audience={[
      { title: "School-run after-school clubs", desc: "Providers sharing a gym or hall who need equipment that packs down daily and passes a caretaker's inspection." },
      { title: "Community and municipal centres", desc: "Multi-purpose halls serving several age cohorts across a week, where reconfiguration matters more than theming." },
      { title: "Private tuition and enrichment centres", desc: "Programmes that pair academic blocks with movement breaks and need a low-arousal wind-down zone next to a high-output one." },
      { title: "Faith and non-profit youth programmes", desc: "Volunteer-staffed groups with wide age ranges, where open sightlines reduce the number of adults needed on the floor." },
    ]}
    gallery={[
      { src: productImages.ninjaCourse, alt: "Low ninja obstacle circuit used for timed after-school rotations", caption: "Timed circuits keep a group of 8–12 moving without a queue." },
      { src: projectImages.bouncePark, alt: "Ball target and relay area for after-school club games", caption: "Target and relay walls need no instruction and produce a score." },
      { src: projectImages.softPlayProject, alt: "Mobile soft play blocks for the youngest after-school cohort", caption: "Wheeled soft play clears to a trolley store in minutes." },
    ]}
    specTable={{
      heading: "Rotation Planning by Zone",
      intro: "Group capacity, rotation length and pack-down effort for each zone type.",
      caption: "Comparison of group size, rotation length, footprint and pack-down time by after-school zone",
      columns: ["Zone", "Group size", "Rotation", "Footprint", "Pack-down"],
      rows: [
        ["Timed obstacle circuit", "8–12", "15–20 min", "40–80 m²", "Fixed / semi-fixed"],
        ["Ball target & relay", "10–20", "15–20 min", "30–60 m²", "20 min"],
        ["Two-tier traverse wall", "4–8", "15 min", "12–25 m²", "Fixed"],
        ["Mobile soft-play set", "6–12", "20 min", "20–40 m²", "10–15 min"],
        ["Roll-out activity mats", "10–24", "15 min", "30–70 m²", "10 min"],
        ["Quiet regulation nook", "1–3", "As needed", "4–8 m²", "5 min"],
      ],
      footnote: "Group sizes assume one supervising adult per zone at a 1:10 to 1:15 ratio and open sightlines from two standing points.",
    }}
    sources={[
      {
        label: "Public Playground Safety Handbook (CPSC 325)",
        publisher: "U.S. Consumer Product Safety Commission",
        url: "https://www.cpsc.gov/s3fs-public/325.pdf",
        note: "Age-appropriate design and supervision guidance for school-age play areas.",
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
      { label: "Educational activities by age", href: "/indoor-play-center-educational-activities-by-age" },
      { label: "Indoor PE equipment for schools", href: "/indoor-pe-equipment-for-schools" },
      { label: "Modular reconfigurable play equipment", href: "/modular-reconfigurable-indoor-play-equipment" },
      { label: "Interactive learning play equipment", href: "/interactive-play-equipment-for-learning-centers" },
      { label: "Summer camp playground ideas", href: "/indoor-summer-camp-playground-ideas" },
      { label: "Ninja course equipment", href: "/products/ninja-course" },
    ]}
    faq={[
      { title: "What indoor activities work best for an after-school program?", desc: "Activities that occupy 8–15 children for 15–20 minutes without an adult running the game: timed obstacle circuits, scored target and relay walls, two-tier traverse climbing and marked mat games. Build three or four such zones so a session rotates instead of queueing." },
      { title: "How much space does an after-school play area need?", desc: "Plan roughly 3–4 m² of active floor per child on the floor at once, so a 40-child session needs about 120–160 m² across three or four zones plus circulation and a store for mobile equipment." },
      { title: "How do we equip a shared gym or hall?", desc: "Use wheeled bases, stackable soft-play, roll-out mats and a labelled trolley store. The target is a two-person pack-down in under 15 minutes, with nothing that marks or loads a sports floor beyond its rating." },
      { title: "How do you handle a 5 to 12 age range in one room?", desc: "Split by difficulty tier rather than by area: separate entries and two route lines on the same equipment, high-output zones on one side, and a low-arousal zone for the youngest cohort and for wind-down before pickup." },
      { title: "What supervision ratio should the layout support?", desc: "Most programmes run 1:10 to 1:15 for school-age children. The layout must let each adult see every play position in their zone from two standing points, which rules out enclosed tubes and solid-panel houses." },
      { title: "Can NinescapeLand supply a packable set rather than a fixed structure?", desc: "Yes. We build mobile soft-play, wheeled obstacle elements and roll-out mat systems alongside fixed structures, and provide a 3D layout showing rotation flow, sightlines and the store footprint before you order." },
    ]}
  />
);

export default AfterSchoolProgramPlayEquipment;
