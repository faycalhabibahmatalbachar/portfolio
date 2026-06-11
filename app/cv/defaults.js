import { personalData } from "@/utils/data/personal-data";
import { experiences } from "@/utils/data/experience";
import { educations } from "@/utils/data/educations";
import { skillsData } from "@/utils/data/skills";
import { projectsData } from "@/utils/data/projects-data";

const uid = () => Math.random().toString(36).slice(2, 9);

// "(2024 - Present)" → { start: "2024", end: "Present" }
const parseDuration = (duration) => {
  const clean = (duration || "").replace(/[()]/g, "").trim();
  const [start = "", end = ""] = clean.split(/\s*[-–]\s*/);
  return { start, end };
};

const CORE_SKILLS = ["Javascript", "Typescript", "Python", "React", "Next JS", "Node JS", "Flutter"];

const ACHIEVEMENTS = {
  ChadGPT: [
    "Fondé et dirigé ChadGPT, plateforme d'IA pour l'Afrique francophone",
    "Conçu l'architecture complète (Next.js, TypeScript, OpenAI API)",
    "Lancé des outils IA de génération de texte et d'automatisation adaptés au contexte africain",
  ],
  "235SMS": [
    "Co-fondé la plateforme SMS & communication pour les entreprises du Tchad (+235)",
    "Développé l'API SMS en masse, l'authentification OTP et les webhooks",
    "Mis en production sur Cloudflare Pages avec une API orientée développeurs",
  ],
  "NadirX Technology": [
    "Développé des applications web et mobiles complètes pour des clients",
    "Livré les plateformes Canal+ Tchad : web admin, dashboard, bot WhatsApp",
  ],
  "Independent — Web, Mobile & AI Projects": [
    "Réalisé des projets web, mobile et IA pour divers clients",
    "Formateur IT : programmation, développement web et mobile",
  ],
};

export const defaultSections = [
  { key: "summary", visible: true },
  { key: "experience", visible: true },
  { key: "education", visible: true },
  { key: "skills", visible: true },
  { key: "projects", visible: true },
  { key: "languages", visible: true },
  { key: "certifications", visible: false },
];

export const defaultDesign = {
  template: "modern",
  accent: "#0891b2",
  font: "Inter",
  sizeScale: 1,
  density: "normal",
  paper: "A4",
  showPhoto: true,
  photoShape: "circle",
  showSkillLevels: true,
  showQR: true,
  qrUrl: "https://faycalhabibahmat.is-a.dev/",
};

export const blankCV = () => ({
  profile: {
    fullName: "",
    title: "",
    email: "",
    phone: "",
    address: "",
    website: "",
    github: "",
    linkedin: "",
    photo: "",
    summary: "",
  },
  experience: [],
  education: [],
  skills: [],
  languages: [],
  projects: [],
  certifications: [],
});

export const faycalPreset = () => ({
  profile: {
    fullName: personalData.name,
    title: personalData.designation,
    email: personalData.email,
    phone: personalData.phone,
    address: personalData.address,
    website: "https://faycalhabibahmat.is-a.dev",
    github: personalData.github,
    linkedin: personalData.linkedIn,
    photo: personalData.profile || "",
    summary:
      "Ingénieur Full-Stack et entrepreneur tech basé au Tchad. CEO & fondateur de ChadGPT — l'IA pour l'Afrique francophone — et co-fondateur de 235SMS. Je conçois des applications web et mobiles scalables, des outils propulsés par l'IA et des systèmes d'automatisation pour résoudre des problèmes concrets en Afrique et au-delà.",
  },
  experience: experiences.map((exp) => {
    const { start, end } = parseDuration(exp.duration);
    return {
      id: uid(),
      role: exp.title,
      company: exp.company,
      location: "N'Djamena, Tchad",
      start,
      end,
      description: "",
      achievements: (ACHIEVEMENTS[exp.company] || []).join("\n"),
    };
  }),
  education: educations.map((edu) => {
    const { start, end } = parseDuration(edu.duration);
    return {
      id: uid(),
      degree: edu.title,
      school: edu.institution,
      start,
      end,
      description: "",
    };
  }),
  skills: skillsData.map((name) => ({
    id: uid(),
    name,
    level: CORE_SKILLS.includes(name) ? 5 : 4,
  })),
  languages: [
    { id: uid(), name: "Français", level: "Courant" },
    { id: uid(), name: "Arabe", level: "Courant" },
    { id: uid(), name: "Anglais", level: "Professionnel" },
  ],
  projects: projectsData.slice(0, 6).map((p) => ({
    id: uid(),
    name: p.name,
    description: p.description,
    tools: (p.tools || []).join(", "),
    link: p.demo || "",
  })),
  certifications: [],
});
