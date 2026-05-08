import { ResumeData } from "@/types/resume";

export const defaultResume: ResumeData = {
  personalInfo: {
    name: "John Doe",
    phone: "+91 0000000000",
    email: "johndoe@email.com",
    links: [
      { label: "LinkedIn", url: "https://linkedin.com/" },
      { label: "Github", url: "https://github.com/" },
      { label: "HackerRank", url: "https://hackerrank.com/" },
      { label: "Leetcode", url: "https://leetcode.com/" },
    ],
  },
  summary:
    "Passionate computer science student exploring full-stack development, AI, and software quality assurance. Focused on building reliable and scalable systems.",
  education: [
    {
      id: "edu-1",
      degree: "Bachelor of Technology (Artificial Intelligence)",
      year: "2023 -- 2027",
      institution: "Dummy University",
      grade: "8.5/10.0",
    },
    {
      id: "edu-2",
      degree: "Intermediate (Class XII)",
      year: "2021 -- 2022",
      institution: "Dummy School",
      grade: "83.5%",
    },
    {
      id: "edu-3",
      degree: "Matriculation (Class X)",
      year: "2019 -- 2020",
      institution: "Dummy School",
      grade: "87.8%",
    },
  ],
  experience: [
    {
      id: "exp-1",
      title: "Software Developer Intern",
      startDate: "Feb 2025",
      endDate: "Aug 2025",
      company: "Dummy Company",
      location: "Dummy Location",
      bullets: [
        "Built and deployed a full-stack AI-powered platform using MERN and Python.",
        "Resolved production issues and improved service reliability.",
        "Containerized services and automated workflows.",
        "Collaborated with stakeholders to refine product requirements.",
      ],
    },
  ],
  projects: [
    {
      id: "proj-1",
      name: "Project Alpha",
      links: [
        { label: "Github", url: "" },
        { label: "Demo", url: "" },
      ],
      year: "2026",
      techStack: "React, Node.js, Express, MongoDB",
      description: "• Implemented multiple scheduling algorithms with advanced features.\n• Built visualization for system metrics and performance.",
    },
    {
      id: "proj-2",
      name: "Project Beta",
      links: [
        { label: "Github", url: "" },
        { label: "Demo", url: "" },
      ],
      year: "2024",
      techStack: "React, TypeScript, APIs",
      description: "• Developed a full-stack application aggregating external data sources.\n• Implemented automation, notifications, and responsive UI.",
    },
    {
      id: "proj-3",
      name: "Project Gamma",
      links: [
        { label: "Github", url: "" },
        { label: "Demo", url: "" },
      ],
      year: "2024",
      techStack: "Node.js, Express, MongoDB",
      description: "• Designed scalable backend with authentication and role-based access.",
    },
  ],
  skills: [
    { id: "skill-1", category: "Languages", items: "Python, JavaScript, TypeScript, C++, SQL" },
    { id: "skill-2", category: "Frameworks", items: "MERN, Flask" },
    { id: "skill-3", category: "Tools", items: "Docker, Git, APIs, Testing" },
    { id: "skill-4", category: "Concepts", items: "Data Structures, System Design" },
  ],
  activities: [
    "Mentored students in academic subjects.",
    "Organized technical and cultural events.",
    "Led student initiatives and workshops.",
    "Held leadership roles in student organizations.",
  ],
};
