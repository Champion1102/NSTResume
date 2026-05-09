"use client";

import { useResume } from "@/context/ResumeContext";

const inputClass = "w-full px-3 py-2 bg-gray-50/80 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder:text-gray-400 focus:bg-white focus:border-gray-300 focus:ring-2 focus:ring-gray-900/5 outline-none transition-all";
const labelClass = "block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5";

function calculateDuration(start: string, end: string): string {
  if (!start || !end) return "";
  const parseDate = (s: string): Date | null => {
    const months: Record<string, number> = {
      jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
      jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
    };
    const parts = s.trim().toLowerCase().split(/\s+/);
    if (parts.length === 2) {
      const mon = months[parts[0].substring(0, 3)];
      const year = parseInt(parts[1]);
      if (mon !== undefined && !isNaN(year)) return new Date(year, mon);
    }
    return null;
  };
  const startDate = parseDate(start);
  const isPresent = end.toLowerCase().trim() === "present";
  const endDate = isPresent ? new Date() : parseDate(end);
  if (!startDate || !endDate) return "";
  let months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());
  if (months < 0) return "";
  if (months === 0) months = 1;
  if (months >= 12) {
    const years = Math.floor(months / 12);
    const rem = months % 12;
    return rem > 0 ? `${years} yr${years > 1 ? "s" : ""} ${rem} mo${rem > 1 ? "s" : ""}` : `${years} yr${years > 1 ? "s" : ""}`;
  }
  return `${months} mo${months > 1 ? "s" : ""}`;
}

export default function ExperienceForm() {
  const { resumeData, dispatch } = useResume();

  return (
    <div className="space-y-3">
      {resumeData.experience.map((exp, index) => (
        <div
          key={exp.id}
          className="relative border border-gray-100 rounded-xl p-4 space-y-3 bg-gray-50/30"
        >
          <div className="absolute top-3 right-3 flex items-center gap-0.5">
            <button
              type="button"
              onClick={() => dispatch({ type: "MOVE_EXPERIENCE", id: exp.id, direction: "up" })}
              disabled={index === 0}
              className="p-1 text-gray-300 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              title="Move up"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => dispatch({ type: "MOVE_EXPERIENCE", id: exp.id, direction: "down" })}
              disabled={index === resumeData.experience.length - 1}
              className="p-1 text-gray-300 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              title="Move down"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => dispatch({ type: "REMOVE_EXPERIENCE", id: exp.id })}
              className="p-1 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="Remove experience"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div>
            <label className={labelClass}>Job Title</label>
            <input
              type="text"
              value={exp.title}
              onChange={(e) =>
                dispatch({ type: "UPDATE_EXPERIENCE", id: exp.id, field: "title", value: e.target.value })
              }
              placeholder="Software Engineer"
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Company</label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) =>
                  dispatch({ type: "UPDATE_EXPERIENCE", id: exp.id, field: "company", value: e.target.value })
                }
                placeholder="Company Name"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Location</label>
              <input
                type="text"
                value={exp.location}
                onChange={(e) =>
                  dispatch({ type: "UPDATE_EXPERIENCE", id: exp.id, field: "location", value: e.target.value })
                }
                placeholder="San Francisco, CA"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Start Date</label>
                <input
                  type="text"
                  value={exp.startDate}
                  onChange={(e) =>
                    dispatch({ type: "UPDATE_EXPERIENCE", id: exp.id, field: "startDate", value: e.target.value })
                  }
                  placeholder="Feb 2025"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>End Date</label>
                <input
                  type="text"
                  value={exp.endDate}
                  onChange={(e) =>
                    dispatch({ type: "UPDATE_EXPERIENCE", id: exp.id, field: "endDate", value: e.target.value })
                  }
                  placeholder="Aug 2025 or Present"
                  className={inputClass}
                />
              </div>
            </div>
            {(() => {
              const duration = calculateDuration(exp.startDate, exp.endDate);
              return duration && (
                <span className="inline-flex items-center gap-1 mt-1 text-[11px] text-gray-400">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {duration}
                </span>
              );
            })()}
          </div>

          <div>
            <label className={labelClass}>Bullet Points</label>
            <div className="space-y-1.5">
              {exp.bullets.map((bullet, bulletIndex) => (
                <div key={bulletIndex} className="flex items-center gap-2">
                  <span className="text-gray-300 text-xs select-none w-4 text-center shrink-0">&bull;</span>
                  <input
                    type="text"
                    value={bullet}
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_EXPERIENCE_BULLET",
                        id: exp.id,
                        bulletIndex,
                        value: e.target.value,
                      })
                    }
                    placeholder="Describe your achievement or responsibility..."
                    className={"flex-1 px-3 py-1.5 bg-gray-50/80 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder:text-gray-400 focus:bg-white focus:border-gray-300 focus:ring-2 focus:ring-gray-900/5 outline-none transition-all"}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      dispatch({ type: "REMOVE_EXPERIENCE_BULLET", id: exp.id, bulletIndex })
                    }
                    className="p-1 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                    title="Remove bullet"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => dispatch({ type: "ADD_EXPERIENCE_BULLET", id: exp.id })}
              className="mt-1.5 inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Bullet
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => dispatch({ type: "ADD_EXPERIENCE" })}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 border border-dashed border-gray-300 hover:border-gray-400 rounded-lg transition-colors"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add Experience
      </button>
    </div>
  );
}
