export function NoteWritingGuide() {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-8 shadow-card md:p-10">
      <p className="text-sm uppercase tracking-[0.35em] text-sky-200/70">Writing Guide</p>
      <h2 className="mt-3 text-3xl font-semibold text-white">How to add a new note later</h2>
      <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4 text-slate-300">
          <p>
            Add a markdown file inside `content/`. The graph updates automatically from the
            frontmatter tags, so writing a note is just creating one file.
          </p>
          <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-sm text-slate-200">
            File name example:
            <div className="mt-2 font-mono text-sky-100">content/product-feedback-loops.md</div>
          </div>
        </div>
        <pre className="overflow-x-auto rounded-[1.5rem] border border-white/10 bg-slate-950/80 p-5 text-sm leading-7 text-slate-200">
{`---
title: Product Feedback Loops
date: 2026-03-13
tags: [product, engineering, learning]
excerpt: Notes on how technical feedback loops shape product decisions.
---

Write the note in markdown here.
`}
        </pre>
      </div>
    </section>
  );
}
