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
}: SEOHeadProps) => {
  const { t, i18n } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  const currentLang = lang || i18n.language || "en";
  
  const seo = t(`seo.${pageKey}`, { returnObjects: true }) as {
    title?: string;
    description?: string;
    keywords?: string;
  } | undefined;

  const title = dynamicTitle || seo?.title || t(`pages.${pageKey}.title`, "") + " " + t(`pages.${pageKey}.titleHighlight`, "") || siteName;
  const description = dynamicDescription || seo?.description || t(`pages.${pageKey}.description`, "");
  const keywords = dynamicKeywords || seo?.keywords || t("seo.defaultKeywords", "");

  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  const canonicalPath = location.pathname.replace(/\/$/, "");
  const canonicalUrl = `${baseUrl}${canonicalPath}`;
  
  const langConfig = languages.find((l) => l.code === currentLang);
  const isRTL = langConfig?.rtl || false;

  const alternateLinks = languages.map((l) => {
    const pathWithoutLang = canonicalPath.replace(/^\/[a-z]{2}/, "");
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
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={`${baseUrl}${ogImage || defaultOgImage}`} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={currentLang} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@NinescapeLand" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${baseUrl}${ogImage || defaultOgImage}`} />
      
      {/* Alternate language links */}
      {alternateLinks.map((link) => (
        <link key={link.hrefLang} rel="alternate" hrefLang={link.hrefLang} href={link.href} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/en${canonicalPath.replace(/^\/[a-z]{2}/, "")}`} />
    </Helmet>
  );
};
