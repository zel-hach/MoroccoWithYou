"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { getStoredUser } from "@/lib/auth";

type BookingRow = {
  id: number;
  bookingDate: string;
  status: string;
  totalPrice: string | number;
  service: {
    name: string;
    label: string;
    provider?: { city: string; name: string };
  };
};

export default function HistoryPage() {
  const [rows, setRows] = useState<BookingRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const user = getStoredUser();
    if (!user) {
      setLoading(false);
      setError("Log in to see your bookings.");
      return;
    }
    (async () => {
      try {
        const { data } = await api.get<BookingRow[]>(`/bookings/user/${user.id}`);
        setRows(Array.isArray(data) ? data : []);
      } catch {
        setError("Could not load bookings.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <main className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl text-[#9aea30]">Booking history</h1>
      </header>

      {loading && <p className="text-slate-400">Loading…</p>}
      {error && !loading && (
        <p className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">{error}</p>
      )}

      <div className="grid gap-4">
        {rows.map((trip) => (
          <article
            key={trip.id}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-[#9aea30]/35"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-50">{trip.service?.name ?? "Service"}</h2>
                <p className="text-sm text-slate-400">
                  {trip.service?.provider?.name} · {trip.service?.provider?.city}
                </p>
                <p className="text-xs text-slate-500">
                  {new Date(trip.bookingDate).toLocaleString()}
                </p>
              </div>
              <span
                className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-medium ${
                  trip.status === "confirmed"
                    ? "bg-emerald-500/20 text-emerald-300"
                    : trip.status === "cancelled"
                      ? "bg-red-500/20 text-red-300"
                      : "bg-amber-500/20 text-amber-300"
                }`}
              >
                {trip.status}
              </span>
            </div>
            <div className="mt-4 border-t border-white/10 pt-4 text-sm text-slate-300">
              Total:{" "}
              <span className="font-semibold text-[#9aea30]">
                {typeof trip.totalPrice === "number"
                  ? trip.totalPrice
                  : Number(trip.totalPrice).toLocaleString()}{" "}
                MAD
              </span>
              {trip.service?.label && (
                <span className="ml-2 text-slate-500">· {trip.service.label}</span>
              )}
            </div>
          </article>
        ))}
      </div>

      {!loading && !error && rows.length === 0 && (
        <p className="text-slate-500">No bookings yet. Book a service from the overview.</p>
      )}
    </main>
  );
}
