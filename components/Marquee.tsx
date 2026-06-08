const ITEMS = [
  "OPEN CYPHER",
  "LIVE JAM",
  "BARS OVER EVERYTHING",
  "BEATBOX",
  "FREESTYLE",
  "PRODUCERS WELCOME",
  "CHENNAI HIP-HOP",
  "ONE MIC · ONE CIRCLE",
];

export default function Marquee({ reverse = false }: { reverse?: boolean }) {
  const Track = () => (
    <div className="marquee__track" aria-hidden="true">
      {ITEMS.map((t, i) => (
        <span key={i} className="flex items-center gap-3 font-display text-3xl sm:text-4xl text-bone">
          {t}
          <span className="text-ember text-2xl">✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`marquee fade-x py-5 border-y ${reverse ? "marquee--rev" : ""}`}
      style={{ borderColor: "var(--color-line)", background: "var(--color-ink-soft)" }}
    >
      <Track />
      <Track />
    </div>
  );
}
