"use client";

import { useState } from "react";
import EnvelopeCard from "./envelope-card";
import LetterModal from "./letter-modal";
import { Letter } from "@/app/generated/prisma/client";
import { AnimatePresence } from "framer-motion";

export default function LettersGrid({ letters }: { letters: Letter[] }) {
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {letters.map((letter) => (
          <EnvelopeCard
            key={letter.id}
            letter={letter}
            onOpen={() => setSelectedLetter(letter)}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedLetter && (
          <LetterModal
            key="modal" // key is important for AnimatePresence
            letter={selectedLetter}
            onClose={() => setSelectedLetter(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
