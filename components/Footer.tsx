import Equalizer from "./Equalizer";
import Socials from "./Socials";
import { ZINEMA } from "@/lib/zinema";
import { IMAGES } from "@/lib/images";

export default function Footer() {
  return (
    <footer className="relative pt-20 pb-10 border-t border-[var(--color-line)] overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center">
          <span className="label">Chennai · Season 01</span>
          <h2
            className="font-display text-[20vw] lg:text-[13rem] leading-[0.8] mt-4 text-image glow-ember select-none"
            style={{
              backgroundImage: `linear-gradient(120deg, rgba(255,90,31,0.42) 0%, rgba(255,122,66,0.28) 45%, rgba(240,194,75,0.4) 100%), url(${IMAGES.concertWide})`,
              backgroundSize: "cover",
              backgroundPosition: "center 38%",
            }}
          >
            CYPHER
          </h2>
        </div>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="font-grotesk uppercase tracking-[0.2em] text-xs text-bone-dim">The Event</div>
            <p className="mt-4 text-bone-dim text-sm leading-relaxed max-w-xs">
              An open cypher &amp; live jam for Chennai&apos;s hip-hop community — a{" "}
              <span className="text-bone">Zinema Music</span> production.
            </p>
            <div className="mt-5 h-7 w-32 opacity-70"><Equalizer bars={18} /></div>
          </div>
          <div>
            <div className="font-grotesk uppercase tracking-[0.2em] text-xs text-bone-dim">Explore</div>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[["The Cypher", "#about"], ["Experience", "#experience"], ["The Night", "#timeline"], ["Register", "#register"]].map(([t, h]) => (
                <li key={h}><a href={h} className="link-underline text-bone-dim hover:text-bone transition-colors">{t}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-grotesk uppercase tracking-[0.2em] text-xs text-bone-dim">Follow Zinema</div>
            <div className="mt-4"><Socials /></div>
            <a href={`mailto:${ZINEMA.email}`} className="link-underline inline-block mt-4 text-sm text-bone-dim hover:text-bone transition-colors">{ZINEMA.email}</a>
          </div>
          <div>
            <div className="font-grotesk uppercase tracking-[0.2em] text-xs text-bone-dim">Presented by</div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo/zinema-logo.png?v=3" alt="Zinema Music" className="h-11 w-auto mt-3" />
            <p className="mt-4 text-bone-dim text-sm leading-relaxed max-w-xs">
              <span className="text-bone">Cinema Scale. Community Soul.</span> We don&apos;t wait for
              labels. We press records.
            </p>
            <a href="mailto:hello@rapcypher.in" className="inline-block mt-4 text-sm text-bone-dim hover:text-bone transition-colors">hello@rapcypher.in</a>
          </div>
        </div>

        <div className="noise-divider mt-14" />
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-bone-dim">© 2026 RAP CYPHER. All rights reserved.</span>
          <span className="text-xs text-bone-dim">
            A <span className="ember-text">Zinema Music</span> production · Date — yet to be announced
          </span>
        </div>
      </div>
    </footer>
  );
}
