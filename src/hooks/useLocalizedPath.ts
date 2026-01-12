import { useParams } from "react-router-dom";

export const useLocalizedPath = () => {
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang || "en";
  
  const localizedPath = (path: string) => {
    // Handle hash links
    if (path.startsWith("#")) {
      return path;
    }
    // Handle external links
    if (path.startsWith("http") || path.startsWith("mailto:") || path.startsWith("tel:")) {
      return path;
    }
    // Remove leading slash for consistency
    const cleanPath = path.startsWith("/") ? path.slice(1) : path;
    return `/${currentLang}/${cleanPath}`.replace(/\/+$/, "") || `/${currentLang}`;
  };

  return { localizedPath, currentLang };
};
