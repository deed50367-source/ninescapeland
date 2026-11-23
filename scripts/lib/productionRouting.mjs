const escapePattern = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Exact known paths only: never grant a catch-all SPA 200 for nonexistent public URLs. */
export function productionFallbackRules(routes) {
  const paths = [...new Set(routes.map(path => path.replace(/^\//, '').replace(/\/$/, '')).filter(Boolean))];
  const rules = [];
  for (let i = 0; i < paths.length; i += 20) {
    const pattern = paths.slice(i, i + 20).map(escapePattern).join('|');
    rules.push(`  RewriteCond %{REQUEST_FILENAME} !-f\n  RewriteCond %{REQUEST_FILENAME} !-d\n  RewriteRule ^(?:${pattern})/?$ /index.html [L]`);
  }
  return rules.join('\n\n');
}

export function cmsPublicRoutes(posts, products) {
  const languages = ['en', 'ar', 'de', 'es', 'pt', 'fr'];
  const validSlug = slug => typeof slug === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
  return [
    ...posts.filter(post => post.status === 'published' && languages.includes(post.language) && validSlug(post.slug))
      .map(post => `${post.language === 'en' ? '' : `/${post.language}`}/blog/${post.slug}`),
    ...products.filter(product => product.is_active && validSlug(product.slug))
      .flatMap(product => languages.map(language => `${language === 'en' ? '' : `/${language}`}/products/${product.slug}`)),
  ];
}