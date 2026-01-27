import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Globe, FileText } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const languageConfig = {
  en: { name: "English", flag: "🇬🇧" },
  ar: { name: "العربية", flag: "🇸🇦" },
  de: { name: "Deutsch", flag: "🇩🇪" },
  es: { name: "Español", flag: "🇪🇸" },
  pt: { name: "Português", flag: "🇧🇷" },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 }
};

interface LanguageCount {
  language: string;
  count: number;
}

export const BlogLanguageStats = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language?.split('-')[0] || 'en';

  const { data: languageCounts, isLoading } = useQuery({
    queryKey: ["blog-language-counts"],
    queryFn: async () => {
      // Fetch counts for each language
      const languages = ['en', 'ar', 'de', 'es', 'pt'];
      const counts: LanguageCount[] = [];
      
      for (const lang of languages) {
        const { count, error } = await supabase
          .from("blog_posts")
          .select("*", { count: 'exact', head: true })
          .eq("status", "published")
          .eq("language", lang);
        
        if (!error) {
          counts.push({ language: lang, count: count || 0 });
        }
      }
      
      return counts;
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  const totalPosts = languageCounts?.reduce((sum, lc) => sum + lc.count, 0) || 0;

  if (isLoading) {
    return (
      <section className="py-8 bg-muted/30">
        <div className="container-wide">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-14 w-32 rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 bg-muted/30 border-b border-border/50">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2 mb-4"
        >
          <Globe className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">
            {t("blog.languageStats.title", "Articles by Language")}
          </span>
          <span className="text-sm font-semibold text-primary">
            ({totalPosts} {t("blog.languageStats.total", "total")})
          </span>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-center gap-3 flex-wrap"
        >
          {languageCounts?.map((lc) => {
            const config = languageConfig[lc.language as keyof typeof languageConfig];
            const isCurrentLang = lc.language === currentLang;
            
            return (
              <motion.div
                key={lc.language}
                variants={itemVariants}
                className={`
                  flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all
                  ${isCurrentLang 
                    ? 'bg-primary/10 border-primary/30 shadow-sm' 
                    : 'bg-card border-border hover:border-primary/20 hover:bg-muted/50'
                  }
                `}
              >
                <span className="text-xl" aria-hidden="true">{config?.flag}</span>
                <span className={`text-sm font-medium ${isCurrentLang ? 'text-primary' : 'text-foreground'}`}>
                  {config?.name}
                </span>
                <span className={`
                  flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full
                  ${isCurrentLang 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                  }
                `}>
                  <FileText className="w-3 h-3" />
                  {lc.count}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
