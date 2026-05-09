"use client";

import { ReactNode, useState } from "react";

interface SectionWrapperProps {
  title: string;
  icon?: ReactNode;
  defaultOpen?: boolean;
  children: ReactNode;
}

export default function SectionWrapper({
  title,
  icon,
  defaultOpen = false,
  children,
}: SectionWrapperProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="rounded-xl border border-gray-100 bg-white overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50/60 transition-colors"
      >
        <span className="flex items-center gap-2.5">
          {icon && (
            <span className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
              {icon}
            </span>
          )}
          <span className="font-semibold text-[13px] text-gray-800 tracking-tight">{title}</span>
        </span>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-200 ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4 pt-1 space-y-3">{children}</div>
        </div>
      </div>
    </div>
  );
}
