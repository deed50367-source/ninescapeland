export const november11BlogSlugs = [
  "indoor-playground-party-room-turnover",
  "ninja-birthday-party",
  "indoor-playground-theme-design-brief",
  "loose-parts-play-equipment",
  "indoor-playground-project-scope",
] as const;

export const november11BlogParents: Record<string, readonly string[]> = {
  "indoor-playground-party-room-turnover": ["private-indoor-playground-party-room-design"],
  "ninja-birthday-party": ["ninja-warrior-course-for-kids-indoor-playground"],
  "indoor-playground-theme-design-brief": ["themed-indoor-playground-design"],
  "loose-parts-play-equipment": ["modular-reconfigurable-indoor-play-equipment"],
  "indoor-playground-project-scope": ["complete-indoor-play-center-solutions"],
};

export function november11BlogInbound(parent: string) {
  return november11BlogSlugs.filter(slug => november11BlogParents[slug]?.includes(parent));
}

export function november11BlogAuthor(slug: string | undefined): string | undefined {
  return november11BlogSlugs.some(item => item === slug) ? "Gerry" : undefined;
}