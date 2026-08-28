import { StableSolutionPage } from "./StableSolutionPage";
import { productImages, projectImages, heroImages } from "@/config/galleryImages";

const SafeIndoorPlayAreasForSixYearOlds = () => (
  <StableSolutionPage
    slug="safe-indoor-play-areas-for-6-year-olds"
    title="Safe Indoor Play Areas for 6 Year Olds"
    kicker="Ages 5–8 · Party Group Layouts · Real Challenge, Controlled Risk"
    description="Six-year-olds outgrow toddler soft play but are too small for teen adventure rigs. This is how to specify a 5–8 age zone with genuine challenge, party-group circulation for 10–20 children and the fall heights, gaps and sightlines that keep it safe."
    metaTitle="Safe Indoor Play Areas for 6 Year Olds"
    metaDescription="Specify safe indoor play areas for 5-8 year olds: fall heights, gap limits, party-group circulation for 10-20 children and equipment with real challenge for six-year-olds."
    keywords={[
      "safe indoor play areas for 6 year olds",
      "indoor play area for kids age 6",
      "birthday party play area",
      "indoor playground for 5 to 8 year olds",
    ]}
    heroImage={heroImages.projects}
    heroImageAlt="Indoor play area zoned for five to eight year olds with climbing and slide activities"
    primaryCta="Plan a 5–8 Age Zone"
    secondaryCta="See Design Framework"
    metrics={[
      { value: "5–8 yrs", label: "Target age band" },
      { value: "≤ 2.0 m", label: "Designed critical fall height" },
      { value: "10–20", label: "Children per party group" },
      { value: "89–230 mm", label: "Head entrapment gap rule" },
    ]}
    frameworkTitle="The 5–8 Age Gap Is Where Most Venues Lose Bookings"
    frameworkIntro="Toddler zones bore a six-year-old within ten minutes, and teen rigs are physically unsafe for them. A dedicated 5–8 zone keeps the family visit longer and is the single zone that converts birthday party enquiries."
    framework={[
      { title: "Give real challenge inside safe limits", desc: "Six-year-olds need effort, height and speed. Design to a 1.8–2.0 m critical fall height with matched attenuating surfacing rather than capping structures at toddler heights they will simply climb outside of." },
      { title: "Zone away from under-3s", desc: "Physical separation — not a painted line — between the 5–8 zone and the toddler area. Mixed running speeds in one space are the most common cause of collision incidents." },
      { title: "Design circulation for party groups", desc: "A party of 10–20 arrives together and moves as a pack. One-way loops, a wide entry funnel and 1.5 m aisles stop the pile-ups that generate complaints and injuries." },
      { title: "Engineer the details that get inspected", desc: "Head entrapment gaps outside the 89–230 mm band, no protrusions or entanglement points at deck level, guarded platform edges, and clear run-off space at every slide exit." },
    ]}
    equipmentTitle="Equipment That Holds a Six-Year-Old's Attention"
    equipmentIntro="Every element below is built to a documented fall height and paired with the correct surfacing build-up, so the challenge level rises without the risk profile rising with it."
    equipment={[
      { title: "Multi-level climbing frame", desc: "Two to three decks with net climbs, rope tunnels and a rotating challenge route — enough vertical travel to feel earned at age six." },
      { title: "Timed ninja and obstacle run", desc: "Hanging steps, wobble beams and a warped wall at 5–8 scale, with a timer display. Competition is what makes this age band repeat the activity." },
      { title: "Wide racing slides", desc: "Twin or triple lanes so a party group races side by side rather than queueing single file at one drop slide." },
      { title: "Interactive ball court", desc: "Projection or sensor-based ball games with scoring — the format that reliably occupies a mixed-gender party group of this age for 20+ minutes." },
      { title: "Trampoline mini-court", desc: "A 6–12 bed court sized for 5–8 body weights with perimeter padding and one-jumper-per-bed marking." },
      { title: "Party room and staging area", desc: "A separated room with a table plan for 20, plus a holding area at the zone entrance so groups are briefed before entering." },
    ]}
    audienceTitle="Who Needs a Dedicated 5–8 Zone"
    audienceIntro="This zone is usually specified either to fix a booking problem or to extend dwell time for families with more than one child."
    audience={[
      { title: "Play centre operators", desc: "Venues losing birthday bookings to competitors because the offer stops at toddler soft play." },
      { title: "Family entertainment centres", desc: "FECs with arcade and teen attractions that lack a physical activity zone for primary-age children." },
      { title: "Schools and after-school clubs", desc: "Settings covering Key Stage 1 / grades K–3 who need indoor active provision in wet weather." },
      { title: "Hotels, resorts and malls", desc: "Family destinations where the 5–8 band is the age most likely to be visiting with younger siblings." },
    ]}
    gallery={[
      { src: heroImages.projects, alt: "Completed indoor play zone for primary age children", caption: "Dedicated 5–8 zone physically separated from the toddler area." },
      { src: productImages.ninjaCourse, alt: "Ninja obstacle course scaled for five to eight year olds", caption: "Timed ninja run at 5–8 scale — competition drives repeat play." },
      { src: projectImages.bouncePark, alt: "Interactive ball and trampoline area for children aged six", caption: "Interactive ball court and mini trampoline court for party groups." },
    ]}
    specTable={{
      heading: "Age-Band Specification Comparison",
      intro: "Why a 6-year-old needs a different zone from a toddler and from a teenager.",
      caption: "Comparison of fall height, activity type and area allowance by age band",
      columns: ["Age band", "Design fall height", "Core activities", "Area per child"],
      rows: [
        ["1–3 years", "≤ 1.0 m", "Soft blocks, low slide, ball pool", "2.5–3 sqm"],
        ["3–5 years", "≤ 1.5 m", "Low climber, tunnels, role play", "3–3.5 sqm"],
        ["5–8 years", "1.8–2.0 m", "Multi-level climber, ninja run, racing slides, ball court", "3.5–4.5 sqm"],
        ["9–14 years", "2.0–3.0 m", "Trampoline court, high ropes, drop slide", "4.5–6 sqm"],
      ],
      footnote: "Fall heights are design targets matched to an attenuating surfacing build-up tested to ASTM F1292 or EN 1177; verify the tested build-up, not just the mat thickness.",
    }}
    sources={[
      {
        label: "Public Playground Safety Handbook (CPSC 325)",
        publisher: "U.S. Consumer Product Safety Commission",
        url: "https://www.cpsc.gov/s3fs-public/325.pdf",
        note: "Referenced for age-appropriate design, entrapment gap limits and protrusion guidance.",
      },
      {
        label: "ASTM F1487-21 — Playground Equipment for Public Use",
        publisher: "ASTM International",
        url: "https://www.astm.org/f1487-21.html",
      },
      {
        label: "ASTM F1292 — Impact Attenuation of Surfacing Materials",
        publisher: "ASTM International",
        url: "https://www.astm.org/f1292-22.html",
      },
    ]}
    related={[
      { label: "Educational activities by age", href: "/indoor-play-center-educational-activities-by-age" },
      { label: "Inclusive play center design", href: "/inclusive-play-center-design-for-children" },
      { label: "Playground flooring and mats", href: "/commercial-indoor-playground-flooring-and-mats" },
      { label: "Play equipment for small spaces", href: "/safe-indoor-playground-equipment-for-small-spaces" },
      { label: "Ninja course equipment", href: "/products/ninja-course" },
    ]}
    faq={[
      { title: "What indoor play equipment is safe for a 6 year old?", desc: "At age six children handle multi-level climbing frames, ninja and obstacle runs, wide racing slides, interactive ball courts and small trampoline beds. The safety limit is not the activity type but the fall height and the surfacing under it: design to 1.8–2.0 m critical fall height with a tested attenuating build-up, keep gaps outside the 89–230 mm entrapment band, and separate the zone from under-3s." },
      { title: "How much space does a 5–8 age zone need?", desc: "Allow 3.5–4.5 sqm of net play area per child. A zone hosting two 15-child parties at once therefore needs roughly 110–135 sqm of play area plus circulation, party room and staging space." },
      { title: "Can 6 year olds and toddlers share one play area?", desc: "Not safely in the same space. Running speed and body mass differ too much, and collisions are the leading incident type in mixed zones. Use a physical barrier and separate entries; a shared viewing and seating area between the two zones keeps supervision practical for parents with both ages." },
      { title: "How many children per supervisor at a party?", desc: "Venues commonly staff one host per 10–15 children for this age band, with parents retained as responsible adults. The layout matters as much as the ratio: one-way loops and open sightlines let a single host see the whole group from the staging point." },
      { title: "What is the best play format for a 6 year old's birthday party?", desc: "Competitive group formats — timed ninja runs, racing slides and scored ball games — hold a 10–20 child group longest because everyone plays at once instead of queueing. Plan a 90-minute booking as 50 minutes active play, 30 minutes party room, 10 minutes free play." },
    ]}
  />
);

export default SafeIndoorPlayAreasForSixYearOlds;
