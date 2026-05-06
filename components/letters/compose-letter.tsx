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

  const MAX_CHARS = 500;

  // 1. Background Scroll Lock: Prevents the main page from scrolling while writing
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // 2. Auto-resize Textarea: Makes the paper grow as you type
  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to calculate correctly
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      // Set height to match content exactly
      textareaRef.current.style.height = `${scrollHeight}px`;
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
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="group relative inline-flex items-center gap-3 bg-stone-800 text-stone-100 px-10 py-4 rounded-full font-bold transition-all hover:bg-rose-900 hover:shadow-[0_10px_40px_rgba(159,18,57,0.15)] active:scale-95"
      >
        <CiPaperplane className="w-6 h-6 transition-transform group-hover:rotate-12 text-rose-300" />
        <span className="tracking-wide text-lg font-serif">Write a Letter</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSending && setIsOpen(false)}
              className="absolute inset-0 bg-stone-200/60 backdrop-blur-md"
            />

            {/* Paper Container */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                transition: { type: "spring", damping: 25, stiffness: 120 },
              }}
              exit={{
                y: "100vh",
                opacity: 0,
                transition: { duration: 0.5, ease: "backIn" },
              }}
              /* 
                 FIXED: 
                 - h-auto + max-h-[70vh]: Paper grows with content then stops.
                 - overflow-y-auto: Single scrollbar on the paper itself.
                 - touch-pan-y + overscroll-contain: Native feel for iPad/Mobile.
              */
              className="relative w-full max-w-lg bg-[#fdf6e3] shadow-[0_30px_60px_rgba(0,0,0,0.12)] rounded-sm border border-stone-200 h-auto max-h-[75vh] md:max-h-[70vh] flex flex-col overflow-y-auto scrollbar-hide touch-pan-y overscroll-contain"
              style={{
                backgroundImage:
                  "linear-gradient(#e5e5e5 1px, transparent 1px)",
                backgroundSize: "100% 2.5rem",
                lineHeight: "2.5rem",
              }}
            >
              {/* Red Margin Line */}
              <div className="absolute left-10 top-0 bottom-0 w-[1px] bg-red-200/50" />

              {/* Internal Content Area */}
              <div className="relative z-10 flex-grow p-8 md:p-10 pl-16 flex flex-col min-h-[400px]">
                <header className="mb-10 flex justify-between items-center border-b border-stone-100 pb-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest leading-none">
                      New Signal
                    </span>
                    <span className="text-[9px] text-rose-800/60 font-mono italic">
                      Unspoken Frequency
                    </span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-stone-300 hover:text-rose-800 transition-all hover:rotate-90"
                  >
                    <RxCross2 className="w-6 h-6" />
                  </button>
                </header>

                {/* 
                   Textarea: 
                   - No internal scrollbar (overflow-hidden).
                   - Height is controlled by the useEffect and content.
                */}
                <textarea
                  ref={textareaRef}
                  autoFocus
                  maxLength={MAX_CHARS}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Tell the frequency..."
                  className="w-full bg-transparent font-handwriting text-3xl text-stone-700 leading-[2.5rem] focus:outline-none resize-none placeholder:text-stone-200 antialiased overflow-hidden"
                  disabled={isSending}
                />

                {/* Footer */}
                <footer className="mt-16 mb-4 flex flex-col items-end gap-1">
                  <button
                    onClick={handleSend}
                    disabled={isSending || !content.trim()}
                    className={`group flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] transition-all ${
                      isSending
                        ? "text-stone-300 animate-pulse cursor-not-allowed"
                        : "text-rose-800 hover:tracking-[0.3em] active:scale-90"
                    }`}
                  >
                    {isSending ? "Broadcasting..." : "[ Seal & Send ]"}
                    {!isSending && (
                      <CiPaperplane className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    )}
                  </button>
                  <span
                    className={`text-[9px] font-mono mr-2 transition-colors ${
                      content.length >= MAX_CHARS
                        ? "text-rose-600 font-bold"
                        : "text-stone-300 opacity-60"
                    }`}
                  >
                    {content.length} / {MAX_CHARS}
                  </span>
                </footer>
              </div>

              {/* Texture Overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
