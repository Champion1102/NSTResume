"use client";

import React from "react";
import { ResumeData } from "@/types/resume";

interface TechTemplateProps {
  data: ResumeData;
}

export default function TechTemplate({ data }: TechTemplateProps) {
  const { personalInfo, education, experience, projects, skills } = data;

  const contactParts: React.ReactNode[] = [];

  if (personalInfo.phone) {
    contactParts.push(personalInfo.phone);
  }
  if (personalInfo.email) {
    contactParts.push(personalInfo.email);
  }
  personalInfo.links
    .filter((l) => l.label || l.url)
    .forEach((link) => {
      contactParts.push(
        <a
          key={link.url}
          href={link.url}
          className="resume-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.label || link.url}
        </a>
      );
    });

  return (
    <div className="resume-page resume-tech">
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <div
          style={{
            fontSize: "20pt",
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: 4,
          }}
        >
          {personalInfo.name || "Your Name"}
        </div>
        {contactParts.length > 0 && (
          <div style={{ fontSize: "10pt" }}>
            {contactParts.map((part, i) => (
              <React.Fragment key={i}>
                {part}
                {i < contactParts.length - 1 && " | "}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* Technical Skills */}
      {skills.length > 0 && (
        <>
          <div className="resume-section-title">Technical Skills</div>
          <div style={{ margin: "2px 0 4px 0" }}>
            {skills.map((skill) => (
              <div key={skill.id} className="resume-skills-item">
                <strong>{skill.category}:</strong> {skill.items}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <>
          <div className="resume-section-title">Experience</div>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: 3 }}>
              <div className="resume-entry">
                <span className="resume-entry-main">{exp.title}</span>
                <span className="resume-entry-right">{exp.startDate}{exp.endDate ? ` - ${exp.endDate}` : ""}</span>
              </div>
              <div className="resume-entry">
                <span className="resume-entry-sub">{exp.company}</span>
                <span className="resume-entry-right">{exp.location}</span>
              </div>
              {exp.bullets.length > 0 && (
                <ul className="resume-bullets">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <>
          <div className="resume-section-title">Projects</div>
          {projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: 3 }}>
              <div className="resume-entry">
                <span className="resume-entry-main">
                  {proj.name}
                  {proj.links.filter((l) => l.label || l.url).length > 0 && (
                    <>
                      {" | "}
                      {proj.links
                        .filter((l) => l.label || l.url)
                        .map((link, i, arr) => (
                          <React.Fragment key={i}>
                            <a
                              href={link.url}
                              className="resume-link"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ fontWeight: 400 }}
                            >
                              {link.label || link.url}
                            </a>
                            {i < arr.length - 1 && " | "}
                          </React.Fragment>
                        ))}
                    </>
                  )}
                </span>
                <span className="resume-entry-right">{proj.year}</span>
              </div>
              {proj.techStack && (
                <div style={{ fontSize: "10pt", marginTop: 2 }}>
                  <strong>Tech Stack:</strong> {proj.techStack}
                </div>
              )}
              {proj.description && (
                <ul className="resume-bullets">
                  {proj.description.split("\n").filter(line => line.trim()).map((line, i) => {
                    const trimmed = line.trim();
                    const isSub = (trimmed.startsWith("–") || trimmed.startsWith("-")) && !trimmed.startsWith("•");
                    const cleanLine = trimmed.replace(/^[•\-–]\s*/, "");
                    const parts = cleanLine.split(/(\*\*[^*]+\*\*)/g);
                    return (
                      <li key={i} style={isSub ? { marginLeft: "1.5em", listStyleType: "'– '" } : undefined}>
                        {parts.map((part, j) =>
                          part.startsWith("**") && part.endsWith("**") ? (
                            <strong key={j}>{part.slice(2, -2)}</strong>
                          ) : (
                            <span key={j}>{part}</span>
                          )
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          ))}
        </>
      )}

      {/* Education */}
      {education.length > 0 && (
        <>
          <div className="resume-section-title">Education</div>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: 2 }}>
              <div className="resume-entry">
                <span className="resume-entry-main">
                  {edu.degree}
                  {edu.institution && (
                    <span style={{ fontWeight: 400, fontStyle: "italic" }}>
                      {" — "}
                      {edu.institution}
                    </span>
                  )}
                </span>
                <span className="resume-entry-right">
                  {edu.year}
                  {edu.grade && ` | ${edu.grade}`}
                </span>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
