import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const features = [
  {
    title: "Timing Ninja",
    nameZh: "忍者空间",
    description: "Ninja space combines parkour and trampoline with climbing walls, balance beams, rope courses and interactive elements. Perfect for all ages seeking challenges.",
    color: "from-purple-600 to-indigo-700",
  },
  {
    title: "Spider Wall",
    nameZh: "蜘蛛墙",
    description: "Interactive climbing wall combining special climbing holds with trampoline bounce. Perfect for professional training and exciting challenges.",
    color: "from-orange-500 to-amber-600",
  },
  {
    title: "Devil's Slide",
    nameZh: "魔鬼滑梯",
    description: "High-speed drop slide nearly 90 degrees, offering maximum excitement and adrenaline rush for thrill-seekers.",
    color: "from-pink-500 to-rose-600",
  },
  {
    title: "Inflatable Bumper Ball",
    nameZh: "充气碰碰球",
    description: "Wearable inflatable bumpers for safe collision fun. Enjoy bumping competition and safe bouncing action.",
    color: "from-violet-600 to-purple-700",
  },
  {
    title: "Battle Stick",
    nameZh: "打斗棍区",
    description: "Foam stick battle arena combining balance and combat. Safe padded weapons for exciting duels on elevated platforms.",
    color: "from-fuchsia-500 to-pink-600",
  },
  {
    title: "Dodgeball Zone",
    nameZh: "躲避球区",
    description: "Classic trampoline dodgeball with elastic bounce dynamics. Complete with safety padding for team competitions.",
    color: "from-blue-600 to-cyan-600",
  },
  {
    title: "Internet Celebrity Spider Tower",
    nameZh: "网红蜘蛛塔",
    description: "Viral attraction combining climbing challenges with spectacular design. Multi-level structure for brave climbers.",
    color: "from-red-600 to-orange-600",
  },
  {
    title: "Anti-Slope Slide",
    nameZh: "旱雪滑梯区",
    description: "European-style dry ski slide using special plastic material. Experience skiing sensation indoors safely year-round.",
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
