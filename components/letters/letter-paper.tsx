"use client";

import { Letter } from "@/app/generated/prisma/client";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function LetterPaper({ letter }: { letter: Letter }) {
  const characters = Array.from(letter.content);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic: watches for new characters added to the DOM
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const observer = new MutationObserver(() => {
      container.scrollTop = container.scrollHeight;
    });

    // Observe when the character spans are added
    observer.observe(container, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.1 },
    },
  };

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="relative w-full max-w-lg bg-[#fdf6e3] shadow-2xl rounded-sm border border-stone-200 max-h-[70vh] flex flex-col overflow-hidden"
      style={{
        backgroundImage: "linear-gradient(#e5e5e5 1px, transparent 1px)",
        backgroundSize: "100% 2.5rem",
        lineHeight: "2.5rem",
      }}
    >
      {/* Ensure scrollbar is hidden via CSS */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="absolute left-10 top-0 bottom-0 w-[1px] bg-red-200/60" />

      <div
        ref={scrollContainerRef}
        className="relative z-10 flex-grow overflow-y-auto p-10 pl-16 no-scrollbar"
      >
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

        <motion.div
          className="font-handwriting text-3xl text-stone-800/90 leading-[2.5rem] antialiased break-words whitespace-pre-wrap"
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

      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
    </motion.div>
  );
}
