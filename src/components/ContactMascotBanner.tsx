import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Sparkles, Heart, MessageCircle, X } from "lucide-react";
import mascotContact from "@/assets/mascot-contact.png";

const chatBubbles = [
  { key: "bubble1", default: "Hi! 👋 Ready to create something amazing?" },
  { key: "bubble2", default: "Let's build your dream playground! 🎪" },
  { key: "bubble3", default: "Got questions? I'm here to help! 💬" },
  { key: "bubble4", default: "Your project is going to be awesome! ✨" },
  { key: "bubble5", default: "Click below to get started! 👇" },
];

export const ContactMascotBanner = () => {
  const { t } = useTranslation();
  const [showBubble, setShowBubble] = useState(false);
  const [currentBubbleIndex, setCurrentBubbleIndex] = useState(0);
  const [clickCount, setClickCount] = useState(0);

  const handleMascotClick = () => {
    if (!showBubble) {
      setShowBubble(true);
    } else {
      // Cycle through bubbles on subsequent clicks
      setCurrentBubbleIndex((prev) => (prev + 1) % chatBubbles.length);
    }
    setClickCount((prev) => prev + 1);
  };

  const closeBubble = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowBubble(false);
  };

  // Auto-show bubble after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBubble(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-accent/10 to-background overflow-hidden">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          {/* Mascot with Speech Bubble */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring" }}
            className="relative cursor-pointer"
            onClick={handleMascotClick}
          >
            {/* Speech Bubble */}
            <AnimatePresence>
              {showBubble && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  transition={{ type: "spring", damping: 20, stiffness: 300 }}
                  className="absolute -top-20 md:-top-24 left-1/2 -translate-x-1/2 z-10 min-w-[200px] md:min-w-[250px]"
                >
                  <div className="relative bg-card border-2 border-primary/20 rounded-2xl px-4 py-3 shadow-lg">
                    <button
                      onClick={closeBubble}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-muted rounded-full flex items-center justify-center hover:bg-muted-foreground/20 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    <p className="text-sm md:text-base font-medium text-center">
                      {t(`contact.mascot.${chatBubbles[currentBubbleIndex].key}`, chatBubbles[currentBubbleIndex].default)}
                    </p>
                    {/* Bubble tail */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-card border-r-2 border-b-2 border-primary/20 rotate-45" />
                  </div>
                  {clickCount > 0 && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs text-muted-foreground text-center mt-3"
                    >
                      {t("contact.mascot.clickMore", "Click for more!")}
                    </motion.p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

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

            {/* Mascot Image */}
            <motion.img
              src={mascotContact}
              alt="Friendly mascot welcoming you"
              className="w-40 h-40 md:w-56 md:h-56 object-contain drop-shadow-xl"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            />

            {/* Click hint */}
            {!showBubble && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap"
              >
                {t("contact.mascot.clickMe", "Click me! 👆")}
              </motion.div>
            )}
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