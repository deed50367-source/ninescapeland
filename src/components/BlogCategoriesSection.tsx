import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { 
  Lightbulb, 
  TrendingUp, 
  Palette, 
  Shield, 
  Rocket,
  BookOpen
} from "lucide-react";

const categories = [
  { key: "tips", icon: Lightbulb, color: "bg-accent/10 text-accent" },
  { key: "trends", icon: TrendingUp, color: "bg-category-emerald/10 text-category-emerald" },
  { key: "guides", icon: BookOpen, color: "bg-category-blue/10 text-category-blue" },
  { key: "design", icon: Palette, color: "bg-category-pink/10 text-category-pink" },
  { key: "safety", icon: Shield, color: "bg-primary/10 text-primary" },
  { key: "business", icon: Rocket, color: "bg-category-blue/10 text-category-blue" },
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

export const BlogCategoriesSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-12 bg-muted/30">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            {t("blog.exploreTopics")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("blog.exploreTopicsDesc")}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.key}
                className="group relative p-6 bg-card rounded-lg border hover:border-primary/50 transition-all duration-300 hover:shadow-soft"
              >
                <div className={`w-12 h-12 mx-auto mb-4 rounded-lg ${category.color} flex items-center justify-center `}>
                  <Icon className="w-6 h-6 " />
                </div>
                <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                  {t(`blog.categories.${category.key}`)}
                </h3>
                
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
