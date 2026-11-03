const SITE_NAME = "NinescapeLand";

function limitText(value: string, maxLength: number): string {
  const trimmed = value.trim();
  if (trimmed.length <= maxLength) return trimmed;
  const prefix = trimmed.slice(0, maxLength + 1);
  const lastSpace = prefix.lastIndexOf(" ");
  return (lastSpace > maxLength * 0.6 ? prefix.slice(0, lastSpace) : trimmed.slice(0, maxLength)).replace(/[\s|,;:—–-]+$/u, "").trim();
}

/** Limits include the brand suffix, not just the translated title. */
export function boundedSiteMetadata(title: string, description: string) {
  const suffix = ` | ${SITE_NAME}`;
  const topic = title.replace(/\s*[|—–-]?\s*NinescapeLand\s*/giu, " ").trim() || SITE_NAME;
  const fullTitle = topic === SITE_NAME ? SITE_NAME : `${limitText(topic, 59 - suffix.length)}${suffix}`;
  return { title: fullTitle, description: limitText(description, 159) };
}