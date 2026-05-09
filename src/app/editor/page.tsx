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
        <div className="lg:hidden flex border-b border-gray-200 bg-white">
          <button
            onClick={() => setActiveTab("edit")}
            className={`flex-1 py-2.5 text-sm font-medium text-center transition-colors ${
              activeTab === "edit"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Edit
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={`flex-1 py-2.5 text-sm font-medium text-center transition-colors ${
              activeTab === "preview"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Preview
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
          <div className="hidden lg:block w-px bg-gray-200" />
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
