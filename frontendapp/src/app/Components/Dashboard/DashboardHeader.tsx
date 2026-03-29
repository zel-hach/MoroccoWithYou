"use client";

import React from "react";
import { getStoredUser } from "@/lib/auth";

export default function DashboardHeader() {
  const user = getStoredUser();

  return (
    <header className="h-20 fixed sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-white/10 bg-gradient-to-b from-slate-950 via-[#2a2a2a] to-[#323232] px-6 backdrop-blur-md lg:px-8">
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Welcome</p>
        <p className="truncate text-sm font-semibold text-slate-100 sm:text-base">
          {user?.name?.trim() || user?.email || "Traveler"}
        </p>
      </div>
      <div className="hidden max-w-md flex-1 sm:block">
        <label className="sr-only" htmlFor="dash-search">
          Search
        </label>
        <input
          id="dash-search"
          type="search"
          placeholder="Search services…"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-[#9aea30]/50 focus:ring-2 focus:ring-[#9aea30]/15"
        />
      </div>
    </header>
  );
}
