export const weeklyBlogSlugs = ["indoor-playground-ceiling-height", "playground-replacement-parts", "indoor-playground-cleaning", "playground-inspection-checklist", "indoor-playground-insurance-cost"] as const;
export const weeklyBlogParents: Record<string, readonly string[]> = {
  "indoor-playground-ceiling-height": ["vacant-mall-unit-indoor-playground-conversion", "custom-indoor-playground-cost-free-3d-design"],
  "playground-replacement-parts": ["soft-play-foam-and-material-specifications", "commercial-indoor-playground-tunnels-and-tubes"],
  "indoor-playground-cleaning": ["indoor-playground-maintenance-and-cleaning-guide", "first-birthday-soft-play-equipment-for-venues", "hotel-resort-indoor-play-amenity-design"],
  "playground-inspection-checklist": ["indoor-playground-maintenance-and-cleaning-guide", "commercial-indoor-playground-tunnels-and-tubes"],
  "indoor-playground-insurance-cost": ["private-indoor-playground-party-room-design", "small-indoor-playground-business-on-a-budget"],
};

export function weeklyBlogInbound(slug: string) {
  return weeklyBlogSlugs.filter(blog => weeklyBlogParents[blog]?.includes(slug));
}

export function boundedBlogMetadata(title: string, description: string) {
  return { title: title.trim().slice(0, 59).trim(), description: description.trim().slice(0, 159).trim() };
}