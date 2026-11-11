export function routeHeadReady(head, route) {
  const path = route.replace(/\/$/, "") || "/";
  const canonical = `https://indoorplaygroundsolution.com${path}`;
  return head.canonical === canonical && head.title.trim().length > 0 &&
    head.description.trim().length > 0 && head.language === (route.match(/^\/(ar|de|es|pt|fr)(?:\/|$)/)?.[1] || "en");
}