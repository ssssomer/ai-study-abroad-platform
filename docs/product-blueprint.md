# StudyPath Product Blueprint

## Product definition
StudyPath is an AI-powered end-to-end study abroad advisor and operating system. It should behave like a high-quality education agency counsellor from the student's first thought about studying abroad through career planning, profile building, country and programme selection, applications, offers, relocation and early career.

It is not primarily a university search tool and it is not a document-writing website.

The student should enter facts once, keep their profile updated, and let the system continuously analyse, recommend, plan and generate downstream work from the same source of truth.

## Core journey

1. DISCOVER — Should I study abroad and what am I trying to achieve?
2. PROFILE — What is my current background and evidence?
3. PLAN — Which career directions fit me and what must I improve?
4. SELECT — Which countries, universities and programmes form the right portfolio?
5. PREPARE — What tests, experiences, skills and documents do I need?
6. APPLY — Build application packages, CVs, statements and recommendations.
7. TRACK — Track submissions, offers, conditions, scholarships and enrolment.
8. PRE-DEPARTURE — Visa, housing, flights, banking, SIM, airport transfer and arrival.
9. CAREER — Internships, local CV, graduate programmes and job search.

## Central domain object: Student Profile

All downstream systems must read from StudentProfile rather than asking the student to re-enter the same facts.

StudentProfile should eventually contain:
- Personal information and age
- Current education level
- Institution
- Major
- GPA / WAM and grading scale
- Transcript and academic evidence
- English tests
- Internships
- Employment
- Research
- Projects
- Awards
- Clubs and extracurriculars
- Volunteering
- Leadership
- Skills
- Budget
- Target countries
- Migration preference
- Return-home employment preference
- Target industries and roles
- Work-style preferences
- Willingness to change field
- Willingness to take foundation / diploma / pathway programmes
- Ranking preference
- City preference
- Salary and career goals
- Documents

## Stage 1: Student Profile Report

After onboarding, generate a Student Profile Report with dimensions such as:
- Academic strength
- Quantitative background
- English readiness
- Work / internship experience
- Research / project evidence
- Technical skills
- Leadership evidence
- Career clarity
- Application readiness

The report must diagnose the highest-leverage problem instead of jumping directly to university recommendations.

Example insight:
> Your biggest constraint is not university choice. It is unclear career direction and insufficient relevant experience.

## Stage 2: Career direction analysis

Do not require the student to know their desired major first. Infer and compare plausible directions from their evidence and preferences.

Example directions:
- Finance
- Business Analytics
- Data Analytics
- Accounting
- Management
- Marketing
- Economics
- Information Systems
- Computer Science

For each direction, explain:
- What the field studies
- Who it suits
- Quantitative demand
- Programming demand
- Typical jobs
- Typical salary ranges by market when reliable data exists
- Future development paths
- Return-home employability
- Major destination-market employability
- Transferability to other careers
- Migration considerations where legally appropriate
- Competition level
- Preparation gaps

Recommendation labels should be qualitative, for example:
- Best fit
- Strong alternative
- Possible with preparation

## Stage 3: Long-term career pathway

For an accepted career direction, show a 3–5 year development pathway with:
- Education sequence
- Entry roles
- Mid-level roles
- Skills to build
- Target employers
- Certifications where relevant
- Internship strategy
- Salary progression when backed by credible current sources

The student should feel they are choosing a life and career pathway, not simply a degree.

## Stage 4: Country recommendation

Country fit is based on the Student Profile, career direction and constraints.

Compare trade-offs such as:
- Programme structure and duration
- Budget
- Employment market
- Industry opportunities
- Post-study work rules
- Migration considerations
- Language / cultural fit
- Ranking options

Any changing rules must be source-backed and display provenance / last verified date.

Country fit percentages, if shown, are heuristic fit scores, not statistical probabilities.

## Stage 5: University and programme recommendations

Only after career and country planning should the platform recommend programmes.

Portfolio categories:
- Reach
- Target
- Safe

Recommended programme card dimensions can include:
- Academic fit
- Career fit
- Cost fit
- Location fit
- Requirement match
- Overall recommendation
- Admissions competitiveness

Never present a fabricated exact acceptance probability. Use heuristic competitiveness labels or clearly labelled internal fit scores.

Every recommendation must explain WHY it is recommended.

## Stage 6: Recommended application portfolio

AI proposes a balanced portfolio, for example:
- 2 Reach
- 4 Target
- 2 Safe

The student can Accept Recommendation, edit it, or request a different risk / budget strategy.

