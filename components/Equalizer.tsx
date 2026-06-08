export default function Equalizer({
  bars = 24,
  className = "",
  color,
}: {
  bars?: number;
  className?: string;
  color?: string;
}) {
  // Deterministic pseudo-random heights/delays (no Math.random — SSR safe)
  return (
    <div className={`eq ${className}`} aria-hidden>
      {Array.from({ length: bars }).map((_, i) => {
        const dur = 0.7 + ((i * 37) % 11) / 10; // 0.7–1.7s
        const delay = ((i * 53) % 13) / 10; // 0–1.2s
        return (
          <span
            key={i}
            style={{
              animationDuration: `${dur}s`,
              animationDelay: `${delay}s`,
              background: color,
            }}
          />
        );
      })}
    </div>
  );
}
