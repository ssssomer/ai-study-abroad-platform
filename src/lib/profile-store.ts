"use client";

import { StudentProfile } from "@/types/student";

const STORAGE_KEY = "study-abroad-student-profile";

function hasSupabaseConfig() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

export async function saveStudentProfile(profile: StudentProfile) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }

  if (!hasSupabaseConfig()) return;

  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const { data: auth } = await supabase.auth.getUser();
  const user = auth.user;
  if (!user) return;

  const { error: profileError } = await supabase.from("student_profiles").upsert(
    {
      user_id: user.id,
      full_name: profile.fullName,
      current_country: profile.currentCountry,
      current_university: profile.currentUniversity,
      degree_level: profile.degreeLevel,
      major: profile.major,
      year_of_study: profile.yearOfStudy,
      graduation_date: profile.graduationDate || null,
      gpa: profile.gpa,
      gpa_scale: profile.gpaScale,
      english_test_type: profile.englishTestType,
      english_score: profile.englishScore,
      target_countries: profile.targetCountries,
      target_fields: profile.targetFields,
      budget_min: profile.budgetMin,
      budget_max: profile.budgetMax,
      career_goal: profile.careerGoal,
      priorities: profile.priorities,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" },
  );

  if (profileError) throw profileError;

  await supabase.from("experiences").delete().eq("user_id", user.id);

  if (profile.experiences.length) {
    const { error: experienceError } = await supabase.from("experiences").insert(
      profile.experiences.map((experience) => ({
        user_id: user.id,
        type: experience.type,
        title: experience.title,
        organisation: experience.organisation,
        description: experience.description,
      })),
    );
    if (experienceError) throw experienceError;
  }
}

export async function loadStudentProfile(): Promise<StudentProfile | null> {
  if (hasSupabaseConfig()) {
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
    const { data: auth } = await supabase.auth.getUser();
    const user = auth.user;

    if (user) {
      const [{ data: profile }, { data: experiences }] = await Promise.all([
        supabase.from("student_profiles").select("*").eq("user_id", user.id).maybeSingle(),
        supabase.from("experiences").select("*").eq("user_id", user.id).order("created_at"),
      ]);

      if (profile) {
        return {
          fullName: profile.full_name ?? "",
          currentCountry: profile.current_country ?? "",
          currentUniversity: profile.current_university ?? "",
          degreeLevel: profile.degree_level ?? "",
          major: profile.major ?? "",
          yearOfStudy: profile.year_of_study ?? null,
          graduationDate: profile.graduation_date ?? "",
          gpa: profile.gpa === null ? null : Number(profile.gpa),
          gpaScale: profile.gpa_scale === null ? null : Number(profile.gpa_scale),
          englishTestType: profile.english_test_type ?? "None",
          englishScore: profile.english_score ?? {},
          experiences: (experiences ?? []).map((item) => ({
            id: item.id,
            type: item.type,
            title: item.title,
            organisation: item.organisation ?? "",
            description: item.description ?? "",
          })),
          targetFields: profile.target_fields ?? [],
          careerGoal: profile.career_goal ?? "",
          priorities: profile.priorities ?? [],
          targetCountries: profile.target_countries ?? [],
          budgetMin: profile.budget_min === null ? null : Number(profile.budget_min),
          budgetMax: profile.budget_max === null ? null : Number(profile.budget_max),
        };
      }
    }
  }

  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as StudentProfile;
  } catch {
    return null;
  }
}
