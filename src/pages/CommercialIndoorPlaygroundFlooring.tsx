import { StableSolutionPage } from "./StableSolutionPage";
import { productImages } from "@/config/galleryImages";

const CommercialIndoorPlaygroundFlooring = () => (
  <StableSolutionPage
    slug="commercial-indoor-playground-flooring-and-mats"
    title="Commercial Indoor Playground Flooring and Mats"
    kicker="Impact Attenuation · Rubber Tiles · Foam Matting · Vinyl Systems"
    description="Specify commercial indoor playground flooring the right way: fall-height-matched rubber tiles, bonded foam matting under climbing structures, welded vinyl in wet zones and a sub-base build-up that passes impact testing."
    metaTitle="Commercial Indoor Playground Flooring & Mats"
    metaDescription="Commercial playground flooring tiles, rubber and foam mats matched to critical fall height. Layer build-ups, thickness charts and installation sequence from the factory."
    keywords={[
      "commercial playground flooring tiles",
      "commercial indoor playground mats",
      "rubber flooring for play area",
      "foam playground mats",
    ]}
    heroImage={productImages.indoorPlayground}
    heroImageAlt="Commercial indoor playground with rubber tile and foam matting floor build-up"
    primaryCta="Get a Flooring Build-Up Spec"
    secondaryCta="See Flooring Framework"
    metrics={[
      { value: "20–50 mm", label: "Typical tile thickness range" },
      { value: "≤ 3.0 m", label: "Critical fall height covered" },
      { value: "4 layers", label: "Sub-base to wear-surface build-up" },
      { value: "ASTM F1292", label: "Impact attenuation reference" },
    ]}
    frameworkTitle="Flooring Is Selected by Fall Height, Not by Colour"
    frameworkIntro="Most flooring mistakes in indoor play centres start with choosing a product by look and price, then discovering it does not match the critical fall height of the structure above it. The correct order is: fix the equipment heights first, derive the required impact attenuation, then pick the layer build-up that delivers it."
    framework={[
      { title: "Map critical fall heights", desc: "Record the highest free-fall point of every platform, net and climb element. Each zone gets its own required attenuation value instead of one blanket thickness for the whole hall." },
      { title: "Choose the layer build-up", desc: "Screed or slab, moisture barrier, shock-absorbing base pad, then the wear surface. The base pad — not the visible tile — does most of the impact work above 1.5 m." },
      { title: "Match surface to activity", desc: "Bonded rubber under climbers, high-density foam under soft play, welded vinyl at cafés and toilets, and needle-punch carpet only in shoe-free toddler corners." },
      { title: "Plan joints and transitions", desc: "Heat-welded seams and tapered edge ramps at every material change stop trip lips forming and keep the floor mopped in one continuous pass." },
    ]}
    equipmentTitle="Flooring Systems We Supply With the Equipment Package"
    equipmentIntro="Because we manufacture the structures, flooring is quoted as part of the same layout so the attenuation under each element is correct on day one rather than corrected after an inspection."
    equipment={[
      { title: "Bonded rubber tiles", desc: "Interlocking EPDM-topped tiles in 20–50 mm thicknesses for climbing, ninja and multi-level zones where fall heights exceed 1.5 m." },
      { title: "High-density foam matting", desc: "Cross-linked PE and PU foam sheets under soft play and toddler frames, skinned in wipe-clean leatherette with welded seams." },
      { title: "Poured-in-place rubber", desc: "Seamless wet-pour surfacing for irregular layouts and themed graphics, laid to a two-layer base-plus-wear-course specification." },
      { title: "Welded commercial vinyl", desc: "2 mm heterogeneous vinyl with heat-welded joints and coved skirtings for cafés, party rooms, corridors and washrooms." },
      { title: "Trampoline pad and cover system", desc: "Perimeter safety pads, wall padding and spring covers matched to the bed layout, replacing generic mats around jump courts." },
      { title: "Shoe-free transition zone", desc: "Bench, cubby and barrier matting at the entry threshold so grit and street water never reach the play surfacing." },
    ]}
    audienceTitle="Who Needs a Flooring Specification Up Front"
    audienceIntro="Flooring is the single largest hidden cost in an indoor play fit-out. These buyers benefit most from having it specified alongside the equipment rather than tendered separately."
    audience={[
      { title: "New play centre operators", desc: "First-time operators fitting out a shell unit who need slab preparation and attenuation in the same drawing set." },
      { title: "Trampoline park builders", desc: "Jump-court projects where pad, cover and run-off surfacing all need matched specifications." },
      { title: "Schools and nurseries", desc: "Education settings replacing worn carpet or hard tiles with a compliant, cleanable, impact-rated surface." },
      { title: "Mall and hotel fit-out contractors", desc: "Contractors working to a landlord specification who need documented test references for approval." },
    ]}
    related={[
      { label: "Indoor playground equipment range", href: "/products/indoor-playground" },
      { label: "Trampoline park equipment", href: "/products/trampoline-park" },
      { label: "Safety certifications and standards", href: "/safety-certifications" },
      { label: "Maintenance and warranty programme", href: "/maintenance-warranty" },
      { label: "Play equipment for small spaces", href: "/safe-indoor-playground-equipment-for-small-spaces" },
    ]}
    faq={[
      { title: "How thick should indoor playground flooring be?", desc: "Thickness follows fall height, not room size. Toddler areas under 1 m of fall height work with 20–25 mm bonded rubber or high-density foam; climbing structures at 2–3 m need 40–50 mm bonded rubber over a shock pad. Ask for the attenuation test reference for the exact build-up, not just the tile thickness." },
      { title: "Rubber tiles or foam mats — which is better indoors?", desc: "Bonded rubber tiles handle shoe traffic, heavy point loads and higher fall heights, so they suit climbers, ninja courses and circulation. Skinned foam matting is softer underfoot and easier to wipe, so it suits shoe-free soft play and toddler zones. Most projects use both, zoned by activity." },
      { title: "Can flooring go over an existing concrete slab?", desc: "Yes, provided the slab is level to within 3 mm over 2 m, dry, and sealed with a moisture barrier. Uneven slabs need a self-levelling screed first; skipping that step is the most common cause of tile edges lifting within the first year." },
      { title: "How is play flooring cleaned and maintained?", desc: "Daily dry sweep plus damp mop with a neutral detergent, weekly deep clean on welded vinyl and rubber, and quarterly inspection of seams and edge ramps. We supply a chemical compatibility list so staff avoid solvents that harden rubber binders." },
      { title: "Do you supply flooring separately from equipment?", desc: "We quote flooring as part of a complete layout package, which is how the attenuation under each structure gets verified. Supply-only flooring is possible for existing venues once we have the equipment heights and a floor plan." },
    ]}
  />
);

export default CommercialIndoorPlaygroundFlooring;
