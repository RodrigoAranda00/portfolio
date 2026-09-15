export interface EducationEntry {
  id: string;
  institution: string;
  year: string;
  kind: "degree" | "certificate" | "in-progress";
}

export const education: EducationEntry[] = [
  {
    id: "teaching-degree",
    institution: "Universidad Autónoma de Entre Ríos",
    year: "2023",
    kind: "degree",
  },
  {
    id: "digital-courses",
    institution: "Platzi, Udemy, LinkedIn Learning",
    year: "10+ Courses",
    kind: "certificate",
  },
  {
    id: "aws-saa",
    institution: "Amazon Web Services",
    year: "2026",
    kind: "in-progress",
  },
];
