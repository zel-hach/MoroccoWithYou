"use client";

import Link from "next/link";
import React from "react";
import { getStoredUser } from "@/lib/auth";

export default function Footer() {
  const [email, setEmail] = React.useState<string | null>(null);

  React.useEffect(() => {
    setEmail(getStoredUser()?.email ?? null);
  }, []);

  return (
    <footer className="w-full border-t border-white/10 bg-slate-950/90 py-10 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-10 px-5 sm:px-8 lg:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9aea30]">
              Morocco With You
            </p>
            <p className="text-sm text-slate-400">
              Curated Morocco trips, local providers, and experiences—in one place.
            </p>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Explore
            </p>
            <ul className="flex flex-col gap-2 text-sm text-slate-300">
              <li>
                <Link href="/#catalogue" className="transition hover:text-[#9aea30]">
                  Catalogue
                </Link>
              </li>
              <li>
                <Link href="/#feedback" className="transition hover:text-[#9aea30]">
                  Feedback
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Account
            </p>
            <ul className="flex flex-col gap-2 text-sm text-slate-300">
              <li>
                <Link href="/Login" className="transition hover:text-[#9aea30]">
                  Log in
                </Link>
              </li>
              <li>
                <Link href="/Register" className="transition hover:text-[#9aea30]">
                  Create account
                </Link>
              </li>
              <li>
                <Link href="/Dashboard" className="transition hover:text-[#9aea30]">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Signed in
            </p>
            {email ? (
              <p className="break-all text-sm text-slate-300">{email}</p>
            ) : (
              <p className="text-sm text-slate-500">
                <Link href="/Login" className="text-[#9aea30] hover:underline">
                  Log in
                </Link>{" "}
                to book and manage your trips.
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-center text-[11px] text-slate-500 sm:text-left">
            © {new Date().getFullYear()} Morocco With You. All rights reserved.
          </p>
          <p className="text-center text-[11px] text-slate-600 sm:text-right">
            Built for travelers planning their next Moroccan adventure.
          </p>
        </div>
      </div>
    </footer>
  );
}
