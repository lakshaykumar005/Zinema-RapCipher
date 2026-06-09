"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IMAGES } from "@/lib/images";

const STEPS = [
  { t: "Doors & Soundcheck", d: "The room fills. Levels get set. The first beat rolls and the circle starts forming.", img: IMAGES.speakerAmp, tag: "Phase 01" },
  { t: "The Warm-Up Cypher", d: "Open mic. Anyone in the round can step in. Energy builds bar by bar.", img: IMAGES.micCloseup, tag: "Phase 02" },
  { t: "The Live Jam", d: "Beatmakers and emcees lock in. Fully improvised. No two minutes the same.", img: IMAGES.turntable, tag: "Phase 03" },
  { t: "Spotlight Sets", d: "Selected artists take the stage solo. The crowd decides who they remember.", img: IMAGES.rapperPortrait, tag: "Phase 04" },
  { t: "The Final Circle", d: "Everyone back in the round. One last cypher until the city's voice is hoarse.", img: IMAGES.concertHands, tag: "Phase 05" },
];

function Card({ s, i }: { s: (typeof STEPS)[number]; i: number }) {
  return (
    <article className="card zoom-parent relative shrink-0 snap-center w-[82vw] sm:w-[420px] md:w-[440px] h-[58vh] sm:h-[440px] overflow-hidden">
      <Image src={s.img} alt={s.t} fill sizes="(max-width: 768px) 82vw, 440px" className="object-cover opacity-45" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(7,6,10,.3), rgba(7,6,10,.92))" }} />
      <div className="relative h-full p-6 sm:p-8 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="font-grotesk text-[0.7rem] tracking-[0.24em] uppercase ember-text">{s.tag}</span>
          <span className="font-display text-6xl sm:text-7xl outline-text leading-none">{i + 1}</span>
        </div>
        <div>
          <h3 className="font-display text-3xl sm:text-4xl">{s.t}</h3>
          <p className="mt-3 text-bone-dim leading-relaxed max-w-sm text-sm sm:text-base">{s.d}</p>
        </div>
      </div>
    </article>
  );
}

function EndCap() {
  return (
    <div className="shrink-0 snap-center w-[82vw] sm:w-[420px] md:w-[440px] h-[58vh] sm:h-[440px] flex flex-col items-center justify-center text-center px-6">
      <span className="font-display text-5xl sm:text-6xl gradient-ember">YOUR TURN</span>
      <p className="mt-4 text-bone-dim max-w-xs text-sm sm:text-base">A few spots in the circle are reserved for artists who register.</p>
      <a href="#register" className="btn btn-primary mt-7">Claim Your Spot</a>
    </div>
  );
}

export default function Timeline() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(0);
  const [desktop, setDesktop] = useState(false);

  // Detect viewport: scroll-jack on desktop, native swipe on touch/mobile.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    const apply = () => setDesktop(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!desktop) {
      setX(0);
      return;
    }
    const onScroll = () => {
      const w = wrap.current;
      const t = track.current;
      if (!w || !t) return;
      const rect = w.getBoundingClientRect();
      const scrollable = w.offsetHeight - window.innerHeight;
      const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1);
      const maxX = Math.max(0, t.scrollWidth - window.innerWidth);
      setX(progress * maxX);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [desktop]);

  const Header = (
    <div className="mx-auto max-w-7xl w-full px-5 sm:px-8">
      <span className="label">The Run of Show</span>
      <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl mt-3">
        How the <span className="gradient-ember">night unfolds</span>
      </h2>
    </div>
  );

  // --- Mobile / touch: simple horizontal swipe carousel ---
  if (!desktop) {
    return (
      <section id="timeline" className="relative py-16 sm:py-20 overflow-hidden">
        {Header}
        <div className="mt-7 flex gap-4 overflow-x-auto no-bar snap-x snap-mandatory px-5 sm:px-8 pb-4">
          {STEPS.map((s, i) => (
            <Card key={i} s={s} i={i} />
          ))}
          <EndCap />
        </div>
        <p className="mt-2 text-center label">← Swipe through the night →</p>
      </section>
    );
  }

  // --- Desktop: pinned horizontal scroll-jack ---
  return (
    <section id="timeline" ref={wrap} className="relative" style={{ height: "360vh" }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden flex flex-col justify-center">
        <div className="mb-8">{Header}</div>

        <div ref={track} className="flex gap-6 px-5 sm:px-8 will-change-transform" style={{ transform: `translateX(-${x}px)` }}>
          {STEPS.map((s, i) => (
            <Card key={i} s={s} i={i} />
          ))}
          <EndCap />
        </div>

        <div className="mx-auto max-w-7xl w-full px-5 sm:px-8 mt-8">
          <div className="h-[2px] w-full bg-[var(--color-line)] relative overflow-hidden rounded-full">
            <div
              className="absolute inset-y-0 left-0"
              style={{
                width: `${(x / Math.max(1, (track.current?.scrollWidth ?? 1) - (typeof window !== "undefined" ? window.innerWidth : 1))) * 100}%`,
                background: "linear-gradient(90deg,var(--color-ember),var(--color-gold))",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
