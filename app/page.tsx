"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Hero } from "@/components/Hero";
import { CursorCompanion } from "@/components/CursorCompanion";
import { CategoryFilter, FilterValue } from "@/components/CategoryFilter";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectModal } from "@/components/ProjectModal";
import { TechStack } from "@/components/TechStack";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Project, projects } from "@/data/projects";

export default function Home() {
  const [filter, setFilter] = useState<FilterValue>("all");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [openToVideo, setOpenToVideo] = useState(false);

  function handleOpenProject(project: Project, options?: { video?: boolean }) {
    setActiveProject(project);
    setOpenToVideo(!!options?.video);
  }

  const visibleProjects = useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <main>
      <CursorCompanion />
      <Hero />

      <section id="work" className="mx-auto max-w-6xl px-6 py-24 scroll-mt-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-paper-500">
              Selected work
            </span>
            <h2 className="mt-2 text-3xl font-semibold text-paper-100 sm:text-4xl">
              Projects
            </h2>
          </div>
          <CategoryFilter active={filter} onChange={setFilter} />
        </motion.div>

        {/*
          layout on the grid + mode="popLayout" on AnimatePresence gives
          zero-layout-shift reflow: cards animate to their new position
          instead of the grid jumping when the filter changes.
        */}
        <motion.div
          layout
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project) => (
              <ProjectCard key={project.id} project={project} onOpen={handleOpenProject} />
            ))}
          </AnimatePresence>
        </motion.div>

        {visibleProjects.length === 0 && (
          <p className="mt-10 text-center text-sm text-paper-500">
            No projects in this lane yet — check back soon.
          </p>
        )}
      </section>

      <TechStack />
      <About />
      <Contact />
      <Footer />

      <ProjectModal
        project={activeProject}
        initialVideo={openToVideo}
        onClose={() => setActiveProject(null)}
      />
    </main>
  );
}
