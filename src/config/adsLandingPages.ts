// Ads landing page configuration.
// One entry per Google Ads product line. All pages share AdsLandingPage template.

import heroPlayground from "@/assets/hero-playground.jpg";
import heroProjects from "@/assets/hero-projects.jpg";
import heroAboutUs from "@/assets/hero-about-us.jpg";
import productIndoor from "@/assets/product-indoor-playground.jpg";
import productTrampoline from "@/assets/product-trampoline-park.jpg";
import productNinja from "@/assets/product-ninja-course.jpg";
import productSoftPlay from "@/assets/product-soft-play.jpg";
import projectFec from "@/assets/project-fec-center.jpg";
import projectBounce from "@/assets/project-bounce-park.jpg";

export { heroAboutUs };


export interface AdsProductLineCard {
  title: string;
  description: string;
  href: string;
  image?: string;
}

export interface AdsFAQ {
  q: string;
  a: string;
}

export interface AdsCaseStudy {
  country: string;
  flag: string;
  title: string;
  quote: string;
  client: string;
  image?: string;
}

export interface AdsLandingConfig {
  slug: string;                 // /lp/<slug>
  campaign: string;             // Passed to gtag events
  seoTitle: string;             // <60 chars
  seoDescription: string;       // <160 chars
  h1: string;
  subhead: string;
  heroBullets: string[];
  heroImage?: string;
  projectTypes: string[];       // Form select
  productLines: AdsProductLineCard[];
  whyUs: { title: string; desc: string }[];
  process: { step: string; title: string; desc: string }[];
  cases: AdsCaseStudy[];
  faqs: AdsFAQ[];
}

const commonProductLines: AdsProductLineCard[] = [
  { title: "Indoor Playground Equipment", description: "Multi-level soft play structures, ball pits, slides, and toddler zones.", href: "/products/indoor-playground", image: productIndoor },
  { title: "Trampoline Park Equipment", description: "Olympic-grade jump beds, foam pits, dodgeball courts and wall runners.", href: "/products/trampoline-park", image: productTrampoline },
  { title: "Ninja Warrior Course", description: "Modular obstacle courses for kids, teens and adult competitions.", href: "/products/ninja-course", image: productNinja },
  { title: "Soft Play Equipment", description: "Toddler-safe foam blocks, shapes and role-play sets for ages 1-5.", href: "/products/soft-play", image: productSoftPlay },
  { title: "FEC Attractions", description: "Turnkey Family Entertainment Center packages combining all attractions.", href: "/products", image: projectFec },
];


const commonWhyUs = [
  { title: "Direct-from-Factory Pricing", desc: "50,000㎡ own factory in Wenzhou. No middlemen. Save 20-35% vs trading companies." },
  { title: "Free 3D Design", desc: "Custom concept drawings and floor plans delivered in 3-5 working days, no upfront fee." },
  { title: "25-Day Production", desc: "Standard lead time from deposit to ex-works. Rush orders in 18 days possible." },
  { title: "ASTM · TUV · EN1176 · CE · ISO9001", desc: "Every project ships with full test reports for local permit approvals." },
  { title: "3-Year Structural Warranty", desc: "Lifetime spare parts supply and remote installation guidance included." },
  { title: "2,000+ Projects, 50+ Countries", desc: "USA, UK, Canada, UAE, Australia — English-speaking export team since 2008." },
];

const commonProcess = [
  { step: "01", title: "Free Consultation", desc: "Share your space, budget and target ages. We reply within 24 hours." },
  { step: "02", title: "3D Design & Quote", desc: "Custom floor plan + photorealistic 3D render + itemised quote in 3-5 days." },
  { step: "03", title: "Manufacturing", desc: "In-house steel, foam, netting and vinyl fabrication with QC at every stage." },
  { step: "04", title: "Global Shipping", desc: "FOB / CIF / DDP to any port. All documents, HS codes and load photos provided." },
  { step: "05", title: "Installation Support", desc: "On-site engineer available; remote video guidance included for every project." },
];

