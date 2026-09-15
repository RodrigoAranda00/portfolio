export interface SkillCategory {
  id: string;
  skills: string[];
}

export const skills: string[] = [
  "Django",
  "Next.js",
  "React",
  "Python",
  "TypeScript",
  "MySQL",
  "Tailwind CSS",
  "Sass",
  "PostgreSQL",
  "REST APIs",
];

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    skills: ["Python", "JavaScript", "TypeScript"],
  },
  {
    id: "frameworksLibraries",
    skills: [
      "Django",
      "React",
      "Next.js",
      "React Native",
      "Tailwind CSS",
      "Bootstrap",
      "Sass",
      "Shadcn",
    ],
  },
  {
    id: "databases",
    skills: ["MySQL", "PostgreSQL"],
  },
  {
    id: "toolsPractices",
    skills: ["Git", "Postman", "Linux", "REST APIs", "A11y Screen Readers"],
  },
];
