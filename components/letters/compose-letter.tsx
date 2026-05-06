"use client";

import { useState, useTransition, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CiPaperplane } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { composeLetterAction } from "@/app/actions/compose-letter.action";

export default function ComposeLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const [isSending, startSending] = useTransition();

  const hiddenInputRef = useRef<HTMLTextAreaElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null); // New ref for the cursor

  const MAX_CHARS = 500;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => hiddenInputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  // FIXED SYNC SCROLL: Only scroll if the cursor is near the bottom
  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest", // This prevents the "jumping to bottom" issue
      });
    }
  }, [content]);

  const handleSend = async () => {
    if (!content.trim()) return;
    startSending(async () => {
      const { success } = await composeLetterAction(content);
      if (success) {
        setIsOpen(false);
        setContent("");
      }
    });
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="group relative inline-flex items-center gap-3 bg-stone-800 text-stone-100 px-10 py-4 rounded-full font-bold transition-all hover:bg-rose-900 active:scale-95"
      >
        <CiPaperplane className="w-6 h-6 text-rose-300" />
        <span className="tracking-wide text-lg font-serif">Write a Letter</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSending && setIsOpen(false)}
              className="absolute inset-0 bg-stone-200/60 backdrop-blur-md"
            />

            <textarea
              ref={hiddenInputRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={MAX_CHARS}
              className="absolute opacity-0 pointer-events-none"
              aria-hidden="true"
            />

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100vh", opacity: 0 }}
              onClick={() => hiddenInputRef.current?.focus()}
              className="relative w-full max-w-lg bg-[#fdf6e3] shadow-2xl rounded-sm border border-stone- stone-200 h-[65vh] md:h-[70vh] flex flex-col overflow-hidden cursor-text"
              style={{
                backgroundImage:
                  "linear-gradient(#e5e5e5 1px, transparent 1px)",
                backgroundSize: "100% 2.5rem",
              }}
            >
              <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar {
                  display: none;
                }
                .no-scrollbar {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
              `}</style>

              <div className="absolute left-10 top-0 bottom-0 w-[1px] bg-red-200/40" />

              <header className="relative z-20 p-8 pl-16 flex justify-between items-center bg-[#fdf6e3]">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest leading-none">
                    New Signal
                  </span>
                  <span className="text-[9px] text-rose-800/60 font-mono italic leading-none mt-1">
                    Unspoken Frequency
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  className="text-stone-300 hover:text-rose-800 transition-all"
                >
                  <RxCross2 className="w-6 h-6" />
                </button>
              </header>

              <div
                ref={scrollContainerRef}
                className="relative z-10 flex-grow overflow-y-auto px-10 pl-16 py-2 no-scrollbar scroll-smooth touch-pan-y flex flex-col justify-start" // Added flex flex-col justify-start
              >
                <div className="font-handwriting text-3xl text-stone-700 leading-[2.5rem] antialiased break-words whitespace-pre-wrap text-left w-full pt-4">
                  {/* Added text-left, w-full, and pt-4 for top spacing */}
                  {content}
                  <span
                    ref={cursorRef}
                    className="inline-block w-2 h-8 bg-rose-800/30 ml-1 animate-pulse align-middle"
                  />
                  {!content && (
                    <span className="text-stone-200 pointer-events-none">
                      Tell the frequency...
                    </span>
                  )}
                </div>
                <div className="h-24 flex-shrink-0" />{" "}
                {/* Added flex-shrink-0 */}
              </div>

              <footer className="relative z-20 p-8 pl-16 flex flex-col items-end gap-1 bg-gradient-to-t from-[#fdf6e3] via-[#fdf6e3] to-transparent">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSend();
                  }}
                  disabled={isSending || !content.trim()}
                  className={`group flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] transition-all ${
                    isSending
                      ? "text-stone-300 animate-pulse"
                      : "text-rose-800 hover:tracking-[0.3em]"
                  }`}
                >
                  {isSending ? "Broadcasting..." : "[ Seal & Send ]"}
                  {!isSending && (
                    <CiPaperplane className="w-5 h-5 group-hover:translate-x-1" />
                  )}
                </button>
                <div className="text-[9px] font-mono text-stone-300 opacity-60">
                  {content.length} / {MAX_CHARS}
                </div>
              </footer>

              <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
