import { boundedSiteMetadata } from "@/lib/seoMetadata";
export const B14_DATE = "2026-11-03";
export const B14_BASE_URL = "https://indoorplaygroundsolution.com";
export const B14_LANGUAGES = ["en", "ar", "de", "es", "pt", "fr"] as const;
export type B14Language = typeof B14_LANGUAGES[number];
export const b14Pages = [
  {
    "slug": "commercial-indoor-playground-slide-selection",
    "labels": {
      "en": "Commercial Slide Selection",
      "ar": "اختيار الزلاقات التجارية",
      "de": "Gewerbliche Rutschen auswählen",
      "es": "Selección de toboganes comerciales",
      "pt": "Seleção de escorregadores comerciais",
      "fr": "Choix des toboggans commerciaux"
    },
    "parents": [
      "products/indoor-playground",
      "commercial-indoor-playground-tunnels-and-tubes"
    ]
  },
  {
    "slug": "commercial-indoor-playground-netting",
    "labels": {
      "en": "Playground Netting",
      "ar": "شبكات الملاعب",
      "de": "Spielplatznetze",
      "es": "Redes para parques infantiles",
      "pt": "Redes para playgrounds",
      "fr": "Filets pour aires de jeux"
    },
    "parents": [
      "products/indoor-playground",
      "soft-play-foam-and-material-specifications"
    ]
  },
  {
    "slug": "indoor-playground-equipment-import-shipping-terms",
    "labels": {
      "en": "Import & Shipping Terms",
      "ar": "شروط الاستيراد والشحن",
      "de": "Import- und Lieferbedingungen",
      "es": "Condiciones de importación y envío",
      "pt": "Termos de importação e transporte",
      "fr": "Conditions d’importation et livraison"
    },
    "parents": [
      "process",
      "indoor-playground-equipment-indonesia"
    ]
  },
  {
    "slug": "indoor-playground-factory-acceptance-checklist",
    "labels": {
      "en": "Factory Acceptance Checklist",
      "ar": "قائمة قبول المصنع",
      "de": "Werksabnahme-Checkliste",
      "es": "Lista de aceptación en fábrica",
      "pt": "Lista de aceitação na fábrica",
      "fr": "Contrôle de réception en usine"
    },
    "parents": [
      "process",
      "custom-playground-manufacturer-certification-checklist"
    ]
  },
  {
    "slug": "multi-site-indoor-playground-equipment-procurement",
    "labels": {
      "en": "Multi-Site Procurement",
      "ar": "مشتريات المواقع المتعددة",
      "de": "Beschaffung für mehrere Standorte",
      "es": "Compras para múltiples sedes",
      "pt": "Compras para várias unidades",
      "fr": "Achats pour plusieurs sites"
    },
    "parents": [
      "complete-indoor-play-center-solutions",
      "indoor-playground-franchise-vs-independent"
    ]
  }
] as const;
export function b14Language(pathname: string): B14Language {
  return B14_LANGUAGES.find(language => language === pathname.split("/")[1]) ?? "en";
}
export function b14Path(slug: string, language: B14Language): string {
  return `${language === "en" ? "" : `/${language}`}/${slug}`;
}
export function b14InboundLinks(slug: string) {
  return b14Pages.filter(page => (page.parents as readonly string[]).includes(slug));
}
export const b14Metadata = boundedSiteMetadata;
