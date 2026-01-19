import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Users, Target, Rocket, Globe } from "lucide-react";
import mascotCelebrate from "@/assets/mascot-celebrate.png";
import mascotPointing from "@/assets/mascot-pointing.png";

export const AboutTeamSection = () => {
  const { t } = useTranslation();

  const milestones = [
    {
      year: "2008",
      title: t("aboutTeam.milestone1.title", "公司成立"),
      description: t("aboutTeam.milestone1.description", "在中国温州创立，开始专注于儿童游乐设备制造"),
    },
    {
      year: "2012",
      title: t("aboutTeam.milestone2.title", "国际拓展"),
      description: t("aboutTeam.milestone2.description", "开始出口到东南亚和中东市场"),
    },
    {
      year: "2016",
      title: t("aboutTeam.milestone3.title", "获得认证"),
      description: t("aboutTeam.milestone3.description", "获得ISO、CE、TUV等国际安全认证"),
    },
    {
      year: "2020",
      title: t("aboutTeam.milestone4.title", "全球业务"),
      description: t("aboutTeam.milestone4.description", "业务覆盖50+国家，完成1000+项目"),
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/50 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--primary)) 2px, transparent 2px), 
                           radial-gradient(circle at 75% 75%, hsl(var(--accent)) 2px, transparent 2px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative bg-card rounded-3xl p-8 md:p-10 shadow-soft overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
            
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">{t("aboutTeam.mission.title", "我们的使命")}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t("aboutTeam.mission.description", "为全球客户提供安全、创新、高品质的游乐设备解决方案，让每一个孩子都能享受快乐的童年。")}
                </p>
              </div>
            </div>

            {/* Mascot */}
            <motion.img
              src={mascotCelebrate}
              alt="Celebrating Mascot"
              className="absolute -bottom-4 -right-4 w-32 h-32 object-contain opacity-20 group-hover:opacity-40 transition-opacity"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="relative bg-card rounded-3xl p-8 md:p-10 shadow-soft overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-colors" />
            
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Rocket className="w-8 h-8 text-accent" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">{t("aboutTeam.vision.title", "我们的愿景")}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t("aboutTeam.vision.description", "成为全球领先的游乐设备制造商，以创新科技和卓越品质引领行业发展。")}
                </p>
              </div>
            </div>

            {/* Mascot */}
            <motion.img
              src={mascotPointing}
              alt="Pointing Mascot"
              className="absolute -bottom-4 -right-4 w-32 h-32 object-contain opacity-20 group-hover:opacity-40 transition-opacity"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
          </motion.div>
        </div>

        {/* Company Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            {t("aboutTeam.timelineLabel", "发展历程")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">
            {t("aboutTeam.timelineTitle", "我们的成长故事")}
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary hidden md:block" />

          <div className="space-y-8 md:space-y-0">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className={`flex flex-col md:flex-row items-center gap-4 md:gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className={`bg-card rounded-2xl p-6 shadow-soft hover:shadow-medium transition-shadow inline-block ${
                    index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'
                  }`}>
                    <div className="text-primary font-bold text-2xl mb-2">{milestone.year}</div>
                    <h4 className="font-semibold text-lg mb-1">{milestone.title}</h4>
                    <p className="text-muted-foreground text-sm max-w-xs">{milestone.description}</p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="hidden md:flex w-12 h-12 bg-primary rounded-full items-center justify-center flex-shrink-0 shadow-lg z-10">
                  <Globe className="w-5 h-5 text-primary-foreground" />
                </div>

                {/* Empty space for alignment */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-3xl p-8 md:p-12"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                {t("aboutTeam.teamTitle", "专业团队")}
              </h3>
              <p className="text-muted-foreground max-w-md">
                {t("aboutTeam.teamDescription", "200+ 名专业人员，包括设计师、工程师、安装团队和售后服务专家")}
              </p>
            </div>

            <div className="flex gap-8 md:gap-12">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-1">50+</div>
                <div className="text-sm text-muted-foreground">{t("aboutTeam.designers", "设计师")}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-accent mb-1">80+</div>
                <div className="text-sm text-muted-foreground">{t("aboutTeam.engineers", "工程师")}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-1">70+</div>
                <div className="text-sm text-muted-foreground">{t("aboutTeam.support", "服务团队")}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
