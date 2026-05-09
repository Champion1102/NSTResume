"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useResume } from "@/context/ResumeContext";
import { compileLatexPdf } from "@/lib/pdf/compileLatexPdf";
import { generatePdf } from "@/lib/pdf/generatePdf";
import type { TemplateId, CampusId } from "@/types/resume";

export default function Toolbar() {
  const { resumeData, templateId, campusId, dispatch } = useResume();
  const [isQuickPdf, setIsQuickPdf] = useState(false);
  const [isLatexPdf, setIsLatexPdf] = useState(false);
  const [showClearDialog, setShowClearDialog] = useState(false);

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

  const handleClearDraft = () => {
    dispatch({ type: "CLEAR_DRAFT" });
    setShowClearDialog(false);
  };

  return (
    <div className="bg-white border-b border-gray-100 px-5 py-2.5 flex items-center justify-between shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <Link href="/" className="flex items-center gap-2 text-gray-900 hover:text-gray-700 transition-colors">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="8" y1="13" x2="16" y2="13" />
          <line x1="8" y1="17" x2="16" y2="17" />
          <line x1="8" y1="9" x2="12" y2="9" />
        </svg>
        <span className="font-semibold text-[15px] tracking-tight">NSTResume</span>
      </Link>

      <div className="flex items-center gap-2">
        <select
          value={templateId}
          onChange={handleTemplateChange}
          className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-colors"
        >
          <option value="college">College Standard</option>
          <option value="tech">Tech Professional</option>
        </select>
        {templateId === "college" && (
          <select
            value={campusId}
            onChange={handleCampusChange}
            className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-colors"
          >
            <option value="nst-ru">NST RU</option>
            <option value="nst-adypu">NST ADYPU</option>
          </select>
        )}
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={handleQuickPdf}
          disabled={isQuickPdf}
          className="inline-flex items-center gap-1.5 bg-gray-900 text-white pl-3 pr-3.5 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
            <polyline points="13 2 13 9 20 9" />
          </svg>
          {isQuickPdf ? "Generating..." : "Quick PDF"}
        </button>
        <button
          onClick={handleLatexPdf}
          disabled={isLatexPdf}
          className="inline-flex items-center gap-1.5 bg-emerald-600 text-white pl-3 pr-3.5 py-1.5 rounded-lg text-sm font-medium hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
          {isLatexPdf ? "Compiling..." : "LaTeX PDF"}
        </button>
        <button
          onClick={handleDownloadLatex}
          className="inline-flex items-center gap-1.5 border border-gray-200 bg-white text-gray-600 pl-2.5 pr-3 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-50 hover:text-gray-800 hover:border-gray-300 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          .tex
        </button>
        <div className="w-px h-5 bg-gray-200 mx-0.5" />
        <button
          onClick={() => setShowClearDialog(true)}
          className="inline-flex items-center gap-1.5 border border-gray-200 bg-white text-gray-400 pl-2.5 pr-3 py-1.5 rounded-lg text-sm font-medium hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors"
          title="Clear draft and reset to defaults"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
          Clear
        </button>
      </div>

      {showClearDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowClearDialog(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-50 mx-auto mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 text-center mb-1.5">Clear Draft?</h3>
            <p className="text-sm text-gray-500 text-center mb-6">
              This will reset all resume data to defaults. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowClearDialog(false)}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleClearDraft}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-xl transition-colors"
              >
                Clear Draft
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
