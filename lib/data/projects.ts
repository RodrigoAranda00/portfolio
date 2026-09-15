export type ProjectSlug =
  | "trello-clone"
  | "cloud-demo"
  | "adhd-todo-list";

export type CoverImage =
  | { placeholder: true; initials?: string }
  | { placeholder: false; src: string; alt?: string };

export interface Project {
  slug: ProjectSlug;
  year: string;
  role: string;
  stack: string[];
  coverImage: CoverImage;
  links: { repo?: string; live?: string };
  hasLiveDemo: boolean;
  featured: boolean;
}

export const projects: Project[] = [
  {
    slug: "trello-clone",
    year: "2026",
    role: "Full-Stack Developer",
    stack: ["Next.js", "Tailwind CSS", "Supabase", "Prisma", "Clerk"],
    coverImage: {
      placeholder: false,
      src: "/projects/trolley_cover.png",
      alt: "Screenshot of the Trello clone app",
    },
    links: {
      repo: "https://github.com/RodrigoAranda00/trolley.git",
      live: "https://your-username-trolley.vercel.app",
    },
    hasLiveDemo: true,
    featured: true,
  },
  {
    slug: "cloud-demo",
    year: "2026",
    role: "Full-Stack Developer",
    stack: ["Next.js", "TypeScript", "PostgreSQL"],
    coverImage: { placeholder: true, initials: "TM" },
    links: {
      repo: "https://github.com/your-username/task-manager",
      live: "https://your-username-cloud-demo.vercel.app",
    },
    hasLiveDemo: true,
    featured: false,
  },
  {
    slug: "adhd-todo-list",
    year: "2025",
    role: "Full-Stack Developer",
    stack: ["React Native", "Expo", "TypeScript", "Zod"],
    coverImage: {
      placeholder: false,
      src: "/projects/doneish_cover.png",
      alt: "Screenshot of the Done-ish task manager",
    },
    links: {
      repo: "https://github.com/your-username/analytics-dashboard",
    },
    hasLiveDemo: false,
    featured: true,
  },
];
