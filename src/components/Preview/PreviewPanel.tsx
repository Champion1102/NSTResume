"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { useResume } from "@/context/ResumeContext";
import CollegeTemplate from "./CollegeTemplate";
import TechTemplate from "./TechTemplate";

export default function PreviewPanel() {
  const { resumeData, templateId, campusId } = useResume();
  const containerRef = useRef<HTMLDivElement>(null);
  const resumeRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [resumeHeight, setResumeHeight] = useState(1123);

  const updateScale = useCallback(() => {
    if (!containerRef.current || !resumeRef.current) return;
    const containerWidth = containerRef.current.clientWidth;
    const ratio = containerWidth / 794;
    setScale(ratio);
    setResumeHeight(resumeRef.current.offsetHeight);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => {
      updateScale();
    });
    observer.observe(container);

    // Initial measurement
    updateScale();

    return () => {
      observer.disconnect();
    };
  }, [updateScale]);

  // Re-measure height when data or template changes
  useEffect(() => {
    // Allow DOM to update before measuring
    const frame = requestAnimationFrame(() => {
      updateScale();
    });
    return () => cancelAnimationFrame(frame);
  }, [resumeData, templateId, updateScale]);

  return (
    <div
      style={{
        height: "100%",
        overflow: "auto",
        background: "#f1f5f9",
        padding: 24,
      }}
    >
      <div
        ref={containerRef}
        style={{ width: "100%", position: "relative" }}
      >
        <div
          style={{
            height: resumeHeight * scale,
            overflow: "hidden",
          }}
        >
          <div
            id="resume-preview"
            ref={resumeRef}
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              width: 794,
              boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)",
            }}
          >
            {templateId === "tech" ? (
              <TechTemplate data={resumeData} />
            ) : (
              <CollegeTemplate data={resumeData} campusId={campusId} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
