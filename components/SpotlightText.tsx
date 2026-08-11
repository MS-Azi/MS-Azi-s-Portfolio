"use client";

import { useRef } from "react";

/**
 * A single <h1> whose fill color is a radial gradient (pink at the
 * cursor, fading to the base paper color) clipped to the glyphs via
 * background-clip: text. One text node — no duplicate-layer alignment
 * drift — driven by CSS custom properties so mousemove never re-renders.
 */
export function SpotlightText({
  children,
  className = "",
  radius = 140,
}: {
  children: React.ReactNode;
  className?: string;
  radius?: number;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  function handleMove(e: React.MouseEvent<HTMLHeadingElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  }

  function handleLeave() {
    const el = ref.current;
    if (!el) return;
    // Push the gradient's hot spot far outside the text box so the
    // whole heading settles back to the plain base color.
    el.style.setProperty("--spot-x", "-9999px");
    el.style.setProperty("--spot-y", "-9999px");
  }

  return (
    <h1
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      style={
        {
          "--spot-x": "-9999px",
          "--spot-y": "-9999px",
          backgroundImage: `radial-gradient(${radius}px circle at var(--spot-x) var(--spot-y), #FF8FCB 0%, #FF8FCB 45%, #E8EAF0 75%)`,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        } as React.CSSProperties
      }
    >
      {children}
    </h1>
  );
}
