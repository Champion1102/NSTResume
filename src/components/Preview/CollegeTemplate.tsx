"use client";

import React from "react";
import { ResumeData, CampusId } from "@/types/resume";

const CAMPUS_LOGOS: Record<CampusId, string> = {
  "nst-ru": "/newton-ru-logo.png",
  "nst-adypu": "/nst-adypu.png",
};

interface CollegeTemplateProps {
  data: ResumeData;
  campusId: CampusId;
}

export default function CollegeTemplate({ data, campusId }: CollegeTemplateProps) {
  const { personalInfo, summary, education, experience, projects, skills, activities } = data;

  return (
    <div className="resume-page resume-college">
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <div style={{ width: "72%" }}>
          <div
            style={{
              fontSize: "22pt",
              fontWeight: 700,
              fontVariant: "small-caps",
              lineHeight: 1.1,
              marginBottom: 4,
            }}
          >
            {personalInfo.name || "Your Name"}
          </div>
          {personalInfo.phone && (
            <div style={{ fontSize: "10pt" }}>{personalInfo.phone}</div>
          )}
          {personalInfo.email && (
            <div style={{ fontSize: "10pt" }}>{personalInfo.email}</div>
          )}
          {personalInfo.links.length > 0 && (
            <div style={{ fontSize: "10pt", marginTop: 2 }}>
              {personalInfo.links
                .filter((l) => l.label || l.url)
                .map((link, i, arr) => (
                  <React.Fragment key={i}>
                    <a
                      href={link.url}
                      className="resume-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label || link.url}
                    </a>
                    {i < arr.length - 1 && " • "}
                  </React.Fragment>
                ))}
            </div>
          )}
        </div>
        <div style={{ width: "28%", textAlign: "right" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={CAMPUS_LOGOS[campusId]}
            alt="University Logo"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      </div>

      {/* Professional Summary */}
      {summary && (
        <>
          <div className="resume-section-title">Professional Summary</div>
          <p style={{ fontSize: "10pt", margin: "2px 0 4px 0", lineHeight: 1.3 }}>
            {summary}
          </p>
        </>
      )}

      {/* Education */}
      {education.length > 0 && (
        <>
          <div className="resume-section-title">Education</div>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: 4 }}>
              <div className="resume-entry">
                <span className="resume-entry-main">{edu.degree}</span>
                <span className="resume-entry-right">{edu.year}</span>
              </div>
              <div className="resume-entry">
                <span className="resume-entry-sub">{edu.institution}</span>
                <span className="resume-entry-right">{edu.grade}</span>
              </div>
            </div>
          ))}
        </>
      )}

      {/* Internships */}
      {experience.length > 0 && (
        <>
          <div className="resume-section-title">Experience</div>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: 4 }}>
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
            <div key={proj.id} style={{ marginBottom: 4 }}>
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

      {/* Skills */}
      {skills.length > 0 && (
        <>
          <div className="resume-section-title">Skills</div>
          <div style={{ margin: "2px 0 4px 0" }}>
            {skills.map((skill) => (
              <div key={skill.id} className="resume-skills-item">
                <strong>{skill.category}:</strong> {skill.items}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Extra-Curricular Activities */}
      {activities.length > 0 && activities.some((a) => a.trim()) && (
        <>
          <div className="resume-section-title">Extra-Curricular Activities</div>
          <ul className="resume-bullets">
            {activities
              .filter((a) => a.trim())
              .map((activity, i) => (
                <li key={i}>{activity}</li>
              ))}
          </ul>
        </>
      )}
    </div>
  );
}
