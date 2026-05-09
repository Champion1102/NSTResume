"use client";

import { useResume } from "@/context/ResumeContext";

export default function SummaryForm() {
  const { resumeData, dispatch } = useResume();

  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">
        Professional Summary
      </label>
      <textarea
        value={resumeData.summary}
        onChange={(e) =>
          dispatch({ type: "UPDATE_SUMMARY", payload: e.target.value })
        }
        placeholder="A brief summary of your professional background and goals..."
        rows={4}
        className="w-full px-3 py-2 bg-gray-50/80 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder:text-gray-400 focus:bg-white focus:border-gray-300 focus:ring-2 focus:ring-gray-900/5 outline-none transition-all resize-y"
      />
    </div>
  );
}
