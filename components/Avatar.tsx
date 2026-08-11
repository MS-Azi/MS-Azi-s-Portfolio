"use client";

import { useEffect, useRef, useState } from "react";
import { User } from "lucide-react";

/**
 * Profile photo for the hero. Rendered in black & white (grayscale
 * filter, non-destructive) to match the site's near-monochrome palette.
 */
export function Avatar({
  src = "/images/esther.png",
  alt = "Esther Azi",
  size = 112,
}: {
  src?: string;
  alt?: string;
  size?: number;
}) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // A cached image can finish loading before React attaches the onLoad
  // handler, which would otherwise leave `loaded` stuck false forever —
  // catch that case explicitly once mounted.
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-full border border-ink-600 bg-ink-900 shadow-lg ring-1 ring-white/5"
      style={{ width: size, height: size }}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-full opacity-70"
        style={{
          background:
            "conic-gradient(from 180deg, #3ED6C4, #FF6FBF, #F5A962, #3ED6C4)",
          padding: 1,
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* Fallback sits underneath at all times, so a broken image never
          flashes its native alt-text/broken-icon UI on top of it. */}
      <div className="absolute inset-0 flex items-center justify-center text-paper-500">
        <User className="h-1/3 w-1/3" strokeWidth={1.5} />
      </div>

      {!errored && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className="absolute inset-0 h-full w-full object-cover grayscale transition-opacity duration-300"
          style={{ opacity: loaded ? 1 : 0 }}
        />
      )}
    </div>
  );
}
