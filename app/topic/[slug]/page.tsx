import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { KnowledgeGraph } from "@/components/KnowledgeGraph";
import { buildGraph } from "@/lib/buildGraph";
import { getAllNotes, getAllTopics, getNotesByTopic } from "@/lib/getNotes";

type TopicPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return getAllTopics(getAllNotes()).map((topic) => ({
    slug: topic.slug
  }));
}

export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: `${slug} Topic`,
    description: `Notes and graph connections related to ${slug}.`
  };
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { slug } = await params;
  const notes = getAllNotes();
  const topic = getAllTopics(notes).find((entry) => entry.slug === slug);

  if (!topic) {
    notFound();
  }

  const topicNotes = getNotesByTopic(slug, notes);

  return (
    <main className="space-y-10 pb-20">
      <section className="max-w-3xl space-y-4">
        <p className="text-sm uppercase tracking-[0.35em] text-sky-200/70">Topic</p>
        <h1 className="text-4xl font-semibold text-white md:text-5xl">{topic.title}</h1>
        <p className="text-base leading-7 text-slate-400">
          {topic.count} connected note{topic.count === 1 ? "" : "s"} in this cluster.
        </p>
      </section>

      <KnowledgeGraph graph={buildGraph(notes)} focusTopicId={`topic:${slug}`} height={680} />

      <section className="grid gap-4 md:grid-cols-2">
        {topicNotes.map((note) => (
          <Link
            key={note.slug}
            href={`/notes/${note.slug}`}
            className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-6 shadow-card transition hover:border-sky-300/30 hover:bg-white/[0.06]"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500">{note.date}</p>
            <h2 className="mt-2 text-xl font-medium text-white">{note.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">{note.excerpt}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
