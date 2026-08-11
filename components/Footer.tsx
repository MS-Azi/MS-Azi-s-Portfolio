"use client";

import { motion } from "framer-motion";

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="border-t border-ink-600 px-6 py-8"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="font-mono text-xs text-paper-500">
          &copy; {new Date().getFullYear()} Esther Azi. Built with Next.js &amp; Tailwind.
        </p>
        <div className="flex gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-lane-web" />
          <span className="h-1.5 w-1.5 rounded-full bg-lane-mobile" />
          <span className="h-1.5 w-1.5 rounded-full bg-lane-design" />
        </div>
      </div>
    </motion.footer>
  );
}