Accepted programmes automatically become Application records.

## Stage 7: Application timeline

Generate a dependency-aware timeline based on selected programmes and student gaps.

Tasks may include:
- English preparation and test dates
- CV preparation
- Recommender selection
- Personal statements / essays
- Transcript requests
- School-specific forms
- Scholarship deadlines
- Application submissions

Dashboard should show counts such as:
- Applications
- Ready
- Missing documents
- Not started

## Stage 8: Application package

Each selected programme owns its own package, for example:
- CV
- Personal statement / SOP
- Academic statement
- Recommendation letters
- Transcript
- Passport
- English test
- Programme-specific requirements

Documents must be generated from verified Student Profile facts and school-specific requirements.

Never invent achievements, dates, roles, grades, awards or experiences.

## Stage 9: CV generation

Generate programme-specific CV versions from the same Student Profile.

Different programmes should emphasise different evidence rather than changing underlying facts.

## Stage 10: Personal statements and essays

Writing must incorporate:
- Verified student evidence
- Career direction
- Programme curriculum and strengths
- School-specific prompt
- Future career goals

Avoid generic reusable statements that could apply to any institution.

## Stage 11: Recommendation letters

Support recommender relationship types such as:
- Professor / teacher
- Manager
- Internship supervisor
- Research supervisor

The system should change evidence emphasis based on relationship while never fabricating what the recommender has observed.

## Stage 12: Application Audit

Before submission, automatically check:
- Date inconsistencies
- Conflicting education / employment facts
- Expiring English tests
- Missing programme-specific documents
- Wrong university or programme name
- Excessive content duplication
- Repeated wording across application materials
- Requirements not yet satisfied

Target state: Application Ready.

## Stage 13: Submission and human counsellor layer

Provide:
- Complete materials
- Checklist
- Official application link
- Deadline
- Submission guidance

Future business workflow can support:
- Submit with counsellor
- Human document review
- Human application handling

Students must approve consequential submissions and declarations.

## Post-offer and pre-departure

After an offer, the workspace should change phase and surface:
- Offer conditions
- Acceptance deadline
- Deposit
- CoE / equivalent enrolment documentation
- Visa preparation
- Insurance
- Housing
- Flights
- Airport transfer
- Bank setup
- SIM
- Orientation and arrival tasks

Tasks should unlock based on dependencies rather than appearing as a generic checklist.

## Career layer

Before and after arrival, continue supporting:
- Internship strategy
- Job discovery
- Local CV
- Interview preparation
- Graduate programmes
- Skill gap analysis
- Career progression

## Advisor behaviour

AI should always answer:
1. Where am I now?
2. What are my highest-impact gaps?
3. What should I do next?
4. Why does this action matter for my target pathway?

The product should prioritise the top 3 next actions instead of overwhelming students with every possible task.

## Dynamic replanning

Any meaningful Student Profile change should be able to trigger reassessment.

Examples:
- IELTS 6.0 → 7.0
- GPA 78 → 82
- New internship added
- New analytics project added
- Target country changed

The system should explain what changed in the student's positioning and update priorities, roadmap and programme recommendations.

## Information architecture

Primary navigation should reflect the journey rather than an arbitrary toolbox.

Suggested structure:
- Home / Today
- Profile
- Career Plan
- Improvement Plan
- Country & Programme Selection
- Application Portfolio
- Applications
- Offers
- Pre-departure
- Career

Secondary capabilities such as English, internships, skills, projects and documents should surface inside the relevant journey stage and can also have dedicated drill-down pages.

## Commercial tiers

Potential product model:

Free
- Profile
- Basic assessment
- Basic career guidance
- Limited programme recommendations

Planning
- Full career analysis
- Country comparison
- Programme portfolio
- Improvement roadmap

Application
- CV
- Statements
- Recommendation-letter assistance
- Application package and audit

Premium / Full Service
- AI + human counsellor
- School-selection review
- Document review
- Submission guidance / handling
- Post-offer and relocation support

## Non-negotiable product rules

- StudentProfile is the system of record for student facts.
- Do not ask for the same factual information repeatedly.
- AI recommendations must explain their reasoning in user-facing language.
- Current admissions, visa, work-rights, tuition, deadline and housing facts require source provenance and verification dates.
- Never invent student facts or institutional requirements.
- Admissions competitiveness must not be represented as an exact calibrated probability unless backed by real validated data.
- The experience should feel like an active counsellor guiding the next decision, not a library of disconnected tools.
