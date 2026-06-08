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

export default function Timeline() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const w = wrap.current;
      const t = track.current;
      if (!w || !t) return;
      const rect = w.getBoundingClientRect();
      const scrollable = w.offsetHeight - window.innerHeight;
      const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1);
      const maxX = t.scrollWidth - window.innerWidth;
      setX(progress * maxX);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section id="timeline" ref={wrap} className="relative" style={{ height: "360vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        <div className="mx-auto max-w-7xl w-full px-5 sm:px-8 mb-8">
          <span className="label">The Run of Show</span>
          <h2 className="font-display text-5xl sm:text-7xl mt-3">
            How the <span className="gradient-ember">night unfolds</span>
          </h2>
        </div>

        <div
          ref={track}
          className="flex gap-6 px-5 sm:px-8 will-change-transform"
          style={{ transform: `translateX(-${x}px)` }}
        >
          {STEPS.map((s, i) => (
            <article
              key={i}
              className="card zoom-parent relative shrink-0 w-[78vw] sm:w-[440px] h-[52vh] sm:h-[440px] overflow-hidden"
            >
              <Image src={s.img} alt={s.t} fill className="object-cover opacity-45" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(7,6,10,.3), rgba(7,6,10,.92))" }} />
              <div className="relative h-full p-8 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="font-grotesk text-[0.7rem] tracking-[0.24em] uppercase ember-text">{s.tag}</span>
                  <span className="font-display text-7xl outline-text leading-none">{i + 1}</span>
                </div>
                <div>
                  <h3 className="font-display text-4xl">{s.t}</h3>
                  <p className="mt-3 text-bone-dim leading-relaxed max-w-sm">{s.d}</p>
                </div>
              </div>
            </article>
          ))}
          {/* End cap */}
          <div className="shrink-0 w-[78vw] sm:w-[440px] h-[52vh] sm:h-[440px] flex flex-col items-center justify-center text-center px-8">
            <span className="font-display text-6xl gradient-ember">YOUR TURN</span>
            <p className="mt-4 text-bone-dim max-w-xs">A few spots in the circle are reserved for artists who register.</p>
            <a href="#register" className="btn btn-primary mt-7">Claim Your Spot</a>
          </div>
        </div>

        {/* progress rail */}
        <div className="mx-auto max-w-7xl w-full px-5 sm:px-8 mt-8">
          <div className="h-[2px] w-full bg-[var(--color-line)] relative overflow-hidden rounded-full">
            <div className="absolute inset-y-0 left-0" style={{ width: `${(x / Math.max(1, (track.current?.scrollWidth ?? 1) - (typeof window !== "undefined" ? window.innerWidth : 1))) * 100}%`, background: "linear-gradient(90deg,var(--color-ember),var(--color-gold))" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
