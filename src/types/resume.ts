export interface PersonalInfo {
  name: string;
  phone: string;
  email: string;
  links: { label: string; url: string }[];
}

export interface Education {
  id: string;
  degree: string;
  year: string;
  institution: string;
  grade: string;
}

export interface Experience {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  company: string;
  location: string;
  bullets: string[];
}

export interface Project {
  id: string;
  name: string;
  links: { label: string; url: string }[];
  year: string;
  techStack: string;
  description: string;
}

export interface SkillCategory {
  id: string;
  category: string;
  items: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: SkillCategory[];
  activities: string[];
}

export type TemplateId = "college" | "tech";
export type CampusId = "nst-ru" | "nst-adypu";
