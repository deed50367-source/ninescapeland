import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Search, 
  Lightbulb, 
  TrendingUp, 
  BookOpen, 
  Palette, 
  Shield, 
  Rocket,
  Calendar,
  Tag,
  ArrowRight,
  Mail,
  Sparkles
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { useRTL } from "@/hooks/useRTL";
import { format } from "date-fns";
import { useState } from "react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  published_at: string | null;
  cover_image: string | null;
}

interface BlogSidebarProps {
  recentPosts?: BlogPost[];
}

const categories = [
  { key: "tips", icon: Lightbulb, color: "bg-amber-500" },
  { key: "trends", icon: TrendingUp, color: "bg-emerald-500" },
  { key: "guides", icon: BookOpen, color: "bg-blue-500" },
  { key: "design", icon: Palette, color: "bg-pink-500" },
  { key: "safety", icon: Shield, color: "bg-violet-500" },
  { key: "business", icon: Rocket, color: "bg-cyan-500" },
];

const popularTags = [
  "Indoor Playground",
  "Trampoline Park",
  "Safety Tips",
  "Business Guide",
  "Design Ideas",
  "Installation",
  "Maintenance",
  "ROI",
];

export const BlogSidebar = ({ recentPosts = [] }: BlogSidebarProps) => {
  const { t } = useTranslation();
  const { localizedPath } = useLocalizedPath();
  const { isRTL } = useRTL();
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");

  return (
    <aside className="space-y-8">
      {/* Search */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-card rounded-2xl border p-6 shadow-soft"
      >
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <Search className="w-5 h-5 text-primary" />
          {t("blog.sidebar.search")}
        </h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t("blog.sidebar.searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-2xl border p-6 shadow-soft"
      >
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          {t("blog.sidebar.categories")}
        </h3>
        <div className="space-y-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.key}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors group"
              >
                <div className={`w-8 h-8 rounded-lg ${category.color} flex items-center justify-center`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <span className="flex-1 text-left font-medium group-hover:text-primary transition-colors">
                  {t(`blog.categories.${category.key}`)}
                </span>
                <ArrowRight className={`w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity ${isRTL ? 'rotate-180' : ''}`} />
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl border p-6 shadow-soft"
        >
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            {t("blog.sidebar.recentPosts")}
          </h3>
          <div className="space-y-4">
            {recentPosts.slice(0, 4).map((post) => (
              <Link
                key={post.id}
                to={localizedPath(`/blog/${post.slug}`)}
                className="flex gap-3 group"
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  {post.cover_image ? (
                    <img
                      src={post.cover_image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/10">
                      <span className="text-xl">📝</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h4>
                  {post.published_at && (
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {format(new Date(post.published_at), "MMM d, yyyy")}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}

      {/* Popular Tags */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card rounded-2xl border p-6 shadow-soft"
      >
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <Tag className="w-5 h-5 text-primary" />
          {t("blog.sidebar.popularTags")}
        </h3>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </motion.div>

      {/* Newsletter Mini */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 text-primary-foreground"
      >
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5" />
          <h3 className="font-bold">{t("blog.sidebar.newsletter")}</h3>
        </div>
        <p className="text-sm text-primary-foreground/80 mb-4">
          {t("blog.sidebar.newsletterDesc")}
        </p>
        <div className="space-y-3">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="email"
              placeholder={t("blog.newsletter.placeholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 bg-white/90 border-0 text-foreground"
            />
          </div>
          <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
            {t("blog.newsletter.subscribe")}
          </Button>
        </div>
      </motion.div>
    </aside>
  );
};
