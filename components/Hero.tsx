import Image from "next/image";
import { IMAGES } from "@/lib/images";
import Magnetic from "./Magnetic";
import Equalizer from "./Equalizer";

export default function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] flex flex-col overflow-hidden">
      {/* Cinematic letterbox bars */}
      <div className="pointer-events-none absolute top-0 inset-x-0 h-[7vh] bg-ink z-30" />
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-[7vh] bg-ink z-30" />

      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <Image src={IMAGES.stageLights} alt="Performer under the spotlight at a live show" fill priority className="object-cover object-center kenburns" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(7,6,10,.78) 0%, rgba(7,6,10,.45) 38%, rgba(7,6,10,.82) 80%, var(--color-ink) 100%)" }} />
        <div className="absolute inset-0 mix-blend-overlay" style={{ background: "radial-gradient(110% 70% at 82% 8%, rgba(255,90,31,.42), transparent 58%)" }} />
      </div>
      <div className="glow" style={{ width: 560, height: 560, background: "var(--color-ember)", top: -140, right: -90 }} />

      {/* Top meta */}
      <div className="relative z-20 mx-auto max-w-7xl w-full px-5 sm:px-8 pt-[max(92px,10vh)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="label shimmer">Chennai · India</span>
            <span className="h-[7px] w-[7px] rounded-full live-dot" style={{ background: "var(--color-ember)" }} />
            <span className="label">Open Cypher &amp; Live Jam</span>
          </div>
          {/* Subtle Zinema presence */}
          <div className="hidden sm:flex items-center gap-3 rounded-full px-4 py-2 float-slow" style={{ border: "1px solid var(--color-line)", background: "rgba(7,6,10,.4)", backdropFilter: "blur(8px)" }}>
            <span className="h-5 flex items-center"><Equalizer bars={5} className="!gap-[2px] h-3.5" /></span>
            <span className="font-grotesk text-[0.62rem] tracking-[0.22em] uppercase text-bone-dim">An event by</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo/zinema-logo.png?v=3" alt="Zinema Music" className="h-10 w-auto" />
          </div>
        </div>
      </div>

      {/* Headline */}
      <div className="relative z-20 mx-auto max-w-7xl w-full px-5 sm:px-8 mt-auto pb-[3vh]">
        <h1 className="font-display">
          <span className="block text-[19vw] sm:text-[16vw] lg:text-[15rem] leading-[0.92]">RAP</span>
          <span
            className="block text-[19vw] sm:text-[16vw] lg:text-[15rem] leading-[0.92] text-image glow-ember"
            style={{
              backgroundImage: `linear-gradient(120deg, rgba(255,90,31,0.4) 0%, rgba(255,122,66,0.26) 45%, rgba(240,194,75,0.38) 100%), url(${IMAGES.djSet})`,
              backgroundSize: "cover",
              backgroundPosition: "center 35%",
            }}
          >
            CYPHER
          </span>
        </h1>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:items-end">
          <p className="max-w-xl text-bone-dim text-base sm:text-lg leading-relaxed">
            The underground convenes. One circle. One mic. Chennai&apos;s sharpest rappers,
            beatboxers and producers — trading bars, building beats, jamming live until the city
            listens.
          </p>

          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <span className="font-display text-3xl ember-text">DATE</span>
              <span className="font-grotesk text-sm uppercase tracking-[0.2em] px-3 py-2 rounded-sm" style={{ border: "1px solid var(--color-line)" }}>
                Yet to be announced
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Magnetic className="w-full sm:w-auto"><a href="#register" className="btn btn-primary w-full sm:w-auto">Register as Artist</a></Magnetic>
              <Magnetic className="w-full sm:w-auto"><a href="#about" className="btn btn-ghost w-full sm:w-auto">What&apos;s a Cypher?</a></Magnetic>
            </div>
          </div>
        </div>
      </div>

      {/* Live equalizer footer */}
      <div className="relative z-20 mx-auto max-w-7xl w-full px-5 sm:px-8 pb-[9vh] flex items-end justify-between gap-6">
        <span className="label hidden sm:block">Scroll to enter the circle</span>
        <div className="h-9 w-40 sm:w-56 opacity-80"><Equalizer bars={32} /></div>
      </div>
    </section>
  );
}
