import { StableSolutionPage } from "./StableSolutionPage";
import { productImages, projectImages, heroImages } from "@/config/galleryImages";

const TuvCertifiedPlaygroundSupplier = () => (
  <StableSolutionPage
    slug="tuv-certified-playground-equipment-supplier"
    title="TUV Certified Playground Equipment Supplier"
    kicker="Certificate Verification · Test Reports · Factory Audit Trail"
    description="How to verify that a playground equipment supplier's TUV, ASTM and EN 1176 paperwork actually covers the product you are buying — certificate scope, test report numbers, factory audit records and the documents an inspector will ask for at handover."
    metaTitle="TUV Certified Playground Equipment Supplier"
    metaDescription="Verify a playground equipment supplier's TUV, EN 1176 and ASTM paperwork: certificate scope, test report numbers, factory audit records and handover document checklist."
    keywords={[
      "TUV certified playground equipment supplier",
      "tuv certified playground equipment",
      "playground equipment certification",
      "en 1176 certified play equipment",
    ]}
    heroImage={heroImages.aboutUs}
    heroImageAlt="Playground equipment factory production line with certified quality control records"
    primaryCta="Request Our Certificate Pack"
    secondaryCta="See Verification Framework"
    metrics={[
      { value: "EN 1176", label: "European play equipment series" },
      { value: "ASTM F1918", label: "Soft contained play standard" },
      { value: "4 documents", label: "Minimum handover pack" },
      { value: "Per-product", label: "Test report scope required" },
    ]}
    frameworkTitle="A Certificate Logo Is Not a Certification"
    frameworkIntro="Most disputed play projects have paperwork — it just does not cover the delivered product. The certificate names a different model, the test report is for a raw material, or the audit covers a trading company instead of the factory. These four checks catch almost all of it before deposit."
    framework={[
      { title: "Check the certificate scope line", desc: "Read the product description and model range on the certificate itself. If your quoted structure, net or trampoline bed is not inside that scope, the certificate does not apply to your order." },
      { title: "Trace the test report number", desc: "Every genuine certificate references a test report ID and issue date. Ask for the full report, not the one-page certificate, and confirm the tested samples match your material and thickness." },
      { title: "Confirm who was audited", desc: "A factory audit report names an address and a legal entity. Verify it is the plant manufacturing your goods, not an agent or a sister company sharing the brand." },
      { title: "Agree the handover pack in the contract", desc: "Name the four documents — certificates, test reports, installation and inspection manual, and as-built drawings — as a payment milestone, so they arrive with the goods rather than after commissioning." },
    ]}
    equipmentTitle="What We Document Per Product Category"
    equipmentIntro="Our documentation is issued per product family and per project, so the paperwork you receive references your order rather than a generic brochure claim."
    equipment={[
      { title: "Soft contained play structures", desc: "Foam density and skin flammability test data, welded seam strength, entrapment and protrusion check records against ASTM F1918 and EN 1176-10." },
      { title: "Trampoline courts", desc: "Bed and spring fatigue cycles, pad impact attenuation and perimeter enclosure loading, documented against ASTM F2970." },
      { title: "Ninja and climbing elements", desc: "Rope and net breaking loads, anchor pull-out values and fall-height calculations per element with the tested configuration recorded." },
      { title: "Steel and hardware", desc: "Mill certificates for tube grades, coating thickness readings and fastener class records — the material data most disputes actually turn on." },
      { title: "Surfacing and matting", desc: "Impact attenuation test references per build-up thickness against ASTM F1292, matched to the critical fall height of the structure above." },
      { title: "Project handover file", desc: "As-built drawings, installation and annual inspection manual, spare parts list and warranty terms compiled as a single indexed PDF." },
    ]}
    audienceTitle="Who Needs Verified Certification"
    audienceIntro="Certification paperwork stops being administrative the moment an inspector, insurer or landlord asks for it — usually days before opening."
    audience={[
      { title: "Importers and distributors", desc: "Buyers reselling into markets where customs or retailers require conformity documents naming the manufacturing entity." },
      { title: "Schools and public institutions", desc: "Tender-driven buyers whose award criteria list specific standards and require documents in the bid, not after." },
      { title: "Mall and hotel operators", desc: "Tenants whose landlord fit-out approval and public liability cover depend on documented compliance." },
      { title: "Insurers and inspection bodies", desc: "Third parties verifying an installed venue who need the original test references and inspection manual." },
    ]}
    gallery={[
      { src: heroImages.aboutUs, alt: "Playground equipment manufacturing facility exterior", caption: "Audited manufacturing plant — the entity named on our factory audit records." },
      { src: productImages.trampolinePark, alt: "Trampoline court with certified perimeter padding and enclosure", caption: "Trampoline courts documented against ASTM F2970 bed, spring and pad testing." },
      { src: projectImages.indoorProject, alt: "Soft play structure detail showing welded seams and padding", caption: "Soft play seams, foam density and flammability data recorded per production batch." },
    ]}
    specTable={{
      heading: "Which Standard Covers Which Product",
      intro: "Use this to check that the certificate you are shown matches the equipment you are buying.",
      caption: "Comparison of applicable standards and required documents by product category",
      columns: ["Product", "Primary standard", "Test evidence to request", "Issuing bodies commonly seen"],
      rows: [
        ["Soft contained play", "ASTM F1918 / EN 1176-10", "Foam density, skin flammability, seam strength", "TUV, SGS, Intertek"],
        ["Outdoor-style climbers indoors", "ASTM F1487 / EN 1176-1", "Fall height, entrapment, structural load", "TUV, SGS"],
        ["Trampoline court", "ASTM F2970", "Bed and spring fatigue, pad attenuation", "TUV, Intertek"],
        ["Ropes, nets, anchors", "EN 1176-2/-3", "Breaking load, anchor pull-out", "TUV, SGS"],
        ["Impact surfacing", "ASTM F1292 / EN 1177", "Attenuation per build-up thickness", "TUV, Intertek"],
      ],
      footnote: "TUV certification is issued per tested configuration. A certificate for one model does not automatically cover a modified height, net grade or bed layout.",
    }}
    sources={[
      {
        label: "EN 1176 — Playground Equipment and Surfacing",
        publisher: "European Committee for Standardization (CEN)",
        url: "https://standards.cencenelec.eu/dyn/www/f?p=205:110:0::::FSP_PROJECT:22773",
      },
      {
        label: "ASTM F1918 — Soft Contained Play Equipment",
        publisher: "ASTM International",
        url: "https://www.astm.org/f1918-12r19.html",
      },
      {
        label: "ASTM F2970 — Trampoline Courts",
        publisher: "ASTM International",
        url: "https://www.astm.org/f2970-15.html",
      },
      {
        label: "Public Playground Safety Handbook (CPSC 325)",
        publisher: "U.S. Consumer Product Safety Commission",
        url: "https://www.cpsc.gov/s3fs-public/325.pdf",
      },
    ]}
    related={[
      { label: "Our safety certifications", href: "/safety-certifications" },
      { label: "Trampoline park equipment safety standards", href: "/safety-standards-for-trampoline-park-equipment" },
      { label: "Maintenance and warranty programme", href: "/maintenance-warranty" },
      { label: "Preschool playground equipment and soft play", href: "/preschool-playground-equipment-and-soft-play-design" },
      { label: "Commercial playground flooring and mats", href: "/commercial-indoor-playground-flooring-and-mats" },
    ]}
    faq={[
      { title: "What does TUV certification actually cover on playground equipment?", desc: "TUV certifies a tested configuration against a named standard — usually the EN 1176 series for play structures or ASTM F2970 for trampoline courts. The certificate lists the product scope and references a test report. It certifies that sample configuration, not every product the supplier sells." },
      { title: "How do I verify a supplier's certificate is genuine?", desc: "Request the full test report referenced on the certificate, check the report number and issue date, confirm the certificate holder's legal name matches the manufacturer invoicing you, and verify the product scope line covers your model. Certification bodies will confirm a report number on request." },
      { title: "Is TUV or ASTM required to import playground equipment?", desc: "It depends on the destination. European projects generally work to EN 1176 with CE-marked components; North American buyers and insurers usually ask for ASTM F1487, F1918 or F2970 evidence. Institutional tenders often name both. Ask which standard your inspector or insurer will audit against before ordering." },
      { title: "Which documents should arrive with the shipment?", desc: "Four as a minimum: applicable certificates, the referenced test reports, an installation and annual inspection manual, and as-built drawings of the delivered layout. Add mill and coating certificates for steel, and attenuation references for any supplied surfacing." },
      { title: "Do custom designs invalidate a certificate?", desc: "Custom layouts do not invalidate component certification, but changed platform heights, net grades or bed layouts fall outside the tested configuration. In those cases the correct evidence is component certification plus a project-specific fall-height and load calculation, which we issue with the drawing set." },
    ]}
  />
);

export default TuvCertifiedPlaygroundSupplier;
