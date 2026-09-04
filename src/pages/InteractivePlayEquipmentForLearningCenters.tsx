import { StableSolutionPage } from "./StableSolutionPage";
import { productImages, projectImages, heroImages } from "@/config/galleryImages";

const InteractivePlayEquipmentForLearningCenters = () => (
  <StableSolutionPage
    slug="interactive-play-equipment-for-learning-centers"
    title="Interactive Play Equipment for Learning Centers"
    kicker="Projection · Sensors · Scoring · Content You Can Update"
    description="Interactive walls, floors and courts turn a fixed play structure into changeable content. This is how to specify projection, sensor and scored equipment for learning centers — power, throw distance, ambient light and who owns the content library."
    metaTitle="Interactive Play Equipment for Learning Centers"
    metaDescription="Specify interactive play equipment for learning centers: projection walls and floors, sensor games, throw distance, ambient light limits, power runs and content licence terms."
    keywords={[
      "best interactive equipment for children's learning centers",
      "interactive play equipment for learning centers",
      "interactive projection wall playground",
      "sensor based play equipment",
    ]}
    heroImage={projectImages.bouncePark}
    heroImageAlt="Interactive projection ball court inside a children's learning centre"
    primaryCta="Plan an Interactive Zone"
    secondaryCta="See Specification Guide"
    metrics={[
      { value: "≤ 150 lux", label: "Ambient light on screen area" },
      { value: "20–30 min", label: "Group dwell per game set" },
      { value: "1–3 yr", label: "Typical content licence term" },
      { value: "8–15 m²", label: "Footprint per interactive wall" },
    ]}
    frameworkTitle="Interactive Equipment Fails on Logistics, Not Technology"
    frameworkIntro="The hardware almost always works. What breaks a project is ambient light, throw distance, a power run that was never planned, or a content licence that expires while the wall stays on the balance sheet."
    framework={[
      { title: "Control the light before choosing the projector", desc: "Interactive projection needs the play surface below roughly 150 lux. A wall opposite glazing will wash out at any brightness, so fix blinds, luminaire zoning or wall position first — this is the single most common installation regret." },
      { title: "Design the throw distance and traffic path together", desc: "Ultra-short-throw units sit close but put children in the beam; long-throw units need a clear corridor above head height. Decide the mounting geometry with the circulation loop, not after the structure is installed." },
      { title: "Plan power, data and heat", desc: "Specify dedicated circuits, cable routes inside the structure, ventilation for projector and controller enclosures, and lockable access. Retro-fitted surface trunking is where the space starts to look cheap." },
      { title: "Own the content strategy, not just the hardware", desc: "Ask what games ship, how often the library is updated, whether curriculum-aligned content is included, whether the licence is perpetual or annual, and what the wall does if the licence lapses." },
      { title: "Make it measurable", desc: "Scored and timed games give staff a visible outcome — reaction time, accuracy, cooperation rounds — which is what converts a learning centre's programme into something parents can see and pay for." },
    ]}
    equipmentTitle="Interactive Formats and Where Each One Earns Its Space"
    equipmentIntro="Each format solves a different problem: throughput, curriculum tie-in, small footprint or group competition."
    equipment={[
      { title: "Interactive projection wall", desc: "Whack-and-tag, maths and language games on an 8–15 m² wall. The best fit for curriculum tie-in because content can follow the term plan." },
      { title: "Interactive floor projection", desc: "Motion-tracked floor games in circulation-adjacent space. Uses area that could not hold a structure, and handles high throughput with no queue." },
      { title: "Sensor ball court", desc: "Target panels with scoring for throwing games. The most reliable format for occupying a mixed group of 10–20 children at once." },
      { title: "Reaction and light-tag towers", desc: "Timed light sequences for pairs or small teams — small footprint, strong repeat play, and an obvious speed-and-accuracy score." },
      { title: "Interactive climbing wall", desc: "Projected routes and games on a low traverse wall, combining gross motor effort with problem solving in a 1.5 m fall-height envelope." },
      { title: "Interactive slide and trampoline add-ons", desc: "Timing gates and projected targets that attach to existing structures — the cheapest way to add measurable interaction to equipment already installed." },
    ]}
    audienceTitle="Where Interactive Zones Pay Back"
    audienceIntro="Interactive equipment earns its cost where content change, measurement or throughput matters more than raw structure size."
    audience={[
      { title: "Children's learning centres", desc: "Providers running timetabled sessions who need content that changes each term without new capital equipment." },
      { title: "STEM and after-school programmes", desc: "Programmes needing measurable outcomes — reaction time, accuracy, cooperation — to report to parents and funders." },
      { title: "Family entertainment centres", desc: "Operators adding scored competition to lift repeat visits and per-head spend without extending the footprint." },
      { title: "Malls, hotels and clinics", desc: "Compact spaces where an interactive wall or floor delivers activity in a footprint too small for a play structure." },
    ]}
    gallery={[
      { src: projectImages.bouncePark, alt: "Sensor ball court with scoring targets in a learning centre", caption: "Sensor ball court — reliable for occupying a group of 10–20 at once." },
      { src: heroImages.home, alt: "Interactive projection zone integrated into an indoor play hall", caption: "Projection zones placed away from glazing to hold ambient light under 150 lux." },
      { src: productImages.ninjaCourse, alt: "Timed obstacle equipment with interactive scoring for learning programmes", caption: "Timing gates make effort measurable and reportable to parents." },
    ]}
    specTable={{
      heading: "Interactive Format Comparison",
      intro: "Footprint, ambient light tolerance and programme fit by format.",
      caption: "Comparison of footprint, light tolerance, group size and content update path by interactive format",
      columns: ["Format", "Footprint", "Light tolerance", "Group size", "Content updates"],
      rows: [
        ["Projection wall", "8–15 m²", "Low (≤ 150 lux)", "4–10", "Library / term plan"],
        ["Floor projection", "9–20 m²", "Low (≤ 150 lux)", "6–15", "Library"],
        ["Sensor ball court", "20–40 m²", "High", "10–20", "Firmware game modes"],
        ["Reaction / light towers", "2–4 m²", "High", "2–6", "Firmware game modes"],
        ["Interactive climbing traverse", "12–25 m²", "Medium", "3–8", "Route packs"],
      ],
      footnote: "Light tolerance refers to measured illuminance on the play surface; sensor and LED formats tolerate daylight, projection formats do not.",
    }}
    sources={[
      {
        label: "ASTM F1487-21 — Playground Equipment for Public Use",
        publisher: "ASTM International",
        url: "https://www.astm.org/f1487-21.html",
        note: "Applies to the structural elements interactive systems are mounted on.",
      },
      {
        label: "IEC 60825-1 — Safety of Laser Products",
        publisher: "International Electrotechnical Commission",
        url: "https://webstore.iec.ch/publication/3587",
        note: "Referenced for laser-based projection sources and viewing-hazard classification.",
      },
      {
        label: "EN 1176 — Playground Equipment and Surfacing",
        publisher: "European Committee for Standardization",
        url: "https://www.en-standard.eu/csn-en-1176-1-playground-equipment-and-surfacing-part-1-general-safety-requirements-and-test-methods/",
      },
    ]}
    related={[
      { label: "How to design an educational play area", href: "/how-to-design-an-educational-indoor-play-area" },
      { label: "Modular reconfigurable play equipment", href: "/modular-reconfigurable-indoor-play-equipment" },
      { label: "Gamified attractions manufacturing", href: "/gamified-attractions-manufacturer" },
      { label: "Kinesthetic learning equipment", href: "/kinesthetic-learning-equipment-benefits" },
      { label: "Early childhood centre equipment specs", href: "/indoor-playground-equipment-for-early-childhood-centers" },
      { label: "Ninja course equipment", href: "/products/ninja-course" },
    ]}
    faq={[
      { title: "What is the best interactive equipment for a children's learning center?", desc: "For curriculum tie-in, an interactive projection wall wins because content can follow the term plan. For group throughput a sensor ball court is stronger, and for very small spaces reaction and light-tag towers deliver the most play per square metre. Choose by footprint, ambient light and whether you need content to change." },
      { title: "How much light can interactive projection tolerate?", desc: "Keep measured illuminance on the play surface below roughly 150 lux. A wall opposite glazing will wash out regardless of projector brightness, so blinds, luminaire zoning or a different wall are cheaper fixes than a bigger projector." },
      { title: "Does interactive equipment need a content subscription?", desc: "Often yes. Ask which games ship with the hardware, the update frequency, whether the licence is perpetual or annual, and what happens if the licence lapses. A wall that stops working when a subscription ends is a very different purchase from one that does not." },
      { title: "How long does interactive equipment hold children's attention?", desc: "A scored game set typically holds a group for 20–30 minutes, longer than a fixed structure element because the score resets the goal. Rotating two or three game modes per session is what sustains it across repeat visits." },
      { title: "Can interactive systems be added to existing play structures?", desc: "Yes — timing gates, projected targets and sensor panels retrofit to installed structures and slides. Plan cable routes, a dedicated circuit and ventilated, lockable enclosures; surface-mounted trunking added afterwards is the usual compromise." },
    ]}
  />
);

export default InteractivePlayEquipmentForLearningCenters;
