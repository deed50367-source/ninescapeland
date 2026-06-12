import { StableSolutionPage } from "./StableSolutionPage";

const IndoorSummerCampPlayground = () => (
  <StableSolutionPage
    slug="indoor-summer-camp-playground-ideas"
    title="Indoor Summer Camp Playground Ideas"
    kicker="Summer Camp · Rain-Day · Seasonal Programs"
    description="Seasonal indoor play ideas for schools, camps, resorts and community centres that need weather-proof activity rotations, themed challenges and fast daily reset."
    primaryCta="Plan a Camp Activity Zone"
    secondaryCta="View Camp Framework"
    metrics={[
      { value: "6–8", label: "Activity rotations" },
      { value: "20–40", label: "Children per session" },
      { value: "3 themes", label: "Weekly program changes" },
      { value: "2027", label: "Seasonal SEO runway" },
    ]}
    frameworkTitle="Turn Indoor Time Into a Camp Program, Not a Waiting Room"
    frameworkIntro="Summer camp spaces need repeatable activity formats, theme changes, group control and durable equipment that survives intensive seasonal use."
    framework={[
      { title: "Rain-day capacity", desc: "Indoor layouts absorb full outdoor groups when weather forces schedule changes." },
      { title: "Theme rotation", desc: "Adventure, ocean, space or jungle overlays keep weekly campers from repeating the same experience." },
      { title: "Group management", desc: "Clear zones and timed rotations help counsellors move groups without crowding." },
      { title: "High-throughput play", desc: "Parallel activities prevent one slide or one obstacle from becoming the bottleneck." },
    ]}
    equipmentTitle="Indoor Equipment Ideas for Seasonal Camp Programs"
    equipmentIntro="A practical camp zone combines large anchor activities with smaller challenge stations so groups can rotate smoothly through the day."
    equipment={[
      { title: "Adventure obstacle course", desc: "Climbing, crawling, balancing and sliding challenges arranged for timed group rotations." },
      { title: "Themed soft play structure", desc: "Ocean, jungle, space or camp-adventure layouts that can anchor weekly program themes." },
      { title: "Ninja challenge lane", desc: "Low-height obstacle lane for older campers, team races and achievement badges." },
      { title: "Interactive target wall", desc: "Foam ball targets, reaction lights and scoring games for team competitions." },
      { title: "Toddler camp corner", desc: "Soft shapes, crawl tunnels and calm play for younger siblings or preschool camp groups." },
      { title: "Storage and prop system", desc: "Theme props, signage and equipment carts that let staff switch formats quickly." },
    ]}
    audienceTitle="Seasonal Buyers That Need Weather-Proof Play"
    audienceIntro="These designs support both dedicated camp operators and existing venues that add summer programming to increase utilization."
    audience={[
      { title: "School summer camps", desc: "Indoor PE, rain-day movement and themed activity weeks for existing school facilities." },
      { title: "Community centres", desc: "Flexible play rooms for municipal summer programs and holiday care." },
      { title: "Family resorts", desc: "Kids-club indoor play zones that keep guest experience stable during heat, storms or poor air quality." },
      { title: "FEC operators", desc: "Seasonal camp add-ons that use existing staff and increase weekday daytime revenue." },
    ]}
    related={[
      { label: "Themed playground design", href: "/themed-indoor-playground-design" },
      { label: "Indoor playground equipment", href: "/products/indoor-playground" },
      { label: "Ninja course", href: "/products/ninja-course" },
      { label: "Case studies", href: "/case-studies" },
    ]}
    faq={[
      { title: "What makes a playground suitable for summer camp?", desc: "Camp layouts need group rotation, fast reset, theme flexibility and high-throughput activities so counsellors can manage changing schedules and weather disruptions." },
      { title: "Can the same indoor zone work outside summer?", desc: "Yes. Most camp-oriented indoor zones can also serve birthdays, school holiday programs, family events and off-season weekday sessions." },
      { title: "How do we avoid campers getting bored after one week?", desc: "We design core activities with changeable props, scoring rules and themed signage so the same equipment supports different weekly challenges." },
      { title: "Is this only for large facilities?", desc: "No. A starter camp activity zone can fit in a classroom-sized room, while larger resorts and FECs can build multi-zone indoor camp hubs." },
    ]}
  />
);

export default IndoorSummerCampPlayground;
