export interface Profile {
  name: string;
  title: string;
  yearsExperience: number;
  initials: string;
  photo: string;
  email: string;
  github: string;
  linkedin: string;
  resumeHrefByLocale: Record<"en" | "es", string>;
}

export const profile: Profile = {
  name: "Rodrigo Aranda",
  title: "Full-Stack Developer",
  yearsExperience: 4,
  initials: "RA",
  photo: "/me.webp",
  email: "rodrigoaranda00@gmail.com",
  github: "https://github.com/RodrigoAranda00",
  linkedin: "https://www.linkedin.com/in/rodrigo-aranda-b291a32b9",
  resumeHrefByLocale: {
    en: "/resume/Rodrigo-Aranda-Resume.pdf",
    es: "/resume/Rodrigo-Aranda-CV.pdf",
  },
};
