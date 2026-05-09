"use client";

import { useResume } from "@/context/ResumeContext";

const inputClass = "w-full px-3 py-2 bg-gray-50/80 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder:text-gray-400 focus:bg-white focus:border-gray-300 focus:ring-2 focus:ring-gray-900/5 outline-none transition-all";
const labelClass = "block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5";

export default function PersonalInfoForm() {
  const { resumeData, dispatch } = useResume();
  const { personalInfo } = resumeData;

  return (
    <div className="space-y-3.5">
      <div>
        <label className={labelClass}>Full Name</label>
        <input
          type="text"
          value={personalInfo.name}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_PERSONAL_INFO",
              payload: { name: e.target.value },
            })
          }
          placeholder="John Doe"
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Phone</label>
          <input
            type="text"
            value={personalInfo.phone}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_PERSONAL_INFO",
                payload: { phone: e.target.value },
              })
            }
            placeholder="+91 98765 43210"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Email</label>
          <input
            type="email"
            value={personalInfo.email}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_PERSONAL_INFO",
                payload: { email: e.target.value },
              })
            }
            placeholder="john@example.com"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Links</label>
        <div className="space-y-2">
          {personalInfo.links.map((link, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={link.label}
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_PERSONAL_LINK",
                    index,
                    field: "label",
                    value: e.target.value,
                  })
                }
                placeholder="Label (e.g. LinkedIn)"
                className={"flex-1 px-3 py-2 bg-gray-50/80 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder:text-gray-400 focus:bg-white focus:border-gray-300 focus:ring-2 focus:ring-gray-900/5 outline-none transition-all"}
              />
              <input
                type="text"
                value={link.url}
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_PERSONAL_LINK",
                    index,
                    field: "url",
                    value: e.target.value,
                  })
                }
                placeholder="https://..."
                className={"flex-1 px-3 py-2 bg-gray-50/80 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder:text-gray-400 focus:bg-white focus:border-gray-300 focus:ring-2 focus:ring-gray-900/5 outline-none transition-all"}
              />
              <button
                type="button"
                onClick={() =>
                  dispatch({ type: "REMOVE_PERSONAL_LINK", index })
                }
                className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Remove link"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => dispatch({ type: "ADD_PERSONAL_LINK" })}
          className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 border border-dashed border-gray-300 hover:border-gray-400 rounded-lg transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Link
        </button>
      </div>
    </div>
  );
}
