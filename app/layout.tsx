import type { Metadata } from "next";
import Link from "next/link";
import { IBM_Plex_Serif, Space_Grotesk } from "next/font/google";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/ContactIcons";
import { LogoMark } from "@/components/LogoMark";
import "./globals.css";

const sans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans"
});

const serif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-serif"
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"),
  title: {
    default: "Harsimran Kaur | Full-Stack Engineer",
    template: "%s | Harsimran Kaur"
  },
  description:
    "Full-stack engineer focused on scalable systems, thoughtful interfaces, and the intersection of engineering and product.",
  keywords: [
    "Harsimran Kaur",
    "software engineer",
    "full-stack engineer",
    "Next.js portfolio",
    "engineering notebook",
    "knowledge graph",
    "React",
    "ASP.NET",
    "systems design"
  ],
  openGraph: {
    title: "Harsimran Kaur | Full-Stack Engineer",
    description:
      "A public engineering notebook exploring systems, product thinking, debugging, and software design.",
    type: "website",
    siteName: "Harsimran Kaur"
  },
  twitter: {
    card: "summary_large_image",
    title: "Harsimran Kaur | Full-Stack Engineer",
    description:
      "A public engineering notebook exploring systems, product thinking, debugging, and software design."
  },
  alternates: {
    canonical: "/"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body className="font-sans">
        <div className="mx-auto min-h-screen max-w-7xl px-6 py-6 md:px-10 md:py-8">
          <header className="mb-10 flex flex-wrap items-center justify-between gap-5 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 shadow-card backdrop-blur">
            <LogoMark />
            <nav className="flex items-center gap-3 text-sm text-slate-300 md:gap-5">
              <Link href="/" className="transition hover:text-sky-200">
                Home
              </Link>
              <Link href="/notebook" className="transition hover:text-sky-200">
                Notebook
              </Link>
              <Link href="/about" className="transition hover:text-sky-200">
                About
              </Link>
              <Link
                href="/contact"
                className="rounded-full bg-sky-300 px-4 py-2 font-medium text-slate-950 transition hover:bg-sky-200"
              >
                Contact
              </Link>
            </nav>
          </header>
          {children}
          <footer className="mt-20 rounded-[1.75rem] border border-white/10 bg-white/[0.035] px-6 py-5 shadow-card">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-sky-200/70">Contact</p>
                <p className="mt-1 text-sm text-slate-400">
                  Available for engineering, product-minded collaboration, and thoughtful technical conversations.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 text-sm">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-slate-200 transition hover:border-sky-300/30 hover:text-white"
                >
                  <MailIcon />
                  Contact Page
                </a>
                <a
                  href="https://github.com/simi360"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-slate-200 transition hover:border-sky-300/30 hover:text-white"
                >
                  <GitHubIcon />
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/harsimrankaur360/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-slate-200 transition hover:border-sky-300/30 hover:text-white"
                >
                  <LinkedInIcon />
                  LinkedIn
                </a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
