import { StableSolutionPage } from "./StableSolutionPage";
import { productImages, projectImages, heroImages } from "@/config/galleryImages";

const InclusivePlayCenterDesign = () => (
  <StableSolutionPage
    slug="inclusive-play-center-design-for-children"
    title="Inclusive Play Center Design for Children"
    kicker="Mixed-Ability Group Play · Side-by-Side Activities · No Child Sits Out"
    description="Design an indoor play centre where every child in a group can join the same activity at the same time. Side-by-side play events, graded challenge levels and quiet retreat pockets replace single-entry equipment that leaves slower or shyer children watching from the edge."
    metaTitle="Inclusive Play Center Design for Children"
    metaDescription="Design inclusive play centres for mixed-ability groups: side-by-side play events, graded challenge tiers, quiet retreat pockets and party layouts where no child sits out."
    keywords={[
      "inclusive play center design for children",
      "inclusive playground equipment",
      "inclusive play equipment suppliers",
      "mixed ability play area design",
    ]}
    heroImage={heroImages.home}
    heroImageAlt="Inclusive indoor play centre layout with side-by-side play events for mixed-ability groups"
    primaryCta="Request an Inclusive Layout Review"
    secondaryCta="See Design Framework"
    metrics={[
      { value: "3 tiers", label: "Graded challenge per activity" },
      { value: "1.5 m", label: "Minimum shared-play aisle width" },
      { value: "2–3", label: "Quiet retreat pockets per hall" },
      { value: "80%", label: "Events reachable without climbing" },
    ]}
    frameworkTitle="Inclusion Is a Layout Decision Before It Is an Equipment Decision"
    frameworkIntro="Most play halls exclude children by accident: a single ladder entry, one difficulty level per event, and a floorplan where the popular activity is the hardest to reach. Inclusive design fixes the circulation and the difficulty curve first, then selects equipment that supports both."
    framework={[
      { title: "Give every event two entries", desc: "Each major play event gets a climbing entry and a step or ramp entry, so a child who cannot climb still arrives at the same platform as their friends instead of a separate 'easy' area." },
      { title: "Grade the challenge in three tiers", desc: "Easy, medium and hard versions of the same activity sit next to each other. Groups stay together while each child picks the tier they can complete." },
      { title: "Design for side-by-side play", desc: "Wide slides, twin climbing walls, paired interactive panels and shared ball zones let two children play the same thing simultaneously — the format that most reliably prevents turn-taking exclusion." },
      { title: "Add quiet retreat pockets", desc: "Enclosed nooks with soft lining and dimmable light let an overwhelmed child step out for two minutes and rejoin, instead of leaving the venue." },
    ]}
    equipmentTitle="Equipment That Keeps Mixed-Ability Groups Together"
    equipmentIntro="Everything below is manufactured in-house, so the entry heights, transfer platforms and aisle clearances are set in the layout drawing rather than adapted on site."
    equipment={[
      { title: "Twin-lane wide slide", desc: "A 1.2 m wide double lane so two children — or a child and a carer — descend together. Removes the single-file bottleneck that causes queue conflict." },
      { title: "Transfer-platform climber", desc: "A stepped transfer deck at 400 mm rise increments alongside the standard climbing net, giving a second route to the same upper level." },
      { title: "Ground-level interactive panels", desc: "Music, gear, mirror and light-sequence panels mounted at 600–900 mm so seated and standing children use the same play surface." },
      { title: "Graded ninja and balance line", desc: "The same run built in three difficulty lanes — flat beam, wobble beam, hanging steps — so a group races side by side at different skill levels." },
      { title: "Shared ball and projection zone", desc: "A soft ball pit or projection floor game with no minimum motor skill requirement, used as the default group activity for birthday parties." },
      { title: "Retreat pods and calm corner", desc: "Padded semi-enclosed pods with acoustic lining, low-glare lighting and a clear sightline out so staff and carers keep visual contact." },
    ]}
    audienceTitle="Who Specifies Inclusive Play Centres"
    audienceIntro="These operators and institutions gain the most from an inclusion review at layout stage, when changes cost drawings rather than rebuilds."
    audience={[
      { title: "Commercial play centre operators", desc: "Venues selling birthday parties, where one excluded child means a lost booking and a public complaint." },
      { title: "Schools and inclusive nurseries", desc: "Settings with mixed-need intakes that must show every pupil can access the same indoor activity provision." },
      { title: "Community and municipal centres", desc: "Publicly funded halls with equal-access obligations and a wide age and ability spread in the same session." },
      { title: "Hotel and resort kids clubs", desc: "Family venues serving unpredictable group compositions where staff cannot pre-plan around abilities." },
    ]}
    gallery={[
      { src: productImages.indoorPlayground, alt: "Multi-level indoor play structure with dual climbing and step entries", caption: "Dual-entry structure: climbing net and stepped transfer deck reach the same platform." },
      { src: projectImages.softPlayProject, alt: "Soft play zone with ground-level interactive play panels", caption: "Ground-level panels and soft forms keep seated and standing children in the same activity." },
      { src: projectImages.ninjaProject, alt: "Graded ninja balance course with three difficulty lanes", caption: "Three difficulty lanes on one run so mixed-ability groups race together." },
    ]}
    specTable={{
      heading: "Graded Challenge Tiers by Activity",
      intro: "How the same play event is built at three difficulty levels so a group stays together.",
      caption: "Comparison of easy, medium and hard versions of common inclusive play events",
      columns: ["Activity", "Tier 1 (entry)", "Tier 2 (developing)", "Tier 3 (challenge)"],
      rows: [
        ["Vertical travel", "Ramp or 400 mm steps", "Angled net climb", "Vertical rope or rock wall"],
        ["Balance line", "Ground-level flat beam", "Raised wobble beam", "Suspended step traverse"],
        ["Slide descent", "Twin-lane wide slide", "Tube slide", "Drop or spiral slide"],
        ["Ball activity", "Shallow ball pool play", "Target throw wall", "Timed interactive ball court"],
        ["Sensory input", "Quiet retreat pod", "Light and sound panels", "Full projection floor game"],
      ],
      footnote: "Tiers are placed adjacent to each other in the layout — never in separate rooms — so choosing an easier tier is not visibly a separate area.",
    }}
    sources={[
      {
        label: "ADA Standards for Accessible Design — Play Areas (Section 240)",
        publisher: "U.S. Department of Justice",
        url: "https://www.ada.gov/law-and-regs/design-standards/2010-stds/",
        note: "Referenced for transfer platforms, accessible routes and ground-level play component ratios.",
      },
      {
        label: "ASTM F1487-21 — Playground Equipment for Public Use",
        publisher: "ASTM International",
        url: "https://www.astm.org/f1487-21.html",
      },
      {
        label: "EN 1176 — Playground Equipment and Surfacing",
        publisher: "European Committee for Standardization (CEN)",
        url: "https://standards.cencenelec.eu/dyn/www/f?p=205:110:0::::FSP_PROJECT:22773",
      },
    ]}
    related={[
      { label: "Accessible playground design for disabilities", href: "/accessible-indoor-playground-design-for-disabilities" },
      { label: "Sensory inclusive play equipment", href: "/sensory-inclusive-play-equipment" },
      { label: "Safe indoor play areas for 6 year olds", href: "/safe-indoor-play-areas-for-6-year-olds" },
      { label: "Preschool playground equipment and soft play", href: "/preschool-playground-equipment-and-soft-play-design" },
      { label: "Indoor playground equipment range", href: "/products/indoor-playground" },
    ]}
    faq={[
      { title: "What makes a play centre inclusive rather than just accessible?", desc: "Accessibility gets a child into the building and onto a route. Inclusion means the child joins the same activity as their group at the same moment. In practice that requires two entries per event, three difficulty tiers of the same activity placed next to each other, and side-by-side play formats such as twin-lane slides — not a separate 'special needs' corner." },
      { title: "How much extra floor area does inclusive design need?", desc: "Typically 8–12% more circulation area, mainly from 1.5 m shared-play aisles and transfer decks alongside climbing entries. Play value per square metre usually rises because graded tiers keep more children active at once instead of queueing." },
      { title: "Does inclusive equipment cost more to manufacture?", desc: "Transfer platforms, wide slide lanes and ground-level panels add roughly 5–10% to the equipment package on a typical 300–600 sqm hall. Retrofitting the same features after opening costs several times more because platform heights and floor openings have to be recut." },
      { title: "How many quiet retreat pockets should a hall have?", desc: "Two to three per hall for venues up to 800 sqm, positioned at the edge of loud zones with a clear sightline to seating. One central pod is usually too far from the noisy areas that trigger the need to step out." },
      { title: "Can an existing play centre be made inclusive without a rebuild?", desc: "Often partly. The common quick wins are adding a stepped transfer entry to one main structure, converting a single slide to twin lanes, mounting ground-level interactive panels and installing retreat pods. Send photographs and a floor plan and we mark which changes are structural and which are add-on." },
    ]}
  />
);

export default InclusivePlayCenterDesign;
