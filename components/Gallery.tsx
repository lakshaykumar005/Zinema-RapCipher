import Image from "next/image";
import { IMAGES } from "@/lib/images";

const ROW_A = [IMAGES.crowdLights, IMAGES.micStage, IMAGES.concertHands, IMAGES.graffiti, IMAGES.djHands];
const ROW_B = [IMAGES.festivalCrowd, IMAGES.vinyl, IMAGES.speaker, IMAGES.graffitiWall, IMAGES.concertWide];

function Row({ imgs, reverse }: { imgs: string[]; reverse?: boolean }) {
  const Track = () => (
    <div className="marquee__track !gap-4 pr-4" aria-hidden>
      {imgs.map((src, i) => (
        <div key={i} className="zoom-parent relative h-44 sm:h-64 w-72 sm:w-96 shrink-0 rounded-lg overflow-hidden">
          <Image src={src} alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-[rgba(7,6,10,0.2)] transition-colors duration-500 hover:bg-transparent" />
        </div>
      ))}
    </div>
  );
  return (
    <div className={`marquee fade-x ${reverse ? "marquee--rev" : ""}`}>
      <Track />
      <Track />
    </div>
  );
}

export default function Gallery() {
  return (
    <section className="relative py-14 sm:py-20 space-y-4 overflow-hidden">
      <Row imgs={ROW_A} />
      <Row imgs={ROW_B} reverse />
    </section>
  );
}
