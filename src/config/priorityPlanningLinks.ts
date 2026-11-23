export const priorityPlanningPaths = [
  '/blog/autism-friendly-indoor-playground-equipment',
  '/active-play-curriculum-for-indoor-play-centers',
  '/astm-certified-commercial-trampoline-park-supplier',
  '/church-indoor-playground-equipment',
  '/commercial-indoor-playground-equipment-for-sale',
  '/commercial-indoor-playground-profit-margin',
  '/commercial-indoor-playground-tunnels-and-tubes',
] as const;

const labels: Record<string, readonly string[]> = {
  en: ['Sensory-friendly equipment guide', 'Active play curriculum', 'Trampoline supplier documentation', 'Church play equipment', 'New and used equipment purchasing', 'Play center profit planning', 'Commercial play tunnels and tubes'],
  ar: ['دليل المعدات الملائمة للحواس', 'منهج اللعب النشط', 'وثائق مورد معدات الترامبولين', 'معدات ملاعب الكنائس', 'شراء المعدات الجديدة والمستعملة', 'تخطيط أرباح مركز اللعب', 'أنفاق وأنابيب اللعب التجارية'],
  de: ['Leitfaden für sensorisch freundliche Geräte', 'Lehrplan für aktives Spielen', 'Dokumentation von Trampolinlieferanten', 'Spielgeräte für Kirchen', 'Neue und gebrauchte Geräte kaufen', 'Gewinnplanung für Spielzentren', 'Gewerbliche Spieltunnel und Röhren'],
  es: ['Guía de equipos adaptados a necesidades sensoriales', 'Programa de juego activo', 'Documentación de proveedores de trampolines', 'Equipos de juego para iglesias', 'Compra de equipos nuevos y usados', 'Planificación de beneficios del centro de juego', 'Túneles y tubos de juego comerciales'],
  pt: ['Guia de equipamentos sensorialmente inclusivos', 'Programa de brincadeiras ativas', 'Documentação de fornecedores de trampolins', 'Equipamentos de recreação para igrejas', 'Compra de equipamentos novos e usados', 'Planejamento de lucro do centro de recreação', 'Túneis e tubos de recreação comerciais'],
  fr: ['Guide des équipements adaptés aux besoins sensoriels', 'Programme de jeu actif', 'Documentation des fournisseurs de trampolines', 'Équipements de jeu pour les églises', 'Achat d’équipements neufs et d’occasion', 'Planification des bénéfices du centre de jeux', 'Tunnels et tubes de jeu commerciaux'],
};

export function priorityPlanningLinks(language: string) {
  const names = labels[language] ?? labels.en;
  return priorityPlanningPaths.map((path, index) => ({ path, label: names[index] }));
}