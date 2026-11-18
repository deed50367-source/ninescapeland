export const november18BlogSlugs = [
  "indoor-playground-air-quality",
  "soft-play-disinfectant-compatibility",
  "indoor-playground-quiet-hours",
  "playground-supervision-checklist",
  "church-playground-volunteer-training",
] as const;

export const november18BlogParents: Record<string, readonly string[]> = {
  "indoor-playground-air-quality": ["indoor-playground-maintenance-and-cleaning-guide"],
  "soft-play-disinfectant-compatibility": ["soft-play-foam-and-material-specifications"],
  "indoor-playground-quiet-hours": ["sensory-inclusive-play-equipment"],
  "playground-supervision-checklist": ["daycare-indoor-playground-equipment"],
  "church-playground-volunteer-training": ["church-indoor-playground-equipment"],
};

export function november18BlogInbound(parent: string) {
  return november18BlogSlugs.filter(slug => november18BlogParents[slug]?.includes(parent));
}

export function november18BlogAuthor(slug: string | undefined): string | undefined {
  return november18BlogSlugs.some(item => item === slug) ? "Gerry" : undefined;
}