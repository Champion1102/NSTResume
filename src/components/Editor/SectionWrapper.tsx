"use client";

import { ReactNode, useState } from "react";

interface SectionWrapperProps {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

export default function SectionWrapper({
  title,
  defaultOpen = false,
  children,
}: SectionWrapperProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-border rounded-lg bg-card overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 text-left font-semibold text-sm hover:bg-gray-50 transition-colors"
      >
        <span>{title}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
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
