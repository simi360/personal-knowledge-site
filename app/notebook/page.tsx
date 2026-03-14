import type { Metadata } from "next";
import { KnowledgeGraph } from "@/components/KnowledgeGraph";
import { buildGraph } from "@/lib/buildGraph";
import { getAllNotes } from "@/lib/getNotes";

export const metadata: Metadata = {
  title: "Notebook",
  description:
    "Explore a public engineering notebook as an interactive knowledge graph connecting topics, notes, and systems thinking."
};

export default function NotebookPage() {
  const notes = getAllNotes();
  const graph = buildGraph(notes);

  return (
    <main className="space-y-8 pb-20">
      <section className="max-w-3xl space-y-4">
        <p className="text-sm uppercase tracking-[0.35em] text-sky-200/70">Notebook</p>
        <h1 className="text-4xl font-semibold text-white md:text-5xl">Public knowledge map</h1>
        <p className="text-base leading-7 text-slate-400">
          Explore notes visually. Connections are generated from shared tags in the markdown
          frontmatter, so the map stays in sync with the repository.
        </p>
      </section>
      <KnowledgeGraph graph={graph} height={720} />
    </main>
  );
}
