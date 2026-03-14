"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  type Edge,
  type Node,
  type NodeMouseHandler
} from "reactflow";
import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceRadial,
  forceSimulation,
  forceX,
  forceY,
  type SimulationLinkDatum,
  type SimulationNodeDatum
} from "d3-force";
import "reactflow/dist/style.css";
import { NodePreviewCard } from "@/components/NodePreviewCard";
import { GraphNode } from "@/components/GraphNode";
import type { NoteGraph, GraphEdgeData, GraphNodeData } from "@/lib/types";

type KnowledgeGraphProps = {
  graph: NoteGraph;
  height?: number;
  focusTopicId?: string | null;
  defaultSelectionId?: string | null;
  showInspector?: boolean;
};

type HoverState = {
  nodeId: string;
  x: number;
  y: number;
};

type RevealStage = 0 | 1 | 2 | 3;

type SimulationNode = SimulationNodeDatum & {
  id: string;
  kind: GraphNodeData["kind"];
  x: number;
  y: number;
  fx?: number;
  fy?: number;
};

type SimulationEdge = SimulationLinkDatum<SimulationNode>;

const nodeTypes = {
  note: GraphNode
};

const CENTER_X = 720;
const CENTER_Y = 430;

function getSimulationNodeId(node: string | number | SimulationNode) {
  if (typeof node === "string") {
    return node;
  }

  if (typeof node === "number") {
    return String(node);
  }

  return node.id;
}

function buildAnchorMap(nodes: Node<GraphNodeData>[]) {
  const topics = nodes.filter((node) => node.data.kind === "topic");
  const anchors = new Map<string, { x: number; y: number }>();
  const radius = Math.max(240, 180 + topics.length * 14);

  topics.forEach((topic, index) => {
    const angle = (index / Math.max(topics.length, 1)) * Math.PI * 2 - Math.PI / 2;
    anchors.set(topic.id, {
      x: CENTER_X + Math.cos(angle) * radius,
      y: CENTER_Y + Math.sin(angle) * radius
    });
  });

  return anchors;
}

