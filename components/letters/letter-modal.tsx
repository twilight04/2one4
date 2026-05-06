"use client";

import { motion, AnimatePresence } from "framer-motion";
import LetterPaper from "./letter-paper";
import { Letter } from "@/app/generated/prisma/client";

export default function LetterModal({
  letter,
  onClose,
}: {
  letter: Letter;
  onClose: () => void;
}) {
  return (
    /* We use AnimatePresence in the parent component (LettersGrid) 
       to ensure this exit animation plays! */
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { delay: 0.3 } }}
      className="fixed inset-0 z-50 bg-stone-200/40 backdrop-blur-md flex items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div
        /* Entrance: Slides up and pops in */
        initial={{ y: 100, opacity: 0, scale: 0.9, rotate: -2 }}
        animate={{
          y: 0,
          opacity: 1,
          scale: 1,
          rotate: 0,
          transition: { type: "spring", damping: 20, stiffness: 100 },
        }}
        /* Exit: Folds and slides down (the "Tuck Away" animation) */
        exit={{
          y: 200,
          opacity: 0,
          scale: 0.8,
          rotate: 5,
          transition: { duration: 0.4, ease: "backIn" },
        }}
        className="w-full max-w-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <LetterPaper letter={letter} />

        {/* Improved Close Button with Hover Effect */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="mt-8 block mx-auto text-xs font-bold uppercase tracking-[0.2em] text-stone-400 hover:text-rose-800 transition-colors bg-white/50 px-4 py-2 rounded-full shadow-sm"
        >
          Return to Void
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
