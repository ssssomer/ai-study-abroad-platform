"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { loadStudentProfile, saveStudentProfile } from "@/lib/profile-store";
import {
  emptyStudentProfile,
  Experience,
  ExperienceType,
  StudentProfile,
} from "@/types/student";

const steps = [
  "About you",
  "Academics",
  "English",
  "Experience",
  "Career",
  "Preferences",
];

const countries = ["Australia", "United Kingdom", "United States", "Canada", "Singapore", "Hong Kong"];
const fields = ["Finance", "Business Analytics", "Data", "Consulting", "Management", "Marketing", "Computer Science", "Engineering"];
const priorities = ["Career growth", "Salary", "University reputation", "Immigration", "Work-life balance", "Return-home employment"];

const baseSchema = z.object({
  fullName: z.string().min(2, "Please enter your name."),
  currentCountry: z.string().min(2, "Please enter your current country."),
  currentUniversity: z.string().min(2, "Please enter your institution."),
  degreeLevel: z.string().min(1, "Please choose a degree level."),
  major: z.string().min(2, "Please enter your major."),
  yearOfStudy: z.number().int().min(1).max(8),
  graduationDate: z.string().min(1, "Please enter your expected graduation date."),
});

function ToggleChip({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm transition ${active ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"}`}
    >
      {label}
    </button>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
      {children}
    </label>
  );
}

const inputClass = "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-100";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<StudentProfile>(emptyStudentProfile);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadStudentProfile().then((saved) => saved && setProfile(saved));
  }, []);

  const progress = useMemo(() => Math.round(((step + 1) / steps.length) * 100), [step]);

  function patch(values: Partial<StudentProfile>) {
    setProfile((current) => ({ ...current, ...values }));
    setError("");
  }

  function toggleArray(key: "targetFields" | "priorities" | "targetCountries", value: string) {
    const current = profile[key];
    patch({ [key]: current.includes(value) ? current.filter((item) => item !== value) : [...current, value] } as Partial<StudentProfile>);
  }

  function validateCurrentStep() {
    if (step === 0) {
      const result = z.object({
        fullName: z.string().min(2),
        currentCountry: z.string().min(2),
        currentUniversity: z.string().min(2),
        degreeLevel: z.string().min(1),
        major: z.string().min(2),
        yearOfStudy: z.number().int().min(1).max(8),
        graduationDate: z.string().min(1),
      }).safeParse(profile);
      if (!result.success) return "Please complete all required profile fields.";
    }

    if (step === 1) {
      if (profile.gpa === null || profile.gpaScale === null) return "Please enter your GPA and GPA scale.";
      if (profile.gpa < 0 || profile.gpaScale <= 0 || profile.gpa > profile.gpaScale) return "Please enter a valid GPA and scale.";
    }

    if (step === 2 && profile.englishTestType !== "None") {
      if (profile.englishScore.overall === null || profile.englishScore.overall === undefined) return "Please enter your overall English test score.";
    }

    if (step === 4 && profile.targetFields.length === 0) return "Choose at least one career or study direction.";
    if (step === 5) {
      if (profile.targetCountries.length === 0) return "Choose at least one target country.";
      if (profile.budgetMin !== null && profile.budgetMax !== null && profile.budgetMin > profile.budgetMax) return "Minimum budget cannot exceed maximum budget.";
    }
    return "";
  }

  async function next() {
    const validationError = validateCurrentStep();
    if (validationError) {
      setError(validationError);
      return;
    }
    if (step < steps.length - 1) {
      setStep((current) => current + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setSaving(true);
    try {
      await saveStudentProfile(profile);
      router.push("/dashboard");
    } catch (cause) {
      console.error(cause);
      setError("We could not save your profile. Your browser copy is still preserved.");
    } finally {
      setSaving(false);
    }
  }

  function addExperience() {
    const experience: Experience = {
      id: crypto.randomUUID(),
      type: "internship",
      title: "",
      organisation: "",
      description: "",
    };
    patch({ experiences: [...profile.experiences, experience] });
  }

  function updateExperience(id: string, values: Partial<Experience>) {
    patch({ experiences: profile.experiences.map((item) => (item.id === id ? { ...item, ...values } : item)) });
  }

  function removeExperience(id: string) {
    patch({ experiences: profile.experiences.filter((item) => item.id !== id) });
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <a href="/" className="text-sm font-semibold text-slate-600">← StudyPath AI</a>
          <div className="mt-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-slate-500">Build your student portfolio</p>
              <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-950">{steps[step]}</h1>
            </div>
            <span className="text-sm font-medium text-slate-500">{step + 1} / {steps.length}</span>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full rounded-full bg-slate-950 transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-8">
          {step === 0 && (
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full name"><input className={inputClass} value={profile.fullName} onChange={(e) => patch({ fullName: e.target.value })} /></Field>
              <Field label="Current country"><input className={inputClass} value={profile.currentCountry} onChange={(e) => patch({ currentCountry: e.target.value })} /></Field>
              <Field label="University / institution"><input className={inputClass} value={profile.currentUniversity} onChange={(e) => patch({ currentUniversity: e.target.value })} /></Field>
              <Field label="Degree level">
                <select className={inputClass} value={profile.degreeLevel} onChange={(e) => patch({ degreeLevel: e.target.value })}>
                  <option value="">Select</option><option>Bachelor</option><option>Master</option><option>Diploma</option><option>High school</option><option>Other</option>
                </select>
              </Field>
              <Field label="Major"><input className={inputClass} value={profile.major} onChange={(e) => patch({ major: e.target.value })} /></Field>
              <Field label="Year of study"><input className={inputClass} type="number" min={1} max={8} value={profile.yearOfStudy ?? ""} onChange={(e) => patch({ yearOfStudy: e.target.value ? Number(e.target.value) : null })} /></Field>
              <Field label="Expected graduation"><input className={inputClass} type="month" value={profile.graduationDate.slice(0, 7)} onChange={(e) => patch({ graduationDate: e.target.value ? `${e.target.value}-01` : "" })} /></Field>
            </div>
          )}

          {step === 1 && (
            <div>
              <p className="max-w-2xl text-sm leading-6 text-slate-600">Enter your current academic standing. We will later use this with course difficulty, institution context and target programmes rather than treating GPA as the only signal.</p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Field label="Current GPA / average"><input className={inputClass} type="number" step="0.01" value={profile.gpa ?? ""} onChange={(e) => patch({ gpa: e.target.value ? Number(e.target.value) : null })} /></Field>
                <Field label="GPA scale / maximum"><input className={inputClass} type="number" step="0.01" value={profile.gpaScale ?? ""} onChange={(e) => patch({ gpaScale: e.target.value ? Number(e.target.value) : null })} /></Field>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <Field label="English test">
                <select className={inputClass} value={profile.englishTestType} onChange={(e) => patch({ englishTestType: e.target.value as StudentProfile["englishTestType"], englishScore: {} })}>
                  <option>None</option><option>IELTS</option><option>TOEFL</option><option>PTE</option>
                </select>
              </Field>
              {profile.englishTestType !== "None" && (
                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {(["overall", "listening", "reading", "writing", "speaking"] as const).map((key) => (
                    <Field key={key} label={key.charAt(0).toUpperCase() + key.slice(1)}>
                      <input className={inputClass} type="number" step="0.5" value={profile.englishScore[key] ?? ""} onChange={(e) => patch({ englishScore: { ...profile.englishScore, [key]: e.target.value ? Number(e.target.value) : null } })} />
                    </Field>
                  ))}
                </div>
              )}
              {profile.englishTestType === "None" && <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-sm leading-6 text-slate-600">No score yet is completely fine. Your roadmap can include when to diagnose, prepare and sit the test.</div>}
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="flex items-start justify-between gap-4">
                <div><h2 className="font-semibold text-slate-950">Experiences</h2><p className="mt-1 text-sm text-slate-600">Add internships, jobs, projects, research or leadership. You can refine them later.</p></div>
                <button type="button" onClick={addExperience} className="shrink-0 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-medium text-white">+ Add</button>
              </div>
              <div className="mt-6 space-y-4">
                {profile.experiences.length === 0 && <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">No experience added yet. You can continue without one.</div>}
                {profile.experiences.map((experience) => (
                  <div key={experience.id} className="rounded-2xl border border-slate-200 p-4 sm:p-5">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Type"><select className={inputClass} value={experience.type} onChange={(e) => updateExperience(experience.id, { type: e.target.value as ExperienceType })}><option value="internship">Internship</option><option value="work">Work</option><option value="project">Project</option><option value="research">Research</option><option value="volunteer">Volunteer</option><option value="leadership">Leadership</option></select></Field>
                      <Field label="Title"><input className={inputClass} value={experience.title} onChange={(e) => updateExperience(experience.id, { title: e.target.value })} /></Field>
                      <Field label="Organisation"><input className={inputClass} value={experience.organisation} onChange={(e) => updateExperience(experience.id, { organisation: e.target.value })} /></Field>
                      <div className="sm:col-span-2"><Field label="What did you do / achieve?"><textarea className={`${inputClass} min-h-24`} value={experience.description} onChange={(e) => updateExperience(experience.id, { description: e.target.value })} /></Field></div>
                    </div>
                    <button type="button" onClick={() => removeExperience(experience.id)} className="mt-3 text-sm font-medium text-rose-600">Remove</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-7">
              <div><p className="text-sm font-medium text-slate-700">Which directions are you considering?</p><div className="mt-3 flex flex-wrap gap-2">{fields.map((item) => <ToggleChip key={item} label={item} active={profile.targetFields.includes(item)} onClick={() => toggleArray("targetFields", item)} />)}</div></div>
              <Field label="What do you currently imagine doing after graduation?"><textarea className={`${inputClass} min-h-28`} placeholder="It's okay if you're unsure. Tell us what attracts you and what you want to avoid." value={profile.careerGoal} onChange={(e) => patch({ careerGoal: e.target.value })} /></Field>
              <div><p className="text-sm font-medium text-slate-700">What matters most to you?</p><div className="mt-3 flex flex-wrap gap-2">{priorities.map((item) => <ToggleChip key={item} label={item} active={profile.priorities.includes(item)} onClick={() => toggleArray("priorities", item)} />)}</div></div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-7">
              <div><p className="text-sm font-medium text-slate-700">Countries you would consider</p><div className="mt-3 flex flex-wrap gap-2">{countries.map((item) => <ToggleChip key={item} label={item} active={profile.targetCountries.includes(item)} onClick={() => toggleArray("targetCountries", item)} />)}</div></div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Minimum total budget"><input className={inputClass} type="number" min={0} placeholder="e.g. 40000" value={profile.budgetMin ?? ""} onChange={(e) => patch({ budgetMin: e.target.value ? Number(e.target.value) : null })} /></Field>
                <Field label="Maximum total budget"><input className={inputClass} type="number" min={0} placeholder="e.g. 80000" value={profile.budgetMax ?? ""} onChange={(e) => patch({ budgetMax: e.target.value ? Number(e.target.value) : null })} /></Field>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5"><p className="font-medium text-slate-900">What happens next?</p><p className="mt-2 text-sm leading-6 text-slate-600">This portfolio becomes the source of truth for your future assessment, improvement roadmap, programme recommendations and application materials. You will be able to update it whenever your GPA, test score or experience changes.</p></div>
            </div>
          )}

          {error && <div className="mt-6 rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{error}</div>}

          <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
            <button type="button" disabled={step === 0} onClick={() => { setStep((current) => Math.max(0, current - 1)); setError(""); }} className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 disabled:opacity-30">Back</button>
            <button type="button" onClick={next} disabled={saving} className="rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-medium text-white disabled:opacity-60">{saving ? "Saving…" : step === steps.length - 1 ? "Save portfolio" : "Continue"}</button>
          </div>
        </section>
      </div>
    </main>
  );
}
