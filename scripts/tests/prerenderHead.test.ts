import { expect, test } from "bun:test";
import { routeHeadReady } from "../lib/prerenderHead.mjs";

test("a fallback homepage head cannot pass a topic capture", () => {
  expect(routeHeadReady({ canonical: "", title: "Indoor Playground Manufacturer", description: "Home", language: "en" }, "/commercial-indoor-playground-netting")).toBe(false);
  expect(routeHeadReady({ canonical: "https://indoorplaygroundsolution.com/", title: "Home", description: "Home", language: "en" }, "/commercial-indoor-playground-netting")).toBe(false);
});
test("the captured head belongs to the exact localized route", () => {
  const head = { canonical: "https://indoorplaygroundsolution.com/ar/products", title: "Products", description: "Catalog", language: "ar" };
  expect(routeHeadReady(head, "/ar/products")).toBe(true);
  expect(routeHeadReady({ ...head, language: "en" }, "/ar/products")).toBe(false);
});