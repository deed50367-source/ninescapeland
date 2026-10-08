export interface NavigationItem { label: string; href: string }
const copy = {
 en: ['Core products','Education & design','Business & support','Featured solutions','Explore all products','Custom multi-level play structures','Jumping zones and active attractions','Climbing, balance and obstacle challenges','Soft play for toddlers and young children'],
 es: ['Productos principales','Educación y diseño','Negocio y soporte','Soluciones destacadas','Ver todos los productos','Estructuras de juego multinivel a medida','Zonas de salto y atracciones activas','Retos de escalada, equilibrio y obstáculos','Juego blando para niños pequeños'],
 pt: ['Produtos principais','Educação e design','Negócios e suporte','Soluções em destaque','Ver todos os produtos','Estruturas de diversão multinível personalizadas','Zonas de salto e atrações ativas','Desafios de escalada, equilíbrio e obstáculos','Diversão macia para crianças pequenas'],
 de: ['Hauptprodukte','Bildung & Design','Planung & Service','Ausgewählte Lösungen','Alle Produkte entdecken','Individuelle mehrstöckige Spielstrukturen','Sprungbereiche und aktive Attraktionen','Kletter-, Balance- und Hindernisparcours','Softplay für Kleinkinder und junge Kinder'],
 fr: ['Produits principaux','Éducation et conception','Projets et assistance','Solutions à découvrir','Voir tous les produits','Structures de jeux multiniveaux sur mesure','Zones de saut et attractions actives','Défis d’escalade, d’équilibre et d’obstacles','Jeux souples pour les jeunes enfants'],
 ar: ['المنتجات الرئيسية','التعليم والتصميم','الأعمال والدعم','حلول مميزة','استعرض جميع المنتجات','هياكل لعب متعددة المستويات حسب الطلب','مناطق القفز والألعاب الحركية','تحديات التسلق والتوازن ومسارات العوائق','ألعاب ناعمة للأطفال الصغار'],
};
export function navigationCopy(language: string) { return copy[language.split('-')[0] as keyof typeof copy] || copy.en; }
export function navigationGroups(items: NavigationItem[]) {
 const education: NavigationItem[] = [], support: NavigationItem[] = [];
 items.slice(4).forEach(item => {
  if (/cost|price|profit|business|fund|certif|astm|tuv|safety|installation|maintenance|ownership|builder|complete|free-3d/i.test(item.href)) support.push(item);
  else education.push(item);
 });
 return [items.slice(0, 4), education, support];
}
