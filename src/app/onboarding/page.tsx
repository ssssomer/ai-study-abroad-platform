"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  CircleUserRound,
  GraduationCap,
  Languages,
  MapPinned,
  Plus,
  Sparkles,
  Target,
  Trash2,
} from "lucide-react";
import { loadStudentProfile, saveStudentProfile } from "@/lib/profile-store";
import { emptyStudentProfile, Experience, ExperienceType, StudentProfile } from "@/types/student";

const stepMeta = [
  { title: "About you", kicker: "Foundation", description: "Tell us where you are now so we can understand the context behind your profile.", icon: CircleUserRound },
  { title: "Academics", kicker: "Academic strength", description: "Add your current academic standing. We will assess it in context, not in isolation.", icon: GraduationCap },
  { title: "English", kicker: "Language readiness", description: "Share your current score, or tell us you have not taken a test yet.", icon: Languages },
  { title: "Experience", kicker: "Evidence", description: "Internships, research, projects and leadership all help us see what you can already prove.", icon: BriefcaseBusiness },
  { title: "Career direction", kicker: "Future fit", description: "You do not need to know the exact job yet. Tell us what attracts you and what matters most.", icon: Target },
  { title: "Study preferences", kicker: "Constraints", description: "Country preferences and budget help us keep your future recommendations realistic.", icon: MapPinned },
];

const countries = ["Australia", "United Kingdom", "United States", "Canada", "Singapore", "Hong Kong"];
const fields = ["Finance", "Business Analytics", "Data", "Consulting", "Management", "Marketing", "Computer Science", "Engineering"];
const priorities = ["Career growth", "Salary", "University reputation", "Immigration", "Work-life balance", "Return-home employment"];

const inputClass = "w-full rounded-2xl border border-[#dedfd8] bg-[#fffefb] px-4 py-3.5 text-sm text-[#17362f] outline-none transition placeholder:text-[#a5aaa6] focus:border-[#6f9b90] focus:ring-4 focus:ring-[#dfeee8]/70";

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center justify-between gap-3 text-sm font-semibold text-[#31564d]">
        {label}{hint && <span className="text-xs font-normal text-[#98a29e]">{hint}</span>}
      </span>
      {children}
    </label>
  );
}

