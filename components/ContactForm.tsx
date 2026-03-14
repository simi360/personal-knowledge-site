"use client";

import { useState } from "react";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  const mailtoHref = `mailto:hi@harsimrankaur.com?subject=${encodeURIComponent(
    `Website inquiry from ${name || "a visitor"}`
  )}&body=${encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\nMessage:\n${message}`
  )}`;

  return (
    <form
      className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-8 shadow-card"
      onSubmit={(event) => {
        event.preventDefault();
        window.location.href = mailtoHref;
      }}
    >
      <p className="text-sm uppercase tracking-[0.35em] text-sky-200/70">Contact</p>
      <h2 className="mt-3 text-3xl font-semibold text-white">Start a conversation</h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
        Fill this out and your email app will open with everything pre-filled and ready to send.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm text-slate-300">Name</span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-300/35"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm text-slate-300">Email</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-300/35"
          />
        </label>
        <label className="block md:col-span-2">
          <span className="mb-2 block text-sm text-slate-300">Company or context</span>
          <input
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-300/35"
          />
        </label>
        <label className="block md:col-span-2">
          <span className="mb-2 block text-sm text-slate-300">Message</span>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            rows={7}
            className="w-full rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-300/35"
          />
        </label>
      </div>
      <button
        type="submit"
        className="mt-6 rounded-full bg-sky-300 px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-sky-200"
      >
        Open Email Draft
      </button>
    </form>
  );
}
