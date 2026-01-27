import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Tag, Folder } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

interface BlogCategoryTagsProps {
  category?: string;
  tags?: string[];
  showLabels?: boolean;
  size?: "sm" | "md";
}

// Map category keys to display colors
const categoryColors: Record<string, string> = {
  tips: "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 border-amber-500/20",
  trends: "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/20",
  guides: "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 border-blue-500/20",
  design: "bg-pink-500/10 text-pink-600 hover:bg-pink-500/20 border-pink-500/20",
  safety: "bg-violet-500/10 text-violet-600 hover:bg-violet-500/20 border-violet-500/20",
  business: "bg-cyan-500/10 text-cyan-600 hover:bg-cyan-500/20 border-cyan-500/20",
};

export const BlogCategoryTags = ({ 
  category, 
  tags = [], 
  showLabels = false,
  size = "md"
}: BlogCategoryTagsProps) => {
  const { t } = useTranslation();
  const { localizedPath } = useLocalizedPath();

  const sizeClasses = size === "sm" 
    ? "px-2 py-0.5 text-xs" 
    : "px-3 py-1 text-sm";

  const categoryColor = category ? categoryColors[category] || "bg-primary/10 text-primary" : "";

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Category */}
      {category && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-1.5"
        >
          {showLabels && (
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Folder className="w-3 h-3" />
              {t("blog.categoryLabel")}:
            </span>
          )}
          <Link 
            to={localizedPath(`/blog?category=${category}`)}
            className="inline-block"
          >
            <Badge 
              variant="outline" 
              className={`${sizeClasses} ${categoryColor} transition-colors cursor-pointer font-medium border`}
            >
              {t(`blog.categories.${category}`)}
            </Badge>
          </Link>
        </motion.div>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap items-center gap-1.5"
        >
          {showLabels && (
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Tag className="w-3 h-3" />
              {t("blog.tagsLabel")}:
            </span>
          )}
          {tags.slice(0, 5).map((tag, index) => (
            <motion.div
              key={tag}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <Link 
                to={localizedPath(`/blog?tag=${encodeURIComponent(tag)}`)}
                className="inline-block"
              >
                <Badge 
                  variant="secondary"
                  className={`${sizeClasses} hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer`}
                >
                  #{tag}
                </Badge>
              </Link>
            </motion.div>
          ))}
          {tags.length > 5 && (
            <Badge variant="outline" className={`${sizeClasses} text-muted-foreground`}>
              +{tags.length - 5}
            </Badge>
          )}
        </motion.div>
      )}
    </div>
  );
};
