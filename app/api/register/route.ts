import { NextResponse } from "next/server";
import { mkdir, writeFile, appendFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

const MAX_BYTES = 25 * 1024 * 1024;

// Required text fields we expect from the form.
const REQUIRED = [
  "artistName",
  "fullName",
  "email",
  "phone",
  "instagram",
  "area",
  "role",
  "experience",
  "languages",
  "bio",
];

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    // Collect + validate text fields
    const record: Record<string, string> = {};
    for (const key of REQUIRED) {
      const val = form.get(key);
      if (typeof val !== "string" || !val.trim()) {
        return NextResponse.json({ error: `Missing field: ${key}` }, { status: 400 });
      }
      record[key] = val.trim();
    }
    record.links = String(form.get("links") || "").trim();
    record.heard = String(form.get("heard") || "").trim();
    record.consent = form.get("consent") ? "yes" : "no";

    if (record.consent !== "yes") {
      return NextResponse.json({ error: "Consent is required." }, { status: 400 });
    }

    // Validate the WAV clip
    const clip = form.get("clip");
    if (!(clip instanceof File) || clip.size === 0) {
      return NextResponse.json({ error: "Audio clip (.wav) is required." }, { status: 400 });
    }
    const isWav =
      clip.type.includes("wav") || clip.name.toLowerCase().endsWith(".wav");
    if (!isWav) {
      return NextResponse.json({ error: "Clip must be a .wav file." }, { status: 400 });
    }
    if (clip.size > MAX_BYTES) {
      return NextResponse.json({ error: "Clip exceeds 25MB." }, { status: 400 });
    }

    // --- Persist ---------------------------------------------------------
    // Local-friendly storage. On Vercel the filesystem is read-only except
    // /tmp, so for production swap this block for Vercel Blob + an email /
    // database notification:
    //   import { put } from "@vercel/blob";
    //   const { url } = await put(`clips/${id}.wav`, clip, { access: "private" });
    // and store `record` in your DB (Neon/Postgres) or email it to the team.
    const id = `${Date.now()}-${Math.round(performance.now())}`;
    const safeName = record.artistName.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
    const baseDir = process.env.VERCEL ? "/tmp/registrations" : path.join(process.cwd(), "registrations");

    try {
      await mkdir(path.join(baseDir, "clips"), { recursive: true });
      const buf = Buffer.from(await clip.arrayBuffer());
      const clipPath = path.join(baseDir, "clips", `${id}-${safeName}.wav`);
      await writeFile(clipPath, buf);

      const entry = { id, receivedAt: new Date().toISOString(), ...record, clip: clipPath, clipSize: clip.size };
      await appendFile(path.join(baseDir, "registrations.jsonl"), JSON.stringify(entry) + "\n");
    } catch (persistErr) {
      // Don't fail the user if storage is unavailable in a given environment —
      // log it so the team can wire durable storage.
      console.error("[register] persistence skipped:", persistErr);
    }

    console.log(`[register] new artist: ${record.artistName} (${record.email})`);
    return NextResponse.json({ ok: true, id });
  } catch (err) {
    console.error("[register] error:", err);
    return NextResponse.json({ error: "Server error. Please try again." }, { status: 500 });
  }
}
