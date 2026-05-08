"use client";

import React, { useState } from "react";
import { useResume } from "@/context/ResumeContext";
import { compileLatexPdf } from "@/lib/pdf/compileLatexPdf";
import { generatePdf } from "@/lib/pdf/generatePdf";
import type { TemplateId, CampusId } from "@/types/resume";

export default function Toolbar() {
  const { resumeData, templateId, campusId, dispatch } = useResume();
  const [isQuickPdf, setIsQuickPdf] = useState(false);
  const [isLatexPdf, setIsLatexPdf] = useState(false);

  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: "SET_TEMPLATE", templateId: e.target.value as TemplateId });
  };

  const handleCampusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: "SET_CAMPUS", campusId: e.target.value as CampusId });
  };

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleQuickPdf = async () => {
    const element = document.getElementById("resume-preview");
    if (!element) return;

    setIsQuickPdf(true);
    const originalTransform = element.style.transform;
    element.style.transform = "none";

    try {
      await generatePdf(element, `${resumeData.personalInfo.name || "resume"}.pdf`);
    } finally {
      element.style.transform = originalTransform;
      setIsQuickPdf(false);
    }
  };

  const handleLatexPdf = async () => {
    setIsLatexPdf(true);
    const filename = `${resumeData.personalInfo.name || "resume"}.pdf`;

    try {
      const pdfBlob = await compileLatexPdf(resumeData, templateId, campusId);
      downloadBlob(pdfBlob, filename);
    } catch (err) {
      console.error("LaTeX PDF compilation failed:", err);
      alert("LaTeX PDF compilation failed. Try Quick PDF instead.");
    } finally {
      setIsLatexPdf(false);
    }
  };

  const handleDownloadLatex = async () => {
    let latexString: string;

    if (templateId === "tech") {
      const { generateTechLatex } = await import("@/lib/latex/techTemplate");
      latexString = generateTechLatex(resumeData);
    } else {
      const { generateCollegeLatex } = await import("@/lib/latex/collegeTemplate");
      latexString = generateCollegeLatex(resumeData, campusId);
    }

    const blob = new Blob([latexString], { type: "application/x-tex" });
    downloadBlob(blob, `${resumeData.personalInfo.name || "resume"}.tex`);
  };

  return (
    <div className="bg-white border-b px-6 py-3 flex items-center justify-between">
      <div className="font-bold text-lg">NSTResume</div>

      <div className="flex items-center gap-2">
        <select
          value={templateId}
          onChange={handleTemplateChange}
          className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="college">College Standard</option>
          <option value="tech">Tech Professional</option>
        </select>
        {templateId === "college" && (
          <select
            value={campusId}
            onChange={handleCampusChange}
            className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="nst-ru">NST RU</option>
            <option value="nst-adypu">NST ADYPU</option>
          </select>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleQuickPdf}
          disabled={isQuickPdf}
          className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isQuickPdf ? "Generating..." : "Quick PDF"}
        </button>
        <button
          onClick={handleLatexPdf}
          disabled={isLatexPdf}
          className="bg-green-600 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLatexPdf ? "Compiling..." : "LaTeX PDF"}
        </button>
        <button
          onClick={handleDownloadLatex}
          className="border border-gray-400 text-gray-600 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-gray-50"
        >
          .tex
        </button>
      </div>
    </div>
  );
}
