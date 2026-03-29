import Image from "next/image";
import React from "react";

export type CatalogueTrip = {
  image: string;
  category: string;
  title: string;
  route: string;
  duration: string;
  pace: string;
  priceFrom: string;
  description: string;
};

function Discover({
  image,
  category,
  title,
  route,
  duration,
  pace,
  priceFrom,
  description,
}: CatalogueTrip) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-slate-950/70 shadow-lg shadow-black/30 backdrop-blur-sm transition duration-300 hover:border-[#9aea30]/45 hover:shadow-xl hover:shadow-[#9aea30]/5">
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden sm:aspect-[5/3]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/25 to-transparent" />
        <span className="absolute left-2 top-2 rounded-full border border-white/15 bg-slate-950/75 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#9aea30] backdrop-blur-sm sm:left-3 sm:top-3 sm:px-3 sm:py-1">
          {category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-3 sm:gap-3 sm:p-4">
        <div>
          <h3 className="text-sm font-semibold leading-snug text-slate-50 sm:text-base">
            {title}
          </h3>
          <p className="mt-1 text-[11px] font-medium leading-snug text-[#9aea30]/95 sm:text-xs">{route}</p>
        </div>

        <div className="flex flex-wrap gap-1.5 text-[10px] text-slate-400 sm:gap-2 sm:text-[11px]">
          <span className="rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 text-slate-300">
            {duration}
          </span>
          <span className="rounded border border-white/10 bg-white/[0.04] px-2 py-0.5">{pace}</span>
        </div>

        <p className="text-[11px] leading-relaxed text-slate-400 sm:text-xs sm:leading-relaxed">
          {description}
        </p>
        <div className="mt-auto flex flex-wrap items-end justify-between gap-2 border-t border-white/10 pt-3">
          <div>
            <p className="text-[9px] font-medium uppercase tracking-wider text-slate-500 sm:text-[10px]">From</p>
            <p className="text-base font-semibold tabular-nums text-[#9aea30] sm:text-lg">{priceFrom}</p>
            <p className="text-[9px] text-slate-500">per person · indicative</p>
          </div>
          <a
            href="/Dashboard"
            className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-slate-200 transition hover:text-[#9aea30] sm:text-xs"
          >
            Book
            <span aria-hidden className="transition group-hover:translate-x-0.5">→</span>
          </a>
        </div>
      </div>
    </article>
  );
}

export default Discover;
