"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";
import { api } from "@/lib/api";
import { canAccessAdminDashboard } from "@/lib/admin-access";
import { getStoredUser } from "@/lib/auth";

const CATEGORIES = ["restaurant", "transport", "activity", "hotel", "other"] as const;

type Category = (typeof CATEGORIES)[number];

type AdminProvider = {
  id: number;
  name: string;
  city: string;
  category: Category;
  photo: string[];
  location: Record<string, unknown> | null;
  isActive: boolean;
};

type AdminService = {
  id: number;
  name: string;
  description: string;
  label: string;
  pricePublic: number;
  commissionAmount: number;
  unit: string;
  providerId: number;
  provider?: { id: number; name: string; city: string; category: string };
};

function formatAxiosMessage(err: unknown, fallback: string): string {
  if (!isAxiosError(err)) return fallback;
  const data = err.response?.data;
  if (data && typeof data === "object" && "message" in data && typeof (data as { message: string }).message === "string") {
    return (data as { message: string }).message;
  }
  return fallback;
}

function parseLocationInput(raw: string): Record<string, unknown> {
  const t = raw.trim();
  if (!t) return { address: "" };
  try {
    const parsed = JSON.parse(t) as unknown;
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as Record<string, unknown>;
    }
  } catch {
    /* plain text */
  }
  return { address: t };
}

function locationToInput(loc: Record<string, unknown> | null | undefined): string {
  if (!loc || typeof loc !== "object") return "";
  if ("address" in loc && typeof loc.address === "string" && Object.keys(loc).length === 1) {
    return loc.address;
  }
  return JSON.stringify(loc, null, 0);
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"providers" | "services">("providers");
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    const user = getStoredUser();
    if (!user) {
      router.replace("/Login");
      return;
    }
    if (!canAccessAdminDashboard(user.email)) {
      router.replace("/Dashboard");
      return;
    }
    setAllowed(true);
  }, [router]);

  if (allowed !== true) {
    return (
      <main className="mx-auto max-w-6xl">
        <p className="text-slate-400">Checking access…</p>
      </main>
    );
  }

  return (
    <main className="w-full space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl text-[#9aea30]">Admin dashboard</h1>
      </header>

      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
        <button
          type="button"
          onClick={() => setTab("providers")}
          className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
            tab === "providers"
              ? "bg-[#9aea30]/20 text-[#9aea30] ring-1 ring-[#9aea30]/40"
              : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
          }`}
        >
          Providers
        </button>
        <button
          type="button"
          onClick={() => setTab("services")}
          className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
            tab === "services"
              ? "bg-[#9aea30]/20 text-[#9aea30] ring-1 ring-[#9aea30]/40"
              : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
          }`}
        >
          Services
        </button>
      </div>

      {tab === "providers" ? <ProvidersPanel /> : <ServicesPanel />}
    </main>
  );
}

