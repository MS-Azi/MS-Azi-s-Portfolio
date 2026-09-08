export type Category = "web" | "mobile" | "design";

export interface CaseStudy {
  problem: string;
  solution: string;
  role: string;
  gallery: string[]; // high-res image URLs
}

export interface BaseProject {
  id: string;
  category: Category;
  title: string;
  tagline: string;
  coverImage: string;
  tools: string[]; // badges
  caseStudy: CaseStudy;
  featured?: boolean;
  // A local video file or link that can be watched inline in the modal —
  // available regardless of category (mobile app demos, design walkthroughs).
  demoVideoUrl?: string;
}

export interface WebProject extends BaseProject {
  category: "web";
  liveUrl?: string;
  repoUrl?: string;
}

export interface MobileProject extends BaseProject {
  category: "mobile";
  platforms: ("iOS" | "Android" | "React Native" | "Flutter")[];
  storeUrl?: string;
}

export interface DesignProject extends BaseProject {
  category: "design";
  images: string[]; // full grid, beyond gallery
}

export type Project = WebProject | MobileProject | DesignProject;

export const categoryMeta: Record<
  Category,
  { label: string; accent: string; accentDim: string; description: string }
> = {
  web: {
    label: "Web Development",
    accent: "lane-web",
    accentDim: "lane-webDim",
    description: "Full-stack products, from API to pixel.",
  },
  mobile: {
    label: "Mobile Apps",
    accent: "lane-mobile",
    accentDim: "lane-mobileDim",
    description: "Native-feel apps shipped to real app stores.",
  },
  design: {
    label: "Graphic Design",
    accent: "lane-design",
    accentDim: "lane-designDim",
    description: "Brand systems and interface craft.",
  },
};

