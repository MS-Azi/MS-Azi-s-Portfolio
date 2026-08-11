"use client";

import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, MeshDistortMaterial } from "@react-three/drei";
import type { Mesh } from "three";

function DistortBlob() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.22;
      meshRef.current.rotation.y = t * 0.32;
    }
  });

  return (
    <Icosahedron ref={meshRef} args={[0.55, 3]}>
      <MeshDistortMaterial
        color="#FF6FBF"
        emissive="#FF3FA8"
        emissiveIntensity={0.12}
        roughness={0.25}
        metalness={0.1}
        distort={0.4}
        speed={2}
      />
    </Icosahedron>
  );
}

// A WebGL failure on some GPU/driver combo must never be able to take
// the rest of the page's buttons/links down with it — this is the only
// thing standing between a three.js render error and a dead page.
class CanvasErrorBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { crashed: boolean }
> {
  constructor(props: { children: ReactNode; onError: () => void }) {
    super(props);
    this.state = { crashed: false };
  }
  static getDerivedStateFromError() {
    return { crashed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    if (this.state.crashed) return null;
    return this.props.children;
  }
}

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

/**
 * Fixed-position element that trails the cursor across the whole page.
 * Inside the hero it renders a small rotating 3D distort-blob; the
 * instant the hero scrolls out of view it swaps to a blurred pink glow
 * for every section below (projects onward), reverting to the 3D blob
 * only if you scroll back up into the hero. Disabled for touch devices,
 * prefers-reduced-motion, and machines without usable WebGL — and if the
 * 3D scene throws at runtime anyway, it's dropped instead of taking the
 * page down with it.
 */
export function CursorCompanion() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [webgl, setWebgl] = useState(true);
  const [inHero, setInHero] = useState(true);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!finePointer || reducedMotion) return;
    setEnabled(true);
    setWebgl(hasWebGL());

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { ...pos };

    function onMove(e: MouseEvent) {
      target.x = e.clientX;
      target.y = e.clientY;
    }
    window.addEventListener("mousemove", onMove);

    // Track the hero's own visibility (not the projects section's) —
    // that's the only signal that's monotonic with scroll: it goes false
    // the instant hero scrolls out of view and stays false for every
    // section below it (projects, tech stack, about, contact, footer),
    // flipping back to true only if you scroll back up into the hero.
    // Watching the projects section instead would flip back to "hero
    // mode" again once you scrolled past it, which is the bug this fixes.
    const heroEl = document.getElementById("hero");
    let observer: IntersectionObserver | null = null;
    if (heroEl) {
      observer = new IntersectionObserver(
        ([entry]) => setInHero(entry.isIntersecting),
        { threshold: 0 }
      );
      observer.observe(heroEl);
    }

    let raf = requestAnimationFrame(tick);
    function tick() {
      pos.x += (target.x - pos.x) * 0.12;
      pos.y += (target.y - pos.y) * 0.12;
      if (wrapRef.current) {
        wrapRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    }

    return () => {
      window.removeEventListener("mousemove", onMove);
      observer?.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div ref={wrapRef} className="pointer-events-none fixed left-0 top-0 z-30">
      {/* 3D companion — mounted only while above the projects section, so
          it stops costing GPU/CPU the moment you scroll past it */}
      {inHero && webgl && (
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ width: 90, height: 90 }}
        >
          <CanvasErrorBoundary onError={() => setWebgl(false)}>
            <Canvas
              camera={{ position: [0, 0, 2.6], fov: 45 }}
              gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
              dpr={1}
            >
              <ambientLight intensity={0.6} />
              <directionalLight position={[2, 2, 3]} intensity={1.1} color="#3ED6C4" />
              <directionalLight position={[-2, -1, -2]} intensity={0.6} color="#F5A962" />
              <DistortBlob />
            </Canvas>
          </CanvasErrorBoundary>
        </div>
      )}

      {/* Blurred pink glow — visible everywhere past the hero, and it's
          also the fallback when WebGL isn't available/crashed */}
      {(!inHero || !webgl) && (
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: 130,
            height: 130,
            background:
              "radial-gradient(circle, rgba(255,111,191,0.5) 0%, rgba(255,111,191,0.2) 45%, transparent 70%)",
            filter: "blur(22px)",
            mixBlendMode: "screen",
          }}
        />
      )}
    </div>
  );
}
