---
name: Soumik Mondal
handle: asksoumik
role: AI engineer (B.Tech CSE student) who works with the best available models, with a basic UI/UX design sense
location: India
open_to: founding-team projects
site: https://soumikmondal.vercel.app
last_updated: 2026-09-28
---

> Machine view. This is the same content as the human page, without the visual design.
> Last updated 2026-09-28.

# Soumik Mondal

I'm a computer science student and AI engineer. I work with the best available models to build AI products that are useful and remove friction, and I bring a basic UI/UX design sense to them.
I work mostly in Python, and I care about interface design: user-friendly beats complicated.

## Projects

### Aira (hackathon project)

**One line:** A voice-first question-answering app: you speak, it retrieves from a knowledge base and answers.

- **Problem:** Hacker House Goa's hackathon provided a Hugging Face pipeline where users ask questions and get answers from a fixed source. Aira makes that experience voice-first.
- **What it does:** Speech-to-text, retrieval over an indexed dataset, then an LLM-generated answer. Includes guardrails and a test harness.
- **Stack:** FastAPI backend deployed on Render; Sarvam AI (Saaras) for speech-to-text; FAISS vector search over the ai4bharat MSMARCO-XI dataset; modular pipeline (ingestion, chunking, embeddings, retrieval, guardrails, LLM).
- **Team:** Two Pack, a two-person team: Soumik Mondal and Ankan.
- **Design:** Custom light-glass interface with an orb-based voice control.
- **Result:** TODO (hackathon name and outcome, only if there is one)
- **Links:** [Live demo](https://aira-voice.vercel.app) · [GitHub](https://github.com/ankanmahanti3-prog/voice-rag-pipeline)

### Brava

**One line:** A progressive web app (PWA) for capturing ideas on your phone and opening them as markdown on your desktop.

- **Problem:** Good ideas tend to show up away from your usual setup (a coffee shop, the gym, a walk, a garden), and saving them is friction.
- **What it does:** Capture the idea from your phone on a capture screen, check it on a review screen, and it opens directly as a `.md` file on your desktop, ready to work with.
- **Stack:** Next.js, TypeScript, deployed on Vercel.
- **Links:** [Live](https://brava-voice.vercel.app) · [GitHub](https://github.com/s0um1kx/brava)

### Retro Console Pro

**One line:** A lightweight, modular, extensible web-based retro gaming engine with a nostalgic look and feel.

- **What it does:** Provides a dedicated sandbox for browser-based retro experiences, with a custom core engine, structured game management, and an authentic console-style interface.
- **Stack:** JavaScript, HTML, CSS. Hosted on GitHub Pages.
- **Links:** [Live](https://s0um1kx.github.io/retro-handheld-console/) · [GitHub](https://github.com/s0um1kx/retro-handheld-console)

### Id-qr-kit

**One line:** A React + TypeScript library for generating ID cards, event badges, tickets, QR codes and barcodes.

- **What it does:** Modern component library that renders these items and exports them as PNG, SVG or PDF.
- **Stack:** React, TypeScript.
- **Links:** [Live](https://s0um1kx.github.io/id-qr-kit/) · [GitHub](https://github.com/s0um1kx/id-qr-kit)

### HH Goa ID Builder (hackathon project)

**One line:** A web app that generates personalised Builder ID cards and avatar frames for Hacker House Goa 2026.

- **Problem:** Hacker House Goa asked participants to build an ID pass card for the event.
- **What it does:** Runs entirely in the browser with no login. Upload a photo, adjust zoom and position, and get a branded ID card as a high-resolution PNG. Converts iPhone HEIC photos in the browser, applies live grayscale processing, and generates custom X/Twitter preview cards on the fly with a Vercel Edge Function.
- **Stack:** React 18, Vite, Tailwind CSS, HTML5 Canvas (`html-to-image`, `heic2any`), Vercel Edge Functions (`@vercel/og`).
- **Result:** TODO (only if there is one)
- **Links:** [Live](https://hh-goa-id-builder.vercel.app/) · [GitHub](https://github.com/s0um1kx/hh-goa-id-builder)

### Hatekhori (ongoing)

**One line:** Turns a photo of your handwriting into an installable font, starting with Bengali and Hindi.

- **Problem:** Handwriting-to-font tools exist for English, but almost none handle Indic scripts, where joined letters (conjuncts) and the headline stroke make the problem much harder.
- **What it does:** Takes a photo of a filled-in guideline sheet, segments each glyph, vectorizes it, checks quality metrics, and compiles a working `.otf` font file.
- **Status:** Core pipeline works end to end and produces a real font from a handwriting photo. Capture UI and Bengali/Hindi glyph coverage are in progress.
- **Decisions:** Open source, no accounts or login, Indic-first public identity.
- **Stack:** Python, FastAPI, plain HTML/CSS/vanilla JS. Usable as a CLI or as API endpoints.
- **Links:** [GitHub](https://github.com/s0um1kx/Hatekhori)

## Skills

- **Languages and backend:** Python, FastAPI, TypeScript, JavaScript, HTML, CSS
- **Frontend:** React, Next.js, Vite, Tailwind CSS, HTML5 Canvas
- **AI:** Retrieval-augmented generation, speech-to-text, vector search (FAISS), font/vision pipelines
- **Deployment:** Vercel (including Edge Functions), Render, GitHub Pages
- **Interface design:** Design systems, brand and interface work for my own products
- TODO: add anything else you'd want an AI to list

## Links

- GitHub: https://github.com/s0um1kx
- LinkedIn: https://www.linkedin.com/in/asksoumik/
- X: https://x.com/asksoumik
- YouTube: https://www.youtube.com/@asksoumik
- Email: soumik.workmail@gmail.com

I use the handle asksoumik on most platforms. Cha is mandatory. Luchi–alur dum is a bonus.
