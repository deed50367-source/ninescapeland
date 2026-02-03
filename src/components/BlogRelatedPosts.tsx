import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Clock, Sparkles } from "lucide-react";
import { format } from "date-fns";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { useRTL } from "@/hooks/useRTL";
import { Badge } from "@/components/ui/badge";

interface RelatedPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image: string | null;
  published_at: string | null;
  content: string | null;
  seo_keywords?: string | null;
}

interface BlogRelatedPostsProps {
  posts: RelatedPost[];
  currentPostId: string;
}

const CATEGORIES = [
  { key: 'tips', color: 'bg-amber-500' },
  { key: 'trends', color: 'bg-emerald-500' },
  { key: 'guides', color: 'bg-blue-500' },
  { key: 'design', color: 'bg-pink-500' },
  { key: 'safety', color: 'bg-violet-500' },
  { key: 'business', color: 'bg-cyan-500' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export const BlogRelatedPosts = ({ posts, currentPostId }: BlogRelatedPostsProps) => {
  const { t } = useTranslation();
  const { localizedPath } = useLocalizedPath();
  const { isRTL } = useRTL();

  // Filter out current post and limit to 3
  const relatedPosts = posts
    .filter(post => post.id !== currentPostId)
    .slice(0, 3);

  if (relatedPosts.length === 0) return null;

  // Calculate reading time
  const getReadingTime = (content: string | null) => {
    if (!content) return 1;
    const plainText = content.replace(/<[^>]+>/g, '');
    const wordCount = plainText.split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / 200));
  };

  // Get category from keywords
  const getPostCategory = (keywords: string | null) => {
    if (!keywords) return null;
    const keywordList = keywords.split(",").map(k => k.trim().toLowerCase());
    return CATEGORIES.find(cat => keywordList.includes(cat.key)) || null;
  };

  return (
    <section className="py-12 md:py-16 bg-muted/30 border-t">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              {t("blog.related.badge")}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            {t("blog.related.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("blog.related.description")}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {relatedPosts.map((post) => (
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
                      <span className="text-5xl group-hover:scale-110 transition-transform">📝</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Category badge */}
                  {getPostCategory(post.seo_keywords) && (
                    <Badge className={`absolute top-3 left-3 ${getPostCategory(post.seo_keywords)?.color} text-white text-xs`}>
                      {t(`blog.categories.${getPostCategory(post.seo_keywords)?.key}`)}
                    </Badge>
                  )}
                </figure>
                {/* Content */}
                <div className="p-5 space-y-3">
                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    {post.published_at && (
                      <time dateTime={post.published_at} className="flex items-center gap-1 bg-muted/50 px-2 py-1 rounded-full">
                        <Calendar className="w-3 h-3" />
                        {format(new Date(post.published_at), "MMM d, yyyy")}
                      </time>
                    )}
                    <span className="flex items-center gap-1 bg-muted/50 px-2 py-1 rounded-full">
                      <Clock className="w-3 h-3" />
                      {getReadingTime(post.content)} min
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}

                  {/* Read more */}
                  <div className="flex items-center gap-1.5 text-primary font-medium text-sm pt-1">
                    {t("blog.readMore")}
                    <ArrowRight className={`w-3.5 h-3.5 group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
