create extension if not exists "pgcrypto";

create table if not exists public.student_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique,
  full_name text,
  current_country text,
  current_university text,
  degree_level text,
  major text,
  year_of_study integer,
  graduation_date date,
  gpa numeric,
  gpa_scale numeric,
  english_test_type text,
  english_score jsonb default '{}'::jsonb,
  target_countries text[] default '{}',
  target_fields text[] default '{}',
  budget_min numeric,
  budget_max numeric,
  career_goal text,
  priorities text[] default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.experiences (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  type text not null,
  title text not null,
  organisation text,
  start_date date,
  end_date date,
  description text,
  skills text[] default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  skill_name text not null,
  level text,
  category text,
  created_at timestamptz not null default now()
);

create table if not exists public.assessments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  overall_score integer check (overall_score between 0 and 100),
  scores jsonb not null default '{}'::jsonb,
  strengths jsonb not null default '[]'::jsonb,
  weaknesses jsonb not null default '[]'::jsonb,
  recommendations jsonb not null default '[]'::jsonb,
  summary text,
  created_at timestamptz not null default now()
);

create table if not exists public.roadmap_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  category text not null,
  title text not null,
  description text,
  priority text default 'medium',
  start_date date,
  due_date date,
  status text not null default 'not_started' check (status in ('not_started','in_progress','completed','skipped')),
  reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists student_profiles_user_id_idx on public.student_profiles(user_id);
create index if not exists experiences_user_id_idx on public.experiences(user_id);
create index if not exists assessments_user_id_idx on public.assessments(user_id);
create index if not exists roadmap_items_user_id_idx on public.roadmap_items(user_id);
