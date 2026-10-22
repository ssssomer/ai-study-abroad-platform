const stages = [
  ["Profile", "Build your academic, experience and career portfolio"],
  ["Plan", "Get a personalised 12-month improvement roadmap"],
  ["Prepare", "Improve English, skills, internships and projects"],
  ["Select", "Choose countries, universities and programmes"],
  ["Apply", "Prepare CV, essays, references and applications"],
  ["Arrive", "Manage offer, visa, housing and relocation"],
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            AI study abroad & career planning
          </p>
          <h1 className="text-5xl font-semibold tracking-tight text-slate-950 md:text-6xl">
            Plan your entire study abroad journey in one place.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Build your profile once. Get personalised advice on what to improve, when to take English tests,
            which internships and skills matter, when to shortlist universities, and how to move from planning
            to application, offer and relocation.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="rounded-xl bg-slate-950 px-5 py-3 font-medium text-white" href="/onboarding">
              Build my profile
            </a>
            <a className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-medium" href="/dashboard">
              View demo dashboard
            </a>
          </div>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {stages.map(([title, description], index) => (
            <div key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-medium text-slate-400">0{index + 1}</div>
              <h2 className="mt-3 text-xl font-semibold text-slate-900">{title}</h2>
              <p className="mt-2 leading-7 text-slate-600">{description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
