# Personal Knowledge Site

A Next.js personal website that combines a landing page, markdown notebook, and an interactive knowledge graph built with React Flow.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- React Flow
- Framer Motion
- Markdown content in `/content`

## Local development

```bash
npm install
npm run dev
```

## Content model

Add markdown files under `content/` with frontmatter:

```md
---
title: Example Note
date: 2026-03-13
tags: [engineering, example]
excerpt: Short summary shown in cards and the graph preview.
---
```
