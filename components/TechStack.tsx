"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const stackGroups = [
  {
    title: "Development Frameworks",
    accent: "text-lane-web",
    ring: "hover:border-lane-web/50",
    items: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "GraphQL"],
  },
  {
    title: "Mobile Stack",
    accent: "text-lane-mobile",
    ring: "hover:border-lane-mobile/50",
    items: ["React Native", "Flutter", "Expo", "SwiftUI", "Firebase", "SQLite"],
  },
  {
    title: "Design Tools",
    accent: "text-lane-design",
    ring: "hover:border-lane-design/50",
    items: ["Figma", "Illustrator", "Photoshop", "After Effects", "Framer", "Storybook"],
  },
];

export function TechStack() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        <span className="font-mono text-xs uppercase tracking-wider text-paper-500">
          Tools of the trade
        </span>
        <h2 className="mt-2 text-3xl font-semibold text-paper-100 sm:text-4xl">
          Stack &amp; tools
        </h2>
      </motion.div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {stackGroups.map((group, i) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className={cn(
              "rounded-2xl border border-ink-600 bg-ink-800/50 p-6 transition-colors",
              group.ring
            )}
          >
            <h3 className={cn("font-mono text-xs uppercase tracking-wider", group.accent)}>
              {group.title}
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-ink-600 bg-ink-900/60 px-3 py-2 text-center text-sm text-paper-300 transition-colors hover:border-paper-500 hover:text-paper-100"
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
