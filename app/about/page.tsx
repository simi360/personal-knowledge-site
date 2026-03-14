import type { Metadata } from "next";
import Image from "next/image";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/ContactIcons";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Harsimran Kaur, a software engineer focused on reliable systems, product-aware engineering, and mapping technical ideas in public."
};

export default function AboutPage() {
  return (
    <main className="space-y-10 pb-20">
      <section className="grid gap-8 xl:grid-cols-[0.78fr_1.22fr]">
        <div className="mx-auto w-full max-w-[420px] rounded-[2.2rem] border border-white/10 bg-white/[0.035] p-5 shadow-card">
          <div className="relative aspect-[3/4] overflow-hidden rounded-[1.8rem] border border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(125,211,252,0.18),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))]">
            <Image
              src="/profile-photo.jpg"
              alt="Portrait of Harsimran Kaur"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1280px) 100vw, 420px"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,17,31,0.04),rgba(7,17,31,0.46))]" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="inline-flex rounded-full border border-white/15 bg-slate-950/55 px-4 py-2 text-xs uppercase tracking-[0.3em] text-sky-100 backdrop-blur">
                Harsimran Kaur
              </div>
            </div>
          </div>
        </div>
        <section className="rounded-[2.2rem] border border-white/10 bg-white/[0.035] p-8 shadow-card md:p-12">
          <p className="text-sm uppercase tracking-[0.35em] text-sky-200/70">About</p>
          <h1 className="mt-4 text-4xl font-semibold text-white md:text-5xl">
            Engineering as a way of understanding systems
          </h1>
          <div className="mt-8 space-y-6 font-serif text-lg leading-8 text-slate-300">
            <p>
              I&apos;m a software engineer focused on building reliable systems and understanding
              the ideas that shape them.
            </p>
            <p>
              Over the past several years I&apos;ve worked across both backend and frontend
              development, building APIs, data-driven dashboards, and scalable web applications.
              Much of my work has involved improving the performance and reliability of existing
              systems, refactoring legacy code, optimizing databases, and designing tools that
              make complex workflows easier to manage.
            </p>
            <p>
              More recently, my interests have expanded beyond implementation into the broader
              space where engineering meets product development. I&apos;m increasingly drawn to how
              systems evolve as products grow, how technical decisions influence user experience,
              and how engineers participate in shaping the direction of a product.
            </p>
            <p>
              I enjoy exploring these ideas as much as building the systems themselves. This site
              is my public notebook, a place where I document lessons from building software,
              observations about engineering and product development, and thoughts about how ideas
              connect across different parts of the field.
            </p>
            <p>
              Software engineering is ultimately about understanding systems, technical, human, and
              organizational. This site is a small attempt to map that understanding as it grows.
            </p>
          </div>
          <div className="mt-10 rounded-[1.6rem] border border-white/10 bg-slate-950/45 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-sky-200/70">Contact</p>
            <div className="mt-5 grid gap-3">
              <a
                href="mailto:hi@harsimrankaur.com"
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-200 transition hover:border-sky-300/30 hover:text-white"
              >
                <MailIcon className="h-5 w-5" />
                hi@harsimrankaur.com
              </a>
              <a
                href="https://github.com/simi360"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-200 transition hover:border-sky-300/30 hover:text-white"
              >
                <GitHubIcon className="h-5 w-5" />
                github.com/simi360
              </a>
              <a
                href="https://www.linkedin.com/in/harsimrankaur360/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-200 transition hover:border-sky-300/30 hover:text-white"
              >
                <LinkedInIcon className="h-5 w-5" />
                linkedin.com/in/harsimrankaur360
              </a>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