function Chip({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className={`rounded-full border px-4 py-2.5 text-sm font-medium transition ${active ? "border-[#2f6b5f] bg-[#2f6b5f] text-white shadow-sm" : "border-[#dcddd6] bg-[#fffefb] text-[#5f716b] hover:border-[#93aaa3] hover:text-[#31564d]"}`}>
      {active && <Check className="mr-1.5 inline h-3.5 w-3.5" />}{label}
    </button>
  );
}

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<StudentProfile>(emptyStudentProfile);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => { loadStudentProfile().then((saved) => saved && setProfile(saved)); }, []);

  const progress = useMemo(() => Math.round(((step + 1) / stepMeta.length) * 100), [step]);
  const current = stepMeta[step];

  function patch(values: Partial<StudentProfile>) { setProfile((p) => ({ ...p, ...values })); setError(""); }
  function toggleArray(key: "targetFields" | "priorities" | "targetCountries", value: string) {
    const currentValues = profile[key];
    patch({ [key]: currentValues.includes(value) ? currentValues.filter((item) => item !== value) : [...currentValues, value] } as Partial<StudentProfile>);
  }

  function validateCurrentStep() {
    if (step === 0 && (!profile.fullName.trim() || !profile.currentCountry.trim() || !profile.currentUniversity.trim() || !profile.degreeLevel || !profile.major.trim() || !profile.yearOfStudy || !profile.graduationDate)) return "Complete the required profile fields before continuing.";
    if (step === 1 && (profile.gpa === null || profile.gpaScale === null || profile.gpa < 0 || profile.gpaScale <= 0 || profile.gpa > profile.gpaScale)) return "Enter a valid GPA / average and maximum scale.";
    if (step === 2 && profile.englishTestType !== "None" && (profile.englishScore.overall === null || profile.englishScore.overall === undefined)) return "Add your overall English test score.";
    if (step === 4 && profile.targetFields.length === 0) return "Choose at least one direction you are considering.";
    if (step === 5 && profile.targetCountries.length === 0) return "Choose at least one country you would consider.";
    if (step === 5 && profile.budgetMin !== null && profile.budgetMax !== null && profile.budgetMin > profile.budgetMax) return "Minimum budget cannot exceed maximum budget.";
    return "";
  }

  async function next() {
    const issue = validateCurrentStep();
    if (issue) return setError(issue);
    if (step < stepMeta.length - 1) { setStep((s) => s + 1); window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    setSaving(true);
    try { await saveStudentProfile(profile); router.push("/dashboard"); }
    catch { setError("We could not save your profile. Your browser copy is still preserved."); }
    finally { setSaving(false); }
  }

  function addExperience() {
    const item: Experience = { id: crypto.randomUUID(), type: "internship", title: "", organisation: "", description: "" };
    patch({ experiences: [...profile.experiences, item] });
  }
  function updateExperience(id: string, values: Partial<Experience>) { patch({ experiences: profile.experiences.map((x) => x.id === id ? { ...x, ...values } : x) }); }
  function removeExperience(id: string) { patch({ experiences: profile.experiences.filter((x) => x.id !== id) }); }

  return (
    <main className="min-h-screen bg-[#f7f5ef]">
      <div className="grid min-h-screen lg:grid-cols-[330px_1fr]">
        <aside className="hidden border-r border-[#e4e2da] bg-[#214b43] px-7 py-8 text-white lg:flex lg:flex-col">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-sm font-bold">S</div>
            <div><p className="text-sm font-semibold">StudyPath</p><p className="text-[10px] uppercase tracking-[0.24em] text-white/45">AI advisor</p></div>
          </a>

          <div className="mt-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">Build your portfolio</p>
            <div className="mt-5 space-y-1.5">
              {stepMeta.map(({ title, icon: Icon }, index) => {
                const active = index === step; const done = index < step;
                return (
                  <button key={title} type="button" onClick={() => done && setStep(index)} className={`flex w-full items-center gap-3 rounded-2xl px-3.5 py-3 text-left transition ${active ? "bg-white text-[#214b43] shadow-lg" : done ? "text-white/85 hover:bg-white/10" : "text-white/40"}`}>
                    <div className={`flex h-8 w-8 items-center justify-center rounded-xl ${active ? "bg-[#e4efe9]" : done ? "bg-white/10" : "bg-white/[.05]"}`}>
                      {done ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                    </div>
                    <span className="text-sm font-medium">{title}</span>
                    {active && <ChevronRight className="ml-auto h-4 w-4" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-auto rounded-[1.4rem] bg-white/[.07] p-5">
            <Sparkles className="h-5 w-5 text-[#a9d1c5]" />
            <p className="mt-3 text-sm font-semibold">Why this matters</p>
            <p className="mt-2 text-xs leading-5 text-white/55">Your portfolio becomes the single source of truth for future advice, university matching, applications and career planning.</p>
          </div>
        </aside>

        <section className="relative px-4 py-5 sm:px-8 lg:px-12 lg:py-8">
          <div className="mx-auto max-w-5xl">
            <div className="flex items-center justify-between gap-4 lg:hidden">
              <a href="/" className="text-sm font-semibold text-[#31564d]">StudyPath</a>
              <span className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-[#6f7e79] shadow-sm">{step + 1} / {stepMeta.length}</span>
            </div>

            <div className="mt-7 flex items-end justify-between gap-5 lg:mt-1">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#81968f]">{current.kicker}</p>
                <h1 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-[#17362f] sm:text-4xl">{current.title}</h1>
                <p className="mt-3 max-w-xl text-sm leading-6 text-[#75837f]">{current.description}</p>
              </div>
              <div className="hidden text-right sm:block"><p className="text-xs font-medium text-[#9aa39f]">Profile completion</p><p className="mt-1 text-2xl font-semibold text-[#31564d]">{progress}%</p></div>
            </div>

            <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-[#e4e4dc]"><div className="h-full rounded-full bg-[#4b8174] transition-all duration-500" style={{ width: `${progress}%` }} /></div>

            <div className="mt-7 rounded-[2rem] border border-[#e5e2d9] bg-[#fffdf8] p-5 shadow-[0_18px_55px_rgba(42,66,59,.07)] sm:p-7 lg:p-9">
              {step === 0 && (
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full name"><input className={inputClass} placeholder="Your full name" value={profile.fullName} onChange={(e) => patch({ fullName: e.target.value })} /></Field>
                  <Field label="Current country"><input className={inputClass} placeholder="e.g. China" value={profile.currentCountry} onChange={(e) => patch({ currentCountry: e.target.value })} /></Field>
                  <Field label="University / institution"><input className={inputClass} placeholder="Your current institution" value={profile.currentUniversity} onChange={(e) => patch({ currentUniversity: e.target.value })} /></Field>
                  <Field label="Degree level"><select className={inputClass} value={profile.degreeLevel} onChange={(e) => patch({ degreeLevel: e.target.value })}><option value="">Select degree level</option><option>Bachelor</option><option>Master</option><option>Diploma</option><option>High school</option><option>Other</option></select></Field>
                  <Field label="Major"><input className={inputClass} placeholder="e.g. Finance" value={profile.major} onChange={(e) => patch({ major: e.target.value })} /></Field>
                  <Field label="Year of study"><input className={inputClass} type="number" min={1} max={8} placeholder="3" value={profile.yearOfStudy ?? ""} onChange={(e) => patch({ yearOfStudy: e.target.value ? Number(e.target.value) : null })} /></Field>
                  <Field label="Expected graduation"><input className={inputClass} type="month" value={profile.graduationDate.slice(0, 7)} onChange={(e) => patch({ graduationDate: e.target.value ? `${e.target.value}-01` : "" })} /></Field>
                </div>
              )}

              {step === 1 && (
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Current GPA / average" hint="Current result"><input className={inputClass} type="number" step="0.01" placeholder="78" value={profile.gpa ?? ""} onChange={(e) => patch({ gpa: e.target.value ? Number(e.target.value) : null })} /></Field>
                  <Field label="Maximum / scale" hint="e.g. 100 or 4.0"><input className={inputClass} type="number" step="0.01" placeholder="100" value={profile.gpaScale ?? ""} onChange={(e) => patch({ gpaScale: e.target.value ? Number(e.target.value) : null })} /></Field>
                  <div className="sm:col-span-2 rounded-2xl bg-[#f2f5f1] p-5 text-sm leading-6 text-[#6d7d78]"><span className="font-semibold text-[#31564d]">Context matters.</span> Later we can add transcript upload, subject difficulty and institution context so the system does not treat one number as your entire academic profile.</div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <Field label="English test"><select className={inputClass} value={profile.englishTestType} onChange={(e) => patch({ englishTestType: e.target.value as StudentProfile["englishTestType"], englishScore: {} })}><option>None</option><option>IELTS</option><option>TOEFL</option><option>PTE</option></select></Field>
                  {profile.englishTestType === "None" ? <div className="mt-5 rounded-2xl bg-[#f2f5f1] p-5 text-sm leading-6 text-[#6d7d78]">No test yet is completely fine. Your future roadmap can include diagnostic timing, preparation milestones and a recommended first test date.</div> : (
                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{(["overall", "listening", "reading", "writing", "speaking"] as const).map((key) => <Field key={key} label={key[0].toUpperCase() + key.slice(1)}><input className={inputClass} type="number" step="0.5" value={profile.englishScore[key] ?? ""} onChange={(e) => patch({ englishScore: { ...profile.englishScore, [key]: e.target.value ? Number(e.target.value) : null } })} /></Field>)}</div>
                  )}
                </div>
              )}

              {step === 3 && (
                <div>
                  <div className="flex flex-wrap items-start justify-between gap-4"><div><h2 className="text-lg font-semibold">Your evidence so far</h2><p className="mt-1 text-sm text-[#7b8984]">Add anything that shows what you have done, built, researched or led.</p></div><button type="button" onClick={addExperience} className="inline-flex items-center gap-2 rounded-full bg-[#214b43] px-4 py-2.5 text-sm font-semibold text-white"><Plus className="h-4 w-4" /> Add experience</button></div>
                  <div className="mt-6 space-y-4">
                    {profile.experiences.length === 0 && <button type="button" onClick={addExperience} className="w-full rounded-[1.4rem] border border-dashed border-[#cfd4cf] bg-[#fbfaf6] p-10 text-center transition hover:border-[#7e9c94] hover:bg-white"><BriefcaseBusiness className="mx-auto h-6 w-6 text-[#789087]" /><p className="mt-3 text-sm font-semibold text-[#31564d]">Add your first experience</p><p className="mt-1 text-xs text-[#94a09c]">Internship, work, project, research, volunteering or leadership</p></button>}
                    {profile.experiences.map((experience) => (
                      <div key={experience.id} className="rounded-[1.4rem] border border-[#e4e2da] bg-white p-5">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <Field label="Type"><select className={inputClass} value={experience.type} onChange={(e) => updateExperience(experience.id, { type: e.target.value as ExperienceType })}><option value="internship">Internship</option><option value="work">Work</option><option value="project">Project</option><option value="research">Research</option><option value="volunteer">Volunteer</option><option value="leadership">Leadership</option></select></Field>
                          <Field label="Title"><input className={inputClass} placeholder="e.g. Finance Intern" value={experience.title} onChange={(e) => updateExperience(experience.id, { title: e.target.value })} /></Field>
                          <Field label="Organisation"><input className={inputClass} placeholder="Organisation / company" value={experience.organisation} onChange={(e) => updateExperience(experience.id, { organisation: e.target.value })} /></Field>
                          <div className="sm:col-span-2"><Field label="What did you do or achieve?"><textarea className={`${inputClass} min-h-28 resize-y`} placeholder="Focus on responsibilities, outcomes and evidence." value={experience.description} onChange={(e) => updateExperience(experience.id, { description: e.target.value })} /></Field></div>
                        </div>
                        <button type="button" onClick={() => removeExperience(experience.id)} className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#a35f59]"><Trash2 className="h-3.5 w-3.5" /> Remove</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-8">
                  <div><p className="text-sm font-semibold text-[#31564d]">Which directions are you considering?</p><div className="mt-3 flex flex-wrap gap-2">{fields.map((item) => <Chip key={item} label={item} active={profile.targetFields.includes(item)} onClick={() => toggleArray("targetFields", item)} />)}</div></div>
                  <Field label="What do you currently imagine doing after graduation?"><textarea className={`${inputClass} min-h-32 resize-y`} placeholder="It is okay to be unsure. Tell us what kinds of work interest you, what you enjoy, and what you want to avoid." value={profile.careerGoal} onChange={(e) => patch({ careerGoal: e.target.value })} /></Field>
                  <div><p className="text-sm font-semibold text-[#31564d]">What matters most?</p><div className="mt-3 flex flex-wrap gap-2">{priorities.map((item) => <Chip key={item} label={item} active={profile.priorities.includes(item)} onClick={() => toggleArray("priorities", item)} />)}</div></div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-8">
                  <div><p className="text-sm font-semibold text-[#31564d]">Countries you would genuinely consider</p><div className="mt-3 flex flex-wrap gap-2">{countries.map((item) => <Chip key={item} label={item} active={profile.targetCountries.includes(item)} onClick={() => toggleArray("targetCountries", item)} />)}</div></div>
                  <div className="grid gap-5 sm:grid-cols-2"><Field label="Minimum total budget"><input className={inputClass} type="number" min={0} placeholder="e.g. 40000" value={profile.budgetMin ?? ""} onChange={(e) => patch({ budgetMin: e.target.value ? Number(e.target.value) : null })} /></Field><Field label="Maximum total budget"><input className={inputClass} type="number" min={0} placeholder="e.g. 80000" value={profile.budgetMax ?? ""} onChange={(e) => patch({ budgetMax: e.target.value ? Number(e.target.value) : null })} /></Field></div>
                  <div className="rounded-2xl border border-[#e2e6e1] bg-[#f2f6f3] p-5"><div className="flex gap-3"><Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-[#527a70]" /><div><p className="text-sm font-semibold text-[#31564d]">Next: your profile diagnosis</p><p className="mt-1 text-sm leading-6 text-[#73827d]">Once your portfolio is complete, the platform will be able to identify gaps, prioritise improvements and build your personalised roadmap.</p></div></div></div>
                </div>
              )}

              {error && <div className="mt-6 rounded-2xl border border-[#efd2cc] bg-[#fff4f1] px-4 py-3 text-sm font-medium text-[#9a574e]">{error}</div>}

              <div className="mt-9 flex items-center justify-between border-t border-[#ebe8df] pt-6">
                <button type="button" disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))} className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-[#687873] transition hover:bg-[#f1f2ed] disabled:invisible"><ArrowLeft className="h-4 w-4" /> Back</button>
                <button type="button" onClick={next} disabled={saving} className="group inline-flex items-center gap-2 rounded-full bg-[#214b43] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(33,75,67,.15)] transition hover:-translate-y-0.5 hover:bg-[#173b34] disabled:opacity-60">{step === stepMeta.length - 1 ? (saving ? "Saving..." : "Complete portfolio") : "Continue"}<ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
