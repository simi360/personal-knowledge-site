import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#07111f",
        surface: "#0d1728",
        panel: "#10203b",
        line: "rgba(125, 211, 252, 0.25)",
        accent: "#7dd3fc",
        glow: "#c4f1ff",
        mist: "#8fb5ff",
        rose: "#f59e9e"
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top, rgba(125,211,252,0.18), transparent 35%), linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)"
      },
      backgroundSize: {
        "hero-grid": "auto, 56px 56px, 56px 56px"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(125,211,252,0.25), 0 0 30px rgba(125,211,252,0.18)",
        card: "0 20px 80px rgba(3, 7, 18, 0.45)"
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"]
      },
      animation: {
        drift: "drift 8s ease-in-out infinite"
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translate3d(0px, 0px, 0px)" },
          "50%": { transform: "translate3d(0px, -8px, 0px)" }
        }
      },
      typography: {
        invert: {
          css: {
            "--tw-prose-body": "#dbe7ff",
            "--tw-prose-headings": "#f8fbff",
            "--tw-prose-links": "#7dd3fc",
            "--tw-prose-bold": "#f8fbff",
            "--tw-prose-counters": "#8da6c8",
            "--tw-prose-bullets": "#37557f",
            "--tw-prose-hr": "rgba(125, 211, 252, 0.14)",
            "--tw-prose-quotes": "#eef6ff",
            "--tw-prose-quote-borders": "rgba(125, 211, 252, 0.24)",
            "--tw-prose-captions": "#8da6c8",
            "--tw-prose-code": "#f8fbff",
            "--tw-prose-pre-code": "#dbe7ff",
            "--tw-prose-pre-bg": "#08111f"
          }
        }
      }
    }
  },
  plugins: [typography]
};

export default config;
