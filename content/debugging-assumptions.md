---
title: Debugging and Assumptions
date: 2026-03-13
tags: [debugging, engineering, systems]
excerpt: Most debugging problems start with incorrect assumptions about state, timing, or data shape.
---

The first useful debugging question is rarely "what broke?" It is usually "what am I assuming to be true?"

When a system feels unpredictable, there is often an invisible contract being violated:

- a response shape changed
- state was stale
- retries duplicated work
- a background job ran later than expected

Good debugging is a process of making assumptions explicit, then removing them one by one.

## A reliable loop

1. Reproduce the bug with the smallest surface area possible.
2. Inspect boundaries: input, output, timing, persistence.
3. Validate every assumption with evidence, not memory.
4. Keep notes while debugging so the path is reusable.
