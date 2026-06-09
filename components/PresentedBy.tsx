import Image from "next/image";
import { IMAGES } from "@/lib/images";
import { ZINEMA } from "@/lib/zinema";
import Reveal from "./Reveal";
import Equalizer from "./Equalizer";
import Socials from "./Socials";

// Editorial light-mode interlude — deliberately styled in Zinema's own clean,
// minimal aesthetic so it reads as a distinct, premium "presented by" moment.
export default function PresentedBy() {
  return (
    <section
      id="partners"
      className="relative py-24 sm:py-32 text-[var(--color-paper-ink)]"
      style={{ background: "var(--color-paper)" }}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-14 lg:gap-20 items-center">
          <div>
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-6 w-12"><Equalizer bars={7} color="var(--color-paper-ink)" className="!gap-[3px] h-6" /></span>
                <span className="font-grotesk text-[0.7rem] tracking-[0.34em] uppercase opacity-60">Presented by</span>
              </div>
              <h2 className="font-display text-7xl sm:text-8xl lg:text-9xl mt-5 leading-[0.82]">
                Zinema
                <br />
                Music
              </h2>
              <p className="mt-6 font-grotesk text-lg sm:text-xl tracking-tight">
                Cinema Scale. <span className="opacity-50">Community Soul.</span>
              </p>
              <div className="mt-5 h-7 w-36"><Equalizer bars={20} color="var(--color-paper-ink)" /></div>
            </Reveal>

            <Reveal delay={120}>
              <blockquote className="mt-9 border-l-2 pl-5 max-w-lg" style={{ borderColor: "var(--color-ember)" }}>
                <p className="text-base sm:text-lg leading-relaxed opacity-80">
                  &ldquo;We don&apos;t wait for labels. We don&apos;t wait for the algorithm.{" "}
                  <span className="font-semibold opacity-100">We press records.&rdquo;</span>
                </p>
              </blockquote>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-7 max-w-xl leading-relaxed opacity-70">
                RAP CYPHER is a Zinema Music production — a global artist community putting its weight,
                its stage and its sound behind Chennai&apos;s next wave. When Zinema presses play, the
                culture moves.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <span className="font-grotesk text-[0.7rem] tracking-[0.2em] uppercase px-3.5 py-2 rounded-full" style={{ background: "var(--color-paper-ink)", color: "var(--color-paper)" }}>
                  Presenter &amp; Producer
                </span>
                <span className="font-grotesk text-[0.7rem] tracking-[0.2em] uppercase px-3.5 py-2 rounded-full" style={{ border: "1px solid rgba(12,10,8,.2)" }}>
                  Curation · Sound · Stage
                </span>
              </div>

              <div className="mt-9">
                <span className="font-grotesk text-[0.66rem] tracking-[0.24em] uppercase opacity-50">Follow {ZINEMA.name}</span>
                <div className="mt-3">
                  <Socials variant="light" showLabels />
                </div>
                <a href={`mailto:${ZINEMA.email}`} className="link-underline inline-block mt-4 text-sm opacity-60 hover:opacity-100 transition-opacity">
                  {ZINEMA.email}
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden zoom-parent tilt-wrap tilt">
              <Image src={IMAGES.djSet} alt="Live music production on a lit stage" fill className="object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 50%, rgba(12,10,8,.5))" }} />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <span className="font-display text-2xl text-[var(--color-paper)]">Pressing records<br />since day one</span>
                <span className="h-8 w-20"><Equalizer bars={14} /></span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
