
"use client";

import Discovers from "./Components/Discovers/page";
import Navbar from "./Components/Layout/Navbar/Navbar";
import Footer from "./Components/Layout/Footer/Footer";
import About from "./Components/Home/Home";
import Feedback from "./Components/Feedback/Feedback";


export default function Home() {
  return (
    <>
      <Navbar />
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#323232] text-slate-50 selection:bg-[#9aea30]/25 selection:text-slate-950">
        <main className="flex w-full flex-1 flex-col gap-12 pb-16 sm:gap-16 sm:pb-20 lg:gap-20">
          <About></About>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" aria-hidden />
          <section id="catalogue" className="scroll-mt-20 w-full px-3 py-4 sm:px-4 sm:py-6">
            <Discovers />
          </section>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" aria-hidden />
            <Feedback></Feedback>
        </main>
        <Footer />
      </div>
    </>
  );
}