export const projects: Project[] = [
  // ---------- FLAGSHIP ----------
  {
    id: "mobile-campusalert",
    category: "mobile",
    title: "CampusAlert — AI-Powered Campus Emergency Alerts",
    tagline:
      "An AI-powered campus emergency alert system that ranks urgency and delivers notifications even when the internet is down.",
    coverImage: "/images/projects/alert-system.png",
    tools: [
      "Python",
      "Django",
      "Django Channels",
      "React Native",
      "XGBoost",
      "PostgreSQL",
      "Redis",
      "Celery",
      "Firebase Cloud Messaging",
      "Socket.IO",
      "SQLite",
      "Machine Learning",
    ],
    platforms: ["iOS", "Android", "React Native"],
    demoVideoUrl: "/images/projects/campusalert-demo.mov",
    featured: true,
    caseStudy: {
      problem:
        "Campus emergency communication had no urgency signal — email and broadcast groups treated a fire alarm and a schedule change the same way, and both failed entirely the moment the network went down.",
      solution:
        "Built CampusAlert: incoming alerts are automatically classified by urgency using a keyword-detection layer combined with an XGBoost model trained on 35,000+ crisis-message samples (85%+ accuracy), then delivered through a hybrid cascade — Firebase Cloud Messaging over the internet, Socket.IO over the local network, and offline queuing with on-device caching as a fallback — so alerts still reach students even when connectivity drops. Includes a React Native app for students and a Django admin dashboard for alert management.",
      role: "Solo project — Final Year Project (FYP) at Covenant University. User acceptance testing with 20 participants scored 4.5/5, with unanimous preference over the school's existing email system.",
      gallery: ["/images/projects/alert-system.png"],
    },
  },

  // ---------- MOBILE APPS ----------
  {
    id: "mobile-volv",
    category: "mobile",
    title: "Volv — The Operating System for Ambitious Women",
    tagline:
      "For ambitious women building businesses, careers, and lives with intention — planning, tracking, learning, and growth in one structured system.",
    coverImage: "/images/projects/volv-cover.jpg",
    tools: [
      "React Native",
      "Expo",
      "TypeScript",
      "Expo Router",
      "Supabase",
      "PostgreSQL",
      "Row Level Security",
      "Expo Notifications",
      "EAS",
    ],
    platforms: ["React Native", "Android"],
    demoVideoUrl: "/images/projects/volv-demo.mp4",
    caseStudy: {
      problem:
        "Ambitious women often use separate tools for planning, business tracking, career development, learning, and personal growth. Volv brings these fragmented activities into one structured system designed to help users move from reactive living to intentional execution.",
      solution:
        "A subscription mobile app combining daily/weekly/monthly planning, business and career KPI tracking, leadership development, goal tracking, curated learning content, and interactive productivity tools in one habit-forming experience.",
      role:
        "Product concept, UX/product design, feature architecture, mobile app development, Supabase backend implementation, authentication, database/RLS setup, notifications, navigation, offline/network handling, personalization, and testing. Built with React Native/Expo and TypeScript, with AI-assisted development through Claude Code.",
      gallery: ["/images/projects/volv-cover.jpg"],
    },
  },

  // ---------- WEB DEVELOPMENT ----------
  {
    id: "web-imarc-attendance",
    category: "web",
    title: "iMarc Attendance System — GPS-Verified Attendance Management",
    tagline:
      "GPS-verified attendance management for modern architecture teams — clock in from your phone, validated against the office geofence.",
    coverImage: "/images/projects/attendance-cover.png",
    tools: [
      "Next.js 14",
      "App Router",
      "TypeScript",
      "PostgreSQL",
      "Prisma ORM",
      "JWT",
      "jose",
      "bcryptjs",
      "ExcelJS",
      "Nodemailer",
      "Tailwind CSS",
      "Render",
    ],
    demoVideoUrl: "/images/projects/attendance-demo.mp4",
    featured: true,
    caseStudy: {
      problem:
        "iMarcPro Architects needed a reliable way to track staff attendance without relying on manual registers or unverified clock-ins. The system needed to confirm that staff were physically at the office, identify lateness and missed clock-outs, and give management a clearer view of attendance records and trends.",
      solution:
        "A GPS-verified attendance web application that lets staff clock in and out from their phones through a browser. The system validates their location against a defined office geofence and blocks off-site clock-ins. It also tracks lateness, flags missed clock-outs as anomalies, provides an administrative dashboard and attendance logs, supports staff management and manual overrides, exports attendance data to Excel, and automatically generates and emails comprehensive monthly attendance reports.",
      role:
        "Product design, UX/UI design, system architecture, frontend and backend development, database design, authentication, GPS/geofencing logic, attendance workflows, reporting automation, Excel export, email automation, deployment, and testing. The visual design was intentionally inspired by iMarcPro Architects' architectural workflow — an aesthetic influenced by Revit and technical architectural drawings, with a structured, precise, technical feel that makes the system feel native to an architecture practice rather than a generic HR platform.",
      gallery: ["/images/projects/attendance-cover.png"],
    },
  },
  {
    id: "web-payaza-clone",
    category: "web",
    title: "Payaza Clone — Pixel-Perfect Frontend Replication",
    tagline:
      "A pixel-perfect frontend clone of Payaza's fintech website, built for the love of precision replication.",
    coverImage: "/images/projects/payaza-rep.png",
    tools: ["HTML", "CSS", "JavaScript", "UI Replication", "Responsive Design"],
    demoVideoUrl: "/images/projects/payaza.mp4",
    caseStudy: {
      problem:
        "A personal-for-fun challenge: how close can a frontend clone get to a real, polished fintech site — matching layout, typography, spacing, and visual details down to the pixel?",
      solution:
        "Recreated the Payaza fintech landing page as closely as possible, built purely as a frontend/UI replication exercise to sharpen attention to detail and CSS precision.",
      role: "Solo, personal practice project.",
      gallery: ["/images/projects/payaza-rep.png"],
    },
  },
  {
    id: "web-nw-aligner",
    category: "web",
    title: "NW Aligner — Needleman-Wunsch Sequence Alignment Tool",
    tagline:
      "A web-based Needleman-Wunsch aligner that turns manual sequence-alignment matrix work into a one-click visual tool.",
    coverImage: "/images/projects/nw-aligner.png",
    tools: [
      "Python",
      "Flask",
      "JavaScript",
      "HTML/CSS",
      "Tailwind CSS",
      "Needleman-Wunsch Algorithm",
      "Bioinformatics",
      "Render",
    ],
    liveUrl: "https://nw-aligner-needleman-wunsch-global.onrender.com/",
    featured: true,
    caseStudy: {
      problem:
        "Computing global sequence alignments by hand for bioinformatics coursework meant manually filling out scoring matrices and tracing paths through them — tedious and error-prone.",
      solution:
        "Built a tool where users input two sequences (DNA, RNA, or amino acid) plus custom match/mismatch/gap parameters and instantly get a scoring matrix, traceback path, and final alignment with a match/mismatch/gap breakdown. The Flask backend runs the Needleman-Wunsch DP algorithm and scoring logic; the JS frontend renders the interactive matrix and traceback visualization.",
      role: "Solo project — built the Python/Flask backend (DP algorithm, scoring logic) and the JavaScript frontend (interactive matrix and traceback rendering) end to end.",
      gallery: ["/images/projects/nw-aligner.png"],
    },
  },
  {
    id: "web-microscope-calculator",
    category: "web",
    title: "Microscope Specimen Size Calculator",
    tagline:
      "A microscope specimen size calculator that converts image measurements into true real-life dimensions.",
    coverImage: "/images/projects/microscope1.png",
    tools: [
      "Python",
      "Flask",
      "JavaScript",
      "HTML/CSS",
      "Data Logging",
      "Render",
    ],
    liveUrl: "https://microscope-calculator-7pp3.onrender.com/",
    caseStudy: {
      problem:
        "Researchers had to manually convert measured image sizes into true real-life specimen dimensions by hand for every reading, and had no record of past calculations to review later.",
      solution:
        "Built a tool where a researcher enters a magnification factor and a measured image size and instantly gets the true real-life size, with every calculation (researcher name, magnification, image size, computed size, date) logged to a reviewable timeline table. The Flask backend handles the scale-conversion logic and calculation storage; the JS frontend drives the form and results table.",
      role: "Solo project — built the Python/Flask backend (conversion logic, calculation storage) and the JavaScript frontend (form and results table) end to end.",
      gallery: [
        "/images/projects/microscope1.png",
        "/images/projects/microscope2.png",
      ],
    },
  },
  {
    id: "web-transcription-simulator",
    category: "web",
    title: "Transcription Simulator — DNA/RNA Sequence Analyzer",
    tagline:
      "A DNA/RNA sequence analysis tool that fetches real genetic data from Ensembl and breaks down its composition.",
    coverImage: "/images/projects/bio-sequence.png",
    tools: [
      "JavaScript",
      "HTML/CSS",
      "Ensembl REST API",
      "Bioinformatics",
      "CSV Parsing",
      "Render",
    ],
    liveUrl: "https://transcription-simulator.onrender.com/",
    caseStudy: {
      problem:
        "Sequence composition analysis usually meant either manually typing out a sequence with no way to pull real genetic data, or juggling separate tools for lookup versus analysis.",
      solution:
        "Built a client-side tool that accepts a raw DNA/RNA sequence, a .csv upload, or a live sequence pulled directly from the Ensembl genome database by ID, and returns a composition breakdown with mapping toward protein structures — manual input and live API-fetched data in one workflow.",
      role: "Solo project — built entirely with vanilla HTML/CSS/JS, including the Ensembl API integration, CSV parsing, and sequence analysis logic, all client-side.",
      gallery: ["/images/projects/bio-sequence.png"],
    },
  },

  // ---------- GRAPHIC / UI-UX DESIGN ----------
  {
    id: "design-payroll-management",
    category: "design",
    title: "Payroll Management System — UI/UX Design",
    tagline:
      "Automating payroll operations for businesses and companies — centralized employee records, salary and deduction calculations, and payroll reporting.",
    coverImage: "/images/projects/work-cover.png",
    tools: [
      "Figma",
      "Wireframing",
      "Prototyping",
      "UI Design",
      "UX Design",
      "User Flows",
    ],
    demoVideoUrl: "/images/projects/work-demo.mp4",
    images: ["/images/projects/work-cover.png"],
    caseStudy: {
      problem:
        "Many businesses still manage payroll activities manually using spreadsheets and disconnected processes, making it time-consuming to calculate salaries, track deductions, manage employee records, and prepare payroll reports. These manual processes can also increase the risk of errors and administrative delays.",
      solution:
        "A payroll management web application designed to automate key payroll activities for businesses. The system centralizes employee information, streamlines salary calculations and deductions, simplifies payroll processing, and provides businesses with organized payroll records and reports.",
      role:
        "Product design, UI/UX design, frontend development, backend development, database design, payroll workflow design, automation logic, and testing.",
      gallery: ["/images/projects/work-cover.png"],
    },
  },
  {
    id: "design-freelance-jobs",
    category: "design",
    title: "Freelance Design Work — Social & Print Projects",
    tagline: "Freelance social media and print design work for real clients.",
    coverImage: "/images/projects/social/shethrive1.png",
    tools: ["Photoshop", "Figma", "Canva", "Adobe Illustrator"],
    images: [
      "/images/projects/social/hero-projects.png",
      "/images/projects/social/shethrive1.png",
      "/images/projects/social/shethrive2.png",
      "/images/projects/social/shethrive3.png",
      "/images/projects/carousel/white-yellow-minimalist-quote-post.png",
      "/images/projects/print/dominion-city-aguda.png",
      "/images/projects/print/healthy4.png",
      "/images/projects/print/international-conference-sustainable-procurement.png",
      "/images/projects/social/campaignn1.png",
      "/images/projects/social/campus-mart.png",
      "/images/projects/social/dcprime-song.png",
      "/images/projects/social/dcprime.png",
      "/images/projects/social/eto-gadget-x.png",
      "/images/projects/social/happy-new-month-post.png",
      "/images/projects/social/ministered-by-dc-prime-angels.png",
      "/images/projects/social/neska-noodles.png",
      "/images/projects/social/temu-of-campus-life.png",
      "/images/projects/social/thursday-song-cover.jpg",
      "/images/projects/social/tuesday-song-cover.jpg",
      "/images/projects/social/photo_2026-05-20_19-12-05.jpg",
    ],
    featured: true,
    caseStudy: {
      problem:
        "Real clients across different briefs needed social media and print materials that felt cohesive and on-brand, not like generic one-off templates.",
      solution:
        "A collection of freelance graphic design projects spanning social media carousels/posts and print materials, covering everything from visual concept to final deliverable — layout, typography, color, and brand consistency tailored to each client's needs.",
      role: "Freelance / solo graphic designer for each client.",
      gallery: [
        "/images/projects/social/hero-projects.png",
        "/images/projects/social/shethrive1.png",
        "/images/projects/social/shethrive2.png",
        "/images/projects/social/shethrive3.png",
        "/images/projects/carousel/white-yellow-minimalist-quote-post.png",
        "/images/projects/print/dominion-city-aguda.png",
        "/images/projects/print/healthy4.png",
        "/images/projects/print/international-conference-sustainable-procurement.png",
        "/images/projects/social/campaignn1.png",
        "/images/projects/social/campus-mart.png",
        "/images/projects/social/dcprime-song.png",
        "/images/projects/social/dcprime.png",
        "/images/projects/social/eto-gadget-x.png",
        "/images/projects/social/happy-new-month-post.png",
        "/images/projects/social/ministered-by-dc-prime-angels.png",
        "/images/projects/social/neska-noodles.png",
        "/images/projects/social/temu-of-campus-life.png",
        "/images/projects/social/thursday-song-cover.jpg",
        "/images/projects/social/tuesday-song-cover.jpg",
        "/images/projects/social/photo_2026-05-20_19-12-05.jpg",
      ],
    },
  },
  {
    id: "design-movie-ticketing-app",
    category: "design",
    title: "Movie Ticketing App — UI/UX Design",
    tagline:
      "A clean, intuitive UI/UX design for a movie ticket booking app, built for a freelance client.",
    coverImage: "/images/projects/ticket-photo.png",
    tools: [
      "Figma",
      "UI/UX Design",
      "Wireframing",
      "Prototyping",
      "Mobile App Design",
    ],
    demoVideoUrl: "/images/projects/ticket.mp4",
    images: ["/images/projects/ticket-photo.png"],
    caseStudy: {
      problem:
        "A freelance client needed a movie ticket booking app that made browsing, seat selection, and checkout feel fast and frictionless, not like a typical clunky booking flow.",
      solution:
        "Designed the full UI/UX in Figma, from wireframes through high-fidelity mockups, covering the browsing, seat-selection, and checkout flows end to end.",
      role: "Freelance UI/UX designer for the client.",
      gallery: ["/images/projects/ticket-photo.png"],
    },
  },
  {
    id: "design-gewband",
    category: "design",
    title: "GEWBand — Smart Wristband Product & Landing Page",
    tagline:
      "A landing page and product design for a smart wristband that predicts hypoglycemic events before they happen.",
    coverImage: "/images/projects/gew-photo.png",
    tools: [
      "Figma",
      "UI/UX Design",
      "Double Diamond Design Process",
      "Usability Heuristics",
      "Prototyping",
      "Web Design",
    ],
    demoVideoUrl: "/images/projects/gew.mp4",
    images: ["/images/projects/gew-photo.png"],
    caseStudy: {
      problem:
        "People with diabetes get little to no warning before a hypoglycemic event — GEWBand needed a product story and interface that made a genuinely technical, medical-grade prediction feature feel trustworthy and easy to understand at a glance.",
      solution:
        "Ran the full HCI design process — user research, the Double Diamond framework, usability heuristics, and iterative prototyping — for a concept smart wristband that uses machine learning to predict blood-glucose drops up to 45 minutes in advance, translated into a polished product landing page with a real-time prediction UI.",
      role: "Team lead — directed the design process and final deliverable.",
      gallery: ["/images/projects/gew-photo.png"],
    },
  },
  {
    id: "design-fcet-akoka-portal",
    category: "design",
    title: "FCE (Technical), Akoka — Student Portal Redesign",
    tagline:
      "A streamlined digital portal for managing the student academic experience at Federal College of Education (Technical), Akoka.",
    coverImage: "/images/projects/fcet-cover.png",
    tools: [
      "Figma",
      "Wireframing",
      "Prototyping",
      "UI Design",
      "UX Design",
      "User Flows",
    ],
    demoVideoUrl: "/images/projects/fcet-demo.mp4",
    images: ["/images/projects/fcet-cover.png"],
    caseStudy: {
      problem:
        "The existing student experience involved navigating academic and administrative processes across a system that could be difficult to use and lacked a modern, intuitive interface. Students needed a clearer way to access important academic information and complete common portal tasks.",
      solution:
        "A redesigned school portal experience focused on simplifying navigation, improving information hierarchy, and making key student activities easier to access. The interface was structured around the needs of students, with clearer user flows, organized academic information, and a more modern and accessible visual experience.",
      role:
        "UI/UX Designer — responsible for user flow planning, wireframing, interface design, information architecture, prototyping, and creating the overall visual design system for the student portal.",
      gallery: ["/images/projects/fcet-cover.png"],
    },
  },
];

export function getProjectsByCategory(category: Category | "all"): Project[] {
  if (category === "all") return projects;
  return projects.filter((p) => p.category === category);
}
