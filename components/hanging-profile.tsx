"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function HangingProfile() {
  return (
    <div className="relative w-[300px] h-[300px] flex items-center justify-center">
      {/* Floating background glowing ring */}
      <motion.div
        className="absolute w-[220px] h-[220px] rounded-full border border-primary/20 bg-primary/5 blur-sm"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main profile card with entrance and float animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={{ 
          opacity: 1, 
          scale: 1, 
          y: [0, -10, 0] 
        }}
        transition={{
          opacity: { duration: 0.8, ease: "easeOut" },
          scale: { duration: 0.8, ease: "easeOut" },
          y: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.8,
          }
        }}
        className="relative z-10 flex flex-col items-center justify-center p-6 w-[180px] rounded-full border border-border/40 bg-background/50 backdrop-blur-md shadow-2xl select-none"
      >
        <div className="relative w-24 h-24 rounded-full overflow-hidden border border-foreground/10 bg-foreground/5 flex items-center justify-center">
          <Image
            src="/profile.png"
            alt="Aditya Mani Tripathi"
            fill
            className="object-cover"
            priority
          />
        </div>
      </motion.div>
    </div>
  );
}
