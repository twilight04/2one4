"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LetterPaper from "./letter-paper";
import { Letter } from "@/app/generated/prisma/client";
import { usePathname, useRouter } from "next/navigation";
import { CiLink } from "react-icons/ci";

export default function LetterModal({ letter }: { letter: Letter }) {
  const pathname = usePathname();
  const isOpen = pathname === `/letter/${letter.id}`;
  const router = useRouter();

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleClose = () => {
    router.push("/");
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/letter/${letter.id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy signal:", err);
    }
  };

  return isOpen ? (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { delay: 0.3 } }}
        className="fixed inset-0 z-50 bg-stone-200/40 backdrop-blur-md flex items-center justify-center p-6"
        onClick={handleClose}
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

          <div className="mt-8 flex items-center gap-4">
            {/* Share / Copy Link Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 hover:text-rose-800 transition-colors bg-white/50 px-5 py-3 rounded-full shadow-sm backdrop-blur-sm"
            >
              <CiLink className="w-4 h-4" />
              {copied ? "Signal Captured" : "Share Frequency"}
            </motion.button>

            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 hover:text-rose-800 transition-colors bg-white/30 px-5 py-3 rounded-full shadow-sm backdrop-blur-sm"
              onClick={handleClose}
            >
              Return to Void
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  ) : null;
}
