"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { getStoredUser, setStoredUser, type StoredUser } from "@/lib/auth";

const field =
  "w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-[#9aea30]/50 focus:ring-2 focus:ring-[#9aea30]/15";

export default function ProfilePage() {
  const [user, setUser] = useState<StoredUser | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const u = getStoredUser();
    setUser(u);
    if (u) {
      setEmail(u.email);
      setName(u.name ?? "");
    }
  }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    setErr(null);
    setMsg(null);
    try {
      const { data } = await api.patch(`/users/${user.id}`, { name, email });
      const next: StoredUser = {
        id: data.id ?? user.id,
        email: data.email ?? email,
        name: data.name ?? name,
      };
      setStoredUser(next);
      setUser(next);
      setMsg("Profile updated.");
    } catch {
      setErr("Could not update profile.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <main className="mx-auto max-w-lg rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-slate-300">
        <p>Please log in to view your profile.</p>
      </main>
    );
  }

  return (
    <main className="w-full space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-[#9aea30]">Profile</h1>
      </header>

      <form onSubmit={save} className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
        <div>
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-slate-500">Name</label>
          <input className={field} value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-slate-500">Email</label>
          <input
            type="email"
            required
            className={field}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {msg && <p className="text-sm text-emerald-400">{msg}</p>}
        {err && <p className="text-sm text-red-300">{err}</p>}
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-[#9aea30] px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-orange-500/30 disabled:opacity-50"
        >
          {loading ? "Saving…" : "Save changes"}
        </button>
      </form>
    </main>
  );
}
