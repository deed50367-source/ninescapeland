import { useTranslation } from "react-i18next";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Globe } from "lucide-react";
import { languages } from "@/i18n/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { lang } = useParams<{ lang: string }>();
  
  const currentLang = languages.find((l) => l.code === (lang || i18n.language)) || languages[0];

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    const langConfig = languages.find((l) => l.code === code);
    document.documentElement.dir = langConfig?.rtl ? "rtl" : "ltr";
    document.documentElement.lang = code;
    
    // Update URL with new language prefix
    const currentPath = location.pathname;
    const pathWithoutLang = currentPath.replace(/^\/[a-z]{2}(\/|$)/, "/");
    const newPath = `/${code}${pathWithoutLang === "/" ? "" : pathWithoutLang}`;
    navigate(newPath + location.search + location.hash);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Globe className="w-4 h-4" />
          <span className="hidden sm:inline">{currentLang.flag} {currentLang.name}</span>
          <span className="sm:hidden">{currentLang.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((langItem) => (
          <DropdownMenuItem
            key={langItem.code}
            onClick={() => changeLanguage(langItem.code)}
            className={currentLang.code === langItem.code ? "bg-muted" : ""}
          >
            <span className="mr-2">{langItem.flag}</span>
            {langItem.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
