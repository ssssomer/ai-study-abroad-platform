export type ExperienceType =
  | "internship"
  | "work"
  | "project"
  | "research"
  | "volunteer"
  | "leadership";

export type Experience = {
  id: string;
  type: ExperienceType;
  title: string;
  organisation: string;
  description: string;
};

export type StudentProfile = {
  fullName: string;
  currentCountry: string;
  currentUniversity: string;
  degreeLevel: string;
  major: string;
  yearOfStudy: number | null;
  graduationDate: string;
  gpa: number | null;
  gpaScale: number | null;
  englishTestType: "IELTS" | "TOEFL" | "PTE" | "None";
  englishScore: {
    overall?: number | null;
    listening?: number | null;
    reading?: number | null;
    writing?: number | null;
    speaking?: number | null;
  };
  experiences: Experience[];
  targetFields: string[];
  careerGoal: string;
  priorities: string[];
  targetCountries: string[];
  budgetMin: number | null;
  budgetMax: number | null;
};

export const emptyStudentProfile: StudentProfile = {
  fullName: "",
  currentCountry: "",
  currentUniversity: "",
  degreeLevel: "",
  major: "",
  yearOfStudy: null,
  graduationDate: "",
  gpa: null,
  gpaScale: null,
  englishTestType: "None",
  englishScore: {},
  experiences: [],
  targetFields: [],
  careerGoal: "",
  priorities: [],
  targetCountries: [],
  budgetMin: null,
  budgetMax: null,
};
