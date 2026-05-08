import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { generateCollegeLatex } from "@/lib/latex/collegeTemplate";
import { generateTechLatex } from "@/lib/latex/techTemplate";
import type { ResumeData, TemplateId, CampusId } from "@/types/resume";

export const maxDuration = 30;

const CAMPUS_LOGO_FILES: Record<CampusId, string> = {
  "nst-ru": "newton-ru-logo.png",
  "nst-adypu": "nst-adypu.png",
};

const YTOTECH_URL = "https://latex.ytotech.com/builds/sync";

interface CompileRequest {
  resumeData: ResumeData;
  templateId: TemplateId;
  campusId: CampusId;
}

export async function POST(request: NextRequest) {
  let body: CompileRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { resumeData, templateId, campusId } = body;

  if (!resumeData?.personalInfo) {
    return NextResponse.json({ error: "Missing resumeData" }, { status: 400 });
  }

  let latexString: string;
  if (templateId === "tech") {
    latexString = generateTechLatex(resumeData);
  } else {
    latexString = generateCollegeLatex(resumeData, campusId || "nst-ru");
  }

  const resources: Record<string, unknown>[] = [
    { main: true, content: latexString },
  ];

  if (templateId !== "tech") {
    const logoFilename = CAMPUS_LOGO_FILES[campusId || "nst-ru"];
    const logoPath = path.join(process.cwd(), "public", logoFilename);
    try {
      const logoBuffer = await readFile(logoPath);
      resources.push({ path: logoFilename, file: logoBuffer.toString("base64") });
    } catch {
      return NextResponse.json(
        { error: `Logo file not found: ${logoFilename}` },
        { status: 500 }
      );
    }
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25000);

  try {
    const ytResponse = await fetch(YTOTECH_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ compiler: "pdflatex", resources }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    const contentType = ytResponse.headers.get("content-type") || "";
    if (contentType.includes("application/pdf")) {
      const pdfBuffer = await ytResponse.arrayBuffer();
      return new NextResponse(pdfBuffer, {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="resume.pdf"`,
        },
      });
    }

    let errorDetail = "LaTeX compilation failed";
    try {
      const errorData = await ytResponse.json();
      errorDetail = errorData?.logs || errorData?.error || JSON.stringify(errorData);
    } catch {
      errorDetail = await ytResponse.text();
    }

    return NextResponse.json(
      { error: "LaTeX compilation failed", details: errorDetail },
      { status: 500 }
    );
  } catch (err) {
    clearTimeout(timeout);
    if (err instanceof DOMException && err.name === "AbortError") {
      return NextResponse.json(
        { error: "Compilation timed out" },
        { status: 504 }
      );
    }
    return NextResponse.json(
      { error: "Compilation service unavailable" },
      { status: 502 }
    );
  }
}
