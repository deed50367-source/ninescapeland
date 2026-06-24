import { StableSolutionPage } from "./StableSolutionPage";

const SafetyStandardsForTrampolineParkEquipment = () => (
  <StableSolutionPage
    slug="safety-standards-for-trampoline-park-equipment"
    title="Safety Standards for Trampoline Park Equipment"
    kicker="ASTM F2970 · EN 13219 · TÜV · GB 19272"
    description="ASTM F2970, EN 13219 and TÜV safety standards for trampoline park equipment — compliance checklist, common violations, manufacturer certifications and operator inspection routine."
    primaryCta="Request Compliance Documents"
    secondaryCta="View Standards Framework"
    metrics={[
      { value: "ASTM F2970-20", label: "Primary US design standard" },
      { value: "EN 13219", label: "European trampoline standard" },
      { value: "TÜV", label: "Third-party certification body" },
      { value: "100%", label: "Equipment certified before shipment" },
    ]}
    frameworkTitle="The 4 Standards Every Trampoline Park Must Meet"
    frameworkIntro="Operators that open with documented compliance reduce insurance premiums, pass municipal inspections faster and avoid the lawsuits that have closed dozens of US and European parks over the last five years."
    framework={[
      { title: "ASTM F2970-20", desc: "The benchmark US standard covering trampoline court design, fall zones, foam pit depth, padding thickness, signage and operator training requirements." },
      { title: "EN 13219", desc: "European standard for trampolines used in commercial settings — covers structural strength, spring shielding, mat tension and access controls." },
      { title: "TÜV / SGS certification", desc: "Independent lab testing of load capacity, weld quality, spring fatigue and flame retardance — required by most European and Middle East insurers." },
      { title: "GB 19272 (China)", desc: "Mandatory standard for fitness equipment manufactured in China — covers raw materials, welding and surface finish that govern export quality." },
    ]}
    equipmentTitle="Equipment-Level Safety Requirements"
    equipmentIntro="Compliance is granular — each piece of equipment in a trampoline park has its own spec sheet. Use this list when briefing your manufacturer or auditing an existing facility."
    equipment={[
      { title: "Main court trampoline bed", desc: "Jump-mat tension within ASTM F2970 limits, padded frame coverage on 100% of steel, spring shielding rated to support adult body weight without exposure." },
      { title: "Wall-to-wall safety pads", desc: "Minimum 50 mm closed-cell foam covering every steel frame edge, with fire-retardant vinyl skin meeting NFPA 701 or equivalent." },
      { title: "Foam pit & landing zone", desc: "Pit depth ≥1.2 m, foam cube density and replacement schedule documented, pit walls padded, weight-bearing nets inspected monthly." },
      { title: "Stunt airbag / TumblTrak", desc: "Inflation-pressure monitoring, automatic shut-off backup, certified anchor points and dedicated supervisor required during operation." },
      { title: "Dodgeball & basketball zones", desc: "Net partitions rated for body impact, hoop padding, dedicated court timer to prevent overlapping age groups." },
      { title: "Ninja & climbing add-ons", desc: "ASTM F2970 Annex compliance for climbing, fall mat depth matched to platform height, redundant anchor system on every traverse." },
    ]}
    audienceTitle="Who Must Verify These Standards"
    audienceIntro="Trampoline park safety is a shared responsibility — manufacturer, operator and insurer each need documented evidence on file."
    audience={[
      { title: "Park owners & franchisees", desc: "Demand ASTM F2970 + TÜV certificates with serial numbers before signing the equipment contract, not after delivery." },
      { title: "Insurance underwriters", desc: "Premium discounts of 15–30% are common when the equipment package ships with third-party certification and an inspection log template." },
      { title: "Municipal inspectors", desc: "Pre-opening sign-off requires documented foam-pit depth, weld inspection reports, evacuation plan and operator training records." },
      { title: "Equipment manufacturers", desc: "Reputable factories test welding, springs, mats and finished assemblies in-house and provide batch-level certification with every shipment." },
    ]}
    related={[
      { label: "Trampoline park manufacturer", href: "/products/trampoline-park" },
      { label: "Trampoline park FEC solutions", href: "/trampoline-park-fec-solutions" },
      { label: "Safety certifications & test reports", href: "/safety-certifications" },
      { label: "Maintenance & warranty program", href: "/maintenance-warranty" },
      { label: "Educational benefits of indoor play centers", href: "/educational-benefits-of-indoor-play-centers" },
      { label: "Custom soft play for schools", href: "/custom-soft-play-equipment-manufacturer-for-schools" },
    ]}
    faq={[
      { title: "What are the main safety standards for trampoline park equipment?", desc: "ASTM F2970-20 (US), EN 13219 (Europe), TÜV / SGS third-party certification, and GB 19272 (China manufacturing). A compliant park carries documentation against all four where applicable." },
      { title: "Is ASTM F2970 mandatory in the United States?", desc: "ASTM F2970 is voluntary federally but is referenced by state building codes, IAAPA membership requirements and almost every commercial insurance policy — making it functionally mandatory for any park that wants insurance or financing." },
      { title: "How deep must a foam pit be?", desc: "ASTM F2970 requires a minimum 1.2 m of foam, with cube density and replacement schedule documented. Many insurers now require 1.5 m for adult-use parks." },
      { title: "What are the most common violations cited at trampoline parks?", desc: "Exposed steel frames missing padding, foam pits with compacted cubes past replacement date, overlapping age groups on the main court, and missing operator training logs." },
      { title: "Do manufacturers provide the certification or does the operator arrange it?", desc: "Reputable factories ship every order with batch-level ASTM/EN/TÜV certificates, weld inspection reports and serial numbers. Operators arrange ongoing local inspection." },
      { title: "How often should trampoline equipment be inspected?", desc: "Daily visual checks by staff, monthly documented inspection by a manager, and annual third-party structural inspection — keep all records for at least five years for insurance audits." },
    ]}
  />
);

export default SafetyStandardsForTrampolineParkEquipment;
