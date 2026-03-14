import Link from "next/link";

export function LogoMark() {
  return (
    <Link href="/" className="group inline-flex items-center gap-3">
      <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-slate-950/70 shadow-[0_0_36px_rgba(125,211,252,0.18)]">
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(196,241,255,0.85),transparent_34%),radial-gradient(circle_at_70%_70%,rgba(45,212,191,0.55),transparent_38%),linear-gradient(135deg,rgba(125,211,252,0.16),rgba(244,114,182,0.18))]" />
        <span className="relative text-sm font-semibold uppercase tracking-[0.34em] text-white">HK</span>
      </span>
      <span className="hidden md:block">
        <span className="block text-xs uppercase tracking-[0.34em] text-sky-100/70">Harsimran Kaur</span>
        <span className="block text-sm text-slate-300 transition group-hover:text-white">
          Engineering notebook
        </span>
      </span>
    </Link>
  );
}
