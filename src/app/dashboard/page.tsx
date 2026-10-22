"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  BookOpenCheck,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  Compass,
  FileText,
  GraduationCap,
  Home,
  Languages,
  LayoutDashboard,
  MapPinned,
  MessageSquareText,
  Sparkles,
  Target,
  UserRound,
} from "lucide-react";
import { loadStudentProfile } from "@/lib/profile-store";
import { StudentProfile } from "@/types/student";

type ModuleKey =
  | "Overview"
  | "Portfolio"
  | "AI Assessment"
  | "Improvement Plan"
  | "English"
  | "Internships"
  | "Career"
  | "Universities"
  | "Applications"
  | "Offers"
  | "Housing";

const navigation: Array<{ label: ModuleKey; icon: React.ComponentType<{ className?: string }>; group?: string }> = [
  { label: "Overview", icon: LayoutDashboard, group: "Plan" },
  { label: "Portfolio", icon: UserRound },
  { label: "AI Assessment", icon: Sparkles },
  { label: "Improvement Plan", icon: Target },
  { label: "English", icon: Languages, group: "Prepare" },
  { label: "Internships", icon: BriefcaseBusiness },
  { label: "Career", icon: Compass },
  { label: "Universities", icon: GraduationCap, group: "Apply" },
  { label: "Applications", icon: FileText },
  { label: "Offers", icon: BookOpenCheck },
  { label: "Housing", icon: Home, group: "Arrive" },
];

const readiness = [
  { label: "Academic", value: 82 },
  { label: "English", value: 58 },
  { label: "Experience", value: 46 },
  { label: "Technical", value: 61 },
  { label: "Career clarity", value: 52 },
];

const priorities = [
  {
    title: "Book your first English test",
    detail: "Target a diagnostic result this month so the plan can set a realistic test timeline.",
    tag: "English",
    due: "This week",
  },
  {
    title: "Strengthen your internship pipeline",
    detail: "Build a focused list of finance / analytics roles and start tracking applications.",
    tag: "Internships",
    due: "Next 2 weeks",
  },
  {
    title: "Build one evidence-based project",
    detail: "A SQL, analytics or finance project would improve both application and employability evidence.",
    tag: "Profile",
    due: "This month",
  },
];

function SectionCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`rounded-[28px] border border-[#dfe8e3] bg-white shadow-[0_14px_40px_rgba(20,48,38,0.06)] ${className}`}>{children}</section>;
}

