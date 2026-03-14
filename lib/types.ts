import type { Node, Edge } from "reactflow";

export type NoteFrontmatter = {
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
};

export type Note = NoteFrontmatter & {
  slug: string;
  content: string;
  html?: string;
};

export type GraphNodeData = {
  kind: "identity" | "topic" | "note";
  label: string;
  slug?: string;
  excerpt?: string;
  tags?: string[];
  topicIds?: string[];
  note?: Pick<Note, "slug" | "title" | "excerpt" | "tags" | "date">;
  topic?: string;
  connectionCount?: number;
  revealDelay?: number;
  isActive?: boolean;
  isNeighbor?: boolean;
  isDimmed?: boolean;
};

export type GraphNode = Node<GraphNodeData>;

export type GraphEdgeData = {
  kind: "identity-topic" | "topic-note" | "topic-topic";
  sharedTags: string[];
  isActive?: boolean;
  isDimmed?: boolean;
};

export type NoteGraph = {
  nodes: GraphNode[];
  edges: Edge<GraphEdgeData>[];
};
