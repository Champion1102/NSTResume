"use client";

import { useResume } from "@/context/ResumeContext";

export default function SkillsForm() {
  const { resumeData, dispatch } = useResume();

  return (
    <div className="space-y-4">
      {resumeData.skills.map((skill) => (
        <div
          key={skill.id}
          className="relative border border-gray-200 rounded-lg p-4 space-y-3"
        >
          <button
            type="button"
            onClick={() => dispatch({ type: "REMOVE_SKILL", id: skill.id })}
            className="absolute top-2 right-2 p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
            title="Remove skill category"
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <input
              type="text"
              value={skill.category}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_SKILL",
                  id: skill.id,
                  field: "category",
                  value: e.target.value,
                })
              }
              placeholder="e.g. Programming Languages"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Items (comma-separated)
            </label>
            <input
              type="text"
              value={skill.items}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_SKILL",
                  id: skill.id,
                  field: "items",
                  value: e.target.value,
                })
              }
              placeholder="JavaScript, TypeScript, Python, Go"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => dispatch({ type: "ADD_SKILL" })}
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
        Add Skill Category
      </button>
    </div>
  );
}
