# Adding Notes

Add a new markdown file to `content/`.

Example:

```md
---
title: Product Feedback Loops
date: 2026-03-13
tags: [product, engineering, learning]
excerpt: Notes on how technical feedback loops shape product decisions.
---

Write the note in markdown here.
```

Rules:

- File name becomes the note slug, for example `content/product-feedback-loops.md`
- `tags` connect the note into the graph automatically
- `excerpt` is used in previews, cards, and topic pages
- Save the file and the notebook graph will include it on the next build/dev refresh
