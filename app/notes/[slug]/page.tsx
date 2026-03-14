import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllNotes, getNoteBySlug, getRelatedNotes } from "@/lib/getNotes";

type NotePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return getAllNotes().map((note) => ({
    slug: note.slug
  }));
}

export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = await getNoteBySlug(slug);

  if (!note) {
    return {
      title: "Note"
    };
  }

  return {
    title: note.title,
    description: note.excerpt,
    keywords: note.tags
  };
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = await getNoteBySlug(slug);

  if (!note?.html) {
    notFound();
  }

  const relatedNotes = getRelatedNotes(note, getAllNotes());

  return (
    <main className="grid gap-10 pb-20 xl:grid-cols-[1fr_320px]">
      <article className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-8 shadow-card md:p-12">
        <p className="text-sm uppercase tracking-[0.35em] text-sky-200/70">{note.date}</p>
        <h1 className="mt-4 text-4xl font-semibold text-white md:text-5xl">{note.title}</h1>
        <div className="mt-5 flex flex-wrap gap-2">
          {note.tags.map((tag) => (
            <Link
              key={tag}
              href={`/topic/${tag}`}
              className="rounded-full border border-sky-200/15 bg-sky-300/10 px-3 py-1 text-xs text-sky-100"
            >
              {tag}
            </Link>
          ))}
        </div>
        <div
          className="prose prose-invert mt-10 max-w-none"
          dangerouslySetInnerHTML={{ __html: note.html }}
        />
      </article>

      <aside className="space-y-5">
        <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-6 shadow-card">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Related Notes</p>
          <div className="mt-4 space-y-4">
            {relatedNotes.map((related) => (
              <Link
                key={related.slug}
                href={`/notes/${related.slug}`}
                className="block rounded-2xl border border-white/10 bg-slate-950/40 p-4 transition hover:border-sky-300/30 hover:bg-slate-950/55"
              >
                <h2 className="text-base font-medium text-white">{related.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">{related.excerpt}</p>
              </Link>
            ))}
            {relatedNotes.length === 0 ? (
              <p className="text-sm text-slate-400">No related notes yet.</p>
            ) : null}
          </div>
        </div>
      </aside>
    </main>
  );
}
