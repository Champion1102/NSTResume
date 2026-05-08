"use client";

import { useResume } from "@/context/ResumeContext";

export default function EducationForm() {
  const { resumeData, dispatch } = useResume();

  return (
    <div className="space-y-4">
      {resumeData.education.map((edu) => (
        <div
          key={edu.id}
          className="relative border border-gray-200 rounded-lg p-4 space-y-3"
        >
          <button
            type="button"
            onClick={() => dispatch({ type: "REMOVE_EDUCATION", id: edu.id })}
            className="absolute top-2 right-2 p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
            title="Remove education"
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
              Degree
            </label>
            <input
              type="text"
              value={edu.degree}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_EDUCATION",
                  id: edu.id,
                  field: "degree",
                  value: e.target.value,
                })
              }
              placeholder="B.Tech in Computer Science"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Institution
              </label>
              <input
                type="text"
                value={edu.institution}
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_EDUCATION",
                    id: edu.id,
                    field: "institution",
                    value: e.target.value,
                  })
                }
                placeholder="University Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year
              </label>
              <input
                type="text"
                value={edu.year}
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_EDUCATION",
                    id: edu.id,
                    field: "year",
                    value: e.target.value,
                  })
                }
                placeholder="2020 - 2024"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Grade / GPA
            </label>
            <input
              type="text"
              value={edu.grade}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_EDUCATION",
                  id: edu.id,
                  field: "grade",
                  value: e.target.value,
                })
              }
              placeholder="3.8 / 4.0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => dispatch({ type: "ADD_EDUCATION" })}
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
        Add Education
      </button>
    </div>
  );
}
