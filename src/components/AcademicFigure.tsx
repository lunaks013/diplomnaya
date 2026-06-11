import { useMemo, useState } from "react";
import { publicAsset } from "../lib/assetUrl";

interface AcademicFigureProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}

const FALLBACKS = [
  publicAsset("images/hero-academic.png"),
  publicAsset("images/hero.jpg"),
  publicAsset("images/hero.svg"),
];

export function AcademicFigure({ src, alt, caption, className = "" }: AcademicFigureProps) {
  const sources = useMemo(
    () => [src, ...FALLBACKS.filter((url) => url !== src)],
    [src],
  );
  const [index, setIndex] = useState(0);
  const currentSrc = sources[Math.min(index, sources.length - 1)];

  return (
    <figure className={`academic-figure ${className}`}>
      <img
        src={currentSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="academic-figure-img"
        onError={() => {
          setIndex((i) => (i < sources.length - 1 ? i + 1 : i));
        }}
      />
      {caption && <figcaption className="academic-figure-caption">{caption}</figcaption>}
    </figure>
  );
}
