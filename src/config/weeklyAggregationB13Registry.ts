export const B13_DATE = "2026-10-30";
export const B13_BASE_URL = "https://ninescapeland.lovable.app";
export const B13_LANGUAGES = ["en", "ar", "de", "es", "pt", "fr"] as const;
export type B13Language = typeof B13_LANGUAGES[number];

export const b13Pages = [
  { slug: "private-indoor-playground-party-room-design", labels: { en: "Private Party Room Design", ar: "تصميم غرف الحفلات الخاصة", de: "Private Partyräume planen", es: "Diseño de salas de fiestas privadas", pt: "Salas de festas privadas", fr: "Conception de salles de fêtes privées" }, parents: ["indoor-playground-cafe-business-model", "small-indoor-playground-business-on-a-budget", "indoor-playground-business-plan"] },
  { slug: "first-birthday-soft-play-equipment-for-venues", labels: { en: "First Birthday Event Equipment", ar: "معدات حفلات عيد الميلاد الأول", de: "Spielgeräte für den ersten Geburtstag", es: "Equipamiento para el primer cumpleaños", pt: "Equipamentos para o primeiro aniversário", fr: "Équipements pour le premier anniversaire" }, parents: ["toddler-soft-play-area-design", "hygienic-indoor-playground-for-infants", "soft-play-foam-and-material-specifications"] },
  { slug: "commercial-indoor-playground-tunnels-and-tubes", labels: { en: "Commercial Play Tunnels & Tubes", ar: "أنفاق اللعب التجارية", de: "Kommerzielle Spieltunnel und Röhren", es: "Túneles y tubos de juego comerciales", pt: "Túneis e tubos de recreação comerciais", fr: "Tunnels et tubes de jeux commerciaux" }, parents: ["how-indoor-playgrounds-improve-child-coordination", "soft-play-foam-and-material-specifications", "cooperative-play-equipment-for-schools"] },
  { slug: "vacant-mall-unit-indoor-playground-conversion", labels: { en: "Vacant Mall Unit Conversion", ar: "تحويل المحلات الشاغرة إلى مناطق لعب", de: "Leere Ladenflächen in Spielbereiche umwandeln", es: "Conversión de locales comerciales vacíos", pt: "Conversão de lojas vagas em áreas de lazer", fr: "Conversion de locaux commerciaux vacants" }, parents: ["soft-play-equipment-shopping-mall-solutions", "indoor-playground-equipment-indonesia", "small-indoor-playground-business-on-a-budget"] },
  { slug: "hotel-resort-indoor-play-amenity-design", labels: { en: "Hotel & Resort Play Amenities", ar: "مناطق اللعب في الفنادق والمنتجعات", de: "Spielbereiche für Hotels und Resorts", es: "Áreas de juego en hoteles y resorts", pt: "Áreas de lazer para hotéis e resorts", fr: "Espaces de jeux pour hôtels et complexes" }, parents: ["complete-indoor-play-center-solutions", "indoor-playground-cafe-business-model", "toddler-soft-play-area-design"] },
] as const;

export function b13Language(pathname: string): B13Language {
  const prefix = pathname.split("/")[1];
  return B13_LANGUAGES.find(language => language === prefix) ?? "en";
}

export function b13Path(slug: string, language: B13Language): string {
  return `${language === "en" ? "" : `/${language}`}/${slug}`;
}

export function b13InboundLinks(slug: string) {
  return b13Pages.filter(page => (page.parents as readonly string[]).includes(slug));
}

export function b13Metadata(title: string, description: string) {
  return { title: title.trim().slice(0, 59).trim(), description: description.trim().slice(0, 159).trim() };
}