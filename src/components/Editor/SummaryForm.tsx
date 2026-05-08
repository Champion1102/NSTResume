"use client";

import { useResume } from "@/context/ResumeContext";

export default function SummaryForm() {
  const { resumeData, dispatch } = useResume();

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Professional Summary
      </label>
      <textarea
        value={resumeData.summary}
        onChange={(e) =>
          dispatch({ type: "UPDATE_SUMMARY", payload: e.target.value })
        }
        placeholder="A brief summary of your professional background and goals..."
        rows={4}
        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-y"
      />
    </div>
  );
}
