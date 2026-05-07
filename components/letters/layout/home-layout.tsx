import prisma from "@/lib/prisma";
import LettersGrid from "@/components/letters/letters-grid";
import Link from "next/link";
import { CiPaperplane } from "react-icons/ci";

export default async function HomeLayout() {
  const letters = await prisma.letter.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <main className="min-h-screen bg-[#f7efe5] selection:bg-rose-100 selection:text-rose-900">
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-rose-200/30 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-stone-300/40 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <header className="flex flex-col items-center text-center mb-20">
          <div className="mb-4 inline-block px-3 py-1 rounded-full border border-rose-200 bg-rose-50/50 text-[10px] font-mono tracking-[0.3em] text-rose-800 uppercase">
            Frequency 214.00 MHz
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-stone-800 mb-6 tracking-tight">
            214Hz
          </h1>
          <p className="max-w-md text-stone-500 font-serif italic text-lg leading-relaxed">
            &quot;A quiet space for the frequencies we carry but rarely
            broadcast...&quot;
          </p>
          <div className="mt-10">
            <Link
              href="/compose"
              scroll={false}
              className="group relative inline-flex items-center gap-3 bg-stone-800 text-stone-100 px-10 py-4 rounded-full font-bold transition-all hover:bg-rose-900 active:scale-95"
            >
              <CiPaperplane className="w-6 h-6 text-rose-300" />
              <span className="tracking-wide text-lg font-serif">
                Write a Letter
              </span>
            </Link>
          </div>
        </header>

        <section className="mt-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] flex-grow bg-stone-200" />
            <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">
              Recent Transmissions
            </span>
            <div className="h-[1px] flex-grow bg-stone-200" />
          </div>
          <LettersGrid letters={letters} />
        </section>

        <footer className="mt-32 pb-10 text-center">
          <p className="text-[10px] font-mono text-stone-400 uppercase tracking-[0.5em]">
            No Accounts • No Replies • Just the Void • Dev by JC Tecson
          </p>
        </footer>
      </div>
    </main>
  );
}
