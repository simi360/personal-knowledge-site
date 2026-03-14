type NodePreviewCardProps = {
  kind: "identity" | "topic" | "note";
  title: string;
  excerpt?: string;
  tags?: string[];
  x: number;
  y: number;
};

export function NodePreviewCard({ kind, title, excerpt, tags = [], x, y }: NodePreviewCardProps) {
  return (
    <div
      className="pointer-events-none absolute z-20 w-80 rounded-2xl border border-sky-200/20 bg-slate-950/90 p-4 shadow-[0_24px_80px_rgba(2,6,23,0.7)] backdrop-blur"
      style={{
        left: Math.min(x + 18, 980),
        top: Math.max(y - 14, 100),
        transform: "translateY(-100%)"
      }}
    >
      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{kind}</p>
      <h3 className="mt-2 text-lg font-semibold text-white">{title}</h3>
      {excerpt ? <p className="mt-2 text-sm leading-6 text-slate-300">{excerpt}</p> : null}
      {tags.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-sky-200/15 bg-sky-300/10 px-2.5 py-1 text-xs text-sky-100"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