function ProvidersPanel() {
  const [rows, setRows] = useState<AdminProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [editId, setEditId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState<Category>("hotel");
  const [photoRaw, setPhotoRaw] = useState("");
  const [locationRaw, setLocationRaw] = useState("");
  const [isActive, setIsActive] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get<AdminProvider[]>("/providers");
      setRows(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(formatAxiosMessage(err, "Could not load providers."));
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const resetForm = () => {
    setEditId(null);
    setName("");
    setCity("");
    setCategory("hotel");
    setPhotoRaw("");
    setLocationRaw("");
    setIsActive(true);
  };

  const startEdit = (p: AdminProvider) => {
    setEditId(p.id);
    setName(p.name);
    setCity(p.city);
    setCategory(p.category);
    setPhotoRaw(p.photo?.length ? p.photo.join(", ") : "");
    setLocationRaw(locationToInput(p.location));
    setIsActive(p.isActive);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const photos = photoRaw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const payload = {
      name: name.trim(),
      city: city.trim(),
      category,
      location: parseLocationInput(locationRaw),
      isActive,
      photo: photos,
    };
    try {
      if (editId != null) {
        await api.patch(`/providers/${editId}`, payload);
      } else {
        await api.post("/providers", payload);
      }
      resetForm();
      await load();
    } catch (err) {
      setError(formatAxiosMessage(err, editId != null ? "Could not update provider." : "Could not create provider."));
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: number) => {
    if (!window.confirm("Delete this provider? Linked services may need to be removed first.")) return;
    setError(null);
    try {
      await api.delete(`/providers/${id}`);
      if (editId === id) resetForm();
      await load();
    } catch (err) {
      setError(formatAxiosMessage(err, "Could not delete provider."));
    }
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,400px)]">
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-100">All providers</h2>
        {loading && <p className="text-sm text-slate-500">Loading…</p>}
        {error && (
          <p className="rounded-lg border border-red-500/35 bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</p>
        )}
        <ul className="space-y-2">
          {rows.map((p) => (
            <li
              key={p.id}
              className="flex flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-slate-100">{p.name}</p>
                <p className="text-xs text-slate-500">
                  {p.city} · {p.category}
                  {!p.isActive ? " · inactive" : ""}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => startEdit(p)}
                  className="rounded-lg border border-white/15 px-3 py-1.5 text-xs font-medium bg-[#9aea30] text-black hover:border-[#9aea30]/50"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => remove(p.id)}
                  className="rounded-lg border border-red-500/30 bg-red-500/30 px-3 py-1.5 text-xs font-medium text-red-300 hover:bg-red-500/10"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
        {!loading && rows.length === 0 && !error && (
          <p className="text-sm text-slate-500">No providers yet. Add one using the form.</p>
        )}
      </section>

      <section className="h-fit rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <h2 className="mb-4 text-lg font-semibold text-slate-100 text-[#9aea30]">{editId != null ? "Edit provider" : "New provider"}</h2>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-400">Name</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-sm text-slate-100 outline-none focus:border-[#9aea30]/60"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-400">City</label>
            <input
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-sm text-slate-100 outline-none focus:border-[#9aea30]/60"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-400">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-sm text-slate-100 outline-none focus:border-[#9aea30]/60"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-400">Photo URLs (comma-separated)</label>
            <input
              value={photoRaw}
              onChange={(e) => setPhotoRaw(e.target.value)}
              placeholder="https://..."
              className="w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-sm text-slate-100 outline-none focus:border-[#9aea30]/60"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-400">
              Location (address text or JSON)
            </label>
            <textarea
              value={locationRaw}
              onChange={(e) => setLocationRaw(e.target.value)}
              rows={3}
              placeholder='e.g. Jemaa el-Fna or {"lat":31.6,"lng":-8.0}'
              className="w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-sm text-slate-100 outline-none focus:border-[#9aea30]/60"
            />
          </div>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="rounded border-white/30"
            />
            Active
          </label>
          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 rounded-xl bg-[#9aea30] py-2.5 text-sm font-semibold text-slate-950 hover:brightness-95 disabled:opacity-50"
            >
              {saving ? "Saving…" : editId != null ? "Update" : "Create"}
            </button>
            {editId != null && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl border border-white/20 px-4 py-2.5 text-sm text-slate-200 hover:bg-white/5"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>
    </div>
  );
}

function ServicesPanel() {
  const [providers, setProviders] = useState<AdminProvider[]>([]);
  const [rows, setRows] = useState<AdminService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [editId, setEditId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [label, setLabel] = useState("");
  const [pricePublic, setPricePublic] = useState("");
  const [commissionAmount, setCommissionAmount] = useState("");
  const [unit, setUnit] = useState("");
  const [providerId, setProviderId] = useState("");

  const loadAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [pRes, sRes] = await Promise.all([
        api.get<AdminProvider[]>("/providers"),
        api.get<AdminService[]>("/services"),
      ]);
      setProviders(Array.isArray(pRes.data) ? pRes.data : []);
      setRows(Array.isArray(sRes.data) ? sRes.data : []);
    } catch (err) {
      setError(formatAxiosMessage(err, "Could not load services or providers."));
      setRows([]);
      setProviders([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  useEffect(() => {
    if (editId != null) return;
    setProviderId((prev) => {
      if (prev) return prev;
      if (providers[0]) return String(providers[0].id);
      return "";
    });
  }, [providers, editId]);

  const resetForm = () => {
    setEditId(null);
    setName("");
    setDescription("");
    setLabel("");
    setPricePublic("");
    setCommissionAmount("");
    setUnit("");
    setProviderId(providers[0] ? String(providers[0].id) : "");
  };

  const startEdit = (s: AdminService) => {
    setEditId(s.id);
    setName(s.name);
    setDescription(s.description);
    setLabel(s.label);
    setPricePublic(String(s.pricePublic));
    setCommissionAmount(String(s.commissionAmount));
    setUnit(s.unit);
    setProviderId(String(s.providerId));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const pid = Number(providerId);
    if (!Number.isFinite(pid) || pid < 1) {
      setError("Select a valid provider.");
      return;
    }
    const price = Number(pricePublic);
    const commission = Number(commissionAmount);
    if (!Number.isFinite(price) || !Number.isFinite(commission)) {
      setError("Price and commission must be numbers.");
      return;
    }
    setSaving(true);
    setError(null);
    const payload = {
      name: name.trim(),
      description: description.trim(),
      label: label.trim(),
      pricePublic: price,
      commissionAmount: commission,
      unit: unit.trim(),
      providerId: pid,
    };
    try {
      if (editId != null) {
        await api.patch(`/services/${editId}`, payload);
      } else {
        await api.post("/services", payload);
      }
      resetForm();
      await loadAll();
    } catch (err) {
      setError(formatAxiosMessage(err, editId != null ? "Could not update service." : "Could not create service."));
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: number) => {
    if (!window.confirm("Delete this service?")) return;
    setError(null);
    try {
      await api.delete(`/services/${id}`);
      if (editId === id) resetForm();
      await loadAll();
    } catch (err) {
      setError(formatAxiosMessage(err, "Could not delete service."));
    }
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,420px)]">
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-100">All services</h2>
        {loading && <p className="text-sm text-slate-500">Loading…</p>}
        {error && (
          <p className="rounded-lg border border-red-500/35 bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</p>
        )}
        <ul className="space-y-2">
          {rows.map((s) => (
            <li
              key={s.id}
              className="flex flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-slate-100">{s.name}</p>
                <p className="text-xs text-slate-500">
                  {s.provider ? `${s.provider.name} · ${s.provider.city}` : `Provider #${s.providerId}`} ·{" "}
                  {Number(s.pricePublic).toLocaleString()} {s.unit}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => startEdit(s)}
                  className="rounded-lg border border-white/15 px-3 py-1.5 text-xs font-medium bg-[#9aea30] text-black hover:border-[#9aea30]/50"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => remove(s.id)}
                  className="rounded-lg border border-red-500/30 bg-red-500/30 px-3 py-1.5 text-xs font-medium text-red-300 hover:bg-red-500/10"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
        {!loading && rows.length === 0 && !error && (
          <p className="text-sm text-slate-500">No services yet. Create a provider first, then add a service.</p>
        )}
      </section>

      <section className="h-fit rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <h2 className="mb-4 text-lg font-semibold text-slate-100">{editId != null ? "Edit service" : "New service"}</h2>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-400">Provider</label>
            <select
              required
              value={providerId}
              onChange={(e) => setProviderId(e.target.value)}
              className="w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-sm text-slate-100 outline-none focus:border-[#9aea30]/60"
            >
              {providers.length === 0 ? (
                <option value="">Add a provider first</option>
              ) : (
                providers.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.city})
                  </option>
                ))
              )}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-400">Name</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-sm text-slate-100 outline-none focus:border-[#9aea30]/60"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-400">Description</label>
            <textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-sm text-slate-100 outline-none focus:border-[#9aea30]/60"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-400">Label (short tag)</label>
            <input
              required
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-sm text-slate-100 outline-none focus:border-[#9aea30]/60"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-400">Public price</label>
              <input
                required
                type="number"
                step="any"
                min="0"
                value={pricePublic}
                onChange={(e) => setPricePublic(e.target.value)}
                className="w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-sm text-slate-100 outline-none focus:border-[#9aea30]/60"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-400">Commission</label>
              <input
                required
                type="number"
                step="any"
                min="0"
                value={commissionAmount}
                onChange={(e) => setCommissionAmount(e.target.value)}
                className="w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-sm text-slate-100 outline-none focus:border-[#9aea30]/60"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-400">Unit (e.g. MAD, per person)</label>
            <input
              required
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-sm text-slate-100 outline-none focus:border-[#9aea30]/60"
            />
          </div>
          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              disabled={saving || providers.length === 0}
              className="flex-1 rounded-xl bg-[#9aea30] py-2.5 text-sm font-semibold text-slate-950 hover:brightness-95 disabled:opacity-50"
            >
              {saving ? "Saving…" : editId != null ? "Update" : "Create"}
            </button>
            {editId != null && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl border border-white/20 px-4 py-2.5 text-sm text-slate-200 hover:bg-white/5"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>
    </div>
  );
}
