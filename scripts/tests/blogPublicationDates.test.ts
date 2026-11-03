import { describe, expect, test } from "bun:test";

// User-approved retrospective display dates, not original release timestamps.
const slugs = [
  "mall-indoor-playground", "toddler-indoor-playground",
  "autism-friendly-indoor-playground-equipment", "indoor-playground-renovation",
  "paid-indoor-playground-vs-free-indoor-playground", "indoor-playground-ideas",
  "indoor-play-area", "soft-play-equipment", "sensory-room-equipment",
  "social-skills-activities-for-kids", "indoor-playground-ceiling-height",
  "playground-replacement-parts", "indoor-playground-cleaning",
  "playground-inspection-checklist", "indoor-playground-insurance-cost",
  "indoor-playground-slide-clearance", "playground-netting-inspection",
  "indoor-playground-shipping-documents", "indoor-playground-pre-shipment-inspection",
  "indoor-playground-equipment-standardization",
];
type Post = { slug: string; language: string; published_at: string; status: string };
async function readPosts(): Promise<Post[]> {
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new Error("Public database configuration required");
  const response = await fetch(`${url}/rest/v1/blog_posts?select=slug,language,published_at,status&slug=in.(${slugs.join(",")})`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  });
  if (!response.ok) throw new Error(`Blog date read failed: ${response.status}`);
  return response.json();
}
describe("Approved retrospective blog dates", () => {
  test("20 articles occupy every day from October 15 through November 3", async () => {
    const posts = await readPosts();
    expect(posts.length).toBe(120);
    slugs.forEach((slug, index) => {
      const expected = new Date(Date.UTC(2026, 9, 15 + index, 8)).toISOString();
      const versions = posts.filter(post => post.slug === slug);
      expect(versions.length).toBe(6);
      for (const post of versions) expect(new Date(post.published_at).toISOString()).toBe(expected);
    });
  });
  test("each daily article has exactly the six site languages on one timestamp", async () => {
    const posts = await readPosts();
    for (const slug of slugs) {
      const versions = posts.filter(post => post.slug === slug);
      expect(versions.map(post => post.language).sort()).toEqual(["ar", "de", "en", "es", "fr", "pt"]);
      expect(new Set(versions.map(post => post.published_at)).size).toBe(1);
    }
  });
  test("all 120 language records remain published", async () => {
    const posts = await readPosts();
    expect(posts.length).toBe(120);
    for (const post of posts) expect(post.status).toBe("published");
  });
});