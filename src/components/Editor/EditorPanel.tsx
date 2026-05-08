"use client";

import SectionWrapper from "./SectionWrapper";
import PersonalInfoForm from "./PersonalInfoForm";
import SummaryForm from "./SummaryForm";
import EducationForm from "./EducationForm";
import ExperienceForm from "./ExperienceForm";
import ProjectsForm from "./ProjectsForm";
import SkillsForm from "./SkillsForm";
import ActivitiesForm from "./ActivitiesForm";

export default function EditorPanel() {
  return (
    <div className="h-full overflow-y-auto editor-scroll p-4 space-y-3">
      <SectionWrapper title="Personal Info" defaultOpen={true}>
        <PersonalInfoForm />
      </SectionWrapper>

      <SectionWrapper title="Summary">
        <SummaryForm />
      </SectionWrapper>

      <SectionWrapper title="Education">
        <EducationForm />
      </SectionWrapper>

      <SectionWrapper title="Experience">
        <ExperienceForm />
      </SectionWrapper>

      <SectionWrapper title="Projects">
        <ProjectsForm />
      </SectionWrapper>

      <SectionWrapper title="Skills">
        <SkillsForm />
      </SectionWrapper>

      <SectionWrapper title="Activities">
        <ActivitiesForm />
      </SectionWrapper>
    </div>
  );
}
