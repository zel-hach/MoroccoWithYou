"use client";

import React, { useState } from "react";
import { api } from "@/lib/api";
import { getStoredUser } from "@/lib/auth";

const field =
  "w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-[#9aea30]/50 focus:ring-2 focus:ring-[#9aea30]/15";

export default function FeedbackPage() {
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = getStoredUser();
    if (!message.trim()) {
      setErr("Please write a message.");
      return;
    }
    setLoading(true);
    setErr(null);
    setStatus(null);
    try {
      await api.post("/feedback", {
        userId: user?.id,
        rating,
        message: message.trim(),
      });
      setStatus("Thank you — your feedback was sent.");
      setMessage("");
    } catch {
      setErr("Could not send feedback. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl text-[#9aea30]">Feedback</h1>
        <p className="text-sm text-slate-400">
          Tell us what worked and what we can improve. Linked to your account when you&apos;re logged in.
        </p>
      </header>

      <form onSubmit={submit} className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-500">Rating</label>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setRating(n)}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                  rating === n
                    ? "bg-[#9aea30] text-slate-950"
                    : "border border-white/10 bg-white/5 text-slate-300 hover:border-[#9aea30]/50"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-slate-500">Message</label>
          <textarea
            required
            rows={5}
            className={`${field} min-h-[140px] resize-y`}
            placeholder="Share details about your trip or the app…"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        {status && <p className="text-sm text-emerald-400">{status}</p>}
        {err && <p className="text-sm text-red-300">{err}</p>}
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-[#9aea30] px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-orange-500/30 disabled:opacity-50"
        >
          {loading ? "Sending…" : "Send feedback"}
        </button>
      </form>
    </main>
  );
}
