"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/ContactIcons";

const heroPhrases = [
  "scalable systems",
  "thoughtful interfaces",
  "engineering and product"
];

export function HeroSection() {
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setPhraseIndex((current) => (current + 1) % heroPhrases.length);
    }, 2200);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <section className="relative overflow-hidden rounded-[2.4rem] border border-white/10 bg-surface/75 px-8 py-20 shadow-card backdrop-blur md:px-14 md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(125,211,252,0.2),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(45,212,191,0.14),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent)]" />
      <div className="absolute inset-0 bg-hero-grid bg-hero-grid opacity-70" />
      <div className="absolute -right-16 top-10 hidden h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(244,114,182,0.18),transparent_65%)] blur-3xl md:block" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative grid gap-10 xl:grid-cols-[1.1fr_0.9fr]"
      >
        <div className="max-w-3xl">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-sky-200/70">Harsimran Kaur</p>
          <h1 className="max-w-4xl font-sans text-5xl font-semibold leading-tight text-white md:text-7xl">
            Full-stack engineer focused on{" "}
            <span className="inline-flex min-h-[1.25em] min-w-[12ch] align-baseline text-sky-200">
              <AnimatePresence mode="wait">
                <motion.span
                  key={heroPhrases[phraseIndex]}
                  initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="inline-block"
                >
                  {heroPhrases[phraseIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/notebook"
              className="rounded-full bg-sky-300 px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-sky-200"
            >
              Explore Notebook
            </Link>
            <a
              href="/resume.pdf"
              className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-slate-100 transition hover:border-sky-200/35 hover:bg-white/10"
            >
              View Resume
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-slate-400">
            <a
              href="mailto:hi@harsimrankaur.com"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 transition hover:border-sky-300/30 hover:text-white"
            >
              <MailIcon />
              hi@harsimrankaur.com
            </a>
            <a
              href="https://github.com/simi360"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 transition hover:border-sky-300/30 hover:text-white"
            >
              <GitHubIcon />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/harsimrankaur360/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 transition hover:border-sky-300/30 hover:text-white"
            >
              <LinkedInIcon />
              LinkedIn
            </a>
          </div>
        </div>
        <div className="grid gap-4 self-end rounded-[2rem] border border-white/10 bg-slate-950/50 p-6 backdrop-blur">
          <p className="text-sm uppercase tracking-[0.28em] text-emerald-200/75">Current focus</p>
          <div className="space-y-4">
            <Link
              href="#capabilities"
              className="block rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-sky-300/30 hover:bg-white/[0.05]"
            >
              <p className="text-sm font-medium text-white">Systems thinking</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Designing software that remains understandable as complexity increases.
              </p>
            </Link>
            <Link
              href="#graph-preview"
              className="block rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-sky-300/30 hover:bg-white/[0.05]"
            >
              <p className="text-sm font-medium text-white">Product-aware engineering</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Understanding how architecture and UX decisions shape product direction.
              </p>
            </Link>
            <Link
              href="/about"
              className="block rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-sky-300/30 hover:bg-white/[0.05]"
            >
              <p className="text-sm font-medium text-white">Public notebook</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Mapping ideas across engineering, debugging, systems, and learning.
              </p>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
