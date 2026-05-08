"use client";

import { useResume } from "@/context/ResumeContext";

export default function ActivitiesForm() {
  const { resumeData, dispatch } = useResume();

  return (
    <div className="space-y-3">
      {resumeData.activities.map((activity, index) => (
        <div key={index} className="flex items-start gap-2">
          <span className="mt-2.5 text-gray-400 text-sm select-none">
            &bull;
          </span>
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
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
          <button
            type="button"
            onClick={() => dispatch({ type: "REMOVE_ACTIVITY", index })}
            className="mt-1 p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
            title="Remove activity"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => dispatch({ type: "ADD_ACTIVITY" })}
        className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        Add Activity
      </button>
    </div>
  );
}