export const adsLandingPages: Record<string, AdsLandingConfig> = {
  "indoor-playground-equipment": {
    slug: "indoor-playground-equipment",
    campaign: "indoor-playground",
    seoTitle: "Indoor Playground Equipment Manufacturer | Free 3D Quote",
    seoDescription: "Custom commercial indoor playground equipment from a certified factory. Free 3D design, 25-day production, ASTM & TUV. Get your quote in 24 hours.",
    h1: "Custom Indoor Playground Equipment Manufacturer",
    subhead: "Turnkey commercial indoor playground solutions for FECs, malls, schools and community centers. Direct from our 50,000㎡ factory in China.",
    heroBullets: [
      "Free 3D design & floor plan in 3-5 days",
      "ASTM · TUV · EN1176 · CE certified",
      "25-day production, worldwide shipping",
      "15+ years, 2,000+ projects in 50+ countries",
    ],
    projectTypes: [
      "Family Entertainment Center (FEC)",
      "Shopping Mall Play Area",
      "School / Kindergarten",
      "Community Center / Church",
      "Restaurant / Cafe Play Zone",
      "Hotel / Resort Kids Club",
      "Other",
    ],
    productLines: commonProductLines,
    whyUs: commonWhyUs,
    process: commonProcess,
    cases: [
      { country: "United States", flag: "🇺🇸", title: "1,200㎡ FEC in Texas", quote: "The 3D design saved us three months of back-and-forth with local architects. Kids traffic doubled in month one.", client: "Jason M., FEC Owner" },
      { country: "United Kingdom", flag: "🇬🇧", title: "800㎡ Mall Play Area, Manchester", quote: "TUV reports were accepted by the council without a single question. Install team was on-site within a week of arrival.", client: "Sarah L., Operations Director" },
      { country: "Canada", flag: "🇨🇦", title: "600㎡ Community Center, Toronto", quote: "Best pricing we found after quoting 6 suppliers. Quality exceeded a European brand we used previously.", client: "Marc D., Program Manager" },
    ],
    faqs: [
      { q: "What is the minimum order value for a custom indoor playground?", a: "There is no strict MOQ. Most projects range from USD 15,000 for a small 50㎡ toddler zone to USD 250,000+ for a full 1,000㎡ FEC. We quote per project after receiving your floor plan." },
      { q: "How long does production take?", a: "Standard lead time is 25 working days from deposit received. Rush production in 18 days is possible for a 10% surcharge subject to factory capacity." },
      { q: "What are your payment terms?", a: "30% deposit by T/T on order confirmation, 70% balance against B/L copy before shipping. L/C at sight accepted for orders above USD 50,000." },
      { q: "Do you provide certification for local permits?", a: "Yes. All structures comply with ASTM F1918, TUV, EN1176, CE and ISO9001. Full test reports and material certificates are included at no extra cost." },
      { q: "Can you install the equipment overseas?", a: "We can dispatch installation engineers to any country (client covers flights, visa, accommodation). 90% of clients use local installers with our detailed manual + free daily video-call guidance." },
      { q: "What is your warranty policy?", a: "3 years on steel structures, 1 year on soft components (padding, netting, vinyl). Lifetime supply of spare parts at cost price." },
    ],
  },
  "trampoline-park-equipment": {
    slug: "trampoline-park-equipment",
    campaign: "trampoline-park",
    seoTitle: "Trampoline Park Equipment Manufacturer | ASTM Certified",
    seoDescription: "Commercial trampoline park equipment direct from factory. ASTM F2970 compliant, free 3D design, 25-day production. Turnkey packages worldwide.",
    h1: "Commercial Trampoline Park Equipment Manufacturer",
    subhead: "Complete trampoline park solutions — jump courts, foam pits, dodgeball, wall runners, ninja lines and slam-dunk zones. Turnkey from design to install.",
    heroBullets: [
      "ASTM F2970 & EN 13219 compliant",
      "Free 3D park layout & business plan",
      "Olympic-grade jump beds, 3-year warranty",
      "500+ trampoline parks built worldwide",
    ],
    projectTypes: [
      "Standalone Trampoline Park",
      "Trampoline Zone in FEC",
      "School / University Facility",
      "Fitness Center Add-on",
      "Adventure / Ninja Park Combo",
      "Other",
    ],
    productLines: commonProductLines,
    whyUs: commonWhyUs,
    process: commonProcess,
    cases: [
      { country: "Australia", flag: "🇦🇺", title: "1,800㎡ Trampoline Park, Sydney", quote: "ASTM F2970 documentation was flawless. Our insurance underwriter approved us in a single review.", client: "David C., Park Owner" },
      { country: "UAE", flag: "🇦🇪", title: "2,400㎡ Mega Park, Dubai", quote: "Delivered on time despite Ramadan shipping delays. Installation team handled the entire fit-out in 18 days.", client: "Ahmed R., Managing Director" },
      { country: "Germany", flag: "🇩🇪", title: "1,000㎡ Family Trampoline Park", quote: "EN 13219 test reports matched exactly what TÜV auditors requested. Best supplier communication we experienced.", client: "Klaus H., Operations Manager" },
    ],
    faqs: [
      { q: "Is your trampoline park equipment ASTM F2970 certified?", a: "Yes. Every trampoline court is engineered to ASTM F2970 (USA) and EN 13219 (Europe). We provide test reports, load calculations and material certificates for permit and insurance approval." },
      { q: "What is a typical budget for a trampoline park?", a: "A 500㎡ park with basic jump courts starts around USD 45,000. A 1,500㎡ mixed-attraction park (foam pit, dodgeball, wall runners, ninja) is typically USD 120,000-180,000 ex-works." },
      { q: "What is the lead time?", a: "Design 3-5 days, production 25-30 days, ocean shipping 25-40 days depending on destination. Total project timeline is typically 12-16 weeks from contract to park opening." },
      { q: "Do you supply operations manuals and staff training?", a: "Yes. Every park receives operations manual, court-monitor training videos, waiver templates and marketing launch package in English." },
      { q: "Can you match a specific theme or brand color?", a: "Yes. All padding vinyl, wall graphics and steel powder-coating can be custom colored to match your brand. Standard color chart is free; custom Pantone matching adds 5-7 days." },
      { q: "What warranty do you offer?", a: "3 years on steel frames and springs, 1 year on jump beds and padding. Free replacement of any manufacturing defect within warranty period." },
    ],
  },
};

export const getAdsLandingConfig = (slug: string): AdsLandingConfig | undefined =>
  adsLandingPages[slug];
