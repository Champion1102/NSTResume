import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

function ResumeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="16" y2="17" />
      <line x1="8" y1="9" x2="12" y2="9" />
    </svg>
  );
}

function HeroResumeMockup() {
  return (
    <div className="relative">
      <div className="w-[340px] bg-white rounded-lg shadow-2xl border border-gray-200 p-6 transform rotate-2 text-left" style={{ fontSize: "8px", lineHeight: "1.4", color: "#1c1c1c" }}>
        <div className="text-center mb-3">
          <div className="font-bold text-sm">Your Name</div>
          <div className="text-[9px] text-gray-600">Software Engineer</div>
          <div className="text-[7px] text-gray-500 mt-0.5">
            @ you@mail.com &bull; +91 9876543210 &bull; LinkedIn &bull; GitHub
          </div>
        </div>

        <div className="mb-2">
          <div className="font-bold text-[9px] uppercase tracking-wide border-b border-gray-800 pb-0.5 mb-1">Education</div>
          <div className="flex justify-between">
            <div className="font-semibold">B.Tech in Computer Science</div>
            <div className="text-gray-500">2021 – 2025</div>
          </div>
          <div className="text-gray-600">Newton School of Technology</div>
          <div className="text-gray-600">CGPA: 8.84/10.0</div>
        </div>

        <div className="mb-2">
          <div className="font-bold text-[9px] uppercase tracking-wide border-b border-gray-800 pb-0.5 mb-1">Experience</div>
          <div className="flex justify-between">
            <div className="font-semibold">Software Engineering Intern</div>
            <div className="text-gray-500">May 2024 – Aug 2024</div>
          </div>
          <div className="text-gray-600 italic">Company Name</div>
          <ul className="ml-2 mt-0.5 space-y-px text-gray-700">
            <li>&bull; Built a responsive dashboard with React and Tailwind CSS</li>
            <li>&bull; Improved REST APIs and improved performance by 30%</li>
            <li>&bull; Collaborated with a team of 4 engineers</li>
          </ul>
        </div>

        <div className="mb-2">
          <div className="font-bold text-[9px] uppercase tracking-wide border-b border-gray-800 pb-0.5 mb-1">Projects</div>
          <div className="font-semibold">NSTResume – Open Source Resume Builder</div>
          <ul className="ml-2 mt-0.5 space-y-px text-gray-700">
            <li>&bull; Built a LaTeX-powered resume builder with live preview</li>
            <li>&bull; Exported PDF with ATS-friendly formatting</li>
            <li>&bull; Tech: Next.js, TypeScript, Tailwind CSS, LaTeX</li>
          </ul>
        </div>

        <div>
          <div className="font-bold text-[9px] uppercase tracking-wide border-b border-gray-800 pb-0.5 mb-1">Skills</div>
          <div className="text-gray-700">
            <span className="font-semibold">Languages:</span> C++, Python, JavaScript, TypeScript
          </div>
          <div className="text-gray-700">
            <span className="font-semibold">Tools:</span> Git, Docker, VS Code, Figma, LaTeX
          </div>
        </div>
      </div>

      {/* ATS Friendly badge */}
      <div className="absolute -right-4 top-20 bg-white rounded-full shadow-lg border border-gray-100 px-4 py-2 flex items-center gap-2">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="10" fill="#22c55e" />
          <path d="M6 10l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-sm font-medium text-gray-900">ATS Friendly</span>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-full bg-white dark:bg-[#111113]">
      {/* Nav */}
      <nav className="border-b border-gray-100 dark:border-[#2a2a2f]">
        <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ResumeIcon className="text-gray-900 dark:text-white" />
            <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
              NSTResume
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2 bg-gray-50 dark:bg-[#1a1a1f] border border-gray-200 dark:border-[#2a2a2f] rounded-full px-4 py-1.5 text-sm text-gray-600 dark:text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            Built for NST &amp; tech students
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href="https://github.com/Champion1102"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="icon" className="w-9 h-9">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </Button>
            </a>
            <Link href="/editor">
              <Button className="rounded-full px-5">Open Editor</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left */}
          <div className="flex-1 max-w-xl">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.1] mb-2">
              Your resume,
              <br />
              done in{" "}
              <span className="italic">minutes.</span>
            </h1>
            {/* Decorative swirl */}
            <svg width="120" height="20" viewBox="0 0 120 20" className="mb-8 text-gray-400 dark:text-neutral-600">
              <path d="M5 15 C 30 5, 50 5, 60 10 C 70 15, 90 15, 115 5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>

            <p className="text-lg text-gray-500 dark:text-neutral-400 max-w-lg mb-8 leading-relaxed">
              A free, open-source resume editor with live preview,
              LaTeX-quality PDF export, and templates designed for
              college placements and tech interviews.
            </p>

            <div className="flex items-center gap-3 mb-10">
              <Link href="/editor">
                <Button className="rounded-full px-6 py-5 text-base gap-2">
                  Start Building
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Button>
              </Link>
              <a
                href="https://github.com/Champion1102"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  className="rounded-full px-5 py-5 text-base gap-2 text-gray-600 dark:text-neutral-400"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  View on GitHub
                </Button>
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 bg-gray-50 dark:bg-[#1a1a1f] border border-gray-200 dark:border-[#2a2a2f] rounded-full px-4 py-2 text-sm text-gray-600 dark:text-neutral-400">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                100% Free
              </div>
              <div className="flex items-center gap-2 bg-gray-50 dark:bg-[#1a1a1f] border border-gray-200 dark:border-[#2a2a2f] rounded-full px-4 py-2 text-sm text-gray-600 dark:text-neutral-400">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                No Sign-up
              </div>
              <div className="flex items-center gap-2 bg-gray-50 dark:bg-[#1a1a1f] border border-gray-200 dark:border-[#2a2a2f] rounded-full px-4 py-2 text-sm text-gray-600 dark:text-neutral-400">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Privacy First
              </div>
            </div>
          </div>

          {/* Right — Resume mockup */}
          <div className="flex-shrink-0 hidden lg:block">
            <HeroResumeMockup />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-gray-100 dark:border-[#2a2a2f]">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-gray-200 dark:border-[#2a2a2f] rounded-2xl p-6 bg-white dark:bg-[#161618]">
              <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-[#1a1a1f] flex items-center justify-center mb-4">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 dark:text-neutral-300">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                Live Preview
              </h3>
              <p className="text-sm text-gray-500 dark:text-neutral-400 leading-relaxed">
                See exactly how your resume looks as you type. No surprises.
              </p>
            </div>

            <div className="border border-gray-200 dark:border-[#2a2a2f] rounded-2xl p-6 bg-white dark:bg-[#161618]">
              <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-[#1a1a1f] flex items-center justify-center mb-4">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 dark:text-neutral-300">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                LaTeX-Quality PDF
              </h3>
              <p className="text-sm text-gray-500 dark:text-neutral-400 leading-relaxed">
                Export as a server-compiled LaTeX PDF. The same engine as Overleaf.
              </p>
            </div>

            <div className="border border-gray-200 dark:border-[#2a2a2f] rounded-2xl p-6 bg-white dark:bg-[#161618]">
              <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-[#1a1a1f] flex items-center justify-center mb-4">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 dark:text-neutral-300">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                Two Templates
              </h3>
              <p className="text-sm text-gray-500 dark:text-neutral-400 leading-relaxed">
                College Standard and Tech Professional. Clean, modern, and ATS-ready.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Templates */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-6">
          {/* College Standard */}
          <div className="border border-gray-200 dark:border-[#2a2a2f] rounded-2xl p-8 bg-white dark:bg-[#161618]">
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-[#1a1a1f] flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 dark:text-neutral-300">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c3 3 10 3 12 0v-5" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    College Standard
                  </h3>
                </div>
                <ul className="space-y-3 text-sm text-gray-500 dark:text-neutral-400">
                  <li className="flex items-start gap-2.5">
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="mt-0.5 shrink-0">
                      <circle cx="10" cy="10" r="10" fill="#e5e7eb" className="dark:fill-[#2a2a2f]" />
                      <path d="M6.5 10.5l2.5 2.5 5-5" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Campus logo (NST RU / NST ADYPU)
                  </li>
                  <li className="flex items-start gap-2.5">
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="mt-0.5 shrink-0">
                      <circle cx="10" cy="10" r="10" fill="#e5e7eb" className="dark:fill-[#2a2a2f]" />
                      <path d="M6.5 10.5l2.5 2.5 5-5" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Professional summary section
                  </li>
                  <li className="flex items-start gap-2.5">
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="mt-0.5 shrink-0">
                      <circle cx="10" cy="10" r="10" fill="#e5e7eb" className="dark:fill-[#2a2a2f]" />
                      <path d="M6.5 10.5l2.5 2.5 5-5" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Education, experience, projects, skills, activities
                  </li>
                  <li className="flex items-start gap-2.5">
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="mt-0.5 shrink-0">
                      <circle cx="10" cy="10" r="10" fill="#e5e7eb" className="dark:fill-[#2a2a2f]" />
                      <path d="M6.5 10.5l2.5 2.5 5-5" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Serif typography, classic academic layout
                  </li>
                </ul>
              </div>
              {/* Template thumbnail placeholder */}
              <div className="hidden sm:block w-[120px] shrink-0">
                <div className="w-full aspect-[3/4] bg-gray-100 dark:bg-[#1a1a1f] rounded-lg border border-gray-200 dark:border-[#2a2a2f] overflow-hidden">
                  <Image
                    src="/college-template-preview.png"
                    alt="College Standard template preview"
                    width={120}
                    height={160}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Tech Professional */}
          <div className="border border-gray-200 dark:border-[#2a2a2f] rounded-2xl p-8 bg-white dark:bg-[#161618]">
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-[#1a1a1f] flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 dark:text-neutral-300">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Tech Professional
                  </h3>
                </div>
                <ul className="space-y-3 text-sm text-gray-500 dark:text-neutral-400">
                  <li className="flex items-start gap-2.5">
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="mt-0.5 shrink-0">
                      <circle cx="10" cy="10" r="10" fill="#e5e7eb" className="dark:fill-[#2a2a2f]" />
                      <path d="M6.5 10.5l2.5 2.5 5-5" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    ATS-friendly, no logo or photo
                  </li>
                  <li className="flex items-start gap-2.5">
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="mt-0.5 shrink-0">
                      <circle cx="10" cy="10" r="10" fill="#e5e7eb" className="dark:fill-[#2a2a2f]" />
                      <path d="M6.5 10.5l2.5 2.5 5-5" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Skills-first layout (what recruiters scan for)
                  </li>
                  <li className="flex items-start gap-2.5">
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="mt-0.5 shrink-0">
                      <circle cx="10" cy="10" r="10" fill="#e5e7eb" className="dark:fill-[#2a2a2f]" />
                      <path d="M6.5 10.5l2.5 2.5 5-5" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Compact single-line header
                  </li>
                  <li className="flex items-start gap-2.5">
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="mt-0.5 shrink-0">
                      <circle cx="10" cy="10" r="10" fill="#e5e7eb" className="dark:fill-[#2a2a2f]" />
                      <path d="M6.5 10.5l2.5 2.5 5-5" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Tighter spacing, fits more on one page
                  </li>
                </ul>
              </div>
              {/* Template thumbnail placeholder */}
              <div className="hidden sm:block w-[120px] shrink-0">
                <div className="w-full aspect-[3/4] bg-gray-100 dark:bg-[#1a1a1f] rounded-lg border border-gray-200 dark:border-[#2a2a2f] overflow-hidden">
                  <Image
                    src="/tech-template-preview.png"
                    alt="Tech Professional template preview"
                    width={120}
                    height={160}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-gray-50 dark:bg-[#161618] border border-gray-200 dark:border-[#2a2a2f] rounded-2xl px-8 py-16 text-center relative overflow-hidden">
          {/* Decorative icons */}
          <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden md:block">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="text-gray-300 dark:text-[#2a2a2f]">
              <rect x="15" y="5" width="40" height="55" rx="3" stroke="currentColor" strokeWidth="2" />
              <line x1="25" y1="20" x2="45" y2="20" stroke="currentColor" strokeWidth="1.5" />
              <line x1="25" y1="28" x2="45" y2="28" stroke="currentColor" strokeWidth="1.5" />
              <line x1="25" y1="36" x2="38" y2="36" stroke="currentColor" strokeWidth="1.5" />
              <path d="M55 45 L65 55 L55 55 Z" stroke="currentColor" strokeWidth="2" fill="none" />
              <line x1="65" y1="55" x2="65" y2="70" stroke="currentColor" strokeWidth="2" />
              <line x1="58" y1="70" x2="72" y2="70" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:block">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="text-gray-300 dark:text-[#2a2a2f]">
              <path d="M20 25 L5 40 L20 55" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M60 25 L75 40 L60 55" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="45" y1="15" x2="35" y2="65" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Ready to build your resume?
          </h2>
          <p className="text-gray-500 dark:text-neutral-400 mb-8 max-w-md mx-auto">
            No sign-up. No watermark. Just open the editor and start typing.
          </p>
          <Link href="/editor">
            <Button className="rounded-full px-7 py-5 text-base gap-2">
              Open Editor
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 dark:border-[#2a2a2f]">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between text-sm text-gray-400 dark:text-neutral-500">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center text-white dark:text-gray-900 text-xs font-bold">
              N
            </div>
            <span>Built for Newton School of Technology students</span>
          </div>
          <span className="flex items-center gap-1.5">
            Built with ❤️ by
            <a
              href="https://www.linkedin.com/in/ritesh-patil-13732327a/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-gray-600 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Ritesh
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
