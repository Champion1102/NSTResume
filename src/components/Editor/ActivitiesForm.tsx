"use client";

import { useResume } from "@/context/ResumeContext";

export default function ActivitiesForm() {
  const { resumeData, dispatch } = useResume();

  return (
    <div className="space-y-1.5">
      {resumeData.activities.map((activity, index) => (
        <div key={index} className="flex items-center gap-2">
          <span className="text-gray-300 text-xs select-none w-4 text-center shrink-0">&bull;</span>
          <input
            type="text"
            value={activity}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_ACTIVITY",
                index,
                value: e.target.value,
              })
            }
            placeholder="Describe an activity, achievement, or involvement..."
            className="flex-1 px-3 py-1.5 bg-gray-50/80 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder:text-gray-400 focus:bg-white focus:border-gray-300 focus:ring-2 focus:ring-gray-900/5 outline-none transition-all"
          />
          <button
            type="button"
            onClick={() => dispatch({ type: "REMOVE_ACTIVITY", index })}
            className="p-1 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0"
            title="Remove activity"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => dispatch({ type: "ADD_ACTIVITY" })}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 border border-dashed border-gray-300 hover:border-gray-400 rounded-lg transition-colors"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add Activity
      </button>
    </div>
  );
}
