import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { BookOpen, Users, Globe, Award } from "lucide-react";

const stats = [
  { key: "articles", value: "150+", icon: BookOpen },
  { key: "readers", value: "50K+", icon: Users },
  { key: "countries", value: "80+", icon: Globe },
  { key: "experience", value: "15+", icon: Award },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

export const BlogStatsSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-muted/50 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
      
      <div className="container-wide relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.key}
                variants={itemVariants}
                className="text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <motion.div
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="text-3xl md:text-4xl font-bold text-foreground mb-2"
                >
                  {stat.value}
                </motion.div>
                <p className="text-muted-foreground text-sm font-medium">
                  {t(`blog.stats.${stat.key}`)}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
