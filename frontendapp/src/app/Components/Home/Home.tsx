import React from 'react';
import Image from "next/image";

const About = () => {
    return (
           <section className="relative isolate flex min-h-[calc(100dvh-4.5rem)] w-full flex-col justify-center overflow-hidden px-4 py-16 sm:min-h-[calc(100dvh-5rem)] sm:px-4 sm:py-20">
            <div className="absolute inset-0 z-0" aria-hidden>
              <Image
                src="/images/maroc.jpg"
                alt=""
                fill
                role="presentation"
                className="object-cover"
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-[#323232]/88" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#323232]/50 via-[#323232]/30 to-[#323232]/90" />
            </div>

            <div className="relative z-10 mx-auto w-full max-w-4xl space-y-6 text-center sm:space-y-8">
              <p className="inline-block border-b border-[#9aea30]/35 pb-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#9aea30]">
                Morocco · Desert · Ocean · Atlas
              </p>
              <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.08]">
                Your unforgettable journey
                <span className="mt-2 block text-transparent bg-clip-text bg-gradient-to-r from-[#9aea30] via-amber-300 to-emerald-300">
                  through Morocco starts here.
                </span>
              </h1>
              <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
                From Chefchaouen to Merzouga, tailor‑made trips—culture, comfort, and trusted local guides.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2 sm:gap-4">
                <a
                  href="/Register"
                  className="inline-flex items-center justify-center rounded-full bg-[#9aea30] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-slate-950 shadow-lg shadow-orange-500/40 transition hover:brightness-95"
                >
                  Start planning
                </a>
                <a
                  href="#catalogue"
                  className="rounded-full border border-slate-500 px-6 py-3 text-sm font-medium text-slate-100 transition hover:border-[#9aea30] hover:text-orange-200"
                >
                  Catalogue
                </a>
              </div>
            </div>
          </section>
    );
}

export default About;
