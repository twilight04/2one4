"use client";

import { Letter } from "@/app/generated/prisma/client";
import { motion } from "framer-motion";

export default function LetterPaper({ letter }: { letter: Letter }) {
  // Split the content into an array of characters
  const characters = Array.from(letter.content);

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03, // Speed of "writing"
      },
    },
  };

  // Animation variants for each character
  const childVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.1,
      },
    },
  };

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="relative w-full max-w-lg bg-[#fdf6e3] p-10 shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] rounded-sm min-h-[450px] border border-stone-200"
      style={{
        backgroundImage: "linear-gradient(#e5e5e5 1px, transparent 1px)",
        backgroundSize: "100% 2.5rem", // Adjusted to match text height
        lineHeight: "2.5rem",
      }}
    >
      {/* Red vertical margin line */}
      <div className="absolute left-10 top-0 bottom-0 w-[1px] bg-red-200/60" />

      <div className="relative z-10 pl-6">
        <header className="mb-10 flex justify-between items-baseline border-b border-stone-200 pb-2">
          <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">
            {new Date(letter.createdAt).toLocaleDateString(undefined, {
              dateStyle: "long",
            })}
          </span>
          <span className="text-[10px] font-mono text-rose-800 font-bold tracking-tighter">
            SIGNAL_214Hz
          </span>
        </header>

        {/* Typing Animation Area */}
        <motion.div
          className="font-handwriting text-3xl text-stone-800/90 leading-[2.5rem] antialiased"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {characters.map((char, index) => (
            <motion.span key={index} variants={childVariants}>
              {char}
            </motion.span>
          ))}
        </motion.div>

        <footer className="mt-16 text-right italic font-serif text-stone-400 text-sm opacity-60">
          — Written in the frequency
        </footer>
      </div>

      {/* Subtle paper texture overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
    </motion.div>
  );
}
