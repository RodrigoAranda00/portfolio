export interface Profile {
  name: string;
  title: string;
  yearsExperience: number;
  initials: string;
  photo: string;
  email: string;
  github: string;
  linkedin: string;
  resumeHref: string;
}

export const profile: Profile = {
  name: "Rodrigo Aranda",
  title: "Full-Stack Developer",
  yearsExperience: 4,
  initials: "RA",
  photo: "/me.webp",
  email: "rodrigoaranda00@gmail.com",
  github: "https://github.com/your-username",
  linkedin: "https://linkedin.com/in/your-handle",
  resumeHref: "/resume/Rodrigo-Aranda-Resume.pdf",
};
