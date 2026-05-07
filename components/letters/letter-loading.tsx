// components/letters/letter-loading.tsx
"use client";

import { motion } from "framer-motion";

export default function LetterLoading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-stone-200/40 backdrop-blur-md">
      <div className="flex flex-col items-center gap-4">
        {/* Animated Radio-wave / Signal Rings */}
        <div className="relative flex items-center justify-center w-20 h-20">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: [0, 0.5, 0],
                scale: [0.8, 1.5, 2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.6,
                ease: "easeOut",
              }}
              className="absolute inset-0 border border-rose-800/30 rounded-full"
            />
          ))}
          <div className="w-2 h-2 bg-rose-800 rounded-full animate-pulse" />
        </div>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-[10px] font-mono tracking-[0.3em] text-rose-900/60 uppercase"
        >
          Intercepting Signal...
        </motion.span>
      </div>
    </div>
  );
}
