import { StableSolutionPage } from "./StableSolutionPage";
import { projectImages } from "@/config/galleryImages";

const HomePlayroomDesignForToddlers = () => (
  <StableSolutionPage
    slug="home-playroom-design-for-toddlers"
    title="Home Playroom Design for Toddlers"
    kicker="Residential Play Rooms · Free 3D Layout · Compact Equipment"
    description="How to design a home playroom for toddlers: room-by-room zoning, ceiling and doorway limits, commercial-grade compact equipment and a free 3D layout before anything is manufactured."
    metaTitle="Home Playroom Design for Toddlers | 3D Layout"
    metaDescription="Plan a toddler playroom at home: zoning for 1-4 year olds, ceiling and doorway limits, compact commercial-grade equipment and a free 3D layout before production."
    keywords={["how to design a home playroom for toddlers", "toddler playroom layout", "compact home playground equipment"]}
    heroImage={projectImages.fecCenter}
    heroImageAlt="Compact toddler playroom layout with climbing steps, slide and soft flooring"
    primaryCta="Get a Free 3D Playroom Layout"
    secondaryCta="See Design Framework"
    metrics={[
      { value: "1–4 yrs", label: "Target toddler age band" },
      { value: "12–35 m²", label: "Typical home playroom" },
      { value: "2.2 m", label: "Minimum usable ceiling height" },
      { value: "7 days", label: "3D layout turnaround" },
    ]}
    frameworkTitle="Five Decisions That Shape a Toddler Playroom"
    frameworkIntro="A home playroom fails for predictable reasons: equipment too tall for the ceiling, no clear fall zone, everything pushed against walls, and no storage so the floor is never usable. Resolve these five decisions before choosing a single product."
    framework={[
      { title: "Measure the constraints first", desc: "Record clear ceiling height, doorway width, radiator and window positions, and any floor loading limit. These decide whether a structure can be a two-level unit or must stay single-level." },
      { title: "Zone by energy level", desc: "Split the room into an active third (climb, slide, balance), a construction third (blocks, table) and a calm third (reading nook). Toddlers self-regulate far better when the zones are visually distinct." },
      { title: "Protect the fall zone", desc: "Keep 1.2 m of clear padded floor around any climbing or sliding element, and never place a landing area facing a door, a corner or a hard edge." },
      { title: "Design storage as furniture", desc: "Low open bins along one wall let a toddler tidy independently and keep the middle of the room clear, which is what makes a small room feel playable." },
      { title: "Plan for growth", desc: "Choose modular panels and adjustable-height elements so the same structure serves a 1 year old pulling up and a 4 year old climbing." },
    ]}
    equipmentTitle="Compact Equipment That Fits a Residential Room"
    equipmentIntro="We manufacture commercial equipment, so a home playroom uses the same certified materials at reduced footprint — quieter, lower and scaled for one or two children rather than a queue."
    equipment={[
      { title: "Low climbing and slide unit", desc: "Single-level platform at 60–90 cm with steps, a short slide and a crawl arch, sized to fit under a 2.2 m ceiling." },
      { title: "Indoor balance circuit", desc: "Stepping stones, a low beam and a wobble board arranged as a loop along one wall to build gross-motor control in minimal space." },
      { title: "Wall-mounted activity panels", desc: "Gears, latches, chalk and mirror panels that add play value without consuming any floor area." },
      { title: "Soft play block set", desc: "Foam blocks, ramps and rockers that reconfigure daily and stack flat against a wall when the room is used for other things." },
      { title: "Padded flooring system", desc: "Interlocking EVA or roll-out mat with a low-profile edge trim so the transition to hard floor is not a trip hazard." },
      { title: "Reading and calm nook", desc: "A canopy corner with a cushion, book ledge and dimmable light for wind-down before nap or bedtime." },
    ]}
    audienceTitle="Who This Playroom Specification Suits"
    audienceIntro="Residential enquiries come from three directions, and each needs a different balance of equipment scale and finish."
    audience={[
      { title: "Families building a dedicated playroom", desc: "A spare room, basement or converted garage that needs one coherent design rather than assorted retail toys." },
      { title: "Home-based childminders", desc: "Small in-home settings that need certified commercial equipment for insurance and inspection while keeping a domestic look." },
      { title: "Residential developers and interior designers", desc: "Show-home and villa projects specifying a children's room as a selling feature." },
      { title: "Apartment amenity rooms", desc: "Shared residents' play rooms where commercial durability matters but the footprint stays small." },
    ]}
    related={[
      { label: "Safe play equipment for small spaces", href: "/safe-indoor-playground-equipment-for-small-spaces" },
      { label: "Soft play equipment range", href: "/products/soft-play" },
      { label: "Custom playground cost and free 3D design", href: "/custom-indoor-playground-cost-free-3d-design" },
      { label: "Themed playground design ideas", href: "/themed-indoor-playground-design" },
    ]}
    faq={[
      { title: "What ceiling height do I need for a home playroom?", desc: "2.2 m of clear height supports a single-level platform at 60–90 cm with a slide. Below 2.2 m we keep everything at floor level and shift play value into wall panels and a balance circuit." },
      { title: "How small can a toddler playroom be?", desc: "12 m² is workable if you keep the centre of the room clear and mount activity panels on walls. Below that, a play corner in a living room usually works better than a dedicated room." },
      { title: "Can commercial equipment be delivered into a house?", desc: "Yes. We size every module to pass through a standard 800 mm doorway and assemble on site, so no panel needs to be larger than the entry route." },
      { title: "Is commercial-grade equipment overkill at home?", desc: "It costs more upfront but survives a decade rather than a season, and it carries ASTM and TUV test documentation — which matters if you ever childmind or rent the space out." },
      { title: "Do you provide the layout drawing before I commit?", desc: "Yes. Send room dimensions and photos and we return a free 3D layout with an equipment list and price, so you approve the design before any manufacturing starts." },
    ]}
  />
);

export default HomePlayroomDesignForToddlers;
