import { StableSolutionPage } from "./StableSolutionPage";
import { productImages } from "@/config/galleryImages";

const HygienicIndoorPlaygroundForInfants = () => (
  <StableSolutionPage
    slug="hygienic-indoor-playground-for-infants"
    title="Hygienic Indoor Playground for Infants"
    kicker="Infant Hygiene · Antimicrobial Surfaces · Cleaning Protocols"
    description="Build the cleanest indoor playground for infants: wipe-clean antimicrobial soft play, sealed seams, washable padding covers and a documented daily sanitising routine for 0–3 year zones."
    metaTitle="Cleanest Indoor Playground for Infants | Hygiene"
    metaDescription="Infant indoor play equipment built for hygiene: antimicrobial wipe-clean surfaces, sealed seams, removable washable covers and a documented cleaning protocol."
    keywords={["cleanest indoor playground for infants", "hygienic infant soft play equipment", "antimicrobial baby play area"]}
    heroImage={productImages.softPlay}
    heroImageAlt="Hygienic infant soft play zone with wipe-clean padded equipment"
    primaryCta="Request a Hygiene-First Layout"
    secondaryCta="See Hygiene Framework"
    metrics={[
      { value: "0–3 yrs", label: "Dedicated infant age band" },
      { value: "100%", label: "Wipe-clean contact surfaces" },
      { value: "3 levels", label: "Daily / weekly / deep-clean cycle" },
      { value: "ASTM + TUV", label: "Material & safety certification" },
    ]}
    frameworkTitle="Hygiene Designed Into the Equipment, Not Added Afterwards"
    frameworkIntro="Parents judge an infant play area by how clean it looks and smells within ten seconds. Hygiene has to be built into materials, seams and layout before the first opening day, because retrofit cleaning cannot fix porous fabric or hidden crevices."
    framework={[
      { title: "Non-porous skins", title2: undefined as never, desc: "Closed-cell PVC and PU leatherette skins on all crawl, climb and cushion surfaces so spills, saliva and milk sit on top and wipe away instead of soaking in." } as never,
      { title: "Sealed, welded seams", desc: "High-frequency welded seams replace stitched joints on infant padding, removing thread channels where dust, crumbs and bacteria collect." },
      { title: "Removable washable covers", desc: "Ball pit liners, crawl mats and nursing-corner cushions use zip-off covers that go into a 60 °C machine wash on a weekly rotation." },
      { title: "Cleanable circulation", desc: "Open sightlines, 90 cm service gaps and lift-out floor mats let a single staff member mop and sanitise the full zone in under 30 minutes." },
    ]}
    equipmentTitle="Infant Zone Equipment Selected for Sanitising Speed"
    equipmentIntro="Every element in a 0–3 area is chosen for two things at once: gross-motor development at crawler and early-walker scale, and how fast it can be sanitised between sessions."
    equipment={[
      { title: "Wipe-clean foam soft play", desc: "Low blocks, slopes, rockers and tunnels in seamless skins, sized for crawling, pulling up and first steps." },
      { title: "Drainable ball pit", desc: "Shallow infant ball pool with a perforated base tray and a batch-washable ball set so balls can be rotated out for cleaning without closing the pit." },
      { title: "Sensory activity panels", desc: "Sealed acrylic mirrors, gear panels and light-touch boards mounted at 30–70 cm, all flat-fronted for a single-pass wipe." },
      { title: "Antimicrobial floor system", desc: "Seamless welded vinyl or interlocking EVA with heat-welded joints, eliminating the grout lines and carpet fibres that hold odour." },
      { title: "Shoe-free entry gate", desc: "A defined barefoot threshold with bench seating, sock dispenser and shoe cubbies to stop street contamination entering the play field." },
      { title: "Parent hygiene station", desc: "Hand-sanitiser posts, wipe dispensers and a nappy-change bay positioned outside the play boundary to keep the play field dry." },
    ]}
    audienceTitle="Who Buys a Hygiene-Led Infant Play Area"
    audienceIntro="This specification suits operators whose customers are first-time parents — the audience most sensitive to visible cleanliness and least tolerant of shared-toy risk."
    audience={[
      { title: "Baby and toddler play cafés", desc: "Venues where parents stay for an hour and inspect every surface their infant touches." },
      { title: "Nurseries and daycare centres", desc: "Licensed settings that must document a cleaning schedule for inspection." },
      { title: "Hospital and clinic waiting areas", desc: "Healthcare environments requiring non-porous, disinfectant-tolerant materials." },
      { title: "Hotel and mall baby corners", desc: "Unstaffed or lightly staffed corners that must still look spotless at closing time." },
    ]}
    related={[
      { label: "Soft play equipment range", href: "/products/soft-play" },
      { label: "Safe play equipment for small spaces", href: "/safe-indoor-playground-equipment-for-small-spaces" },
      { label: "Safety certifications and standards", href: "/safety-certifications" },
      { label: "Maintenance and warranty programme", href: "/maintenance-warranty" },
    ]}
    faq={[
      { title: "What actually makes an infant playground hygienic?", desc: "Three things: non-porous welded surfaces with no stitched seams, removable machine-washable covers on every fabric element, and a layout that a single staff member can fully sanitise in under 30 minutes. Cleaning frequency alone cannot compensate for porous materials." },
      { title: "Can ball pits be kept clean for babies?", desc: "Yes, with a shallow perforated-base pool and a two-set ball rotation. One set is in use while the other is machine-washed and dried, so the pit never closes for cleaning and balls are cycled weekly rather than quarterly." },
      { title: "Which disinfectants are safe on your infant equipment?", desc: "Alcohol-based and quaternary-ammonium wipes at standard dilution are safe on our PVC and PU skins. We supply a written chemical compatibility list so staff avoid solvent or chlorine products that would craze the surface." },
      { title: "Is a separate infant zone really necessary?", desc: "Yes. Mixing crawlers with 6–12 year olds creates both impact risk and hygiene risk. A physically bounded 0–3 zone with its own barefoot entry keeps outdoor dirt and older-child traffic out of the infant play field." },
      { title: "How large does an infant zone need to be?", desc: "A workable dedicated infant area starts around 25–40 m². Below that you lose the barefoot threshold and parent seating that make the hygiene routine practical." },
    ]}
  />
);

export default HygienicIndoorPlaygroundForInfants;
