import type { Edge } from "reactflow";
import type { Note, NoteGraph, GraphNode, GraphEdgeData } from "@/lib/types";

const IDENTITY_NODE_ID = "identity:harsimran-kaur";

function seededPosition(index: number, total: number, radius: number, centerX: number, centerY: number) {
  const angle = (index / Math.max(total, 1)) * Math.PI * 2 - Math.PI / 2;

  return {
    x: centerX + Math.cos(angle) * radius,
    y: centerY + Math.sin(angle) * radius
  };
}

function topicEdgeStyle() {
  return {
    stroke: "rgba(153, 246, 228, 0.34)",
    strokeWidth: 1.8
  };
}

function noteEdgeStyle() {
  return {
    stroke: "rgba(125, 211, 252, 0.32)",
    strokeWidth: 1.45
  };
}

function topicRelationshipStyle(weight: number) {
  return {
    stroke: "rgba(244, 114, 182, 0.2)",
    strokeWidth: 1 + weight * 0.22
  };
}

export function buildGraph(notes: Note[]): NoteGraph {
  const tagFrequency = new Map<string, number>();

  notes.forEach((note) => {
    note.tags.forEach((tag) => {
      tagFrequency.set(tag, (tagFrequency.get(tag) ?? 0) + 1);
    });
  });

  const tags = [...tagFrequency.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tag]) => tag);

  const centerX = 720;
  const centerY = 430;
  const topicRadius = Math.max(240, 180 + tags.length * 12);

  const nodes: GraphNode[] = [
    {
      id: IDENTITY_NODE_ID,
      type: "note",
      position: { x: centerX, y: centerY },
      data: {
        kind: "identity",
        label: "Harsimran Kaur",
        excerpt: "Full-Stack Software Engineer building software and documenting what she learns.",
        tags: ["notebook", "engineering", "learning"],
        connectionCount: tags.length,
        revealDelay: 0.2
      }
    },
    ...tags.map((tag, index) => ({
      id: `topic:${tag}`,
      type: "note",
      position: seededPosition(index, tags.length, topicRadius, centerX, centerY),
      data: {
        kind: "topic" as const,
        label: tag,
        slug: tag,
        excerpt: `${tagFrequency.get(tag)} notes connected through ${tag}.`,
        tags: [tag],
        topic: tag,
        connectionCount: tagFrequency.get(tag),
        revealDelay: 0.55 + index * 0.08
      }
    })),
    ...notes.map((note, index) => {
      const primaryTopic = [...note.tags].sort((a, b) => {
        const frequencyDelta = (tagFrequency.get(b) ?? 0) - (tagFrequency.get(a) ?? 0);

        return frequencyDelta || a.localeCompare(b);
      })[0];
      const base = primaryTopic
        ? seededPosition(tags.indexOf(primaryTopic), tags.length, topicRadius + 150, centerX, centerY)
        : { x: centerX + 220, y: centerY };

      return {
        id: note.slug,
        type: "note",
        position: {
          x: base.x + ((index % 5) - 2) * 44,
          y: base.y + ((index % 4) - 1.5) * 36
        },
        data: {
          kind: "note",
          label: note.title,
          slug: note.slug,
          excerpt: note.excerpt,
          tags: note.tags,
          topicIds: note.tags.map((tag) => `topic:${tag}`),
          connectionCount: note.tags.length,
          revealDelay: 1.15 + index * 0.04,
          note: {
            slug: note.slug,
            title: note.title,
            excerpt: note.excerpt,
            tags: note.tags,
            date: note.date
          }
        }
      };
    })
  ];

  const edges: Edge<GraphEdgeData>[] = tags.map((tag) => ({
    id: `identity-${tag}`,
    source: IDENTITY_NODE_ID,
    target: `topic:${tag}`,
    animated: true,
    data: {
      kind: "identity-topic",
      sharedTags: [tag]
    },
    style: topicEdgeStyle()
  }));

  notes.forEach((note) => {
    note.tags.forEach((tag) => {
      edges.push({
        id: `topic-note:${tag}:${note.slug}`,
        source: `topic:${tag}`,
        target: note.slug,
        animated: true,
        data: {
          kind: "topic-note",
          sharedTags: [tag]
        },
        style: noteEdgeStyle()
      });
    });
  });

  const topicRelationships = new Map<string, { source: string; target: string; weight: number }>();

  notes.forEach((note) => {
    for (let i = 0; i < note.tags.length; i += 1) {
      for (let j = i + 1; j < note.tags.length; j += 1) {
        const [left, right] = [note.tags[i], note.tags[j]].sort();
        const key = `${left}:${right}`;
        const existing = topicRelationships.get(key);

        topicRelationships.set(key, {
          source: `topic:${left}`,
          target: `topic:${right}`,
          weight: (existing?.weight ?? 0) + 1
        });
      }
    }
  });

  topicRelationships.forEach((relationship, key) => {
    edges.push({
      id: `topic-topic:${key}`,
      source: relationship.source,
      target: relationship.target,
      animated: false,
      data: {
        kind: "topic-topic",
        sharedTags: key.split(":")
      },
      style: topicRelationshipStyle(relationship.weight)
    });
  });

  return {
    nodes,
    edges
  };
}
