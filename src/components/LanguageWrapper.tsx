import { useEffect, useState, Suspense } from "react";
import { useParams, useNavigate, useLocation, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { languages } from "@/i18n/config";
import PageLoader from "@/components/PageLoader";

const baseUrl = "https://indoorplaygroundsolution.com";

const supportedLangs = languages.map((l) => l.code) as readonly string[];
const nonEnglishLangs = supportedLangs.filter((l) => l !== "en");

interface LanguageWrapperProps {
  defaultLang?: string;
}

export const LanguageWrapper = ({ defaultLang }: LanguageWrapperProps) => {
  const { lang } = useParams<{ lang: string }>();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLanguageReady, setIsLanguageReady] = useState(false);

  // Determine current language: use defaultLang for root routes, otherwise use URL param
  const currentLang = defaultLang || lang;

  // Load language bundle on mount/change
  useEffect(() => {
    const loadLanguage = async () => {
      if (currentLang && supportedLangs.includes(currentLang)) {
        setIsLanguageReady(false);
        
        // Only change language if different
        if (i18n.language !== currentLang) {
          await i18n.changeLanguage(currentLang);
        }
        
        // Ensure the language bundle is loaded
        if (!i18n.hasResourceBundle(currentLang, 'translation')) {
          await i18n.loadLanguages(currentLang);
        }
        
        const langConfig = languages.find((l) => l.code === currentLang);
        document.documentElement.dir = langConfig?.rtl ? "rtl" : "ltr";
        document.documentElement.lang = currentLang;
        
        setIsLanguageReady(true);
      } else {
        setIsLanguageReady(true);
      }
    };

    loadLanguage();
  }, [currentLang, i18n]);

  // For non-default routes, validate the lang param
  useEffect(() => {
    if (!defaultLang && lang) {
      // If lang param is "en", redirect to root (English uses no prefix)
      if (lang === "en") {
        const restPath = location.pathname.replace(/^\/en\/?/, "/");
        navigate(restPath + location.search + location.hash, { replace: true });
        return;
      }
      
      // If lang param is not a valid non-English language, it might be a path segment
      if (!nonEnglishLangs.includes(lang)) {
        // This is not a valid language prefix, let it fall through to 404
        return;
      }
    }
  }, [defaultLang, lang, location, navigate]);

  // Guard against malformed URLs that accidentally include route params
  useEffect(() => {
    if (!currentLang || !supportedLangs.includes(currentLang)) return;

    const parts = location.pathname.split("/").filter(Boolean);
    
    // For non-English routes, check for malformed params
    if (!defaultLang && lang) {
      const restParts = parts.slice(1);
      const cleanedRestParts = restParts.filter((p) => !p.startsWith(":"));

      if (cleanedRestParts.length !== restParts.length) {
        const cleanedPath = `/${lang}${cleanedRestParts.length ? `/${cleanedRestParts.join("/")}` : ""}${location.search}${location.hash}`;
        navigate(cleanedPath, { replace: true });
      }
    }
  }, [currentLang, defaultLang, lang, location, navigate]);

  // For non-default language routes, validate the lang param
  if (!defaultLang && lang && !nonEnglishLangs.includes(lang)) {
    return null; // Will be handled by 404 or redirect
  }

  // Show loader while language bundle is loading
  if (!isLanguageReady) {
    return <PageLoader />;
  }

  // Build hreflang alternate links from current path
  const getPathWithoutLang = () => {
    const pathname = location.pathname.replace(/\/$/, "") || "/";
    if (!defaultLang && lang) {
      return pathname.replace(/^\/[a-z]{2}/, "") || "/";
    }
    return pathname;
  };

  const pathWithoutLang = getPathWithoutLang();

  const alternateLinks = languages.map((l) => ({
    hrefLang: l.code,
    href: l.code === "en"
      ? `${baseUrl}${pathWithoutLang}`
      : `${baseUrl}/${l.code}${pathWithoutLang === "/" ? "" : pathWithoutLang}`,
  }));

  return (
    <>
      <Helmet>
        {alternateLinks.map((link) => (
          <link key={link.hrefLang} rel="alternate" hrefLang={link.hrefLang} href={link.href} />
        ))}
        <link rel="alternate" hrefLang="x-default" href={`${baseUrl}${pathWithoutLang}`} />
      </Helmet>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </>
  );
};
