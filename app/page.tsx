import type { Metadata } from "next";
import Link from "next/link";
import { HeroSection } from "@/components/HeroSection";
import { KnowledgeGraph } from "@/components/KnowledgeGraph";
import { SkillGrid } from "@/components/SkillGrid";
import { buildGraph } from "@/lib/buildGraph";
import { getAllNotes } from "@/lib/getNotes";

export const metadata: Metadata = {
  title: "Full-Stack Engineer",
  description:
    "Full-stack engineer focused on scalable systems, thoughtful interfaces, and the intersection of engineering and product."
};

export default function HomePage() {
  const notes = getAllNotes();
  const latestNotes = notes.slice(0, 3);
  const graph = buildGraph(notes);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Harsimran Kaur",
    jobTitle: "Full-Stack Software Engineer",
    description:
      "Full-stack engineer focused on scalable systems, thoughtful interfaces, and the intersection of engineering and product.",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"
  };

  return (
    <main className="space-y-24 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HeroSection />

      <SkillGrid />

      <section id="graph-preview" className="grid gap-10 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5">
          <p className="text-sm uppercase tracking-[0.35em] text-sky-200/70">Knowledge Graph</p>
          <h2 className="text-3xl font-semibold text-white md:text-4xl">
            Notes connected by shared ideas
          </h2>
          <p className="max-w-2xl text-base leading-7 text-slate-400">
            Every note becomes a node. Shared tags create the structure, so the graph updates as
            new markdown files are added.
          </p>
          <Link
            href="/notebook"
            className="inline-flex rounded-full border border-sky-200/20 bg-sky-300/10 px-5 py-2.5 text-sm text-sky-100 transition hover:bg-sky-300/15"
          >
            Open full explorer
          </Link>
        </div>
        <div className="space-y-4 rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-6 shadow-card">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Latest Notes</p>
          <div className="space-y-4">
            {latestNotes.map((note) => (
              <Link
                key={note.slug}
                href={`/notes/${note.slug}`}
                className="block rounded-2xl border border-white/10 bg-slate-950/40 p-4 transition hover:border-sky-300/30 hover:bg-slate-950/55"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">{note.date}</p>
                <h3 className="mt-2 text-lg font-medium text-white">{note.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{note.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <KnowledgeGraph graph={graph} height={540} showInspector={false} />
    </main>
  );
}
