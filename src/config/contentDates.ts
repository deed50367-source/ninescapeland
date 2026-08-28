/**
 * Real content-modification dates per route.
 *
 * These are the dates the page content was actually last revised in the
 * repository — NOT build timestamps. Used for schema `dateModified` and for
 * sitemap `lastmod`. When you meaningfully change a page's copy, update its
 * entry here. Routes without an entry fall back to SITE_CONTENT_UPDATED_AT
 * (the last site-wide content revision).
 */

export const SITE_CONTENT_UPDATED_AT = "2026-08-21";

/** Path (no language prefix, no trailing slash) → ISO date of last content revision. */
export const CONTENT_DATES: Record<string, string> = {
  "/": "2026-08-21",
  "/products": "2026-08-21",
  "/products/indoor-playground": "2026-08-21",
  "/products/trampoline-park": "2026-08-21",
  "/products/ninja-course": "2026-08-21",
  "/products/soft-play": "2026-08-21",
  "/about-us": "2026-07-30",
  "/contact": "2026-08-13",
  "/process": "2026-07-30",
  "/projects": "2026-07-30",
  "/blog": "2026-08-13",
  "/faq": "2026-08-21",
  "/safety-certifications": "2026-08-13",
  "/maintenance-warranty": "2026-07-23",
  "/case-studies": "2026-07-23",
  "/customer-testimonials": "2026-07-23",
  "/investment-opportunity": "2026-07-23",
  "/iaapa-asia-2026": "2026-08-06",
  "/privacy": "2026-08-13",
  "/terms": "2026-08-13",

  // Solution / vertical pages
  "/trampoline-park-fec-solutions": "2026-07-16",
  "/indoorplaygroundsolution-office-wellness-solutions": "2026-07-16",
  "/sensory-inclusive-play-solutions": "2026-07-16",
  "/soft-play-mall-solutions": "2026-07-16",
  "/gamified-attractions-manufacturer": "2026-07-16",
  "/active-play-running-solutions": "2026-07-16",

  // Weekly aggregation pages (batch 1)
  "/educational-benefits-of-indoor-play-centers": "2026-07-30",
  "/safety-standards-for-trampoline-park-equipment": "2026-08-13",
  "/custom-soft-play-equipment-manufacturer-for-schools": "2026-07-30",
  "/indoor-play-center-educational-activities-by-age": "2026-07-30",

  // Weekly aggregation pages (batch 2)
  "/how-to-create-active-learning-environment": "2026-08-06",
  "/kinesthetic-learning-equipment-benefits": "2026-08-06",
  "/designing-sensory-play-areas-for-education": "2026-08-06",
  "/indoor-trampoline-park-business-for-schools": "2026-08-06",
  "/montessori-indoor-playground-design": "2026-08-06",
  "/themed-indoor-playground-design": "2026-08-06",
  "/homeschool-coop-indoor-play": "2026-08-06",
  "/indoor-summer-camp-playground": "2026-08-06",
  "/indoor-pe-equipment-for-schools": "2026-08-06",
  "/custom-indoor-playground-cost": "2026-08-06",
  "/indoor-playground-roi-uk": "2026-07-23",
  "/indoor-playground-roi-canada": "2026-07-23",

  // Weekly aggregation pages (batch 3)
  "/hygienic-indoor-playground-for-infants": "2026-08-14",
  "/home-playroom-design-for-toddlers": "2026-08-14",
  "/safe-indoor-playground-equipment-for-small-spaces": "2026-08-14",
  "/accessible-indoor-playground-design-for-disabilities": "2026-08-14",

  // Weekly aggregation pages (batch 4)
  "/commercial-indoor-playground-flooring-and-mats": "2026-08-20",
  "/indoor-playground-business-plan": "2026-08-20",
  "/family-entertainment-center-business-plan": "2026-08-20",
  "/inclusive-play-center-design-for-children": "2026-08-28",
  "/preschool-playground-equipment-and-soft-play-design": "2026-08-28",
  "/tuv-certified-playground-equipment-supplier": "2026-08-28",
  "/safe-indoor-play-areas-for-6-year-olds": "2026-08-28",

  // Trust pages
  "/privacy-policy": "2026-08-13",
  "/terms-of-service": "2026-08-13",
};

/** Strip language prefix + trailing slash, then look up the real content date. */
export const getContentDate = (pathname: string): string => {
  const clean = pathname.replace(/^\/(en|es|pt|de|fr|ar)(?=\/|$)/, "").replace(/\/$/, "") || "/";
  return CONTENT_DATES[clean] || SITE_CONTENT_UPDATED_AT;
};
