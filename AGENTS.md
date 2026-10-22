# AI Study Abroad Platform — Codex Instructions

## Product vision
Build an AI-powered end-to-end study abroad and career planning platform. The platform should support a student from the moment they begin considering studying abroad through profile building, career planning, English preparation, internships, university selection, applications, offers, relocation, housing, and early-career preparation.

## MVP scope
The first product milestone focuses on:
1. Student onboarding and portfolio creation
2. Background assessment
3. 12-month improvement roadmap
4. Task tracking and progress
5. Dashboard summarising readiness, strengths, gaps, and next priorities

Do not implement university search, applications, housing, visa, or document generation until the MVP above is stable.

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
- University facts, deadlines, and requirements must eventually come from a database/source layer, not model memory.
- Never expose secrets to the browser.
- Keep UI clean, calm, professional, and student-friendly.
- Make all pages responsive.

## Core domain model
StudentProfile is the central object. Future features should reuse it rather than asking the student to re-enter information.

Main entities:
- student_profiles
- experiences
- skills
- assessments
- roadmap_items
- applications (later)
- documents (later)

## UX principle
The platform should always answer three questions clearly:
1. Where am I now?
2. What are my biggest gaps?
3. What should I do next?

Roadmaps must be actionable tasks, not generic paragraphs.

## Development order
1. Project shell and design system
2. Authentication shell
3. Onboarding form
4. Profile persistence
5. Dashboard
6. AI assessment endpoint
7. Roadmap generation
8. Task completion / progress
9. Reassessment after profile changes

## Naming
Use clear English names in code. UI copy can later support multilingual display.
