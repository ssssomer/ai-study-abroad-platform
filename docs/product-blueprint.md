# StudyPath 产品蓝图

## 产品定义
StudyPath 是一个面向中国大陆学生的 AI 全流程留学规划与申请平台。它不是一个“帮学生搜学校”的网站，也不是一个“AI 写文书”的工具，而应该像一名优秀的留学顾问一样，从学生第一次产生留学想法开始，一直陪伴到职业方向、背景提升、国家和专业选择、选校、申请、Offer、签证、住宿、落地和早期职业发展。

默认产品语言为简体中文。代码、数据库字段和内部工程命名继续使用英文。

## 主要用户
主要服务中国大陆申请者，包括本科阶段考虑海外硕士、本科申请、转专业申请、以及需要长期背景提升规划的学生。

产品需要理解大陆申请者常见语境：
- 中国大陆高校与院校背景
- GPA、百分制均分、加权均分、专业排名
- 985 / 211 / 双一流等背景标签，但不得把这些标签当成决定录取的唯一规则
- 雅思、托福、PTE
- QS / Times / US News 等排名偏好
- 回国就业与雇主认可度
- 海外就业机会
- 移民倾向
- 人民币预算与家庭决策
- 转专业
- Foundation / Diploma / Pathway 接受度
- 国内实习、科研、竞赛、社团、志愿者和项目经历

## 核心旅程

1. DISCOVER 探索 — 我为什么想留学？留学是否适合我？
2. PROFILE 画像 — 我现在是什么背景？
3. PLAN 规划 — 哪些职业和专业方向适合我？我还缺什么？
4. SELECT 定方向与选校 — 哪些国家、专业和学校最适合我？
5. PREPARE 准备 — 我要补英语、实习、技能、项目和哪些材料？
6. APPLY 申请 — 建立申请组合，准备 CV、文书、推荐信和材料。
7. TRACK 跟进 — 跟踪提交、补件、Offer、条件、奖学金与入学。
8. PRE-DEPARTURE 行前 — 签证、住宿、机票、银行卡、电话卡、接机与落地。
9. CAREER 职业 — 实习、本地 CV、Graduate Program 和求职。

## 核心对象：Student Profile
所有功能围绕同一份 Student Profile 展开。学生的信息只输入一次，后续 AI 分析、规划、选校和申请全部复用。

Student Profile 最终应包含：
- 基本信息与年龄
- 当前学历
- 学校
- 专业
- GPA / WAM / 均分 / grading scale
- 成绩单与课程证据
- 英语考试
- 实习
- 工作经历
- Research
- Projects
- Awards
- 社团与 extracurriculars
- Volunteer
- Leadership
- Skills
- Budget
- Target countries
- 是否考虑移民
- 是否考虑回国就业
- 目标行业和职位
- 工作偏好
- 是否接受转专业
- 是否接受 foundation / diploma / pathway
- 排名偏好
- 城市偏好
- 薪资与职业目标
- Documents

## 第一阶段：Student Profile Report 背景诊断
学生完成档案后，不直接推荐学校，而是先生成背景诊断：
- 学术背景
- 定量基础
- 英语准备度
- 实习 / 工作经历
- Research / Project 证据
- Technical skills
- Leadership
- Career clarity
- Application readiness

系统必须指出最大瓶颈，例如：
> 你现在最大的问题不是选校，而是职业方向不够清晰，并且缺少目标方向相关经历。

院校背景、985/211/双一流、均分等可以作为分析维度，但必须明确这是背景信息和启发式判断，不得伪装成精确录取规则。

## 第二阶段：职业与专业方向分析
不要要求学生一开始就知道自己想读什么专业。系统应该根据学生背景、兴趣、职业目标和限制反向推荐方向，例如：
- Finance
- Business Analytics
- Data Analytics
- Accounting
- Management
- Marketing
- Economics
- Information Systems
- Computer Science

中文 UI 使用：
- 最匹配
- 强备选
- 需要补充准备

每个方向解释：学什么、适合谁、数学要求、编程要求、典型岗位、回国就业、海外就业、职业迁移能力、竞争程度、移民考虑和准备缺口。

