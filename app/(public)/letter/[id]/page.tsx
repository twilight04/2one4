import HomeLayout from "@/components/letters/layout/home-layout";
import LetterContent from "@/components/letters/letter-content";

export default async function LetterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <HomeLayout />
      <LetterContent id={id} />
    </>
  );
}
