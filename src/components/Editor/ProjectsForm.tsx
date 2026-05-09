"use client";

import { useRef } from "react";
import { useResume } from "@/context/ResumeContext";

const inputClass = "w-full px-3 py-2 bg-gray-50/80 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder:text-gray-400 focus:bg-white focus:border-gray-300 focus:ring-2 focus:ring-gray-900/5 outline-none transition-all";
const labelClass = "block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5";

function insertAtCursor(
  textarea: HTMLTextAreaElement,
  before: string,
  after: string,
  dispatch: (value: string) => void
) {
  const { selectionStart, selectionEnd, value } = textarea;
  const selected = value.slice(selectionStart, selectionEnd);

  if (selected) {
    const newValue =
      value.slice(0, selectionStart) + before + selected + after + value.slice(selectionEnd);
    dispatch(newValue);
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.selectionStart = selectionStart + before.length;
      textarea.selectionEnd = selectionEnd + before.length;
    });
  } else {
    const isLineStart = selectionStart === 0 || value[selectionStart - 1] === "\n";
    const prefix = isLineStart ? before : "\n" + before;
    const newValue = value.slice(0, selectionStart) + prefix + after + value.slice(selectionEnd);
    dispatch(newValue);
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = selectionStart + prefix.length;
    });
  }
}

function DescriptionField({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const toolBtnClass = "px-2 py-1 text-xs font-medium text-gray-400 hover:text-gray-600 hover:bg-gray-100 border border-gray-200 rounded-md transition-colors";

  return (
    <div>
      <label className={labelClass}>Description</label>
      <div className="flex items-center gap-1 mb-1.5">
        <button
          type="button"
          onClick={() => ref.current && insertAtCursor(ref.current, "• ", "", onChange)}
          className={toolBtnClass}
          title="Insert bullet point"
        >
          •
        </button>
        <button
          type="button"
          onClick={() => ref.current && insertAtCursor(ref.current, "  – ", "", onChange)}
          className={toolBtnClass}
          title="Insert sub-item"
        >
          –
        </button>
        <button
          type="button"
          onClick={() => ref.current && insertAtCursor(ref.current, "**", "**", onChange)}
          className={`${toolBtnClass} font-bold`}
          title="Bold selected text"
        >
          B
        </button>
      </div>
      <textarea
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        placeholder={"• Built a web app using React and Node.js\n  – Integrated OAuth2 authentication\n• Deployed on **AWS** with Docker"}
        className="w-full px-3 py-2 bg-gray-50/80 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder:text-gray-400 focus:bg-white focus:border-gray-300 focus:ring-2 focus:ring-gray-900/5 outline-none transition-all font-mono"
      />
    </div>
  );
}

export default function ProjectsForm() {
  const { resumeData, dispatch } = useResume();

  return (
    <div className="space-y-3">
      {resumeData.projects.map((project, index) => (
        <div
          key={project.id}
          className="relative border border-gray-100 rounded-xl p-4 space-y-3 bg-gray-50/30"
        >
          <div className="absolute top-3 right-3 flex items-center gap-0.5">
            <button
              type="button"
              onClick={() => dispatch({ type: "MOVE_PROJECT", id: project.id, direction: "up" })}
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
              onClick={() => dispatch({ type: "MOVE_PROJECT", id: project.id, direction: "down" })}
              disabled={index === resumeData.projects.length - 1}
              className="p-1 text-gray-300 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              title="Move down"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => dispatch({ type: "REMOVE_PROJECT", id: project.id })}
              className="p-1 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="Remove project"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Project Name</label>
              <input
                type="text"
                value={project.name}
                onChange={(e) =>
                  dispatch({ type: "UPDATE_PROJECT", id: project.id, field: "name", value: e.target.value })
                }
                placeholder="My Project"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Year</label>
              <input
                type="text"
                value={project.year}
                onChange={(e) =>
                  dispatch({ type: "UPDATE_PROJECT", id: project.id, field: "year", value: e.target.value })
                }
                placeholder="2024"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Tech Stack</label>
            <input
              type="text"
              value={project.techStack}
              onChange={(e) =>
                dispatch({ type: "UPDATE_PROJECT", id: project.id, field: "techStack", value: e.target.value })
              }
              placeholder="React, Node.js, PostgreSQL, Docker"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Links</label>
            <div className="space-y-1.5">
              {project.links.map((link, linkIndex) => (
                <div key={linkIndex} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={link.label}
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_PROJECT_LINK",
                        projectId: project.id,
                        linkIndex,
                        field: "label",
                        value: e.target.value,
                      })
                    }
                    placeholder="Label (e.g. GitHub)"
                    className={"flex-1 px-3 py-1.5 bg-gray-50/80 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder:text-gray-400 focus:bg-white focus:border-gray-300 focus:ring-2 focus:ring-gray-900/5 outline-none transition-all"}
                  />
                  <input
                    type="text"
                    value={link.url}
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_PROJECT_LINK",
                        projectId: project.id,
                        linkIndex,
                        field: "url",
                        value: e.target.value,
                      })
                    }
                    placeholder="https://..."
                    className={"flex-1 px-3 py-1.5 bg-gray-50/80 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder:text-gray-400 focus:bg-white focus:border-gray-300 focus:ring-2 focus:ring-gray-900/5 outline-none transition-all"}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      dispatch({ type: "REMOVE_PROJECT_LINK", projectId: project.id, linkIndex })
                    }
                    className="p-1 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                    title="Remove link"
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
              onClick={() => dispatch({ type: "ADD_PROJECT_LINK", projectId: project.id })}
              className="mt-1.5 inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Link
            </button>
          </div>

          <DescriptionField
            value={project.description}
            onChange={(value) =>
              dispatch({ type: "UPDATE_PROJECT", id: project.id, field: "description", value })
            }
          />
        </div>
      ))}

      <button
        type="button"
        onClick={() => dispatch({ type: "ADD_PROJECT" })}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 border border-dashed border-gray-300 hover:border-gray-400 rounded-lg transition-colors"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add Project
      </button>
    </div>
  );
}
