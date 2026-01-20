import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { LiveChat } from "@/components/LiveChat";
import MobileBottomNav from "@/components/MobileBottomNav";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { Calendar, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { SEOHead } from "@/components/SEOHead";

const Blog = () => {
  const { t } = useTranslation();
  const { localizedPath } = useLocalizedPath();

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

      <main className="flex-1 py-16 bg-background">
        <div className="container-wide">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-card rounded-2xl overflow-hidden border">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-6 space-y-3">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : posts && posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="group bg-card rounded-2xl overflow-hidden border hover:shadow-lg transition-all duration-300"
                >
                  <Link to={localizedPath(`/blog/${post.slug}`)}>
                    <div className="aspect-video overflow-hidden bg-muted">
                      {post.cover_image ? (
                        <img
                          src={post.cover_image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                          <span className="text-4xl">📝</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        {post.published_at && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {format(new Date(post.published_at), "MMM d, yyyy")}
                          </span>
                        )}
                      </div>
                      <h2 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="text-muted-foreground line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="flex items-center gap-2 text-primary font-medium pt-2">
                        {t("blog.readMore")}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-bold mb-2">{t("blog.noPosts")}</h3>
              <p className="text-muted-foreground">{t("blog.noPostsDescription")}</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <LiveChat />
      <MobileBottomNav />
    </div>
  );
};

export default Blog;
