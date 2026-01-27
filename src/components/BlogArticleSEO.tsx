import { Helmet } from "react-helmet-async";
import { useParams, useLocation } from "react-router-dom";
import { languages } from "@/i18n/config";

interface BlogArticleSEOProps {
  title: string;
  description?: string;
  keywords?: string;
  image?: string;
  publishedAt?: string;
  modifiedAt?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

const baseUrl = "https://indoorplaygroundsolution.com";
const siteName = "NinescapeLand";
const twitterHandle = "@NinescapeLand";

export const BlogArticleSEO = ({
  title,
  description = "",
  keywords,
  image,
  publishedAt,
  modifiedAt,
  author = "NinescapeLand Team",
  section = "Blog",
  tags = []
}: BlogArticleSEOProps) => {
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  const currentLang = lang || "en";

  // Generate proper canonical URL
  // English pages should use root path (no /en prefix)
  // Other languages should use their prefix
  const getCanonicalUrl = () => {
    const pathname = location.pathname.replace(/\/$/, "") || "/";
    
    if (currentLang === "en") {
      // For English, ensure we use root path without /en prefix
      const pathWithoutEn = pathname.replace(/^\/en\/?/, "/").replace(/^\/en/, "");
      return `${baseUrl}${pathWithoutEn || "/"}`;
    }
    
    // For other languages, ensure the path has the correct language prefix
    if (pathname.startsWith(`/${currentLang}`)) {
      return `${baseUrl}${pathname}`;
    }
    
    return `${baseUrl}/${currentLang}${pathname}`;
  };
  
  const canonicalUrl = getCanonicalUrl();
  const canonicalPath = location.pathname.replace(/\/$/, "");
  
  const fullTitle = `${title} | ${siteName}`;
  const ogImage = image || `${baseUrl}/og-image.png`;

  // Generate alternate links for all languages
  const getPathWithoutLang = () => {
    if (lang) {
      return canonicalPath.replace(/^\/[a-z]{2}/, "");
    }
    return canonicalPath;
  };
  
  const pathWithoutLang = getPathWithoutLang();
  
  const alternateLinks = languages.map((l) => {
    if (l.code === "en") {
      return {
        hrefLang: l.code,
        href: `${baseUrl}${pathWithoutLang || "/"}`,
      };
    }
    return {
      hrefLang: l.code,
      href: `${baseUrl}/${l.code}${pathWithoutLang}`,
    };
  });

  const langConfig = languages.find((l) => l.code === currentLang);
  const isRTL = langConfig?.rtl || false;

  return (
    <Helmet>
      <html lang={currentLang} dir={isRTL ? "rtl" : "ltr"} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={author} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph - Article specific */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={currentLang} />
      
      {/* Article specific Open Graph */}
      {publishedAt && <meta property="article:published_time" content={publishedAt} />}
      {modifiedAt && <meta property="article:modified_time" content={modifiedAt} />}
      <meta property="article:author" content={author} />
      <meta property="article:section" content={section} />
      {tags.map((tag, index) => (
        <meta key={index} property="article:tag" content={tag} />
      ))}
      
      {/* Twitter Card - Large Image */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={title} />
      
      {/* Additional social optimization */}
      <meta property="og:image:type" content="image/jpeg" />
      <meta name="twitter:label1" content="Written by" />
      <meta name="twitter:data1" content={author} />
      {publishedAt && (
        <>
          <meta name="twitter:label2" content="Published" />
          <meta name="twitter:data2" content={new Date(publishedAt).toLocaleDateString()} />
        </>
      )}
      
      {/* Alternate language links */}
      {alternateLinks.map((link) => (
        <link key={link.hrefLang} rel="alternate" hrefLang={link.hrefLang} href={link.href} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}${pathWithoutLang || "/"}`} />
    </Helmet>
  );
};
