import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/xml; charset=utf-8",
};

const DOMAIN = "https://indoorplaygroundsolution.com";
const LANGUAGES = ["", "es", "pt", "de", "ar"]; // "" = English (default, no prefix)
const TODAY = new Date().toISOString().split("T")[0];

interface BlogPost {
  slug: string;
  language: string;
  published_at: string | null;
  updated_at: string;
}

interface Product {
  slug: string;
  updated_at: string;
}

// Helper to generate URL with language prefix
const getUrl = (path: string, lang: string = ""): string => {
  if (lang === "" || lang === "en") {
    return `${DOMAIN}${path}`;
  }
  return `${DOMAIN}/${lang}${path}`;
};

// Generate hreflang links for a given path
const generateHreflangLinks = (path: string): string => {
  const links = LANGUAGES.map((lang) => {
    const hreflang = lang === "" ? "en" : lang;
    const href = getUrl(path, lang);
    return `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}"/>`;
  });
  
  // Add x-default pointing to English
  links.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${getUrl(path, "")}"/>`);
  
  return links.join("\n");
};

// Generate a single URL entry
const generateUrlEntry = (
  path: string,
  lastmod: string,
  changefreq: string,
  priority: string,
  includeHreflang: boolean = true
): string => {
  const hreflangLinks = includeHreflang ? `\n${generateHreflangLinks(path)}` : "";
  
  return `  <url>
    <loc>${getUrl(path, "")}</loc>${hreflangLinks}
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
};

// Generate URL entries for all languages
const generateMultiLangUrls = (
  path: string,
  lastmod: string,
  changefreq: string,
  priority: string
): string => {
  // Main entry with hreflang
  const mainEntry = generateUrlEntry(path, lastmod, changefreq, priority, true);
  
  // Additional language entries (without hreflang to avoid duplication)
  const langEntries = LANGUAGES.filter(lang => lang !== "").map(lang => `  <url>
    <loc>${getUrl(path, lang)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`);
  
  return [mainEntry, ...langEntries].join("\n");
};

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch published blog posts
    const { data: blogPosts, error: blogError } = await supabase
      .from("blog_posts")
      .select("slug, language, published_at, updated_at")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (blogError) {
      console.error("Error fetching blog posts:", blogError);
    }

    // Fetch active products
    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("slug, updated_at")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (productsError) {
      console.error("Error fetching products:", productsError);
    }

    // ==================== STATIC PAGES ====================
    const staticPages = [
      { path: "/", changefreq: "weekly", priority: "1.0" },
      { path: "/products", changefreq: "weekly", priority: "0.9" },
      { path: "/products/indoor-playground", changefreq: "weekly", priority: "0.9" },
      { path: "/products/trampoline-park", changefreq: "weekly", priority: "0.9" },
      { path: "/products/ninja-course", changefreq: "weekly", priority: "0.9" },
      { path: "/products/soft-play", changefreq: "weekly", priority: "0.9" },
      { path: "/projects", changefreq: "weekly", priority: "0.8" },
      { path: "/process", changefreq: "monthly", priority: "0.7" },
      { path: "/about-us", changefreq: "monthly", priority: "0.7" },
      { path: "/contact", changefreq: "monthly", priority: "0.8" },
      { path: "/faq", changefreq: "monthly", priority: "0.6" },
      { path: "/blog", changefreq: "daily", priority: "0.8" },
      { path: "/case-studies", changefreq: "weekly", priority: "0.7" },
    ];

    const staticUrlEntries = staticPages
      .map((page) => generateMultiLangUrls(page.path, TODAY, page.changefreq, page.priority))
      .join("\n\n");

    // ==================== DYNAMIC PRODUCT PAGES ====================
    const productUrlEntries = (products || [])
      .map((product: Product) => {
        const lastmod = product.updated_at?.split("T")[0] || TODAY;
        return generateMultiLangUrls(`/products/${product.slug}`, lastmod, "weekly", "0.8");
      })
      .join("\n\n");

    // ==================== DYNAMIC BLOG POSTS ====================
    // Group blog posts by slug to handle multi-language versions
    const blogPostsBySlug = new Map<string, BlogPost[]>();
    (blogPosts || []).forEach((post: BlogPost) => {
      const existing = blogPostsBySlug.get(post.slug) || [];
      existing.push(post);
      blogPostsBySlug.set(post.slug, existing);
    });

    const blogUrlEntries: string[] = [];
    
    blogPostsBySlug.forEach((posts, slug) => {
      // Get the most recent update date across all language versions
      const lastmod = posts
        .map(p => p.updated_at || p.published_at || TODAY)
        .sort()
        .reverse()[0]
        ?.split("T")[0] || TODAY;

      // Generate entries for each language version that exists
      posts.forEach((post) => {
        const lang = post.language === "en" ? "" : post.language;
        const url = getUrl(`/blog/${slug}`, lang);
        
        blogUrlEntries.push(`  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`);
      });
    });

    // ==================== GENERATE SITEMAP ====================
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

  <!-- ==================== STATIC PAGES ==================== -->
${staticUrlEntries}

  <!-- ==================== DYNAMIC PRODUCTS ==================== -->
${productUrlEntries}

  <!-- ==================== BLOG POSTS ==================== -->
${blogUrlEntries.join("\n")}

</urlset>`;

    return new Response(sitemap, {
      headers: corsHeaders,
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${DOMAIN}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`,
      { headers: corsHeaders }
    );
  }
});