## 第三阶段：长期发展路径
学生选定方向后，展示 3–5 年发展路径，包括教育路径、入门岗位、中期岗位、技能、目标雇主、证书、实习策略和有可靠数据支持时的薪资变化。

学生应该感受到自己是在选择人生和职业路径，而不是简单选一个 degree。

## 第四阶段：国家选择
结合 Student Profile、职业方向和现实限制比较：
- 学制
- 预算
- 就业市场
- 行业机会
- Post-study work
- 移民考虑
- 语言与文化适应
- 排名与学校选择
- 回国认可度

所有会变化的政策必须有来源和最后核验时间。

## 第五阶段：国家、专业与学校推荐
只在职业方向和国家分析完成后进入选校。

中文组合：
- 冲刺
- 主申
- 保底

推荐卡可展示：
- Academic fit
- Career fit
- Cost fit
- Location fit
- Requirement match
- Overall recommendation
- Admissions competitiveness

不要展示虚假的精确录取概率。除非未来拥有经过验证的真实录取数据模型，否则只能展示启发式竞争力和 fit score。

排名只是一个维度。系统必须解释 QS 排名、项目质量、雇主认可、城市、预算和职业匹配之间的 trade-off，而不是自动追求最高 QS。

## 第六阶段：Recommended Application Portfolio
AI 自动提出平衡的申请组合，例如 2 冲刺 + 4 主申 + 2 保底。学生可接受、修改或要求更激进/更保守/更低预算方案。接受后自动进入 Applications。

## 第七阶段：申请时间线
根据项目截止时间和学生缺口生成依赖关系明确的 timeline，包括英语、CV、推荐人、文书、成绩单、学校表格、奖学金和提交时间。

## 第八阶段：Application Package
每一个 programme 有独立申请包：CV、PS/SOP、Academic Statement、RL、Transcript、Passport、English Test、学校专属材料。

所有生成内容只能使用经过确认的 Student Profile 事实，不得虚构。

## 第九阶段：Application Audit
正式提交前检查：日期冲突、教育/工作经历矛盾、英语成绩过期、缺少材料、学校或专业名称错误、文书重复、未满足 requirement 等。

目标状态：Application Ready。

## Offer 与行前
拿到 Offer 后，平台自动切换阶段，显示 Offer 条件、接受截止、押金、CoE/入学文件、签证、保险、住宿、机票、接机、银行、SIM 和 Orientation。

## Career
到达海外前后继续支持：实习策略、职位搜索、本地 CV、面试、Graduate Program、技能缺口和长期职业发展。

## AI 顾问行为
任何时候都要优先回答：
1. 我现在是什么背景？
2. 我最大的短板是什么？
3. 我现在最应该做什么？
4. 为什么这件事会影响我的目标？

Dashboard 默认只强调最重要的 3 个下一步，而不是把所有任务同时扔给学生。

## 动态重新规划
IELTS、GPA、新实习、新项目、目标国家、预算或职业偏好发生变化后，系统应重新评估并解释“你的定位发生了什么变化”。

## 中文网站信息架构
主导航建议：
- 首页 / 今日规划
- 我的档案
- 职业与专业方向
- 背景提升计划
- 国家与选校
- 申请组合
- 我的申请
- Offer
- 行前准备
- 职业发展

英语、实习、技能、项目、文档等作为对应阶段的二级模块存在，而不是全部并列成一级菜单。

## 商业模式
免费版：档案、基础背景诊断、基础职业方向建议、有限选校推荐。
规划版：完整职业分析、国家对比、专业与选校组合、背景提升路线图。
申请版：CV、文书、推荐信辅助、Application Package 和 Audit。
Premium / Full Service：AI + 真人顾问、定校审核、文书修改、申请指导/代办、Offer 后与落地服务。

## 不可妥协的规则
- StudentProfile 是学生事实的唯一系统记录。
- 同一个事实不要反复要求学生填写。
- AI 推荐必须向学生解释为什么。
- 招生要求、签证、工作权利、学费、截止日期和住宿等动态信息必须有来源和核验日期。
- 永远不能编造学生经历或学校 requirement。
- 不得把启发式录取竞争力包装成精确录取概率。
- 整个体验必须像一个主动带着学生往前走的留学顾问，而不是一堆彼此割裂的工具。
