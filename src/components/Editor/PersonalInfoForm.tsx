"use client";

import { useResume } from "@/context/ResumeContext";

export default function PersonalInfoForm() {
  const { resumeData, dispatch } = useResume();
  const { personalInfo } = resumeData;

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone
        </label>
        <input
          type="text"
          value={personalInfo.phone}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_PERSONAL_INFO",
              payload: { phone: e.target.value },
            })
          }
          placeholder="+1 (555) 123-4567"
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
      </div>

      {/* Links */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Links
        </label>
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
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
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
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              <button
                type="button"
                onClick={() =>
                  dispatch({ type: "REMOVE_PERSONAL_LINK", index })
                }
                className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                title="Remove link"
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
        </div>
        <button
          type="button"
          onClick={() => dispatch({ type: "ADD_PERSONAL_LINK" })}
          className="mt-2 inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
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
          Add Link
        </button>
      </div>
    </div>
  );
}