export function KnowledgeGraph({
  graph,
  height = 620,
  focusTopicId = null,
  defaultSelectionId = null,
  showInspector = true
}: KnowledgeGraphProps) {
  const [hovered, setHovered] = useState<HoverState | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(focusTopicId ?? defaultSelectionId);
  const [revealStage, setRevealStage] = useState<RevealStage>(0);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [layoutNodes, setLayoutNodes] = useState<Node<GraphNodeData>[]>(graph.nodes);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedNodeId(focusTopicId ?? defaultSelectionId);
  }, [defaultSelectionId, focusTopicId]);

  useEffect(() => {
    const stages = [
      window.setTimeout(() => setRevealStage(1), 150),
      window.setTimeout(() => setRevealStage(2), 700),
      window.setTimeout(() => setRevealStage(3), 1250)
    ];

    return () => {
      stages.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, []);

  useEffect(() => {
    const anchors = buildAnchorMap(graph.nodes);
    const simulationNodes: SimulationNode[] = graph.nodes.map((node) => ({
      id: node.id,
      kind: node.data.kind,
      x: node.position.x,
      y: node.position.y,
      fx: node.data.kind === "identity" ? CENTER_X : undefined,
      fy: node.data.kind === "identity" ? CENTER_Y : undefined
    }));

    const simulationEdges: SimulationEdge[] = graph.edges.map((edge) => ({
      source: edge.source,
      target: edge.target
    }));

    const simulation = forceSimulation<SimulationNode>(simulationNodes)
      .force(
        "charge",
        forceManyBody<SimulationNode>().strength((node) => (node.kind === "note" ? -170 : -520))
      )
      .force(
        "link",
        forceLink<SimulationNode, SimulationEdge>(simulationEdges)
          .id((node) => node.id)
          .distance((edge) => {
            const source = getSimulationNodeId(edge.source);

            return source.startsWith("identity:") ? 210 : 125;
          })
          .strength((edge) => {
            const source = getSimulationNodeId(edge.source);

            return source.startsWith("identity:") ? 0.42 : 0.85;
          })
      )
      .force("center", forceCenter(CENTER_X, CENTER_Y))
      .force(
        "topic-ring",
        forceRadial<SimulationNode>(
          250,
          CENTER_X,
          CENTER_Y
        ).strength((node) => (node.kind === "topic" ? 0.95 : 0))
      )
      .force(
        "topic-anchor-x",
        forceX<SimulationNode>((node) => (node.kind === "topic" ? anchors.get(node.id)?.x ?? CENTER_X : CENTER_X))
          .strength((node) => (node.kind === "topic" ? 0.38 : 0.02))
      )
      .force(
        "topic-anchor-y",
        forceY<SimulationNode>((node) => (node.kind === "topic" ? anchors.get(node.id)?.y ?? CENTER_Y : CENTER_Y))
          .strength((node) => (node.kind === "topic" ? 0.38 : 0.02))
      )
      .force(
        "note-center-x",
        forceX<SimulationNode>((node) => (node.kind === "note" ? CENTER_X : CENTER_X)).strength((node) =>
          node.kind === "note" ? 0.04 : 0
        )
      )
      .force(
        "note-center-y",
        forceY<SimulationNode>((node) => (node.kind === "note" ? CENTER_Y : CENTER_Y)).strength((node) =>
          node.kind === "note" ? 0.04 : 0
        )
      )
      .force(
        "collision",
        forceCollide<SimulationNode>().radius((node) =>
          node.kind === "identity" ? 110 : node.kind === "topic" ? 70 : 26
        )
      )
      .stop();

    for (let tick = 0; tick < 220; tick += 1) {
      simulation.tick();
    }

    setLayoutNodes(
      graph.nodes.map((node) => {
        const positioned = simulationNodes.find((entry) => entry.id === node.id);

        return {
          ...node,
          position: {
            x: positioned?.x ?? node.position.x,
            y: positioned?.y ?? node.position.y
          }
        };
      })
    );

    simulation.stop();
  }, [graph]);

  const hoveredNode = useMemo(
    () => layoutNodes.find((node) => node.id === hovered?.nodeId) ?? null,
    [layoutNodes, hovered?.nodeId]
  );

  const selectedNode = useMemo(
    () => layoutNodes.find((node) => node.id === selectedNodeId) ?? null,
    [layoutNodes, selectedNodeId]
  );

  const activeTopicId =
    selectedNode?.data.kind === "topic"
      ? selectedNode.id
      : selectedNode?.data.kind === "identity"
        ? "identity:harsimran-kaur"
        : focusTopicId;

  const visibleNodeIds = useMemo(() => {
    const base = new Set<string>();

    if (revealStage >= 1) {
      base.add("identity:harsimran-kaur");
    }

    if (revealStage >= 2) {
      layoutNodes
        .filter((node) => node.data.kind === "topic")
        .forEach((node) => base.add(node.id));
    }

    if (revealStage >= 3 && activeTopicId) {
      if (activeTopicId === "identity:harsimran-kaur") {
        layoutNodes
          .filter((node) => node.data.kind === "note")
          .forEach((node) => base.add(node.id));
      } else {
        layoutNodes
          .filter((node) => node.data.kind === "note" && node.data.topicIds?.includes(activeTopicId))
          .forEach((node) => base.add(node.id));
      }
    }

    return base;
  }, [activeTopicId, layoutNodes, revealStage]);

  const enhanced = useMemo(() => {
    let visibleNodes = layoutNodes.filter((node) => visibleNodeIds.has(node.id));
    const visibleEdges = graph.edges.filter(
      (edge) => visibleNodeIds.has(edge.source) && visibleNodeIds.has(edge.target)
    );

    const noteNodes = visibleNodes.filter((node) => node.data.kind === "note");

    if (noteNodes.length > 0) {
      visibleNodes = visibleNodes.map((node) => {
        if (node.data.kind !== "note") {
          return node;
        }

        if (activeTopicId === "identity:harsimran-kaur") {
          const index = noteNodes.findIndex((entry) => entry.id === node.id);
          const total = noteNodes.length;
          const columns = Math.min(4, Math.max(1, Math.ceil(total / 2)));
          const row = Math.floor(index / columns);
          const column = index % columns;

          return {
            ...node,
            position: {
              x: CENTER_X - ((columns - 1) * 160) / 2 + column * 160,
              y: CENTER_Y + 250 + row * 92
            }
          };
        }

        const topicNode = layoutNodes.find((entry) => entry.id === activeTopicId);
        const cluster = noteNodes.filter((entry) => entry.data.topicIds?.includes(activeTopicId ?? ""));
        const index = Math.max(0, cluster.findIndex((entry) => entry.id === node.id));
        const angleStart = Math.PI * 0.15;
        const angleEnd = Math.PI * 0.85;
        const angle =
          cluster.length <= 1
            ? Math.PI / 2
            : angleStart + ((angleEnd - angleStart) * index) / Math.max(cluster.length - 1, 1);
        const radius = 200 + (index % 2) * 28;

        return {
          ...node,
          position: {
            x: (topicNode?.position.x ?? CENTER_X) + Math.cos(angle) * radius,
            y: (topicNode?.position.y ?? CENTER_Y) + Math.sin(angle) * radius + 36
          }
        };
      });
    }

    if (!hoveredNode) {
      const nodes: Node<GraphNodeData>[] = visibleNodes.map((node) => {
        const pinnedTopic = selectedNodeId === node.id;
        const relatedToPinnedTopic =
          selectedNodeId === null
            ? true
            : selectedNodeId === "identity:harsimran-kaur"
            ? true
            : selectedNodeId.startsWith("topic:")
              ? node.id === "identity:harsimran-kaur" ||
                node.id === selectedNodeId ||
                (node.data.kind === "note" && node.data.topicIds?.includes(selectedNodeId))
              : true;

        return {
          ...node,
          data: {
            ...node.data,
            isActive: pinnedTopic,
            isNeighbor: relatedToPinnedTopic && !pinnedTopic,
            isDimmed:
              selectedNodeId !== null && selectedNodeId !== "identity:harsimran-kaur"
                ? !relatedToPinnedTopic
                : false
          }
        };
      });

      const edges: Edge<GraphEdgeData>[] = visibleEdges.map((edge) => {
        const relatedToPinnedTopic =
          selectedNodeId === null
            ? true
            : selectedNodeId === "identity:harsimran-kaur"
            ? true
            : edge.source === selectedNodeId || edge.target === selectedNodeId;

        return {
          ...edge,
          style: {
            ...edge.style,
            opacity:
              selectedNodeId !== null && selectedNodeId !== "identity:harsimran-kaur"
                ? relatedToPinnedTopic
                  ? 1
                  : 0.18
                : 1
          }
        };
      });

      return {
        nodes,
        edges
      };
    }

    const relatedNodeIds = new Set<string>([hoveredNode.id]);

    visibleEdges.forEach((edge) => {
      if (edge.source === hoveredNode.id || edge.target === hoveredNode.id) {
        relatedNodeIds.add(edge.source);
        relatedNodeIds.add(edge.target);
      }
    });

    if (hoveredNode.data.kind === "topic") {
      relatedNodeIds.add("identity:harsimran-kaur");
    }

    const nodes: Node<GraphNodeData>[] = visibleNodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        isActive: node.id === hoveredNode.id,
        isNeighbor: relatedNodeIds.has(node.id) && node.id !== hoveredNode.id,
        isDimmed: !relatedNodeIds.has(node.id)
      }
    }));

    const edges: Edge<GraphEdgeData>[] = visibleEdges.map((edge) => {
      const active = edge.source === hoveredNode.id || edge.target === hoveredNode.id;
      const related = relatedNodeIds.has(edge.source) && relatedNodeIds.has(edge.target);

      return {
        ...edge,
        data: {
          ...edge.data,
          isActive: active,
          isDimmed: !related
        },
        style: {
          ...edge.style,
          stroke: active
            ? edge.data.kind === "identity-topic"
              ? "rgba(153, 246, 228, 0.88)"
              : "rgba(196, 241, 255, 0.92)"
            : edge.style?.stroke,
          opacity: related ? 1 : 0.18,
          strokeWidth: active ? 2.8 : edge.style?.strokeWidth ?? 1.4
        }
      };
    });

    return { nodes, edges };
  }, [activeTopicId, graph.edges, hoveredNode, layoutNodes, selectedNodeId, visibleNodeIds]);

  const onNodeMouseEnter: NodeMouseHandler = (event, node) => {
    const bounds = containerRef.current?.getBoundingClientRect();

    setHovered({
      nodeId: node.id,
      x: event.clientX - (bounds?.left ?? 0),
      y: event.clientY - (bounds?.top ?? 0)
    });
  };

  const onNodeMouseMove: NodeMouseHandler = (event, node) => {
    const bounds = containerRef.current?.getBoundingClientRect();

    setHovered({
      nodeId: node.id,
      x: event.clientX - (bounds?.left ?? 0),
      y: event.clientY - (bounds?.top ?? 0)
    });

    if (!bounds) {
      return;
    }

    setPointer({
      x: ((event.clientX - bounds.left) / bounds.width - 0.5) * 18,
      y: ((event.clientY - bounds.top) / bounds.height - 0.5) * 18
    });
  };

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-surface/70 shadow-card">
      <div
        className="pointer-events-none absolute inset-0 z-0 graph-grid transition duration-700"
        style={{
          opacity: revealStage >= 1 ? 0.82 : 0,
          transform: `translate3d(${pointer.x}px, ${pointer.y}px, 0)`
        }}
      />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(125,211,252,0.14),transparent_55%)]" />
      <div ref={containerRef} className="relative z-10" style={{ height }}>
        <ReactFlow
          nodes={enhanced.nodes}
          edges={enhanced.edges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.16, duration: 900 }}
          minZoom={0.45}
          maxZoom={1.8}
          defaultEdgeOptions={{
            type: "bezier"
          }}
          onNodeMouseEnter={onNodeMouseEnter}
          onNodeMouseMove={onNodeMouseMove}
          onNodeMouseLeave={() => setHovered(null)}
          onPaneMouseMove={(event) => {
            const bounds = containerRef.current?.getBoundingClientRect();

            if (!bounds) {
              return;
            }

            setPointer({
              x: ((event.clientX - bounds.left) / bounds.width - 0.5) * 18,
              y: ((event.clientY - bounds.top) / bounds.height - 0.5) * 18
            });
          }}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable
          onPaneClick={() => {
            if (!focusTopicId) {
              setSelectedNodeId(null);
            }
          }}
          onNodeClick={(_, node) => {
            if (node.data.kind === "identity" || node.data.kind === "topic") {
              setSelectedNodeId(node.id);
              setHovered(null);
            }
          }}
          className="bg-transparent"
          proOptions={{ hideAttribution: true }}
        >
          <Background color="rgba(148, 163, 184, 0.06)" gap={36} />
          <MiniMap
            pannable
            zoomable
            nodeColor={(node) => {
              if (node.data?.kind === "identity") {
                return "rgba(45, 212, 191, 0.9)";
              }

              if (node.data?.kind === "topic") {
                return "rgba(125, 211, 252, 0.85)";
              }

              return "rgba(241, 245, 249, 0.75)";
            }}
            maskColor="rgba(2, 6, 23, 0.48)"
          />
          <Controls showInteractive={false} />
        </ReactFlow>
        {hoveredNode ? (
          <NodePreviewCard
            kind={hoveredNode.data.kind}
            title={hoveredNode.data.note?.title ?? hoveredNode.data.label}
            excerpt={hoveredNode.data.note?.excerpt ?? hoveredNode.data.excerpt}
            tags={hoveredNode.data.note?.tags ?? hoveredNode.data.tags}
            x={hovered?.x ?? 0}
            y={hovered?.y ?? 0}
          />
        ) : null}
      </div>
      {showInspector ? (
      <div className="relative z-20 border-t border-white/10 bg-slate-950/60 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-sky-200/70">Selected</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">
              {selectedNode?.data.kind === "identity"
                ? "All Notes"
                : selectedNode?.data.kind === "topic"
                  ? selectedNode.data.label
                  : "Choose a node"}
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              {selectedNode?.data.kind === "identity"
                ? "A full view of the notebook. Select a topic to focus the graph and filter the notes below."
                : selectedNode?.data.kind === "topic"
                  ? selectedNode.data.excerpt
                  : "Click Harsimran Kaur to reveal all notes, or click a topic to expand that cluster."}
            </p>
          </div>
          {selectedNode?.data.kind === "topic" && selectedNode.data.slug ? (
            <Link
              href={`/topic/${selectedNode.data.slug}`}
              className="rounded-full border border-sky-200/20 bg-sky-300/10 px-4 py-2 text-sm text-sky-100 transition hover:bg-sky-300/15"
            >
              Open Topic Page
            </Link>
          ) : null}
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {layoutNodes
            .filter((node) => {
              if (node.data.kind !== "note" || !node.data.note) {
                return false;
              }

              if (selectedNode?.data.kind === "identity") {
                return true;
              }

              if (selectedNode?.data.kind === "topic") {
                return node.data.topicIds?.includes(selectedNode.id);
              }

              return false;
            })
            .map((node) => (
              <Link
                key={node.id}
                href={`/notes/${node.data.note?.slug}`}
                className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-4 transition hover:border-sky-300/30 hover:bg-white/[0.05]"
              >
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                  {node.data.note?.date}
                </p>
                <h4 className="mt-2 text-base font-medium text-white">{node.data.note?.title}</h4>
                <p className="mt-2 text-sm leading-6 text-slate-400">{node.data.note?.excerpt}</p>
              </Link>
            ))}
        </div>
      </div>
      ) : null}
    </div>
  );
}
