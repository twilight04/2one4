import prisma from "@/lib/prisma";
import LetterModal from "./letter-modal";
import { redirect } from "next/navigation";

export default async function LetterContent({ id }: { id: string }) {
  const letter = await prisma.letter.findUnique({
    where: {
      id,
    },
  });

  if (!letter) return redirect("/");

  return <LetterModal key={letter?.id} letter={letter} />;
}
