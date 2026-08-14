import { StableSolutionPage } from "./StableSolutionPage";
import { productImages } from "@/config/galleryImages";

const SafeIndoorPlaygroundEquipmentForSmallSpaces = () => (
  <StableSolutionPage
    slug="safe-indoor-playground-equipment-for-small-spaces"
    title="Safe Indoor Playground Equipment for Small Spaces"
    kicker="50–150 m² Footprints · Vertical Play · ASTM Certified"
    description="Certified indoor playground equipment engineered for small footprints: vertical multi-level play, compressed fall zones, low-ceiling structures and modular units for 50–150 m² venues."
    metaTitle="Safe Indoor Playground Equipment for Small Spaces"
    metaDescription="ASTM-certified indoor playground equipment for 50-150 m2 venues: vertical multi-level play, compact fall zones, low-ceiling structures and modular expansion."
    keywords={["safe indoor playground equipment for small spaces", "compact indoor playground equipment", "small footprint soft play"]}
    heroImage={productImages.indoorPlayground}
    heroImageAlt="Compact multi-level indoor playground structure for a small commercial space"
    primaryCta="Get a Compact Layout Proposal"
    secondaryCta="See Space Framework"
    metrics={[
      { value: "50–150 m²", label: "Target venue footprint" },
      { value: "2.6 m+", label: "Workable ceiling height" },
      { value: "3 levels", label: "Vertical play in one footprint" },
      { value: "ASTM F1918", label: "Soft contained play standard" },
    ]}
    frameworkTitle="Getting Full Play Value Out of a Small Footprint"
    frameworkIntro="Small venues lose money when they copy a large-park layout at reduced scale: too much circulation, too few activities and fall zones that overlap. The fix is to build upward, share fall zones deliberately and make every wall productive."
    framework={[
      { title: "Build vertically, not outward", desc: "A three-level contained structure delivers roughly triple the activity count of a single-level layout inside the same floor area, provided the ceiling clears 2.6 m." },
      { title: "Engineer the fall zones", desc: "Fall heights are kept under 1.5 m in compact builds so the required impact-attenuating area shrinks, letting activities sit closer together while still meeting ASTM criteria." },
      { title: "Make walls into activity area", desc: "Climbing panels, interactive light walls, ball-toss targets and tunnel entries mounted on perimeter walls add play value at zero floor cost." },
      { title: "Single supervised sightline", desc: "One open-front design lets one or two staff supervise the whole venue, which is what keeps a small site profitable on labour." },
      { title: "Modular expansion path", desc: "Bolt-on modules let a 60 m² pilot grow into a 120 m² venue without replacing the original structure." },
    ]}
    equipmentTitle="Equipment Engineered for Compressed Footprints"
    equipmentIntro="Each item below is selected because it delivers a high number of play actions per square metre while keeping fall heights and clearance requirements low."
    equipment={[
      { title: "Three-level contained structure", desc: "Stacked platforms with tube slides, crawl tubes, obstacle bridges and rope elements inside a compact 25–45 m² footprint." },
      { title: "Compact drop slide and tube slide", desc: "Vertical-drop and spiral tube slides use height rather than run-out length, so the landing zone stays short." },
      { title: "Wall-mounted climbing panels", desc: "Traverse walls at low fall height, with padded floor below, using perimeter surface that would otherwise be dead." },
      { title: "Small-footprint ninja elements", desc: "A short 4–6 station ninja line with hanging rings, rotating steps and a padded landing strip for the 6–12 age group." },
      { title: "Compact trampoline pair", desc: "Two to four in-ground beds with certified pad coverage, sized as an activity accent rather than a full park." },
      { title: "Toddler enclosure", desc: "A physically bounded 15–25 m² low zone so under-3s are separated from the main structure without a second room." },
    ]}
    audienceTitle="Venues Where Compact Equipment Wins"
    audienceIntro="Small-footprint specification is not a compromise for these operators — it is the correct answer, because their revenue comes from dwell time and location rather than sheer scale."
    audience={[
      { title: "Mall and retail unit operators", desc: "Fixed lease units of 60–150 m² where rent per square metre demands high play density." },
      { title: "Café and restaurant play corners", desc: "Play areas that must lift dwell time and spend without consuming dining seats." },
      { title: "Schools and community centres", desc: "Multi-purpose halls and spare classrooms needing certified equipment inside an existing room." },
      { title: "First-time operators", desc: "Pilot venues testing a market at lower capital exposure before committing to a full park." },
    ]}
    related={[
      { label: "Indoor playground equipment", href: "/products/indoor-playground" },
      { label: "Hygienic infant play area", href: "/hygienic-indoor-playground-for-infants" },
      { label: "Playground cost and free 3D design", href: "/custom-indoor-playground-cost-free-3d-design" },
      { label: "Soft play mall solutions", href: "/soft-play-mall-solutions" },
    ]}
    faq={[
      { title: "What is the minimum space for a commercial indoor playground?", desc: "A viable paid-entry venue starts around 50 m² with a three-level structure and a toddler enclosure. Below 50 m² the model works better as a free play corner attached to a café or retail anchor." },
      { title: "What ceiling height does a multi-level structure need?", desc: "2.6 m is the practical minimum for two levels and 3.5 m for three levels with tube slides. Under 2.6 m we specify single-level play with wall-mounted activities instead." },
      { title: "Does compact equipment still meet safety standards?", desc: "Yes. Every compact build is engineered to ASTM F1918 for soft contained play, with certified impact-attenuating surfacing and full pad coverage on all structural steel and edges." },
      { title: "How many children can a 100 m² venue hold?", desc: "Typically 40–60 children at once depending on age mix, based on standard occupancy allowances. We include the calculation with each layout so you can size staffing and ticketing." },
      { title: "Can I expand the same structure later?", desc: "Yes. Structures are bolted modular systems, so extra platforms, slides or a ninja line can be added to the existing frame rather than replacing it." },
    ]}
  />
);

export default SafeIndoorPlaygroundEquipmentForSmallSpaces;
