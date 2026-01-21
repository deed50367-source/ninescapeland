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
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { useRTL } from "@/hooks/useRTL";
import { Calendar, ArrowRight, Clock, Sparkles, TrendingUp } from "lucide-react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { SEOHead } from "@/components/SEOHead";
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
  const { t } = useTranslation();
  const { localizedPath } = useLocalizedPath();
  const { isRTL } = useRTL();

  const { data: posts, isLoading } = useQuery({
    queryKey: ["blog-posts-public"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("status", "published")
        .order("published_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const featuredPost = posts?.[0];
  const remainingPosts = posts?.slice(1);

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead pageKey="blog" />
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
        <BlogCategoriesSection />

        {/* Featured Post */}
        {!isLoading && featuredPost && (
          <BlogFeaturedPost post={featuredPost} />
        )}

        {/* All Posts Grid */}
        <section className="py-16 md:py-24 bg-background relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
          
          <div className="container-wide relative z-10">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-between mb-12"
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                    {t("blog.latestArticles")}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                  {t("blog.allPosts")}
                </h2>
              </div>
            </motion.div>

            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
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
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {remainingPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    variants={itemVariants}
                    className="group bg-card rounded-2xl overflow-hidden border hover:border-primary/30 shadow-soft hover:shadow-medium transition-all duration-500"
                  >
                    <Link to={localizedPath(`/blog/${post.slug}`)}>
                      {/* Image */}
                      <div className="relative aspect-[16/10] overflow-hidden">
                        {post.cover_image ? (
                          <img
                            src={post.cover_image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 via-primary/10 to-accent/10">
                            <span className="text-6xl group-hover:scale-110 transition-transform">📝</span>
                          </div>
                        )}
                        
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        {/* New badge for recent posts */}
                        {index < 3 && (
                          <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground shadow-lg">
                            <Sparkles className="w-3 h-3 mr-1" />
                            New
                          </Badge>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-4">
                        {/* Meta info */}
                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                          {post.published_at && (
                            <span className="flex items-center gap-1.5 bg-muted/50 px-3 py-1 rounded-full">
                              <Calendar className="w-3.5 h-3.5" />
                              {format(new Date(post.published_at), "MMM d, yyyy")}
                            </span>
                          )}
                          <span className="flex items-center gap-1.5 bg-muted/50 px-3 py-1 rounded-full">
                            <Clock className="w-3.5 h-3.5" />
                            5 min
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
                          <ArrowRight className={`w-4 h-4 group-hover:translate-x-2 transition-transform duration-300 ${isRTL ? 'rotate-180' : ''}`} />
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
                >
                  📝
                </motion.div>
                <h3 className="text-2xl md:text-3xl font-bold mb-3">{t("blog.noPosts")}</h3>
                <p className="text-muted-foreground text-lg max-w-md mx-auto">{t("blog.noPostsDescription")}</p>
              </motion.div>
            ) : null}
          </div>
        </section>

        {/* Newsletter Section */}
        <BlogNewsletterSection />
      </main>

      <Footer />
      <FloatingCTA />
      <LiveChat />
      <MobileBottomNav />
    </div>
  );
};

export default Blog;
