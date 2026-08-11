"use client";

import { motion } from "framer-motion";
import { Code2, Smartphone, Palette, LayoutGrid } from "lucide-react";
import { Category, categoryMeta } from "@/data/projects";
import { cn } from "@/lib/utils";

export type FilterValue = Category | "all";

const tabs: { value: FilterValue; label: string; icon: React.ElementType }[] = [
  { value: "all", label: "All Work", icon: LayoutGrid },
  { value: "web", label: categoryMeta.web.label, icon: Code2 },
  { value: "mobile", label: categoryMeta.mobile.label, icon: Smartphone },
  { value: "design", label: categoryMeta.design.label, icon: Palette },
];

const accentText: Record<FilterValue, string> = {
  all: "text-paper-100",
  web: "text-lane-web",
  mobile: "text-lane-mobile",
  design: "text-lane-design",
};

const accentBg: Record<FilterValue, string> = {
  all: "bg-paper-100",
  web: "bg-lane-web",
  mobile: "bg-lane-mobile",
  design: "bg-lane-design",
};

interface CategoryFilterProps {
  active: FilterValue;
  onChange: (value: FilterValue) => void;
}

export function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div
      role="tablist"
      aria-label="Filter projects by discipline"
      className="flex flex-wrap items-stretch gap-1 rounded-xl border border-ink-600 bg-ink-900/60 p-1.5 backdrop-blur-sm sm:inline-flex"
    >
      {tabs.map(({ value, label, icon: Icon }) => {
        const isActive = active === value;
        return (
          <button
            key={value}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(value)}
            className={cn(
              "relative flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
              isActive ? accentText[value] : "text-paper-500 hover:text-paper-300"
            )}
          >
            {isActive && (
              <motion.span
                layoutId="lane-indicator"
                className={cn("absolute inset-0 rounded-lg bg-ink-700/80 ring-1", "ring-current/30")}
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <Icon className="relative z-10 h-4 w-4" />
            <span className="relative z-10 whitespace-nowrap">{label}</span>
            {isActive && (
              <motion.span
                layoutId="lane-dot"
                className={cn("relative z-10 h-1.5 w-1.5 rounded-full", accentBg[value])}
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
