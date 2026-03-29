"use client";

import React, { useCallback, useEffect, useState } from "react";
import BookingModal, {
  type ServiceItem,
} from "../Components/Dashboard/BookingModal";
import { api } from "@/lib/api";
import { getStoredUser, type StoredUser } from "@/lib/auth";

export default function DashboardPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<StoredUser | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<ServiceItem | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get<ServiceItem[]>("/services");
      setServices(Array.isArray(data) ? data : []);
    } catch {
      setError("Unable to load services. Is the backend running?");
      setServices([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setUser(getStoredUser());
    load();
  }, [load]);

  const openBook = (s: ServiceItem) => {
    setSelected(s);
    setModalOpen(true);
  };

  return (
    <main className="space-y-8 w-full">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight  text-[#9aea30] sm:text-4xl">
          Book your experience
        </h1>
      </div>

      {loading && (
        <p className="text-slate-400">Loading services…</p>
      )}
      {error && (
        <p className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
          {error}
        </p>
      )}

      <div className="w-full grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {services.map((s) => (
          <article
            key={s.id}
            className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-lg shadow-black/20 transition hover:border-[#9aea30]/40"
          >
            <div className="flex flex-1 flex-col gap-3 p-5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2 className="text-lg font-semibold text-slate-50">{s.name}</h2>
                  {s.provider && (
                    <p className="text-xs text-slate-500">
                      {s.provider.name} · {s.provider.city}
                    </p>
                  )}
                </div>
                <span className="rounded-full border border-[#9aea30]/30 bg-[#9aea30]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#9aea30]">
                  {s.label}
                </span>
              </div>
              <p className="line-clamp-3 text-sm text-slate-400">{s.description}</p>
              <div className="mt-auto flex items-end justify-between gap-2 border-t border-white/10 pt-4">
                <div>
                  <p className="text-[10px] uppercase text-slate-500">From</p>
                  <p className="text-xl font-semibold tabular-nums text-[#9aea30]">
                    {Number(s.pricePublic).toLocaleString()} <span className="text-sm font-normal text-slate-400">{s.unit}</span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => openBook(s)}
                  className="rounded-full bg-[#9aea30] px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-slate-950 shadow-lg shadow-orange-500/30 transition hover:brightness-95"
                >
                  Book now
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {!loading && services.length === 0 && !error && (
        <p className="text-slate-400">No services yet. Seed the database or add services in the admin API.</p>
      )}

      <BookingModal
        opened={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelected(null);
        }}
        service={selected}
        user={user}
        onBooked={load}
      />
    </main>
  );
}
