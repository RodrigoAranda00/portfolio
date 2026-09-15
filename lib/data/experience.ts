import type { CoverImage } from "@/lib/data/projects";

export type ExperienceImage = CoverImage & {
  label?: string;
  objectPosition?: "top" | "center" | "bottom";
};

export interface ExperienceEntry {
  id: string;
  company: string;
  clientName?: string;
  startDate: string;
  endDate: string | "present";
  logo: ExperienceImage;
  images: ExperienceImage[];
  stack: string[];
}

export const experience: ExperienceEntry[] = [
  {
    id: "junior-fullstack",
    company: "Andine Soft",
    startDate: "2023-03",
    endDate: "2025-01",
    logo: { placeholder: false, src: "/experiences/andine_logo.png", alt: "Andine Soft logo" },
    images: [
      { placeholder: false, src: "/experiences/andine1.jpeg", alt: "Andine landing page", label: "Home" },
      { placeholder: false, src: "/experiences/andine2.jpeg", alt: "Andine invoice upload screen", label: "Invoices" },
      { placeholder: false, src: "/experiences/andine3.jpeg", alt: "Andine login screen", label: "Login" },
    ],
    stack: ["Django", "MySQL", "Python" , "JavaScript"],
  },
  {
    id: "fullstack-developer",
    company: "PSh",
    clientName: "Renaissance",
    startDate: "2025-02",
    endDate: "present",
    logo: { placeholder: false, src: "/experiences/psh_logo.png", alt: "PSh logo" },
    images: [
      { placeholder: false, src: "/experiences/flocabulary1.png", alt: "Flocabulary marketing homepage", objectPosition: "top" },
      { placeholder: false, src: "/experiences/flocabulary2.png", alt: "Flocabulary educator login" },
      { placeholder: false, src: "/experiences/flocabulary3.png", alt: "Flocabulary vocabulary lesson activity" },
    ],
    stack: ["Django", "React",  "Sass", "MySQL", "TypeScript"],
  },
];

export function getExperienceBySlug(slug: string) {
  return experience.find((role) => role.id === slug);
}
