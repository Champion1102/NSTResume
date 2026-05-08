import type { ResumeData, TemplateId, CampusId } from "@/types/resume";

export async function compileLatexPdf(
  resumeData: ResumeData,
  templateId: TemplateId,
  campusId: CampusId
): Promise<Blob> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);

  try {
    const response = await fetch("/api/compile-latex", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resumeData, templateId, campusId }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      let message = "PDF compilation failed";
      try {
        const err = await response.json();
        message = err.error || err.details || message;
      } catch {
        // ignore parse errors
      }
      throw new Error(message);
    }

    return await response.blob();
  } catch (err) {
    clearTimeout(timeout);
    if (err instanceof DOMException && err.name === "AbortError") {
      throw new Error("PDF compilation timed out");
    }
    throw err;
  }
}
