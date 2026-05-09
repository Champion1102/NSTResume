"use client";

import React, { createContext, useContext, useReducer, useEffect, useRef, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  ResumeData,
  TemplateId,
  CampusId,
  PersonalInfo,
  Education,
  Experience,
  Project,
  SkillCategory,
} from "@/types/resume";
import { defaultResume } from "@/data/defaultResume";

const STORAGE_KEY = "nstresume-draft";

interface ResumeState {
  resumeData: ResumeData;
  templateId: TemplateId;
  campusId: CampusId;
}

type Action =
  | { type: "SET_TEMPLATE"; templateId: TemplateId }
  | { type: "SET_CAMPUS"; campusId: CampusId }
  | { type: "UPDATE_PERSONAL_INFO"; payload: Partial<PersonalInfo> }
  | { type: "ADD_PERSONAL_LINK" }
  | { type: "UPDATE_PERSONAL_LINK"; index: number; field: "label" | "url"; value: string }
  | { type: "REMOVE_PERSONAL_LINK"; index: number }
  | { type: "UPDATE_SUMMARY"; payload: string }
  | { type: "ADD_EDUCATION" }
  | { type: "UPDATE_EDUCATION"; id: string; field: keyof Education; value: string }
  | { type: "REMOVE_EDUCATION"; id: string }
  | { type: "ADD_EXPERIENCE" }
  | { type: "UPDATE_EXPERIENCE"; id: string; field: keyof Experience; value: string }
  | { type: "ADD_EXPERIENCE_BULLET"; id: string }
  | { type: "UPDATE_EXPERIENCE_BULLET"; id: string; bulletIndex: number; value: string }
  | { type: "REMOVE_EXPERIENCE_BULLET"; id: string; bulletIndex: number }
  | { type: "REMOVE_EXPERIENCE"; id: string }
  | { type: "MOVE_EXPERIENCE"; id: string; direction: "up" | "down" }
  | { type: "ADD_PROJECT" }
  | { type: "UPDATE_PROJECT"; id: string; field: string; value: string }
  | { type: "ADD_PROJECT_LINK"; projectId: string }
  | { type: "UPDATE_PROJECT_LINK"; projectId: string; linkIndex: number; field: "label" | "url"; value: string }
  | { type: "REMOVE_PROJECT_LINK"; projectId: string; linkIndex: number }
  | { type: "REMOVE_PROJECT"; id: string }
  | { type: "MOVE_PROJECT"; id: string; direction: "up" | "down" }
  | { type: "ADD_SKILL" }
  | { type: "UPDATE_SKILL"; id: string; field: keyof SkillCategory; value: string }
  | { type: "REMOVE_SKILL"; id: string }
  | { type: "ADD_ACTIVITY" }
  | { type: "UPDATE_ACTIVITY"; index: number; value: string }
  | { type: "REMOVE_ACTIVITY"; index: number }
  | { type: "LOAD_DATA"; payload: ResumeData; templateId?: TemplateId; campusId?: CampusId }
  | { type: "CLEAR_DRAFT" };

const defaultState: ResumeState = {
  resumeData: defaultResume,
  templateId: "college",
  campusId: "nst-ru",
};

