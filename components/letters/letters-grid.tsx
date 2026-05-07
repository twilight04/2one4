import EnvelopeCard from "./envelope-card";
import { Letter } from "@/app/generated/prisma/client";
import Link from "next/link";

export default function LettersGrid({ letters }: { letters: Letter[] }) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {letters.map((letter) => (
          <Link key={letter.id} href={`/letter/${letter.id}`}>
            <EnvelopeCard />
          </Link>
        ))}
      </div>
    </>
  );
}
