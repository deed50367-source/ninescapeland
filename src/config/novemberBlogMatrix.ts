export const novemberBlogSlugs = [
  "indoor-playground-slide-clearance",
  "playground-netting-inspection",
  "indoor-playground-shipping-documents",
  "indoor-playground-pre-shipment-inspection",
  "indoor-playground-equipment-standardization",
] as const;

export const novemberBlogParents: Record<string, readonly string[]> = {
  "indoor-playground-slide-clearance": ["commercial-indoor-playground-slide-selection", "blog/indoor-playground-ceiling-height"],
  "playground-netting-inspection": ["commercial-indoor-playground-netting", "blog/playground-inspection-checklist"],
  "indoor-playground-shipping-documents": ["indoor-playground-equipment-import-shipping-terms"],
  "indoor-playground-pre-shipment-inspection": ["indoor-playground-factory-acceptance-checklist"],
  "indoor-playground-equipment-standardization": ["multi-site-indoor-playground-equipment-procurement"],
};

export function novemberBlogInbound(parent: string) {
  return novemberBlogSlugs.filter(slug => novemberBlogParents[slug]?.includes(parent));
}

export function novemberBlogAuthor(slug: string | undefined): string | undefined {
  return novemberBlogSlugs.some(item => item === slug) ? "Gerry" : undefined;
}