"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { NodeProps } from "reactflow";
import type { GraphNodeData } from "@/lib/types";

export function GraphNode({ data, selected }: NodeProps<GraphNodeData>) {
  const isIdentity = data.kind === "identity";
  const isTopic = data.kind === "topic";
  const isNote = data.kind === "note" && data.note;
  const scale = data.isActive ? 1.12 : data.isNeighbor ? 1.05 : 1;
  const opacity = data.isDimmed ? 0.22 : 1;

  const nodeBody = (
    <motion.div
      initial={{ opacity: 0, scale: 0.65, filter: "blur(10px)" }}
      animate={{
        opacity,
        scale,
        y: [0, -6, 0],
        filter: "blur(0px)"
      }}
      transition={{
        opacity: {
          duration: 0.45,
          delay: data.revealDelay ?? 0
        },
        scale: {
          duration: 0.25,
          delay: data.revealDelay ?? 0
        },
        filter: {
          duration: 0.4,
          delay: data.revealDelay ?? 0
        },
        y: {
          repeat: Infinity,
          duration: isIdentity ? 8.5 : isTopic ? 6.8 : 5.2,
          ease: "easeInOut",
          delay: data.revealDelay ?? 0
        }
      }}
      className="group relative"
      style={{ transformPerspective: 1000 }}
    >
      <div
        className={[
          "flex items-center justify-center rounded-full border backdrop-blur transition duration-300",
          isIdentity
            ? "h-28 w-28 border-emerald-200/35 bg-emerald-300/12 shadow-[0_0_90px_rgba(45,212,191,0.28)]"
            : isTopic
              ? "h-14 min-w-14 border-sky-200/30 bg-sky-300/12 px-5 shadow-[0_0_48px_rgba(125,211,252,0.24)]"
              : "h-5 w-5 border-slate-100/10 bg-slate-100/95 shadow-[0_0_18px_rgba(255,255,255,0.18)]",
          data.isActive
            ? "border-white/70 shadow-[0_0_70px_rgba(196,241,255,0.45)]"
            : "",
          data.isNeighbor && !isIdentity && !isTopic
            ? "bg-sky-200 shadow-[0_0_30px_rgba(125,211,252,0.45)]"
            : "",
          selected ? "ring-4 ring-sky-200/20" : ""
        ].join(" ")}
      >
        {isIdentity ? (
          <span className="px-4 text-center text-[12px] font-medium uppercase tracking-[0.3em] text-emerald-50">
            {data.label}
          </span>
        ) : isTopic ? (
          <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-sky-100">
            {data.label}
          </span>
        ) : (
          <span className="h-1.5 w-1.5 rounded-full bg-slate-950" />
        )}
      </div>

      {isNote ? (
        <div className="absolute left-7 top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-full border border-white/10 bg-slate-950/75 px-3 py-1 text-xs text-slate-200 shadow-card backdrop-blur md:block">
          {data.label}
        </div>
      ) : null}
    </motion.div>
  );

  if (isNote) {
    const slug = data.note?.slug;

    if (!slug) {
      return <div className="cursor-pointer">{nodeBody}</div>;
    }

    return (
      <Link href={`/notes/${slug}`} className="block cursor-pointer focus:outline-none">
        {nodeBody}
      </Link>
    );
  }

  return <div className="cursor-pointer">{nodeBody}</div>;
}
