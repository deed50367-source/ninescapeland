import { useTranslation } from "react-i18next";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LiveChat } from "@/components/LiveChat";
import MobileBottomNav from "@/components/MobileBottomNav";
import { BlogArticleSEO } from "@/components/BlogArticleSEO";
import { BlogPostingSchema, BreadcrumbSchema } from "@/components/StructuredData";
import { BlogTableOfContents } from "@/components/BlogTableOfContents";
import { BlogRelatedPosts } from "@/components/BlogRelatedPosts";
import { BlogCategoryTags } from "@/components/BlogCategoryTags";
import { BlogSidebar } from "@/components/BlogSidebar";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { useIsMobile } from "@/hooks/use-mobile";
import { Calendar, ArrowLeft, Clock, User, Share2, Globe } from "lucide-react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
];

const BlogPost = () => {
  const { t, i18n } = useTranslation();
  const { slug } = useParams();
  const { localizedPath } = useLocalizedPath();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  // Get current language code
  const currentLang = i18n.language?.split('-')[0] || 'en';

  // Query for the post in current language
  const { data: post, isLoading, error } = useQuery({
    queryKey: ["blog-post", slug, currentLang],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .eq("language", currentLang)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  // Query for available translations of this article (same slug, different languages)
  const { data: availableTranslations } = useQuery({
    queryKey: ["blog-post-translations", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("language, title")
        .eq("slug", slug)
        .eq("status", "published");
      
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  // Extract category from current post keywords
  const getCurrentPostCategory = (keywords: string | null): string | null => {
    if (!keywords) return null;
    const categoryKeys = ['tips', 'trends', 'guides', 'design', 'safety', 'business'];
    const keywordList = keywords.split(",").map(k => k.trim().toLowerCase());
    return categoryKeys.find(cat => keywordList.includes(cat)) || null;
  };

  const currentPostCategory = post ? getCurrentPostCategory(post.seo_keywords) : null;

  // Fetch related posts - prioritize same category, then recent posts
  const { data: relatedPosts } = useQuery({
    queryKey: ["blog-related-posts", currentLang, post?.id, currentPostCategory],
    queryFn: async () => {
      // First, fetch all published posts in current language (excluding current post)
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, cover_image, published_at, content, seo_keywords")
        .eq("status", "published")
        .eq("language", currentLang)
        .neq("id", post?.id || '')
        .order("published_at", { ascending: false })
        .limit(20); // Fetch more to have options for category matching
      
      if (error) throw error;
      if (!data) return [];

      // If current post has a category, prioritize same-category posts
      if (currentPostCategory) {
        const sameCategoryPosts = data.filter(p => {
          const postCategory = getCurrentPostCategory(p.seo_keywords);
          return postCategory === currentPostCategory;
        });
        
        const otherPosts = data.filter(p => {
          const postCategory = getCurrentPostCategory(p.seo_keywords);
          return postCategory !== currentPostCategory;
        });

        // Return up to 3 same-category posts + fill remaining with other posts
        const result = [...sameCategoryPosts.slice(0, 3)];
        const remaining = 6 - result.length;
        if (remaining > 0) {
          result.push(...otherPosts.slice(0, remaining));
        }
        return result;
      }

      // No category - just return recent posts
      return data.slice(0, 6);
    },
    enabled: !!post?.id,
  });

  // Fetch recent posts for sidebar
  const { data: recentPosts } = useQuery({
    queryKey: ["blog-recent-posts-sidebar", currentLang],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, slug, published_at, cover_image")
        .eq("status", "published")
        .eq("language", currentLang)
        .order("published_at", { ascending: false })
        .limit(5);
      
      if (error) throw error;
      return data;
    },
  });

  // Calculate reading time
  const getReadingTime = (content: string | null) => {
    if (!content) return 1;
    const plainText = content.replace(/<[^>]+>/g, '');
    const wordCount = plainText.split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / 200));
  };

  // Get word count
  const getWordCount = (content: string | null) => {
    if (!content) return 0;
    const plainText = content.replace(/<[^>]+>/g, '');
    return plainText.split(/\s+/).length;
  };

  // Strip HTML for plain text
  const stripHtml = (html: string | null) => {
    if (!html) return '';
    return html.replace(/<[^>]+>/g, '');
  };

  // Check if content has headings for TOC
  const hasHeadings = (content: string | null) => {
    if (!content) return false;
    return /<h[23][^>]*>/i.test(content);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-16">
          <div className="container-wide">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1 max-w-4xl">
                <Skeleton className="h-8 w-32 mb-8" />
                <Skeleton className="h-12 w-full mb-4" />
                <Skeleton className="h-6 w-48 mb-8" />
                <Skeleton className="h-80 w-full mb-8" />
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
              <aside className="hidden lg:block w-72">
                <Skeleton className="h-64 w-full rounded-xl" />
              </aside>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Helper function to get language path
  const getLanguagePath = (langCode: string, postSlug: string) => {
    if (langCode === 'en') {
      return `/blog/${postSlug}`;
    }
    return `/${langCode}/blog/${postSlug}`;
  };

  // Get available language info
  const getLanguageInfo = (code: string) => {
    return LANGUAGES.find(l => l.code === code);
  };

  if (error || !post) {
    // Check if article exists in other languages
    const otherLanguages = availableTranslations?.filter(t => t.language !== currentLang) || [];
    
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-16">
          <section className="container-wide text-center">
            <figure className="text-6xl mb-4" role="img" aria-label="Not found">😕</figure>
            <h1 className="text-3xl font-bold mb-4">{t("blog.notFound")}</h1>
            <p className="text-muted-foreground mb-4">{t("blog.notFoundDescription")}</p>
            
            {/* Show available translations if any */}
            {otherLanguages.length > 0 && (
              <div className="mb-8 p-4 bg-muted rounded-lg inline-block">
                <p className="text-sm text-muted-foreground mb-3 flex items-center justify-center gap-2">
                  <Globe className="w-4 h-4" />
                  {t("blog.availableInOtherLanguages", "This article is available in:")}
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {otherLanguages.map(trans => {
                    const langInfo = getLanguageInfo(trans.language);
                    return (
                      <Button
                        key={trans.language}
                        variant="outline"
                        size="sm"
                        asChild
                      >
                        <Link to={getLanguagePath(trans.language, slug || '')}>
                          {langInfo?.flag} {langInfo?.name}
                        </Link>
                      </Button>
                    );
                  })}
                </div>
              </div>
            )}
            
            <div>
              <Button asChild>
                <Link to={localizedPath("/blog")}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t("blog.backToBlog")}
                </Link>
              </Button>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }
  const readingTime = getReadingTime(post.content);
  const wordCount = getWordCount(post.content);
  const articleUrl = `https://indoorplaygroundsolution.com${localizedPath(`/blog/${post.slug}`)}`;
  const showTOC = hasHeadings(post.content);

  const breadcrumbItems = [
    { name: "Home", url: "https://indoorplaygroundsolution.com/" },
    { name: "Blog", url: "https://indoorplaygroundsolution.com/blog" },
    { name: post.title, url: articleUrl }
  ];

  // Parse tags from keywords
  const postTags = post.seo_keywords?.split(',').map(tag => tag.trim()).filter(Boolean) || [];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Enhanced Article SEO with Open Graph & Twitter Cards */}
      <BlogArticleSEO 
        title={post.seo_title || post.title}
        description={post.seo_description || post.excerpt || undefined}
        keywords={post.seo_keywords || undefined}
        image={post.cover_image || undefined}
        publishedAt={post.published_at || undefined}
        modifiedAt={post.updated_at}
        author="NinescapeLand Team"
        section="Indoor Playground Industry"
        tags={postTags}
      />
      
      {/* Enhanced Structured Data */}
      <BlogPostingSchema
        headline={post.title}
        description={post.seo_description || post.excerpt || undefined}
        image={post.cover_image || undefined}
        datePublished={post.published_at || undefined}
        dateModified={post.updated_at}
        url={articleUrl}
        keywords={post.seo_keywords || undefined}
        wordCount={wordCount}
        articleBody={stripHtml(post.content)}
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      
      <Header />
      
      <main className="flex-1 bg-background">
        {/* Hero Section with Cover Image */}
        {post.cover_image && (
          <header className="relative w-full h-[40vh] min-h-[300px] max-h-[500px] overflow-hidden">
            <figure className="absolute inset-0">
              <img
                src={post.cover_image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <figcaption className="sr-only">{post.title} cover image</figcaption>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            </figure>
          </header>
        )}

        <div className="container-wide py-8 md:py-12">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Main Article Content */}
            <article className="flex-1 max-w-4xl min-w-0">
              {/* Breadcrumb Navigation */}
              <nav aria-label="Breadcrumb" className="mb-6">
                <ol className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                  <li>
                    <Link to={localizedPath("/")} className="hover:text-primary transition-colors">
                      {t("nav.home")}
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link to={localizedPath("/blog")} className="hover:text-primary transition-colors">
                      {t("nav.blog")}
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li className="text-foreground font-medium truncate max-w-[200px]" aria-current="page">
                    {post.title}
                  </li>
                </ol>
              </nav>

              {/* Language Switcher for article translations */}
              {availableTranslations && availableTranslations.length > 1 && (
                <div className="mb-6 flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                    <Globe className="w-4 h-4" />
                    {t("blog.readIn", "Read in:")}
                  </span>
                  {availableTranslations.map(trans => {
                    const langInfo = getLanguageInfo(trans.language);
                    const isCurrentLang = trans.language === currentLang;
                    return (
                      <Button
                        key={trans.language}
                        variant={isCurrentLang ? "default" : "outline"}
                        size="sm"
                        className="h-7 text-xs"
                        asChild={!isCurrentLang}
                        disabled={isCurrentLang}
                      >
                        {isCurrentLang ? (
                          <span>{langInfo?.flag} {langInfo?.name}</span>
                        ) : (
                          <Link to={getLanguagePath(trans.language, slug || '')}>
                            {langInfo?.flag} {langInfo?.name}
                          </Link>
                        )}
                      </Button>
                    );
                  })}
                </div>
              )}

              {/* Article Header */}
              <header className="mb-8 md:mb-12">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
                  {post.title}
                </h1>

                {/* Meta Information */}
                <aside className="flex flex-wrap items-center gap-4 md:gap-6 text-muted-foreground border-b border-border pb-6">
                  <address className="flex items-center gap-2 not-italic">
                    <User className="w-4 h-4" />
                    <span>NinescapeLand Team</span>
                  </address>
                  {post.published_at && (
                    <time dateTime={post.published_at} className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {format(new Date(post.published_at), "MMMM d, yyyy")}
                    </time>
                  )}
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{readingTime} min read</span>
                  </div>
                </aside>

                {/* Excerpt / Lead paragraph */}
                {post.excerpt && (
                  <p className="text-lg md:text-xl text-muted-foreground mt-6 leading-relaxed font-medium">
                    {post.excerpt}
                  </p>
                )}

                {/* Category and Tags */}
                {postTags.length > 0 && (
                  <div className="mt-6">
                    <BlogCategoryTags tags={postTags} showLabels size="md" />
                  </div>
                )}
              </header>

              {/* Mobile TOC - shown above content on mobile */}
              {showTOC && (
                <div className="lg:hidden mb-8">
                  <BlogTableOfContents content={post.content} />
                </div>
              )}

              {/* Article Content */}
              <section 
                className="blog-content prose prose-lg max-w-none dark:prose-invert
                  prose-headings:font-bold prose-headings:tracking-tight prose-headings:scroll-mt-24
                  prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-12 prose-h2:mb-6
                  prose-h3:text-xl prose-h3:md:text-2xl prose-h3:mt-8 prose-h3:mb-4
                  prose-h4:text-lg prose-h4:md:text-xl prose-h4:mt-6 prose-h4:mb-3
                  prose-p:text-base prose-p:md:text-lg prose-p:leading-relaxed prose-p:mb-6
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                  prose-img:rounded-xl prose-img:shadow-md prose-img:my-8
                  prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-muted-foreground
                  prose-ul:my-6 prose-ul:space-y-2
                  prose-ol:my-6 prose-ol:space-y-2
                  prose-li:text-base prose-li:md:text-lg
                  prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                  prose-pre:bg-muted prose-pre:rounded-xl prose-pre:p-4 prose-pre:overflow-x-auto
                  prose-table:w-full prose-table:border-collapse
                  prose-th:border prose-th:border-border prose-th:bg-muted prose-th:p-3 prose-th:text-left
                  prose-td:border prose-td:border-border prose-td:p-3
                  prose-hr:my-12 prose-hr:border-border
                  prose-figure:my-8
                  prose-figcaption:text-center prose-figcaption:text-muted-foreground prose-figcaption:mt-2"
                dangerouslySetInnerHTML={{ __html: post.content || "" }}
              />

              {/* Article Footer */}
              <footer className="mt-12 pt-8 border-t border-border">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <Link 
                    to={localizedPath("/blog")}
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    {t("blog.backToBlog")}
                  </Link>
                  
                  {/* Share Links */}
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Share2 className="w-4 h-4" />
                      Share:
                    </span>
                    <a 
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(articleUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors font-medium"
                      aria-label="Share on Twitter"
                    >
                      Twitter
                    </a>
                    <a 
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(articleUrl)}&title=${encodeURIComponent(post.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors font-medium"
                      aria-label="Share on LinkedIn"
                    >
                      LinkedIn
                    </a>
                    <a 
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors font-medium"
                      aria-label="Share on Facebook"
                    >
                      Facebook
                    </a>
                  </div>
                </div>
              </footer>
            </article>

            {/* Desktop Sidebar with TOC and BlogSidebar */}
            {!isMobile && (
              <aside className="hidden lg:block w-72 xl:w-80 flex-shrink-0">
                <div className="sticky top-24 space-y-6 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2 scrollbar-thin">
                  {showTOC && (
                    <BlogTableOfContents content={post.content} />
                  )}
                  <BlogSidebar recentPosts={recentPosts || []} />
                </div>
              </aside>
            )}
          </div>
        </div>

        {/* Related Posts Section */}
        {relatedPosts && relatedPosts.length > 1 && (
          <BlogRelatedPosts 
            posts={relatedPosts} 
            currentPostId={post.id} 
          />
        )}
      </main>

      <Footer />
      <LiveChat />
      <MobileBottomNav />
    </div>
  );
};

export default BlogPost;