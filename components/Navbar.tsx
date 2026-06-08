"use client";

import { useEffect, useState } from "react";
import Magnetic from "./Magnetic";

const LINKS = [
  { label: "The Cipher", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Night", href: "#timeline" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? "rgba(7,6,10,0.7)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid var(--color-line)" : "1px solid transparent",
      }}
    >
      <nav className="mx-auto max-w-7xl px-5 sm:px-8 h-[72px] flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-sm font-display text-lg" style={{ background: "var(--color-ember)", color: "#0a0708" }}>R</span>
          <span className="font-grotesk tracking-[0.28em] text-xs font-semibold uppercase">
            Rap&nbsp;Cipher<span className="ember-text"> · </span>CHN
          </span>
        </a>

        <div className="hidden md:flex items-center gap-9">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="link-underline font-grotesk text-[0.78rem] tracking-[0.16em] uppercase text-bone-dim hover:text-bone transition-colors">
              {l.label}
            </a>
          ))}
          <Magnetic><a href="#register" className="btn btn-primary !py-3 !px-6">Register</a></Magnetic>
        </div>

        <button aria-label="Menu" onClick={() => setOpen((v) => !v)} className="md:hidden flex flex-col gap-[5px] p-2">
          <span className="block h-[2px] w-6 bg-bone" />
          <span className="block h-[2px] w-6 bg-bone" />
          <span className="block h-[2px] w-4 bg-ember" />
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-[var(--color-line)] bg-[rgba(7,6,10,0.96)] backdrop-blur-xl px-5 py-6 flex flex-col gap-5">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="font-grotesk text-sm tracking-[0.16em] uppercase text-bone-dim">
              {l.label}
            </a>
          ))}
          <a href="#register" onClick={() => setOpen(false)} className="btn btn-primary mt-2">Register Now</a>
        </div>
      )}
    </header>
  );
}
