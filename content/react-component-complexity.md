---
title: React Component Complexity
date: 2026-03-10
tags: [react, engineering, frontend]
excerpt: Components become difficult to maintain when rendering, state coordination, and domain logic collapse into one layer.
---

Complex components usually fail gradually. They still render. They still pass reviews. But they become expensive to reason about.

I look for three signals:

- too many responsibilities in one file
- side effects mixed with display concerns
- props that encode workflow instead of data

The fix is often architectural, not stylistic. Separate orchestration from presentation. Keep each layer honest about what it owns.
