export interface HobbyPhoto {
  id: string;
  photo: string;
  focus?: string;
}

export const hobbies: HobbyPhoto[] = [
  { id: "music", photo: "/beyond_work/music.webp" },
  { id: "lifting", photo: "/beyond_work/lifting.webp", focus: "50% 25%" },
  { id: "dnd", photo: "/beyond_work/dnd.webp", focus: "65% 45%" },
];
