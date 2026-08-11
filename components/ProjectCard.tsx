"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Github, PlayCircle, Smartphone } from "lucide-react";
import { Project, categoryMeta } from "@/data/projects";
import { cn } from "@/lib/utils";

const laneBorder: Record<string, string> = {
  web: "hover:border-lane-web/60",
  mobile: "hover:border-lane-mobile/60",
  design: "hover:border-lane-design/60",
};

const laneText: Record<string, string> = {
  web: "text-lane-web",
  mobile: "text-lane-mobile",
  design: "text-lane-design",
};

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project, options?: { video?: boolean }) => void;
}

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const accent = laneText[project.category];

  return (
    <motion.article
      layout
      layoutId={project.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-ink-600 bg-ink-800/60",
        "transition-colors duration-300",
        laneBorder[project.category]
      )}
    >
      <button
        onClick={() => onOpen(project)}
        aria-label={`View case study for ${project.title}`}
        className="text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px]"
      >
        {/* Preview surface — differs slightly per discipline */}
        <div
          className={cn(
            "relative aspect-[4/3] w-full overflow-hidden bg-ink-900",
            project.category === "mobile" && "flex items-center justify-center bg-ink-950 py-6"
          )}
        >
          {project.category === "mobile" ? (
            // Real phone screenshots run tall and narrow (~9:19.5) — sizing
            // the frame to that ratio (rather than an arbitrary width
            // percentage) keeps object-cover from cropping most of the
            // screenshot away.
            <div className="relative aspect-[9/19.5] h-full overflow-hidden rounded-[1.4rem] border-4 border-ink-600 shadow-2xl">
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 60vw, 300px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ) : (
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className={cn(
                "transition-transform duration-500 group-hover:scale-105",
                // Design work (social posts, print pieces) comes in all
                // sorts of aspect ratios — cropping to fill the card would
                // cut off the actual design, so show it whole instead.
                project.category === "design" ? "object-contain p-3" : "object-cover"
              )}
            />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />

          <span
            className={cn(
              "absolute left-3 top-3 rounded-full border border-ink-600 bg-ink-950/80 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider",
              accent
            )}
          >
            {categoryMeta[project.category].label}
          </span>
        </div>

        <div className="flex flex-col gap-3 p-5">
          <div>
            <h3 className="text-lg font-semibold text-paper-100">{project.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-paper-500">{project.tagline}</p>
          </div>

          {/* Platform badges for mobile */}
          {project.category === "mobile" && (
            <div className="flex flex-wrap gap-1.5">
              {project.platforms.map((p) => (
                <span
                  key={p}
                  className="inline-flex items-center gap-1 rounded-md bg-ink-700 px-2 py-1 font-mono text-[11px] text-paper-300"
                >
                  <Smartphone className="h-3 w-3" /> {p}
                </span>
              ))}
            </div>
          )}

          {/* Tech / tool badges — shared visual language, discipline-tinted */}
          <div className="flex flex-wrap gap-1.5">
            {project.tools.slice(0, 4).map((tool) => (
              <span
                key={tool}
                className="rounded-md border border-ink-600 px-2 py-1 font-mono text-[11px] text-paper-500"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </button>

      {/* Action row — differs per discipline */}
      <div className="mt-auto flex items-center gap-4 border-t border-ink-600 px-5 py-3">
        {project.category === "web" && (
          <>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={cn("inline-flex items-center gap-1.5 text-sm font-medium", accent, "hover:opacity-80")}
              >
                <ExternalLink className="h-3.5 w-3.5" /> Live demo
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-paper-500 hover:text-paper-300"
              >
                <Github className="h-3.5 w-3.5" /> Source
              </a>
            )}
            {project.demoVideoUrl && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpen(project, { video: true });
                }}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-paper-500 hover:text-paper-300"
              >
                <PlayCircle className="h-3.5 w-3.5" /> Watch demo
              </button>
            )}
          </>
        )}
        {project.category === "mobile" && (
          <>
            {project.storeUrl && (
              <a
                href={project.storeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={cn("inline-flex items-center gap-1.5 text-sm font-medium", accent, "hover:opacity-80")}
              >
                <ExternalLink className="h-3.5 w-3.5" /> App store
              </a>
            )}
            {project.demoVideoUrl && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpen(project, { video: true });
                }}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-paper-500 hover:text-paper-300"
              >
                <PlayCircle className="h-3.5 w-3.5" /> Demo video
              </button>
            )}
          </>
        )}
        {project.category === "design" && (
          <>
            <span className={cn("inline-flex items-center gap-1.5 text-sm font-medium", accent)}>
              View gallery &rarr;
            </span>
            {project.demoVideoUrl && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpen(project, { video: true });
                }}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-paper-500 hover:text-paper-300"
              >
                <PlayCircle className="h-3.5 w-3.5" /> Watch demo
              </button>
            )}
          </>
        )}
      </div>
    </motion.article>
  );
}