function Pill({ children, tone = "green" }: { children: React.ReactNode; tone?: "green" | "amber" | "slate" }) {
  const tones = {
    green: "bg-[#e9f4ef] text-[#285744]",
    amber: "bg-[#f7efe0] text-[#8d6a2d]",
    slate: "bg-[#eef1ef] text-[#53615b]",
  };
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${tones[tone]}`}>{children}</span>;
}

function EmptyModule({ title, description, icon: Icon, action }: { title: string; description: string; icon: React.ComponentType<{ className?: string }>; action: string }) {
  return (
    <SectionCard className="p-8 lg:p-10">
      <div className="flex max-w-2xl flex-col items-start">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8f2ed] text-[#214d3d]">
          <Icon className="h-5 w-5" />
        </div>
        <h2 className="mt-6 text-2xl font-semibold tracking-tight text-[#17382d]">{title}</h2>
        <p className="mt-3 max-w-xl text-sm leading-7 text-[#66756f]">{description}</p>
        <button className="mt-6 rounded-2xl bg-[#173f31] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0f3327]">{action}</button>
      </div>
    </SectionCard>
  );
}

export default function DashboardPage() {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [active, setActive] = useState<ModuleKey>("Overview");

  useEffect(() => {
    loadStudentProfile().then(setProfile).finally(() => setLoaded(true));
  }, []);

  const completion = useMemo(() => {
    if (!profile) return 0;
    const values = [
      profile.currentUniversity,
      profile.major,
      profile.gpa !== null,
      profile.englishTestType,
      profile.targetFields.length > 0,
      profile.targetCountries.length > 0,
      profile.careerGoal,
    ];
    return Math.round((values.filter(Boolean).length / values.length) * 100);
  }, [profile]);

  if (!loaded) {
    return <main className="min-h-screen bg-[#f3f5f1] p-8 text-sm text-[#718078]">Loading your planning workspace…</main>;
  }

  if (!profile) {
    return (
      <main className="min-h-screen bg-[#f3f5f1] px-5 py-12">
        <div className="mx-auto max-w-4xl rounded-[32px] border border-[#dfe8e3] bg-white p-10 shadow-[0_18px_50px_rgba(20,48,38,0.08)]">
          <Pill>Start here</Pill>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-[#17382d]">Build your portfolio before we plan the journey.</h1>
          <p className="mt-4 max-w-2xl leading-7 text-[#66756f]">Your portfolio is the source of truth for assessment, profile building, English planning, internships, school selection and applications.</p>
          <a href="/onboarding" className="mt-7 inline-flex rounded-2xl bg-[#173f31] px-5 py-3 text-sm font-semibold text-white">Build my portfolio</a>
        </div>
      </main>
    );
  }

  const firstName = profile.fullName?.split(" ")[0] || "there";

  return (
    <main className="min-h-screen bg-[#f3f5f1] text-[#18372e]">
      <div className="grid min-h-screen lg:grid-cols-[248px_minmax(0,1fr)]">
        <aside className="border-r border-[#dce6e0] bg-[#edf2ee] px-4 py-5 lg:sticky lg:top-0 lg:h-screen">
          <a href="/" className="flex items-center gap-3 px-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#173f31] text-white"><Sparkles className="h-4 w-4" /></div>
            <div>
              <div className="font-semibold tracking-tight text-[#17382d]">StudyPath</div>
              <div className="text-[11px] uppercase tracking-[0.16em] text-[#7a8b83]">AI Planning OS</div>
            </div>
          </a>

          <nav className="mt-8 space-y-1.5">
            {navigation.map((item, index) => {
              const Icon = item.icon;
              const showGroup = item.group && (index === 0 || navigation[index - 1].group !== item.group);
              return (
                <div key={item.label}>
                  {showGroup && <div className="mb-2 mt-6 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#95a39d]">{item.group}</div>}
                  <button
                    onClick={() => setActive(item.label)}
                    className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm font-medium transition ${active === item.label ? "bg-[#173f31] text-white shadow-sm" : "text-[#586860] hover:bg-white/70"}`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="flex-1">{item.label}</span>
                    {active === item.label && <ChevronRight className="h-3.5 w-3.5 opacity-70" />}
                  </button>
                </div>
              );
            })}
          </nav>

          <div className="mt-8 rounded-3xl bg-white/80 p-4 ring-1 ring-[#dfe8e3]">
            <div className="flex items-center justify-between text-xs font-semibold text-[#53655d]"><span>Journey setup</span><span>{completion}%</span></div>
            <div className="mt-3 h-1.5 rounded-full bg-[#dfe7e2]"><div className="h-full rounded-full bg-[#4f826b]" style={{ width: `${completion}%` }} /></div>
            <p className="mt-3 text-xs leading-5 text-[#79877f]">Keep your portfolio current so your AI plan stays relevant.</p>
          </div>
        </aside>

        <section className="min-w-0">
          <header className="flex flex-col gap-5 border-b border-[#dfe7e2] bg-[#f7f8f5]/95 px-5 py-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#809087]">{active}</p>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[#18372e]">{active === "Overview" ? `Good morning, ${firstName}` : active}</h1>
            </div>
            <div className="flex items-center gap-3">
              <button className="rounded-2xl border border-[#d6e1db] bg-white px-4 py-2.5 text-sm font-semibold text-[#3f554b]">Ask AI advisor</button>
              <a href="/onboarding" className="rounded-2xl bg-[#173f31] px-4 py-2.5 text-sm font-semibold text-white">Update portfolio</a>
            </div>
          </header>

          <div className="px-5 py-6 sm:px-8 lg:px-10 lg:py-8">
            {active === "Overview" && (
              <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
                <div className="space-y-6">
                  <SectionCard className="overflow-hidden">
                    <div className="grid gap-0 lg:grid-cols-[1.25fr_.75fr]">
                      <div className="p-7 sm:p-8">
                        <div className="flex flex-wrap items-center gap-2"><Pill>Current phase: Profile building</Pill><Pill tone="slate">Year {profile.yearOfStudy ?? "—"}</Pill></div>
                        <h2 className="mt-5 max-w-2xl text-3xl font-semibold tracking-tight text-[#17382d]">Build the profile that makes your future applications stronger.</h2>
                        <p className="mt-3 max-w-2xl text-sm leading-7 text-[#65766e]">Your plan currently prioritises English readiness, stronger internship evidence and clearer career positioning before university selection becomes the main focus.</p>
                        <div className="mt-7 flex flex-wrap gap-3">
                          <button onClick={() => setActive("Improvement Plan")} className="rounded-2xl bg-[#173f31] px-5 py-3 text-sm font-semibold text-white">View improvement plan</button>
                          <button onClick={() => setActive("AI Assessment")} className="rounded-2xl border border-[#d7e1dc] bg-white px-5 py-3 text-sm font-semibold text-[#40584d]">View assessment</button>
                        </div>
                      </div>
                      <div className="border-t border-[#e2e9e5] bg-[#eef4f0] p-7 lg:border-l lg:border-t-0">
                        <div className="flex items-center justify-between"><span className="text-xs font-bold uppercase tracking-[0.18em] text-[#789087]">Readiness</span><BarChart3 className="h-4 w-4 text-[#6f847b]" /></div>
                        <div className="mt-5 text-5xl font-semibold tracking-tight text-[#173f31]">63<span className="text-xl text-[#789087]">/100</span></div>
                        <p className="mt-2 text-sm leading-6 text-[#6d7d75]">Early-stage profile with clear upside from targeted actions.</p>
                        <div className="mt-6 space-y-3">
                          {readiness.slice(0, 3).map((item) => (
                            <div key={item.label}><div className="mb-1.5 flex justify-between text-xs font-medium text-[#587066]"><span>{item.label}</span><span>{item.value}</span></div><div className="h-1.5 rounded-full bg-white"><div className="h-full rounded-full bg-[#4f826b]" style={{ width: `${item.value}%` }} /></div></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </SectionCard>

                  <div className="grid gap-6 lg:grid-cols-2">
                    <SectionCard className="p-6 sm:p-7">
                      <div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#86968e]">Your next moves</p><h3 className="mt-2 text-xl font-semibold text-[#17382d]">Top priorities</h3></div><Target className="h-5 w-5 text-[#5c7d6e]" /></div>
                      <div className="mt-6 space-y-4">
                        {priorities.map((item, index) => (
                          <div key={item.title} className="rounded-2xl border border-[#e1e8e4] bg-[#fafbf9] p-4">
                            <div className="flex gap-3"><div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#173f31] text-xs font-bold text-white">{index + 1}</div><div><div className="font-semibold text-[#29473c]">{item.title}</div><p className="mt-1 text-xs leading-5 text-[#74837c]">{item.detail}</p><div className="mt-3 flex items-center gap-2"><Pill tone="slate">{item.tag}</Pill><span className="text-xs font-medium text-[#9a6f34]">{item.due}</span></div></div></div>
                          </div>
                        ))}
                      </div>
                    </SectionCard>

                    <SectionCard className="p-6 sm:p-7">
                      <div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#86968e]">12-month journey</p><h3 className="mt-2 text-xl font-semibold text-[#17382d]">Roadmap</h3></div><MapPinned className="h-5 w-5 text-[#5c7d6e]" /></div>
                      <div className="mt-6 space-y-5">
                        {[ ["Now", "Profile building", "English + internships + skill evidence", true], ["3–6 months", "Career direction", "Refine target field and build stronger proof", false], ["6–9 months", "University planning", "Country fit, shortlist and application portfolio", false], ["9–12 months", "Applications", "CV, essays, references and submission", false] ].map(([time, title, detail, current]) => (
                          <div key={String(time)} className="flex gap-4"><div className="flex flex-col items-center"><div className={`flex h-7 w-7 items-center justify-center rounded-full ${current ? "bg-[#173f31] text-white" : "bg-[#edf1ee] text-[#84938c]"}`}>{current ? <CircleDot className="h-3.5 w-3.5" /> : <CheckCircle2 className="h-3.5 w-3.5" />}</div><div className="mt-2 h-full w-px bg-[#dfe6e2]" /></div><div className="pb-4"><div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#92a098]">{time}</div><div className="mt-1 font-semibold text-[#29473c]">{title}</div><p className="mt-1 text-xs leading-5 text-[#76857e]">{detail}</p></div></div>
                        ))}
                      </div>
                    </SectionCard>
                  </div>

                  <SectionCard className="p-6 sm:p-7">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#86968e]">Readiness dimensions</p><h3 className="mt-2 text-xl font-semibold text-[#17382d]">Where you stand today</h3></div><button onClick={() => setActive("AI Assessment")} className="text-sm font-semibold text-[#3f715c]">Open full assessment →</button></div>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                      {readiness.map((item) => (
                        <div key={item.label} className="rounded-2xl bg-[#f6f8f5] p-4"><div className="flex items-center justify-between"><span className="text-sm font-medium text-[#5e7067]">{item.label}</span><span className="text-sm font-bold text-[#264c3d]">{item.value}</span></div><div className="mt-4 h-1.5 rounded-full bg-[#e3e9e5]"><div className="h-full rounded-full bg-[#5e8c76]" style={{ width: `${item.value}%` }} /></div></div></div>
                      ))}
                    </div>
                  </SectionCard>
                </div>

                <aside className="space-y-6">
                  <SectionCard className="p-6">
                    <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#173f31] text-white"><Sparkles className="h-4 w-4" /></div><div><div className="font-semibold text-[#17382d]">AI Advisor</div><div className="text-xs text-[#839189]">Planning intelligence</div></div></div>
                    <div className="mt-5 rounded-2xl bg-[#f1f5f2] p-4 text-sm leading-6 text-[#5e7167]">Your strongest immediate return is likely to come from improving experience quality rather than adding more generic extracurriculars.</div>
                    <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-[#d8e2dc] bg-white py-3 text-sm font-semibold text-[#3b5f4f]"><MessageSquareText className="h-4 w-4" /> Ask about my plan</button>
                  </SectionCard>

                  <SectionCard className="p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#89988f]">Profile snapshot</p>
                    <div className="mt-4 space-y-4 text-sm">
                      <div><div className="text-xs text-[#89968f]">Education</div><div className="mt-1 font-semibold text-[#29473c]">{profile.major || "Major not set"}</div><div className="text-xs text-[#72827a]">{profile.currentUniversity || "Institution not set"}</div></div>
                      <div><div className="text-xs text-[#89968f]">English</div><div className="mt-1 font-semibold text-[#29473c]">{profile.englishTestType === "None" ? "Not tested yet" : `${profile.englishTestType} ${profile.englishScore.overall ?? ""}`}</div></div>
                      <div><div className="text-xs text-[#89968f]">Experience</div><div className="mt-1 font-semibold text-[#29473c]">{profile.experiences.length} recorded item{profile.experiences.length === 1 ? "" : "s"}</div></div>
                    </div>
                    <button onClick={() => setActive("Portfolio")} className="mt-5 text-sm font-semibold text-[#3f715c]">View full portfolio →</button>
                  </SectionCard>

                  <SectionCard className="p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#89988f]">Journey status</p>
                    <div className="mt-5 space-y-3">
                      {[ ["Profile", "In progress"], ["Prepare", "Next"], ["Select", "Later"], ["Apply", "Later"], ["Arrive", "Later"] ].map(([label, status], index) => (
                        <div key={label} className="flex items-center justify-between"><div className="flex items-center gap-2"><div className={`h-2 w-2 rounded-full ${index === 0 ? "bg-[#4d8069]" : "bg-[#cdd7d1]"}`} /><span className="text-sm font-medium text-[#51665c]">{label}</span></div><span className="text-xs text-[#8b9891]">{status}</span></div>
                      ))}
                    </div>
                  </SectionCard>
                </aside>
              </div>
            )}

            {active === "Portfolio" && (
              <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
                <SectionCard className="p-7 sm:p-8"><div className="flex items-start justify-between gap-4"><div><Pill>Profile source of truth</Pill><h2 className="mt-5 text-2xl font-semibold text-[#17382d]">Your portfolio</h2><p className="mt-2 text-sm leading-7 text-[#66756f]">This information powers every recommendation across the platform.</p></div><a href="/onboarding" className="rounded-2xl bg-[#173f31] px-4 py-2.5 text-sm font-semibold text-white">Edit portfolio</a></div><div className="mt-7 grid gap-4 sm:grid-cols-2"><div className="rounded-2xl bg-[#f6f8f5] p-5"><div className="text-xs font-bold uppercase tracking-[0.14em] text-[#8a9890]">Education</div><div className="mt-3 font-semibold text-[#29473c]">{profile.currentUniversity}</div><div className="mt-1 text-sm text-[#6f7f77]">{profile.degreeLevel} · {profile.major} · Year {profile.yearOfStudy ?? "—"}</div></div><div className="rounded-2xl bg-[#f6f8f5] p-5"><div className="text-xs font-bold uppercase tracking-[0.14em] text-[#8a9890]">Academic</div><div className="mt-3 font-semibold text-[#29473c]">{profile.gpa ?? "—"} / {profile.gpaScale ?? "—"}</div><div className="mt-1 text-sm text-[#6f7f77]">Expected graduation: {profile.graduationDate || "Not set"}</div></div><div className="rounded-2xl bg-[#f6f8f5] p-5"><div className="text-xs font-bold uppercase tracking-[0.14em] text-[#8a9890]">Target fields</div><div className="mt-3 flex flex-wrap gap-2">{profile.targetFields.map((item) => <Pill key={item} tone="slate">{item}</Pill>)}</div></div><div className="rounded-2xl bg-[#f6f8f5] p-5"><div className="text-xs font-bold uppercase tracking-[0.14em] text-[#8a9890]">Countries</div><div className="mt-3 flex flex-wrap gap-2">{profile.targetCountries.map((item) => <Pill key={item} tone="slate">{item}</Pill>)}</div></div></div></SectionCard>
                <SectionCard className="p-6"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#89988f]">Completeness</p><div className="mt-4 text-5xl font-semibold text-[#173f31]">{completion}%</div><p className="mt-3 text-sm leading-6 text-[#6d7d75]">Keep this profile current before every major planning decision.</p></SectionCard>
              </div>
            )}

            {active === "AI Assessment" && (
              <div className="space-y-6"><SectionCard className="p-7 sm:p-8"><div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start"><div><Pill>AI diagnostic</Pill><h2 className="mt-5 text-2xl font-semibold text-[#17382d]">Profile readiness assessment</h2><p className="mt-2 max-w-2xl text-sm leading-7 text-[#66756f]">This is the workspace for strengths, gaps, evidence quality and application readiness across multiple dimensions.</p></div><div className="rounded-2xl bg-[#eef4f0] px-6 py-5 text-center"><div className="text-xs font-bold uppercase tracking-[0.16em] text-[#7e9087]">Overall</div><div className="mt-2 text-4xl font-semibold text-[#173f31]">63</div></div></div><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{readiness.map((item) => <div key={item.label} className="rounded-2xl border border-[#e0e8e3] p-5"><div className="text-sm font-medium text-[#61726a]">{item.label}</div><div className="mt-3 text-3xl font-semibold text-[#29473c]">{item.value}</div><div className="mt-4 h-1.5 rounded-full bg-[#e6ebe8]"><div className="h-full rounded-full bg-[#5c8c75]" style={{ width: `${item.value}%` }} /></div></div></div>)}</div></SectionCard></div>
            )}

            {active === "Improvement Plan" && <EmptyModule title="12-month improvement plan" description="This will become a dynamic task system that turns assessment gaps into specific actions, deadlines and measurable progress across English, internships, projects, skills and application readiness." icon={Target} action="Generate my roadmap" />}
            {active === "English" && <EmptyModule title="English preparation" description="Plan diagnostics, target scores, test dates and weekly preparation around your application deadlines. This module will later adapt to IELTS, PTE or TOEFL requirements for target programmes." icon={Languages} action="Create English plan" />}
            {active === "Internships" && <EmptyModule title="Internship strategy" description="Turn your target career direction into a ranked internship pipeline, skill-gap list, CV actions and application tracker instead of generic advice to ‘get more experience’." icon={BriefcaseBusiness} action="Build internship strategy" />}
            {active === "Career" && <EmptyModule title="Career direction" description="Compare industries, roles, skills, progression, salary potential and country fit so study choices are linked to what you actually want to do after graduation." icon={Compass} action="Explore career paths" />}
            {active === "Universities" && <EmptyModule title="University planning" description="This section will combine your profile, career goals, budget and country preferences with verified programme data to build a Reach / Target / Safe portfolio." icon={GraduationCap} action="Start university planning" />}
            {active === "Applications" && <EmptyModule title="Application workspace" description="Track programme deadlines, required documents, CV, essays, recommendation letters, submission status and cross-document consistency in one place." icon={FileText} action="Create application workspace" />}
            {active === "Offers" && <EmptyModule title="Offers & decisions" description="When offers arrive, compare conditions, costs, deadlines and programme fit, then transition automatically into deposit, CoE, visa and relocation tasks." icon={Building2} action="Add an offer" />}
            {active === "Housing" && <EmptyModule title="Housing & relocation" description="Use university, budget, commute and lifestyle preferences to recommend areas, compare accommodation options and organise the move after an offer is accepted." icon={Home} action="Set housing preferences" />}
          </div>
        </section>
      </div>
    </main>
  );
}
