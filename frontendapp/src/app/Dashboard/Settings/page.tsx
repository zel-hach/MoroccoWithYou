"use client";

import React, { useEffect, useState } from "react";
import { getStoredUser } from "@/lib/auth";

const PREFS_KEY = "smarttravel_prefs";

type Prefs = {
  language: string;
  currency: string;
  emailAlerts: boolean;
  pushAlerts: boolean;
  profileVisibility: string;
};

const defaultPrefs: Prefs = {
  language: "English",
  currency: "USD",
  emailAlerts: true,
  pushAlerts: false,
  profileVisibility: "Friends",
};

function loadPrefs(): Prefs {
  if (typeof window === "undefined") return defaultPrefs;
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    if (!raw) return defaultPrefs;
    return { ...defaultPrefs, ...JSON.parse(raw) };
  } catch {
    return defaultPrefs;
  }
}

export default function SettingsPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState("English");
  const [currency, setCurrency] = useState("USD");
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(false);
  const [profileVisibility, setProfileVisibility] = useState("Friends");

  useEffect(() => {
    const u = getStoredUser();
    if (u) {
      setEmail(u.email);
      setFullName(u.name ?? "");
    }
    const p = loadPrefs();
    setLanguage(p.language);
    setCurrency(p.currency);
    setEmailAlerts(p.emailAlerts);
    setPushAlerts(p.pushAlerts);
    setProfileVisibility(p.profileVisibility);
  }, []);

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const prefs: Prefs = {
      language,
      currency,
      emailAlerts,
      pushAlerts,
      profileVisibility,
    };
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
    alert("Settings saved locally. Update name/email from Profile to sync with the server.");
  };

  const input =
    "w-full rounded-xl border border-white/15 bg-black/25 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-[#9aea30]/70";

  return (
    <main className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl text-[#9aea30]">Account Settings</h1>
      </header>

      <form onSubmit={handleSave} className="space-y-6">
        <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
          <h2 className="text-lg font-semibold">Profile</h2>
          <p className="mb-4 text-xs text-slate-500">Read-only here — edit in Profile to save to the API.</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm">
              <span className="text-slate-200">Full name</span>
              <input type="text" value={fullName} readOnly className={input} />
            </label>
            <label className="space-y-2 text-sm">
              <span className="text-slate-200">Email address</span>
              <input type="email" value={email} readOnly className={input} />
            </label>
          </div>
        </article>

        <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
          <h2 className="text-lg font-semibold">Travel Preferences</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm">
              <span className="text-slate-200">Language</span>
              <select
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
                className={input}
              >
                <option>English</option>
                <option>French</option>
                <option>Arabic</option>
                <option>Spanish</option>
              </select>
            </label>
            <label className="space-y-2 text-sm">
              <span className="text-slate-200">Preferred currency</span>
              <select
                value={currency}
                onChange={(event) => setCurrency(event.target.value)}
                className={input}
              >
                <option>USD</option>
                <option>EUR</option>
                <option>MAD</option>
                <option>GBP</option>
              </select>
            </label>
          </div>
        </article>

        <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <div className="mt-4 space-y-3">
            <label className="flex items-center justify-between rounded-lg border border-white/10 px-4 py-3">
              <span className="text-sm text-slate-200">Email alerts for trip updates</span>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(event) => setEmailAlerts(event.target.checked)}
                className="h-4 w-4 accent-[#9aea30]"
              />
            </label>
            <label className="flex items-center justify-between rounded-lg border border-white/10 px-4 py-3">
              <span className="text-sm text-slate-200">Push notifications for offers</span>
              <input
                type="checkbox"
                checked={pushAlerts}
                onChange={(event) => setPushAlerts(event.target.checked)}
                className="h-4 w-4 accent-[#9aea30]"
              />
            </label>
          </div>
        </article>

        <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
          <h2 className="text-lg font-semibold">Privacy</h2>
          <label className="mt-4 block space-y-2 text-sm">
            <span className="text-slate-200">Profile visibility</span>
            <select
              value={profileVisibility}
              onChange={(event) => setProfileVisibility(event.target.value)}
              className={input}
            >
              <option>Public</option>
              <option>Friends</option>
              <option>Only me</option>
            </select>
          </label>
        </article>

        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-xl bg-[#9aea30] px-5 py-3 text-sm font-semibold text-slate-900 transition hover:brightness-95"
          >
            Save Settings
          </button>
        </div>
      </form>
    </main>
  );
}
