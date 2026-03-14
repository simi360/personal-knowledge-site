import type { Metadata } from "next";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/ContactIcons";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Harsimran Kaur for engineering collaboration, product-minded software work, and thoughtful technical conversations."
};

export default function ContactPage() {
  return (
    <main className="space-y-10 pb-20">
      <section className="grid gap-8 xl:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-8 shadow-card">
          <p className="text-sm uppercase tracking-[0.35em] text-sky-200/70">Contact</p>
          <h1 className="mt-3 text-4xl font-semibold text-white md:text-5xl">Let&apos;s connect</h1>
          <p className="mt-5 text-base leading-7 text-slate-300">
            If you want to talk about software engineering, systems design, frontend architecture,
            product-aware development, or a potential collaboration, this is the right place.
          </p>
          <div className="mt-8 space-y-3">
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
        <ContactForm />
      </section>
    </main>
  );
}
