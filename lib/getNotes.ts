import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";
import type { Note } from "@/lib/types";

const contentDirectory = path.join(process.cwd(), "content");

function normalizeDate(value: unknown): string {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  return typeof value === "string" ? value : "";
}

function parseNoteFile(slug: string, raw: string): Note {
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title,
    date: normalizeDate(data.date),
    tags: data.tags ?? [],
    excerpt: data.excerpt,
    content
  };
}

export function getAllNotes(): Note[] {
  const files = fs.readdirSync(contentDirectory).filter((file) => file.endsWith(".md"));

  return files
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(contentDirectory, fileName);
      const raw = fs.readFileSync(fullPath, "utf8");

      return parseNoteFile(slug, raw);
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getNoteBySlug(slug: string): Promise<Note | null> {
  const fullPath = path.join(contentDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const raw = fs.readFileSync(fullPath, "utf8");
  const note = parseNoteFile(slug, raw);
  const processed = await remark().use(gfm).use(html).process(note.content);

  return {
    ...note,
    html: processed.toString()
  };
}

export function getRelatedNotes(target: Note, notes: Note[], limit = 3): Note[] {
  return notes
    .filter((note) => note.slug !== target.slug)
    .map((note) => {
      const sharedTags = note.tags.filter((tag) => target.tags.includes(tag));

      return {
        note,
        score: sharedTags.length
      };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.note);
}

export function getAllTopics(notes: Note[]) {
  const topics = new Map<string, number>();

  notes.forEach((note) => {
    note.tags.forEach((tag) => {
      topics.set(tag, (topics.get(tag) ?? 0) + 1);
    });
  });

  return [...topics.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([slug, count]) => ({
      slug,
      title: slug,
      count
    }));
}

export function getNotesByTopic(topic: string, notes: Note[]): Note[] {
  return notes.filter((note) => note.tags.includes(topic));
}
