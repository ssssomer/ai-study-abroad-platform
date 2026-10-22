"use client";

import { useEffect, useState } from "react";
import { loadStudentProfile } from "@/lib/profile-store";
import { StudentProfile } from "@/types/student";

const demoScores = [
  ["Academic", 82],
  ["English", 58],
  ["Experience", 46],
  ["Technical skills", 61],
  ["Career clarity", 52],
];

export default function DashboardPage() {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadStudentProfile()
      .then(setProfile)
      .finally(() => setLoaded(true));
  }, []);

  if (!loaded) {
    return <main className="min-h-screen bg-slate-100 px-6 py-10"><div className="mx-auto max-w-6xl text-sm text-slate-500">Loading your portfolio…</div></main>;
  }

  if (!profile) {
    return (
      <main className="min-h-screen bg-slate-100 px-6 py-10">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm font-medium text-slate-500">Your study abroad journey</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-950">Start with your portfolio</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">Build one structured profile that can later power your gap analysis, roadmap, university planning, CV, essays and application tracking.</p>
          <a href="/onboarding" className="mt-6 inline-flex rounded-xl bg-slate-950 px-5 py-3 text-sm font-medium text-white">Build my portfolio</a>
        </div>
      </main>
    );
  }

  const profileCompletion = [
    profile.currentUniversity,
    profile.major,
    profile.gpa !== null,
    profile.englishTestType,
    profile.targetFields.length > 0,
    profile.targetCountries.length > 0,
    profile.careerGoal,
  ].filter(Boolean).length;
  const completion = Math.round((profileCompletion / 7) * 100);

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-medium text-slate-500">Your study abroad journey</p>
            <h1 className="mt-1 text-3xl font-semibold text-slate-950">Hi {profile.fullName || "there"}</h1>
            <p className="mt-2 text-sm text-slate-600">{profile.major} · {profile.currentUniversity}</p>
          </div>
          <a href="/onboarding" className="self-start rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-medium text-white">Update portfolio</a>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
          <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm text-slate-500">Portfolio completion</p>
                <p className="mt-2 text-5xl font-semibold text-slate-950">{completion}<span className="text-2xl text-slate-400">%</span></p>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">Portfolio saved</span>
            </div>
            <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-slate-900" style={{ width: `${completion}%` }} /></div>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Academic</p><p className="mt-2 font-semibold text-slate-900">{profile.gpa ?? "—"} / {profile.gpaScale ?? "—"}</p><p className="mt-1 text-sm text-slate-600">Year {profile.yearOfStudy ?? "—"} · {profile.degreeLevel}</p></div>
              <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-wide text-slate-400">English</p><p className="mt-2 font-semibold text-slate-900">{profile.englishTestType === "None" ? "Not tested yet" : `${profile.englishTestType} ${profile.englishScore.overall ?? ""}`}</p><p className="mt-1 text-sm text-slate-600">Used later for readiness planning</p></div>
              <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Experience</p><p className="mt-2 font-semibold text-slate-900">{profile.experiences.length} item{profile.experiences.length === 1 ? "" : "s"}</p><p className="mt-1 text-sm text-slate-600">Internships, projects, research and more</p></div>
              <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Target countries</p><p className="mt-2 font-semibold text-slate-900">{profile.targetCountries.length ? profile.targetCountries.join(", ") : "Not selected"}</p></div>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm font-medium text-slate-500">Planning inputs</p>
            <h2 className="mt-1 text-xl font-semibold">What you are aiming for</h2>
            <div className="mt-5 space-y-5">
              <div><p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Fields</p><div className="mt-2 flex flex-wrap gap-2">{profile.targetFields.map((item) => <span key={item} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">{item}</span>)}</div></div>
              <div><p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Priorities</p><div className="mt-2 flex flex-wrap gap-2">{profile.priorities.map((item) => <span key={item} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">{item}</span>)}</div></div>
              <div><p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Career direction</p><p className="mt-2 text-sm leading-6 text-slate-600">{profile.careerGoal || "Still exploring — the platform can help you clarify this."}</p></div>
            </div>
          </section>
        </div>

        <section className="mt-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-medium text-slate-500">Next product layer</p>
              <h2 className="mt-1 text-xl font-semibold">AI profile assessment</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">We will use this portfolio to identify gaps, rank the highest-value improvements and create a dynamic 12-month roadmap.</p>
            </div>
            <button className="shrink-0 rounded-xl bg-slate-200 px-4 py-2.5 text-sm font-medium text-slate-500" disabled>Assessment coming next</button>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-5">{demoScores.map(([label]) => <div key={label as string} className="rounded-xl border border-slate-200 p-3 text-sm text-slate-500">{label}</div>)}</div>
        </section>
      </div>
    </main>
  );
}
