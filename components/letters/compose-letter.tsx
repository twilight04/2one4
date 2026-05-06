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
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollableAreaRef = useRef<HTMLDivElement>(null);

  const MAX_CHARS = 500;

  // 1. Background Scroll Lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // 2. Auto-resize and Auto-scroll
  useEffect(() => {
    const textarea = textareaRef.current;
    const scrollContainer = scrollableAreaRef.current;
    if (!textarea || !scrollContainer) return;

    // Reset height to shrink if text is deleted
    textarea.style.height = "0px";
    const newHeight = textarea.scrollHeight;
    textarea.style.height = `${newHeight}px`;

    // Always scroll the container to the bottom as the user types
    scrollContainer.scrollTo({
      top: scrollContainer.scrollHeight,
      behavior: "smooth",
    });
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
        className="group relative inline-flex items-center gap-3 bg-stone-800 text-stone-100 px-10 py-4 rounded-full font-bold transition-all hover:bg-rose-900 hover:shadow-[0_10px_40px_rgba(159,18,57,0.15)] active:scale-95"
      >
        <CiPaperplane className="w-6 h-6 transition-transform group-hover:rotate-12 text-rose-300" />
        <span className="tracking-wide text-lg font-serif">Write a Letter</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSending && setIsOpen(false)}
              className="absolute inset-0 bg-stone-200/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100vh", opacity: 0 }}
              className="relative w-full max-w-lg bg-[#fdf6e3] shadow-2xl rounded-sm border border-stone-200 flex flex-col overflow-hidden h-[60vh] md:h-[70vh]"
              style={{
                backgroundImage:
                  "linear-gradient(#e5e5e5 1px, transparent 1px)",
                backgroundSize: "100% 2.5rem",
              }}
            >
              <div className="absolute left-10 top-0 bottom-0 w-[1px] bg-red-200/40" />

              {/* Fixed Header */}
              <header className="relative z-20 p-8 pl-16 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">
                    New Signal
                  </span>
                  <span className="text-[9px] text-rose-800/60 font-mono italic">
                    Unspoken Frequency
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-stone-300 hover:text-rose-800 transition-all"
                >
                  <RxCross2 className="w-6 h-6" />
                </button>
              </header>

              {/* Scrollable Content Area */}
              <div
                ref={scrollableAreaRef}
                className="relative z-10 flex-grow overflow-y-auto px-8 pl-16 py-2 scroll-smooth scrollbar-hide"
              >
                <textarea
                  ref={textareaRef}
                  autoFocus
                  maxLength={MAX_CHARS}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Tell the frequency..."
                  className="w-full bg-transparent font-handwriting text-3xl text-stone-700 leading-[2.5rem] focus:outline-none resize-none placeholder:text-stone-200 antialiased overflow-hidden min-h-full"
                  disabled={isSending}
                />
                {/* Spacer to allow scrolling past the last line */}
                <div className="h-20" />
              </div>

              {/* Fixed Footer */}
              <footer className="relative z-20 p-8 pl-16 bg-gradient-to-t from-[#fdf6e3] via-[#fdf6e3] to-transparent flex flex-col items-end gap-1">
                <button
                  onClick={handleSend}
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
                <span
                  className={`text-[9px] font-mono mr-2 ${content.length >= MAX_CHARS ? "text-rose-600 font-bold" : "text-stone-300"}`}
                >
                  {content.length} / {MAX_CHARS}
                </span>
              </footer>

              <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
