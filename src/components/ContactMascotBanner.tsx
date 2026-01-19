import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Sparkles, Heart, MessageCircle } from "lucide-react";
import mascotContact from "@/assets/mascot-contact.png";

export const ContactMascotBanner = () => {
  const { t } = useTranslation();

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-accent/10 to-background overflow-hidden">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          {/* Mascot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring" }}
            className="relative"
          >
            {/* Floating decorations */}
            <motion.div
              animate={{ y: [0, -8, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -left-4 w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center"
            >
              <Sparkles className="w-5 h-5 text-accent" />
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0], rotate: [0, -10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-2 -right-4 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center"
            >
              <Heart className="w-4 h-4 text-primary" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-1/2 -right-8 w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center"
            >
              <MessageCircle className="w-4 h-4 text-green-500" />
            </motion.div>

            <motion.img
              src={mascotContact}
              alt="Friendly mascot welcoming you"
              className="w-40 h-40 md:w-56 md:h-56 object-contain drop-shadow-xl"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center md:text-left max-w-md"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full mb-4">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium text-foreground">
                {t("contact.mascot.online", "We're online now!")}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-3">
              {t("contact.mascot.title", "Hi there! 👋")}
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              {t("contact.mascot.description", "We'd love to hear about your project! Our friendly team is ready to help you create an amazing play space.")}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};