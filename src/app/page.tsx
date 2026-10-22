import { ArrowRight, CheckCircle2, Compass, FileText, GraduationCap, Home, Sparkles } from "lucide-react";

const journey = [
  { icon: Compass, title: "Discover", text: "Clarify career direction, country fit and long-term goals." },
  { icon: Sparkles, title: "Build", text: "Turn your profile gaps into a personalised improvement plan." },
  { icon: GraduationCap, title: "Select", text: "Build a balanced university and programme portfolio." },
  { icon: FileText, title: "Apply", text: "Prepare applications, essays, CVs and references." },
  { icon: Home, title: "Arrive", text: "Move from offer to visa, housing and relocation." },
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f5ef] text-[#17362f]">
      <div className="relative">
        <div className="absolute -left-36 -top-36 h-[32rem] w-[32rem] rounded-full bg-[#dbeae4] blur-3xl" />
        <div className="absolute right-[-12rem] top-24 h-[30rem] w-[30rem] rounded-full bg-[#efe2cc] blur-3xl" />

        <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#214b43] text-sm font-semibold text-white shadow-sm">S</div>
            <div>
              <div className="text-sm font-semibold tracking-tight">StudyPath</div>
              <div className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#86928e]">AI advisor</div>
            </div>
          </a>
          <div className="hidden items-center gap-8 text-sm text-[#5e706b] md:flex">
            <a href="#journey" className="hover:text-[#17362f]">How it works</a>
            <a href="/dashboard" className="hover:text-[#17362f]">Dashboard</a>
            <a href="/onboarding" className="rounded-full border border-[#d5d8d2] bg-white/70 px-5 py-2.5 font-semibold text-[#214b43] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">Start planning</a>
          </div>
        </nav>

        <section className="relative z-10 mx-auto grid max-w-7xl gap-14 px-6 pb-24 pt-16 lg:grid-cols-[1.03fr_.97fr] lg:px-8 lg:pb-32 lg:pt-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d7dfdb] bg-white/70 px-3.5 py-2 text-xs font-semibold text-[#55736b] shadow-sm backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              Your study abroad journey, planned end to end
            </div>
            <h1 className="mt-7 text-5xl font-semibold leading-[1.04] tracking-[-0.04em] text-[#17362f] sm:text-6xl lg:text-7xl">
              Build the profile that gets you where you want to go.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-[#667772]">
              One intelligent planning workspace for profile building, English, internships, university selection, applications, offers and relocation.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="/onboarding" className="group inline-flex items-center gap-2 rounded-full bg-[#214b43] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(33,75,67,.18)] transition hover:-translate-y-0.5 hover:bg-[#173b34]">
                Build my portfolio <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </a>
              <a href="/dashboard" className="inline-flex items-center rounded-full border border-[#d6d8d2] bg-white/75 px-6 py-3.5 text-sm font-semibold text-[#31564d] shadow-sm backdrop-blur transition hover:bg-white">
                Explore dashboard
              </a>
            </div>
            <div className="mt-10 grid max-w-xl gap-3 sm:grid-cols-3">
              {["Profile diagnosis", "12-month roadmap", "Dynamic replanning"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-[#6c7e79]">
                  <CheckCircle2 className="h-4 w-4 text-[#4f8577]" /> {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative lg:pt-6">
            <div className="absolute -inset-5 rounded-[2.4rem] bg-white/45 blur-xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-[#fffdf8] shadow-[0_30px_80px_rgba(39,66,58,.12)]">
              <div className="flex items-center justify-between border-b border-[#ece9e1] px-6 py-5">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9ba49f]">Planning workspace</p>
                  <h2 className="mt-1 text-lg font-semibold">Good morning, Alex</h2>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e3efe9] text-sm font-bold text-[#2d6357]">A</div>
              </div>

              <div className="grid gap-4 p-5 sm:grid-cols-[1.18fr_.82fr]">
                <div className="rounded-[1.35rem] bg-[#214b43] p-5 text-white">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-medium text-white/60">Profile readiness</p>
                      <p className="mt-2 text-4xl font-semibold tracking-tight">68<span className="text-xl text-white/45">/100</span></p>
                    </div>
                    <div className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium">Building</div>
                  </div>
                  <div className="mt-8 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[68%] rounded-full bg-[#a6d0c4]" /></div>
                  <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
                    <div className="rounded-xl bg-white/[.07] p-3"><p className="text-white/50">Strongest</p><p className="mt-1 font-medium">Academics</p></div>
                    <div className="rounded-xl bg-white/[.07] p-3"><p className="text-white/50">Focus next</p><p className="mt-1 font-medium">Experience</p></div>
                  </div>
                </div>

                <div className="rounded-[1.35rem] border border-[#ece9e1] bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#9ba49f]">Next priority</p>
                  <p className="mt-3 text-base font-semibold leading-6">Build relevant internship experience</p>
                  <p className="mt-2 text-sm leading-6 text-[#76837f]">Your target programmes value evidence of applied analytical work.</p>
                  <div className="mt-4 rounded-xl bg-[#f3f5f0] px-3 py-2 text-xs font-medium text-[#55736b]">Due in 21 days</div>
                </div>
              </div>

              <div className="px-5 pb-5">
                <div className="rounded-[1.35rem] border border-[#ece9e1] bg-white p-5">
                  <div className="flex items-center justify-between">
                    <div><p className="text-xs text-[#9aa39f]">Your roadmap</p><p className="mt-1 font-semibold">What matters this semester</p></div>
                    <span className="rounded-full bg-[#edf4f0] px-3 py-1 text-xs font-medium text-[#4d756a]">3 priorities</span>
                  </div>
                  <div className="mt-4 space-y-3">
                    {[
                      ["01", "Book IELTS diagnostic", "English"],
                      ["02", "Apply to 15 analytics internships", "Experience"],
                      ["03", "Complete SQL portfolio project", "Skills"],
                    ].map(([n, title, tag]) => (
                      <div key={n} className="flex items-center gap-3 rounded-xl bg-[#faf9f5] px-3.5 py-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-xs font-semibold text-[#52756d] shadow-sm">{n}</div>
                        <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{title}</p><p className="mt-0.5 text-xs text-[#98a19e]">{tag}</p></div>
                        <ArrowRight className="h-4 w-4 text-[#a7afac]" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section id="journey" className="border-y border-[#e6e2d8] bg-[#fffdf8]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7c948d]">One continuous journey</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.025em] sm:text-4xl">Not just applications. Your whole plan.</h2>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-5">
            {journey.map(({ icon: Icon, title, text }, index) => (
              <div key={title} className="group rounded-[1.4rem] border border-[#e9e5dc] bg-[#faf8f2] p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e3eee9] text-[#38695e]"><Icon className="h-5 w-5" /></div>
                  <span className="text-xs font-semibold text-[#b1b5b1]">0{index + 1}</span>
                </div>
                <h3 className="mt-5 font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#78847f]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
