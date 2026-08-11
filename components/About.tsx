"use client";

import { motion } from "framer-motion";
import { Lightbulb, PenTool, Code2, Rocket } from "lucide-react";

const steps = [
  {
    icon: Lightbulb,
    title: "Frame the problem",
    text: "Start from the user's actual constraint, not the feature request. Every project begins with a one-paragraph problem statement everyone can agree on.",
    accent: "text-lane-design",
  },
  {
    icon: PenTool,
    title: "Design in context",
    text: "Wireframes and UI live next to real content and real data from day one, in Figma or straight in code, whichever answers questions faster.",
    accent: "text-lane-design",
  },
  {
    icon: Code2,
    title: "Build in vertical slices",
    text: "Ship one full path end to end, web or mobile, backend and interface together, before broadening. Nothing sits mocked for long.",
    accent: "text-lane-web",
  },
  {
    icon: Rocket,
    title: "Ship, measure, refine",
    text: "Launch to real users early, watch what actually happens, and let that evidence, not opinion, drive the next iteration.",
    accent: "text-lane-mobile",
  },
];

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl"
      >
        <span className="font-mono text-xs uppercase tracking-wider text-paper-500">
          How it comes together
        </span>
        <h2 className="mt-2 text-3xl font-semibold text-paper-100 sm:text-4xl">
          One process, three disciplines
        </h2>
        <p className="mt-4 leading-relaxed text-paper-500">
          Design and development aren&apos;t separate phases here, they run in
          parallel. This is the loop that shapes every project on this page,
          whether it ships as a browser tab, an app icon, or a brand guide.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="rounded-2xl border border-ink-600 bg-ink-800/50 p-6"
          >
            <step.icon className={`h-5 w-5 ${step.accent}`} />
            <h3 className="mt-4 font-semibold text-paper-100">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-paper-500">{step.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
