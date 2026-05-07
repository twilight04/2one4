import LetterContent from "@/components/letters/letter-content";
import LetterLoading from "@/components/letters/letter-loading";
import { Suspense } from "react";

export default async function InterceptedLetterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense key={id} fallback={<LetterLoading />}>
      <LetterContent id={id} />;
    </Suspense>
  );
}
