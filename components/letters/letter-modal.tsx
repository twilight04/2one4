"use client";

import { useEffect } from "react"; //
import { motion } from "framer-motion";
import LetterPaper from "./letter-paper";
import { Letter } from "@/app/generated/prisma/client";

export default function LetterModal({
  letter,
  onClose,
}: {
  letter: Letter;
  onClose: () => void;
}) {
  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { delay: 0.3 } }}
      className="fixed inset-0 z-50 bg-stone-200/40 backdrop-blur-md flex items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 100, opacity: 0, scale: 0.9, rotate: -2 }}
        animate={{
          y: 0,
          opacity: 1,
          scale: 1,
          rotate: 0,
          transition: { type: "spring", damping: 20, stiffness: 100 },
        }}
        exit={{
          y: 200,
          opacity: 0,
          scale: 0.8,
          rotate: 5,
          transition: { duration: 0.4, ease: "backIn" },
        }}
        className="w-full max-w-lg relative flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <LetterPaper letter={letter} />

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="mt-8 block mx-auto text-xs font-bold uppercase tracking-[0.2em] text-stone-400 hover:text-rose-800 transition-colors bg-white/50 px-6 py-3 rounded-full shadow-sm backdrop-blur-sm"
        >
          Return to Void
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
