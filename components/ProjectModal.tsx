"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ExternalLink, Github, ChevronLeft, ChevronRight, Play, Images } from "lucide-react";
import { Project, categoryMeta } from "@/data/projects";
import { cn } from "@/lib/utils";

const laneText: Record<string, string> = {
  web: "text-lane-web",
  mobile: "text-lane-mobile",
  design: "text-lane-design",
};

interface ProjectModalProps {
  project: Project | null;
  initialVideo?: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, initialVideo, onClose }: ProjectModalProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    setActiveImage(0);
    setShowVideo(!!initialVideo);
    setImgLoaded(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  // Reset the loaded flag whenever the visible image changes so the
  // incoming image fades in instead of the previous one lingering.
  useEffect(() => {
    setImgLoaded(false);
  }, [activeImage]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (project) {
      document.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!project) return null;
  const accent = laneText[project.category];
  const gallery = project.caseStudy.gallery;
  const demoVideoUrl = project.demoVideoUrl;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-ink-950/85 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            layoutId={project.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 340, damping: 32 }}
            className="relative z-10 max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-ink-600 bg-ink-900 shadow-2xl"
          >
            <button
              onClick={onClose}
              aria-label="Close case study"
              className="absolute right-4 top-4 z-20 rounded-full border border-ink-600 bg-ink-950/80 p-2 text-paper-300 hover:text-paper-100"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Gallery / demo video */}
            <div
              className={cn(
                "relative w-full overflow-hidden bg-ink-950",
                // Phone-screenshot galleries run tall/portrait — a fixed 16:9
                // box would letterbox them down to a sliver. Give them a
                // taller box so the screenshot actually fills the view.
                project.tallGallery ? "h-[60vh] max-h-[560px]" : "aspect-video"
              )}
            >
              {showVideo && demoVideoUrl ? (
                // eslint-disable-next-line jsx-a11y/media-has-caption
                <video
                  src={demoVideoUrl}
                  controls
                  autoPlay
                  playsInline
                  className="h-full w-full bg-ink-950 object-contain"
                />
              ) : (
                <>
                  {/* Neutral surface while a slide is still decoding, so a
                      slow swap never leaves the previous picture on screen. */}
                  {!imgLoaded && (
                    <div className="absolute inset-0 animate-pulse bg-ink-800" />
                  )}
                  {/* Render the current slide plus its immediate neighbours,
                      all stacked and at full display size. Only the active one
                      is visible; the neighbours load in the background at the
                      exact same URL/size, so Next / Prev swaps are instant and
                      next/image never lingers on a stale src (each layer is
                      keyed to its own source). */}
                  {gallery.map((src, i) => {
                    const isNeighbour =
                      i === activeImage ||
                      i === (activeImage + 1) % gallery.length ||
                      i === (activeImage - 1 + gallery.length) % gallery.length;
                    if (!isNeighbour) return null;
                    const isActive = i === activeImage;
                    return (
                      <Image
                        // Distinct key per role so the active slide always
                        // mounts fresh (firing onLoad, even from cache) rather
                        // than inheriting a neighbour's already-settled state.
                        key={isActive ? `active-${src}` : `peer-${src}`}
                        src={src}
                        alt={isActive ? `${project.title} — visual ${i + 1}` : ""}
                        fill
                        sizes="(max-width: 768px) 100vw, 768px"
                        onLoad={isActive ? () => setImgLoaded(true) : undefined}
                        className={cn(
                          "transition-opacity duration-300",
                          isActive && imgLoaded ? "opacity-100" : "opacity-0",
                          // Design pieces and phone screenshots both run tall/
                          // odd aspect ratios — cropping to fill a wide
                          // landscape box would cut off most of the image.
                          project.category === "design" ||
                            project.category === "mobile" ||
                            project.tallGallery
                            ? "object-contain p-4"
                            : "object-cover"
                        )}
                        priority={isActive}
                      />
                    );
                  })}
                </>
              )}

              {!showVideo && gallery.length > 1 && (
                <>
                  <button
                    aria-label="Previous image"
                    onClick={() => setActiveImage((i) => (i === 0 ? gallery.length - 1 : i - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-ink-950/70 p-2 text-paper-100 hover:bg-ink-950"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    aria-label="Next image"
                    onClick={() => setActiveImage((i) => (i === gallery.length - 1 ? 0 : i + 1))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-ink-950/70 p-2 text-paper-100 hover:bg-ink-950"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                  <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                    {gallery.map((_, i) => (
                      <button
                        key={i}
                        aria-label={`Go to image ${i + 1}`}
                        onClick={() => setActiveImage(i)}
                        className={cn(
                          "h-1.5 w-1.5 rounded-full transition-all",
                          i === activeImage ? "w-4 bg-paper-100" : "bg-paper-100/40"
                        )}
                      />
                    ))}
                  </div>
                </>
              )}

              {demoVideoUrl && (
                <button
                  onClick={() => setShowVideo((v) => !v)}
                  className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-ink-950/80 px-3 py-1.5 text-xs font-semibold text-paper-100 hover:bg-ink-950"
                >
                  {showVideo ? (
                    <>
                      <Images className="h-3.5 w-3.5" /> Screenshots
                    </>
                  ) : (
                    <>
                      <Play className="h-3.5 w-3.5" /> Watch demo
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="space-y-6 p-6 sm:p-8">
              <div>
                <span className={cn("font-mono text-xs uppercase tracking-wider", accent)}>
                  {categoryMeta[project.category].label}
                </span>
                <h2 id="modal-title" className="mt-1 text-2xl font-semibold text-paper-100">
                  {project.title}
                </h2>
                <p className="mt-1 text-paper-500">{project.tagline}</p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-paper-300">
                    Problem
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-paper-500">
                    {project.caseStudy.problem}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-paper-300">
                    Solution
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-paper-500">
                    {project.caseStudy.solution}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-paper-300">Role</h3>
                <p className="mt-2 text-sm leading-relaxed text-paper-500">{project.caseStudy.role}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-paper-300">
                  Tools &amp; tech
                </h3>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-md border border-ink-600 px-2 py-1 font-mono text-[11px] text-paper-300"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {project.category === "web" && (
                <div className="flex gap-4 border-t border-ink-600 pt-5">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn("inline-flex items-center gap-1.5 text-sm font-medium", accent)}
                    >
                      <ExternalLink className="h-3.5 w-3.5" /> View live demo
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-paper-300"
                    >
                      <Github className="h-3.5 w-3.5" /> View source
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
