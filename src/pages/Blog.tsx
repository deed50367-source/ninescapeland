import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { LiveChat } from "@/components/LiveChat";
import { FloatingCTA } from "@/components/FloatingCTA";
import MobileBottomNav from "@/components/MobileBottomNav";
import { BlogFeaturedPost } from "@/components/BlogFeaturedPost";
import { BlogCategoriesSection } from "@/components/BlogCategoriesSection";
import { BlogNewsletterSection } from "@/components/BlogNewsletterSection";
import { BlogStatsSection } from "@/components/BlogStatsSection";
import { BlogSidebar } from "@/components/BlogSidebar";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { useRTL } from "@/hooks/useRTL";
import { Calendar, ArrowRight, Clock, Sparkles, TrendingUp } from "lucide-react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { SEOHead } from "@/components/SEOHead";
import { BreadcrumbSchema } from "@/components/StructuredData";
import { Badge } from "@/components/ui/badge";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const Blog = () => {
  const { t, i18n } = useTranslation();
  const { localizedPath } = useLocalizedPath();
  const { isRTL } = useRTL();

  // Get current language code
  const currentLang = i18n.language?.split('-')[0] || 'en';

  const { data: posts, isLoading } = useQuery({
    queryKey: ["blog-posts-public", currentLang],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("status", "published")
        .eq("language", currentLang)
        .order("published_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const featuredPost = posts?.[0];
  const remainingPosts = posts?.slice(1);

  // Calculate reading time
  const getReadingTime = (content: string | null) => {
    if (!content) return 1;
    const plainText = content.replace(/<[^>]+>/g, '');
    const wordCount = plainText.split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / 200));
  };

  const breadcrumbItems = [
    { name: "Home", url: "https://indoorplaygroundsolution.com/" },
    { name: "Blog", url: "https://indoorplaygroundsolution.com/blog" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead pageKey="blog" />
      <BreadcrumbSchema items={breadcrumbItems} />
      <Header />
      
      <PageHero
        titleKey="pages.blog.title"
        titleHighlightKey="pages.blog.titleHighlight"
        descriptionKey="pages.blog.description"
        backgroundImage="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1920"
      />

      <main className="flex-1">
        {/* Stats Section */}
        <BlogStatsSection />

        {/* Categories Section */}
        <section aria-labelledby="blog-categories-heading">
          <BlogCategoriesSection />
        </section>

        {/* Featured Post */}
        {!isLoading && featuredPost && (
          <section aria-labelledby="featured-post-heading">
            <h2 id="featured-post-heading" className="sr-only">Featured Article</h2>
            <BlogFeaturedPost post={featuredPost} />
          </section>
        )}

        {/* All Posts Grid with Sidebar */}
        <section 
          aria-labelledby="all-posts-heading"
          className="py-16 md:py-24 bg-background relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" aria-hidden="true" />
          
          <div className="container-wide relative z-10">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Main Content */}
              <div className="flex-1">
                {/* Section Header */}
                <motion.header
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center justify-between mb-12"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="w-5 h-5 text-primary" aria-hidden="true" />
                      <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                        {t("blog.latestArticles")}
                      </span>
                    </div>
                    <h2 id="all-posts-heading" className="text-2xl md:text-3xl lg:text-4xl font-bold">
                      {t("blog.allPosts")}
                    </h2>
                  </div>
                </motion.header>

                {isLoading ? (
                  <div className="grid md:grid-cols-2 gap-8" role="status" aria-label="Loading articles">
                    {[1, 2, 3, 4].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-card rounded-2xl overflow-hidden border shadow-soft"
                      >
                        <Skeleton className="h-52 w-full" />
                        <div className="p-6 space-y-4">
                          <div className="flex gap-2">
                            <Skeleton className="h-6 w-20 rounded-full" />
                            <Skeleton className="h-6 w-24 rounded-full" />
                          </div>
                          <Skeleton className="h-7 w-full" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-10 w-32" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : remainingPosts && remainingPosts.length > 0 ? (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 gap-8"
                  >
                    {remainingPosts.map((post, index) => (
                      <motion.article
                        key={post.id}
                        variants={itemVariants}
                        className="group bg-card rounded-2xl overflow-hidden border hover:border-primary/30 shadow-soft hover:shadow-medium transition-all duration-500"
                      >
                        <Link to={localizedPath(`/blog/${post.slug}`)}>
                          {/* Image */}
                          <figure className="relative aspect-[16/10] overflow-hidden">
                            {post.cover_image ? (
                              <img
                                src={post.cover_image}
                                alt=""
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                loading="lazy"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 via-primary/10 to-accent/10">
                                <span className="text-6xl group-hover:scale-110 transition-transform" aria-hidden="true">📝</span>
                              </div>
                            )}
                            
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                            
                            {/* New badge for recent posts */}
                            {index < 3 && (
                              <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground shadow-lg">
                                <Sparkles className="w-3 h-3 mr-1" aria-hidden="true" />
                                New
                              </Badge>
                            )}
                          </figure>

                          {/* Content */}
                          <div className="p-6 space-y-4">
                            {/* Meta info */}
                            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                              {post.published_at && (
                                <time 
                                  dateTime={post.published_at}
                                  className="flex items-center gap-1.5 bg-muted/50 px-3 py-1 rounded-full"
                                >
                                  <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                                  {format(new Date(post.published_at), "MMM d, yyyy")}
                                </time>
                              )}
                              <span className="flex items-center gap-1.5 bg-muted/50 px-3 py-1 rounded-full">
                                <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                                {getReadingTime(post.content)} min
                              </span>
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                              {post.title}
                            </h3>

                            {/* Excerpt */}
                            {post.excerpt && (
                              <p className="text-muted-foreground leading-relaxed line-clamp-2">
                                {post.excerpt}
                              </p>
                            )}

                            {/* Read more link */}
                            <div className="flex items-center gap-2 text-primary font-semibold pt-2">
                              {t("blog.readMore")}
                              <ArrowRight 
                                className={`w-4 h-4 group-hover:translate-x-2 transition-transform duration-300 ${isRTL ? 'rotate-180' : ''}`} 
                                aria-hidden="true"
                              />
                            </div>
                          </div>
                        </Link>
                      </motion.article>
                    ))}
                  </motion.div>
                ) : !featuredPost ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20 bg-muted/30 rounded-3xl border-2 border-dashed border-muted-foreground/20"
                  >
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-8xl mb-6"
                      aria-hidden="true"
                    >
                      📝
                    </motion.div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-3">{t("blog.noPosts")}</h3>
                    <p className="text-muted-foreground text-lg max-w-md mx-auto">{t("blog.noPostsDescription")}</p>
                  </motion.div>
                ) : null}
              </div>

              {/* Sidebar */}
              <aside className="lg:w-80 xl:w-96 flex-shrink-0" aria-label="Blog sidebar">
                <div className="lg:sticky lg:top-24">
                  <BlogSidebar recentPosts={posts || []} />
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section aria-labelledby="newsletter-heading">
          <h2 id="newsletter-heading" className="sr-only">Newsletter Subscription</h2>
          <BlogNewsletterSection />
        </section>
      </main>

      <Footer />
      <FloatingCTA />
      <LiveChat />
      <MobileBottomNav />
    </div>
  );
};

export default Blog;