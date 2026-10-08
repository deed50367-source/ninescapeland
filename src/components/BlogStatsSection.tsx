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
                className="text-center group bg-card border border-border rounded-lg p-6"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-secondary flex items-center justify-center ">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <motion.div
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="text-3xl md:text-4xl font-heading font-bold text-primary mb-2"
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
