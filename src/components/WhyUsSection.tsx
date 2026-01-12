import { motion } from "framer-motion";
import { 
  Shield, 
  Clock, 
  Globe2, 
  Paintbrush, 
  Award, 
  Wrench,
  Users,
  Factory
} from "lucide-react";

const features = [
  {
    icon: Paintbrush,
    title: "Custom Design",
    description: "Free 3D design service tailored to your space and brand. Our team creates unique themes that captivate visitors.",
  },
  {
    icon: Shield,
    title: "Safety Certified",
    description: "All products meet ASTM, TUV, CE, and international safety standards. Your visitors' safety is our priority.",
  },
  {
    icon: Globe2,
    title: "Global Shipping",
    description: "We ship to 50+ countries with professional logistics support. Door-to-door delivery available worldwide.",
  },
  {
    icon: Wrench,
    title: "3-Year Warranty",
    description: "Industry-leading 3-year warranty with lifetime technical support. We stand behind our quality.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock customer service to assist you at every stage, from design to installation.",
  },
  {
    icon: Factory,
    title: "Direct Factory",
    description: "Deal directly with the manufacturer. No middlemen means competitive pricing and quality control.",
  },
];

const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "50+", label: "Countries Served" },
  { value: "1000+", label: "Projects Completed" },
  { value: "200+", label: "Team Members" },
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

export const WhyUsSection = () => {
  return (
    <section id="why-us" className="section-padding bg-muted">
      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-3 mb-6">
            Your Trusted <span className="text-gradient">Partner</span> in Play
          </h2>
          <p className="text-muted-foreground text-lg">
            With over 15 years of experience, we've helped thousands of businesses create 
            exceptional indoor play experiences that drive growth and customer satisfaction.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={item}
              className="text-center p-6 bg-card rounded-2xl shadow-soft"
            >
              <div className="text-4xl md:text-5xl font-heading font-bold text-gradient mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              className="group p-6 bg-card rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                <feature.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 bg-card rounded-2xl shadow-soft"
        >
          <div className="text-center mb-8">
            <Award className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-heading font-bold">Certifications & Standards</h3>
            <p className="text-muted-foreground mt-2">
              Our products comply with international safety and quality standards
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {[
              "ISO 9001:2015",
              "ISO 14001:2015",
              "ISO 45001:2018",
              "CE Certified",
              "TUV Certified",
              "ASTM Compliant",
              "IAAPA Member",
            ].map((cert, index) => (
              <div
                key={index}
                className="px-6 py-3 bg-muted rounded-lg font-semibold text-foreground"
              >
                {cert}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
