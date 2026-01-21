import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { 
  Lightbulb, 
  TrendingUp, 
  Settings, 
  Palette, 
  Shield, 
  Users,
  Rocket,
  BookOpen
} from "lucide-react";

const categories = [
  { key: "tips", icon: Lightbulb, color: "from-amber-500 to-orange-500" },
  { key: "trends", icon: TrendingUp, color: "from-emerald-500 to-teal-500" },
  { key: "guides", icon: BookOpen, color: "from-blue-500 to-indigo-500" },
  { key: "design", icon: Palette, color: "from-pink-500 to-rose-500" },
  { key: "safety", icon: Shield, color: "from-violet-500 to-purple-500" },
  { key: "business", icon: Rocket, color: "from-cyan-500 to-blue-500" },
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
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.key}
                variants={itemVariants}
                className="group relative p-6 bg-card rounded-2xl border hover:border-primary/50 transition-all duration-300 hover:shadow-soft"
              >
                <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                  {t(`blog.categories.${category.key}`)}
                </h3>
                
                {/* Hover glow effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
