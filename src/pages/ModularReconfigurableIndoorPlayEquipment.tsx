import { StableSolutionPage } from "./StableSolutionPage";
import { productImages, projectImages, heroImages } from "@/config/galleryImages";

const ModularReconfigurableIndoorPlayEquipment = () => (
  <StableSolutionPage
    slug="modular-reconfigurable-indoor-play-equipment"
    title="Modular Reconfigurable Indoor Play Equipment"
    kicker="Rotation Strategy · Interlocking Modules · Multi-Use Rooms"
    description="Fixed play structures lose engagement after about six weeks and lock a room into one use. Modular, reconfigurable equipment lets a team rotate the layout each term and clear the floor when the room becomes something else."
    metaTitle="Modular Reconfigurable Indoor Play Equipment"
    metaDescription="Modular indoor play equipment for multi-use rooms: interlocking modules, castor and stacking specs, term rotation plans and layouts that clear the floor in under an hour."
    keywords={[
      "modular indoor play equipment",
      "reconfigurable play equipment",
      "movable indoor playground modules",
      "multi use room play equipment",
    ]}
    heroImage={projectImages.fecCenter}
    heroImageAlt="Modular indoor play modules arranged in a multi-use room layout"
    primaryCta="Plan a Modular Layout"
    secondaryCta="See Rotation Framework"
    metrics={[
      { value: "6 weeks", label: "Engagement decay on fixed layouts" },
      { value: "< 60 min", label: "Target full clear-down time" },
      { value: "2 staff", label: "Maximum crew per module move" },
      { value: "3–4×", label: "Layout variants per module set" },
    ]}
    frameworkTitle="Design for Change, Then Buy Modules"
    frameworkIntro="Reconfigurability is a specification, not a marketing word. If a module cannot be moved by two staff, stored inside the room and reconnected without tools, the layout will never actually be rotated."
    framework={[
      { title: "Set a movement rule per module", desc: "Every module must be moved by two adults without lifting equipment: castors with brakes, sled bases on smooth flooring, or handle points at hip height. Write the crew size and move time into the purchase specification." },
      { title: "Standardise the connection", desc: "One interlocking system across the set — matched heights, common deck pitch, tool-free couplers — so any module can join any other. Mixed proprietary systems are what freeze a layout in place." },
      { title: "Reserve the storage volume at design stage", desc: "Nesting and stacking only help if the wall band exists. Allocate 8–12% of floor area for stored modules and confirm stack heights against the ceiling and sprinkler plane." },
      { title: "Plan the rotation calendar", desc: "Three or four documented layout variants, each with a plan drawing and a fall-height note, rotated per term. Documented variants keep the change compliant instead of improvised." },
      { title: "Keep every variant inspectable", desc: "Each configuration needs its own fall-height and clearance check. Modules with fixed platform heights and pre-verified combinations make that a five-minute confirmation rather than a re-survey." },
    ]}
    equipmentTitle="Modules That Actually Move"
    equipmentIntro="Each module is specified for repeated repositioning: sealed bases, protected edges and connection points that survive being coupled and uncoupled every term."
    equipment={[
      { title: "Interlocking soft-form sets", desc: "Blocks, ramps, arches and steps on a common grid — the fastest way to change difficulty without touching the structure." },
      { title: "Castor-mounted climbing frames", desc: "Compact frames with braked castors and low centre of mass, repositioned by two staff and locked for use." },
      { title: "Nesting slide and platform units", desc: "Platforms at matched deck heights with slides that unclip and nest against the wall for clear-down." },
      { title: "Portable balance and ninja elements", desc: "Beams, pods and hanging elements on freestanding frames that rebuild as a different course each rotation." },
      { title: "Rolling storage and divider units", desc: "Double-duty trolleys that hold rotation stock and act as half-open sightline dividers when deployed." },
      { title: "Folding wall-side panels", desc: "Activity panels that fold flat so the room can serve as a hall, classroom or event space within the hour." },
    ]}
    audienceTitle="Rooms That Need to Be Two Things"
    audienceIntro="Modular equipment is specified wherever the room has more than one job, or the same children return weekly and boredom is the real risk."
    audience={[
      { title: "Schools and multi-purpose halls", desc: "Spaces that must return to assembly, dining or PE use between play sessions." },
      { title: "Early years and childcare rooms", desc: "Settings with the same cohort every day, where term rotation sustains engagement without new spend." },
      { title: "Homeschool co-ops and community centres", desc: "Shared premises with limited storage where equipment has to clear the floor for other user groups." },
      { title: "Pop-up and seasonal operators", desc: "Mall activations and holiday programmes that install, run and strike a play space repeatedly." },
    ]}
    gallery={[
      { src: projectImages.fecCenter, alt: "Modular soft play modules arranged as one layout variant", caption: "Interlocking modules on a common grid — variant one of four." },
      { src: productImages.softPlay, alt: "Interlocking soft play blocks ramps and steps for reconfigurable layouts", caption: "Soft-form sets change difficulty without touching the structure." },
      { src: heroImages.projects, alt: "Multi-use indoor hall with repositionable play equipment", caption: "Wall-side storage band sized so the floor clears within the hour." },
    ]}
    specTable={{
      heading: "Fixed vs Modular Play Equipment"
      }
      intro=""
      caption=""
      columns={[]}
      rows={[]}
    }
    related={[]}
    faq={[]}
  />
);

export default ModularReconfigurableIndoorPlayEquipment;
