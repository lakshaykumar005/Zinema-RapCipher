import Image from "next/image";
import { IMAGES } from "@/lib/images";
import Reveal from "./Reveal";
import SpotlightCard from "./SpotlightCard";
import Equalizer from "./Equalizer";

export default function Bento() {
  return (
    <section id="experience" className="relative py-24 sm:py-32 border-t border-[var(--color-line)]">
      <div className="glow" style={{ width: 460, height: 460, background: "var(--color-ember)", bottom: -160, left: -120, opacity: 0.22 }} />
      <div className="mx-auto max-w-7xl px-5 sm:px-8 relative">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <span className="label">The Experience</span>
              <h2 className="font-display text-5xl sm:text-7xl mt-4">
                Everything the
                <br />
                <span className="gradient-ember">night holds</span>
              </h2>
            </div>
            <p className="max-w-sm text-bone-dim leading-relaxed">
              Not a concert with a barrier between you and the stage. A living circle — and you&apos;re
              in it.
            </p>
          </div>
        </Reveal>

        {/* Bento grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-6 auto-rows-[200px] gap-4">
          {/* Big feature with image */}
          <Reveal className="sm:col-span-4 sm:row-span-2">
            <SpotlightCard className="h-full grad-border zoom-parent">
              <Image src={IMAGES.rapperCrowd} alt="Indian rapper in the cypher" fill className="object-cover opacity-55" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(7,6,10,.2), rgba(7,6,10,.9))" }} />
              <div className="relative h-full p-8 flex flex-col justify-end">
                <span className="font-display text-6xl outline-text">01</span>
                <h3 className="font-display text-4xl mt-4">The Open Cypher</h3>
                <p className="mt-3 max-w-md text-bone-dim leading-relaxed">
                  Step into the circle. Pass the mic. Bars, freestyle and wordplay — back to back, no
                  breaks, no scripts.
                </p>
              </div>
            </SpotlightCard>
          </Reveal>

          {/* Equalizer tile */}
          <Reveal className="sm:col-span-2" delay={80}>
            <SpotlightCard className="h-full overflow-hidden zoom-parent">
              <Image src={IMAGES.djSet} alt="Live jam on stage" fill className="object-cover opacity-60" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(7,6,10,.25), rgba(7,6,10,.88))" }} />
              <div className="relative h-full p-7 flex flex-col justify-between">
                <span className="label">Live Jam</span>
                <div className="h-14 w-full opacity-90"><Equalizer bars={22} /></div>
                <p className="text-bone-dim text-sm leading-relaxed">Rappers &amp; instrumentalists lock in together. Spontaneous, electric sets.</p>
              </div>
            </SpotlightCard>
          </Reveal>

          {/* Beatbox */}
          <Reveal className="sm:col-span-2" delay={140}>
            <SpotlightCard className="h-full overflow-hidden zoom-parent">
              <Image src={IMAGES.micStage} alt="Beatbox & beats" fill className="object-cover opacity-60" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(7,6,10,.25), rgba(7,6,10,.88))" }} />
              <div className="relative h-full p-7 flex flex-col justify-between">
                <span className="font-display text-5xl outline-text">02</span>
                <div>
                  <h3 className="font-display text-2xl">Beat &amp; Beatbox</h3>
                  <p className="mt-2 text-bone-dim text-sm leading-relaxed">Producers drop heat live. Beatboxers hold the rhythm.</p>
                </div>
              </div>
            </SpotlightCard>
          </Reveal>

          {/* Spotlight showcases — wide */}
          <Reveal className="sm:col-span-4" delay={120}>
            <SpotlightCard className="h-full overflow-hidden zoom-parent">
              <Image src={IMAGES.micCloseup} alt="Artist in the spotlight" fill className="object-cover opacity-55" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(7,6,10,.92), rgba(7,6,10,.35))" }} />
              <div className="relative h-full p-7 flex flex-col justify-center">
                <span className="font-display text-5xl outline-text">03</span>
                <h3 className="font-display text-3xl mt-3">Spotlight Showcases</h3>
                <p className="mt-2 max-w-md text-bone-dim text-sm leading-relaxed">Selected artists get the stage alone — your moment to make the city remember the name.</p>
              </div>
            </SpotlightCard>
          </Reveal>

          {/* The crowd */}
          <Reveal className="sm:col-span-3" delay={160}>
            <SpotlightCard className="h-full overflow-hidden zoom-parent">
              <Image src={IMAGES.concertHands} alt="The crowd" fill className="object-cover opacity-60" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(7,6,10,.25), rgba(7,6,10,.88))" }} />
              <div className="relative h-full p-7 flex flex-col justify-between">
                <span className="font-display text-5xl outline-text">04</span>
                <div>
                  <h3 className="font-display text-2xl">The Crowd</h3>
                  <p className="mt-2 text-bone-dim text-sm leading-relaxed">A room that came to listen — energy that pushes every emcee harder than they planned.</p>
                </div>
              </div>
            </SpotlightCard>
          </Reveal>

          {/* Recorded & released */}
          <Reveal className="sm:col-span-3" delay={200}>
            <SpotlightCard className="h-full overflow-hidden zoom-parent grad-border">
              <Image src={IMAGES.graffitiWall} alt="Recorded & released" fill className="object-cover opacity-60" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(7,6,10,.25), rgba(7,6,10,.88))" }} />
              <div className="relative h-full p-7 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="font-display text-5xl outline-text">05</span>
                  <span className="h-2.5 w-2.5 rounded-full live-dot" style={{ background: "var(--color-ember)" }} />
                </div>
                <div>
                  <h3 className="font-display text-2xl">Recorded &amp; Released</h3>
                  <p className="mt-2 text-bone-dim text-sm leading-relaxed">Clean audio &amp; video capture. The best moments go out to the world after the night.</p>
                </div>
              </div>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
