# AI Study Abroad Platform — Codex Instructions

## Product vision
Build an AI-powered end-to-end study abroad advisor and operating system. The platform should behave like a strong education-agency counsellor from the moment a student begins considering studying abroad through profile building, career planning, country and programme selection, applications, offers, relocation, housing, and early-career preparation.

This is NOT primarily a university search product and NOT a document-writing website.

Read `docs/product-blueprint.md` before implementing any major product feature.

## Core journey
The product journey is:
1. DISCOVER — Should I study abroad and what am I trying to achieve?
2. PROFILE — What is my current background and evidence?
3. PLAN — Which career directions fit me and what must I improve?
4. SELECT — Which countries, universities and programmes form the right portfolio?
5. PREPARE — What tests, experiences, skills and documents do I need?
6. APPLY — Build application packages, CVs, statements and recommendations.
7. TRACK — Track submissions, offers, conditions, scholarships and enrolment.
8. PRE-DEPARTURE — Visa, housing, flights, banking, SIM, airport transfer and arrival.
9. CAREER — Internships, local CV, graduate programmes and job search.

Navigation and dashboards should reflect this journey instead of feeling like a disconnected toolbox.

## Current milestone
The first stable product milestone focuses on:
1. Student onboarding and portfolio creation
2. Student Profile Report / background assessment
3. Career direction analysis
4. 12-month improvement roadmap
5. Task tracking and progress
6. Dashboard summarising readiness, strengths, gaps and top next actions

Later stages should be added in journey order without breaking the StudentProfile model.

## Stack
- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase Auth + Postgres + Storage
- OpenAI API for structured planning and assessment
- Zod for validation
- Vercel for deployment

## Engineering rules
- Prefer server components unless client interactivity is required.
- Keep domain logic outside page components.
- Use strict TypeScript types.
- Use Zod schemas for user-entered and AI-generated data.
- AI responses must use structured JSON, never free-form parsing.
- University facts, deadlines, requirements, visa rules, work rights, tuition and other changing facts must come from a source / database layer with provenance and `last_verified_at`, not model memory.
- Never expose secrets to the browser.
- Keep UI clean, calm, professional and student-friendly.
- Make all pages responsive.
- Consequential submissions and declarations require explicit student approval.

## Core domain model
`StudentProfile` is the central system-of-record object. All future features must reuse it rather than asking the student to re-enter information.

The profile should progressively support:
- Personal background
- Education and transcripts
- GPA / WAM and grading context
- English tests
- Internships / employment
- Research / projects
- Awards / extracurriculars / volunteering / leadership
- Skills
- Budget and destination preferences
- Career goals and work-style preferences
- Migration / return-home preferences
- Willingness to change field
- Pathway / diploma / foundation willingness
- Ranking and city preferences
- Salary goals
- Documents

Main domain entities include:
- student_profiles
- education_records
- experiences
- skills
- language_tests
- documents
- profile_assessments
- profile_gaps
- career_paths
- roadmap_items
- tasks
- country_recommendations
- programmes
- programme_requirements
- programme_recommendations
- application_portfolios
- applications
- application_requirements
- application_documents
- offers
- post_offer_tasks

## Student Profile Report
After profile completion, generate a structured report across dimensions such as:
- Academic strength
- Quantitative background
- English readiness
- Experience strength
- Research / project evidence
- Technical skills
- Leadership evidence
- Career clarity
- Application readiness

The assessment must identify the highest-leverage constraint before recommending schools.

## Career-first principle
Do NOT force students to select a major at the beginning. The system should infer and compare suitable career / study directions based on profile evidence, interests, constraints and goals.

For each direction, explain:
- What the field studies
- Who it suits
- Quantitative demand
- Programming demand
- Typical roles
- Employability by relevant market
- Career mobility
- Migration considerations where appropriate
- Competition level
- Preparation gaps

Use qualitative labels such as `Best fit`, `Strong alternative`, `Possible with preparation`.

## University recommendation principle
Country and programme selection should occur only after profile diagnosis and career planning.

Programme recommendations should be grouped into `Reach`, `Target`, and `Safe` and explain why each programme is recommended.

Do not present fabricated exact admission probabilities. Any scores are heuristic fit / competitiveness indicators unless backed by validated admissions data.

## Application package principle
Each accepted programme becomes an Application with its own requirements and document package.

Generated CVs, statements and recommendation-letter assistance must use verified StudentProfile facts only. Never fabricate achievements, dates, grades, roles, awards or experiences.

## Application Audit
Before submission, check for:
- Date inconsistencies
- Conflicting profile facts
- Expiring English tests
- Missing programme-specific documents
- Incorrect programme / university names
- Excessive content duplication
- Unsatisfied requirements

Target state: `Application Ready`.

## UX principle
The platform should always answer four questions clearly:
1. Where am I now?
2. What are my biggest gaps?
3. What should I do next?
4. Why does this matter for my target pathway?

The dashboard should prioritise the top 3 next actions rather than showing every possible task.

Roadmaps must be actionable tasks, not generic paragraphs.

## Dynamic replanning
Profile changes such as a new IELTS score, GPA update, internship, project, target country or career preference should be able to trigger reassessment and explain what changed in the student's positioning.

## Development order
1. Project shell and design system
2. Authentication shell
3. Student onboarding / portfolio
4. Profile persistence
5. Journey-based dashboard
6. Student Profile Report
7. Career direction analysis
8. Improvement roadmap and tasks
9. Dynamic reassessment after profile changes
10. Country comparison
11. Programme recommendation and application portfolio
12. Application packages and document generation
13. Application Audit
14. Offer tracking
15. Pre-departure
16. Career layer

## Naming
Use clear English names in code. UI copy can later support multilingual display.
