"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function Navbar() {
  const router = useRouter();
  const register = () => {
    router.push("/Register");
  };
  const login = () => {
    router.push("/Login");
  };

  return (
        <nav className="fixed top-0 left-0 w-full z-50">
        <header className="sticky top-0 z-30 w-full border-b border-white/10 bg-slate-950/75 backdrop-blur-md">
        <div className="mx-auto flex h-[4.5rem] min-h-[4.5rem] w-full max-w-[1600px] items-center justify-between gap-3 px-5 sm:h-20 sm:min-h-[5rem] sm:px-8 lg:px-10">
          <Link href="/" className="flex min-w-0 items-center gap-3 sm:gap-4">
            <span className="h-10 w-10 shrink-0 rounded-full bg-[#9aea30]/90 shadow-lg shadow-orange-500/40 ring-2 ring-white/5 sm:h-11 sm:w-11" />
            <div className="flex min-w-0 flex-col leading-tight">
              <span className="text-sm font-semibold tracking-[0.2em] text-[#9aea30] sm:text-[15px]">
                Morocco With You
              </span>
              <span className="text-xs text-slate-300 sm:text-[13px]">Morocco Experiences</span>
            </div>
          </Link>
          <nav className="hidden items-center gap-4 text-sm text-slate-200 md:flex lg:gap-6">
            <Link href="/" className="transition hover:text-[#9aea30]">
              Home
            </Link>
            <Link href="/#catalogue" className="transition hover:text-[#9aea30]">
              Catalogue
            </Link>
            <Link href="/#feedback" className="transition hover:text-[#9aea30]">
              Feedback
            </Link>
            <button
              type="button"
              className="text-slate-300 transition hover:text-[#9aea30]"
              onClick={login}
            >
              Log in
            </button>
            <button
              type="button"
              className="rounded-full bg-[#9aea30] px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-slate-950 shadow-lg shadow-orange-500/40 transition hover:brightness-95 sm:px-6"
              onClick={register}
            >
              Plan your trip
            </button>
          </nav>
        </div>
      </header>
    </nav>
  );
}
