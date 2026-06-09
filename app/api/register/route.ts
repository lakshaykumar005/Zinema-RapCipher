import { NextResponse } from "next/server";
import { mkdir, writeFile, appendFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
// Allow a little time for the Apps Script round-trip (incl. Drive upload).
export const maxDuration = 60;

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
    const isWav = clip.type.includes("wav") || clip.name.toLowerCase().endsWith(".wav");
    if (!isWav) {
      return NextResponse.json({ error: "Clip must be a .wav file." }, { status: 400 });
    }
    if (clip.size > MAX_BYTES) {
      return NextResponse.json({ error: "Clip exceeds 25MB." }, { status: 400 });
    }

    const id = `${Date.now()}-${Math.round(performance.now())}`;
    const receivedAt = new Date().toISOString();

    // --- Store in Google Sheet (via Apps Script Web App) ------------------
    // Set SHEETS_WEBHOOK_URL (and optional SHEETS_SHARED_SECRET) in .env.local
    // / Vercel env. See SHEETS_SETUP.md for the one-time Google setup.
    const webhookUrl = process.env.SHEETS_WEBHOOK_URL;
    if (webhookUrl) {
      const fileBuf = Buffer.from(await clip.arrayBuffer());
      const payload = {
        secret: process.env.SHEETS_SHARED_SECRET || "",
        id,
        receivedAt,
        ...record,
        clipName: `${id}-${record.artistName.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.wav`,
        clipType: clip.type || "audio/wav",
        clipSize: clip.size,
        clipBase64: fileBuf.toString("base64"),
      };

      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        redirect: "follow",
      });

      const text = await res.text();
      let data: { ok?: boolean; error?: string } = {};
      try {
        data = JSON.parse(text);
      } catch {
        // Apps Script returned HTML (often an auth/redirect page) — surface it.
        console.error("[register] non-JSON from Sheets webhook:", text.slice(0, 300));
        return NextResponse.json(
          { error: "Could not reach the registration sheet. Check the webhook setup." },
          { status: 502 }
        );
      }

      if (!res.ok || !data.ok) {
        console.error("[register] Sheets webhook error:", data.error || res.status);
        return NextResponse.json(
          { error: data.error || "Could not save your registration. Please try again." },
          { status: 502 }
        );
      }

      console.log(`[register] saved to Google Sheet: ${record.artistName} (${record.email})`);
      return NextResponse.json({ ok: true, id });
    }

    // --- Fallback: local file storage (dev when no webhook is configured) -
    const safeName = record.artistName.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
    const baseDir = process.env.VERCEL ? "/tmp/registrations" : path.join(process.cwd(), "registrations");
    try {
      await mkdir(path.join(baseDir, "clips"), { recursive: true });
      const buf = Buffer.from(await clip.arrayBuffer());
      const clipPath = path.join(baseDir, "clips", `${id}-${safeName}.wav`);
      await writeFile(clipPath, buf);
      const entry = { id, receivedAt, ...record, clip: clipPath, clipSize: clip.size };
      await appendFile(path.join(baseDir, "registrations.jsonl"), JSON.stringify(entry) + "\n");
    } catch (persistErr) {
      console.error("[register] persistence skipped:", persistErr);
    }

    console.log(`[register] new artist (local, no Sheet configured): ${record.artistName}`);
    return NextResponse.json({ ok: true, id });
  } catch (err) {
    console.error("[register] error:", err);
    return NextResponse.json({ error: "Server error. Please try again." }, { status: 500 });
  }
}
