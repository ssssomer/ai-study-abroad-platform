const scores = [
  ["Academic", 82],
  ["English", 58],
  ["Experience", 46],
  ["Technical skills", 61],
  ["Career clarity", 52],
];

const priorities = [
  "Book an English test and set a target score",
  "Apply for 15 relevant internships this month",
  "Complete one portfolio project aligned with your target field",
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-medium text-slate-500">Your study abroad journey</p>
            <h1 className="mt-1 text-3xl font-semibold text-slate-950">Planning dashboard</h1>
          </div>
          <a href="/onboarding" className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-medium text-white">
            Update profile
          </a>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
          <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm text-slate-500">Overall readiness</p>
                <p className="mt-2 text-5xl font-semibold text-slate-950">68<span className="text-2xl text-slate-400">/100</span></p>
              </div>
              <span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">Building profile</span>
            </div>
            <div className="mt-8 space-y-4">
              {scores.map(([label, value]) => (
                <div key={label as string}>
                  <div className="mb-1 flex justify-between text-sm"><span>{label}</span><span>{value}</span></div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-slate-900" style={{ width: `${value}%` }} /></div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm font-medium text-slate-500">Next priorities</p>
            <h2 className="mt-1 text-xl font-semibold">What to do next</h2>
            <div className="mt-5 space-y-3">
              {priorities.map((item, index) => (
                <div key={item} className="flex gap-3 rounded-xl border border-slate-200 p-4">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm text-white">{index + 1}</div>
                  <p className="text-sm leading-6 text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="mt-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">12-month roadmap</p>
              <h2 className="mt-1 text-xl font-semibold">Your personalised plan</h2>
            </div>
            <a href="/roadmap" className="text-sm font-medium text-slate-700">Open roadmap →</a>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[['Now', 'Profile & English', 'Complete your baseline profile and English diagnostic.'], ['Next 3 months', 'Experience building', 'Target internships, technical skills and one strong project.'], ['6–12 months', 'University planning', 'Shortlist programmes and prepare application materials.']].map(([time, title, description]) => (
              <div key={time} className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{time}</p>
                <h3 className="mt-2 font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
