import { StableSolutionPage } from "./StableSolutionPage";
import { projectImages } from "@/config/galleryImages";

const AccessibleIndoorPlaygroundDesign = () => (
  <StableSolutionPage
    slug="accessible-indoor-playground-design-for-disabilities"
    title="Accessible Indoor Playground Design for Disabilities"
    kicker="Wheelchair Access · Transfer Systems · Inclusive Play Value"
    description="Accessible indoor playground design for children with disabilities: wheelchair-usable routes, transfer platforms, ground-level play value and equipment that families can use side by side."
    metaTitle="Accessible Indoor Playground Design for Disabilities"
    metaDescription="Wheelchair-accessible indoor playground design: step-free routes, transfer platforms, ground-level play value and inclusive equipment for mixed-ability families."
    keywords={["accessible indoor playground design for disabilities", "wheelchair accessible indoor playground", "inclusive playground equipment"]}
    heroImage={projectImages.indoorProject}
    heroImageAlt="Accessible indoor playground with step-free ramp access and ground-level play panels"
    primaryCta="Request an Accessible Layout"
    secondaryCta="See Access Framework"
    metrics={[
      { value: "915 mm", label: "Minimum clear route width" },
      { value: "1:12", label: "Maximum ramp gradient" },
      { value: "50%+", label: "Play value at ground level" },
      { value: "1.5 m", label: "Turning circle at decision points" },
    ]}
    frameworkTitle="Access Is a Route, a Transfer and a Reason to Stay"
    frameworkIntro="Accessible design fails when a venue adds one ramp and calls the job done. Real access means a child using a wheelchair can reach the play area, get onto or alongside equipment, and find activities worth doing once there — with siblings and carers beside them."
    framework={[
      { title: "Continuous step-free route", desc: "An unbroken accessible path from the car park through reception, socks area and into the play field, with no lip over 13 mm and no isolated dead ends." },
      { title: "Transfer and companion points", desc: "Transfer platforms at seat height beside slides and structures, with grab rails and a level companion space so a carer can assist without blocking the route." },
      { title: "Ground-level play value", desc: "At least half of the activity types are reachable without climbing: sensory panels, roller tables, sand-and-water play, music walls and turntable seats." },
      { title: "Predictable, calm environment", desc: "Zoned noise, controlled lighting, clear signage and a quiet retreat room so children with sensory or cognitive disabilities can regulate and return to play." },
      { title: "Side-by-side play", desc: "Wide slides, double-width ramps and shared platforms so a disabled child and a sibling or parent use the same element together, not in turn." },
    ]}
    equipmentTitle="Inclusive Equipment Specification"
    equipmentIntro="Every element below is chosen so mixed-ability groups can play in the same space at the same time, rather than an accessible corner separated from the main attraction."
    equipment={[
      { title: "Ramped access structure", desc: "1:12 ramped decks with 915 mm clear width, level landings and 100 mm kerb guards, giving wheelchair users access to the elevated play deck." },
      { title: "Transfer platform and wide slide", desc: "A seat-height transfer station with rails alongside a 900 mm wide slide that supports assisted or paired sliding." },
      { title: "Ground-level sensory panels", desc: "Tactile, gear, mirror, chime and light panels mounted at 600–1100 mm so they are reachable from a seated position." },
      { title: "Roll-on turntable and rocker", desc: "Flush-deck rotating and rocking platforms that a wheelchair can roll onto and be secured on for vestibular play." },
      { title: "Accessible ball pit and soft zone", desc: "Level-entry soft play with a firm transfer edge, low-height cushions and clear floor space for mobility aids at the perimeter." },
      { title: "Quiet regulation room", desc: "A low-stimulation retreat with dimmable light, acoustic padding and seating for children who need a break from noise and crowding." },
    ]}
    audienceTitle="Operators and Institutions Specifying Inclusive Play"
    audienceIntro="Inclusive specification is increasingly a funding or licensing requirement rather than a differentiator, particularly for publicly supported facilities."
    audience={[
      { title: "Special education schools", desc: "SEN settings needing certified equipment matched to mixed physical and sensory needs." },
      { title: "Therapy and rehabilitation centres", desc: "Clinical environments where play equipment supports occupational and physiotherapy goals." },
      { title: "Public community centres", desc: "Municipal facilities with accessibility obligations and grant conditions attached to funding." },
      { title: "Commercial play venues", desc: "Family entertainment centres widening their market by making mixed-ability visits genuinely workable." },
    ]}
    related={[
      { label: "Sensory-inclusive play equipment", href: "/sensory-inclusive-play-equipment" },
      { label: "Designing sensory play areas for education", href: "/designing-sensory-play-areas-for-education" },
      { label: "Safety certifications and standards", href: "/safety-certifications" },
      { label: "Soft play equipment range", href: "/products/soft-play" },
    ]}
    faq={[
      { title: "How is accessible design different from sensory-inclusive design?", desc: "Accessible design solves physical access: routes, gradients, transfers and reach ranges for mobility aid users. Sensory-inclusive design solves regulation: noise, light, texture and retreat space for ASD and SPD needs. A complete inclusive venue needs both, so we usually specify them together." },
      { title: "Does the whole structure need to be wheelchair accessible?", desc: "No, and standards do not require it. The requirement is an accessible route to the play area plus a meaningful proportion of play experiences that are reachable — practically, ramped access to at least one elevated deck plus ground-level activity of comparable play value." },
      { title: "What ramp gradient and width do you build to?", desc: "1:12 maximum gradient with level landings every 9 m of run, 915 mm minimum clear width, and a 1.5 m turning space at each decision point. Tighter local requirements can be applied on request." },
      { title: "Can accessible equipment be added to an existing playground?", desc: "Often yes. Transfer platforms, ground-level sensory panels, roll-on rockers and a quiet room can usually be retrofitted; adding compliant ramp access to an existing high deck depends on available floor area." },
      { title: "Is inclusive equipment certified the same way?", desc: "Yes. All equipment is manufactured to ASTM and TUV requirements, and accessibility features are detailed on the layout drawing so they can be checked against local accessibility codes before production." },
    ]}
  />
);

export default AccessibleIndoorPlaygroundDesign;