function resumeReducer(state: ResumeState, action: Action): ResumeState {
  const { resumeData } = state;

  switch (action.type) {
    case "SET_TEMPLATE":
      return { ...state, templateId: action.templateId };

    case "SET_CAMPUS":
      return { ...state, campusId: action.campusId };

    case "UPDATE_PERSONAL_INFO":
      return {
        ...state,
        resumeData: {
          ...resumeData,
          personalInfo: { ...resumeData.personalInfo, ...action.payload },
        },
      };

    case "ADD_PERSONAL_LINK":
      return {
        ...state,
        resumeData: {
          ...resumeData,
          personalInfo: {
            ...resumeData.personalInfo,
            links: [...resumeData.personalInfo.links, { label: "", url: "" }],
          },
        },
      };

    case "UPDATE_PERSONAL_LINK": {
      const links = [...resumeData.personalInfo.links];
      links[action.index] = { ...links[action.index], [action.field]: action.value };
      return {
        ...state,
        resumeData: {
          ...resumeData,
          personalInfo: { ...resumeData.personalInfo, links },
        },
      };
    }

    case "REMOVE_PERSONAL_LINK": {
      const links = resumeData.personalInfo.links.filter((_, i) => i !== action.index);
      return {
        ...state,
        resumeData: {
          ...resumeData,
          personalInfo: { ...resumeData.personalInfo, links },
        },
      };
    }

    case "UPDATE_SUMMARY":
      return {
        ...state,
        resumeData: { ...resumeData, summary: action.payload },
      };

    case "ADD_EDUCATION":
      return {
        ...state,
        resumeData: {
          ...resumeData,
          education: [
            ...resumeData.education,
            { id: uuidv4(), degree: "", year: "", institution: "", grade: "" },
          ],
        },
      };

    case "UPDATE_EDUCATION": {
      const education = resumeData.education.map((e) =>
        e.id === action.id ? { ...e, [action.field]: action.value } : e
      );
      return { ...state, resumeData: { ...resumeData, education } };
    }

    case "REMOVE_EDUCATION": {
      const education = resumeData.education.filter((e) => e.id !== action.id);
      return { ...state, resumeData: { ...resumeData, education } };
    }

    case "ADD_EXPERIENCE":
      return {
        ...state,
        resumeData: {
          ...resumeData,
          experience: [
            ...resumeData.experience,
            { id: uuidv4(), title: "", startDate: "", endDate: "", company: "", location: "", bullets: [""] },
          ],
        },
      };

    case "UPDATE_EXPERIENCE": {
      const experience = resumeData.experience.map((e) =>
        e.id === action.id ? { ...e, [action.field]: action.value } : e
      );
      return { ...state, resumeData: { ...resumeData, experience } };
    }

    case "ADD_EXPERIENCE_BULLET": {
      const experience = resumeData.experience.map((e) =>
        e.id === action.id ? { ...e, bullets: [...e.bullets, ""] } : e
      );
      return { ...state, resumeData: { ...resumeData, experience } };
    }

    case "UPDATE_EXPERIENCE_BULLET": {
      const experience = resumeData.experience.map((e) =>
        e.id === action.id
          ? {
              ...e,
              bullets: e.bullets.map((b, i) => (i === action.bulletIndex ? action.value : b)),
            }
          : e
      );
      return { ...state, resumeData: { ...resumeData, experience } };
    }

    case "REMOVE_EXPERIENCE_BULLET": {
      const experience = resumeData.experience.map((e) =>
        e.id === action.id
          ? { ...e, bullets: e.bullets.filter((_, i) => i !== action.bulletIndex) }
          : e
      );
      return { ...state, resumeData: { ...resumeData, experience } };
    }

    case "REMOVE_EXPERIENCE": {
      const experience = resumeData.experience.filter((e) => e.id !== action.id);
      return { ...state, resumeData: { ...resumeData, experience } };
    }

    case "MOVE_EXPERIENCE": {
      const idx = resumeData.experience.findIndex((e) => e.id === action.id);
      const swap = action.direction === "up" ? idx - 1 : idx + 1;
      if (idx < 0 || swap < 0 || swap >= resumeData.experience.length) return state;
      const experience = [...resumeData.experience];
      [experience[idx], experience[swap]] = [experience[swap], experience[idx]];
      return { ...state, resumeData: { ...resumeData, experience } };
    }

    case "ADD_PROJECT":
      return {
        ...state,
        resumeData: {
          ...resumeData,
          projects: [
            ...resumeData.projects,
            { id: uuidv4(), name: "", links: [], year: "", techStack: "", description: "" },
          ],
        },
      };

    case "UPDATE_PROJECT": {
      const projects = resumeData.projects.map((p) =>
        p.id === action.id ? { ...p, [action.field]: action.value } : p
      );
      return { ...state, resumeData: { ...resumeData, projects } };
    }

    case "ADD_PROJECT_LINK": {
      const projects = resumeData.projects.map((p) =>
        p.id === action.projectId
          ? { ...p, links: [...p.links, { label: "", url: "" }] }
          : p
      );
      return { ...state, resumeData: { ...resumeData, projects } };
    }

    case "UPDATE_PROJECT_LINK": {
      const projects = resumeData.projects.map((p) =>
        p.id === action.projectId
          ? {
              ...p,
              links: p.links.map((l, i) =>
                i === action.linkIndex ? { ...l, [action.field]: action.value } : l
              ),
            }
          : p
      );
      return { ...state, resumeData: { ...resumeData, projects } };
    }

    case "REMOVE_PROJECT_LINK": {
      const projects = resumeData.projects.map((p) =>
        p.id === action.projectId
          ? { ...p, links: p.links.filter((_, i) => i !== action.linkIndex) }
          : p
      );
      return { ...state, resumeData: { ...resumeData, projects } };
    }

    case "REMOVE_PROJECT": {
      const projects = resumeData.projects.filter((p) => p.id !== action.id);
      return { ...state, resumeData: { ...resumeData, projects } };
    }

    case "MOVE_PROJECT": {
      const idx = resumeData.projects.findIndex((p) => p.id === action.id);
      const swap = action.direction === "up" ? idx - 1 : idx + 1;
      if (idx < 0 || swap < 0 || swap >= resumeData.projects.length) return state;
      const projects = [...resumeData.projects];
      [projects[idx], projects[swap]] = [projects[swap], projects[idx]];
      return { ...state, resumeData: { ...resumeData, projects } };
    }

    case "ADD_SKILL":
      return {
        ...state,
        resumeData: {
          ...resumeData,
          skills: [
            ...resumeData.skills,
            { id: uuidv4(), category: "", items: "" },
          ],
        },
      };

    case "UPDATE_SKILL": {
      const skills = resumeData.skills.map((s) =>
        s.id === action.id ? { ...s, [action.field]: action.value } : s
      );
      return { ...state, resumeData: { ...resumeData, skills } };
    }

    case "REMOVE_SKILL": {
      const skills = resumeData.skills.filter((s) => s.id !== action.id);
      return { ...state, resumeData: { ...resumeData, skills } };
    }

    case "ADD_ACTIVITY":
      return {
        ...state,
        resumeData: {
          ...resumeData,
          activities: [...resumeData.activities, ""],
        },
      };

    case "UPDATE_ACTIVITY": {
      const activities = [...resumeData.activities];
      activities[action.index] = action.value;
      return { ...state, resumeData: { ...resumeData, activities } };
    }

    case "REMOVE_ACTIVITY": {
      const activities = resumeData.activities.filter((_, i) => i !== action.index);
      return { ...state, resumeData: { ...resumeData, activities } };
    }

    case "LOAD_DATA":
      return {
        ...state,
        resumeData: action.payload,
        ...(action.templateId && { templateId: action.templateId }),
        ...(action.campusId && { campusId: action.campusId }),
      };

    case "CLEAR_DRAFT":
      try { localStorage.removeItem(STORAGE_KEY); } catch {}
      return { ...defaultState };

    default:
      return state;
  }
}

interface ResumeContextValue {
  resumeData: ResumeData;
  templateId: TemplateId;
  campusId: CampusId;
  dispatch: React.Dispatch<Action>;
}

const ResumeContext = createContext<ResumeContextValue | null>(null);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(resumeReducer, defaultState);
  const hasLoaded = useRef(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.resumeData) {
          dispatch({
            type: "LOAD_DATA",
            payload: parsed.resumeData,
            templateId: parsed.templateId,
            campusId: parsed.campusId,
          });
        }
      }
    } catch {}
    hasLoaded.current = true;
  }, []);

  useEffect(() => {
    if (!hasLoaded.current) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          resumeData: state.resumeData,
          templateId: state.templateId,
          campusId: state.campusId,
        })
      );
    } catch {}
  }, [state.resumeData, state.templateId, state.campusId]);

  return (
    <ResumeContext.Provider
      value={{ resumeData: state.resumeData, templateId: state.templateId, campusId: state.campusId, dispatch }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) throw new Error("useResume must be used within a ResumeProvider");
  return context;
}
