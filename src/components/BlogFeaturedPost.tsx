import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Star, Clock, Eye } from "lucide-react";
import { format } from "date-fns";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { useRTL } from "@/hooks/useRTL";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface BlogFeaturedPostProps {
  post: {
    id: string;
    title: string;
    excerpt: string | null;
    cover_image: string | null;
    published_at: string | null;
    slug: string;
  };
}

export const BlogFeaturedPost = ({ post }: BlogFeaturedPostProps) => {
  const { t } = useTranslation();
  const { localizedPath } = useLocalizedPath();
  const { isRTL } = useRTL();

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative py-12 md:py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5 overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <div className="container-wide relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-2 justify-center mb-8"
        >
          <Star className="w-5 h-5 text-accent fill-accent" />
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">
            {t("blog.featuredPost")}
          </span>
          <Star className="w-5 h-5 text-accent fill-accent" />
        </motion.div>

        <Link to={localizedPath(`/blog/${post.slug}`)} className="group block">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-medium"
            >
              {post.cover_image ? (
                <img
                  src={post.cover_image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/30 to-accent/20">
                  <span className="text-8xl">📝</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              
              {/* Floating badge */}
              <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground shadow-lg">
                <Star className="w-3 h-3 mr-1 fill-current" />
                Featured
              </Badge>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                {post.published_at && (
                  <span className="flex items-center gap-1.5 bg-muted/50 px-3 py-1 rounded-full">
                    <Calendar className="w-4 h-4" />
                    {format(new Date(post.published_at), "MMM d, yyyy")}
                  </span>
                )}
                <span className="flex items-center gap-1.5 bg-muted/50 px-3 py-1 rounded-full">
                  <Clock className="w-4 h-4" />
                  5 min read
                </span>
                <span className="flex items-center gap-1.5 bg-muted/50 px-3 py-1 rounded-full">
                  <Eye className="w-4 h-4" />
                  1.2k views
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight group-hover:text-primary transition-colors">
                {post.title}
              </h2>

              {post.excerpt && (
                <p className="text-muted-foreground text-lg leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              )}

              <Button size="lg" className="group/btn">
                {t("blog.readMore")}
                <ArrowRight className={`w-5 h-5 group-hover/btn:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
              </Button>
            </motion.div>
          </div>
        </Link>
      </div>
    </motion.section>
  );
};
