"use client";

import { useState } from "react";
import { ResumeProvider } from "@/context/ResumeContext";
import Toolbar from "@/components/Toolbar";
import EditorPanel from "@/components/Editor/EditorPanel";
import PreviewPanel from "@/components/Preview/PreviewPanel";

export default function EditorPage() {
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

  return (
    <ResumeProvider>
      <div className="h-full flex flex-col">
        <Toolbar />
        <div className="lg:hidden flex border-b border-gray-100 bg-white">
          <button
            onClick={() => setActiveTab("edit")}
            className={`flex-1 py-2.5 text-sm font-medium text-center transition-colors ${
              activeTab === "edit"
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <span className="inline-flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Edit
            </span>
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={`flex-1 py-2.5 text-sm font-medium text-center transition-colors ${
              activeTab === "preview"
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <span className="inline-flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              Preview
            </span>
          </button>
        </div>
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          <div
            className={`lg:w-[42%] lg:block overflow-hidden ${
              activeTab === "edit" ? "flex-1" : "hidden"
            }`}
          >
            <EditorPanel />
          </div>
          <div className="hidden lg:block w-px bg-gray-100" />
          <div
            className={`lg:flex-1 lg:block overflow-hidden ${
              activeTab === "preview" ? "flex-1" : "hidden"
            }`}
          >
            <PreviewPanel />
          </div>
        </div>
      </div>
    </ResumeProvider>
  );
}
