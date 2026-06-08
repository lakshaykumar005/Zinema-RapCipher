import Image from "next/image";
import { IMAGES } from "@/lib/images";
import Reveal from "./Reveal";
import Counter from "./Counter";

const STATS = [
  { node: <>1<sup className="text-2xl align-super">st</sup></>, label: "City edition", sub: "Chennai's open cypher" },
  { node: <Counter to={360} suffix="°" />, label: "In the round", sub: "No backstage, no barrier" },
  { node: <>∞</>, label: "Bars", sub: "No scripts, all raw" },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <Reveal>
            <div className="relative tilt-wrap">
              <div className="relative aspect-[4/5] rounded-lg overflow-hidden clip-reveal in zoom-parent tilt">
                <Image src={IMAGES.emceeMic} alt="Indian rapper performing into a microphone" fill className="object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(7,6,10,.85))" }} />
              </div>
              <div className="absolute -bottom-6 -right-4 sm:-right-8 px-6 py-5 rounded-lg backdrop-blur-md float" style={{ background: "rgba(7,6,10,.7)", border: "1px solid var(--color-line)" }}>
                <div className="flex items-center gap-2.5">
                  <span className="h-2.5 w-2.5 rounded-full live-dot" style={{ background: "var(--color-ember)" }} />
                  <div className="font-display text-4xl ember-text">LIVE</div>
                </div>
                <div className="label mt-1">Unfiltered &amp; in the round</div>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <span className="label">What is a cipher?</span>
              <h2 className="font-display text-5xl sm:text-7xl mt-4 leading-[0.9]">
                A circle where
                <br />
                <span className="outline-text">the city</span> spits.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-7 text-bone-dim leading-relaxed text-base sm:text-lg">
                A cypher is hip-hop in its purest form — emcees gathered in a circle, passing the mic,
                feeding off each other&apos;s energy. No teleprompters. No second takes. Just rhythm,
                wordplay and raw presence.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-5 text-bone-dim leading-relaxed text-base sm:text-lg">
                RAP CIPHER brings that circle to Chennai at full scale — a curated stage where rappers
                come to <span className="text-bone">jam together</span>, trade verses, and{" "}
                <span className="text-bone">show their talent</span> for a crowd that came for exactly
                this.
              </p>
            </Reveal>

            <div className="mt-12 grid grid-cols-3 gap-6">
              {STATS.map((s, i) => (
                <Reveal key={i} delay={260 + i * 90}>
                  <div>
                    <div className="font-display text-4xl sm:text-5xl ember-text">{s.node}</div>
                    <div className="font-grotesk uppercase tracking-[0.18em] text-xs mt-2">{s.label}</div>
                    <div className="text-bone-dim text-sm mt-1.5 leading-snug">{s.sub}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
