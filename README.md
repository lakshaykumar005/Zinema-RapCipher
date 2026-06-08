# RAP CIPHER · Chennai

A premium event landing page for **RAP CIPHER**, an open cypher & live jam for Chennai's hip-hop
community — presented in association with **Zinema Music**. Built with Next.js (App Router), React 19,
TypeScript and Tailwind CSS v4.

## What's inside

- **Cinematic hero** with big condensed type, ambient imagery and a "date — yet to be announced" tag.
- **Zinema Music** featured as **Associate Producer**, plus a partners/sponsor grid.
- Sections: what a cipher is, the experience (6 feature cards), a photo gallery, a "lineup to be
  revealed" teaser, FAQ and a footer.
- **Artist registration form** capturing stage name, full name, email, phone, Instagram, Chennai
  area, lane, experience, languages, links, bio — and a **drag-and-drop `.wav` upload** (max 25MB)
  with client + server validation.
- `POST /api/register` validates the submission and persists the audio clip + details.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Where registrations go

In local dev, submissions are written to `./registrations/` (a `registrations.jsonl` log + the WAV
clips). This folder is git-ignored.

### Production storage (Vercel)

Vercel's filesystem is read-only except `/tmp`, so for production swap the persistence block in
[`app/api/register/route.ts`](app/api/register/route.ts) for durable storage:

1. **Audio** — upload the clip to [Vercel Blob](https://vercel.com/docs/vercel-blob):
   ```ts
   import { put } from "@vercel/blob";
   const { url } = await put(`clips/${id}.wav`, clip, { access: "private" });
   ```
2. **Details** — store the `record` in a database (e.g. Neon Postgres from the Vercel Marketplace)
   and/or email the team on each submission.

## Design notes

- Palette: ink black, bone white, molten **ember** accent + gold, with a film-grain overlay.
- Fonts: **Anton** (display), **Space Grotesk** (labels), **Inter** (body) via `next/font`.
- Imagery is loaded from Unsplash via `next/image` (configured in `next.config.ts`). Swap these for
  your own event photos when you have them.
