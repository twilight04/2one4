"use client";

import { Letter } from "@/app/generated/prisma/client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function LetterPaper({ letter }: { letter: Letter }) {
  const [displayedContent, setDisplayedContent] = useState("");
  const [fontSize, setFontSize] = useState(30);

  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const STAGGER_SPEED = 30;
  const MIN_FONT_SIZE = 12;

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

  // 2. Proactive Auto-Scaling Logic
  useEffect(() => {
    if (containerRef.current && textRef.current) {
      const containerHeight = containerRef.current.offsetHeight;
      const textHeight = textRef.current.scrollHeight;

      // Threshold: 85% of the container
      // If we exceed this, shrink by a tiny amount (0.2px)
      // to keep the scaling smooth and responsive to every new character
      if (textHeight > containerHeight * 0.85 && fontSize > MIN_FONT_SIZE) {
        setFontSize((prev) => prev - 0.2);
      }
    }
  }, [displayedContent]); // Run every time a character is added

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="relative w-full max-w-lg bg-[#fdf6e3] shadow-2xl rounded-sm border border-stone-200 h-[70vh] flex flex-col overflow-hidden"
      style={{
        backgroundImage: "linear-gradient(#e5e5e5 1px, transparent 1px)",
        // Synchronize line spacing with font size
        backgroundSize: `100% ${fontSize * 1.4}px`,
      }}
    >
      <div className="absolute left-10 top-0 bottom-0 w-[1px] bg-red-200/60 z-30" />

      <header className="relative z-20 p-8 pl-16 flex justify-between items-center bg-[#fdf6e3]">
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

      <div
        ref={containerRef}
        className="relative z-10 flex-grow overflow-hidden px-10 pl-16 py-2 flex flex-col justify-start"
      >
        <div
          ref={textRef}
          style={{
            fontSize: `${fontSize}px`,
            lineHeight: "1.4", // Consistent line height
            transition: "font-size 0.1s ease-out", // Fast transition for a "breathing" effect
          }}
          className="font-handwriting text-stone-800/90 antialiased break-words whitespace-pre-wrap text-left w-full pt-4"
        >
          {displayedContent}
          <span className="inline-block w-[0.1em] h-[1em] bg-rose-800/30 ml-1 animate-pulse align-middle" />
        </div>
      </div>

      <footer className="relative z-20 p-8 pl-16 flex flex-col items-end gap-1 bg-[#fdf6e3]">
        <span className="italic font-serif text-stone-400 text-sm opacity-60">
          — Decoded from the frequency
        </span>
      </footer>

      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
    </motion.div>
  );
}
