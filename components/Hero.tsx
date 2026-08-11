"use client";

import { motion } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";
import { Avatar } from "@/components/Avatar";
import { SpotlightText } from "@/components/SpotlightText";

const lanes = [
  { label: "Web", color: "bg-lane-web", text: "text-lane-web" },
  { label: "Mobile", color: "bg-lane-mobile", text: "text-lane-mobile" },
  { label: "Design", color: "bg-lane-design", text: "text-lane-design" },
];

// Fixed positions (not random) so server- and client-rendered markup match
const sparkles = [
  { top: "14%", left: "22%", delay: "0s", size: 3 },
  { top: "24%", left: "78%", delay: "0.6s", size: 2 },
  { top: "62%", left: "88%", delay: "1.2s", size: 3 },
  { top: "78%", left: "12%", delay: "1.8s", size: 2 },
  { top: "40%", left: "6%", delay: "2.4s", size: 2 },
  { top: "8%", left: "55%", delay: "0.3s", size: 2 },
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[92vh] flex-col justify-center overflow-hidden px-6 pt-24 pb-20"
    >
      {/* Whimsical ambient background — hand-drawn-style line accents and
          twinkling sparkle points, kept light so it reads as illustration
          rather than a soft-focus gradient smear */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {sparkles.map((s, i) => (
          <span
            key={i}
            className="absolute animate-twinkle rounded-full bg-paper-100"
            style={{
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              animationDelay: s.delay,
            }}
          />
        ))}

        <svg
          className="absolute right-[10%] top-[16%] h-16 w-16 animate-float text-lane-design/40"
          viewBox="0 0 64 64"
          fill="none"
        >
          <path
            d="M8 44c6-18 20-30 40-28"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="50" cy="14" r="3" fill="currentColor" />
        </svg>

        <svg
          className="absolute left-[5%] bottom-[16%] h-20 w-20 animate-float text-glow-pink/35"
          style={{ animationDelay: "1.2s" }}
          viewBox="0 0 64 64"
          fill="none"
        >
          <path
            d="M32 6l4 16 16 4-16 4-4 16-4-16-16-4 16-4 4-16z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>

        <svg
          className="absolute right-[22%] bottom-[10%] h-10 w-10 animate-float text-lane-web/40"
          style={{ animationDelay: "0.6s" }}
          viewBox="0 0 64 64"
          fill="none"
        >
          <circle
            cx="32"
            cy="32"
            r="20"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="4 6"
          />
        </svg>
      </div>

      {/* Seam between hero and the projects section, instead of a hard cut */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, #3ED6C4 30%, #FF8FCB 50%, #F5A962 70%, transparent)",
          opacity: 0.45,
        }}
      />

      <div className="relative mx-auto w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex items-center gap-4"
        >
          <Avatar />
          <span className="inline-flex items-center gap-2 rounded-full border border-ink-600 bg-ink-900/70 px-3 py-1.5 font-mono text-xs text-paper-500">
            <span className="h-1.5 w-1.5 animate-pulse-slow rounded-full bg-lane-web" />
            Available for select freelance &amp; full-time roles
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          <SpotlightText className="text-balance text-4xl font-semibold leading-[1.08] text-paper-100 sm:text-6xl">
            I build products across
            <br />
            three signal lanes.
          </SpotlightText>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-paper-500"
        >
          Esther Azi — full-stack engineer and product designer. I ship web
          apps, native-feel mobile products, and the brand and UI systems
          that hold them together, end to end, without handoff loss.
        </motion.p>

        {/* Signal lane legend — same color code used across the whole site */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="mt-8 flex flex-wrap gap-x-6 gap-y-2"
        >
          {lanes.map((lane) => (
            <div key={lane.label} className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${lane.color}`} />
              <span className={`font-mono text-xs uppercase tracking-wider ${lane.text}`}>
                {lane.label}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#work"
            className="inline-flex items-center gap-2 rounded-lg bg-paper-100 px-5 py-3 text-sm font-semibold text-ink-950 transition-transform hover:scale-[1.02] active:scale-[0.99]"
          >
            View work <ArrowDown className="h-4 w-4" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-lg border border-ink-600 px-5 py-3 text-sm font-semibold text-paper-100 transition-colors hover:border-paper-500"
          >
            Contact me <Mail className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
