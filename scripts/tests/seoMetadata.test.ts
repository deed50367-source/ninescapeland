import { describe, expect, test } from "bun:test";
import { boundedSiteMetadata } from "../../src/lib/seoMetadata";

describe("site metadata limits", () => {
  test("title stays below 60 including its brand suffix", () => {
    for (const value of ["T".repeat(100), "Long commercial playground equipment manufacturer supplier", "NinescapeLand", "  Equipment | NinescapeLand  "]) {
      const result = boundedSiteMetadata(value, "Description");
      expect(result.title.length).toBeLessThan(60);
      expect(result.title).toBe(result.title.trim());
      expect(result.title.match(/NinescapeLand/g)?.length).toBe(1);
    }
  });
  test("description stays below 160 and is trimmed", () => {
    const result = boundedSiteMetadata("Equipment", "  " + "D".repeat(200) + "  ");
    expect(result.description.length).toBe(159);
    expect(result.description).toBe(result.description.trim());
  });
});