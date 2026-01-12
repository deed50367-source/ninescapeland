import { useTranslation } from "react-i18next";
import { languages } from "@/i18n/config";

export const useRTL = () => {
  const { i18n } = useTranslation();
  
  const currentLang = languages.find((l) => l.code === i18n.language);
  const isRTL = currentLang?.rtl ?? false;
  const dir = isRTL ? "rtl" : "ltr";
  
  // Flip direction-based values for RTL
  const flipX = (ltrValue: number) => isRTL ? -ltrValue : ltrValue;
  
  // Get text alignment based on RTL
  const textAlign = isRTL ? "right" : "left";
  const textAlignEnd = isRTL ? "left" : "right";
  
  // Get flex direction
  const flexRow = isRTL ? "flex-row-reverse" : "flex-row";
  
  // Get margin/padding direction
  const marginStart = isRTL ? "mr" : "ml";
  const marginEnd = isRTL ? "ml" : "mr";
  const paddingStart = isRTL ? "pr" : "pl";
  const paddingEnd = isRTL ? "pl" : "pr";
  
  // Get border direction
  const borderStart = isRTL ? "border-r" : "border-l";
  const borderEnd = isRTL ? "border-l" : "border-r";
  
  // Get position direction
  const start = isRTL ? "right" : "left";
  const end = isRTL ? "left" : "right";
  
  return {
    isRTL,
    dir,
    flipX,
    textAlign,
    textAlignEnd,
    flexRow,
    marginStart,
    marginEnd,
    paddingStart,
    paddingEnd,
    borderStart,
    borderEnd,
    start,
    end,
  };
};
