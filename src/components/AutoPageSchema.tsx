import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { getContentDate } from "@/config/contentDates";

const SITE_URL = "https://indoorplaygroundsolution.com";
const LOGO_URL = `${SITE_URL}/favicon.png`;

const LANG_PREFIX = /^(en|es|pt|de|fr|ar)$/;

const humanize = (segment: string) =>
  segment
    .split("-")
    .map((w) => (w.length <= 3 ? w.toUpperCase() === w ? w : w.charAt(0).toUpperCase() + w.slice(1) : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ");

interface AutoPageSchemaProps {
  /** Page title used for WebPage / Service name */
  name: string;
  description: string;
  canonicalUrl: string;
  lang: string;
  /** Explicit last content modification date (ISO). Falls back to the route's real content date. */
  dateModified?: string;
  /** Emit a Service entity. Disable on contact/404/utility pages. */
  service?: boolean;
  /** Localized label for the site root breadcrumb */
  homeLabel?: string;
}

/**
 * Emitted from SEOHead so EVERY route (all languages included) ships:
 *  - BreadcrumbList derived from the URL path
 *  - WebPage with a real dateModified
 *  - Service entity tied to the manufacturer Organization
 *
 * GAS audit found these missing on non-English routes and /market/ pages.
 */
export const AutoPageSchema = ({
  name,
  description,
  canonicalUrl,
  lang,
  dateModified,
  service = true,
  homeLabel = "Home",
}: AutoPageSchemaProps) => {
  const location = useLocation();
  const modified = dateModified || getContentDate(location.pathname);

  const segments = location.pathname.split("/").filter(Boolean);
  const langSegment = segments[0] && LANG_PREFIX.test(segments[0]) ? segments[0] : null;
  const pathSegments = langSegment ? segments.slice(1) : segments;
  const rootUrl = langSegment && langSegment !== "en" ? `${SITE_URL}/${langSegment}` : SITE_URL;

  const crumbs = [{ name: homeLabel, url: `${rootUrl}/` }];
  let accumulated = rootUrl;
  pathSegments.forEach((segment) => {
    accumulated += `/${segment}`;
    crumbs.push({ name: humanize(segment), url: accumulated });
  });

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl}#breadcrumb`,
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name,
    description,
    inLanguage: lang,
    dateModified: modified,
    datePublished: modified,
    isPartOf: { "@type": "WebSite", "@id": `${SITE_URL}/#website`, name: "NinescapeLand", url: SITE_URL },
    publisher: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "NinescapeLand" },
    // Author entity on EVERY route (GAS audit found /es/ and /market/ pages with no person entity)
    author: {
      "@type": "Person",
      "@id": `${SITE_URL}/#gerry`,
      name: "Gerry",
      jobTitle: "Senior Indoor Playground Designer",
      worksFor: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "NinescapeLand" },
      knowsAbout: [
        "Commercial indoor playground design",
        "Trampoline park engineering",
        "ASTM F1487 and EN 1176 compliance",
      ],
    },
    reviewedBy: { "@id": `${SITE_URL}/#gerry` },
    breadcrumb: { "@id": `${canonicalUrl}#breadcrumb` },
    primaryImageOfPage: { "@type": "ImageObject", url: LOGO_URL },
  };


  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonicalUrl}#service`,
    name,
    description,
    serviceType: "Custom commercial indoor playground equipment design, manufacturing and installation",
    provider: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "NinescapeLand",
      url: SITE_URL,
      logo: LOGO_URL,
      foundingDate: "2008",
      sameAs: [
        "https://www.facebook.com/ninescapeland",
        "https://www.youtube.com/@ninescapeland",
        "https://www.linkedin.com/company/ninescapeland",
        "https://www.instagram.com/ninescapeland",
      ],
    },
    areaServed: { "@type": "Place", name: "Worldwide" },
    availableLanguage: ["English", "Spanish", "Portuguese", "German", "French", "Arabic", "Chinese"],
    url: canonicalUrl,
    dateModified: modified,
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
      <script type="application/ld+json">{JSON.stringify(webPage)}</script>
      {service && <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>}
    </Helmet>
  );
};
