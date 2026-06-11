import { AggregationLandingPage } from "./AggregationLandingPage";

const HomeschoolCoopIndoorPlay = () => (
  <AggregationLandingPage
    seoKey="homeschoolCoopPlay"
    slug="homeschool-coop-indoor-play-solutions"
    badge="Homeschool · Co-op · Community Hall"
    title="Indoor Play Solutions for Homeschool Co-ops"
    highlight="Portable Activity Packs for Shared Spaces"
    description="Modular indoor play equipment for homeschool co-ops, church gyms and community centres that need quick setup, safe physical activity and compact storage between sessions."
    primaryCta="Build a Co-op Play Pack"
    secondaryCta="View Portable Framework"
    stats={[
      { value: "45–90 min", label: "Typical co-op activity block" },
      { value: "60–180 m²", label: "Shared hall footprint" },
      { value: "2 staff", label: "Normal setup team" },
      { value: "15 min", label: "Pack-down target" },
    ]}
    principlesTitle="Physical Activity Without a Permanent Venue"
    principlesIntro="Homeschool groups often borrow halls, churches or community rooms. The equipment must feel substantial for children but still store, move and set up without a permanent install."
    principles={[
      { title: "Portable first", desc: "Freestanding stations, folding mats and wheeled storage carts avoid drilling into rented community spaces." },
      { title: "Fast setup", desc: "Colour-coded pieces and simple layouts let parent volunteers assemble the activity circuit quickly." },
      { title: "Mixed ages", desc: "Toddler, elementary and tween variations allow siblings to share one session without unsafe overlap." },
      { title: "Quiet supervision", desc: "Open sightlines help parents monitor groups while still allowing independent movement." },
      { title: "Rotation format", desc: "Stations work as timed circuits for PE blocks, free play, social events or rainy-day meetups." },
      { title: "Compact storage", desc: "Nested foam pieces, foldable balance items and cart-based packs fit into storage closets." },
      { title: "Community budget", desc: "Equipment can be phased in packs, starting with core movement and adding climbing or sensory modules later." },
      { title: "Insurance documents", desc: "Safety documentation and inspection checklists help co-op boards and host venues review risk." },
    ]}
    productsTitle="Portable Packs for Co-op Physical Activity"
    productsIntro="Rather than a permanent play centre, homeschool groups usually need a flexible kit that can change format week to week."
    products={[
      { title: "Movement circuit pack", desc: "Balance beams, hurdles, cones, stepping stones and soft blocks for PE-style rotations." },
      { title: "Foldable soft obstacle course", desc: "Tunnels, ramps, wedges and mats that pack into carts after the session." },
      { title: "Freestanding climbing frame", desc: "Low-height modular climber with padded landing areas, designed for supervised temporary use." },
      { title: "Toddler activity corner", desc: "Soft shapes, crawl tunnels and quiet tactile panels for younger siblings." },
      { title: "Team challenge set", desc: "Foam targets, relay props and reaction games for cooperative physical activities." },
      { title: "Storage and transport carts", desc: "Labelled carts and packing diagrams so volunteers can manage the kit consistently." },
    ]}
    useCasesTitle="Where Homeschool Play Packs Fit"
    useCasesIntro="These packages are strongest where a community wants recurring physical activity but cannot justify a fixed indoor playground build."
    useCases={[
      { title: "Homeschool co-ops", desc: "Weekly PE, movement breaks and social play for mixed-age learning communities." },
      { title: "Church gyms", desc: "Portable activity packs for weekday homeschool groups, Sunday school events and family nights." },
      { title: "Community centres", desc: "Shared equipment programs for local education groups and parent-led activity clubs." },
      { title: "Micro-schools", desc: "Compact movement rooms for small private learning groups in flexible spaces." },
    ]}
    related={[
      { label: "Indoor PE equipment", to: "/indoor-pe-equipment-for-schools" },
      { label: "Soft play equipment", to: "/products/soft-play" },
      { label: "Office wellness play", to: "/indoorplaygroundsolution-office-wellness-solutions" },
      { label: "Contact us", to: "/contact" },
    ]}
    faq={[
      { question: "Do homeschool co-ops need permanent installation?", answer: "Not usually. Most groups need freestanding, portable and cart-based equipment because they borrow halls or share space with other programs." },
      { question: "How much space does a starter co-op pack need?", answer: "A starter pack can work in 60–100 m². A larger mixed-age circuit with climbing and toddler zones is better in 120–180 m²." },
      { question: "Can parents set up the equipment themselves?", answer: "Yes. We design portable packs around simple assembly, colour-coded parts, labelled storage and clear safety inspection steps." },
      { question: "Can the pack grow over time?", answer: "Yes. Many co-ops start with movement and soft obstacle packs, then add climbing, sensory or team challenge modules after fundraising." },
    ]}
  />
);

export default HomeschoolCoopIndoorPlay;
