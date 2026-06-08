import Reveal from "./Reveal";

export default function Lineup() {
  return (
    <section className="relative py-24 sm:py-32 border-t border-[var(--color-line)] overflow-hidden">
      <div className="aurora" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8 text-center relative">
        <Reveal>
          <span className="label">The Lineup</span>
          <h2 className="font-display text-6xl sm:text-8xl lg:text-9xl mt-5">
            Artists
            <br />
            <span className="outline-text-ember">to be revealed</span>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-8 max-w-xl mx-auto text-bone-dim leading-relaxed">
            The circle is being assembled. Headliners, hosts and the wildcard spots are still under
            wraps — and a few of those spots are reserved for artists who register below.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            {["?? ?", "????", "?????", "??", "? ? ?"].map((n, i) => (
              <span
                key={i}
                className="font-display text-2xl sm:text-3xl px-5 py-2.5 rounded-sm tracking-[0.2em] float"
                style={{
                  border: "1px solid var(--color-line)",
                  color: "rgba(244,240,230,0.32)",
                  animationDelay: `${i * 0.4}s`,
                }}
              >
                {n}
              </span>
            ))}
          </div>
        </Reveal>
        <Reveal delay={280}>
          <a href="#register" className="btn btn-primary mt-12">Claim Your Spot</a>
        </Reveal>
      </div>
    </section>
  );
}
