# Multidisciplinary Portfolio

Next.js 14 (App Router) + TypeScript + Tailwind + Framer Motion portfolio for a
full-stack engineer / product designer, spanning Web Dev, Mobile Apps, and
Graphic Design.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Structure

- `app/page.tsx` — assembles all sections, owns filter + modal state
- `app/layout.tsx` — root layout, fonts, dark mode
- `data/projects.ts` — all project content (edit this to add/change projects)
- `components/` — Hero, CategoryFilter, ProjectCard, ProjectModal, TechStack, About, Contact, Footer

## Notes

- Sandbox build note: this environment could not reach fonts.googleapis.com,
  so `next build` wasn't run end-to-end here — but `tsc --noEmit` passed clean
  with no type errors, and it will build normally on a machine with internet
  access (e.g. Vercel, or your own machine).
- Swap the Unsplash placeholder images in `data/projects.ts` for real project
  screenshots before shipping.
- Contact form currently just flips a local "sent" state — wire `handleSubmit`
  in `components/Contact.tsx` up to Resend, Formspree, or your API route of choice.
