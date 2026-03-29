"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { canAccessAdminDashboard } from "@/lib/admin-access";
import { clearStoredUser, getStoredUser } from "@/lib/auth";
import { Avatar } from "@mantine/core";

const travelerNav = [
  { href: "/Dashboard", label: "Overview", icon: "◆" },
  { href: "/Dashboard/Profile", label: "Profile", icon: "◎" },
  { href: "/Dashboard/History", label: "Bookings", icon: "☰" },
  { href: "/Dashboard/Feedback", label: "Feedback", icon: "✎" },
  { href: "/Dashboard/Settings", label: "Settings", icon: "⚙" },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const user = getStoredUser();
  const nav = canAccessAdminDashboard(user?.email)
    ? [
        travelerNav[0],
        { href: "/Dashboard/Admin", label: "Admin", icon: "⬡" },
        ...travelerNav.slice(1),
      ]
    : travelerNav;

  const logout = () => {
    clearStoredUser();
    router.push("/");
  };

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-white/10 bg-gradient-to-b from-slate-950 via-[#2a2a2a] to-[#323232] lg:w-72">
      <div className="flex h-20 shrink-0 items-center gap-3 border-b border-white/10 px-5">
        <span className="h-10 w-10 shrink-0 rounded-full bg-[#9aea30]/90 shadow-lg shadow-orange-500/30 ring-2 ring-white/5" />
        <div className="min-w-0 leading-tight">
          <p className="truncate text-xs font-semibold uppercase tracking-[0.2em] text-[#9aea30]">
            Morocco With You
          </p>
          <p className="truncate text-[11px] text-slate-400">Dashboard</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
        {nav.map((item) => {
          const active =
            item.href === "/Dashboard"
              ? pathname === "/Dashboard"
              : pathname === item.href || pathname?.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? "bg-[#9aea30]/15 text-[#9aea30] shadow-inner shadow-black/20"
                  : "text-slate-300 hover:bg-white/5 hover:text-slate-100"
              }`}
            >
              <span className="text-base opacity-80">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-4">
        <div className="mb-3 rounded-lg  border border-white/10 hover:border-[#9aea30] bg-white/5 px-3 py-2">
          {/* <p className="truncate text-xs text-slate-500">Signed in</p> */}
          <div className='flex items-center gap-2 '>
            <Avatar className='w-10 h-10 '></Avatar>
            <p className="truncate text-sm font-medium text-slate-200">
            {user?.name ?? "Guest"}
          </p>
          </div>
        </div>
        <button
          type="button"
          onClick={logout}
          className="w-full rounded-xl border border-white/10 bg-slate-900/80 py-2.5 text-sm font-medium text-slate-200 transition hover:border-[#9aea30] hover:text-[#9aea30]"
        >
          Log out
        </button>
      </div>
    </aside>
  );
}
