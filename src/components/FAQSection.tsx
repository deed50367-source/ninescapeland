import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const faqs = [
  {
    question: "What is the typical lead time for indoor playground equipment?",
    answer: "Production typically takes 25-35 days depending on the size and complexity of your project. Shipping time varies by destination - approximately 20-35 days for sea freight to most international ports. We can provide expedited options for urgent projects.",
  },
  {
    question: "Do you provide custom design services?",
    answer: "Yes! We offer free 3D design services tailored to your space dimensions and brand theme. Our design team will work with you to create a unique playground that maximizes your space and attracts customers. Simply provide your floor plan and requirements to get started.",
  },
  {
    question: "What safety certifications do your products have?",
    answer: "All our products comply with international safety standards including ASTM F1918 (USA), EN 1176 (Europe), AS 4685 (Australia), and more. We hold ISO 9001, ISO 14001, ISO 45001 certifications, and are members of IAAPA. TUV and CE certificates are provided with each project.",
  },
  {
    question: "What warranty do you offer?",
    answer: "We provide a comprehensive 3-year warranty on all equipment, which is the industry's leading warranty coverage. This includes free replacement of defective parts. We also offer lifetime technical support and maintenance guidance.",
  },
  {
    question: "Do you provide installation support?",
    answer: "Yes, we offer multiple installation options: 1) Detailed installation manuals with video guides for self-installation, 2) Remote video guidance during installation, 3) On-site installation by our trained technicians (available for an additional fee). Most clients successfully self-install with our guidance.",
  },
  {
    question: "What is the budget range for a commercial indoor playground?",
    answer: "Pricing depends on size, complexity, and features. A basic soft play area starts around $15,000, while comprehensive multi-level playgrounds range from $30,000-$200,000+. Trampoline parks typically range from $50,000-$500,000+. We provide detailed quotes based on your specific requirements.",
  },
  {
    question: "Can you ship to my country?",
    answer: "Yes! We ship to over 50 countries worldwide including USA, Canada, UK, Australia, UAE, Southeast Asia, Europe, and more. We handle all export documentation and can arrange door-to-door delivery or port-to-port shipping based on your preference.",
  },
  {
    question: "What materials do you use?",
    answer: "We use premium, eco-friendly materials including: galvanized steel tubes (2.2mm thickness), PVC-coated foam padding, commercial-grade LLDPE plastics, fire-retardant fabrics, and non-toxic paints. All materials are rigorously tested for safety and durability.",
  },
];

export const FAQSection = () => {
  return (
    <section id="faq" className="section-padding bg-muted">
      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-3 mb-6">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Find answers to common questions about our products, services, and process.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-xl px-6 shadow-soft border-none"
              >
                <AccordionTrigger className="text-left font-heading font-semibold hover:text-primary transition-colors py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};
