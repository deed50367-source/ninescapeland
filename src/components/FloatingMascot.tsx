import { motion } from "framer-motion";
import mascotPlayground from "@/assets/mascot-playground.png";
import mascotTrampoline from "@/assets/mascot-trampoline.png";
import mascotNinja from "@/assets/mascot-ninja.png";
import mascotSoftplay from "@/assets/mascot-softplay.png";

const mascotImages = {
  playground: mascotPlayground,
  trampoline: mascotTrampoline,
  ninja: mascotNinja,
  softplay: mascotSoftplay,
};

interface FloatingMascotProps {
  type: keyof typeof mascotImages;
  position?: "left" | "right";
  className?: string;
}

export const FloatingMascot = ({ 
  type, 
  position = "right",
  className = "" 
}: FloatingMascotProps) => {
  const positionClasses = position === "right" 
    ? "right-4 md:right-8 lg:right-12" 
    : "left-4 md:left-8 lg:left-12";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className={`fixed bottom-24 ${positionClasses} z-40 pointer-events-none ${className}`}
    >
      <motion.img
        src={mascotImages[type]}
        alt="Ball mascot"
        className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain drop-shadow-xl"
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 2, -2, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};
