"use client";

import { useRef, useState } from "react";
import Reveal from "./Reveal";
import Equalizer from "./Equalizer";
import Magnetic from "./Magnetic";

type Status = "idle" | "submitting" | "success" | "error";

const ROLES = ["Rapper / Emcee", "Beatboxer", "Producer / Beatmaker", "Singer-Rapper", "Lyricist", "DJ"];
const EXPERIENCE = ["Just starting out", "1–2 years", "3–5 years", "5+ years"];
const HEARD = ["Instagram", "A friend / fellow artist", "Zinema Music", "YouTube", "Other"];
const MAX_MB = 25;

export default function Register() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileErr, setFileErr] = useState("");
  const [drag, setDrag] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const validateFile = (file: File | undefined) => {
    setFileErr("");
    if (!file) return;
    const okType =
      file.type === "audio/wav" || file.type === "audio/x-wav" || file.type === "audio/wave" ||
      file.name.toLowerCase().endsWith(".wav");
    if (!okType) {
      setFileErr("Please upload a .wav file — that's the format we need.");
      setFileName(""); if (fileInput.current) fileInput.current.value = ""; return;
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      setFileErr(`That file is over ${MAX_MB}MB. Trim the clip and try again.`);
      setFileName(""); if (fileInput.current) fileInput.current.value = ""; return;
    }
    setFileName(`${file.name} · ${(file.size / 1024 / 1024).toFixed(1)}MB`);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDrag(false);
    const file = e.dataTransfer.files?.[0];
    if (file && fileInput.current) {
      const dt = new DataTransfer(); dt.items.add(file);
      fileInput.current.files = dt.files; validateFile(file);
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (fileErr) return;
    // The clip is required, but its input is hidden — validate it here so the
    // form can't silently fail to submit (and show a clear message instead).
    const chosen = fileInput.current?.files?.[0];
    if (!chosen) {
      setFileErr("Please attach your clip (.wav) before submitting.");
      fileInput.current?.closest(".dropzone")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setStatus("submitting"); setErrorMsg("");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("/api/register", { method: "POST", body: data });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Something went wrong on our end.");
      }
      setStatus("success"); form.reset(); setFileName("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Submission failed. Try again.");
    }
  }

  if (status === "success") {
    return (
      <section id="register" className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-2xl px-5 sm:px-8 text-center">
          <div className="grad-border rounded-lg p-10 sm:p-14" style={{ background: "linear-gradient(180deg, rgba(255,90,31,0.08), rgba(7,6,10,1))" }}>
            <div className="h-10 w-40 mx-auto mb-6 opacity-90"><Equalizer bars={24} /></div>
            <span className="font-display text-6xl ember-text">YOU&apos;RE IN.</span>
            <h3 className="font-display text-3xl mt-6">Welcome to the circle</h3>
            <p className="mt-4 text-bone-dim leading-relaxed">
              Your pass is locked in. The Zinema Music team reviews every submission personally and
              reaches out over email &amp; Instagram. Keep an eye out — the date drops soon.
            </p>
            <button onClick={() => setStatus("idle")} className="btn btn-ghost mt-8">Register another artist</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="register" className="relative py-24 sm:py-32 border-t border-[var(--color-line)]">
      <div className="glow" style={{ width: 500, height: 500, background: "var(--color-ember)", top: 40, right: -160, opacity: 0.2 }} />
      <div className="mx-auto max-w-4xl px-5 sm:px-8 relative">
        <Reveal>
          <div className="text-center">
            <span className="label">Registrations Open</span>
            <h2 className="font-display text-5xl sm:text-7xl mt-4">
              Get your <span className="gradient-ember">artist pass</span>
            </h2>
            <p className="mt-6 max-w-xl mx-auto text-bone-dim leading-relaxed">
              Spots are limited and curated. Fill this out, drop a clip of you rapping or humming your
              flow, and the team gets back to you. No fee to apply.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-14 grad-border rounded-lg overflow-hidden" style={{ background: "rgba(255,255,255,0.015)" }}>
            {/* Pass stub header */}
            <div className="flex items-center justify-between px-6 sm:px-10 py-5" style={{ background: "linear-gradient(90deg, rgba(255,90,31,.14), transparent)" }}>
              <div className="flex items-center gap-4">
                <span className="font-display text-xl ember-text">ADMIT ONE</span>
                <span className="font-grotesk text-[0.65rem] tracking-[0.24em] uppercase text-bone-dim">Artist Pass · Season 01</span>
              </div>
              {/* barcode */}
              <div className="hidden sm:flex items-end gap-[2px] h-6" aria-hidden>
                {Array.from({ length: 34 }).map((_, i) => (
                  <span key={i} className="block bg-bone" style={{ width: i % 4 === 0 ? 3 : 1.5, height: `${50 + ((i * 31) % 50)}%` }} />
                ))}
              </div>
            </div>
            <div className="perf h-4 opacity-60" />

            <form onSubmit={handleSubmit} className="p-6 sm:p-10 pt-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="field-label">Stage / Artist Name *</label>
                  <input name="artistName" required className="field" placeholder="e.g. Lil Madras" />
                </div>
                <div>
                  <label className="field-label">Full Name *</label>
                  <input name="fullName" required className="field" placeholder="Your real name" />
                </div>
                <div>
                  <label className="field-label">Email *</label>
                  <input name="email" type="email" required className="field" placeholder="you@email.com" />
                </div>
                <div>
                  <label className="field-label">Phone Number *</label>
                  <input name="phone" type="tel" required className="field" placeholder="+91 ..." />
                </div>
                <div>
                  <label className="field-label">Instagram ID *</label>
                  <input name="instagram" required className="field" placeholder="@yourhandle" />
                </div>
                <div>
                  <label className="field-label">Area in Chennai *</label>
                  <input name="area" required className="field" placeholder="e.g. Kodambakkam, Anna Nagar" />
                </div>
                <div>
                  <label className="field-label">Your Lane *</label>
                  <select name="role" required defaultValue="" className="field">
                    <option value="" disabled>Select…</option>
                    {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="field-label">Experience *</label>
                  <select name="experience" required defaultValue="" className="field">
                    <option value="" disabled>Select…</option>
                    {EXPERIENCE.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="field-label">Languages you rap in *</label>
                  <input name="languages" required className="field" placeholder="Tamil, English, Hindi…" />
                </div>
                <div>
                  <label className="field-label">Music links (optional)</label>
                  <input name="links" className="field" placeholder="Spotify / YouTube / SoundCloud" />
                </div>
              </div>

              <div className="mt-6">
                <label className="field-label">Tell us about your sound *</label>
                <textarea name="bio" required className="field" placeholder="Who are you as an artist? Why should you be in the cipher?" />
              </div>

              {/* WAV upload */}
              <div className="mt-6">
                <label className="field-label">Your clip — .WAV only *</label>
                <p className="text-bone-dim text-sm mb-3 leading-relaxed">
                  Drop a short clip (max {MAX_MB}MB) of you rapping a few bars, or hum / freestyle your
                  flow. Raw phone recordings are totally fine — we want to hear <em>you</em>.
                </p>
                <div
                  className={`dropzone ${drag ? "drag" : ""}`}
                  onClick={() => fileInput.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
                  onDragLeave={() => setDrag(false)}
                  onDrop={onDrop}
                >
                  <input ref={fileInput} type="file" name="clip" accept=".wav,audio/wav,audio/x-wav,audio/wave" className="hidden" onChange={(e) => validateFile(e.target.files?.[0])} />
                  {fileName ? (
                    <div className="flex flex-col items-center gap-3">
                      <div className="h-8 w-44"><Equalizer bars={28} /></div>
                      <span className="font-grotesk text-sm ember-text">▶ {fileName}</span>
                      <span className="label">Click to replace</span>
                    </div>
                  ) : (
                    <div>
                      <div className="font-display text-2xl">Drop your .WAV here</div>
                      <div className="label mt-2">or click to browse</div>
                    </div>
                  )}
                </div>
                {fileErr && <p className="text-ember text-sm mt-2">{fileErr}</p>}
              </div>

              <div className="mt-6">
                <label className="field-label">How did you hear about us?</label>
                <select name="heard" defaultValue="" className="field">
                  <option value="" disabled>Select…</option>
                  {HEARD.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>

              <label className="mt-6 flex items-start gap-3 cursor-pointer">
                <input type="checkbox" name="consent" required className="mt-1 accent-[var(--color-ember)] h-4 w-4" />
                <span className="text-sm text-bone-dim leading-relaxed">
                  I confirm these details are mine and I&apos;m okay with the RAP CIPHER / Zinema Music
                  team contacting me about the event. *
                </span>
              </label>

              {status === "error" && <p className="text-ember text-sm mt-6 text-center">{errorMsg}</p>}

              <Magnetic className="w-full">
                <button type="submit" disabled={status === "submitting"} className="btn btn-primary w-full mt-8 !py-4 disabled:opacity-60">
                  {status === "submitting" ? "Locking you in…" : "Submit & Get My Pass"}
                </button>
              </Magnetic>
              <p className="text-center label mt-5">No application fee · Curated entry</p>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
