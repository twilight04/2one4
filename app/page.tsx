import prisma from "@/lib/prisma";
import LettersGrid from "@/components/letters/letters-grid";
import ComposeLetter from "@/components/letters/compose-letter";

export default async function Page() {
  const letters = await prisma.letter.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 100,
  });

  return (
    <main className="min-h-screen bg-[#f7efe5] selection:bg-rose-100 selection:text-rose-900">
      {/* 1. Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-rose-200/30 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-stone-300/40 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        {/* 2. Header Section */}
        <header className="flex flex-col items-center text-center mb-20">
          <div className="mb-4 inline-block px-3 py-1 rounded-full border border-rose-200 bg-rose-50/50 text-[10px] font-mono tracking-[0.3em] text-rose-800 uppercase">
            Frequency 214.00 MHz
          </div>

          <h1 className="text-5xl md:text-6xl font-serif font-bold text-stone-800 mb-6 tracking-tight">
            214Hz
          </h1>

          <p className="max-w-md text-stone-500 font-serif italic text-lg leading-relaxed">
            &quot;A quiet space for the frequencies we carry but rarely
            broadcast. Tune into the unspoken, seal your thoughts in a letter,
            and let them drift into the collective hum.&quot;
          </p>

          {/* 3. Action Button */}
          <div className="mt-10">
            <ComposeLetter />
          </div>
        </header>

        {/* 4. The Grid */}
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

        {/* 5. Footer */}
        <footer className="mt-32 pb-10 text-center">
          <p className="text-[10px] font-mono text-stone-400 uppercase tracking-[0.5em]">
            No Accounts • No Replies • Just the Void • Dev by JC Tecson
          </p>
        </footer>
      </div>
    </main>
  );
}
