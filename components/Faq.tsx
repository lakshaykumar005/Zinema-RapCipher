"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const QA = [
  {
    q: "When and where is it happening?",
    a: "The event lands in Chennai. The exact date and venue are yet to be announced — register now and you'll be the first to know the moment it drops.",
  },
  {
    q: "Who can register?",
    a: "Any rapper, beatboxer, producer, lyricist or singer-rapper based in or around Chennai. Beginners and veterans both — the circle is for everyone serious about the craft.",
  },
  {
    q: "Is there a registration fee?",
    a: "No. Applying is completely free. Entry is curated, so our team reviews each submission and reaches out to selected artists.",
  },
  {
    q: "Why do I need to upload a WAV clip?",
    a: "It helps us hear your flow and energy. A few bars rapped, a hummed melody, or a quick freestyle is perfect. Phone recordings are fine — just save / export it as a .wav file.",
  },
  {
    q: "What's Zinema Music's role?",
    a: "RAP CIPHER is presented in association with Zinema Music as our associate producer — backing the production, sound and stage so the night is done right.",
  },
  {
    q: "What happens after I register?",
    a: "Our team reviews every entry personally and contacts shortlisted artists over email and Instagram with the next steps, schedule and details.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 sm:py-32 border-t border-[var(--color-line)]">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal>
          <div className="text-center">
            <span className="label">Questions</span>
            <h2 className="font-display text-5xl sm:text-7xl mt-4">Know before you flow</h2>
          </div>
        </Reveal>

        <div className="mt-14 divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
          {QA.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={i} delay={i * 50}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full text-left py-6 flex items-center justify-between gap-6 group"
                >
                  <span className="font-grotesk text-lg sm:text-xl font-medium group-hover:text-[var(--color-ember)] transition-colors">
                    {item.q}
                  </span>
                  <span
                    className="font-display text-3xl shrink-0 transition-transform duration-300"
                    style={{ color: "var(--color-ember)", transform: isOpen ? "rotate(45deg)" : "none" }}
                  >
                    +
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-400 ease-out"
                  style={{ maxHeight: isOpen ? 240 : 0, opacity: isOpen ? 1 : 0 }}
                >
                  <p className="pb-6 text-[var(--color-bone-dim)] leading-relaxed max-w-2xl">{item.a}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
