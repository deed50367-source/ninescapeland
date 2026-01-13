import { useEffect } from "react";
import { useParams, useNavigate, useLocation, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { languages } from "@/i18n/config";

const supportedLangs = languages.map((l) => l.code) as readonly string[];

export const LanguageWrapper = () => {
  const { lang } = useParams<{ lang: string }>();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (lang && supportedLangs.includes(lang)) {
      if (i18n.language !== lang) {
        i18n.changeLanguage(lang);
      }
      const langConfig = languages.find((l) => l.code === lang);
      document.documentElement.dir = langConfig?.rtl ? "rtl" : "ltr";
      document.documentElement.lang = lang;
    }
  }, [lang, i18n]);

  // Guard against malformed URLs that accidentally include route params (e.g. "/en/:lang/admin-login")
  useEffect(() => {
    if (!lang || !supportedLangs.includes(lang)) return;

    const parts = location.pathname.split("/").filter(Boolean);
    const restParts = parts.slice(1);
    const cleanedRestParts = restParts.filter((p) => !p.startsWith(":"));

    if (cleanedRestParts.length !== restParts.length) {
      const cleanedPath = `/${lang}${cleanedRestParts.length ? `/${cleanedRestParts.join("/")}` : ""}${location.search}${location.hash}`;
      navigate(cleanedPath, { replace: true });
    }
  }, [lang, location.hash, location.pathname, location.search, navigate]);

  // If no valid lang, redirect to default language
  useEffect(() => {
    if (!lang || !supportedLangs.includes(lang)) {
      const detectedLang = i18n.language?.split("-")[0] || "en";
      const targetLang = supportedLangs.includes(detectedLang) ? detectedLang : "en";

      // Strip the (invalid) first path segment and replace it with targetLang.
      // Example: "/:lang/admin-login" -> "/en/admin-login"
      const parts = location.pathname.split("/").filter(Boolean);
      const rest = parts.length > 0 ? `/${parts.slice(1).join("/")}` : "";
      const newPath = `/${targetLang}${rest}${location.search}${location.hash}`;

      navigate(newPath, { replace: true });
    }
  }, [lang, i18n.language, location, navigate]);

  if (!lang || !supportedLangs.includes(lang)) {
    return null; // Will redirect
  }

  return <Outlet />;
};
