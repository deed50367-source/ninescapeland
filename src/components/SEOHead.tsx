import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useParams, useLocation } from "react-router-dom";
import { languages } from "@/i18n/config";

interface SEOHeadProps {
  pageKey: string;
  dynamicTitle?: string;
  dynamicDescription?: string;
  dynamicKeywords?: string;
  ogImage?: string;
  noIndex?: boolean;
  ogType?: "website" | "article";
}

const baseUrl = "https://indoorplaygroundsolution.com";
const defaultOgImage = "/og-image.png";
const siteName = "NinescapeLand";

export const SEOHead = ({
  pageKey,
  dynamicTitle,
  dynamicDescription,
  dynamicKeywords,
  ogImage,
  noIndex = false,
  ogType = "website",
}: SEOHeadProps) => {
  const { t, i18n } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  // If no lang param, we're on English (default)
  const currentLang = lang || "en";
  
  const seo = t(`seo.${pageKey}`, { returnObjects: true }) as {
    title?: string;
    description?: string;
    keywords?: string;
  } | undefined;

  const title = dynamicTitle || seo?.title || t(`pages.${pageKey}.title`, "") + " " + t(`pages.${pageKey}.titleHighlight`, "") || siteName;
  const description = dynamicDescription || seo?.description || t(`pages.${pageKey}.description`, "");
  const keywords = dynamicKeywords || seo?.keywords || t("seo.defaultKeywords", "");

  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  
  // Generate proper canonical URL
  // English pages should use root path (no /en prefix)
  // Other languages should use their prefix
  const getCanonicalUrl = () => {
    const pathname = location.pathname.replace(/\/$/, "") || "/";
    
    if (currentLang === "en") {
      // For English, ensure we use root path without /en prefix
      // This handles both cases: already at root or accidentally at /en
      const pathWithoutEn = pathname.replace(/^\/en\/?/, "/").replace(/^\/en/, "");
      return `${baseUrl}${pathWithoutEn || "/"}`;
    }
    
    // For other languages, ensure the path has the correct language prefix
    if (pathname.startsWith(`/${currentLang}`)) {
      return `${baseUrl}${pathname}`;
    }
    
    // If somehow the path doesn't have the prefix, add it
    return `${baseUrl}/${currentLang}${pathname}`;
  };
  
  const canonicalUrl = getCanonicalUrl();
  const canonicalPath = location.pathname.replace(/\/$/, "");
  
  const langConfig = languages.find((l) => l.code === currentLang);
  const isRTL = langConfig?.rtl || false;

  // Generate alternate links - English uses root, others use prefix
  const getPathWithoutLang = () => {
    if (lang) {
      // Currently on a non-English route with prefix
      return canonicalPath.replace(/^\/[a-z]{2}/, "");
    }
    // Currently on English route (no prefix)
    return canonicalPath;
  };
  
  const pathWithoutLang = getPathWithoutLang();
  
  const alternateLinks = languages.map((l) => {
    if (l.code === "en") {
      // English uses root path
      return {
        hrefLang: l.code,
        href: `${baseUrl}${pathWithoutLang || "/"}`,
      };
    }
    // Other languages use prefix
    return {
      hrefLang: l.code,
      href: `${baseUrl}/${l.code}${pathWithoutLang}`,
    };
  });

  return (
    <Helmet>
      <html lang={currentLang} dir={isRTL ? "rtl" : "ltr"} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={siteName} />
      <link rel="canonical" href={canonicalUrl} />
      
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={`${baseUrl}${ogImage || defaultOgImage}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={currentLang} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@NinescapeLand" />
      <meta name="twitter:creator" content="@NinescapeLand" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${baseUrl}${ogImage || defaultOgImage}`} />
      <meta name="twitter:image:alt" content={fullTitle} />
      
      {/* Alternate language links */}
      {alternateLinks.map((link) => (
        <link key={link.hrefLang} rel="alternate" hrefLang={link.hrefLang} href={link.href} />
      ))}
      {/* x-default points to English (root) */}
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}${pathWithoutLang || "/"}`} />
    </Helmet>
  );
};
