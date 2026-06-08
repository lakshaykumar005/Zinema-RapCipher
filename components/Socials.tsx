import { ZINEMA } from "@/lib/zinema";

const ICONS: Record<string, React.ReactNode> = {
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]">
      <rect x="2.5" y="5.5" width="19" height="13" rx="3.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M10 9.2v5.6l4.8-2.8L10 9.2z" fill="currentColor" />
    </svg>
  ),
  spotify: (
    <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]">
      <circle cx="12" cy="12" r="9.2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M7.5 9.5c3-0.8 6.3-0.5 9 1.1M8 13c2.4-0.6 5-0.3 7.2 1M8.4 16c1.9-0.4 3.8-0.2 5.5 0.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
};

const LABELS: Record<string, string> = {
  instagram: "Instagram",
  youtube: "YouTube",
  spotify: "Spotify",
};

export default function Socials({
  variant = "dark",
  showLabels = false,
}: {
  variant?: "dark" | "light";
  showLabels?: boolean;
}) {
  const onLight = variant === "light";
  return (
    <div className="flex flex-wrap items-center gap-3">
      {Object.entries(ZINEMA.socials).map(([key, url]) => (
        <a
          key={key}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Zinema Music on ${LABELS[key]}`}
          className="social-pill group"
          style={
            onLight
              ? { borderColor: "rgba(12,10,8,.2)", color: "var(--color-paper-ink)" }
              : undefined
          }
        >
          <span className="transition-transform duration-300 group-hover:scale-110">{ICONS[key]}</span>
          {showLabels && (
            <span className="font-grotesk text-[0.72rem] tracking-[0.16em] uppercase">{LABELS[key]}</span>
          )}
        </a>
      ))}
    </div>
  );
}
