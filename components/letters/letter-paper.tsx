"use client";

import { Letter } from "@/app/generated/prisma/client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function LetterPaper({ letter }: { letter: Letter }) {
  const [displayedContent, setDisplayedContent] = useState("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  const STAGGER_SPEED = 30; // Milliseconds per character

  // 1. The Typing Simulation
  useEffect(() => {
    let currentIndex = 0;
    const fullText = letter.content;

    // Safety check: don't start if there's no content
    if (!fullText) return;

    const interval = setInterval(() => {
      // Crucial: Check if we are still within the bounds of the string
      if (currentIndex < fullText.length) {
        const nextChar = fullText[currentIndex];

        // Only append if nextChar actually exists
        if (typeof nextChar !== "undefined") {
          setDisplayedContent((prev) => prev + nextChar);
        }

        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, STAGGER_SPEED);

    return () => clearInterval(interval);
  }, [letter.content]);

  // 2. The Auto-Scroll (Identical to ComposeLetter logic)
  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [displayedContent]);

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="relative w-full max-w-lg bg-[#fdf6e3] shadow-2xl rounded-sm border border-stone-200 h-[70vh] flex flex-col overflow-hidden"
      style={{
        backgroundImage: "linear-gradient(#e5e5e5 1px, transparent 1px)",
        backgroundSize: "100% 2.5rem",
      }}
    >
      <div className="absolute left-10 top-0 bottom-0 w-[1px] bg-red-200/60" />

      {/* Header - Fixed */}
      <header className="relative z-20 p-8 pl-16 flex justify-between items-center bg-[#fdf6e3] border-b border-stone-200/50">
        <div className="flex flex-col">
          <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest leading-none">
            {new Date(letter.createdAt).toLocaleDateString(undefined, {
              dateStyle: "long",
            })}
          </span>
          <span className="text-[9px] text-rose-800/60 font-mono italic leading-none mt-1">
            Signal Received
          </span>
        </div>
        <span className="text-[10px] font-mono text-rose-800 font-bold tracking-tighter opacity-40">
          SIGNAL_214Hz
        </span>
      </header>

      {/* Content Area - Scrollable */}
      <div
        ref={scrollContainerRef}
        className="relative z-10 flex-grow overflow-y-auto px-10 pl-16 py-2 no-scrollbar touch-pan-y flex flex-col justify-start"
      >
        <div className="font-handwriting text-3xl text-stone-800/90 leading-[2.5rem] antialiased break-words whitespace-pre-wrap text-left w-full pt-4">
          {displayedContent}
          {/* The blinking cursor simulation */}
          <span
            ref={cursorRef}
            className="inline-block w-2 h-8 bg-rose-800/30 ml-1 animate-pulse align-middle"
          />
        </div>
      </div>

      {/* Footer - Floating style */}
      <footer className="relative z-20 p-8 pl-16 flex flex-col items-end gap-1 bg-gradient-to-t from-[#fdf6e3] via-[#fdf6e3] to-transparent">
        <span className="italic font-serif text-stone-400 text-sm opacity-60">
          — Decoded from the frequency
        </span>
      </footer>

      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
    </motion.div>
  );
}
