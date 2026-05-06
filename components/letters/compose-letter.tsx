"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CiPaperplane } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { composeLetterAction } from "@/app/actions/compose-letter.action";

export default function ComposeLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const [isSending, startSending] = useTransition();

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
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSending && setIsOpen(false)}
              className="absolute inset-0 bg-stone-200/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ y: "100vh", opacity: 0 }}
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
              className="relative w-full max-w-lg bg-[#fdf6e3] p-12 shadow-[0_30px_60px_rgba(0,0,0,0.12)] rounded-sm border border-stone-200 min-h-[550px] flex flex-col"
              style={{
                backgroundImage:
                  "linear-gradient(#e5e5e5 1px, transparent 1px)",
                backgroundSize: "100% 2.5rem",
              }}
            >
              <div className="absolute left-12 top-0 bottom-0 w-[1px] bg-red-200/50" />

              <div className="relative z-10 h-full flex flex-col flex-grow">
                <header className="mb-4 flex justify-between items-center border-b border-stone-100 pb-2">
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
                    className="text-stone-400 hover:text-rose-800 transition-all hover:rotate-90"
                  >
                    <RxCross2 className="w-7 h-7" />
                  </button>
                </header>

                {/* Main Content Area */}
                <div className="relative flex-grow">
                  {/* The invisible spacer that pushes text away from the button */}
                  <div
                    className="float-right w-40 h-16 mt-[28rem] shape-outside-square"
                    style={{ shapeOutside: "inset(0 0 0 0)" }}
                  />

                  <textarea
                    autoFocus
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Tell the frequency..."
                    className="absolute inset-0 w-full h-full bg-transparent font-handwriting text-3xl text-stone-700 leading-[2.5rem] focus:outline-none resize-none placeholder:text-stone-200 antialiased scrollbar-hide"
                    disabled={isSending}
                  />

                  {/* Mirroring the text in a hidden div to maintain height if needed, 
                      but for a fixed-size paper, the absolute textarea works best. */}
                </div>

                {/* Bottom Action Area */}
                <div className="flex justify-end items-end mt-4">
                  <div className="flex flex-col items-end gap-1">
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

                    <span className="text-[9px] text-stone-300 font-mono mr-2 opacity-60">
                      {content.length} characters
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
