import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const features = [
  {
    title: "Sponge Play Zone",
    nameZh: "趣味海绵区",
    description: "Dive into colorful foam cubes for soft landings and endless fun. Perfect for trampoline tricks and cool stunts safely.",
    color: "from-cyan-500 to-blue-600",
  },
  {
    title: "Plum Blossom Piles",
    nameZh: "梅花桩",
    description: "Unique pillar design that attracts attention and provides diverse exercise experiences for children of all skill levels.",
    color: "from-purple-600 to-indigo-700",
  },
  {
    title: "Inflatable Football",
    nameZh: "花式足球区",
    description: "Innovative football training zone combining skills elements with exciting entertainment for a fresh learning experience.",
    color: "from-green-500 to-emerald-600",
  },
  {
    title: "Slam Dunk Zone",
    nameZh: "花式灌篮区",
    description: "Experience NBA-style dunking! Use trampoline bounce to soar and slam like a basketball pro. Feel the thrill of flying.",
    color: "from-orange-500 to-amber-600",
  },
  {
    title: "Skyrider",
    nameZh: "空中滑索",
    description: "Aerial zipline activity offering a unique flying adventure. Glide through the park for an exciting adventure experience.",
    color: "from-yellow-500 to-orange-600",
  },
  {
    title: "360° Bicycle",
    nameZh: "360°自行车",
    description: "Revolutionary rotating bike experience. Break free from traditional cycling and enjoy 360-degree freedom.",
    color: "from-pink-500 to-rose-600",
  },
  {
    title: "Climbing Wall",
    nameZh: "极限攀岩区",
    description: "Not just a sport but an art form. Climb the 'rock ballet' like Spider-Man reaching for the stars.",
    color: "from-violet-600 to-purple-700",
  },
  {
    title: "Adventure Challenge",
    nameZh: "拓展闯关",
    description: "Unique challenge courses designed to spark curiosity and creativity. Overcome obstacles with teamwork.",
    color: "from-fuchsia-500 to-pink-600",
  },
  {
    title: "Free Jump Zone",
    nameZh: "自由蹦床区",
    description: "Large interconnected trampolines for freestyle jumping, wall walking, and gravity-defying fun. Ultimate stress relief.",
    color: "from-blue-600 to-cyan-600",
  },
  {
    title: "Pro Trampoline Zone",
    nameZh: "专业蹦床区",
    description: "Professional-grade trampolines with higher bounce for gymnastic training and advanced aerial maneuvers.",
    color: "from-red-600 to-orange-600",
  },
  {
    title: "Battle Stick Arena",
    nameZh: "打斗棍区",
    description: "Foam stick battle arena combining balance and combat. Safe padded weapons for exciting duels on elevated platforms.",
    color: "from-teal-500 to-green-600",
  },
  {
    title: "Dodgeball Zone",
    nameZh: "躲避球区",
    description: "Classic trampoline dodgeball with elastic bounce dynamics. Complete with safety padding for team competitions.",
    color: "from-amber-500 to-yellow-600",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export const TrampolineFeaturesSection = () => {
  return (
    <section id="features" className="section-padding bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Trampoline Park Features
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-3 mb-6">
            Complete <span className="text-gradient">Attraction Zones</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Our trampoline parks feature diverse activity zones designed for maximum engagement 
            and repeat visits. Each zone offers unique experiences for different skill levels and ages.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              className="group relative bg-card rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-heading font-bold">{feature.title}</h3>
                  <CheckCircle className="w-5 h-5 text-primary opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-xs text-muted-foreground mb-3 font-medium">{feature.nameZh}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Hover Effect Border */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground mb-4">
            Mix and match zones to create the perfect park for your space and budget
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full shadow-soft">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>Modular Design</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full shadow-soft">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>Custom Layouts</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full shadow-soft">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>Scalable Solutions</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
