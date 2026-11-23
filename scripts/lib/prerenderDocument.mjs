/** Keep one route-owned metadata value and one declaration per entity in the saved head. */
export function normalizePrerenderDocument(html) {
  return html.replace(/<head\b[^>]*>[\s\S]*?<\/head>/i, head => {
    const tags = [...head.matchAll(/<meta\b[^>]*>|<link\b[^>]*>|<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi)];
    const chosen = new Map();
    const remove = new Set();
    for (const match of tags) {
      const tag = match[0];
      let key;
      if (/^<meta/i.test(tag)) {
        const name = tag.match(/\b(?:name|property)=["']([^"']+)["']/i)?.[1];
        if (name && name !== "article:tag" && name !== "og:locale:alternate") key = `meta:${name.toLowerCase()}`;
      } else if (/^<link/i.test(tag) && /rel=["']canonical["']/i.test(tag)) {
        key = 'canonical';
      } else if (/^<script/i.test(tag)) {
        try {
          const value = JSON.parse(tag.replace(/^<script\b[^>]*>/i, '').replace(/<\/script>$/i, ''));
          key = value['@id'] ? `entity:${value['@id']}` : `json:${JSON.stringify(value)}`;
        } catch { throw new Error('Invalid JSON-LD in prerendered head'); }
      }
      if (!key) continue;
      const previous = chosen.get(key);
      if (previous) {
        if (/data-rh=/.test(previous[0]) && !/data-rh=/.test(tag)) { remove.add(match.index); continue; }
        remove.add(previous.index);
      }
      chosen.set(key, match);
    }
    return head.replace(/<meta\b[^>]*>|<link\b[^>]*>|<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, (tag, offset) => remove.has(offset) ? '' : tag);
  });
}