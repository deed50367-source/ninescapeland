import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

// Only import English as fallback - other languages loaded on demand
import en from "./locales/en.json";

export const languages = [
  { code: "en", name: "English", flag: "🇬🇧", rtl: false },
  { code: "es", name: "Español", flag: "🇪🇸", rtl: false },
  { code: "pt", name: "Português", flag: "🇧🇷", rtl: false },
  { code: "de", name: "Deutsch", flag: "🇩🇪", rtl: false },
  { code: "fr", name: "Français", flag: "🇫🇷", rtl: false },
  { code: "ar", name: "العربية", flag: "🇸🇦", rtl: true },
] as const;

// Get detected language from URL path or localStorage
const getInitialLanguage = (): string => {
  // Check URL path first (e.g., /ar/, /es/, /de/, /pt/)
  const pathMatch = window.location.pathname.match(/^\/(ar|es|de|pt|fr)(\/|$)/);
  if (pathMatch) {
    return pathMatch[1];
  }
  
  // Then check localStorage
  const stored = localStorage.getItem("i18nextLng");
  if (stored && languages.some(l => l.code === stored)) {
    return stored;
  }
  
  // Default to English
  return "en";
};

const initialLanguage = getInitialLanguage();

// Pre-load English as fallback bundle (always needed)
const initialResources: Record<string, { translation: typeof en }> = {
  en: { translation: en },
};

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: initialResources,
    partialBundledLanguages: true, // Allow mixing bundled + lazy-loaded
    lng: initialLanguage,
    fallbackLng: "en",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["path", "localStorage", "navigator"],
      lookupFromPathIndex: 0,
      caches: ["localStorage"],
    },
    backend: {
      // Load language files from public folder
      loadPath: "/locales/{{lng}}.json",
    },
    react: {
      useSuspense: true, // Enable suspense for better loading UX
    },
    load: "currentOnly", // Only load current language, not all variations
  });

// Preload current language if not English (for faster initial render)
if (initialLanguage !== "en") {
  i18n.loadLanguages(initialLanguage);
}

export default i18n;
