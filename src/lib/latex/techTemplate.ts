import { escapeLatex } from "./helpers";
import { ResumeData } from "@/types/resume";

export function generateTechLatex(data: ResumeData): string {
  const { personalInfo, education, experience, projects, skills } = data;

  const linksLatex = personalInfo.links
    .filter((l) => l.url && l.label)
    .map((l) => `\\href{${l.url}}{\\underline{${escapeLatex(l.label)}}}`)
    .join(" $|$ ");

  const contactParts = [
    escapeLatex(personalInfo.phone),
    `\\href{mailto:${personalInfo.email}}{\\underline{${escapeLatex(personalInfo.email)}}}`,
    linksLatex,
  ]
    .filter(Boolean)
    .join(" $|$ ");

  const skillsLatex = skills
    .filter((s) => s.category && s.items)
    .map(
      (s) =>
        `    \\textbf{${escapeLatex(s.category)}}{: ${escapeLatex(s.items)}} \\\\`
    )
    .join("\n");

  const experienceLatex = experience
    .map((exp) => {
      const dateStr = exp.startDate + (exp.endDate ? ` -- ${exp.endDate}` : "");
      const bullets = exp.bullets
        .filter((b) => b.trim())
        .map((b) => `          \\resumeItem{${escapeLatex(b)}}`)
        .join("\n");
      return `    \\resumeSubheading
      {${escapeLatex(exp.title)}}{${escapeLatex(dateStr)}}
      {${escapeLatex(exp.company)}}{${escapeLatex(exp.location)}}
      \\resumeItemListStart
${bullets}
      \\resumeItemListEnd`;
    })
    .join("\n");

  const projectsLatex = projects
    .map((proj) => {
      const projLinks = proj.links
        .filter((l) => l.url && l.label)
        .map((l) => `\\href{${l.url}}{\\underline{${escapeLatex(l.label)}}}`)
        .join(" $|$ ");
      const linksPart = projLinks ? ` $|$ ${projLinks}` : "";
      const techStackLine = proj.techStack
        ? `          \\resumeItem{\\textbf{Tech Stack:} ${escapeLatex(proj.techStack)}}`
        : "";
      const bullets = proj.description
        .split("\n")
        .filter((line) => line.trim())
        .map((line) => {
          const trimmed = line.trim();
          const isSub = (trimmed.startsWith("–") || trimmed.startsWith("-")) && !trimmed.startsWith("•");
          let cleanLine = trimmed.replace(/^[•\-–]\s*/, "");
          const boldSegments: string[] = [];
          cleanLine = cleanLine.replace(/\*\*([^*]+)\*\*/g, (_, content) => {
            const ph = `BOLDPH${boldSegments.length}`;
            boldSegments.push(content);
            return ph;
          });
          let escaped = escapeLatex(cleanLine);
          boldSegments.forEach((content, idx) => {
            escaped = escaped.replace(`BOLDPH${idx}`, `\\textbf{${escapeLatex(content)}}`);
          });
          if (isSub) return `          \\resumeItem{\\hspace{1em}-- ${escaped}}`;
          return `          \\resumeItem{${escaped}}`;
        })
        .join("\n");
      const allItems = [techStackLine, bullets].filter(Boolean).join("\n");
      return `    \\resumeProjectHeading
      {\\textbf{${escapeLatex(proj.name)}}${linksPart}}{${escapeLatex(proj.year)}}
      \\resumeItemListStart
${allItems}
      \\resumeItemListEnd`;
    })
    .join("\n");

  const educationLatex = education
    .map(
      (edu) => `    \\resumeSubheading
      {${escapeLatex(edu.institution)}}{${escapeLatex(edu.year)}}
      {${escapeLatex(edu.degree)}}{${escapeLatex(edu.grade)}}`
    )
    .join("\n");

  return `\\documentclass[letterpaper,11pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\usepackage{multicol}
\\usepackage{graphicx}
\\usepackage[T1]{fontenc}
\\usepackage{lmodern}

%----------FONT OPTIONS----------
\\pagestyle{fancy}
\\fancyhf{} % clear all header and footer fields
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

% Adjust margins
\\addtolength{\\oddsidemargin}{-0.6in}
\\addtolength{\\evensidemargin}{-0.6in}
\\addtolength{\\textwidth}{1.2in}
\\addtolength{\\topmargin}{-.6in}
\\addtolength{\\textheight}{1.2in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Sections formatting
\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

% Ensure that generate pdf is machine readable/ATS parsable
\\pdfgentounicode=1

%-------------------------
% Custom commands
\\newcommand{\\resumeItem}[1]{
  \\item\\small{
    {#1 \\vspace{-2pt}}
  }
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubSubheading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\textit{\\small#1} & \\textit{\\small #2} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeProjectHeading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\small#1 & #2 \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}

\\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

%-------------------------------------------
%%%%%%  RESUME STARTS HERE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%

\\begin{document}

%----------HEADING----------
\\begin{center}
  {\\Huge \\scshape ${escapeLatex(personalInfo.name)}} \\\\ \\vspace{4pt}
  \\small ${contactParts}
\\end{center}

%-----------TECHNICAL SKILLS-----------
\\section{Technical Skills}
  \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
${skillsLatex}
    }}
  \\end{itemize}

%-----------EXPERIENCE-----------
\\section{Experience}
  \\resumeSubHeadingListStart
${experienceLatex}
  \\resumeSubHeadingListEnd

%-----------PROJECTS-----------
\\section{Projects}
  \\resumeSubHeadingListStart
${projectsLatex}
  \\resumeSubHeadingListEnd

%-----------EDUCATION-----------
\\section{Education}
  \\resumeSubHeadingListStart
${educationLatex}
  \\resumeSubHeadingListEnd

%-------------------------------------------
\\end{document}
`;
}
