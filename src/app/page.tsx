import { ArrowRight, CheckCircle2, Compass, FileText, GraduationCap, Home, Sparkles } from "lucide-react";

const journey = [
  { icon: Compass, title: "探索方向", text: "从职业目标、国家选择和长期发展开始，而不是一上来就选学校。" },
  { icon: Sparkles, title: "提升背景", text: "诊断你的短板，并生成英语、实习、技能与项目提升计划。" },
  { icon: GraduationCap, title: "定国家与选校", text: "结合背景、预算和职业方向，形成冲刺、主申与保底组合。" },
  { icon: FileText, title: "准备申请", text: "围绕同一份学生档案准备 CV、文书、推荐信和申请材料。" },
  { icon: Home, title: "Offer 到落地", text: "继续跟进 Offer、签证、住宿、机票、接机和入境准备。" },
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
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#86928e]">AI 留学顾问</div>
            </div>
          </a>
          <div className="hidden items-center gap-8 text-sm text-[#5e706b] md:flex">
            <a href="#journey" className="hover:text-[#17362f]">如何使用</a>
            <a href="/dashboard" className="hover:text-[#17362f]">我的规划</a>
            <a href="/onboarding" className="rounded-full border border-[#d5d8d2] bg-white/70 px-5 py-2.5 font-semibold text-[#214b43] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">开始规划</a>
          </div>
        </nav>

        <section className="relative z-10 mx-auto grid max-w-7xl gap-14 px-6 pb-24 pt-16 lg:grid-cols-[1.03fr_.97fr] lg:px-8 lg:pb-32 lg:pt-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d7dfdb] bg-white/70 px-3.5 py-2 text-xs font-semibold text-[#55736b] shadow-sm backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              从产生留学想法，到申请、Offer 与落地，全流程规划
            </div>
            <h1 className="mt-7 text-5xl font-semibold leading-[1.05] tracking-[-0.04em] text-[#17362f] sm:text-6xl lg:text-7xl">
              不是帮你搜学校，<br />而是帮你把留学这件事规划清楚。
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-[#667772]">
              面向中国大陆学生的 AI 全流程留学顾问。先理解你的背景、职业方向和短板，再决定国家、专业、学校和申请策略。
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="/onboarding" className="group inline-flex items-center gap-2 rounded-full bg-[#214b43] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(33,75,67,.18)] transition hover:-translate-y-0.5 hover:bg-[#173b34]">
                建立我的留学档案 <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </a>
              <a href="/dashboard" className="inline-flex items-center rounded-full border border-[#d6d8d2] bg-white/75 px-6 py-3.5 text-sm font-semibold text-[#31564d] shadow-sm backdrop-blur transition hover:bg-white">
                查看规划工作台
              </a>
            </div>
            <div className="mt-10 grid max-w-xl gap-3 sm:grid-cols-3">
              {["背景诊断", "12 个月提升规划", "动态重新评估"].map((item) => (
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
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9ba49f]">你的留学规划工作台</p>
                  <h2 className="mt-1 text-lg font-semibold">早上好，Alex</h2>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e3efe9] text-sm font-bold text-[#2d6357]">A</div>
              </div>

              <div className="grid gap-4 p-5 sm:grid-cols-[1.18fr_.82fr]">
                <div className="rounded-[1.35rem] bg-[#214b43] p-5 text-white">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-medium text-white/60">当前申请准备度</p>
                      <p className="mt-2 text-4xl font-semibold tracking-tight">68<span className="text-xl text-white/45">/100</span></p>
                    </div>
                    <div className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium">背景提升中</div>
                  </div>
                  <div className="mt-8 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[68%] rounded-full bg-[#a6d0c4]" /></div>
                  <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
                    <div className="rounded-xl bg-white/[.07] p-3"><p className="text-white/50">当前优势</p><p className="mt-1 font-medium">学术背景</p></div>
                    <div className="rounded-xl bg-white/[.07] p-3"><p className="text-white/50">最需要提升</p><p className="mt-1 font-medium">相关经历</p></div>
                  </div>
                </div>

                <div className="rounded-[1.35rem] border border-[#ece9e1] bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#9ba49f]">当前第一优先级</p>
                  <p className="mt-3 text-base font-semibold leading-6">补足目标方向相关实习经历</p>
                  <p className="mt-2 text-sm leading-6 text-[#76837f]">你计划申请的项目更看重真实的分析、商业和项目证据。</p>
                  <div className="mt-4 rounded-xl bg-[#f3f5f0] px-3 py-2 text-xs font-medium text-[#55736b]">建议 21 天内启动</div>
                </div>
              </div>

              <div className="px-5 pb-5">
                <div className="rounded-[1.35rem] border border-[#ece9e1] bg-white p-5">
                  <div className="flex items-center justify-between">
                    <div><p className="text-xs text-[#9aa39f]">你的近期路线图</p><p className="mt-1 font-semibold">这个学期最值得做的事情</p></div>
                    <span className="rounded-full bg-[#edf4f0] px-3 py-1 text-xs font-medium text-[#4d756a]">3 个重点</span>
                  </div>
                  <div className="mt-4 space-y-3">
                    {[
                      ["01", "完成一次雅思 / PTE 诊断", "英语"],
                      ["02", "申请 15 个目标方向实习", "经历"],
                      ["03", "完成一个可展示的项目", "技能"],
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
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7c948d]">一条连续的留学链路</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.025em] sm:text-4xl">不只是申请，而是从现在开始规划整个留学路径。</h2>
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
