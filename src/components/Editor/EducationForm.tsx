"use client";

import { useResume } from "@/context/ResumeContext";

const inputClass = "w-full px-3 py-2 bg-gray-50/80 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder:text-gray-400 focus:bg-white focus:border-gray-300 focus:ring-2 focus:ring-gray-900/5 outline-none transition-all";
const labelClass = "block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5";

export default function EducationForm() {
  const { resumeData, dispatch } = useResume();

  return (
    <div className="space-y-3">
      {resumeData.education.map((edu) => (
        <div
          key={edu.id}
          className="relative border border-gray-100 rounded-xl p-4 space-y-3 bg-gray-50/30"
        >
          <button
            type="button"
            onClick={() => dispatch({ type: "REMOVE_EDUCATION", id: edu.id })}
            className="absolute top-3 right-3 p-1 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title="Remove education"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div>
            <label className={labelClass}>Degree</label>
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
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Institution</label>
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
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Year</label>
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
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Grade / GPA</label>
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
              placeholder="8.84 / 10.0"
              className={inputClass}
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => dispatch({ type: "ADD_EDUCATION" })}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 border border-dashed border-gray-300 hover:border-gray-400 rounded-lg transition-colors"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add Education
      </button>
    </div>
  );
}
