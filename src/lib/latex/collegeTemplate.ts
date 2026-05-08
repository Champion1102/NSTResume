import { escapeLatex } from "./helpers";
import { ResumeData, CampusId } from "@/types/resume";

const CAMPUS_LOGO_FILES: Record<CampusId, string> = {
  "nst-ru": "newton-ru-logo.png",
  "nst-adypu": "nst-adypu.png",
};

export function generateCollegeLatex(data: ResumeData, campusId: CampusId = "nst-ru"): string {
  const { personalInfo, summary, education, experience, projects, skills, activities } = data;

  const linksLatex = personalInfo.links
    .filter((l) => l.url && l.label)
    .map((l) => `\\href{${l.url}}{${escapeLatex(l.label)}}`)
    .join(" $\\cdot$\n  ");

  const educationLatex = education
    .map(
      (edu) => `    \\resumeSubheading
      {${escapeLatex(edu.institution)}}{${escapeLatex(edu.year)}}
      {${escapeLatex(edu.degree)}}{${escapeLatex(edu.grade)}}`
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

  const skillsLatex = skills
    .filter((s) => s.category && s.items)
    .map(
      (s) =>
        `    \\textbf{${escapeLatex(s.category)}}{: ${escapeLatex(s.items)}} \\\\`
    )
    .join("\n");

  const activitiesLatex = activities
    .filter((a) => a.trim())
    .map((a) => `    \\resumeItem{${escapeLatex(a)}}`)
    .join("\n");

  return `\\documentclass[letterpaper,11pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage{xcolor}
\\usepackage{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\usepackage{multicol}
\\usepackage{graphicx}
\\usepackage[T1]{fontenc}
\\usepackage{lmodern}

\\definecolor{linkblue}{RGB}{0, 102, 204}

\\hypersetup{
    colorlinks=true,
    urlcolor=linkblue,
    linkcolor=linkblue
}

%----------FONT OPTIONS----------
\\pagestyle{fancy}
\\fancyhf{} % clear all header and footer fields
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

% Adjust margins
\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Sections formatting
\\titleformat{\\section}{
  \\vspace{-4pt}\\bfseries\\scshape\\raggedright\\large
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
\\begin{minipage}[c]{0.82\\textwidth}
  {\\Huge \\scshape ${escapeLatex(personalInfo.name)}}

  {\\small ${escapeLatex(personalInfo.phone)}}

  \\href{mailto:${personalInfo.email}}{${escapeLatex(personalInfo.email)}}

  ${linksLatex}
\\end{minipage}
\\hfill
\\begin{minipage}[c]{0.15\\textwidth}
  \\includegraphics[width=\\textwidth]{${CAMPUS_LOGO_FILES[campusId]}}
\\end{minipage}

%-----------PROFESSIONAL SUMMARY-----------
\\section{Professional Summary}
  ${escapeLatex(summary)}

%-----------EDUCATION-----------
\\section{Education}
  \\resumeSubHeadingListStart
${educationLatex}
  \\resumeSubHeadingListEnd

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

%-----------TECHNICAL SKILLS-----------
\\section{Technical Skills}
  \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
${skillsLatex}
    }}
  \\end{itemize}

%-----------EXTRA-CURRICULAR ACTIVITIES-----------
\\section{Extra-Curricular Activities}
  \\resumeItemListStart
${activitiesLatex}
  \\resumeItemListEnd

%-------------------------------------------
\\end{document}
`;
}
