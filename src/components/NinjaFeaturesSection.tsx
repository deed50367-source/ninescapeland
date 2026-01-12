import { motion } from "framer-motion";
import { Mountain, Target, Users, Zap } from "lucide-react";

const ninjaFeatures = [
  {
    icon: Mountain,
    title: "High Altitude Challenges",
    description: "Push your limits with climbing walls, ziplines, and aerial nets. Experience thrilling adventures in a completely safe environment.",
    color: "from-purple-600 to-indigo-700",
  },
  {
    icon: Target,
    title: "Adventure Obstacles",
    description: "Explore unique challenge courses filled with wisdom and fun. Overcome barriers, solve puzzles, and work together as a team.",
    color: "from-orange-500 to-amber-600",
  },
  {
    icon: Users,
    title: "Team Building",
    description: "Perfect for groups seeking adventure and collaboration. Each module is carefully designed to inspire curiosity and creativity.",
    color: "from-pink-500 to-rose-600",
  },
  {
    icon: Zap,
    title: "Physical Development",
    description: "Challenge yourself with obstacles that build strength, agility, and confidence. Suitable for all ages and fitness levels.",
    color: "from-cyan-500 to-blue-600",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const NinjaFeaturesSection = () => {
  return (
    <section id="ninja-features" className="section-padding bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Indoor Ninja Park
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-3 mb-6">
            Challenge Heights, <span className="text-gradient">Conquer Adventures</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Our ninja warrior courses combine high-altitude challenges with adventure obstacles, 
            providing an unforgettable experience that builds confidence and teamwork skills.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {ninjaFeatures.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              className="group relative bg-card rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 text-center"
            >
              {/* Icon */}
              <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-heading font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl`} />
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: "50+", label: "Obstacle Types" },
            { value: "Custom", label: "Layout Design" },
            { value: "All Ages", label: "Suitable For" },
            { value: "3D", label: "Design Rendering" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl md:text-4xl font-heading font-bold text-primary mb-2">
                {stat.value}
              </p>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
