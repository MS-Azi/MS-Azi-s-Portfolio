# MS-Azi Portfolio

Multidisciplinary portfolio spanning Web Development, Mobile Apps, and
Graphic / UI-UX Design. Built with Next.js 14 (App Router), TypeScript,
Tailwind CSS, and Framer Motion.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Structure

- `app/page.tsx` — assembles all sections, owns filter + modal state
- `app/layout.tsx` — root layout, fonts, dark mode
- `data/projects.ts` — all project content (edit this to add or change projects)
- `components/` — Hero, CategoryFilter, ProjectCard, ProjectModal, TechStack, About, Contact, Footer
- `public/images/projects/` — project covers, gallery images, and demo videos

## Notes

- The contact form in `components/Contact.tsx` currently flips a local
  "sent" state only — wire `handleSubmit` up to an email service or API
  route to actually deliver messages.
