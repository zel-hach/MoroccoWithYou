"use client";

import React, { FormEvent, useMemo, useState } from "react";

type Message = {
  id: number;
  text: string;
  sender: "user" | "assistant";
  time: string;
};

const quickEmojis = ["😀", "😎", "✈️", "🏝️", "🏨", "🍽️", "🗺️", "💬"];

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hi! I am your SmartTravel assistant. Where do you want to go?",
    sender: "assistant",
    time: "09:40",
  },
  {
    id: 2,
    text: "I want a weekend in Chefchaouen 😍",
    sender: "user",
    time: "09:41",
  },
  {
    id: 3,
    text: "Great choice! I can suggest hotels, food spots, and activities.",
    sender: "assistant",
    time: "09:41",
  },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [draft, setDraft] = useState("");

  const canSend = useMemo(() => draft.trim().length > 0, [draft]);

  const appendEmoji = (emoji: string) => {
    setDraft((current) => `${current}${emoji}`);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleaned = draft.trim();

    if (!cleaned) return;

    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes(),
    ).padStart(2, "0")}`;

    setMessages((current) => [
      ...current,
      {
        id: current.length + 1,
        text: cleaned,
        sender: "user",
        time,
      },
    ]);
    setDraft("");
  };

  return (
    <main className="min-h-screen px-4 py-8 text-slate-100 sm:px-6 lg:px-10">
      <section className="mx-auto flex max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <header className="border-b border-white/10 px-4 py-4 sm:px-6">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Travel Chat
          </h1>
          <p className="mt-1 text-sm text-slate-300">
            Ask anything about destinations, hotels, and travel plans.
          </p>
        </header>

        <div className="h-[60vh] space-y-3 overflow-y-auto px-4 py-4 sm:px-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <article
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm sm:max-w-[70%] ${
                  message.sender === "user"
                    ? "bg-[#9aea30]/20 text-slate-100"
                    : "bg-white/10 text-slate-100"
                }`}
              >
                <p>{message.text}</p>
                <p className="mt-1 text-right text-[11px] text-slate-300">
                  {message.time}
                </p>
              </article>
            </div>
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-3 border-t border-white/10 px-4 py-4 sm:px-6"
        >
          <div className="flex flex-wrap gap-2">
            {quickEmojis.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => appendEmoji(emoji)}
                className="rounded-lg border border-white/15 bg-white/5 px-2 py-1 text-lg transition hover:border-[#9aea30]/70 hover:bg-white/10"
                aria-label={`Add emoji ${emoji}`}
              >
                {emoji}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Write your message..."
              className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-400 outline-none transition focus:border-[#9aea30]/70"
            />
            <button
              type="submit"
              disabled={!canSend}
              className="rounded-xl bg-[#9aea30] px-4 py-3 text-sm font-semibold text-slate-900 transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
